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

export const apiLogin = ({email, password}) =>
    async (dispatch, getState, api) => {
        console.log(email, password)
        const respond = await axios.post(api + 'api/users/login', {}, {
            params: {
                nickname: email,
                password: password
            }
        })

        console.log("login:", respond)

        if (respond.status === 200) {
            dispatch(userActions.login(respond.data))
            //TODO: poprawic endpoint i zamienic komenty
            dispatch(userActions.login({
                userId: respond.data,
                email,
                firstName: 'first',
                lastName: 'last'
            }))
        }

        return respond.status
    }

export const apiRegister = ({firstName, lastName, email, password}) =>
    async (dispatch, getState, api) => {
    //TODO: zmienic endpoint aby bylo to co wyzej
        const respond = await axios.post(api + 'api/users/register', {}, {
            params: {
                nickname: email,
                password,
                height: 69
            }
        })

        console.log("register:", respond)

        return respond.status
    }

