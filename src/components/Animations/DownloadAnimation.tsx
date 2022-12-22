import React, { useEffect } from 'react'
import Lottie from 'react-lottie'
import cookingAnim from '../../assets/animations/CookingAnim.json'
import { motion } from 'framer-motion'

function DownloadAnimation({ isPaused }: { isPaused?: boolean }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const ref = React.useRef(null)

  return (
    <div
      className='download-animation ms-2'>
      <Lottie options={defaultOptions} ref={ref} />
    </div>
  )
}

export default DownloadAnimation
