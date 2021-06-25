import planTypes from "../constants/planTypes";

const INITIAL_STATE = {
    name: 'Plans',

    planList: []
}

const planReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case planTypes.PLAN_ADD:
            return {

            }
        case planTypes.PLAN_EDIT:
            return {

            }
        case planTypes.PLAN_CLEAR:
            return {

            }
        case planTypes.PLAN_DELETE:
            return {

            }
        default:
            return state
    }
}
