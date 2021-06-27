import axios from "axios";
import planInfoActions from "../actions/planInfoActions";

export const apiGetStatistic = (exerciseStatisticsId) =>
    async (dispatch, getState, api) => {
        axios.get(api + 'api/exerciseStatistics/details', {params: {exerciseStatisticsId}})
            .then(res => {
                console.log('Statistic:', res.data)

                res.data.forEach(item => {
                    dispatch(planInfoActions.addStatistic({
                        exerciseId: exerciseStatisticsId,
                        statistic: item
                    }))
                })
            })
            .catch(e => {
                console.log(e)
            })
    }


// post
// /api/exerciseStatistics/add
// int exerciseId, int planExerciseId, int repetitions, int series

export const apiAddStatistic = ({exerciseId, planExerciseId, repetitions, series}) =>
    async (dispatch, getState, api) => {
        await axios.post(api + 'api/exerciseStatistics/add', {}, {
            params: {exerciseId, planExerciseId, repetitions, series}
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }


// [HttpDelete]
//     [Route("/api/exerciseStatistics/delete")]
// exerciseStatisticId


// [HttpPut]
//     [Route("/api/exerciseStatistics/update")]
// exerciseStatisticId, int repetitions, int series

