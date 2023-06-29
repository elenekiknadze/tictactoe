import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  standalone: true,
  imports: [MatDialogModule, ScoreboardComponent],
  selector: 'app-score-icon',
  templateUrl: './score-icon.component.html',
  styleUrls: ['./score-icon.component.scss'],
})
export class ScoreIconComponent {
  constructor(private readonly matDialog: MatDialog) {}

  openScoreBoard() {
    this.matDialog.open(ScoreboardComponent);
  }
}
