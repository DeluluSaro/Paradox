import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center items-center pt-10">
      {children}
    </div>
  )
}

export default AuthLayout
