import { useState } from 'react';
import AddSet from './AddSet';

export default function Exercise({ name, sets, setExercises, removeExercise }) {
  const [newSetFormData, setNewSetFormData] = useState({
    weight: '',
    reps: '',
  });
  const [setID, setSetID] = useState(0);
  const addSet = () => {
    const newSet = {
      ...newSetFormData,
      id: setID,
    };
    setExercises((prev) => {
      return {
        ...prev,
        [name]: [...prev[name], newSet],
      };
    });
    setSetID((prev) => prev + 1);
  };
  const handleChange = (e) => {
    setNewSetFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const removeSet = (id) => {
    setExercises((prev) => {
      return {
        ...prev,
        [name]: prev[name].filter((set) => set.id !== id),
      };
    });
  };
  const setsElements = sets.map((set, index) => {
    return (
      <div key={index} className="bg-neutral-700 py-0.5 px-1 rounded">
        <p>
          <span className="">{index + 1})</span>{' '}
          <span className="font-bold">
            {set.reps} X {set.weight}
          </span>
          <button
            onClick={() => removeSet(set.id)}
            className="ml-2 hover:border-red-800"
          >
            X
          </button>
        </p>
      </div>
    );
  });
  return (
    <div className="workout__exercise">
      <h4 className="exercise__title">
        {name}{' '}
        <button
          className="hover:border-red-800"
          onClick={() => removeExercise(name)}
        >
          X
        </button>
      </h4>
      {setsElements}
      <AddSet
        handleChange={handleChange}
        addSet={addSet}
        vals={newSetFormData}
      />
    </div>
  );
}
