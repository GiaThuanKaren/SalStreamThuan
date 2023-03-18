import React from 'react'
import Spinner from '../Spinner'

function LoadingLayer() {
    return (
        <>
            <div className='bg-[#0000009c] fixed top-0 left-0 right-0 bottom-0 z-[10] w-screen h-screen flex items-center justify-center'>
                <Spinner />
            </div>
        </>
    )
}

export default LoadingLayer