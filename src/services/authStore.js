import SecureLS from 'secure-ls'
var ls = new SecureLS({encodingType: 'aes'})

// Secure Local Storage
// Encrypt JWT tokens before saving in Local Storage
class AuthStoreClass {
  setItem(key, value) {
    ls.set(key, value)
    if(key.includes('idToken')) ls.set('idToken', value)
  }
  getItem(key) {
    return ls.get(key)
  }
  removeItem(key) {
    ls.set(key, '')
  }
  clear() {
    ls.removeAll()
  }
  getIdToken() {
    return ls.get('idToken')
  }
}

let AuthStore = new AuthStoreClass()

export default AuthStore