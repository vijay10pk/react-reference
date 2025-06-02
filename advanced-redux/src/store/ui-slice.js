import { createSlice } from '@reduxjs/toolkit';

const initialUiState = { cartIsVisible: false, notification: null };

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible; //here it may look like we're mutating the state directly(which is not a good practice) behind the scene redux toolkit makes a copy and then update using immer package
        },
        showNotification(state,action) {
            state.notification = {
                state: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;