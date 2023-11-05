import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from 'src/app/controler/training.service';
import { Exercise } from 'src/app/model/exercise.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns: String[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }
}
