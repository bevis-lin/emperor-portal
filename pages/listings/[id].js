import {
  getOpenListingByListingId,
  getOpenListingIds,
} from "../../util/interact";
var Web3 = require("web3");

export const getStaticPaths = async () => {
  console.log("getting sale listings..");
  let openListingIds = await getOpenListingIds();
  const paths = openListingIds.map((listingId) => {
    return {
      params: { id: listingId.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  console.log("getStaticProps been called....,id:", id);
  let listing = await getOpenListingByListingId(id);
  listing = JSON.stringify(listing);
  return {
    props: { listing },
  };
};

const Details = ({ listing }) => {
  //return <div>OK</div>;
  console.log(listing);
  var listingVar = JSON.parse(listing);
  return (
    <div>
      <h1>Listing Id:{listingVar.id}</h1>
      <h1>Price: {Web3.utils.fromWei(listingVar.price, "ether")} ether</h1>
      <h1>{listingVar.emperor.name}</h1>
      <img src={listingVar.emperor.imageUrl} />
      <h3>{listingVar.emperor.description}</h3>
    </div>
  );
  //return <div>OK</div>;
};

export default Details;
