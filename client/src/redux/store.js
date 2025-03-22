import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import {bookingsReducer} from './reducers/bookingsReducer';

const rootReducer = combineReducers({
    carsReducer ,
    alertsReducer,
    bookingsReducer, // Ensure this matches the key used in `useSelector`
});

// Use Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
