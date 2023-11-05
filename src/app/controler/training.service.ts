import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../model/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private avaliableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise = {} as Exercise;
  private exercises: Exercise[] = [];

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
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
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = {} as Exercise;
    this.exerciseChanged.next({} as Exercise);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = {} as Exercise;
    this.exerciseChanged.next({} as Exercise);
  }
}
