import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, Link, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {apiLogin, getAllUsers} from "../redux/thunk/userOperations";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '1005',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const LoginPage = ({user, getAllUsers, apiLogin}) => {
    const classes = useStyles()
    const history = useHistory()
    const [loginData, setLoginData] = useState({
        email: ' ',
        password: ' '
    })
    const [error, setError] = useState(false)

    const onChange = (event) => {
        setError(false)
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }

    const loginClick = async (e) => {
        e.preventDefault()


        if (loginData.email === '' || loginData.email.length < 3) {
            setError(true)
            return
        }

        if (loginData.password === '' || loginData.password.length < 3) {
            setError(true)
            return
        }
        let status = -1

        try {
            status = await apiLogin(loginData)
        } catch (e) {
            setError(true)
        }

        if (status === 200) {
            history.push('/training')
        }
    }

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <div className={classes.paper}>
                <Typography component={'h1'} variant={'h5'}>
                    Sign in
                </Typography>

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete={'email'}
                                name={'email'}
                                variant={'outlined'}
                                required
                                fullWidth
                                label={'Email'}
                                autoFocus
                                onChange={onChange}
                                error={error}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete={'off'}
                                name={'password'}
                                variant={'outlined'}
                                type={'password'}
                                required
                                fullWidth
                                label={'Password'}
                                onChange={onChange}
                                error={error}
                            />
                        </Grid>

                        <Button
                            type={'submit'}
                            fullWidth
                            variant={'contained'}
                            color={'primary'}
                            className={classes.submit}
                            onClick={(e) => loginClick(e)}
                        >
                            Sign in
                        </Button>

                        <Grid container justify={'flex-end'}>
                            <Grid item>
                                <Link variant={'body2'}
                                      onClick={() => {
                                          history.push('/register')
                                      }}
                                >
                                    Not a member yet? Sign up!
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    apiLogin: (item) => dispatch(apiLogin(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
