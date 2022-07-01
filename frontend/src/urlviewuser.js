import {Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import './css/urlview.css';

import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Urluser () {
    const [url,setUrl] = useState ('');
    const [table,showTable] = useState (false);
    const [err,SetErr] = useState('');
    const [listOfURL,setListOfURL] = useState([]);
  
    const handleChange = ({target : {value}}) => {
  
      // setting error validations
      const error = !value ? "Please Enter A Valid URL" : ""
      SetErr(error);
  
      setUrl(value)
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      setUrl("")
      if(!err){
        try{
          let {data} = await axios.post("https://denurlshortner.herokuapp.com/",{"fullUrl":url});
          console.log(data)
          if(data.status === "success"){
            setListOfURL([data.data]);
            showTable(true)
          }else if(data === "Please Enter A Valid URL"){
            SetErr("Please Enter A Valid URL");
          }
        }
        catch(err){
          SetErr(err.msg)
        }
      }
    }
    // console.log(listOfURL)
    return (
      <>
        <div className="app">
          <div className="shorturl">
  
          <div className="loginurl">To discover more features, Please 
            <a href="/login">Login</a>
          </div>
  
          {/* form for submitting the url... */}
          <form action='/shorturl' onSubmit={handleSubmit}>
            <div className="urlinput">
                <input type="url" name = "fullUrl" placeholder="URL..." value={url} onChange={handleChange}/>
                <button type="submit">SHORT URL</button>
            </div>
          </form>
  
          {/* error */}
          <span className="err">{err}</span>
  
          {/* table */}
          {table && (
            <Table stripped bordered md={4}>
              <thead>
                <tr>
                  <th>Full url</th>
                  <th>Short url</th>
                </tr>
              </thead>
              <tbody>
              {listOfURL.map(({fullurl,shorturl})=>{
                  return(
                      <>
                          <tr>
                              <td><a href={fullurl} target="_blank">{fullurl}</a></td>
                              <td><a target="_blank" href={fullurl} onClick={()=>{<Redirect to={fullurl} />}}>{shorturl}</a></td>
                          </tr>
                      </>
                  )
              })}
            </tbody>
            </Table>
          )}
          </div>
        </div>
      </>
    ) 
}

export default  Urluser;