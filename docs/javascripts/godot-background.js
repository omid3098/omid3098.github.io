/*
 * Inject the Godot exported HTML page as a fixed, full-viewport background.
 * The export lives at docs/godot/build/omid-saadat-website.html (served as /godot/build/omid-saadat-website.html)
 * We use an iframe so the exported loader can keep its relative paths intact (.js/.pck/.wasm).
 */

(function () {
    const EXPORT_PATH = '/godot/omid-saadat-website.html';
    const ID = 'godot-bg-wrapper';

    function alreadyPresent() {
        return document.getElementById(ID) != null;
    }

    function createBackground() {
        if (alreadyPresent()) return;

        const wrapper = document.createElement('div');
        wrapper.id = ID;

        const iframe = document.createElement('iframe');
        iframe.src = EXPORT_PATH;
        iframe.loading = 'lazy';
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;

        iframe.addEventListener('load', () => {
            iframe.classList.add('loaded');
            // Try to reduce pixel ratio for performance (inside iframe Godot might expose Module). Can't reliably reach until same-origin + loaded.
            try {
                const doc = iframe.contentDocument;
                if (doc) {
                    // Add a style override inside to ensure transparent canvas background (optional if export already transparent)
                    const style = doc.createElement('style');
                    style.textContent = 'html,body{background:transparent !important;} canvas{background:transparent !important;}';
                    doc.head.appendChild(style);
                }
            } catch (e) {
                /* ignore cross-origin or timing issues */
            }
        });

        wrapper.appendChild(iframe);
        document.body.appendChild(wrapper);
    }

    function initWhenReady() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            createBackground();
        } else {
            document.addEventListener('DOMContentLoaded', createBackground, { once: true });
        }
    }

    // Reinitialize after MkDocs Material instant navigation events (if enabled later)
    window.addEventListener('DOMContentLoaded', initWhenReady, { once: true });
})();

