import React from "react";
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";


const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(3)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    formGroup: {
        padding: theme.spacing(3)
    },
}))

const CreatePlanPage = ({exercises}) => {
    const classes = useStyles()

    const createState = () => {
        let newState = {title: '', descriptionL: ''}

        exercises.forEach(item => {
            newState = {...newState, [item.exerciseName]: false}
        })

        return newState
    }

    const [state, setState] = React.useState(createState());


    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
        console.log(state)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Container size={'sm'}>
            <div className={classes.paper}>
                <Typography
                    variant={'h6'}
                    color={'textSecondary'}
                    component={'h2'}
                    gutterBottom
                >
                    Create a New Training Plan
                </Typography>

                <form
                    autoComplete={'off'}
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name={'title'}
                                variant={'outlined'}
                                required
                                // fullWidth
                                label={'Title'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name={'description'}
                                variant={'outlined'}
                                required
                                // fullWidth
                                label={'Description'}
                                multiline
                            />
                        </Grid>

                        <Grid item xd={12}>
                            <FormControl componnet={'fieldset'}>
                                <FormLabel component={'legend'}>Choose your exercises</FormLabel>
                                <FormGroup className={classes.formGroup}>
                                    {exercises?.map(item => (
                                        <FormControlLabel
                                            key={item.id}
                                            control={
                                                <Checkbox
                                                    checked={state[item.exerciseName]}
                                                    name={item.exerciseName}
                                                    onChange={handleChange}
                                                />}
                                            label={item.exerciseName}
                                        />
                                    ))}

                                </FormGroup>
                            </FormControl>

                            <Button
                                type={'submit'}
                                fullWidth
                                variant={'contained'}
                                color={'primary'}
                            >
                                Create training plan
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    exercises: state.exercise.exerciseList
})


export default connect(mapStateToProps, null)(CreatePlanPage)
