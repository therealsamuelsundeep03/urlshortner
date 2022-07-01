import { useState } from "react";
import axios from "axios";

import "../css/login.css";
import "../css/loading.css";

function Login () {

    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
        errors:{
            email:"",
            password:""
        },
        touched:{
            email:false,
            password:false
        }
    })

    const [loading,setLoading] = useState(false);

    const handleChange = ({target : {name,value}}) => {
        // form validations...
        const errors = credentials.errors;

        switch(name){
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

            default : break;
        }

        setCredentials({...credentials,[name]:value,errors})
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true};
        setCredentials({...credentials,touched})
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true)

        const errors = credentials.errors;

        if(!credentials.email.length){
            setLoading(false)
            errors.email = "Enter a valid Email";
            setCredentials({...credentials,errors})
        }else if(!credentials.password.length){
            setLoading(false)
            errors.password = "Enter a valid password";
            setCredentials({...credentials,errors});
        }
        // if there are any errors then dont send the data to the backend
        const error = Object.values(credentials.errors).filter(err => err !== "");
        const notTouched = Object.values(credentials.touched).filter(err => !err);
        if(!error.length && !notTouched.length){

            // sending the data to the backend
            const {data} = await axios.post("https://denurlshortner.herokuapp.com/login",{
                email:credentials.email,
                password:credentials.password
            });
            // console.log(Object.keys(data)[0])

            if(data === "Fill all the inputs"){
                setLoading(false)
                errors.email = "Fill all the inputs";
                setCredentials({...credentials,errors});
                setCredentials({...credentials,email:"",password:""})
            }else if(data === "Email doesnt exists"){
                setLoading(false)
                errors.email = "Email Doesn't exists";
                setCredentials({...credentials,errors})
            }else if(data === "password is incorrect"){
                setLoading(false)
                errors.password = "Password is incorrect";
                setCredentials({...credentials,errors})
            }
            else if(Object.keys(data)[0] === "UserExists"){
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("username",data.UserExists);
                window.location.href = "/"
            }
        }
    }

    // console.log(credentials.touched);

    return (
        <>
           <div className="loginContainer">
               {loading ? <h3 className="loading">Loading ....</h3>: ""}
            <div className={`login ${loading ? "signinloading" : ""}`}>

                {/* form */}
                <form onSubmit={handleSubmit} className="loginform">
                    <div className="form-inp">
                        <label>Email</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="loginInp"
                        id="email"
                        />
                        <span className="errmsg">{credentials.errors.email}</span>
                    </div>

                    <div className="form-inp">
                        <label>Password</label>
                        <input 
                        className="loginInp"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <span className="errmsg">{credentials.errors.password}</span>
                    </div>

                    <div>
                        <button type="submit" className="loginSubmit">Log In</button>
                    </div>

                    <div className="hr"></div>

                    <a href="/signin" className="createlink">
                        <div className="createbutton">Create Account</div>
                    </a >
                </form>
            </div>
           </div>
        </>
    )
}

export default Login