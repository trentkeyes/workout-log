import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  addCopiedWorkout,
  updateWorkout,
  deleteWorkout,
} from '../services/api';

export default function Workout({
  exerciseOptions,
  savedExercises,
  date,
  time,
  savedNotes,
  id,
}) {
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
    <div className="workout__container">
      <div className="workout__header">
        <h2 className="workout__date">{date}</h2>
        <h2 className="">{time}</h2>
      </div>
      <div className="exercises__container">{exerciseElements}</div>
      <textarea
        className="workout__notes indent-1"
        name="notes"
        value={notes}
        onChange={handleNotesChange}
        rows="3"
        placeholder="Notes"
      />
      <div className="workout__addExercise-save">
        <ExerciseSelector
          exerciseOptions={exerciseOptions}
          setExercises={setExercises}
        />
        <button onClick={() => updateWorkout({ id, exercises, notes })}>
          Save Workout
        </button>
        <button onClick={() => deleteWorkout(id)}>Delete Workout</button>
        <button onClick={() => addCopiedWorkout({ exercises, notes })}>
          Copy to New Workout
        </button>
      </div>
    </div>
  );
}
