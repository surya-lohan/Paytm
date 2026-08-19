const Appbar = () => {
    return (
        <div className="w-full h-fit shadow ">
            <div className="p-4 flex items-center justify-between ">
                <div className="">
                    <h1 className="text-xl font-semibold">PayTm Application</h1>
                </div>
                <div className="mr-4 flex items-center gap-3">
                    <h1 className="">Hello</h1>
                    <span className="rounded-full items-center flex justify-center w-10 h-10 bg-zinc-200">U</span>
                </div>
            </div>
        </div>
    );
};
export default Appbar;