import { defineQuestions } from './define';

export const operationalQuestions = defineQuestions('220-1102', 'operational-procedures', [
  {
    id: 'op-01',
    prompt: 'A change request describes the new mail setting but not how to undo it if mail stops flowing. What is missing?',
    choices: ['A backout plan', 'A plenum rating', 'An 80 Plus badge', 'A digitizer test'],
    correct: 0,
    explanation:
      'A backout plan is the written way to return to the last working state if the change fails. You want it before you start, not after the outage. The rest of a solid request includes the purpose, the scope, the risk, who approved it, and how the user will accept the result. Hope is not a backout plan.',
  },
  {
    id: 'op-02',
    prompt: 'A weekend change is finished. Who should confirm that the business process actually works again?',
    choices: [
      'Only the technician who made the change',
      'The affected user or business owner, as end-user acceptance',
      'The toner vendor automatically',
      'Nobody, if the lights are on',
    ],
    correct: 1,
    explanation:
      'End-user acceptance means the person who depends on the system confirms the change did what they needed. The technician can prove a service is running and still miss the real workflow. Schedule that check, especially after a weekend change, and write the answer in the ticket before you call the change closed.',
  },
  {
    id: 'op-03',
    prompt: 'Which backup type copies only what changed since the last backup of any type?',
    choices: [
      'Incremental',
      'Differential',
      'A screenshot of the desktop',
      'A RAID 1 mirror in the same PC',
    ],
    correct: 0,
    explanation:
      'An incremental backup copies changes since the last backup, whether that last one was full or incremental. A differential copies everything since the last full backup, so it grows until the next full. Restoring incrementals needs the full backup plus every incremental since it, in order. A mirror in the same PC is not a backup.',
  },
  {
    id: 'op-04',
    prompt: 'Backups run every night and have never been restored. What is the gap?',
    choices: [
      'The tapes are too new',
      'RAID is enabled',
      'The wallpaper is backed up twice',
      'A backup you have not successfully restored is unverified',
    ],
    correct: 3,
    explanation:
      'The only proof of a backup is a restore. Test restores on a schedule and after you change backup software. A job that "completed" can still hold corrupt files or skip the folder the user cares about. Write down how long the restore took so the team knows whether it fits the time they can be down.',
  },
  {
    id: 'op-05',
    prompt: 'Which statement matches the 3-2-1 backup idea?',
    choices: [
      'Three passwords, two monitors, one printer',
      'Three copies of the data, on two kinds of media, with one copy offsite',
      'Three RAID 0 arrays in the same rack',
      'Three users sharing one account',
    ],
    correct: 1,
    explanation:
      '3-2-1 means three copies, two different media types, and one copy kept offsite so a fire or theft does not take everything. The production files count as one copy. A second disk in the same PC is not the offsite copy. Cloud storage can be the offsite copy if the account is protected and you have tested a restore.',
  },
  {
    id: 'op-06',
    prompt: 'When is an anti-static wrist strap the right tool, and when should it come off?',
    choices: [
      'Wear it while handling boards; take it off before you work inside a power supply or on a CRT',
      'Wear it while the power supply is open and powered',
      'Never wear it; carpets are safer',
      'Wear it only when using a degausser on an SSD',
    ],
    correct: 0,
    explanation:
      'A wrist strap keeps you and the PC at the same potential so a static discharge does not punch a hole in a chip. Bond it to ground, and unplug the PC before you work inside. Do not wear the strap while you service high-voltage parts such as a power-supply interior or an old CRT. Those can still hold a dangerous charge.',
  },
  {
    id: 'op-07',
    prompt: 'A desktop power supply is buzzing and smells hot. A coworker wants to open the supply case with the strap on. What do you say?',
    choices: [
      'Open it and measure the capacitors by hand',
      'Wash it with water while it is plugged in',
      'Do not open a power supply; replace it',
      'Degauss it',
    ],
    correct: 2,
    explanation:
      'Power supplies store a dangerous charge even after they are unplugged, and they are not a field-repair part. Replace the supply with one of the right wattage and connectors. Do not open the case, and do not keep running a supply that smells hot. The same "do not open" rule applies to old CRT monitors.',
  },
  {
    id: 'op-08',
    prompt: 'Toner spilled on a desk. Where do you look for the safe cleanup method?',
    choices: ['The safety data sheet', 'The DHCP console', 'The BIOS boot order', 'A social media comment'],
    correct: 0,
    explanation:
      'The safety data sheet (SDS), formerly called an MSDS, describes the chemical, the hazards, and how to clean it up. Toner is a fine powder. A normal household vacuum can blow it into the air and the dust can be a fire hazard in the vacuum. Use a toner-rated vacuum or the method the SDS lists, and wash skin with cold water rather than hot.',
  },
  {
    id: 'op-09',
    prompt: 'The office wants the phone system to stay up during a short power cut. A surge strip is already installed. What else is required?',
    choices: [
      'A longer VGA cable',
      'Another surge strip daisy-chained to the first',
      'A higher wallpaper resolution',
      'A UPS, because a surge strip does not provide battery power',
    ],
    correct: 3,
    explanation:
      'A surge protector clamps voltage spikes. It does nothing when the power goes out. A UPS has a battery and can keep the phones or a server running long enough for a clean shutdown or for a generator to start. Do not daisy-chain surge strips. Size the UPS for the load and test it, because batteries age out.',
  },
  {
    id: 'op-10',
    prompt: 'A ticket about a payroll problem includes an employee full name and social security number. How should that data be handled?',
    choices: [
      'It is PII and does not belong in a casual screenshot or a personal USB drive',
      'Post it in the public lobby so the user can see it',
      'Email it to your personal account to work from home more easily',
      'It is not sensitive because it is already on a computer',
    ],
    correct: 0,
    explanation:
      'A name plus a social security number is personally identifiable information. Put only what the ticket system is approved to hold, lock the screen when you walk away, and do not copy it to a personal drive or a home email account. If the data was exposed, tell your supervisor so the company can follow its incident process.',
  },
  {
    id: 'op-11',
    prompt: 'You arrive at a user desk to fix a PC. What is the professional way to start?',
    choices: [
      'Move their chair and start clicking without a word',
      'Read their open email out loud so you understand the job',
      'Introduce yourself, ask permission, and explain what you are going to do in plain language',
      'Tell them the problem is obvious and they should already know',
    ],
    correct: 2,
    explanation:
      'Ask before you touch someone else computer, and say what you are about to do without unnecessary jargon. If you must use a technical word, explain it. Do not browse files that are not part of the problem, and do not make the user feel foolish for calling. The way you start the visit is part of the support, not a delay in front of it.',
  },
  {
    id: 'op-12',
    prompt: 'What belongs in the ticket when you close a problem?',
    choices: [
      'Only the word "fixed"',
      'The symptom, the steps you tried, and how you confirmed the resolution',
      'The user personal photos',
      'A joke about the user',
    ],
    correct: 1,
    explanation:
      'The next technician should be able to see the symptom, what you changed, and how you knew it worked. "Fixed" leaves them guessing. Leave out personal comments and any data the ticket does not need. If you promised a follow-up, write the date. Good notes are how a help desk gets faster without rushing the person in front of you.',
  },
  {
    id: 'op-13',
    prompt: 'Which file extension is a PowerShell script?',
    choices: ['.ps1', '.bat', '.sh', '.jpg'],
    correct: 0,
    explanation:
      'PowerShell scripts use .ps1. Batch files use .bat, and a Linux shell script often uses .sh. Python uses .py, and JavaScript uses .js. You run the script with the right interpreter, and you do not bypass execution policy on a work PC just to "see if it works." A .jpg is a picture, not a script.',
  },
  {
    id: 'op-14',
    prompt: 'A remote site wants command-line access to a router. Which protocol should they use?',
    choices: ['Telnet', 'HTTP on port 80 with the admin password', 'SSH', 'An open SMTP relay'],
    correct: 2,
    explanation:
      'SSH encrypts remote command-line administration. Telnet sends keystrokes, including passwords, in the clear. HTTP admin pages have the same problem unless they are HTTPS. An open mail relay is unrelated and is something you close, not a management tool. If the only option today is Telnet, use it inside a VPN and plan to turn it off.',
  },
  {
    id: 'op-15',
    prompt: 'A technician needs to see and control a Windows desktop at another site. Which tool matches that job?',
    choices: [
      'ping',
      'Remote Desktop, preferably reached through a VPN rather than an open port 3389',
      'A toner probe',
      'chkdsk',
    ],
    correct: 1,
    explanation:
      'Remote Desktop Protocol gives a graphical Windows session. The server listens on TCP 3389 by default. Leaving that port open to the internet invites password guessing, so reach it through a VPN or a remote gateway. ping only tests reachability. A toner probe traces a cable. chkdsk checks a disk.',
  },
  {
    id: 'op-16',
    prompt: 'Which items belong in a change request? Select all that apply.',
    choices: [
      'The scope of the change',
      'A backout plan',
      'Copies of the user personal photos',
      'A joke to keep the meeting short',
    ],
    correct: [0, 1],
    explanation:
      'Scope says what will change and what will not. A backout plan says how you undo it. The request should also cover why, the risk, the timing, and who approved it. Personal photos and jokes do not belong in the record. A clear request is what lets someone else support the change at 2 a.m.',
  },
  {
    id: 'op-17',
    prompt:
      'A coworker copies one retail Windows license onto a second PC to save money. Why is that a problem?',
    choices: [
      'Retail licenses can be pasted onto as many PCs as you want',
      'The second install is fine if both PCs are the same color',
      'One license does not automatically cover two installs; the EULA decides how it can be used',
      'Windows does not use licenses',
    ],
    correct: 2,
    explanation:
      'The end-user license agreement says how many installs the license allows. One retail license is not a free pass for a second PC, and an OEM license is usually tied to the device it came with. Unlicensed software is a policy and legal problem, not a clever shortcut. When in doubt, check the agreement or ask the person who owns licensing.',
  },
]);
