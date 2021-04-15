import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Select, MenuItem} from "@material-ui/core";

const SubjectsOverview = () => {
    const [subjects, setSubjects] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterOption, setFilterOption] = useState("all"); // all, onlyAlive, highScorers

    // Fetch the subjects once on mount
    useEffect(() => {
        setLoading(false);
        axios.get("http://localhost:3001/subjects")
            .then((res) => {
                setSubjects(res.data.subjects);
            })
            .finally(() => setLoading(false));
    }, []);

    const onFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const filteredSubjects = useMemo(() => {
        if (!subjects) return null;
        switch (filterOption) {
            case "all":
                return subjects;
            case "onlyAlive":
                return subjects.filter(({alive}) => alive);
            case "highScorers":
                return subjects.filter(({totalScore}) => totalScore > 50);
        }
    }, [filterOption, subjects]);

    return (
        <div>
            <h1>Subject Overview</h1>
            <div className="subjects-filter-container">
                <Select value={filterOption} onChange={onFilterChange}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="onlyAlive">Only Alive</MenuItem>
                    <MenuItem value="highScorers">High Scorers (80+)</MenuItem>
                </Select>
            </div>
            <div className="subjects-container">
                {!!filteredSubjects && !loading && filteredSubjects.map(({subjectId, TestChamber, TotalScore, Alive}) => (
                    <Subject key={subjectId} subjectId={subjectId} TestChamber={TestChamber} TotalScore={TotalScore} Alive={Alive}/>
                ))}
            </div>
        </div>
    );
};

const Subject = ({subjectId, TestChamber, TotalScore, Alive}) => {
    return (
        <div className="subject-container">
            <h3>{subjectId}</h3>
            <div>Test Chamber: {TestChamber}</div>
            <div>TotalScore: {TotalScore}</div>
            <div>Alive: {!!Alive ? "Alive" : "Dead"}</div>
        </div>
    );
};

export default SubjectsOverview;