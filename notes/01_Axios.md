## 1. What is Axios?

Answer:

Axios is a promise-based HTTP client for Node.js and browsers used to make API calls (GET, POST, PUT, DELETE, etc.) to a server.

✅ Key points:

Built on top of XMLHttpRequest (browser) or http module (Node.js)
Supports Promises and async/await
Can send headers, tokens, and handle errors

# 🔹 2. Why use Axios instead of Fetch API?

Answer:
Axios adds convenience features on top of fetch().
Feature	                   Axios	                          Fetch
Automatic JSON parsing	   ✅ Yes	                        ❌ No
Request timeout	           ✅ Built-in	                    ❌ Manual
Interceptors	           ✅ Yes	                        ❌ No
Older browser support	   ✅ Better	                        ❌ Needs polyfill
Error handling	           ✅ Easy	                        ❌ Must check res.ok manually


## 🔹 3. What is the syntax of an Axios GET and POST request?

GET:
const response = await axios.get('/api/users');

POST:
const response = await axios.post('/api/users', { name: 'Bhaskar' });

## 🔹 4. How do you send headers or tokens with Axios?

Use the config parameter (third argument in .post, second in .get).
axios.post('/api/data', {}, {
  headers: { Authorization: `Bearer ${token}` }
});


## 🔹 5. How do you handle errors in Axios?
Using try...catch or .catch():

try {
  const res = await axios.get('/api/data');
} catch (error) {
  console.error(error.response?.data || error.message);
}


✅ Interview tip: Mention error.response, error.request, and error.message — shows deep understanding.

## 🔹 6. What are Axios interceptors?
Interceptors let you run code before or after a request or response.

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

👉 Used for auth tokens, logging, retrying failed requests, etc.



## 🔹 7. How do you cancel a request in Axios?
Using AbortController or CancelToken (older version).

const controller = new AbortController();
axios.get('/api/data', { signal: controller.signal });
// cancel it
controller.abort();

## 🔹 8. How do you set a base URL in Axios?
You can set it once and reuse it.

const api = axios.create({
  baseURL: 'https://myapi.com',
  headers: { 'Content-Type': 'application/json' }
});

api.get('/users');

## 🔹 9. How do you handle concurrent requests?
Using axios.all() or Promise.all().

const [users, posts] = await Promise.all([
  axios.get('/api/users'),
  axios.get('/api/posts')
]);

## 🔹 10. How do you handle timeouts in Axios?
axios.get('/api/data', { timeout: 5000 });
If the request takes longer than 5 seconds, it throws an error.

## 🔹 11. How to transform request or response data?
axios.post('/api', { a: 1 }, {
  transformRequest: [(data) => JSON.stringify(data)]
});


axios.get('/api', {
  transformResponse: [(data) => JSON.parse(data)]
});

## 🔹 12. How do you handle global headers or configuration?
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.baseURL = 'https://api.example.com';

## 🔹 13. What happens if you omit the {} in axios.post(url, {}, config)?
Axios will treat the config as the body, and your headers won’t be sent, causing 401 Unauthorized errors.

## 🔹 14. How to upload a file with Axios?
Use FormData:
const formData = new FormData();
formData.append('file', file);
axios.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

## 🔹 15. How to download a file with Axios?
axios.get('/file.pdf', { responseType: 'blob' });



# ⚙️ BONUS – Common Interview Follow-ups

1. What happens if the server returns 500?
→ 500 = Internal Server Error

That means the request reached the server successfully, but the server failed to process it due to some internal bug or exception.

✅ Axios automatically throws an error for status codes outside 2xx.
You can handle it like this:

try {
  const res = await axios.get('/api/data');
} catch (error) {
  if (error.response) {
    console.log('Server Error:', error.response.status); // 500
    console.log('Message:', error.response.data);
  } else if (error.request) {
    console.log('No response from server');
  } else {
    console.log('Error in setup:', error.message);
  }
}

“I handle 500 errors by catching the response and showing user-friendly messages or retrying the request after a delay.”

# ⚙️ 2. What’s the difference between axios.get() and axios.request()?
Feature	axios.get()	axios.request()
Purpose	Shortcut for GET requests	Generic method for any HTTP verb
Syntax	axios.get(url, config)	   axios.request({ method, url, data, config })

✅ Example:

// Shortcut
axios.get('/users');

// Generic form (works for GET, POST, PUT, DELETE)
axios.request({
  method: 'get',
  url: '/users'
});

Interview tip:
“axios.request() is the base method; all helpers like axios.get() and axios.post() internally call it.”

## 🔁 3. How do you retry failed requests?
Axios interceptors
Retry logic manually

Or an external library like axios-retry.

✅ Example using interceptor:

axios.interceptors.response.use(null, async (error) => {
  const config = error.config;
  if (!config._retry) {
    config._retry = true;
    console.log("Retrying request...");
    return axios(config);
  }
  return Promise.reject(error);
});


✅ Or using axios-retry:
npm install axios-retry
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
Interview tip:

“We can retry network-related failures using interceptors or libraries like axios-retry with exponential backoff.”

## 🌐 4. Can you use Axios in the backend?

✅ Yes, absolutely!
Axios works both in Node.js (backend) and browser (frontend) because it’s a JavaScript library.

Example (Node.js):
import axios from 'axios';

const getData = async () => {
  const res = await axios.get('https://api.github.com/users/bhaskarsingh');
  console.log(res.data);
};

getData();


Interview tip:

“Axios is environment-agnostic. In the backend, it uses Node’s http module internally, and in the frontend, it uses XMLHttpRequest.”

## 🔄 5. What are alternatives to Axios?
✅ Alternatives include:
Library	                Description
Fetch API	  Built-in modern API (but lacks interceptors, timeout, etc.)
Superagent	  Popular HTTP client with chainable API
Got	Powerful  Node.js HTTP client with retry, streams, and hooks
Request	Old library (now deprecated)
Ky	Lightweight wrapper around Fetch

Example (Fetch alternative):

const res = await fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bhaskar' })
});
const data = await res.json();


Interview tip:
“Axios is developer-friendly, but for modern lightweight setups, fetch() or got may be preferred.”


⚡ Summary Table
Question	Short Answer
What happens if server returns 500?	Axios throws an error — handle with try/catch using error.response.
Difference between .get() and .request()	.get() is a shortcut; .request() is the generic method.
How to retry failed requests	Use interceptors or axios-retry for retry logic.
Can Axios run on backend?	Yes, it works in Node.js using the http module internally.
Alternatives to Axios	fetch, superagent, got, ky.