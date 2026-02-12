<script>
  import { onMount } from 'svelte';

  let gx = $state(0);
  let gy = $state(0);
  let mx = 0;
  let my = 0;
  let visible = $state(false);

  onMount(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    visible = true;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMove);

    let raf;
    function loop() {
      gx += (mx - gx) * 0.05;
      gy += (my - gy) * 0.05;
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  });
</script>

{#if visible}
  <div class="cursor-glow" style="left: {gx}px; top: {gy}px;"></div>
{/if}
