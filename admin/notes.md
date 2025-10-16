High‑level architecture
UI is a single‑page app using React Router, with global state split across AdminContext, DoctorContext, and a small AppContext for utilities like currency/date formatting.

Authentication is token‑based: after login, a token is saved to localStorage and injected in Axios headers for protected API calls.

Feature domains: Admin manages doctors, availability, and all appointments; Doctor manages own appointments, marks complete/cancel, and updates profile; dashboards aggregate counts and recent bookings.

App bootstrapping
main.jsx wraps App in BrowserRouter and three providers (AdminContextProvider, DoctorContextProvider, AppContextProvider) so routes and components can consume shared state without prop drilling.

App.jsx checks adminToken or doctorToken from contexts; if present it renders the secured shell (Navbar + Sidebar + role‑specific routes), else it renders the Login page.

Authentication flow
Login.jsx switches between “Admin” and “Doctor” tabs; on submit it posts email/password to the respective endpoint, stores the returned JWT in localStorage, and sets context state so the app re‑renders into the authenticated shell.

On logout (Navbar.jsx), tokens are cleared from both context and localStorage, and navigation returns to root.

Admin domain flow
AdminContext exposes: adminToken, backendUrl, doctors, appointments, dashData, and actions like getAllDoctors, changeAvailability, getAllAppointments, cancelAppointment, getDashData; all requests pass adminToken in headers.

DoctorList.jsx loads via getAllDoctors() and toggles availability per doctor with changeAvailability(docId).

AddDoctor.jsx builds a multipart FormData (image + fields) and posts to /api/admin/add-doctor with adminToken header; success resets the form and toasts a message.

AllAppointments.jsx calls getAllAppointments() after token load, lists each appointment, and allows admin‑side cancellation via cancelAppointment(id).

Dashboard.jsx fetches getDashData() to show cards (doctors, appointments, patients) and a latest‑bookings list with cancel action.

Doctor domain flow
DoctorContext provides: doctorToken, appointments, dashData, profileData and actions getAppointments, completeAppointment, cancelAppointment, getDashData, getProfileData; all requests include doctorToken in headers.

DoctorDashboard.jsx loads getDashData() (earnings, appointments, patients) and shows recent bookings with complete/cancel actions.

DoctorAppointments.jsx loads getAppointments(), lists each with payment type, age, schedule, and enables complete/cancel.

DoctorProfile.jsx loads profile via getProfileData(), allows editing address/fees/availability, and posts updateProfile with doctorToken.

Shared utilities
AppContext exposes currency, calculateAge(dob), and slotDateFormat(slotDate) for consistent UI formatting across components.

Key technical terms
Context API: React’s built‑in dependency injection for state and functions to avoid prop drilling; providers wrap the tree, consumers read via useContext.

React Router: Client‑side routing to map URLs to components without full page reloads; private rendering is enforced by checking tokens before showing secured routes.

Axios: Promise‑based HTTP client supporting headers, interceptors, and multipart uploads; headers carry tokens for authentication with each call.

JWT/token auth: Server issues a signed token after login; the client stores it (here in localStorage) and presents it in subsequent requests.

FormData/multipart: Browser API to package files and fields for upload, required when sending images like doctor profile photos.

LocalStorage: Persistent key‑value store in the browser; used to persist tokens across reloads.

Data and control flow (step‑by‑step)
Unauthenticated: App renders Login; user selects role and submits credentials; on success, token -> localStorage and context -> App shows secured shell.

Admin path: Sidebar exposes Dashboard, Appointments, Add Doctor, Doctor List; each page calls context methods which fire Axios requests with adminToken; responses update context state, which re‑renders lists/cards.

Doctor path: Sidebar exposes Dashboard, Appointments, Profile; similar pattern, but endpoints are doctor‑scoped and headers use doctorToken.

Actions like cancel/complete call POST endpoints, then refresh lists and dashboard using getAppointments()/getDashData() to keep UI consistent.

Potential improvements (interview talking points)
Add Axios instance + interceptors to inject tokens, handle 401 global logout, and unify error messages.

Protect routes with actual PrivateRoute wrappers rather than conditional rendering in App.jsx; add role‑based route guards.

Validate forms with a library (React Hook Form + Zod/Yup) and disable buttons during pending requests for better UX.

Replace scattered local state with reducers where flows are complex; consider React Query for caching/refetch on focus and background sync.

Secure token storage: prefer httpOnly cookies if backend allows, or at minimum, mitigate XSS and add CSRF protections.

Common React/Context/Axios interview Q&A
What problems does Context API solve and when avoid it? It prevents prop drilling for global concerns (auth, theme, config), but naive use can cause re‑render cascades; optimize via memoized provider values or split contexts.

How to pass auth headers with Axios? Configure per request or via an Axios instance/interceptor; include Authorization or custom header and handle errors centrally.

Why store tokens in localStorage vs cookies? localStorage is simple but exposed to XSS; httpOnly cookies resist XSS but need CSRF mitigations; tradeoffs depend on threat model.

How to upload images with Axios? Use FormData, append file and fields, and set Content‑Type to multipart/form-data; the browser sets boundary; don’t stringify files.

How to structure role‑based routing? Maintain auth state in context, add route guards that check token and role before rendering components, and redirect otherwise.

How to prevent stale lists after mutations? Invalidate and refetch dependent data (e.g., call getAllAppointments and getDashData) or adopt React Query for cache invalidation.

Error handling patterns? Centralize error extraction from error.response, map backend error keys, and surface consistent toasts; add retry/backoff for transient failures.

Performance tips with Context? Memoize provider values, split contexts by domain (auth, data, UI), and avoid passing frequently changing primitives through broad providers.

SPA security concerns? Handle 401 globally, clear tokens on logout, validate/escape user‑supplied content, and avoid logging secrets in console.

Testing approach? Unit test contexts and reducers, mock Axios with MSW or jest mocks, and test route protection with React Testing Library.

React fundamentals likely asked
Differences among state, props, and context; how hooks like useEffect/useMemo/useCallback affect render behavior and dependencies.

Virtual DOM reconciliation and how keys affect list rendering stability and performance.

Controlled vs uncontrolled components for forms, and accessibility considerations for inputs and toasts.

Axios specifics likely asked
How to cancel requests on unmount using AbortController or Axios CancelToken to avoid memory leaks.

Handling retries and exponential backoff for idempotent GETs; when to debounce UI‑driven queries.

Wrap‑up checklist for this codebase
Ensure every protected request includes the correct header key case (“doctorToken” vs “doctortoken”) consistently.

Add try/catch coverage and consistent message extraction for all context actions; standardize toast patterns.

Normalize date handling and currency symbol via AppContext; add unit tests for calculateAge and slotDateFormat.

