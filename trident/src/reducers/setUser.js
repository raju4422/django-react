const initialState = {userId:0,userName:"",userEmail:"",authToken:""};
const setUser = (state = initialState,action)=>{
    const {type,payload} = action;
    switch(type){
       case "SET_USER_DATA":
         return {
            ...state, // Spread the existing state
            ...payload // Spread the payload to merge with the state
        };
        default:
           return state;
    }
}
export default setUser;