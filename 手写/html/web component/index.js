class InfoCard extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM，外部 CSS 无法穿透
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("card-template");
    shadow.appendChild(template.content.cloneNode(true));
  }

  // 监听哪些属性变化
  static get observedAttributes() {
    return ["title", "content"];
  }

  // 属性变化时触发
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "title") {
      this.shadowRoot.querySelector(".title").textContent = newVal;
    }
    if (name === "content") {
      this.shadowRoot.querySelector(".content").textContent = newVal;
    }
  }

  // 插入 DOM 时触发
  connectedCallback() {
    this.shadowRoot.querySelector(".title").textContent = this.getAttribute("title") || "";
    this.shadowRoot.querySelector(".content").textContent = this.getAttribute("content") || "";
  }
}

customElements.define("info-card", InfoCard);
