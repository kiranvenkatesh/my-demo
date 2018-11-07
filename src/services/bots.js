const retrieve = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true
      })
    }, 1200)
  })

export async function mockService() {
  const result = await retrieve()
  return result
}
