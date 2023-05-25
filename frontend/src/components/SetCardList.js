import React, { useState } from "react";
import SetStatusBannerBucket from "./SetStatusBannerBucket";

function SetCardList(props){ 
    console.log("[debug on] SetCardList Props: ", props)
    const { exercises } = props

    const defaultSetList = []

    //create set list
    exercises.forEach( (exercise, index) => {
        const { _id, target:{ sets } } = exercise
        console.log(exercise)
        for (let setNumber = 1; setNumber <= sets; setNumber++) {
            if (setNumber === 1 && index === 0) {
                defaultSetList.push({exercise, setNumber, status:"current"})
            } else {
                defaultSetList.push({exercise, setNumber, status:"next"})
            }
        }
    })
    
    const [ setList, setSetList ] = useState(defaultSetList)
    

    // Create a library of easy-to-read functions such as isFirst() ... i'll come back

  

    const SetStatusBannerBucketProps = {
        setList,
        setSetList,
        ...props
    }

    console.log('this is setlist', setList)
    return (
        <section className="container set-list">
            <SetStatusBannerBucket key={'completed'} expandState="collapsed" {...SetStatusBannerBucketProps}>Completed</SetStatusBannerBucket>
            <SetStatusBannerBucket key={'current'} expandState="none" {...SetStatusBannerBucketProps}>Current</SetStatusBannerBucket>
            <SetStatusBannerBucket key={'next'} expandState="expanded" {...SetStatusBannerBucketProps}>Next</SetStatusBannerBucket>
        </section>
    )
}

export default SetCardList