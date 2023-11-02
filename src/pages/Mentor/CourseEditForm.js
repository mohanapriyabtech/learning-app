import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import { Select } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import Modals from '../../pages/Modals';


const validationSchema = Yup.object().shape({
  course: Yup.string(),
  instructor: Yup.string(),
  cover_image: Yup.string(),
  description: Yup.string(),
});



function EditCourse() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [instructors, setInstructors] = useState([]);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    history.push('/app/projects');
  };

  let { id } = useParams();

  const initialValues = {
    description: localStorage.getItem('description') || '',
    instructor: localStorage.getItem('instructor') || '',
    course: localStorage.getItem('course') || '',
    cover_image: null,
  };

 

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/admin/list-mentor`);
        const instructorData = response.data.data;
        setInstructors(instructorData);
        
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };
  
    fetchInstructors();
  }, []);

  const handleSubmit = async (values) => {
    try {


      const form_data = new FormData();
     
      if (formik.values.course !== initialValues.course) {
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
    
        const fileResponse = await axios.post(`${apiUrl}/api/v1/file-upload/upload`, file_data, {
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
      const response = await axios.patch(`${apiUrl}/api/v1/admin/edit-course/${id}`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
 
      if (response.status === 200) {
        formik.resetForm();
        setModalMessage('Mentor updated successfully!');
        setShowSuccessModal(true);
        history.push('/app/admin/mentors')
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
                value={initialValues.course}
                onChange={formik.handleChange}
                
              />
            </Label>
            {formik.touched.course && formik.errors.course ? (
              <div className="text-red-600">{formik.errors.course}</div>
            ) : null}
          
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
                value={initialValues.description}
                onChange={formik.handleChange}
                // disabled
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
                value={initialValues.instructor}
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
            {formik.touched.instructor && formik.errors.instructor ? (
              <div className="text-red-600">{formik.errors.instructor}</div>
            ) : null}
          </div>

          {/* File Upload */}
          <div className="mb-4 relative">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">CoverImage Upload</span>
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
                  {formik.values.cover_image ? formik.values.cover_image.name : fileName}
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
              disabled={formik.isSubmitting}
              onClick={handleSubmit}
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
