import { defineQuestions } from './define';

export const securityQuestions = defineQuestions('220-1102', 'security', [
  {
    id: 'sec-01',
    prompt:
      'A building entrance has two doors with a small room between them, and the second door will not open until the first door closes. What is that control?',
    choices: ['A bollard', 'A cable lock', 'An access control vestibule', 'A privacy filter'],
    correct: 2,
    explanation:
      'An access control vestibule is a two-door entry that holds a person between doors so staff can confirm who they are. Older notes call this a mantrap. A bollard is a post that stops a vehicle. A cable lock secures a laptop chassis. A privacy filter narrows a screen viewing angle.',
  },
  {
    id: 'sec-02',
    prompt:
      'A stranger follows you through the badge door without badging, and you did not invite them. What is that called?',
    choices: ['Shoulder surfing', 'Tailgating', 'Vishing', 'Degaussing'],
    correct: 1,
    explanation:
      'Tailgating is following an authorized person through a door without permission. Piggybacking is the related case where the authorized person knowingly holds the door. Both skip the badge check. The polite response is to send the person back to the desk, not to hold the door because it feels rude to refuse.',
  },
  {
    id: 'sec-03',
    prompt: 'A login requires a password and a fingerprint. Which factors are those?',
    choices: [
      'Something you know and something you are',
      'Two copies of something you know',
      'Something you have, twice',
      'A biometric and another biometric only',
    ],
    correct: 0,
    explanation:
      'A password is something you know. A fingerprint is something you are. Using both is multi-factor authentication. A phone authenticator app or a hardware token is something you have. Two passwords are still one factor, just asked twice. MFA is stronger because stealing one factor is not enough.',
  },
  {
    id: 'sec-04',
    prompt: 'Help-desk accounts are all members of Domain Admins so tickets get closed faster. What principle does that break?',
    choices: ['Least privilege', 'Open SSID design', 'Dual-channel memory', 'Plenum rating'],
    correct: 0,
    explanation:
      'Least privilege means an account gets only the access the job needs. A help-desk tech who can reset passwords does not need to own the domain. Extra admin rights turn one phished mailbox into a forest-wide incident. Give the specific rights the procedure needs, and use a separate admin account for those moments.',
  },
  {
    id: 'sec-05',
    prompt:
      'A caller claims to be from the bank and asks a user to read back a one-time code. The user did not start this call. What kind of attack is that?',
    choices: ['Smishing', 'Vishing', 'A brute-force attack on the badge reader', 'A RAID rebuild'],
    correct: 1,
    explanation:
      'Vishing is phishing by voice. Smishing is the same trick over text messages. Email phishing uses a message and a link. The user should hang up and call the bank on a number from the card or the official site, not a number the caller gives. A one-time code is as good as a password once it is read aloud.',
  },
  {
    id: 'sec-06',
    prompt:
      'A wireless network appears with the same name as the company SSID, but it is not one of your access points. What is that?',
    choices: ['An evil twin', 'A plenum jacket', 'A GPT disk', 'A fuser error'],
    correct: 0,
    explanation:
      'An evil twin is a rogue access point using a trusted SSID so clients connect and the attacker can watch traffic. Users should use the company wireless profile, and guests should use the guest network. Hiding the real SSID does not stop this. 802.1X with certificates makes the fake access point much harder to impersonate.',
  },
  {
    id: 'sec-07',
    prompt: 'Why should WPS be turned off on a small-office wireless router?',
    choices: [
      'WPS is required for WPA3 and must stay on',
      'WPS makes the 5 GHz band illegal',
      'The WPS PIN method is weak and is often left open to guessing',
      'WPS disables the DHCP server permanently',
    ],
    correct: 2,
    explanation:
      'Wi-Fi Protected Setup was meant to make joining easy, especially with a PIN. That PIN can be guessed, so an attacker can learn the Wi-Fi password. Turn WPS off and give users the WPA2 or WPA3 passphrase through a normal channel. A push-button is more convenient than a PIN, and it is still something you disable when you do not need it.',
  },
  {
    id: 'sec-08',
    prompt: 'A PC shows a note that files are encrypted and payment will unlock them. What is the best first response?',
    choices: [
      'Pay immediately from the company card',
      'Disconnect the PC from the network and start the incident process, including a clean backup',
      'Email the note to the whole company as a joke',
      'Run Disk Cleanup and ignore it',
    ],
    correct: 1,
    explanation:
      'This is ransomware. Isolate the PC so it cannot encrypt mapped drives and other PCs. Do not pay as the first plan. Payment does not guarantee a key, and it marks the company as a target. Restore from a backup that was not online and reachable by the malware, and follow the company incident process.',
  },
  {
    id: 'sec-09',
    prompt: 'You need to destroy data on an SSD before the drive is retired. Why is degaussing the wrong tool?',
    choices: [
      'Degaussing only works on paper',
      'Degaussing will make the SSD faster',
      'SSDs are already encrypted by VGA',
      'Degaussing erases magnetic media, and an SSD does not store data that way',
    ],
    correct: 3,
    explanation:
      'A degausser scrambles magnetic domains, so it can destroy hard disks and tapes. An SSD stores charge in flash cells, so a magnet does not erase it. Use the vendor secure-erase command, crypto-erase if the drive was encrypted, or physical destruction. A quick format only removes the pointers and leaves the data recoverable.',
  },
  {
    id: 'sec-10',
    prompt: 'A user wants one spreadsheet encrypted, not the whole drive. Which Windows feature matches that request?',
    choices: ['EFS', 'BitLocker on the whole volume', 'A screensaver', 'NTFS compression'],
    correct: 0,
    explanation:
      'Encrypting File System (EFS) encrypts individual files and folders and is tied to the user certificate. BitLocker encrypts the volume, which protects a stolen disk even if someone moves it to another PC. They solve different problems. EFS will not help if the user account is compromised, because Windows decrypts the file for that user when they sign in.',
  },
  {
    id: 'sec-11',
    prompt: 'People walking behind a user can read the password as it is typed. What is the attack, and what physical control helps?',
    choices: [
      'Tailgating, stopped by a bollard',
      'Smishing, stopped by a toner vacuum',
      'Shoulder surfing, reduced by a privacy filter and by sitting with the screen out of the aisle',
      'An evil twin, stopped by a cable lock',
    ],
    correct: 2,
    explanation:
      'Shoulder surfing is watching a screen or a keypad. A privacy filter narrows the angle where the picture is visible, and desk placement matters too. It does not encrypt anything. Teach users to cover a PIN pad. A cable lock stops theft of the laptop, not someone reading over a shoulder.',
  },
  {
    id: 'sec-12',
    prompt: 'Attackers are using a flaw that the software vendor has not patched yet. What is that flaw called?',
    choices: ['An open license', 'A zero-day', 'A plenum rating', 'A differential backup'],
    correct: 1,
    explanation:
      'A zero-day is a vulnerability that is being exploited before the vendor has a patch, so there have been zero days of a fix. You reduce damage with least privilege, network limits, and detection, then patch as soon as a fix exists. End-of-life software never gets that fix, which is why it should leave the network.',
  },
  {
    id: 'sec-13',
    prompt: 'A program asks Windows for administrator rights and a dimmed prompt appears. What is that prompt?',
    choices: [
      'User Account Control',
      'The BIOS splash that cannot be skipped',
      'A DHCP discover',
      'A SMART prediction',
    ],
    correct: 0,
    explanation:
      'User Account Control (UAC) asks for approval before a program makes an administrative change. Users should read it, not click Yes out of habit. It is not a virus scan. If a prompt appears when they did not launch anything, they should cancel and tell the help desk. Turning UAC off removes that pause.',
  },
  {
    id: 'sec-14',
    prompt: 'A user wants to block unsolicited inbound connections on a Windows laptop. Which control does that job?',
    choices: [
      'Windows Defender Firewall',
      'A desktop wallpaper policy',
      'chkdsk',
      'The monitor brightness slider',
    ],
    correct: 0,
    explanation:
      'A firewall filters network traffic and can block inbound connections the PC did not ask for. Antivirus scans files and programs for malware. They are different tools, and Windows includes both. A firewall does not decide whether a downloaded installer is trustworthy. That is the scanner and the user decision.',
  },
  {
    id: 'sec-15',
    prompt: 'A drive may be evidence in an investigation. What record shows who had it, and when, from collection through storage?',
    choices: ['A DHCP lease', 'Chain of custody', 'An 80 Plus sticker', 'A playlist'],
    correct: 1,
    explanation:
      'Chain of custody is the written history of evidence: who collected it, who held it, when it moved, and where it was stored. Gaps make the evidence easier to challenge. Do not power a suspect drive on and browse it. Follow the company process, label it, and keep the log with the item.',
  },
  {
    id: 'sec-16',
    prompt: 'Which of these are physical security controls? Select all that apply.',
    choices: ['Badge reader', 'Bollards', 'WPA3', 'An email content filter'],
    correct: [0, 1],
    explanation:
      'A badge reader and bollards are physical controls. The reader decides who can open a door, and bollards stop a vehicle from reaching the door. WPA3 is wireless encryption, and an email filter is a logical control on messages. Physical and logical controls stack. Neither one replaces the other.',
  },
]);
