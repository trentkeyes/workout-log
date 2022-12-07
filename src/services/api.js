import { collection, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const addWorkout = async () => {
  try {
    await addDoc(collection(db, 'workouts'), {
      notes: '',
      exercises: {},
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      created: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};

export { addWorkout };
