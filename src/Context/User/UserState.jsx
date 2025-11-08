import React, { useReducer } from 'react'
import UserReducer from './UserReducer'
import axios from 'axios'
import { GET_DETALLEUSEE, GET_USERFILTRO, GET_USERS, POST_USERS } from '../Type'
import UseContext from './UseContext'

const UserState = (props) => {

  const initialState = {
    users: [],
    selectedUser: null
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const getUsers = async () => {
    const res = await axios.get('https://pwacongreso.onrender.com/api/Usuario');
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  }

   // Traer usuarios filtrados por varios campos
  const getUserFiltro = async ({ nombre}) => {
    try {
      let url = 'https://pwacongreso.onrender.com/api/Usuario/Filtrar?';
      const params = new URLSearchParams();

      if (nombre) params.append('Nombre', nombre);
      

      url += params.toString();

      const res = await axios.get(url);
      dispatch({
        type: GET_USERFILTRO,
        payload: res.data
      });
    } catch (error) {
      console.error("Error al filtrar usuarios:", error);
    }
  };

  const getPostUser = async (user) => {
    const res = await axios.post('https://pwacongreso.onrender.com/api/Usuario/Registro', user);
     
    dispatch ({
      type: POST_USERS, 
      payload: res.data
    })

    return res.data
  }

  const getDetalleUser = async (id) => {
  try {
    const res = await axios.get(`https://pwacongreso.onrender.com/api/Usuario/${id}`);
    dispatch({
      type: GET_DETALLEUSEE,
      payload: res.data
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener detalle del usuario:", error);
    return null;
  }
};


  return (
    <UseContext.Provider
      value={{
        users: state.users,
        selectedUser: state.selectedUser,
        getUsers,
        getUserFiltro,
        getPostUser,
        getDetalleUser
      }}
    >
      {props.children}
    </UseContext.Provider>
  )
}

export default UserState
