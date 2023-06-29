import { Inject, Injectable } from '@angular/core';
import { ScoreEntry } from '../interfaces/scoreboard.interface';
import { NUMBER_OF_SCORES } from '../tokens/number-of-scores.token';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  private scores_: ScoreEntry[] = [];
  private readonly identifier = 'ticTacToeScores';
  constructor(@Inject(NUMBER_OF_SCORES) private readonly numberOfScores: number) {
    const restore = this.getItemsFromStorage(this.identifier);
    if(restore){
      this.scores_ = restore;
    }
    
  }
  /** to prevent users from directly manipulating the array */
  public get scores(){
    return [...this.scores_];
  }

  /** Nice to have: separate generic service that deals with session stuff */
  private getItemsFromStorage(identifier: string){
    const restoredScores = sessionStorage.getItem(identifier)
    try{
      return restoredScores && JSON.parse(restoredScores);
    }
    catch{
      return null;
    }
  }

  private setItemsToStorage(identifier: string, items: ScoreEntry[]){
    sessionStorage.setItem(identifier, JSON.stringify(items));
  }

  /** This way, the scores will always be sorted max to min */
  addScore(scoreEntry: ScoreEntry){
    if(!this.scores_.length || scoreEntry.score <= this.scores_[this.scores_.length-1].score){
      this.scores_.push(scoreEntry);
    }else{
      for(let i=0; i<this.scores_.length; i++){
        if(this.scores_[i].score < scoreEntry.score){
          this.scores_.splice(i, 0, scoreEntry);
          break;
        }
      }
    }
    if(this.scores_.length > this.numberOfScores){
      this.scores_ = this.scores_.slice(0, this.numberOfScores);
    }
    this.setItemsToStorage(this.identifier, this.scores_);
  }
}
