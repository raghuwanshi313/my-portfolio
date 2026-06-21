import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import all models (Make sure these paths match your structure)
import PersonalInfo from './src/models/personalInfo.models.js';
import Experience from './src/models/experiences.models.js';
import Project from './src/models/projects.models.js';
import Skill from './src/models/skills.models.js';
import CodingProfile from './src/models/codingProfiles.models.js';
import Certification from './src/models/certifications.models.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const dummyData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // Clear existing data
    await PersonalInfo.deleteMany();
    await Experience.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await CodingProfile.deleteMany();
    await Certification.deleteMany();

    console.log("Adding Personal Info...");
    await PersonalInfo.create({
      name: "Aman Raghuwanshi",
      tagline: "Software Engineering Student @ IIITDM Jabalpur",
      description: "Software Engineering student at IIITDM Jabalpur with experience in building scalable backend systems and AI-powered applications. Interested in Data Structures & Algorithms and Competitive Programming, with strong problem-solving skills developed through 1000+ coding problems and regular participation in coding contests.",
      email: "23bcs021@iiitdmj.ac.in",
      phone: "+91 9301767181",
      profile_image: "https://res.cloudinary.com/diafrlfsd/image/upload/v1780376787/iil1jf1dgjrwhumwpuee.jpg",
      social_links: {
        github: "https://github.com/raghuwanshi313",
        linkedin: "https://www.linkedin.com/in/aman-raghuwanshi-990169284/",
      }
    });

    console.log("Adding Experiences...");
    await Experience.create([
      {
        role: "Web Development Intern",
        company_name: "MSol Technologies Pvt. Ltd.",
        location: "Jabalpur",
        joining_date: new Date("2025-10-01"),
        leaving_date: new Date("2025-12-31"),
        is_current: false,
        description: "Worked on an e-commerce platform serving 1,000+ users. Implemented validation and authentication for multiple transaction flows, preventing invalid submissions. Optimized backend APIs and database queries. Resolved 30+ issues across frontend and backend, improving overall user experience. Collaborated in a 5-member Agile team using Git workflows and code reviews. Enhanced API reliability by handling edge cases and improving error responses.",
        achievements: [
          "Implemented validation and authentication for multiple transaction flows, preventing invalid submissions",
          "Optimized backend APIs and database queries for an e-commerce platform serving 1,000+ users",
          "Resolved 30+ issues across frontend and backend, improving overall user experience",
          "Collaborated in a 5-member Agile team using Git workflows and code reviews",
          "Enhanced API reliability by handling edge cases and improving error responses"
        ],
        tech_stack: ["Node.js", "Express.js", "MongoDB", "React.js", "Git"]
      },
      {
        role: "Software Engineering Intern",
        company_name: "FUSION Portal, IIITDM Jabalpur",
        location: "Jabalpur",
        joining_date: new Date("2025-08-01"),
        leaving_date: new Date("2025-11-30"),
        is_current: false,
        description: "Under Prof. Atul Gupta. Developed an announcement system used by 2500+ users, improving communication efficiency. Structured workflows covering 3+ roles for application submission, verification, and approval. Implemented role-based access control for multiple user roles, improving administrative efficiency. Contributed to modular backend services ensuring scalability and maintainability.",
        achievements: [
          "Developed an announcement system used by 2500+ users, improving communication efficiency",
          "Structured workflows covering 3+ roles for application submission, verification, and approval",
          "Implemented role-based access control for multiple user roles, improving administrative efficiency",
          "Contributed to modular backend services ensuring scalability and maintainability"
        ],
        tech_stack: ["Python", "Django", "PostgreSQL", "Git"]
      }
    ]);

    console.log("Adding Projects...");
    await Project.create([
      {
        title: "RAGenius – AI-Powered Student Support System",
        description: "Architected scalable RAG-based system using LangChain and FAISS, processing 500+ academic records for semantic search and response generation. Engineered Flask-based REST APIs handling concurrent user queries with optimized response time. Improved query response relevance using semantic search over 500+ documents. Developed an admin dashboard to monitor low-confidence responses and update the knowledge base. Automated student query resolution, reducing manual support workload.",
        image: "https://via.placeholder.com/300",
        github_link: "https://github.com/raghuwanshi313/RAGenius",
        tech_stacks: ["Python", "Flask", "React", "MongoDB", "LangChain", "FAISS"]
      },
      {
        title: "Chanakya – Real-Time Collaborative Editor",
        description: "Developed a collaborative editor supporting 10+ concurrent users with real-time updates. Implemented CRDT-based synchronization for conflict-free collaboration. Established low-latency peer-to-peer communication using WebRTC for real-time collaboration.",
        image: "https://via.placeholder.com/300",
        github_link: "https://github.com/raghuwanshi313",
        live_link: "https://vani-frontend.vercel.app/",
        tech_stacks: ["React", "WebSockets", "WebRTC", "Yjs"]
      }
    ]);

    console.log("Adding Skills...");
    await Skill.create({
      programming_languages: ["Python", "JavaScript", "C++", "Java"],
      frontend: ["React.js", "Next.js", "TypeScript"],
      backend: ["Node.js", "Express.js", "Flask"],
      databases: ["MongoDB", "MySQL"],
      dev_tools: ["Git", "Postman", "VS Code", "Docker"],
      other: ["RAG", "LangChain", "FAISS", "Vector Search", "REST APIs", "Authentication", "Agile"]
    });

    console.log("Adding Coding Profiles...");
    await CodingProfile.create([
      {
        platform: "leetcode",
        username: "amanraghuwanshi",
        profile_url: "https://leetcode.com/u/amanraghuwanshi/",
        rank: "Top 10% globally",
        question_count: 550
      },
      {
        platform: "codechef",
        username: "raghuwanshi313",
        profile_url: "https://www.codechef.com/users/raghuwanshi313",
        rank: "3-star (Max 1640)",
        rating: 1640,
        question_count: 0
      },
      {
        platform: "codeforces",
        username: "raghuwanshi313",
        profile_url: "https://codeforces.com/profile/raghuwanshi313",
        rank: "Pupil (Max 1264)",
        rating: 1264,
        question_count: 0
      }
    ]);

    console.log("Adding Certificate...");
    await Certification.create([
      {
        name: "Web Development Internship Certificate",
        issued_by: "MSol Technologies Pvt. Ltd.",
        issue_date: new Date("2025-12-31"),
        image: "https://via.placeholder.com/300",
        credential_link: "https://drive.google.com/file/d/1CEGqEQtJO9e5jF3vmqJPQ8yrOhJNHHw0/view?usp=sharing",
        skills: ["Web Development", "Backend Optimization", "Authentication", "REST APIs", "Agile"]
      }
    ]);

    console.log("Data seeded successfully!");
    process.exit();

  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

dummyData();
