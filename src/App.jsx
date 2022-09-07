import { useState } from 'react';
import './App.css';
import AddExercise from './AddExercise';
import ExerciseSelector from './ExerciseSelector';
import AddToMyExercises from './AddToMyExercises';

function App() {
  const [formData, setFormData] = useState({ exercise: '' });
  const [myExercises, setMyExercises] = useState([]);
  const [exerciseLog, setExerciseLog] = useState([]);

  const handleChange = (e) => {
    setFormData({ exercise: e.target.value });
  };

  const addMyExercise = (e) => {
    e.preventDefault();
    const exercise = formData.exercise;
    if (myExercises.some((element) => element === exercise)) {
      return;
    }
    setMyExercises((prevMyExercises) => [...prevMyExercises, exercise]);
  };

  const exerciseOptions = myExercises.map((exercise) => (
    <option key={exercise} value={exercise}>
      {exercise}
    </option>
  ));

  const addExercise = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <AddToMyExercises
        handleChange={handleChange}
        addMyExercise={addMyExercise}
        exercise={formData.exercise}
      />

      <AddExercise
        logExercise={setExerciseLog}
        selector={<ExerciseSelector exerciseOptions={exerciseOptions} />}
      />
    </div>
  );
}

export default App;
