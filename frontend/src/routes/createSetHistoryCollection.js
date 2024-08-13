import React, { useEffect, useState } from 'react'

async function createSetHistoryCollection() {
    const response = await fetch('/data')

    console.log(response)

}

export async function loader() {
  const response = await createSetHistoryCollection()
  console.log('created colelction??????')

  return null
}

export default function CreateSetHistoryCollection() {
    return <></>
}