import { createStore, combineReducers } from 'redux';
import { addTodoReducer } from './reducers/addTodoReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { tokenReducer } from './reducers/tokenReducer';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const rootReducer = combineReducers({
    auth: addTodoReducer,
    token: tokenReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer);
// export const persistor = persistStore(store, {}, () => {
//     console.log('Rehydration completed!');
//   });
export const persistor = persistStore(store)


