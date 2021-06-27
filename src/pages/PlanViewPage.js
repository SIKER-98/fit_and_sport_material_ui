import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {
    Box,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
    IconButton, Input, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@material-ui/core";
import {Delete, Edit, KeyboardArrowDown, KeyboardArrowUp} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {
    apiAddExerciseToPlanInfo,
    apiDelExerciseInPlan,
    apiEditExerciseInPlan,
    apiGetPlanExercises
} from "../redux/thunk/planInfoOperations";
import {apiGetStatistic} from "../redux/thunk/exerciseStatisticOperations";

const PlanViewPage = ({planInfo, getExercises, addExercise, exerciseList, editExercise, delExercise, getStatistic}) => {


    useEffect(() => {
        getExercises(planInfo.planId)
    }, [])

    useEffect(() => {
        planInfo.exerciseList.forEach(item => {
            getStatistic(item.planExerciseId)
        })
    }, [planInfo.exerciseList])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component={'h1'} variant={'h5'}>
                    {planInfo.title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component={'p'} variant={'body2'}>
                    {planInfo.description}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Exercise</TableCell>
                                <TableCell>Series</TableCell>
                                <TableCell>Repetitions</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {planInfo.exerciseList.map((row, k) => (
                                <Row key={k}
                                     row={row}
                                     edit={editExercise}
                                     del={delExercise}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <DialogExerciseAdd
                addExercise={addExercise}
                planId={planInfo.planId}
                exercises={exerciseList}
            />
        </Grid>
    )
}

const Row = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)


    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size={'small'} onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell component={'th'} scope={'row'}>{row.exerciseName}</TableCell>
                <TableCell component={'th'} scope={'row'}>{row.series}</TableCell>
                <TableCell component={'th'} scope={'row'}>{row.repetitions}</TableCell>
                <TableCell component={'th'} scope={'row'}>

                    <DialogExerciseModify
                        editExercise={props.edit}
                        exerciseId={row.exerciseId}
                        planExerciseId={row.planExerciseId}
                        prevSeries={row.series}
                        prevRepetitions={row.repetitions}
                    />

                    <IconButton onClick={() => props.del(row.planExerciseId)}>
                        <Delete/>
                    </IconButton>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6}>
                    <Collapse in={open} timeout={"auto"} unmountOnExit>
                        <Box margin={1}>
                            <Typography variant={'body2'} gutterBottom component={'p'}>
                                {row.description}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom component={'div'}>
                                History
                            </Typography>
                            <Table size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Series</TableCell>
                                        <TableCell>Repetitions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.statistic.map(historyRow => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component={'th'} scope={'row'}>
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.series}</TableCell>
                                            <TableCell>{historyRow.repetitions}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>


        </>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 350,
    },
}));

const DialogExerciseModify = ({editExercise, planExerciseId, prevSeries, prevRepetitions, exerciseId}) => {
    // const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [series, setSeries] = useState(0)
    const [repetitions, setRepetitions] = useState(0)

    // const handleChange = (event) => {
    //     console.log(event.target.value)
    // }
    //
    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    const handleClickClose = (save) => {
        if (save) {
            editExercise({
                planExerciseId,
                series,
                repetitions,
                exerciseId
            })
        }
        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <Edit/>
            </IconButton>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClickClose}>
                <DialogTitle>Modify Exercise</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete={'off'}
                        name={'series'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Series'}
                        defaultValue={prevSeries}
                        onChange={(e) => setSeries(e.target.value)}
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'repetitions'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Repetitions'}
                        defaultValue={prevRepetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleClickClose(false)} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClickClose(true)} color={'primary'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const DialogExerciseAdd = ({exercises, addExercise, planId}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState(null)
    const [series, setSeries] = useState(0)
    const [repetitions, setRepetitions] = useState(0)

    const handleChange = (event) => {
        console.log(event.target.value)
        setExercise(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = (save) => {
        console.log('exercise:', exercise)
        console.log('series: ', series)
        console.log('repetitions:', repetitions)

        if (save) {
            const exerciseName = exercises.find(item => item.id === exercise)?.exerciseName

            addExercise({
                exerciseId: exercise,
                planId,
                repetitions,
                series,
                exerciseName
            })
        }

        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleClickOpen}
                    variant={'contained'}
                    fullWidth
                    color={'primary'}
            >
                Add exercise
            </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClickClose}>
                <DialogTitle> Add new exercise</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Exercise</InputLabel>
                            <Select
                                value={exercise}
                                onChange={handleChange}
                                input={<Input/>}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {exercises.map(exercise => (
                                    <MenuItem value={exercise.id}>
                                        {exercise.exerciseName}
                                    </MenuItem>
                                ))}

                                {/*<MenuItem value={10}>Exercise 1</MenuItem>*/}
                                {/*<MenuItem value={20}>Exercise 2</MenuItem>*/}
                                {/*<MenuItem value={30}>Exercise 3</MenuItem>*/}
                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                autoComplete={'off'}
                                name={'series'}
                                variant={'standard'}
                                type={'number'}
                                required
                                label={'Series'}
                                onChange={(e) => setSeries(e.target.value)}
                            />

                            <TextField
                                autoComplete={'off'}
                                name={'repetitions'}
                                variant={'standard'}
                                type={'number'}
                                required
                                label={'Repetitions'}
                                onChange={
                                    (e) => setRepetitions(e.target.value)
                                }
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClickClose(false)} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClickClose(true)} color={'primary'}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


const mapStateToProps = state => ({
    planInfo: state.planInfo,
    exerciseList: state.exercise.exerciseList
})

const mapDispatchToProps = dispatch => ({
    getExercises: item => dispatch(apiGetPlanExercises(item)),
    addExercise: item => dispatch(apiAddExerciseToPlanInfo(item)),
    editExercise: item => dispatch(apiEditExerciseInPlan(item)),
    delExercise: item => dispatch(apiDelExerciseInPlan(item)),
    getStatistic: item => dispatch(apiGetStatistic(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanViewPage)
