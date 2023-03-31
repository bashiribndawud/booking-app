import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import IndexPage from './Pages/IndexPage'
import Login from './Pages/Login';
import './App.css'
import Layout from './components/Layout';



function App() {
  const [count, setCount] = useState(0)
  
  return (
     <Routes>
        <Route path="/" element={<Layout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/indexPage' element={<IndexPage />} />
        </Route>
     </Routes>
  );
}

export default App
