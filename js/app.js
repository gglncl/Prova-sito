/* ============ CLIOON — logica condivisa (nav, footer, carrello, checkout) ============ */
const CART_KEY = 'clioon_cart_v1';
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmt = p => '€ ' + p.toFixed(2).replace('.', ',');
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));

/* ---- LOGO: usa img/logo.png se esiste, altrimenti replica SVG fedele ---- */
const LOGO_SVG = `
<svg viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clioon Boutique Stresa">
  <path d="M340 470 H30 V120 H970 V470 H660" fill="none" stroke="#c9a227" stroke-width="6"/>
  <text x="135" y="320" font-family="Cormorant Garamond, serif" font-size="200" font-weight="500" fill="#f4f4f1" letter-spacing="6">CLI</text>
  <ellipse cx="535" cy="252" rx="80" ry="97" fill="none" stroke="#f4f4f1" stroke-width="15"/>
  <ellipse cx="630" cy="252" rx="80" ry="97" fill="none" stroke="#f4f4f1" stroke-width="15"/>
  <text x="720" y="320" font-family="Cormorant Garamond, serif" font-size="200" font-weight="500" fill="#f4f4f1">N</text>
  <text x="500" y="418" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="78" letter-spacing="30" fill="#f4f4f1">BOUTIQUE</text>
  <text x="500" y="489" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="54" letter-spacing="20" fill="#c9a227">STRESA</text>
</svg>`;
window.clioonLogoFallback = el => { el.outerHTML = LOGO_SVG; };
function initLogos(){
  $$('[data-logo]').forEach(slot => {
    slot.innerHTML = `<img src="img/logo.png" alt="Clioon Boutique Stresa" onerror="clioonLogoFallback(this)">`;
  });
}

/* ---- NAV + MENU MOBILE + FOOTER iniettati (coerenti su tutte le pagine) ---- */
const PAGES = [
  ['index.html','Home','home'],
  ['shop.html','Collezione','shop'],
  ['su-misura.html','Su Misura','misura'],
  ['chi-siamo.html','Chi Siamo','chi'],
  ['contatti.html','Contatti','contatti']
];
function injectNav(){
  const cur = document.body.dataset.page;
  const nav = document.createElement('nav');
  nav.className = 'nav'; nav.id = 'nav';
  nav.innerHTML = `<div class="container nav-inner">
    <a href="index.html" class="nav-logo" data-logo></a>
    <div class="nav-links">${PAGES.map(([h,l,k])=>`<a href="${h}" data-nav="${k}" class="${k===cur?'active':''}">${l}</a>`).join('')}</div>
    <div class="nav-right">
      <button class="cart-btn" id="cartBtn">Carrello <span class="cart-count" id="cartCount">0</span></button>
      <button class="menu-toggle" id="menuToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div></div>`;
  document.body.prepend(nav);
  const mm = document.createElement('div');
  mm.className = 'mmenu'; mm.id = 'mmenu';
  mm.innerHTML = `<button class="mmenu-close" id="mmenuClose">×</button>
    ${PAGES.map(([h,l,k])=>`<a href="${h}" class="${k===cur?'active':''}">${l}</a>`).join('')}
    <a class="btn btn-wa mmenu-wa" href="https://wa.me/${CONFIG.whatsapp}" target="_blank">💬 WhatsApp</a>`;
  document.body.appendChild(mm);
  $('#menuToggle').onclick = () => mm.classList.add('open');
  $('#mmenuClose').onclick = () => mm.classList.remove('open');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));
  initLogos();
}
function injectFooter(){
  const f = document.createElement('footer');
  f.innerHTML = `<div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo" data-logo></div>
        <p>Eleganza maschile senza tempo nel cuore del Lago Maggiore. Una selezione curata di capi italiani per l'uomo che cerca distinzione.</p>
        <div class="social">
          <a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" title="WhatsApp">💬</a>
          <a href="${CONFIG.instagram}" target="_blank" title="Instagram">📷</a>
          <a href="${CONFIG.facebook}" target="_blank" title="Facebook">f</a>
          <a href="mailto:${CONFIG.email}" title="Email">✉</a>
        </div>
      </div>
      <div class="footer-col"><h4>Boutique</h4><ul>
        <li><a href="shop.html">Collezione</a></li><li><a href="su-misura.html">Camicie su misura</a></li>
        <li><a href="chi-siamo.html">Chi siamo</a></li><li><a href="contatti.html">Contatti</a></li></ul></div>
      <div class="footer-col"><h4>Orari</h4><ul>
        <li>Lun–Ven: 10–14 / 15–19:30</li><li>Sabato: 10–19:30</li><li>Domenica: 10–14</li></ul></div>
      <div class="footer-col"><h4>Contatti</h4><ul>
        <li>${CONFIG.address}</li><li><a href="tel:+393420834999">${CONFIG.phone}</a></li>
        <li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li></ul></div>
    </div>
    <div class="footer-bottom">© 2026 CLIOON BOUTIQUE STRESA · Tutti i diritti riservati</div></div>`;
  document.body.appendChild(f);
  initLogos();
}

/* ---- CARRELLO UI + CHECKOUT iniettati ---- */
function injectCartUI(){
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="cart-overlay" id="cartOverlay"></div>
  <aside class="cart-drawer" id="cartDrawer">
    <div class="cart-header"><h3>Carrello</h3><button class="cart-close" id="cartClose">×</button></div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-footer">
      <div class="cart-total"><span class="cart-total-label">Totale</span><span class="cart-total-amount" id="cartTotal">€ 0,00</span></div>
      <button class="checkout-btn" id="checkoutBtn" disabled>Completa Ordine →</button>
    </div>
  </aside>
  <div class="modal" id="checkoutModal"><div class="modal-content">
    <button class="modal-close" id="modalClose">×</button>
    <h3>Conferma Ordine</h3>
    <p class="modal-subtitle">Compila i dettagli: riceverai il riepilogo su WhatsApp per finalizzare con il nostro staff.</p>
    <div class="order-summary" id="orderSummary"></div>
    <div class="form-row">
      <div class="form-group"><label>Nome e Cognome *</label><input id="custName" placeholder="Mario Rossi"></div>
      <div class="form-group"><label>Telefono</label><input id="custPhone" type="tel" placeholder="+39 ..."></div>
    </div>
    <div class="form-group"><label>Modalità</label><select id="delivery">
      <option value="ritiro">Ritiro in boutique (Stresa)</option><option value="spedizione">Spedizione a domicilio</option></select></div>
    <div class="form-group" id="addressGroup" style="display:none"><label>Indirizzo di spedizione</label><input id="custAddress" placeholder="Via, città, CAP"></div>
    <div class="form-group"><label>Note (taglie, colori, preferenze)</label><textarea id="custNotes" placeholder="Es. T-shirt taglia M nero, pantaloni taglia 32..."></textarea></div>
    <button class="whatsapp-send" id="waSend">💬 Invia Ordine su WhatsApp</button>
  </div></div>
  <a class="wa-float" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" title="Chatta con noi">💬</a>
  <div class="toast" id="toast"></div>`;
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

  $('#cartBtn').onclick = toggleCart;
  $('#cartClose').onclick = toggleCart;
  $('#cartOverlay').onclick = toggleCart;
  $('#checkoutBtn').onclick = openCheckout;
  $('#modalClose').onclick = closeCheckout;
  $('#delivery').onchange = e => $('#addressGroup').style.display = e.target.value === 'spedizione' ? 'block' : 'none';
  $('#waSend').onclick = sendWhatsApp;
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCheckout(); $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('open'); }
  });
}
function toggleCart(){ $('#cartDrawer').classList.toggle('open'); $('#cartOverlay').classList.toggle('open'); }

function addToCart(id){
  const p = PRODUCTS.find(x => x.id === id); if (!p) return;
  const it = cart.find(x => x.id === id);
  if (it) {
    if (p.stock !== -1 && it.qty >= p.stock) return showToast('Quantità massima disponibile');
    it.qty++;
  } else cart.push({ id, qty: 1 });
  saveCart(); renderCart(); showToast(p.name + ' aggiunto');
}
function changeQty(id, d){
  const it = cart.find(x => x.id === id); const p = PRODUCTS.find(x => x.id === id); if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter(x => x.id !== id);
  else if (p.stock !== -1 && it.qty > p.stock) { it.qty = p.stock; showToast('Quantità massima disponibile'); }
  saveCart(); renderCart();
}
function removeItem(id){ cart = cart.filter(x => x.id !== id); saveCart(); renderCart(); }

function renderCart(){
  const items = $('#cartItems'); if (!items) return;
  $('#cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
  if (!cart.length){
    items.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">⛨</div>
      <h4 style="font-family:'Cormorant Garamond',serif;font-size:22px;margin-bottom:8px">Il tuo carrello è vuoto</h4>
      <p style="font-size:14px">Scopri la collezione e aggiungi i tuoi capi preferiti.</p></div>`;
    $('#cartTotal').textContent = fmt(0); $('#checkoutBtn').disabled = true; return;
  }
  let tot = 0;
  items.innerHTML = cart.map(it => {
    const p = PRODUCTS.find(x => x.id === it.id); const sub = p.price * it.qty; tot += sub;
    return `<div class="cart-item">
      <div class="cart-item-img"><img src="${p.image}" alt=""></div>
      <div><div class="cart-item-name">${p.name}</div><div class="cart-item-code">Cod. ${p.code} · ${p.brand}</div>
        <div class="cart-item-price">${fmt(sub)}</div>
        <div class="qty-controls"><button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
        <span class="qty-value">${it.qty}</span><button class="qty-btn" onclick="changeQty(${p.id},1)">+</button></div></div>
      <button class="cart-item-remove" onclick="removeItem(${p.id})">✕</button></div>`;
  }).join('');
  $('#cartTotal').textContent = fmt(tot); $('#checkoutBtn').disabled = false;
}

function openCheckout(){
  if (!cart.length) return;
  toggleCart();
  let tot = 0;
  const rows = cart.map(it => { const p = PRODUCTS.find(x=>x.id===it.id); const s = p.price*it.qty; tot += s;
    return `<div class="summary-row"><span>${it.qty}× ${p.name}</span><span>${fmt(s)}</span></div>`; }).join('');
  $('#orderSummary').innerHTML = `<h4>Riepilogo Ordine</h4>${rows}
    <div class="summary-row total"><span>Totale</span><span>${fmt(tot)}</span></div>`;
  $('#checkoutModal').classList.add('open');
}
function closeCheckout(){ $('#checkoutModal') && $('#checkoutModal').classList.remove('open'); }

function sendWhatsApp(){
  const name = $('#custName').value.trim();
  if (!name) return alert('Inserisci il tuo nome e cognome');
  const phone = $('#custPhone').value.trim();
  const delivery = $('#delivery').value;
  const address = $('#custAddress').value.trim();
  const notes = $('#custNotes').value.trim();
  let tot = 0;
  const lines = cart.map(it => { const p = PRODUCTS.find(x=>x.id===it.id); const s = p.price*it.qty; tot += s;
    return `• ${p.name}\n  Cod. ${p.code} | Qtà: ${it.qty} | ${fmt(s)}`; }).join('\n\n');
  const del = delivery === 'ritiro' ? '🏪 Ritiro in boutique (Stresa)'
    : `📦 Spedizione a domicilio\n${address ? 'Indirizzo: '+address : '⚠️ Indirizzo non specificato'}`;
  const msg = `🛍 *NUOVO ORDINE — ${CONFIG.shopName}*\n\n👤 *Cliente:* ${name}${phone?'\n📞 '+phone:''}\n\n📋 *Articoli:*\n${lines}\n\n💰 *Totale: ${fmt(tot)}*\n\n${del}${notes?'\n\n📝 *Note:* '+notes:''}\n\n_Ordine inviato dal sito ${CONFIG.shopName}_`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  setTimeout(() => { cart = []; saveCart(); renderCart(); closeCheckout(); showToast('Ordine inviato su WhatsApp ✓'); }, 500);
}

function showToast(m){ const t = $('#toast'); t.textContent = m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 2800); }

/* ---- CATALOGO (griglia, filtri, ricerca, ordinamento) ---- */
let curFilter = 'Tutti', curSearch = '', curSort = 'new';
function productCard(p){
  let badge = '';
  if (p.tag === 'new') badge = '<span class="product-badge new">Nuovo</span>';
  else if (p.tag === 'low' && p.stock > 0) badge = `<span class="product-badge low">Solo ${p.stock}</span>`;
  else if (p.tag === 'custom') badge = '<span class="product-badge">Su Misura</span>';
  const stock = p.stock === -1 ? '<div class="product-stock">Su Misura</div>'
    : p.stock === 0 ? '<div class="product-stock" style="color:#b84a3e">Esaurito</div>'
    : p.stock <= 3 ? `<div class="product-stock">Solo ${p.stock} disponibili</div>` : '';
  return `<article class="product-card">
    <div class="product-image">${badge}<img src="${p.image}" alt="${p.name}" loading="lazy">
      <button class="product-add" onclick="addToCart(${p.id})">+ Aggiungi al Carrello</button></div>
    <div class="product-meta"><div>
      <div class="product-brand">${p.brand}</div><h3 class="product-name">${p.name}</h3>
      <div class="product-code">Cod. ${p.code}</div>${stock}</div>
      <div class="product-price">${fmt(p.price)}</div></div></article>`;
}
function filteredProducts(){
  let items = [...PRODUCTS];
  if (curFilter !== 'Tutti') items = items.filter(p => p.category === curFilter);
  if (curSearch){ const q = curSearch.toLowerCase();
    items = items.filter(p => (p.name+p.code+p.brand).toLowerCase().includes(q)); }
  if (curSort === 'price-asc') items.sort((a,b)=>a.price-b.price);
  if (curSort === 'price-desc') items.sort((a,b)=>b.price-a.price);
  if (curSort === 'name') items.sort((a,b)=>a.name.localeCompare(b.name));
  return items;
}
function renderCatalog(){
  const grid = $('#productsGrid'); if (!grid) return;
  const cats = ['Tutti', ...new Set(PRODUCTS.map(p=>p.category))];
  $('#filters').innerHTML = cats.map(c=>`<button class="filter-btn ${c===curFilter?'active':''}" data-cat="${c}">${c}</button>`).join('');
  $$('#filters .filter-btn').forEach(b => b.onclick = () => { curFilter = b.dataset.cat; renderCatalog(); });
  const items = filteredProducts();
  grid.innerHTML = items.length ? items.map(productCard).join('')
    : `<div class="no-results"><h3 style="margin-bottom:8px">Nessun prodotto trovato</h3><p>Prova con un altro termine di ricerca.</p></div>`;
}
window.clioonRefresh = renderCatalog;
function initCatalog(){
  if (!$('#productsGrid')) return;
  const urlCat = new URLSearchParams(location.search).get('cat');
  if (urlCat) curFilter = urlCat;
  $('#searchInput').addEventListener('input', e => { curSearch = e.target.value; renderCatalog(); });
  $('#sortSelect').addEventListener('change', e => { curSort = e.target.value; renderCatalog(); });
  renderCatalog();
}
function initFeatured(){
  const el = $('#featuredGrid'); if (!el) return;
  const feat = PRODUCTS.filter(p=>p.tag==='new').concat(PRODUCTS.filter(p=>p.tag!=='new')).slice(0,4);
  el.innerHTML = feat.map(productCard).join('');
}

/* ---- SLIDER / REVEAL / EXTRA ---- */
function initHero(){
  const slides = $$('.hero-slide'); if (!slides.length) return;
  const dots = $$('#heroIndicator span'); let i = 0;
  const show = n => { slides.forEach(s=>s.classList.remove('active')); dots.forEach(d=>d.classList.remove('active'));
    slides[n].classList.add('active'); dots[n] && dots[n].classList.add('active'); i = n; };
  dots.forEach((d,n)=>d.onclick=()=>show(n));
  setInterval(()=>show((i+1)%slides.length), 6000);
}
function initTestimonials(){
  const t = $$('.testimonial'); if (!t.length) return;
  const d = $$('#tDots span'); let i = 0;
  const show = n => { t.forEach(x=>x.classList.remove('active')); d.forEach(x=>x.classList.remove('active'));
    t[n].classList.add('active'); d[n] && d[n].classList.add('active'); i = n; };
  d.forEach((x,n)=>x.onclick=()=>show(n));
  setInterval(()=>show((i+1)%t.length), 7000);
}
function initReveal(){
  const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), {threshold:.1});
  $$('.reveal').forEach(el => ob.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav(); injectFooter(); injectCartUI();
  renderCart(); initCatalog(); initFeatured(); initHero(); initTestimonials(); initReveal();
  const nf = $('#newsletterForm');
  if (nf) nf.onsubmit = e => { e.preventDefault(); showToast('Iscrizione completata ✓'); nf.reset(); };
});