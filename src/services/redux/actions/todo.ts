export const addTodo = (task: any) => ({
    type: 'ADD_TODO',
    payload: {
        id: Math.random(),
        task
    }
})

