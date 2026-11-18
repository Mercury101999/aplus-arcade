export const EXAM_IDS = ['220-1101', '220-1102'] as const;

export type ExamId = (typeof EXAM_IDS)[number];

export const DOMAIN_IDS = [
  'mobile-devices',
  'networking',
  'hardware',
  'virtualization-cloud',
  'hardware-network-troubleshooting',
  'operating-systems',
  'security',
  'software-troubleshooting',
  'operational-procedures',
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

export interface Question {
  id: string;
  exam: ExamId;
  domain: DomainId;
  prompt: string;
  choices: string[];
  /** Indexes into `choices`. One index is single-choice. More than one is select-all-that-apply. */
  correct: number[];
  explanation: string;
}
