import { GET_USERS, GET_USERFILTRO, POST_USERS, GET_DETALLEUSEE } from "../Type";

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_USERFILTRO:
      return {
       ...state,
        users: payload, 
      };
    
    case POST_USERS:
      return {
            ...state,
    users: [...state.users, payload], 
      }

    case GET_DETALLEUSEE:
      return{
        ...state,
        selectedUser: payload
      }

    default:
      return state;
  }
};

export default UserReducer;
