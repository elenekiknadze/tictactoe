import { Component } from '@angular/core';
import { SCOREBOARD_SERVICE_TOKEN } from './services/scoreboard.abstract.service';
import { ScoreboardService } from './services/scoreboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tictactoe';
}
