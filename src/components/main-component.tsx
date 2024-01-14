import { MoviesProps } from "../types/props";

export default function Main({ children }: MoviesProps) {
  return <main className="main">{children}</main>;
}
