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
        [exerciseForm]: [],
      };
    });
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
