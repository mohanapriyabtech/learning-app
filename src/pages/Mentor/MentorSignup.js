import React, { useState } from 'react';
import axios from 'axios';
import { Link , useHistory } from 'react-router-dom';
import ImageLight from '../../assets/img/create-account-office.jpeg'
import ImageDark from '../../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
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
  })

function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    mentor_name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
    try {
      const form_data = new FormData();
      form_data.append('mentor_name', formik.values.mentor_name);
      form_data.append('email', formik.values.email);
      form_data.append('phone_number', formik.values.phone_number);
      form_data.append('password', formik.values.password);
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:4000/api/v1/mentor/signup', form_data,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

     
      if (response.status === 200) {
        setSuccessMessage('Registration successful.');
        setError(null);
        formik.resetForm();
        history.push("/app/mentor/dashboard")

        // Redirect to the login page
        // history.push('/login');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const formik = useFormik({
    initialValues:formData,
    validationSchema: SignupSchema,
    onSubmit: handleSubmit, 
  });

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <Label className="mt-4">
                  <span>Name</span>
                  <Input
                    className="mt-1"
                    placeholder="John"
                    type="text"
                    name="mentor_name"
                    value={formik.values.mentor_name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.mentor_name && formik.errors.mentor_name ? (
                    <div className="text-red-600">{formik.errors.mentor_name}</div>
                  ) : null}
                </Label>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                </Label>
                <Label className="mt-4">
                  <span>Mobile Number</span>
                  <Input
                    className="mt-1"
                    placeholder="0000000000"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone_number && formik.errors.phone_number ? (
                    <div className="text-red-600">{formik.errors.phone_number}</div>
                  ) : null}
                </Label>

                <Label className="mt-6" check>
                  <Input type="checkbox" {...formik.getFieldProps('agree')} />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button type="submit" block className="mt-4"onClick={handleSubmit} >
                  Create account
                </Button>
              </form>
              {error && (
                <div className="mt-4 text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="mt-4 text-green-600 dark:text-green-400">
                  {successMessage}
                </div>
              )}


              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/mentor/dashboard/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Signup
