import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    IconButton, TextField,
    Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Edit, Visibility} from '@material-ui/icons'
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import planInfoActions from "../redux/actions/planInfoActions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    // root: {
    //     maxWidth: 345
    // },
    avatar: {
        backgroundColor: theme.palette.primary.A200
    }
}))

const PlanCard = ({title, description, deleteClick, editClick, planId, planInfoInit}) => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <div>
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            H
                        </Avatar>
                    }

                    action={
                        <DialogPlanModify
                            title={title}
                            description={description}
                            editPlan={editClick}
                            planId={planId}
                        />
                    }
                    title={title}
                />

                <CardContent>
                    <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
                        {description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size={'small'} color={'primary'}
                            onClick={async () => {
                                await planInfoInit({planId, title, description})
                                history.push('/plan'
                                )
                            }}
                    >
                        View
                    </Button>
                    <Button size={'small'} color={'primary'}
                            onClick={() => deleteClick(planId)}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

// const DialogPlanModify = ({title, description, editPlan, planId}) => {
const DialogPlanModify = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)

    const handleChange = (event) => {
        console.log(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = (save) => {
        if (save) {
            props.editPlan({title, description, planId: props.planId})
        }

        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <Edit/>
            </IconButton>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClickClose}>
                <DialogTitle>Modify Plan</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete={'off'}
                        name={'title'}
                        variant={'standard'}
                        type={'text'}
                        required
                        label={'Title'}
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'description'}
                        variant={'standard'}
                        type={'text'}
                        required
                        multiline
                        label={'Description'}
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)}
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

const mapDispatchToProps = dispatch => ({
    planInfoInit: item => dispatch(planInfoActions.init(item))
})


export default connect(null, mapDispatchToProps)(PlanCard)
