/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import SkillCard from "@/ui_components/SkillCard";
import { useOutletContext } from "react-router-dom";

const aboutItems = [
  {
    label: "Project done",
    number: 45,
  },
  {
    label: "Years of experience",
    number: 5,
  },
];

const skillItem = [
  // Programming Languages
  {
    imgSrc: "/skills_images/python.png",
    label: "Python",
    desc: "Back-End Development",
  },
  {
    imgSrc: "/skills_images/java.png",
    label: "Java",
    desc: "Object-Oriented Programming",
  },
  {
    imgSrc: "/skills_images/javascript.png",
    label: "JavaScript",
    desc: "Front-End & Back-End Development",
  },

  // Front-End Development
  {
    imgSrc: "/skills_images/html.png",
    label: "HTML",
    desc: "Markup Language",
  },
  {
    imgSrc: "/skills_images/css.png",
    label: "CSS",
    desc: "Styling & Responsive UI",
  },
  {
    imgSrc: "/skills_images/react.png",
    label: "React",
    desc: "Front-End Framework",
  },

  // Back-End Development
  {
    imgSrc: "/skills_images/spring_boot.png",
    label: "Spring Boot",
    desc: "Java Framework",
  },
  {
    imgSrc: "/skills_images/django.png",
    label: "Django",
    desc: "Python Web Framework",
  },
  // Databases
  {
    imgSrc: "/skills_images/mysql.png",
    label: "MySQL",
    desc: "Relational Database",
  },
  {
    imgSrc: "/skills_images/postgresql.png",
    label: "PostgreSQL",
    desc: "SQL-Based Database",
  },
  {
    imgSrc: "/skills_images/mongodb.png",
    label: "MongoDB",
    desc: "NoSQL Database",
  },

  // Cloud & DevOps
  {
    imgSrc: "/skills_images/aws.png",
    label: "AWS",
    desc: "Cloud Computing",
  },
  {
    imgSrc: "/skills_images/docker.png",
    label: "Docker",
    desc: "Containerization",
  },

  // Version Control & Tools
  {
    imgSrc: "/skills_images/git.png",
    label: "Git",
    desc: "Version Control",
  },
  {
    imgSrc: "/skills_images/github.png",
    label: "GitHub",
    desc: "Code Collaboration",
  },
  {
    imgSrc: "/skills_images/vscode.png",
    label: "VS Code",
    desc: "Development Environment",
  },
  {
    imgSrc: "/skills_images/intelij.png",
    label: "IntelliJ IDEA",
    desc: "Java Development",
  },
];

const AboutPage = () => {
  const { darkMode } = useOutletContext();
  return (
    <section className="section dark:text-white">
      <div className="container">
        <div className="bg-slate-900 dark:bg-zinc-800 rounded-2xl p-6 md:p-12">
          <p className="text-slate-100 about-text dark:text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
            Welcome! I’m Mihai, a passionate Full Stack Web Developer with a
            talent for crafting visually stunning and highly functional
            websites. With a strong foundation in Java, Python, and modern web
            technologies, I transform ideas into seamless, high-performance
            digital experiences. My expertise lies in blending technical
            precision with creative design, ensuring every project is not just
            efficient but also aesthetically compelling. Whether it’s a dynamic
            web application, an interactive portfolio, or a scalable enterprise
            solution, I bring innovation and attention to detail to every line
            of code.
          </p>
          <div className=" flex flex-wrap items-center gap-4 md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl text-slate-100 dark:text-zinc-300 font-semibold md:text-4xl">
                    {number}
                  </span>
                  <span className="font-semibold md:text-3xl text-slate-100 dark:text-zinc-300">+</span>
                </div>
                <p className="text-sm text-slate-100 dark:text-zinc-400">{label}</p>
              </div>
            ))}
            <img
              className="rounded-sm ml-auto"
              src={darkMode ? "/images/logo.png" : "/images/logo_bg.png"}
              alt="Logo"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div>
          <h2 className="text-5xl my-10 text-slate-900 dark:text-zinc-400">My Developer Toolkit</h2>
        </div>
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-6">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard key={key} imgSrc={imgSrc} label={label} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
