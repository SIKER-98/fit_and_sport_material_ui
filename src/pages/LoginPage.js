import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, Link, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import store from "../redux/store";
import {fetchUsers, getAllUsers} from "../redux/thunk/userOperations";

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

const LoginPage = ({user, getAllUsers}) => {
    const classes = useStyles()
    const history = useHistory()

    const loginClick =()=>{

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
                                id={'email'}
                                label={'Email'}
                                autoFocus
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
                                id={'password'}
                                label={'Password'}
                            />
                        </Grid>

                        <Button
                            type={'submit'}
                            fullWidth
                            variant={'contained'}
                            color={'primary'}
                            className={classes.submit}
                            onClick={(e) => {
                                e.preventDefault()
                                getAllUsers()
                                console.log(user)
                            }}
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
    getAllUsers: () => dispatch(getAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
