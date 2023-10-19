import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextReducer = (state, action)=>{
    switch (action.type){
        case 'LOGIN':
            return {user : action.payload};
        case 'LOGOUT':
            return {user : null};
        default:
            return state;
    }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthContextReducer, {
        user:null,
    })
    useEffect(()=>{
        const checkUserLogin = async ()=>{
            try{
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/check-user/${token}`,{
                    credentials:"include"
                })
                const data = await response.json();
                console.log(data);
                if(response.ok){
                    dispatch({type:'LOGIN', payload:data.user});
                }
            }
            catch(err){
                console.log(err);
            }
        }
        checkUserLogin();
    },[])
    console.log('AuthContext', state);
    console.log('User', state?.user);
    console.log('Name', state?.user?.name);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}