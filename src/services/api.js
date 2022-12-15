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

export const getWorkouts = (userId, setWorkouts) => {
  const q = query(
    collection(db, 'users', userId, 'workouts'),
    orderBy('created', 'desc')
  );
  onSnapshot(q, (querySnapshot) => {
    setWorkouts(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  });
};

const addWorkout = async (userId) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workouts');
    await addDoc(workoutsRef, {
      notes: '',
      exercises: '',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      created: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};

const addCopiedWorkout = async ({ userId, exercises, notes }) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workouts');
    await addDoc(workoutsRef, {
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

const updateWorkout = async ({ userId, id, exercises, notes }) => {
  console.log('update workout');
  const workoutRef = doc(db, 'users', userId, 'workouts', id);
  try {
    await updateDoc(workoutRef, {
      notes: notes,
      exercises: exercises,
      modified: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};

const deleteWorkout = async ({ userId, id }) => {
  const workoutRef = doc(db, 'users', userId, 'workouts', id);
  try {
    await deleteDoc(workoutRef);
  } catch (err) {
    alert(err);
  }
};

const saveMyExercise = async ({ userId, exercise }) => {
  const myExRef = collection(db, 'users', userId, 'myExercises');
  try {
    await addDoc(myExRef, {
      name: exercise,
    });
  } catch (err) {
    alert(err);
  }
};

const getMyExercises = ({ userId, setMyExercises }) => {
  const q = query(
    collection(db, 'users', userId, 'myExercises'),
    orderBy('name')
  );
  onSnapshot(q, (querySnapshot) => {
    setMyExercises(
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
