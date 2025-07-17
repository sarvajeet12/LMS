# 📚 MERN LMS (Learning Management System)

A **full-stack Learning Management System** built with the MERN stack (MongoDB, Express, React, Node.js). This platform enables students to enroll in courses, track progress, and interact with instructors, while instructors can create and manage courses, lectures, and student engagement.

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
│   ├── public/
│   ├── .env
│   └── ...
├── server/           # Node.js/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── configs/
│   ├── .env
│   └── ...
└── README.md
```

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

## 📝 .env File Example

**server/.env**
```dotenv
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/LMS
PORT=5000
JWT_SECRET_KEY=LMS
JWT_EXPIRES=1d
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET_KEY=your_cloudinary_api_secret
FOLDER_NAME=LMS
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**client/.env**
```dotenv
VITE_RAZORPAY_ID=your_razorpay_key_id
```

---

## 📦 Dependencies

### **Backend (server)**

- **cloudinary**: ^2.6.0
- **cookie-parser**: ^1.4.7
- **cors**: ^2.8.5
- **dotenv**: ^16.5.0
- **express**: ^5.1.0
- **express-fileupload**: ^1.5.1
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.13.2
- **nodemailer**: ^6.10.1
- **nodemon**: ^3.1.9
- **otp-generator**: ^4.0.1
- **razorpay**: ^2.9.6

### **Frontend (client)**

- **@reduxjs/toolkit**: ^2.7.0
- **@tailwindcss/vite**: ^4.1.3
- **axios**: ^1.8.4
- **dotenv**: ^16.5.0
- **motion**: ^12.12.1
- **react**: ^19.0.0
- **react-countup**: ^6.5.3
- **react-dom**: ^19.0.0
- **react-icons**: ^5.5.0
- **react-otp-input**: ^3.1.1
- **react-player**: ^2.16.0
- **react-quill-new**: ^3.4.6
- **react-redux**: ^9.2.0
- **react-router-dom**: ^7.5.0
- **react-slick**: ^0.30.3
- **react-toastify**: ^11.0.5
- **recharts**: ^2.15.3
- **redux-persist**: ^6.0.0
- **slick-carousel**: ^1.8.1
- **tailwindcss**: ^4.1.3

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
