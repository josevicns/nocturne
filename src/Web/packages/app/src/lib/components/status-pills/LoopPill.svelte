<script lang="ts">
  import type { LoopPillData } from "$lib/types/status-pills";

  interface LoopPillProps {
    data: LoopPillData | null;
  }

  let { data }: LoopPillProps = $props();

  // Determinar si está en modo automático (verde) o manual/otro (azul)
  // En CareLink/SmartGuard, consideraremos 'enacted' o looping activo como automático (verde), resto manual (azul)
  const isAutomatic = $derived(
    data?.status === "enacted" || data?.status === "looping"
  );

  const dotColor = $derived(
    isAutomatic ? "bg-emerald-500 shadow-emerald-500/50" : "bg-blue-500 shadow-blue-500/50"
  );

  const modeLabel = $derived(
    isAutomatic ? "Automático (SmartGuard)" : "Manual"
  );
</script>

<div class="flex items-center justify-center px-2 py-1" title={modeLabel}>
  <span class="relative flex h-3 w-3">
    {#if isAutomatic}
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    {/if}
    <span class={`relative inline-flex rounded-full h-3 w-3 shadow-sm ${dotColor}`}></span>
  </span>
</div>
