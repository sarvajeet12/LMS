import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import MyLearning from "./pages/MyLearning.jsx";
import Profile from "./pages/Profile.jsx";
import InstructorLayout from "./pages/InstructorLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CourseList from "./pages/CourseList.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";
import CourseEdit from "./pages/CourseEdit.jsx";
import CreateLecture from "./pages/CreateLecture.jsx";
import EditLecture from "./pages/EditLecture.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import CourseProgress from "./pages/CourseProgress.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Review from "./pages/Review.jsx";
import {
  AdminRoute,
  InstructorRoute,
  ProtectedRoute,
} from "./components/common/ProtectRouters.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import InstructorById from "./components/core/admin/InstructorById.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProfileImageEdit from "./pages/ProfileImageEdit.jsx";
import ExploreInstructors from "./pages/ExploreInstructors.jsx";
import InstructorDetails from "./pages/InstructorDetails.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/explore-instructors", element: <ExploreInstructors /> },
      {
        path: "/instructor-details/:instructorId",
        element: <InstructorDetails />,
      },
      {
        path: "/my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:userId/edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile-image/:userId/edit",
        element: (
          <ProtectedRoute>
            <ProfileImageEdit />
          </ProtectedRoute>
        ),
      },
      { path: "/courses-list", element: <CourseList /> },
      {
        path: "/course-details/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      }, // Here id is courseId
      {
        path: "/course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <CourseProgress />
          </ProtectedRoute>
        ),
      }, // Here id is courseId
      {
        path: "/review/:courseId",
        element: (
          <ProtectedRoute>
            <Review />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Error /> },

      //Instructor
      {
        element: (
          <InstructorRoute>
            <InstructorLayout />
          </InstructorRoute>
        ),
        children: [
          {
            path: "instructor/:instructorId/dashboard",
            element: <Dashboard />,
          },
          { path: "instructor/:instructorId/course", element: <Courses /> },
          {
            path: "instructor/:instructorId/course/create",
            element: <CreateCourse />,
          },
          {
            path: "instructor/:instructorId/course/edit/:id",
            element: <CourseEdit />,
          }, // Here id is courseId
          {
            path: "instructor/:instructorId/course/:id/lecture",
            element: <CreateLecture />,
          }, // Here id is courseId
          {
            path: "instructor/:instructorId/course/:courseId/lecture/edit/:lectureId",
            element: <EditLecture />,
          },

          { path: "*", element: <Error /> },
        ],
      },
      {
        element: (
          // <AdminRoute>
          <AdminLayout />
          // </AdminRoute>
        ),
        children: [
          { path: "admin/dashboard", element: <AdminDashboard /> },
          {
            path: "admin/dashboard/instructor/:instructorId",
            element: <InstructorById />,
          },

          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
