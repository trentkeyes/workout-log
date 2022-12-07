import { useState } from 'react';
import AddExercise from './AddExercise';
import ExerciseSelector from './ExerciseSelector';
import AddToMyExercises from './AddToMyExercises';
import Workout from './Workout';
import Workouts from './Workouts';
import Calendar from 'react-calendar';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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
  const [calValue, onChangeCal] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWorkout, setCurrentWorkout] = useState({});

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'workouts'), {
        currentWorkout,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleMyExerciseChange = (e) => {
    setFormData({ exercise: e.target.value });
  };

  const addWorkout = () => {
    setCurrentWorkout({
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      notes: '',
      exercises: {},
    });
  };

  const addCopiedWorkout = (id) => {
    setWorkouts((prevWorkouts) => {
      return {
        ...prevWorkouts,
        [workoutID]: {
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          notes: workouts[id].exercises,
          exercises: workouts[id].exercises,
        },
      };
    });
    incrementWorkoutID();
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
        {workout.date.toLocaleDateString()} {workout.time}
      </option>
    );
  });

  const selectedWorkouts = Object.entries(workouts).filter(
    ([key, value]) =>
      value.date.toLocaleDateString() == selectedDate.toLocaleDateString()
  );

  const selectedWorkoutElements = selectedWorkouts.map(([key, value]) => {
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
        handleSubmit={handleSubmit}
      />
    );
  });

  const onClickDay = (day) => {
    setSelectedDate(day);
  };

  const handlePrevWorkoutInput = (e) => {
    setPrevWorkoutInput(e.target.value);
  };

  const changeDay = (startDate, days) => {
    const newDay = new Date();
    newDay.setDate(startDate.getDate() + days);
    console.log('start', startDate, 'newDay', newDay);
    setSelectedDate(newDay);
  };

  return (
    <div className="App">
      <div className="flex flex-col justify-start items-center">
        {/* {workoutElements} */}
        <AddToMyExercises
          handleChange={handleMyExerciseChange}
          addMyExercise={addMyExercise}
          exercise={formData.exercise}
        />

        <select
          className="p-2"
          onChange={handlePrevWorkoutInput}
          value={prevWorkoutInput}
        >
          <option value={''}>Previous Workouts</option>
          {workoutOptions}
        </select>
        <button onClick={() => addWorkout(false)}>Copy Selected Workout</button>

        <Calendar
          onChange={onChangeCal}
          value={calValue}
          onClickDay={onClickDay}
          className="max-w-xs"
        />
        <div>
          <button onClick={() => changeDay(selectedDate, -1)}>
            Previous Day
          </button>
          <button onClick={() => changeDay(selectedDate, 1)}>Next Day</button>
        </div>
        <Workouts
          selectedWorkouts={selectedWorkoutElements}
          exerciseOptions={exerciseOptions}
        />
      </div>
    </div>
  );
}

export default App;
