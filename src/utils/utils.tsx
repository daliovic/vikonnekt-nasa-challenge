export const formatNEOs = (object: any) => {
  if (!object) return []
  const array = Object.values(object) as any
  return array[0].map((item: any) => [
    item.name,
    +item.estimated_diameter.kilometers.estimated_diameter_min,
    +item.estimated_diameter.kilometers.estimated_diameter_max,
    item.close_approach_data[0].orbiting_body,
  ])
}

export const sortByAverageDiameter = (array: any[]) => {
  if (!array) return []
  return array.sort((a: any, b: any) => (b![1] + b![2]) / 2 - (a![1] + a![2]) / 2)
}
