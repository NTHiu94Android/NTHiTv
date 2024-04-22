export const CHANGE_DARK_MODE = 'CHANGE_DARK_MODE';
export const CHANGE_DARK_MODE_S = 'CHANGE_DARK_MODE_SUCCESS';
export const CHANGE_DARK_MODE_F = 'CHANGE_DARK_MODE_FAILED';

export const CHANGE_LIGHT_MODE = 'CHANGE_LIGHT_MODE';
export const CHANGE_LIGHT_MODE_S = 'CHANGE_LIGHT_MODE_SUCCESS';
export const CHANGE_LIGHT_MODE_F = 'CHANGE_LIGHT_MODE_FAILED';

export const changDarkMode = (payload) => {
    return {
        type: CHANGE_DARK_MODE,
        payload
    }
}

export const changDarkModeS = (payload) => {
    return {
        type: CHANGE_DARK_MODE_S,
        payload
    }
}

export const changDarkModeF = (payload) => {
    return {
        type: CHANGE_DARK_MODE_F,
        payload
    }
}

export const changLightMode = (payload) => {
    return {
        type: CHANGE_LIGHT_MODE,
        payload
    }
}

export const changLightModeS = (payload) => {
    return {
        type: CHANGE_LIGHT_MODE_S,
        payload
    }
}

export const changLightModeF = (payload) => {
    return {
        type: CHANGE_LIGHT_MODE_F,
        payload
    }
}
