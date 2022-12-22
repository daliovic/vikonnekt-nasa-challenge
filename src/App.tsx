import { useEffect, useState } from 'react'
import BarChart from './components/BarChart'
import FilterForm from './components/FilterForm'
import TableView from './components/TableView'
import useAxios from './hooks/useAxios'
import { CSVLink } from 'react-csv'
import { formatNEOs, sortByAverageDiameter } from './utils/utils'
import { motion, AnimatePresence } from 'framer-motion'
import DownloadAnimation from './components/Animations/DownloadAnimation'
import ControlsBar from './components/ControlsBar'
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
          <ControlsBar options={{ setFilteredNEOs, setIsTableView, formattedNEOs, filteredNEOs }} />
          <AnimatePresence mode='wait' presenceAffectsLayout={true}>
            {isTableView && <TableView NEOs={filteredNEOs ? filteredNEOs : formattedNEOs} key='TableView' />}
            {!isTableView && <BarChart NEOs={filteredNEOs ? filteredNEOs : formattedNEOs} key='BarChart' />}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default App
