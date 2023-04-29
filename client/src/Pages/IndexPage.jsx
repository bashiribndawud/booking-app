import React, {useEffect} from 'react'
import Header from '../components/Header';
import { useUserContext } from '../context/userContext';
import toast, { Toaster } from "react-hot-toast";


const IndexPage = () => {
  const {state: { user }} = useUserContext()
  useEffect(() => {
    toast.success(`Welcome aboard ${user?.name}`)
  },[])
  return (
    <div>
      <Toaster position="top-right" reverseOrder="false"></Toaster>
      Index Page
    </div>
  );
}

export default IndexPage