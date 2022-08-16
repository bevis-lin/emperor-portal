import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useCurrentUser = () => {
  const [install, setInstall] = useState(false);
  const [network, setNetwork] = useState(false);
  const [address, setAddress] = useState();
  const [signature, setSignature] = useState();
  const [cookies, removeCookie] = useCookies(["signature"]);

  const signMessage = async () => {
    try {
      const messageToSign =
        "Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address";
      console.log("signing message...");
      const from = window.ethereum.selectedAddress;
      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: [messageToSign, from, "emperor"],
      });

      console.log("sign : " + sign);
      setSignature(sign);

      return {
        success: true,
        status: "Sign successfully",
        data: sign,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  };

  const unsignMessage = async () => {
    try {
      removeCookie("signature", null, { path: "/" });
      console.log("Unsign successfully");
      setSignature(null);
      return {
        success: true,
        status: "Unsign successfully",
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  };

  const tools = {
    signMessage: signMessage,
    unsign: unsignMessage,
  };

  useEffect(() => {
    const checkMetamask = async () => {
      setInstall(!window.ethereum);
      if (window.ethereum) {
        const networkVersion = await window.ethereum.request({
          method: "net_version",
        });
        console.log(networkVersion);
        setNetwork(networkVersion == process.env.NEXT_PUBLIC_NET_VERSION);

        setAddress(window.ethereum.selectedAddress);

        window.ethereum.on("chainChanged", (networkVersion) => {
          console.log("chainChanged", networkVersion);
          //window.location.reload();
          let nv10 = parseInt(networkVersion);
          setNetwork(nv10 == process.env.NEXT_PUBLIC_NET_VERSION);
        });
      }
    };

    const verifyMessage = async (messageToVerify, signature) => {
      try {
        const from = window.ethereum.selectedAddress;
        const recoveredAddr = web3.eth.accounts.recover(
          messageToVerify,
          signature
        );
        if (from.toLowerCase() == recoveredAddr.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    checkMetamask();

    if (network) {
      console.log("checking signature.....");
      if (cookies) {
        const signatureFromCookie = cookies.signature;
        if (!signatureFromCookie) {
          console.log("This address has no signature.");
        } else {
          console.log(signatureFromCookie);

          let checkSignature = verifyMessage(
            "Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address",
            signatureFromCookie
          );

          if (checkSignature) {
            console.log("This address has signature.");
            setSignature(cookies.signature);
          } else {
            console.log("This address has no signature.");
          }
        }
      } else {
        setStatus("no singnature cookie found.");
      }
    }
  }, [install, network]);

  return [address, signature != null, tools];
};

export default useCurrentUser;
