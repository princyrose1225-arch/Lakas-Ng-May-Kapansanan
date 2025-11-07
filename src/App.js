import logo from './logo.svg';
import './App.css';
import { LoginSignup } from './Components/LogInSignup/LoginSignup';
import { DashBoard } from './Components/Dashboard/DashBoard';
import { useState } from 'react';


function App() {
  const adminUser ={
    username: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name:"",username:""});
  const [error, setError] = useState("");

  const LogIn = details =>{
    console.log(details);
  }

  const LogOut = details =>{
    console.log("LogOutdetails");
  }

  return (
    <div>
      <LoginSignup/>
    </div>
  );
}

export default App;
