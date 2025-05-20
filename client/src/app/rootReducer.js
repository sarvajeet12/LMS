import { combineReducers, createDynamicMiddleware } from "@reduxjs/toolkit"



// import auth Slice
import authReducer from "../features/authSlice"



// import auth api
import { authApi } from "../features/apis/authApi"
import { courseApi } from "../features/apis/courseApi";
import { purchaseApi } from "../features/apis/purchaseApi";
import { courseProgressApi } from "../features/apis/courseProgressApi";



const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    auth: authReducer
});



export default rootReducer;