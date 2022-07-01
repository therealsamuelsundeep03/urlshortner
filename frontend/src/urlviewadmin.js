import { useState,useEffect } from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrashCan } from "@fortawesome/free-solid-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

import "./css/urladmin.css";

function Urladmin () {
    const [url,setUrl] = useState('');
    const [err,setErr] = useState('');
    const [table,setTable] = useState([]);
    const [existingUrl,setExistingUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            let {data} =await axios.get("https://denurlshortner.herokuapp.com/");
            if(data.status === "success"){
                setTable(data.data);
            }
        }
        fetchData();
    },[])

    const handleChange= ({target : {value}}) => {
        // setting error validations
        const error = !value ? "Please Enter A Valid URL" : ""
        setErr(error);
    
        setUrl(value)
    }

    const handleDelete = async(id) => {
       const urls = table.filter(url => {
        return url._id !== id 
       });
       setTable(urls);
       await axios.delete(`https://denurlshortner.herokuapp.com/${id}`);
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        try{
            let {data} = await axios.post("https://denurlshortner.herokuapp.com/",{"fullUrl":url});
            console.log(data)
            if(data.exists==="yes"){
                const urlexists = table.findIndex(url => {
                    return url._id === data.data._id
                });
            }else{
                const urls = [...table];
                urls.push(data.data);
                setTable(urls);
            }
            setUrl('')

        }catch(err){
            console.log(err);
        }
    }

    const signout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href="/";
    }

    return (
        <>
         <div className="urlAdminContainer">
            <div className="urlAdmin">
                <button className="signout" onClick={signout}>Sign Out</button>

                {/* form for submitting the url... */}
                <form action='/shorturl' onSubmit={handleSubmit}>
                    <div className="urlinput">
                        <input type="url" name = "fullUrl" placeholder="URL..." value={url} onChange={handleChange}/>
                        <button type="submit">SHORT URL</button>
                    </div>
                </form>

                {/* error */}
                 <span className="adminerr">{err}</span>

                 {/* table */}
                 <Table stripped bordered md={4}>
                    <thead>
                        <tr>
                            <th>Full url</th>
                            <th>Short url</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {table.map(({_id,fullurl,shorturl})=>{
                        return(
                            <>
                                <tr>
                                    <td><a href={fullurl} target="_blank">{fullurl}</a></td>
                                    <td><a target="_blank" href={fullurl} onClick={()=>{<Redirect to={fullurl} />}}>{shorturl}</a></td>
                                    <td>
                                        <div className="trashicon" onClick={() => {handleDelete(_id)}}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
         </div>
        </>
    )
}
export default Urladmin;