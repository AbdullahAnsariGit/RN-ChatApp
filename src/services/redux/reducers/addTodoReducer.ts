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
    switch (action.type) {
        case 'ADD_TODO': {
            const { id, task } = action.payload;
            return {
                ...state,
                todos: [...state.todos, { id, task }],
            };
        }
        case 'DELETE_TODO': {
            const indexx = action?.index
            return {
                ...state,
                todos: [state.todos.pop(indexx), ...state?.todos]
            }
        }
        default:
            return state;
    }
};