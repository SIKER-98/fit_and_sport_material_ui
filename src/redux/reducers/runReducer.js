import runTypes from "../constants/runTypes";

const INITIAL_STATE = {
    name: 'runStatistic',

    runStatistics: []
}

const runReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case runTypes.RUN_ADD:
            return {
                ...state, runStatistics: [...state.runStatistics, action.item]
            }

        case runTypes.RUN_DEL:
            return {
                ...state, runStatistics: state.runStatistics.filter(item => item.id !== action.item)
            }

        case runTypes.RUN_CLEAR:
            return {
                ...state, runStatistics: []
            }

        case runTypes.RUN_EDIT:
            const index = state.runStatistics.findIndex(item => item.id === action.item.id)
            state.runStatistics[index] = action.item
            return {
                ...state
            }

        default:
            return state
    }
}

export default runReducer
