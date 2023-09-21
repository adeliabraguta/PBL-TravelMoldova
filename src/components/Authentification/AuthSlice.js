import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: {name: null}, access_token: null},
    reducers: {
        setCredentials: (state,{payload: {user, access_token}}) => {
            state.user = user
            state.access_token = access_token
        },
        unsetCredentials: (state, action)=> {
            state.user = {name: null}
            state.access_token= null
        },
        // check https://redux-toolkit.js.org/api/createReducer#builderaddmatcher
       //  addMatcher(apiAuth.endpoints.loginUser.)
    }

})
export const { setCredentials, unsetCredentials} = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = ( state) => state.auth.user.name
export const selectCurrentToken= ( state) => state.auth.access_token
