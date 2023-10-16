import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';
import PageTitle from '../../components/Typography/PageTitle'
import EditProject from '../EditProject';
import { Table, TableHeader,TableCell,TableBody,TableRow,TableFooter,TableContainer,Badge,Avatar,Button,Pagination } from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
dotenv.config();


function MentorsList() {
  const apiUrl = process.env.REACT_APP_API_URL || ''
  const history = useHistory();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);

  const resultsPerPage = 10;
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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
  }, []);

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

  
  const handleEditClick = async (project) => {
    
    localStorage.setItem("projectName",project.name);
    localStorage.setItem("projectDescription",project.description);
    localStorage.setItem("fileUrl",project.file_url);
  
    history.push(`/app/admin/edit-courses/${project._id}`)
  };
  
  
  


  return (
    <>
      <PageTitle>Mentors</PageTitle>

      <div className="px-6 my-6 flex justify-end">
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
                  <Badge type={project.status}>-</Badge>  
                  {/* type={user.status} */}
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
