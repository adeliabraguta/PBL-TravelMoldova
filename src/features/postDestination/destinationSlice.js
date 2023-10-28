import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    address:null,
    long_desc: null,
    short_desc:null,
    title:null,
}
const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers:{
        setDestination: (state, action) => {
            const {address, long_desc, short_desc,title} =action.payload
            state.address = address
            state.long_desc = long_desc
            state.short_desc = short_desc
            state.title = title
        }
    }
})
export const {setDestination} = destinationSlice.actions
export default destinationSlice.reducer