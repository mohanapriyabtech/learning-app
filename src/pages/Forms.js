import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dotenv from 'dotenv';
dotenv.config();

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('File is required'),
});

function Forms() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('file', file);
  };

  const handleSubmit = async (values) => {
    try {
      
      const form_data = new FormData();
      form_data.append('name', values.name);
      form_data.append('description', values.description);
      // form_data.append('file', formData.file); 
  
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
  
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/v1/user/create-project`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log('Form submission API response:', response.data.data);

      if (response.status === 200) {
        formik.resetForm();
        history.push('/app/projects');
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
      <PageTitle>Forms</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                placeholder="Jane Doe"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600">{formik.errors.name}</div>
            ) : null}
          </div>

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
              <span className="text-gray-700 dark:text-gray-400">Document Upload</span>
              <input
                type="file"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                accept=".pdf, .doc, .docx"
                name="file"
                // onChange={(e) => {
                //   console.log(e, "e");
                //   formik.setFieldValue('file', e.currentTarget.files[0]);
                //   console.log(formik.values.file, "formik.values.file");
                // }}  
                onChange={handleFileChange}

              />
            </Label>
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-600">{formik.errors.file}</div>
            ) : null}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
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
