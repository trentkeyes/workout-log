export default function AddToMyExercises(props) {
  const { addMyExercise, handleChange, exercise } = props;
  return (
    <div>
      <form onSubmit={addMyExercise}>
        <input
          type="text"
          name="exercise"
          value={exercise}
          onChange={handleChange}
          placeholder="Exercise (e.g. Squats)"
        />
        <button type="submit">Save to My Exercises</button>
      </form>
    </div>
  );
}
