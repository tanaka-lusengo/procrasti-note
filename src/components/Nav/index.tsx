"use client";
import Link from "next/link";
import { StyledNav } from "./index.styled";

const Nav = () => (
  <header>
    <StyledNav>
      <h1>
        <Link href={"/"}>Procrasti-Not(e)</Link>
      </h1>

      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/notes"}>Notes</Link>
        </li>
      </ul>
    </StyledNav>
  </header>
);

export default Nav;
