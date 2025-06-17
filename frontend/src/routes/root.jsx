import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { getCurrentSession, getCurrentUserId, setCurrentSession } from "../functions";
import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

export async function loader({ request }){
    const user = localStorage.getItem('user')
    const url = new URL(request.url)

    console.log(user)
    if (!user && url.pathname != '/register') {
        console.log('Not logged in')
        return redirect('/register')
    }
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