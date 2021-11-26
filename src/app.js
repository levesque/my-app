import React, { useEffect, useState } from 'react';

import { db } from "./db";
import { CourseSelectList } from "./db";
import { CourseTees } from "./db";

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
    const resetDb = () => { db.delete(); }
    const primeDb = () => {
        const COURSES = [
            { "course": "Blue Devil", "tee": "blue", "rating": "70.6", "slope": "126" },
            { "course": "Bootleg Gap", "tee": "blue", "rating": "69.6", "slope": "120" },
            { "course": "Copper Point", "tee": "green", "rating": "68.9", "slope": "119" },
            { "course": "Delacour", "tee": "Blue/White", "rating": "71", "slope": "134" },
            { "course": "Delacour", "tee": "blue", "rating": "72.3", "slope": "135" },
            { "course": "Dunes", "tee": "White", "rating": "69.6", "slope": "114" },
            { "course": "Eagle Ranch", "tee": "blue", "rating": "69.6", "slope": "133" },
            { "course": "Eaglepoint", "tee": "Gold", "rating": "70.2", "slope": "123" },
            { "course": "Eaglepoint", "tee": "white", "rating": "68.9", "slope": "117" },
            { "course": "Elbow Springs M/S", "tee": "blue", "rating": "69.5", "slope": "116" },
            { "course": "Glen Dornoch", "tee": "White", "rating": "70.2", "slope": "127" },
            { "course": "Glencoe - Forest", "tee": "White", "rating": "70.4", "slope": "133" },
            { "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123" },
            { "course": "HG Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
            { "course": "Harvest ", "tee": "blue", "rating": "70.3", "slope": "119" },
            { "course": "Heather Glen Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
            { "course": "Kamloops G&CC", "tee": "gold", "rating": "70.2", "slope": "122" },
            { "course": "Maple Ridge", "tee": "blue", "rating": "68.8", "slope": "115" },
            { "course": "Possum Trot", "tee": "White", "rating": "70.4", "slope": "118" },
            { "course": "Radium Springs", "tee": "Blue", "rating": "69.7", "slope": "120" },
            { "course": "Red Deer GCC", "tee": "white", "rating": "74.9", "slope": "135" },
            { "course": "Redwood Meadows", "tee": "Blue/White", "rating": "70,3", "slope": "123" },
            { "course": "River Spirit", "tee": "Blue/White", "rating": "70.7", "slope": "126" },
            { "course": "Riverside Fairmont", "tee": "Blue", "rating": "68.5", "slope": "130" },
            { "course": "Serenity", "tee": "Blue", "rating": "71.1", "slope": "137" },
            { "course": "Shaftesbury", "tee": "Gold", "rating": "69.5", "slope": "128" },
            { "course": "Shagannapi", "tee": "blue", "rating": "62.9", "slope": "110" },
            { "course": "Sirocco", "tee": "blue", "rating": "72.4", "slope": "138" },
            { "course": "Sirocco", "tee": "white", "rating": "69.7", "slope": "131" },
            { "course": "St Eugene", "tee": "blue", "rating": "70.4", "slope": "132" },
            { "course": "Stewart Creek", "tee": "blue", "rating": "71.6", "slope": "127" },
            { "course": "Stewart Creek", "tee": "blue/white", "rating": "69.5", "slope": "124" },
            { "course": "The Pearl", "tee": "White", "rating": "69.7", "slope": "126" },
            { "course": "Tobiano", "tee": "Spur", "rating": "71.9", "slope": "127" },
            { "course": "Wildstone", "tee": "blue", "rating": "70.6", "slope": "117" },
            { "course": "Wolf Creek", "tee": "blue", "rating": "67", "slope": "124" },
            { "course": "shmoobie", "tee": "gree", "rating": "123", "slope": "71.2" }
        ];

        db.courses.bulkAdd(COURSES);
    };


    const [selectedCourseName, setSelectedCourse] = useState("");

    useEffect(() => {
        console.log('in homepage useEffect ' + selectedCourseName);
    });

    const courseSelected = (e) => {
        setSelectedCourse(e.target.value);
    };

    return (
        <div>
            <button onClick={primeDb}>Insert some data</button>
            <button onClick={resetDb}>Delete all data</button>

            <CourseSelectList selectedCourseName={selectedCourseName} onChange={courseSelected} />
            <CourseTees selectedCourseName={selectedCourseName} />
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
            (
                <tr>
                    <td>{props.rounds[i].date}</td>
                    <td>{props.rounds[i].course}</td>
                    <td>{props.rounds[i].tee}</td>
                    <td>{props.rounds[i].score}</td>
                    <td>{props.rounds[i].differential}</td>
                </tr>
            )
        );
    }

    return ((
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
    ))
        ;
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
            <HandicApp rounds={ROUNDS} />
        </div>
    );
}
