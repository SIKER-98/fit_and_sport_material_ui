import {Button, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {brown, blueGrey} from '@material-ui/core/colors'
import Layout from './components/Layout'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanPage from "./pages/PlanPage";
import PlanViewPage from "./pages/PlanViewPage";
import store from "./redux/store";
import {Provider} from "react-redux";

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
                            <Route exact path={'/'}>
                                <HomePage/>
                            </Route>
                            <Route path={'/register'}>
                                <RegisterPage/>
                            </Route>
                            <Route path={'/login'}>
                                <LoginPage/>
                            </Route>
                            <Route path={'/create'}>
                                <CreatePlanPage/>
                            </Route>
                            <Route path={'/training'}>
                                <PlanPage/>
                            </Route>
                            <Route path={'/plan'}>
                                <PlanViewPage/>
                            </Route>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
