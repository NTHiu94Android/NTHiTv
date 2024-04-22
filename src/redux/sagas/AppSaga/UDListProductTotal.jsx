import { put, call } from 'redux-saga/effects';
import {
    UD_LST_PRD_TOTAL, UD_LST_PRD_TOTAL_SUCCESS, UD_LST_PRD_TOTAL_ERROR,
} from '../../actions';

function* udListProductTotal(action) {
    try {
        yield put({
            type: UD_LST_PRD_TOTAL_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_TOTAL_ERROR,
            payload: err,
        });
    }
};

export default function* appSaga(action) {
    if (action.type === UD_LST_PRD_TOTAL) {
        yield call(udListProductTotal, action);
    }
};