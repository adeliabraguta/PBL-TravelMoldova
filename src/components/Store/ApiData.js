import {useEffect, useReducer} from "react";
import {createStore} from "redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

const initialState = {
    destinations: [],
    status: 'loading'
}

const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: initialState,
    reducers: {
        setDestinations(state, action) {
            state.destinations = action.payload;
        }
    }
})

export const store = configureStore({
    reducer: destinationsSlice.reducer
})

export const { setDestinations } = destinationsSlice.actions;

