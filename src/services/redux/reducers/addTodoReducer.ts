import { Reducer } from 'redux';
import { AnyAction } from 'redux';

interface Todo {
    id: number;
    task: string;
}

interface AppState {
    todos: Todo[];
}

const initialState: AppState = {
    todos: [],
};

export const addTodoReducer: Reducer<AppState, AnyAction> = (
    state = initialState,
    action
) => {

    console.log('action,',action)
    console.log('satte,',state)

    switch (action.type) {
        case 'ADD_TODO': {
            const { id, task } = action.payload;
            return {
                ...state,
                todos: [...state.todos, { id, task }],
            };
        }
        case 'TODO_DELETE': {
            const indexx = action?.index
            const updateTodos = [...state.todos]
            updateTodos.splice(indexx,1)
            return {
                ...state,
                todos: updateTodos
            }
        }
        default:
            return state;
    }
};