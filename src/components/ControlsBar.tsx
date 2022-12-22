import React, { useState } from 'react'
import { CSVLink } from 'react-csv'
import DownloadAnimation from './Animations/DownloadAnimation'
import FilterForm from './FilterForm'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

function ControlsBar({ options }: { options: any }) {
  const { setFilteredNEOs, setIsTableView, formattedNEOs, filteredNEOs } = options
  const [isDownloadButtonHovered, setIsDownloadButtonHovered] = useState(false)
  const [isDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false)

  // selectChangeHandler is a function that updates the filteredNEOs state based on the selected orbital body
  const selectChangeHandler = (s: string) => {
    setFilteredNEOs(formattedNEOs)
    const filteredData = s !== '' ? (formattedNEOs.filter((item: any) => item![3] === s) as any) : formattedNEOs
    setFilteredNEOs(filteredData)
  }
  return (
    <div className='d-flex gap-5 align-items-center flex-wrap controls'>
      <FilterForm
        options={[...new Set(formattedNEOs.map((i: any) => i![3]) as string[])]}
        selectChangeHandler={selectChangeHandler}
      />
      <span>
        <input name='table-view' type='checkbox' className='me-2' onChange={(e) => setIsTableView(e.target.checked)} />
        <label htmlFor='table-view'>Toggle Table View</label>
      </span>
      <CSVLink data={filteredNEOs ? filteredNEOs : formattedNEOs}>
        <motion.button
          className='btn btn-primary csv-button d-flex justify-content-center text-center'
          onMouseEnter={() => {
            setIsDownloadButtonHovered(true)
          }}
          onMouseLeave={() => {
            setIsDownloadButtonHovered(false)
            setIsDownloadButtonClicked(false)
          }}
          onClick={() => {
            setIsDownloadButtonClicked(true)
          }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}>
          <AnimatePresence mode='sync' initial={false}>
            {isDownloadButtonHovered && (
              <motion.span
                key='download-icon'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}>
                <DownloadAnimation />{' '}
              </motion.span>
            )}
            {!isDownloadButtonHovered && (
              <motion.span
                className='download'
                key='download-text'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeInOut', delay: 0.5 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 1.1, ease: 'easeInOut', delay: 0 } }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}>
                Download CSV
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </CSVLink>
    </div>
  )
}

export default ControlsBar
