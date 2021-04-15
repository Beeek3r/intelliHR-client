import React, {useState} from "react";
import axios from "axios";
import {TextField, Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Login = ({setAuthenticated, setUser}) => {
    const [subjectId, setSubjectId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const onChangeUsername = (e) => setSubjectId(e.target.value);

    const onChangePassword = (e) => setPassword(e.target.value);

    const onLogin = async () => {
        setLoading(true);
        setError(null);
        axios.post("http://localhost:3001/auth", {subjectId, password})
            .then((res) => {
                setAuthenticated(true);
                setUser(res.data.user);
                history.push("/home")
            })
            .catch(() => setError("Incorrect login/password"))
            .finally(() => setLoading(false));
    }

    return (
        <div className="page-container">
            <div className="login-container">
                <h1 style={{textAlign: "center"}}>Login</h1>
                <TextField
                    label="Username"
                    value={subjectId}
                    variant="outlined"
                    onChange={onChangeUsername}
                    fullWidth
                    style={{marginTop: "15px"}}
                />
                <TextField
                    label="Password"
                    value={password}
                    variant="outlined"
                    onChange={onChangePassword}
                    fullWidth
                    style={{marginTop: "15px"}}
                    type="password"
                />
                <div className="flex-container" style={{marginTop: "15px"}}>
                    <Button onClick={onLogin} disabled={loading} color="primary" variant="contained">Login</Button>
                </div>
                {!!error && <div className="error-container">{error}</div>}
            </div>
        </div>
    );
};

export default Login;