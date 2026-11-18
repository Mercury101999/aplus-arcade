import { defineQuestions } from './define';

export const hardwareQuestions = defineQuestions('220-1101', 'hardware', [
  {
    id: 'hw-01',
    prompt: 'A tech says "M.2" and "NVMe" as if they are the same thing. Which statement is accurate?',
    choices: [
      'Every M.2 slot runs NVMe over PCIe',
      'M.2 is a form factor; the drive behind it can be SATA or NVMe',
      'NVMe is a type of DDR memory',
      'M.2 drives always use a Molex power plug',
    ],
    correct: 1,
    explanation:
      'M.2 describes the gumstick shape. An M.2 drive might speak SATA or it might speak NVMe over PCIe. NVMe is usually faster, but the slot has to support it. Check the motherboard manual before you buy, and do not assume the notch pattern alone tells the whole story.',
  },
  {
    id: 'hw-02',
    prompt: 'Which RAID level mirrors the same data onto two drives so the array survives one drive failure?',
    choices: ['RAID 1', 'RAID 0', 'JBOD', 'A single drive with no array'],
    correct: 0,
    explanation:
      'RAID 1 writes a copy to each drive. If one disk dies, the other still has the data. RAID 0 stripes and has no copy, so one failure loses the array. Neither RAID level replaces a backup stored somewhere else. A mirror in the same PC still dies in a fire, theft, or a bad delete.',
  },
  {
    id: 'hw-03',
    prompt: 'Why is RAID 0 a poor choice for the only copy of important files?',
    choices: [
      'It encrypts the files so the owner cannot read them',
      'It requires at least eight drives',
      'It stripes data with no redundancy, so one disk failure loses the array',
      'It can only store text files',
    ],
    correct: 2,
    explanation:
      'RAID 0 splits data across drives for speed and gives you the combined capacity, but it keeps no extra copy. Lose one disk and the stripe is gone. Use it only for data you can rebuild. For files you cannot lose, use a redundant RAID level plus a real backup.',
  },
  {
    id: 'hw-04',
    prompt: 'A server uses RAID 5 and the administrator says backups are unnecessary. What is the best response?',
    choices: [
      'Agree, because parity can undo a deleted file',
      'Agree, because RAID 5 copies data to another building',
      'Disagree: RAID is availability, not a backup',
      'Disagree only because RAID 5 cannot survive a single disk failure',
    ],
    correct: 2,
    explanation:
      'RAID 5 can survive one disk failure, which keeps the server online. It does not save you from ransomware, a bad delete, or a failed controller that writes garbage. A backup is a separate copy, preferably with a copy offsite. RAID and backup solve different problems.',
  },
  {
    id: 'hw-05',
    prompt: 'Pages from a laser printer look fine at first, but the toner rubs off the paper. Which stage is failing?',
    choices: ['Processing', 'Charging', 'Exposing', 'Fusing'],
    correct: 3,
    explanation:
      'The fuser melts toner onto the page with heat and pressure. If it is worn or not hot enough, toner smears. The usual laser order is processing, charging, exposing, developing, transferring, fusing, and cleaning. Vertical streaks are more often a drum problem than a fuser problem.',
  },
  {
    id: 'hw-06',
    prompt: 'A new toner cartridge is installed and every page comes out blank. What is a common cause?',
    choices: [
      'The fuser is too hot',
      'The sealing tape is still on the cartridge',
      'The printer is set to duplex',
      'The USB cable is a USB-C charging cable only',
    ],
    correct: 1,
    explanation:
      'New cartridges often ship with a strip of tape or a plastic lock that keeps toner in place. If you leave it on, the page stays blank. Remove it and reseat the cartridge. A failed transfer corona or an empty cartridge can also print blank pages, but the leftover seal is the first thing to check on a new install.',
  },
  {
    id: 'hw-07',
    prompt: 'A desktop has empty DDR4 slots. Will DDR5 modules work in those slots if they physically fit?',
    choices: [
      'No. DDR generations are keyed differently and are not interchangeable',
      'Yes. DDR5 is backward compatible with DDR4 slots',
      'Yes, if you update the printer driver',
      'Only on Sundays, when the memory controller downclocks',
    ],
    correct: 0,
    explanation:
      'Each DDR generation uses a different notch, voltage, and signaling. DDR5 will not run in a DDR4 slot, and you should not force it. Match the generation the motherboard lists. Speed and capacity still have to be supported, but the generation comes first.',
  },
  {
    id: 'hw-08',
    prompt: 'You are installing two identical RAM modules and want dual-channel mode. What else matters?',
    choices: [
      'They must be in the matching paired slots the manual marks',
      'They must be different sizes',
      'They must be installed in the PCIe x16 slot',
      'Dual-channel only works with ECC registered DIMMs',
    ],
    correct: 0,
    explanation:
      'Dual-channel uses two modules at once, but only if they sit in the paired slots. Motherboards usually color-code those slots, and the manual shows the order. A matched pair is the reliable choice. Putting both modules in the wrong pair of slots leaves the system in single-channel mode.',
  },
  {
    id: 'hw-09',
    prompt: 'A PC loses the date every time it is unplugged, and BIOS sometimes warns about a checksum error. What should you replace?',
    choices: ['The GPU thermal pad only', 'The SATA data cable', 'The case fan', 'The CMOS battery'],
    correct: 3,
    explanation:
      'The CMOS battery keeps firmware settings and the clock alive while the PC is unplugged. A dead coin cell causes the date to reset and can drop a checksum warning. Replace it, then recheck time, boot order, and any custom BIOS settings. The operating-system clock sync will not help if the firmware clock dies on every power loss.',
  },
  {
    id: 'hw-10',
    prompt: 'What does UEFI Secure Boot do?',
    choices: [
      'It checks that the bootloader is signed before the OS loads',
      'It encrypts every file with BitLocker by itself',
      'It raises the PSU efficiency to 80 Plus Gold',
      'It assigns the DHCP lease',
    ],
    correct: 0,
    explanation:
      'Secure Boot lets the firmware refuse an unsigned or tampered bootloader. That blocks some bootkits. It is not disk encryption. BitLocker, FileVault, or another volume encryption tool does that job, and it can be used together with Secure Boot. Turning Secure Boot off is sometimes required to boot an unsigned installer, and you turn it back on afterward.',
  },
  {
    id: 'hw-11',
    prompt: 'Which connector carries both digital video and audio to a monitor?',
    choices: ['VGA', 'HDMI', 'PS/2', 'RJ-11'],
    correct: 1,
    explanation:
      'HDMI carries digital video and audio. DisplayPort does too. VGA is analog video only, so audio needs a separate cable, and the picture gets softer as the run gets longer. PS/2 is a keyboard or mouse port. RJ-11 is a telephone plug.',
  },
  {
    id: 'hw-12',
    prompt: 'A server administrator asks for ECC memory. What is the point of ECC?',
    choices: [
      'It makes a laptop battery last longer',
      'It detects and corrects some memory bit errors',
      'It converts a SATA SSD into NVMe',
      'It replaces the need for a backup',
    ],
    correct: 1,
    explanation:
      'ECC (error-correcting code) memory can catch and fix certain single-bit errors, which matters on servers that stay up for a long time. Most desktop and laptop modules are non-ECC. The motherboard and CPU have to support ECC. It does not protect against a deleted file or a failed disk.',
  },
  {
    id: 'hw-13',
    prompt: 'A PC shuts down only when the CPU has been busy for several minutes. The case is full of dust. What is the likely cause?',
    choices: [
      'Overheating from a failed fan, dust, or dried thermal paste',
      'A wrong default gateway',
      'An expired DHCP lease',
      'A POP3 mail setting',
    ],
    correct: 0,
    explanation:
      'Thermal shutdowns show up under load. Dust, a stopped fan, or dried thermal paste stops heat from leaving the CPU. Clean the fins, confirm the fan spins, and replace the paste if temperatures stay high. A network setting would not wait for the CPU to get hot before it failed.',
  },
  {
    id: 'hw-14',
    prompt: 'Which connector supplies the main power from the power supply to a modern ATX motherboard?',
    choices: ['4-pin Molex fan only', 'SATA data', '24-pin ATX', 'RJ-45'],
    correct: 2,
    explanation:
      'The 24-pin ATX connector is the motherboard main power. The CPU usually has its own 4-pin or 8-pin cable, and a graphics card may need a PCIe power connector. An 80 Plus badge on the supply rates efficiency, not wattage. Size the wattage for the parts, and never open the supply case to "look for the problem."',
  },
  {
    id: 'hw-15',
    prompt: 'A clinic still prints multipart carbon forms. Which printer type can strike through the copies?',
    choices: ['A typical inkjet', 'An impact printer', 'A direct thermal receipt printer', 'A monochrome laser'],
    correct: 1,
    explanation:
      'Impact printers press a ribbon against the page, so they can mark carbon or multipart forms. Laser, inkjet, and direct thermal printers mark only the top sheet. Impact printers are loud and the ribbon is the consumable. They are still the right tool when a form has several layers.',
  },
  {
    id: 'hw-16',
    prompt: 'Which of these storage devices have no spinning platters? Select all that apply.',
    choices: ['SATA SSD', 'NVMe SSD', '3.5-inch hard disk drive', 'Internal DVD drive'],
    correct: [0, 1],
    explanation:
      'SSDs store data in flash memory, whether they speak SATA or NVMe. A hard disk spins magnetic platters, and a DVD drive spins a disc. No spinning media means SSDs survive bumps better and usually search files faster. They still fail, so they still need backups.',
  },
]);
