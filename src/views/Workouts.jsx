import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import Workout from '../components/Workout';
import { addWorkout, getWorkouts } from '../services/api';

export const Workouts = ({ exerciseOptions, userId }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts(userId, setWorkouts);
  }, []);

  console.log(workouts);

  return (
    <div>
      <button onClick={() => addWorkout(user.uid)}>Add New Workout</button>
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
};
