import React from "react";
import { Outlet } from "react-router-dom";

const fakeAuth = () => new Promise( (resolve) => {
    setTimeout( () => resolve("2342f2f1d131rf12"), 250);
})


export default function AuthLayout() {
    return (
        <>
            <p> this a test</p>
            <Outlet />
        </>
    )
}