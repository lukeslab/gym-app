import { Outlet, useLoaderData } from "react-router-dom";
import { setCurrentSession } from "../functions";
import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

export async function loader(){
    return null
}

export default function Root(){
    // const currentSession = useLoaderData()
    
    return (
        <>
            {/* <Timer timer={timer} setTimer={setTimer}/> */}
            <MyStopwatch />
            <Outlet />
            <Nav />
        </>
    )
}