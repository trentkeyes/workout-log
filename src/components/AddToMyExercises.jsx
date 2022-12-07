import { useState } from 'react';

export default function AddToMyExercises({ addMyExercise }) {
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="addMyExercise__div flex m-1 gap-1">
      <input
        type="text"
        name="newExercise"
        value={input}
        onChange={handleChange}
        placeholder="New exercise"
        className="indent-1"
      />
      <button onClick={() => addMyExercise(input)}>Add to My Exercises</button>
    </div>
  );
}
