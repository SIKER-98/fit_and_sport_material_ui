import planTypes from "../constants/planTypes";

const add = item => ({
    type: planTypes.PLAN_ADD, item
})

const del = item => ({
    type: planTypes.PLAN_DELETE, item
})

const edit = item => ({
    type: planTypes.PLAN_EDIT, item
})

const clear = () => ({
    type: planTypes.PLAN_CLEAR
})


export default {
    add,
    del,
    edit,
    clear,

}
