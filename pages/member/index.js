import { useAuth } from '../../providers/AuthProvider';
const Member = () => {
  const { address, signed, sign, unsign } = useAuth();

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
          <button type="button" className="btn btn-primary" onClick={sign}>
            Sign
          </button>
        </div>
      )}
    </div>
  );
};

export default Member;
