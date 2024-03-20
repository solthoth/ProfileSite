import { Injectable } from '@angular/core';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  protected jobList: Job[] = [
    {
      id: 'edcbb4ab-4c8b-41db-856b-725a0580b595',
      title: 'Manager, Site Reliability Engineering',
      companyName: 'Shell Recharge Solutions',
      companyLink: 'https://shellrecharge.com/en-us/solutions',
      dateRange: 'June 2021 - Current',
      internalRange: 'October 2021',
      achivements: [
        'Worked as interim Cybersecurity Engineering Manager.',
        'Developed security controls per ISO 270001 standards to drive a security-first approach within the SDLC and renew certifications. Created and managed the SRE organization, implemented incident management process, and implemented high availability solutions and architecture in AWS.',
        'Manage teams across multiple time zones (US, EU, & India).',
        'Implement logging standards for application development.',
        'Introduced end-to-end observability using Datadog.',
        'Containerized Java (Spring) applications using Docker and deployed via Kubernetes & Helm.',
        'Improved SQL queries from JPA against MySQL and Postgres databases.',
        'Implemented Lambda functions in Go-lang & Java for API gateways and consumer services.',
        'Design and implement multi-availability zone and multi-region applications and infrastructure for high availability and disaster recovery.',
      ],
      details: [
        'Worked as interim Cybersecurity Engineering Manager.',
        'Developed security controls per ISO 270001 standards to drive a security-first approach within the SDLC and renew certifications. Created and managed the SRE organization, implemented incident management process, and implemented high availability solutions and architecture in AWS.',
        'Manage teams across multiple time zones (US, EU, & India).',
        'Implement logging standards for application development.',
        'Introduced end-to-end observability using Datadog.',
        'Containerized Java (Spring) applications using Docker and deployed via Kubernetes & Helm.',
        'Improved SQL queries from JPA against MySQL and Postgres databases.',
        'Implemented Lambda functions in Go-lang & Java for API gateways and consumer services.',
        'Design and implement multi-availability zone and multi-region applications and infrastructure for high availability and disaster recovery.',
      ],
    }
  ]
  constructor() { }

  getAllJobs(): Job[] {
    return this.jobList;
  }
}
