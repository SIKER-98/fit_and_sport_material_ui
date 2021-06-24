import React from "react";
import PlanCard from "../components/PlanCard";
import Masonry from "react-masonry-css";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    create: {
        margin: theme.spacing(3, 0, 3)
    }
}))

const PlanPage = () => {
    const classes = useStyles()
    const history = useHistory()

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
                onClick={()=>{history.push('/create')}}
            >
                Create new training plan
            </Button>


            <Masonry
                breakpointCols={breakpoints}
                className={'my-masonry-grid'}
                columnClassName={'my-masonry-grid_column'}

            >
                <div>
                    <PlanCard/>
                </div>
                <div>
                    <PlanCard/>
                </div>
                <div>
                    <PlanCard/>
                </div>
                <div>
                    <PlanCard/>
                </div>
                <div>
                    <PlanCard/>
                </div>
                <div>
                    <PlanCard/>
                </div>
            </Masonry>
        </Container>
    )
}

export default PlanPage
