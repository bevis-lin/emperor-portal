import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [install, setInstall] = useState(false);
  const [network, setNetwork] = useState(false); //False if wrong network
  const [status, setStatus] = useState("");
  const [signature, setSignature] = useState();
  const [cookies, setCookie] = useCookies(["signature"]);

  const signMessage = async (messageToSign) => {
    try {
      const from = window.ethereum.selectedAddress;
      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: [messageToSign, from, "emperor"],
      });

      console.log("sign : " + sign);

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

  const onSignMessagePressed = async () => {
    const message =
      "Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address";
    const signResult = await signMessage(message);
    if (signResult.success) {
      setSignature(signResult.data);
      //cookie.set('signature', true, signResult.data);
      setCookie("signature", signResult.data, { path: "/" });
    }
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
      setStatus("checking signature......");
      console.log("checking signature.....");
      if (cookies) {
        const signatureFromCookie = cookies.signature;
        if (!signatureFromCookie) {
          setStatus("This address has no signature.");
        } else {
          console.log(signatureFromCookie);

          let checkSignature = verifyMessage(
            "Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address",
            signatureFromCookie
          );

          if (checkSignature) {
            setStatus("This address has signature.");
            setSignature(cookies.signature);
          } else {
            setStatus("This address has no signature.");
          }
        }
      } else {
        setStatus("no singnature cookie found.");
      }
    }
  }, [network, signature]);

  if (install) return <p>Install MetaMask</p>;
  if (!network) return <p>Detecting network or wrong network detected.</p>;

  return (
    <div>
      <h1>Profile</h1>
      <br />
      {!signature && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSignMessagePressed}
        >
          Sign
        </button>
      )}
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Profile;
