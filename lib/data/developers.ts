export type ProjectStatus = "construction" | "offplan" | "completed" | "sold out" | "soldout"

export interface DeveloperProject {
  name: string
  location: string
  type: string
  units: string
  price: string
  status: ProjectStatus
  url?: string
  completion?: string
  mapUrl?: string
  description?: string
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
    name: "Coco Development Group",
    origin: "Denmark", originTag: "eu",
    founder: "Rasmus Holst (Danish serial entrepreneur, CEO)",
    website: "cocodevelopmentgroup.com", instagram: "@cocodevelopmentgroup",
    whatsapp: "+62 877 6398 4985", email: "hello@cocodevelopmentgroup.com",
    projects: 8, activeProjects: 6, activeUnits: 447,
    priceRange: "$81K — $325K", hasAgent: false, aum: "$30M+ raised, $100M+ portfolio", isNew: false,
    projectList: [
      {name:"Azoria Living",location:"Uluwatu (Bingin)",type:"Apartments",units:"185",price:"From $95K",status:"construction",completion:"Q1 2027",url:"https://cocodevelopmentgroup.com/",mapUrl:"https://www.google.com/maps?q=-8.8372776,115.0992983",description:"Bali's first Padel & Wellness resort — 13,400 sqm, 6 padel courts, wellness sanctuaries, fitness, co-working, 3 min from Nunggalan Beach."},
      {name:"Coco Hills Resort",location:"Uluwatu (Bingin)",type:"Apartments",units:"95",price:"From $155K",status:"construction",completion:"Q4 2026",url:"https://cocodevelopmentgroup.com/coco-hills-resort-bali/",mapUrl:"https://www.google.com/maps?q=-8.82042,115.125",description:"Hillside resort with panoramic ocean views. Helicopter pad, padel court, gym, co-working, wellness retreat, beach-style pool."},
      {name:"Coco Lifestyle Resort",location:"Uluwatu (Bingin)",type:"Apartments",units:"62",price:"",status:"construction",completion:"Oct 2025",url:"https://cocodevelopmentgroup.com/lifestyle-resort-bali/",description:"Fully managed apartments designed for comfort and community. Gym, recovery area, co-working, restaurant & bar. Sold out."},
      {name:"Amazona Jungle Resort",location:"Kaba Kaba (Canggu)",type:"Apartments",units:"41",price:"",status:"construction",completion:"Feb 2026",url:"https://cocodevelopmentgroup.com/amazona-jungle-resort-bali/",mapUrl:"https://www.google.com/maps?q=-8.5926466,115.1506889",description:"7 cascading levels in jungle, vintage 80s aesthetics. Mud treatments, waterfall restaurant, spa cave, 2 infinity pools."},
      {name:"Le Mansion By Coco",location:"Seseh",type:"Villas",units:"17",price:"",status:"completed",completion:"Completed 2024",url:"https://cocodevelopmentgroup.com/bali-luxury-mansion/",description:"Mediterranean-style luxury villas — 3 bed, private pool, rooftop bar with Jacuzzi, rice field & mountain views. 10 min from Canggu."},
      {name:"Coco Residential Living",location:"Seseh",type:"Apartments",units:"16",price:"",status:"completed",completion:"Completed 2024",url:"https://cocodevelopmentgroup.com/residential-living-resort-bali/",description:"Luxury apartments in Seseh rice fields, 5 min from Canggu. Co-working, sauna & wellness, premium finishes."},
      {name:"The Coco Boulevard",location:"Uluwatu (Bingin)",type:"Villas",units:"11",price:"",status:"completed",completion:"Completed 2024",url:"https://cocodevelopmentgroup.com/boulevard-villa-bali/",description:"Private lifestyle villas with own pool. Full access to Coco Lifestyle Resort amenities — padel, gym, sauna, ice bath, co-working."},
      {name:"Coco Residential Living 2.0",location:"Seseh",type:"Apartments",units:"20",price:"From $145K",status:"completed",completion:"Completed 2025",url:"https://cocodevelopmentgroup.com/residential-living-resort-bali/",description:"Extension with 89 sqm apartments, private rooftops, shared co-working and pool. 80% sold out at launch."}
    ],
    contacts: {website:"https://cocodevelopmentgroup.com",instagram:"https://instagram.com/cocodevelopmentgroup"},
    pitch: "Danish-founded, 8 projects (447 units), $30M+ raised from 150+ investors via crowd-investment platform (Shares by Coco). Focus on lifestyle amenities in $80K-$325K range. No agent portal — large in-house sales team."
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
  },
  // === Re-added from Митюхин Rating ===
  {
    name: "Nuanu Creative City",
    origin: "Russia", originTag: "ru",
    founder: "Sergey Solonin (QIWI co-founder, $10B+ fintech)",
    website: "nuanu.com", instagram: "@nuanucreativecity",
    whatsapp: "", email: "",
    projects: 18, activeProjects: 7, activeUnits: 200,
    priceRange: "$150K — multi-million", hasAgent: false, aum: "$100M+ invested", isNew: true,
    projectList: [
      {name:"OXO The Residences",location:"Nyanyi",type:"Villas",units:"40",price:"From $500K",status:"construction"},
      {name:"Ecoverse Residences",location:"Nyanyi",type:"Apartments + Townhouses",units:"49",price:"$150K-$400K",status:"construction"},
      {name:"Flower Estates",location:"Nyanyi",type:"Villas",units:"28",price:"N/A",status:"construction"},
      {name:"The Collection Vol.1",location:"Nyanyi",type:"Villas",units:"10+",price:"$300K+",status:"construction"},
      {name:"The Collection Vol.3",location:"Nyanyi",type:"4+1BR Villas",units:"5",price:"$500K+",status:"construction"},
      {name:"OXO The Pavilions",location:"Nyanyi",type:"Mixed",units:"TBD",price:"N/A",status:"construction"},
      {name:"BIOM Residences",location:"Nyanyi",type:"Apartments",units:"50+",price:"From $150K",status:"offplan"},
      {name:"Commercial/lifestyle venues",location:"44ha master plan",type:"Mixed (school, galleries, wellness)",units:"N/A",price:"N/A",status:"construction"}
    ],
    contacts: {website:"https://nuanu.com",instagram:"https://instagram.com/nuanucreativecity"},
    pitch: "Massive 44-hectare master community, $100M+ invested, 7 residential projects under construction. 400+ units target by 2027. Enterprise-level platform opportunity for unit-level cataloging."
  },
  {
    name: "OXO Living",
    origin: "Austria/UK", originTag: "eu",
    founder: "Johannes Weissenbaeck (Austrian, 25+ years)",
    website: "oxoliving.com", instagram: "@oxoliving",
    whatsapp: "", email: "",
    projects: 30, activeProjects: 3, activeUnits: 130,
    priceRange: "From $500K", hasAgent: false, aum: "$43M (IDR 700B)", isNew: true,
    projectList: [
      {name:"OXO The Residences",location:"Nyanyi",type:"Villas",units:"40 (sold out day 1)",price:"From $500K",status:"construction"},
      {name:"Ecoverse (with Nuanu)",location:"Nyanyi",type:"Apartments + Townhouses",units:"49",price:"$200K-$400K",status:"construction"},
      {name:"OXO The Pavilions",location:"Nyanyi/Nuanu",type:"Mixed",units:"40+",price:"N/A",status:"construction"},
      {name:"Five Oceans Residence (certified)",location:"Berawa",type:"Villas",units:"44",price:"$500K+",status:"construction"},
      {name:"25+ managed properties",location:"Various Bali",type:"Villas, coworking, resorts",units:"150+",price:"$500K+",status:"completed"}
    ],
    contacts: {website:"https://oxoliving.com",instagram:"https://instagram.com/oxoliving"},
    pitch: "Premium brand, $43M portfolio. 3 projects under construction + certification partner for more. Sold out in 1 day. Complex multi-property portfolio needs professional catalog tool."
  },
  {
    name: "Sunny Development Group",
    origin: "Ukraine/Moldova", originTag: "ru",
    founder: "Igor Grosu & Viktoria Halitska (13+ years, 6 countries)",
    website: "sunnydg.com", instagram: "@sunny.development",
    whatsapp: "", email: "",
    projects: 4, activeProjects: 3, activeUnits: 136,
    priceRange: "$200K — $500K", hasAgent: false, aum: "1M sqm built across 6 countries", isNew: true,
    projectList: [
      {name:"LUMA Biohacking Resort",location:"Uluwatu",type:"Resort + Villas",units:"63",price:"$250K-$500K",status:"construction"},
      {name:"Sunny Family Ubud",location:"Ubud",type:"Apartments",units:"33",price:"$150K-$300K",status:"offplan"},
      {name:"Amara Wedding Resort",location:"Amed",type:"Resort (14 villas + 26 apts)",units:"40",price:"$200K-$400K",status:"construction"},
      {name:"Completed: Muse, Nine, Aparts, Cuddles, etc.",location:"Various",type:"Mixed",units:"170+",price:"Various",status:"completed"}
    ],
    contacts: {website:"https://sunnydg.com",instagram:"https://instagram.com/sunny.development"},
    pitch: "Large international operation (6 countries, 1M sqm), 100% completion rate. 3 active Bali projects + expanding to Phuket (297 units). Multi-market platform opportunity."
  },
  {
    name: "BAZA Development",
    origin: "Russia (Yekaterinburg)", originTag: "ru",
    founder: "Mark Zavodovskiy & Alexey Bass (50/50 co-founders, Yekaterinburg)",
    website: "balibaza.com", instagram: "@baza.bz",
    whatsapp: "+62895052117640", email: "pr@balibaza.com",
    projects: 3, activeProjects: 2, activeUnits: 88,
    priceRange: "$79K — $530K", hasAgent: true, aum: "118K sqm under construction (Russia)", isNew: false,
    projectList: [
      {name:"BAZA Kedungu",location:"Kedungu",type:"Apartments",units:"58",price:"$79K-$96K",status:"construction",completion:"Q2 2026",url:"https://balibaza.com/baza-kedungu-en",mapUrl:"https://maps.app.goo.gl/mR64AyKG2nRAan248",description:"California coastal-style aparthotel, 300m from Kedungu Beach. Infinity pool, gym, surf shop. ROI 15-22%."},
      {name:"Origins at Nuanu City",location:"Kediri (Nuanu)",type:"Villas",units:"18",price:"From $530K",status:"construction",completion:"Q2 2026",url:"https://balibaza.com/origins-en",mapUrl:"https://maps.app.goo.gl/hxRJACTgewCzYpUy8",description:"First premium villa project inside Nuanu Creative City. 131-258m², award-winning architects, 3 min to ocean. ROI 14-15%."},
      {name:"Gate 11",location:"Seminyak",type:"Apartments + Commercial",units:"12",price:"From $110K",status:"completed",completion:"Q3 2025",url:"https://bali.baza.bz/gate-11",description:"Boutique 3-story complex on Jl. Sari Dewi — 8 apartments + 4 commercial, 5 min to Seminyak Beach. ROI 15-22%."}
    ],
    contacts: {website:"https://balibaza.com",instagram:"https://instagram.com/baza.bz",telegram:"@Agent_BaliBaza",whatsapp:"+62 895 0521 1764"},
    pitch: "Russian developer from Yekaterinburg (founded 2017, 118K sqm in Russia), entered Bali 2021 with ~$3M. 88 units across 3 projects ($79K-$530K). Structured agent program (7-13% commission). Founder is son of Greenwich mall billionaire."
  },
  {
    name: "ARCHESTET",
    origin: "CIS", originTag: "ru",
    founder: "5 international offices",
    website: "archestet.com", instagram: "@archestet",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 2, activeUnits: 83,
    priceRange: "$200K — $600K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"White Palm",location:"Canggu",type:"Apartment Complex",units:"75",price:"$200K-$400K",status:"construction"},
      {name:"ARCHESTET Villas",location:"Uluwatu",type:"Villas",units:"8",price:"$300K-$600K",status:"construction"}
    ],
    contacts: {website:"https://archestet.com",instagram:"https://instagram.com/archestet"},
    pitch: "White Palm (75-unit apartment complex) — exactly the type needing chess board. 5 international offices = centralized agent tools essential."
  },
  {
    name: "Bali Investments",
    origin: "Russia", originTag: "ru",
    founder: "Felix Demin (Russian, 12+ years in Bali, 130K IG followers)",
    website: "bali-investments.ru", instagram: "@felix.demin",
    whatsapp: "+62 819 1087 6631", email: "ballinvestmentsgroup@gmail.com",
    projects: 6, activeProjects: 2, activeUnits: 53,
    priceRange: "$189K — $399K", hasAgent: true, aum: "", isNew: false,
    projectList: [
      {name:"Green Flow Villas (SEALED)",location:"Ubud (Sayan)",type:"Villas",units:"20",price:"$329K",status:"completed",completion:"Completed ~2023, sealed June 2025",url:"https://bali-investments.com/ubud",description:"20+ designer villas with private pools on Jl. Raya Sayan, rice field views. Asia Pacific Property Awards 2022-2023. Sealed for zoning violations near sacred temple."},
      {name:"Canggu Secrets",location:"Canggu",type:"Apartments",units:"TBD",price:"$209K-$279K",status:"completed",completion:"Completed Q4 2024",url:"https://bali-investments.com/canggu",mapUrl:"https://maps.google.com/?q=-8.653365883,115.132130608",description:"Great Gatsby-styled designer apartments at Gg. Nyepi 22. 60 sqm (no pool) and 85 sqm (with pool). 5 min bike to Berawa Beach, 6 min to Atlas/Finns Beach Club."},
      {name:"Private Jet Villa",location:"Uluwatu (Nyang Nyang)",type:"Villa",units:"1",price:"$4,100-$6,500/night",status:"completed",completion:"Opened Dec 2023",url:"https://privatejetvilla.com/",description:"World's first Boeing 737 converted into cliff-top luxury villa, 150m above Nyang Nyang Beach. 2 bed, infinity pool, cockpit jacuzzi, helipad, butler service."},
      {name:"Bubble Hotel Bali",location:"Ubud + Uluwatu",type:"Hotel",units:"2 locations",price:"",status:"completed",completion:"Operating since ~2018",url:"https://bubblehotelbali.com/en",mapUrl:"https://www.google.com/maps/place/-8.441599,115.301404",description:"Transparent dome glamping — Jungle Bubbles in Tampaksiring amid rice terraces + Beachside Bubbles at Nyang Nyang Beach. Airbnb Top 10 most unique hotels."},
      {name:"Art Boutique Hotel",location:"Ubud",type:"Hotel",units:"50",price:"From $23,750 deposit",status:"offplan",url:"https://bali-investments.com/artboutiquehotel_en",description:"Serviced apartment hotel overlooking canyon, jungle, river and Artist's Trail. 50 unique rooms with transparent walls/floors, panoramic pool with jungle views."}
    ],
    contacts: {website:"https://bali-investments.ru/eng",website2:"https://bali-investments.com",instagram:"https://instagram.com/felix.demin",founderSite:"https://felix-demin.com/"},
    pitch: "Creative concept properties (Boeing 737 villa, bubble hotels), Asia Pacific Property Awards 2022-2023. RISK: Green Flow Villas (20 units) sealed June 2025 for zoning violations, founder faces court. Active sales on Canggu Secrets."
  },
  {
    name: "OceaniQ Villas",
    origin: "Russia", originTag: "ru",
    founder: "Andrey Khazov (15+ years, CBRE Top 5)",
    website: "oceaniqvillas.com", instagram: "@oceaniq.villas",
    whatsapp: "", email: "",
    projects: 2, activeProjects: 2, activeUnits: 40,
    priceRange: "Premium luxury", hasAgent: false, aum: "", isNew: true,
    projectList: [
      {name:"OceaniQ Nusa Dua",location:"Nusa Dua",type:"Luxury oceanfront villas",units:"20+",price:"Premium",status:"construction"},
      {name:"OceaniQ Nusa Penida",location:"Nusa Penida",type:"Luxury villas",units:"20+",price:"Premium",status:"offplan"}
    ],
    contacts: {website:"https://oceaniqvillas.com",instagram:"https://instagram.com/oceaniq.villas"},
    pitch: "Won 'Best Development Project in Southeast Asia 2025-2026'. Oscar Hartmann as ambassador. Premium brand needs premium tools. Multi-island expansion."
  },
  // === New developers from Митюхин Rating ===
  {
    name: "Predmet Construction",
    origin: "", originTag: "ru",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Biom Development",
    origin: "", originTag: "ru",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Anta Group",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "High Quality Construction",
    origin: "", originTag: "ru",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Protected Capital Estate",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Unit Space",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "MBM",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Feeels Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Teus Group",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "ADVA",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Loyo & Bondar Group",
    origin: "", originTag: "ru",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Premier Global Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "BREIG Property",
    origin: "Russia", originTag: "ru",
    founder: "Nikita Shelomentsev (Russian, ex-BCG, MBA)",
    website: "breig-property.com", instagram: "@breig_property",
    whatsapp: "+6281353934542", email: "sales@breig-property.com",
    projects: 17, activeProjects: 5, activeUnits: 25,
    priceRange: "$90K — $850K", hasAgent: false, aum: "", isNew: false,
    projectList: [
      {name:"Elysium Apartments",location:"Pererenan, Canggu",type:"Apartments",units:"TBD",price:"$90K-$316K",status:"construction",completion:"Q4 2026",url:"https://breig-property.com/elysium-apart/",mapUrl:"https://maps.app.goo.gl/ForAd7RcaACtukNeA",description:"Ocean and rice terrace views, parks, pools, 5 min from beach. 1-2 bed 25-79m², yield 12-16%."},
      {name:"Elysium Villas",location:"Pererenan, Canggu",type:"Villas",units:"TBD",price:"$609K",status:"construction",completion:"Q4 2026",url:"https://breig-property.com/elysium-villas-test/",mapUrl:"https://maps.app.goo.gl/ForAd7RcaACtukNeA",description:"3-bed luxury villas (230m²) within Elysium complex, parks, pools, ocean views, 3 min to beach. Yield 12-16%."},
      {name:"Elysium Smart Villas",location:"Pererenan, Canggu",type:"Villas",units:"TBD",price:"$330K",status:"construction",completion:"Q4 2026",url:"https://breig-property.com/elysium-smart-villas-test/",mapUrl:"https://maps.app.goo.gl/ForAd7RcaACtukNeA",description:"Eco smart 2-bed villas (90m²) within Elysium complex, ocean and rice terrace views. Yield 12-16%."},
      {name:"Edem Villas II",location:"Nusa Dua (Benoa)",type:"Villas",units:"3",price:"$90K-$285K",status:"construction",completion:"Q2 2026",url:"https://breig-property.com/edem-villas-2/",description:"Greek-inspired villas with cascading arrangement, panoramic ocean views. 1-2 bed 24-180m², yield 14-50%."},
      {name:"Oasis II",location:"Dalung, Badung",type:"Townhouses",units:"TBD",price:"$360K",status:"completed",completion:"Completed Q2 2024",url:"https://breig-property.com/oasis-ii/",mapUrl:"https://maps.app.goo.gl/NkMuCEqVdzJy8Bkf9",description:"Townhouse apartments 750m from ocean, one of most expensive streets of Bali. 2-3 bed 97-136m², yield 12-16%."},
      {name:"Vesna",location:"Berawa",type:"Townhouses",units:"11",price:"$335K",status:"completed",completion:"Completed Q3 2023",url:"https://breig-property.com/vesna/",mapUrl:"https://maps.app.goo.gl/jKfKcBTfNQNfrYCb6",description:"11 townhouses among rice fields with Mount Agung views, panoramic floor-to-ceiling windows. 1-2 bed 79-92m², yield up to 20%."},
      {name:"Red Sunset",location:"Berawa",type:"Villas",units:"1",price:"$850K",status:"completed",url:"https://breig-property.com/red-sunset/",mapUrl:"https://maps.app.goo.gl/jKfKcBTfNQNfrYCb6",description:"Luxury 4-bed villa (265m²) near ocean, two separate buildings, exclusive rooftop. Yield up to 20%."},
      {name:"Oasis",location:"Kuta Utara",type:"Villas",units:"1",price:"$365K",status:"completed"},
      {name:"Baliwood Residence",location:"Pererenan, Mengwi",type:"Villas",units:"7",price:"$700K-$890K",status:"completed",url:"https://breig-property.com/baliwood/",mapUrl:"https://maps.app.goo.gl/Fz17uVdtgGVGu7EDA",description:"7 luxury oceanfront villas, 1-min walk from ocean, private pools and rooftop areas. 2-4 bed 235-310m², yield up to 20%."},
      {name:"Aquamarine",location:"Canggu",type:"Villas",units:"TBD",price:"",status:"completed"},
      {name:"Aquamarine II",location:"Canggu",type:"Villas",units:"TBD",price:"",status:"completed"},
      {name:"Aquamarine III",location:"Mengwi",type:"Villas",units:"TBD",price:"",status:"completed"},
      {name:"Garden Villa II",location:"Ubud",type:"Villas",units:"2",price:"$315K",status:"completed"},
      {name:"Oasis III Apartments",location:"Tibubeneng",type:"Apartments",units:"TBD",price:"$145K",status:"completed"},
      {name:"Edem Villas I",location:"Nusa Dua",type:"Villas",units:"TBD",price:"$160K-$310K",status:"completed"}
    ],
    contacts: {website:"https://breig-property.com",instagram:"https://instagram.com/breig_property",telegram:"https://t.me/pgodin",whatsapp:"https://wa.link/zut0kk"},
    pitch: "17 projects (12 completed, 42,000m²), Exquisite Awards 2024 Best Property Developer in Bali. Vertically integrated — in-house construction, legal, management. Paying Unitbox subscriber."
  },
  {
    name: "NEXA",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Big Waves Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Stetsyuk Development",
    origin: "", originTag: "ru",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Avalon",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Alex Villas",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Theia",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Indonesian Construction Group",
    origin: "Indonesia", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Vibe Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Balix",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Almal",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Performa",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Revolt Group",
    origin: "", originTag: "ru",
    founder: "ex Bali Invest Club",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "ADDRESS",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "SWOI",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "PARQ Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Basic Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Magnun",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Dolphin Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Bali Capital Group",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "CUBE Development",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "TUTUM TERRA",
    origin: "", originTag: "int",
    founder: "Lima Residency",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: {},
    pitch: ""
  },
  {
    name: "Vertikal",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Rebekka Ross": "" },
    pitch: ""
  },
  {
    name: "Franz Group",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Dmitriy Popovskiy": "" },
    pitch: ""
  },
  {
    name: "Green Hills",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Svetlana Lanushky": "" },
    pitch: ""
  },
  {
    name: "Balive",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Dmitriy Krestiyannikov": "", "Ivan Krestiannikov": "" },
    pitch: ""
  },
  {
    name: "Alex Estate Production",
    origin: "Indonesia", originTag: "id",
    founder: "Alex Sanbaev",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Alex Sanbaev": "" },
    pitch: ""
  },
  {
    name: "Rentaved",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Oleg Panfilov": "" },
    pitch: ""
  },
  {
    name: "Farsight Management",
    origin: "Russia", originTag: "ru",
    founder: "Victor Plotnikov (CEO), Evgenii Lomonosov (co-founder)",
    website: "farsight24.com", instagram: "@farsight_management",
    whatsapp: "+62 823-2280-7135", email: "inquiries@farsight24.com",
    projects: 8, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "250+ managed properties", isNew: false,
    projectList: [],
    contacts: {website:"https://farsight24.com",instagram:"https://instagram.com/farsight_management","Anatoly Kanaev":"","Iya Gaivyk":""},
    pitch: "Property management company managing 250-300+ premium rental villas in Bali. Built 8 turnkey villas but primarily operates as management platform for property owners. 14+ years in business."
  },
  {
    name: "J-Hills",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Andrey Pestov": "" },
    pitch: ""
  },
  {
    name: "Big Way",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Artur": "", "Anna": "" },
    pitch: ""
  },
  {
    name: "SK10",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Vladislav Pashenko": "" },
    pitch: ""
  },
  {
    name: "Delos",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Alexandra Birulya": "" },
    pitch: ""
  },
  {
    name: "Stroiklass",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Shamil": "" },
    pitch: ""
  },
  {
    name: "MB Homes",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Alexey Ivashkin": "" },
    pitch: ""
  },
  {
    name: "Cordial Construction",
    origin: "", originTag: "int",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Azamat": "" },
    pitch: ""
  },
  {
    name: "Azizi Developments",
    origin: "UAE", originTag: "ae",
    founder: "",
    website: "", instagram: "",
    whatsapp: "", email: "",
    projects: 0, activeProjects: 0, activeUnits: 0,
    priceRange: "", hasAgent: false, aum: "", isNew: true,
    projectList: [],
    contacts: { "Abdulwahab Hajjar": "" },
    pitch: ""
  }
];
