import Dexie from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";

// { "course": "Red Deer GCC", "tee": "white", "rating": "74.9", "slope": "135" }
// { "date": "2020-06-02", "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123", "score": "92", "differential": 20, "scoreNumber": 0, "status": "low", "allTimeRank": 37, "currentRank": 8 },

export const db = new Dexie('myDatabase');

// db.delete();

db.version(1).stores({
    courses: '++id, course',
    rounds: '++id, date'
});

export function CourseSelectList(props) {
    let courses = useLiveQuery(
        () => db.courses.orderBy('course').toArray()
    );

    return <select value="" onChange={props.onChange}>
        <option key="blank" value="" disabled>Select a course</option>
        {courses?.map(course => <option key={course.course} value={course.course}>
            {course.course}
        </option>)}
    </select>;
}
