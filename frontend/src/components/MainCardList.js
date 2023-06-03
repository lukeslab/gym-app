import React from "react";
import MainCard from "./MainCard";
import { Link } from "react-router-dom";

export function MainCardList(props){
    const { type, data, options } = props
    console.log("[debug]: MainCardList type:", type, "data: ", data, "options:", options)

    return (
        <ul className={`list ${type}-list`}>
            {data.length ? 
            
            data.map((workout, index) => {
                return(
                    <li className={`list-item ${type} ${data.title}`} key={index}>
                        <MainCard   type={type}
                                    data={workout}
                                    options={options}
                        />
                    </li>
                )
            }) : <p className={`no-${type}`}> You have no {type}! Add some! </p>}
            <li className={`list-item new-button new-${type}`}>
                <Link to={`./create-${type}`}> new {type} <span> + </span> </Link>
            </li>
        </ul>
    )
}

export default MainCardList