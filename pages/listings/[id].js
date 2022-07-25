import {
  getOpenListings,
  getOpenListingByListingId,
  getOpenListingIds,
} from "../../util/interact";
import ListingClass from "../../util/ListingClass";

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
  let openListing = await getOpenListingByListingId(id);
  return {
    props: {
      listing: JSON.stringify(openListing),
    },
  };
};

const Details = ({ listing }) => {
  if (typeof window === undefined) {
    console.log(listing);
    var listingVar = JSON.parse(listing);
    return (
      <div>
        <h1>{listingVar.id}</h1>
        <h1>{listingVar.emperor.name}</h1>
      </div>
    );
  }
};

export default Details;
