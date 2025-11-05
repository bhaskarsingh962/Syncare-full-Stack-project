## Step 1: What is MongoDB?

MongoDB is a NoSQL (non-relational) database that stores data in a document-based format — not rows and columns like SQL.
Data is stored in collections instead of tables.
Each record is a document (like a JSON object).
Example:
{
  "name": "Bhaskar",
  "email": "bhaskar@gmail.com",
  "age": 22
}


MongoDB automatically assigns each document a unique _id field.
## ⚙️ Step 2: What is Mongoose?
Mongoose is an Object Data Modeling (ODM) library for Node.js and MongoDB.
It helps you:
Define schemas for your documents.
Interact with MongoDB using JavaScript objects (not raw queries).
Validate data automatically.
Provide middleware (hooks) and query helpers.

In simple words:
👉 Mongoose = a bridge between your Node.js backend and MongoDB database.

## 🧩 Step 3: Connection Setup (connectDB.js)
import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on('connected',()=>console.log("Database Connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}/Syncare`)
}
export default connectDB;

🔍 Explanation Line-by-Line:
import mongoose from "mongoose";
Imports the Mongoose library.
mongoose.connection.on('connected', ()=> console.log("Database Connected"));
Event listener: when Mongoose successfully connects to MongoDB, it logs that message.
await mongoose.connect(${process.env.MONGODB_URI}/Syncare);
Connects to the MongoDB URI defined in your .env file.
/Syncare is the database name.
If it doesn’t exist, MongoDB automatically creates it when the first document is inserted.
export default connectDB;
Exports the function so you can call it in server.js or index.js.
So internally:
Mongoose sends a request to MongoDB (via the URI).
MongoDB replies with a TCP connection acknowledgment.
Once connected, Mongoose keeps that connection open persistently (no reconnect needed on every query).

## 🧱 Step 4: Defining a Schema and Model (Example: User)
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, default: "data:image/png;base64,..."},
    address: {type: Object, default : {line1: '', line2: ''}},
    gender: {type: String, default: "Not Selected"},
    dob: {type: String, default: "Not Selected"},
    phone: {type: String, default: '0000000000'},
});

💡 Meaning:

mongoose.Schema() defines structure for the document inside MongoDB.
required: true → field must exist, else an error will be thrown.
unique: true → MongoDB ensures no two documents have the same value (like email).
default: → provides a value if none is given.
type: Object → allows a nested JSON-like structure.

## 🧩 Step 5: Creating Model
const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;
📘 What’s happening here:
mongoose.model('user', userSchema) creates a model — a blueprint to perform DB operations.
Model name ('user') → becomes a collection name (users) in MongoDB (auto-pluralized).
mongoose.models.user || — prevents re-registering model if it’s already declared (useful during hot reload in VS Code).

Now, you can perform:
await userModel.find();
await userModel.create({name: "Bhaskar", email: "...", password: "..."});

## 🩺 Step 6: Appointment Schema
const appointmentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    docId: {type: String, required: true},
    slotDate: {type: String, required: true},
    slotTime: {type: String, required: true},
    userData: {type: Object, required: true},
    docData: {type: Object, required: true},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    cancelled: {type: Boolean, default: false},
    payment: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
});

💡 This schema stores:
Which user booked which doctor.
The slot time/date.
Whether payment was done, cancelled, or completed.
Internal Flow:
When you call:
await appointmentModel.create({...});
Mongoose validates schema.
Converts data into BSON (Binary JSON).
Sends it to MongoDB server.
MongoDB writes it into the appointments collection.

## ⚙️ Step 7: Internal Working of Mongoose with MongoDB
Your app calls connectDB().
Mongoose connects to MongoDB driver internally (built on top of the MongoDB Node.js driver).
A connection pool (usually 5 sockets by default) is created for reusing.
Every time you query (find, create, delete):
Mongoose converts your JS Object → MongoDB Query Language (MQL).
MongoDB executes the query and returns raw data.
Mongoose wraps it back into model instances (so you can use JS methods easily).

## 💾 Step 8: Free Storage and Limits

If you’re using MongoDB Atlas Free Tier:
Storage: 512 MB
Shared cluster.
Automatic backups (in paid plans).
Network limit: about 100 connections.
Great for development and testing.

## 🧠 Step 9: Typical Flow in Your Project
Frontend (React)
   ↓
Axios → Express API (Node.js)
   ↓
Mongoose (ODM)
   ↓
MongoDB (Database)


Example:
When you book an appointment → frontend sends data → backend saves it in appointment collection.
When payment verified → backend updates { payment: true } for that document.

## 💬 Step 10: Interview Questions & Answers
Question	Answer
🧩 What is MongoDB?	A NoSQL document-oriented database storing data in JSON-like format called BSON.
🧠 What is Mongoose?	Mongoose is an ODM library that provides schema-based structure for MongoDB in Node.js.
🧱 What is a Schema?	A schema defines the structure, types, and validation for documents in a collection.
💡 What is a Model?	A model is a constructor compiled from a schema — used to query, create, or update documents.
⚙️ How does Mongoose connect to MongoDB?	It uses the MongoDB Node.js driver under the hood and maintains a persistent connection pool.
📦 How does MongoDB store data?	Data is stored as documents inside collections; documents are stored in BSON format.
🧾 What is the difference between mongoose.model and mongoose.models?	mongoose.models prevents redefining models when the app reloads (common in development).
💬 What happens if the database doesn’t exist?	MongoDB automatically creates it when the first collection/document is inserted.
🧠 How does Mongoose handle validation?	Before saving a document, it checks schema constraints (like required, type, default).
💸 What’s the free limit in MongoDB Atlas?	512 MB storage, 100 max connections, free forever tier for small projects.