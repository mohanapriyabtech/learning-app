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
  course: Yup.string().trim().required('course is required'),
  instructor: Yup.string().trim(),
  cover_image: Yup.string(),
  description: Yup.string(),
  category_id: Yup.string(),
});



function EditCourse() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();

  let { id } = useParams();

  const initialValues = {
    description: localStorage.getItem('description') || '',
    instructor: localStorage.getItem('instructor') || '',
    course: localStorage.getItem('course') || '',
    category_id: localStorage.getItem('category_id_course') || '',
    cover_image: null,
  };

  const [instructors, setInstructors] = useState([]);
  const [instructorSelect,setInstructorSelect] = useState('');

  const instructorId = initialValues.instructor;
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

    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-mentor/${initialValues.instructor}`, { headers })
      .then((response) => {
        const data = response.data.data;
        setInstructorSelect(data.mentor_name);
      })
      .catch((error) => {
        console.error('Error fetching instructor data:', error);
      });
  }, []);

  const [category, setCategory] = useState([]);
  const [categorySelect,setCategorySelect] = useState('');

  const categoryId = initialValues.category_id;
  const updatedCategoryItems = category.filter(item => item._id !== categoryId);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/list-category`);
        const categoryData = response.data.data;
        setCategory(categoryData);
        
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

    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-category/${initialValues.category_id}`, { headers })
      .then((response) => {
        const data = response.data.data;
        setCategorySelect(data.category_name);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  }, []);


  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {


      const form_data = new FormData();
     
      if (formik.values.course.length > 0 && formik.values.course !== initialValues.course) {
        form_data.append('course', formik.values.course);
      }
      if (formik.values.description !== initialValues.description) {
        form_data.append('description', formik.values.description);
      }
      if (formik.values.instructor !== initialValues.instructor) {
        form_data.append('instructor', formik.values.instructor);
      }
    
      // form_data.append('file', formData.file); 

      if (formik.values.cover_image) {

        const file_data = new FormData();
        file_data.append('media', formik.values.cover_image);
        file_data.append('service', 'mentors');
    
        const fileResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/file-upload/upload`, file_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('File upload API response:', fileResponse.data.data);
    
        form_data.append('cover_image', fileResponse.data.data[0].name);
      }
      

      // if (formik.values.phone_number !== initialValues.phone_number) {
      //   form_data.append('phone_number', formik.values.phone_number);
      // }
     

  
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/admin/edit-course/${id}`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
 
      if (response.status === 200) {
        formik.resetForm();
        // setModalMessage('Mentor updated successfully!');
        // setShowSuccessModal(true);
        history.push('/app/admin/courses')
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleFileChange = (e) => {
    formik.setFieldValue('cover_image', e.target.files[0]);
  };

  const fileName = localStorage.getItem('cover_image')


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  //form validation

  const [courseError, setCourseError] = useState('');

  const handleCourseNameChange = (e) => {
    formik.handleChange(e); 

    if (e.target.value.length === 0) {
      setCourseError('Course is required');
    } else {
      setCourseError(''); 
    }
  };




  return (
    <>
      <PageTitle>Course Edit form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={formik.onSubmit}>
          {/* Name */}
          <div className="mb-4">
            <Label>
              <span>Course Title</span>
              <Input
                className="mt-1"
                placeholder=""
                name="course"
                value={formik.values.course}
                onChange={handleCourseNameChange}
                
              />
            </Label>
            {formik.touched.course && formik.errors.course ? (
              <div className="text-red-600">{formik.errors.course}</div>
            ) : null}
            {courseError && <div className="text-red-600">{courseError}</div>}
          
          </div>

          {/* Description */}
          <div className="mb-4">
            <Label>
              <span>Description</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder="Enter a description."
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
               
              />
            </Label>
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-600">{formik.errors.description}</div>
            ) : null}
          
          </div>
          <div className="mb-4">
            <Label>
            <span>Instructor</span>
            <select
                className="mt-1 block w-35 h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                name="instructor" 
                value={formik.values.instructor}
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
            {formik.touched.instructor && formik.errors.instructor ? (
              <div className="text-red-600">{formik.errors.instructor}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <Label>
            <span>Category</span>
            <select
                className="mt-1 block w-35 h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                name="category_id" 
                value={formik.values.category_id}
                onChange={formik.handleChange}
              >
                
                {categorySelect ? (
                   
                   <option value={categorySelect}>{categorySelect}</option>
                   ) : (
                   <option value="">Select a category</option>
                   )}
                 {updatedCategoryItems
                   .map(category => (
                     <option
                       key={category._id}
                       value={category._id}
                       // style={{ height: '50px' ,width:"50px"}}
                     >
                       {category.category_name}
                     </option>
                   ))
                 }
                
              </select>
            </Label>
            {formik.touched.category_id && formik.errors.category_id ? (
              <div className="text-red-600">{formik.errors.category_id}</div>
            ) : null}
          </div>

          {/* File Upload */}
          <div className="mb-4 relative">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">Cover Image Upload</span>
              <div
                className="mt-1 w-full rounded-md shadow-sm focus-within:border-purple-400 focus-within:ring focus-within:ring-purple-200 focus-within:ring-opacity-50 cursor-pointer"
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  name="cover_image"
                  onChange={handleFileChange}
                />
                <div className="py-2 px-4 text-gray-500">
                  <span className="text-purple-600 border border-gray-300 rounded-md pl-2 pr-4">
                    Choose file
                  </span>
                  <span> </span>
                  {formik.values.cover_image ? formik.values.cover_image.name : (fileName === "undefined" ? 'No file selected' : fileName)}

                </div>
              </div>
            </Label>
            {formik.touched.cover_image && formik.errors.cover_image ? (
              <div className="text-red-600">{formik.errors.cover_image}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={formik.isSubmitting || courseError}
              onClick={ handleSubmit }
            >
              Submit
            </Button>
          </div>
          {/* <Modals isOpen={showSuccessModal} onClose={closeSuccessModal} message={modalMessage} /> */}
        </form>
      </div>
    </>
  );
}

export default EditCourse;
