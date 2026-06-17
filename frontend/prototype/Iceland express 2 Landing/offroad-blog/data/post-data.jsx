// data/post-data.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express — Off-Road Blog Post Data
// All content for the "F-Roads & the Highlands" post.
// ─────────────────────────────────────────────────────────────

const POST_DATA = {
  id:          'highland-f-roads',
  tag:         'Off-Road',
  cat:         'Off-Road',
  date:        'May 28, 2026',
  readTime:    '6 min read',
  author:      'Björn Sigurðsson',
  authorRole:  'Off-road driving instructor',
  title:       'F-Roads & the Highlands: Which 4×4 Do You Actually Need?',
  excerpt:     'When to go, which 4×4 you need, and the five highland routes that reward the adventurous driver.',
  heroSlot:    'blog-highland-hero',
  heroPlaceholder: 'Highland F-road — river crossing, Landmannalaugar',

  ctaTitle:    'Heading into the highlands?',
  ctaDesc:     'Book a high-clearance 4×4 with free cancellation — from €58/day.',
  midCtaAfter: 2,

  sections: [
    {
      type: 'intro',
      body: 'Iceland has roughly 7,000 km of F-roads — tracks that carve through lava fields, cross glacial rivers, and climb to passes where the wind genuinely tries to remove your car door. Driving them is the best thing you can do in Iceland. It is also the fastest way to ruin a rental car if you don\'t respect a few basic rules.',
    },
    {
      type: 'h2',
      text: 'The golden rule: minimum clearance of 22 cm',
    },
    {
      type: 'body',
      body: 'F-roads are legally off-limits to 2WD vehicles. Not advisory — it\'s Icelandic law, and rental insurance is void if you drive an F-road in an unsuitable car. The minimum you need is a high-clearance 4×4: a Dacia Duster, Suzuki Jimny, or Toyota RAV4 will handle most F-roads. For the serious ones — F26, F88, F910 — you want a Defender or a Hilux.',
    },
    {
      type: 'pull',
      text: 'Rental insurance is void if you drive an F-road in an unsuitable car. This is Icelandic law, not a recommendation.',
    },
    {
      type: 'h2',
      text: 'The five F-roads worth the detour',
    },
    {
      type: 'list',
      items: [
        'F35 Kjölur — the most accessible highland route. Gravel, gentle river crossings, open mid-June. Good for first-timers.',
        'F208 Fjallabak — past Landmannalaugar and its rhyolite mountains. The colours are otherworldly.',
        'F26 Sprengisandur — Iceland\'s wild interior crossing. Remote, dramatic, requires experience.',
        'F88 to Askja — ends at a caldera lake where you can swim in geothermal water surrounded by a volcanic desert.',
        'F910 Öskjuvatn — the highest point in Iceland accessible by car. Opens late July, closes early September.',
      ],
    },
    {
      type: 'img',
      slot:        'blog-highland-crossing',
      placeholder: 'River crossing on F208, highlands of Iceland',
      caption:     'River crossings: enter perpendicular, drive slow and steady, never stop in the middle.',
    },
    {
      type: 'h2',
      text: 'When do F-roads open?',
    },
    {
      type: 'body',
      body: 'F-roads are closed in winter — most open between mid-June and early July, depending on snowmelt. Check road.is daily during the opening window. F35 Kjölur typically opens first; Sprengisandur and the northern routes last. They close again in late September.\n\nDriving a closed F-road voids your insurance entirely and risks a fine. The closures exist for good reason — we met a family stuck on a flooded track near Askja for six hours last summer.',
    },
  ],

  relatedPosts: ['ring-road', 'ev-charging', 'packing-june'],
};

// Recommended car for this post (4×4 / off-road category)
const RECOMMENDED_CAR = {
  id:           'duster',
  name:         'Dacia Duster 4x4',
  similar:      'or similar (automatic)',
  year:         '2023',
  cat:          '4x4',
  catLabel:     '4x4 · High clearance',
  perDay:       58,
  transmission: 'Auto',
  seats:        5,
  bags:         4,
  drive:        '4WD',
  fuel:         'Diesel',
  rating:       4.8,
  reviews:      126,
  provider:     'Blue Car Rental',
  img:          '../assets/car-suv.png',
};

// Related post stubs (enough data to render RelatedPosts cards)
const RELATED_POSTS = [
  {
    id:              'ring-road',
    cat:             'Route',
    title:           '7 Days on the Ring Road: A First-Timer\'s Honest Account',
    date:            'June 3, 2026',
    readTime:        '11 min read',
    heroSlot:        'related-ring-road',
    heroPlaceholder: 'Ring Road — Icelandic landscape panorama',
  },
  {
    id:              'ev-charging',
    cat:             'Electric',
    title:           'Driving Iceland in an EV: Charging on the Ring Road',
    date:            'May 20, 2026',
    readTime:        '5 min read',
    heroSlot:        'related-ev',
    heroPlaceholder: 'Tesla at Iceland fast charger',
  },
  {
    id:              'packing-june',
    cat:             'Practical',
    title:           'What to Pack for an Icelandic Road Trip in June',
    date:            'May 12, 2026',
    readTime:        '3 min read',
    heroSlot:        'related-packing',
    heroPlaceholder: 'Packed car boot — Iceland road trip gear',
  },
];


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { POST_DATA, RECOMMENDED_CAR, RELATED_POSTS });
