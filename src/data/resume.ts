// Content transcribed by hand from ../../carlos-barajas-resume.md, the
// canonical source of truth. Keep this file in sync when the resume changes.

export interface Achievement {
  text: string
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
}

export const summary =
  'Engineering leader specializing in platform engineering, developer experience, and cloud infrastructure across Azure and AWS. Proven track record building internal developer platforms (Backstage), modernizing CI/CD at scale, and driving GitOps transformations using Terraform/OpenTofu, Crossplane, ArgoCD, and Kargo. Experienced leading cross-functional, globally distributed teams and improving developer productivity through self-service tooling, observability standards, DORA metrics, and agentic AI development tools. Hands-on across Go, C#, Java, Python, and Node.js. Seeking to keep growing in a technical leadership role that blends hands-on engineering, strategic impact, and mentorship.'

export const stack = ['Go', 'C#', 'Java', 'Python', 'Node.js']

// Earliest role on the resume (Santa Barbara Tax Products Group, Jun 2008),
// used to compute a live "years in production systems" figure.
export const careerStart = new Date(2008, 5, 1)

export const skills: SkillCategory[] = [
  {
    label: 'Leadership',
    items: [
      'Team development',
      'global/cross-functional team management',
      'product roadmaps',
      'mentorship',
      'strong communication',
    ],
  },
  { label: 'Cloud', items: ['Azure', 'AWS'] },
  {
    label: 'Infrastructure as Code & Config Management',
    items: ['Terraform', 'OpenTofu', 'Crossplane', 'Ansible', 'SaltStack', 'Puppet', 'Kustomize'],
  },
  {
    label: 'Containers',
    items: ['Docker', 'Docker Compose', 'Kubernetes (EKS)', 'Helm', 'Keda'],
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
    ],
  },
  {
    label: 'Languages',
    items: ['Go', 'C#', 'Java', 'Python', 'Node.js/NestJS', 'Delphi', 'SQL'],
  },
  {
    label: 'Observability',
    items: ['Datadog', 'Dynatrace', 'Grafana', 'Prometheus', 'DORA metrics'],
  },
  {
    label: 'AI / Agentic Dev Tooling',
    items: ['GitHub Copilot', 'Codex', 'Claude Code'],
  },
  { label: 'Collaboration', items: ['Jira', 'Confluence', 'Git', 'Perforce'] },
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
            text: 'Lead Platform Engineering, supporting an internal development platform centered on cloud infrastructure automation where software teams own their own infrastructure, built on Azure APIs with Ansible and Digital.ai.',
          },
          {
            text: 'Maintain and build CI/CD pipelines across a wide range of tech stacks: C#, Node.js, Java/Spring Boot (Maven & Gradle), Python, mobile (Kotlin & Swift), and React Native.',
          },
          {
            text: 'Own the product roadmap transforming the platform from team self-managed infrastructure to a centralized, GitOps-driven model:',
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
          },
          {
            text: 'Implement observability patterns for proactive, agentic infrastructure using Dynatrace.',
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
            text: 'Led both Developer Experience and DevOps teams, supporting engineering infrastructure and developer productivity at scale.',
          },
          {
            text: "Drove implementation and deployment of an internal developer portal using Spotify's Backstage, improving service discovery, documentation, and onboarding workflows.",
          },
          {
            text: 'Partnered with cross-functional teams to reduce friction in the development lifecycle through self-service tooling, automation, and improved onboarding.',
          },
          {
            text: 'Guided engineering teams designing, deploying, and managing infrastructure on AWS and Kubernetes with an emphasis on scalability and reliability.',
          },
          {
            text: 'Standardized service deployment patterns using Kustomize and Terraform, improving consistency across environments and reducing time to production.',
          },
          {
            text: 'Enabled a shift-left infrastructure model with internal tools that let teams provision and manage resources independently.',
          },
          {
            text: 'Improved CI/CD pipelines across teams using GitHub Actions, enhancing build/test/deploy efficiency and reliability.',
          },
          {
            text: 'Supported migration of legacy workloads to containerized services using Docker and Kubernetes.',
          },
          {
            text: 'Advocated for software-driven operations by introducing observability standards and operational tooling.',
          },
          {
            text: 'Collaborated on solution design in Node.js, NestJS, and Golang, contributing architectural guidance.',
          },
        ],
      },
    ],
  },
  {
    company: 'Shell Recharge Solutions',
    companyRange: 'Jun 2021 – Jun 2024',
    roles: [
      {
        title: 'Site Reliability Engineering Manager',
        range: 'Oct 2021 – Jun 2024',
        achievements: [
          {
            text: 'Served as interim Cybersecurity Engineering Manager; implemented security controls per ISO 27001 and added security/vulnerability checks to the CI pipeline.',
          },
          {
            text: 'Applied security updates across EC2 instances, base Docker images, and Java/Go applications.',
          },
          {
            text: 'Implemented and managed incident management for tier 3 escalations; built PagerDuty services linked to Datadog and Jira via Terraform.',
          },
          { text: 'Managed teams across multiple time zones (US, EU, and India).' },
          {
            text: 'Introduced end-to-end observability with Datadog using a code-first approach — Terraform-managed monitors, SLOs, and synthetic testing — and set logging standards for application development.',
          },
          {
            text: 'Containerized Java (Spring) and Go applications with Docker, deployed via Helm into EKS.',
          },
          {
            text: 'Implemented Lambda functions in Go and Java for API gateways and consumer services; improved JPA-generated SQL against MySQL and Postgres.',
          },
          {
            text: 'Created and maintained AWS infrastructure with Terraform, including custom modules deployed across multiple AWS accounts.',
          },
          {
            text: 'Implemented multi-AZ architecture, primary/read-replica RDS toggling, and multi-region traffic balancing for edge locations.',
          },
        ],
      },
      {
        title: 'Senior DevOps Engineer',
        range: 'Jun 2021 – Oct 2021',
        achievements: [
          {
            text: 'Managed AWS infrastructure code-first with Terraform (RDS, MQ, OpenSearch, ECS, EKS, EC2, S3, etc.).',
          },
          {
            text: 'Provisioned and configured VMs (CentOS, Amazon Linux) with SaltStack and Ansible; extended SaltStack with AWS via Python.',
          },
          {
            text: 'Supported CI/CD across Bitbucket Pipelines, GitLab Pipelines, GitHub Actions, and TeamCity; deployed via Ansible and Octopus Deploy.',
          },
          {
            text: 'Built Elasticsearch clusters on EC2 with Terraform; configured master, coordinating, and data nodes with SaltStack.',
          },
          {
            text: 'Implemented testing for SaltStack states and Ansible playbooks using Docker, PyTest, Molecule, and Testinfra.',
          },
          { text: 'Tuned observability with Grafana, CloudWatch, Prometheus, and Stackify.' },
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
            text: 'Introduced service-level objectives and error budgets, driving a reliability-oriented mindset with the product team.',
          },
          {
            text: 'Migrated .NET Core applications from VM-hosted services to Docker & Kubernetes; created Docker Compose setups for local testing and automated integration testing.',
          },
          {
            text: 'Established a tier 3 support model, reducing product-development engagement and increasing backlog productivity.',
          },
          {
            text: 'Automated application delivery with custom Windows services in Python and Go; scaled message consumers with Keda based on queue depth and CloudWatch metrics.',
          },
          { text: 'Automated datacenter network failover using synthetic tests.' },
        ],
      },
      {
        title: 'Software Engineering Manager',
        range: 'Apr 2019 – Feb 2021',
        achievements: [
          {
            text: 'Managed geographically dispersed teams (US, India, China) — multiple scrum teams totaling 20+ engineers — delivering business objectives under tight deadlines.',
          },
          {
            text: 'Defined development and unit-testing best practices; introduced TDD with NUnit, NSubstitute, and Moq.',
          },
          {
            text: 'Migrated legacy Delphi and .NET Framework applications to .NET Core, deployed as Docker containers.',
          },
          {
            text: 'Implemented producer/consumer services for a distributed system using RabbitMQ; built data layers against Pervasive and MSSQL.',
          },
          { text: 'Introduced CI/CD with GitLab for Kubernetes-hosted applications.' },
        ],
      },
      {
        title: 'Senior Software Engineer',
        range: 'Dec 2017 – Apr 2019',
        achievements: [
          {
            text: 'Led a scrum team, coordinating with Product and Program managers to deliver business objectives.',
          },
          {
            text: 'Implemented and maintained ACH and taxpayer-information processing in Delphi and C# (.NET Framework); built REST APIs in C# (.NET Core) toward a service-oriented architecture.',
          },
          {
            text: 'Introduced PowerShell DSC (and later Ansible) for system provisioning with the infrastructure team.',
          },
          {
            text: 'Introduced CI/CD with TeamCity and Octopus Deploy for Windows-hosted applications, plus a local artifact repository (ProGet) with package scanning.',
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
          },
          {
            text: "Helped start the company's first DevOps team; maintained and upgraded TeamCity and Octopus Deploy.",
          },
          {
            text: 'Introduced configuration management with Puppet and PowerShell DSC; provisioned on-demand environments for performance testing.',
          },
          { text: 'Reduced build/test times via multi-threaded NUnit test runs.' },
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
      'Built and enhanced C#/.NET and Delphi financial-products systems, ACH and XML file-processing services, and helped design the company MSSQL database.',
  },
  {
    company: 'Coleman University',
    title: 'Instructor, Java & JavaScript',
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
