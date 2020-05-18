const tag = '[View]'

export default {
  init(elem) {
    if (!elem) throw elem;
    this.elem = elem;
    return this;
  },

  on(event, handler) {
    this.elem.addEventListener(event, handler);
    return this;
  },

  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.elem.dispatchEvent(customEvent);
    return this;
  },

  hide() {
    this.elem.style.display = 'none';
    return this;
  },

  show() {
    this.elem.style.display = '';
    return this;
  },
}