import { all, takeEvery } from 'redux-saga/effects';
import { 
    CHANGE_DARK_MODE, CHANGE_LIGHT_MODE,
    REFRESH_TALK,
    UPDATE_CUSTOMER,
    UD_LST_PRD_DHD,
    UD_LST_PRD_CITK,
    UD_LST_PRD_BHNY,
    UD_LST_PRD_DXD,
    UD_LST_PRD_KTC,
    UD_LST_PRD_DB,
    UD_LST_PRD_TOTAL,
} from "../actions";
import changModeSaga from './AppSaga/ChangMode';
import refreshTalkSaga from './AppSaga/RefreshTalk';
import updateCustomerSaga from './AppSaga/UDCustomer';
import updateListProductSaga from './AppSaga/UDListProduct';
import udListProductTotalSaga from './AppSaga/UDListProductTotal';

const sagas = function* () {
    yield all([
        takeEvery(CHANGE_DARK_MODE, changModeSaga),
        takeEvery(CHANGE_LIGHT_MODE, changModeSaga),
        //Refresh Talk
        takeEvery(REFRESH_TALK, refreshTalkSaga),
        //Update Customer
        takeEvery(UPDATE_CUSTOMER, updateCustomerSaga),
        //Update List Product
        takeEvery(UD_LST_PRD_DHD, updateListProductSaga),
        takeEvery(UD_LST_PRD_CITK, updateListProductSaga),
        takeEvery(UD_LST_PRD_BHNY, updateListProductSaga),
        takeEvery(UD_LST_PRD_DXD, updateListProductSaga),
        takeEvery(UD_LST_PRD_KTC, updateListProductSaga),
        takeEvery(UD_LST_PRD_DB, updateListProductSaga),
        //Update List Product Total
        takeEvery(UD_LST_PRD_TOTAL, udListProductTotalSaga),
    ]);
}

export default sagas;