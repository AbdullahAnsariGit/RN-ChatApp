import { createStore } from 'redux';
import { addTodoReducer } from './reducers/addTodoReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, addTodoReducer)
export const store = createStore(persistedReducer);
// export const persistor = persistStore(store, {}, () => {
//     console.log('Rehydration completed!');
//   });
export const persistor = persistStore(store)

 
