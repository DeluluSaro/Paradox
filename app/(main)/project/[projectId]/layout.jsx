
import React, { Suspense } from 'react'

const LayoutPage = async({children}) => {
  return (
    <div className='mx-auto '>
        <Suspense  className=""  fallback={<span className='text-3xl animate-pulse flex justify-center items-center pt-40'>Loading Projects...</span>}>
      {children}
      </Suspense>
    </div>
  )
}

export default LayoutPage
