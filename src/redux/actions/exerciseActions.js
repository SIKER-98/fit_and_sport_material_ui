import exerciseTypes from "../constants/exerciseTypes";

const add = item => ({
    type: exerciseTypes.EXERCISE_ADD, item
})

const clear = () => ({
    type: exerciseTypes.EXERCISE_CLEAR
})

const exportedObject = {
    add,
    clear
}

export default exportedObject
