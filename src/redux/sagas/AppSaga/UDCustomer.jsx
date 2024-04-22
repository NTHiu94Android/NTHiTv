import { put, call } from 'redux-saga/effects';
import { 
    UPDATE_CUSTOMER, 
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILED,
} from '../../actions';

function* updateCustomerSaga(action) {
    try {
        yield put({
            type: UPDATE_CUSTOMER_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UPDATE_CUSTOMER_FAILED,
            payload: err,
        });
    }
};

export default function* appSaga (action) {
    if (action.type === UPDATE_CUSTOMER) {
        yield call(updateCustomerSaga, action);
    }
}