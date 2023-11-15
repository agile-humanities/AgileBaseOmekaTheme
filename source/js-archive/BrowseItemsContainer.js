const browseItemsContainerTemplate = document.createElement('template');

browseItemsContainerTemplate.innerHTML = `
<style>
</style>
<slot name="items-container"></slot>
`;

class BrowseItemsContainer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(browseItemsContainerTemplate.content.cloneNode(true));

  }

  static get observedAttributes() {
    return ['view'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const style = this.shadowRoot.querySelector('style');

    if (newVal === 'card') {
      style.textContent = `
      :host {
        display: block;
      }
    
      ::slotted(*) {
        list-style-type: none;
        padding: unset;
        display: grid;
        row-gap: var(--grid-row-gap);
        padding-bottom: 1rem;
        place-content: start center;
        place-items: start center;
        grid-template-columns: minmax(0, 1fr);
      }
    
      @media screen and (min-width: 740px) {
        ::slotted(*) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: var(--grid-column-gap);
        }
      }
    
      @media screen and (min-width: 1200px) {
        ::slotted(*) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }
      `;
    }

    if (newVal === 'list') {
      style.textContent = `
      :host {
        display: block;
      }
    
      ::slotted(*) {
        list-style-type: none;
        padding: unset;
        display: grid;
        row-gap: 3.296rem;
        padding-bottom: 1rem;
        place-content: start center;
        place-items: start center;
        grid-template-columns: minmax(0, 1fr);
      }
    
      @media screen and (min-width: 740px) {
        ::slotted(*) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 1.95rem;
        }
      }
      `;
    }
    
  }

}

customElements.define('browse-items-container', BrowseItemsContainer);