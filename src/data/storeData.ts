import { Product, BlogPost, CategoryItem } from '../types';

export const GUITAR_CATEGORIES: CategoryItem[] = [
  {
    id: 'acoustic',
    name: 'Acoustic Guitars',
    image: '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg',
    count: 24,
    description: 'Dreadnought, concert, and cutaway acoustic guitars crafted for rich warmth and resonance.'
  },
  {
    id: 'electric',
    name: 'Electric Guitars',
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&auto=format&fit=crop&q=80',
    count: 18,
    description: 'Strat, Tele, and LP styles featuring custom single-coil and humbucker configurations.'
  },
  {
    id: 'classical',
    name: 'Classical Guitars',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    count: 12,
    description: 'Traditional Spanish nylon string guitars with cedar and spruce soundboards.'
  },
  {
    id: 'strings',
    name: 'Strings',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&auto=format&fit=crop&q=80',
    count: 36,
    description: 'Phosphor bronze, nickel wound, and coated strings for electric, acoustic, and bass.'
  },
  {
    id: 'bass',
    name: 'Bass Guitars',
    image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=600&auto=format&fit=crop&q=80',
    count: 14,
    description: '4-string and 5-string precision and jazz basses for low-end punch.'
  },
  {
    id: 'accessories',
    name: 'Guitar Accessories',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    count: 42,
    description: 'Heavy duty stands, padded gig bags, clip-on chromatic tuners, capos, and cables.'
  },
  {
    id: 'pedals',
    name: 'Pedals & Effects',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80',
    count: 28,
    description: 'Overdrive, chorus, tape delay, reverb, and multi-effects pedalboard processors.'
  },
  {
    id: 'travel',
    name: 'Travel Guitars',
    image: '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg',
    count: 9,
    description: 'Compact 3/4 scale acoustic and silent electric guitars built for musicians on the road.'
  },
  {
    id: 'semi-hollow',
    name: 'Semi-Hollow & Archtops',
    image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&auto=format&fit=crop&q=80',
    count: 8,
    description: 'Vintage-voiced semi-hollow instruments providing rich jazz and blues resonance.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'donner-m100',
    name: 'Donner Studio Monitor Headphones M100',
    brand: 'Donner',
    category: 'Headphones',
    type: 'Studio Monitors',
    price: 2990,
    originalPrice: 3850,
    discountPercentage: 22,
    rating: 5,
    reviewsCount: 1,
    inStock: false,
    freeShipping: true,
    image: '/src/assets/images/studio_monitor_headphones_1791430700306.jpg',
    description: 'Professional closed-back studio reference headphones engineered with 50mm neodymium dynamic drivers for accurate sound reproduction across the frequency spectrum.',
    features: [
      '50mm Neodymium magnet drivers',
      'Ergonomic memory foam ear cushions',
      'Detachable 3m coiled audio cable & 3.5mm/6.35mm gold adapter',
      'Frequency response: 10Hz - 32kHz'
    ],
    specs: {
      'Driver Size': '50 mm',
      'Impedance': '32 Ohms',
      'Sensitivity': '98 ± 3 dB',
      'Connector': '3.5mm / 6.35mm adapter included'
    }
  },
  {
    id: 'joyo-jmh05',
    name: 'JOYO JMH05 in-ear monitors',
    brand: 'JOYO',
    category: 'Headphones',
    type: 'In-Ear Monitors',
    price: 11600,
    originalPrice: 13000,
    discountPercentage: 11,
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    isNew: true,
    freeShipping: true,
    image: '/src/assets/images/iem_earphones_hybrid_1791430712752.jpg',
    description: 'High-definition multi-driver in-ear monitor system equipped with custom balanced armature and dynamic hybrid architecture for pristine live stage performances.',
    features: [
      'Hybrid 5-Driver Acoustic Design (4 BA + 1 Dynamic)',
      'Acoustic sound guide damping filter',
      'Silver-plated OFC detachable MMCX braided cable',
      'Custom ergonomic acrylic shell for noise isolation up to 26dB'
    ],
    specs: {
      'Frequency Response': '7Hz - 40,000Hz',
      'Impedance': '18 Ohms',
      'Cable Length': '1.2m OFC silver-plated',
      'Connector': 'MMCX / 3.5mm TRS'
    }
  },
  {
    id: 'kz-zst-x-pl',
    name: 'KZ ZST X PL Hybrid In-Ear Monitor',
    brand: 'KZ Acoustics',
    category: 'Headphones',
    type: 'In-Ear Monitors',
    price: 2050,
    originalPrice: 2460,
    discountPercentage: 17,
    rating: 4.6,
    reviewsCount: 38,
    inStock: false,
    freeShipping: true,
    image: '/src/assets/images/iem_earphones_hybrid_1791430712752.jpg',
    description: '1BA + 1DD Dual Driver acoustic earphone boasting upgraded soundstage, transparent polymer cavity, and physical frequency division technology.',
    features: [
      '10mm Dual Magnetic Dynamic Unit + 30095 Balanced Armature',
      'High-purity silver-plated wire',
      'Ergonomic contouring for painless long wear',
      'Built-in HD condenser microphone version available'
    ],
    specs: {
      'Driver Configuration': '1DD + 1BA Hybrid',
      'Sensitivity': '107 dB',
      'Impedance': '12 Ohms',
      'Weight': '22g'
    }
  },
  {
    id: 'kz-zst-x-cyan',
    name: 'KZ ZST X CYAN Hybrid In-Ear Monitor',
    brand: 'KZ Acoustics',
    category: 'Headphones',
    type: 'In-Ear Monitors',
    price: 2050,
    originalPrice: 2460,
    discountPercentage: 17,
    rating: 4.7,
    reviewsCount: 42,
    inStock: false,
    freeShipping: true,
    image: '/src/assets/images/iem_earphones_hybrid_1791430712752.jpg',
    description: 'Eye-catching cyan translucent shell housing high-precision acoustics for clear vocals and tight, punchy low-end response.',
    features: [
      'Custom cyan resin housing',
      'Passive noise reduction up to 26dB',
      'Reinforced 2-Pin 0.75mm gold-plated connector',
      'High fidelity acoustic division board'
    ],
    specs: {
      'Driver Configuration': '1DD + 1BA Hybrid',
      'Frequency Response': '20Hz - 40kHz',
      'Impedance': '12 Ohms',
      'Jack': '3.5mm Gold Plated'
    }
  },
  {
    id: 'procraft-studio-pro50',
    name: 'Procraft StudioPro 50 Reference Headphones',
    brand: 'Procraft',
    category: 'Headphones',
    type: 'Studio Monitors',
    price: 4999,
    originalPrice: 6500,
    discountPercentage: 23,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    isNew: true,
    freeShipping: true,
    image: '/src/assets/images/studio_monitor_headphones_1791430700306.jpg',
    description: 'Flat-response studio headphones engineered for tracking, mixing, and critical acoustic mastering. Features comfortable velour ear pads.',
    features: [
      'Precision matched 50mm titanium drivers',
      'Breathable protein leather and velour swappable pads',
      'Foldable swivel design for DJ and single-ear monitoring',
      'Includes hard shell protective carrying case'
    ],
    specs: {
      'Frequency Response': '5Hz - 35,000Hz',
      'Impedance': '64 Ohms',
      'Sensitivity': '102 dB',
      'Included Accessories': 'Coiled cable, straight cable, 6.35mm adapter, case'
    }
  },
  {
    id: 'fender-pure-acoustic',
    name: 'Fender FA-115 Dreadnought Acoustic Pack',
    brand: 'Fender',
    category: 'Guitars',
    type: 'Acoustic Guitars',
    price: 14500,
    originalPrice: 17200,
    discountPercentage: 15,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    freeShipping: true,
    image: '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg',
    description: 'Classic dreadnought tone with spruce top and walnut fretboard. Pack includes gig bag, guitar strap, and picks.',
    features: [
      'Spruce top with "X"-bracing',
      'Basswood back and sides',
      '20-fret walnut fingerboard',
      'Hardwood bridge with compensated saddle'
    ]
  },
  {
    id: 'donner-dst-100',
    name: 'Donner DST-100 Electric Guitar Kit Lake Blue',
    brand: 'Donner',
    category: 'Guitars',
    type: 'Electric Guitars',
    price: 13999,
    originalPrice: 16999,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    freeShipping: true,
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&auto=format&fit=crop&q=80',
    description: 'Solid basswood body with HSS pickups, maple neck, 5-way pickup switch, tremolo bridge, and complete starter kit with amp.',
    features: [
      'HSS Pickup configuration (Humbucker + 2 Single Coils)',
      'Canadian maple neck with "C" shape profile',
      'Includes 3W mini practice amp, gig bag, digital tuner, and cable'
    ]
  },
  {
    id: 'procraft-dreadnought-vintage',
    name: 'Procraft Artisan Series Dreadnought Honey Sunburst',
    brand: 'Procraft',
    category: 'Guitars',
    type: 'Acoustic Guitars',
    price: 18990,
    originalPrice: 22500,
    discountPercentage: 16,
    rating: 5,
    reviewsCount: 11,
    inStock: true,
    isNew: true,
    freeShipping: true,
    image: '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg',
    description: 'Handcrafted solid Sitka spruce top with scalloped X-bracing and mahogany body, delivering rich sustain and articulate overtones.',
    features: [
      'Solid Sitka Spruce soundboard',
      'African Mahogany back & sides',
      'Bone nut and compensated saddle',
      'Die-cast gold tuning machines'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'getting-started-piano',
    title: 'Getting Started with Piano: Easiest Way to Learn & Best Digital Pianos',
    category: 'Piano Guides',
    date: 'September 23rd, 2026',
    readTime: '6 min read',
    image: '/src/assets/images/blog_piano_keyboard_1791430723519.jpg',
    author: 'Aarav Sharma',
    summary: 'A beginner-focused guide that directly answers whether piano is actually easier than guitar (yes and no, different challenges, not a lesser instrument). Covers practical early-learning habits: short daily sessions, single-hand-first practice, and using teaching-mode features to master key positions effortlessly.',
    content: [
      'Starting your musical journey on the piano provides the cleanest visual layout of musical harmony. Every note is laid out linearly in front of you—white keys for natural notes, black keys for sharps and flats.',
      'Unlike stringed instruments where finger callus formation and fret buzzing can cause early friction, a digital piano produces a pure pitch with a single key strike. This allows new musicians to focus immediately on ear training, rhythm, and hand coordination.',
      'When shopping for your first digital piano, prioritize 88 fully-weighted hammer-action keys. Semi-weighted synth keys lack the tactile resistance needed to build dynamic finger control.',
      'Recommended Practice Routine: Commit to 20 focused minutes every day rather than one two-hour session on Sunday. Spend 5 minutes on finger warmup scales, 10 minutes on right-hand melody lines, and 5 minutes integrating simple left-hand root bass notes.'
    ]
  },
  {
    id: 'essential-guitar-accessories',
    title: 'Essential Guitar Accessories: Tuners, Stands, Straps & Pickups',
    category: 'Guitar Tips',
    date: 'September 16th, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
    author: 'Vikram Menon',
    summary: 'A practical, no-fluff guide to guitar accessories, separating what\'s genuinely worth buying from what\'s optional hype. Covers why a clip-on tuner is one of the few universally useful small purchases, what actually matters in a guitar stand for humid climates, and which strap locks protect your investment.',
    content: [
      'Every guitarist eventually faces the accessory wall at their local music store. With hundreds of gadgets vying for attention, it pays to understand which accessories protect your instrument and simplify daily playing.',
      '1. Clip-On Chromatic Tuners: Smartphone tuner apps work well in quiet bedrooms, but fail at rehearsal studios or loud stages. Vibration-sensing piezo clip-on tuners track your pitch accurately even in loud rooms.',
      '2. Stable A-Frame Guitar Stands: Avoid flimsy wire stands that tip over easily. A heavy-duty stand with nitrocellulose-safe foam padding keeps your guitar off the floor and ready to play at a moment\'s notice.',
      '3. High-Friction Nylon or Padded Leather Straps: Broad straps distribute weight evenly across your shoulder, avoiding neck fatigue during prolonged rehearsals. Always pair them with silicone strap locks.',
      '4. Soundhole & Magnetic Pickups: If your acoustic guitar lacks an onboard preamp, a quick-install soundhole pickup allows you to plug directly into acoustic amplifiers or PA systems without invasive body drilling.'
    ]
  },
  {
    id: 'guitars-with-built-in-pedals',
    title: 'Don\'t Have Pedals? These Guitars Already Have Them Built In',
    category: 'Gear Reviews',
    date: 'September 9th, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&auto=format&fit=crop&q=80',
    author: 'Neha Roy',
    summary: 'A follow-up to the pedals guide for players who\'d rather skip pedalboards entirely, covering smart guitars with amp effects built straight into the body. Discover how modern onboard DSP chips offer four onboard tones, wireless Bluetooth backing track streaming, and direct headphone outputs.',
    content: [
      'For decades, electric guitarists accepted that great tone required a heavy signal chain: patch cables, pedalboards, power supplies, and bulky tube amplifiers. Smart instruments are rewriting these rules.',
      'Modern digital signal processing (DSP) chips embedded directly inside the guitar body can calculate real-time amp modeling, overdrive, delay, and modulation before the signal ever leaves the guitar jack.',
      'Key Benefits for Practice & Travel: You can plug studio monitor headphones directly into the instrument\'s 3.5mm jack, stream your favorite backing tracks from your smartphone via Bluetooth, and jam anywhere without disturbing neighbors.',
      'While purists will always cherish analog tube heads, built-in DSP guitars have become the ultimate couch practice companion and travel weapon for touring musicians.'
    ]
  },
  {
    id: 'iem-vs-studio-monitors',
    title: 'In-Ear Monitors vs Studio Headphones: Which Should You Practice With?',
    category: 'Audio Gear',
    date: 'August 28th, 2026',
    readTime: '7 min read',
    image: '/src/assets/images/iem_earphones_hybrid_1791430712752.jpg',
    author: 'Rohan Deshmukh',
    summary: 'Comparing isolation, soundstage, comfort, and hearing protection between multi-driver IEMs and over-ear open/closed back studio monitors for vocalists, drummers, and home studio producers.',
    content: [
      'Choosing between In-Ear Monitors (IEMs) and traditional over-ear studio monitor headphones depends largely on where and what you are playing.',
      'IEMs excel at maximum acoustic isolation. By forming a tight acoustic seal inside the ear canal, they block 20 to 26dB of ambient stage noise. This allows live performers to monitor at lower, safer decibel levels.',
      'Over-ear studio monitors, on the other hand, provide a more natural, spacious soundstage and reduced ear fatigue during lengthy 6-hour mixing sessions.',
      'Verdict: Use IEMs for stage performances, drum monitoring, and portable gigging. Keep a reliable pair of over-ear studio monitor headphones like the Donner M100 or Procraft StudioPro 50 at your desk for critical mixing.'
    ]
  }
];

export const NAV_DROPDOWNS = {
  guitars: [
    'Acoustic Guitars',
    'Electric Guitars',
    'Classical Guitars',
    'Bass Guitars',
    'Travel Guitars',
    'Guitar Strings',
    'Guitar Pickups & Pre庆mps',
    'Guitar Accessories'
  ],
  ukulele: [
    'Soprano Ukuleles',
    'Concert Ukuleles',
    'Tenor Ukuleles',
    'Baritone Ukuleles',
    'Ukulele Bags & Accessories'
  ],
  violins: [
    'Student Violins',
    'Concert Violins',
    'Electric Violins',
    'Bows & Rosin',
    'Hard Cases'
  ],
  windPercussion: [
    'Drum Sticks & Mallets',
    'Practice Pads',
    'Cajons & Bongos',
    'Harmonicas',
    'Flutes & Recorders',
    'Cymbals'
  ],
  keyboards: [
    'Digital Pianos 88-Key',
    'Synthesizers & Workstations',
    'MIDI Controller Keyboards',
    'Keyboard Stands & Benches',
    'Sustain Pedals & Power Supplies'
  ]
};
