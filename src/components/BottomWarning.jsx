import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="text-sm text-gray-600 mt-4">
      {label} <Link to={to} className="text-blue-500">{buttonText}</Link>
    </div>
  );
}
