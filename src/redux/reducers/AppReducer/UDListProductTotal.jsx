import {
    UD_LST_PRD_TOTAL, UD_LST_PRD_TOTAL_SUCCESS, UD_LST_PRD_TOTAL_ERROR,
} from '../../actions';

const initialState = {
    totalDHD : 0,
    totalCITK : 0,
    totalBHNY : 0,
    totalDXD : 0,
    totalKTC : 0,
    totalDB : 0
};

const udListProductTotalReducer = (state = initialState, action) => {
    switch (action.type) {
        case UD_LST_PRD_TOTAL:
            return {
                ...state,
                totalDHD: action.payload.totalDHD,
                totalCITK: action.payload.totalCITK,
                totalBHNY: action.payload.totalBHNY,
                totalDXD: action.payload.totalDXD,
                totalKTC: action.payload.totalKTC,
                totalDB: action.payload.totalDB
            };
        case UD_LST_PRD_TOTAL_SUCCESS:
            console.log('UPDATE LIST PRODUCT TOTAL SUCCESS: ', action.payload);
            return {
                ...state,
                totalDHD: action.payload.totalDHD,
                totalCITK: action.payload.totalCITK,
                totalBHNY: action.payload.totalBHNY,
                totalDXD: action.payload.totalDXD,
                totalKTC: action.payload.totalKTC,
                totalDB: action.payload.totalDB
            };
        case UD_LST_PRD_TOTAL_ERROR:
            return {
                ...state,
                totalDHD: 0,
                totalCITK: 0,
                totalBHNY: 0,
                totalDXD: 0,
                totalKTC: 0,
                totalDB: 0
            };
        default:
            return state;
    }
};

export default udListProductTotalReducer;