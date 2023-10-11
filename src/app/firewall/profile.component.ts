import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { ApiService } from '../../api/api.service'
import { MessageService } from 'primeng/api'

const presetOptions = [
  { label: 'Custom Rule', value: 'custom' },
  ...[
    {
      label: 'HTTP',
      value: 'http',
    },
    {
      label: 'HTTPS',
      value: 'https',
    },
    {
      label: 'HTTP (UDP)',
      value: 'http-udp',
    },
    {
      label: 'HTTPS (UDP)',
      value: 'https-udp',
    },
    {
      label: 'FTP',
      value: 'ftp',
    },
    {
      label: 'NTP',
      value: 'ntp',
    },
    {
      label: 'POP3',
      value: 'pop3',
    },
    {
      label: 'SIP',
      value: 'sip',
    },
    {
      label: 'SMTP',
      value: 'smtp',
    },
    {
      label: 'SNMP',
      value: 'snmp',
    },
    {
      label: 'SSH',
      value: 'ssh',
    },
    {
      label: 'TELNET',
      value: 'telnet',
    },
  ].sort((a, b) => a.label.localeCompare(b.label)),
]
const protocolOptions = [
  { label: 'ANY', value: null },
  ...[
    { label: 'IP', value: 0 },
    { label: 'ICMP', value: 1 },
    { label: 'IGMP', value: 2 },
    { label: 'GGP', value: 3 },
    { label: 'IP-ENCAP', value: 4 },
    { label: 'ST2', value: 5 },
    { label: 'TCP', value: 6 },
    { label: 'CBT', value: 7 },
    { label: 'EGP', value: 8 },
    { label: 'IGP', value: 9 },
    { label: 'BBN-RCC-MON', value: 10 },
    { label: 'NVP-II', value: 11 },
    { label: 'PUP', value: 12 },
    { label: 'ARGUS', value: 13 },
    { label: 'EMCON', value: 14 },
    { label: 'XNET', value: 15 },
    { label: 'CHAOS', value: 16 },
    { label: 'UDP', value: 17 },
    { label: 'MUX', value: 18 },
    { label: 'DCN-MEAS', value: 19 },
    { label: 'HMP', value: 20 },
    { label: 'PRM', value: 21 },
    { label: 'XNS-IDP', value: 22 },
    { label: 'TRUNK-1', value: 23 },
    { label: 'TRUNK-2', value: 24 },
    { label: 'LEAF-1', value: 25 },
    { label: 'LEAF-2', value: 26 },
    { label: 'RDP', value: 27 },
    { label: 'IRTP', value: 28 },
    { label: 'ISO-TP4', value: 29 },
    { label: 'NETBLT', value: 30 },
    { label: 'MFE-NSP', value: 31 },
    { label: 'MERIT-INP', value: 32 },
    { label: 'DCCP', value: 33 },
    { label: '3PC', value: 34 },
    { label: 'IDPR', value: 35 },
    { label: 'XTP', value: 36 },
    { label: 'DDP', value: 37 },
    { label: 'IDPR-CMTP', value: 38 },
    { label: 'TP++', value: 39 },
    { label: 'IL', value: 40 },
    { label: 'IPV6', value: 41 },
    { label: 'SDRP', value: 42 },
    { label: 'IPV6-ROUTE', value: 43 },
    { label: 'IPV6-FRAG', value: 44 },
    { label: 'IDRP', value: 45 },
    { label: 'RSVP', value: 46 },
    { label: 'GRE', value: 47 },
    { label: 'DSR', value: 48 },
    { label: 'BNA', value: 49 },
    { label: 'ESP', value: 50 },
    { label: 'AH', value: 51 },
    { label: 'I-NLSP', value: 52 },
    { label: 'SWIPE', value: 53 },
    { label: 'NARP', value: 54 },
    { label: 'MOBILE', value: 55 },
    { label: 'TLSP', value: 56 },
    { label: 'SKIP', value: 57 },
    { label: 'IPV6-ICMP', value: 58 },
    { label: 'IPV6-NONXT', value: 59 },
    { label: 'IPV6-OPTS', value: 60 },
    { label: 'CFTP', value: 62 },
    { label: 'SAT-EXPAK', value: 64 },
    { label: 'KRYPTOLAN', value: 65 },
    { label: 'RVD', value: 66 },
    { label: 'IPPC', value: 67 },
    { label: 'SAT-MON', value: 69 },
    { label: 'VISA', value: 70 },
    { label: 'IPCV', value: 71 },
    { label: 'CPNX', value: 72 },
    { label: 'CPHB', value: 73 },
    { label: 'WSN', value: 74 },
    { label: 'PVP', value: 75 },
    { label: 'BR-SAT-MON', value: 76 },
    { label: 'SUN-ND', value: 77 },
    { label: 'WB-MON', value: 78 },
    { label: 'WB-EXPAK', value: 79 },
    { label: 'ISO-IP', value: 80 },
    { label: 'VMTP', value: 81 },
    { label: 'SECURE-VMTP', value: 82 },
    { label: 'VINES', value: 83 },
    { label: 'TTP', value: 84 },
    { label: 'NSFNET-IGP', value: 85 },
    { label: 'DGP', value: 86 },
    { label: 'TCF', value: 87 },
    { label: 'EIGRP', value: 88 },
    { label: 'OSPFIGP', value: 89 },
    { label: 'Sprite-RPC', value: 90 },
    { label: 'LARP', value: 91 },
    { label: 'MTP', value: 92 },
    { label: 'AX.25', value: 93 },
    { label: 'IPIP', value: 94 },
    { label: 'MICP', value: 95 },
    { label: 'SCC-SP', value: 96 },
    { label: 'ETHERIP', value: 97 },
    { label: 'ENCAP', value: 98 },
    { label: 'GMTP', value: 100 },
    { label: 'IFMP', value: 101 },
    { label: 'PNNI', value: 102 },
    { label: 'PIM', value: 103 },
    { label: 'ARIS', value: 104 },
    { label: 'SCPS', value: 105 },
    { label: 'QNX', value: 106 },
    { label: 'A/N', value: 107 },
    { label: 'IPComp', value: 108 },
    { label: 'SNP', value: 109 },
    { label: 'Compaq-Peer', value: 110 },
    { label: 'IPX-in-IP', value: 111 },
    { label: 'CARP', value: 112 },
    { label: 'PGM', value: 113 },
    { label: 'L2TP', value: 115 },
    { label: 'DDX', value: 116 },
    { label: 'IATP', value: 117 },
    { label: 'STP', value: 118 },
    { label: 'SRP', value: 119 },
    { label: 'UTI', value: 120 },
    { label: 'SMP', value: 121 },
    { label: 'SM', value: 122 },
    { label: 'PTP', value: 123 },
    { label: 'ISIS', value: 124 },
    { label: 'FIRE', value: 125 },
    { label: 'CRTP', value: 126 },
    { label: 'CRUDP', value: 127 },
    { label: 'SSCOPMCE', value: 128 },
    { label: 'IPLT', value: 129 },
    { label: 'SPS', value: 130 },
    { label: 'PIPE', value: 131 },
    { label: 'SCTP', value: 132 },
    { label: 'FC', value: 133 },
    { label: 'RSVP-E2E-IGNORE', value: 134 },
    { label: 'Mobility-Header', value: 135 },
    { label: 'UDPLite', value: 136 },
    { label: 'MPLS-IN-IP', value: 137 },
    { label: 'MANET', value: 138 },
    { label: 'HIP', value: 139 },
    { label: 'SHIM6', value: 140 },
    { label: 'WESP', value: 141 },
    { label: 'ROHC', value: 142 },
    { label: 'PFSYNC', value: 240 },
  ]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(({ label, value }) => ({
      label,
      value: value !== null ? String(value) : null,
    })),
]

@Component({
  selector: 'app-new-profile',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
  providers: [ApiService],
  template: ` <form
    [formGroup]="form"
    class="dialog-form"
    (ngSubmit)="submit()"
  >
    <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>

    <div class="dialog-form-footer mt-48">
      <p-button type="submit" [loading]="loading">Save</p-button>
    </div>
  </form>`,
})
export class ProfileComponent {
  id: number | undefined
  loading = false
  refresh: (() => void) | undefined
  form = new FormGroup({})
  model: {
    Name: string
    Description: string
    OutboundDefault: string
    OutboundExceptions: Array<{
      OutboundPreset: string
      OutboundProtocol: string
      OutboundPortRange: string
      OutboundIPPrefix: string
      OutboundDescription: string
    }>
    InboundDefault: string
    InboundExceptions: Array<{
      InboundPreset: string
      InboundProtocol: string
      InboundPortRange: string
      InboundIPPrefix: string
      InboundDescription: string
    }>
  } = {
    Name: '',
    Description: '',
    OutboundDefault: 'deny',
    OutboundExceptions: [],
    InboundDefault: 'deny',
    InboundExceptions: [],
  }
  fields: FormlyFieldConfig[] = [
    {
      key: 'Name',
      type: 'input',
      props: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
      },
    },
    {
      key: 'Description',
      type: 'input',
      props: {
        label: 'Description',
        placeholder: 'Enter description',
        required: true,
      },
    },
    {
      fieldGroup: [
        {
          template: `
            <hr class="my-2"/>
            <h3 class="font-semibold text-lg mt-4">Outbound traffic rules</h3>
      `,
        },
        {
          key: 'OutboundDefault',
          type: 'radio',
          props: {
            required: true,
            options: [
              { label: 'Block all', value: 'deny' },
              { label: 'Allow all', value: 'allow' },
            ],
          },
        },
        {
          template: `<h4 class="font-semibold mt-2">Exceptions</h4>`,
        },
        {
          key: 'OutboundExceptions',
          type: 'array',
          fieldArray: {
            key: 'OutboundExceptions',
            type: 'object',
            fieldGroup: [
              {
                key: 'OutboundPreset',
                type: 'select',
                className: 'col-span-2',
                defaultValue: 'custom',
                props: {
                  label: 'Preset Services',
                  options: presetOptions,
                  required: true,
                },
              },
              {
                key: 'OutboundProtocol',
                type: 'select',
                className: 'col-span-2',
                defaultValue: null,
                props: {
                  label: 'Protocol',
                  options: protocolOptions,
                },
              },
              {
                key: 'OutboundPortRange',
                type: 'input',
                className: 'col-span-2',
                props: {
                  label: 'Port (Range)',
                  required: true,
                },
                validators: {
                  validation: ['range'],
                },
              },
              {
                key: 'OutboundIPPrefix',
                type: 'textarea',
                className: 'col-span-3',
                props: {
                  label: 'IP (Subnet) or FQDN',
                  autoResize: true,
                  required: true,
                },
              },
              {
                key: 'OutboundDescription',
                type: 'input',
                className: 'col-span-3',
                props: {
                  label: 'Description',
                },
              },
            ],
          },
        },
      ],
    },

    {
      fieldGroup: [
        {
          template: `
            <hr class="my-2"/>
            <h3 class="font-semibold text-lg mt-4">Inbound traffic rules</h3>
          `,
        },
        {
          key: 'InboundDefault',
          type: 'radio',
          props: {
            required: true,
            options: [
              { label: 'Block all', value: 'deny' },
              { label: 'Allow all', value: 'allow' },
            ],
          },
        },
        {
          template: `<h4 class="font-semibold mt-2">Exceptions</h4>`,
        },
        {
          key: 'InboundExceptions',
          type: 'array',
          fieldArray: {
            key: 'InboundExceptions',
            type: 'object',
            fieldGroup: [
              {
                key: 'InboundPreset',
                type: 'select',
                className: 'col-span-2',
                defaultValue: 'custom',
                props: {
                  label: 'Preset Services',
                  options: presetOptions,
                  required: true,
                },
              },
              {
                key: 'InboundProtocol',
                type: 'select',
                className: 'col-span-2',
                defaultValue: null,
                props: {
                  label: 'Protocol',
                  options: protocolOptions,
                },
              },
              {
                key: 'InboundPortRange',
                type: 'input',
                className: 'col-span-2',
                props: {
                  label: 'Port (Range)',
                  required: true,
                },
                validators: {
                  validation: ['range'],
                },
              },
              {
                key: 'InboundIPPrefix',
                type: 'textarea',
                className: 'col-span-3',
                defaultValue: '0.0.0.0/0',
                props: {
                  label: 'IP (Subnet) or FQDN',
                  autoResize: true,
                  required: true,
                },
              },
              {
                key: 'InboundDescription',
                type: 'input',
                className: 'col-span-3',
                defaultValue: '',
                props: {
                  label: 'Description',
                },
              },
            ],
          },
        },
      ],
    },
  ]

  constructor(
    config: DynamicDialogConfig,
    private api: ApiService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
  ) {
    if (config.data) {
      this.id = config.data.id
      this.refresh = config.data.refresh
      if (config.data.model) {
        this.model = config.data.model
        this.model.OutboundExceptions.forEach((item) => {
          item['OutboundIPPrefix'] = item['OutboundIPPrefix']
            .split(',')
            .join('\n')
        })
        this.model.InboundExceptions.forEach((item) => {
          item['InboundIPPrefix'] = item['InboundIPPrefix']
            .split(',')
            .join('\n')
        })
      }
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading = true
      this.api.saveFirewallProfile(this.form.value, this.id).subscribe(() => {
        this.loading = false
        this.refresh?.()
        this.messageService.add({
          severity: 'success',
          summary: `Saved ${this.form.get('Name')?.value}`,
        })
        this.ref.close()
      })
    }
  }
}
