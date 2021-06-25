import exerciseTypes from "../constants/exerciseTypes";

const add = item => ({
    type: exerciseTypes.EXERCISE_ADD, item
})

const clear = () => ({
    type: exerciseTypes.EXERCISE_CLEAR
})

export default {
    add,
    clear
}
