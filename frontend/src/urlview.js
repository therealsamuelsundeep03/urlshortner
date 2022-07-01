import { useState,useEffect } from "react";

import Urladmin from "./urlviewadmin";
import Urluser from "./urlviewuser";

const Urlview = () => {
  const [admin,setAdmin] = useState(false)

     useEffect(() => {
       const isLoggedIn = localStorage.getItem("isLoggedIn");
       if(isLoggedIn){
        setAdmin(true)
       }else{
        setAdmin(false)
       }
     },[])

     return (
      <>
      {
        admin ? 
            <Urladmin />
            : 
            <Urluser />
      }
      </>
    ) 
     
}

export default Urlview;


