import { Injectable } from '@angular/core';
import { Player } from '../enums/players.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _name = '';
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  private _player: Player = 'x';
  get player() {
    return this._player;
  }

  set player(player: Player) {
    this._player = player;
    this._computer = this._player === 'x' ? 'o' : 'x';
  }

  private _computer: Player = 'o';
  get computer() {
    return this._computer;
  }

  constructor() {}
}
