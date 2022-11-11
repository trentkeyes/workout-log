import { useState } from 'react';
import AddExercise from './AddExercise';
import ExerciseSelector from './ExerciseSelector';
import AddToMyExercises from './AddToMyExercises';
import Workout from './Workout';

function App() {
  const [formData, setFormData] = useState({ exercise: '' });
  const [myExercises, setMyExercises] = useState([
    'squats',
    'bench press',
    'lat pulldowns',
    'bicep curls',
    'deadlift',
  ]);
  const [exerciseLog, setExerciseLog] = useState([]);
  const [workouts, setWorkouts] = useState({});
  const [workoutID, setWorkoutID] = useState(0);
  const [prevWorkoutInput, setPrevWorkoutInput] = useState('');

  const handleMyExerciseChange = (e) => {
    setFormData({ exercise: e.target.value });
  };

  const addWorkout = (newWorkout) => {
    if (newWorkout) {
      setWorkouts((prevWorkouts) => {
        return {
          ...prevWorkouts,
          [workoutID]: {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            notes: '',
            exercises: {},
          },
        };
      });
    } else {
      const [date, hour, ampm] = prevWorkoutInput.split(' ');
      const time = hour + ' ' + ampm;
      console.log(date, time);
      const matchArr = Object.values(workouts).filter((val) => {
        return val.date == date && val.time == time;
      });
      const match = matchArr[0];
      setWorkouts((prevWorkouts) => {
        return {
          ...prevWorkouts,
          [workoutID]: {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            notes: '',
            exercises: match.exercises,
          },
        };
      });
    }
    incrementWorkoutID();
  };

  const incrementWorkoutID = () => {
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

  const exerciseOptions = myExercises.map((exercise) => (
    <option key={exercise} value={exercise}>
      {exercise}
    </option>
  ));

  const workoutOptions = Object.values(workouts).map((val) => {
    return (
      <option key={val.time}>
        {val.date} {val.time}
      </option>
    );
  });

  console.log(workouts);

  const workoutElements = Object.entries(workouts).map(([key, value]) => {
    return (
      <Workout
        key={key}
        date={value.date}
        time={value.time}
        exercises={value.exercises}
        notes={value.notes}
        exerciseOptions={exerciseOptions}
        setWorkouts={setWorkouts}
        workoutID={key}
      />
    );
  });

  const exerciseSelector = (
    <ExerciseSelector exerciseOptions={exerciseOptions} />
  );

  const addExercise = (e) => {
    e.preventDefault();
  };

  const displayedWorkouts = {};

  const handlePrevWorkoutInput = (e) => {
    setPrevWorkoutInput(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        {workoutElements}
        {/* <Workout
          exerciseOptions={exerciseOptions}
          setWorkouts={setWorkouts}
          workoutID={workoutID}
        /> */}
        <select
          className="exerciseSelector__selector"
          name="selectExercise"
          id="selectExercise"
          onChange={handlePrevWorkoutInput}
          value={prevWorkoutInput}
        >
          <option disabled>Previous Workouts</option>
          {workoutOptions}
        </select>
        <button onClick={() => addWorkout(false)}>
          Copy a previous workout
        </button>
        <button onClick={() => addWorkout(true)}>Add Workout</button>
        <AddToMyExercises
          handleChange={handleMyExerciseChange}
          addMyExercise={addMyExercise}
          exercise={formData.exercise}
        />
      </div>
      {/* <AddExercise
      logExercise={setExerciseLog}
      selector={<ExerciseSelector exerciseOptions={exerciseOptions} />}
    /> */}
    </div>
  );
}

export default App;
