import { useState } from 'react';

export default function ExerciseSelector({
  exerciseOptions,
  setExercises,
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
  };
  return (
    <div className="flex gap-1">
      <select
        className="text-center bg-neutral-700 text-base"
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
