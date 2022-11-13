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
      incrementWorkoutID();
    } else {
      if (prevWorkoutInput) {
        setWorkouts((prevWorkouts) => {
          return {
            ...prevWorkouts,
            [workoutID]: {
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              notes: '',
              exercises: workouts[prevWorkoutInput].exercises,
            },
          };
        });
        incrementWorkoutID();
      }
    }
  };

  const deleteWorkout = (id) => {
    setWorkouts((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
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

  const workoutOptions = Object.entries(workouts).map(([id, workout]) => {
    return (
      <option key={workout.time} value={id}>
        {workout.date} {workout.time}
      </option>
    );
  });

  console.log(workouts);

  const handleExerciseInput = (id) => {
    return (e) => {
      setWorkouts((prevWorkouts) => {
        prevWorkouts.id = e.target.value;
        console.log('prev workouts, update the value?', prevWorkouts);
        return {
          ...prevWorkouts,
        };
      });
    };
  };

  const handleNotesInput = (id) => {
    return (e) => {
      setWorkouts((prevWorkouts) => {
        prevWorkouts[id].notes = e.target.value;
        console.log('prev workouts, update the value', prevWorkouts);
        return {
          ...prevWorkouts,
        };
      });
    };
  };

  const workoutElements = Object.entries(workouts).map(([key, value]) => {
    console.log(workouts);
    return (
      <Workout
        key={key}
        date={value.date}
        time={value.time}
        savedExercises={value.exercises}
        notes={value.notes}
        exerciseOptions={exerciseOptions}
        setWorkouts={setWorkouts}
        workoutID={key}
        deleteWorkout={deleteWorkout}
        handleNotesInput={handleNotesInput}
      />
    );
  });

  const displayedWorkouts = {};

  const handlePrevWorkoutInput = (e) => {
    setPrevWorkoutInput(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        {workoutElements}
        <select
          className="exerciseSelector__selector"
          onChange={handlePrevWorkoutInput}
          value={prevWorkoutInput}
        >
          <option value={''}>Previous Workouts</option>
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
    </div>
  );
}

export default App;
