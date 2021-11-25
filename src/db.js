import Dexie from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";

// { "course": "Red Deer GCC", "tee": "white", "rating": "74.9", "slope": "135" }
// { "date": "2020-06-02", "course": "Gleneagles", "tee": "blue", "rating": "70.2", "slope": "123", "score": "92", "differential": 20, "scoreNumber": 0, "status": "low", "allTimeRank": 37, "currentRank": 8 },

export const db = new Dexie('myDatabase');
db.version(1).stores({
    courses: 'name',
    rounds: '++id, date'
});

export function CourseList() {
    const friends = useLiveQuery(
        () => db.courses.toArray()
    );

    return <ul>
        {friends?.map(friend => <li key={friend.id}>
            {friend.name}, {friend.age}
        </li>)}
    </ul>;
}