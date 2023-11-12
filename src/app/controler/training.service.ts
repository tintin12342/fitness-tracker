import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../model/exercise.model';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private avaliableExercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();
  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise = {} as Exercise;
  private exercises: Exercise[] = [];

  constructor(private firestore: Firestore) {}

  fetchAvaliableExercises() {
    onSnapshot(
      collection(this.firestore, 'avaliableExercises'),
      (querySnapshot) => {
        this.avaliableExercises = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Exercise;
        });
        this.exercisesChanged.next([...this.avaliableExercises]);
      }
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise =
      this.avaliableExercises.find((exercise) => exercise.id === selectedId) ??
      ({} as Exercise);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = {} as Exercise;
    this.exerciseChanged.next({} as Exercise);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = {} as Exercise;
    this.exerciseChanged.next({} as Exercise);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

  private async addDataToDatabase(exercise: Exercise) {
    await addDoc(collection(this.firestore, 'finishedExercises'), exercise);
  }
}
