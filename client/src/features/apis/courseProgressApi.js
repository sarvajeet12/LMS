import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_PROGRESS_API = "http://localhost:5000/api/v1/progress/"
const COURSE_PROGRESS_API = "https://lms-server-i8kl.onrender.com/api/v1/progress/"

export const courseProgressApi = createApi({

    // Reducer path
    reducerPath: "courseProgressApi",


    // Base url
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_API,
        credentials: "include"
    }),

    // Endpoints
    endpoints: (builder) => ({

        // of get course progress
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: "GET",
            }),

        }),

        // of update lecture progress
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),

        // of mark as complete
        markAsComplete: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/complete`,
                method: "POST"
            })
        }),

        // of mark as incomplete
        markAsInComplete: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/incomplete`,
                method: "POST"
            })
        })

    })


})


export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useMarkAsCompleteMutation,
    useMarkAsInCompleteMutation,
    
} = courseProgressApi;