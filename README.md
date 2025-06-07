# Food Delivery Website

This is a complete **Food Delivery Web Application** built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports full user authentication, file/image uploads, restaurant and food management, order system, and secure online payment integration.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

### User Module
- User Registration, Login, Logout
- JWT-based authentication
- Role-based access control (Admin, User)

### Admin Panel
- Add/edit/delete restaurants and food items
- Manage users and orders
- View dashboard with analytics

### Restaurant & Food System
- Add restaurants with image, category, and address
- Add food items to each restaurant
- Upload food images using Cloudinary or local storage
- Filter by category and restaurant

### Order System
- Add to cart
- Place order
- Track order status (Pending, Confirmed, Out for Delivery, Delivered)

### Payment Integration
- Integrated with Razorpay/Stripe for online payments
- Handle payment success/failure responses
- Generate order receipts

### Other Features
- Fully responsive layout (mobile to desktop)
- Error handling on both frontend and backend
- Secure password hashing with bcrypt
- Protected routes with middleware
- MongoDB for storing user, food, restaurant, and order data

---

## Tech Stack

### Frontend
- React.js
- Axios for HTTP requests
- React Router DOM
- Tailwind CSS or custom CSS
- React Toastify for alerts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Bcrypt for password encryption
- JWT for authentication
- Multer / Cloudinary for file uploads
- Stripe / Razorpay for payments

---


