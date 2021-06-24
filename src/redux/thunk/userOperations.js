import axios from "axios";
import userTypes from "../constants/userTypes";
import userActions from "../actions/userActions";

export const getAllUsers = () => {
    return (
        async (dispatch) => {
            const users = await axios.get('https://localhost:5001/api/users')
            console.log('All users:', users)
            // dispatch(userActions.login(users))
        }
    )
}

export const apiLogin = (email, password) =>
    async (dispatch, getState, api) => {
        const respond = await axios.post(api + 'api/users/login', {}, {
            params: {
                nickname: email,
                password: password
            }
        })

        console.log("login:", respond)

        if (respond.status === 200) {
            dispatch(userActions.login(respond.data))
        }
    }

