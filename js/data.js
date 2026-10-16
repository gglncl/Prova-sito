/* =====================================================
   CLIOON BOUTIQUE — DATI CENTRALIZZATI
   -----------------------------------------------------
   🖼 FOTO TUE: salva le foto nella cartella  img/  del sito
   (es. img/vetrina.jpg) e sostituisci qui gli URL Unsplash
   con 'img/vetrina.jpg'. È l'UNICO punto da modificare.
   -----------------------------------------------------
   🔗 GESTIONALE: in futuro sostituisci PRODUCTS con:
   fetch('https://tuo-gestionale.it/api/products')
     .then(r=>r.json()).then(d=>{PRODUCTS=d; window.clioonRefresh&&clioonRefresh();});
===================================================== */

const CONFIG = {
  shopName: 'Clioon Boutique',
  whatsapp: '393420834999',
  email: 'clioon.b.stresa@gmail.com',
  phone: '+39 342 083 4999',
  address: 'Via Vincenzo de Vit 7, 28838 Stresa (VB)',
  instagram: 'https://www.instagram.com/clioon.boutique/',
  facebook: 'https://www.facebook.com/p/CLIOON-Boutique-Stresa-61587120304061/',
  maps: 'https://www.google.com/maps?q=Via+Vincenzo+de+Vit+7,+28838+Stresa+VB'
};

const IMAGES = {
  hero: [
    'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&auto=format&fit=crop&q=80'
  ],
  intro: 'https://images.unsplash.com/photo-1507680434567-5739c013f6e9?w=900&auto=format&fit=crop&q=80',
  misura: 'https://images.unsplash.com/photo-1598033129183-c4f50c7610?w=900&auto=format&fit=crop&q=80',
  misuraFix: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&auto=format&fit=crop&q=80',
  boutique: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&auto=format&fit=crop&q=80',
  lookbook: [
    'https://images.unsplash.com/photo-1516836588168-ed3eba4f3f7c?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520975916090-310595e53f83?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620012253295-c15cc3e6f606?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507680434567-5739c013f6e9?w=800&auto=format&fit=crop&q=80'
  ]
};

let PRODUCTS = [
  { id:1,  code:'B.L.11.TS01', name:'T-Shirt Girocollo "Soft Touch"',      category:'T-Shirt',  price:71.70,  stock:8,  brand:'B.L. 11',       tag:'new', image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80' },
  { id:2,  code:'B.L.11.TS02', name:'T-Shirt Girocollo in Maglia',         category:'T-Shirt',  price:71.70,  stock:5,  brand:'B.L. 11',       tag:'',    image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80' },
  { id:3,  code:'B.L.11.PN01', name:'Pantaloni Chinos Gabardine Stretch',  category:'Pantaloni',price:122.70, stock:4,  brand:'B.L. 11',       tag:'',    image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80' },
  { id:4,  code:'B.L.11.BZ01', name:'Blazer Destrutturato Micro Melange',  category:'Giacche',  price:197.70, stock:2,  brand:'B.L. 11',       tag:'low', image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80' },
  { id:5,  code:'AM.CM01',     name:'Camicia Slim Fit in Cotone',          category:'Camicie',  price:89.00,  stock:6,  brand:'Antony Morato', tag:'new', image:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80' },
  { id:6,  code:'AM.JK02',     name:'Giacca Biker in Pelle Nera',          category:'Giacche',  price:389.00, stock:1,  brand:'Antony Morato', tag:'low', image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id:7,  code:'2C.CM03',     name:'Camicia Su Misura Cotone Egiziano',   category:'Camicie',  price:159.00, stock:-1, brand:'Camiceria 2C',  tag:'custom', image:'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80' },
  { id:8,  code:'B.L.11.JE01', name:'Jeans 5 Tasche Slim Fit',             category:'Pantaloni',price:115.00, stock:7,  brand:'B.L. 11',       tag:'',    image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80' },
  { id:9,  code:'AM.PO01',     name:'Polo in Cotone Piquet',               category:'T-Shirt',  price:79.00,  stock:10, brand:'Antony Morato', tag:'new', image:'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=80' },
  { id:10, code:'AM.BZ03',     name:'Giacca Sartoriale in Lana',           category:'Giacche',  price:329.00, stock:3,  brand:'Antony Morato', tag:'',    image:'https://images.unsplash.com/photo-1507680434567-5739c013f6e9?w=600&auto=format&fit=crop&q=80' },
  { id:11, code:'2C.CM05',     name:'Camicia Oxford Bianco Classico',      category:'Camicie',  price:109.00, stock:5,  brand:'Camiceria 2C',  tag:'',    image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80' },
  { id:12, code:'B.L.11.PN04', name:'Chinos Slim in Cotone Stretch',       category:'Pantaloni',price:118.00, stock:6,  brand:'B.L. 11',       tag:'',    image:'https://images.unsplash.com/photo-1624378439575-d8705ad00164?w=600&auto=format&fit=crop&q=80' }
];