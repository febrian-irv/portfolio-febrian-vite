import profileImg from "../assets/images/pp.jpg";
import resumePdf from "../assets/files/CV_Febrian Irvansyah_1025-v9-web.pdf";

const ProfileCards = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Photo Card with Status */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
        <div className="relative aspect-square w-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg flex items-center justify-center border border-cyan-500/20 overflow-hidden group">
          <img
            src={profileImg}
            alt="Profile"
            className="rounded-lg w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Name Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white font-be-vietnam mb-1">
            Febrian Irvansyah
          </h1>
          <p className="text-sm text-cyan-400 font-be-vietnam">
            Software Engineer
          </p>
        </div>
      </div>

      {/* Location & Timezone Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <span className="text-lg">📍</span>
            </div>
            <div>
              <p className="text-sm text-white font-be-vietnam">
                Jakarta, Indonesia
              </p>
              <p className="text-xs text-gray-400 font-be-vietnam">UTC+7</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <span className="text-lg">🎓</span>
            </div>
            <div>
              <p className="text-sm text-white font-be-vietnam">
                CS @ Universitas Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
        <h3 className="text-lg font-pixeled text-cyan-400 mb-4 flex items-center gap-2">
          <span className="text-sm">→</span> Contact
        </h3>
        <div className="space-y-2.5">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=febrian.irv@gmail.com&su=Reaching%20out%20after%20checking%20out%20your%20site!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-all duration-300 group p-2 rounded-lg hover:bg-cyan-500/5"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 border border-cyan-500/20">
              <span className="text-base">✉</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-be-vietnam">Email</p>
              <p className="text-sm font-be-vietnam truncate">
                febrian.irv@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/febrian-irvansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-all duration-300 group p-2 rounded-lg hover:bg-cyan-500/5"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 border border-cyan-500/20">
              <span className="text-base font-bold">in</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-be-vietnam">LinkedIn</p>
              <p className="text-sm font-be-vietnam truncate">
                linkedin.com/in/febrian-irvansyah
              </p>
            </div>
          </a>

          <a
            href="https://github.com/febrian-irv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-all duration-300 group p-2 rounded-lg hover:bg-cyan-500/5"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 border border-cyan-500/20">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-be-vietnam">GitHub</p>
              <p className="text-sm font-be-vietnam truncate">
                github.com/febrian-irv
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* About / Bio Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
        <h3 className="text-lg font-pixeled text-cyan-400 mb-4 flex items-center gap-2">
          <span className="text-sm">→</span> About
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-300 font-be-vietnam leading-relaxed">
            Software engineer who finds joy in product-minded engineering,
            comfortable thinking through problems, designing thoughtful
            solutions, and working closely with others to bring ideas to life.
          </p>
          <p className="text-sm text-gray-300 font-be-vietnam leading-relaxed">
            My experience spans contributions at Sokratech and Suara Mahasiswa
            UI, where I applied technical skills and a product-minded approach
            to build solutions that addressed real user needs.
          </p>
        </div>
      </div>

      {/* Resume Download Card */}
      <a
        href={resumePdf}
        download="CV_Febrian_Irvansyah.pdf"
        className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-sm hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 group block"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-cyan-400"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-white font-be-vietnam font-medium">
                Download Resume
              </p>
              <p className="text-xs text-gray-400 font-be-vietnam">
                PDF • Updated October 2025
              </p>
            </div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default ProfileCards;
