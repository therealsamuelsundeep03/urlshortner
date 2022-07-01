import { useState } from "react";
import axios from "axios"

import "../css/signin.css"
import Loading from "../loading-state.json";
import "../css/loading.css"

function Signin () {

    const [credentials,setCredentials] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        errors:{
            username:"",
            email:"",
            password:"",
            confirmpassword:"",
        },
        touched:{
            username:false,
            email:false,
            password:false,
            confirmpassword:false,
        }
    });

    const [loading,setLoading] = useState(false);

    const handleChange = ({target : {name,value}}) => {
        // form validations...
        const errors = credentials.errors;

        switch(name){
            case "username" : 
                if(value.length < 3 || value.length > 40){
                    errors.username  = "username must be between 3 to 40 characters";
                    break;
                }
                else{
                    errors.username = "";
                    break;
                }

            case "email" : 
                errors.email = !value ? "Enter a valid Email ID" : "";
                break;

            case "password" : 
                if(value.length < 5 || value.length > 35){
                    errors.password  = "password must be between 5 to 35 characters";
                    break;
                }
                else{
                    errors.password = "";
                    break;
                }
                
            case "confirmpassword" : 
                if(value !== credentials.password){
                    errors.confirmpassword  = "password doesn't match";
                    break;
                }
                else{
                    errors.confirmpassword = "";
                    break;
                }

            default : break;
        }

        setCredentials({...credentials,[name]:value,errors})
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true};
        setCredentials({...credentials,touched})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        const errors = Object.values(credentials.errors).filter( err => err !== "");
        const notTouched = Object.values(credentials.touched).filter(err => !err);
        
        if(credentials.username && credentials.email && credentials.password && credentials.confirmpassword){{
            // if there are no errors then send the form to the backend
            if(!errors.length && !notTouched.length){
                const newUser = {
                    username : credentials.username,
                    email : credentials.email,
                    password : credentials.password,
                }

                const { data } = await axios.post("https://denurlshortner.herokuapp.com/signin",{
                    ...newUser
                });

                console.log(data);

                const errors = credentials.errors;

                if(data === "user exists"){

                    // if the user exists then send an error message
                    setLoading(false);
                    errors.email = "User Exists With This Email";
                    setCredentials({...credentials,errors});
                }else if(data === "Fill all inputs"){

                    // if feilds are missing then send an error message
                    setLoading(false);
                    errors.username = "Fill All Inputs";
                    setCredentials({...credentials,errors});
                }else if(data === "check in email"){

                    // if all the validations are send valid then send an error message 
                    alert("Please check in the mail in the name Hebe to Sign In");
                    window.open("about:blank", "_self");
                    window.close();
                }
            }

            }
        }else{
            setLoading(false)
            const errors = credentials.errors;
            errors.username = "Fill All The Inputs";
            setCredentials({...credentials,errors});
        }
    }
    console.log(loading)
    return (
        <div className = "signinContainer" >
            {loading ? <div className="loading">Loading...</div>: ""}
            <div className={`  ${loading ? "signinloading" : "signin"}`}>
                 {/* form */}
                 <form onSubmit={handleSubmit} className="loginform">
                 <div className="form-inp">
                        <label>Username</label>
                        <input 
                        type="text"
                        name="username"
                        placeholder="usename"
                        value={credentials.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="signinInp"
                        // id="email"
                        />
                        <span className="errmsg">{credentials.errors.username}</span>
                    </div>

                    <div className="form-inp">
                        <label>Email</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="signinInp"
                        id="email"
                        />
                        <span className="errmsg">{credentials.errors.email}</span>
                    </div>

                    <div className="form-inp">
                        <label>Password</label>
                        <input 
                        className="signinInp"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <span className="errmsg" >{credentials.errors.password}</span>
                    </div>

                    <div className="form-inp" style={{marginTop:'1.4rem'}}>
                        <label>Confirm Password</label>
                        <input 
                        className="signinInp"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        value={credentials.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <span className="errmsg">{credentials.errors.confirmpassword}</span>
                    </div>

                    <div>
                        <button type="submit" className="signinSubmit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>        
    )
}

export default Signin