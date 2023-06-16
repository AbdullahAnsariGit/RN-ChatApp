import uuid from 'react-native-uuid';
const userId: string | any = uuid.v4();
export const addTodo = (task: any) => ({
    type: 'ADD_TODO',
    payload: {
        id: userId,
        task
    }
})

