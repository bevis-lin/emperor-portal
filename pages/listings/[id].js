import {
  getOpenListingByListingId,
  getOpenListingIds,
} from '../../util/interact';

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
  console.log('getStaticProps been called....,id:', id);
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
      <h1>{listingVar.id}</h1>
      <h1>{listingVar.price}</h1>
      <img src={listingVar.imageUrl} />
      <h1>{listingVar.emperor.name}</h1>
    </div>
  );
  //return <div>OK</div>;
};

export default Details;
