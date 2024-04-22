import {
    UD_LST_PRD_DHD, UD_LST_PRD_DHD_SUCCESS, UD_LST_PRD_DHD_FAILED,
    UD_LST_PRD_CITK, UD_LST_PRD_CITK_SUCCESS, UD_LST_PRD_CITK_FAILED,
    UD_LST_PRD_BHNY, UD_LST_PRD_BHNY_SUCCESS, UD_LST_PRD_BHNY_FAILED,
    UD_LST_PRD_DXD, UD_LST_PRD_DXD_SUCCESS, UD_LST_PRD_DXD_FAILED,
    UD_LST_PRD_KTC, UD_LST_PRD_KTC_SUCCESS, UD_LST_PRD_KTC_FAILED,
    UD_LST_PRD_DB, UD_LST_PRD_DB_SUCCESS, UD_LST_PRD_DB_FAILED,
} from '../../actions';

const initialState = {
    listProductDHD: [],
    listProductCITK: [],
    listProductBHNY: [],
    listProductDXD: [],
    listProductKTC: [],
    listProductDB: [],
};

const udListProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case UD_LST_PRD_DHD:
            return {
                ...state,
                listProductDHD: action.payload.listProductDHD
            };
        case UD_LST_PRD_DHD_SUCCESS:
            return {
                ...state,
                listProductDHD: action.payload.listProductDHD
            };
        case UD_LST_PRD_DHD_FAILED:
            return {
                ...state,
            };
        case UD_LST_PRD_CITK:
            return {
                ...state,
                listProductCITK: action.payload.listProductCITK
            };
        case UD_LST_PRD_CITK_SUCCESS:
            return {
                ...state,
                listProductCITK: action.payload.listProductCITK
            };
        case UD_LST_PRD_CITK_FAILED:
            return {
                ...state,
            };
        case UD_LST_PRD_BHNY:
            return {
                ...state,
                listProductBHNY: action.payload.listProductBHNY
            };
        case UD_LST_PRD_BHNY_SUCCESS:
            return {
                ...state,
                listProductBHNY: action.payload.listProductBHNY
            };
        case UD_LST_PRD_BHNY_FAILED:
            return {
                ...state,
            };
        case UD_LST_PRD_DXD:
            return {
                ...state,
                listProductDXD: action.payload.listProductDXD
            };
        case UD_LST_PRD_DXD_SUCCESS:
            return {
                ...state,
                listProductDXD: action.payload.listProductDXD
            };
        case UD_LST_PRD_DXD_FAILED:
            return {
                ...state,
            };
        case UD_LST_PRD_KTC:
            return {
                ...state,
                listProductKTC: action.payload.listProductKTC
            };
        case UD_LST_PRD_KTC_SUCCESS:
            return {
                ...state,
                listProductKTC: action.payload.listProductKTC
            };
        case UD_LST_PRD_KTC_FAILED:
            return {
                ...state,
            };
        case UD_LST_PRD_DB:
            return {
                ...state,
                listProductDB: action.payload.listProductDB
            };
        case UD_LST_PRD_DB_SUCCESS:
            return {
                ...state,
                listProductDB: action.payload.listProductDB
            };
        case UD_LST_PRD_DB_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default udListProductReducer;