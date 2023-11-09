import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
 


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
 require('dotenv').config();

function Tables() {
  const apiUrl = process.env.REACT_APP_API_URL || ''
  const history = useHistory();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);

  const resultsPerPage = 10;
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusRowIndex, setFocusRowIndex] = useState(null); // Track the index to focus on
  const focusRowRef = useRef(null);
  




  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${apiUrl}/api/v1/admin/list-lesson`, { headers });
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
    } else {
      fetchData()
    }
  }, [searchQuery]);



  const fetchDataWithSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${apiUrl}/api/v1/admin/search-lesson?lesson=${searchQuery}`,
        { headers }
      );
      console.log(response.status,)
      if (response.status === 200) {
        setDataTable(response.data.data);
        setTotalResults(response.data.data.length);
      }
    } catch (error) {
      setError(error.message);
    }

  };


  const onPageChange = (page) => {
    setPage(page);
  };

  const handleLessonProjectClick = () => {
    history.push('/app/admin/create-lesson');
  };


  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`${apiUrl}/api/v1/admin/delete-lesson/${projectId}`, { headers });

      setDataTable(dataTable.filter(project => project.id !== projectId));
      setTotalResults(totalResults - 1);
      fetchData()
      // If the deleted row was the focused row, remove focus
      if (focusRowIndex === projectId) {
        setFocusRowIndex(null);
      }

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleStatusChange = async (project) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const newStatus = project.status === 1 ? 0 : 1; // Toggle status between 0 and 1
  
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/edit-lesson/${project._id}`,
        { status: newStatus },
        { headers }
      );
  
      if (response.status === 200) {
        // Update data
        setDataTable((prevData) =>
          prevData.map((p) =>
            p._id === project._id ? { ...p, status: newStatus } : p
          )
        );
      } else {
        console.error('Error updating status:', response.status);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  // Add a new ref for focusing
  const focusRowIndexRef = useRef(null);

  const handleEditClick = async (project,index) => {
    console.log(project,"edit")
    localStorage.setItem("title", project.title);
    localStorage.setItem("lessonsMentor", project.mentor_id._id);
    localStorage.setItem("lessonsCourse", project.course_id._id);
    localStorage.setItem("video_url", project.video_url);
    localStorage.setItem("github_url", project.github_url);
    // localStorage.setItem("category_id_lessons", project.category_id._id);
    console.log(index,"indexxxx")
    // Set the index of the edited row to focus on
    setFocusRowIndex(index);
    focusRowIndexRef.current = index; 
    console.log( focusRowIndexRef.current,"updated")
    history.push(`/app/admin/edit-lesson/${project._id}`)
  };

  useEffect(() => {
    console.log(focusRowIndex, "focus ROW");
  }, [focusRowIndex]);

  useEffect(() => {
    if (focusRowIndexRef.current !== null && focusRowIndexRef.current) {
      // Use ref to focus on the specific row
      focusRowIndexRef.current.focus();
      console.log(focusRowIndexRef.current, "updated");
    }
  }, [dataTable]);
  



  return (
    <>
      <PageTitle>Lessons</PageTitle>

      <div className="px-6 my-6 flex justify-end gap-3 ">
        <input
          type="text"
          className="input-sm border border-black-500 rounded-lg p-2"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleLessonProjectClick}>
          Create lessons
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>


      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>lessons</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Mentor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          {dataTable.length === 0 ? (
             <div className="w-32 h-32 mx-auto flex items-center justify-center ">
              <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                No lessons found.
              </p>
            </div>
          ) : (
            <TableBody>

              {dataTable.map((project, i) => (
               <TableRow key={i} ref={focusRowIndex === i ? focusRowIndexRef : null} tabIndex={0}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                      <div>
                        <p className="font-semibold">{project.title}</p>

                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{project.course_id.course}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{project.mentor_id.mentor_name}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{project.status === 1 ? "Approved" : "Pending"}</p>
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
                        className={`w-10 h-5 relative toggle-button ${project.status === 1 ? 'bg-green-500 rounded-lg' : 'bg-blue-800 rounded-lg'
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
                      <Button layout="link" size="icon" aria-label="Edit" onClick={() => handleEditClick(project,i)}>
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

export default Tables
