## Authentication
Last Updated : 18 Sep, 2025
Authentication is the process of verifying the identity of a user or system to ensure they are who they claim to be.
It typically involves credentials such as usernames, passwords, one-time passwords (OTPs), or biometric methods like fingerprints and face recognition.
By validating these credentials, authentication prevents unauthorized access and helps protect sensitive systems and data from security breaches.

## Authorization
Authorization is the process of determining and granting access rights to an authenticated user or system.
It defines what resources a user can access and what actions they are allowed to perform.
Authorization always occurs after authentication and ensures that only permitted users can perform specific tasks, thereby enforcing security policies and protecting sensitive resources.


## JWT Authentication In Node.js
In modern web development, ensuring secure and efficient user authentication is paramount. JSON Web Tokens (JWT) offer a robust solution for token-based authentication, enabling secure transmission of user information between parties.



## What is JWT?
JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. These tokens are digitally signed, ensuring the integrity and authenticity of the data they carry.​

# How JWT Works
JWTs consist of three parts: the header, payload, and signature. The payload contains the user data, and the signature ensures that the token hasn't been altered. Implementing JWT in Node.js allows you to secure your APIs while maintaining scalability and efficiency.

# 1. Header
The header typically consists of two parts: the type of token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.

{
    "alg": "HS256",
    "typ": "JWT"
}
# 2. Payload
The payload contains the claims, which are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

{
    "sub": "1234567890",
    "name": "Aman Gupta",
    "admin": true
}
# 3. Signature
To create the signature part, you have to take the encoded header, the encoded payload, a secret, and the algorithm specified in the header and sign that.

HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)

## in this project to generate signature i just made hardcoded jwt key 
Why use process.env?
Security: Don’t hardcode secrets like jwt.sign({ id: doctor._id }, "MySecretKey") in your code.
Flexibility: You can change the key per environment (dev / prod) without changing the code.
Best practice for professional projects.


Steps To Implement JWT Authentication In Node.js

JWT_SECRET_KEY = gfg_jwt_secret_key
TOKEN_HEADER_KEY = gfg_token_header_key

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();


app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});

# with expiry time
const token = jwt.sign(
  { id: doctor._id },       // payload
  process.env.JWT_SECRET,   // secret key
  { expiresIn: '1h' }      // token expiry
);

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});





# 1. Structure of a JWT

A JWT looks like this:
xxxxx.yyyyy.zzzzz
It has three parts separated by dots:

Header → xxxxx
Payload → yyyyy
Signature → zzzzz

Each part is base64 encoded, meaning it’s readable after decoding.

# 🔹 2. Header
The Header describes:
The type of token → usually "JWT"
The algorithm used for signing → e.g., "HS256"
Example:
{
  "alg": "HS256",
  "typ": "JWT"
}
alg → Algorithm used to create the signature
typ → Type of token (JWT)

# 🔹 3. Payload
The Payload is the data you put inside the token — usually about the user.
This is where user ID, role, email, or any info you want to carry in a secure but readable way goes.

Example (your case):
{
  "id": "672b913f28f5e7e7a9021a4c"   // doctor._id from MongoDB
}
You can also add expiry or other info:
{
  "id": "672b913f28f5e7e7a9021a4c",
  "role": "doctor",
  "exp": 1724582692  // automatic expiration timestamp
}
exp is automatically handled if you pass { expiresIn: "1h" } to jwt.sign()

✅ This is the main data you care about in JWT.

# 🔹 4. Signature (for completeness)
The Signature is what makes the token tamper-proof.
It’s generated by combining:
base64(header) + "." + base64(payload) + secretKey
and then hashing it with the algorithm (HS256 by default).
If anyone changes the payload, the signature will be invalid.

# 🔹 5. Example JWT
Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6IjY3MmI5MTNmMjhmNWU3ZTdhOTAyMWE0YyIsImlhdCI6MTcyOTEyNzI3Nn0
.0x3pQowO0F0xDyZs9P7p5vCZc0oW41-KUmlbE_bcd8s


## in my project

here how i made token in my project for doctor i proviode the signature from .env file 
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credential",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
        return res.json({
        success: true,
        token,
        doctorId: doctor._id,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credential",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

## for admin i i just veerfied through email and password


const authDoctor = (req, res, next) => {
  try {
    
    const {doctortoken} = req.headers;

    if(!doctortoken){
       return res.status(400).json({
       success:'false',
       message: 'Not Authorized Login Again' 
     }) 
   }

   const token_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);
   req.user = token_decode.id;
   next();
  } catch (error) {
     console.log(error); 
       return res.status(500).json({
       success:'false',
       message:error.message 
    })
  }
}
const token_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);
## Verifies the token using JWT library and your secret key
jwt.verify() does 3 things:
Checks if the token is valid (was signed with your secret)
Checks if it’s not expired (exp in the token)
Returns the decoded payload if valid


Example: Suppose you signed the token like this:
const token = jwt.sign({ id: doctor._id, role: doctor.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


# Then token_decode becomes:
{
  "id": "64abc12345",  // doctor._id
  "role": "doctor",
  "iat": 1724567890,
  "exp": 1724571490
}

req.user = token_decode.id;
Stores the authenticated doctor’s ID in req.user

Now, any route that uses this middleware can access the doctor ID without asking for credentials again
Example:

app.get('/doctor/dashboard', authDoctor, async (req, res) => {
  const doctorId = req.user;  // from middleware
  const doctor = await doctorModel.findById(doctorId);
  res.json({ success: true, doctor });
});
next();


## in the case of admin 

  const token = jwt.sign(email + password, process.env.JWT_SECRET);

   const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);

   if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.status(400).json({
       success:'false',
       message: 'Not Authrized Login Again' 
     }) 
   }
  
   next();