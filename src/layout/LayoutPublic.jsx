import React from 'react'
import { Outlet, useNavigation,  } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const LayoutPublic = () => {

  const navigation = useNavigation();




  return (
    <>
      <Navbar />
      <main className='container' >
        {
          //indle, submitting, loading
          navigation.state == "loading" && (<div className = 'alert alert-info my-5'>Loading...</div>)
          

        }
        <Outlet/>
      </main>
      <footer className='container texte-center'>Footer</footer>
    </>
  )
}

export default LayoutPublic