"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Assessment", path: "/assessment" },
        { label: "Dashboard", path: "/dashboard" },
    ];

    return (
        <nav className="nav-floating">
            <div className="text-gradient" style={{
                fontSize: '20px',
                fontWeight: 900,
                paddingLeft: '16px',
                paddingRight: '16px',
                letterSpacing: '-0.02em'
            }}>
                CC
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`nav-item-adv ${pathname === item.path ? 'active' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div style={{ paddingLeft: '8px' }}>
                <Link href="/login" className="btn-primary-adv" style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    borderRadius: '100px'
                }}>
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
