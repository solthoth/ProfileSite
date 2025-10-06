import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Job } from '../job';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [MatCardModule, RouterModule, CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  @Input() job!: Job;
}
