'use client'
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';


const links = [
  {
    id: 2,
    title: "Appointment",
    url: "/appointment",
  },
  {
    id: 3,
    title: "Queries",
    url: "/QA",
  },
  {
    id: 4,
    title: "Weather",
    url: "/weathers",
  },
    
    
    
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },

];

const Navbar = () => {
  const session = useSession();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
      <Image
            src="/logo.png"
            alt="logo"
            priority
            height={61} width={83}
           
          />
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "unauthenticated" &&
          <Link href="/dashboard/login"><button className={styles.links}>
          Log in
        </button></Link>}
        {session.status === "authenticated" && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
