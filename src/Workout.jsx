import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';

export default function Workout(props) {
  const { exerciseOptions, setWorkouts, workoutID, date, time } = props;

  const [exercises, setExercises] = useState({});
  const [notes, setNotes] = useState('Pumped up!');

  const saveWorkout = () => {
    setWorkouts((prevWorkouts) => {
      return {
        ...prevWorkouts,
        [workoutID]: {
          exercises: exercises,
          notes: notes,
          date: date,
          time: time,
        },
      };
    });
  };

  const addExercise = () => {};

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

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="workout__container">
      <div className="workout__header">
        <h2 className="workout__date">{date}</h2>
        <h2 className="">{time}</h2>
      </div>
      <div className="exercises__container">{exerciseElements}</div>
      <textarea
        className="workout__notes"
        value={notes}
        onChange={handleNotesChange}
        rows="3"
      />
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
