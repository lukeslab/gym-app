import React, { useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { getReadableDate } from '../functions';
// const data = [
//     {name: 'Page A', uv: 400, pv: 2400, amt: 1200},
//     {name: 'Page B', uv: 400, pv: 2400, amt: 1600},
//     {name: 'Page C', uv: 400, pv: 2400, amt: 2300}
// ];

// const renderLineChart = (
//   <LineChart width={600} height={300} data={data}>
//     <Line type="monotone" dataKey="amt" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="name" />
//     <YAxis />
//   </LineChart>
// );



export default function ExerciseCardChart({exerciseId}) {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      console.log(exerciseId)
      const response = await fetch(`/data/${exerciseId}`)
  
      if (!response.ok) throw {message: 'Failed to get setHistory'}
  
      let setHistory = await response.json()

      setHistory = setHistory.map( set => {
        const newDate = getReadableDate(set.date)
        console.log(newDate)

        return {
          ...set,
          date: newDate,
        }
      })
      console.log('set history is ', setHistory)
      setData(setHistory)
    })()
  }, [])
  console.log('sethistory is ', data)

  const renderLineChart = (
    <LineChart width={300} height={125} data={data} margin={{top: 5, bottom: 5, right: 5, left: 0}}>
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      <Line type="monotone" dataKey="reps" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="4 2 1" />
      {/* <XAxis dataKey="date" /> */}
      <YAxis />
      <Legend />
    </LineChart>
  );


  return renderLineChart
}