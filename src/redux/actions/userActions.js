import types from '../constants/userTypes'

const login = item => ({
    type: types.USER_LOGIN, item
})

const logout = () => ({
    type: types.USER_LOGOUT
})

const exportedObject= {
    login,
    logout,
}

export default exportedObject
