export default function AddToMyExercises(props) {
  const { addMyExercise, handleChange, exercise } = props;
  return (
    <form onSubmit={addMyExercise} className="addMyExercise--form">
      <input
        type="text"
        name="exercise"
        value={exercise}
        onChange={handleChange}
        placeholder="Exercise (e.g. Squats)"
      />
      <button type="submit">Save to My Exercises</button>
    </form>
  );
}
