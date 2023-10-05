import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
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
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {
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
      const response = await axios.get('http://localhost:3000/api/v1/user/list-project',{ headers }); 
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
    history.push('/app/forms');
  };

  
  


  return (
    <>
      <PageTitle>Tables</PageTitle>

      <div className="px-6 my-6 flex justify-end">
      <Button onClick={handleCreateProjectClick}>
          Create project 
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
                      <p className="font-semibold">{project.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{project.api_key}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.file_url}</span>
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
                    <Button layout="link" size="icon" aria-label="Edit" > 
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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
