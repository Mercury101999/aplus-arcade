import { defineQuestions } from './define';

export const networkingQuestions = defineQuestions('220-1101', 'networking', [
  {
    id: 'net-01',
    prompt: 'Which port does HTTPS use?',
    choices: ['TCP 23', 'TCP 80', 'TCP 443', 'UDP 69'],
    correct: 2,
    explanation:
      'HTTPS is HTTP wrapped in TLS, and it uses TCP port 443. Plain HTTP uses TCP 80. Telnet uses TCP 23, and TFTP uses UDP 69. If a browser cannot reach a secure site, a firewall rule blocking 443 is one thing to check.',
  },
  {
    id: 'net-02',
    prompt: 'Why is SSH preferred over Telnet for remote command-line administration?',
    choices: [
      'SSH encrypts the session, including the password',
      'SSH uses less bandwidth because it sends the screen as pictures',
      'Telnet is encrypted and SSH is not',
      'SSH can only transfer files and cannot open a shell',
    ],
    correct: 0,
    explanation:
      'SSH (TCP 22) encrypts the whole session, so the password and commands are not sent in the clear. Telnet (TCP 23) is plaintext and should not be used on a modern network. File transfer over SSH is a separate feature (SFTP); the main win here is the encrypted shell.',
  },
  {
    id: 'net-03',
    prompt: 'What is the correct order of a normal DHCP lease handshake?',
    choices: [
      'Acknowledge, Request, Offer, Discover',
      'Discover, Offer, Request, Acknowledge',
      'Request, Discover, Acknowledge, Offer',
      'Offer, Discover, Acknowledge, Request',
    ],
    correct: 1,
    explanation:
      'A client Discovers a server with a broadcast, the server Offers an address, the client Requests that offer, and the server Acknowledges the lease. People remember it as DORA. If the handshake never finishes, the client often falls back to an APIPA address.',
  },
  {
    id: 'net-04',
    prompt: 'A Windows PC has the address 169.254.20.15 and no default gateway. What does that address mean?',
    choices: [
      'The PC has a public address assigned by the ISP',
      'DNS has authenticated the user',
      'The NIC is running at 169 Mbps',
      'The PC did not get a DHCP lease and used APIPA',
    ],
    correct: 3,
    explanation:
      '169.254.0.0/16 is the link-local APIPA range Windows uses when DHCP does not answer. The PC can only talk to other APIPA hosts on the same link. It will not reach the internet until DHCP works or someone sets a correct static address.',
  },
  {
    id: 'net-05',
    prompt: 'Which DNS record maps a hostname to an IPv6 address?',
    choices: ['A', 'AAAA', 'MX', 'CNAME'],
    correct: 1,
    explanation:
      'An A record maps a name to an IPv4 address. An AAAA record maps a name to an IPv6 address. MX points at mail servers, and a CNAME is an alias to another name. If a site loads on IPv4 but not IPv6, the missing or wrong AAAA record is a place to look.',
  },
  {
    id: 'net-06',
    prompt: 'Which device forwards frames between ports on the same local network using MAC addresses?',
    choices: ['Router', 'Firewall only', 'Switch', 'Cable modem'],
    correct: 2,
    explanation:
      'A switch forwards Ethernet frames inside a LAN based on MAC addresses. A router forwards packets between different networks using IP addresses. A cable modem converts the ISP signal; it is not the device that builds the office LAN. Many home "routers" contain a switch, a router, and a wireless access point in one box.',
  },
  {
    id: 'net-07',
    prompt: 'Which statement about 802.11ac is accurate?',
    choices: [
      'It is Wi-Fi 6 and works only on 2.4 GHz',
      'It is Wi-Fi 5 and operates on 5 GHz',
      'It is the original 2 Mbps DSSS standard',
      'It requires a fiber uplink to the access point',
    ],
    correct: 1,
    explanation:
      '802.11ac is Wi-Fi 5 and uses the 5 GHz band. 802.11ax is Wi-Fi 6 and can use 2.4 GHz and 5 GHz. 802.11n (Wi-Fi 4) can use both bands. The band matters because 5 GHz is usually faster and more crowded with its own channels, while 2.4 GHz travels farther and hits more interference.',
  },
  {
    id: 'net-08',
    prompt: 'Which personal Wi-Fi security choice is the strongest of these options?',
    choices: ['WEP with a short key', 'WPA3-Personal using SAE', 'Open network with hidden SSID', 'WPS left enabled'],
    correct: 1,
    explanation:
      'WPA3-Personal uses SAE, which resists the offline password guessing that hurts older handshakes. WEP is obsolete. Hiding the SSID does not encrypt anything, and WPS has well-known PIN weaknesses. If older clients cannot do WPA3, WPA2-AES is the fallback, not WEP or TKIP.',
  },
  {
    id: 'net-09',
    prompt: 'Which 2.4 GHz channel set is the usual non-overlapping plan?',
    choices: ['1, 2, and 3', '2, 4, and 6', '1, 6, and 11', '11, 12, and 13 only'],
    correct: 2,
    explanation:
      'Channels 1, 6, and 11 do not overlap in the 2.4 GHz band used in most regions. Putting two access points on channel 1 and channel 2 does not separate them; their signals still collide. 5 GHz has many more non-overlapping channels, which is one reason it handles density better.',
  },
  {
    id: 'net-10',
    prompt: 'A cable run goes through the open space above a drop ceiling that is used for air return. Which cable rating belongs there?',
    choices: ['Plenum', 'Unrated patch cable', 'Outdoor direct-burial only', 'Flat telephone satin cord'],
    correct: 0,
    explanation:
      'Plenum cable is jacketed so it produces less smoke and toxic fume if it burns in an air-handling space. Ordinary PVC patch cable does not meet that rating. The inspector cares about the jacket, not just the category number. Riser cable is for vertical shafts between floors, which is a different space.',
  },
  {
    id: 'net-11',
    prompt: 'On Windows, which command shows the PC IP address, subnet mask, and default gateway?',
    choices: ['chkdsk', 'gpupdate', 'sfc', 'ipconfig'],
    correct: 3,
    explanation:
      'ipconfig shows the current IPv4 and IPv6 configuration. ipconfig /all adds the MAC address and DHCP server. ipconfig /release and /renew restart a DHCP lease, and ipconfig /flushdns clears the local resolver cache. chkdsk, gpupdate, and sfc solve disk and Windows-policy problems, not "what is my IP?"',
  },
  {
    id: 'net-12',
    prompt: 'Which address is a private IPv4 address that should be used inside a LAN?',
    choices: ['192.168.1.25', '8.8.8.8', '1.1.1.1', '203.0.113.10 is always private'],
    correct: 0,
    explanation:
      'The private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. 192.168.1.25 sits in that last range. 8.8.8.8 and 1.1.1.1 are public DNS services. 203.0.113.0/24 is a documentation range, not the private LAN space you assign at home or in a small office.',
  },
  {
    id: 'net-13',
    prompt: 'An access point is mounted on a ceiling with no nearby power outlet, but an Ethernet run is already there. Which technology powers it over that cable?',
    choices: ['PoE', 'PLC tone generator', 'NAT', 'VLAN tagging alone'],
    correct: 0,
    explanation:
      'Power over Ethernet (PoE) sends DC power along with data so a phone, camera, or access point can live where there is no outlet. The switch or an injector has to supply the power, and the device has to accept the right 802.3af, 802.3at, or 802.3bt level. A VLAN only separates traffic. It does not feed power.',
  },
  {
    id: 'net-14',
    prompt:
      'Users can reach servers on their own subnet, but nothing beyond it. Their static IP and mask look right. Which setting is the most likely mistake?',
    choices: [
      'The screen brightness',
      'The default gateway',
      'The number of USB ports',
      'The printer duplex setting',
    ],
    correct: 1,
    explanation:
      'The default gateway is the router that forwards traffic off the local subnet. A wrong or missing gateway leaves local ARP and local servers working while the internet and other subnets fail. DNS can cause a similar "names do not work" symptom, but if IP addresses beyond the subnet also fail, check the gateway first.',
  },
  {
    id: 'net-15',
    prompt: 'You are setting up a new small-office wireless router. Which change set is the right first pass?',
    choices: [
      'Change the admin password, update firmware, use WPA2 or WPA3, and disable WPS',
      'Leave the default admin password so you do not forget it',
      'Enable WEP so old devices are comfortable',
      'Hide the SSID and leave the network open',
    ],
    correct: 0,
    explanation:
      'Default admin passwords are published, so change them and update the firmware. Encrypt with WPA2-AES or WPA3, and turn WPS off. Hiding the SSID is not encryption. Write the new admin password in the team password manager, not on a sticky note under the router.',
  },
  {
    id: 'net-16',
    prompt: 'Which of these services encrypt the traffic by default? Select all that apply.',
    choices: ['SSH', 'Telnet', 'HTTPS', 'HTTP'],
    correct: [0, 2],
    explanation:
      'SSH and HTTPS encrypt their sessions. Telnet and HTTP send everything in plaintext, including passwords typed into them. When a protocol has a secure and an insecure version, prefer the secure port: 22 instead of 23, and 443 instead of 80.',
  },
]);
