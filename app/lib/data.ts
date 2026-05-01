// ─── Real resume data for Siddhen Pise ────────────────────────

export const personal = {
  name: "Siddhen Pise",
  role: "Computer Engineering Undergraduate",
  tagline: "Building real-world systems. Shipping products that matter.",
  description:
    "Computer Engineering undergraduate (2023–2027) with strong fundamentals in data structures & algorithms and practical full-stack development experience. Skilled in building and testing software projects, collaborating with teams, and learning new technologies. Currently working on AI/ML pipelines and real-world applications.",
  email: "siddhenpise11@gmail.com",
  location: "Navi Mumbai, India",
  github: "https://github.com/sidd4114",
  linkedin: "https://linkedin.com/in/siddhenpise",
};

export const education = [
  {
    id: "edu-01",
    degree: "BE in Computer Engineering",
    institution: "Fr. C. Rodrigues Institute of Technology",
    location: "Navi Mumbai",
    period: "2023 – 2027",
    highlights: [
      "CGPA: 9.85",
      "Ranked 2nd in Year 2, 3rd in Year 1",
      "10 SGPA in Sem 1 & Sem 4",
    ],
  },
  {
    id: "edu-02",
    degree: "CBSE Class XII",
    institution: "New Horizon Scholars School",
    location: "",
    period: "2023",
    highlights: ["90%", "MHT-CET: 97.1224 percentile"],
  },
  {
    id: "edu-03",
    degree: "ICSE Class X",
    institution: "EuroSchool, Airoli",
    location: "",
    period: "2021",
    highlights: ["95.8%"],
  },
];

export const experiences = [
  {
    id: "exp-01",
    role: "Web Developer Intern",
    company: "Optiqo – Fintech Startup",
    companyType: "Remote",
    period: "Jun 2025 – Aug 2025",
    description:
      "Developed responsive fintech interfaces using Next.js and shadcn/ui. Integrated AWS Cognito for authentication, Lambda functions, and SNS notifications. Collaborated across frontend and backend to deliver production features in a fintech environment.",
    stack: ["Next.js", "shadcn/ui", "AWS Cognito", "Lambda", "SNS"],
  },
  {
    id: "exp-02",
    role: "Web Developer Intern",
    company: "Fr. C. Rodrigues Institute of Technology",
    companyType: "Computer Department",
    period: "Dec 2025 – Ongoing",
    description:
      "Helping the Computer Department maintain the IMS website and revamping it for clearer navigation, updated UI, and faster content updates.",
    stack: ["HTML", "CSS", "JavaScript", "UI Revamp", "CMS"],
  },
  {
    id: "exp-03",
    role: "Deep Learning Intern",
    company: "Fr. C. Rodrigues Institute of Technology",
    companyType: "Computer Department",
    period: "Ongoing",
    description:
      "Building DL pipelines for knee (MRI) and hip (X-ray) implant templating (TKA/THA). Benchmarking bone segmentation models on public medical imaging datasets. Extracting anatomical landmarks for surgical axis and implant sizing.",
    stack: ["PyTorch", "OpenCV", "Medical Imaging", "Python", "NumPy"],
  },
];

export const projects = [
  {
    id: "proj-01",
    title: "FPGA Solder Joint Prediction",
    subtitle: "Real-time fault detection + lifetime prediction",
    description:
      "Real-time fault detection using FPGA + LSTM model to predict solder joint failure lifetime for electronic assemblies. Enables predictive maintenance, drastically reducing testing time.",
    stack: ["FPGA", "Python", "PyTorch", "LSTM"],
    github: "https://github.com/sidd4114",
    featured: true,
    year: "2025",
    category: "AI/ML · Embedded",
    status: "Ongoing",
  },
  {
    id: "proj-02",
    title: "Campus Craves",
    subtitle: "Online canteen ordering system",
    description:
      "Full-stack ordering platform that eliminates queues via pre-orders, online payments, and dynamic menu management. Scalable canteen operations with real-time order tracking.",
    stack: ["React", "Node.js", "Firebase", "Razorpay"],
    github: "https://github.com/sidd4114",
    featured: false,
    year: "2024",
    category: "Full-Stack · Web",
    status: "Shipped",
  },
  {
    id: "proj-03",
    title: "Internship Scraper Bot",
    subtitle: "Automated multi-platform internship discovery",
    description:
      "Automated multi-platform internship scraper with domain filtering, notification alerts, and personalized cover letter generation. Faster internship discovery with organized tracking.",
    stack: ["Python", "Selenium", "Asyncio", "Pandas"],
    github: "https://github.com/sidd4114",
    featured: false,
    year: "2024",
    category: "Automation · ML",
    status: "Shipped",
  },
];

export const skills = [
  {
    group: "Languages & Frameworks",
    items: ["Python", "C", "C++", "JavaScript", "HTML5", "CSS", "React.js", "Next.js", "Node.js"],
  },
  {
    group: "UI & Styling",
    items: ["Tailwind CSS", "shadcn/ui", "Figma", "Canva"],
  },
  {
    group: "Data & AI/ML",
    items: ["PyTorch", "NumPy", "Pandas", "Matplotlib", "DSA"],
  },
  {
    group: "Cloud & Backend",
    items: ["AWS Cognito", "AWS Lambda", "SNS", "Firebase", "Razorpay", "Git"],
  },
];

export const achievements = [
  {
    id: "ach-01",
    title: "TechNova 2025 — 1st Place, App Dev",
    context: "50+ teams · ₹8,000 prize",
    year: "2025",
    description:
      "Built 'Roots' (React Native, MongoDB) and won 1st place in App Development track among 50+ competing teams at TechNova 2025.",
  },
  {
    id: "ach-02",
    title: "Smart India Hackathon",
    context: "National — 2024 & 2025",
    year: "2024–25",
    description:
      "Participated in consecutive editions of Smart India Hackathon, India's largest government-level hackathon for student innovators.",
  },
  {
    id: "ach-03",
    title: "Academic Excellence — Ranked 2nd (Year 2)",
    context: "Fr. CRIT · CGPA 9.85",
    year: "2024–25",
    description:
      "Maintained a CGPA of 9.85, ranked 2nd in Year 2 and 3rd in Year 1. Achieved perfect 10 SGPA in Sem 1 and Sem 4.",
  },
  {
    id: "ach-04",
    title: "Sparkathon, Innovex E-Summit, Ideathon",
    context: "Multiple Events · 2024–25",
    year: "2024–25",
    description:
      "Active participant in Sparkathon 2024 & 2025, Innovex E-Summit 2025, and Ideathon 2k25 — consistently building and pitching innovative solutions.",
  },
];

export const eventsParticipated = [
  {
    id: "evt-01",
    name: "CodeSummit 2.0",
    issuer: "Avishkar 2025",
    issued: "Internal Round",
    type: "Coding Summit",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    note: "Participated in the internal round and solved product-focused coding challenges.",
  },
  {
    id: "evt-02",
    name: "Smart India Hackathon",
    issuer: "Smart India Hackathon",
    issued: "Issued Nov 2025",
    type: "National Hackathon",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    note: "Built and pitched solutions under national-level constraints and evaluation rounds.",
  },
  {
    id: "evt-03",
    name: "Spark-A-Thon 2025",
    issuer: "E-CELL FCRIT",
    issued: "Issued Nov 2025",
    type: "Campus Hackathon",
    image: "/ecoclub ideathon.jpg",
    note: "Focused on rapid ideation, MVP execution, and presentation quality.",
  },
  {
    id: "evt-04",
    name: "Google Agentic AI Day 2025",
    issuer: "Google",
    issued: "Issued Sep 2025",
    type: "AI Event",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    note: "Explored agentic AI workflows, model orchestration, and practical implementation patterns.",
  },
  {
    id: "evt-05",
    name: "KLEOS 3.0 – Round 1 Participation",
    issuer: "RAIT ACM Student Chapter",
    issued: "Issued Jul 2025",
    type: "Coding Contest",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    note: "Participated in round-based competitive coding with problem solving under time pressure.",
  },
  {
    id: "evt-06",
    name: "Ideathon 2k25 - IEI Student's Chapter, Fcrit",
    issuer: "IEI FCRIT Mechanical Students Chapter",
    issued: "Issued Mar 2025",
    type: "Ideation Challenge",
    image: "/felicitation 1st year.jpg",
    note: "Developed and presented innovation-led concepts with real-world impact framing.",
  },
  {
    id: "evt-07",
    name: "Innovex -E Summit 2025",
    issuer: "E-CELL FCRIT",
    issued: "Issued Mar 2025",
    type: "Startup Summit",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
    note: "Engaged in startup-oriented sessions and innovation discussions with peers.",
  },
  {
    id: "evt-08",
    name: "Smart India hackathon",
    issuer: "Smart India Hackathon",
    issued: "Issued Aug 2024",
    type: "National Hackathon",
    image: "/technova.jpg",
    note: "Participated in early-stage national hackathon rounds and solution pitching.",
  },
  {
    id: "evt-09",
    name: "CodeSummit 2024",
    issuer: "RAIT ACM Student Chapter",
    issued: "Issued Dec 2024",
    type: "Coding Summit",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    note: "Collaborated on coding tracks and learned competitive development practices.",
  },
  {
    id: "evt-10",
    name: "Sparkathon 2024",
    issuer: "Fr. Conceicao Rodrigues Institute of Technology",
    issued: "Issued Oct 2024",
    type: "Campus Hackathon",
    image: "/ecoclub ideathon.jpg",
    note: "Built prototypes rapidly and presented solutions in a hackathon environment.",
  },
  {
    id: "evt-11",
    name: "HacktoberFest'24",
    issuer: "Google Developers Group",
    issued: "Issued Oct 2024",
    type: "Open Source Event",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1200&auto=format&fit=crop",
    note: "Contributed and explored open-source collaboration workflows.",
  },
];
