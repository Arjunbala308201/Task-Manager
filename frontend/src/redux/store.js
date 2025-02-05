import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage  from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";
import userSlice from "./userSlice.js";

const rootReducer = combineReducers({
      user:userSlice
})

const persistConfig= {
    key:'root',
    storage:storage,
    version:1
}

const persistreducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
       reducer: persistreducer,
        middleware:(getDefaulltMiddleware) => getDefaulltMiddleware({
            serializableCheck:false
        })
}) 

export const persistor = persistStore(store)