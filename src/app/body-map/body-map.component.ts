import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-body-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body-map.component.html',
  styleUrl: './body-map.component.scss',
})
export class BodyMapComponent implements OnChanges {
  @Input() initialZones: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  selectedZones: string[] = [];

  zones = [
    { name: 'head', top: 10, left: 49.5 },
    { name: 'chest', top: 26, left: 49.5 },
    { name: 'abdomen', top: 37, left: 49.5 },
    { name: 'left_arm', top: 38, left: 61 },
    { name: 'right_arm', top: 38, left: 39 },
    { name: 'left_leg', top: 67, left: 54 },
    { name: 'right_leg', top: 67, left: 45 },
  ];

  ngOnChanges() {
    if (this.initialZones) {
      this.selectedZones = [...this.initialZones];
    }
  }

  toggleZone(zone: string) {
    if (this.selectedZones.includes(zone)) {
      this.selectedZones = this.selectedZones.filter((z) => z !== zone);
    } else {
      this.selectedZones.push(zone);
    }

    this.selectionChange.emit(this.selectedZones);
  }

  isSelected(zone: string): boolean {
    return this.selectedZones.includes(zone);
  }
}
