export default function AddToMyExercises(props) {
  const { addMyExercise, handleChange, exercise } = props;
  return (
    <form onSubmit={addMyExercise} className="addMyExercise__form">
        <input
          type="text"
          name="newExercise"
          value={exercise}
          onChange={handleChange}
          placeholder="New exercise"
        />
      <button type="submit">Add to My Exercises</button>
    </form>
  );
}
