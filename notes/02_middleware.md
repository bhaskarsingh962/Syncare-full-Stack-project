## Middleware in Express
Middleware in Express refers to functions that process requests before reaching the route handlers. These functions can modify the request and response objects, end the request-response cycle, or call the next middleware function. Middleware functions are executed in the order they are defined. They can perform tasks like authentication, logging, or error handling. Middleware helps separate concerns and manage complex routes efficiently.



middleware working
Middleware working

app.use((req, res, next) => {
    console.log('Middleware executed');
    next();
});

(req, res, next) => {}: 
This is the middleware function where you can perform actions on the request and response objects before the final handler is executed.
next(): This function is called to pass control to the next middleware in the stack if the current one doesn't end the request-response cycle.


## What Middleware Does in Express.js

Middleware functions in Express.js can perform several important tasks:
# Execute Code: Middleware can run any code when a request is received.
# Modify Request and Response: Middleware can modify both the request (req) and response (res) objects.
# End the Request-Response Cycle: Middleware can send a response to the client, ending the cycle.
# Call the Next Middleware: Middleware can call next() to pass control to the next function in the middleware stack.


##  How Middleware Works in Express.js?
In Express.js, middleware functions are executed sequentially in the order they are added to the application. Here’s how the typical flow works:

Request arrives at the server.
Middleware functions are applied to the request, one by one.
Each middleware can either:
Send a response and end the request-response cycle.
Call next() to pass control to the next middleware.
If no middleware ends the cycle, the route handler is reached, and a final response is sent.



## Types of Middleware
ExpressJS offers different types of middleware and you should choose the middleware based on functionality required.

# 1. Application-level Middleware
Application-level middleware is bound to the entire Express application using app.use() or app.METHOD(). It executes for all routes in the application, regardless of the specific path or HTTP method.

This type of middleware is commonly used for tasks like logging, body parsing, authentication checks, or setting headers for every incoming request.

app.use(express.json()); // Parses JSON data for every incoming request
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

# 2. Router-level Middleware
Router-level middleware is applied to a specific router instance using router.use() or router.METHOD(). It only applies to routes defined within that particular router, making it perfect for modular applications where middleware is only relevant to specific groups of routes.

This type of middleware is often used to group related routes (e.g., all routes related to authentication or user management) and apply middleware logic to them.

const router = express.Router();

// Apply middleware to only this router's routes
router.use((req, res, next) => {
  console.log('Router-specific middleware');
  next();
});

router.get('/dashboard', (req, res) => {
  res.send('Dashboard Page');
});

app.use('/user', router); // The middleware applies only to routes under "/user"

# 3. Error-handling Middleware
Error-handling middleware is a special type of middleware used to catch and respond to errors during the request-response cycle. It is defined with four parameters: err, req, res, next.

This middleware is essential for sending a consistent error response and avoiding unhandled exceptions that might crash the server.

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).send('Something went wrong!');
});


# 4. Built-in Middleware
Express provides built-in middleware to help with common tasks, like serving static files or parsing data.

For example, express.static() serves files like images, and express.json() helps parse incoming JSON data.

app.use(express.static('public')); // Serves static files from the "public" folder
app.use(express.json()); // Parses JSON payloads in incoming requests


# 5. Third-party Middleware
Third-party middleware is developed by external developers and packaged as npm modules. These middleware packages add additional functionality to your application, such as request logging, security features, or data validation.

For example, the morgan middleware logs HTTP requests, and body-parser helps parse incoming request bodies for easier handling of form data.

const morgan = require('morgan');
app.use(morgan('dev')); // Logs HTTP requests using the "dev" format

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies




## example

const authAdmin = (req, res, next) => {
  try {
    
    const {admintoken} = req.headers;

    if(!admintoken){
       return res.status(400).json({
       success:'false',
       message: 'token not found' 
     }) 
   }
  }
}


const adminRouter = express.Router();
 
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctor);
adminRouter.post('/change-availability',authAdmin, changeAvailability);
adminRouter.get('/appointments',authAdmin, appointmentAdmin);








Middleware checks the token
If invalid → stops flow and sends 401
If valid → calls next() and moves to /admin route



11. Common Interview Questions and Answers
❓ Question	💡 Answer
# What is middleware in Express?	Middleware is a function that has access to req, res, and next() and runs between request and response.
# Why do we use next()?	To pass control to the next middleware or route handler. Without it, request flow stops.
# Can middleware send a response?	Yes — it can end the cycle by sending a response, or continue it using next().
# What happens if you don’t call next()?	The request will hang; the client never gets a response.
# How many types of middleware are there?	Application-level, Router-level, Built-in, Third-party, and Error-handling.
# How is error-handling middleware different?	It has 4 parameters: (err, req, res, next) and is used to catch errors.
# Can middleware modify request or response?	Yes, you can attach or change data (e.g., req.user = decodedToken).
# What is the order of middleware execution?	Middleware runs in the same order as it’s declared in code.
# How do you use multiple middleware for one route?	Pass them as arguments before the route handler: app.get('/route', mw1, mw2, handler)
# What’s the difference between app.use() and app.get()?	app.use() defines middleware for all HTTP methods; app.get() defines a specific route.