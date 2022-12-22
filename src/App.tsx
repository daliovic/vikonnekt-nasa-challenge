import { useEffect, useState } from 'react'
import BarChart from './components/BarChart'
import FilterForm from './components/FilterForm'
import useAxios from './hooks/useAxios'
import { formatNEOs, sortByAverageDiameter } from './utils/utils'
function App() {
  // useAxios is a custom hook that performs an HTTP GET request to the NASA's NEO API to retrieve today's NEOs
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `https://www.neowsapp.com/rest/v1/feed/today`,
  })
  // formattedNEOs is an array of NEOs with their name, min and max diameter, and orbit planet
  // filteredNEOs is a subset of formattedNEOs based on the selected orbital body in the filter form
  const [formattedNEOs, setFormattedNEOs] = useState<any>(null)
  const [filteredNEOs, setFilteredNEOs] = useState<[any?] | null>(null)

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
      <h1 className='page-title'>Near Earth Objects Diameters for {new Date().toLocaleDateString()} </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!loading && !error && formattedNEOs && (
        <div>
          <FilterForm
            options={[...new Set(formattedNEOs.map((i: any) => i![3]) as string[])]}
            selectChangeHandler={selectChangeHandler}
          />
          <BarChart formattedNEOs={filteredNEOs ? filteredNEOs : formattedNEOs} />
        </div>
      )}
    </div>
  )
}

export default App
