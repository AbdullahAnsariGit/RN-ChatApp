export const updateTodo = (val: string, id?:string) => ({
    type: 'TODO_UPDATE',
    payload:{
        task:val,
        id:id
    }
})