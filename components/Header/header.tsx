"use client";
import React from "react";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./header.module.css";
import Image from "next/image";
import HeaderBackground from "@/components/HeaderBackground/header-background";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  return (
    <>
      <HeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={logoImg} alt={"A plate with food on it"} priority />
          RECIPE FOR DISASTER
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link
                href="/meals"
                className={
                  path.startsWith("/meals") ? classes.active : undefined
                }
              >
                Browse Recipes
              </Link>
              <Link
                href="/community"
                className={path === "/community" ? classes.active : undefined}
              >
                Community
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
