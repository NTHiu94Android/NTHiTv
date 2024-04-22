export const REFRESH_TALK = 'REFRESH_TALK';
export const REFRESH_TALK_SUCCESS = 'REFRESH_TALK_SUCCESS';
export const REFRESH_TALK_FAILED = 'REFRESH_TALK_FAILED';

export const refreshTalk = (payload) => {
    return {
        type: REFRESH_TALK,
        payload
    }
};

export const refreshTalkSuccess = (payload) => {
    return {
        type: REFRESH_TALK_SUCCESS,
        payload
    }
};

export const refreshTalkFailed = (payload) => {
    return {
        type: REFRESH_TALK_FAILED,
        payload
    }
};