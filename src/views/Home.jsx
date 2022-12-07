import { useState, useEffect } from 'react';
import { getMyExercises, saveMyExercise } from '../services/api';
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

  useEffect(() => {
    getMyExercises(setMyExercises);
  }, []);

  const addMyExercise = (exercise) => {
    if (myExercises.some((element) => element === exercise) || !exercise) {
      return;
    }
    saveMyExercise(exercise);
  };
  const exerciseOptions = myExercises.map(({ id, name }) => (
    <option key={id} value={name}>
      {name}
    </option>
  ));

  return (
    <div className="flex flex-col justify-start items-center">
      <AddToMyExercises addMyExercise={addMyExercise} />
      <Workouts exerciseOptions={exerciseOptions} />
      {/* <Cal /> */}
    </div>
  );
}
