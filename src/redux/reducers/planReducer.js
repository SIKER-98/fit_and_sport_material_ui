import planTypes from "../constants/planTypes";

const INITIAL_STATE = {
    name: 'Plans',

    planList: []
}

const planReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case planTypes.PLAN_ADD:
            return {
                ...state, planList: [...state.planList, action.item]
            }
        case planTypes.PLAN_EDIT:
            let editedPlanList = state.planList.map(
                item => (
                    item.id === action.item.id
                        ? item = {...item, ...action.item} : item
                )
            )
            return {
                ...state, planList: [...editedPlanList]
            }
        case planTypes.PLAN_CLEAR:
            return {
                ...state, planList: []
            }
        case planTypes.PLAN_DELETE:
            let reducedList = state.planList.filter(item => item.id !== action.item)

            return {
                ...state, planList: reducedList
            }

        // case planTypes.PLAN_EXERCISE_ADD:
        //     const index = state.planList.findIndex(item => item.id === action.item.planId)
        //
        //     console.log('TEST')
        //     console.log(state.planList[index])
        //     console.log(state.planList[index].planExercise)
        //
        //     state.planList[index].planExercise.push(action.item)
        //
        //     return {
        //         ...state,
        //     }


        default:
            return state
    }
}

export default planReducer
