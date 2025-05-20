import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:5000/api/v1/course/"
// const COURSE_API = "https://lms-server-qw4r.onrender.com/api/v1/course/"

export const courseApi = createApi({

    // Reducer path
    reducerPath: "courseApi",

    // Refetch
    tagTypes: ['Refetch_Creator_Course', 'Refetch_Edit_Course', 'Refetch_Create_Lecture', 'Refetch_LECTURE_BY_ID'],

    // Base url
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),

    // Endpoints
    endpoints: (builder) => ({

        // of create course
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: 'create',
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['Refetch_Creator_Course'],
        }),


        // of fetch create creator course
        fetchCourses: builder.query({
            query: () => ({
                url: 'fetch-creator-course',
                method: "GET"
            }),
            providesTags: ['Refetch_Creator_Course'],
        }),

        // of create course
        editCourse: builder.mutation({
            query: ({ formDataInput, courseId }) => ({
                url: `edit/${courseId}`,
                method: "PUT",
                body: formDataInput
            }),
            invalidatesTags: ['Refetch_Creator_Course', 'Refetch_Edit_Course'],
        }),

        // of get particular create course
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `get/${courseId}`,
                method: "GET",
            }),
            providesTags: ['Refetch_Edit_Course'],
        }),

        // of create lecture
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `create-lecture/${courseId}`,
                method: "POST",
                body: { lectureTitle }
            }),
            invalidatesTags: ['Refetch_Create_Lecture'],
        }),

        // of fetch lectures
        fetchLectures: builder.query({
            query: (courseId) => ({
                url: `fetch-lectures/${courseId}`,
                method: "GET"
            }),
            providesTags: ['Refetch_Create_Lecture'],
        }),

        // of edit lecture
        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isToggled, courseId, lectureId }) => ({
                url: `${courseId}/lecture/edit/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isToggled }
            }),
            invalidatesTags: ['Refetch_LECTURE_BY_ID'],
        }),

        // of remove lecture
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `lecture/remove/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Refetch_Create_Lecture'],
        }),

        // of get lecture by id
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `lecture/${lectureId}`,
                method: "GET"
            }),
            providesTags: ['Refetch_LECTURE_BY_ID']
        }),

        // of publish Course
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `publish/${courseId}?publish=${query}`,
                method: "PUT"
            }),
            invalidatesTags: ['Refetch_Creator_Course'],
        }),

        // of get lecture by id
        fetchPublishCourse: builder.query({
            query: () => ({
                url: `publish`,
                method: "GET"
            }),
        }),

        // of give review
        courseReview: builder.mutation({
            query: ({ courseId, reviewDescription, rating }) => ({
                url: `review`,
                method: "POST",
                body: { courseId, reviewDescription, rating }
            }),
        }),

        // of get all reviews of a course
        getReviews: builder.query({
            query: (courseId) => ({
                url: `get-review/${courseId}`,
                method: "GET"
            }),
        }),

        // of get all reviews 
        getAllReviews: builder.query({
            query: () => ({
                url: `get-all-review`,
                method: "GET"
            }),
        }),

        // of recommend course
        getRecommendedCourses: builder.query({
            query: (courseId) => ({
                url: `recommend/course/${courseId}`,
                method: "GET",
            }),
        }),
    })
})


export const {
    useCreateCourseMutation,
    useFetchCoursesQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useFetchLecturesQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useFetchPublishCourseQuery,
    useCourseReviewMutation,
    useGetReviewsQuery,
    useGetAllReviewsQuery,
    useGetRecommendedCoursesQuery

} = courseApi;