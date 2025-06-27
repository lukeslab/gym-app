import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";
import MyStopwatch from "../components/Timer";
import Nav from "../components/Nav";

export default function PrivateRoute() {
	const auth = useAuth()
  console.log('auth in private route is ', auth)
	
  if(!auth.user) return <Navigate to="/login" />
	
  return (
		<>
         <MyStopwatch />
         <Outlet />
         <Nav />
		</>
	)
}