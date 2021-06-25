import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from 'react-router'

const AuthenticatedRoute = (props) => {
    if (props.user.userId>0)
        return <Route {...props}/>
    else
        return <Redirect to={'/login'}/>

}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(AuthenticatedRoute)
