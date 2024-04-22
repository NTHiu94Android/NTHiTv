export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILED = 'UPDATE_CUSTOMER_FAILED';

export const updateCustomer = (payload) => {
    return {
        type: UPDATE_CUSTOMER,
        payload
    }
};

export const updateCustomerSuccess = (payload) => {
    return {
        type: UPDATE_CUSTOMER_SUCCESS,
        payload
    }
};

export const updateCustomerFailed = (payload) => {
    return {
        type: UPDATE_CUSTOMER_FAILED,
        payload
    }
};