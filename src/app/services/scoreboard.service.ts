import { Inject, Injectable } from '@angular/core';
import { ScoreEntry } from '../interfaces/scoreboard.interface';
import { NUMBER_OF_SCORES } from '../tokens/number-of-scores.token';
import { ScoreboardBaseService } from './scoreboard.abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService extends ScoreboardBaseService {
  calculateScore(duration: number, moves: number): number {
    return Math.floor(100 / (moves + duration * 0.8));
  }
}
