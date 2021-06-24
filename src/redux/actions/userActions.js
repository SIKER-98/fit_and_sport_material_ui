import types from '../constants/userTypes'
import axios from "axios";
import userTypes from "../constants/userTypes";

const login = item => ({
    type: types.USER_LOGIN, item
})

const logout = () => ({
    type: types.USER_LOGOUT
})

export default {
    login,
    logout,
}
