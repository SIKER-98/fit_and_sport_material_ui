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
    apiAddExerciseStatistic,
    apiAddExerciseToPlanInfo,
    apiDelExerciseInPlan, apiDelExerciseStatistic,
    apiEditExerciseInPlan, apiEditExerciseStatistic, apiGetExerciseStatistic,
    apiGetPlanExercises
} from "../redux/thunk/planInfoOperations";
import {
    AreaSeries,
    ArgumentAxis,
    Chart, Legend,
    SplineSeries, Title,
    Tooltip,
    ValueAxis
} from "@devexpress/dx-react-chart-material-ui";
import {BarSeries, EventTracker, ValueScale} from "@devexpress/dx-react-chart";

const PlanViewPage = (
    {
        planInfo, getExercises, addExercise,
        exerciseList, editExercise, delExercise,
        getStatistic, addStat, delStat, editStat
    }) => {


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
                                     addStat={addStat}
                                     editStat={editStat}
                                     delStat={delStat}
                                     planExerciseId={row.planExerciseId}
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.statistic.map(historyRow => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell component={'th'} scope={'row'}>
                                                {new Date(historyRow.dateTime).toLocaleString()}
                                            </TableCell>
                                            <TableCell>{historyRow.series}</TableCell>
                                            <TableCell>{historyRow.repetitions}</TableCell>
                                            <TableCell>
                                                <DialogStatAdd
                                                    prevSeries={historyRow.series}
                                                    prevRepetitions={historyRow.repetitions}
                                                    planExerciseId={row.planExerciseId}
                                                    statId={historyRow.id}
                                                    editStat={props.editStat}
                                                    variant={'EDIT'}
                                                />

                                                <IconButton onClick={
                                                    () => props.delStat({
                                                        exerciseStatisticId: historyRow.id,
                                                        planExerciseId: props.planExerciseId
                                                    })}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <DialogStatAdd
                                prevSeries={1}
                                prevRepetitions={1}
                                planExerciseId={row.planExerciseId}
                                addStat={props.addStat}
                                variant={'ADD'}
                            />

                            <StatChart data={row.statistic}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>


        </>
    )
}

const StatChart = ({data}) => {
    return (
        <Paper>
            <Chart
                data={data}
                rotated
            >
                <ValueScale name="total"/>

                <ArgumentAxis/>
                <ValueAxis scaleName="total" showGrid={true} showLine showTicks/>

                <BarSeries
                    name={'Total'}
                    valueField="total"
                    argumentField="dateTime"
                    scaleName={'total'}
                />

                <EventTracker/>
                <Tooltip/>

                <Legend/>
                <Title text={'Your Results'}/>
            </Chart>
        </Paper>
    )
}

const DialogStatAdd = ({variant, prevSeries, prevRepetitions, planExerciseId, addStat, editStat, statId}) => {
    // const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [series, setSeries] = useState(prevSeries)
    const [repetitions, setRepetitions] = useState(prevRepetitions)
    const [error, setError] = useState({series: false, repetitions: false})

    const handleClickClose = (save) => {
        if (save) {
            if (series < 1) {
                setError({...error, series: true})
                return
            }
            if (repetitions < 1) {
                setError({...error, repetitions: true})
                return
            }

            if (variant === 'ADD') {
                addStat({
                    series,
                    repetitions,
                    planExerciseId
                })
            } else if (variant === 'EDIT') {
                editStat({
                    series: series * 1,
                    repetitions: repetitions * 1,
                    planExerciseId: planExerciseId * 1,
                    id: statId,
                })
            }
        }
        setOpen(false)
    }

    return (
        <>
            {variant === 'ADD' &&
            <Button
                fullWidth
                color={'secondary'}
                variant={'contained'}
                onClick={() => setOpen(true)}
            >
                Add statistic
            </Button>
            }

            {variant === 'EDIT' &&
            <IconButton onClick={() => setOpen(true)}>
                <Edit/>
            </IconButton>
            }

            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClickClose}>
                <DialogTitle>Add Statistic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete={'off'}
                        name={'series'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Series'}
                        defaultValue={prevSeries}
                        error={error.series}
                        onChange={(e) => {
                            setSeries(e.target.value)
                            setError({...error, series: false})
                        }}
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'repetitions'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Repetitions'}
                        defaultValue={prevRepetitions}
                        error={error.repetitions}
                        onChange={(e) => {
                            setRepetitions(e.target.value)
                            setError({...error, repetitions: false})
                        }}
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


const useStyles = makeStyles((theme) => (
    {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(2),
            minWidth: 350,
        },
    }
))

const DialogExerciseModify = ({editExercise, planExerciseId, prevSeries, prevRepetitions, exerciseId}) => {
    const [open, setOpen] = useState(false)
    const [series, setSeries] = useState(prevSeries)
    const [repetitions, setRepetitions] = useState(prevRepetitions)
    const [error, setError] = useState({series: false, repetitions: false})


    const handleClickClose = (save) => {
        if (save) {
            if (series < 1) {
                setError({...error, series: true})
                return
            }
            if (repetitions < 1) {
                setError({...error, repetitions: true})
                return
            }

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
                        error={error.series}
                        onChange={(e) => {
                            setSeries(e.target.value)
                            setError({...error, series: false})
                        }}
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'repetitions'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Repetitions'}
                        defaultValue={prevRepetitions}
                        error={error.repetitions}
                        onChange={(e) => {
                            setRepetitions(e.target.value)
                            setError({...error, repetitions: false})
                        }}
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
    const [exercise, setExercise] = useState('')
    const [series, setSeries] = useState(1)
    const [repetitions, setRepetitions] = useState(1)
    const [error, setError] = useState({series: false, repetitions: false, exercise: false})

    const handleChange = (event) => {
        console.log(event.target.value)
        setExercise(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = (save) => {
        if (save) {
            console.log(series, repetitions, exercise)
            if (series < 1) {
                console.log('wszedlem1')
                setError({...error, series: true})
                return
            }
            if (repetitions < 1) {
                console.log('wszedlem2')
                setError({...error, repetitions: true})
                return
            }
            if (exercise === '') {
                console.log('wszedlem3')
                setError({...error, exercise: true})
                return
            }

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
                                error={error.exercise}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {exercises.map(exercise => (
                                    <MenuItem value={exercise.id}>
                                        {exercise.exerciseName}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                autoComplete={'off'}
                                name={'series'}
                                variant={'standard'}
                                type={'number'}
                                required
                                defaultValue={series}
                                label={'Series'}
                                error={error.series}
                                onChange={(e) => {
                                    setSeries(e.target.value * 1)
                                    setError({...error, series: false})
                                }}
                            />

                            <TextField
                                autoComplete={'off'}
                                name={'repetitions'}
                                variant={'standard'}
                                type={'number'}
                                defaultValue={repetitions}
                                required
                                label={'Repetitions'}
                                error={error.repetitions}
                                onChange={
                                    (e) => {
                                        setRepetitions(e.target.value * 1)
                                        setError({...error, repetitions: false})
                                    }
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

    getStatistic: item => dispatch(apiGetExerciseStatistic(item)),
    addStat: item => dispatch(apiAddExerciseStatistic(item)),
    delStat: item => dispatch(apiDelExerciseStatistic(item)),
    editStat: item => dispatch(apiEditExerciseStatistic(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanViewPage)
