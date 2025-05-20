import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_API = "http://localhost:5000/api/v1/purchase/"
// const PURCHASE_API = "https://lms-server-qw4r.onrender.com/api/v1/purchase/"

export const purchaseApi = createApi({

    // Reducer path
    reducerPath: "purchaseApi",


    // Base url
    baseQuery: fetchBaseQuery({
        baseUrl: PURCHASE_API,
        credentials: "include"
    }),

    // Endpoints
    endpoints: (builder) => ({

        // of capture payment
        capturePayment: builder.mutation({
            query: (courseId) => ({
                url: 'capture-payment',
                method: "POST",
                body: { courseId }
            }),
        }),

        // of details with status
        getCourseWithPaymentStatus: builder.query({
            query: (courseId) => ({
                url: `course/${courseId}/details-with-status`,
                method: "GET",
            }),
        }),

        // of get all purchase courses
        getAllPurchasedCourses: builder.query({
            query: () => ({
                url: 'courses',
                method: "GET",
            }),
        }),

        // of get course by instructor id
        getCourseByInstructorId: builder.query({
            query: () => ({
                url: 'instructor-courses',
                method: "GET",
            }),
        }),

        // of get all instructors
        getAllInstructors: builder.query({
            query: () => ({
                url: "instructors",
                method: "GET",
            })
        }),

        // of get course by instructor id
        getCourseByInstructorIdByParams: builder.query({
            query: (instructorId) => ({
                url: `instructor/${instructorId}`,
                method: "GET",
            }),
        }),
    })
})


export const {
    useCapturePaymentMutation,
    useGetCourseWithPaymentStatusQuery,
    useGetAllPurchasedCoursesQuery,
    useGetCourseByInstructorIdQuery,
    useGetAllInstructorsQuery,
    useGetCourseByInstructorIdByParamsQuery
} = purchaseApi;