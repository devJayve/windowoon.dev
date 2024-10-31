'use client';

import Link from "next/link";
import {Moon, Sun} from "lucide-react";
import {clsx} from "clsx";
import {useEffect, useState} from "react";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        document.documentElement.classList.toggle('dark', newMode);
    }

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setDarkMode(JSON.parse(savedMode));
            document.documentElement.classList.toggle('dark', JSON.parse(savedMode));
        }
    }, []);

    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <Link href="/blog">Dowoon.</Link>
            <button
                onClick={toggleDarkMode}
                className={clsx(
                    'p-2 rounded-lg transition-colors duration-200',
                    darkMode ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300'
                )}
            >
                {darkMode ? <Sun/> : <Moon/>}
            </button>
        </header>



    );
}