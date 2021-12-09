let defaultState = { isAuth:'' };
  
  let userInfoReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
      case "USER_LOG_IN": 
        let newState = { ...state, ...payload };
        return newState;
  
      case "USER_LOG_OUT":
          return {...state, ...defaultState};
      default:
        return state;
    }
  };
  
  export default userInfoReducer;
  