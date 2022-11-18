import { useState } from 'react';

export default function ExerciseSelector({
  exerciseOptions,
  setExercises,
  saveWorkout,
}) {
  const [exerciseForm, setExerciseForm] = useState('My exercises');
  const handleChange = (e) => {
    setExerciseForm(e.target.value);
  };
  const addExercise = () => {
    setExercises((prevExercises) => {
      if (prevExercises[exerciseForm]) {
        return { ...prevExercises };
      } else {
        return {
          ...prevExercises,
          [exerciseForm]: [],
        };
      }
    });
    saveWorkout();
  };

  return (
    <div className="exerciseSelector__container">
      <select
        className="exerciseSelector__selector"
        name="selectExercise"
        id="selectExercise"
        onChange={handleChange}
        value={exerciseForm}
      >
        <option disabled>My exercises</option>
        {exerciseOptions}
      </select>
      <button onClick={addExercise}>Add Exercise</button>
    </div>
  );
}
