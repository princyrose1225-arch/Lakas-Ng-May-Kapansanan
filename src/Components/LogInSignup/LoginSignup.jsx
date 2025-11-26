import React, { act, useEffect, useState, useNavigate } from 'react'
import './LoginSignup.css'
import { DashBoard } from '../Dashboard/DashBoard';
import Image from '../Assets/logo.png';


export const LoginSignup = () => {

  const [pageTitle, setPageTitle] = useState("Log In");

  useEffect(()=>{
    document.title = pageTitle;
  },[pageTitle]);

  const [action, setAction] = useState("LOG IN");

  /* function LogIn_Acc({}){
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = () =>{
      if (user === "admin" && pw === "admin"){
        setIsLoggedIn*(true);
        navigate();
      } else {
        alert("Incorrect Username or Password!");
      };
    }
  }*/

  return (      
    <>
    <div className="bg_logo">
      <img src={Image} alt=""></img>
    </div>
    
    <div className="container">
        <div className="header">
         <div className="text"><h2>{action}</h2></div> 
        </div>

        <div className="inputs">
            {action==="SIGN UP"?<div></div>: 
            <div className="input">
            <input type="text" name="username" placeholder='Username'/>
            </div>
          }
            {action==="SIGN UP"?<div></div>: 
            <div className="input">
            <input type="password" name="password" placeholder='Password'/>
            </div>
          }
          {action==="LOG IN"?<div></div>: 
            <div className="input">
            <input type="text" name="First Name" placeholder='First Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Middle Name" placeholder='Middle Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="text" name="Last Name" placeholder='Last Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Email Address" placeholder='Email Address' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Contact Number" placeholder='Contact Number' />
            </div>
          }

          {action==="SIGN UP"?<div></div>:
          <div className="submit-container">
            <div className={action==="LOG IN"?"submit gray":"submit"} onClick={()=>{setAction("SIGN UP");setPageTitle("Sign Up");}}>Sign Up</div>
            <div className={action==="SIGN UP"?"submit gray":"submit"} onClick={()=>{setAction("LOG IN"); }}>Log In</div>
          </div>
          }
          {action==="LOG IN"?<div></div>:
          <div className="submitcontainer_sgn">
            <div className={action==="LOG IN"?"submit_sgn gray":"submit_sgn"} onClick={()=>{setAction("SIGN UP")}}>Sign Up</div>
          </div>
          }
          {action==="SIGN UP"?<div></div>:
            <div className="forgotPw">
            <button type="button" class="forgotPw-btn">Forgot Password?</button>
          </div>
          }
          {action==="LOG IN"?<div></div>:
            <div className="forgotPw">
            <button type="button" class="forgotPw-btn" onClick={()=>{setAction("LOG IN");setPageTitle("Log In");}}>Already have an account?</button>
          </div>
          }
        </div>
      </div>
      </>
  )
}
