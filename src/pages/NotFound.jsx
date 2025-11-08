import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const NotFound = () => {

    const error = useRouteError();
    console.log(error);
  return (
    <div>
        <h1>4001</h1>
        <p>Page not found</p>
        <p>{error.stateText || error.message}</p>
        <Link to='/'>Back to home</Link>
    </div>
  )
}

export default NotFound