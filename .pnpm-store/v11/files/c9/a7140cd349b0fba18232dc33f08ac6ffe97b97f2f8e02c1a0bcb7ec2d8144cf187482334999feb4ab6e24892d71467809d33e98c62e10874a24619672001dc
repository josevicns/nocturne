import { readable } from 'svelte/store';
import { Editor } from './Editor';
const createEditor = (options) => {
    const editor = new Editor(options);
    return readable(editor, (set) => {
        editor.on('transaction', () => {
            set(editor);
        });
        return () => {
            editor.destroy();
        };
    });
};
export default createEditor;
