(() => {
  // Adapt legacy application templates that use inline light colors.
  const excluded = 'svg,svg *,img,video,canvas,.app-icon,.app-icon *,[class*="map-tile"],.leaflet-pane,.leaflet-pane *';
  function adapt(root) {
    for (const el of [root, ...root.querySelectorAll('*')]) {
      if (el.matches(excluded)) continue;
      const css = getComputedStyle(el);
      const rgb = value => (value.match(/[\d.]+/g) || []).map(Number);
      const bg = rgb(css.backgroundColor), fg = rgb(css.color);
      if (bg.length >= 3 && (bg[3] ?? 1) > .5 && Math.min(...bg.slice(0,3)) > 195 && Math.max(...bg.slice(0,3))-Math.min(...bg.slice(0,3)) < 35) el.classList.add('night-surface');
      if (fg.length >= 3 && Math.max(...fg.slice(0,3)) < 125) el.classList.add('night-ink');
    }
  }
  let queued = false;
  const refresh = () => {
    queued = false;
    document.querySelectorAll('.app-view.active').forEach(adapt);
  };
  new MutationObserver(records => {
    if (records.every(r => r.type === 'attributes' && r.attributeName === 'class' && (r.target.classList.contains('night-surface') || r.target.classList.contains('night-ink')))) return;
    if (!queued) { queued = true; requestAnimationFrame(refresh); }
  }).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
  refresh();
})();
