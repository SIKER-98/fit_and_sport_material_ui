import userTypes from "../constants/userTypes";

const INITIAL_STATE = {
    name: 'User',

    userId: -1,
    firstName: '',
    lastName: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.USER_LOGIN:
            return {
                ...state, ...action.item
            }

        case userTypes.USER_LOGOUT:
            return {
                state: INITIAL_STATE
            }
        default:
            return state
    }

}

export default userReducer
