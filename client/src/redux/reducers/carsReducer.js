const initialState = {
  cars: [],
  loading: false,
  error: null
};

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_CARS_REQUEST':
          return { ...state, loading: true };
      case 'GET_CARS_SUCCESS':
          return { ...state, cars: action.payload, loading: false };
      case 'GET_CARS_FAILED':
          return { ...state, error: action.payload, loading: false };
      default:
          return state;
  }
};
