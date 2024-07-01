export const Balance = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center m-10">
      <h2 className="text-3xl font-bold text-gray-700">Current Balance</h2>
      <p className="text-2xl text-gray-900 mt-4">Rs. {value}</p>
    </div>
  );
};
