import React, { useState, useRef, useEffect } from "react";

function SetCardRestDetails({data, options}){
    const { exercise } = data;
    const { setNextIsDisabled } = options;
    
    const target = useRef()
    console.log(target)

    useEffect( () => {
        const intervalId = setInterval( () => {
            target.current.innerText -= 10
            if(parseInt(target.current.innerText) <= 0) setNextIsDisabled(false)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <div>Rest Interval</div>
            <div ref={target}>{exercise.restInterval}</div>
        </>
    )
}

export default SetCardRestDetails