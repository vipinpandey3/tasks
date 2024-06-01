import * as types from '../types';

const initialState = {
    openPopup: false
}

const genericReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_POPUP:
            return {
                ...state,
                openPopup: action.payload
            }
    
        default:
            return state
    }
};

export default genericReducer