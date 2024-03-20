import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { JobComponent } from '../job/job.component';
import { JobService } from '../job.service';
import { Job } from '../job'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, JobComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jobList: Job[] = [];
  jobService: JobService = inject(JobService)
  constructor() {
    this.jobList = this.jobService.getAllJobs();
  }
}
