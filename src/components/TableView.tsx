import React from 'react'

function TableView({ NEOs }: { NEOs: any }) {
  return (
    <div className=' mt-5'>
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
            {NEOs.map((item: any, i: number) => {
              return (
                <tr key={item[0]}>
                  <td>{i}</td>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TableView
