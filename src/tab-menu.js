import {html, render as LitRender} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
export {
  TabMenuElement,
  TabPanelElement
}

class TabPanelElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block
      }
    </style>
    <slot>
    `
  }
  get label() {
    return this.getAttribute('label');
  }
  set label(value) {
    this.setAttribute('label', label);
  }
}

class TabMenuElement extends HTMLElement {
  static get observedAttributes() {
    return ["show-tab"];
  }
  constructor() {
    super();
    this.attachShadow({mode: "open", slotAssignment: "manual"});
    render(this);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    const slot = this.shadowRoot.querySelector("slot");
    const panel = this.getPanel(newValue);
    if (panel !== undefined) {
      slot.assign([panel]);
    } else {
      slot.assign([]);
    }
    render(this);
  }
  get showTab() {
    return this.getAttribute("show-tab");
  }
  set showTab(label) {
    this.setAttribute("show-tab", label);
  }
  get allPanels() {
    return Array.from(this.querySelectorAll('tab-panel'));
  }
  getPanel(label) {
    return this.allPanels.find(p => p.getAttribute('label') === label);
  }
}

const render = tabMenu => LitRender(html`
  <style>
    :host {
      display: block;
    }
    .tabs {
      display: flex;
    }
    .tab {
      width: calc(100% / 3);
      text-align: center;
      background-color: #eee;
      padding: 16px 0;
    }
    .tab--show {
      background-color: #fff;
    }
  </style>
  <div class="tabs">
    ${tabMenu.allPanels.map(renderTab(tabMenu))}
  </div>
  <slot></slot>
`, tabMenu.shadowRoot);

const renderTab = tabMenu => panel => {
  const label = panel.getAttribute('label');
  const classes = {
    tab: true,
    "tab--show": label === tabMenu.showTab
  };
  return html`
    <div class="tab ${classMap(classes)}" @click=${clickTab(tabMenu, label)}>${label}</div>
  `;
}

const clickTab = (tabMenu, label) => event => {
  tabMenu.showTab = label;
}
