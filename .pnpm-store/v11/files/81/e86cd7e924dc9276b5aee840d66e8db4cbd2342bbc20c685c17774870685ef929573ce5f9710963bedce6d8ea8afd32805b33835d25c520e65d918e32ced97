import { mount, unmount } from 'svelte';
class SvelteRenderer {
    component;
    props;
    dom;
    constructor(component, { element, props }) {
        this.component = component;
        this.props = props;
        this.dom = element;
        this.dom.classList.add('svelte-renderer');
    }
    updateProps(props) {
        Object.assign(this.props, props);
    }
    updateAttributes(attributes) {
        Object.keys(attributes).forEach((key) => {
            this.dom.setAttribute(key, attributes[key]);
        });
    }
    destroy() {
        unmount(this.component);
    }
}
export default SvelteRenderer;
