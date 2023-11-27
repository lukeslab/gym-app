import React from "react";
import MainCard from "./MainCard";
import { Link } from "react-router-dom";

export function MainCardList({ type, data, options }){

    return (
        <ul className="space-y-4">
            {data.length ? 
            
            //listItem is either a Workout or an Exercise, depending on type.
            data.map((listItem, index) => {
                return(
                    <MainCard   type={type}
                                data={{listItem, index}}
                                options={options}
                    />
                )
            }) : <p className={`no-${type}`}> You have no {type}s! Add some! </p>}
            {/* <li className={`list-item new-button new-${type}`}>
                <Link to={`./create-${type}`}> new {type} <span> + </span> </Link>
            </li> */}
            <li className="flex justify-center items-center bg-green-500 p-4">
                <span className="text-white text-lg">New Workout</span>
                <span className="text-white text-2xl ml-2">+</span>
            </li>
        </ul>
    )
}

export default MainCardList