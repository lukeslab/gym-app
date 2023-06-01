import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentSession, setCurrentSession } from "../functions";

import Timer from "../components/Timer";
import Nav from "../components/Nav";

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