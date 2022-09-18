import { useState } from 'react';
import AddExercise from './AddExercise';
import ExerciseSelector from './ExerciseSelector';
import AddToMyExercises from './AddToMyExercises';
import Workout from './Workout';

function App() {
  const [formData, setFormData] = useState({ exercise: '' });
  const [myExercises, setMyExercises] = useState(['squats', 'bench press']);
  const [exerciseLog, setExerciseLog] = useState([]);
  const [workouts, setWorkouts] = useState({});
  const [workoutID, setWorkoutID] = useState(0);

  const handleChange = (e) => {
    setFormData({ exercise: e.target.value });
  };

  const addWorkout = () => {
    setWorkouts((prevWorkouts) => {
      return {
        ...prevWorkouts,
        [workoutID]: [],
      };
    });
    setWorkoutID((prevWorkoutID) => prevWorkoutID + 1);
  };

  const addMyExercise = (e) => {
    e.preventDefault();
    const exercise = formData.exercise;
    if (myExercises.some((element) => element === exercise) || !exercise) {
      return;
    }
    setMyExercises((prevMyExercises) => [...prevMyExercises, exercise]);
  };

  const workoutEntries = Object.entries(workouts);

  const workoutElements = workoutEntries.map(([key, value]) => {
    return (
      <Workout
        key={key}
        date={value.date}
        exercises={value.exercises}
        notes={value.notes}
      />
    );
  });

  const exerciseOptions = myExercises.map((exercise) => (
    <option key={exercise} value={exercise}>
      {exercise}
    </option>
  ));

  const exerciseSelector = (
    <ExerciseSelector exerciseOptions={exerciseOptions} />
  );

  const addExercise = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="container">
        <Workout exerciseOptions={exerciseOptions} setWorkouts={setWorkouts} />
      </div>
      <AddToMyExercises
        handleChange={handleChange}
        addMyExercise={addMyExercise}
        exercise={formData.exercise}
      />

      {/* <AddExercise
        logExercise={setExerciseLog}
        selector={<ExerciseSelector exerciseOptions={exerciseOptions} />}
      /> */}
    </div>
  );
}

export default App;
