import AsciiDnaHelix from "./components/AsciiDnaHelix";
import ProjectCard from "./components/ProjectCard";
import NoteCard from "./components/NoteCard";
import ExperienceItem from "./components/ExperienceItem";
import Header from "./components/Header";
import ProfileCards from "./components/ProfileCards";
import ScrollableSection from "./components/ScrollableSection";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

import sentryImg from "./assets/images/sentry.png";
import otomatisasiImg from "./assets/images/otomatisasi.png";
import deploymentImg from "./assets/images/deployment.png";
import solidImg from "./assets/images/solid.png";
import secureImg from "./assets/images/secure.png";
import k6Img from "./assets/images/k6.png";
import projectImg from "./assets/images/project.png";
import sonarImg from "./assets/images/sonar.png";
import tddImg from "./assets/images/tdd.png";
import pytestImg from "./assets/images/pytest.png";
import lunaraCutVideo from "./assets/videos/lunara_cut.mov";
import lunaraImg from "./assets/images/lunara.png";
import lunaraLogo from "./assets/images/lunara_logo.png";
import culturateCutVideo from "./assets/videos/culturate_cut.mov";
import culturateImg from "./assets/images/culturate.png";
import culturateLogo from "./assets/images/culturate_logo.png";
import sokratechLogo from "./assets/images/sokratech_logo.png";
import sokratechImg from "./assets/images/sokratech.png";
import uigtrLogo from "./assets/images/uigtr_logo.png";
import uigtrImg from "./assets/images/uigtr.png";

const svgStyle = {
  position: "absolute" as const,
  inset: 0,
  zIndex: 0,
  pointerEvents: "none" as const,
};

// Standardized padding for all sections
const SECTION_PADDING = "px-8 md:px-16 lg:px-24 xl:px-32";

function App() {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "writings", "about"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate DNA Helix dimensions based on viewport - scaled up for better visibility
  const getDnaHelixDimensions = () => {
    const width = viewportSize.width;
    const height = viewportSize.height;

    if (width < 640) {
      // Mobile - scale to viewport
      return {
        width: Math.min(width * 1.2, 700),
        height: Math.min(height * 0.8, 700),
      };
    } else {
      // Tablet, Desktop, and larger - consistent medium-large size
      return {
        width: Math.min(width * 1.1, 1800),
        height: Math.min(height * 1, 1600),
      };
    }
  };

  const dnaHelixDimensions = getDnaHelixDimensions();

  // Calculate DNA Helix positioning - centered with diagonal rotation
  const getDnaHelixContainerStyle = () => {
    const width = viewportSize.width;
    const baseStyle = {
      pointerEvents: "none" as const,
      zIndex: 5,
      position: "absolute" as const,
      left: "40%",
      top: "50%",
      transformOrigin: "center center",
    };

    if (width < 640) {
      // Mobile - centered with diagonal
      return {
        ...baseStyle,
        transform: "translate(-50%, -50%) rotate(45deg)",
      };
    } else if (width < 1024) {
      // Tablet - centered with diagonal
      return {
        ...baseStyle,
        transform: "translate(-50%, -50%) rotate(55deg)",
      };
    } else {
      // Desktop and Ultra-wide - centered with diagonal
      return {
        ...baseStyle,
        transform: "translate(-50%, -50%) rotate(60deg)",
      };
    }
  };

  const dnaHelixContainerStyle = getDnaHelixContainerStyle();

  const projects = [
    {
      title: "Culturate",
      logo: culturateLogo,
      imageUrl: culturateImg,
      videoUrl: culturateCutVideo,
      statistics: "Real-time Multiplayer",
      quote:
        "AI-powered culture guesser game with real-time gameplay.\n• Built AI pipeline for content validation\n• Built Bidirectional WebSocket for real-time media and player communication\n• Autonomous media scraping pipeline for Indonesian cultural content",
      tags: [
        "WebSocket",
        "PostgreSQL",
        "Python",
        "Typescript",
        "FastAPI",
        "Vite",
      ],
      link: "https://devpost.com/software/culturate",
    },
    {
      title: "Sokratech",
      logo: sokratechLogo,
      imageUrl: sokratechImg,
      videoUrl: undefined,
      statistics: "\n5x Performance\n80% Faster",
      quote:
        "Enhanced fraud detection and KYB system with significant performance improvements.\n• Designed and built ML-powered workflow recommendations using Tree Ensemble models\n• 5x faster document extraction through parallel processing\n• React Flow rule engine with 80% faster validation performance",
      tags: [
        "Python",
        "React",
        "GCP",
        "PostgreSQL",
        "Docker",
        "Typescript",
        "Bun",
      ],
      link: "https://www.sokratech.io/",
    },
    {
      title: "Lunara",
      logo: lunaraLogo,
      imageUrl: lunaraImg,
      videoUrl: lunaraCutVideo,
      statistics: "10+ Financial KPIs",
      quote:
        "AI-first accounting system built for Indonesian micro-scale businesses.\n• Cost optimization with actionable recommendations\n• Generate dynamic charts and reports through conversational commands\n• Cashflow tracking and inventory management",
      tags: ["Golang", "Python", "React", "PostgreSQL"],
      link: "https://github.com/febrian-irv/chrematos-be",
    },
    {
      title: "UIGTR",
      logo: uigtrLogo,
      imageUrl: uigtrImg,
      videoUrl: undefined,
      statistics: "RAG-Powered AI",
      quote:
        "AI chatbot for university programs and admission information.\n• Hybrid sparse and dense retrieval for optimal accuracy\n• Retrieval-Augmented Generation for complex queries\n• Complete CI/CD pipeline on GCP with Docker and Cloud Run",
      tags: ["Python", "GCP", "React"],
      link: "https://www.uigoestoriau.com/",
    },
  ];

  const articles = [
    {
      title: "Error Tracking dan Performance Monitoring Menggunakan Sentry",
      content:
        "Sebagai developer terkadang kita sering kali hanya berfokus pada bagaimana membangun program yang cepat dan reliable dengan memperhatikan algoritma dan clean code yang terlihat pada codebase. Akan tetapi, untuk mengetahui apakah sebuah program itu reliable kita harus memahami apa yang terjadi pada production.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/sentry-error-tracking-and-performance-monitoring-for-reliable-platforms-4f91e7895684",
      imageUrl: sentryImg,
      language: "Indonesian",
    },
    {
      title:
        "Mastering IT Project Management: Unlocking Productivity with Jira, GitHub & Notion",
      content:
        "In today's world everyone have a chance to produce great ideas and implementing them, but what makes successful collaboration project different? The Workflow. What do I mean by the workflow? it's the way the project is being conducted from planning, execution, to evaluation.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/mastering-it-project-management-unlocking-productivity-with-jira-github-notion-bc0da864a0fc",
      imageUrl: projectImg,
      language: "English",
    },
    {
      title:
        "Otomatisasi Pembuatan Ruleset Berbasis Supervised Learning dengan AutoWoE dan Format JsonLogic melalui API",
      content:
        "Dalam melakukan decision making menggunakan rule engine, kerap kali memakan waktu yang sangat lama karena dibutuhkan system analyst yang secara hati-hati menentukan rules yang sesuai dengan ekspektasi serta software engineer yang mengimplementasikan ruleset yang telah ditentukan system analyst.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/automasi-pembuatan-ruleset-untuk-rule-engine-menggunakan-autowoe-dan-jsonlogic-format-melalui-api-4a968a3dba03",
      imageUrl: otomatisasiImg,
      language: "Indonesian",
    },
    {
      title:
        "Ensuring Code Quality using Static Code Analysis and Code Coverage Check",
      content:
        "There are two things that makes a code great, its source code and its functionality correctness. Source code is the foundation of how a program is running, and with that there is a lot of things that need to be considered to make the code running smoothly and maintainable.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/ensuring-code-quality-using-static-code-analysis-and-code-coverage-check-2bae9e2b564e",
      imageUrl: sonarImg,
      language: "English",
    },
    {
      title: "Implementing Test-Driven Development Methodology",
      content:
        "Test-Driven Development (TDD) is a development methodology that require writing tests before implementing the actual implementation. This methodology is expected to improve design as we are writing the test because we are defining how we expect the running source code would behave and help ensure code correctness.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/implementing-test-driven-development-methodology-85658197d62c",
      imageUrl: tddImg,
      language: "English",
    },
    {
      title:
        "Testing Python dengan Mocks, Fixtures, dan Pytest untuk Aplikasi FastAPI",
      content:
        "Testing merupakan bagian penting dari pengembangan software yang berfungsi untuk memastikan apakah sebuah aplikasi berjalan sesuai ekspektasi developer.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/membuat-tests-dengan-mock-dan-fixture-307417d55710",
      imageUrl: pytestImg,
      language: "Indonesian",
    },
    {
      title:
        "Deployment, Continuous Integration, dan Software Quality Assurance Pada Aplikasi Analytics",
      content:
        "Dalam pengembangan perangkat lunak di masa modern ini, penerapan deployment dan continuous integration merupakan elemen yang esensial untuk memastikan aplikasi dapat berjalan dengan baik dan efisien tanpa memakan waktu lebih pada setiap kali diperlukan untuk melakukan deployment.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/deployment-continuous-integration-dan-software-quality-assurance-pada-backend-aplikasi-analytics-c48b5780def3",
      imageUrl: deploymentImg,
      language: "Indonesian",
    },
    {
      title:
        "Menerapkan Prinsip SOLID dan Best Practices dalam Aplikasi Backend TypeScriptMenerapkan Prinsip SOLID dan Best Practices dalam Aplikasi Backend TypeScript",
      content:
        "SOLID Principles adalah panduan penting untuk menciptakan kode yang bersih, mudah dipelihara, dan scalable. Artikel ini akan membahas bagaimana prinsip-prinsip tersebut diterapkan pada kode TypeScript yang berfungsi untuk mengelola dataset.",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/menerapkan-prinsip-solid-dan-best-practices-di-aplikasi-backend-6f07d1d84388",
      imageUrl: solidImg,
      language: "Indonesian",
    },
    {
      title: "Penerapan Secure Programming Berdasarkan Kode dan Standar OWASP",
      content:
        "Secure programming adalah pendekatan penting dalam pengembangan perangkat lunak untuk memastikan aplikasi aman dari berbagai ancaman keamanan. Dalam artikel ini, kita akan membahas bagaimana kode pada konteks yang diberikan menerapkan prinsip secure programming berdasarkan standar OWASP (Open Web Application Security Project).",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/penerapan-secure-programming-berdasarkan-kode-dan-standar-owasp-4dadb6314d88",
      imageUrl: secureImg,
      language: "Indonesian",
    },
    {
      title: "Optimasi Pengujian Beban pada API Operasi Dataset dengan k6",
      content:
        "Pada artikel ini saya akan menceritakan pengalaman saya dalam mengoptimasi API backend. Optimasi sendiri dilakukan dalam 3 tahap, yaitu membuat script dan melakukan load testing terhadap API backend yang akan dioptimasi, melihat hasil testing dan memperbarui kode dengan cara refactoring agar testing selanjutnya akan berhasil",
      date: "Medium",
      url: "https://medium.com/@febrian.irv/optimasi-pengujian-beban-pada-api-operasi-dataset-dengan-k6-b4025c07b020",
      imageUrl: k6Img,
      language: "Indonesian",
    },
  ];

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Sokratech (Iterative S24)",
      location: "Jakarta, Indonesia",
      period: "February 2025 - present",
      responsibilities: [
        "Enhanced fraud detection system powered by a rule engine utilizing React Flow for visual workflow drag-and-drop creation and improved validation performance by 80%.",
        "Designed and built a machine learning-based rules recommendation for fraud detection using Tree Ensemble models and developed a backtesting feature to compare workflow draft performance against real workflows.",
        "Built Know Your Business (KYB) system to support corporate due diligence and onboarding processes, optimizing existing document extraction by achieving 5x faster document extraction through parallel processing and enhanced accuracy for lengthy documents via chunking strategies.",
      ],
    },
    {
      title: "Teaching Assistant of Advanced Programming",
      company: "Fakultas Ilmu Komputer Universitas Indonesia",
      location: "Depok, Indonesia",
      period: "January 2025 – June 2025",
      responsibilities: [
        "Assisted in teaching a class of 36 local and international students on software design principles, coding standards, testing, and monitoring.",
        "Providing constructive feedback for improvement for each assignment and project.",
        "Grading student assignments and projects to assess performance.",
      ],
    },
    {
      title: "Web Developer",
      company: "Badan Otonom Pers Suara Mahasiswa UI",
      location: "Depok, Indonesia",
      period: "January 2024 – present",
      responsibilities: [
        "Maintained the Content Management System (CMS) and the frontend of Pers Suara Mahasiswa UI News website (https://suaramahasiswa.com/)",
        "Updated and improved the Next.js frontend, leveraging its React foundation for better performance and maintainability",
        "Managed deployments as well as the domain and DNS configurations.",
      ],
    },
    {
      title: "Volunteer Backend Developer",
      company: "DANAYA",
      location: "Remote",
      period: "June 2024 – December 2024",
      responsibilities: [
        "Designed and developed an AI English learning chatbot service.",
        "Implement RAG techniques to improve the performance and accuracy of the AI.",
      ],
    },
    {
      title: "Project Officer",
      company: "Universitas Indonesia Goes to Riau 2024",
      location: "Riau, Indonesia",
      period: "November 2023 – February 2024",
      responsibilities: [
        "Led a 60-member organizing team to execute four large-scale educational events across Riau Province aimed to inspire and motivate students across Riau Province to pursue higher education and reach their academic potential.",
        "Raised Rp72 million of funds for operations and collaborated with key partners, including Pertamina, by.U, Indah Kiat Pulp & Paper, and the Pekanbaru City Government.",
        "Organized a province-wide roadshow to 42 schools across Riau and a main exhibition event that invited Universitas Indonesia stakeholders and the Ruangguru Clash of Champions winner.",
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen relative bg-black overflow-x-hidden">
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full min-h-screen h-screen overflow-hidden z-10"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1728 1298"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="illuminate"
          style={svgStyle}
          preserveAspectRatio="xMidYMax slice"
        >
          <g filter="url(#filter0_fn_48_27)">
            <ellipse cx="841.5" cy="950" rx="701.5" ry="264" fill="#1FB3CC" />
          </g>
          <defs>
            <filter
              id="filter0_fn_48_27"
              x="-360"
              y="-230"
              width="2403"
              height="1528"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="250"
                result="effect1_foregroundBlur_48_27"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="2 2"
                stitchTiles="stitch"
                numOctaves="3"
                result="noise"
                seed="184"
              />
              <feColorMatrix
                in="noise"
                type="luminanceToAlpha"
                result="alphaNoise"
              />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA
                  type="discrete"
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                />
              </feComponentTransfer>
              <feComposite
                operator="in"
                in2="effect1_foregroundBlur_48_27"
                in="coloredNoise1"
                result="noise1Clipped"
              />
              <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite
                operator="in"
                in2="noise1Clipped"
                in="color1Flood"
                result="color1"
              />
              <feMerge result="effect2_noise_48_27">
                <feMergeNode in="effect1_foregroundBlur_48_27" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <div className="absolute z-5" style={dnaHelixContainerStyle}>
          <AsciiDnaHelix
            width={dnaHelixDimensions.width}
            height={dnaHelixDimensions.height}
          />
        </div>

        <div className="text-white absolute z-20 left-6 top-20 sm:left-8 sm:top-24 md:left-12 md:top-28 lg:left-16 lg:top-32 text-left">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-pixeled leading-normal font-bold">
            Hi, I'm FEBRIAN
          </h1>
          <p className="font-be-vietnam text-xl sm:text-xl md:text-2xl lg:text-3xl mt-4 max-w-full md:max-w-[50vw]">
            {" "}
            Software engineer who finds joy in product-minded engineering,
            comfortable thinking through problems, and build solutions that
            create a real impact.
          </p>
        </div>

        <div className="text-white absolute z-20 right-6 bottom-8 sm:right-8 sm:bottom-10 md:right-12 md:bottom-12 lg:right-16 lg:bottom-16 text-right">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-pixeled leading-normal">
            engineer the
            <br />
            FUTURE
            <br />
            with every
            <br />
            STRAND OF CODE
          </h1>
        </div>

        {/* Bouncing Arrow Down */}
        <div className="absolute z-30 left-1/2 bottom-50 transform -translate-x-1/2 animate-bounce cursor-pointer">
          <ArrowDown
            className="text-white/80 hover:text-white transition-colors"
            size={40}
            strokeWidth={2}
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        {/* Gradient overlay for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/50 to-black z-15 pointer-events-none"></div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative w-full py-12 bg-black z-10">
        <div className={SECTION_PADDING}>
          <h2 className="text-4xl font-pixeled text-white mb-8">
            What I've shipped
          </h2>
        </div>
        <div className={SECTION_PADDING}>
          <ScrollableSection gap="gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                logo={project.logo}
                imageUrl={project.imageUrl}
                videoUrl={project.videoUrl}
                statistics={project.statistics}
                quote={project.quote}
                tags={project.tags}
                link={project.link}
              />
            ))}
          </ScrollableSection>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative w-full py-12 bg-black z-10">
        <div className={SECTION_PADDING}>
          <h2 className="text-4xl font-pixeled text-white mb-8">Writings</h2>
        </div>
        <div className={SECTION_PADDING}>
          <ScrollableSection gap="gap-6">
            {articles.map((article, index) => (
              <NoteCard
                key={index}
                title={article.title}
                content={article.content}
                date={article.date}
                url={article.url || ""}
                imageUrl={article.imageUrl}
                language={article.language}
              />
            ))}
          </ScrollableSection>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`relative w-full py-12 bg-black z-10 ${SECTION_PADDING}`}
      >
        <h2 className="text-4xl font-pixeled text-white mb-12">
          Experiences & About Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left - Experiences */}
          <div className="lg:col-span-2">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={index}
                title={exp.title}
                company={exp.company}
                location={exp.location}
                period={exp.period}
                responsibilities={exp.responsibilities}
              />
            ))}
          </div>

          {/* Right - Profile Cards */}
          <div className="lg:col-span-1">
            <ProfileCards />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
