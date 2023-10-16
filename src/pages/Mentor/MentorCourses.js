import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import EditProject from '../EditProject';
import { Table,TableHeader,TableCell,TableBody,TableRow,TableFooter,TableContainer,Badge,Avatar,Button,Pagination} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import response from '../../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])
dotenv.config();

function Tables() {
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
      const response = await axios.get(`${apiUrl}/api/v1/mentor/list-course`,{ headers }); 
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
    history.push('/app/mentor/courses-create-form');
  };


  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.delete(`${apiUrl}/api/v1/mentor/delete-course/${projectId}`, { headers });
  
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
  
    history.push(`/app/mentor/edit-course/${project._id}`)
  };
  
  
  


  return (
    <>
      <PageTitle>Courses</PageTitle>

      <div className="px-6 my-6 flex justify-end">
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
              <TableCell>Project</TableCell>
              <TableCell>File</TableCell>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.instructor}</span>
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

export default Tables
