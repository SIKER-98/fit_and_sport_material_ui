import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import {useHistory, useLocation} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
    EventNote,
    DirectionsRun,
    SubjectOutlined,
    AccountCircle,
    VpnKey,
    ExitToApp,
    PersonAdd
} from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {format} from 'date-fns'
import {connect} from "react-redux";
import userActions from "../redux/actions/userActions";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            // background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(4),
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        date: {
            flexGrow: 1
        },
        toolbarMobile: {
            ...theme.mixins.toolbar,
            marginTop: 200
        },

        toolbar: theme.mixins.toolbar,

        avatar: {
            marginLeft: theme.spacing(2),
        },
        appBarList: {
            display: 'flex',
            flexDirection: 'row'
        },

        mobile: {
            display: 'flex',
            flexDirection: 'column'
        }
    }
})

const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    // console.log('1',innerWidth, innerHeight)
    // console.log('2',width, height)
    return {width, height};
}

const Layout = ({children, user, logout}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const menuItems = [

        {
            text: 'Home',
            icon: <SubjectOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: 'Training plans',
            icon: <EventNote color="secondary"/>,
            path: '/training'
        },
        {
            text: 'Running result',
            icon: <DirectionsRun color="secondary"/>,
            path: '/running'
        },

    ];

    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                position="fixed"
                className={windowDimensions.width > 800 ? classes.appBar : 'null'}
                // className={classes.appBar}
                elevation={3}
                color="primary"
            >
                <Toolbar className={windowDimensions.width < 800 ? classes.mobile : 'null'}>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Typography>{user.userId < 0 ? 'Unsigned' : `${user.firstName} ${user.lastName}`}</Typography>

                    {windowDimensions.width > 800 &&
                    <AccountCircle className={classes.avatar}/>
                    }


                    <List className={classes.appBarList}>
                        {user.userId > 0 &&
                        <ListItem
                            button
                            onClick={() => {
                                logout()
                                history.push('/login')
                            }}
                        >
                            <ListItemIcon style={{color: 'white'}}><ExitToApp/></ListItemIcon>
                            <ListItemText primary={'LOGOUT'}/>
                        </ListItem>
                        }

                        {user.userId < 0 &&
                        <>
                            <ListItem
                                button
                                onClick={() => history.push('/login')}
                            >
                                <ListItemIcon style={{color: 'white'}}><VpnKey/></ListItemIcon>
                                <ListItemText primary={'LOGIN'}/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => history.push('/register')}
                            >
                                <ListItemIcon style={{color: 'white'}}><PersonAdd/></ListItemIcon>
                                <ListItemText primary={'REGISTER'}/>
                            </ListItem>
                        </>
                        }
                    </List>

                    {windowDimensions.width < 800 &&
                    <List style={{display: 'flex', flexDirection: 'row'}}>

                        {user.userId > 0 && menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                // className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        ))
                        }
                    </List>
                    }

                </Toolbar>
            </AppBar>

            {/* side drawer */}
            {windowDimensions.width > 800 &&
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}
                anchor="left"
                elevation={3}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Fit & Sport
                    </Typography>
                </div>

                {/* links/list section */}

                <List>

                    {user.userId > 0 && menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))
                    }
                </List>

            </Drawer>
            }

            {/* main content */}
            <div className={classes.page}>
                <div className={windowDimensions.width > 800 ? classes.toolbar : classes.toolbarMobile}/>
                {children}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
