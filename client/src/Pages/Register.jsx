import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { RegisterValidate } from "../utils/validator";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/apis";
import axios from "axios";

const Register = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: RegisterValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("Register");
        const registerPromise = registerUser(values);
        toast.promise(registerPromise, {
          loading: "Registering...",
          success: <b>Registration successful</b>,
          error: <b>Could not register user</b>,
        });

        registerPromise.then(function(){ navigate("/login")})
            .catch(errorMessage => toast.error(errorMessage))
    },
  });
  if(token){
    return <Navigate to={'/indexPage'} />
  }
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
            type="text"
            name="name"
            id=""
            placeholder="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
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
          <button type="submit" className="primary">
            Signin
          </button>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="underline text-black hover:cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
