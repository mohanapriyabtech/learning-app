import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dotenv from 'dotenv';
dotenv.config();

const validationSchema = Yup.object().shape({
    mentor_name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter, one number, and one special character'
      ),
    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
    profile_image: Yup.string(),
    address: Yup.string(),
});


function Forms() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [formData, setFormData] = useState({
    mentor_name: '',
    email: '',
    address: '',
    phone_number: '',
    password: '',
    profile_image: null,
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
    formik.setFieldValue('profile_image', file);
  };

  const handleSubmit = async (values) => {
    try {
      
      const form_data = new FormData();
      form_data.append('mentor_name', values.mentor_name);
      form_data.append('email', values.email);
      form_data.append('phone_number', values.phone_number);
      form_data.append('address', values.address);
      form_data.append('password', values.password);
      // form_data.append('file', formData.file); 
  
      const file_data = new FormData();
      file_data.append('media', formik.values.profile_image);
      file_data.append('service', 'users');
  
      const fileResponse = await axios.post(`${apiUrl}/api/v1/file-upload/upload`, file_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File upload API response:', fileResponse.data.data);
  
      form_data.append('profile_image', fileResponse.data.data[0].name);
  
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/v1/admin/create-mentor`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log('Form submission API response:', response.data.data);

      if (response.status === 200) {
        formik.resetForm();
        history.push('/app/admin/mentors');
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
      <PageTitle>Mentor Create Form</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ width: '50%' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label>
              <span>Name</span>
              <Input 
                className="mt-1"
                placeholder="Jane Doe"
                name="mentor_name"
                value={formik.values.mentor_name}
                onChange={formik.handleChange}
                // style={{width:"50%"}}
              />
            </Label>
            {formik.touched.mentor_name && formik.errors.mentor_name ? (
              <div className="text-red-600">{formik.errors.mentor_name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <Label>
              <span>Email</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder="abc@gmail.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <Label>
              <span>Password</span>
              <br></br>
              <span className="text-sm text-green-600">
                ( Password should contain at least 8 characters including
                uppercase, lowercase, numbers, and special characters.)
              </span>
              <Input
                type="password"
                className="mt-1 password-input"
                rows="3"
                placeholder="********"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Label>
            
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <Label>
              <span>Mobile Number</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder="0000000000"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="text-red-600">{formik.errors.phone_number}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <Label>
              <span>Address</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder=""
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-600">{formik.errors.address}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <Label>
              <span className="text-gray-700 dark:text-gray-400">Profile Image Upload</span>
              <input
                type="file"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                accept=".png, .jpeg, .jpg, .svg, .gif"
                name="profile_image"
                // onChange={(e) => {
                //   console.log(e, "e");
                //   formik.setFieldValue('file', e.currentTarget.files[0]);
                //   console.log(formik.values.file, "formik.values.file");
                // }}  
                onChange={handleFileChange}

              />
            </Label>
            {formik.touched.profile_image && formik.errors.profile_image ? (
              <div className="text-red-600">{formik.errors.profile_image}</div>
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
