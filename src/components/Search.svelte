<script>
  let open = $state(false);
  let query = $state('');
  let results = $state([]);
  let activeIndex = $state(0);
  let pagefind = $state(null);
  let inputEl = $state(null);
  let modalEl = $state(null);
  let searching = $state(false);

  async function loadPagefind() {
    if (pagefind) return;
    try {
      const url = '/pagefind/pagefind.js';
      pagefind = await import(/* @vite-ignore */ url);
      await pagefind.init();
    } catch (e) {
      // Pagefind not available (dev mode)
    }
  }

  function openSearch() {
    open = true;
    query = '';
    results = [];
    activeIndex = 0;
    searching = false;
    loadPagefind();
    setTimeout(() => inputEl?.focus(), 10);
  }

  function closeSearch() {
    open = false;
    query = '';
    results = [];
    searching = false;
  }

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (open) closeSearch();
      else openSearch();
      return;
    }
    if (!open) return;

    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, results.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Enter' && results[activeIndex]) {
      const url = results[activeIndex].url;
      closeSearch();
      window.location.href = url;
    }
  }

  function trapFocus(e) {
    if (e.key !== 'Tab' || !modalEl) return;
    const focusable = modalEl.querySelectorAll('a[href], input, button, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  let debounceTimer;
  async function onInput() {
    clearTimeout(debounceTimer);
    if (!query.trim()) {
      results = [];
      activeIndex = 0;
      searching = false;
      return;
    }
    searching = true;
    debounceTimer = setTimeout(async () => {
      if (!pagefind) { searching = false; return; }
      const search = await pagefind.search(query);
      const loaded = await Promise.all(search.results.slice(0, 8).map(r => r.data()));
      results = loaded.map(r => ({
        title: r.meta?.title || 'Untitled',
        excerpt: r.excerpt,
        url: r.url,
      }));
      activeIndex = 0;
      searching = false;
    }, 150);
  }

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) closeSearch();
  }

  $effect(() => {
    const handler = () => openSearch();
    window.addEventListener('open-search', handler);
    return () => window.removeEventListener('open-search', handler);
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions a11y_interactive_supports_focus -->
  <div class="search-overlay" role="dialog" aria-modal="true" aria-label="Search" onclick={onBackdropClick} onkeydown={trapFocus}>
    <div class="search-modal" bind:this={modalEl}>
      <div class="search-input-wrap">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          bind:this={inputEl}
          bind:value={query}
          oninput={onInput}
          type="text"
          class="search-input"
          placeholder="Search..."
          aria-label="Search the site"
          autocomplete="off"
          spellcheck="false"
        />
        <kbd class="search-kbd">Esc</kbd>
      </div>

      {#if searching}
        <div class="search-empty">Searching…</div>
      {:else if results.length > 0}
        <div class="search-results" role="listbox" aria-label="Search results">
          {#each results as result, i}
            <a
              href={result.url}
              class="search-result"
              class:active={i === activeIndex}
              role="option"
              aria-selected={i === activeIndex}
              onmouseenter={() => activeIndex = i}
              onclick={closeSearch}
            >
              <div class="search-result-title">{result.title}</div>
              {#if result.excerpt}
                <div class="search-result-excerpt">{@html result.excerpt}</div>
              {/if}
            </a>
          {/each}
        </div>
      {:else if query.trim() && pagefind}
        <div class="search-empty">No results for "{query}"</div>
      {/if}
    </div>
  </div>
{/if}
