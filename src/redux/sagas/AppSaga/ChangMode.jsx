import { put, call } from 'redux-saga/effects';
import { 
    CHANGE_DARK_MODE, 
    CHANGE_DARK_MODE_S,
    CHANGE_DARK_MODE_F,
    CHANGE_LIGHT_MODE,
    CHANGE_LIGHT_MODE_S,
    CHANGE_LIGHT_MODE_F,
} from '../../actions';

function* changeDarkModeSaga(action) {
    try {
        yield put({
            type: CHANGE_DARK_MODE_S,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: CHANGE_DARK_MODE_F,
            payload: err,
        });
    }
}

function* changeLightModeSaga(action) {
    try {
        yield put({
            type: CHANGE_LIGHT_MODE_S,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: CHANGE_LIGHT_MODE_F,
            payload: err,
        });
    }
}

export default function* appSaga (action) {
    if (action.type === CHANGE_DARK_MODE) {
        yield call(changeDarkModeSaga, action);
    } else if (action.type === CHANGE_LIGHT_MODE) {
        yield call(changeLightModeSaga, action);
    }
}