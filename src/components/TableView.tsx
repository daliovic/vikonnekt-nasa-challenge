import React from 'react'
import { motion } from 'framer-motion'

function TableView({ NEOs }: { NEOs: any }) {
  const rowVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        ease: 'easeInOut',
        duration:0.5
      },
    }),
  }
  return (
    <motion.div
      className=' mt-5'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}>
      <table className='table '>
        <thead>
          <tr>
            <th className='col-1'>#</th>
            <th className='col-3'>NEO Name</th>
            <th className='col-3'>Min Estimated Diameter</th>
            <th className='col-3'>Max Estimated Diameter</th>
          </tr>
        </thead>
        <tbody>
          {NEOs.map((item: any, i: number) => {
            return (
              <motion.tr variants={rowVariants} custom={i} initial='hidden' animate='visible' key={item[0]}>
                <td>{i}</td>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </motion.div>
  )
}

export default TableView
