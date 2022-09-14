import { useState } from 'react';

export default function AddSet({ handleChange, vals, addSet }) {
  console.log(vals);
  return (
    <div>
      <div>
        <label htmlFor="set-reps">Reps</label>
        <input
          type="tel"
          className="set-input"
          name="reps"
          value={vals.reps}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="set-weight">Weight</label>
        <input
          type="tel"
          className="set-input"
          name="weight"
          value={vals.weight}
          onChange={handleChange}
        />
      </div>

      <button onClick={addSet}>Add Set</button>
    </div>
  );
}
