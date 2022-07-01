const Listings = ({ listings }) => {
  return (
    <div>
      <h1>Listings</h1>
      {listings.map((listing) => {
        return (
          <div key={listing.id}>
            <h2>listing.nft.metadata.name</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Listings;

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3002/news');
  const data = await response.json();
  return {
    props: {
      listings: data,
    },
  };
}
