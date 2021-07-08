import React from 'react';
import { ReactDOM } from 'react-dom';
import { createStore } from 'redux';



// Action 
const incrament = () => {
    return {
        type : 'INCRAMENT',

    }
}

const decrament = () => {
    return {
        type : 'DECRAMENT',

    }
}

// Reducer 
const counter = (state = 0 , action) => {
    switch (action.type) {
        case 'INCRAMENT':
            return state + 1; 
            break;
        case 'DECRAMENT':
            return state - 1; 

            break;
       
    }
}

// Store -> global state
const store = createStore(counter)

// Display it on console 
store.subscribe(() => console.log(store.getState()))

store.dispatch(incrament)