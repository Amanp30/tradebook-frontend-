import slugify from "slugify";

class HashLink {
  constructor() {}

  new(text) {
    const link = slugify(text, { lower: true, replacement: "-" });
    return link;
  }

  _destin(text) {
    const link = "#" + this.new(text);
    if (typeof window !== "undefined") window.location.hash = link;
  }

  goto(text) {
    return () => this._destin(text);
  }
}

export default HashLink;
