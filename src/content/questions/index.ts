import { hardwareQuestions } from './hardware';
import { mobileDeviceQuestions } from './mobile-devices';
import { networkingQuestions } from './networking';
import { operatingSystemQuestions } from './operating-systems';
import { operationalQuestions } from './operational-procedures';
import { securityQuestions } from './security';
import { softwareTroubleshootingQuestions } from './software-troubleshooting';
import { troubleshootingQuestions } from './troubleshooting';
import { virtualizationCloudQuestions } from './virtualization-cloud';

export const questionBank = [
  ...mobileDeviceQuestions,
  ...networkingQuestions,
  ...hardwareQuestions,
  ...virtualizationCloudQuestions,
  ...troubleshootingQuestions,
  ...operatingSystemQuestions,
  ...securityQuestions,
  ...softwareTroubleshootingQuestions,
  ...operationalQuestions,
];
