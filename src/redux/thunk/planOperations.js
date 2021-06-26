import axios from 'axios'
import planActions from "../actions/planActions";

export const apiFetchPlans = () =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/plans')
            .then(res => {
                console.log('fetchPlans: ', res.data)
            })
    }

export const apiGetUserPlans = (userId) =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/plans/userPlans', {params: {userId}})
            .then(res => {
                console.log('userPlans: ', res.data)
                dispatch(planActions.clear())
                res.data.forEach(item => dispatch(planActions.add(item)))
            })
            .catch(e => {
                console.log(e)
                dispatch(planActions.clear())
            })
    }

export const apiDeletePlan = (planId) =>
    async (dispatch, getState, api) => {
        await axios.delete(api + 'api/plans/delete', {params: {planId}})
            .then(res => {
                console.log('deleted:', planId)
                dispatch(planActions.del(planId))
            })
            .catch(e => {
                console.log(e)
            })
    }


export const apiEditPlan = (plan) =>
    async (dispatch, getState, api) => {
        await axios.put(api + 'api/plans/update', {}, {
            params: {
                planName: plan.title,
                description: plan.description,
                planId: plan.planId
            }
        })
            .then(res => {
                dispatch(planActions.edit({
                    planName: plan.title,
                    description: plan.description,
                    id: plan.planId
                }))
            })
    }

export const apiCreatePlan = (plan) =>
    async (dispatch, getState, api) => {
        return await axios.post(api + 'api/plans/add', {}, {
            params: {
                userId: plan.userId,
                planName: plan.title,
                description: plan.description
            }
        })
            .then(res => {
                console.log('CreatedPlan: ', res.data)
                dispatch(planActions.add(res.data))
                return res.data.id
            })
            .catch(e => {
                console.log(e)
            })

    }

export const apiAddExerciseToPlan = ({exerciseId, planId, repetitions, series}) =>
    async (dispatch, getState, api) => {
        console.log('here', {exerciseId, planId, repetitions, series})

        await axios.post(api + 'api/planExercise/add', {},
            {
                params: {exerciseId, planId, repetitions, series}
            })
            .then(res => {
                console.log('AddToPlan:',res.data)
                // dispatch(planActions.addExercise({exerciseId, planId, repetitions, series}))
            })
            .catch(e => {
                console.log(e)
            })
    }
