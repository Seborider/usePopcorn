import { ErrorMessageProps } from "../types/props";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error">
      <span>🤬</span> {message}
    </p>
  );
}
