import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='p-5 text-xl'>
            <ul className="flex items-center justify-center gap-5">
                <li className="p-3">
                    <Link href={"/"} className='hover:text-blue-500'>
                    Home
                    </Link>
                </li>
                <li className="p-3">
                    <Link href={"/about"} className='hover:text-blue-500'>
                    About
                    </Link>
                </li>
                <li className="p-3">
                    <Link href={"/opinion"} className='hover:text-blue-500'>
                    Opinion
                    </Link>
                </li>
            </ul>
    </header>
  )
}

export default Header