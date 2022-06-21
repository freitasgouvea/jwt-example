require('dotenv').config()
const jwt = require('jsonwebtoken')
const jose = require('jose')

// data to be encrypted
const data = { 
  client_id: '1',
  client_name: 'Client Name',
  client_address: '0x8B3A08b22d25C60e4b2BfD984e331568ECa4C299', 
  client_role: 'user' 
}

// function that encrypt data using jwt
function encrypt() {
  // this jwt method encrypts data
  const encryptedData = jwt.sign( 
    data, // data to be encrypted
    process.env.SECRET_KEY, // secret key to be used by hash algorithm
    { algorithm: 'HS256' } // algotrithm, in this case, HS256 (HMAC using SHA-256 hash algorithm)
  )
  return encryptedData
}

// function that call encrypt function and decrypt data using jwt
function decrypt() {
  const accessToken = encrypt()
  // this jwt method decrypts data
  const decryptedData = jwt.verify(
    accessToken, // access_token that contains the data to be decrypted
    process.env.SECRET_KEY, // secret key to be used by hash algorithm, need to be the same of the encryption
    { algorithm: 'HS256' } // algotrithm, need to be the same of the encryption
  )
  return decryptedData
}

// function that call encrypt function and decrypt data using jose library
async function decryptJose() {
  const accessToken = encrypt()
  // this jose method decrypts data
  const decryptedData = jose.decodeJwt(
    accessToken, 
    process.env.SECRET_KEY, 
    { algorithm: 'HS256'} 
  )
  return decryptedData
}

console.log(decryptJose())