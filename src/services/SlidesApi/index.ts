import client from './client'

export const fetchSlides = async () => {
  const { data } = await client('/slides')

  return data
}
