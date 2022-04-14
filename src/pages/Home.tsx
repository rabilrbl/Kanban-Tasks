import React from 'react'
import request from '../utils/api'

const Home = () => {
  return (
    <div>
      <button onClick={(e) => {
        request.get("/boards/" , {
          withCredentials: true
        })
      }}>Request</button>
    </div>
  )
}

export default Home
