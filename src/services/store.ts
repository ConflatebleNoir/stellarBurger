import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux'

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);    