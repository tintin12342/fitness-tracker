import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from 'src/app/controler/training.service';
import { Exercise } from 'src/app/model/exercise.model';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<any> = {} as Observable<any[]>;
  exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    onSnapshot(
      collection(this.firestore, 'avaliableExercises'),
      (querySnapshot) => {
        this.exercises = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Exercise;
        });
      }
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
