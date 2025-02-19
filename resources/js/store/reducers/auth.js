import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    auth: false,
    token: null,
    userId: null,
    error: null,
    loading: false, 
    userData: null
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        auth: true,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null, 
    });
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const getUserData = (state, action) => {
    return updateObject( state, {
        userData: action.userData,
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.USER_DATA_SUCCESS: return getUserData(state, action);
        default:
            return state;
    }
};

export default reducer;