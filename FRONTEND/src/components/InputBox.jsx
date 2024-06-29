export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-left py-2 block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
