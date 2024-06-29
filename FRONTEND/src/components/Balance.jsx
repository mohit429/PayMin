export const Balance = ({ value }) => {
    return (
        <div className="flex justify-between items-center bg-sky-500 rounded-2xl m-5 px-6 py-3 md:mx-25 lg:mx-40">
            <div className="font-bold text-lg text-white">
                Available Balance
            </div>
            <div className="font-bold text-lg text-white">
                Rs {value}
            </div>
        </div>
    );
};
