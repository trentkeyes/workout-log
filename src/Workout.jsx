import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';
import AddSet from './AddSet';

export default function Workout(props) {
  // recieve exercise selector
  // save exercises in local state
  // set whole workout to global state
  const [workout, setWorkout] = useState({
    exercises: { squats: [] },
    date: new Date().toLocaleDateString(),
    notes: 'Feel the burn!',
  });

  const entries = Object.entries(workout.exercises);

  console.log(workout);

  const exerciseElements = entries.map((exercise) => {
    const [name, sets] = exercise;
    return <Exercise name={name} sets={sets} setWorkout={setWorkout} />;
  });

  return (
    <div className="workout__container">
      <div className="workout__header">
        <h2 className="workout__date">{workout.date}</h2>{' '}
      </div>
      <div className="exercises__container">{exerciseElements}</div>

      <div className="workout__addExercise-save">
        <ExerciseSelector
          exerciseOptions={props.exerciseOptions}
          setWorkout={setWorkout}
        />
        <button>Save Workout</button>
      </div>
      <textarea className="workout__notes" value={workout.notes} rows="3" />
    </div>
  );
}
