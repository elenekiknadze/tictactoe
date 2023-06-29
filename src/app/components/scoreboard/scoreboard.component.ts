import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScoreEntry } from 'src/app/interfaces/scoreboard.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ScoreboardService } from 'src/app/services/scoreboard.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  scoreBoard = this.scoreService.scores;
  constructor(
    private readonly scoreService: ScoreboardService,
    private readonly authService: AuthService
  ) {}

  isCurrentUser(scoreEntry: ScoreEntry) {
    return scoreEntry.name === this.authService.name;
  }
}
