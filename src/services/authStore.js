import AES from 'crypto-js/aes'
import UTF8 from 'crypto-js/enc-utf8'

class AuthStoreClass {
  tokens = {}
  tokensString = null
  idToken = null

  setItem(key, value) {
    this.tokens[key] = value
    if(key.includes("idToken")) {
      this.idToken = value
    }
  }
  getItem(key) {
    return this.tokens[key]
  }
  removeItem(key) {
    this.tokens[key] = ""
  }
  clear() {
    this.removeLocalStorage();
    this.tokens = {}
    this.tokensString = null;
    this.idToken = null;
  }
  getIdToken() {
    return this.idToken
  }

  setLocalStorage() {
    let testString = JSON.stringify(this.tokens)
    if (testString === "{}") {
      // 1. If no encrypted token, store it
      this.setLocalStorageItem(testString)
    } else if (this.tokensString !== testString) {
      // 2. If encrypted token changed, store new
      this.setLocalStorageItem(testString)
    }
  }
  setLocalStorageItem(val) {
    this.tokensString = val
    let newToken = AES.encrypt(this.tokensString, process.env.REACT_APP_e_KEY)
    localStorage.token = newToken.toString()
  }

  getLocalStorage() {
    if (Object.entries(this.tokens).length === 0 && this.tokens.constructor === Object) {
      if (localStorage.hasOwnProperty('token')) {
        let bytes = AES.decrypt(localStorage.token, process.env.REACT_APP_e_KEY)
        this.tokens = JSON.parse(bytes.toString(UTF8))
        Object.keys(this.tokens).map((tokenName) => {
          if(tokenName.includes("idToken")) {
            this.idToken = this.tokens[tokenName]
          }
          return null
        })
      }
    }
  }
  removeLocalStorage() {
    localStorage.removeItem('token')
  }
}

let AuthStore = new AuthStoreClass()

export default AuthStore