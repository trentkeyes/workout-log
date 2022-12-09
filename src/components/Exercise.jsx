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
      <div key={index}>
        <p>
          {index + 1}: {set.reps} @ {set.weight}
          <button onClick={() => removeSet(set.id)}>Delete</button>
        </p>
      </div>
    );
  });
  return (
    <div className="workout__exercise">
      <h4 className="exercise__title">
        {name} <button onClick={() => removeExercise(name)}>Delete</button>
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