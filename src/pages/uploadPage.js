import React, { useState, useEffect , useRef  } from 'react';
import { useHistory } from 'react-router-dom';
import PageTitle from '../components/Typography/PageTitle';
import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modals from "../pages/Modals"



function uploadPage() {
//   const history = useHistory();
//   const [showSuccessModal, setShowSuccessModal] = useState(false); 
//   const [modalMessage, setModalMessage] = useState(''); 

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//     history.push('/app/projects');
//   };

//   let {id}  = useParams();

//   const initialValues = {
//     name: localStorage.getItem('projectName') || '',
//     description: localStorage.getItem('projectDescription') || '', 
//     file:null, 
//   };

//   const handleFileChange = (e) => {
//     formik.setFieldValue('file', e.target.files[0]);
//   };

//   const handleSubmit = async (values) => {
//     try {
    //   console.log(id);
    //   const form_data = new FormData();
    //   form_data.append('file', values.file);

    //   const file_data = new FormData();
    //   file_data.append('media', formik.values.file);
    //   file_data.append('service', 'users');
  
    //   const fileResponse = await axios.post('http://localhost:3000/api/v1/file-upload/upload', file_data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
  
    //   console.log('File upload API response:', fileResponse.data.data);
  
    //   form_data.append('file_url', fileResponse.data.data[0].name);
    //   if (fileResponse.status === 200) {
    //     history.push()
    //   }

    //   // const token = localStorage.getItem("token");
    //   // const response = await axios.patch(`http://localhost:3000/api/v1/user/update-project/${id}`, form_data, {
    //   //   headers: {
    //   //     'Content-Type': 'multipart/form-data',
    //   //     Authorization: `Bearer ${token}`
    //   //   },
    //   // });
  
    //   // console.log('Form submission API response:', response.data.data);

    //   // if (response.status === 200) {
  
    //   //     formik.resetForm();
    //   //     setModalMessage('Project file updated successfully!'); 
    //   //     setShowSuccessModal(true); 
        
    //   // }
    // } catch (error) {
    //   console.error('API error:', error);
    // }
   
//   };

//   const fileName = localStorage.getItem('fileUrl')

  
//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: validationSchema,
//     onSubmit: handleSubmit,
//   });
  

  return (
    <>
    <div></div>
    <div></div>
    <div></div>
    
    </>
  );
}

export default uploadPage;
