import axios from "axios";
import planInfoActions from "../actions/planInfoActions";

export const apiGetPlanExercises = (planId) =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'plans/getPlanExercises', {params: {planId}})
            .then(res => {
                console.log('PlanExercise:', res.data)

                dispatch(planInfoActions.clear())
                res.data.forEach(item => {
                    item.statistic = []
                    dispatch(planInfoActions.add(item))
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiAddExerciseToPlanInfo = ({exerciseId, planId, repetitions, series, exerciseName}) =>
    async (dispatch, getState, api) => {
        await axios.post(api + 'planExercises/add', {
            planExercise: {
                series: series * 1,
                repetitions: repetitions * 1,
            },
            planId,
            exerciseId,
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

export const apiEditExerciseInPlan = ({planExerciseId, series, repetitions, exerciseId}) =>
    async (dispatch, getState, api) => {
        await axios.put(api + 'planExercises/update', {
            planExercise: {
                id: planExerciseId,
                series: series * 1,
                repetitions: repetitions * 1,
            },
            exerciseId
        })
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
        await axios.delete(api + 'planExercises/delete', {params: {planExercise: planExerciseId}})
            .then(res => {
                console.log('deleted:', res.data)
                dispatch(planInfoActions.del(planExerciseId))
            })
            .catch(e => {
                console.log(e)
            })
    }
