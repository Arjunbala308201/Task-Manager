import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        setUser(state,action){
            return action.payload
        },
        clearStore(){
            return null
        }
    }
})
export const {setUser,clearStore} = userSlice.actions
export default userSlice.reducer