import React from 'react'
import "../assets/error.css"
const Error = () => {
    return (
        <div id='err' className='d-flex flex-column w-100 justify-content-center text-center px-5'>
            <a href="//www.google.com/"><span id="logo" aria-label="Google"></span></a>
            <p><b>404</b></p>
            <p>Not Found</p>
            {/* <p><ins>That’s all we know.</ins></p> */}
        </div>
    )
}

export default Error