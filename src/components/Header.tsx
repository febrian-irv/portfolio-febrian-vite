import { Mail, Linkedin, Github } from "lucide-react";

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "projects", label: "PROJECTS" },
    { id: "writings", label: "WRITINGS" },
    { id: "about", label: "ABOUT ME" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 xl:px-32 py-4 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between">
        {/* Left - Brand */}
        <div className="text-white font-pixeled text-xl sm:text-2xl">Feb</div>

        {/* Right - Navigation & Social Icons */}
        <nav className="flex items-center gap-6 sm:gap-8 md:gap-10">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white font-pixeled text-xs lg:text-sm uppercase">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative flex items-center gap-2 hover:opacity-70 transition-opacity group"
              >
                {/* Glowing indicator dot */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                    activeSection === item.id
                      ? "bg-cyan-400 blur-[0.5px] shadow-[0_0_8px_3px_rgba(34,211,238,0.5)]"
                      : "bg-transparent"
                  }`}
                />
                <span className="leading-none">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-white text-lg sm:text-xl">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=febrian.irv@gmail.com&su=Reaching%20out%20after%20checking%20out%20your%20site!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/febrian-irvansyah/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/febrian-irv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
