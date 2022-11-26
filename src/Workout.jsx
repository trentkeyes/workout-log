import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';

export default function Workout(props) {
  const {
    exerciseOptions,
    savedExercises,
    setWorkouts,
    workoutID,
    date,
    time,
    deleteWorkout,
    handleNotesInput,
    addCopiedWorkout,
  } = props;

  const [exercises, setExercises] = useState(savedExercises);
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
        saveWorkout={saveWorkout}
      />
    );
  });

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    saveWorkout();
  };

  return (
    <div className="workout__container">
      <div className="workout__header">
        <h2 className="workout__date">{date.toLocaleDateString()}</h2>
        <h2 className="">{time}</h2>
      </div>
      <div className="exercises__container">{exerciseElements}</div>
      <textarea
        className="workout__notes"
        name="notes"
        value={notes}
        onChange={handleNotesChange}
        rows="3"
      />
      <div className="workout__addExercise-save">
        <ExerciseSelector
          exerciseOptions={exerciseOptions}
          setExercises={setExercises}
          saveWorkout={saveWorkout}
        />
        <button onClick={saveWorkout}>Save Workout</button>
        <button onClick={() => deleteWorkout(workoutID)}>Delete Workout</button>
        <button onClick={() => addCopiedWorkout(workoutID)}>Copy to New Workout</button>
      </div>
    </div>
  );
}
