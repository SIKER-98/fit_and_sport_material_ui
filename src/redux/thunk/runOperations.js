import runActions from "../actions/runActions";
import axios from "axios";

export const apiGetRuns = (userId) =>
    async (dispatch, getState, api) => {
        await axios.get(api + 'api/runs/user', {params: {userId}})
            .then(res => {
                console.log('RunResults:', res.data)
                dispatch(runActions.clear())
                res.data.forEach(item => {
                    dispatch(runActions.add(item))
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiRunAdd = ({userId, distance, time}) =>
    async (dispatch, getState, api) => {
        await axios.post(api + 'api/runs/add', {}, {params: {userId, distance, time}})
            .then(res => {
                console.log('RunAdd:', res.data)
                dispatch(runActions.add(res.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiRunDelete = ({runScoreId}) =>
    async (dispatch, getState, api) => {
        await axios.delete(api + 'api/runs/delete', {params: {runScoreId}})
            .then(res => {
                console.log('RunDel:', res.data)
                dispatch(runActions.del(runScoreId))
            })
            .catch(e => {
                console.log(e)
            })
    }

export const apiRunUpdate = ({userId, runScoreId, distance, time}) =>
    async (dispatch, getState, api) => {
        await axios.put(api + 'api/runs/update', {}, {
            params: {
                userId, runScoreId, distance, time
            }
        })
            .then(res => {
                console.log('RunEdit:', res.data)
                dispatch(runActions.edit({
                    id: runScoreId,
                    distance,
                    time
                }))
            })
            .catch(e => {
                console.log(e)
            })
    }
