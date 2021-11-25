import React, { useState } from 'react';

import { db } from "./db";
import { CourseSelectList } from "./db";

import './index.css';

const HOME_PAGE = "Handicap";
const ROUNDS_PAGE = "Rounds";
const COURSES_PAGE = "Courses";

function HandicApp(props) {

    const [selectedTab, setSelectedTab] = useState(HOME_PAGE);

    const handleTabClicked = (e) => {
        console.log(e.target);
        setSelectedTab(e.target.value);
    }

    const courses = db.courses;

    // generate the content for the selected tab
    let pageContents;
    switch (selectedTab) {
        case HOME_PAGE:
            pageContents = <HomePage courses={courses} />
            break;

        case ROUNDS_PAGE:
            pageContents = <RoundsPage rounds={props.rounds} />
            break;

        case COURSES_PAGE:
            pageContents = <CoursesPage courses={props.courses} />
            break;

        default:
            pageContents = <p>Oopsie, unrecognized tab name</p>
            break;
    }


    return (
        <div>
            <div>HandicApp</div>
            <div>
                <TabButton value={HOME_PAGE} handleOnClick={handleTabClicked} />
                <TabButton value={ROUNDS_PAGE} handleOnClick={handleTabClicked} />
                <TabButton value={COURSES_PAGE} handleOnClick={handleTabClicked} />
            </div>
            <div>
                {pageContents}
            </div>
        </div>
    );
} // HandicApp


function TabButton(props) {
    return (
        <button type="button" onClick={props.handleOnClick} value={props.value}>
            {props.value}
        </button>
    );
} // TabButton


function HomePage(props) {


    const [selectedCourseName, setSelectedCourse] = useState("");

    // generate select options of distinct courses

    // const courseOptions = CourseSelectList;
    const courseOptions = (<option key="blank"></option>);

    let courseDetails;
    // const selectedCourse = selectedCourseName !== "" ? courseOptions[0].value : courseOptions[5].value;
    // const allTees = <tr>
    //     <td>{selectedCourse.tee}</td>
    //     <td>{selectedCourse.rating}</td>
    //     <td>{selectedCourse.slope}</td>
    const allTees = <tr>
        <td>to do</td>
        <td>to do</td>
        <td>to do</td>
        <td>to do</td>
        <td>to do</td>
    </tr >

    courseDetails = <div>
        <table>
            <thead>
                <tr>
                    <th>Tees</th>
                    <th>Rating</th>
                    <th>Slope</th>
                    <th>Handicap</th>
                    <th>Target</th>
                </tr>
            </thead>
            <tbody>
                {allTees}
            </tbody>
        </table>
    </div>
    // }

    const primeDb = (e) => {
        console.log("clickety");
        const COURSES = [
            { "course": "Possum Trot", "tee": "White", "rating": "70.4", "slope": "118" },
            { "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123" },
            { "course": "HG Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
            { "course": "Harvest ", "tee": "blue", "rating": "70.3", "slope": "119" },
            { "course": "Heather Glen Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
            { "course": "Maple Ridge", "tee": "blue", "rating": "68.8", "slope": "115" },
            { "course": "Radium Springs", "tee": "Blue", "rating": "69.7", "slope": "120" },
            { "course": "Kamloops G&CC", "tee": "gold", "rating": "70.2", "slope": "122" },
            { "course": "Red Deer GCC", "tee": "white", "rating": "74.9", "slope": "135" }
        ];

        db.courses.bulkAdd(COURSES);
        console.log("click");

    };

    const resetDb = () => {db.delete();}

    return (
        <div>
            <button onClick={primeDb}>Insert some data</button>
            <button onClick={resetDb}>Delete all data</button>
            <select id='courseSelect' onChange={setSelectedCourse}>
                {courseOptions}
            </select>
            <CourseSelectList/>
            {courseDetails}
        </div>
    );
} // HomePage


function RoundsPage(props) {

    // {"date":"2020-06-02","course":"Gleneagles","tee":"blue",
    // "rating":"70.2","slope":"123",
    // "score":"92","differential":20,"scoreNumber":0,"status":"low","allTimeRank":37,"currentRank":8},

    var tableRows = [];
    for (var i = 0; i < props.rounds.length; i++) {
        tableRows.push(
            <tr>
                <td>{props.rounds[i].date}</td>
                <td>{props.rounds[i].course}</td>
                <td>{props.rounds[i].tee}</td>
                <td>{props.rounds[i].score}</td>
                <td>{props.rounds[i].differential}</td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Tees</th>
                    <th>Score</th>
                    <th>Differential</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
} // RoundsPage


function CoursesPage(props) {

    var tableRows = [];
    for (var i = 0; i < props.courses.length; i++) {
        tableRows.push(
            <tr>
                <td>{props.courses[i].course}</td>
                <td>{props.courses[i].tee}</td>
                <td>{props.courses[i].rating}</td>
                <td>{props.courses[i].slope}</td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Tees</th>
                    <th>Rating</th>
                    <th>Slope</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
} // CoursesPage


const ROUNDS = [
    { "date": "2020-06-02", "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123", "score": "92", "differential": 20, "scoreNumber": 0, "status": "low", "allTimeRank": 37, "currentRank": 8 },
    { "date": "2020-05-17", "course": "Serenity", "tee": "Blue", "rating": "71.1", "slope": "137", "score": "91", "differential": 16.4, "scoreNumber": 2, "status": "low", "allTimeRank": 15, "currentRank": 3 },
    { "date": "2020-05-28", "course": "Delacour", "tee": "Blue/White", "rating": "71", "slope": "134", "score": "96", "differential": 21.1, "scoreNumber": 1, "status": "low", "allTimeRank": 40, "currentRank": 10 },
    { "date": "2020-05-15", "course": "Delacour", "tee": "Blue/White", "rating": "71", "slope": "134", "score": "101", "differential": 25.3, "scoreNumber": 3, "status": "high", "allTimeRank": 62, "currentRank": "&nbsp" }
]


export function App() {

    return (
        <div>
            <HandicApp rounds={ROUNDS} />,
        </div>
    );
}
