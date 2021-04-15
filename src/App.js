import './App.scss';
import React, {useState} from "react";
import {Switch, Route, useHistory} from "react-router-dom";
import Home from "./pages/Home";
import SubjectsOverview from "./pages/SubjectsOverview";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const history = useHistory();

    if (!authenticated) {
        history.push("/");
        return (
            <Login
                setAuthenticated={setAuthenticated}
                setUser={setUser}
            />
        );
    };

    const onLogout = () => {
        setAuthenticated(false);
        setUser(null);
    }

    return (
        <div className="app">
            <Navbar onLogout={onLogout} user={user} authenticated={authenticated}/>
            <Switch>
                <Route path='/home' exact render={(props) => (<Home {...props} user={user}/>)}/>
                <Route path='/subjects-overview' exact render={(props) => (<SubjectsOverview {...props} user={user}/>)}/>
                <Route path='/test' exact render={(props) => (<Test {...props} user={user}/>)}/>
            </Switch>
        </div>
    );
}
export default App;
