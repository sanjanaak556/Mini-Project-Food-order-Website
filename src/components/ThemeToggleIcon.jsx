import React, { useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/ThemeSlice'

function ThemeToggleIcon() {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.mode)

    useEffect(() => {
        console.log("Theme changed to:", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (

        <button onClick={(() => dispatch(toggleTheme()))}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition hover:scale-110 cursor-pointer'>
            {theme === "light" ? (
                <FaMoon className='text-gray-800' size={15} />
            ) : (
                <FaSun className='text-yellow-400' size={15} />
            )}
        </button>

    )
}

export default ThemeToggleIcon