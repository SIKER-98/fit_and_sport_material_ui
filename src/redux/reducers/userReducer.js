import userTypes from "../constants/userTypes";

const INITIAL_STATE = {
    name: 'User',

    userId: -1,
    email: '',
    firstName: '',
    lastName: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.USER_LOGIN:
            console.log(action.item)
            return {
                ...state, ...action.item
            }

        case userTypes.USER_LOGOUT:
            return {
                ...INITIAL_STATE
            }

        default:
            return state
    }

}

export default userReducer
