import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import { Select } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
 require('dotenv').config();



const validationSchema = Yup.object().shape({
  category_name: Yup.string().trim().required('category is required').min(3, 'Category is required'),
});



function Editcategory() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();

  let { id } = useParams();

  const initialValues = {
    category_name: localStorage.getItem('category_name'),
  
  };

  

  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {


      const form_data = new FormData();
     
      if (formik.values.category_name.length > 0 && formik.values.category_name !== initialValues.category_name) {
        form_data.append('category_name', formik.values.category_name);
      } 
      // if (formik.values.category_name.length === 0) {
      //   console.log("Category name is required")
      //   formik.setFieldError('category_name', 'Category name is required');
      // }
  
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/admin/edit-category/${id}`, form_data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
 
      if (response.status === 200) {
        formik.resetForm();
        history.push('/app/admin/categories')
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  // form validation
  const [categoryNameError, setCategoryNameError] = useState('');

  const handleCategoryNameChange = (e) => {
    formik.handleChange(e); 

    if (e.target.value.length === 0) {
      setCategoryNameError('Category name is required');
    } else {
      setCategoryNameError(''); 
    }
  };

  return (
    <>
      <PageTitle>category Edit form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={formik.onSubmit}>
          {/* Name */}
          <div className="mb-4">
            <Label>
              <span>category Title</span>
              <Input
                className="mt-1"
                placeholder=""
                name="category_name"
                value={formik.values.category_name}
                onChange={handleCategoryNameChange}
                
                
              />
            </Label>
            {formik.touched.category_name && formik.errors.category_name ? (
              <div className="text-red-600">{formik.errors.category_name}</div>
            ) : null}
            {categoryNameError && <div className="text-red-600">{categoryNameError}</div>}
          
          </div>

          

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={formik.isSubmitting || categoryNameError}
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

export default Editcategory;
