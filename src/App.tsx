import { useEffect, useState } from 'react'
import BarChart from './components/BarChart'
import FilterForm from './components/FilterForm'
import TableView from './components/TableView'
import useAxios from './hooks/useAxios'
import { CSVLink } from 'react-csv'
import { formatNEOs, sortByAverageDiameter } from './utils/utils'
function App() {
  // useAxios is a custom hook that performs an HTTP GET request to the NASA's NEO API to retrieve today's NEOs
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `https://www.neowsapp.com/rest/v1/feed/today`,
  })
  // formattedNEOs is an array of NEOs with their name, min and max diameter, and orbit planet
  // filteredNEOs is a subset of formattedNEOs based on the selected orbital body in the filter form
  // isTableView is a boolean state variable that determines whether to render data in a table view or not

  const [formattedNEOs, setFormattedNEOs] = useState<any>(null)
  const [filteredNEOs, setFilteredNEOs] = useState<[any?] | null>(null)
  const [isTableView, setIsTableView] = useState(false)

  // selectChangeHandler is a function that updates the filteredNEOs state based on the selected orbital body
  const selectChangeHandler = (s: string) => {
    setFilteredNEOs(formattedNEOs)
    const filteredData = s !== '' ? (formattedNEOs.filter((item: any) => item![3] === s) as any) : formattedNEOs
    setFilteredNEOs(filteredData)
  }

  useEffect(() => {
    // sortByAverageDiameter and formatNEOs are utility functions that transform the API response data into an array of NEOs with their name, min and max diameter, and orbital body
    setFormattedNEOs(
      sortByAverageDiameter([
        ...formatNEOs(response?.data.near_earth_objects),
        ['(2016 OP)', 0.1754654, 0.3556465, 'Jupiter'],
      ])
    )
  }, [response])

  return (
    <div className='container py-5'>
      <h1 className='page-title mb-5'>Near Earth Objects Diameters for {new Date().toLocaleDateString()} </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!loading && !error && formattedNEOs && (
        <div>
          <div className='d-flex gap-5 align-items-center flex-wrap'>
            <FilterForm
              options={[...new Set(formattedNEOs.map((i: any) => i![3]) as string[])]}
              selectChangeHandler={selectChangeHandler}
            />
            <span>
              <input
                name='table-view'
                type='checkbox'
                className='me-2'
                onChange={(e) => setIsTableView(e.target.checked)}
              />
              <label htmlFor='table-view'>Toggle Table View</label>
            </span>
            <button className='btn btn-primary'>
              <CSVLink data={filteredNEOs ? filteredNEOs : formattedNEOs}>Download CSV</CSVLink>
            </button>
          </div>
          {isTableView ? (
            <TableView NEOs={filteredNEOs ? filteredNEOs : formattedNEOs} />
          ) : (
            <BarChart NEOs={filteredNEOs ? filteredNEOs : formattedNEOs} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
