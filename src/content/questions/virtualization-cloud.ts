import { defineQuestions } from './define';

export const virtualizationCloudQuestions = defineQuestions('220-1101', 'virtualization-cloud', [
  {
    id: 'vir-01',
    prompt: 'Which hypervisor runs directly on the hardware instead of inside a desktop operating system?',
    choices: [
      'Type 2, such as a player app on Windows',
      'Type 1, also called a bare-metal hypervisor',
      'A web browser extension',
      'The printer spooler',
    ],
    correct: 1,
    explanation:
      'A Type 1 hypervisor runs on the server hardware and schedules the guest virtual machines itself. A Type 2 hypervisor is an application on a host OS, which is common on a technician laptop. Type 1 is the usual choice for a data center because there is no extra desktop OS in the middle.',
  },
  {
    id: 'vir-02',
    prompt: 'You rent a virtual machine, and you are responsible for patching its operating system. Which cloud model is that?',
    choices: ['IaaS', 'SaaS', 'A local DVD install only', 'DNS'],
    correct: 0,
    explanation:
      'Infrastructure as a service gives you the machine. You patch the OS and your apps. The provider runs the physical hosts. Platform as a service lets you deploy an app without managing the OS. Software as a service is a finished app, such as web mail, where you do not patch the server at all.',
  },
  {
    id: 'vir-03',
    prompt: 'A cloud app adds servers during a sale and removes them the next day. Which characteristic is that?',
    choices: ['Rapid elasticity', 'A local RAID 0 array', 'Thick-client imaging', 'Port forwarding'],
    correct: 0,
    explanation:
      'Rapid elasticity means capacity grows and shrinks with demand, often automatically. You are not stuck buying a server for the busiest hour of the year. It is one of the core cloud traits, along with on-demand self-service, broad network access, resource pooling, and measured service.',
  },
  {
    id: 'vir-04',
    prompt: 'The bill from a cloud provider changes every month based on CPU hours and storage used. Which trait is that?',
    choices: ['Measured service', 'A perpetual desktop license', 'WEP authentication', 'Cable management'],
    correct: 0,
    explanation:
      'Measured service, sometimes called metered use, tracks what you consume so the provider can bill for it and you can see it. It is not unlimited. A surprise bill usually means a resource was left running or a disk grew. Check the usage chart before you blame the invoice.',
  },
  {
    id: 'vir-05',
    prompt: 'Many customers share the same physical cloud hosts without seeing each other machines. What is that called?',
    choices: ['Resource pooling', 'A single-user OEM license', 'A loopback plug', 'Screen burn-in'],
    correct: 0,
    explanation:
      'Resource pooling lets the provider run many customers on shared hardware, then assign CPU, RAM, and storage as needed. Isolation is supposed to keep one tenant out of another tenant data. Pooling is why a cloud VM can move to a different host without you racking a new server.',
  },
  {
    id: 'vir-06',
    prompt: 'Users open the same cloud app from phones, laptops, and a branch-office PC. Which cloud trait is that?',
    choices: ['Broad network access', 'Dual-channel memory', 'Impact printing', 'A CMOS checksum'],
    correct: 0,
    explanation:
      'Broad network access means the service is reached over the network from different kinds of clients, not from one special terminal. You still need an account and a path that is allowed through the firewall. The trait describes how you connect. It does not mean the app is anonymous.',
  },
  {
    id: 'vir-07',
    prompt: 'An engineer provisions a new test server from a portal without filing a ticket with the hardware team. Which trait is that?',
    choices: [
      'On-demand self-service',
      'A change board that meets once a year',
      'Manual punch-down of every cable',
      'Degaussing',
    ],
    correct: 0,
    explanation:
      'On-demand self-service means a customer can provision capacity without waiting for the provider staff to rack a machine. Company policy can still require a change ticket inside your own organization. The cloud trait is about the provider not being a bottleneck, not about skipping your internal rules.',
  },
  {
    id: 'vir-08',
    prompt: 'A Type 2 hypervisor refuses to start 64-bit guests. The PC is new and has enough RAM. What should you check in firmware?',
    choices: [
      'Intel VT-x or AMD-V is enabled',
      'The printer is set to duplex',
      'WPS is enabled on the router',
      'The CMOS battery is removed',
    ],
    correct: 0,
    explanation:
      'Hardware virtualization extensions, Intel VT-x or AMD-V, must be enabled in UEFI before most hypervisors will run guests properly. The setting is sometimes off by default. Turning it on does not allocate RAM. You still have to give the guest enough memory and disk of its own.',
  },
  {
    id: 'vir-09',
    prompt: 'You want a lab VM to get its own address from the office DHCP server, just like a physical PC. Which virtual network mode is that?',
    choices: ['Host-only with no route', 'NAT behind the laptop', 'A disconnected adapter', 'Bridged'],
    correct: 3,
    explanation:
      'Bridged mode places the VM on the LAN, so DHCP can give it an address and other PCs can reach it. NAT hides the VM behind the host and is simpler for getting to the internet. Host-only keeps the VM talking to the host and not the rest of the office. Pick bridged when the VM must look like a machine on the network.',
  },
  {
    id: 'vir-10',
    prompt: 'A technician takes a VM snapshot and says the offsite backup is done. What is wrong with that claim?',
    choices: [
      'Snapshots cannot be created on a Type 1 hypervisor',
      'A snapshot is a point-in-time state on the same storage, not an offsite backup',
      'Snapshots automatically print the files',
      'A snapshot encrypts the host disk with BitLocker',
    ],
    correct: 1,
    explanation:
      'A snapshot is a quick rollback point that lives with the VM. It is useful before a risky change. It is not a second copy in another building, and a full disk can fill with old snapshots. Backups are separate copies you can restore after the original storage is gone.',
  },
  {
    id: 'vir-11',
    prompt: 'Users at a clinic run their desktop from a server in the data center. The desk only has a small client device. What is that model?',
    choices: ['VDI', 'A local thick client with no network', 'RAID 0', 'POP3'],
    correct: 0,
    explanation:
      'Virtual desktop infrastructure (VDI) runs the desktop OS on a server. The device on the desk is a client that displays it. IT can patch and lock down one image, and a stolen thin client holds less data. The network has to be reliable, because the desktop is not really local.',
  },
  {
    id: 'vir-12',
    prompt: 'Several hospitals share one cloud built for their common compliance needs. Which deployment model is that?',
    choices: ['Public cloud used by anyone', 'Community cloud', 'A single laptop hypervisor', 'Dial-up'],
    correct: 1,
    explanation:
      'A community cloud is shared by organizations with the same concern, such as hospitals or universities. A public cloud is offered to the general public. A private cloud is for one organization. A hybrid cloud connects private infrastructure to a public cloud so workloads can move between them.',
  },
  {
    id: 'vir-13',
    prompt: 'A company keeps customer data on its own servers and bursts extra web capacity to a public cloud. Which model is that?',
    choices: ['Hybrid cloud', 'Community cloud only', 'A standalone public SaaS with no private side', 'WEP'],
    correct: 0,
    explanation:
      'Hybrid cloud combines private resources you control with a public cloud. Bursting to the public side for extra capacity is a common hybrid pattern. It is not the same as a community cloud, which is shared by a group of organizations. The connection between the two sides has to be secured and monitored.',
  },
  {
    id: 'vir-14',
    prompt: 'In a public cloud, who is responsible for protecting the customer user accounts and the data they upload?',
    choices: [
      'Only the cloud provider, for every service model',
      'Nobody, because the cloud is inherently private',
      'The customer, as part of the shared responsibility model',
      'The PC motherboard vendor',
    ],
    correct: 2,
    explanation:
      'Shared responsibility splits the work. The provider secures the physical hosts and the platform. The customer secures accounts, data, and how the service is configured. The customer share is largest in IaaS and smallest in SaaS, but passwords and data classification never fully leave the customer.',
  },
  {
    id: 'vir-15',
    prompt: 'A host that used to run two VMs is now slow after six were added. What is a reasonable first check?',
    choices: [
      'Whether the host still has enough CPU and RAM for the guests',
      'The fuser temperature',
      'The laptop digitizer',
      'The toner seal',
    ],
    correct: 0,
    explanation:
      'Every running guest consumes CPU, RAM, and disk. Overcommitting a small host makes all of the guests feel slow. Check host utilization and how much is assigned to each VM before you reinstall the guests. Storage that is nearly full, especially a spinning disk, is the other common bottleneck.',
  },
  {
    id: 'vir-16',
    prompt: 'Which of these are real cloud characteristics? Select all that apply.',
    choices: [
      'Rapid elasticity',
      'Measured service',
      'You must own every physical server yourself',
      'Bandwidth and storage are always free',
    ],
    correct: [0, 1],
    explanation:
      'Rapid elasticity and measured service are core cloud traits. Owning every server yourself is the opposite of using a provider pool. Cloud capacity is metered, not automatically free. If a study card says "unlimited" without a limit or a bill, it is describing marketing, not the model.',
  },
]);
