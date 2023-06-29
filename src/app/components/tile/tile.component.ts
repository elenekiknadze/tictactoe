import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TileValue } from 'src/app/services/resolver.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  @Input() state: TileValue = '';
  @Input() isDisabled = false;
  @Input() highlight = false;
}
