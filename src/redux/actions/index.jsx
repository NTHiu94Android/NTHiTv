import {
    CHANGE_DARK_MODE, CHANGE_DARK_MODE_S, CHANGE_DARK_MODE_F,
    CHANGE_LIGHT_MODE, CHANGE_LIGHT_MODE_S, CHANGE_LIGHT_MODE_F,
    changDarkMode, changDarkModeS, changDarkModeF,
    changLightMode, changLightModeS, changLightModeF
} from './AppAction/ChangeMode';

import {
    REFRESH_TALK, REFRESH_TALK_SUCCESS, REFRESH_TALK_FAILED,
    refreshTalk, refreshTalkSuccess, refreshTalkFailed
} from './AppAction/RefreshTalk';

import {
    UPDATE_CUSTOMER, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILED,
    updateCustomer, updateCustomerSuccess, updateCustomerFailed
} from './AppAction/UDCustomer';

import {
    UD_LST_PRD_DHD, UD_LST_PRD_DHD_SUCCESS, UD_LST_PRD_DHD_FAILED,
    udLstPrdDHD, udLstPrdDHDSuccess, udLstPrdDHDFailed,
    UD_LST_PRD_CITK, UD_LST_PRD_CITK_SUCCESS, UD_LST_PRD_CITK_FAILED,
    udLstPrdCITK, udLstPrdCITKSuccess, udLstPrdCITKFailed,
    UD_LST_PRD_BHNY, UD_LST_PRD_BHNY_SUCCESS, UD_LST_PRD_BHNY_FAILED,
    udLstPrdBHNY, udLstPrdBHNYSuccess, udLstPrdBHNYFailed,
    UD_LST_PRD_DXD, UD_LST_PRD_DXD_SUCCESS, UD_LST_PRD_DXD_FAILED,
    udLstPrdDXD, udLstPrdDXDSuccess, udLstPrdDXDFailed,
    UD_LST_PRD_KTC, UD_LST_PRD_KTC_SUCCESS, UD_LST_PRD_KTC_FAILED,
    udLstPrdKTC, udLstPrdKTCSuccess, udLstPrdKTCFailed,
    UD_LST_PRD_DB, UD_LST_PRD_DB_SUCCESS, UD_LST_PRD_DB_FAILED,
    udLstPrdDB, udLstPrdDBSuccess, udLstPrdDBFailed,
} from './AppAction/UDListProduct';

import {
    UD_LST_PRD_TOTAL, UD_LST_PRD_TOTAL_SUCCESS, UD_LST_PRD_TOTAL_ERROR,
    udListProductTotal, udListProductTotalSuccess, udListProductTotalError
} from './AppAction/UDListProductTotal';

export {
    // ----------App action---------------
    // Change mode
    CHANGE_DARK_MODE, CHANGE_DARK_MODE_S, CHANGE_DARK_MODE_F,
    CHANGE_LIGHT_MODE, CHANGE_LIGHT_MODE_S, CHANGE_LIGHT_MODE_F,
    changDarkMode, changDarkModeS, changDarkModeF,
    changLightMode, changLightModeS, changLightModeF,

    // Refresh talk
    REFRESH_TALK, REFRESH_TALK_SUCCESS, REFRESH_TALK_FAILED,
    refreshTalk, refreshTalkSuccess, refreshTalkFailed,

    // Update customer
    UPDATE_CUSTOMER, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILED,
    updateCustomer, updateCustomerSuccess, updateCustomerFailed,

    // Update list product
    UD_LST_PRD_DHD, UD_LST_PRD_DHD_SUCCESS, UD_LST_PRD_DHD_FAILED,
    udLstPrdDHD, udLstPrdDHDSuccess, udLstPrdDHDFailed,
    UD_LST_PRD_CITK, UD_LST_PRD_CITK_SUCCESS, UD_LST_PRD_CITK_FAILED,
    udLstPrdCITK, udLstPrdCITKSuccess, udLstPrdCITKFailed,
    UD_LST_PRD_BHNY, UD_LST_PRD_BHNY_SUCCESS, UD_LST_PRD_BHNY_FAILED,
    udLstPrdBHNY, udLstPrdBHNYSuccess, udLstPrdBHNYFailed,
    UD_LST_PRD_DXD, UD_LST_PRD_DXD_SUCCESS, UD_LST_PRD_DXD_FAILED,
    udLstPrdDXD, udLstPrdDXDSuccess, udLstPrdDXDFailed,
    UD_LST_PRD_KTC, UD_LST_PRD_KTC_SUCCESS, UD_LST_PRD_KTC_FAILED,
    udLstPrdKTC, udLstPrdKTCSuccess, udLstPrdKTCFailed,
    UD_LST_PRD_DB, UD_LST_PRD_DB_SUCCESS, UD_LST_PRD_DB_FAILED,
    udLstPrdDB, udLstPrdDBSuccess, udLstPrdDBFailed,

    // Update list product total
    UD_LST_PRD_TOTAL, UD_LST_PRD_TOTAL_SUCCESS, UD_LST_PRD_TOTAL_ERROR,
    udListProductTotal, udListProductTotalSuccess, udListProductTotalError

}