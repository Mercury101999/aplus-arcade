import { defineQuestions } from './define';

export const mobileDeviceQuestions = defineQuestions('220-1101', 'mobile-devices', [
  {
    id: 'md-01',
    prompt: 'A laptop needs more memory. Which module form factor is made for most laptops?',
    choices: ['Full-size DIMM', 'SODIMM', 'Registered ECC DIMM', 'M.2 2280'],
    correct: 1,
    explanation:
      'SODIMM is the short memory module used in laptops and many mini PCs. A full-size DIMM is for desktops. M.2 is a storage form factor, not a system-memory module, and registered ECC RAM is a server part that most laptops cannot use.',
  },
  {
    id: 'md-02',
    prompt: 'Where are a laptop Wi-Fi antennas usually placed?',
    choices: [
      'Inside the AC adapter',
      'In the display bezel',
      'On top of the battery cells',
      'Under the rubber feet',
    ],
    correct: 1,
    explanation:
      'The antennas sit in the display bezel so they are up high and away from the metal base. Their thin cables run through the hinges. When you replace a screen, those cables have to be disconnected and routed again or Wi-Fi and Bluetooth get weak.',
  },
  {
    id: 'md-03',
    prompt:
      'An older laptop uses a CCFL backlight. The desktop is barely visible. Which part supplies the high voltage that lamp needs?',
    choices: ['Digitizer', 'Inverter', 'CMOS battery', 'Trackpoint'],
    correct: 1,
    explanation:
      'A CCFL backlight needs an inverter to turn low-voltage DC into high-voltage AC. LED backlights do not use that board. A faint image means the panel is getting a picture, but the lamp is not being driven. Do not probe the inverter with your fingers: the voltage is dangerous.',
  },
  {
    id: 'md-04',
    prompt:
      'The laptop case is splitting and the trackpad sits higher than it used to. The battery looks swollen. What should you do first?',
    choices: [
      'Puncture the battery so the case lies flat',
      'Keep using it until the replacement arrives',
      'Power it off, unplug it, and replace the battery',
      'Put the laptop in a freezer overnight',
    ],
    correct: 2,
    explanation:
      'A swollen lithium-ion battery is a fire risk. Power the laptop off, disconnect the charger, and replace the battery. Do not puncture, squeeze, or keep charging it. Recycle the old pack through a battery program, not the trash.',
  },
  {
    id: 'md-05',
    prompt:
      'A phone still shows a sharp picture, but touch does not respond anywhere on the glass. Which part has most likely failed?',
    choices: ['Digitizer', 'LCD panel', 'SIM card', 'Cellular radio'],
    correct: 0,
    explanation:
      'The digitizer is the layer that senses touch. The LCD or OLED makes the image. A clear picture with dead touch points to the digitizer or its cable, not the panel that draws the pixels. A cracked glass can break one of those layers and leave the other working.',
  },
  {
    id: 'md-06',
    prompt: 'A coworker says any USB-C cable will do 10 Gbps and video output. What is the accurate reply?',
    choices: [
      'USB-C only charges and never carries data',
      'USB-C is a connector shape; speed and video depend on the port and cable version',
      'USB-C is always Thunderbolt',
      'USB-C is limited to USB 1.1',
    ],
    correct: 1,
    explanation:
      'USB-C names the oval plug, not a speed. The same shape can be USB 2.0, USB 3.x, USB4, or Thunderbolt. Video and high-speed data work only when the port, the cable, and the device all support them. Read the markings instead of guessing from the plug.',
  },
  {
    id: 'md-07',
    prompt:
      'A desk setup should add two monitors, Ethernet, and charging through one connection to a laptop. Which accessory is built for that?',
    choices: ['USB flash drive', 'Docking station', 'Bluetooth headset', 'Kensington lock'],
    correct: 1,
    explanation:
      'A docking station turns a laptop into a desk system: displays, network, USB devices, and often power through one connector. A port replicator usually only adds ports and may not charge the laptop or drive multiple displays. A cable lock secures the chassis; it does not add ports.',
  },
  {
    id: 'md-08',
    prompt: 'A phone will not join Wi-Fi. The status bar shows an airplane icon. What is the most likely cause?',
    choices: [
      'The battery is below 50 percent',
      'Airplane mode has turned the radios off',
      'NFC payments are disabled',
      'The wallpaper is too large',
    ],
    correct: 1,
    explanation:
      'Airplane mode turns off the cellular, Wi-Fi, and Bluetooth radios. You can often switch Wi-Fi back on while airplane mode stays enabled, but until you do, the phone will not join a wireless network. The battery level and NFC do not block Wi-Fi by themselves.',
  },
  {
    id: 'md-09',
    prompt:
      'A carrier asks for the number that identifies the physical handset, not the subscriber account. Which identifier is that?',
    choices: ['IMSI', 'IMEI', 'SSID', 'VLAN ID'],
    correct: 1,
    explanation:
      'The IMEI identifies the mobile device itself. The IMSI identifies the subscriber and lives with the SIM. You need the IMEI for a lost or blocked handset. An SSID is a Wi-Fi network name, and a VLAN ID is a switch setting.',
  },
  {
    id: 'md-10',
    prompt:
      'Company phones must require a PIN, allow a remote wipe, and block unapproved app stores. What is the usual way to enforce that?',
    choices: [
      'Ask each user to sign a verbal promise',
      'Enroll the phones in mobile device management',
      'Turn Bluetooth on',
      'Email the users a screenshot of the policy',
    ],
    correct: 1,
    explanation:
      'Mobile device management (MDM) pushes policy to enrolled phones and tablets: passcode rules, encryption, remote lock or wipe, and which app stores are allowed. A promise or an email does not enforce anything if the phone is lost. Bluetooth is unrelated.',
  },
  {
    id: 'md-11',
    prompt:
      'A map app is inaccurate until the user steps outside. Wi-Fi is off and there is no cellular signal. Which location source is the phone waiting on?',
    choices: ['GPS satellites', 'The office print server', 'A docking station', 'NFC tags'],
    correct: 0,
    explanation:
      'GPS needs a reasonably clear view of satellites, so it is weak indoors. Assisted GPS uses cellular or Wi-Fi data to speed up a fix. With both of those off, the phone has to wait on satellite signals alone. A printer or a dock does not provide a map position.',
  },
  {
    id: 'md-12',
    prompt: 'Which phone unlock method is the factor "something you are"?',
    choices: [
      'A six-digit PIN',
      'A swipe pattern',
      'Fingerprint or face recognition',
      'A one-time code in a text message',
    ],
    correct: 2,
    explanation:
      'Biometrics measure a body trait, so a fingerprint or a face is "something you are." A PIN or a pattern is "something you know." A text message depends on having the phone, so it is a possession factor. Many phones combine a biometric with a PIN.',
  },
  {
    id: 'md-13',
    prompt:
      'A laptop has no Wi-Fi at a job site, but the technician phone has cellular data. Which feature shares that data with the laptop?',
    choices: ['Mobile hotspot or tethering', 'Airplane mode', 'A privacy screen', 'NFC tap-to-pay'],
    correct: 0,
    explanation:
      'A hotspot or tether lets the phone share its cellular connection over Wi-Fi, USB, or Bluetooth. Airplane mode would shut the cellular radio off. A privacy screen only narrows the viewing angle, and NFC is for very short range payments or pairing, not a laptop internet link.',
  },
  {
    id: 'md-14',
    prompt:
      'A phone can place calls, but data settings are stale after a carrier change. Which update loads carrier network preferences such as a preferred roaming list?',
    choices: ['GPU driver', 'PRL or PRI update', 'Toner density reset', 'BIOS update on a desktop'],
    correct: 1,
    explanation:
      'A PRL (preferred roaming list) or PRI (product release instructions) update loads carrier-specific radio settings. It is not a general app update and it is not laptop firmware. Baseband or radio firmware is the related piece that runs the phone radios.',
  },
  {
    id: 'md-15',
    prompt:
      'Which display lights each pixel itself, can show deep black, and can keep a ghost of a static image after years of the same toolbar?',
    choices: ['OLED', 'TN LCD with a CCFL lamp', 'VGA CRT only', 'e-ink used as a projector'],
    correct: 0,
    explanation:
      'OLED pixels emit their own light, so a black pixel is actually off and contrast is high. A static status bar can age those pixels and leave burn-in. An LCD is lit by a backlight behind the pixels and does not burn in the same way. VGA is a signal type, not a phone panel.',
  },
  {
    id: 'md-16',
    prompt: 'A phone battery is visibly swollen. Which responses are appropriate? Select all that apply.',
    choices: [
      'Power the phone off',
      'Unplug the charger',
      'Puncture the pack so it fits the case',
      'Replace the battery and recycle the old one',
    ],
    correct: [0, 1, 3],
    explanation:
      'Shut the device down, remove power, and replace the swollen battery through a proper recycle path. Puncturing a lithium-ion cell can start a fire. Do not keep charging it while you wait, and do not press the case flat.',
  },
]);
