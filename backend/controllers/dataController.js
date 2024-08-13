const SetHistory = require('../models/SetHistory')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
let setHistoriesData = require('../data/setHistory.json')

const getSetHistoryByExerciseId = asyncHandler( async (req, res) => {
    const { id } = req.params
    console.log('exerciseId is', id)

    const setHistory = await SetHistory.find({ exerciseId: id })

    console.log('set history is', setHistory)

    if (!setHistory || !setHistory.length) return res.status(400).json({message: "No set history found"})

    return res.json(setHistory)
})

const createSetHistoryCollection = asyncHandler( async (req, res) => {
    setHistoriesData = setHistoriesData.map( data => {
        return {
            ...data,
            date: new Date(data.date)
        }
    })
    console.log(setHistoriesData)

    try {
        const collection = await mongoose.connection.db.listCollections({name: "sethistories"}).next()
        console.log(collection)
    
        if (!collection) {
            await SetHistory.createCollection({})
            console.log('created collection')
            await SetHistory.insertMany(setHistoriesData)
            console.log('Inserted documents')
        } else {
            console.log('Collection already exists.')
        }
    } catch(error) {
        console.error(error)
    }

})

module.exports = { 
    createSetHistoryCollection,
    getSetHistoryByExerciseId
}