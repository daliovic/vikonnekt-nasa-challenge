import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import useAxios from './hooks/useAxios'
import { formatNEOs, sortByAverageDiameter } from './utils/utils'
function App() {
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `https://www.neowsapp.com/rest/v1/feed/today`,
  })

  const [formattedNEOs, setFormattedNEOs] = useState<any>(null)

  useEffect(() => {
    setFormattedNEOs(sortByAverageDiameter(formatNEOs(response?.data.near_earth_objects)))
  }, [response])

  return (
    <div className='container py-5'>
      <h1 className='page-title'>Near Earth Objects Diameters for {new Date().toLocaleDateString()} </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!loading && !error && formattedNEOs && (
        <Chart
          chartType='BarChart'
          data={[
            ['Name', 'Max Est Diameter', 'Min Est Diameter'],
            ...formattedNEOs?.map((i: any) => [i![0], i![1], i![2]]),
          ]}
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
      )}
    </div>
  )
}

export default App
