import "./css/verified.css";

function Verified() {
    
        return (
        <>  
            <div className="verifedContainer">
                <div className="verified">
                    <h2>You have been successfully Signed In</h2>
                    <h4>Please Log In to access hebe</h4>
                    <a href="/login"><button className="verifybutton">Log In</button></a>
                    <p>It might take few minutes to login</p>
                </div>
            </div>
        </>
    )
}

export default Verified;