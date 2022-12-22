import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function TableView({ NEOs }: { NEOs: any }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className=' mt-5'>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th className='col-1'>#</th>
            <th className='col-3'>NEO Name</th>
            <th className='col-3'>Min Estimated Diameter</th>
            <th className='col-3'>Max Estimated Diameter</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {NEOs.map((item: any, i: number) => {
              return (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={item[0]}>
                  <td>{i}</td>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  )
}

export default TableView
