
export const  LoginAction = (val) => async dispatch =>  {
    dispatch({type:"LOGIN_STATE_CHANGE",payload:val})
}

export const  SetUserAction = (val) => async dispatch =>  {
    dispatch({type:"SET_USER_DATA",payload:val})
}