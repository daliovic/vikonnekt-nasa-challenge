import React from 'react'

function FilterForm({ options, selectChangeHandler }: { options: string[]; selectChangeHandler: (s: string) => void }) {
  return (
    <div className='col-3'>
      <div className=''>
        <select
          className='form-select'
          onChange={(e) => {
            e.target.value !== 'Select an orbiting body' ? selectChangeHandler(e.target.value) : selectChangeHandler('')
          }}>
          <option onClick={(e) => e.preventDefault()}>Select an orbiting body</option>
          {options.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterForm
