import planInfoTypes from "../constants/planInfoTypes";

const add = item => ({
    type: planInfoTypes.PLAN_INFO_ADD, item
})

const del = item => ({
    type: planInfoTypes.PLAN_INFO_DEL, item
})

const clear = () => ({
    type: planInfoTypes.PLAN_INFO_CLEAR
})

const init = item => ({
    type: planInfoTypes.PLAN_INFO_INIT, item
})

const edit = item =>({
    type:planInfoTypes.PLAN_INFO_EDIT, item
})

export default {
    add,
    del,
    clear,
    init,
    edit
}
