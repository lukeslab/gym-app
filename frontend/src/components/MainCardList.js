import React from "react";
import MainCard from "./MainCard";
import { Link } from "react-router-dom";

export function MainCardList({ type, data, options }) {

    return (
        <ul className="space-y-4">
            {data.length ?

                //listItem is either a Workout or an Exercise, depending on type.
                data.map((listItem, index) => {
                    return (
                        <MainCard type={type}
                            data={{ listItem, index }}
                            options={options}
                        />
                    )
                }) : <p className={`no-${type}`}> You have no {type}s! Add some! </p>}

            <li className="flex justify-center items-center bg-green-500">
                <Link className="p-4 w-full flex justify-center align-middle" to={`./create-${type}`}>
                    <span className="text-white text-lg">New {type}</span>
                    <span className="text-white text-2xl ml-2 relative bottom-1">+</span>
                </Link>
            </li>
        </ul>
    )
}

export default MainCardList