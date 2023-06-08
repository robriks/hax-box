import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <label className="ml-6 inline-flex items-center cursor-pointer">
        <p className="mr-3 mx-auto whitespace-nowrap font-bold text-xs bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
          Dark Mode
        </p>
        <span className="relative">
          <input
            className="hidden sr-only"
            label="toggle"
            onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          />
          <span className="block w-10 h-6 bg-violet-200 rounded-full shadow-xl border-2 border-violet-400"></span>{" "}
          <div
            className={`toggle-dot absolute left-1 top-1 bg-sky-200 w-4 h-4 rounded-full transition-transform border-2 border-violet-300
                    ${
                      theme === "dark"
                        ? "translate-x-4 border-sky-600 bg-sky-600"
                        : "translate-x-0 border-sky-400"
                    }
                    `}
          ></div>
        </span>
      </label>
    </>
  );
}
