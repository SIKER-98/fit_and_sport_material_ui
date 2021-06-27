import axios from "axios";
import userActions from "../actions/userActions";

export const getAllUsers = () => {
    return (
        async (dispatch, getState, api) => {
            const users = await axios.get('users')
            console.log('All users:', users)
            // dispatch(userActions.login(users))
        }
    )
}

export const apiLogin = ({email, password}) =>
    async (dispatch, getState, api) => {
        console.log(email, password)
        return await axios.post(api + 'login', {email, password})
            .then(res => {
                console.log("login:", res.data)
                dispatch(userActions.login({
                    userId: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.secondName,
                    email
                }))
                return res.status
            })
            .catch(e => {
                console.log(e)
                return e.status
            })
    }

export const apiRegister = ({firstName, lastName, email, password}) =>
    async (dispatch, getState, api) => {
        //TODO: zmienic endpoint aby bylo to co wyzej
        return await axios.post(api + 'register', {
            email,
            password,
            firstName,
            secondName: lastName
        })
            .then(res => res.status)
            .catch(e => {
                console.log(e)
                return e.status
            })
    }

