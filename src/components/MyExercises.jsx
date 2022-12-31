import { useState } from 'react';
import { EditMyExercises } from './EditMyExercises';

export default function MyExercises({ addMyExercise, myExercises }) {
  const [input, setInput] = useState('');
  const [showEditMyEx, setShowEditMyEx] = useState(false);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2 items-center mt-2">
      <div className="addMyExercise__div flex gap-2 ">
        <input
          type="text"
          name="newExercise"
          value={input}
          onChange={handleChange}
          placeholder="New exercise"
          className="indent-1"
        />
        <button onClick={() => addMyExercise(input)}>
          Add to My Exercises
        </button>
        <button
          onClick={() =>
            showEditMyEx ? setShowEditMyEx(false) : setShowEditMyEx(true)
          }
        >
          Edit My Exercises
        </button>
      </div>
      {showEditMyEx && <EditMyExercises myExercises={myExercises} />}
    </div>
  );
}
