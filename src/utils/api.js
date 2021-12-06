const BASE_URL = 'http://localhost:3000'

const callApi = async ({ method, params, data }) => {
  const option = {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  }
  if (method === "GET") delete option.body
  try {
    const response = await fetch(`${BASE_URL}${params}`, option)
    const data = await response.json()
    if (response.status === 200) {
      return data
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

// const apiPost = async (params, body) => {
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8"
//     },
//     body: JSON.stringify(body)
//   }
//   try {
//     const response = await fetch(`${BASE_URL}${params}`, option)
//     const data = await response.json()
//     if (response.status === 200) {
//       return data
//     } else {
//       alert(data.message)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// const apiGet = async (params) => {
//   try {
//     const response = await fetch(`${BASE_URL}${params}`)
//     const data = await response.json()
//     if (response.status === 200) {
//       return data
//     } else {
//       alert(data.message)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// const apiPut = async (params) => {
//   try {
//     const response = await fetch(`${BASE_URL}${params}`)
//     const data = await response.json()
//     if (response.status === 200) {
//       return data
//     } else {
//       alert(data.message)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export default callApi