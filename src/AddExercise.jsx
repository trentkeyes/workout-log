import { useState } from 'react';

export default function AddExercise(props) {
  const [exercise, setExercise] = useState({
    exercise: '',
    sets: [
      {
        reps: 5,
        weight: 135,
      },
    ],
  });

  const handleChange = (e) => {
    // setExercise((prevExercise) => {
    //   const sets = prevExercise.sets
    //   return {
    //     [...sets, [e.target.value]]
    //   }
    // });
  };

  const addExercise = (e) => {
    e.preventDefault();
    console.log(props.selector);
  };
  console.log(exercise);
  // reps / duration
  const reps = exercise.sets[exercise.sets.length - 1];
  return (
    <div>
      <form onSubmit={addExercise}>
        {props.selector}
        {/* <label htmlFor="sets">Sets</label>
        <input type="number" name="sets" />
        <label htmlFor="reps">Reps</label>
        <input type="number" name="reps" onChange={handleChange} value={reps} />
        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" /> */}
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
}
