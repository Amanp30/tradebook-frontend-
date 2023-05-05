class HashLink {
  constructor() {}

  new(text) {
    const link = text?.toLowerCase()?.split(" ")?.join("-");
    return link;
  }

  _destin(text) {
    const link = "#" + text?.toLowerCase()?.split(" ")?.join("-");
    if (typeof window !== "undefined") window.location.hash = link;
  }

  goto(text) {
    return () => this._destin(text);
  }
}

export default HashLink;
