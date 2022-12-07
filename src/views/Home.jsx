import { useState } from 'react';

import AddToMyExercises from '../components/AddToMyExercises';
import Workouts from './Workouts';
import Cal from '../components/Cal';

export default function Home() {
  const [myExercises, setMyExercises] = useState([
    'squats',
    'bench press',
    'lat pulldowns',
    'bicep curls',
    'deadlift',
  ]);

  const addMyExercise = (exercise) => {
    if (myExercises.some((element) => element === exercise) || !exercise) {
      return;
    }
    setMyExercises((prevMyExercises) => [...prevMyExercises, exercise]);
  };

  const exerciseOptions = myExercises.map((exercise) => (
    <option key={exercise} value={exercise}>
      {exercise}
    </option>
  ));

  return (
    <div className="flex flex-col justify-start items-center">
      <AddToMyExercises addMyExercise={addMyExercise} />
      <Workouts exerciseOptions={exerciseOptions} />
      <Cal />
    </div>
  );
}
