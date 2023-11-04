import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from '../controler/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  exerciseSubscription: Subscription = {} as Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) this.ongoingTraining = true;
        else this.ongoingTraining = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
