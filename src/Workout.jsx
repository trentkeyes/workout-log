import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';
import AddSet from './AddSet';

export default function Workout(props) {
  const { exerciseOptions, setWorkouts, workoutID, date, notes } = props;

  const [exercises, setExercises] = useState({});
  // const [info, setInfo] = useState({
  //   date: new Date().toLocaleDateString(),
  //   notes: 'Feel the burn!',
  // });

  const saveWorkout = () => {
    setWorkouts((prevWorkouts) => {
      console.log({
        ...prevWorkouts,
        [workoutID]: {
          exercises: exercises,
        },
      });
      return {
        ...prevWorkouts,
        [workoutID]: {
          exercises: exercises,
        },
      };
    });
  };

  const removeExercise = (name) => {
    setExercises((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const exerciseElements = Object.entries(exercises).map((exercise) => {
    const [name, sets] = exercise;
    return (
      <Exercise
        key={name}
        name={name}
        sets={sets}
        exercises={exercises}
        setExercises={setExercises}
        removeExercise={removeExercise}
      />
    );
  });

  return (
    <div className="workout__container">
      <div className="workout__header">
        <h2 className="workout__date">{date}</h2>
      </div>
      <div className="exercises__container">{exerciseElements}</div>
      <textarea className="workout__notes" value={notes} rows="3" />
      <div className="workout__addExercise-save">
        <ExerciseSelector
          exerciseOptions={exerciseOptions}
          setExercises={setExercises}
        />
        <button onClick={saveWorkout}>Save Workout</button>
      </div>
    </div>
  );
}
