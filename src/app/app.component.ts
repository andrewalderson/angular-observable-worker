/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterService } from './counter/counter.service';
import './observable-worker/transfer-handlers';

@Component({
  standalone: true,
  selector: 'aow-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(protected readonly counterService: CounterService) {}

}
  