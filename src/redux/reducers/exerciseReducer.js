import exerciseTypes from "../constants/exerciseTypes";

const INITIAL_STATE = {
    name: 'Exercises',

    exerciseList: []
}

const exerciseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case exerciseTypes.EXERCISE_ADD:
            return {
                ...state, exerciseList: [...state.exerciseList, action.item]
            }
        case exerciseTypes.EXERCISE_CLEAR:
            return {
                ...INITIAL_STATE
            }

        default:
            return state
    }
}

export default exerciseReducer
