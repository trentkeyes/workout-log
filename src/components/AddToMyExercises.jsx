import { useState } from 'react';

export default function AddToMyExercises({ addMyExercise }) {
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form className="addMyExercise__form">
      <input
        type="text"
        name="newExercise"
        value={input}
        onChange={handleChange}
        placeholder="New exercise"
      />
      <button onClick={() => addMyExercise(input)}>Add to My Exercises</button>
    </form>
  );
}
