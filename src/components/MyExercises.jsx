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
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          name="newExercise"
          value={input}
          onChange={handleChange}
          placeholder="New exercise"
          className="indent-1 bg-neutral-700 p-2 w-36"
        />
        <div className=''>
             <button onClick={() => addMyExercise(input)} className="w-36 p-2 mr-2">
          Add Exercise
        </button>
        <button
          onClick={() =>
            showEditMyEx ? setShowEditMyEx(false) : setShowEditMyEx(true)
          }
          className="w-36 p-2"
        >
          Edit Exercises
        </button>
        </div>
     
      </div>
      {showEditMyEx && <EditMyExercises myExercises={myExercises} />}
    </div>
  );
}
