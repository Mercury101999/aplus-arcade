import type { DomainId, ExamId } from './types';

export interface ExamInfo {
  id: ExamId;
  name: string;
  title: string;
}

export interface DomainInfo {
  id: DomainId;
  exam: ExamId;
  name: string;
  summary: string;
}

export const EXAMS: Record<ExamId, ExamInfo> = {
  '220-1101': {
    id: '220-1101',
    name: 'Core 1',
    title: 'Core 1 · 220-1101',
  },
  '220-1102': {
    id: '220-1102',
    name: 'Core 2',
    title: 'Core 2 · 220-1102',
  },
};

export const DOMAIN_CATALOG: Record<DomainId, DomainInfo> = {
  'mobile-devices': {
    id: 'mobile-devices',
    exam: '220-1101',
    name: 'Mobile Devices',
    summary: 'Laptops, phones, tablets, displays, and mobile connectivity.',
  },
  networking: {
    id: 'networking',
    exam: '220-1101',
    name: 'Networking',
    summary: 'Ports, SOHO gear, Wi-Fi, and the tools that prove a path works.',
  },
  hardware: {
    id: 'hardware',
    exam: '220-1101',
    name: 'Hardware',
    summary: 'Storage, memory, motherboards, power, printers, and connectors.',
  },
  'virtualization-cloud': {
    id: 'virtualization-cloud',
    exam: '220-1101',
    name: 'Virtualization & Cloud',
    summary: 'Hypervisors, virtual machines, and cloud service models.',
  },
  'hardware-network-troubleshooting': {
    id: 'hardware-network-troubleshooting',
    exam: '220-1101',
    name: 'Hardware & Network Troubleshooting',
    summary: 'A methodical way to isolate power, storage, display, and network faults.',
  },
  'operating-systems': {
    id: 'operating-systems',
    exam: '220-1102',
    name: 'Operating Systems',
    summary: 'Windows, macOS, and Linux tasks a help desk actually touches.',
  },
  security: {
    id: 'security',
    exam: '220-1102',
    name: 'Security',
    summary: 'Physical controls, accounts, malware, and wireless hardening.',
  },
  'software-troubleshooting': {
    id: 'software-troubleshooting',
    exam: '220-1102',
    name: 'Software Troubleshooting',
    summary: 'Boot failures, bad profiles, mobile app faults, and malware removal.',
  },
  'operational-procedures': {
    id: 'operational-procedures',
    exam: '220-1102',
    name: 'Operational Procedures',
    summary: 'Change control, backups, safety, privacy, and how you treat the user.',
  },
};

export function examTitle(exam: ExamId): string {
  return EXAMS[exam].title;
}

export function domainName(domain: DomainId): string {
  return DOMAIN_CATALOG[domain].name;
}
