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
      description:
        "Leading the frontend architecture with expertise in modern web technologies and API integration. Passionate about creating seamless user experiences and scalable solutions.",
      skills: [
        "React.js",
        "TypeScript",
        "API Integration",
        "System Architecture",
      ],
      icon: Layers,
      achievements: [
        "Led 15+ successful projects",
        "Mentored 8 developers",
        "Architected microservices",
      ],
    },
    {
      name: "Shanvi",
      role: "UI/UX Design Lead & Product Designer",
      team: "Design",
      description:
        "Crafting intuitive and beautiful user interfaces with a focus on user-centered design principles. Expert in creating design systems that scale.",
      skills: [
        "UI/UX Design",
        "Design Systems",
        "Prototyping",
        "Visual Design",
      ],
      icon: Palette,
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
      description:
        "Bringing designs to life with smooth animations and interactive experiences. Specializes in modern frontend frameworks and creative web technologies.",
      skills: ["React.js", "CSS Animations", "Framer Motion", "Three.js"],
      icon: Zap,
      achievements: [
        "Created 50+ animations",
        "Improved UX by 40%",
        "Built interactive demos",
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
    <div className="min-h-screen bg-gray-50 rounded-2xl mt-10 text-green-200">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl text-green-600 font-bold mb-6">
          Meet Our Team
        </h1>
        <p className=" text-green-500 max-w-8xl mx-auto mb-12">
          A passionate group of developers, designers, and engineers working
          together to create innovative solutions.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 flex flex-col items-center transition hover:scale-105"
            >
              <stat.icon className="h-8 w-8 mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-500">
                {stat.value}
              </div>
              <div className="text-green-500 text-sm">{stat.label}</div>
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
                ? "bg-green-500 text-green-200 shadow-lg"
                : " text-green-500 hover:bg-green/50"
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
            <h2 className="text-3xl text-green-700 font-bold mb-4">
              The Dream Team
            </h2>
            <p className="text-green-500 max-w-8xl mx-auto">
              Each member brings unique expertise and passion to create
              something extraordinary together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative backdrop-blur-sm bg-green/30 border border-green-500 rounded-3xl p-8 transition hover:shadow-2xl hover:scale-105"
                onMouseEnter={() => setHoveredMember(idx)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <member.icon className="h-10 w-10 text-green-400" />
                </div>

                <h3 className="text-xl font-bold mb-1 text-green-500">
                  {member.name}
                </h3>
                <p className="text-green-400 mb-4">{member.role}</p>
                <p className="text-green-400 text-sm mb-4">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-200 text-green-500 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                {hoveredMember === idx && (
                  <div className="absolute inset-0 bg-green-500/85 p-6 rounded-3xl flex flex-col justify-center text-white transition-opacity">
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
            <h2 className="text-3xl font-bold mb-4 text-green-600">
              Our Core Values
            </h2>
            <p className="text-green-500 max-w-8xl mx-auto">
              The principles that guide our work and shape our team culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="backdrop-blur-sm bg-green/30 border border-green-400 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <v.icon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-500">
                  {v.title}
                </h3>
                <p className="text-green-500">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story Section */}
      {activeTab === "story" && (
        <section className="px-6 pb-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Our Story</h2>
          <p className="mb-6 text-green-500">
            From individual expertise to collective excellence.
          </p>
          <div className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-3xl p-10 shadow-md">
            <p className="text-green-500 mb-4">
              Our team came together with a shared vision: to build innovative
              digital solutions that make a real difference. Collaboration and
              creativity drive everything we do.
            </p>
            <p className="text-green-500 mb-4">
              With diverse backgrounds spanning frontend development, backend
              architecture, AI/ML engineering, and design, we bring a unique
              perspective to every project.
            </p>
            <blockquote className="text-green-500 italic border-l-4 border-green-200 pl-4 mt-4">
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
