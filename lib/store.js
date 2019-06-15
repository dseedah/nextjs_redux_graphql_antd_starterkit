import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const setInitialState = {
    collapsedSidebar: false,
    selectedCountry: null
};

export const actionTypes = {
    TOGGLESIDEBAR: 'TOGGLESIDEBAR',
    GETCOUNTRYDETAILS: 'GETCOUNTRYDETAILS'
};

// REDUCERS
export const reducer = (state = setInitialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLESIDEBAR:
            return Object.assign({}, state, {
                collapsedSidebar: !state.collapsedSidebar
            });
        case actionTypes.GETCOUNTRYDETAILS:
            return Object.assign({}, state, {
                selectedCountry: action.country
            });
        default:
            return state;
    }
};

//ACTIONS
export const getCountryDetails = (country) => {
    return { type: actionTypes.GETCOUNTRYDETAILS, country: country };
};

export const toggleSidebar = () => {
    return { type: actionTypes.TOGGLESIDEBAR };
};

export function initializeStore(initialState = setInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    );
};