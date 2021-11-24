import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const HOME_PAGE = "Handicap";
const ROUNDS_PAGE = "Rounds";
const COURSES_PAGE = "Courses";

class HandicApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HOME_PAGE,
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tabText) {
        this.setState({ selectedTab: tabText });
    }

    render() {

        // generate the content for the selected tab
        let pageContents;
        switch (this.state.selectedTab) {
            case HOME_PAGE:
                pageContents = <HomePage courses={this.props.courses} />
                break;

            case ROUNDS_PAGE:
                pageContents = <RoundsPage rounds={this.props.rounds} />
                break;

            case COURSES_PAGE:
                pageContents = <CoursesPage courses={this.props.courses} />
                break;

            default:
                pageContents = <p>Oopsie, unrecognized tab name</p>
                break;
        }


        return (
            <div>
                <div>HandicApp</div>
                <div>
                    <TabButton value={HOME_PAGE} handleOnClick={this.handleTabClick} />
                    <TabButton value={ROUNDS_PAGE} handleOnClick={this.handleTabClick} />
                    <TabButton value={COURSES_PAGE} handleOnClick={this.handleTabClick} />
                </div>
                <div>
                    {pageContents}
                </div>
            </div>
        );
    }
}


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: "",
        };
        this.handleOnCourseChange = this.handleOnCourseChange.bind(this);
    }

    handleOnCourseChange(courseName) {
        this.setState({ selectedCourse: courseName });
        // TODO set slope/rating etc
    }

    render() {

        // generate select options of distinct courses
        let justCourses = [...new Set(this.props.courses.map(item => item.course))];
        justCourses = justCourses.sort((a, b) => a > b ? 1 : -1);
        var courseOptions = [];
        courseOptions.push(<option></option>);
        for (var k = 0; k < justCourses.length; k++) {
            courseOptions.push(<option key={justCourses[k]} value={justCourses[k]}> {justCourses[k]} </option>);
        }

        let courseDetails;
        if (this.state.selectedCourse !== "") {
            courseDetails = <p>Should only show when course is selected</p>
        }

        return (
            <div>
                <select id='courseSelect' onChange={this.handleOnCourseChange}>
                    {courseOptions}
                </select>
                {courseDetails}
            </div>
        );
    }
} // HomePage


class RoundsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: "",
        };
        this.handleDeleteCourseClicked = this.handleDeleteCourseClicked.bind(this);
    }

    handleDeleteCourseClicked(courseName) {
        this.setState({ selectedCourse: courseName });
    }

    render() {

        // {"date":"2020-06-02","course":"Gleneagles","tee":"blue",
        // "rating":"70.2","slope":"123",
        // "score":"92","differential":20,"scoreNumber":0,"status":"low","allTimeRank":37,"currentRank":8},

        var tableRows = [];
        for (var i = 0; i < this.props.rounds.length; i++) {
            tableRows.push(
                <tr>
                    <td>{this.props.rounds[i].date}</td>
                    <td>{this.props.rounds[i].course}</td>
                    <td>{this.props.rounds[i].tee}</td>
                    <td>{this.props.rounds[i].score}</td>
                    <td>{this.props.rounds[i].differential}</td>
                </tr>
            );
        }

        return (
            <table>
                <tr>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Tees</th>
                    <th>Score</th>
                    <th>Differential</th>
                </tr>
                {tableRows}
            </table>
        );
    }
} // RoundsPage


class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourse: "",
        };
        this.handleDeleteCourseClicked = this.handleDeleteCourseClicked.bind(this);
    }

    handleDeleteCourseClicked(courseName) {
        this.setState({ selectedCourse: courseName });
    }

    render() {

        var tableRows = [];
        for (var i = 0; i < this.props.courses.length; i++) {
            tableRows.push(
                <tr>
                    <td>{this.props.courses[i].course}</td>
                    <td>{this.props.courses[i].tee}</td>
                    <td>{this.props.courses[i].rating}</td>
                    <td>{this.props.courses[i].slope}</td>
                </tr>
            );
        }

        return (
            <table>
                <tr>
                    <th>Course</th>
                    <th>Tees</th>
                    <th>Rating</th>
                    <th>Slope</th>
                    <th>Delete</th>
                </tr>
                {tableRows}
            </table>
        );
    }
} // CoursesPage


class TabButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        this.props.handleOnClick(e.target.value);
    }

    render() {
        return (
            <button type="button" onClick={this.handleOnClick} value={this.props.value}>
                {this.props.value}
            </button>
        );
    }
}

const COURSES = [
    { "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123" },
    { "course": "Kamloops G&CC", "tee": "gold", "rating": "70.2", "slope": "122" },
    { "course": "HG Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
    { "course": "Harvest ", "tee": "blue", "rating": "70.3", "slope": "119" },
    { "course": "Heather Glen Creek/Hills", "tee": "white", "rating": "68.2", "slope": "119" },
    { "course": "Maple Ridge", "tee": "blue", "rating": "68.8", "slope": "115" },
    { "course": "Possum Trot", "tee": "White", "rating": "70.4", "slope": "118" },
    { "course": "Radium Springs", "tee": "Blue", "rating": "69.7", "slope": "120" },
    { "course": "Red Deer GCC", "tee": "white", "rating": "74.9", "slope": "135" }
]

const ROUNDS = [
    { "date": "2020-06-02", "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123", "score": "92", "differential": 20, "scoreNumber": 0, "status": "low", "allTimeRank": 37, "currentRank": 8 },
    { "date": "2020-05-17", "course": "Serenity", "tee": "Blue", "rating": "71.1", "slope": "137", "score": "91", "differential": 16.4, "scoreNumber": 2, "status": "low", "allTimeRank": 15, "currentRank": 3 },
    { "date": "2020-05-28", "course": "Delacour", "tee": "Blue/White", "rating": "71", "slope": "134", "score": "96", "differential": 21.1, "scoreNumber": 1, "status": "low", "allTimeRank": 40, "currentRank": 10 },
    { "date": "2020-05-15", "course": "Delacour", "tee": "Blue/White", "rating": "71", "slope": "134", "score": "101", "differential": 25.3, "scoreNumber": 3, "status": "high", "allTimeRank": 62, "currentRank": "&nbsp" }
]

ReactDOM.render(
    <HandicApp courses={COURSES} rounds={ROUNDS} />,
    document.getElementById('root')
);
