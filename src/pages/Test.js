import React, {useEffect, useState} from "react";
import axios from "axios";
import {TextField, Button} from "@material-ui/core";

const Test = ({user}) => {
    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch the questions
    useEffect(() => {
        setLoading(false);
        axios.get("http://localhost:3001/test-questions")
            .then((res) => {
                // Create a dictionary to use as state
                const state = res.data.testQuestions.reduce((acc, curr) => {
                    return {...acc, [curr.id]: {label: curr.label, value: ""}};
                }, {});
                setQuestions(state);
            })
            .finally(() => setLoading(false));
    }, [])

    const onSubmit = () => {
        axios.post(
            "http://localhost:3001/submit-answers",
            {
                answers: questions,
                subjectId: user.subjectId,
            })
            .then((res) => {
                alert("Success");
            })
    }

    return (
        <div>
            <h1>TEST</h1>
            <div className="test-container">
                {!!questions && Object.keys(questions).map((questionId) => {
                    const {label, value} = questions[questionId];
                    return (
                        <TextField
                            style={{margin: "20px auto", width: "800px", display: "block"}}
                            fullWidth
                            label={label}
                            value={value}
                            onChange={(e) => setQuestions({
                                ...questions,
                                [questionId]: {...questions[questionId], value: e.target.value}
                            })}
                        />
                    );
                })}
            </div>
            <Button onClick={onSubmit} variant="contained" color="primary">Submit</Button>
        </div>
    );
};

export default Test;