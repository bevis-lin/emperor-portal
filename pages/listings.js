import { useEffect, useState } from 'react';
import ListingClass from '../util/ListingClass';
import { getOpenListings } from '../util/interact';

const Listings = ({ listings }) => {
  const [saleListings, setSaleListings] = useState();

  useEffect(() => {
    async function fectchData() {
      let openListings = listings;
      //console.log(openListings);
      try {
        let mappedSaleListings = [];
        openListings.forEach((element) => {
          console.log(element);

          let saleListing = ListingClass.ListingFactory(element);
          console.log(saleListing);
          mappedSaleListings.push(saleListing);
        });

        setSaleListings(mappedSaleListings);
      } catch (err) {
        console.log(err);
      }
    }

    fectchData();
  }, [listings]);

  return (
    <div>
      <h1>Listings</h1>
      {saleListings && saleListings.length > 0 ? (
        saleListings.map((saleListing, i) => (
          <div key={i}>TokenID:{saleListing.tokenId}</div>
        ))
      ) : (
        <div>No Listings Available</div>
      )}
    </div>
  );
};

export default Listings;

export async function getServerSideProps() {
  const openListings = await getOpenListings();
  //const data = await response.json();
  return {
    props: {
      listings: openListings,
    },
  };
}
