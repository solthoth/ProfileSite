import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Job } from '../job';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatListModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  @Input() job!: Job;
}
