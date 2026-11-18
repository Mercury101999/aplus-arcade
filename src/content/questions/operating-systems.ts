import { defineQuestions } from './define';

export const operatingSystemQuestions = defineQuestions('220-1102', 'operating-systems', [
  {
    id: 'os-01',
    prompt: 'A user with Windows Home wants to join the office Active Directory domain. What is the limitation?',
    choices: [
      'Windows Home can join a domain if you turn on Bluetooth',
      'Windows Home cannot join a domain; Windows Pro can',
      'Only Windows Home can be a domain controller',
      'Domains require a laser printer',
    ],
    correct: 1,
    explanation:
      'Windows Home cannot join an Active Directory domain. Windows Pro, Enterprise, and Education can. Home also lacks Local Group Policy Editor and cannot host incoming Remote Desktop. If the job needs a domain logon, the PC needs an edition that supports it, not a setting buried in Home.',
  },
  {
    id: 'os-02',
    prompt:
      'A user opens a file through a share. The share permission is Read. The NTFS permission is Full Control. What access do they get over the network?',
    choices: [
      'Read, because the more restrictive of share and NTFS applies',
      'Full Control, because NTFS always wins',
      'No access, because the permissions disagree',
      'Full Control, but only on Sundays',
    ],
    correct: 0,
    explanation:
      'For a file opened over the network, Windows applies both the share permission and the NTFS permission, and the more restrictive one wins. Here that is Read. If the same user sits at the PC and opens the file locally, only NTFS applies, so local access could be Full Control. Check both lists when a share "looks right" but still blocks someone.',
  },
  {
    id: 'os-03',
    prompt: 'Windows system files look damaged. Which command scans and repairs protected system files?',
    choices: ['ipconfig /flushdns', 'diskpart clean', 'sfc /scannow', 'netstat -an'],
    correct: 2,
    explanation:
      'sfc /scannow runs System File Checker, which compares protected Windows files with the store and repairs ones it can. Run it from an elevated prompt. If it cannot repair a file, DISM can restore the component store, and then you run SFC again. diskpart clean erases a disk. It is not a repair.',
  },
  {
    id: 'os-04',
    prompt: 'A volume has file-system errors and folders that will not open. Which Windows tool checks the disk?',
    choices: ['chkdsk', 'hostname', 'whoami', 'gpupdate'],
    correct: 0,
    explanation:
      'chkdsk checks a volume for file-system problems. chkdsk /f fixes logical errors, and chkdsk /r also scans for bad sectors, which takes longer. It may need to run at the next boot if the volume is in use. It cannot revive a drive that is mechanically failing, so back up first if the files matter.',
  },
  {
    id: 'os-05',
    prompt: 'You changed a Group Policy setting and the PC has not picked it up. Which command refreshes policy now?',
    choices: ['gpupdate', 'ping', 'format', 'msinfo32 only shows it and does not refresh it'],
    correct: 0,
    explanation:
      'gpupdate refreshes Group Policy. gpupdate /force reapplies settings even if they do not look new. gpresult /r shows which policies actually applied and is the tool to use when a setting "should be there" but is not. A reboot also refreshes policy, but you do not have to wait for one.',
  },
  {
    id: 'os-06',
    prompt: 'A Mac user wants automatic backups of the home folder to an external disk. Which built-in feature is that?',
    choices: ['File History on macOS', 'Mission Control', 'Keychain Access', 'Time Machine'],
    correct: 3,
    explanation:
      'Time Machine is the macOS backup tool. It copies files to a destination disk and lets you restore older versions. Spotlight is the Mac search feature, Mission Control shows spaces and windows, and Keychain Access stores passwords and certificates. File History is a Windows feature, not the Mac one.',
  },
  {
    id: 'os-07',
    prompt: 'On Linux, a normal user must run one installer command with elevated rights. What is the usual way?',
    choices: [
      'Prefix the command with sudo',
      'Rename the file to .exe',
      'Run it inside Notepad',
      'Change the wallpaper',
    ],
    correct: 0,
    explanation:
      'sudo runs that one command with elevated privileges if the account is allowed to. It is not a reason to log in as root for the whole day. The user still needs to be in the sudoers policy. If sudo asks for a password, it wants that user password, not a second secret, on a typical setup.',
  },
  {
    id: 'os-08',
    prompt: 'You need to change who owns a file on Linux, not the read and write bits. Which command is that?',
    choices: ['chmod', 'chown', 'grep', 'pwd'],
    correct: 1,
    explanation:
      'chown changes the owner and can change the group. chmod changes the permission bits, such as who can read or execute. People mix them up because both start with "ch." grep searches file contents, and pwd prints the current directory. Ownership and permission are two different columns when you run ls -l.',
  },
  {
    id: 'os-09',
    prompt: 'On a Debian-based Linux PC, which command refreshes the list of available packages without installing them yet?',
    choices: ['apt update', 'apt upgrade', 'chmod 777 /', 'del user'],
    correct: 0,
    explanation:
      'apt update downloads the current package lists. apt upgrade installs the updates those lists describe. You usually run update first, then upgrade. chmod 777 makes a file writable by everyone and is not a package command. Do not use it to "fix" a permission error you have not read.',
  },
  {
    id: 'os-10',
    prompt: 'You want to find lines that contain the word "error" inside a log file. Which Linux command is the right kind of tool?',
    choices: ['find, because it searches inside file contents', 'grep', 'chown', 'ipconfig'],
    correct: 1,
    explanation:
      'grep searches the contents of files and prints matching lines. find searches for files and directories by name, size, or time. Use find to locate the log, then grep to look inside it. ipconfig is a Windows command. The Linux equivalent for addresses is ip or ifconfig.',
  },
  {
    id: 'os-11',
    prompt: 'You are installing Windows on a 4 TB disk in UEFI mode. Which partition table belongs on that disk?',
    choices: ['MBR, because it allows disks larger than 2 TB', 'APFS on a Windows PC', 'exFAT as the firmware table', 'GPT'],
    correct: 3,
    explanation:
      'GPT is the partition table used with UEFI and it supports large disks. MBR is the legacy table, with a roughly 2 TB limit and only four primary partitions. The Windows installer in UEFI mode will create a GPT disk. Mixing a legacy BIOS boot with GPT, or UEFI with MBR, is a common reason a new install will not boot.',
  },
  {
    id: 'os-12',
    prompt: 'Windows will not finish booting after a driver install. You want to start with a minimal set of drivers. Which mode is that?',
    choices: ['Safe Mode', 'Airplane mode', 'A hidden SSID', 'Num Lock'],
    correct: 0,
    explanation:
      'Safe Mode loads a minimal set of drivers and services. Use it when a bad driver, startup app, or piece of malware blocks a normal boot. From there you can roll back a driver or run a scan. It is not a permanent way to run the PC, and some devices will not work until you boot normally again.',
  },
  {
    id: 'os-13',
    prompt: 'Which statement about a 64-bit version of Windows is accurate?',
    choices: [
      'It cannot run any 32-bit applications',
      'It can run 32-bit apps and address much more than 4 GB of RAM',
      'It only runs on ARM tablets from 2012',
      'It removes the need for user accounts',
    ],
    correct: 1,
    explanation:
      'A 64-bit Windows install can run 32-bit applications and can use far more than 4 GB of RAM when the hardware has it. A 32-bit Windows install cannot run 64-bit applications and is limited to about 4 GB of RAM. Match the edition and the drivers to the bitness. A 64-bit printer driver will not load on a 32-bit OS.',
  },
  {
    id: 'os-14',
    prompt: 'A user asks where "Finder" is on their Windows 11 PC. What do you tell them?',
    choices: [
      'Finder is the Windows file manager',
      'Finder is the name of Task Manager',
      'Windows uses File Explorer; Finder is the macOS file manager',
      'Finder was replaced by the BIOS',
    ],
    correct: 2,
    explanation:
      'File Explorer is the Windows file manager. Finder is the macOS one. The jobs are similar, so users mix the names up. On Windows, Win+E opens File Explorer. On a Mac, Finder is the smiling face in the Dock. Using the right name in a ticket keeps the next technician from looking for a menu that is not there.',
  },
  {
    id: 'os-15',
    prompt: 'A Windows Home laptop needs full-volume BitLocker with the usual management tools. What is the catch?',
    choices: [
      'BitLocker is a Pro feature and is not the Home edition toolset',
      'BitLocker only encrypts email subjects',
      'BitLocker requires a laser printer',
      'BitLocker replaces the need for a password',
    ],
    correct: 0,
    explanation:
      'BitLocker is available on Windows Pro, Enterprise, and Education. Windows Home may offer a simpler device encryption on some hardware, but it is not the same management experience. BitLocker encrypts the volume so a stolen drive is not readable in another PC. It does not replace a sign-in password or a backup.',
  },
  {
    id: 'os-16',
    prompt: 'Which Windows tools help you check startup programs and system logs? Select all that apply.',
    choices: ['Task Manager', 'Event Viewer', 'Time Machine', 'Finder'],
    correct: [0, 1],
    explanation:
      'Task Manager has a Startup tab that shows what launches at sign-in, and it shows CPU, memory, and disk use. Event Viewer holds the Windows logs, including application crashes and service failures. Time Machine and Finder are macOS tools. They will not be on a Windows PC unless someone is describing the wrong operating system.',
  },
]);
