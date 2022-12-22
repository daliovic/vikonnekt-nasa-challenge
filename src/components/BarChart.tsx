import React from 'react'

import { motion } from 'framer-motion'
import Chart from 'react-google-charts'
export default function BarChart({ NEOs }: { NEOs: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}>
      <Chart
        chartType='BarChart'
        data={[['Name', 'Max Est Diameter', 'Min Est Diameter'], ...NEOs?.map((i: any) => [i![0], i![1], i![2]])]}
        options={{
          title: 'NEOs Estimated Diameters',
          animation: {
            duration: 1000,
            easing: 'out',
            startup: true,
          },
        }}
        width='99%'
        height='600px'
        legendToggle
      />
    </motion.div>
  )
}
