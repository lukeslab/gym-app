import { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import Timer from "../components/Timer";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { getCurrentSession, setCurrentSession } from "../functions";
const initialSession = {
    title: null, 
    id: null
}

export default function Root(){
    if (!getCurrentSession()) setCurrentSession(initialSession)

    const [ timer, setTimer ] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
        isPaused: true,
        display: 'flex'
      });

    return (
        <>
            <Timer timer={timer} setTimer={setTimer}/>
            <Outlet />
            <Nav />
        </>
    )
}