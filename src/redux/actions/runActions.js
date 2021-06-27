import runTypes from "../constants/runTypes";

const add = item => (
    {
        type: runTypes.RUN_ADD, item
    })

const del = item => ({
    type: runTypes.RUN_DEL, item
})

const edit = item => ({
    type: runTypes.RUN_EDIT, item
})

const clear = () => ({
    type: runTypes.RUN_CLEAR
})

const exportedObject={
    add,
    del,
    edit,
    clear,
}

export default exportedObject
