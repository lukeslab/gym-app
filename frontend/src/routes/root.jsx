import { Outlet, useLoaderData } from "react-router-dom";
import { setCurrentSession } from "../functions";
import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

export async function loader(){
    const response = await fetch('/session/current')
    const data = await response.json();
    const currentSession = response.ok ? data : null
    
    setCurrentSession(currentSession)
   
    return currentSession
}

export default function Root(){
    const currentSession = useLoaderData()
    
    return (
        <>
            {/* <Timer timer={timer} setTimer={setTimer}/> */}
            <MyStopwatch />
            <Outlet />
            <Nav />
        </>
    )
}