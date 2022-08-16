import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { signMessage } from '../../util/interactLocal.js';

const Sign = () => {
  const [install, setInstall] = useState(false);
  const [network, setNetwork] = useState(false); //False if wrong network
  const [cookies, setCookie] = useCookies(['signature']);

  const onSignMessagePressed = async () => {
    const message =
      'Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address';
    const signResult = await signMessage();
    if (signResult.success) {
      setSignature(signResult.data);
      //cookie.set('signature', true, signResult.data);
      setCookie('signature', signResult.data, { path: '/' });
    }
  };

  useEffect(() => {
    const checkMetamask = async () => {
      setInstall(!window.ethereum);
      if (window.ethereum) {
        const networkVersion = await window.ethereum.request({
          method: 'net_version',
        });
        console.log(networkVersion);
        setNetwork(networkVersion == process.env.NEXT_PUBLIC_NET_VERSION);

        window.ethereum.on('chainChanged', (networkVersion) => {
          console.log('chainChanged', networkVersion);
          //window.location.reload();
          let nv10 = parseInt(networkVersion);
          setNetwork(nv10 == process.env.NEXT_PUBLIC_NET_VERSION);
        });
      }
    };

    checkMetamask();
  }, []);

  if (install) return <p>Install MetaMask</p>;
  if (!network) return <p>Detecting network or wrong network detected.</p>;

  return (
    <div>
      <h1>Sign Message</h1>
      <br />
      {network && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSignMessagePressed}
        >
          Sign
        </button>
      )}
    </div>
  );
};

export default Sign;
