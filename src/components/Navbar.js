import {Button} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";

const Navbar = ({authenticated, user, onLogout}) => {
    const history = useHistory();

    return (
        <nav className="nav-container">
            <Button
                style={{margin: "auto 5px"}}
                variant={"contained"}
                color="primary"
                onClick={() => history.push("/home")}
            >
                Home
            </Button>
            {authenticated && !!user && <>
                {user.userType === "glados" && <>
                    <Button
                        style={{margin: "auto 5px"}}
                        variant={"contained"}
                        color="primary"
                        onClick={() => history.push("/subjects-overview")}
                    >
                        Subjects Overview
                    </Button>
                </>}
                {user.userType === "subject" &&
                <Button
                    style={{margin: "auto 5px"}}
                    variant={"contained"}
                    color="primary"
                    onClick={() => history.push("/test")}
                >
                    Test
                </Button>
                }
                <Button
                    style={{margin: "auto 5px"}}
                    variant={"contained"}
                    color="primary"
                    onClick={onLogout}
                >
                    Log out
                </Button>
            </>}
        </nav>
    );
};

export default Navbar;