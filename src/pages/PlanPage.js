import React, {useEffect} from "react";
import PlanCard from "../components/PlanCard";
import Masonry from "react-masonry-css";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {apiFetchExercises} from "../redux/thunk/exerciseOperations";
import {connect} from "react-redux";
import {apiDeletePlan, apiEditPlan, apiGetUserPlans} from "../redux/thunk/planOperations";
import {apiGetRuns} from "../redux/thunk/runOperations";

const useStyles = makeStyles(theme => ({
    create: {
        margin: theme.spacing(3, 0, 3)
    }
}))

const PlanPage = ({fetchExercise, getUserPlans, user, plan, deletePlan, editPlan, getRuns}) => {
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        fetchExercise()
        getUserPlans(user.userId)
        getRuns(user.userId)
    },[])

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            <Button
                fullWidth
                variant={'contained'}
                color={'secondary'}
                className={classes.create}
                onClick={() => {
                    history.push('/create')
                }}
            >
                Create new training plan
            </Button>


            <Masonry
                breakpointCols={breakpoints}
                className={'my-masonry-grid'}
                columnClassName={'my-masonry-grid_column'}

            >

                {plan.planList.map(plan => (
                    <div key={plan.id}>
                        <PlanCard
                            title={plan.planName}
                            description={plan.description}
                            deleteClick={deletePlan}
                            editClick={editPlan}
                            planId={plan.id}
                        />
                    </div>
                ))}
            </Masonry>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    plan: state.plan
})

const mapDispatchToProps = dispatch => ({
    fetchExercise: () => dispatch(apiFetchExercises()),
    getUserPlans: (userId) => dispatch(apiGetUserPlans(userId)),
    deletePlan: (plan) => dispatch(apiDeletePlan(plan)),
    editPlan: (plan) => dispatch(apiEditPlan(plan)),
    getRuns: item => dispatch(apiGetRuns(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanPage)
