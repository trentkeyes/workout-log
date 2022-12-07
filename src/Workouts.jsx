import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import Workout from './Workout';
import { addWorkout } from './services/api';

export default function Workouts({ selectedWorkouts, exerciseOptions }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('workouts use effect');
    const q = query(collection(db, 'workouts'), orderBy('created', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setWorkouts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  console.log(workouts);

  return (
    <div>
      <button onClick={() => addWorkout()}>Add New Workout</button>
      <h1>Selected Workouts:</h1>
      <div>{selectedWorkouts}</div>
      <h1>Firebase Workouts:</h1>
      <div>
        {workouts.map((workout) => (
          <Workout
            id={workout.id}
            key={workout.id}
            workoutID={workout.id}
            date={workout.data.date}
            time={workout.data.time}
            savedExercises={workout.data.exercises}
            savedNotes={workout.data.notes}
            exerciseOptions={exerciseOptions}
          />
        ))}
      </div>
    </div>
  );
}
