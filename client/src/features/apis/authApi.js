import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userSendOtp, userLoggedIn, userLogout } from "../authSlice";

const USER_API = "http://localhost:5000/api/v1/user/"
// const USER_API = "https://lms-server-qw4r.onrender.com/api/v1/user/"

export const authApi = createApi({

    // Reducer path
    reducerPath: "authApi",

    // Refetch
    tagTypes: ['Update_User_Profile'],



    // Base url
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),

    // Endpoints
    endpoints: (builder) => ({

        // of login
        userLogin: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: "POST",
                body: inputData
            }),

            // when userLogin method run after that onQueryStated Method run and give response form queryFulfilled
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(userLoggedIn({ user: response.data.response }))
                } catch (error) {
                    console.log("Error occur while user login api: ", error)
                }
            }
        }),


        // of send-otp
        sendOtp: builder.mutation({
            query: ({ email, role }) => ({
                url: 'send-otp',
                method: "POST",
                body: { email, role }
            }),
        }),


        // of logout
        userLogout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLogout());
                } catch (error) {
                    console.log("Error occur while logout", error);
                }
            }
        }),


        // load user details
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            }),
            providesTags: ['Update_User_Profile'],
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(userLoggedIn({ user: response.data.response }));
                } catch (error) {
                    console.log("Error occur while load user data", error);
                }
            }
        }),

        // update user details
        updateUserProfile: builder.mutation({
            query: ({ firstName, lastName, gender, contactNumber, about, experience, profession }) => ({
                url: "update-profile",
                method: "PUT",
                body: { firstName, lastName, gender, contactNumber, about, experience, profession },
            }),
            invalidatesTags: ['Update_User_Profile'],
        }),

        // get enrolled courses
        getEnrolledCourses: builder.query({
            query: () => ({
                url: "/enrolled-course",
                method: "GET",
            }),
        }),


        // of update profile image
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: "update-profile-image",
                method: "PUT",
                body: formData

            })
        }),

        //of get all instructors
        getAllInstructors: builder.query({
            query: () => ({
                url: "get-all-instructors",
                method: "GET",
            })
        }),


        // of get course by instructor id
        getInstructorById: builder.query({
            query: (instructorId) => ({
                url: `instructor/${instructorId}`,
                method: "GET",
            }),
        }),
    })


})


export const {
    useUserLoginMutation,
    useSendOtpMutation,
    useUserLogoutMutation,
    useLoadUserQuery,
    useUpdateUserProfileMutation,
    useGetEnrolledCoursesQuery,
    useUpdateProfileImageMutation,
    useGetAllInstructorsQuery,
    useGetInstructorByIdQuery
} = authApi;