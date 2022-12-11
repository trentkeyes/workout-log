import React from 'react';
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
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserAuth } from '../context/AuthContext';

// const userId = user.uid;

const addWorkout = async (userId) => {
  try {
    // const userRef = doc(db, 'users', userId);
    // await setDoc(
    //   doc(
    //     userRef,
    //     {
    //       workouts: {
    //         notes: '',
    //         exercises: '',
    //         date: new Date().toLocaleDateString(),
    //         time: new Date().toLocaleTimeString(),
    //         created: Timestamp.now(),
    //       },
    //     },
    //     { merge: true }
    //   )
    // );

    await addDoc(collection(db, 'users'), {
      [userId]: {
        workouts: {
          test: 'this is a workout?',
        },
        myExercises: {},
      },
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

const addUser = async ({ id, email }) => {
  try {
    await setDoc(doc(db, 'users', id), {
      email: email,
    });
  } catch (err) {
    alert(err);
  }
};

export {
  addWorkout,
  addCopiedWorkout,
  updateWorkout,
  deleteWorkout,
  saveMyExercise,
  getMyExercises,
  addUser,
};
