import React from 'react'

function Footer({ variant = "default" }) {
  if (variant === "home")
    return (
      <footer className='bg-gray-800 text-white text-center py-6 mt-10'>
        <p>&copy; 2025 HungerHub. All Rights Reserved</p>
        <p>Contact: hungerhub@gmail.com</p>
      </footer>
    )

  return (
    <footer className='text-center py-6 mt-10'>
      <p>&copy; 2025 <span style={{color:"red"}}>HungerHub</span> . All Rights Reserved</p>
    </footer>
  )
}

export default Footer