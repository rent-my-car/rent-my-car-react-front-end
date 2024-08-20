import React , { useEffect, useState } from "react";
const Test = () =>
{
    const [user, setUser] = useState({});
   
    console.log(user);
   
    useEffect( () =>{
        setUser({type:"Fiat", model:"500", color:"white"});
    }, []
        

    );
    
    return (
        <>
            <h2>{user.type}</h2>
            <h1>Valid Test</h1>
        </>
    );
}
export default Test;