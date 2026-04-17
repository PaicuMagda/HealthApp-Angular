import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-body-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body-map.component.html',
  styleUrl: './body-map.component.scss',
})
export class BodyMapComponent {
  @Output() selectionChange = new EventEmitter<string[]>();

  selectedZones: string[] = [];

  zones = [
    { name: 'head', top: 5, left: 45 },
    { name: 'chest', top: 25, left: 45 },
    { name: 'abdomen', top: 40, left: 45 },
    { name: 'left_arm', top: 30, left: 20 },
    { name: 'right_arm', top: 30, left: 70 },
    { name: 'left_leg', top: 65, left: 40 },
    { name: 'right_leg', top: 65, left: 55 },
  ];

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
