import { put, call } from 'redux-saga/effects';
import {
    UD_LST_PRD_DHD, UD_LST_PRD_DHD_SUCCESS, UD_LST_PRD_DHD_FAILED,
    UD_LST_PRD_CITK, UD_LST_PRD_CITK_SUCCESS, UD_LST_PRD_CITK_FAILED,
    UD_LST_PRD_BHNY, UD_LST_PRD_BHNY_SUCCESS, UD_LST_PRD_BHNY_FAILED,
    UD_LST_PRD_DXD, UD_LST_PRD_DXD_SUCCESS, UD_LST_PRD_DXD_FAILED,
    UD_LST_PRD_KTC, UD_LST_PRD_KTC_SUCCESS, UD_LST_PRD_KTC_FAILED,
    UD_LST_PRD_DB, UD_LST_PRD_DB_SUCCESS, UD_LST_PRD_DB_FAILED,
} from '../../actions';

function* udLstPrdDHD(action) {
    try {
        yield put({
            type: UD_LST_PRD_DHD_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_DHD_FAILED,
            payload: err,
        });
    }
};

function* udLstPrdCITK(action) {
    try {
        yield put({
            type: UD_LST_PRD_CITK_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_CITK_FAILED,
            payload: err,
        });
    }
};

function* udLstPrdBHNY(action) {
    try {
        yield put({
            type: UD_LST_PRD_BHNY_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_BHNY_FAILED,
            payload: err,
        });
    }
};

function* udLstPrdDXD(action) {
    try {
        yield put({
            type: UD_LST_PRD_DXD_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_DXD_FAILED,
            payload: err,
        });
    }
};

function* udLstPrdKTC(action) {
    try {
        yield put({
            type: UD_LST_PRD_KTC_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_KTC_FAILED,
            payload: err,
        });
    }
};

function* udLstPrdDB(action) {
    try {
        yield put({
            type: UD_LST_PRD_DB_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: UD_LST_PRD_DB_FAILED,
            payload: err,
        });
    }
};

export default function* appSaga(action) {
    if (action.type === UD_LST_PRD_DHD) {
        yield call(udLstPrdDHD, action);
    }
    if (action.type === UD_LST_PRD_CITK) {
        yield call(udLstPrdCITK, action);
    }
    if (action.type === UD_LST_PRD_BHNY) {
        yield call(udLstPrdBHNY, action);
    }
    if (action.type === UD_LST_PRD_DXD) {
        yield call(udLstPrdDXD, action);
    }
    if (action.type === UD_LST_PRD_KTC) {
        yield call(udLstPrdKTC, action);
    }
    if (action.type === UD_LST_PRD_DB) {
        yield call(udLstPrdDB, action);
    }
}