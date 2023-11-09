import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios'; 
// import { useToaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
 require('dotenv').config();



const validationSchema = Yup.object().shape({
  
    category_name: Yup.string().trim().required('category is required'),
  
});


function Forms() {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl,"api")
  const history = useHistory();
  const [formData, setFormData] = useState({
    category_name: '',
 
  });




  

  const handleSubmit = async (values) => {
    try {
      
      const form_data = new FormData();

      form_data.append('category_name',formik.values.category_name);
  
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/v1/admin/create-category`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log('Form submission API response:', response.data.data);

      if (response.status === 200) {
        formik.resetForm();
        history.push('/app/admin/categories');
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
      <PageTitle>Category Create form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ width: '50%' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label>
              <span>Category Name</span>
              <Input 
                className="mt-1"
                placeholder="category name"
                name="category_name"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                // style={{width:"50%"}}
              />
            </Label>
            {formik.touched.category_name && formik.errors.category_name ? (
              <div className="text-red-600">{formik.errors.category_name}</div>
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
