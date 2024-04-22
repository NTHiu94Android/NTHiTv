import {
    REFRESH_TALK,
    REFRESH_TALK_SUCCESS,
    REFRESH_TALK_FAILED
} from '../../actions';

const initialState = {
    isRefresh: false,
    isLoading: false,
    error: null,
};

const refreshTalkReducer = (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_TALK:
            return {
                ...state,
                isLoading: true,
            };
        case REFRESH_TALK_SUCCESS:
            return {
                ...state,
                isRefresh: action.payload.isRefresh,
                isLoading: false,
            };
        case REFRESH_TALK_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default refreshTalkReducer;