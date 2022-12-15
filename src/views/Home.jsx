import { useState, useEffect } from 'react';
import { getMyExercises, saveMyExercise } from '../services/api';
import AddToMyExercises from '../components/AddToMyExercises';
import { Workouts } from './Workouts';
import Cal from '../components/Cal';
import { UserAuth } from '../context/AuthContext';

export default function Home() {
  const [myExercises, setMyExercises] = useState([
    'squats',
    'bench press',
    'lat pulldowns',
    'bicep curls',
    'deadlift',
  ]);

  console.log(myExercises);

  const { user } = UserAuth();
  const userId = user.uid;

  useEffect(() => {
    if (userId) {
      getMyExercises({ userId, setMyExercises });
    }
  }, []);

  const addMyExercise = (exercise) => {
    if (myExercises.some((element) => element === exercise) || !exercise) {
      return;
    }
    saveMyExercise({ userId, exercise });
  };
  const exerciseOptions = myExercises.map(({ id, name }) => (
    <option key={id} value={name}>
      {name}
    </option>
  ));

  return (
    <div className="flex flex-col justify-start items-center">
      {userId && <AddToMyExercises addMyExercise={addMyExercise} />}
      {userId && (
        <Workouts exerciseOptions={exerciseOptions} userId={user.uid} />
      )}
      {/* <Cal /> */}
    </div>
  );
}
