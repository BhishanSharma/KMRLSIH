import React, { useState } from "react";
import {
  Code,
  Database,
  Cpu,
  Palette,
  Layers,
  Zap,
  Github,
  Linkedin,
  Mail,
  Star,
  Award,
  Coffee,
  Users,
  Target,
  Lightbulb,
  Heart,
} from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "Himanshu Saxena",
      role: "Frontend Team Lead & Solutions Architect",
      team: "Frontend",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQHnN4nwaclN8g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701354014775?e=1761782400&v=beta&t=2ma8veJ28ZaQM5JWMsO30cFzJ3S3Azj-89HQwGHD2A8",
      description:
        "Leading the frontend architecture with expertise in modern web technologies and API integration. Passionate about creating seamless user experiences and scalable solutions.",
      skills: [
        "React.js",
        "TypeScript",
        "API Integration",
        "System Architecture",
        "Team Leadership",
      ],
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      achievements: [
        "Led 15+ successful projects",
        "Mentored 8 developers",
        "Architected microservices",
      ],
    },
    {
      name: "Shanvi",
      role: "UI/UX Design Lead & Product Designer",
      team: "Frontend",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQHjsDCZMXtlgA/profile-displayphoto-shrink_400_400/B56Zc5aJTNH8Ag-/0/1749014846132?e=1761782400&v=beta&t=iib6ZmsWeNbF6nVx-1K7GislyT10TvZljT6zk9joxpc",
      description:
        "Crafting intuitive and beautiful user interfaces with a focus on user-centered design principles. Expert in creating design systems that scale.",
      skills: [
        "UI/UX Design",
        "Design Systems",
        "User Research",
        "Prototyping",
        "Visual Design",
      ],
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      achievements: [
        "Designed 20+ user interfaces",
        "98% user satisfaction",
        "Created unified design system",
      ],
    },
    {
      name: "Shwe Win Aung",
      role: "Frontend Developer & Animation Specialist",
      team: "Frontend",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQFlTg4DVCWcVQ/profile-displayphoto-scale_400_400/B56ZlMGmzSHcAg-/0/1757918425224?e=1761782400&v=beta&t=mEJmJb2bOelCPwgPKQrnaUC5xrki_kFWfviK_HE8BEI",
      description:
        "Bringing designs to life with smooth animations and interactive experiences. Specializes in modern frontend frameworks and creative web technologies.",
      skills: [
        "React.js",
        "TailwindCSS",
        "Framer Motion",
        "GSAP",
        "Clean Code",
        "API",
        "MULTILANGUAGE",
      ],
      icon: Zap,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      achievements: [
        "Created 50+ animations",
        "Improved UX by 40%",
        "Built interactive demos",
      ],
    },
    {
      name: "Bhishan Sharma",
      role: "AI/ML Engineer & Workflow Architect",
      team: "Backend",
      image: "https://avatars.githubusercontent.com/u/186663682?v=4",
      description:
        "Designing and implementing intelligent systems with advanced AI workflows. Expert in machine learning pipelines and automation technologies.",
      skills: [
        "Python",
        "Machine Learning",
        "AI Workflows",
        "MLOps",
        "Data Science",
      ],
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      achievements: [
        "Built 12 ML models",
        "Automated 80% workflows",
        "Published 3 research papers",
      ],
    },
    {
      name: "Akarsh Mishra",
      role: "Data Engineer & Integration Specialist",
      team: "Backend",
      image: "https://avatars.githubusercontent.com/u/155228025?v=4",
      description:
        "Managing complex data pipelines and integration workflows using n8n and various data sources. Expert in ETL processes and data transformation.",
      skills: [
        "Data Engineering",
        "n8n Automation",
        "ETL Pipelines",
        "API Integration",
        "Data Analytics",
      ],
      icon: Database,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      achievements: [
        "Processed 10TB+ data",
        "Integrated 25+ APIs",
        "Reduced processing time by 60%",
      ],
    },
    {
      name: "Himanshu Jha",
      role: "Backend Developer & Database Architect",
      team: "Backend",
      image:
        "https://media.licdn.com/dms/image/v2/D5635AQGDA7SVVyrZpA/profile-framedphoto-shrink_400_400/B56ZeR1T3VHEAk-/0/1750498361118?e=1759442400&v=beta&t=A5oJ1tSZZNyoUTay46vZ-TPFbKdWClHNwUvqmJYqAss",
      description:
        "Building robust backend systems with focus on database optimization and API development. Expert in scalable server architectures and data modeling.",
      skills: [
        "Node.js",
        "Database Design",
        "API Development",
        "System Optimization",
        "Cloud Services",
      ],
      icon: Code,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      achievements: [
        "Optimized DB by 70%",
        "Built 100+ APIs",
        "Managed 5 production systems",
      ],
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "50+", icon: Award },
    { label: "Lines of Code", value: "100K+", icon: Code },
    { label: "Coffee Consumed", value: "2000+", icon: Coffee },
    { label: "Happy Clients", value: "25+", icon: Heart },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We embrace creative solutions.",
      icon: Lightbulb,
    },
    {
      title: "Collaboration",
      description: "Teamwork and diverse perspectives.",
      icon: Users,
    },
    {
      title: "Quality",
      description: "High standards in design and code.",
      icon: Target,
    },
    {
      title: "Learning",
      description: "Continuous skill improvement.",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-white/30 rounded-2xl mt-10 text-black">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl text-black/80 font-bold mb-6">
          Meet Our Team
        </h1>
        <p className=" text-black/60 max-w-8xl mx-auto mb-12">
          A passionate group of developers, designers, and engineers working
          together to create innovative solutions.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/30 border border-white/50 rounded-2xl p-6 flex flex-col items-center transition hover:scale-105"
            >
              <stat.icon className="h-8 w-8 mb-2 text-black/80" />
              <div className="text-2xl font-bold text-black/80">
                {stat.value}
              </div>
              <div className="text-black/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-6 flex justify-center gap-4">
        {["team", "values", "story"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-white/30  text-black/80 shadow"
                : " text-black/60 hover:bg-white/50"
            }`}
          >
            {tab === "team"
              ? "Our Team"
              : tab === "values"
              ? "Our Values"
              : "Our Story"}
          </button>
        ))}
      </section>

      {/* Team Section */}
      {activeTab === "team" && (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-black/80 font-bold mb-4">
              The Dream Team
            </h2>
            <p className="text-black/60 max-w-8xl mx-auto">
              Each member brings unique expertise and passion to create
              something extraordinary together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative backdrop-blur-xl bg-green/3  bg-white/30 border-white/50 rounded-3xl p-8 transition hover:shadow hover:scale-105"
                onMouseEnter={() => setHoveredMember(idx)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar */}
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    srcset=""
                    className="rounded-full"
                  />
                </div>

                <h3 className="text-xl font-bold mb-1 text-black/80">
                  {member.name}
                </h3>
                <p className="text-black/60 mb-4">{member.role}</p>
                <p className="text-black/60 text-sm mb-4">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/30 text-black/80 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                {hoveredMember === idx && (
                  <div className="absolute inset-0 bg-white/85 p-6 rounded-3xl flex flex-col justify-center text-black transition-opacity transition-all">
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="text-sm space-y-1">
                      {member.achievements.map((ach, aidx) => (
                        <li key={aidx} className="flex items-center">
                          <Star className="h-3 w-3 mr-2" /> {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Values Section */}
      {activeTab === "values" && (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black/80">
              Our Core Values
            </h2>
            <p className="text-black/60 max-w-8xl mx-auto">
              The principles that guide our work and shape our team culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="backdrop-blur-sm bg-green/30 border border-white/50 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <v.icon className="h-8 w-8 text-black/80" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black/80">
                  {v.title}
                </h3>
                <p className="text-black/60">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story Section */}
      {activeTab === "story" && (
        <section className="px-6 pb-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-black/80">Our Story</h2>
          <p className="mb-6 text-black/60">
            From individual expertise to collective excellence.
          </p>
          <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-10 shadow-md">
            <p className="text-black/80 mb-4">
              Our team came together with a shared vision: to build innovative
              digital solutions that make a real difference. Collaboration and
              creativity drive everything we do.
            </p>
            <p className="text-black/80 mb-4">
              With diverse backgrounds spanning frontend development, backend
              architecture, AI/ML engineering, and design, we bring a unique
              perspective to every project.
            </p>
            <blockquote className="text-black/80 italic border-l-4 border-white/50 pl-4 mt-4">
              "Great things are done by a series of small things brought
              together."
            </blockquote>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
