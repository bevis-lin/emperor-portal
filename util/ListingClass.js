class ListingClass {
  constructor(id, tokenId, seller, price) {
    this.id = id;
    this.tokenId = tokenId;
    this.seller = seller;
    this.price = price;
  }

  get type() {
    return 'Listing';
  }

  static ListingFactory(element) {
    let listingInstance = new ListingClass(
      element[0],
      element[1],
      element[3],
      element[2]
    );

    return listingInstance;
  }
}

export default ListingClass;
