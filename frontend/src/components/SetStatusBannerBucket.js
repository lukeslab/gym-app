import React from "react";
import SetCard from "./SetCard";

function SetStatusBannerBucket (props){
    console.log("Set Status Banner Bucket Props: ", props)
    const { children, expandState } = props;
    const status = children[0].toLowerCase() + children.slice(1)

    const { setList, setSetList } = props;
    const setsByStatus = setList.filter( set => set.status === status)
   
    const setCardProps = {
        setList,
        setSetList
    }

    function toggleBannerState(e){
        if (e.target.classList.contains('expand-state')) return
        console.log('[debug on] Toggling banner state...', e)
        document?.querySelector('.error-message')?.remove()
        try {
            const targetClasses = e.target.classList
            const targetSibling = e.target.nextSibling
    
            // The banner arrow should change only if there are list items to display.
            if (targetSibling.children.length === 0) {
                const error = new Error(`${e.target.innerText} has nothing to display.`)
                error.source = e.target
                console.log(error.source)
                throw(error)
            }
            console.log("I should be saying t his now")
    
            // Alter the state of the set-list banners
            if (e.target.innerText !== "Current Set") {
                if (targetClasses.contains('expanded')) {
                    targetClasses.remove('expanded')
                    return targetSibling.style.display = "none";
                } else {
                    targetClasses.add('expanded')
                    return targetSibling.style.display = "block";
                }
            }
        } catch (error) {

            // Create the error message element and append it to the dom.
            const errorMessageElem = document.createElement('div')
            errorMessageElem.classList.add('error-message')
            errorMessageElem.innerText = error.message
            console.log(errorMessageElem)
            document.querySelector(`.container.${expandState}`).append(errorMessageElem)
            console.error(error, error.source)
        }
    }
    
    return(
        <div className={`container ${expandState}`}>
            {   
                <div onClick={e => toggleBannerState(e)} className="container banner">
                    <div className={`expand-state ${expandState}`} ></div>
                    <span className="status"> {children} </span>
                </div>
            }
            <ul>
                {setsByStatus.map( set => <SetCard {...set} {...setCardProps} />)}
            </ul>
        </div>
    )
}

export default SetStatusBannerBucket