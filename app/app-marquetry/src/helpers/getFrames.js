const getAllFrames =  async () => {
  const url = 'http://192.168.1.16:10101/api/marquetry'
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch(err) {
    console.error(err);
  }
}

export default getAllFrames