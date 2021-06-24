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

const CreatePlanPage = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        test1: false,
        test2: false,
    });

    const {test1, test2} = state

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
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
                                fullWidth
                                label={'Description'}
                                multiline
                            />
                        </Grid>

                        <Grid item xd={12}>
                            <FormControl componnet={'fieldset'}>
                                <FormLabel component={'legend'}>Choose your exercises</FormLabel>
                                <FormGroup className={classes.formGroup}>
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy111'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2123123'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy123123121'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2  123123123'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1 12312323 sdfsdfsdf'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2 fsdfsdf sdfsdfsd sdfsdfs sdfsdf'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2 testowy2'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test1} name={'test1'} onChange={handleChange}/>}
                                        label={'testowy1'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={test2} name={'test2'} onChange={handleChange}/>}
                                        label={'testowy2'}
                                    />


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

export default CreatePlanPage
