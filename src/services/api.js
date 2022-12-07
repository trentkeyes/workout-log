import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
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

const addCopiedWorkout = async ({ exercises, notes }) => {
  console.log('adding copy');
  try {
    await addDoc(collection(db, 'workouts'), {
      notes: notes,
      exercises: exercises,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      created: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};

const updateWorkout = async ({ id, exercises, notes }) => {
  const workoutDocRef = doc(db, 'workouts', id);
  try {
    await updateDoc(workoutDocRef, {
      notes: notes,
      exercises: exercises,
      modified: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};

const deleteWorkout = async (id) => {
  const workoutDocRef = doc(db, 'workouts', id);
  try {
    await deleteDoc(workoutDocRef);
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

export {
  addWorkout,
  addCopiedWorkout,
  updateWorkout,
  deleteWorkout,
  saveMyExercise,
  getMyExercises,
};
