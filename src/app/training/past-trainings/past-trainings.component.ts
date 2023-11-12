import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/controler/training.service';
import { Exercise } from 'src/app/model/exercise.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatSort, { static: false }) sort?: MatSort = {} as MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    {} as MatPaginator;
  displayedColumns: String[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();

  finishedExercisesSubscription: Subscription = {} as Subscription;

  filterValue: string = '';

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.finishedExercisesSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
      );
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    if (this.sort) this.dataSource.sort = this.sort;
  }

  doFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.finishedExercisesSubscription.unsubscribe();
  }
}
