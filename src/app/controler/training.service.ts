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

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avaliableExercises.find(
      (exercise) => exercise.id === selectedId
    ) ?? { id: 'null', name: 'null', duration: 0, calories: 0 };
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
