import React, { useState } from 'react';
import axios from 'axios';
import { Link , useHistory } from 'react-router-dom';
import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Password length should be minimum 3')
    .max(15, 'Password length should be maximum 15')
    .required('Required'),
});

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    // e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', values);

     
      if (response.status === 200) {
       
        setSuccessMessage('Registration successful.');
        setError(null);
       
        formik.resetForm();
        history.push("/login")

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
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit, // Reference the handleSubmit function here
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
                    name="name"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
                  ) : null}
                </Label>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    name="email"
                    {...formik.getFieldProps('email')}
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
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                </Label>
                <Label className="mt-6" check>
                  <Input type="checkbox" {...formik.getFieldProps('agree')} />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button type="submit" block className="mt-4">
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

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
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

export default Login
