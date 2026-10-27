// Add corner handle boxes to every element with data-sel attribute
document.querySelectorAll('[data-sel]').forEach(el => {
  ['tl','tr','bl','br'].forEach(c => {
    const s = document.createElement('i');
    s.className = 'h ' + c;
    el.appendChild(s);
  });
});