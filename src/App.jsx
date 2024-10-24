// App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

// Set Axios defaults
axios.defaults.baseURL = 'https://booking-backend-lake.vercel.app/?vercelToolbarCode=v-0kc7i3pvaTLb4/api';
axios.defaults.withCredentials = true; // Enable sending cookies

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account/' element={<ProfilePage />} />
        <Route path='/account/places' element={<PlacesPage />} />
        <Route path='/account/places/new' element={<PlacesFormPage />} />
        <Route path='/account/places/:id' element={<PlacesFormPage />} />
        <Route path='/place/:id' element={<PlacePage />} />
        <Route path= '/account/bookings' element= {<BookingsPage/> } />
        <Route path= '/account/bookings/:id' element= {<BookingPage/> } />
      </Route>
    </Routes>
  );
}

export default App;
