import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';


import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import EditProject from '../EditProject';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'

import response from '../../utils/demo/tableData'
dotenv.config();

function Tables() {
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
      const response = await axios.get(`${apiUrl}/api/v1/admin/list-course`,{ headers }); 
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
      `${apiUrl}/api/v1/admin/search-course?course=${searchQuery}`,
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
    history.push('/app/admin/create-course');
  };


  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.delete(`${apiUrl}/api/v1/admin/delete-course/${projectId}`, { headers });
  
      setDataTable(dataTable.filter(project => project.id !== projectId));
      setTotalResults(totalResults - 1);
      fetchData()

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleStatusChange = async (project) => {
    try {

      console.log("status change")
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const newStatus = project.status === 1 ? 0 : 1; // Toggle status between 0 and 1
      console.log(newStatus,"stat")
  
      // await axios.patch(
      //   `${apiUrl}/api/v1/admin/update-mentor/${project._id}`,
      //   { status: newStatus },
      //   { headers }
      // );
  
      // Update data
      setDataTable((prevData) =>
        prevData.map((p) =>
          p._id === project._id ? { ...p, status: newStatus } : p
        )
      );

      console.log(dataTable,"table")
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  
  const handleEditClick = async (project) => {
    
    localStorage.setItem("projectName",project.name);
    localStorage.setItem("projectDescription",project.description);
    localStorage.setItem("fileUrl",project.file_url);
  
    history.push(`/app/admin/edit-course/${project._id}`)
  };
  
  
  


  return (
    <>
      <PageTitle>Courses</PageTitle>

      <div className="px-6 my-6 flex justify-end gap-3 ">
        <input
          type="text"
          className="input-sm border border-black-500 rounded-lg p-2"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleCreateProjectClick}>
          Create course
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>


      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Course</TableCell>
              <TableCell>Description</TableCell>
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
                      <p className="font-semibold">{project.course}</p>
                      
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                <p className="text-xs text-gray-600 dark:text-gray-400">{project.description}</p>
                </TableCell>

                <TableCell>
                <p className="text-xs text-gray-600 dark:text-gray-400">{project.status === 1 ? "Approved": "Pending"}</p>
                </TableCell>

                <TableCell>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={project.status === 1}
                      onChange={() => handleStatusChange(project)}
                    />
                    <div
                      className={`w-10 h-5 relative toggle-button ${
                        project.status === 1 ? 'bg-green-500 rounded-lg' : 'bg-blue-800 rounded-lg'
                      } transition-all duration-300 ease-in-out`}
                    >
                      <div
                        className={`w-5 h-5 bg-white mr-4 rounded-full shadow-md absolute z-2 toggle-handle`}
                        style={{
                          marginBottom: '12px',
                          transform: `translateX(${project.status === 1 ? '100%' : '0'})`,
                          transition: 'transform 0.4s ease-in-out',
                        }}
                      ></div>
                    </div>
                  </label>
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

export default Tables
