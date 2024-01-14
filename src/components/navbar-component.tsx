import Logo from "./logo-component";
import { NavBarProps } from "../types/props";

export default function NavBar({ children }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}
