import React from "react";

const Home = ({user}) => {
    return (
        <div>
            <h1>Welcome {user?.subjectId}</h1>
        </div>
    );
};

export default Home;