import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';

export default function Workout(props) {
  // recieve exercise selector
  // save exercises in local state
  // set whole workout to global state
  const [exercises, setExercises] = useState({});
  const [info, setInfo] = useState({
    date: new Date().toLocaleDateString(),
    notes: 'Feel the burn!',
  });

  const entries = Object.entries(exercises);

  const exerciseElements = entries.map((exercise) => {
    const [name, sets] = exercise;
    const setsElements = sets.map((set) => {
      return (
        <p>
          {set.reps} @ {set.weight}
        </p>
      );
    });
    return (
      <div>
        <h4>{name}</h4>
        {setsElements}
      </div>
    );
  });

  console.log(exercises);

  return (
    <div className="workout--container">
      <h2>{info.date}</h2>
      {exerciseElements}
      <ExerciseSelector
        exerciseOptions={props.exerciseOptions}
        setExercises={setExercises}
      />
      <p>{info.notes}</p>
      <button>Save Workout</button>
    </div>
  );
}
