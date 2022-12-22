import React from 'react'

import Chart from 'react-google-charts'
export default function BarChart({ NEOs }: { NEOs: any }) {
  return (
    <div>
      <Chart
        chartType='BarChart'
        data={[
          ['Name', 'Max Est Diameter', 'Min Est Diameter'],
          ...NEOs?.map((i: any) => [i![0], i![1], i![2]]),
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
    </div>
  )
}
