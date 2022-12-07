import {
  collection,
  Timestamp,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
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

const saveMyExercise = async (exercise) => {
  try {
    await addDoc(collection(db, 'myExercises'), {
      name: exercise,
    });
  } catch (err) {
    alert(err);
  }
};

const getMyExercises = (setFunction) => {
  const q = query(collection(db, 'myExercises'), orderBy('name'));
  onSnapshot(q, (querySnapshot) => {
    setFunction(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))
    );
  });
};

export { addWorkout, saveMyExercise, getMyExercises };
