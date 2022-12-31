import { useState, useEffect } from 'react';
import Workout from '../components/Workout';
import { addWorkout, getWorkouts } from '../services/api';

export const Workouts = ({ exerciseOptions, userId }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts(userId, setWorkouts);
  }, []);

  console.log('Workouts:', workouts);

  return (
    <div className="flex flex-col items-center my-2">
      <button onClick={() => addWorkout(userId)}>Add New Workout</button>
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
