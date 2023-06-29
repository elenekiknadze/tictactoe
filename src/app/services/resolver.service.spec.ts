import { TestBed } from '@angular/core/testing';

import {
  ResolverService,
  setContainsArray,
  TileValue,
} from './resolver.service';

describe('ResolverService', () => {
  let service: ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('SetContainsArray', () => {
    it('should return true when containing the array', () => {
      const set = new Set([1, 2, 3, 4, 5, 6, 7]);
      expect(setContainsArray(set, [1, 2, 6])).toEqual(true);
    });

    it('should return false when not containing the array', () => {
      const set = new Set([1, 2, 3, 4, 5, 6, 7]);
      expect(setContainsArray(set, [1, 2, 9])).toEqual(false);
    });
  });

  describe('getCoordinates', () => {
    it('should put each tile into a relevant box', () => {
      const board: TileValue[] = ['x', 'x', 'x', 'o', 'o', '', '', '', ''];
      const coordinates = service.getCoordinates(board);
      expect(coordinates.o.size).toEqual(2);
      expect(coordinates.empty.size).toEqual(4);
    });
  });

  describe('bestMoveResolver', () => {
    it('should return the winning move', () => {
      const board: TileValue[] = ['x', 'x', '', 'o', 'o', '', '', '', ''];
      const move = service.bestMoveResolver(board, 'x');
      expect(move.move).toEqual(2);
    });

    it('should return no move', () => {
      const board: TileValue[] = ['x', 'x', 'x', 'o', 'o', '', '', '', ''];
      const move = service.bestMoveResolver(board, 'x');
      expect(move.move).toEqual(-1);
    });
  });
});
