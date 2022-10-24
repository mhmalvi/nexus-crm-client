function Dialog({ message, onDialog, user }) {
    return (
      <div
        className="fixed inset-0 z-50"
        onClick={() => onDialog(false)}
      >
        <div className="flex h-screen justify-center items-center">
          <div
            className="flex flex-col justify-center bg-white border-2 border-zinc-200 rounded-xl py-10 px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-lg">{message}</h3>
            </div>
            <div>
              <h1 className="text-md font-bold text-center text-[#875bfe]">{user}?</h1>
            </div>
            <div className="flex justify-evenly">
              <button
                className="w-[20%] bg-red-500 text-white rounded-lg"
                onClick={() => onDialog(true)}
              >
                Yes
              </button>
              <button
                className="w-[20%] h-10 bg-green-500 text-white rounded-lg"
                onClick={() => onDialog(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Dialog;
  