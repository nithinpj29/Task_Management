import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Pages/Login/Login';
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('userToken'));
  const [logout,setLogOut]=useState(false)
  useEffect(()=>{
   // Check if the token exists when the component mounts
  if (localStorage.getItem('userToken')) {
    setIsLoggedIn(true);
  }

  },[])

  const handleLogin = () => {
    setIsLoggedIn(true);  // Set login state when user logs in
  };
  const handleLogout = () => {
  localStorage.removeItem('userToken');
  //localStorage.removeItem('user')
  setIsLoggedIn(false); // Reset login state when user logs out
};

    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                  <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/create-task" element={<TaskForm />} />
                        <Route path="/edit-task/:id" element={<TaskForm />} />
                        <Route path='/login' element={<Login onLogin={handleLogin} />}  />  
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
