import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  return (
    <>
      {/* <div className="bg-blue-500 text-white p-4 flex justify-center">
        <ConnectWallet theme={"dark"} modalSize={"wide"} />
      </div> */}

      <div className="mx-auto translate-y-6">
      <div className="bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-600 via-gray-400 to-gray-200 p-4 rounded-lg fixed w-[60%] top-0 left-1/2 transform -translate-x-1/2">
        <nav className="flex items-center justify-between">
          <div className="text-gray-600 text-xl font-bold flex">
            <ConnectWallet theme={"dark"} modalSize={"wide"} />
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white">
              Home
            </a>
            <a href="/about" className="text-white">
              About
            </a>
            <a href="/tech" className="text-white">
              Tech
            </a>
            <a href="/contact" className="text-white">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Navbar;
