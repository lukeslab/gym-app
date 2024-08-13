const SetHistory = require('../models/SetHistory')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const createSetHistoryCollection = asyncHandler( async (req, res) => {
    const sampleData = [
        { 
            date: new Date("August 12, 2024 23:11:30"),
            userId: "63c704a14822fbc0975a9fa7",
            exerciseId: "6461a995d83cb17dfa407d8c",
            setNumber: 1,
            actuals: {
                reps: 10,
                weight: 20
            }
        },
        { 
            date: new Date("August 12, 2024 23:14:43"),
            userId: "63c704a14822fbc0975a9fa7",
            exerciseId: "6461a995d83cb17dfa407d8c",
            setNumber: 2,
            actuals: {
                reps: 10,
                weight: 20
            }
        },
        { 
            date: new Date("August 12, 2024 23:17:24"),
            userId: "63c704a14822fbc0975a9fa7",
            exerciseId: "6461a995d83cb17dfa407d8c",
            setNumber: 3,
            actuals: {
                reps: 7,
                weight: 20
            }
        }
    ]

    try {
        const collection = await mongoose.connection.db.listCollections({name: "sethistories"}).next()
        console.log(collection)
    
        if (!collection) {
            await SetHistory.createCollection({})
            console.log('created collection')
            await SetHistory.insertMany(sampleData)
            console.log('Inserted documents')
        } else {
            console.log('Collection already exists.')
        }
    } catch(error) {
        console.error(error)
    }


    // console.log(response)

})

module.exports = { createSetHistoryCollection }