import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Job } from '../job';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  @Input() job!: Job;
}
