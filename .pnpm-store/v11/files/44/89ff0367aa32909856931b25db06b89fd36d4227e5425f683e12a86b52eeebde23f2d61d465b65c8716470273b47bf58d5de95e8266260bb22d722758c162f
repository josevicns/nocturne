<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type GeoVisibleProps = {
    /** Latitude */
    lat: number;
    /** Longitude */
    long: number;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { isVisible } from '../../../utils/geo.js';
  import { getGeoContext } from '../../../contexts/geo.js';

  let { lat, long, children }: GeoVisibleProps = $props();
  const geo = getGeoContext();
</script>

{#if geo.projection && isVisible(geo.projection)([long, lat])}
  {@render children?.()}
{/if}
