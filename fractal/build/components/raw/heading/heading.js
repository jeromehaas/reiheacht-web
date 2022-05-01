class Heading {

  constructor() {
    this.name = 'heading';
    this.elements = {
      headings: document.querySelectorAll('.heading')
    };
    this.init();
  };

  init() {
    if (!document.querySelector(`.js-${this.name}`)) return;
    this.spanHighlights();
  };

  spanHighlights() {
    this.elements.headings.forEach((heading) => {
      if (heading.hasAttribute('data-highlight')) {
        const highlight = JSON.parse(heading.getAttribute('data-highlight'));
        let text = heading.innerText;
        highlight.forEach((word) => text = text.replace(word, `<span class="heading--highlight">${word}</span>`));
        heading.innerHTML = text;
      };
    });
  };

};

export default Heading;