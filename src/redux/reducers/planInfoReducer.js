import planInfoTypes from "../constants/planInfoTypes";

const INITIAL_STATE = {
    name: 'planInfo',

    planId: -1,
    title: '',
    description: '',
    exerciseList: []
}

const planInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case planInfoTypes.PLAN_INFO_ADD:
            return {
                ...state, exerciseList: [...state.exerciseList, action.item]
            }

        case planInfoTypes.PLAN_INFO_INIT:
            return {
                ...state, ...action.item
            }

        case planInfoTypes.PLAN_INFO_DEL:
            const updatedList = state.exerciseList.filter(item => item.planExerciseId !== action.item)
            return {
                ...state, exerciseList: updatedList
            }

        case planInfoTypes.PLAN_INFO_CLEAR:
            return {
                ...state, exerciseList: []
            }

        case planInfoTypes.PLAN_INFO_EDIT:
            const index = state.exerciseList.findIndex(item => item.planExerciseId === action.item.planExerciseId)
            state.exerciseList[index] = {...state.exerciseList[index], ...action.item}
            return {
                ...state,
            }

        default:
            return state
    }
}

export default planInfoReducer