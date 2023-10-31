import React, { useState, useEffect , useRef  } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modals from "../../pages/Modals"
import dotenv from 'dotenv';
dotenv.config();

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
});



function EditProject() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    history.push('/app/projects');
  };

  let {id}  = useParams();

  const initialValues = {
    name: localStorage.getItem('projectName') || '',
    description: localStorage.getItem('projectDescription') || '', 
    file:null, 
  };

  const handleFileChange = (e) => {
    formik.setFieldValue('file', e.target.files[0]);
  };

  const handleSubmit = async (values) => {
    try {
      console.log(id);
      const form_data = new FormData();
      form_data.append('file', values.file);

      const file_data = new FormData();
      file_data.append('media', formik.values.file);
      file_data.append('service', 'users');
  
      const fileResponse = await axios.post(`${apiUrl}/api/v1/file-upload/upload`, file_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File upload API response:', fileResponse.data.data);
  
      form_data.append('file_url', fileResponse.data.data[0].name);
      if (fileResponse.status === 200) {
        history.push()
      }

      const token = localStorage.getItem("token");
      const response = await axios.patch(`${apiUrl}/api/v1/user/update-project/${id}`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log('Form submission API response:', response.data.data);

      if (response.status === 200) {
  
          formik.resetForm();
          setModalMessage('Project file updated successfully!'); 
          setShowSuccessModal(true); 
        
      }
    } catch (error) {
      console.error('API error:', error);
    }
   
  };

  const fileName = localStorage.getItem('fileUrl')

  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  

  return (
    <>
      <PageTitle>Forms</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                placeholder="Jane Doe"
                name="name"
                value={initialValues.name}
                disabled
              />
            </Label>
           
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
                disabled
              />
            </Label>
          
          </div>

          {/* File Upload */}
          <div className="mb-4 relative">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">Document Upload</span>
              {/* Hidden file input */}
              <input
                type="file"
                className="hidden"
                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                name="file"
                onChange={handleFileChange}
                // disabled={formik.isSubmitting}
                // value={formik.values.file}
                // ref={fileInputRef}
              />
              {/* Custom design */}
              <div
              className="mt-1 w-full rounded-md shadow-sm focus-within:border-purple-400 focus-within:ring focus-within:ring-purple-200 focus-within:ring-opacity-50 cursor-pointer"
              // onClick={() => fileInputRef.current.click()}
            >
              {/* Custom label or icon */}
              <div className="py-2 px-4 text-gray-500">
                <span className="text-purple-600 border border-gray-300 rounded-md pl-2 pr-4">Choose file</span>
                <span> </span>
                {formik.values.file ? formik.values.file.name : fileName}
              
              </div>
            </div>
            </Label>
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-600">{formik.errors.file}</div>
            ) : null}
          </div>


          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </div>
          <Modals isOpen={showSuccessModal} onClose={closeSuccessModal} message={modalMessage} />
        </form>
      </div>
    </>
  );
}

export default EditProject;
