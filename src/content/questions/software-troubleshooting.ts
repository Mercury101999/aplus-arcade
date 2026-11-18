import { defineQuestions } from './define';

export const softwareTroubleshootingQuestions = defineQuestions(
  '220-1102',
  'software-troubleshooting',
  [
    {
      id: 'sw-01',
      prompt:
        'You have confirmed that a Windows PC is running malware. What is the next step in the best-practice removal process?',
      choices: [
        'Educate the user, then leave it on the network',
        'Immediately re-enable System Restore',
        'Quarantine the system by disconnecting it from the network',
        'Pay the popup so the scan can finish',
      ],
      correct: 2,
      explanation:
        'After you verify the symptoms, quarantine the PC so it cannot spread or keep talking to an attacker. Then, on Windows, disable System Restore, remediate with updated tools and scans, schedule later scans and updates, turn System Restore back on with a new restore point, and educate the user. Paying a popup is not a step.',
    },
    {
      id: 'sw-02',
      prompt: 'Why do you disable System Restore before removing malware from Windows?',
      choices: [
        'System Restore is what encrypted the files',
        'Old restore points can contain the malware and reinfect the PC',
        'System Restore blocks all network cables physically',
        'It doubles the RAM',
      ],
      correct: 1,
      explanation:
        'Restore points can store the infection. If someone rolls back after a cleanup, the malware returns. Disable System Restore before the cleanup, then enable it again and create a fresh restore point once the system is clean. This step is specific to Windows. The rest of the removal order still applies.',
    },
    {
      id: 'sw-03',
      prompt: 'What is the last step in the malware removal best-practice process?',
      choices: [
        'Disable System Restore and leave it off forever',
        'Quarantine the PC again',
        'Hide the incident from the user',
        'Educate the end user',
      ],
      correct: 3,
      explanation:
        'The last step is teaching the user how the infection happened and how to avoid the next one. Before that, you schedule scans and updates, and on Windows you turn System Restore back on. A cleanup that the user does not understand gets repeated. Keep the lesson specific: which attachment, which prompt, which site.',
    },
    {
      id: 'sw-04',
      prompt: 'Windows hits a blue stop screen after a driver update. What is the most useful first note to take?',
      choices: [
        'The stop code, and what changed just before it',
        'The color of the case',
        'The brand of monitor',
        'The user favorite browser homepage only',
      ],
      correct: 0,
      explanation:
        'The stop code and the recent change point at the driver or update to roll back. A photo of the screen is better than a paraphrase. Then use Safe Mode, recovery, or the vendor rollback. Reinstalling Windows is a late option after you have saved the user files and tried the obvious reversal.',
    },
    {
      id: 'sw-05',
      prompt: 'A browser opens extra pages the user did not click, and a new toolbar appeared overnight. What kind of problem is that?',
      choices: [
        'A normal Windows feature update',
        'A malware symptom, often adware or a browser hijacker',
        'A failed RAM dual-channel setup',
        'A plenum cable fault',
      ],
      correct: 1,
      explanation:
        'Unwanted toolbars, a changed homepage, and redirects are classic adware or hijacker symptoms. Remove the unknown extension, scan with updated anti-malware, and check the other browsers too. Do not click the popup that offers to clean the PC for a fee. That popup is often part of the same problem.',
    },
    {
      id: 'sw-06',
      prompt: 'A PC is slow from the moment the user signs in. Task Manager shows many apps at startup and the disk is 98 percent full. What should you address first?',
      choices: [
        'Replace the CPU before you look at software',
        'Enable Telnet',
        'Free disk space and disable unneeded startup apps',
        'Change the SSID',
      ],
      correct: 2,
      explanation:
        'A full disk and a crowd of startup programs will make sign-in feel broken without any hardware failure. Clear space, then turn off startup items the user does not need. If it is still slow, look at malware and at which process is using the disk. Replacing the CPU does not fix a drive that has no room left.',
    },
    {
      id: 'sw-07',
      prompt: 'A PC says "no boot device found." The drive was working yesterday. Which checks come first?',
      choices: [
        'Whether the drive is detected, the boot order, and loose SATA or power cables',
        'The printer fuser temperature',
        'The wireless channel plan',
        'The badge reader log',
      ],
      correct: 0,
      explanation:
        'Start with detection and boot order. A USB stick left ahead of the hard drive, a loose SATA cable, or a drive that no longer appears in firmware all produce this message. If the drive is missing in firmware, suspect the cable, power, or the drive itself. Reinstalling Windows will not help a disk the firmware cannot see.',
    },
    {
      id: 'sw-08',
      prompt: 'A phone will not install an app update and warns that storage is full. What is the right first fix?',
      choices: [
        'Factory reset before you look at storage',
        'Free space by removing files or unused apps, then retry the update',
        'Degauss the phone',
        'Change the laptop BIOS password',
      ],
      correct: 1,
      explanation:
        'Updates need free space for the download and the unpack. Delete files the user can live without, or move photos off the phone, then try again. A factory reset erases the device and is a last step after a backup, not the first response to a full disk. Degaussing is not a phone repair.',
    },
    {
      id: 'sw-09',
      prompt: 'One mobile app closes as soon as it opens. Other apps work. What should you try before a factory reset?',
      choices: [
        'Replace the motherboard',
        'Drill the storage chip',
        'Update or reinstall that app, restart, and clear its cache',
        'Disable the firewall on every PC in the office',
      ],
      correct: 2,
      explanation:
        'One crashing app is usually that app, not the whole phone. Update it, restart the phone, and clear its cache. Reinstall if the cache clear is not enough. Back up before any reset that erases data. Wiping the phone to fix one app throws away contacts and photos the user may not have copied.',
    },
    {
      id: 'sw-10',
      prompt:
        'A full-screen page says the PC is infected and lists a phone number to call for a paid cleaner. The user did not install a scanner. What is this?',
      choices: [
        'Scareware, and they should close it without calling or paying',
        'A Windows update that must be paid in gift cards',
        'The official System File Checker window',
        'A SMART failure code',
      ],
      correct: 0,
      explanation:
        'Scareware imitates a security alert and pushes a payment or a phone call. Close the page, do not call, and do not download the offered cleaner. Then scan with a tool the company already trusts. Gift-card payments are a second sign that the message is a scam. Real Windows tools do not demand a prepaid card.',
    },
    {
      id: 'sw-11',
      prompt:
        'One Windows profile loads to a black desktop and crashes. A new profile on the same PC works. What does that pattern suggest?',
      choices: [
        'The power supply is too efficient',
        'The monitor cable is VGA, so profiles cannot load',
        'The RAM is ECC and refuses that user',
        'The user profile is corrupt, and data may need to be copied to a new profile',
      ],
      correct: 3,
      explanation:
        'If a new account works and the old one does not, the Windows install is mostly fine and that profile is the problem. Create a new profile, copy documents from the old profile folder, and leave the broken one until the copy is checked. Reinstalling Windows is unnecessary when a second account already proves the system boots.',
    },
    {
      id: 'sw-12',
      prompt: 'A Windows service is set to start automatically, but it stops within a few seconds. Where do you look first?',
      choices: [
        'The case color',
        'Event Viewer, the service dependencies, and the account the service uses to sign in',
        'The HDMI audio delay',
        'The plenum rating of the patch cable',
      ],
      correct: 1,
      explanation:
        'Event Viewer usually has an error from the service or from Service Control Manager. Then check that required services are running and that the logon account is not locked or using a wrong password. Starting it again without reading the error just repeats the failure. The cable jacket and the monitor cable do not stop a service.',
    },
    {
      id: 'sw-13',
      prompt: 'Users cannot sign in, and browsers warn that certificates are not valid yet. The PCs show the year as 2019. What should you correct?',
      choices: [
        'The desktop wallpaper',
        'The RAID stripe size only',
        'The date and time, then confirm they stay synced',
        'The toner density',
      ],
      correct: 2,
      explanation:
        'Kerberos sign-in and TLS certificates depend on a clock that is close to the right time. A dead CMOS battery, a wrong time zone, or a blocked time server can all leave the clock years off. Set the time, find out why it drifted, and confirm it survives a reboot. Reinstalling the browser does not fix a clock.',
    },
    {
      id: 'sw-14',
      prompt: 'Print jobs sit in the queue and nothing comes out. The printer itself is online. What is a reasonable Windows fix to try?',
      choices: [
        'Restart the Print Spooler service and clear the stuck jobs',
        'Disable the firewall on the domain controller forever',
        'Convert the disk from GPT to MBR while the user is working',
        'Turn on Telnet',
      ],
      correct: 0,
      explanation:
        'A stuck spooler holds jobs that the printer never sees. Restart the Print Spooler service and cancel the bad job. If jobs return as garbage, check the driver next. Do not reformat a disk or open Telnet because a queue is jammed. Also confirm the user is pointed at the right printer, not an offline duplicate.',
    },
    {
      id: 'sw-15',
      prompt:
        'Anti-malware removes a threat, and the same threat is back after a reboot. Scans from inside Windows do not stick. What is a reasonable next level of response?',
      choices: [
        'Ignore it, because the scan count is high',
        'Scan from a clean boot environment, or reimage from a known-good source',
        'Give the malware local admin so it stops hiding',
        'Disable all logging',
      ],
      correct: 1,
      explanation:
        'Malware that returns at boot, especially a rootkit, can load before the scanner. Boot a trusted scanner from clean media, or reimage the PC and restore data from a backup made before the infection. Giving it admin rights is the opposite of containment. After the rebuild, patch and change passwords that were typed on that PC.',
    },
    {
      id: 'sw-16',
      prompt: 'Which of these are malware symptoms? Select all that apply.',
      choices: [
        'The browser opens unfamiliar sites by itself',
        'Security software is turned off and will not stay enabled',
        'One case screw is missing',
        'The monitor cable is VGA',
      ],
      correct: [0, 1],
      explanation:
        'Redirects and security tools that will not stay on are signs the PC is being changed by software the user did not intend. A missing screw or a VGA cable can be real hardware notes, but they are not malware symptoms. Treat the software signs with the removal process: confirm, quarantine, clean, then teach the user what to watch for.',
    },
  ],
);
