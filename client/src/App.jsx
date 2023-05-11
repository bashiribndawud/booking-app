import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Login from "./Pages/Login";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./Pages/Register";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";
import Account from "./Pages/Account";
import ProfilePage from "./Pages/ProfilePage";
import PlacesPage from "./Pages/PlacesPage";
import NewPlaceForm from "./Pages/NewPlaceForm";
import BookingPage from "./Pages/BookingsPage";
import PlaceDescription from "./Pages/PlaceDescription";
import BookingsPage from "./Pages/BookingsPage";
import SingleBooking from "./Pages/SingleBooking";

axios.defaults.baseURL = "http://localhost:8000/api/";
// axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/indexPage" element={<IndexPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<NewPlaceForm />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/places/:id" element={<NewPlaceForm />} />
          <Route path="/place/:id" element={<PlaceDescription />} />
          <Route path="/account/booking/:id" element={<SingleBooking />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
