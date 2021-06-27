import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {brown, blueGrey} from '@material-ui/core/colors'
import Layout from './components/Layout'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanPage from "./pages/PlanPage";
import PlanViewPage from "./pages/PlanViewPage";
import store from "./redux/store";
import {Provider} from "react-redux";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import RunPage from "./pages/RunPage";

const theme = createMuiTheme({
    palette: {
        primary: brown,
        secondary: blueGrey
    }
})

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Layout>
                        <Switch>

                            <AuthenticatedRoute exact path={'/'}>
                                <CreatePlanPage/>
                            </AuthenticatedRoute>

                            <Route path={'/register'}>
                                <RegisterPage/>
                            </Route>

                            <Route path={'/login'}>
                                <LoginPage/>
                            </Route>

                            <AuthenticatedRoute path={'/create'}>
                                <CreatePlanPage/>
                            </AuthenticatedRoute>

                            <AuthenticatedRoute path={'/training'}>
                                <PlanPage/>
                            </AuthenticatedRoute>

                            <AuthenticatedRoute path={'/plan'}>
                                <PlanViewPage/>
                            </AuthenticatedRoute>

                            <AuthenticatedRoute path={'/running'}>
                                <RunPage/>
                            </AuthenticatedRoute>

                        </Switch>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
