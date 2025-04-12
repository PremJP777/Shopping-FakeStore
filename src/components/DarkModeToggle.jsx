import React, { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react" // Optional icons if you have lucide-react installed

export function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);
      useEffect(() => {
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [isDark]);

  return (
    <div className="flex items-center justify-end gap-2 p-2">
      <button
        onClick={() => setIsDark(!isDark)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow transition duration-300 hover:scale-105 hover:shadow-md"
      >
        {isDark ? (
          <>
            <Sun className="w-5 h-5" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            Dark Mode
          </>
        )}
      </button>
    </div>
  )
}
