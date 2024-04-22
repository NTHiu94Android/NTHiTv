import { UPDATE_CUSTOMER, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILED } from '../../actions';

const initialState = {
    customer : {}
};

const updateCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CUSTOMER:
            return {
                ...state,
                customer: action.payload.customer
            };
        case UPDATE_CUSTOMER_SUCCESS:
            console.log('UPDATE_CUSTOMER_SUCCESS', action.payload);
            return {
                ...state,
                customer: action.payload.customer
            };
        case UPDATE_CUSTOMER_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default updateCustomerReducer;