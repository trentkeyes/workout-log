import { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';
import Exercise from './Exercise';
import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';

export default function Workout(props) {
  const {
    exerciseOptions,
    savedExercises,
    setWorkouts,
    workoutID,
    date,
    time,
    handleNotesInput,
    addCopiedWorkout,
    id,
  } = props;

  const [exercises, setExercises] = useState(savedExercises);
  const [notes, setNotes] = useState('Pumped up!');
  const [workout, setWorkout] = useState({});

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

  const deleteWorkout = async () => {
    const workoutDocRef = doc(db, 'workouts', id);
    try {
      console.log('deleting..');
      console.log(workoutDocRef);
      await deleteDoc(workoutDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const saveSubmitWorkout = () => {
    saveWorkout();
    handleSubmit();
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
        <h2 className="workout__date">{date}</h2>
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
        <button onClick={deleteWorkout}>Delete Workout</button>
        <button onClick={() => addCopiedWorkout(workoutID)}>
          Copy to New Workout
        </button>
      </div>
    </div>
  );
}
