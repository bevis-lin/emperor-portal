import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
const Member = () => {
  const { address, signed, signMessage, unsign } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!signed) {
      //router.push("/member/sign");
    }
  }, [signed]);

  return (
    <div>
      Member Page
      {signed && (
        <div>
          Use has signature...<br></br>
          <button type="button" className="btn btn-primary" onClick={unsign}>
            Unsign
          </button>
        </div>
      )}
      {!signed && (
        <div>
          Use has no signature...<br></br>
          <button
            type="button"
            className="btn btn-primary"
            onClick={signMessage}
          >
            Sign
          </button>
        </div>
      )}
    </div>
  );
};

export default Member;
