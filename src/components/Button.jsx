export function Button({ label, onClick }) {
  return (
      <button 
          onClick={onClick} 
          type="button" 
          className="w-full text-white bg-sky-500 hover:bg-sky-600  font-medium rounded-lg text-sm px-5 py-2.5"
      >
          {label}
      </button>
  );
}
