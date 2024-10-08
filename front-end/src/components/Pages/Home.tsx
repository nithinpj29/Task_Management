import React, { useEffect, useState } from 'react'

const Home:React.FC = () => {
    const [display,setDisplay]=useState<boolean>(false);
    useEffect(()=>{
        localStorage.getItem("userToken")?setDisplay(true):setDisplay(false)
    })
  return (
    <>
    
  <h1>Home Page</h1>
    </>
  )
}

export default Home;