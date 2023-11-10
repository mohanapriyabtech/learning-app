import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios';
// import { useToaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
 require('dotenv').config();



const validationSchema = Yup.object().shape({
  description: Yup.string().trim()
    .required('Description is required'),
  title: Yup.string().trim()
    .required('lesson is required'),
    
  mentor_id: Yup.string().required('Instructor is required'),
  course_id: Yup.string().required('Course is required'),
  video_url: Yup.string()
});


function Forms() {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl, "api")
  const history = useHistory();
  const [instructors, setInstructors] = useState([]);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    mentor_id: '',
    course_id: '',
    video_url: null,
  });





  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/list-mentor`);
        const instructorData = response.data.data;
        setInstructors(instructorData);

      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructors();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/list-course`);
        const categoryData = response.data.data;
        setCategory(categoryData);

      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategory();
  }, []);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('video_url', file);
  };


  const handleSubmit = async (values) => {
    try {

      const form_data = new FormData();

      form_data.append('description', formik.values.description);
      form_data.append('title', formik.values.title);
      form_data.append('mentor_id', formik.values.mentor_id);
      form_data.append('course_id', formik.values.course_id);

      const file_data = new FormData();
      file_data.append('media', formik.values.video_url);
      file_data.append('service', 'lessons');

      const fileResponse = await axios.post(`${apiUrl}/api/v1/file-upload/upload`, file_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File upload API response:', fileResponse.data.data);

      form_data.append('video_url', fileResponse.data.data[0].name);
      // form_data.append('cover_image_url', fileResponse.data.data[0].url);

      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/v1/admin/create-lesson`, form_data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      console.log('Form submission API response:', response.data.data);

      if (response.status === 200) {
        formik.resetForm();
        history.push('/app/admin/lessons');
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <PageTitle>Lesson Create form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ width: '50%' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label>
              <span>Lesson Name</span>
              <Input
                className="mt-1"
                placeholder="lesson name"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              // style={{width:"50%"}}
              />
            </Label>
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-600">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <Label>
              <span>Description</span>
              <Textarea
                className="mt-1"
                rows="2"
                placeholder=""
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
                name="mentor_id"
                value={formik.values.mentor_id}
                onChange={formik.handleChange}
              >

                <option value="">Select an instructor</option>

                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id} style={{ height: '50px' }} >
                    {instructor.mentor_name}
                  </option>
                ))}

              </select>
            </Label>
            {formik.touched.mentor_id && formik.errors.mentor_id ? (
              <div className="text-red-600">{formik.errors.mentor_id}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <Label>
              <span>Course</span>
              <select
                className="mt-1 block w-35 h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                name="course_id"
                value={formik.values.course_id}
                onChange={formik.handleChange}
              >

                <option value="">Select a Course</option>

                {category.map((category) => (
                  <option key={category._id} value={category._id} style={{ height: '50px' }} >
                    {category.course}
                  </option>
                ))}

              </select>
            </Label>
            {formik.touched.course_id && formik.errors.course_id ? (
              <div className="text-red-600">{formik.errors.course_id}</div>
            ) : null}
          </div>
          {/* <div className="mb-4">
            <Label>
              <span>lesson</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder=""
                name="lesson"
                value={formik.values.lesson}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.lesson && formik.errors.lesson ? (
              <div className="text-red-600">{formik.errors.lesson}</div>
            ) : null}
          </div> */}

          <div className="mb-4">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">Video Url Upload</span>
              <input
                type="file"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                accept=".mp4"
                name="video_url"
                // onChange={(e) => {
                //   console.log(e, "e");
                //   formik.setFieldValue('file', e.currentTarget.files[0]);
                //   console.log(formik.values.file, "formik.values.file");
                // }}  
                onChange={handleFileChange}

              />
            </Label>
            {formik.touched.video_url && formik.errors.video_url ? (
              <div className="text-red-600">{formik.errors.video_url}</div>
            ) : null}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active-bg-purple-600 hover-bg-purple-700 focus-outline-none focus-shadow-outline-purple"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>

          </div>
        </form>
      </div>
    </>
  );
}

export default Forms;
