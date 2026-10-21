<script lang="ts" module>
  // Re-export so existing `import type { TextProps } from '../../index.js'` keeps working.
  export type { TextProps, TextPropsWithoutHTML, TextSegment } from './Text.shared.svelte.js';
  export { isTextDataProp } from './Text.shared.svelte.js';
</script>

<script lang="ts">
  import { getLayerContext } from '../../contexts/layer.js';
  import TextSvg from './Text.svg.svelte';
  import TextCanvas from './Text.canvas.svelte';
  import TextHtml from './Text.html.svelte';
  import type { TextProps } from './Text.shared.svelte.js';

  const layerCtx = getLayerContext();

  let props: TextProps = $props();
</script>

{#if layerCtx === 'svg'}
  <TextSvg {...props} />
{:else if layerCtx === 'canvas'}
  <TextCanvas {...props} />
{:else if layerCtx === 'html'}
  <TextHtml {...props} />
{/if}
