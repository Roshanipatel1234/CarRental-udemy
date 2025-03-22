const initialState = {
    bookings: [], 
    loading: false,
    error: null
};

export const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKINGS_REQUEST':
            return { ...state, loading: true, error: null };

        case 'GET_BOOKINGS_SUCCESS':
            console.log("Reducer Payload:", action.payload); // Debugging
            return { ...state, bookings: action.payload, loading: false };

        case 'GET_BOOKINGS_FAILURE':
            console.error("Error Fetching Bookings:", action.payload);
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
