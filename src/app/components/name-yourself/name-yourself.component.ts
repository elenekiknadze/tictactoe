import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Player } from 'src/app/enums/players.type';
import { PlayerData } from 'src/app/interfaces/playerdata.interface';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatDialogModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-name-yourself',
  templateUrl: './name-yourself.component.html',
  styleUrls: ['./name-yourself.component.scss'],
})
export class NameYourselfComponent {
  readonly nameControl = new FormControl<string>('', [Validators.required]);
  readonly playerControl = new FormControl<Player>('x', [Validators.required]);
  constructor(
    @Optional() private readonly dialogRef: MatDialogRef<NameYourselfComponent>
  ) {}

  start() {
    const name = this.nameControl.value!;
    const player = this.playerControl.value!;
    const playerData: PlayerData = { name, player };
    this.dialogRef.close(playerData);
  }
}
