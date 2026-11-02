# Full Stack Development Laboratory Manual (4CSPL2021)

A responsive, interactive, and modern web application serving the complete laboratory manual for CMR University's **4CSPL2021: Full Stack Development** course.

🔗 **Live Deployment**: [https://fsdlabb.vercel.app](https://fsdlabb.vercel.app)  
📦 **GitHub Repository**: [https://github.com/vkashyapram-byte/FSDLAB](https://github.com/vkashyapram-byte/FSDLAB)

---

## 📑 Complete List of Laboratory Experiments (1 to 15)

Every experiment features:
- **Aim, Objectives & Prerequisites**
- **Detailed Step-by-Step Procedures & Terminal Commands**
- **Complete, Production-Ready Source Code with 1-Click Copy Buttons**
- **Interactive Live Simulator / Sandbox**
- **Expected Outputs, Test Scenarios & Inferences**
- **Collapsible Viva Voce Questions & Answers**

### Part 1: Front-End Fundamentals (HTML, CSS & JavaScript)
1. **Experiment 1: HTML5 Document & Web Environment Setup**
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
   - Browser developer tools inspection and local dev server setup.
   - *Live Interactive Simulator*: Live Semantic HTML Document Preview with DOM Inspector.
2. **Experiment 2: CSS Responsive Design (Flexbox, Grid, Media Queries)**
   - Mobile-first responsive layouts using CSS Flexbox (`display: flex`) and CSS Grid (`display: grid`).
   - Media queries (`@media (min-width: 768px)`, `@media (min-width: 1024px)`).
   - *Live Interactive Simulator*: Interactive Breakpoint & Layout Switcher (Mobile 375px, Tablet 768px, Desktop 1200px).
3. **Experiment 3: JavaScript DOM Manipulation**
   - Dynamic element creation, class toggling, event handling (`addEventListener`), and DOM traversal.
   - *Live Interactive Simulator*: Interactive Dynamic Item Manager & DOM Traversal Sandbox.
4. **Experiment 4: Form Validation Using JavaScript**
   - Client-side validation: Name, Email regex, Password complexity (8+ chars, upper, lower, digit), Confirm Password match, 10-digit Phone regex.
   - Real-time inline feedback and submit prevention.
   - *Live Interactive Simulator*: Real-time Form Validation Sandbox with instant status badges.

### Part 2: React Frontend Framework
5. **Experiment 5: React Components & Props**
   - React architecture, JSX syntax, reusable component design (`StudentCard`), passing props and default values.
   - *Live Interactive Simulator*: Dynamic Props Playground (update Name, USN, Dept, GPA, and view live component render).
6. **Experiment 6: React State & Events (useState, Counter, Todo)**
   - State management with `useState`, handling user events (`onClick`, `onChange`, `onSubmit`).
   - Controlled inputs, dynamic list rendering, item deletion.
   - *Live Interactive Simulator*: Interactive Counter & Dynamic To-Do List Simulator.
7. **Experiment 7: React API Integration & Axios**
   - Asynchronous HTTP calls with `axios` inside `useEffect`.
   - Handling loading spinners, data rendering, search filtering, and error alert banners.
   - *Live Interactive Simulator*: Live JSONPlaceholder API Request Tester with simulated network delays and error toggles.

### Part 3: Node.js & Express.js Back-End
8. **Experiment 8: Node.js Basic HTTP Server**
   - Built-in `http` module server routing (`GET /`, `GET /about`, `POST /data`).
   - Streaming request body parsing (`data` and `end` events), JSON headers (`Content-Type: application/json`), 200/404 HTTP status codes.
   - *Live Interactive Simulator*: Interactive HTTP Request/Response Console with Postman-style test triggers.
9. **Experiment 9: Node.js File System Operations**
   - Asynchronous `fs` operations (`writeFile`, `readFile`, `appendFile`, `unlink`, `rename`).
   - UTF-8 encoding handling and asynchronous error callback pattern.
   - *Live Interactive Simulator*: Virtual File System Inspector & Real-time Console Log.
10. **Experiment 10: Express.js Routing & Middleware**
    - Express application initialization, route parameters (`/students/:id`), query parameters (`/search?name=...&dept=...`).
    - Custom application-level logging middleware (`req.method`, `req.url`, `Date.now()`).
    - *Live Interactive Simulator*: Express Route Testing Console with Live Terminal Logger.
11. **Experiment 11: Express.js RESTful API with CRUD Operations**
    - Standard RESTful endpoints for resource collection (`GET /api/courses`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`).
    - In-memory data store with array manipulation methods (`find`, `findIndex`, `filter`).
    - *Live Interactive Simulator*: RESTful API CRUD Client Console with real-time JSON response viewer.

### Part 4: MongoDB Database Operations
12. **Experiment 12: MongoDB Shell & Compass CRUD Operations**
    - Database creation, collection management, document CRUD (`insertOne`, `insertMany`, `find`, `updateOne`, `updateMany`, `deleteOne`).
    - Query operators (`$gte`, `$lte`, `$in`, `$regex`), projections, and sorting.
    - *Live Interactive Simulator*: Interactive MongoDB Query Shell Simulator with real-time collection state.
13. **Experiment 13: MongoDB with Node.js & Mongoose ODM**
    - Mongoose connection to MongoDB Atlas, schema definition with field validators (`required`, `min`, `max`, `trim`).
    - Model methods (`create`, `find`, `findByIdAndUpdate`, `findByIdAndDelete`).
    - *Live Interactive Simulator*: Mongoose Schema Validator & Document Mutation Sandbox.

### Part 5: Authentication & Full-Stack Integration
14. **Experiment 14: Authentication Using JWT & bcrypt**
    - Password hashing using `bcrypt.hash()` with salt rounds (10), password verification using `bcrypt.compare()`.
    - JSON Web Token generation (`jwt.sign()`) with expiry and authorization bearer middleware (`jwt.verify()`).
    - *Live Interactive Simulator*: JWT Authentication Flow Sandbox (Register -> Hash -> Login -> Token -> Protected Route).
15. **Experiment 15: Full Stack Integration - MERN Application**
    - Complete full-stack integration connecting React frontend to Express/MongoDB backend.
    - CORS configuration (`cors()`), environment variables (`dotenv`), end-to-end data flow.
    - *Live Interactive Simulator*: Full Stack MERN Live Simulator (Interactive Task Manager with mock API and database visualization).

---

## 🛠️ Features & Enhancements

- **Quick Navigation**: Instant switching across all 15 experiments via quick-action buttons or the fast dropdown selector (`#quickLabSelect`).
- **Category Filter Tabs**: Filter by topic — `All`, `HTML & CSS (1-3)`, `React (5-7)`, `Node & Express (8-11)`, `MongoDB & MERN (12-15)`.
- **Easy 1-Click Code Copying**: Distinct code blocks for each source file with copy buttons providing instant visual clipboard confirmation.
- **Interactive Simulators**: Every single experiment includes a working, client-side sandbox demonstrating its core functionality.
- **Reading Comfort**:
  - Dark / Light mode toggle with zero flash of unstyled content (FOUC).
  - Font size controls (`A+` / `A−`) for comfortable reading.
  - Dedicated print stylesheet (`@media print`) for clean paper/PDF export.

---

## 🚀 Local Development Setup

To run the application locally:

```bash
# Clone the repository
git clone https://github.com/vkashyapram-byte/FSDLAB.git
cd FSDLAB

# Serve using any static HTTP server (e.g., Python or Node.js)
python3 -m http.server 3000
# or
npx serve .
```

Open `http://localhost:3000` in your browser.
