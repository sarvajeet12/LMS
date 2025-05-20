import { configureStore } from "@reduxjs/toolkit"

// Redux Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Root reducer
import rootReducer from "./rootReducer"



// Persist Configuration
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


// Apis
import { authApi } from "../features/apis/authApi"
import { courseApi } from "../features/apis/courseApi"
import { purchaseApi } from "../features/apis/purchaseApi"
import { courseProgressApi } from "../features/apis/courseProgressApi"


export const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => defaultMiddleware({
        serializableCheck: false
    }).concat(
        authApi.middleware,
        courseApi.middleware,
        purchaseApi.middleware,
        courseProgressApi.middleware,
    )
})




const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp();


const persistor = persistStore(appStore);

export default persistor;

// This store.js add in main.jsx