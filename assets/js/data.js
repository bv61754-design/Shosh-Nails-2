/* ==========================================================================
   Shosh Nail — assets/js/data.js
   Owner: DATA. Seed content only (SN.DEFAULTS, see SPEC.md section 5).
   Loaded first; must not depend on any other SN module.
   Bilingual text is always a T-object: { ar: '...', en: '...' }.
   ========================================================================== */
(function () {
  'use strict';

  var SN = (window.SN = window.SN || {});

  /* ---------------------------------------------------------------------
     Private builders (local to this file — not part of the public API).
     They only exist so the 12 ready-made designs below stay readable:
     every call returns brand new plain objects, never a shared reference.
     --------------------------------------------------------------------- */

  /* the 10 nail keys, in SPEC order. Kept local because nail-render.js
     (which owns SN.Nail.KEYS) is loaded AFTER this file. */
  var NAIL_KEYS = [
    'rightThumb', 'rightIndex', 'rightMiddle', 'rightRing', 'rightPinky',
    'leftThumb', 'leftIndex', 'leftMiddle', 'leftRing', 'leftPinky'
  ];

  /* descriptor -> full nail state
     d = { c:hex, f:finishId, p:[kind, color, color2, scale], ch:[[charmId,x,y,s,r], ...] } */
  function mkNail(d) {
    d = d || {};
    var p = d.p || [];
    var ch = d.ch || [];
    var charms = [];
    for (var i = 0; i < ch.length; i++) {
      var a = ch[i];
      charms.push({
        id: a[0],
        x: typeof a[1] === 'number' ? a[1] : 0.5,
        y: typeof a[2] === 'number' ? a[2] : 0.35,
        s: typeof a[3] === 'number' ? a[3] : 1,
        r: typeof a[4] === 'number' ? a[4] : 0
      });
    }
    return {
      color: d.c || '#F3D9DE',
      finish: d.f || 'gloss',
      pattern: {
        kind: p[0] || 'none',
        color: p[1] || '#FFFFFF',
        color2: p[2] || '#E8B4C8',
        scale: typeof p[3] === 'number' ? p[3] : 1
      },
      charms: charms
    };
  }

  /* base descriptor + per-key overrides -> the 10-key nails map */
  function mkNails(base, over) {
    var out = {};
    for (var i = 0; i < NAIL_KEYS.length; i++) {
      var k = NAIL_KEYS[i];
      out[k] = mkNail(over && over[k] ? over[k] : base);
    }
    return out;
  }

  /* same size on both hands -> the 10-key sizes map (values = sizeGuide index) */
  function mkSizes(thumb, index, middle, ring, pinky) {
    return {
      rightThumb: thumb, rightIndex: index, rightMiddle: middle, rightRing: ring, rightPinky: pinky,
      leftThumb: thumb, leftIndex: index, leftMiddle: middle, leftRing: ring, leftPinky: pinky
    };
  }

  /* -> a complete, valid DESIGN_CONFIG (SPEC section 6) */
  function mkConfig(o) {
    return {
      v: 1,
      skin: o.skin,
      shape: o.shape,
      length: o.length,
      hand: o.hand || 'both',
      measure: o.measure || 'preset',
      sizes: o.sizes || mkSizes(2, 5, 4, 6, 8),
      nails: mkNails(o.def, o.over),
      qty: 1,
      express: false,
      giftWrap: false,
      notes: ''
    };
  }

  SN.DEFAULTS = {
    version: 1,

    /* =====================================================================
       SETTINGS
       ===================================================================== */
    settings: {
      brand: { ar: 'شوش نيل', en: 'Shosh Nail' },
      tagline: {
        ar: 'أظافر مركّبة مفصّلة على ذوقك وعلى مقاسك',
        en: 'Press-on nails, made to your taste and your fit'
      },
      about: {
        ar: 'شوش نيل مشغل منزلي صغير، كل طقم فيه مصنوع يدويًا لزبونة واحدة. تختارين الشكل والطول واللون والنقشة، ونحن نجهّز الطقم على مقاسك أنتِ — ظفرًا ظفرًا — بخامة مرنة مريحة ولمعة تدوم. ليس لدينا محل ولا صالون: تطلبين من الموقع أو من واتساب، والعلبة تصلك إلى باب البيت كاملة مع اللاصقات وعدّة التركيب، وتلبسينها في أقل من عشر دقائق.',
        en: 'Shosh Nail is a small home workshop: every set is handmade for one customer at a time. You choose the shape, length, colour and pattern, and we build the set to your own measurements — nail by nail — in a flexible, comfortable material with a lasting shine. There is no shop and no salon: you order here or on WhatsApp, and the box is delivered to your door complete with adhesives and a prep kit, ready to wear in under ten minutes.'
      },
      phone: '+9647700000000',
      whatsapp: '9647700000000',
      email: 'hello@shoshnail.com',
      instagram: 'shosh_nail',
      snapchat: 'shosh.nail',
      tiktok: '',
      city: { ar: 'النجف', en: 'Najaf' },
      /* No shop, no showroom, no pickup point — the work is done at home and
         everything ships. The key stays so old backups and the admin panel
         keep merging cleanly, but it must stay empty. */
      address: { ar: '', en: '' },
      /* Not shop opening times — the hours the owner answers messages. */
      hours: {
        ar: 'نرد على الرسائل كل يوم من 11 صباحًا إلى 10 مساءً · والطلب من الموقع مفتوح 24 ساعة',
        en: 'We answer messages daily, 11am – 10pm · ordering on the site is open 24/7'
      },
      currency: { ar: 'د.ع', en: 'IQD' },
      adminPass: 'shosh1234',
      /* مستودع الموقع على GitHub — تستخدمه لوحة التحكم لفتح صفحة تعديل
         ملف كلمة المرور (password.js) مباشرة من الهاتف بضغطة واحدة.
         The GitHub repo + branch this site is published from; the admin panel
         uses them to build a one-tap "edit password.js" link. */
      /* the reassurance shown right where she hesitates, above the order
         button. Edited from the general settings. */
      afterOrder: {
        ar: 'نرد عليك في أقل من ساعة · نتفق على المقاس والدفع بالخاص · نصوّر لك الطقم أثناء العمل عليه وقبل إرساله',
        en: 'We reply within the hour · size and payment agreed in chat · photos of your set while we make it and before it ships'
      },
      /* "and then what?" as four steps, shown above the confirm button and on
         the receipt. Steps are separated with | so the panel edits one box. */
      afterSteps: {
        ar: 'نرد عليك في أقل من ساعة|نتفق على المقاس وطريقة الدفع بالخاص|نصوّر لك الطقم أثناء العمل عليه وقبل إرساله|يصلك الطقم وتدفعين الباقي للمندوب',
        en: 'We reply within the hour|Size and payment agreed in chat|Photos of your set while we make it and before it ships|It arrives and you pay the courier the rest'
      },
      /* the launch offer: the first N customers get a free set worth `gift`
         added to their order, whatever the order costs. Turned off from the
         panel when the twenty are in. */
      founding: { on: true, total: 20, gift: 12000 },

      repo: 'bv61754-design/Shosh-Nails-2',
      repoBranch: 'main',
      notifyEndpoint: '',
      notifyKey: '',
      notifyEmail: '',
      announce: {
        ar: 'التوصيل 5,000 د.ع لكل المحافظات · النجف 3,000 · الدفع عند الاستلام',
        en: 'Delivery 5,000 IQD to every governorate · Najaf 3,000 · cash on delivery'
      },
      announceOn: true,
      whatsappOrder: true,
      theme: 'light'
    },

    /* =====================================================================
       PRICING (all rates in IQD — the owner sets the real numbers from the panel)
       ===================================================================== */
    pricing: {
      base: 15000,
      /* A single-hand set is 5 nails, but it is not half the work: the design,
         the sizing and the box are the same. This is the share of `base` such
         an order pays — 1 charges the full set price, 0.5 charges exactly half.
         Only the base line is scaled; every per-nail rate already halves on its
         own because there are half as many nails. */
      singleHandFactor: 0.6,
      perExtraColor: 500,
      perPatternNail: 1000,
      perCharm: 500,
      express: 5000,
      giftWrap: 2000,
      /* the fallback courier fee; the governorate the customer picks at
         checkout carries its own fee and wins over this one */
      shipping: 5000,
      freeShippingOver: 0,
      vat: 0,
      depositPct: 0,
      /* the flat deposit asked up front on cash-on-delivery orders so a set
         is never made for a parcel nobody collects. It comes off the total. */
      deposit: 5000
    },

    /* =====================================================================
       HOME PAGE CONTENT
       ===================================================================== */
    home: {
      heroTitle: {
        ar: 'أظافر تشبهك… من أول لمسة',
        en: 'Nails that look like you — from the very first touch'
      },
      heroSub: {
        ar: 'أجيبي عن أسئلة سريعة كلها صور، ونحن نبني لك طقمًا كاملًا على ذوقك — اللون والشكل والطول والنقشة والزخارف. نجهّزه على مقاسك ويصلك جاهزًا تلبسينه في دقائق.',
        en: 'Answer nine picture questions and we build you a whole set in your taste — colour, shape, length, pattern and charms. We craft it to your size and send it ready to wear in minutes.'
      },
      heroCta: { ar: 'ابدئي اختبار الستايل', en: 'Take the style quiz' },
      heroImage: '',
      features: [
        {
          id: 'f-custom',
          icon: 'brush',
          title: { ar: 'طقم مبني على ذوقك', en: 'Built around your taste' },
          text: {
            ar: 'أسئلة سريعة كلها صور، وفي آخرها يظهر لك طقم كامل: اللون واللمسة والنقشة والزخارف، كله مبني على إجاباتك أنتِ.',
            en: 'A few picture questions, and at the end a whole set — colour, finish, pattern and charms — built from your own answers.'
          }
        },
        {
          id: 'f-fit',
          icon: 'ruler',
          title: { ar: 'مقاسك مضبوط', en: 'Measured to your hands' },
          text: {
            ar: 'نتفق على مقاسك بالخاص قبل أن نبدأ العمل: صورة يدك مع مسطرة، أو عرض كل ظفر بالمليمتر، أو مقاس جاهز. ونصوّر لك الطقم قبل إرساله.',
            en: 'We agree your size in chat before we make it: a photo of your hand with a ruler, each nail in millimetres, or a preset. And you get a photo of the set before it ships.'
          }
        },
        {
          id: 'f-quality',
          icon: 'gem',
          title: { ar: 'خامة تدوم وتريح', en: 'Comfort that lasts' },
          text: {
            ar: 'أكريليك مرن وخفيف على ظفرك الطبيعي، بحواف مصقولة ولمعة تدوم من أسبوع إلى ثلاثة أسابيع.',
            en: 'A flexible, lightweight acrylic that is kind to your natural nail, with polished edges and a shine that holds for one to three weeks.'
          }
        },
        {
          id: 'f-ship',
          icon: 'truck',
          title: { ar: 'توصيل لكل العراق', en: 'Delivered anywhere in Iraq' },
          text: {
            ar: 'نجهّز طقمك خلال 3–5 أيام، ونرسله إلى كل محافظات العراق والدفع عند الاستلام. وهناك خيار مستعجل إذا كانت مناسبتك قريبة.',
            en: 'Your set is crafted in 3–5 days and delivered to every governorate in Iraq, cash on delivery — with a rush option when the date is close.'
          }
        }
      ],
      steps: [
        {
          id: 'st-1',
          title: { ar: 'ابدئي الاختبار أو اختاري', en: 'Take the quiz or pick one' },
          text: {
            ar: 'ابدئي اختبار الستايل ونحن نبني لك طقمك من إجاباتك، أو اختاري تصميمًا جاهزًا من المتجر مباشرة.',
            en: 'Take the style quiz and we build your set from your answers, or pick a ready-made design from the shop.'
          }
        },
        {
          id: 'st-2',
          title: { ar: 'نتفق على مقاسك', en: 'We agree your size' },
          text: {
            ar: 'بعد أن ترسلي طلبك نرسل لك بالخاص طريقة القياس مع صورة: يدك مع مسطرة، أو كل ظفر بالمليمتر، أو مقاس جاهز (S / M / L).',
            en: 'Once your order lands we send you the measuring method in chat, with a picture: your hand with a ruler, each nail in millimetres, or a preset (S / M / L).'
          }
        },
        {
          id: 'st-3',
          title: { ar: 'أرسلي الطلب', en: 'Send your order' },
          text: {
            ar: 'راجعي التفاصيل والسعر واختاري طريقة الدفع، ثم أرسلي رسالة الطلب على واتساب أو إنستغرام. نرد عليك في أقل من ساعة.',
            en: 'Review the details and the price, pick a payment method, then send the order message on WhatsApp or Instagram. We reply within the hour.'
          }
        },
        {
          id: 'st-4',
          title: { ar: 'البسيها في دقائق', en: 'Wear them in minutes' },
          text: {
            ar: 'العلبة تصلك وفيها كل شيء: اللاصقات، المبرد، عود الجلد ومنديل التنظيف — وبطاقة شرح خطوة بخطوة.',
            en: 'The box arrives with everything: adhesive tabs, a file, a cuticle stick, a prep wipe and a step-by-step card.'
          }
        }
      ],
      /* Empty on purpose until the first real deliveries: a new shop that
         claims twelve hundred sets and three glowing reviews is spotted in
         one glance. The panel adds real ones, with the customer's consent. */
      testimonials: [],
      stats: []
    },

    /* =====================================================================
       SKIN TONES (light -> deep). `shadow` is the darker edge of the hand.
       ===================================================================== */
    skinTones: [
      { id: 'st-porcelain', name: { ar: 'فاتح جداً', en: 'Porcelain' }, hex: '#F6DFD0', shadow: '#E2C2B0' },
      { id: 'st-fair', name: { ar: 'فاتح', en: 'Fair' }, hex: '#EFCDB6', shadow: '#D8AF95' },
      { id: 'st-wheat', name: { ar: 'حنطي', en: 'Wheatish' }, hex: '#E3B48F', shadow: '#C7946F' },
      { id: 'st-golden', name: { ar: 'برونزي', en: 'Golden Tan' }, hex: '#D19A6E', shadow: '#B27B51' },
      { id: 'st-honey', name: { ar: 'عسلي', en: 'Honey' }, hex: '#B87A4E', shadow: '#985E36' },
      { id: 'st-deep', name: { ar: 'بني عميق', en: 'Deep Cocoa' }, hex: '#7E4B2D', shadow: '#5F341B' }
    ],

    /* =====================================================================
       MATCH AXES — the vocabulary the style quiz thinks in.

       These ids are the SAME ids the quiz asks its questions with, and they
       are what a ready design is tagged with in the admin panel. That is the
       whole link: tag a design on these axes and the quiz can recommend it.
       Change a LABEL freely; change an ID and the quiz stops matching on it.
       ===================================================================== */
    matchAxes: {
      occasion: [
        { id: 'wedding', name: { ar: 'عرس أو خطوبة', en: 'Wedding or engagement' } },
        { id: 'daily', name: { ar: 'دوام ويوميات', en: 'Work and everyday' } },
        { id: 'party', name: { ar: 'سهرة ونزهة', en: 'A night out' } },
        { id: 'holiday', name: { ar: 'سفر وإجازة', en: 'Travel and holiday' } }
      ],
      vibe: [
        { id: 'calm', name: { ar: 'هادئ ونظيف', en: 'Calm and clean' } },
        { id: 'romantic', name: { ar: 'ناعم ورومانسي', en: 'Soft and romantic' } },
        { id: 'bold', name: { ar: 'جريء وواضح', en: 'Bold and clear' } },
        { id: 'glam', name: { ar: 'لامع وفخم', en: 'Glossy and glam' } }
      ],
      palette: [
        { id: 'nude', name: { ar: 'نيود وبيج', en: 'Nude and beige' } },
        { id: 'pink', name: { ar: 'وردي', en: 'Pink' } },
        { id: 'red', name: { ar: 'أحمر ومرجاني', en: 'Red and coral' } },
        { id: 'dark', name: { ar: 'غامق وعميق', en: 'Dark and deep' } },
        { id: 'pastel', name: { ar: 'باستيل هادئ', en: 'Quiet pastel' } },
        { id: 'bright', name: { ar: 'ألوان جريئة', en: 'Bright colours' } }
      ],
      season: [
        { id: 'spring', name: { ar: 'ربيع', en: 'Spring' } },
        { id: 'summer', name: { ar: 'صيف', en: 'Summer' } },
        { id: 'autumn', name: { ar: 'خريف', en: 'Autumn' } },
        { id: 'winter', name: { ar: 'شتاء', en: 'Winter' } }
      ],
      attention: [
        { id: 'quiet', name: { ar: 'بهدوء', en: 'Quietly' } },
        { id: 'soft', name: { ar: 'لفتة خفيفة', en: 'A light touch' } },
        { id: 'clear', name: { ar: 'واضحة', en: 'Clearly' } },
        { id: 'max', name: { ar: 'لا تخطئها عين', en: 'Impossible to miss' } }
      ],
      metal: [
        { id: 'gold', name: { ar: 'ذهبي', en: 'Gold' } },
        { id: 'silver', name: { ar: 'فضي', en: 'Silver' } },
        { id: 'none', name: { ar: 'بدون معدن', en: 'No metal' } }
      ],

      /* `max` is the ceiling in the shop's own currency. Only the ceiling is
         used: a cheaper set is never withheld from someone who said she could
         spend more. `max: 0` means no ceiling at all. Edit the numbers to
         match your prices. */
      budget: [
        { id: 'b1', max: 20000, name: { ar: 'حتى ٢٠ ألفاً', en: 'Up to 20,000' } },
        { id: 'b2', max: 30000, name: { ar: 'حتى ٣٠ ألفاً', en: 'Up to 30,000' } },
        { id: 'b3', max: 45000, name: { ar: 'حتى ٤٥ ألفاً', en: 'Up to 45,000' } },
        { id: 'any', max: 0, name: { ar: 'لا أحدد ميزانية', en: 'No budget limit' } }
      ]
    },

    /* =====================================================================
       SHAPES — ids must match SN.Nail.SHAPES exactly.
       ===================================================================== */
    shapes: [
      {
        id: 'almond', price: 0,
        name: { ar: 'لوز', en: 'Almond' },
        desc: { ar: 'أطراف ناعمة مدبّبة قليلاً — تطوّل الأصابع وتناسب كل المناسبات.', en: 'Softly tapered tips that lengthen the finger and suit absolutely everything.' }
      },
      {
        id: 'coffin', price: 1000,
        name: { ar: 'كوفن', en: 'Coffin' },
        desc: { ar: 'أطراف مستقيمة مع جوانب مسحوبة — الشكل الأشهر للأطقم الطويلة.', en: 'A straight tip with tapered sides — the signature look for long sets.' }
      },
      {
        id: 'stiletto', price: 1200,
        name: { ar: 'ستيليتو', en: 'Stiletto' },
        desc: { ar: 'مدبّب وجريء، يلفت النظر من أول نظرة ويحتاج طولًا كافيًا.', en: 'Sharp and daring, impossible to miss — and it needs the length to work.' }
      },
      {
        id: 'square', price: 0,
        name: { ar: 'مربّع', en: 'Square' },
        desc: { ar: 'حواف مستقيمة وزوايا واضحة — كلاسيكي ومريح للأظافر القصيرة.', en: 'Flat edge, clean corners — a classic that sits beautifully on shorter lengths.' }
      },
      {
        id: 'squoval', price: 500,
        name: { ar: 'مربّع مدوّر', en: 'Squoval' },
        desc: { ar: 'مربّع بزوايا مخفّفة، ثابت وعملي ويناسب اليد اليومية.', en: 'A square with the corners softened — sturdy, practical, made for everyday hands.' }
      },
      {
        id: 'round', price: 0,
        name: { ar: 'دائري', en: 'Round' },
        desc: { ar: 'أبسط شكل وأقربه لخط الظفر الطبيعي، يعطي مظهرًا نظيفًا وهادئًا.', en: 'The simplest shape and the closest to your natural edge — quiet and clean.' }
      },
      {
        id: 'oval', price: 300,
        name: { ar: 'بيضاوي', en: 'Oval' },
        desc: { ar: 'انسيابي وأنثوي، يوهم بأصابع أطول بدون طول زائد.', en: 'Fluid and feminine, it stretches the finger without adding real length.' }
      },
      {
        id: 'lipstick', price: 1500,
        name: { ar: 'ليبستيك', en: 'Lipstick' },
        desc: { ar: 'طرف مائل مقصوص بزاوية مثل قلم أحمر الشفاه — لمسة جريئة ومختلفة.', en: 'A slanted tip cut on an angle like a lipstick bullet — bold and different.' }
      }
    ],

    /* =====================================================================
       LENGTHS
       ===================================================================== */
    lengths: [
      {
        id: 'short', factor: 0.72, price: 0,
        name: { ar: 'قصير', en: 'Short' }
      },
      {
        id: 'medium', factor: 1, price: 0,
        name: { ar: 'متوسط', en: 'Medium' }
      },
      {
        id: 'long', factor: 1.28, price: 800,
        name: { ar: 'طويل', en: 'Long' }
      },
      {
        id: 'xlong', factor: 1.6, price: 1500,
        name: { ar: 'طويل جداً', en: 'Extra Long' }
      }
    ],

    /* =====================================================================
       FINISHES
       ===================================================================== */
    finishes: [
      { id: 'gloss', kind: 'gloss', price: 0, name: { ar: 'لامع', en: 'Glossy' } },
      { id: 'matte', kind: 'matte', price: 400, name: { ar: 'مطفي', en: 'Matte' } },
      { id: 'jelly', kind: 'jelly', price: 600, name: { ar: 'جيلي شفاف', en: 'Jelly' } },
      { id: 'glitter', kind: 'glitter', price: 800, name: { ar: 'غليتر', en: 'Glitter' } },
      { id: 'velvet', kind: 'velvet', price: 1000, name: { ar: 'فيلفيت', en: 'Velvet' } },
      { id: 'chrome', kind: 'chrome', price: 1200, name: { ar: 'كروم', en: 'Chrome' } }
    ],

    /* =====================================================================
       COLORS — 45 real polish shades across 7 groups.
       ===================================================================== */
    colors: [
      /* nude */
      { id: 'c-nude-warm', hex: '#E7C3AE', group: 'nude', name: { ar: 'نيود دافئ', en: 'Warm Nude' } },
      { id: 'c-nude-rose', hex: '#E9C2C0', group: 'nude', name: { ar: 'نيود وردي', en: 'Rosy Nude' } },
      { id: 'c-latte', hex: '#D8B49A', group: 'nude', name: { ar: 'لاتيه', en: 'Latte' } },
      { id: 'c-sand', hex: '#E8D2B8', group: 'nude', name: { ar: 'رملي', en: 'Desert Sand' } },
      { id: 'c-toffee', hex: '#B98F6F', group: 'nude', name: { ar: 'توفي', en: 'Toffee' } },
      { id: 'c-caramel', hex: '#C08A5E', group: 'nude', name: { ar: 'كراميل', en: 'Caramel' } },
      { id: 'c-mocha', hex: '#9A6B52', group: 'nude', name: { ar: 'موكا', en: 'Mocha' } },
      /* pink */
      { id: 'c-ballet', hex: '#F7DDE2', group: 'pink', name: { ar: 'وردي باليه', en: 'Ballet Slipper' } },
      { id: 'c-blush', hex: '#F4CBD2', group: 'pink', name: { ar: 'بلاش', en: 'Blush' } },
      { id: 'c-peony', hex: '#E88AA5', group: 'pink', name: { ar: 'فاوانيا', en: 'Peony' } },
      { id: 'c-bubblegum', hex: '#F58FB2', group: 'pink', name: { ar: 'وردي علكة', en: 'Bubblegum' } },
      { id: 'c-hot-pink', hex: '#EE5B94', group: 'pink', name: { ar: 'وردي صارخ', en: 'Hot Pink' } },
      { id: 'c-fuchsia', hex: '#D6417E', group: 'pink', name: { ar: 'فوشيا', en: 'Fuchsia' } },
      { id: 'c-dusty-rose', hex: '#C98A93', group: 'pink', name: { ar: 'وردي مغبّر', en: 'Dusty Rose' } },
      /* red */
      { id: 'c-coral', hex: '#F3705A', group: 'red', name: { ar: 'مرجاني', en: 'Coral' } },
      { id: 'c-scarlet', hex: '#D8362F', group: 'red', name: { ar: 'قرمزي', en: 'Scarlet' } },
      { id: 'c-cherry', hex: '#C2192F', group: 'red', name: { ar: 'كرزي', en: 'Cherry' } },
      { id: 'c-brick', hex: '#A8412F', group: 'red', name: { ar: 'طوبي', en: 'Brick' } },
      { id: 'c-ruby', hex: '#9E1B3C', group: 'red', name: { ar: 'ياقوتي', en: 'Ruby' } },
      { id: 'c-wine', hex: '#7B1E31', group: 'red', name: { ar: 'نبيذي', en: 'Wine' } },
      /* bold */
      { id: 'c-tangerine', hex: '#F2782B', group: 'bold', name: { ar: 'يوسفي', en: 'Tangerine' } },
      { id: 'c-lime', hex: '#A8CE2C', group: 'bold', name: { ar: 'ليموني', en: 'Lime' } },
      { id: 'c-turquoise', hex: '#1FB6B0', group: 'bold', name: { ar: 'تركوازي', en: 'Turquoise' } },
      { id: 'c-emerald', hex: '#157F5E', group: 'bold', name: { ar: 'زمردي', en: 'Emerald' } },
      { id: 'c-electric-blue', hex: '#2F5BEA', group: 'bold', name: { ar: 'أزرق كهربائي', en: 'Electric Blue' } },
      { id: 'c-violet', hex: '#7A3FC0', group: 'bold', name: { ar: 'بنفسجي', en: 'Violet' } },
      /* dark */
      { id: 'c-charcoal', hex: '#3A3A3E', group: 'dark', name: { ar: 'فحمي', en: 'Charcoal' } },
      { id: 'c-onyx', hex: '#17131A', group: 'dark', name: { ar: 'أسود عميق', en: 'Onyx Black' } },
      { id: 'c-espresso', hex: '#3E2A23', group: 'dark', name: { ar: 'إسبريسو', en: 'Espresso' } },
      { id: 'c-navy', hex: '#1D2A4A', group: 'dark', name: { ar: 'كحلي', en: 'Midnight Navy' } },
      { id: 'c-deep-plum', hex: '#4A1F3D', group: 'dark', name: { ar: 'برقوقي', en: 'Deep Plum' } },
      { id: 'c-forest', hex: '#1F3B2C', group: 'dark', name: { ar: 'أخضر داكن', en: 'Forest' } },
      /* pastel */
      { id: 'c-lilac', hex: '#C9B6EA', group: 'pastel', name: { ar: 'ليلكي', en: 'Lilac' } },
      { id: 'c-mint', hex: '#B4E4CE', group: 'pastel', name: { ar: 'نعناعي', en: 'Mint' } },
      { id: 'c-sky', hex: '#BBD8F2', group: 'pastel', name: { ar: 'سماوي', en: 'Baby Blue' } },
      { id: 'c-butter', hex: '#F6E6A8', group: 'pastel', name: { ar: 'زبدي', en: 'Butter' } },
      { id: 'c-peach', hex: '#FAC7AC', group: 'pastel', name: { ar: 'خوخي', en: 'Peach' } },
      { id: 'c-pistachio', hex: '#D3E3AE', group: 'pastel', name: { ar: 'فستقي', en: 'Pistachio' } },
      { id: 'c-lavender-grey', hex: '#CFC7D6', group: 'pastel', name: { ar: 'رمادي ليلكي', en: 'Lavender Grey' } },
      /* neutral */
      { id: 'c-milk', hex: '#FAF3EE', group: 'neutral', name: { ar: 'حليبي', en: 'Milk White' } },
      { id: 'c-porcelain', hex: '#F1E7E2', group: 'neutral', name: { ar: 'بورسلين', en: 'Porcelain' } },
      { id: 'c-pearl', hex: '#EDE4E9', group: 'neutral', name: { ar: 'لؤلؤي', en: 'Pearl' } },
      { id: 'c-greige', hex: '#C8BBB0', group: 'neutral', name: { ar: 'بيج رمادي', en: 'Greige' } },
      { id: 'c-stone', hex: '#A9A29B', group: 'neutral', name: { ar: 'حجري', en: 'Stone' } },
      { id: 'c-taupe', hex: '#8C7A70', group: 'neutral', name: { ar: 'بني رمادي', en: 'Taupe' } }
    ],

    /* =====================================================================
       PATTERNS — `kind` values come from SPEC section 8.
       ===================================================================== */
    patterns: [
      { id: 'p-none', kind: 'none', price: 0, name: { ar: 'بدون نقشة', en: 'Plain' } },
      { id: 'p-french', kind: 'french', price: 600, name: { ar: 'فرنش كلاسيك', en: 'Classic French' } },
      { id: 'p-french-deep', kind: 'frenchDeep', price: 800, name: { ar: 'فرنش عريض', en: 'Deep French' } },
      { id: 'p-tips-glitter', kind: 'tipsGlitter', price: 700, name: { ar: 'أطراف غليتر', en: 'Glitter Tips' } },
      { id: 'p-ombre', kind: 'ombre', price: 800, name: { ar: 'أومبريه', en: 'Ombré' } },
      { id: 'p-ombre-v', kind: 'ombreV', price: 800, name: { ar: 'أومبريه عمودي', en: 'Vertical Ombré' } },
      { id: 'p-half', kind: 'half', price: 500, name: { ar: 'نصف ونصف', en: 'Half and Half' } },
      { id: 'p-diagonal', kind: 'diagonal', price: 500, name: { ar: 'قطري', en: 'Diagonal' } },
      { id: 'p-dots', kind: 'dots', price: 600, name: { ar: 'نقاط', en: 'Polka Dots' } },
      { id: 'p-stripes', kind: 'stripes', price: 600, name: { ar: 'خطوط', en: 'Stripes' } },
      { id: 'p-chevron', kind: 'chevron', price: 700, name: { ar: 'شيفرون', en: 'Chevron' } },
      { id: 'p-checkers', kind: 'checkers', price: 900, name: { ar: 'مربعات', en: 'Checkers' } },
      { id: 'p-hearts', kind: 'hearts', price: 800, name: { ar: 'قلوب', en: 'Hearts' } },
      { id: 'p-stars', kind: 'stars', price: 800, name: { ar: 'نجوم', en: 'Stars' } },
      { id: 'p-aura', kind: 'aura', price: 1000, name: { ar: 'هالة', en: 'Aura' } },
      { id: 'p-glazed', kind: 'glazed', price: 1000, name: { ar: 'جليزد دونات', en: 'Glazed Donut' } },
      { id: 'p-flames', kind: 'flames', price: 1100, name: { ar: 'لهب', en: 'Flames' } },
      { id: 'p-marble', kind: 'marble', price: 1200, name: { ar: 'رخامي', en: 'Marble' } },
      { id: 'p-chrome', kind: 'chrome', price: 1200, name: { ar: 'كروم مرآة', en: 'Mirror Chrome' } },
      { id: 'p-leopard', kind: 'leopard', price: 1200, name: { ar: 'نمر', en: 'Leopard' } },
      { id: 'p-lace', kind: 'lace', price: 1400, name: { ar: 'دانتيل', en: 'Lace' } },
      { id: 'p-cat-eye', kind: 'catEye', price: 1500, name: { ar: 'كات آي', en: 'Cat Eye' } },
      /* The shop's own signature finish: magnetic gel packed with fine silver
         flakes. `pattern.color` is read as a faint TINT on the silver (gold /
         rose gold), never as a colour, and the nail's own colour is the dark
         base underneath — see SN.Nail PATTERNS.glitterCatEye. */
      { id: 'p-cat-eye-glitter', kind: 'glitterCatEye', price: 1600, name: { ar: 'كات آي جليتر', en: 'Glitter Cat Eye' } }
    ],

    /* =====================================================================
       CHARMS — the real decorations a nail tech glues onto a press-on:
       cut crystals, pearls, metal studs, foil, dried flowers, 3D shapes.
       Each item points at a vector drawing in assets/js/nail-art.js through
       `art` (SN.Art id). `glyph` stays in the shape as an empty string: old
       backups saved before the artwork existed still merge cleanly, and the
       renderer falls back to glyph -> image -> art in that order.
       `group` must stay inside the six ids the admin panel offers:
       stones · stars · flowers · letters · hearts · misc.
       Prices follow the real work: a flat stud is cheap, a cut stone costs
       more, a 3D shape more again, and a dangling charm is the dearest.
       ===================================================================== */
    charms: [
      /* --- stones, pearls and studs ------------------------------------ */
      { id: 'ch-round', art: 'st-round', glyph: '', image: '', price: 400, group: 'stones', name: { ar: 'كريستالة دائرية', en: 'Round Crystal' } },
      { id: 'ch-teardrop', art: 'st-pear', glyph: '', image: '', price: 500, group: 'stones', name: { ar: 'حجر دمعة', en: 'Teardrop Crystal' } },
      { id: 'ch-marquise', art: 'st-marquise', glyph: '', image: '', price: 500, group: 'stones', name: { ar: 'حجر ماركيز', en: 'Marquise Crystal' } },
      { id: 'ch-princess', art: 'st-princess', glyph: '', image: '', price: 500, group: 'stones', name: { ar: 'حجر مربّع', en: 'Square-cut Crystal' } },
      { id: 'ch-baguette', art: 'st-baguette', glyph: '', image: '', price: 400, group: 'stones', name: { ar: 'حجر مستطيل', en: 'Baguette Crystal' } },
      { id: 'ch-opal', art: 'st-opal', glyph: '', image: '', price: 700, group: 'stones', name: { ar: 'حجر أوبال', en: 'Opal Stone' } },
      { id: 'ch-pearl', art: 'st-pearl', glyph: '', image: '', price: 300, group: 'stones', name: { ar: 'حبة لؤلؤ', en: 'Pearl Bead' } },
      { id: 'ch-pearl-color', art: 'st-pearl-color', glyph: '', image: '', price: 400, group: 'stones', name: { ar: 'لؤلؤة ملوّنة', en: 'Coloured Pearl' } },
      { id: 'ch-caviar', art: 'st-caviar', glyph: '', image: '', price: 400, group: 'stones', name: { ar: 'خرز كافيار', en: 'Caviar Beads' } },
      { id: 'ch-stud', art: 'mt-ball', glyph: '', image: '', price: 200, group: 'stones', name: { ar: 'حبة معدنية', en: 'Metal Stud' } },
      { id: 'ch-stud-triangle', art: 'mt-triangle', glyph: '', image: '', price: 200, group: 'stones', name: { ar: 'مثلث معدني', en: 'Triangle Stud' } },
      { id: 'ch-stud-square', art: 'mt-square', glyph: '', image: '', price: 200, group: 'stones', name: { ar: 'مربّع معدني', en: 'Square Stud' } },

      /* --- stars and moons --------------------------------------------- */
      { id: 'ch-star', art: 'mt-star', glyph: '', image: '', price: 300, group: 'stars', name: { ar: 'نجمة معدنية', en: 'Metal Star' } },
      { id: 'ch-moon', art: 'mt-moon', glyph: '', image: '', price: 300, group: 'stars', name: { ar: 'هلال معدني', en: 'Metal Crescent' } },
      { id: 'ch-star-3d', art: 'sh-star', glyph: '', image: '', price: 500, group: 'stars', name: { ar: 'نجمة بارزة', en: 'Puffy Star' } },
      { id: 'ch-moon-star', art: 'sh-moon-star', glyph: '', image: '', price: 600, group: 'stars', name: { ar: 'هلال ونجمة', en: 'Moon & Star' } },

      /* --- flowers ------------------------------------------------------ */
      { id: 'ch-daisy', art: 'fl-daisy', glyph: '', image: '', price: 500, group: 'flowers', name: { ar: 'زهرة أقحوان', en: 'Daisy' } },
      { id: 'ch-rose', art: 'fl-rose', glyph: '', image: '', price: 500, group: 'flowers', name: { ar: 'وردة صغيرة', en: 'Little Rose' } },
      { id: 'ch-blossom', art: 'fl-blossom', glyph: '', image: '', price: 600, group: 'flowers', name: { ar: 'عنقود زهر', en: 'Blossom Cluster' } },
      { id: 'ch-leaf', art: 'fl-leaf', glyph: '', image: '', price: 400, group: 'flowers', name: { ar: 'غصن أوراق', en: 'Leaf Sprig' } },
      { id: 'ch-dried-flower', art: 'fl-dried', glyph: '', image: '', price: 700, group: 'flowers', name: { ar: 'زهرة مجفّفة', en: 'Pressed Dried Flower' } },

      /* --- hearts ------------------------------------------------------- */
      { id: 'ch-heart-stone', art: 'st-heart', glyph: '', image: '', price: 600, group: 'hearts', name: { ar: 'حجر قلب', en: 'Heart Crystal' } },
      { id: 'ch-heart', art: 'sh-heart', glyph: '', image: '', price: 500, group: 'hearts', name: { ar: 'قلب بارز', en: 'Puffy Heart' } },

      /* --- initials: gold and silver letters ---------------------------- */
      { id: 'ch-letter-sheen', art: 'letter:ش', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف ش ذهبي', en: 'Gold Initial ش' } },
      { id: 'ch-letter-meem', art: 'letter:م', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف م ذهبي', en: 'Gold Initial م' } },
      { id: 'ch-letter-noon', art: 'letter:ن', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف ن ذهبي', en: 'Gold Initial ن' } },
      { id: 'ch-letter-seen', art: 'letter:س', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف س ذهبي', en: 'Gold Initial س' } },
      { id: 'ch-letter-lam', art: 'letter:ل', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف ل ذهبي', en: 'Gold Initial ل' } },
      { id: 'ch-letter-ra', art: 'letter:ر', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف ر ذهبي', en: 'Gold Initial ر' } },
      { id: 'ch-letter-a', art: 'letter:A', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف A ذهبي', en: 'Gold Initial A' } },
      { id: 'ch-letter-m', art: 'letter:M', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف M ذهبي', en: 'Gold Initial M' } },
      { id: 'ch-letter-s', art: 'letter:S', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف S ذهبي', en: 'Gold Initial S' } },
      { id: 'ch-letter-sheen-silver', art: 'letter-silver:ش', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف ش فضي', en: 'Silver Initial ش' } },
      { id: 'ch-letter-a-silver', art: 'letter-silver:A', glyph: '', image: '', price: 600, group: 'letters', name: { ar: 'حرف A فضي', en: 'Silver Initial A' } },

      /* --- shapes, metal work and finishes ------------------------------ */
      { id: 'ch-bow', art: 'sh-bow', glyph: '', image: '', price: 700, group: 'misc', name: { ar: 'فيونكة بارزة', en: '3D Bow' } },
      { id: 'ch-butterfly', art: 'sh-butterfly', glyph: '', image: '', price: 700, group: 'misc', name: { ar: 'فراشة', en: 'Butterfly' } },
      { id: 'ch-bear', art: 'sh-bear', glyph: '', image: '', price: 600, group: 'misc', name: { ar: 'دبّ صغير', en: 'Tiny Bear' } },
      { id: 'ch-crown', art: 'sh-crown', glyph: '', image: '', price: 600, group: 'misc', name: { ar: 'تاج ذهبي', en: 'Gold Crown' } },
      { id: 'ch-cherry', art: 'sh-cherry', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'حبتا كرز', en: 'Cherry Pair' } },
      { id: 'ch-evil-eye', art: 'sh-evil-eye', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'عين زرقاء', en: 'Evil Eye Bead' } },
      { id: 'ch-cross', art: 'sh-cross', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'صليب', en: 'Cross' } },
      { id: 'ch-bolt', art: 'sh-bolt', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'برق', en: 'Lightning Bolt' } },
      { id: 'ch-dangle', art: 'mt-charm-dangle', glyph: '', image: '', price: 900, group: 'misc', name: { ar: 'حلية متدلّية', en: 'Dangling Charm' } },
      { id: 'ch-chain', art: 'mt-chain', glyph: '', image: '', price: 700, group: 'misc', name: { ar: 'سلسلة ذهب', en: 'Gold Chain' } },
      { id: 'ch-frame', art: 'mt-frame', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'حلقة ذهبية', en: 'Gold Ring Frame' } },
      { id: 'ch-foil-gold', art: 'mt-foil-gold', glyph: '', image: '', price: 300, group: 'misc', name: { ar: 'رقاقة ذهب', en: 'Gold Foil Flake' } },
      { id: 'ch-foil-silver', art: 'mt-foil-silver', glyph: '', image: '', price: 300, group: 'misc', name: { ar: 'رقاقة فضة', en: 'Silver Foil Flake' } },
      { id: 'ch-flake-aurora', art: 'mt-flake-aurora', glyph: '', image: '', price: 300, group: 'misc', name: { ar: 'رقاقة أورورا', en: 'Aurora Flake' } },
      { id: 'ch-glitter', art: 'fx-glitter', glyph: '', image: '', price: 400, group: 'misc', name: { ar: 'رشّة جليتر', en: 'Glitter Patch' } },
      { id: 'ch-chrome-smear', art: 'fx-chrome-smear', glyph: '', image: '', price: 500, group: 'misc', name: { ar: 'مسحة كروم', en: 'Chrome Smear' } },
      { id: 'ch-holo-hex', art: 'fx-holo-hex', glyph: '', image: '', price: 400, group: 'misc', name: { ar: 'ترتر هولوغرافيك', en: 'Holo Sequins' } },
      { id: 'ch-goldleaf', art: 'fx-goldleaf', glyph: '', image: '', price: 400, group: 'misc', name: { ar: 'ورق ذهب', en: 'Gold Leaf' } }
    ],

    /* =====================================================================
       SIZE GUIDE — index 0 (widest) .. 11 (narrowest), width in millimetres.
       ===================================================================== */
    sizeGuide: [
      { id: 's0', label: '0', mm: 17.5 },
      { id: 's1', label: '1', mm: 16.5 },
      { id: 's2', label: '2', mm: 15.5 },
      { id: 's3', label: '3', mm: 14.5 },
      { id: 's4', label: '4', mm: 13.5 },
      { id: 's5', label: '5', mm: 12.5 },
      { id: 's6', label: '6', mm: 11.8 },
      { id: 's7', label: '7', mm: 11.0 },
      { id: 's8', label: '8', mm: 10.2 },
      { id: 's9', label: '9', mm: 9.4 },
      { id: 's10', label: '10', mm: 8.2 },
      { id: 's11', label: '11', mm: 7.0 }
    ],

    /* =====================================================================
       SIZE PRESETS — values are sizeGuide indexes.
       ===================================================================== */
    sizeSets: [
      { id: 'S', name: { ar: 'صغير S', en: 'Small S' }, sizes: { thumb: 3, index: 6, middle: 5, ring: 7, pinky: 9 } },
      { id: 'M', name: { ar: 'متوسط M', en: 'Medium M' }, sizes: { thumb: 2, index: 5, middle: 4, ring: 6, pinky: 8 } },
      { id: 'L', name: { ar: 'كبير L', en: 'Large L' }, sizes: { thumb: 1, index: 4, middle: 3, ring: 5, pinky: 7 } }
    ],

    /* =====================================================================
       HOW TO MEASURE
       ===================================================================== */
    measureMethods: [
      {
        id: 'preset',
        name: { ar: 'مقاس جاهز', en: 'Ready preset' },
        text: {
          ar: 'أسرع طريقة: اختاري S أو M أو L ونحن نوزّع المقاسات على أصابعك حسب المتوسط المعتمد عندنا. تناسب أغلب العميلات، ويمكنك تعديل أي إصبع على حدة بعدها إذا شعرتِ أنه أضيق أو أوسع.',
          en: 'The quickest route: pick S, M or L and we spread our standard sizes across your fingers. It works for most hands, and you can still fine-tune any single finger afterwards.'
        },
        steps: [
          { ar: 'اختاري المقاس الأقرب إلى حجم يدك: S لليد الصغيرة، M للمتوسطة، L للكبيرة.', en: 'Pick the preset closest to your hand: S for small, M for medium, L for large.' },
          { ar: 'راجعي رقم المقاس المقترح لكل إصبع في الجدول.', en: 'Check the suggested size number for each finger in the table.' },
          { ar: 'عدّلي أي إصبع على حدة إذا كنتِ متأكدة أنه يحتاج إلى مقاس أوسع أو أضيق.', en: 'Adjust any individual finger if you know it needs to be wider or narrower.' },
          { ar: 'إذا كنتِ بين مقاسين، اختاري الأوسع — الأوسع يلتصق أفضل من الأضيق.', en: 'If you fall between two sizes, always take the wider one — it adheres far better than a tight fit.' }
        ]
      },
      {
        id: 'ruler',
        name: { ar: 'قياس بالمسطرة', en: 'Measure with a ruler' },
        text: {
          ar: 'الطريقة الأدق ولا تستغرق منك أكثر من خمس دقائق. تحتاجين مسطرة بالمليمتر أو شريط قياس خياطة، وتقيسين عرض كل ظفر من حافة إلى حافة عند أوسع نقطة، ثم تدخلين الرقم في الموقع ونحن نحوّله إلى مقاس.',
          en: 'The most accurate method and it takes about five minutes. You need a millimetre ruler or a tailor’s tape: measure each nail across its widest point, enter the number here and we convert it to a size.'
        },
        steps: [
          { ar: 'ضعي المسطرة أفقيًا فوق الظفر عند أوسع نقطة فيه، وليس عند الجلد.', en: 'Lay the ruler flat across the nail at its widest point, not over the cuticle skin.' },
          { ar: 'اقرئي العرض بالمليمتر من الحافة اليمنى إلى الحافة اليسرى، وقرّبيه إلى أقرب نصف مليمتر.', en: 'Read the width in millimetres from edge to edge and round to the nearest half millimetre.' },
          { ar: 'كرّري القياس لكل إصبع في اليدين — الأصابع غالبًا ما تكون متطابقة بين اليدين.', en: 'Repeat for every finger on both hands — the two hands are rarely identical.' },
          { ar: 'أدخلي الأرقام في محدّد المليمتر داخل الموقع، ويظهر لك رقم المقاس تلقائيًا.', en: 'Enter the numbers into the millimetre slider on the site and the matching size appears automatically.' },
          { ar: 'إذا جاء القياس بين رقمين، فاختاري الأوسع دائمًا.', en: 'If a measurement lands between two numbers, always choose the wider size.' }
        ]
      },
      {
        id: 'kit',
        name: { ar: 'عدّة القياس', en: 'Sizing kit' },
        text: {
          ar: 'إذا كنتِ لا تريدين المجازفة بالقياس، نرسل لك عدّة قياس فيها كل المقاسات الاثني عشر تجرّبينها على أظافرك مثل الخواتم. تحتفظين بأرقامك للطلبات القادمة، وقيمة العدّة تُخصم من طلبك الأول.',
          en: 'If you would rather not guess, we post you a sizing kit with all twelve sizes to try on like rings. You keep your numbers for every future order, and the kit price is deducted from your first set.'
        },
        steps: [
          { ar: 'اطلبي عدّة القياس عبر الواتساب واذكري عنوانك.', en: 'Request the sizing kit on WhatsApp and share your address.' },
          { ar: 'جرّبي المقاسات على كل ظفر بدون لاصق، والمقاس الصحيح هو الذي يغطي الظفر من حافة إلى حافة دون أن يضغط على الجلد.', en: 'Try the sizes on each nail without adhesive — the right one covers the nail edge to edge without pressing on the skin.' },
          { ar: 'دوّني رقم كل إصبع في البطاقة المرفقة.', en: 'Write each finger’s number on the card included in the kit.' },
          { ar: 'أرسلي لنا الأرقام على الإنستغرام أو الواتساب مع طلبك.', en: 'Send us the numbers on Instagram or WhatsApp with your order.' }
        ]
      }
    ],

    /* =====================================================================
       PAYMENT METHODS
       ===================================================================== */
    /* Cash on delivery first and pre-selected: that is how Iraq buys. The
       deposit flag marks the methods that ask for pricing.deposit up front,
       so a set is never made for a parcel nobody collects. */
    paymentMethods: [
      {
        id: 'pm-cod', icon: 'cod', enabled: true, deposit: true,
        name: { ar: 'الدفع عند الاستلام', en: 'Cash on delivery' },
        note: {
          ar: 'تدفعين للمندوب عندما يصلكِ الطقم، وهناك عربون بسيط مقدّم يُخصم من المبلغ.',
          en: 'Pay the courier when the set arrives, after a small deposit that comes off the total.'
        },
        details: {
          ar: 'الدفع عند الاستلام متاح في كل المحافظات. حتى لا يضيع عمل الطقم إذا لم يُستلم، نطلب عربوناً بسيطاً مقدّماً يُخصم من المبلغ، والباقي تدفعينه للمندوب. يصلنا العربون بأي طريقة تناسبكِ: زين كاش، أو رصيد سيم كارت (آسياسيل أو زين أو أثير)، أو ماستركارد. نتفق على التفاصيل في الخاص بعد وصول طلبكِ.',
          en: 'Cash on delivery works in every governorate. So that a set is never made for a parcel nobody collects, we ask for a small deposit up front, which comes off the total; you pay the courier the rest. The deposit reaches us however suits you: Zain Cash, phone credit (Asiacell, Zain or Athir), or Mastercard. We settle the details in chat once your order lands.'
        }
      },
      {
        id: 'pm-zaincash', icon: 'wallet', enabled: true,
        name: { ar: 'زين كاش', en: 'Zain Cash' },
        note: { ar: 'تحوّلين إلى محفظة زين كاش — المبلغ كاملاً أو العربون.', en: 'A transfer to our Zain Cash wallet — the full amount or the deposit.' },
        details: {
          ar: 'رقم محفظة زين كاش: 07XXXXXXXXX\nالاسم: شوش نيل\n\nبعد التحويل أرسلي لنا لقطة شاشة في الخاص مع رمز الطلب حتى نؤكّد لكِ وصول المبلغ.',
          en: 'Zain Cash wallet: 07XXXXXXXXX\nName: Shosh Nail\n\nAfter sending, share a screenshot in chat with your order code so we can confirm it arrived.'
        }
      },
      {
        id: 'pm-mastercard', icon: 'card', enabled: true,
        name: { ar: 'ماستركارد', en: 'Mastercard' },
        note: { ar: 'نرسل لكِ تفاصيل الدفع بالبطاقة في الخاص.', en: 'We send you the card payment details in chat.' },
        details: {
          ar: 'اختاري ماستركارد ونرسل لكِ تفاصيل الدفع في الخاص بعد وصول طلبكِ. لا نطلب منكِ أي معلومات عن البطاقة داخل الموقع.',
          en: 'Choose Mastercard and we send you the payment details in chat once your order lands. We never ask for card details on the site.'
        }
      },
      {
        id: 'pm-credit', icon: 'phone', enabled: true,
        name: { ar: 'رصيد سيم كارت (آسياسيل / زين / أثير)', en: 'Phone credit (Asiacell / Zain / Athir)' },
        note: { ar: 'للعربون فقط: تحوّلين رصيداً بقيمة العربون إلى رقمنا.', en: 'For the deposit only: send phone credit worth the deposit to our number.' },
        details: {
          ar: 'إذا لم يكن لديكِ كي كارد ولا محفظة، يمكنكِ دفع العربون برصيد سيم كارت من آسياسيل أو زين أو أثير على الرقم: 07XXXXXXXXX. أرسلي لنا لقطة شاشة في الخاص مع رمز الطلب، والباقي تدفعينه للمندوب عند وصوله إليكِ.',
          en: 'No Key Card or wallet? Send the deposit as phone credit from Asiacell, Zain or Athir to: 07XXXXXXXXX. Share a screenshot in chat with your order code, and pay the courier the rest on delivery.'
        }
      }
    ],

    /* =====================================================================
       DELIVERY — one row per governorate. `fee` is the courier charge added
       to the order, `days` what the customer is told to expect. The panel
       edits both; the checkout uses the row the customer picks.
       ===================================================================== */
    governorates: [
      { id: 'gv-najaf', name: { ar: 'النجف', en: 'Najaf' }, fee: 3000, days: { ar: 'من يوم إلى يومين', en: '1–2 days' } },
      { id: 'gv-baghdad', name: { ar: 'بغداد', en: 'Baghdad' }, fee: 5000, days: { ar: 'من يومين إلى ثلاثة أيام', en: '2–3 days' } },
      { id: 'gv-karbala', name: { ar: 'كربلاء', en: 'Karbala' }, fee: 5000, days: { ar: 'من يوم إلى يومين', en: '1–2 days' } },
      { id: 'gv-babil', name: { ar: 'بابل', en: 'Babil' }, fee: 5000, days: { ar: 'من يوم إلى يومين', en: '1–2 days' } },
      { id: 'gv-diwaniya', name: { ar: 'القادسية (الديوانية)', en: 'Al-Qadisiyah (Diwaniyah)' }, fee: 5000, days: { ar: 'من يومين إلى ثلاثة أيام', en: '2–3 days' } },
      { id: 'gv-muthanna', name: { ar: 'المثنى (السماوة)', en: 'Al-Muthanna (Samawah)' }, fee: 5000, days: { ar: 'من يومين إلى ثلاثة أيام', en: '2–3 days' } },
      { id: 'gv-basra', name: { ar: 'البصرة', en: 'Basra' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-dhiqar', name: { ar: 'ذي قار (الناصرية)', en: 'Dhi Qar (Nasiriyah)' }, fee: 5000, days: { ar: 'من يومين إلى ثلاثة أيام', en: '2–3 days' } },
      { id: 'gv-maysan', name: { ar: 'ميسان (العمارة)', en: 'Maysan (Amarah)' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-wasit', name: { ar: 'واسط (الكوت)', en: 'Wasit (Kut)' }, fee: 5000, days: { ar: 'من يومين إلى ثلاثة أيام', en: '2–3 days' } },
      { id: 'gv-diyala', name: { ar: 'ديالى', en: 'Diyala' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-anbar', name: { ar: 'الأنبار', en: 'Anbar' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-salahaddin', name: { ar: 'صلاح الدين', en: 'Salah al-Din' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-kirkuk', name: { ar: 'كركوك', en: 'Kirkuk' }, fee: 5000, days: { ar: 'من يومين إلى أربعة أيام', en: '2–4 days' } },
      { id: 'gv-nineveh', name: { ar: 'نينوى (الموصل)', en: 'Nineveh (Mosul)' }, fee: 5000, days: { ar: 'من ثلاثة إلى أربعة أيام', en: '3–4 days' } },
      { id: 'gv-erbil', name: { ar: 'أربيل', en: 'Erbil' }, fee: 5000, days: { ar: 'من ثلاثة إلى أربعة أيام', en: '3–4 days' } },
      { id: 'gv-sulaymaniyah', name: { ar: 'السليمانية', en: 'Sulaymaniyah' }, fee: 5000, days: { ar: 'من ثلاثة إلى أربعة أيام', en: '3–4 days' } },
      { id: 'gv-duhok', name: { ar: 'دهوك', en: 'Duhok' }, fee: 5000, days: { ar: 'من ثلاثة إلى أربعة أيام', en: '3–4 days' } }
    ],

    /* =====================================================================
       LISTS — the owner's own groupings of sets: «أعراس», «صيف», anything she
       likes. A set may sit in several at once. Every list with `inQuiz` on
       becomes a tile in an extra style-quiz question, and `seed` tells the
       quiz which of the four built-in occasion characters (wedding / daily /
       party / holiday) the generated set should borrow when a customer picks
       this list. `inShop` puts the list in the shop's filter row.
       ===================================================================== */
    groups: [
      { id: 'g-wedding',    name: { ar: 'أعراس', en: 'Weddings' },
        desc: { ar: 'أطقم العروس والعرس: لؤلؤ وأبيض ولمعة هادئة.', en: 'Bridal and wedding sets: pearl, white and a quiet shine.' },
        ico: 'gem', seed: 'wedding', image: '', inQuiz: true, inShop: true, active: true },
      { id: 'g-engagement', name: { ar: 'خطوبة ومناسبات', en: 'Engagements and occasions' },
        desc: { ar: 'ناعمة وأنيقة، تصلح للخطوبة والحفلات العائلية.', en: 'Soft and elegant, for an engagement or a family party.' },
        ico: 'heart', seed: 'wedding', image: '', inQuiz: true, inShop: true, active: true },
      { id: 'g-daily',      name: { ar: 'دوام ويوميات', en: 'Work and everyday' },
        desc: { ar: 'أطوال قصيرة وألوان هادئة تناسب كل يوم.', en: 'Shorter lengths and quiet colours for every day.' },
        ico: 'clock', seed: 'daily', image: '', inQuiz: true, inShop: true, active: true },
      { id: 'g-evening',    name: { ar: 'سهرات', en: 'Evenings' },
        desc: { ar: 'ألوان جريئة ولمعة واضحة للنزهات والسهرات.', en: 'Bold colours and a clear shine for a night out.' },
        ico: 'star', seed: 'party', image: '', inQuiz: true, inShop: true, active: true },
      { id: 'g-summer',     name: { ar: 'صيف', en: 'Summer' },
        desc: { ar: 'ألوان فاتحة ومنعشة لأيام الحر والسفر.', en: 'Light, fresh colours for hot days and travel.' },
        ico: 'sparkle', seed: 'holiday', image: '', inQuiz: true, inShop: true, active: true }
    ],

    /* =====================================================================
       READY-MADE DESIGNS — 13 items, each with a complete DESIGN_CONFIG.
       ===================================================================== */
    designs: [
      /* THE flagship — the set @shosh_nail actually makes and sells, and the
         one the glitter cat-eye renderer was measured from. Ten identical
         nails on purpose: this is a product, not a composition, and what the
         customer sees here is exactly what arrives in the box. */
      {
        id: 'd-cateye-silver',
        name: { ar: 'ليل فضي', en: 'Silver Midnight' },
        desc: {
          ar: 'توقيع شوش نيل، وأكثر طقم يتكرّر طلبه: أسود عميق مثل الليل، وفوقه شريط فضي مغناطيسي يتحرّك مع حركة يدك ويلمع من مسافة. الجليتر ناعم جدًا — بريق لا لمعان صارخ — على شكل لوز طويل يطوّل الأصابع. طقم سهرة يسأل عنه كل من يراه.',
          en: 'The Shosh Nail signature, and the set we remake more than any other: a midnight black under a magnetic ribbon of silver that travels with every turn of your hand. The glitter is fine — light rather than sparkle — on a long almond that stretches the finger. An evening set people ask about all night.'
        },
        price: 24000, orders: 0, featured: true, active: true,
        tags: ['luxe', 'party', 'winter'], image: '',
        groups: ['g-evening'],
        match: { occasion: ['party'], vibe: ['glam', 'bold'], attention: 'max', metal: 'silver' },
        config: mkConfig({
          skin: '#E3B48F', shape: 'almond', length: 'long', sizes: mkSizes(1, 4, 3, 5, 7),
          def: { c: '#17131A', f: 'gloss', p: ['glitterCatEye', '#E6E6E9', '#17131A', 1.15] }
        })
      },
      {
        id: 'd-bride',
        name: { ar: 'عروس', en: 'Bridal Veil' },
        desc: {
          ar: 'طقم عروس بلون عاجي هادئ، مرسوم عليه دانتيل بخيط ذهبي رفيع، وظفر البنصر مكسو بلمعة لؤلؤية وحبات لؤلؤ وحجر صغير. طول لوز أنيق يظهر فاخرًا في الصور من دون أن يعيقك في يومك.',
          en: 'An ivory bridal set drawn with fine gold lace, and ring nails dressed in a pearl glaze with tiny pearls and a single stone. An elegant almond length that photographs like couture without getting in your way all day.'
        },
        price: 26000, orders: 0, featured: true, active: true,
        tags: ['bridal', 'luxe', 'pearl'], image: '',
        groups: ['g-wedding', 'g-engagement'],
        match: { occasion: ['wedding'], vibe: ['romantic', 'glam'], attention: 'clear', metal: 'gold' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'almond', length: 'long', sizes: mkSizes(1, 4, 3, 5, 7),
          /* lace has to be a shade the eye can find: white thread on an ivory
             plate disappears at card size and reads as a scratch. Champagne
             gold over ivory is what a bridal set actually looks like. */
          def: { c: '#FAF3EE', f: 'gloss', p: ['lace', '#C2A05E', '#E7C3AE', 1] },
          over: {
            rightThumb: { c: '#FAF3EE', f: 'gloss', p: ['french', '#FFFFFF', '#F1E7E2', 1] },
            leftThumb: { c: '#FAF3EE', f: 'gloss', p: ['french', '#FFFFFF', '#F1E7E2', 1] },
            rightRing: {
              c: '#F1E7E2', f: 'gloss', p: ['glazed', '#FFFFFF', '#EDE4E9', 1.1],
              ch: [['ch-pearl', 0.5, 0.28, 0.85, 0], ['ch-round', 0.38, 0.48, 0.7, 0], ['ch-pearl', 0.62, 0.52, 0.6, 0]]
            },
            leftRing: {
              c: '#F1E7E2', f: 'gloss', p: ['glazed', '#FFFFFF', '#EDE4E9', 1.1],
              ch: [['ch-pearl', 0.5, 0.28, 0.85, 0], ['ch-round', 0.38, 0.48, 0.7, 0], ['ch-pearl', 0.62, 0.52, 0.6, 0]]
            }
          }
        })
      },
      {
        id: 'd-chrome',
        name: { ar: 'كروم مرآة', en: 'Mirror Chrome' },
        desc: {
          ar: 'انعكاس معدني صافٍ يتغيّر مع الضوء من فضي إلى رمادي دافئ، وظفر البنصر بانعكاس ليلكي يكسر برودة الفضة. طقم يلفت النظر من دون أي نقشة زائدة.',
          en: 'A clean metallic mirror that shifts with the light from silver to warm grey, with a lilac reflection on the ring nails to soften the cool. All the attention, none of the fuss.'
        },
        price: 21000, orders: 0, featured: true, active: true,
        tags: ['chrome', 'party', 'luxe'], image: '',
        groups: ['g-evening'],
        match: { occasion: ['party'], vibe: ['bold', 'glam'], attention: 'max', metal: 'silver' },
        config: mkConfig({
          skin: '#E3B48F', shape: 'coffin', length: 'long', sizes: mkSizes(1, 4, 3, 5, 7),
          /* No pattern layer at all: the chrome FINISH repaints the plate as a
             mirror of the nail's own colour, so anything drawn underneath is
             invisible — and in the studio the customer would still be charged
             for it. The lilac ring nail is done the honest way, by giving that
             nail a lilac colour for the mirror to pick up. */
          def: { c: '#C8BBB0', f: 'chrome' },
          over: {
            rightRing: { c: '#CFC7D6', f: 'chrome' },
            leftRing: { c: '#CFC7D6', f: 'chrome' }
          }
        })
      },
      {
        id: 'd-french',
        name: { ar: 'فرنش كلاسيك', en: 'Classic French' },
        desc: {
          ar: 'الفرنش الذي لا يخيب: قاعدة نيود وردية شفافة وخط أبيض رفيع مرسوم بدقة على الطرف. يناسب الدوام والمناسبات وكل ما بينهما.',
          en: 'The French that never fails: a sheer rosy nude base and a precise thin white smile line. Right for the office, right for the wedding, right for everything in between.'
        },
        price: 15000, orders: 0, featured: true, active: true,
        tags: ['french', 'classic', 'minimal'], image: '',
        groups: ['g-wedding', 'g-daily'],
        match: { occasion: ['wedding', 'daily'], vibe: ['calm', 'romantic'], attention: 'soft', metal: 'none' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'squoval', length: 'medium', sizes: mkSizes(2, 5, 4, 6, 8),
          def: { c: '#E9C2C0', f: 'gloss', p: ['french', '#FFFFFF', '#E9C2C0', 1] }
        })
      },
      {
        id: 'd-glazed',
        name: { ar: 'جليزد دونات', en: 'Glazed Donut' },
        desc: {
          ar: 'اللمعة اللؤلؤية الشهيرة فوق قاعدة بورسلين هادئة، مع طرف دافئ على الإبهام. نظيف، عصري، ويليق مع أي لون ملابس.',
          en: 'That famous pearlescent glaze over a quiet porcelain base, warmed up on the thumbs. Clean, current, and it goes with absolutely everything you own.'
        },
        price: 17500, orders: 0, featured: true, active: true,
        tags: ['pearl', 'minimal', 'summer'], image: '',
        groups: ['g-engagement', 'g-daily', 'g-summer'],
        match: { occasion: ['daily', 'wedding'], vibe: ['calm', 'romantic'], attention: 'soft', metal: 'none' },
        config: mkConfig({
          skin: '#E3B48F', shape: 'almond', length: 'medium', sizes: mkSizes(2, 5, 4, 6, 8),
          /* gloss, NOT chrome: the chrome FINISH repaints the whole plate with
             a mirror and swallows the glazed veil underneath it — the pearl
             has to be the last thing you see, not the first thing covered. */
          def: { c: '#F1E7E2', f: 'gloss', p: ['glazed', '#FFFFFF', '#EDE4E9', 1] },
          over: {
            rightThumb: { c: '#E7C3AE', f: 'gloss', p: ['glazed', '#FFFFFF', '#F4CBD2', 0.9] },
            leftThumb: { c: '#E7C3AE', f: 'gloss', p: ['glazed', '#FFFFFF', '#F4CBD2', 0.9] }
          }
        })
      },
      {
        id: 'd-ombre-rose',
        name: { ar: 'أومبريه وردي', en: 'Rose Ombré' },
        desc: {
          ar: 'تدرّج وردي يبدأ فاتح من الجذر ويغمق بهدوء عند الطرف، وظفرا البنصر بغليتر خفيف ولمعة. أنثوي وناعم بدون مبالغة.',
          en: 'A pink gradient that starts pale at the cuticle and deepens gently toward the tip, with a whisper of glitter on the ring nails. Feminine, soft, never loud.'
        },
        price: 16500, orders: 0, featured: false, active: true,
        tags: ['ombre', 'pink', 'romantic'], image: '',
        groups: ['g-engagement', 'g-summer'],
        match: { occasion: ['daily', 'party'], vibe: ['romantic'], attention: 'soft', metal: 'none' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'almond', length: 'medium', sizes: mkSizes(2, 5, 4, 6, 8),
          def: { c: '#F7DDE2', f: 'gloss', p: ['ombre', '#F4CBD2', '#E88AA5', 1] },
          over: {
            rightRing: {
              c: '#F7DDE2', f: 'glitter', p: ['ombre', '#F4CBD2', '#EE5B94', 1.2],
              ch: [['ch-round', 0.5, 0.3, 0.8, 0]]
            },
            leftRing: {
              c: '#F7DDE2', f: 'glitter', p: ['ombre', '#F4CBD2', '#EE5B94', 1.2],
              ch: [['ch-round', 0.5, 0.3, 0.8, 0]]
            }
          }
        })
      },
      {
        id: 'd-red',
        name: { ar: 'أحمر كلاسيك', en: 'Timeless Red' },
        desc: {
          ar: 'أحمر كرزي غني بلمعة مرآة، بشكل بيضاوي مريح، مع حجر ألماس صغير على البنصر. اللون الذي لا يخرج من الموضة أبداً.',
          en: 'A rich cherry red with a mirror gloss on a comfortable oval, finished with one small stone on each ring nail. The shade that has never once gone out of style.'
        },
        price: 14500, orders: 0, featured: false, active: true,
        tags: ['red', 'classic', 'party'], image: '',
        groups: ['g-evening', 'g-engagement'],
        match: { occasion: ['party', 'wedding'], vibe: ['bold', 'glam'], attention: 'clear', metal: 'none' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'oval', length: 'medium', sizes: mkSizes(2, 5, 4, 6, 8),
          def: { c: '#C2192F', f: 'gloss' },
          over: {
            rightRing: { c: '#C2192F', f: 'gloss', ch: [['ch-round', 0.5, 0.3, 0.7, 0]] },
            leftRing: { c: '#C2192F', f: 'gloss', ch: [['ch-round', 0.5, 0.3, 0.7, 0]] }
          }
        })
      },
      {
        id: 'd-leopard',
        name: { ar: 'نمر', en: 'Leopard Luxe' },
        desc: {
          ar: 'نقشة نمر مرسومة بيد على قاعدة رملية دافئة، مع أظافر توفي سادة تريح العين بين النقشات. جريء وراقي في نفس الوقت.',
          en: 'Hand-drawn leopard spots on a warm sand base, broken up by plain toffee nails so the eye gets a rest. Bold and grown-up at the same time.'
        },
        price: 19000, orders: 0, featured: false, active: true,
        tags: ['animal', 'autumn', 'nude'], image: '',
        groups: ['g-evening'],
        match: { occasion: ['party', 'daily'], vibe: ['bold'], attention: 'clear', metal: 'none' },
        config: mkConfig({
          skin: '#D19A6E', shape: 'coffin', length: 'long', sizes: mkSizes(1, 4, 3, 5, 7),
          def: { c: '#E8D2B8', f: 'gloss', p: ['leopard', '#3E2A23', '#C08A5E', 1] },
          over: {
            rightIndex: { c: '#B98F6F', f: 'gloss' },
            leftIndex: { c: '#B98F6F', f: 'gloss' },
            rightPinky: { c: '#B98F6F', f: 'gloss' },
            leftPinky: { c: '#B98F6F', f: 'gloss' }
          }
        })
      },
      {
        id: 'd-mocha',
        name: { ar: 'موكا', en: 'Mocha Mousse' },
        desc: {
          ar: 'بنّي قهوة دافئ بطول قصير عملي، وظفر البنصر بلون اللاتيه بطرف موكا مطفي يكسر اللون. مثالي لليد التي تعمل طوال اليوم.',
          en: 'A warm coffee brown at a practical short length, with latte ring nails tipped in matte mocha to break it up. Made for hands that work all day.'
        },
        price: 15500, orders: 0, featured: false, active: true,
        tags: ['nude', 'minimal', 'autumn'], image: '',
        groups: ['g-daily'],
        match: { occasion: ['daily'], vibe: ['calm'], attention: 'quiet', metal: 'none' },
        config: mkConfig({
          skin: '#D19A6E', shape: 'square', length: 'short', sizes: mkSizes(3, 6, 5, 7, 9),
          def: { c: '#9A6B52', f: 'gloss' },
          over: {
            rightIndex: { c: '#B98F6F', f: 'gloss' },
            leftIndex: { c: '#B98F6F', f: 'gloss' },
            rightRing: { c: '#D8B49A', f: 'matte', p: ['french', '#9A6B52', '#D8B49A', 1.1] },
            leftRing: { c: '#D8B49A', f: 'matte', p: ['french', '#9A6B52', '#D8B49A', 1.1] }
          }
        })
      },
      {
        id: 'd-cateye',
        name: { ar: 'كات آي', en: 'Velvet Cat Eye' },
        desc: {
          ar: 'خط مغناطيسي لامع يتحرك مع الضوء فوق برقوقي عميق، والإبهام بكحلي مزرق. طقم مسائي يشد الانتباه من مسافة.',
          en: 'A magnetic ribbon of light travelling across deep plum, with midnight navy thumbs. An evening set that reads from across the room.'
        },
        price: 23000, orders: 0, featured: false, active: true,
        tags: ['party', 'winter', 'luxe'], image: '',
        groups: ['g-evening'],
        match: { occasion: ['party'], vibe: ['glam', 'bold'], attention: 'max', metal: 'silver' },
        config: mkConfig({
          skin: '#B87A4E', shape: 'stiletto', length: 'xlong', sizes: mkSizes(1, 4, 3, 5, 7),
          def: { c: '#4A1F3D', f: 'velvet', p: ['catEye', '#C9B6EA', '#7A3FC0', 1] },
          over: {
            rightThumb: { c: '#1D2A4A', f: 'velvet', p: ['catEye', '#BBD8F2', '#2F5BEA', 1.1] },
            leftThumb: { c: '#1D2A4A', f: 'velvet', p: ['catEye', '#BBD8F2', '#2F5BEA', 1.1] }
          }
        })
      },
      {
        id: 'd-pearl',
        name: { ar: 'لؤلؤي', en: 'Pearl Drop' },
        desc: {
          ar: 'قاعدة لؤلؤية باردة تدفّئها هالة ناعمة من الداخل، ولمعة صافية تعطيها بريق اللؤلؤ الحقيقي، مع ثلاث حبات لؤلؤ متدرّجة على البنصر. هادئ وفخم في نفس الوقت.',
          en: 'A cool pearl base warmed from within by a soft halo, under a clear gloss that gives it a real pearl’s light, with three graduated pearls resting on each ring nail. Quiet luxury, exactly.'
        },
        price: 20000, orders: 0, featured: false, active: true,
        tags: ['pearl', 'bridal', 'minimal'], image: '',
        groups: ['g-wedding', 'g-engagement'],
        match: { occasion: ['wedding'], vibe: ['romantic', 'calm'], attention: 'soft', metal: 'none' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'oval', length: 'medium', sizes: mkSizes(2, 5, 4, 6, 8),
          /* A pearl is cool in the body and warm where the light sits — a white
             halo over a grey one only made it look chalky. Gloss, because a
             real pearl has a hard little highlight on it. */
          def: { c: '#EDE4E9', f: 'gloss', p: ['aura', '#FBEAF0', '#D8B49A', 1.05] },
          over: {
            rightRing: {
              c: '#F1E7E2', f: 'gloss',
              ch: [['ch-pearl', 0.42, 0.3, 0.8, 0], ['ch-pearl', 0.58, 0.42, 0.62, 0], ['ch-pearl', 0.48, 0.55, 0.5, 0]]
            },
            leftRing: {
              c: '#F1E7E2', f: 'gloss',
              ch: [['ch-pearl', 0.42, 0.3, 0.8, 0], ['ch-pearl', 0.58, 0.42, 0.62, 0], ['ch-pearl', 0.48, 0.55, 0.5, 0]]
            }
          }
        })
      },
      {
        id: 'd-matte-black',
        name: { ar: 'أسود مطفي', en: 'Matte Noir' },
        desc: {
          ar: 'أسود مطفي كامل بشكل كوفن، مع نجوم ذهبية صغيرة على البنصر وأظافر فحمية تكسر السواد. قوي وأنيق ولا يحتاج إلى أكثر من ذلك.',
          en: 'Full matte black on a coffin shape, with small gold stars on the ring nails and charcoal accents to break the black. Strong, sharp, and it needs nothing else.'
        },
        price: 13500, orders: 0, featured: false, active: true,
        tags: ['matte', 'party', 'winter'], image: '',
        groups: ['g-evening'],
        match: { occasion: ['party'], vibe: ['bold'], attention: 'clear', metal: 'none' },
        config: mkConfig({
          skin: '#E3B48F', shape: 'coffin', length: 'long', sizes: mkSizes(1, 4, 3, 5, 7),
          def: { c: '#17131A', f: 'matte' },
          over: {
            rightIndex: { c: '#3A3A3E', f: 'matte' },
            leftIndex: { c: '#3A3A3E', f: 'matte' },
            rightRing: { c: '#17131A', f: 'matte', p: ['stars', '#C2A05E', '#17131A', 0.9], ch: [['ch-star', 0.5, 0.3, 0.7, 0]] },
            leftRing: { c: '#17131A', f: 'matte', p: ['stars', '#C2A05E', '#17131A', 0.9], ch: [['ch-star', 0.5, 0.3, 0.7, 0]] }
          }
        })
      },
      {
        id: 'd-checkers',
        name: { ar: 'مربعات باستيل', en: 'Pastel Checkers' },
        desc: {
          ar: 'كل ظفر بمربعات بلون باستيل مختلف على قاعدة حليبية: نعناعي، ليلكي، زبدي وخوخي. طول قصير مرح ومريح للاستخدام اليومي.',
          en: 'Every nail checked in a different pastel over a milky base: mint, lilac, butter and peach. A playful short length you can genuinely live in.'
        },
        price: 13000, orders: 0, featured: false, active: true,
        tags: ['pastel', 'summer', 'fun'], image: '',
        groups: ['g-daily', 'g-summer'],
        match: { occasion: ['daily', 'holiday'], vibe: ['bold'], attention: 'clear', metal: 'none' },
        config: mkConfig({
          skin: '#EFCDB6', shape: 'square', length: 'short', sizes: mkSizes(3, 6, 5, 7, 9),
          def: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#B4E4CE', '#FAF3EE', 1] },
          over: {
            rightIndex: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#C9B6EA', '#FAF3EE', 1] },
            leftIndex: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#C9B6EA', '#FAF3EE', 1] },
            rightRing: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#F6E6A8', '#FAF3EE', 1] },
            leftRing: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#F6E6A8', '#FAF3EE', 1] },
            rightPinky: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#FAC7AC', '#FAF3EE', 1] },
            leftPinky: { c: '#FAF3EE', f: 'gloss', p: ['checkers', '#FAC7AC', '#FAF3EE', 1] }
          }
        })
      }
    ],

    /* =====================================================================
       FAQ
       ===================================================================== */
    faqCats: [
      { id: 'install', name: { ar: 'التركيب', en: 'Application' } },
      { id: 'care', name: { ar: 'العناية والإزالة', en: 'Care & removal' } },
      { id: 'shipping', name: { ar: 'الشحن والتوصيل', en: 'Shipping' } },
      { id: 'payment', name: { ar: 'الدفع', en: 'Payment' } },
      { id: 'general', name: { ar: 'أسئلة عامة', en: 'General' } }
    ],

    faq: [
      /* ---------------- install ---------------- */
      {
        id: 'fq-apply-steps', cat: 'install',
        q: { ar: 'كيف أركّب الطقم خطوة بخطوة؟', en: 'How do I apply the set, step by step?' },
        a: {
          ar: 'خذي راحتك، الأمر كله لا يستغرق أكثر من عشر دقائق:\n1) اغسلي يديك بالماء والصابون وجفّفيهما جيدًا، وتأكدي من أن الظفر خالٍ من أي كريم أو زيت.\n2) ادفعي الجلد الزائد إلى الخلف بهدوء بعود الجلد الموجود في العلبة.\n3) ابردي سطح الظفر بردًا خفيفًا حتى تزول اللمعة — هذه الخطوة هي سر الثبات الطويل.\n4) امسحي كل ظفر بمنديل الكحول الموجود في العلبة واتركيه يجف نصف دقيقة.\n5) رتّبي الأظافر العشرة أمامك من الإبهام إلى الخنصر وجرّبيها بدون لاصق قبل أن تبدئي.\n6) الصقي اللاصقة على ظهر الظفر المركّب واضغطي عليها جيدًا، أو ضعي نقطة جل لاصق بحجم حبة العدس.\n7) ركّبي الظفر من عند الجلد بزاوية 45 درجة ثم أنزليه إلى الأمام، واضغطي 15–20 ثانية بقوة ثابتة.\n8) ابتعدي عن الماء في الساعة الأولى حتى يتماسك اللاصق تمامًا.',
          en: 'Take your time — the whole thing takes under ten minutes:\n1) Wash and dry your hands well, and make sure the nail is free of any cream or oil.\n2) Gently push the cuticle back with the wooden stick in the box.\n3) Lightly buff the nail surface until the shine is gone — this single step is the secret to a long hold.\n4) Wipe each nail with the alcohol pad provided and let it dry for thirty seconds.\n5) Lay all ten nails out from thumb to pinky and dry-fit them before you glue anything.\n6) Press an adhesive tab onto the back of the press-on, or add a lentil-sized drop of nail glue.\n7) Place the nail at the cuticle at a 45 degree angle, roll it down flat, and press firmly for 15–20 seconds.\n8) Keep your hands out of water for the first hour so the adhesive can fully set.'
        }
      },
      {
        id: 'fq-box-contents', cat: 'install',
        q: { ar: 'ماذا يوجد داخل العلبة؟', en: 'What comes inside the box?' },
        a: {
          ar: 'كل طلب يصلك ومعه: الأظافر العشرة مرتبة على بطاقة بأرقام الأصابع، شريط لاصقات بمقاسات مختلفة، أنبوب جل لاصق، مبرد صغير، عود جلد خشبي، ومنديل كحول للتنظيف — ومعه بطاقة شرح مصوّرة بالعربية والإنجليزية.',
          en: 'Every order arrives with: your ten nails laid out on a labelled card, a strip of adhesive tabs in assorted sizes, a tube of nail glue, a mini file, a wooden cuticle stick and an alcohol prep pad — plus an illustrated instruction card in Arabic and English.'
        }
      },
      {
        id: 'fq-tabs-or-glue', cat: 'install',
        q: { ar: 'هل أستعمل اللاصقات أم الجل؟', en: 'Should I use the adhesive tabs or the glue?' },
        a: {
          ar: 'اللاصقات مناسبة للاستعمال القصير من يوم إلى ثلاثة أيام، وميزتها أنك تزيلينها بسهولة وتعيدين استعمال الطقم مرة أخرى. الجل اللاصق يثبّت الطقم من أسبوع إلى ثلاثة أسابيع لكنه يحتاج إلى نقع بماء دافئ عند إزالته. إذا كانت هذه أول مرة تجرّبين فيها، فابدئي باللاصقات.',
          en: 'Adhesive tabs are for shorter wear of one to three days; they peel off easily and let you reuse the set. Nail glue gives you one to three weeks of hold but needs a warm-water soak to remove. If this is your first time, start with the tabs.'
        }
      },
      {
        id: 'fq-how-long', cat: 'install',
        q: { ar: 'كم يدوم الطقم بعد التركيب؟', en: 'How long will the set stay on?' },
        a: {
          ar: 'باللاصقات: من يوم إلى ثلاثة أيام. بالجل اللاصق: من أسبوع إلى ثلاثة أسابيع حسب طبيعة أظافرك وطبيعة يومك. أكثر ما يقصّر عمره هو تخطّي خطوة تنظيف الظفر بالكحول أو تركيبه على ظفر عليه بقايا كريم.',
          en: 'With tabs, one to three days. With glue, one to three weeks depending on your nails and how hands-on your day is. The biggest cause of early lifting is skipping the alcohol wipe or applying over leftover hand cream.'
        }
      },
      {
        id: 'fq-fix-crooked', cat: 'install',
        q: { ar: 'ركّبت ظفرًا مائلًا أو لم يلتصق جيدًا — ماذا أفعل؟', en: 'A nail went on crooked or is not sticking — what now?' },
        a: {
          ar: 'لا تشدّيه أبدًا. إذا كان اللاصق ما يزال طريًا، فارفعيه بهدوء بعود الجلد من الطرف وأعيدي تركيبه فورًا. وإذا جفّ، فانقعي الإصبع بماء دافئ مع قطرات صابون خمس دقائق ويرتخي من تلقاء نفسه. نظّفي بقايا اللاصق عن الظفر المركّب بالكحول قبل أن تعيدي استعماله.',
          en: 'Never pull it off. If the adhesive is still soft, lift the edge gently with the cuticle stick and reposition straight away. If it has set, soak that finger in warm soapy water for five minutes and it will release on its own. Clean any adhesive residue off the press-on with alcohol before reusing it.'
        }
      },
      {
        id: 'fq-pick-right-nail', cat: 'install',
        q: { ar: 'كيف أتأكد أن كل ظفر على إصبعه الصحيح؟', en: 'How do I make sure each nail goes on the right finger?' },
        a: {
          ar: 'كل طقم يصلك مرتبًا على بطاقة مكتوب عليها اسم الإصبع ورقم المقاس، والأظافر مرقّمة من الخلف. قبل أن تبدئي بالتركيب، ضعي كل ظفر فوق إصبعه بدون لاصق: المقاس الصحيح يغطي الظفر من حافة إلى حافة ولا يضغط على الجلد من الجوانب.',
          en: 'Your set arrives on a card marked with the finger name and size number, and each nail is numbered on the back. Before gluing anything, place every nail on its finger dry: the correct size covers the nail edge to edge without pressing into the side skin.'
        }
      },
      /* ---------------- care & removal ---------------- */
      {
        id: 'fq-care-daily', cat: 'care',
        q: { ar: 'كيف أعتني بها حتى تدوم أكثر؟', en: 'How do I care for them so they last?' },
        a: {
          ar: 'استعملي بطن أصابعك بدل أطرافها عند فتح العلب أو الكتابة، والبسي قفازات عند التنظيف بالمواد الكيميائية، ومرّري زيت الجلد حول الظفر كل يوم. وإذا شعرتِ بحافة بدأت ترتفع، فثبّتيها بنقطة جل صغيرة فورًا قبل أن يدخل الماء تحتها.',
          en: 'Use the pads of your fingers rather than the tips when opening things or typing, wear gloves for chemical cleaning, and massage cuticle oil around the nail daily. If you feel an edge starting to lift, seal it with a tiny dot of glue right away before water gets underneath.'
        }
      },
      {
        id: 'fq-water', cat: 'care',
        q: { ar: 'هل أستطيع غسل الصحون أو السباحة وأنا ألبسها؟', en: 'Can I wash dishes or swim while wearing them?' },
        a: {
          ar: 'نعم، لكن بحذر. الماء العادي لا يضر بعد الساعة الأولى، لكن الماء الشديد الحرارة والنقع الطويل يُرخيان اللاصق. للغسيل والتنظيف الأفضل أن تلبسي قفازات، وبعد السباحة جفّفي يديك جيدًا وتفقّدي الحواف.',
          en: 'Yes, but carefully. Normal water is fine after the first hour, though very hot water and long soaks will soften the adhesive. Wear gloves for dishes and cleaning, and after swimming dry your hands well and check the edges.'
        }
      },
      {
        id: 'fq-removal', cat: 'care',
        q: { ar: 'كيف أزيلها دون أن أؤذي أظافري؟', en: 'How do I remove them without damaging my nails?' },
        a: {
          ar: 'انقعي يديك في وعاء ماء دافئ مع قطرات صابون أو قليل من الزيت لمدة 10–15 دقيقة. ثم استعملي عود الجلد الخشبي وارفعي الظفر من الطرف بحركة هادئة وبالتدريج. وإذا شعرتِ بأي شدّ أو مقاومة، فأعيدي النقع مدة أطول. الشدّ بالقوة هو تقريبًا السبب الوحيد لتقشّر الظفر الطبيعي.',
          en: 'Soak your hands in warm water with a few drops of soap or oil for 10 to 15 minutes. Then use the wooden stick to ease each nail up from the free edge in slow, gradual movements. If you feel any pulling, soak longer. Forcing them off is almost the only way people damage their natural nail.'
        }
      },
      {
        id: 'fq-natural-nails', cat: 'care',
        q: { ar: 'هل تضرّ بأظافري الطبيعية؟', en: 'Will they damage my natural nails?' },
        a: {
          ar: 'لا، إذا رُكّبت وأُزيلت بطريقة صحيحة. نحن لا نستعمل أي مادة تحتاج إلى حفر أو مبرد كهربائي، والبرد الخفيف الذي نطلبه سطحي جدًا. وننصحك بأن تريحي أظافرك يومين بين كل طقم وآخر، ومع مرطب جلد يومي ستلاحظين أن حالتها أفضل من قبل.',
          en: 'No, provided they are applied and removed properly. Nothing in our kit requires drilling or an e-file, and the light buffing we ask for is very superficial. We do recommend giving your nails a two-day break between sets, and with daily cuticle oil most customers find their nails end up in better shape than before.'
        }
      },
      {
        id: 'fq-reuse', cat: 'care',
        q: { ar: 'هل أستطيع إعادة استعمال الطقم نفسه؟', en: 'Can I reuse the same set?' },
        a: {
          ar: 'بالتأكيد. الطقم الواحد يتحمّل من خمس إلى عشر مرات إذا أزلتِه بالنقع. بعد كل استعمال نظّفي بقايا اللاصق من داخل الظفر بعود خشبي وقليل من الكحول، واتركيه يجف قبل أن تعيديه إلى العلبة. اللاصقات وحدها هي التي تنفد، ويمكنك طلب شريط بديل منها.',
          en: 'Absolutely. One set will take five to ten wears if you always soak it off. After each wear, scrape the adhesive residue from the inside with a wooden stick and a little alcohol, then let it dry before returning it to the box. Only the adhesive tabs get used up, and you can order replacement strips from us.'
        }
      },
      {
        id: 'fq-storage', cat: 'care',
        q: { ar: 'كيف أحفظها بين استعمال وآخر؟', en: 'How should I store them between wears?' },
        a: {
          ar: 'أعيديها إلى العلبة نفسها على البطاقة المرقّمة حتى لا تختلط المقاسات، واحفظيها بعيدًا عن الشمس المباشرة والحرارة العالية مثل داخل السيارة، لأن الحرارة قد تلوي الظفر وتغيّر انحناءه.',
          en: 'Put them back on the numbered card in their box so the sizes do not get mixed up, and keep them out of direct sun and high heat such as a parked car — heat can warp the curve of the nail.'
        }
      },
      {
        id: 'fq-file-shorter', cat: 'care',
        q: { ar: 'هل أستطيع تقصير الطول أو تغيير الشكل؟', en: 'Can I file them shorter or reshape them?' },
        a: {
          ar: 'يمكنك برد الطول وتخفيفه بالمبرد الموجود في العلبة، والأفضل أن يكون ذلك قبل التركيب وبحركة باتجاه واحد. وتغيير الشكل بالكامل (مثلًا من كوفن إلى لوز) ممكن لكنه يقصّر الظفر كثيرًا، فإذا لم تكوني متأكدة من الشكل فاطلبيه أقصر من البداية.',
          en: 'You can file the length down with the file provided — do it before applying and always in one direction. Changing the shape completely, say coffin to almond, is possible but costs a lot of length, so if you are unsure it is better to order shorter from the start.'
        }
      },
      {
        id: 'fq-lost-one', cat: 'care',
        q: { ar: 'سقط ظفر واحد فقط — هل أستطيع استبداله؟', en: 'I lost a single nail — can I replace it?' },
        a: {
          ar: 'نعم. أرسلي لنا رمز طلبك واسم الإصبع بالخاص ونجهّز لك ظفرًا بديلًا بالتصميم نفسه. الظفر البديل الواحد بـ 2,000 د.ع مع أجرة التوصيل.',
          en: 'Yes. Send us your order code and the finger in chat and we will make a replacement in the same design. A single replacement nail is 2,000 IQD plus delivery.'
        }
      },
      /* ---------------- shipping ---------------- */
      {
        id: 'fq-lead-time', cat: 'shipping',
        q: { ar: 'كم يستغرق تجهيز الطلب وتوصيله؟', en: 'How long does the order take?' },
        a: {
          ar: 'التجهيز اليدوي يستغرق من 3 إلى 5 أيام حسب تفاصيل التصميم، والتوصيل بعدها من يوم إلى يومين داخل النجف ومن يومين إلى أربعة أيام لباقي المحافظات. وإذا كانت مناسبتك قريبة فاختاري «التجهيز المستعجل» عند الطلب وننجزه خلال 48 ساعة.',
          en: 'Handcrafting takes 3 to 5 days depending on the detail in your design; delivery is then 1–2 days inside Najaf and 2–4 days to the other governorates. If your date is close, add the rush option at checkout and we finish within 48 hours.'
        }
      },
      {
        id: 'fq-shipping-areas', cat: 'shipping',
        q: { ar: 'إلى أين توصلون وكم أجرة التوصيل؟', en: 'Where do you deliver and how much is shipping?' },
        a: {
          ar: 'نوصّل إلى كل محافظات العراق عن طريق شركات التوصيل. أجرة التوصيل 5,000 د.ع لكل المحافظات، و3,000 د.ع داخل النجف، وتظهر لك بالضبط عند اختيار محافظتك وقت الطلب. كل الطلبات تصل إلى باب البيت — ليس لدينا محل ولا استلام باليد.',
          en: 'We deliver to every governorate in Iraq through courier companies. Delivery is 5,000 IQD everywhere and 3,000 IQD inside Najaf, and the exact fee shows the moment you pick your governorate at checkout. Everything comes to your door — there is no shop and no collection in person.'
        }
      },
      {
        id: 'fq-tracking', cat: 'shipping',
        q: { ar: 'كيف أتابع طلبي؟', en: 'How do I follow my order?' },
        a: {
          ar: 'نخبرك بالخاص بكل خطوة: عندما نبدأ التجهيز، وعندما نصوّر لك الطقم أثناء العمل وقبل الشحن، وعندما يخرج مع المندوب. والمندوب يتصل بك قبل وصوله، فاتركي هاتفك مفتوحًا ذلك اليوم.',
          en: 'We tell you in chat at every step: when we start, when we photograph the set while making it and before it ships, and when it leaves with the courier. The courier calls before arriving, so keep your phone on that day.'
        }
      },
      /* ---------------- payment ---------------- */
      {
        id: 'fq-pay-methods', cat: 'payment',
        q: { ar: 'ما طرق الدفع المتاحة؟', en: 'What payment methods do you accept?' },
        a: {
          ar: 'الأساس عندنا الدفع عند الاستلام لكل المحافظات، مع عربون بسيط مقدّم يُخصم من المبلغ حتى لا يضيع العمل على الطقم إذا لم يُستلم. العربون أو المبلغ كاملًا يصلنا عبر زين كاش أو ماستركارد، وإذا لم يكن لديك كي كارد فيمكنك دفع العربون برصيد شريحة الهاتف (آسياسيل أو زين أو أثير).',
          en: 'Cash on delivery in every governorate is the default, with a small deposit up front that comes off the total, so a set is never made for a parcel nobody collects. The deposit or the full amount reaches us by Zain Cash or Mastercard, and if you have no Key Card you can send the deposit as phone credit (Asiacell, Zain or Athir).'
        }
      },
      {
        id: 'fq-confirm-order', cat: 'payment',
        q: { ar: 'متى يتأكد طلبي؟', en: 'When is my order confirmed?' },
        a: {
          ar: 'بعد أن ترسلي رسالة الطلب نرد عليك في أقل من ساعة خلال أوقات الرد، ونتفق على المقاس وطريقة الدفع، وما إن يصل العربون حتى نبدأ التجهيز. ورمز طلبك الموجود في الرسالة هو مرجعك في أي استفسار.',
          en: 'Once you send the order message we reply within the hour during reply hours, agree the size and payment, and start crafting the moment the deposit lands. The order code in your message is your reference for anything after that.'
        }
      },
      {
        id: 'fq-price-includes', cat: 'payment',
        q: { ar: 'هل السعر شامل كل شيء؟', en: 'Is the price all-inclusive?' },
        a: {
          ar: 'السعر الذي يظهر لك في المراجعة يشمل الطقم كاملًا بعشرة أظافر مع عدّة التركيب والتغليف. وأجرة التوصيل تظهر في سطر مستقل حسب محافظتك، والخيارات الإضافية مثل التجهيز المستعجل أو التغليف كهدية تظهر في سطور واضحة قبل التأكيد — لا توجد أي رسوم مخفية، ولا «سعر بالخاص».',
          en: 'The price you see at review covers the full ten-nail set with the application kit and packaging. Delivery appears as its own line according to your governorate, and extras like rush crafting or gift wrapping are listed separately before you confirm — no hidden fees, and no "price in DM".'
        }
      },
      /* ---------------- general ---------------- */
      {
        id: 'fq-what-you-see', cat: 'general',
        q: { ar: 'هل يأتي الطقم مثل الصورة التي أراها في الموقع؟', en: 'Will the set I receive look like the picture on the site?' },
        a: {
          ar: 'هذا أهم شيء عندنا. الصورة التي تظهر لك في آخر الاختبار ليست صورة جاهزة لطقم آخر، بل هي رسم مباشر لاختياراتك أنتِ: الشكل نفسه، والطول نفسه، واللون واللمسة والنقشة، ومكان كل زخرفة بالضبط. نصنع الطقم على هذا الأساس، وقبل شحنه نرسل لك صورة الطقم نفسه على واتساب لترَيه وتوافقي عليه. وإذا وصلك شيء مختلف عما اخترتِه نعيد صنعه لك مجانًا. والفرق الوحيد المتوقع هو اختلاف بسيط في درجة اللون بين شاشة وأخرى.',
          en: 'This matters to us more than anything else. What the quiz shows you at the end is not a stock photo of somebody else’s set — it is a live drawing of your own choices: the same shape, the same length, the same colour, finish and pattern, and the exact position of every charm. We build the set from that, and before it ships we send you a photograph of the real thing on WhatsApp for your approval. If what arrives is not what you chose, we remake it free of charge. The only difference to expect is a small shift in shade from one screen to another.'
        }
      },
      {
        id: 'fq-where-to-start', cat: 'general',
        q: { ar: 'لا أعرف أي تصميم يناسبني — من أين أبدأ؟', en: 'I have no idea what suits me — where do I start?' },
        a: {
          ar: 'ابدئي باختبار الستايل في الصفحة الرئيسية: أسئلة سريعة كلها صور، ولا يوجد سؤال يحتاج إلى كتابة، وفي آخره يظهر لك طقم مبني على إجاباتك — تطلبينه مباشرة. وإذا أردتِ طريقًا أقصر، فافتحي «تصاميم جاهزة» واختاري واحدًا يعجبك واطلبيه.',
          en: 'Start with the style quiz on the home page: a few questions, all pictures, nothing to type — and at the end it builds a set from your answers that you can order as it is. If you want an even shorter route, open Ready Designs and pick one you like.'
        }
      },
      {
        id: 'fq-save-share', cat: 'general',
        q: { ar: 'هل أستطيع حفظ تصميمي والعودة إليه لاحقًا أو إرساله إلى صديقتي؟', en: 'Can I save my design and come back to it, or send it to a friend?' },
        a: {
          ar: 'نعم. في آخر الاختبار زر يحفظ لك صورة الطقم على جهازك، وزر مشاركة ينسخ لك رابط الاختبار لترسليه إلى صديقتك. واحتفظي بالصورة عندك — أرسليها لنا مع طلبك على إنستغرام أو واتساب.',
          en: 'Yes. At the end of the quiz there is a button that saves a picture of the set to your device, and a share button that copies the quiz link to send to a friend. Keep the picture — send it to us on Instagram or WhatsApp with your order.'
        }
      },
      {
        id: 'fq-know-size', cat: 'general',
        q: { ar: 'كيف أعرف مقاس أظافري؟', en: 'How do I find my nail size?' },
        a: {
          ar: 'لا تحتاجين إلى معرفته قبل الطلب. بعد أن ترسلي طلبك نرسل لك بالخاص طريقة القياس مع صورة توضّح: تصوّرين يدك من فوق مع مسطرة ملاصقة للأظافر، أو تقيسين عرض كل ظفر بالمليمتر عند أوسع نقطة، أو تختارين مقاسًا جاهزًا S أو M أو L. نتفق على المقاس قبل أن نجهّز الطقم، وإذا جاء قياسك بين رقمين نختار الأوسع دائمًا.',
          en: 'You do not need to know it before ordering. Once your order lands we send you the measuring method in chat, with a picture: photograph your hand from above with a ruler against the nails, measure each nail in millimetres at its widest point, or pick a preset (S, M or L). We agree the size before we make the set, and whenever you land between two numbers we take the wider one.'
        }
      },
      {
        id: 'fq-sizing-kit', cat: 'general',
        q: { ar: 'هل لديكم عدّة قياس؟', en: 'Do you have a sizing kit?' },
        a: {
          ar: 'حاليًا نعتمد صورة اليد مع المسطرة أو القياس بالمليمتر، وهي كافية لمقاس مضبوط. وإذا أردتِ عدّة قياس تجرّبينها مثل الخواتم، فاسألينا بالخاص ونخبرك إن كانت متوفرة.',
          en: 'For now we work from the hand-with-ruler photo or millimetre measurements, which is enough for an exact fit. If you would rather try a kit on like rings, ask us in chat and we will tell you if one is available.'
        }
      },
      {
        id: 'fq-change-cancel', cat: 'general',
        q: { ar: 'هل أستطيع تعديل طلبي أو إلغاءه؟', en: 'Can I change or cancel my order?' },
        a: {
          ar: 'يمكنك التعديل أو الإلغاء مجانًا خلال 12 ساعة من تأكيد الطلب، لأن التجهيز يبدأ بعدها مباشرة. وبعد أن نبدأ العمل يصعب الإلغاء لأن الطقم مفصّل على مقاسك أنتِ ولا يُباع لغيرك، لكن راسلينا ونرى كيف نستطيع مساعدتك.',
          en: 'You can change or cancel free of charge within 12 hours of confirming, since crafting starts right after that. Once we have begun we usually cannot cancel, because the set is cut to your own measurements and cannot be sold to anyone else — but message us and we will see what we can do.'
        }
      },
      {
        id: 'fq-from-photo', cat: 'general',
        q: { ar: 'هل أستطيع طلب تصميم من صورة لديّ؟', en: 'Can I order a design from a photo I have?' },
        a: {
          ar: 'بالتأكيد. أرسلي الصورة بالخاص — من بنترست أو إنستغرام أو من تصويرك — مع الطول الذي تريدينه، ونرد عليك بالسعر ومدة التنفيذ خلال ساعات. ويمكنك أيضًا التعديل على أي طقم ترينه في الموقع: لون، أو طول، أو شكل، أو زخرفة. بعض التصاميم المرسومة باليد تحتاج إلى وقت أطول قليلًا، ونوضّح لك ذلك قبل التأكيد.',
          en: 'Of course. Send the picture in chat — from Pinterest, Instagram or your camera — with the length you want, and we come back with a price and a timeline within hours. You can also change any set you see on the site: colour, length, shape or charms. Some hand-painted designs need a little longer, and we tell you before you confirm.'
        }
      },
      {
        id: 'fq-returns', cat: 'general',
        q: { ar: 'هل يوجد استرجاع أو استبدال؟', en: 'Do you accept returns or exchanges?' },
        a: {
          ar: 'الأطقم مفصّلة حسب الطلب، لذلك لا نستطيع قبول الاسترجاع بعد الاستعمال لأسباب صحية. لكن إذا وصلك الطلب بعيب في التصنيع أو بمقاس غير الذي طلبتِه، فأرسلي لنا صورة خلال 48 ساعة من الاستلام ونعيد تجهيزه لك مجانًا مع شحن مجاني للطقم البديل.',
          en: 'Sets are made to order, so for hygiene reasons we cannot take returns after wear. However, if your order arrives with a manufacturing fault or in a size other than the one you chose, send us a photo within 48 hours of delivery and we will remake it free of charge with free shipping on the replacement.'
        }
      }
    ],

    orders: []
  };
})();
