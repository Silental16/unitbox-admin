export type ProjectStatus = "construction" | "offplan" | "completed" | "sold out" | "soldout"

export interface DeveloperProject {
  name: string
  location: string
  type: string
  units: string
  price: string
  status: ProjectStatus
}

export interface Developer {
  name: string
  origin: string
  originTag: string
  founder: string
  website: string
  instagram: string
  whatsapp: string
  email: string
  projects: number
  activeProjects: number
  activeUnits: number
  priceRange: string
  hasAgent: boolean
  aum: string
  isNew: boolean
  projectList: DeveloperProject[]
  contacts: Record<string, string>
  pitch: string
}

export const developers: Developer[] = [
  {
    name: "Mirah Investment & Development",
    origin: "Indonesia/International", originTag: "int",
    founder: "Chairman Jonathan Hedar",
    website: "mirahdevelopments.com", instagram: "@mirahgroup",
    whatsapp: "", email: "",
    projects: 14, activeProjects: 5, activeUnits: 600,
    priceRange: "$200K — $2M+", hasAgent: false, aum: "$1.2B", isNew: false,
    projectList: [
      {name:"FINNS Bali Resort",location:"Berawa",type:"Resort",units:"256 rooms",price:"N/A",status:"construction"},
      {name:"SOMOS Hotels",location:"Uluwatu",type:"Hotel",units:"250 rooms",price:"N/A",status:"construction"},
      {name:"Amali Luxury Residence",location:"Impossibles Beach",type:"Luxury Villas",units:"TBD",price:"$1M+",status:"construction"},
      {name:"Kiara Beachtown",location:"Bali",type:"Serviced Apartments",units:"98",price:"$400K-$800K",status:"construction"},
      {name:"De Vello",location:"Bali",type:"Residential",units:"TBD",price:"N/A",status:"construction"},
      {name:"9 completed projects",location:"Various",type:"Mixed",units:"400+",price:"Various",status:"completed"}
    ],
    contacts: {website:"https://mirahdevelopments.com",instagram:"https://instagram.com/mirahgroup"},
    pitch: "Largest developer in pipeline — 5 projects under construction, ~600+ units, $1.2B AUM. No visible agent technology platform. Chess board and agent catalog would transform their multi-project sales operations. Enterprise-level target."
  },
  {
    name: "Arya Properties",
    origin: "Czech Republic", originTag: "eu",
    founder: "CEO Petr Hemerka",
    website: "aryaproperties.com", instagram: "@aryaproperties_",
    whatsapp: "", email: "",
    projects: 9, activeProjects: 4, activeUnits: 350,
    priceRange: "$180K — $1.2M", hasAgent: true, aum: "$121M", isNew: false,
    projectList: [
      {name:"Arya Sumba Kodi Resort",location:"Sumba",type:"Resort Villas",units:"100+",price:"$300K-$800K",status:"construction"},
      {name:"Arya Mawi",location:"Lombok",type:"Villas",units:"80+",price:"$180K-$500K",status:"construction"},
      {name:"Arya Sumbawa Beachfront",location:"Sumbawa",type:"Villas",units:"50+",price:"$200K-$600K",status:"construction"},
      {name:"Bali projects",location:"Bali",type:"Villas",units:"100+",price:"$250K-$1.2M",status:"construction"},
      {name:"5 completed projects",location:"Various (5 islands)",type:"Mixed",units:"270+",price:"Various",status:"completed"}
    ],
    contacts: {website:"https://aryaproperties.com",instagram:"https://instagram.com/aryaproperties_"},
    pitch: "620 units across 5 islands, $121M AUM, uses HubSpot CRM. 4 active projects. Multi-island operations make centralized catalog essential. Already tech-savvy — Unitbox integrates with existing stack."
  },
  {
    name: "Taryan Group",
    origin: "Ukraine", originTag: "ru",
    founder: "Artur Mkhitaryan (Ukrainian-Armenian, Kyiv)",
    website: "taryangroup.com", instagram: "@taryangroup",
    whatsapp: "+62 812-278-67391", email: "info@anantaradragon.com",
    projects: 1, activeProjects: 1, activeUnits: 216,
    priceRange: "$271K — $750K+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Anantara Dragon Seseh Bali",location:"Seseh Beach",type:"Resort & Branded Residences",units:"216 cocoon residences (52.5-160sqm)",price:"From $271K",status:"construction"}
    ],
    contacts: {website:"https://taryangroup.com",website2:"https://anantaradragon.com",instagram:"https://instagram.com/taryangroup",whatsapp:"+62 812-278-67391",email:"info@anantaradragon.com"},
    pitch: "Enterprise-level: 216 branded residences with Anantara Hotels, opening 2027. Won multiple international awards. Direct-sales only — chess board for 216 units + agent distribution across Asia/Europe."
  },
  {
    name: "Pertama Property",
    origin: "France", originTag: "eu",
    founder: "CEO Anisse Bouzidi (French)",
    website: "pertamaproperty.com", instagram: "@pertamaproperty",
    whatsapp: "", email: "",
    projects: 4, activeProjects: 4, activeUnits: 179,
    priceRange: "$200K — $800K", hasAgent: true, aum: "$60M", isNew: false,
    projectList: [
      {name:"ELLE Villas Seminyak",location:"Seminyak",type:"Branded Luxury Villas (ELLE/Lagardere)",units:"14",price:"$500K-$800K",status:"construction"},
      {name:"Beraban Luxury Lofts",location:"Seminyak",type:"Luxury Lofts",units:"156 rooms",price:"$200K-$500K",status:"construction"},
      {name:"Casaverde Residence",location:"Bali",type:"Premium Villas",units:"2",price:"$600K+",status:"construction"},
      {name:"Abadi Residence",location:"Bali",type:"Luxury Villas",units:"7",price:"$400K-$700K",status:"construction"}
    ],
    contacts: {website:"https://pertamaproperty.com",instagram:"https://instagram.com/pertamaproperty"},
    pitch: "150 staff, ELLE brand partnership, own iOS app, $60M AUM. All 4 projects actively under construction. Already tech-forward — Unitbox fills the agent distribution gap."
  },
  {
    name: "Ecolit Group / Sansara Development",
    origin: "UAE/CIS", originTag: "ru",
    founder: "Denis Lozenko (CEO), Artem Gorbatov (MD Sansara)",
    website: "sansaradevelopment.com", instagram: "@pandawa_residence",
    whatsapp: "+62 822 3537 2572", email: "",
    projects: 2, activeProjects: 1, activeUnits: 155,
    priceRange: "$144K — $475K", hasAgent: true, aum: "$45M dev value", isNew: false,
    projectList: [
      {name:"Pandawa Residence",location:"Pandawa Beach, Bukit",type:"Mixed-use (64 villas + 91 apts + commercial)",units:"155",price:"$144K-$475K",status:"construction"},
      {name:"Turnkey construction services",location:"Various Bali",type:"Custom builds",units:"Per order",price:"Varies",status:"completed"}
    ],
    contacts: {website:"https://sansaradevelopment.com",instagram:"https://instagram.com/pandawa_residence",whatsapp:"+62 822 3537 2572",telegram:"@DenisEcolit"},
    pitch: "155 units in flagship mixed-use project (nearing completion). Has agent page but NO digital tools. Needs chess board for 155 units + agent catalog. Transitioning to multi-project developer brand."
  },
  {
    name: "Conlex Group",
    origin: "Australia", originTag: "au",
    founder: "Kaiden Conlon (Australian)",
    website: "conlexdevelopmentgroup.com", instagram: "@conlexbali",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 2, activeUnits: 116,
    priceRange: "$250K — $1M+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Active villa developments",location:"Pererenan, Canggu",type:"Villa Complex",units:"40+",price:"$350K-$800K",status:"construction"},
      {name:"Custom builds pipeline",location:"Various",type:"Custom",units:"30+",price:"$250K-$1M+",status:"construction"},
      {name:"Completed builds",location:"Various",type:"Custom",units:"46+",price:"$250K-$1M+",status:"completed"}
    ],
    contacts: {website:"https://conlexdevelopmentgroup.com",instagram:"https://instagram.com/conlexbali"},
    pitch: "72 active agents but ZERO agent portal — prime Unitbox target. 116+ villas built. High-volume custom builds + developments need centralized availability tracking and agent CRM."
  },
  {
    name: "IJI Group",
    origin: "Russia", originTag: "ru",
    founder: "Russian founders",
    website: "", instagram: "@iji_group_holding",
    whatsapp: "", email: "",
    projects: 4, activeProjects: 3, activeUnits: 100,
    priceRange: "$120K — $400K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"IJI Villas Canggu",location:"Canggu",type:"Villa Complex",units:"60+",price:"$150K-$300K",status:"construction"},
      {name:"IJI Uluwatu",location:"Uluwatu",type:"Villas",units:"50+",price:"$180K-$400K",status:"construction"},
      {name:"IJI Pererenan",location:"Pererenan",type:"Villas",units:"44+",price:"$150K-$300K",status:"offplan"},
      {name:"IJI Ubud",location:"Ubud",type:"Villas",units:"40+",price:"$120K-$250K",status:"completed"}
    ],
    contacts: {instagram:"https://instagram.com/iji_group_holding"},
    pitch: "194 total units, installment-heavy sales, Gmail-based sales. No website, no CRM. High volume + zero tech = perfect Unitbox fit."
  },
  {
    name: "Yolla Group",
    origin: "Romania", originTag: "eu",
    founder: "CEO Bogdan Gheonu (Romanian)",
    website: "yollagroup.com", instagram: "@yolla.group",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 2, activeUnits: 100,
    priceRange: "$150K — $500K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Yolla development projects",location:"Canggu/Pererenan",type:"Villa Complex",units:"40+",price:"$200K-$400K",status:"construction"},
      {name:"Yolla Realty pipeline",location:"Various",type:"Brokerage+Dev",units:"30+",price:"$150K-$500K",status:"construction"},
      {name:"Completed builds",location:"Various",type:"Custom",units:"30+",price:"$200K+",status:"completed"}
    ],
    contacts: {website:"https://yollagroup.com",instagram:"https://instagram.com/yolla.group"},
    pitch: "100 villas built, dual model (dev + realty). Romanian CEO expanding fast. Needs chess board for active projects and agent catalog for their realty arm."
  },
  {
    name: "DM Projects",
    origin: "Russia", originTag: "ru",
    founder: "Russian founders",
    website: "dmprojects-bali.com", instagram: "@dm.projects.group",
    whatsapp: "", email: "",
    projects: 8, activeProjects: 6, activeUnits: 15,
    priceRange: "$99K — $2M", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Golden Peacock",location:"Badung",type:"Villa",units:"1",price:"$300K+",status:"construction"},
      {name:"Jey Grey Cabanas",location:"Kutuh",type:"Cabanas",units:"5",price:"$99K-$200K",status:"construction"},
      {name:"Seafora Villa",location:"Kutuh",type:"Villas",units:"2",price:"$300K+",status:"construction"},
      {name:"Calypso Villa",location:"Denpasar",type:"Villa",units:"2",price:"$200K+",status:"construction"},
      {name:"Epic Villa",location:"Kutuh",type:"Villa",units:"1",price:"$400K+",status:"construction"},
      {name:"Rachida Villa",location:"Lombok",type:"Villa",units:"2",price:"$150K+",status:"construction"},
      {name:"Other boutique builds",location:"Various",type:"Custom villas",units:"2+",price:"$100K-$2M",status:"construction"}
    ],
    contacts: {website:"https://dmprojects-bali.com",instagram:"https://instagram.com/dm.projects.group"},
    pitch: "Boutique villa builder — many small projects, NOT large complexes. SSL expired on site. Needs digital infrastructure. 20K IG followers = has audience but no tools."
  },
  {
    name: "Kanaan Land",
    origin: "Indonesia/International", originTag: "int",
    founder: "Operating since 2009",
    website: "kanaanland.co.id", instagram: "@kanaan_land",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 2, activeUnits: 79,
    priceRange: "$133K — $500K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Hideaway Phase 2",location:"Tabanan",type:"Villa Complex",units:"25",price:"$180K-$400K",status:"construction"},
      {name:"Hideaway Phase 3",location:"Tabanan",type:"Villas",units:"24",price:"$250K-$500K",status:"offplan"},
      {name:"Hideaway Phase 1",location:"Tabanan",type:"Villa Complex",units:"30",price:"$133K-$300K",status:"completed"}
    ],
    contacts: {website:"https://kanaanland.co.id",instagram:"https://instagram.com/kanaan_land"},
    pitch: "Uses Houzez CRM, 3 Hideaway phases since 2009. Currently using basic CRM — Unitbox is a major upgrade for unit tracking and agent management."
  },
  {
    name: "COCO Capital",
    origin: "Denmark", originTag: "eu",
    founder: "Rasmus Holst (Danish)",
    website: "cocodevelopmentgroup.com", instagram: "@cococapital.id",
    whatsapp: "", email: "",
    projects: 5, activeProjects: 2, activeUnits: 60,
    priceRange: "$200K — $600K", hasAgent: true, aum: "$18M raised", isNew: false,
    projectList: [
      {name:"Le Mansion Seseh",location:"Seseh",type:"Villas",units:"17",price:"$300K-$600K",status:"construction"},
      {name:"Residential Living Resort",location:"Bali",type:"Resort villas",units:"30+",price:"$250K-$500K",status:"construction"},
      {name:"3 completed developments",location:"Various",type:"Villas",units:"78+",price:"$200K-$500K",status:"completed"}
    ],
    contacts: {website:"https://cocodevelopmentgroup.com",instagram:"https://instagram.com/cococapital.id"},
    pitch: "Danish fintech + real estate, $18M raised. 2-3 active projects. Needs proper agent tools for scaling their crowdfunding + direct sales model."
  },
  {
    name: "Anjuna Bay",
    origin: "International", originTag: "int",
    founder: "International team",
    website: "theanjunabay.com", instagram: "@anjunabay",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 2, activeUnits: 50,
    priceRange: "$200K — $1M+ est.", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Aurora",location:"Uluwatu (8.5ha cliff-front)",type:"Luxury cliffside villas",units:"20+",price:"Premium luxury",status:"construction"},
      {name:"Anjuna Palms",location:"Uluwatu",type:"1-3BR townhouses",units:"30+",price:"From $200K",status:"offplan"}
    ],
    contacts: {website:"https://theanjunabay.com",instagram:"https://instagram.com/anjunabay"},
    pitch: "8.5-hectare master plan with Thomas Beach access. Multiple phases/product types need complex catalog. Self-sustained ecosystem with retail/wellness/leisure."
  },
  {
    name: "Balitecture",
    origin: "Australia", originTag: "au",
    founder: "Australian founders",
    website: "balitecture.com", instagram: "@balitecture",
    whatsapp: "", email: "",
    projects: 7, activeProjects: 2, activeUnits: 50,
    priceRange: "$300K — $1.5M", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Balitecture Pererenan",location:"Pererenan",type:"Villas",units:"8+",price:"$500K-$1.5M",status:"construction"},
      {name:"Active custom builds",location:"Various",type:"Custom",units:"10+",price:"$300K-$1M",status:"construction"},
      {name:"Completed portfolio",location:"Various",type:"Villas + Custom",units:"30+",price:"$300K-$1M",status:"completed"}
    ],
    contacts: {website:"https://balitecture.com",instagram:"https://instagram.com/balitecture"},
    pitch: "1M Instagram followers, 62 staff, huge brand awareness but no agent channel. Unitbox opens a structured distribution network."
  },
  {
    name: "Lyvin Properties",
    origin: "Russia", originTag: "ru",
    founder: "Alexander & Victoria Sokovykh (11 years in Bali)",
    website: "lyvinproperties.co", instagram: "@lyvin.bingin",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 2, activeUnits: 48,
    priceRange: "Luxury segment", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Lyvin Bingin",location:"Bingin",type:"3BR luxury villas",units:"10",price:"Luxury",status:"construction"},
      {name:"Lyvin Berawa",location:"Berawa/Canggu",type:"Townhouses",units:"TBD",price:"N/A",status:"construction"},
      {name:"Lyvin Melasti",location:"Melasti",type:"Villas + Suites",units:"38 (18v + 20s)",price:"Luxury",status:"completed"}
    ],
    contacts: {website:"https://lyvinproperties.co",instagram:"https://instagram.com/lyvin.bingin"},
    pitch: "Multi-location luxury brand (Bingin, Melasti, Berawa). Integrated dev + management. 11 years in Bali. Chess board across 3 locations + agent catalog."
  },
  {
    name: "Family Nest",
    origin: "Latvia", originTag: "eu",
    founder: "CEO Pavel Yanshevskiy (Latvian)",
    website: "familynest.com", instagram: "@familynestbali",
    whatsapp: "", email: "",
    projects: 1, activeProjects: 1, activeUnits: 46,
    priceRange: "$241K — $878K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Family Nest Phase 1",location:"Canggu",type:"Villa Complex",units:"16",price:"$241K-$500K",status:"construction"},
      {name:"Family Nest Phase 2",location:"Canggu",type:"Villa Complex",units:"15",price:"$300K-$600K",status:"offplan"},
      {name:"Family Nest Phase 3",location:"Canggu",type:"Villas",units:"15",price:"$400K-$878K",status:"offplan"}
    ],
    contacts: {website:"https://familynest.com",instagram:"https://instagram.com/familynestbali"},
    pitch: "3-phase project with 46 units needs chess board for phased availability. Latvian CEO, EU-focused investors. 30K IG followers."
  },
  {
    name: "Teratai Group",
    origin: "Indonesia", originTag: "int",
    founder: "Award-winning Balinese developer",
    website: "terataigroup.com", instagram: "@terataigroup_bali",
    whatsapp: "+62 812 3860 7787", email: "",
    projects: 5, activeProjects: 2, activeUnits: 40,
    priceRange: "$220K — $410K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Teratai Royal",location:"Canggu (Kayu Tulang)",type:"Villa Complex (3BR), 5 left",units:"14",price:"$300-350K",status:"construction"},
      {name:"Teratai Grand Village",location:"Canggu (Kayu Tulang)",type:"Villa Complex",units:"TBD",price:"$410K",status:"offplan"},
      {name:"Teratai Villas",location:"Canggu",type:"Villa Complex",units:"~13",price:"N/A",status:"soldout"},
      {name:"The Promenade",location:"Canggu",type:"Commercial",units:"Multiple",price:"From $220K",status:"soldout"},
      {name:"The Promenade Shops",location:"Canggu",type:"Commercial",units:"TBD",price:"N/A",status:"soldout"}
    ],
    contacts: {website:"https://terataigroup.com",instagram:"https://instagram.com/terataigroup_bali",whatsapp:"+62 812 3860 7787"},
    pitch: "Award-winning (PropertyGuru 2022/2023), freehold SHM on 4ha master site. 5 units left in Teratai Royal. Informal agent channel — Unitbox formalizes it."
  },
  {
    name: "Art Villas Bali",
    origin: "United Kingdom", originTag: "eu",
    founder: "UK founders",
    website: "artvillasbali.com", instagram: "@artvillasbali",
    whatsapp: "", email: "",
    projects: 7, activeProjects: 3, activeUnits: 40,
    priceRange: "$259K — $549K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Active builds (3 locations)",location:"Canggu, Ubud, other",type:"Villas",units:"15+",price:"$259K-$549K",status:"construction"},
      {name:"Completed (4 locations)",location:"13 Bali areas",type:"Villas",units:"25+",price:"$259K-$549K",status:"completed"}
    ],
    contacts: {website:"https://artvillasbali.com",instagram:"https://instagram.com/artvillasbali"},
    pitch: "UK-origin, 13 Bali areas. Wide geographic spread makes centralized catalog essential."
  },
  {
    name: "New Life Bali",
    origin: "Poland", originTag: "eu",
    founder: "Ewa Bereszko Piotrowska, Adam Piotrowski, Marek Warmuz",
    website: "newlifebali.com", instagram: "@newlife_bali",
    whatsapp: "", email: "contact@newlifebali.com",
    projects: 8, activeProjects: 3, activeUnits: 40,
    priceRange: "$75K — $500K", hasAgent: true, aum: "", isNew: false,
    projectList: [
      {name:"Kedungu Ocean Villas",location:"Kedungu",type:"Boutique villas (5 left of 12)",units:"12",price:"$275K-$295K",status:"construction"},
      {name:"Kedungu Lofts",location:"Kedungu",type:"Lofts + Studios (6+6)",units:"12",price:"$75K-$105K",status:"offplan"},
      {name:"Villa Aurea",location:"Kaba Kaba",type:"3BR villa",units:"1",price:"$500K",status:"offplan"},
      {name:"Villa Bingin",location:"Uluwatu",type:"2BR villa",units:"1",price:"$320K",status:"offplan"},
      {name:"Villa Alive",location:"North Canggu",type:"2BR villa",units:"1",price:"$207K",status:"offplan"},
      {name:"Villa Magic",location:"Canggu",type:"2BR villa",units:"1",price:"$200K",status:"offplan"},
      {name:"Villa FLOW + Edenfield",location:"Canggu, Ubud",type:"Villas",units:"2",price:"$226K-$287K",status:"soldout"}
    ],
    contacts: {website:"https://newlifebali.com",instagram:"https://instagram.com/newlife_bali",email:"contact@newlifebali.com"},
    pitch: "Polish team, formal agent network (1-5% commission), but manual Data Room. Unitbox replaces primitive agent portal. AREBI member."
  },
  {
    name: "Azuma Developments (ex-LUMA)",
    origin: "Netherlands", originTag: "eu",
    founder: "Ramon Luckers (Dutch Director)",
    website: "azumadevelopments.com", instagram: "@azuma_developments",
    whatsapp: "", email: "",
    projects: 4, activeProjects: 2, activeUnits: 34,
    priceRange: "$250K — $600K+", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Azuma Boutique Resort",location:"Uluwatu cliff",type:"Resort villas",units:"18",price:"27% ROI claimed",status:"construction"},
      {name:"Nadu",location:"Bingin",type:"Villas",units:"10",price:"N/A",status:"construction"},
      {name:"Bold Villas",location:"Pecatu",type:"Luxury villas",units:"6",price:"Premium",status:"soldout"}
    ],
    contacts: {website:"https://azumadevelopments.com",instagram:"https://instagram.com/azuma_developments"},
    pitch: "Dutch professional operation, Bold Villas sold out fast. Resort + villa hybrid. Multi-project portfolio needs centralized tools."
  },
  {
    name: "Homeboys Projects / Bocoa Villas",
    origin: "Netherlands", originTag: "eu",
    founder: "Robbert Slootweg & Hans van den Top (Dutch)",
    website: "homeboys-projects.com", instagram: "@homeboys.projects",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 2, activeUnits: 30,
    priceRange: "$300K — $800K+", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Bocoa Canggu",location:"Pererenan",type:"Moroccan-inspired luxury villas",units:"10+",price:"$300K-$800K",status:"construction"},
      {name:"Bocoa Jimbaran",location:"Jimbaran",type:"Luxury villas",units:"10+",price:"$400K+",status:"offplan"},
      {name:"Bocoa Nyang Nyang",location:"Uluwatu",type:"Villas",units:"10+",price:"$300K+",status:"offplan"}
    ],
    contacts: {website:"https://homeboys-projects.com",instagram:"https://instagram.com/homeboys.projects"},
    pitch: "Award-winning Dutch design studio turned developer. Bocoa brand expanding to Lombok, Morocco, Spain. Multi-country platform need."
  },
  {
    name: "Tamora Group",
    origin: "International", originTag: "int",
    founder: "International team",
    website: "tamoragroup.com", instagram: "@tamora_group",
    whatsapp: "", email: "",
    projects: 3, activeProjects: 1, activeUnits: 30,
    priceRange: "$200K — $600K est.", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Tamora AXIS",location:"Uluwatu",type:"Villas",units:"10+",price:"N/A",status:"construction"},
      {name:"Taman Tamora",location:"Bali",type:"Garden villas",units:"10+",price:"N/A",status:"completed"},
      {name:"The Tamora Canggu",location:"Canggu",type:"Managed apartments",units:"10+",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://tamoragroup.com",instagram:"https://instagram.com/tamora_group"},
    pitch: "Multi-project developer with villa + aparthotel concepts. Uluwatu + Canggu. Integrated property management."
  },
  {
    name: "Helvion Swiss Development",
    origin: "Switzerland", originTag: "eu",
    founder: "Michael Baer (Director), Anton Demin (CEO Bali)",
    website: "helvion.global", instagram: "@pulau.villas",
    whatsapp: "+62 823 4005 2202", email: "Info@helvion.global",
    projects: 3, activeProjects: 3, activeUnits: 30,
    priceRange: "$450K — $1.1M+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Pulau Villas",location:"Melasti/Ungasan",type:"Boutique Villa Complex",units:"26 (Superior/Deluxe/Executive)",price:"$450K-$1.1M",status:"construction"},
      {name:"Pulau Collection",location:"Melasti",type:"Ultra-premium",units:"4",price:"Collector tier",status:"construction"},
      {name:"DUO & SOLO Villas",location:"Bali",type:"1BR & 2BR gated",units:"4+",price:"N/A",status:"construction"}
    ],
    contacts: {website:"https://helvion.global",instagram:"https://instagram.com/pulau.villas",whatsapp:"+62 823 4005 2202",email:"Info@helvion.global"},
    pitch: "Swiss holding (Zug), all 3 projects under construction. No agent program — 80% buy remotely. Expanding to UAE/Italy. Multi-market need."
  },
  {
    name: "Bali Bliss Properties",
    origin: "Ukraine/Moldova", originTag: "ru",
    founder: "Linked to Sunny Development Group",
    website: "balibliss.properties", instagram: "@balibliss.properties",
    whatsapp: "", email: "rent@balibliss.properties",
    projects: 7, activeProjects: 2, activeUnits: 26,
    priceRange: "$128K — $300K+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Ocean Bliss",location:"Berawa/Canggu",type:"Apartments (1BR, 33sqm), 2 left",units:"12",price:"From $128K",status:"construction"},
      {name:"Sunrise Bliss",location:"North Kuta/Canggu",type:"Townhouses",units:"14",price:"N/A",status:"offplan"},
      {name:"~4 completed projects",location:"Canggu, Pererenan",type:"Villas",units:"TBD",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://balibliss.properties",instagram:"https://instagram.com/balibliss.properties",email:"rent@balibliss.properties"},
    pitch: "Claims 18% rental yield. No chess board for Ocean Bliss (2 units left). No CRM, no agent portal."
  },
  {
    name: "The Future Estate",
    origin: "Russia", originTag: "ru",
    founder: "Anonymous, 5+ years in Bali",
    website: "thefuture.estate", instagram: "@the.future.estate",
    whatsapp: "+62 813-6684-0651", email: "",
    projects: 2, activeProjects: 1, activeUnits: 26,
    priceRange: "$170K — $306K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Skyline",location:"Ubud",type:"Villas (11x 1BR + 2x 2BR)",units:"13",price:"$170K-$235K",status:"construction"},
      {name:"Serenity",location:"Ubud",type:"Townhouses + Villas (11 TH + 2 V)",units:"13",price:"$185K-$306K",status:"completed"}
    ],
    contacts: {website:"https://thefuture.estate",instagram:"https://instagram.com/the.future.estate",whatsapp:"+62 813-6684-0651"},
    pitch: "Claims 5+ sales/month, 30-35% yield. Skyline under construction. No chess board, no CRM, no agent portal."
  },
  {
    name: "iLOT Property",
    origin: "Belgium", originTag: "eu",
    founder: "Jean-Marc (Belgian founder)",
    website: "ilotpropertybali.com", instagram: "@ilotpropertybali",
    whatsapp: "", email: "",
    projects: 9, activeProjects: 2, activeUnits: 25,
    priceRange: "$150K — $800K", hasAgent: true, aum: "", isNew: false,
    projectList: [
      {name:"Active developments",location:"Umalas, Babakan",type:"Villas",units:"10+",price:"$300K-$800K",status:"construction"},
      {name:"Pipeline projects",location:"Various",type:"Villas + Apartments",units:"15+",price:"$150K-$500K",status:"offplan"},
      {name:"100+ completed villas",location:"Various",type:"Villas, Apartments, Custom",units:"100+",price:"$150K-$800K",status:"completed"}
    ],
    contacts: {website:"https://ilotpropertybali.com",instagram:"https://instagram.com/ilotpropertybali"},
    pitch: "Belgian developer, 100+ villas built. Most pipeline delivered. Has agent relationships but no digital tools. Unitbox professionalizes distribution."
  },
  {
    name: "Big Brother Development",
    origin: "Russia", originTag: "ru",
    founder: "Vitali (surname unknown)",
    website: "", instagram: "@bigbrothersdevelopment",
    whatsapp: "+62 812-3775-4400", email: "",
    projects: 5, activeProjects: 1, activeUnits: 20,
    priceRange: "$100K — $340K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Hedonist Villas",location:"Benoa, Badung",type:"Off-plan 2BR villas",units:"TBD",price:"From $340K",status:"offplan"},
      {name:"Big Brother hospitality portfolio",location:"Berawa/Canggu",type:"Villa + Guest house + Surf inn",units:"14+ rooms",price:"N/A",status:"completed"}
    ],
    contacts: {instagram:"https://instagram.com/bigbrothersdevelopment",whatsapp:"+62 812-3775-4400"},
    pitch: "Transitioning from hospitality to development (Hedonist Villas). Zero digital infrastructure — no website, no CRM, Instagram DMs only."
  },
  {
    name: "Royal Bali Group",
    origin: "Australia/UK", originTag: "au",
    founder: "Lukas (AU), Neal Thomas (UK, 30yrs)",
    website: "royalbaligroup.com", instagram: "@royalbaligroup",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 1, activeUnits: 20,
    priceRange: "$200K — $500K est.", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Canggu Villas",location:"Canggu",type:"2BR villas, rooftop, pools",units:"10+",price:"$200K-$500K",status:"construction"},
      {name:"Completed builds",location:"Canggu",type:"Investment villas",units:"10+",price:"$200K-$400K",status:"completed"}
    ],
    contacts: {website:"https://royalbaligroup.com",instagram:"https://instagram.com/royalbaligroup"},
    pitch: "Australian-British leadership, rental-yield-optimized design, 10-Year Integrity Guarantee."
  },
  {
    name: "618 Development",
    origin: "International", originTag: "int",
    founder: "Japan/Scandinavian design philosophy",
    website: "618development.com", instagram: "@618development",
    whatsapp: "", email: "",
    projects: 1, activeProjects: 1, activeUnits: 20,
    priceRange: "Premium lifestyle", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Cultural District Villas",location:"Bali (Nuanu area)",type:"Premium lifestyle villas + amenities",units:"20",price:"Premium",status:"construction"}
    ],
    contacts: {website:"https://618development.com",instagram:"https://instagram.com/618development"},
    pitch: "Unique golden ratio design. Community amenities (media park, biodiversity gardens). 20 villas need catalog + agent tools."
  },
  {
    name: "Novo Development",
    origin: "International", originTag: "int",
    founder: "21 years civil engineering experience",
    website: "novodevelopment.id", instagram: "",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 1, activeUnits: 20,
    priceRange: "$150K — $400K est.", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Novo Ubud Villas",location:"Ubud (Jl. Suweta)",type:"Villa complex (5,000 sqm)",units:"16",price:"Mid-range",status:"construction"},
      {name:"Novo Ubud Apartments",location:"Ubud",type:"Apartments",units:"TBD",price:"N/A",status:"offplan"}
    ],
    contacts: {website:"https://novodevelopment.id"},
    pitch: "Ubud-focused developer. Residential + apartment mix. 21 years construction experience."
  },
  {
    name: "Anwa Collection",
    origin: "Australia", originTag: "au",
    founder: "Australian owners (30+ years Asia construction)",
    website: "anwacollection.com", instagram: "@theanwacollection",
    whatsapp: "", email: "info@anwabali.com",
    projects: 3, activeProjects: 2, activeUnits: 19,
    priceRange: "$319K — $350K", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Anwa Bumbak",location:"Umalas",type:"2BR villas + 3BR apartments",units:"10v + 9apt",price:"$319K-$350K",status:"construction"},
      {name:"El Agua Villas",location:"Umalas",type:"Villas",units:"TBD",price:"N/A",status:"construction"},
      {name:"Anwa Cove",location:"Umalas",type:"Moroccan-inspired villas",units:"TBD",price:"N/A",status:"offplan"}
    ],
    contacts: {website:"https://anwacollection.com",instagram:"https://instagram.com/theanwacollection",email:"info@anwabali.com"},
    pitch: "Australian-owned, 30+ years Asia experience. Multiple Umalas complexes. Integrated hospitality."
  },
  {
    name: "Azimut Development",
    origin: "Russia", originTag: "ru",
    founder: "Anonymous leadership",
    website: "azimutdevelopment.com", instagram: "@azimutdevelopment",
    whatsapp: "+62 822 6622 0680", email: "sales@azimutdevelopment.com",
    projects: 3, activeProjects: 3, activeUnits: 18,
    priceRange: "$220K — $500K+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Bali Hills",location:"Canggu",type:"Villa Complex (9x 2BR + 3x 3BR)",units:"12",price:"From $220K",status:"construction"},
      {name:"Pantai Lima Residence",location:"Pererenan",type:"2BR Villas",units:"5",price:"~$200-300K",status:"construction"},
      {name:"Oceanica Luxury Villa",location:"Cemagi",type:"3BR, 300sqm",units:"1",price:"Premium",status:"construction"}
    ],
    contacts: {website:"https://azimutdevelopment.com",instagram:"https://instagram.com/azimutdevelopment",whatsapp:"+62 822 6622 0680",email:"sales@azimutdevelopment.com"},
    pitch: "All 3 projects under construction. Russian-speaking investors expect polished tools. No agent channel, no CRM."
  },
  {
    name: "Mazari Developments",
    origin: "UK/International", originTag: "eu",
    founder: "Angela Udemba (Ex-McKinsey, Wharton MBA)",
    website: "mazaridevelopments.com", instagram: "@mazaridevelopments",
    whatsapp: "+62 813-3835-8075", email: "hello@mazarivillas.com",
    projects: 2, activeProjects: 1, activeUnits: 15,
    priceRange: "$247K — $500K+", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Svara by Mazari",location:"Bingin, Uluwatu",type:"Boutique villas",units:"TBD",price:"Pre-sales",status:"offplan"},
      {name:"The Mazari Villas",location:"Bingin, Uluwatu",type:"Boutique villas (1/2/3BR)",units:"15",price:"From $247K",status:"completed"}
    ],
    contacts: {website:"https://mazaridevelopments.com",instagram:"https://instagram.com/mazaridevelopments",whatsapp:"+62 813-3835-8075",email:"hello@mazarivillas.com"},
    pitch: "Ex-McKinsey founder. Launching Svara (2nd project) — perfect timing for agent platform. 78K IG followers. ROI: 15-20%/yr."
  },
  {
    name: "Lumedge Development",
    origin: "Russia", originTag: "ru",
    founder: "Artem (managing 7,000sqm projects)",
    website: "lumedgedevelopment.com", instagram: "@lumedgedevelopment",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 1, activeUnits: 15,
    priceRange: "Investment villas", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"Horizon Six",location:"Bukit/Uluwatu",type:"Gated community",units:"10+",price:"14% net ROI",status:"construction"},
      {name:"Previous projects",location:"Canggu, Ubud, Tabanan",type:"Various",units:"7,000 sqm",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://lumedgedevelopment.com",instagram:"https://instagram.com/lumedgedevelopment"},
    pitch: "Transparent financial modeling focus. ROI-focused pitch aligns with Unitbox financial model features."
  },
  {
    name: "SooBali Development",
    origin: "Australia", originTag: "au",
    founder: "Charles Anderson (Founder, BArch)",
    website: "development.soobali.com", instagram: "@soobalivillas",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 2, activeUnits: 15,
    priceRange: "$300K — $800K+ est.", hasAgent: false, aum: "$3M revenue", isNew: false,
    projectList: [
      {name:"Luxie Living",location:"Umalas",type:"4BR/5BA luxury villas",units:"3",price:"Premium",status:"offplan"},
      {name:"Kutat Lestari",location:"Sanur",type:"4BR residential",units:"TBD",price:"N/A",status:"offplan"},
      {name:"Managed villas",location:"Seminyak, Canggu, Umalas",type:"Rental",units:"12+",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://development.soobali.com",instagram:"https://instagram.com/soobalivillas"},
    pitch: "Integrated group (dev + architect + construction + management), 33K IG. Australian founder. Single decision-maker."
  },
  {
    name: "Kingswood Bali",
    origin: "Australia", originTag: "au",
    founder: "Sam Fonda (Australian)",
    website: "kingswoodbalivillas.com", instagram: "@kingswood.bali",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 1, activeUnits: 10,
    priceRange: "$70K — $249K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"LuxeVista",location:"Tabanan",type:"Villa Complex",units:"10+",price:"$150K-$249K",status:"construction"},
      {name:"78 custom builds",location:"Various",type:"Custom",units:"78",price:"$70K-$200K",status:"completed"}
    ],
    contacts: {website:"https://kingswoodbalivillas.com",instagram:"https://instagram.com/kingswood.bali"},
    pitch: "Entry-level pricing ($70K). 78 custom builds completed. Needs agent catalog to scale affordable segment."
  },
  {
    name: "La Finca Bali",
    origin: "International", originTag: "int",
    founder: "Mediterranean-focused team",
    website: "thefincabali.com", instagram: "@lafincabali",
    whatsapp: "", email: "",
    projects: 1, activeProjects: 1, activeUnits: 10,
    priceRange: "Luxury", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"La Finca Bingin",location:"Bingin/Uluwatu",type:"Mediterranean luxury villas",units:"~10",price:"Luxury",status:"construction"}
    ],
    contacts: {website:"https://thefincabali.com",instagram:"https://instagram.com/lafincabali"},
    pitch: "Distinctive Mediterranean-tropical niche. Bingin (emerging premium area). Boutique collection."
  },
  {
    name: "Dreamscape Property Bali",
    origin: "Indonesia", originTag: "int",
    founder: "Maulidina Fatharani (Dina)",
    website: "dreamscapebali.com", instagram: "@dreamscapebali",
    whatsapp: "+62 853-3355-4140", email: "sales@dreamscapebali.com",
    projects: 5, activeProjects: 1, activeUnits: 10,
    priceRange: "$200K — $600K est.", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Custom build-to-order",location:"Various",type:"Custom villas for investors",units:"~8",price:"$200K-$600K",status:"construction"},
      {name:"Dreamscape Bali Villas (The Kunci)",location:"Berawa/Canggu",type:"Rental villas",units:"2+",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://www.dreamscapebali.com",instagram:"https://instagram.com/dreamscapebali",whatsapp:"+62 853-3355-4140",email:"sales@dreamscapebali.com"},
    pitch: "Build-to-order consultancy, not multi-unit developer. Weak Unitbox fit unless they scale up. 221 IG followers. Lower priority."
  },
  {
    name: "PRIDE Building Group",
    origin: "International (NZ partner)", originTag: "int",
    founder: "Founding team + NZ contractor",
    website: "savanna-villas.com", instagram: "@pridebuildinggroup",
    whatsapp: "+6208133963017", email: "pridebuildinggroup@gmail.com",
    projects: 1, activeProjects: 1, activeUnits: 8,
    priceRange: "$270K — $285K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Savanna Villas",location:"Bukit, South Kuta",type:"4 villa types",units:"~4-10",price:"$270K-$285K",status:"construction"}
    ],
    contacts: {website:"https://savanna-villas.com",whatsapp:"+6208133963017",email:"pridebuildinggroup@gmail.com"},
    pitch: "Won 'Best Architectural Design 2025'. New developer, EN/RU site, Gmail email = no tech. Unitbox gives instant professional presence."
  },
  {
    name: "Longitude Investments",
    origin: "Germany", originTag: "eu",
    founder: "Florian (German, 12+ years EU)",
    website: "", instagram: "@longitude_bali",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 1, activeUnits: 5,
    priceRange: "N/A", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Catalog villas",location:"Various Bali",type:"Turnkey architect-designed",units:"Several",price:"N/A",status:"construction"},
      {name:"Custom builds",location:"Various",type:"Sustainable, accessible",units:"Several",price:"N/A",status:"completed"}
    ],
    contacts: {instagram:"https://instagram.com/longitude_bali"},
    pitch: "German founder, sustainability focus. Website down (404). Hard to assess scale. Approach for relationship-building."
  },
  {
    name: "ASAI Capital Group",
    origin: "Russia", originTag: "ru",
    founder: "Aleksandr Sokovykh (CEO), Alexander Ilin (MD)",
    website: "asaivillage.com", instagram: "@asai_village",
    whatsapp: "+62 821-4443-4214", email: "",
    projects: 3, activeProjects: 1, activeUnits: 5,
    priceRange: "Investment tier", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"ASAI Residence (new)",location:"Jimbaran",type:"Villa complex",units:"~20",price:"N/A",status:"offplan"},
      {name:"ASAI Village",location:"Jimbaran",type:"Boutique villas, only 2 left",units:"20 (5 types)",price:"From $163/night",status:"completed"},
      {name:"ASAI Villas",location:"Jimbaran",type:"Villas",units:"TBD",price:"N/A",status:"completed"}
    ],
    contacts: {website:"https://asaivillage.com",instagram:"https://instagram.com/asai_village",whatsapp:"+62 821-4443-4214"},
    pitch: "Hospitality ops on OTAs. 2 units left in Village. New ASAI Residence could benefit from chess board. Broken asaigroup.co needs reliable digital presence."
  },
  {
    name: "HIT Development",
    origin: "Russia", originTag: "ru",
    founder: "Igor Markov (CEO), Dmitry Kaufman (COO)",
    website: "hit.dev", instagram: "@hit.bali",
    whatsapp: "", email: "",
    projects: 1, activeProjects: 1, activeUnits: 4,
    priceRange: "From $192K", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"The Legend of Ubud",location:"Ubud (Sayan)",type:"Luxury villas (5,291 sqm)",units:"4",price:"From $192K",status:"construction"}
    ],
    contacts: {website:"https://hit.dev",instagram:"https://instagram.com/hit.bali"},
    pitch: "Corporate pedigree (Maersk, P&G, Danone, VTB). Entering Bali luxury. Small but corporate mindset — needs professional catalog."
  }
];
