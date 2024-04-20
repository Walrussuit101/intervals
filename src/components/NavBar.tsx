'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const path = usePathname();

    const title = path === '/' ? 'Interval Recording' : 'Rate';

    return (
        <div className="navbar bg-base-200 drop-shadow-lg">
            <div className="navbar-start">
                <div className="dropdown md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href='/' className={`${path === '/' && 'bg-neutral text-white'}`}>Interval</Link></li>
                        <li><Link href='/rate' className={`${path === '/rate' && 'bg-neutral text-white'}`}>Rate</Link></li>
                    </ul>
                </div>
                <div className="hidden md:flex gap-2">
                    <Link href='/' className={`btn btn-large ${path === '/' ? 'btn-active' : 'btn-outline'} btn-neutral`}>Interval</Link>
                    <Link href='/rate' className={`btn btn-large ${path === '/rate' ? 'btn-active' : 'btn-outline'} btn-neutral`}>Rate</Link>
                </div>
            </div>
            <div className="navbar-center">
                <p className="text-3xl">{title}</p>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}

export default NavBar;