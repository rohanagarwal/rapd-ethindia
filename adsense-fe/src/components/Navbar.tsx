import { ConnectWallet } from "@thirdweb-dev/react"

const Navbar = () => {
  return <>
  <div>
  <ConnectWallet
        theme={"dark"}
        modalSize={"wide"}
      />
  </div>
  </>
}

export default Navbar;