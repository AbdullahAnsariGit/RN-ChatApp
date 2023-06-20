
export const tokenReducer = (state = null, action: any) => {
    console.log("🚀 ~ file: tokenReducer.ts:5 ~ tokenReducer ~ action:", action, state)
    switch (action.type) {
        case 'Add_Token': {
            console.log(action?.token, state, "action token============>")
            return {
                state: null,
                token: action?.token
            };
        }
        case 'DELETE_TOKEN': {
            return {
                state: null,
                token: null
            }
        }
        default: {
            return state;
        }
    }
};
