import { TestBed } from '@angular/core/testing';
import { ScoreEntry } from '../interfaces/scoreboard.interface';
import { NUMBER_OF_SCORES } from '../tokens/number-of-scores.token';

import { ScoreboardService } from './scoreboard.service';

const SCORES_COUNT = 3;
describe('ScoreboardService', () => {
  let service: ScoreboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[{provide: NUMBER_OF_SCORES, useValue: SCORES_COUNT}]});
    service = TestBed.inject(ScoreboardService);
  });

  afterEach(()=>{
    sessionStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the initial score', () => {
    const scoreEntry: ScoreEntry = {name: "DisplayName", score: 10};
    service.addScore(scoreEntry);
    expect(service.scores).toEqual([scoreEntry]);
  });


  it('should add sort scores in order', () => {
    let arr = [];
    for(let i = 0; i< SCORES_COUNT; i++){
      const scoreEntry: ScoreEntry = {name: "DisplayName", score: i};
      service.addScore(scoreEntry);
      arr.push(scoreEntry);
    }
    arr = arr.reverse();
    expect(service.scores).toEqual(arr);
  });


  it('should save only SCORES_COUNT scores', () => {
    let arr = [];
    for(let i = 0; i< SCORES_COUNT+1; i++){
      const scoreEntry: ScoreEntry = {name: "DisplayName", score: i};
      service.addScore(scoreEntry);
      arr.push(scoreEntry);
    }
    expect(service.scores.length).toEqual(SCORES_COUNT);
  });
});
