# Carlos Barajas

**Platform Engineering & DevOps Leader**

- **Location:** San Diego, CA
- **Email:** carlos.barajas@proton.me
- **LinkedIn:** https://www.linkedin.com/in/solthoth

<!--
SOURCE OF TRUTH — maintenance notes for future updates (human or AI):
- This file is the canonical resume. Regenerate the .docx from this content.
- Keep newest experience first. Condense roles older than ~10 years to 1-2 lines.
- ASSUMPTIONS to verify (dates were inconsistent in the 2025 resume):
  1. Green Dot Senior Software Engineer changed from "Aug 2017" to Dec 2017
     start (to avoid overlap with Lightstream, which ended Dec 2017).
  2. SBTPG end date set to Oct 2015 (old header said Dec 2015).
  3. Coleman instructor dates set to Aug 2011 - Oct 2012 (old header said
     Oct 2011 - Dec 2012).
-->

## Summary

Engineering leader specializing in platform engineering, developer experience, and cloud infrastructure across Azure and AWS. Proven track record building internal developer platforms (Backstage), modernizing CI/CD at scale, and driving GitOps transformations using Terraform/OpenTofu, Crossplane, ArgoCD, and Kargo. Experienced leading cross-functional, globally distributed teams and improving developer productivity through self-service tooling, observability standards, DORA metrics, and agentic AI development tools. Hands-on across Go, C#, Java, Python, and Node.js. Seeking to keep growing in a technical leadership role that blends hands-on engineering, strategic impact, and mentorship.

## Key Skills

- **Leadership:** Team development, global/cross-functional team management, product roadmaps, mentorship, strong communication
- **Cloud:** Azure, AWS
- **Infrastructure as Code & Config Management:** Terraform, OpenTofu, Crossplane, Ansible, SaltStack, Puppet, Kustomize
- **Containers:** Docker, Docker Compose, Kubernetes (EKS), Helm, Keda
- **CI/CD & GitOps:** GitHub Actions, GitLab, Jenkins, Bitbucket Pipelines, TeamCity, Octopus Deploy, Digital.ai, ArgoCD, Kargo
- **Languages:** Go, C#, Java, Python, Node.js/NestJS, Delphi, SQL
- **Observability:** Datadog, Dynatrace, Grafana, Prometheus, DORA metrics
- **AI / Agentic Dev Tooling:** GitHub Copilot, Codex, Claude Code
- **Collaboration:** Jira, Confluence, Git, Perforce

## Experience

### Blue Shield of California (Stellarus) — Sr. Manager, Technical Engineering (Platform Engineering)

**Feb 2026 – Present**

- Lead Platform Engineering, supporting an internal development platform centered on cloud infrastructure automation where software teams own their own infrastructure, built on Azure APIs with Ansible and Digital.ai.
- Maintain and build CI/CD pipelines across a wide range of tech stacks: C#, Node.js, Java/Spring Boot (Maven & Gradle), Python, mobile (Kotlin & Swift), and React Native.
- Own the product roadmap transforming the platform from team self-managed infrastructure to a centralized, GitOps-driven model:
  - Foundational infrastructure with OpenTofu & Terraform
  - Application infrastructure with Crossplane
  - Backstage as the internal developer portal
  - ArgoCD for delivery and Kargo for promotion
  - DORA metrics for measuring developer productivity
- Drive migration of teams from Bitbucket & Jenkins to GitHub and GitHub Actions, incorporating agentic solutions (GitHub Copilot, Codex, Claude Code).
- Implement observability patterns for proactive, agentic infrastructure using Dynatrace.

### Allergan Aesthetics (AbbVie) — Cloud Engineering Manager (Developer Experience & DevOps)

**Jun 2024 – Feb 2026**

- Led both Developer Experience and DevOps teams, supporting engineering infrastructure and developer productivity at scale.
- Drove implementation and deployment of an internal developer portal using Spotify's Backstage, improving service discovery, documentation, and onboarding workflows.
- Partnered with cross-functional teams to reduce friction in the development lifecycle through self-service tooling, automation, and improved onboarding.
- Guided engineering teams designing, deploying, and managing infrastructure on AWS and Kubernetes with an emphasis on scalability and reliability.
- Standardized service deployment patterns using Kustomize and Terraform, improving consistency across environments and reducing time to production.
- Enabled a shift-left infrastructure model with internal tools that let teams provision and manage resources independently.
- Improved CI/CD pipelines across teams using GitHub Actions, enhancing build/test/deploy efficiency and reliability.
- Supported migration of legacy workloads to containerized services using Docker and Kubernetes.
- Advocated for software-driven operations by introducing observability standards and operational tooling.
- Collaborated on solution design in Node.js, NestJS, and Golang, contributing architectural guidance.

### Shell Recharge Solutions

**Jun 2021 – Jun 2024**

#### Site Reliability Engineering Manager (Oct 2021 – Jun 2024)

- Served as interim Cybersecurity Engineering Manager; implemented security controls per ISO 27001 and added security/vulnerability checks to the CI pipeline.
- Applied security updates across EC2 instances, base Docker images, and Java/Go applications.
- Implemented and managed incident management for tier 3 escalations; built PagerDuty services linked to Datadog and Jira via Terraform.
- Managed teams across multiple time zones (US, EU, and India).
- Introduced end-to-end observability with Datadog using a code-first approach — Terraform-managed monitors, SLOs, and synthetic testing — and set logging standards for application development.
- Containerized Java (Spring) and Go applications with Docker, deployed via Helm into EKS.
- Implemented Lambda functions in Go and Java for API gateways and consumer services; improved JPA-generated SQL against MySQL and Postgres.
- Created and maintained AWS infrastructure with Terraform, including custom modules deployed across multiple AWS accounts.
- Implemented multi-AZ architecture, primary/read-replica RDS toggling, and multi-region traffic balancing for edge locations.

#### Senior DevOps Engineer (Jun 2021 – Oct 2021)

- Managed AWS infrastructure code-first with Terraform (RDS, MQ, OpenSearch, ECS, EKS, EC2, S3, etc.).
- Provisioned and configured VMs (CentOS, Amazon Linux) with SaltStack and Ansible; extended SaltStack with AWS via Python.
- Supported CI/CD across Bitbucket Pipelines, GitLab Pipelines, GitHub Actions, and TeamCity; deployed via Ansible and Octopus Deploy.
- Built Elasticsearch clusters on EC2 with Terraform; configured master, coordinating, and data nodes with SaltStack.
- Implemented testing for SaltStack states and Ansible playbooks using Docker, PyTest, Molecule, and Testinfra.
- Tuned observability with Grafana, CloudWatch, Prometheus, and Stackify.

### Green Dot Corp

**Dec 2017 – Jun 2021**

#### Site Reliability Engineering Manager (Feb 2021 – Jun 2021)

- Introduced service-level objectives and error budgets, driving a reliability-oriented mindset with the product team.
- Migrated .NET Core applications from VM-hosted services to Docker & Kubernetes; created Docker Compose setups for local testing and automated integration testing.
- Established a tier 3 support model, reducing product-development engagement and increasing backlog productivity.
- Automated application delivery with custom Windows services in Python and Go; scaled message consumers with Keda based on queue depth and CloudWatch metrics.
- Automated datacenter network failover using synthetic tests.

#### Software Engineering Manager (Apr 2019 – Feb 2021)

- Managed geographically dispersed teams (US, India, China) — multiple scrum teams totaling 20+ engineers — delivering business objectives under tight deadlines.
- Defined development and unit-testing best practices; introduced TDD with NUnit, NSubstitute, and Moq.
- Migrated legacy Delphi and .NET Framework applications to .NET Core, deployed as Docker containers.
- Implemented producer/consumer services for a distributed system using RabbitMQ; built data layers against Pervasive and MSSQL.
- Introduced CI/CD with GitLab for Kubernetes-hosted applications.

#### Senior Software Engineer (Dec 2017 – Apr 2019)

- Led a scrum team, coordinating with Product and Program managers to deliver business objectives.
- Implemented and maintained ACH and taxpayer-information processing in Delphi and C# (.NET Framework); built REST APIs in C# (.NET Core) toward a service-oriented architecture.
- Introduced PowerShell DSC (and later Ansible) for system provisioning with the infrastructure team.
- Introduced CI/CD with TeamCity and Octopus Deploy for Windows-hosted applications, plus a local artifact repository (ProGet) with package scanning.

### Lightstream — Software Engineer

**Oct 2015 – Dec 2017**

- Enhanced public and internal websites in C# & AngularJS; updated domain services (WCF, REST) and desktop apps (WPF, WinForms).
- Helped start the company's first DevOps team; maintained and upgraded TeamCity and Octopus Deploy.
- Introduced configuration management with Puppet and PowerShell DSC; provisioned on-demand environments for performance testing.
- Reduced build/test times via multi-threaded NUnit test runs.

### Earlier Experience

- **Santa Barbara Tax Products Group** — Lead Applications Developer / Programmer Analyst (Jun 2008 – Oct 2015): Built and enhanced C#/.NET and Delphi financial-products systems, ACH and XML file-processing services, and helped design the company MSSQL database.
- **Coleman University** — Instructor, Java & JavaScript (Aug 2011 – Oct 2012): Taught object-oriented programming in Java and introductory JavaScript/web development.

## Education

**Coleman University** — B.S. Computer Information Systems, San Diego, CA

## Interests

Martial arts (BJJ, Tai Chi, Kung Fu) · Hobby development exploring new languages and technologies · Video gaming (puzzle, strategy, base building)
