import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { getCurrentSession, getCurrentUserId, setCurrentSession } from "../functions";
import { useState, useEffect } from "react";
import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

export async function loader({ request }){
    const user = localStorage.getItem('user')
    const url = new URL(request.url)

    console.log(user)
    if (!user && url.pathname != '/login') {
        console.log('Not logged in')
        return redirect('/login')
    }
    return user
}   

export default function Root(){
    // const currentSession = useLoaderData()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const user = useLoaderData()
    
    useEffect( () => {
        if (user) setIsLoggedIn(true)
    }, [])

    return (
        <>
            {/* <Timer timer={timer} setTimer={setTimer}/> */}
            <MyStopwatch />
            <Outlet />
            {isLoggedIn &&<Nav />}
        </>
    )
}