import React from "react";
import Header from "../components/Header";
import { Link, useNavigate, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { loginUser } from "../utils/apis";
import { useUserContext } from "../context/userContext";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = toast.error("email required");
  } else if (!values.password) {
    errors.password = toast.error("password required");
  }
};

const Login = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const {state, dispatch} = useUserContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      const loginPromise = loginUser(values);
      toast.promise(loginPromise, {
        loading: "Logging In",
        error: <b>Failed to log user in</b>,
      });

      loginPromise
        .then((response) => {
          const {
            data: { token, userInfo, msg },
            status,
          } = response;
          if (status === 200) {
            localStorage.setItem('token', token)
            dispatch({ type: "SET_USER", user: userInfo });
          }
          navigate("/indexPage");
        })
        .catch((errorMessage) => toast.error(errorMessage));
    },
  });
  // if(token){
  //   return <Navigate to={'/indexPage'} />;
  // }
  return (
    <>
      <div className="mt-4">
        <Toaster position="top-right" reverseOrder="false"></Toaster>
        <h1 className="text-4xl text-center font-semibold text-gray-500">
          Login
        </h1>
        <form
          className="max-w-2xl mx-auto border flex flex-col items-center p-5 mt-4"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button type="submit" className="primary hover:cursor-pointer">
            Signin
          </button>
          <p className="text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to={"/register"}
              className="underline text-black hover:cursor-pointer"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
