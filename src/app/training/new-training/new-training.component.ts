import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from 'src/app/controler/training.service';
import { Exercise } from 'src/app/model/exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercisesSubscription: Subscription = {} as Subscription;
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.fetchAvaliableExercises();
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe(
        (exercises: Exercise[]) => (this.exercises = exercises)
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
  }
}
