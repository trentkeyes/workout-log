import { deleteMyExercise } from '../services/api';
import { UserAuth } from '../context/UserContext';

export const EditMyExercises = ({ myExercises }) => {
  const { user } = UserAuth();
  const userId = user.uid;

  const myExerciseElements = myExercises.map((exercise) => {
    return (
      <div key={exercise.name} className="flex items-center gap-2 p-1">
        <h3>{exercise.name}</h3>
        <button
          onClick={() => deleteMyExercise({ userId: userId, id: exercise.id })}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div>
      <h2 className="text-center">My Exercises</h2>
      {myExerciseElements}
    </div>
  );
};
