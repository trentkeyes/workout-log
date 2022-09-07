import { useState } from 'react';

export default function ExerciseSelector({ exerciseOptions, setExercises }) {
  const [exerciseForm, setExerciseForm] = useState('My exercises');
  const handleChange = (e) => {
    setExerciseForm(e.target.value);
  };
  const addExercise = () => {
    setExercises((prevExercises) => {
      return {
        ...prevExercises,
        [exerciseForm]: [
          { reps: 8, weight: 135 },
          { reps: 6, weight: 140 },
        ],
      };
    });
  };

  return (
    <div>
      <select
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
