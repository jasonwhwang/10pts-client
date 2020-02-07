import { Auth, Storage } from 'aws-amplify'
import AuthStore from './authStore'
import { store } from '../index'
import nanoid from 'nanoid'

async function signUp(email, password) {
  try {
    let res = await Auth.signUp({
      username: email,
      password
    })
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function logIn(email, password) {
  try {
    let res = await Auth.signIn({
      username: email,
      password
    })
    AuthStore.setLocalStorage()
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function logOut() {
  try {
    let res = await Auth.signOut()
    AuthStore.clear()
    store.dispatch({ type: "LOG_OUT" })
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function refresh() {
  AuthStore.getLocalStorage()
  try {
    let res = await Auth.currentSession()
    AuthStore.setLocalStorage()
    return res

  } catch (error) {
    logOut()
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function forgotPassword(email) {
  try {
    let res = await Auth.forgotPassword(email)
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function forgotPasswordVerify(email, code, password) {
  try {
    let res = await Auth.forgotPasswordSubmit(email, code, password)
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function changePassword(oldPassword, newPassword) {
  try {
    let user = await Auth.currentAuthenticatedUser()
    let res = await Auth.changePassword(user, oldPassword, newPassword)
    return res

  } catch (error) {
    return !error.message ? { error: error } : { error: error.message }
  }
}

async function uploadFile(file) {
  if (file.size > 500000) {
    return { error: "File exceeds max size of 500KB." }
  }
  let fileName = nanoid(10) + "-" + file.name
  let contentType = file.type

  try {
    let userInfo = await Auth.currentUserInfo()
    let fileNameLong = `${userInfo.id}/${fileName}`

    let uploadFileKey = await Storage.put(fileNameLong, file, {
      contentType,
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    })
    let fileURL = "https://stratagan.s3.amazonaws.com/public/" + uploadFileKey.key
    return fileURL

  } catch (error) {
    console.log(error)
    return { error: "File upload was unsuccessful." }
  }
}

async function removeFile(fileName) {
  let fileNameArr = fileName.split("/")
  try {
    let fileNameLong = fileNameArr[fileNameArr.length-2] + "/" + fileNameArr[fileNameArr.length-1]

    let result = await Storage.remove(fileNameLong)
    return result

  } catch (error) {
    console.log(error)
    return { error: "File remove was unsuccessful." }
  }
}

export {
  signUp,
  logIn,
  logOut,
  refresh,
  forgotPassword,
  forgotPasswordVerify,
  changePassword,

  uploadFile,
  removeFile
}