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

  const saveWorkout = async () => {
    const workoutDocRef = doc(db, 'workouts', id);
    try {
      await updateDoc(workoutDocRef, {
        notes: notes,
        exercises: exercises,
        modified: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  };

  const addCopiedWorkout = async () => {
    console.log('adding copy');
    try {
      await addDoc(collection(db, 'workouts'), {
        notes: notes,
        exercises: exercises,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  };

  const deleteWorkout = async () => {
    const workoutDocRef = doc(db, 'workouts', id);
    try {
      await deleteDoc(workoutDocRef);
    } catch (err) {
      alert(err);
    }
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
          saveWorkout={saveWorkout}
        />
        <button onClick={saveWorkout}>Save Workout</button>
        <button onClick={deleteWorkout}>Delete Workout</button>
        <button onClick={() => addCopiedWorkout()}>Copy to New Workout</button>
      </div>
    </div>
  );
}
