import { Injectable } from '@angular/core';
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
  private runningExercise: Exercise = {} as Exercise;

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.avaliableExercises.find(
      (exercise) => exercise.id === selectedId
    );
  }
}
