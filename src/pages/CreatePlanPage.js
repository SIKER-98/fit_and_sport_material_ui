import React, {useEffect, useState} from "react";
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
import {apiAddExerciseToPlan, apiCreatePlan} from "../redux/thunk/planOperations";
import {useHistory} from "react-router-dom";
import {apiAddExerciseToPlanInfo} from "../redux/thunk/planInfoOperations";


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

const CreatePlanPage = ({exercises, userId, createPlan, addExerciseToPlan}) => {
    const classes = useStyles()
    const history = useHistory()

    const createState = () => {
        let newState = {title: '', description: ''}

        exercises.forEach(item => {
            newState = {...newState, [item.exerciseName]: false}
        })

        return newState
    }

    useEffect(()=>{
        document.title='New Plan Page'
    },[])

    const [state, setState] = React.useState(createState());
    const [error, setError] = useState({title: false, description: false})

    const handleCheck = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
        console.log(state)
    }

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
        setError({...error, [event.target.name]: false})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (state.title.length < 3) {
            setError({...error, title: true})
            return
        }

        if (state.description.length < 3) {
            setError({...error, description: true})
            return
        }

        let planId = await createPlan({
            userId,
            title: state.title,
            description: state.description
        })

        Object.entries(state).forEach((entry) => {
            if (entry[1] === true) {
                let exercise = exercises.findIndex(item => item.exerciseName === entry[0])
                console.log('here2', exercise)
                console.log(planId)
                if (exercise >= 0)
                    addExerciseToPlan({
                        exerciseId: exercises[exercise].id,
                        planId: planId,
                        repetitions: 1,
                        series: 1
                    })
            }
        })

        history.push('/training')
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
                                error={error.title}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name={'description'}
                                variant={'outlined'}
                                required
                                // fullWidth
                                label={'Description'}
                                error={error.description}
                                multiline
                                onChange={handleChange}
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
                                                    onChange={handleCheck}
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
    exercises: state.exercise.exerciseList,
    userId: state.user.userId
})

const mapDispatchToProps = dispatch => ({
    createPlan: (item) => dispatch(apiCreatePlan(item)),
    addExerciseToPlan: (item) => dispatch(apiAddExerciseToPlan(item))
    // addExerciseToPlan: (item) => dispatch(apiAddExerciseToPlanInfo(item))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage)
