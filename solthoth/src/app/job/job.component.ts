import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Job } from '../job';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-job',
    imports: [MatCardModule, RouterModule],
    templateUrl: './job.component.html',
    styleUrl: './job.component.css'
})
export class JobComponent {
  @Input() job!: Job;
}
