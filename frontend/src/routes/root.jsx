import { Outlet } from "react-router-dom";
import { getCurrentSession, setCurrentSession } from "../functions";

import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

function Root(){
    const initialSession = {
        title: null, 
        id: null
    }
    
    if (!getCurrentSession()) setCurrentSession(initialSession)

    return (
        <div className="app-container">
            {/* <Timer timer={timer} setTimer={setTimer}/> */}
            <MyStopwatch />
            <Outlet />
            <Nav />
        </div>
    )
}

export default Root