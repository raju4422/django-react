
export const  IncAction = (val) => async dispatch =>  {
    dispatch({type:"INCREMENT",payload:val})
}

export const  DecAction = (val) => async dispatch =>  {
    dispatch({type:"DECREMENT",payload:val})
}
export const  LoginAction = (val) => async dispatch =>  {
    dispatch({type:"LOGIN_STATE_CHANGE",payload:val})
}

export const  SetUserAction = (val) => async dispatch =>  {
    dispatch({type:"SET_USER_DATA",payload:val})
}