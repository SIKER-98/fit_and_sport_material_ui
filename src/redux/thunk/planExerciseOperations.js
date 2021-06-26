import axios from "axios";
import planActions from "../actions/planActions";

export const apiGetPlanExercises = (planId) =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/plans/getPlanExercises', {params: {planId}})
            .then(res => {
                console.log('PlanExercise:', res.data)

                res.data.forEach(item => {
                    dispatch(planActions.addExercise(item))
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
