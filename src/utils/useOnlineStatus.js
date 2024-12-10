import { useEffect, useState } from "react";


const useOnlineStatus = () =>{
    const [onlneStatus, setOnlineStatus]= useState(true);


    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setOnlineStatus(false);
        });
        window.addEventListener("online",()=>{
            setOnlineStatus(true);
        });
    },[])



    return onlneStatus;
}
export default useOnlineStatus;