import { useState } from 'react';
import AddSet from './AddSet';

export default function Exercise(props) {
  const { name, sets, setExercises } = props;
  const [newSetFormData, setNewSetFormData] = useState({});

  const addSet = () => {
    setExercises((prev) => {
      return {
        ...prev,
        [name]: [...prev[name], newSetFormData],
      };
    });
  };
  const handleChange = (e) => {
    setNewSetFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log('handling change', newSetFormData);
  };

  const setsElements = sets.map((set) => {
    return (
      <p>
        {set.reps} @ {set.weight}
      </p>
    );
  });
  return (
    <div className="workout__exercise">
      <h4>{name}</h4>
      {setsElements}
      <AddSet
        handleChange={handleChange}
        addSet={addSet}
        vals={newSetFormData}
      />
    </div>
  );
}
