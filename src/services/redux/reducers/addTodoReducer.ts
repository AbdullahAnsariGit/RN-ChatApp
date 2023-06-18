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

    console.log('action,', action)
    console.log('satte,', state)

    switch (action.type) {
        case 'ADD_TODO': {
            const { id, task } = action.payload;
            console.log("🚀 ~ file: addTodoReducer.ts:28 ~ id:", id)
            return {
                ...state,
                todos: [...state.todos, { id, task }],
            };
        }
        case 'TODO_DELETE': {
            const indexx = action?.index
            const updateTodos = [...state.todos]
            updateTodos.splice(indexx, 1)
            return {
                ...state,
                todos: updateTodos
            }
        }
        case 'TODO_UPDATE': {
            const updateTodo = [...state.todos]
            console.log("🚀 ~ file: addTodoReducer.ts:47 ~ upTodagggggggggtedo:", action?.payload?.id)

            const newUpdate = updateTodo.map((val) => {
                if (val?.id === action?.payload?.id) {
                    return {
                        ...val,
                        task: action?.payload?.task
                    };
                }
                return val;
            });
            console.log("🚀 ~ file: addTodoReducer.ts:55 ~ newUpdate ~ newUpdate:", newUpdate)


            return {
                ...state,
                todos: newUpdate,
            }
        }
        default:
            return state;
    }
};