import {
    CHANGE_DARK_MODE,
    CHANGE_DARK_MODE_S,
    CHANGE_DARK_MODE_F,
    CHANGE_LIGHT_MODE,
    CHANGE_LIGHT_MODE_S,
    CHANGE_LIGHT_MODE_F,
} from '../../actions';

const initialState = {
    darkMode: true,
    lightMode: false,
    loading: false,
    error: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DARK_MODE:
            return {
                ...state,
                loading: true,
            };
        case CHANGE_DARK_MODE_S:
            return {
                ...state,
                darkMode: true,
                lightMode: false,
                loading: false,
            };
        case CHANGE_DARK_MODE_F:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CHANGE_LIGHT_MODE:
            return {
                ...state,
                loading: true,
            };
        case CHANGE_LIGHT_MODE_S:
            return {
                ...state,
                darkMode: false,
                lightMode: true,
                loading: false,
            };
        case CHANGE_LIGHT_MODE_F:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default appReducer;