import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import { Select } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modals from '../../pages/Modals';
 
 require('dotenv').config();


const validationSchema = Yup.object().shape({
  lesson: Yup.string().trim().required('lesson is required'),
  instructor: Yup.string().trim(),
  video_url: Yup.string(),
  description: Yup.string(),
  course_id: Yup.string(),
});



function EditLesson() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();

  let { id } = useParams();

  const initialValues = {
  
    mentor_id: localStorage.getItem('lessonsMentor') || '',
    title: localStorage.getItem('title') || '',
    course_id: localStorage.getItem('lessonsCourse') || '',
    video_url: null,
    github_url: null
  };

  const [instructors, setInstructors] = useState([]);
  const [instructorSelect,setInstructorSelect] = useState('');

  const instructorId = initialValues.mentor_id;
  const updatedItems = instructors.filter(item => item._id !== instructorId);


  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/list-mentor`);
        const instructorData = response.data.data;
        console.log(instructorData,"instrutors")
        setInstructors(instructorData);
        
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };
  
    fetchInstructors();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-mentor/${initialValues.mentor_id}`, { headers })
      .then((response) => {
        const data = response.data.data;
        setInstructorSelect(data.mentor_name);
      })
      .catch((error) => {
        console.error('Error fetching instructor data:', error);
      });
  }, []);

  const [course, setcourse] = useState([]);
  const [courseSelect,setCourseSelect] = useState('');

  const courseId = initialValues.course_id;
  const updatedCourseItems = course.filter(item => item._id !== courseId);
  console.log(updatedCourseItems,"items")


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/list-course`);
        const courseData = response.data.data;
        setcourse(courseData);
        
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-course/${initialValues.course_id}`, { headers })
      .then((response) => {
        const data = response.data.data;
        setCourseSelect(data.course);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {


      const form_data = new FormData();
     
      if (formik.values.title.length > 0 && formik.values.title !== initialValues.title) {
        form_data.append('title', formik.values.title);
      }
      if (formik.values.mentor_id !== initialValues.mentor_id) {
        form_data.append('mentor_id', formik.values.mentor_id);
      }
      if (formik.values.course_id !== initialValues.course_id) {
        form_data.append('course_id', formik.values.course_id);
      }
    
      // form_data.append('file', formData.file); 

      if (formik.values.video_url) {

        const file_data = new FormData();
        file_data.append('media', formik.values.video_url);
        file_data.append('service', 'mentors');
    
        const fileResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/file-upload/upload`, file_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('File upload API response:', fileResponse.data.data);
    
        form_data.append('video_url', fileResponse.data.data[0].name);
      }
  
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/admin/edit-lesson/${id}`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
 
      if (response.status === 200) {
        formik.resetForm();
        // setModalMessage('Mentor updated successfully!');
        setShowSuccessModal(true);
        // history.push('/app/admin/lessons')
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };


  const handleCloseModal = () => {
    setShowSuccessModal(false);
    history.push('/app/admin/lessons'); // Redirect after closing the modal
  };

  const handleFileChange = (e) => {
    formik.setFieldValue('video_url', e.target.files[0]);
  };

  const fileName = localStorage.getItem('video_url')


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  //form validation

  const [lessonError, setlessonError] = useState('');

  const handlelessonNameChange = (e) => {
    formik.handleChange(e); 

    if (e.target.value.length === 0) {
      setlessonError('lesson is required');
    } else {
      setlessonError(''); 
    }
  };
   



  return (
    <>
      <PageTitle>Lesson Edit form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={formik.onSubmit}>
          {/* Name */}
          <div className="mb-4">
            <Label>
              <span>Lesson Title</span>
              <Input
                className="mt-1"
                placeholder=""
                name="title"
                value={formik.values.title}
                onChange={handlelessonNameChange}
                
              />
            </Label>
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-600">{formik.errors.title}</div>
            ) : null}
            {lessonError && <div className="text-red-600">{lessonError}</div>}
          
          </div>

          {/* Description */}
          <div className="mb-4">
          <Label>
            <span>Instructor</span>
            <select
                className="mt-1 block w-35 h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                name="instructor" 
                value={formik.values.mentor_id}
                onChange={formik.handleChange}
              >
                
                {instructorSelect ? (
                   
                   <option value={instructorSelect}>{instructorSelect}</option>
                   ) : (
                   <option value="">Select an instructor</option>
                   )}
                 {updatedItems
                   .map(instructor => (
                     <option
                       key={instructor._id}
                       value={instructor._id}
                       // style={{ height: '50px' ,width:"50px"}}
                     >
                       {instructor.mentor_name}
                     </option>
                   ))
                 }
                
              </select>
            </Label>
            {formik.touched.mentor_id && formik.errors.mentor_id ? (
              <div className="text-red-600">{formik.errors.mentor_id}</div>
            ) : null}
          </div>


          <div className="mb-4">
            <Label>
            <span>course</span>
            <select
                className="mt-1 block w-35 h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                name="course_id" 
                value={formik.values.course_id}
                onChange={formik.handleChange}
              >
                
                {courseSelect ? (
                   
                   <option value={courseSelect}>{courseSelect}</option>
                   ) : (
                   <option value="">Select a course</option>
                   )}
                 {updatedCourseItems
                   .map(course => (
                     <option
                       key={course._id}
                       value={course._id}
                       // style={{ height: '50px' ,width:"50px"}}
                     >
                       {course.course}
                     </option>
                   ))
                 }
                
              </select>
            </Label>
            {formik.touched.course_id && formik.errors.course_id ? (
              <div className="text-red-600">{formik.errors.course_id}</div>
            ) : null}
          </div>

          {/* File Upload */}
          <div className="mb-4 relative">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">Video Url Upload</span>
              <div
                className="mt-1 w-full rounded-md shadow-sm focus-within:border-purple-400 focus-within:ring focus-within:ring-purple-200 focus-within:ring-opacity-50 cursor-pointer"
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".mp4"
                  name="video_url"
                  onChange={handleFileChange}
                />
                <div className="py-2 px-4 text-gray-500">
                  <span className="text-purple-600 border border-gray-300 rounded-md pl-2 pr-4">
                    Choose file
                  </span>
                  <span> </span>
                  {formik.values.video_url ? formik.values.video_url.name : (fileName === "undefined" ? 'No file selected' : fileName)}

                </div>
              </div>
            </Label>
            {formik.touched.video_url && formik.errors.video_url ? (
              <div className="text-red-600">{formik.errors.video_url}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={formik.isSubmitting || !formik.dirty  || lessonError}
              onClick={ handleSubmit }
            >
              Submit
            </Button>
          </div>
          <Modals isOpen={showSuccessModal} onClose={handleCloseModal} message="Lesson updated successfully!" />
        </form>
      </div>
    </>
  );
}

export default EditLesson;
