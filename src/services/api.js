import { refresh } from './authApi'
import AuthStore from "./authStore"

let baseURL = process.env.REACT_APP_var_STAGE === 'dev' ?
  'http://localhost:5000/api' : `${process.env.REACT_APP_api_LINK}/api`


// GET - Get data
async function getData(url) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {
    'X-Requested-With': 'XML-HTTPRequest',
    'Content-Type': 'application/json'
  }
  if(token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(baseURL+url, {
    method: 'GET',
    headers: headers
  });
  return await response.json();
}

// POST - Post Data
async function postData(url, data) {
  await refresh()
  const response = await fetch(baseURL+url, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XML-HTTPRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthStore.getIdToken()}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// PUT - Update Data
async function putData(url, data) {
  await refresh()
  const response = await fetch(baseURL+url, {
    method: 'PUT',
    headers: {
      'X-Requested-With': 'XML-HTTPRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthStore.getIdToken()}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// DELETE - Delete Data
async function deleteData(url, data) {
  await refresh()
  const response = await fetch(baseURL+url, {
    method: 'DELETE',
    headers: {
      'X-Requested-With': 'XML-HTTPRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthStore.getIdToken()}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export {
  getData, postData, putData, deleteData
}