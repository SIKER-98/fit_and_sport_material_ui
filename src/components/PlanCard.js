import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Visibility} from '@material-ui/icons'
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    // root: {
    //     maxWidth: 345
    // },
    avatar: {
        backgroundColor: theme.palette.primary.A200
    }
}))

const PlanCard = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <div>
            {/*<Card classes={classes.root} elevation={2}>*/}
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            H
                        </Avatar>
                    }

                    action={
                        <IconButton>
                            <Visibility/>
                        </IconButton>
                    }
                    title={'Training plan'}
                />

                <CardContent>
                    <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda at consequuntur
                        cupiditate dignissimos dolor dolores doloribus eligendi exercitationem ipsam magni maiores
                        mollitia nulla numquam provident sequi tempora veniam voluptatum?
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size={'small'} color={'primary'}
                            onClick={() => {
                                history.push('/plan')
                            }}
                    >
                        View
                    </Button>
                    <Button size={'small'} color={'primary'}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default PlanCard
