import React, { useEffect, useState } from 'react'

async function createSetHistoryCollection() {
    const response = await fetch('/data/seed')

    console.log(response)

}

export async function loader() {
  const response = await createSetHistoryCollection()
  return null
}

export default function CreateSetHistoryCollection() {
    return <></>
}