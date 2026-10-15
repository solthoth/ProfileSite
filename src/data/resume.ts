// Content transcribed by hand from ../../carlos-barajas-resume.md, the
// canonical source of truth. Keep this file in sync when the resume changes.

// Resume variants a bullet belongs in: individual contributor, manager,
// director. The site renders every bullet; variants filter on this.
export type Audience = 'ic' | 'mgr' | 'dir'

export interface Achievement {
  text: string
  audiences: Audience[]
  subItems?: string[]
}

export interface RoleStage {
  title: string
  range: string
  current?: boolean
  achievements: Achievement[]
}

export interface ExperienceEntry {
  company: string
  companyNote?: string
  companyRange?: string
  roles: RoleStage[]
}

export interface EarlierRole {
  company: string
  title: string
  range: string
  description: string
}

export interface SkillCategory {
  label: string
  items: string[]
}

export const person = {
  name: 'Carlos Barajas',
  title: 'Platform Engineering & DevOps Leader',
  location: 'San Diego, CA',
  email: 'carlos.barajas@proton.me',
  linkedin: 'https://www.linkedin.com/in/solthoth',
  github: 'https://github.com/solthoth',
  website: 'https://solthoth.com',
}

export const summary =
  'Platform engineering leader with nearly two decades in production systems, building internal developer platforms, modernizing CI/CD, and driving GitOps transformations across Azure and AWS. Currently leads a 13-engineer platform team at Blue Shield of California (Stellarus) through a projected $4M modernization replacing Digital.ai Release with Backstage-driven self-service provisioning for 40+ teams. Has built and led globally distributed teams of up to 24 engineers across the US, EU, India, and China, using Backstage, Terraform/OpenTofu, Crossplane, ArgoCD, and Kargo alongside observability standards, DORA metrics, and agentic AI tooling to raise developer productivity. Combines hands-on engineering in Go, C#, Java, Python, and Node.js with setting technical direction and mentoring engineers at every level, from professional to principal.'

export const skills: SkillCategory[] = [
  {
    label: 'Leadership',
    items: [
      'Team development',
      'global/cross-functional team management',
      'product roadmaps',
      'mentorship',
      'stakeholder partnership (FinOps, Product, Security)',
    ],
  },
  { label: 'Cloud', items: ['Azure', 'AWS'] },
  {
    label: 'Internal Developer Platform',
    items: ['Backstage', 'software catalog', 'software templates'],
  },
  {
    label: 'Infrastructure as Code & Config Management',
    items: [
      'Terraform',
      'OpenTofu',
      'Crossplane',
      'Ansible',
      'Ansible Automation Platform',
      'SaltStack',
      'Puppet',
      'Kustomize',
    ],
  },
  {
    label: 'Containers',
    items: ['Docker', 'Docker Compose', 'Kubernetes (EKS, AKS)', 'Helm', 'Keda'],
  },
  {
    label: 'CI/CD & GitOps',
    items: [
      'GitHub Actions',
      'GitLab',
      'Jenkins',
      'Bitbucket Pipelines',
      'TeamCity',
      'Octopus Deploy',
      'Digital.ai',
      'ArgoCD',
      'Kargo',
      'Atlantis',
    ],
  },
  {
    label: 'Languages',
    items: ['Go', 'C#', 'Java', 'Python', 'Node.js/NestJS', 'Delphi', 'SQL'],
  },
  {
    label: 'Messaging & Data',
    items: ['RabbitMQ', 'MySQL', 'Postgres', 'MSSQL', 'Elasticsearch/OpenSearch'],
  },
  {
    label: 'Observability & Incident Response',
    items: ['Datadog', 'Dynatrace', 'Grafana', 'Prometheus', 'PagerDuty', 'DORA metrics'],
  },
  {
    label: 'Security & Compliance',
    items: [
      'ISO 27001',
      'CI vulnerability scanning',
      'CI/CD and infrastructure access guardrails',
    ],
  },
  {
    label: 'AI / Agentic Dev Tooling',
    items: ['GitHub Copilot', 'Codex', 'Claude Code'],
  },
  { label: 'Collaboration', items: ['Jira', 'Confluence', 'Git'] },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'Blue Shield of California (Stellarus)',
    roles: [
      {
        title: 'Sr. Manager, Technical Engineering (Platform Engineering)',
        range: 'Feb 2026 – Present',
        current: true,
        achievements: [
          {
            text: 'Lead a 13-engineer Platform Engineering team (3 principal, 5 lead, 3 senior, 2 professional) supporting an internal development platform centered on cloud infrastructure automation, where software teams own their own infrastructure, built on Azure APIs with Ansible and Digital.ai.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Spearhead the replacement of Digital.ai Release with a Backstage-driven self-service cloud provisioning platform, managing and providing technical direction to 8 remote engineers while balancing operational work; on track for completion by June 2027 with a projected $4M in value to the company:',
            audiences: ['ic', 'mgr', 'dir'],
            subItems: [
              'Building Backstage software templates as the interface for Azure changes, replacing free-form inputs with catalog references to simplify provisioning for 40+ teams',
              'Converting ~70 Ansible playbooks into ~30 modular OpenTofu modules covering resource groups, AKS, Azure SQL, Key Vault, VMs, App Service Plans, networking, and service principals, reducing configuration drift',
              'Orchestrating changes through GitHub Actions, Atlantis, and Ansible Automation Platform',
              'Partnering with FinOps to turn cost approval for net-new infrastructure from a blocking gate into informed oversight',
            ],
          },
          {
            text: 'Own CI/CD pipelines across a wide range of tech stacks: C#, Node.js, Java/Spring Boot (Maven & Gradle), Python, mobile (Kotlin & Swift), and React Native.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Set the product roadmap transforming the platform from team self-managed infrastructure to a centralized, GitOps-driven model:',
            audiences: ['ic', 'mgr', 'dir'],
            subItems: [
              'Foundational infrastructure with OpenTofu & Terraform',
              'Application infrastructure with Crossplane',
              'Backstage as the internal developer portal',
              'ArgoCD for delivery and Kargo for promotion',
              'DORA metrics for measuring developer productivity',
            ],
          },
          {
            text: 'Drive migration of teams from Bitbucket & Jenkins to GitHub and GitHub Actions, incorporating agentic solutions (GitHub Copilot, Codex, Claude Code).',
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Establish observability patterns with Dynatrace for proactive, agentic infrastructure.',
            audiences: ['ic', 'mgr'],
          },
        ],
      },
    ],
  },
  {
    company: 'Allergan Aesthetics (AbbVie)',
    roles: [
      {
        title: 'Cloud Engineering Manager (Developer Experience & DevOps)',
        range: 'Jun 2024 – Feb 2026',
        achievements: [
          {
            text: 'Led 14 engineers across two teams: DevOps (10 engineers: 1 staff, 9 senior) and Developer Experience (4 platform engineers: 1 principal, 1 staff, 1 lead, 1 senior), owning engineering infrastructure and developer productivity at scale.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: "Drove implementation and deployment of an internal developer portal using Spotify's Backstage, cutting the time to promote a service to production from 7 days to 15 minutes and improving service discovery, documentation, and onboarding workflows.",
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Partnered with cross-functional teams to reduce friction in the development lifecycle through self-service tooling, automation, and improved onboarding.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Set infrastructure direction for engineering teams designing, deploying, and managing workloads on AWS and Kubernetes, with an emphasis on scalability and reliability.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Standardized service deployment patterns using Kustomize and Terraform, improving consistency across environments and reducing time to production.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Enabled a shift-left infrastructure model with internal tools that let teams provision and manage resources independently.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Improved CI/CD pipelines across teams using GitHub Actions, enhancing build/test/deploy efficiency and reliability.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Directed migration of ~70 legacy workloads to containerized services using Docker and Kubernetes.',
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Established observability standards and operational tooling, moving teams toward software-driven operations.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Provided architectural guidance on solution designs in Node.js, NestJS, and Go.',
            audiences: ['ic'],
          },
        ],
      },
    ],
  },
  {
    company: 'Shell Recharge Solutions',
    companyNote: 'EV charging OCPP/OCPI platform · ~15K charging stations across US & EU regions',
    companyRange: 'Jun 2021 – Jun 2024',
    roles: [
      {
        title: 'Site Reliability Engineering Manager',
        range: 'Oct 2021 – Jun 2024',
        achievements: [
          {
            text: 'Led two SRE teams in the US and India totaling 10 engineers (2 leads, 8 senior), coordinating across US, EU, and India time zones; improved uptime from 97% to 99% across 5 platforms.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Served as interim Cybersecurity Engineering Manager, ensuring the company maintained its ISO 27001 certification: enforced compliance controls, implemented guardrails between CI/CD and infrastructure access controls, added security/vulnerability checks to the CI pipeline, and drove patching across EC2 instances, base Docker images, and Java/Go applications.',
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Built and ran tier 3 incident management; codified PagerDuty services integrated with Datadog and Jira in Terraform.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Established end-to-end observability with Datadog using a code-first approach — Terraform-managed monitors, SLOs, and synthetic testing — and set logging standards for application development; the resulting metrics enabled proactive fixes and load scaling that cut incident frequency from roughly every 48 hours to once every two weeks.',
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Containerized Java (Spring) and Go applications with Docker, deployed via Helm into EKS.',
            audiences: ['ic'],
          },
          {
            text: 'Built Lambda functions in Go and Java for API gateways and consumer services; optimized JPA-generated SQL against MySQL and Postgres.',
            audiences: ['ic'],
          },
          {
            text: 'Built AWS infrastructure with Terraform, including custom modules deployed across multiple AWS accounts.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Implemented multi-AZ architecture, primary/read-replica RDS toggling, and multi-region traffic balancing for edge locations.',
            audiences: ['ic', 'mgr'],
          },
        ],
      },
      {
        title: 'Senior DevOps Engineer',
        range: 'Jun 2021 – Oct 2021',
        achievements: [
          {
            text: 'Managed AWS infrastructure code-first with Terraform (RDS, MQ, OpenSearch, ECS, EKS, EC2, S3, etc.).',
            audiences: ['ic'],
          },
          {
            text: 'Provisioned and configured VMs (CentOS, Amazon Linux) with SaltStack and Ansible; extended SaltStack with AWS via Python.',
            audiences: ['ic'],
          },
          {
            text: 'Operated CI/CD across Bitbucket Pipelines, GitLab Pipelines, GitHub Actions, and TeamCity, deploying via Ansible and Octopus Deploy.',
            audiences: ['ic'],
          },
          {
            text: 'Built Elasticsearch clusters on EC2 with Terraform; configured master, coordinating, and data nodes with SaltStack.',
            audiences: ['ic'],
          },
          {
            text: 'Implemented testing for SaltStack states and Ansible playbooks using Docker, PyTest, Molecule, and Testinfra.',
            audiences: ['ic'],
          },
          {
            text: 'Tuned observability with Grafana, CloudWatch, Prometheus, and Stackify.',
            audiences: ['ic'],
          },
        ],
      },
    ],
  },
  {
    company: 'Green Dot Corp',
    companyRange: 'Dec 2017 – Jun 2021',
    roles: [
      {
        title: 'Site Reliability Engineering Manager',
        range: 'Feb 2021 – Jun 2021',
        achievements: [
          {
            text: 'Led a 3-engineer SRE team (1 lead, 2 senior); introduced service-level objectives and error budgets, building a reliability-oriented mindset with the product team.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Migrated .NET Core applications from VM-hosted services to Docker & Kubernetes; created Docker Compose setups for local testing and automated integration testing.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Established a tier 3 support model, reducing product-development engagement and increasing backlog productivity.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Automated application delivery with custom Windows services in Python and Go; scaled message consumers with Keda based on queue depth and CloudWatch metrics.',
            audiences: ['ic'],
          },
          {
            text: 'Automated datacenter network failover using synthetic tests.',
            audiences: ['ic', 'mgr'],
          },
        ],
      },
      {
        title: 'Software Engineering Manager',
        range: 'Apr 2019 – Feb 2021',
        achievements: [
          {
            text: 'Managed 24 engineers across multiple scrum teams in the US, India, and China (1 senior principal, 3 leads, and 20 senior and professional engineers), delivering business objectives on aggressive timelines.',
            audiences: ['mgr', 'dir'],
          },
          {
            text: 'Defined development and unit-testing best practices; introduced TDD with NUnit, NSubstitute, and Moq.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Migrated ~20 legacy Delphi and .NET Framework applications to .NET Core, deployed as Docker containers.',
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Built producer/consumer services for a distributed system using RabbitMQ, with data layers against Pervasive and MSSQL.',
            audiences: ['ic'],
          },
          {
            text: 'Established CI/CD with GitLab for Kubernetes-hosted applications.',
            audiences: ['ic', 'mgr'],
          },
        ],
      },
      {
        title: 'Senior Software Engineer',
        range: 'Dec 2017 – Apr 2019',
        achievements: [
          {
            text: 'Led a scrum team, coordinating with Product and Program managers to deliver business objectives.',
            audiences: ['ic', 'mgr'],
          },
          {
            text: 'Built and maintained ACH and taxpayer-information processing in Delphi and C# (.NET Framework); built REST APIs in C# (.NET Core) toward a service-oriented architecture.',
            audiences: ['ic'],
          },
          {
            text: 'Partnered with the infrastructure team to adopt PowerShell DSC (and later Ansible) for system provisioning.',
            audiences: ['ic'],
          },
          {
            text: 'Introduced CI/CD with TeamCity and Octopus Deploy for Windows-hosted applications, plus a local artifact repository (ProGet) with package scanning.',
            audiences: ['ic', 'mgr'],
          },
        ],
      },
    ],
  },
  {
    company: 'Lightstream',
    roles: [
      {
        title: 'Software Engineer',
        range: 'Oct 2015 – Dec 2017',
        achievements: [
          {
            text: 'Enhanced public and internal websites in C# & AngularJS; updated domain services (WCF, REST) and desktop apps (WPF, WinForms).',
            audiences: ['ic'],
          },
          {
            text: "Founding member of the company's first DevOps team; owned upgrades and administration of TeamCity and Octopus Deploy.",
            audiences: ['ic', 'mgr', 'dir'],
          },
          {
            text: 'Introduced configuration management with Puppet and PowerShell DSC; provisioned on-demand environments for performance testing.',
            audiences: ['ic'],
          },
          {
            text: 'Reduced build/test times via multi-threaded NUnit test runs.',
            audiences: ['ic'],
          },
        ],
      },
    ],
  },
]

export const earlierExperience: EarlierRole[] = [
  {
    company: 'Santa Barbara Tax Products Group',
    title: 'Lead Applications Developer / Programmer Analyst',
    range: 'Jun 2008 – Oct 2015',
    description:
      'Built and enhanced C#/.NET and Delphi financial-products systems, ACH and XML file-processing services, and co-designed the company MSSQL database.',
  },
  {
    company: 'Coleman University',
    title: 'Part-time Instructor, Java & JavaScript',
    range: 'Aug 2011 – Oct 2012',
    description: 'Taught object-oriented programming in Java and introductory JavaScript/web development.',
  },
]

export const education = {
  school: 'Coleman University',
  degree: 'B.S. Computer Information Systems',
  location: 'San Diego, CA',
}

export const interests = [
  'Martial arts (BJJ, Tai Chi, Kung Fu)',
  'Hobby development exploring new languages and technologies',
  'Video gaming (puzzle, strategy, base building)',
]
