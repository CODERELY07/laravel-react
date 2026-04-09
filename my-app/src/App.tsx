import './App.css'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import PostList from './pages/PostList'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import PostShow from './pages/PostShow'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Profile from './pages/Profile'
import { useEffect, useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(auth === "true");
    };

    checkAuth();
  }, [location]);

  return (
    <>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path='/' element={<PostList />} />
        <Route path='/show/:id' element={<PostShow />} />

        {/* --- Guest Only Routes (Redirect to Dashboard if logged in) --- */}
        <Route 
          path='/login' 
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path='/register' 
          element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
        />

        {/* --- Protected Routes (Redirect to Login if not logged in) --- */}
        <Route 
          path='/dashboard' 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/profile' 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/create' 
          element={isAuthenticated ? <PostCreate /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/edit/:id' 
          element={isAuthenticated ? <PostEdit /> : <Navigate to="/login" />} 
        />

        {/* --- 404 Catch-all --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App