# 📚 MERN LMS (Learning Management System)

A **full-stack Learning Management System** built with the MERN stack (MongoDB, Express, React, Node.js). This platform enables students to enroll in courses, track progress, and interact with instructors, while instructors can create and manage courses, lectures, and student engagement.

---
## 🌐 Deployment : https://lms-client-33e7.onrender.com
---

## 🚀 Features

- **User Authentication:** Secure login/signup with OTP verification.
- **Role-based Access:** Student, Instructor, and Admin dashboards.
- **Course Management:** Instructors can create, edit, publish, and manage courses and lectures.
- **Lecture Video Upload:** Upload and stream lecture videos.
- **Progress Tracking:** Students can track their course and lecture completion.
- **Payment Integration:** Razorpay integration for course purchases.
- **Reviews & Ratings:** Students can review and rate courses.
- **Responsive UI:** Modern, mobile-friendly interface.
- **Admin Panel:** Manage users, courses, and platform analytics.

---

## 🗂️ Folder Structure

```
LMS/
├── client/           # React frontend
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── routers.jsx
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── server/           # Node.js/Express backend
│   ├── configs/
│   │   ├── db-config.js
│   │   ├── mail-config.js
│   │   └── razorpay-config.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   ├── templates/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
```

---

## 🛠️ API Example

### **Course Creation**

**Request:**
```http
POST /api/v1/course/create
Content-Type: application/json
Authorization: Bearer <token>
{
  "courseTitle": "React for Beginners",
  "category": "Programming"
}
```

**Response:**
```json
{
  "response": {
    "_id": "65f1c2...",
    "courseTitle": "React for Beginners",
    "category": "Programming",
    "creator": "65f1b9...",
    ...
  },
  "message": "Course Created Successfully"
}
```

### **Course Progress**

**Request:**
```http
GET /api/v1/progress/:courseId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "data": {
    "courseDetails": { ... },
    "progress": [
      { "lectureId": "abc123", "viewed": true }
    ],
    "completed": false
  }
}
```

---

## 📖 Definitions

- **Course:** A collection of lectures created by an instructor.
- **Lecture:** A video or lesson within a course.
- **User Roles:** Student, Instructor, Admin.
- **Progress:** Tracks which lectures a student has completed.
- **Review:** Feedback and rating given by a student for a course.

---

## 💻 Tech Stack

**Frontend:**
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router
- React Toastify
- React Slick (carousel)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Cloudinary (media uploads)
- Razorpay (payments)
- Nodemailer (emails)

---

## 📦 Dependencies

### **Backend (server)**

- **cloudinary**: Image/video uploads
- **cookie-parser**: Cookie handling
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **express**: Web framework
- **express-fileupload**: File uploads
- **jsonwebtoken**: JWT authentication
- **mongoose**: MongoDB ODM
- **nodemailer**: Email sending
- **nodemon**: Dev server reload
- **otp-generator**: OTP creation
- **razorpay**: Payment gateway

### **Frontend (client)**

- **@reduxjs/toolkit**: State management
- **@tailwindcss/vite**: Tailwind CSS integration
- **axios**: HTTP requests
- **dotenv**: Env variables
- **motion**: Animations
- **react**: UI library
- **react-countup**: Animated counters
- **react-dom**: DOM bindings
- **react-icons**: Icon library
- **react-otp-input**: OTP input
- **react-player**: Video player
- **react-quill-new**: Rich text editor
- **react-redux**: Redux bindings
- **react-router-dom**: Routing
- **react-slick**: Carousel
- **react-toastify**: Toast notifications
- **recharts**: Charts
- **redux-persist**: State persistence
- **slick-carousel**: Carousel styles
- **tailwindcss**: CSS framework

---

## ⚙️ Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/mern-lms.git
cd mern-lms
```

### 2. **Install Dependencies**

**Backend:**
```sh
cd server
npm install
```

**Frontend:**
```sh
cd ../client
npm install
```

### 3. **Setup Environment Variables**

#### Backend (`server/.env`):

```dotenv
DATABASE_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=1d

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET_KEY=your_cloudinary_api_secret
FOLDER_NAME=LMS

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Frontend (`client/.env`):

```dotenv
VITE_RAZORPAY_ID=your_razorpay_key_id
```

### 4. **Run the Application**

**Backend:**
```sh
cd server
npm start
```

**Frontend:**
```sh
cd client
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 💡 Tips

- **Use correct .env values** for your environment.
- **Razorpay** and **Cloudinary** require valid API keys.
- **Nodemailer** uses an app password for Gmail (not your main password).
- **MongoDB Atlas** is recommended for cloud database hosting.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Enjoy learning and teaching with MERN LMS!**
