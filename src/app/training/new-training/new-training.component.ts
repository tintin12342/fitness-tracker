import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingService } from 'src/app/controler/training.service';
import { Exercise } from 'src/app/model/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvaliableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
