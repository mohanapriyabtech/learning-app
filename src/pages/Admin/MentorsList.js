import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
 
import PageTitle from '../../components/Typography/PageTitle'
import EditProject from '../EditProject';
import { Table, TableHeader,TableCell,TableBody,TableRow,TableFooter,TableContainer,Badge,Avatar,Button,Pagination } from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
 require('dotenv').config();


function MentorsList() {
  const apiUrl = process.env.REACT_APP_API_URL || ''
  const history = useHistory();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);

  const resultsPerPage = 10;
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');



  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${apiUrl}/api/v1/admin/list-mentor`,{ headers }); 
      setDataTable(response.data.data); 
      setTotalResults(response.data.data.length); 
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
      fetchData();
     
    if (searchQuery) {
      fetchDataWithSearch();
    }
  }, [searchQuery]); 
  
  
  
  const fetchDataWithSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${apiUrl}/api/v1/admin/search-mentor?mentor=${searchQuery}`,
        { headers }
      );
      setDataTable(response.data.data);
      setTotalResults(response.data.data.length);
    } catch (error) {
      setError(error.message);
    }
  };
  
  


  const onPageChange = (page) => {
    setPage(page);
  };

  const handleCreateProjectClick = () => {
    history.push('/app/admin/mentors-create-form');
  };


  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.delete(`${apiUrl}/api/v1/admin/delete-mentor/${projectId}`, { headers });
  
      setDataTable(dataTable.filter(project => project.id !== projectId));
      setTotalResults(totalResults - 1);
      fetchData()

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  const handleStatusChange = async (e, project) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === 'Approved') {
      project.status = 1;
    } else {
      project.status = 0;
    }
    

    if (selectedStatus === 'Approved') {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.patch(`${apiUrl}/api/v1/mentor/update-mentor/${project._id}`,
          { status: 1 }, // 1 is Approved
          { headers }
        );

        // // Update data 
        setDataTable((prevData) =>
          prevData.map((p) =>
            p._id === project._id ? { ...p, status: 1 } : p
          )
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }

    } else {

      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.patch(`${apiUrl}/api/v1/mentor/update-mentor/${project._id}`,
          { status: 0 }, // 1 is Approved
          { headers }
        );

        // // Update data 
        setDataTable((prevData) =>
          prevData.map((p) =>
            p._id === project._id ? { ...p, status: 0 } : p
          )
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }

  };
  
  const handleEditClick = async (project) => {
    
    localStorage.setItem("mentor_name",project.mentor_name);
    localStorage.setItem("email",project.email);
    localStorage.setItem("phone_number",project.phone_number);
    localStorage.setItem("address",project.address);
    localStorage.setItem("password",project.password);
    localStorage.setItem("profile_image",project.profile_image);
  
    history.push(`/app/admin/mentors-edit-form/${project._id}`)
  };
  
  

  


  return (
    <>
      <PageTitle>Mentors</PageTitle>

      <div className="px-6 my-6 flex justify-end gap-3">
        <input
            type="text"
            className="input-sm border border-black-500 rounded-lg p-2"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <Button onClick={handleCreateProjectClick}>
          Create Mentor
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>


      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          {dataTable.length === 0 ? (
             <div className="w-32 h-32 mx-auto flex items-center justify-center ">
              <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                No mentor found.
              </p>
            </div>
          ) : (
          <TableBody>
            
            {dataTable.map((project, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{project.mentor_name}</p>
                     
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.email}</span>
                </TableCell>
                
                <TableCell>
                  <select
                    className="font-semibold text-sm"
                    value={project.status === 1 ? 'Approved' : 'Pending'}
                    onChange={(e) => handleStatusChange(e, project)}
                    // disabled={project.status === 1}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </TableCell>
             
                <TableCell>
                  <span className="text-sm">{new Date(project.created_at).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit" onClick={() => handleEditClick(project)}> 
                    {/* <EditProject project={project._id} /> */}
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDeleteClick(project._id)}>
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          )}
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default MentorsList
