import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const RegisterPage = () => {
    const classes = useStyles();
    const history = useHistory()

    const [registerData, setRegisterData] = useState({
        firstName: ' ',
        lastName: ' ',
        email: ' ',
        password: ' '
    })

    const validationRef = {
        firstNameRef: React.createRef(),
        lastNameRef: React.createRef(),
        emailRef: React.createRef(),
        passwordRef: React.createRef()
    }

    const onChange = (event) => {
        const newData = {...registerData, [event.target.name]: event.target.value}
        setRegisterData(newData)
        console.log(newData)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        //TODO: rejestracja
        history.push('/login')
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form className={classes.form}  onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                ref={validationRef.firstNameRef}
                                onChange={onChange}
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                error={registerData.firstName===''}
                                helperText={registerData.firstName===''?'Empty field!':''}
                                autoComplete={'off'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                ref={validationRef.lastNameRef}
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                error={registerData.lastName===''}
                                helperText={registerData.lastName===''?'Empty field!':''}
                                autoComplete={'off'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                ref={validationRef.emailRef}
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                error={registerData.email===''}
                                helperText={registerData.email===''?'Empty field!':''}
                                autoComplete={'off'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                ref={validationRef.passwordRef}
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                error={registerData.password===''}
                                helperText={registerData.password===''?'Empty field!':''}
                                autoComplete={'off'}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2"
                                  onClick={() => {
                                      history.push('/login')
                                  }}>
                                Already have an account? Sign in!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}

export default RegisterPage
