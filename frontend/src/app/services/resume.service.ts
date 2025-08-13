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

export interface Role {
  title: string;
  dates: string;
  bullets: string[];
  bolded?: string[];
}

export interface Experience {
  organization: string;
  location: string;
  roles: Role[];
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

export interface ResumeVersionData {
  id: string;
  fileName: string;
}

const dummyResumeData1: ResumeData = {
  id: '123',
  fileName: 'Jacob_Parry_Resume_8_12_2025',
  personalInfo: {
    name: 'Jacob Parry',
    summary: 'Experienced Full-Stack Engineer with a Dedicated Focus on Security',
    location: 'Eagle Mountain, UT',
    phoneNumber: '(801) 636-7388',
    emailAddress: 'parryjacob67@gmail.com',
    linkedinLink: 'linkedin.com/in/jacob-parry',
  },
  templateConfig: {
    baseFontSize: 12,
  },
  resumeSections: [
    {
      title: 'Experience',
      type: 'experience',
      experiences: [
        {
          organization: 'Stripe',
          location: 'Remote - UT',
          roles: [
            {
              title: 'Software Engineer, Secure Devices',
              dates: 'July 2025 - Present',
              bullets: [
                'Partnered with security teams (Cloud, AppSec, etc.) to build key features that enhance vulnerability tracking and management',
                'Developed weekly executive reports on key vulnerabilities and mitigation, providing company-wide risk visibility',
                'Built a NIST categorization system via LLM, providing a detailed breakdown for understanding and prioritization',
                'Automated regular security exception reviews, ensuring compliance and reducing manual effort for security engineers',
              ],
              bolded: ['Ruby, React', 'OffSec OSCC Certificaton In Progress'],
            },
            {
              title: 'Full-Stack Software Engineer, Vulnerability Management',
              dates: 'April 2024 - June 2025',
              bullets: [
                'Partnered with security teams (Cloud, AppSec, etc.) to build key features that enhance vulnerability tracking and management',
                'Developed weekly executive reports on key vulnerabilities and mitigation, providing company-wide risk visibility',
                'Built a NIST categorization system via LLM, providing a detailed breakdown for understanding and prioritization',
                'Automated regular security exception reviews, ensuring compliance and reducing manual effort for security engineers',
              ],
              bolded: ['Ruby, React'],
            },
          ],
        },
        {
          organization: 'Google',
          location: 'Chicago, IL',
          roles: [
            {
              title: 'Software Engineer, Google Search Performance',
              dates: 'May 2022 - March 2024',
              bullets: [
                '[Android, 20% project] Contributing to the development of automated security scanning tools aligned with OWASP MASVS',
                'Developed state-of-the-art performance analysis infrastructure to proactively and accurately measure performance',
                'Led integration of latency visualization and benchmarking tools, enabling 100s of daily users to improve performance',
                'Ensured product compliance with European data privacy regulations while maintaining data integrity and functionality.',
              ],
              bolded: ['C++, Java, Python, Go, Typescript'],
            },
          ],
        },
        {
          organization: 'Ontray (BYU Sandbox 01)',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Founder, Software Engineer',
              dates: 'August 2021 – December 2022',
              bullets: [
                'Developed a marketplace app enabling local home cooks to sell food to neighbors in their community',
                'Led end-to-end software development, from architecture and design to full-stack implementation of the marketplace platform',
                'Drove rapid product iteration using continuous customer feedback to validate the local home kitchen market',
                'Grew initial traction, achieving over 500 meals sold and $5,000 in earnings for home cooks on the platform',
                "Recognized as a top-performing business in Sandbox and winner of multiple university-level entrepreneurship awards",
              ],
              bolded: ['Angular, Ionic, NestJS, MySQL, Firebase, AWS'],
            },
          ],
        },
        {
          organization: 'Awardco',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Back-End Software Engineer',
              dates: 'August 2021 – March 2022',
              bullets: [
                "Integrated redemption option APIs, including a new API with Israel's largest gift card company",
                'Collaborated with a team of engineers to design and implement software that effectively addressed key business requirements',
              ],
              bolded: ['Vue, C#, ASP.NET, Azure SQL Database'],
            },
          ],
        },
      ],
    },
    {
      title: 'Education',
      type: 'experience',
      experiences: [
        {
          organization: 'Brigham Young University',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Bachelor of Computer Science',
              dates: 'September 2017 - April 2022',
              bullets: [
                'Creators Club - Sandbox Cohort 01',
                'Developers Club, Competitive Programming Club, Association for Computing Machinery (ACM), Society of Hispanic Professional Engineers (SHPE), Cybersecurity Student Association (CSA)',
              ],
            },
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

const dummyResumeData2: ResumeData = {
  id: '234',
  fileName: 'Jacob_Parry_Resume_7_13_2025',
  personalInfo: {
    name: 'Jacob Parry',
    summary: 'Experienced Full-Stack Engineer with a Dedicated Focus on Security',
    location: 'Eagle Mountain, UT',
    phoneNumber: '(801) 636-7388',
    emailAddress: 'parryjacob67@gmail.com',
    linkedinLink: 'linkedin.com/in/jacob-parry',
  },
  templateConfig: {
    baseFontSize: 12,
  },
  resumeSections: [
    {
      title: 'Experience',
      type: 'experience',
      experiences: [
        {
          organization: 'Stripe',
          location: 'Remote - UT',
          roles: [
            {
              title: 'Full-Stack Software Engineer, Vulnerability Management',
              dates: 'April 2024 - June 2025',
              bullets: [
                'Partnered with security teams (Cloud, AppSec, etc.) to build key features that enhance vulnerability tracking and management',
                'Developed weekly executive reports on key vulnerabilities and mitigation, providing company-wide risk visibility',
                'Built a NIST categorization system via LLM, providing a detailed breakdown for understanding and prioritization',
                'Automated regular security exception reviews, ensuring compliance and reducing manual effort for security engineers',
              ],
              bolded: ['Ruby, React'],
            },
          ],
        },
        {
          organization: 'Google',
          location: 'Chicago, IL',
          roles: [
            {
              title: 'Software Engineer, Google Search Performance',
              dates: 'May 2022 - March 2024',
              bullets: [
                '[Android, 20% project] Contributing to the development of automated security scanning tools aligned with OWASP MASVS',
                'Developed state-of-the-art performance analysis infrastructure to proactively and accurately measure performance',
                'Led integration of latency visualization and benchmarking tools, enabling 100s of daily users to improve performance',
                'Ensured product compliance with European data privacy regulations while maintaining data integrity and functionality.',
              ],
              bolded: ['C++, Java, Python, Go, Typescript'],
            },
          ],
        },
        {
          organization: 'Ontray (BYU Sandbox 01)',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Founder, Software Engineer',
              dates: 'August 2021 – December 2022',
              bullets: [
                'Developed a marketplace app enabling local home cooks to sell food to neighbors in their community',
                'Led end-to-end software development, from architecture and design to full-stack implementation of the marketplace platform',
                'Drove rapid product iteration using continuous customer feedback to validate the local home kitchen market',
                'Grew initial traction, achieving over 500 meals sold and $5,000 in earnings for home cooks on the platform',
                "Recognized as a top-performing business in Sandbox and winner of multiple university-level entrepreneurship awards",
              ],
              bolded: ['Angular, Ionic, NestJS, MySQL, Firebase, AWS'],
            },
          ],
        },
        {
          organization: 'Awardco',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Back-End Software Engineer',
              dates: 'August 2021 – March 2022',
              bullets: [
                "Integrated redemption option APIs, including a new API with Israel's largest gift card company",
                'Collaborated with a team of engineers to design and implement software that effectively addressed key business requirements',
              ],
              bolded: ['Vue, C#, ASP.NET, Azure SQL Database'],
            },
          ],
        },
      ],
    },
    {
      title: 'Education',
      type: 'experience',
      experiences: [
        {
          organization: 'Brigham Young University',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Bachelor of Computer Science',
              dates: 'September 2017 - April 2022',
              bullets: [
                'Creators Club - Sandbox Cohort 01',
                'Developers Club, Competitive Programming Club, Association for Computing Machinery (ACM), Society of Hispanic Professional Engineers (SHPE), Cybersecurity Student Association (CSA)',
              ],
            },
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

const dummyResumeData3: ResumeData = {
  id: '345',
  fileName: 'Jacob_Parry_Resume_6_14_2025',
  personalInfo: {
    name: 'Jacob Parry',
    summary: 'Experienced Full-Stack Engineer with a Dedicated Focus on Security',
    location: 'Eagle Mountain, UT',
    phoneNumber: '(801) 636-7388',
    emailAddress: 'parryjacob67@gmail.com',
    linkedinLink: 'linkedin.com/in/jacob-parry',
  },
  templateConfig: {
    baseFontSize: 12,
  },
  resumeSections: [
    {
      title: 'Experience',
      type: 'experience',
      experiences: [
        {
          organization: 'Google',
          location: 'Chicago, IL',
          roles: [
            {
              title: 'Software Engineer, Google Search Performance',
              dates: 'May 2022 - March 2024',
              bullets: [
                '[Android, 20% project] Contributing to the development of automated security scanning tools aligned with OWASP MASVS',
                'Developed state-of-the-art performance analysis infrastructure to proactively and accurately measure performance',
                'Led integration of latency visualization and benchmarking tools, enabling 100s of daily users to improve performance',
                'Ensured product compliance with European data privacy regulations while maintaining data integrity and functionality.',
              ],
              bolded: ['C++, Java, Python, Go, Typescript'],
            },
          ],
        },
        {
          organization: 'Ontray (BYU Sandbox 01)',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Founder, Software Engineer',
              dates: 'August 2021 – December 2022',
              bullets: [
                'Developed a marketplace app enabling local home cooks to sell food to neighbors in their community',
                'Led end-to-end software development, from architecture and design to full-stack implementation of the marketplace platform',
                'Drove rapid product iteration using continuous customer feedback to validate the local home kitchen market',
                'Grew initial traction, achieving over 500 meals sold and $5,000 in earnings for home cooks on the platform',
                "Recognized as a top-performing business in Sandbox and winner of multiple university-level entrepreneurship awards",
              ],
              bolded: ['Angular, Ionic, NestJS, MySQL, Firebase, AWS'],
            },
          ],
        },
        {
          organization: 'Awardco',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Back-End Software Engineer',
              dates: 'August 2021 – March 2022',
              bullets: [
                "Integrated redemption option APIs, including a new API with Israel's largest gift card company",
                'Collaborated with a team of engineers to design and implement software that effectively addressed key business requirements',
              ],
              bolded: ['Vue, C#, ASP.NET, Azure SQL Database'],
            },
          ],
        },
      ],
    },
    {
      title: 'Education',
      type: 'experience',
      experiences: [
        {
          organization: 'Brigham Young University',
          location: 'Provo, UT',
          roles: [
            {
              title: 'Bachelor of Computer Science',
              dates: 'September 2017 - April 2022',
              bullets: [
                'Creators Club - Sandbox Cohort 01',
                'Developers Club, Competitive Programming Club, Association for Computing Machinery (ACM), Society of Hispanic Professional Engineers (SHPE), Cybersecurity Student Association (CSA)',
              ],
            },
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

const dummyResumeVersions: ResumeVersionData[] = [
  {
    id: '123',
    fileName: 'Jacob_Parry_Resume_8_12_2025',
  },
  {
    id: '234',
    fileName: 'Jacob_Parry_Resume_7_13_2025',
  },
  {
    id: '345',
    fileName: 'Jacob_Parry_Resume_6_14_2025',
  },
];

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  resumeData = signal<ResumeData | null>(null);
  resumeVersions = signal<ResumeVersionData[]>([])

  constructor() { }

  loadResumeVersions() {
    this.resumeVersions.set(dummyResumeVersions);
  }

  loadResume(resumeID: string) {
    // TODO: Implement resume loading logic
    if (resumeID === '123') {
      this.resumeData.set(dummyResumeData1);
    } else if (resumeID === '234') {
      this.resumeData.set(dummyResumeData2);
    } else if (resumeID === '345') {
      this.resumeData.set(dummyResumeData3);
    }
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