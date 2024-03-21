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
      companyLink: 'https://www.shellrecharge.com/en-us/solutions',
      dateRange: 'June 2021 - Current',
      internalRange: 'October 2021',
      achivements: [
        'Worked as interim Cybersecurity Engineering Manager.',
        'Implemented security controls per ISO 270001 standards. Introduced security and vulnerability checks as part of the CI pipeline.',
        'Applied security updates to EC2s, base docker images, Java and Go based applications.',
        'Implemented and managed incident management for tier 3 escalations.',
        'Manage and worked with teams across multiple time zones (US, EU, & India).',
        'Implement logging standards for application development.',
        'Introduced end-to-end observability using Datadog. Used a code-first approach using terraform to implement monitors, SLOs, and synthetic testing.',
        'Built out PagerDuty services for incident management including linking to external services such as Datadog and Jira via terraform.',
        'Containerized Java (Spring) & Go applications using Docker and deployed via Helm into EKS (Kubernetes).',
        'Improved SQL queries from JPA against MySQL and Postgres databases.',
        'Implemented Lambda functions in Go-lang & Java for API gateways and consumer services.',
        'Created and maintained AWS infrastructure using terraform, help maintaining custom modules, and deployed across various AWS accounts.',
        'Update applications to toggle between primary RDS instance and read replica for data access.',
        'Implement multi-availability zone architecture, and balance traffic across multi- region architecture for edge location traffic.',
      ],
    },
    {
      id: '1d7e7c9c-c245-47d9-9aa7-f3fa0790d406',
      title: 'Senior DevOps Engineer',
      companyName: 'Shell Recharge Solutions',
      companyLink: 'https://www.shellrecharge.com/en-us/solutions',
      dateRange: 'June 2021 - Oct 2021',
      internalRange: 'June 2021',
      achivements: [
        'Manage and create cloud infrastructure in AWS following a code-first approach using Terraform (RDS, MQ, OpenSearch, ECS, EKS, EC2, S3, etc.).',
        'Manage configuration and provisioning of VMs (CentOS & Amazon Linux) using a combination of Salt Stack and Ansible.',
        'Support and enhancement of CI/CD using Bitbucket Pipelines, Gitlab Pipelines, GitHub Actions, and TeamCity. Deploy applications to various environments using Ansible and Octopus Deploy.',
        'Build and configure Elasticsearch clusters using terraform on AWS (EC2). Configure master, coordinating, and data nodes using SaltStack.',
        'Expand SaltStack configuration with AWS using Python scripts.',
        'Implement testing for SaltStack states using docker.',
        'Implement testing for ansible playbooks using PyTest, Molecule, Testinfra, and Docker.',
        'Configure existing observability tools using Grafana, CloudWatch, Prometheus, and Stackify.',
      ],
    },
    {
      id: 'da4c322c-6753-428c-b26d-cf82e3801539',
      title: 'Manager, Site Reliability Engineering',
      companyName: 'GreenDot Corporation',
      companyLink: 'https://www.greendot.com',
      dateRange: 'Feb 2021 - June 2021',
      internalRange: '',
      achivements: [
        'Introduced service-level objectives and error budgets, helped drive a reliability- oriented mindset with the product team.',
        'Migrated .NET core applications from VM-hosted services to Docker & Kubernetes.',
        'Create docker compose files for local testing, and automation integration testing.',
        'Established a tier 3 support model into the existing support process, reducing product development engagement, increasing backlog productivity.',
        'Automated application delivery by developing custom services on Windows machines using Python and Golang.',
        'Implement scaling of message consumer services using Keda based on message queue count and cloud watch metrics.',
        'Automated failover of networks from datacenters using synthetic tests.',
      ],
    },
    {
      id: 'd121d321-091b-4f5e-a998-2f37ecaf352c',
      title: 'Manager, Software Engineering',
      companyName: 'Santa Barabara Tax Product Group',
      companyLink: 'https://www.sbtpg.com',
      dateRange: 'Aug 2017 - Feb 2021',
      internalRange: 'April 2019',
      achivements: [
        'Managed geographically dispersed teams (US, India, China).',
        'Managed multiple scrum teams (20+ engineers) to meet business objectives while working under tight deadlines with product managers.',
        'Defined development and unit testing best practices for software engineers. Introduced TDD using libraries like NUnit, NSubtitute, Moq, amongst others.',
        'Migrate legacy applications from Delphi and .NET framework to .NET core, and deploy those services as docker containers.',
        'Implement producer and consumer services for a distributed system design using Rabbit MQ.',
        'Implement a data layer against a Pervasive and MSSQL database.',
        'Introduced CI/CD using Gitlab for Kubernetes hosted applications.',
      ],
    },
    {
      id: '712a2a7c-0eae-4c80-bdc7-964cfdca915a',
      title: 'Senior Software Engineer',
      companyName: 'Santa Barabara Tax Product Group',
      companyLink: 'https://www.sbtpg.com',
      dateRange: 'Aug 2017 - Feb 2021',
      internalRange: 'Aug 2017',
      achivements: [
        'Led a scrum team, coordinating efforts with Product and Program managers to deliver business objectives.',
        'Implemented reporting solutions for legacy applications in Delphi.',
        'Implemented and maintained ACH and taxpayer information processing using Delphi and C# (.NET Framework).',
        'Created REST API solutions using C# (.NET Core) to create a service-oriented architecture (SOA).',
        'Implemented unit testing to validate business requirements and accelerate sprint deliverables.',
        'Partnered with networking/infrastructure team and introduced PowerShell DSL for system provisioning and, later Ansible.',
        'Introduced CI/CD using TeamCity and Octopus Deploy for Windows(VM) hosted applications.',
        'Introduced local artifact repository (ProGet) to comply with security practices and introduce package scanning.',
      ],
    },
    {
      id: '56d77b31-fb0f-44e1-91d2-9e5bc9563416',
      title: 'Software Engineer',
      companyName: 'LightStream',
      companyLink: 'https://www.lightstream.com',
      dateRange: 'Oct 2015 - Dec 2017',
      internalRange: '',
      achivements: [
        'Implemented enhancements to widgets and pages to public and internal facing websites written in C# & Angular JS.',
        'Updated domain services per business requirements in C# using WCF and REST.',
        'Updated front-end desktop applications written in C# using WPF and WinForms.',
        'Added enhancements to CI/CD, reducing build and test times via multi- threading tests and NUnit.',
        'Help start the company\'s first DevOps team.',
        'Maintained and upgraded CI/CD tools like TeamCity and Octopus Deploy.',
        'Introduced configuration management using Puppet and PowerShell DSC. Create and provision new environments on-demand for performance testing.',
        'Worked with technology leadership to review and explore new technology.',
      ],
    },
    {
      id: '579d43cd-8ee6-4982-9d89-5fe46eb5767d',
      title: 'Instructor (Java & JavaScript)',
      companyName: 'Coleman University',
      companyLink: 'https://www.coleman.edu.gl/',
      dateRange: 'Aug 2011 - Oct 2012',
      internalRange: '',
      achivements: [
        'Teach object-oriented programming using Java.',
        'Using UML define and develop homework exercises.',
        'Teach introduction to JavaScript and web development.',
      ],
    },
    {
      id: 'd5e3865c-b6bd-4999-93c3-45705dce1008',
      title: 'Lead Application Developer',
      companyName: 'Santa Barabara Tax Product Group',
      companyLink: 'https://www.sbtpg.com',
      dateRange: 'June 2008 - Oct 2015',
      internalRange: 'May 2013',
      achivements: [
        'Implement project items based on business requests.',
        'Enhance .NET (C#) based projects based on year over year requirements.',
        'Enhance Delphi based projects based on year over year requirements.',
        'Develop consumer services for file (XML, ACH) inputs.',
        'Work with stakeholders and gather requirements for project management team.',
        'Help design and build company MSSQL database using visual studio database project.',
      ],
    },
    {
      id: 'a1b3c4a8-b511-4827-b5ca-4e0f30b829df',
      title: 'Programmer Analyst',
      companyName: 'Santa Barabara Tax Product Group',
      companyLink: 'https://www.sbtpg.com',
      dateRange: 'June 2008 - Oct 2015',
      internalRange: 'June 2008',
      achivements: [
        'Implement project items based on business requests.',
        'Enhance .NET (C#) based projects based on year over year requirements.',
        'Enhance Delphi based projects based on year over year requirements.',
        'Develop consumer services for file (XML, ACH) inputs.',
        'Work with stakeholders and gather requirements for project management team.',
      ],
    }
  ]
  constructor() { }

  getAllJobs(): Job[] {
    return this.jobList;
  }
}
