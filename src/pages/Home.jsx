import { useState, useEffect } from 'react';
import { getMyExercises, saveMyExercise } from '../services/api';
import MyExercises from '../components/MyExercises';
import { Workouts } from './Workouts';
import Cal from '../components/Cal';
import { UserAuth } from '../context/UserContext';

export default function Home() {
  const [myExercises, setMyExercises] = useState([]);
  const { user } = UserAuth();
  const userId = user.uid;

  useEffect(() => {
    if (userId) {
      getMyExercises({ userId, setMyExercises });
    }
  }, [userId]);

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
      {userId && (
        <MyExercises addMyExercise={addMyExercise} myExercises={myExercises} />
      )}
      {userId && <Workouts exerciseOptions={exerciseOptions} userId={userId} />}
      {/* <Cal /> */}
    </div>
  );
}
