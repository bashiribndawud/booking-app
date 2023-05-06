import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import IndexPage from './Pages/IndexPage'
import Login from './Pages/Login';
import './App.css'
import Layout from './components/Layout';
import Register from './Pages/Register';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
import Account from './Pages/Account';


axios.defaults.baseURL = "http://localhost:8000/api/"
// axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/indexPage" element={<IndexPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage?/:actionOrId?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
