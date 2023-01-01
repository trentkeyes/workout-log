import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';
import {
  addCopiedWorkout,
  updateWorkout,
  deleteWorkout,
} from '../services/api';
import { UserAuth } from '../context/UserContext';
import { WorkoutDateTime } from './WorkoutDateTime';

export default function Workout({
  exerciseOptions,
  savedExercises,
  date,
  time,
  savedNotes,
  id,
}) {
  const { user } = UserAuth();
  const userId = user.uid;

  const [exercises, setExercises] = useState(savedExercises);
  const [notes, setNotes] = useState(savedNotes);

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
    <div className="workout__container my-2 p-4 border-2 border-solid border-blue-600">
      <WorkoutDateTime date={date} time={time} />
      <ExerciseSelector
        exerciseOptions={exerciseOptions}
        setExercises={setExercises}
      />
      <div className="exercises__container">{exerciseElements}</div>
      <textarea
        className="workout__notes indent-1 bg-neutral-700"
        name="notes"
        value={notes}
        onChange={handleNotesChange}
        rows="3"
        placeholder="Notes"
      />
      <div className="workout__addExercise-save">
        <button
          onClick={() => deleteWorkout({ userId, id })}
          className="hover:border-red-800"
        >
          Delete Workout
        </button>
        <button onClick={() => addCopiedWorkout({ userId, exercises, notes })}>
          Copy to New Workout
        </button>
        <button onClick={() => updateWorkout({ userId, id, exercises, notes })}>
          Save Workout
        </button>
      </div>
    </div>
  );
}
