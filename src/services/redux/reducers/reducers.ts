
// let initState = {
//     post: [
//         {
//             name: 'book',
//             date: '12-12-22',
//             id: 1
//         },
//         {
//             name: 'book2',
//             date: '12-12-22',
//             id: 2

//         },
//         {
//             name: 'book3',
//             date: '12-12-22',
//             id: 3
//         }
//     ]
// }
// const reducer = (state = initState, action: any) => {
//     if (action.type == 'DELETE_POST') {
//         const pop1 = state.post.pop()
//         return pop1
//     }
//     if (action.type == 'ADD_POST') {
//         return {
//             ...state, // Spread the current state
//             post: [...state.post, action.payload]
//         }
//     }
//     else { console.log('err') }
// }

// export default reducer