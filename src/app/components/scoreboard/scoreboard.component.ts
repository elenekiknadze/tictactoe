import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ScoreboardBaseService,
  SCOREBOARD_SERVICE_TOKEN,
} from '../../services/scoreboard.abstract.service';
import { ScoreEntry } from '../../interfaces/scoreboard.interface';
import { AuthService } from '../../services/auth.service';
import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [
    {
      provide: SCOREBOARD_SERVICE_TOKEN,
      useExisting: ScoreboardService,
    },
  ],
})
export class ScoreboardComponent {
  scoreBoard = this.scoreService.scores;
  constructor(
    @Inject(SCOREBOARD_SERVICE_TOKEN)
    public readonly scoreService: ScoreboardBaseService,
    private readonly authService: AuthService
  ) {}

  isCurrentUser(scoreEntry: ScoreEntry) {
    return scoreEntry.name === this.authService.name;
  }
}
