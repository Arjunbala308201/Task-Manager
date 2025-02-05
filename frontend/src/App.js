import './App.css';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Preview } from './components/Preview';
import { AddTask } from './components/AddTask';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GuestPage } from './components/GuestPage';
import { AdminPanel } from './components/AdminPanel';

function App() {
  const[isAdmin,setIsadmin] = useState(false)
  const currenUser = useSelector(state => state.user)
  console.log(currenUser, "user present")
console.log(isAdmin,'isadmin?')
  useEffect(()=>{
    if(currenUser && currenUser.role==='admin'){
      setIsadmin(true)
      console.log('admin verified')
    }
  },[currenUser])

  return (
    <>
      <Router>
        <ToastContainer autoClose={1000}/>
        <Routes>
          <Route path='/admin' element={isAdmin&&<AdminPanel/>}/>
          <Route path='/' element={<GuestPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={currenUser ? <Home /> : <GuestPage/>} />
          <Route path="/edittask/:id" element={currenUser ? <Preview /> : <GuestPage/>} />
          <Route path="/addnew" element={currenUser ? <AddTask /> : <GuestPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
