class EmperorClass {
  constructor(id, name, imageUrl, description) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  get type() {
    return "Emperor";
  }

  static EmperorFactory(element) {
    let emperorInstance = new EmperorClass(
      parseInt(element.id.tokenId, 16),
      element.title,
      element.metadata.image,
      element.description
    );

    return emperorInstance;
  }
}

export default EmperorClass;
