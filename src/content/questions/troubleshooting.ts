import { defineQuestions } from './define';

export const troubleshootingQuestions = defineQuestions(
  '220-1101',
  'hardware-network-troubleshooting',
  [
    {
      id: 'tr-01',
      prompt:
        'You tested a theory of probable cause and the test confirmed it. What is the next step in the troubleshooting methodology?',
      choices: [
        'Document findings and stop, before any fix',
        'Establish a plan of action to resolve the problem and implement the solution',
        'Immediately replace the motherboard',
        'Ask the user to stop reporting symptoms',
      ],
      correct: 1,
      explanation:
        'After a theory is confirmed, you plan the fix and implement it. That step includes following vendor instructions and your company change rules. You still verify full function afterward, then document. Replacing parts at random skips the plan and can take out a working machine.',
    },
    {
      id: 'tr-02',
      prompt: 'Which step is last in the standard troubleshooting methodology?',
      choices: [
        'Establish a theory',
        'Test the theory',
        'Identify the problem',
        'Document findings, actions, and outcomes',
      ],
      correct: 3,
      explanation:
        'Documentation is the last step: what the symptom was, what you changed, and how you confirmed the fix. The order before that is identify, theorize, test, plan and implement, then verify full system functionality. Notes in the ticket are what let the next technician continue instead of starting over.',
    },
    {
      id: 'tr-03',
      prompt: 'You tested a theory and the test showed it was wrong. What should you do next?',
      choices: [
        'Establish a new theory, or escalate',
        'Implement the failed theory anyway',
        'Skip verification and close the ticket',
        'Disable the user account',
      ],
      correct: 0,
      explanation:
        'If the theory is not confirmed, you do not force that fix. Form a new theory from what you just learned, or escalate when you are outside your knowledge or authority. Escalating with your notes is a success, not a failure. Guessing a second time without using the new evidence wastes the test you already ran.',
    },
    {
      id: 'tr-04',
      prompt:
        'A wired PC cannot reach the internet. ipconfig shows 169.254.12.8 and no gateway. Which cause fits best?',
      choices: [
        'DHCP did not give the PC a lease',
        'The monitor is in power-save mode',
        'The fuser is cold',
        'Secure Boot is enabled',
      ],
      correct: 0,
      explanation:
        'An address in 169.254.0.0/16 is APIPA. Windows uses it when a DHCP server does not respond. Check the cable or Wi-Fi association, the DHCP service, and whether the scope is full. A static address in the right subnet is a temporary workaround, not proof that DHCP is healthy.',
    },
    {
      id: 'tr-05',
      prompt: 'You can ping 8.8.8.8, but you cannot ping www.example.com. What is the most likely fault?',
      choices: ['The default gateway is down', 'The Ethernet cable is unplugged', 'DNS', 'The PSU is unplugged'],
      correct: 2,
      explanation:
        'Ping to a public IP proves the PC can route to the internet. Failure only on the name means the resolver did not turn that name into an address. Check the configured DNS servers, try nslookup, and flush the local cache with ipconfig /flushdns. A dead gateway would have failed the IP ping too.',
    },
    {
      id: 'tr-06',
      prompt: 'A PC link is up, but copies are very slow and the switch logs show CRC errors. The PC is forced to full duplex and the switch port is forced to half. What is the likely cause?',
      choices: [
        'A duplex mismatch',
        'APIPA',
        'A swollen battery',
        'An incorrect POP3 port',
      ],
      correct: 0,
      explanation:
        'A duplex mismatch, full on one side and half on the other, produces a slow link and errors. Set both sides to auto, or set both to the same manual speed and duplex. Do not mix a forced setting on one end with auto on the other. A bad cable can cause CRC errors too, so replace the cable if the settings already match.',
    },
    {
      id: 'tr-07',
      prompt: 'Disk tools report that SMART has predicted a drive failure. The user can still open files. What should you do?',
      choices: [
        'Back up the data now and plan to replace the drive',
        'Ignore it until the drive starts clicking',
        'Run a degausser on the SSD',
        'Disable SMART so the warning goes away',
      ],
      correct: 0,
      explanation:
        'SMART is the drive telling you it expects to fail. Files being readable today does not make the warning optional. Copy the data off, then replace the disk. Disabling the warning does not fix the hardware. A degausser is not a repair, and it does not erase an SSD anyway.',
    },
    {
      id: 'tr-08',
      prompt: 'A desktop hard drive has started clicking, and files sometimes fail to open. What is the right handling?',
      choices: [
        'Keep rebooting until the click stops',
        'Format the drive in place and keep using it',
        'Run chkdsk in a loop overnight before any copy',
        'Power it down, replace it, and restore from backup',
      ],
      correct: 3,
      explanation:
        'A rhythmic click is a mechanical failure. More power cycles can make it worse. If the files matter and you do not have a backup, stop and consider a careful image or a recovery service instead of hours of retries. For most help-desk cases you power it down, install a new drive, and restore a backup.',
    },
    {
      id: 'tr-09',
      prompt: 'You smell something burning from a desktop that is still running. What is the first action?',
      choices: [
        'Finish the current file copy',
        'Shut it down and unplug the power cord',
        'Spray compressed air into the power supply',
        'Increase the CPU overclock',
      ],
      correct: 1,
      explanation:
        'A burning smell means stop. Shut the PC down and disconnect power so a failing supply, capacitor, or fan does not become a fire. Do not open the power supply. Let it cool, then look for a failed fan, scorched connector, or swollen capacitor. If the smell is electrical, replace the failed part instead of powering it back up to "see if it happens again."',
    },
    {
      id: 'tr-10',
      prompt: 'A PC powers on and fans spin, but the monitor stays black. Which checks belong first?',
      choices: [
        'Replace the CPU immediately',
        'Reinstall Windows from the network',
        'Monitor power, input source, cable, brightness, then the video output',
        'Degauss the SSD',
      ],
      correct: 2,
      explanation:
        'A black screen is often a display path problem: the monitor is off, the wrong input is selected, the cable is loose, or brightness is at zero. Then reseat the video cable and the graphics card, and try the onboard video port if the board has one. A faint image with the backlight dark is a different fault from no signal at all.',
    },
    {
      id: 'tr-11',
      prompt: 'A ceiling projector image is much dimmer than last year. The source looks correct. What should you check before replacing the whole projector?',
      choices: [
        'Lamp hours, eco mode, brightness, and a clogged filter',
        'The DHCP scope',
        'The mailbox IMAP setting',
        'Whether RAID 0 is enabled on the presenter laptop',
      ],
      correct: 0,
      explanation:
        'Projector lamps dim as they age, and eco mode or a dusty filter makes that worse. Check the lamp-hour counter and the brightness setting, and clean or replace the filter. Also confirm the lens cap is off and the correct input is selected. Replacing the projector is the expensive step after the lamp and the optics are ruled out.',
    },
    {
      id: 'tr-12',
      prompt: 'A laser printer leaves repeating vertical streaks down every page. What is the usual cause?',
      choices: [
        'The DHCP lease expired',
        'A damaged drum or a dirty roller',
        'WPA3 is disabled',
        'The PC subnet mask is /8',
      ],
      correct: 1,
      explanation:
        'Repeating marks that match the circumference of a roller usually come from a scratched drum or something stuck on a roller. Toner that rubs off is more often the fuser. Try a known-good cartridge if the drum is part of it. Network settings do not draw a line down the page.',
    },
    {
      id: 'tr-13',
      prompt: 'Two PCs on the same subnet randomly lose the network, and Windows warns about a duplicate IP. What is happening?',
      choices: [
        'The monitor refresh rate is too high',
        'Both PCs are using HDMI audio',
        'Two hosts are configured with the same IP address',
        'The fuser is overheating',
      ],
      correct: 2,
      explanation:
        'An IP conflict means two devices are claiming one address, so traffic lands on the wrong host and both connections flap. It often happens when a static address sits inside the DHCP pool. Move the static address outside the pool, or create a DHCP reservation tied to the device MAC address.',
    },
    {
      id: 'tr-14',
      prompt: 'A desktop beeps several times and never shows video. You do not have the beep-code chart memorized. What is a sound first hardware check?',
      choices: [
        'Power off, unplug, and reseat the RAM, then look up the BIOS vendor beep code',
        'Reinstall the mail client',
        'Change the SSID',
        'Enable Telnet',
      ],
      correct: 0,
      explanation:
        'POST beep codes mean a hardware fault, and the pattern depends on the BIOS vendor. Memory seating is a common, safe first check: power off, unplug, reseat the modules, and try one module at a time. Then use that vendor chart instead of guessing that every beep means the same part.',
    },
    {
      id: 'tr-15',
      prompt: 'You need to find which unlabeled cable in a full closet goes to one wall jack. Which tool is made for that?',
      choices: [
        'A loopback plug',
        'nslookup',
        'A toner probe',
        'A multimeter set to measure a coin cell only',
      ],
      correct: 2,
      explanation:
        'A tone generator on one end and a probe at the closet let you hear which cable is which. A cable tester checks whether the pairs are wired in the right order. A loopback plug bounces a signal back at a port so you can test the port itself. nslookup asks DNS a question and does not trace a cable.',
    },
    {
      id: 'tr-16',
      prompt: 'Which findings point to a DHCP failure on a PC? Select all that apply.',
      choices: [
        'The address is in 169.254.0.0/16',
        'DHCP is enabled and no default gateway was learned',
        'Ping to 127.0.0.1 fails',
        'The keyboard is wireless',
      ],
      correct: [0, 1],
      explanation:
        'APIPA and a missing gateway, while DHCP is turned on, mean the lease never arrived. A failed ping to 127.0.0.1 means the local TCP/IP stack is broken, which is a host problem, not a DHCP server problem. A wireless keyboard does not say anything about the address lease.',
    },
  ],
);
