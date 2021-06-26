import axios from "axios";
import planInfoActions from "../actions/planInfoActions";

export const apiGetPlanExercises = (planId) =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/plans/getPlanExercises', {params: {planId}})
            .then(res => {
                console.log('PlanExercise:', res.data)

                dispatch(planInfoActions.clear())
                res.data.forEach(item => {
                    dispatch(planInfoActions.add(item))
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiAddExerciseToPlanInfo = ({exerciseId, planId, repetitions, series, exerciseName}) =>
    async (dispatch, getState, api) => {
        await axios.post(api + 'api/planExercise/add', {},
            {
                params: {exerciseId, planId, repetitions, series}
            })
            .then(res => {
                console.log('AddToPlan:', res.data)
                // dispatch(planInfoActions.add({exerciseId, planId, repetitions, series, exerciseName}))
                dispatch(planInfoActions.clear())
                dispatch(apiGetPlanExercises(planId))
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiEditExerciseInPlan = ({planExerciseId, series, repetitions}) =>
    async (dispatch, getState, api) => {
        await axios.put(api + 'api/planExercise/update', {},
            {params: {planExerciseId, series, repetitions}}
        )
            .then(res => {
                console.log('Edited:', res.data)
                dispatch(planInfoActions.edit({planExerciseId, series, repetitions}))
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiDelExerciseInPlan = (planExerciseId) =>
    async (dispatch, getState, api) => {
        await axios.delete(api + 'api/planExercise/delete', {params: {planExerciseId}})
            .then(res => {
                console.log('deleted:', res.data)
                dispatch(planInfoActions.del(planExerciseId))
            })
            .catch(e => {
                console.log(e)
            })
    }
