import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
import Modals from "../../pages/Modals";
import { useParams } from 'react-router-dom';
 require('dotenv').config();

const validationSchema = Yup.object().shape({
  mentor_name: Yup.string().trim().required('Name is required'),
  phone_number: Yup.string().trim()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
  profile_image: Yup.string(),
  address: Yup.string().trim(),
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

  const { id } = useParams();

  const initialValues = {
    mentor_name: localStorage.getItem("mentor_name") || '',
    email: localStorage.getItem("email") || '',
    phone_number: localStorage.getItem("phone_number") || '',
    address: localStorage.getItem("address") || '',
    password: localStorage.getItem("password") || '',
    profile_image: null
  };

  const handleFileChange = (e) => {
    formik.setFieldValue('profile_image', e.target.files[0]);
  };
  const fileName = localStorage.getItem('profile_image')


  const handleSubmit = async (values) => {
    try {


      const form_data = new FormData();

      if (formik.values.mentor_name.trim() !== '') {
        form_data.append('mentor_name', formik.values.mentor_name);
      }
      if (formik.values.phone_number.trim() !== '') {
        form_data.append('phone_number', formik.values.phone_number);
      }
      if (formik.values.address.trim() !== '') {
        form_data.append('address', formik.values.address);
      }
      // form_data.append('file', formData.file); 

      if (formik.values.profile_image) {

        const file_data = new FormData();
        file_data.append('media', formik.values.profile_image);
        file_data.append('service', 'mentors');

        const fileResponse = await axios.post(`${apiUrl}/api/v1/file-upload/upload`, file_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('File upload API response:', fileResponse.data.data);
        form_data.append('profile_image', fileResponse.data.data[0].name);
      }

      const token = localStorage.getItem("token");
      const response = await axios.patch(`${apiUrl}/api/v1/admin/update-mentor/${id}`, form_data, {
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  

  //form validation

  const [mentorNameError, setMentorNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleInputChange = (e) => {
    formik.handleChange(e); // Update the formik state
  
    const fieldName = e.target.name; 
  
    if (fieldName === 'mentor_name') {
      if (e.target.value.length === 0) {
        setMentorNameError('Name is required');
      } else {
        setMentorNameError('');
      }
    } else if (fieldName === 'phone_number') {
      if (e.target.value.length === 0) {
        setPhoneNumberError('Phone Number is required');
      } else {
        setPhoneNumberError('');
      }
    }
  };
  


  //   const handleDescriptionChange = (e) => {
  //   formik.handleChange(e); 

  //   if (e.target.value.length === 0) {
  //     setCategoryNameError('Category name is required');
  //   } else {
  //     setCategoryNameError(''); 
  //   }
  // };

  return (
    <>
      <PageTitle>Update Mentor</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ width: '50%' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                placeholder="Jane Doe"
                name="mentor_name"
                value={formik.values.mentor_name === 'undefined' ? '' : formik.values.mentor_name}
                onChange={handleInputChange}

              // style={{width:"50%"}}
              />
            </Label>
            {formik.touched.mentor_name && formik.errors.mentor_name ? (
              <div className="text-red-600">{formik.errors.mentor_name}</div>
            ) : null}
            {mentorNameError && <div className="text-red-600">{mentorNameError}</div>}
          </div>

          <div className="mb-4">
            <Label>
              <span>Email</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder="abc@gmail.com"
                name="email"
                value={initialValues.email}
                disabled
              />
            </Label>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}

          </div>
          <div className="mb-4">
            <Label>
              <span>Password</span>
              <Input
                type="password"
                className="mt-1 password-input"
                rows="3"
                placeholder="********"
                name="password"
                value={initialValues.password}
                disabled
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
                value={formik.values.phone_number === 'undefined' ? '' : formik.values.phone_number}
                onChange={handleInputChange}
              />
            </Label>
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="text-red-600">{formik.errors.phone_number}</div>
            ) : null}
            {phoneNumberError && <div className="text-red-600">{phoneNumberError}</div>}
          </div>
          <div className="mb-4">
            <Label>
              <span>Address</span>
              <Textarea
                className="mt-1"
                rows="3"
                placeholder=""
                name="address"
                value={formik.values.address === 'undefined' ? '' : formik.values.address}
                onChange={formik.handleChange}
              />
            </Label>
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-600">{formik.errors.address}</div>
            ) : null}
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
                  {formik.values.profile_image ? formik.values.profile_image.name : fileName === 'undefined' ? 'No file selected' : fileName}

                </div>
              </div>
            </Label>
            {formik.touched.profile_image && formik.errors.profile_image ? (
              <div className="text-red-600">{formik.errors.file}</div>
            ) : null}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={formik.isSubmitting || mentorNameError || phoneNumberError}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProject;
