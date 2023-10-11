import React, { useState } from 'react';
import axios from 'axios';
import { Link , useHistory } from 'react-router-dom';
import dotenv from 'dotenv';//.././assets/img/login-office.jpeg
import ImageLight from './../../assets/img/login-office.jpeg'
import ImageDark from './../../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { useFormik } from 'formik';
import * as Yup from 'yup';
dotenv.config();


const loginSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email address')
  .required('Required'),
  password: Yup.string()
    .min(3, 'Password length should be minimum 3')
    .max(15, 'Password length should be maximum 15')
    .required('Required')
});

function Login() {
  const apiUrl = process.env.REACT_APP_API_URL || ''

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    try {
        
      const response = await axios.post(`${apiUrl}/api/v1/admin/login`, values);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.session.session_token);
        setSuccessMessage('login successful.');
        setError(null);
       
        formik.resetForm();
        history.push('/app/admin');
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
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginSchema,
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={formik.handleSubmit}>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Add onBlur to track touched state
                  />
                </Label>

                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Add onBlur to track touched state
                  />
                </Label>

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}

                <Button className="mt-4" block type="submit" onClick={formik.handleSubmit}>
                  Log in
                </Button>
              </form>

              {/* Display error message */}
              {error && (
                <div className="mt-4 text-red-600 dark:text-red-400">{error}</div>
              )}

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
