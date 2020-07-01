import React, { createContext, useContext, useReducer } from "react";

export const initContext = () => {
    return {        
        state:{
            'details':{},
            'userInfo':{},
        },
        reducer: function(state,action){
            switch(action.type){
                case 'list':{
                    state.list= action.payload;
                    return {...state};                   
                }
                case 'details':{
                    state.details={...state.details,...action.payload};                   
                    return {...state};
                }
                case 'userDetails':{
                    debugger;
                    state.userInfo=action.payload;
                    return {...state};
                }
                default: {
                    break;
                }
            }
        }
    }

}

export const Context = createContext({});
export const ContextProvider = (props) => (
	<Context.Provider value={useReducer(props.reducer, props.initialState)}>
		{props.children}
	</Context.Provider>
);

export const useAppContext = () => useContext(Context);