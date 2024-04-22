import { put, call } from 'redux-saga/effects';
import { 
    REFRESH_TALK, 
    REFRESH_TALK_SUCCESS,
    REFRESH_TALK_FAILED,
} from '../../actions';

function* refreshTalkSaga(action) {
    try {
        yield put({
            type: REFRESH_TALK_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: REFRESH_TALK_FAILED,
            payload: err,
        });
    }
}

export default function* appSaga (action) {
    if (action.type === REFRESH_TALK) {
        yield call(refreshTalkSaga, action);
    }
}