import { combineReducers } from "redux";
import changeModeReducer from "./AppReducer/ChangeMode";
import refreshTalkReducer from "./AppReducer/RefreshTalk";
import updateCustomerReducer from "./AppReducer/UDCustomer";
import updateListProductReducer from "./AppReducer/UDListProduct";
import updateListProductTotalReducer from "./AppReducer/UDListProductTotal";

const rootReducer = combineReducers({
    appReducer: changeModeReducer,
    refreshTalkReducer: refreshTalkReducer,
    updateCustomerReducer: updateCustomerReducer,
    updateListProductReducer: updateListProductReducer,
    updateListProductTotalReducer: updateListProductTotalReducer,
});

export default rootReducer;