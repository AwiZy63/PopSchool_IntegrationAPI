import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavbarComponent from './components/NavbarComponent';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ProfilePage from './pages/ProfilePage';
import { useState } from 'react';
import PostPage from './pages/PostPage';
import { toast, ToastContainer } from 'react-toastify';

function Router() {
  const [isLogged, setIsLogged] = useState(Boolean(sessionStorage.getItem('accessToken')) || false);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || '');

  const notify = (text, type) => {
    console.log("notify called")
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      type: type || "info"
    })
  };

  return (
    <BrowserRouter>
      <NavbarComponent isLogged={isLogged} setIsLogged={setIsLogged} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage isLogged={isLogged} notify={notify} accessToken={accessToken} />} />
        {
          isLogged ?
            <Route path="/profile" element={<ProfilePage setIsLogged={setIsLogged} setAccessToken={setAccessToken} notify={notify} accessToken={accessToken} />} />
            :
            <>
              <Route path="/signup" element={<SignupPage notify={notify} />} />
              <Route path="/signin" element={<SigninPage notify={notify} setAccessToken={setAccessToken} setIsLogged={setIsLogged} />} />
            </>
        }

        <Route path="/post/:id" element={<PostPage notify={notify} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default Router;
