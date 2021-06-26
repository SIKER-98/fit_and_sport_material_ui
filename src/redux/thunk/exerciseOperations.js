import axios from 'axios'
import exerciseActions from "../actions/exerciseActions";

export const apiFetchExercises = () =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/exercises')
            .then(res => {
                dispatch(exerciseActions.clear())
                console.log('fetchExercise: ',res.data)
                res.data?.map(item => {
                    dispatch(exerciseActions.add(item))
                })
            })
            .catch(e => {
                dispatch(exerciseActions.clear())
                console.log(e)
            })
    }
