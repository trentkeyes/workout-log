export default function AddSet({ handleChange, vals, addSet }) {
  return (
    <div className="addSet__form">
      <div className="addSet__reps">
        <input
          type="tel"
          className="set-input text-center bg-neutral-700"
          name="reps"
          placeholder="Reps"
          value={vals.reps}
          onChange={handleChange}
        />
      </div>
      <div className="addSet__weight">
        <input
          type="tel"
          className="set-input text-center bg-neutral-700"
          name="weight"
          placeholder="Weight"
          value={vals.weight}
          onChange={handleChange}
        />
      </div>
      <button className="addSet__btn" onClick={addSet}>
        Add Set
      </button>
    </div>
  );
}
