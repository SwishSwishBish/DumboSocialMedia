import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const dumboAuth = secureLS.get('dumbo-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    if (dumboAuth) {
        return dumboAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLS.set('dumbo-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const store = createStore(authReducer, initialState, applyMiddleware(thunk));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
};

export default configureStore;