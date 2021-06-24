import React, {useState} from "react";
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

const PlanViewPage = () => {

    const plan = {
        title: 'Training plan title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quas, voluptatem! Accusantium aliquid aspernatur consectetur cumque dignissimos eaque eius labore nemo nobis numquam, placeat quo, rerum tenetur! Delectus, molestias, neque.',
        exercises: [
            {
                id: 1,
                exerciseName: 'exercise 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quas, voluptatem! Accusantium aliquid aspernatur consectetur cumque dignissimos eaque eius labore nemo nobis numquam, placeat quo, rerum tenetur! Delectus, molestias, neque.',
                series: 3,
                repetitions: 3
            },
            {
                id: 2,
                exerciseName: 'exercise 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quas, voluptatem! Accusantium aliquid aspernatur consectetur cumque dignissimos eaque eius labore nemo nobis numquam, placeat quo, rerum tenetur! Delectus, molestias, neque.',
                series: 3,
                repetitions: 3
            },
            {
                id: 3,
                exerciseName: 'exercise 3',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quas, voluptatem! Accusantium aliquid aspernatur consectetur cumque dignissimos eaque eius labore nemo nobis numquam, placeat quo, rerum tenetur! Delectus, molestias, neque.',
                series: 3,
                repetitions: 3
            },
            {
                id: 4,
                exerciseName: 'exercise 4',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quas, voluptatem! Accusantium aliquid aspernatur consectetur cumque dignissimos eaque eius labore nemo nobis numquam, placeat quo, rerum tenetur! Delectus, molestias, neque.',
                series: 3,
                repetitions: 3
            }
        ]
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component={'h1'} variant={'h5'}>
                    {plan.title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component={'p'} variant={'body2'}>
                    {plan.description}
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
                            {plan.exercises.map((row, k) => (
                                <Row key={k} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <DialogExerciseAdd/>
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
                    <DialogExerciseModify/>
                    <IconButton>
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
                                    {/*{row.history.map(historyRow=>(*/}
                                    {/*    <TableRow key={historyRow.date}>*/}
                                    {/*        <TableCell component={'th'} scope={'row'}>*/}
                                    {/*            {historyRow.date}*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell>{historyRow.series}</TableCell>*/}
                                    {/*        <TableCell>{historyRow.repetitions}</TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
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

const DialogExerciseModify = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [series, setSeries] = useState(0)
    const [repetitions, setRepetitions] = useState(0)

    const handleChange = (event) => {
        console.log(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
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
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'repetitions'}
                        variant={'standard'}
                        type={'number'}
                        required
                        label={'Repetitions'}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClickClose} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={handleClickClose} color={'primary'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const DialogExerciseAdd = ({exercises}) => {
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

    const handleClickClose = () => {
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
                                <MenuItem value={10}>Exercise 1</MenuItem>
                                <MenuItem value={20}>Exercise 2</MenuItem>
                                <MenuItem value={30}>Exercise 3</MenuItem>
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
                            />

                            <TextField
                                autoComplete={'off'}
                                name={'repetitions'}
                                variant={'standard'}
                                type={'number'}
                                required
                                label={'Repetitions'}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={handleClickClose} color={'primary'}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PlanViewPage
