export default function AddExercise({ exerciseOptions }) {
  return (
    <select name="selectExercise" id="selectExercise" defaultValue={'DEFAULT'}>
      <option value="DEFAULT" disabled>
        My exercises
      </option>
      {exerciseOptions}
    </select>
  );
}
