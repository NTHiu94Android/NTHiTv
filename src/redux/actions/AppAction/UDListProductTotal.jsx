export const UD_LST_PRD_TOTAL = 'UD_LST_PRD_TOTAL';
export const UD_LST_PRD_TOTAL_SUCCESS = 'UD_LST_PRD_TOTAL_SUCCESS';
export const UD_LST_PRD_TOTAL_ERROR = 'UD_LST_PRD_TOTAL_ERROR';

export const udListProductTotal = (payload) => {
    return {
        type: UD_LST_PRD_TOTAL,
        payload
    }
};
export const udListProductTotalSuccess = (payload) => {
    return {
        type: UD_LST_PRD_TOTAL_SUCCESS,
        payload
    }
};

export const udListProductTotalError = (payload) => {
    return {
        type: UD_LST_PRD_TOTAL_ERROR,
        payload
    }
}
