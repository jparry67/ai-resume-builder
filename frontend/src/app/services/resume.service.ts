import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PersonalInfo {
  name: string;
  summary: string;
  location: string;
  phoneNumber: string;
  emailAddress: string;
  linkedinLink: string;
}

export interface Experience {
  organization: string;
  dates: string;
  title: string;
  location: string;
  bullets: string[];
  bolded?: string[];
}

export type ResumeSection = {
  title: string;
  type: 'experience';
  experiences: Experience[];
} | {
  title: string;
  type: 'bullet';
  bullets: string[];
}

export interface TemplateConfig {
  baseFontSize: number;
}

export interface ResumeData {
  id: string;
  fileName: string;
  personalInfo: PersonalInfo;
  resumeSections: ResumeSection[];
  templateConfig: TemplateConfig;
}

const dummyResumeData: ResumeData = {
  id: '123',
  fileName: 'Jaocb_Parry_Resume',
  personalInfo: {
    name: 'Jacob Parry',
    summary: 'Experienced Full-Stack Engineer with a Dedicated Focus on Security',
    location: 'Eagle Mountain, UT',
    phoneNumber: '(801) 636-7388',
    emailAddress: 'parryjacob67@gmail.com',
    linkedinLink: 'linkedin.com/in/jacob-parry',
  },
  templateConfig: {
    baseFontSize: 14,
  },
  resumeSections: [
    {
      title: 'Experience',
      type: 'experience',
      experiences: [
        {
          organization: 'Stripe (Vulnerability Management)',
          dates: 'April 2024 - Present',
          title: 'Full-Stack Software Engineer',
          location: 'Remote - UT',
          bullets: [
            'Partnered with security teams (Cloud, AppSec, etc.) to build key features that enhance vulnerability tracking and management',
            'Developed weekly executive reports on key vulnerabilities and mitigation, providing company-wide risk visibility',
            'Built a NIST categorization system via LLM, providing a detailed breakdown for understanding and prioritization',
            'Automated regular security exception reviews, ensuring compliance and reducing manual effort for security engineers',
          ],
          bolded: ['Ruby, React', 'OffSec OSCC Certificaton In Progress'],
        },
        {
          organization: 'Google (Google Search Performance)',
          dates: 'May 2022 - March 2024',
          title: 'Software Engineer',
          location: 'Chicago, IL',
          bullets: [
            '[Android, 20% project] Contributing to the development of automated security scanning tools aligned with OWASP MASVS',
            'Developed state-of-the-art performance analysis infrastructure to proactively and accurately measure performance',
            'Led integration of latency visualization and benchmarking tools, enabling 100s of daily users to improve performance',
            'Ensured product compliance with European data privacy regulations while maintaining data integrity and functionality.',
          ],
          bolded: ['C++, Java, Python, Go, Typescript'],
        },
        {
          organization: 'Ontray (BYU Sandbox 01)',
          dates: 'August 2021 – December 2022',
          title: 'Founder, Software Engineer',
          location: 'Provo, UT',
          bullets: [
            'Developed a marketplace app enabling local home cooks to sell food to neighbors in their community',
            'Led end-to-end software development, from architecture and design to full-stack implementation of the marketplace platform',
            'Drove rapid product iteration using continuous customer feedback to validate the local home kitchen market',
            'Grew initial traction, achieving over 500 meals sold and $5,000 in earnings for home cooks on the platform',
            "Recognized as a top-performing business in Sandbox and winner of multiple university-level entrepreneurship awards",
          ],
          bolded: ['Angular, Ionic, NestJS, MySQL, Firebase, AWS'],
        },
        {
          organization: 'Awardco',
          dates: 'August 2021 – March 2022',
          title: 'Back-End Software Engineer',
          bullets: [
            "Integrated redemption option APIs, including a new API with Israel's largest gift card company",
            'Collaborated with a team of engineers to design and implement software that effectively addressed key business requirements',
          ],
          bolded: ['Vue, C#, ASP.NET, Azure SQL Database'],
          location: 'Provo, UT'
        },
      ],
    },
    {
      title: 'Education',
      type: 'experience',
      experiences: [
        {
          organization: 'Brigham Young University',
          dates: 'September 2017 - April 2022',
          title: 'Bachelor of Computer Science',
          location: 'Provo, UT',
          bullets: [
            'Creators Club - Sandbox Cohort 01',
            'Developers Club, Competitive Programming Club, Association for Computing Machinery (ACM), Society of Hispanic Professional Engineers (SHPE), Cybersecurity Student Association (CSA)',
          ],
        },
      ],
    },
    {
      title: 'Skills',
      type: 'bullet',
      bullets: [
        '<b>Programming Languages</b>: JavaScript, TypeScript, Python, Go, Ruby',
        '<b>Front End Frameworks</b>: React, Angular, Vue, Ionic',
        '<b>Back End Frameworks</b>: NestJS, Express',
        '<b>Databases</b>: MySQL, AWS RDS, MongoDB, AWS DynamoDB',
        '<b>Cloud Platforms</b>: AWS, Firebase',
        '<b>Security Certifications</b>: OffSec OSCC (In Progress)',
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  resumeData = signal<ResumeData | null>(null);

  constructor() { }

  loadResume(resumeID: string) {
    // TODO: Implement resume loading logic
    this.resumeData.set(dummyResumeData);
  }

  updateResume(resumeData: ResumeData) {
    // TODO: update resume in database
    this.resumeData.set(resumeData);
  }

  createResume(resumeData: ResumeData) {
    // TODO: Create resume in database
    this.resumeData.set(resumeData);
  }
} 