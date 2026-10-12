import { useEffect, useRef, useState } from "react";
import styles from "./TeamVisualSection.module.css";

interface TeamMember {
  name: string;
  label: string;
  role: string;
  category: string;
  description: string;
}

const people: TeamMember[] = [
  {
    name: "AJAY PETER",
    label: "Ajay Peter",
    role: "MARKETING & TECH DEPARTMENT LEAD",
    category: "GROWTH & ENGINEERING",
    description: "Turning ideas into impactful campaigns and leading the team to achieve greater milestones.",
  },
  {
    name: "JISHAD",
    label: "Jishad",
    role: "TECH LEAD",
    category: "ENGINEERING",
    description: "Leading the technical front, building scalable solutions and empowering the team to deliver excellence.",
  },
  {
    name: "SHABAB",
    label: "Shabab",
    role: "MANAGER",
    category: "OPERATIONS",
    description: "Driving the vision forward, aligning people, processes and performance for success.",
  },
  {
    name: "SAYID NAZIM",
    label: "Sayid Nazim",
    role: "SYSTEM ARCHITECT & CREATIVE HEAD",
    category: "ENGINEERING & DESIGN",
    description: "Designing the architecture of tomorrow while crafting experiences that inspire.",
  },
];

const centers = [0.248, 0.425, 0.585, 0.749];

const clamp = (x: number) => Math.max(0, Math.min(1, x));

export function TeamVisualSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLImageElement>(null);
  const windowSceneRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const windowScene = windowSceneRef.current;
    if (!section || !scene || !windowScene) return;

    const mobile = window.matchMedia("(max-width: 700px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = false;

    function render() {
      queued = false;
      if (!section || !scene || !windowScene) return;

      if (!mobile.matches) {
        scene.style.transform = "none";
        scene.style.width = "";
        scene.style.top = "";
        return;
      }

      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-section.getBoundingClientRect().top / distance);
      const steps = progress * 4;
      const index = Math.min(3, Math.floor(steps));
      const within = clamp(steps - index);
      const previous = Math.max(0, index - 1);
      const panT = reduced.matches ? 1 : clamp(within / 0.22);
      const eased = panT * panT * (3 - 2 * panT);
      const center = index === 0 ? centers[0] : centers[previous] + (centers[index] - centers[previous]) * eased;
      const sceneWidth = Math.min(2300, Math.max(900, windowScene.clientHeight * 3.7));

      scene.style.width = `${sceneWidth}px`;
      scene.style.top = `${-sceneWidth * 0.235}px`;
      const x = windowScene.clientWidth / 2 - center * sceneWidth;
      scene.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;

      if (index !== lastIndexRef.current) {
        lastIndexRef.current = index;
        setActiveIndex(index);
      }
    }

    function schedule() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(render);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const onMobileChange = () => {
      lastIndexRef.current = -1;
      schedule();
    };

    mobile.addEventListener("change", onMobileChange);
    reduced.addEventListener("change", schedule);

    schedule();

    const onImageLoad = () => schedule();
    scene.addEventListener("load", onImageLoad);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", onMobileChange);
      reduced.removeEventListener("change", schedule);
      scene.removeEventListener("load", onImageLoad);
    };
  }, []);

  const handleButtonClick = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + ((section.offsetHeight - window.innerHeight) * (i + 0.35)) / 4,
      behavior: reduced ? "instant" : "smooth",
    });
  };

  const currentPerson = people[activeIndex] ?? people[0];

  return (
    <section ref={sectionRef} className={styles.teamSection} id="team" aria-label="Meet the Octapus team">
      <div className={styles.teamPin}>
        <div className={styles.teamHeading}>
          <h2>
            MEET EXPERTS
            <br />
            BEHIND THE
            <br />
            INNOVATION
          </h2>
          <aside>
            <b>[ OUR TEAM ]</b>
            <p>Our team is a group of visionaries, creators and technologists working together to build the future.</p>
          </aside>
        </div>
        <div ref={windowSceneRef} className={styles.sceneWindow}>
          <img
            ref={sceneRef}
            className={styles.scene}
            id="scene"
            src="/team-scene.png"
            width={2940}
            height={1516}
            alt="Ajay Peter, Jishad, Shabab and Sayid Nazim seated in four illuminated panels"
          />
        </div>
        <article className={styles.mobileProfile} id="profile">
          <small id="category">{currentPerson.category}</small>
          <h3 id="name">{currentPerson.name}</h3>
          <strong id="role">{currentPerson.role}</strong>
          <p id="description">{currentPerson.description}</p>
        </article>
        <nav className={styles.mobileControls} aria-label="Team member navigation">
          {people.map((person, i) => (
            <button
              key={person.name}
              type="button"
              data-index={i}
              aria-label={`View ${person.name}`}
              aria-current={activeIndex === i ? "true" : "false"}
              onClick={() => handleButtonClick(i)}
            >
              <span>{`0${i + 1}`}</span>
              {person.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
