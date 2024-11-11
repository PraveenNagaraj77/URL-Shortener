![url2](https://github.com/user-attachments/assets/8198aed5-ed36-49d8-a88e-abee7e13ef8a)



**URL Shortener Project**

**Overview**
This project implements a simple URL Shortener application using NestJS, Next.js, and MongoDB. It allows users to shorten long URLs, manage their shortened links, and delete them when no longer needed. The application provides a simple, user-friendly interface for shortening URLs and interacting with the shortened data through an intuitive REST API.

**Features**
URL Shortening: Users can input long URLs and generate a shortened version.
URL Management: Users can view, delete, and manage the URLs they’ve shortened.
Short URL Redirection: Each shortened URL redirects users to the original long URL.
MongoDB Integration: Data (long URL, short URL, short code) is stored in a MongoDB database.
API Integration: The project includes a backend API built with NestJS to handle URL shortening, deletion, and retrieval.

**Project Structure**

**Backend (NestJS)**

The backend is built using NestJS, a TypeScript-based Node.js framework, that provides a scalable and maintainable structure for building APIs.

**Dependencies:**

NestJS for building the API.
Mongoose for MongoDB integration.
JWT for handling token-based authentication (if extended in the future).
Crypto for generating unique short codes.

**API Endpoints:**

POST /shorten: Accepts a long URL and returns a shortened version.
GET /urls: Fetches all shortened URLs.
GET /
: Redirects to the original URL based on the short code.
DELETE /
: Deletes a URL from the database.

Database: The backend uses MongoDB to store URL records in a collection with the following fields:

longUrl: The original long URL.
shortUrl: The shortened URL.
shortCode: A unique identifier for the shortened URL.

**Frontend (Next.js)**
The frontend is built using Next.js, which is a React framework that allows for server-side rendering, static site generation, and building efficient, SEO-friendly web applications.

**UI Features:**
Input form for submitting long URLs to be shortened.
Display of the shortened URL and the unique short code.
Table to list all shortened URLs with options to copy or delete.
Buttons to trigger API requests for shortening and managing URLs.

**Styling:**
TailwindCSS is used for responsive and modern UI design.
The frontend communicates with the backend using Axios to make HTTP requests for URL shortening and deletion.

**MongoDB**
MongoDB is used for data persistence, storing the long URLs, shortened URLs, and their corresponding short codes in a collection.
The Mongoose library is used to manage database connections and schema definitions.

**Technologies Used**

**Backend:**

NestJS: A framework for building efficient, reliable, and scalable server-side applications.
MongoDB: A NoSQL database used for storing URL data.
Mongoose: An ODM (Object Document Mapper) library for MongoDB and Node.js.

**Frontend:**

Next.js: A React-based framework for building frontend applications with server-side rendering and static site generation.
TailwindCSS: A utility-first CSS framework used for styling the application.
Axios: A promise-based HTTP client for making requests from the frontend to the backend.

**Database:**

MongoDB: A NoSQL database used for storing the URLs and their metadata.

**Conclusion**

This URL Shortener project provides an easy-to-use application for shortening and managing URLs. By leveraging modern web technologies such as NestJS, Next.js, and MongoDB, the application is both scalable and maintainable, with room for further improvements and feature additions. The project showcases how to build a full-stack application with a robust backend API and a simple, intuitive frontend interface.
