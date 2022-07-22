import { getOpenListings } from '../../util/interact';
import ListingClass from '../../util/ListingClass';

export const getStaticPaths = async () => {
  console.log('getting sale listings..');
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
  let openListings = await getOpenListings();
  let listing = openListings.find((element) => element.id == id);
  return {
    props: {
      listing: JSON.stringify(listing),
    },
  };
};

const Details = ({ listing }) => {
  console.log(listing);
  var listingVar = JSON.parse(listing);
  return (
    <div>
      <h1>{listingVar.id}</h1>
      <h1>{listingVar.emperor.name}</h1>
    </div>
  );
};

export default Details;
