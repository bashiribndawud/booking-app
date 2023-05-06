import React, {useEffect} from 'react'
import Header from '../components/Header';
import { useUserContext } from '../context/userContext';
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from 'react-router-dom';


const IndexPage = () => {
  const {state: { user }} = useUserContext()
  const token = localStorage.getItem('token')
  useEffect(() => {
    toast.success(`Welcome ${user?.name}`)
  },[])
  if(!token){
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      <Toaster position="top-right" reverseOrder="false"></Toaster>
      Index Page
    </div>
  );
}

export default IndexPage