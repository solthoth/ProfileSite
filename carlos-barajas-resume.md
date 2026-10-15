# Carlos Barajas

**Platform Engineering & DevOps Leader**

- **Location:** San Diego, CA
- **Email:** carlos.barajas@proton.me
- **LinkedIn:** https://www.linkedin.com/in/solthoth
- **GitHub:** https://github.com/solthoth

<!--
SOURCE OF TRUTH — maintenance notes for future updates (human or AI):
- This file is the canonical resume. Regenerate the .docx from this content.
- Keep newest experience first. Condense roles older than ~10 years to 1-2 lines.
- All dates confirmed by Carlos (Oct 2026).
-->

## Summary

Platform engineering leader with nearly two decades in production systems, building internal developer platforms, modernizing CI/CD, and driving GitOps transformations across Azure and AWS. Currently leads a 13-engineer platform team at Blue Shield of California (Stellarus) through a projected $4M modernization replacing Digital.ai Release with Backstage-driven self-service provisioning for 40+ teams. Has built and led globally distributed teams of up to 24 engineers across the US, EU, India, and China, using Backstage, Terraform/OpenTofu, Crossplane, ArgoCD, and Kargo alongside observability standards, DORA metrics, and agentic AI tooling to raise developer productivity. Combines hands-on engineering in Go, C#, Java, Python, and Node.js with setting technical direction and mentoring engineers at every level, from professional to principal.

## Key Skills

- **Leadership:** Team development, global/cross-functional team management, product roadmaps, mentorship, strong communication
- **Cloud:** Azure, AWS
- **Internal Developer Platform:** Backstage, software catalog, software templates
- **Infrastructure as Code & Config Management:** Terraform, OpenTofu, Crossplane, Ansible, SaltStack, Puppet, Kustomize
- **Containers:** Docker, Docker Compose, Kubernetes (EKS), Helm, Keda
- **CI/CD & GitOps:** GitHub Actions, GitLab, Jenkins, Bitbucket Pipelines, TeamCity, Octopus Deploy, Digital.ai, ArgoCD, Kargo, Atlantis
- **Languages:** Go, C#, Java, Python, Node.js/NestJS, Delphi, SQL
- **Observability:** Datadog, Dynatrace, Grafana, Prometheus, DORA metrics
- **AI / Agentic Dev Tooling:** GitHub Copilot, Codex, Claude Code
- **Collaboration:** Jira, Confluence, Git, Perforce

## Experience

### Blue Shield of California (Stellarus) — Sr. Manager, Technical Engineering (Platform Engineering)

**Feb 2026 – Present**

- Lead a 13-engineer Platform Engineering team (3 principal, 5 lead, 3 senior, 2 professional) supporting an internal development platform centered on cloud infrastructure automation, where software teams own their own infrastructure, built on Azure APIs with Ansible and Digital.ai.
- Own CI/CD pipelines across a wide range of tech stacks: C#, Node.js, Java/Spring Boot (Maven & Gradle), Python, mobile (Kotlin & Swift), and React Native.
- Set the product roadmap transforming the platform from team self-managed infrastructure to a centralized, GitOps-driven model:
  - Foundational infrastructure with OpenTofu & Terraform
  - Application infrastructure with Crossplane
  - Backstage as the internal developer portal
  - ArgoCD for delivery and Kargo for promotion
  - DORA metrics for measuring developer productivity
- Spearhead the replacement of Digital.ai Release with a Backstage-driven self-service cloud provisioning platform, managing and providing technical direction to 8 remote engineers while balancing operational work; on track for completion by June 2027 with a projected $4M in value to the company:
  - Backstage software templates as the interface for Azure changes, replacing free-form inputs with catalog references to simplify provisioning for 40+ teams
  - Converting ~70 Ansible playbooks into ~30 modular OpenTofu modules covering resource groups, AKS, Azure SQL, Key Vault, VMs, App Service Plans, networking, and service principals, reducing configuration drift
  - Orchestrating changes through GitHub Actions, Atlantis, and Ansible Automation Platform
  - Partnering with FinOps to turn cost approval for net-new infrastructure from a blocking gate into informed oversight
- Drive migration of teams from Bitbucket & Jenkins to GitHub and GitHub Actions, incorporating agentic solutions (GitHub Copilot, Codex, Claude Code).
- Establish observability patterns with Dynatrace for proactive, agentic infrastructure.

### Allergan Aesthetics (AbbVie) — Cloud Engineering Manager (Developer Experience & DevOps)

**Jun 2024 – Feb 2026**

- Led 14 engineers across two teams: DevOps (10 engineers: 1 staff, 9 senior) and Developer Experience (4 platform engineers: 1 principal, 1 staff, 1 lead, 1 senior), owning engineering infrastructure and developer productivity at scale.
- Drove implementation and deployment of an internal developer portal using Spotify's Backstage, cutting the time to promote a service to production from 7 days to 15 minutes and improving service discovery, documentation, and onboarding workflows.
- Partnered with cross-functional teams to reduce friction in the development lifecycle through self-service tooling, automation, and improved onboarding.
- Set infrastructure direction for engineering teams designing, deploying, and managing workloads on AWS and Kubernetes, with an emphasis on scalability and reliability.
- Standardized service deployment patterns using Kustomize and Terraform, improving consistency across environments and reducing time to production.
- Enabled a shift-left infrastructure model with internal tools that let teams provision and manage resources independently.
- Improved CI/CD pipelines across teams using GitHub Actions, enhancing build/test/deploy efficiency and reliability.
- Directed migration of ~70 legacy workloads to containerized services using Docker and Kubernetes.
- Established observability standards and operational tooling, moving teams toward software-driven operations.
- Provided architectural guidance on solution designs in Node.js, NestJS, and Go.

### Shell Recharge Solutions

**Jun 2021 – Jun 2024**

*EV charging OCPP/OCPI platform · ~15K charging stations across US & EU regions*

#### Site Reliability Engineering Manager (Oct 2021 – Jun 2024)

- Led two SRE teams in the US and India totaling 10 engineers (2 leads, 8 senior), coordinating across US, EU, and India time zones; improved uptime from 97% to 99% across 5 platforms.
- Served as interim Cybersecurity Engineering Manager, ensuring the company maintained its ISO 27001 certification: enforced compliance controls, implemented guardrails between CI/CD and infrastructure access controls, added security/vulnerability checks to the CI pipeline, and drove patching across EC2 instances, base Docker images, and Java/Go applications.
- Built and ran tier 3 incident management; codified PagerDuty services integrated with Datadog and Jira in Terraform.
- Established end-to-end observability with Datadog using a code-first approach — Terraform-managed monitors, SLOs, and synthetic testing — and set logging standards for application development; the resulting metrics enabled proactive fixes and load scaling that cut incident frequency from roughly every 48 hours to once every two weeks.
- Containerized Java (Spring) and Go applications with Docker, deployed via Helm into EKS.
- Built Lambda functions in Go and Java for API gateways and consumer services; optimized JPA-generated SQL against MySQL and Postgres.
- Built AWS infrastructure with Terraform, including custom modules deployed across multiple AWS accounts.
- Implemented multi-AZ architecture, primary/read-replica RDS toggling, and multi-region traffic balancing for edge locations.

#### Senior DevOps Engineer (Jun 2021 – Oct 2021)

- Managed AWS infrastructure code-first with Terraform (RDS, MQ, OpenSearch, ECS, EKS, EC2, S3, etc.).
- Provisioned and configured VMs (CentOS, Amazon Linux) with SaltStack and Ansible; extended SaltStack with AWS via Python.
- Operated CI/CD across Bitbucket Pipelines, GitLab Pipelines, GitHub Actions, and TeamCity, deploying via Ansible and Octopus Deploy.
- Built Elasticsearch clusters on EC2 with Terraform; configured master, coordinating, and data nodes with SaltStack.
- Implemented testing for SaltStack states and Ansible playbooks using Docker, PyTest, Molecule, and Testinfra.
- Tuned observability with Grafana, CloudWatch, Prometheus, and Stackify.

### Green Dot Corp

**Dec 2017 – Jun 2021**

#### Site Reliability Engineering Manager (Feb 2021 – Jun 2021)

- Led a 3-engineer SRE team (1 lead, 2 senior); introduced service-level objectives and error budgets, building a reliability-oriented mindset with the product team.
- Migrated .NET Core applications from VM-hosted services to Docker & Kubernetes; created Docker Compose setups for local testing and automated integration testing.
- Established a tier 3 support model, reducing product-development engagement and increasing backlog productivity.
- Automated application delivery with custom Windows services in Python and Go; scaled message consumers with Keda based on queue depth and CloudWatch metrics.
- Automated datacenter network failover using synthetic tests.

#### Software Engineering Manager (Apr 2019 – Feb 2021)

- Managed 24 engineers across multiple scrum teams in the US, India, and China (1 senior principal, 3 leads, and 20 senior and professional engineers), delivering business objectives on aggressive timelines.
- Defined development and unit-testing best practices; introduced TDD with NUnit, NSubstitute, and Moq.
- Migrated ~20 legacy Delphi and .NET Framework applications to .NET Core, deployed as Docker containers.
- Built producer/consumer services for a distributed system using RabbitMQ, with data layers against Pervasive and MSSQL.
- Established CI/CD with GitLab for Kubernetes-hosted applications.

#### Senior Software Engineer (Dec 2017 – Apr 2019)

- Led a scrum team, coordinating with Product and Program managers to deliver business objectives.
- Built and maintained ACH and taxpayer-information processing in Delphi and C# (.NET Framework); built REST APIs in C# (.NET Core) toward a service-oriented architecture.
- Partnered with the infrastructure team to adopt PowerShell DSC (and later Ansible) for system provisioning.
- Introduced CI/CD with TeamCity and Octopus Deploy for Windows-hosted applications, plus a local artifact repository (ProGet) with package scanning.

### Lightstream — Software Engineer

**Oct 2015 – Dec 2017**

- Enhanced public and internal websites in C# & AngularJS; updated domain services (WCF, REST) and desktop apps (WPF, WinForms).
- Founding member of the company's first DevOps team; owned upgrades and administration of TeamCity and Octopus Deploy.
- Introduced configuration management with Puppet and PowerShell DSC; provisioned on-demand environments for performance testing.
- Reduced build/test times via multi-threaded NUnit test runs.

### Earlier Experience

- **Santa Barbara Tax Products Group** — Lead Applications Developer / Programmer Analyst (Jun 2008 – Oct 2015): Built and enhanced C#/.NET and Delphi financial-products systems, ACH and XML file-processing services, and co-designed the company MSSQL database.
- **Coleman University** — Instructor, Java & JavaScript (Aug 2011 – Oct 2012): Taught object-oriented programming in Java and introductory JavaScript/web development.

## Education

**Coleman University** — B.S. Computer Information Systems, San Diego, CA

## Interests

Martial arts (BJJ, Tai Chi, Kung Fu) · Hobby development exploring new languages and technologies · Video gaming (puzzle, strategy, base building)
