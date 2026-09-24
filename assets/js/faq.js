/*! Shosh Nail — assets/js/faq.js
 *  SN.Faq : help centre + contact page (owner: FAQ)
 *  Contract: SPEC.md sections 4, 10, 11, 13. Attaches exactly one
 *  property: window.SN.Faq
 *
 *  What lives here, in render order:
 *    hero with a live search that matches BOTH languages at once (so an
 *    English word finds an Arabic answer) and highlights the hit ·
 *    category tabs built from faqCats with a live per-category count ·
 *    an aria accordion, one panel open at a time, deep-linkable by #id,
 *    with a copy-link and an "ask about this" shortcut per question ·
 *    a numbered application guide, shown only when an application answer
 *    really has numbered steps (three or more) ·
 *    a contact card assembled row by row from settings (an empty setting
 *    never renders a broken link) · an enquiry box that composes a
 *    WhatsApp message and optionally posts to settings.notifyEndpoint.
 *
 *  Everything reads live from SN.Store, so an owner edit in admin.html
 *  shows up here the moment it is saved.
 */
(function () {
  'use strict';

  var SN = (window.SN = window.SN || {});

  /* ==================================================================== */
  /* 0. dictionary — namespace `faq` (SPEC section 10)                     */
  /* ==================================================================== */

  var DICT = {
    iq: {
      faq: {
        /* hero */
        lead: 'جمعنا لك كل اللي تسأل عنه الزبونات: التركيب، مدة الثبات، الإزالة، المقاسات، الشحن والدفع. اكتبي كلمة وحدة بالبحث ويطلع لك الجواب على طول، وإذا ما لقيتي جوابك دزّي لنا رسالة وإحنا نرد عليك بنفسنا.',
        jumpAsk: 'دزّي استفسارك',

        /* list + tabs */
        noneT: 'ما لقينا سؤال بهاي الكلمة',
        noneX: 'جرّبي كلمة أقصر، أو افتحي قسم «الكل»، أو دزّي لنا سؤالك مباشرة من البطاقة اللي جوّه وإحنا نجاوبك.',
        askAbout: 'اسألي عن هاي النقطة',

        /* guide */
        guideLead: 'عشر دقايق وبس. امشي على الترتيب مثل ما هو ولا تتجاوزين خطوة التنظيف — هي الفرق بين طقم يثبت يومين وطقم يثبت أسبوعين.',
        guideFull: 'اقري الشرح كامل',

        tip1X: 'شيلي لمعة سطح الظفر ببرد خفيف قبل أي شي؛ هاي أهم خطوة، وهي اللي الأغلب ينسوها.',
        tip2X: 'الكحول يشيل الزيوت وبقايا الكريم، حتى اللاصق يمسك على سطح نظيف تمامًا.',
        tip3X: 'ضغط ثابت بلا ما تحرّكين، ظفر ظفر، ولا تركّبين ظفرين بنفس الوقت.',
        tip4X: 'خلّي إيدك ناشفة أول ساعة حتى اللاصق يتماسك، وبعدين كمّلي يومك عادي.',

        removeX: 'انقعي إيدك بماي دافي مع كم قطرة صابون أو زيت من 10 إلى 15 دقيقة، وبعدين ارفعي كل ظفر بهداوة من الطرف بعود الجلد الخشبي. إذا حسّيتي بأي شد، رجعي انقعي أكثر — الشد بالقوة هو تقريبًا السبب الوحيد لتقشّر الظفر الطبيعي.',

        /* contact card */
        contactLead: 'ماكو رد آلي — رسالتك توصلنا شخصيًا، وعادةً نرد خلال ساعة بأوقات الرد.',
        cardX: 'اختاري الطريقة اللي تريحك، كلها توصل إلنا مباشرة وإحنا نرد بنفسنا.',
        waBtn: 'دزّي لنا على واتساب',
        waMsg: 'هلو شوش نيل، عندي استفسار بخصوص الأظافر المركّبة.',
        igT: 'إنستغرام',

        /* ask box */
        askTitle: 'دزّي استفسارك',
        askLead: 'اكتبي سؤالك هنا وإحنا نجهّزه لك برسالة جاهزة، بلا تسجيل ولا انتظار.',
        askNamePh: 'مثلاً: زينب',
        askQPh: 'اكتبي سؤالك بالتفصيل، وإذا كان عن طلب سابق اكتبي لنا رقم الطلب.',
        askErrName: 'اكتبي اسمك حتى نعرف شلون نناديك',
        askErrQ: 'وضّحي سؤالك شوية أكثر (10 أحرف على الأقل)',
        askNote: 'الرسالة تنفتح لك جاهزة على واتساب وأنتِ تدزينها — ما نحفظ بياناتك بالموقع.',
        askNoteMail: 'الرسالة تنفتح لك جاهزة ببرنامج البريد مالتك.',
        askNoteSend: 'استفسارك يوصل على طول لفريق شوش نيل.',
        askOkWa: 'جهّزنا لك الرسالة، بس اضغطي إرسال داخل واتساب',
        askOkMail: 'جهّزنا رسالتك ببرنامج البريد مالتك',
        askOkSent: 'وصلنا استفسارك، وراح نرد عليك قريب',
        catOther: 'موضوع ثاني'
      }
    },

    ar: {
      faq: {
        /* hero */
        eyebrow: 'مركز المساعدة',
        title: 'أسئلتك وكل الإجابات',
        lead: 'جمعنا لك كل ما تسأل عنه العميلات: التركيب، مدة الثبات، الإزالة، المقاسات، الشحن والدفع. اكتبي كلمة واحدة في البحث فتظهر لك الإجابة مباشرة، وإذا لم تجدي جوابك فراسلينا ونرد عليك بأنفسنا.',
        searchLabel: 'البحث في الأسئلة',
        searchPh: 'اكتبي كلمة… مثل: ثبات، إزالة، مقاس، شحن',
        clearSearch: 'مسح كلمة البحث',
        jumpLabel: 'روابط سريعة داخل الصفحة',
        jumpGuide: 'التركيب خطوة بخطوة',
        jumpContact: 'بطاقة التواصل',
        jumpAsk: 'أرسلي استفسارك',

        /* list + tabs */
        catsLabel: 'تصفية الأسئلة حسب القسم',
        all: 'الكل',
        resultsN: '{n} من {total} سؤال',
        resultsQ: '{n} نتيجة للبحث عن «{q}»',
        noneT: 'لم نجد سؤالاً بهذه الكلمة',
        noneX: 'جرّبي كلمة أقصر، أو افتحي قسم «الكل»، أو أرسلي لنا سؤالك مباشرة من البطاقة في الأسفل ونرد عليك.',
        clearAll: 'مسح البحث والتصفية',
        zeroT: 'لم نضف أسئلة هنا بعد',
        zeroX: 'نجهّز الإجابات قريبًا. وإلى ذلك الحين، أرسلي لنا سؤالك من البطاقة في الأسفل ونرد عليك بأنفسنا.',
        picAlt: '{q} — صورة {n}',
        copyLink: 'نسخ الرابط',
        linkCopied: 'تم نسخ رابط السؤال',
        copyFail: 'لم نتمكن من نسخ الرابط — انسخيه من شريط العنوان',
        askAbout: 'اسألي عن هذه النقطة',
        aboutQ: 'بخصوص: {q}',

        /* guide */
        guideEyebrow: 'دليل عملي',
        guideTitle: 'طريقة التركيب خطوة بخطوة',
        guideLead: 'عشر دقائق فقط. اتبعي الترتيب كما هو ولا تتخطي خطوة التنظيف — هي الفرق بين طقم يثبت يومين وطقم يثبت أسبوعين.',
        guideTime: 'الوقت المتوقع: 10 دقائق',
        stepN: 'الخطوة {n}',
        guideFull: 'اقرئي الشرح كامل',
        moreTitle: 'أسئلة ثانية عن التركيب',

        tipsTitle: 'نصائح للثبات',
        tip1T: 'البرد الخفيف أولاً',
        tip1X: 'أزيلي لمعة سطح الظفر ببرد خفيف قبل أي شيء؛ هذه أهم خطوة وأكثر واحدة تُنسى.',
        tip2T: 'مسحة كحول قبل اللاصق',
        tip2X: 'الكحول يزيل الزيوت وبقايا الكريم، واللاصق يمسك على سطح نظيف تمامًا.',
        tip3T: 'اضغطي 20 ثانية',
        tip3X: 'ضغط ثابت بدون تحريك على كل ظفر، ولا تركّبي ظفرين في الوقت نفسه.',
        tip4T: 'أول ساعة بدون ماء',
        tip4X: 'اتركي يديك جافتين أول ساعة حتى يتماسك اللاصق، وبعدها عيشي يومك كالمعتاد.',

        removeTitle: 'طريقة الإزالة',
        removeX: 'انقعي يديك في ماء دافئ مع قطرات صابون أو زيت من 10 إلى 15 دقيقة، وبعدها ارفعي كل ظفر بلطف من الطرف بعود الجلد الخشبي. إذا شعرتِ بأي شد، فعاودي النقع أكثر — الشد بالقوة هو السبب الوحيد تقريبًا لتقشّر الظفر الطبيعي.',
        removeMore: 'التفاصيل كاملة',

        /* contact card */
        contactEyebrow: 'تواصل مباشر',
        contactTitle: 'بطاقة التواصل',
        contactLead: 'لا يوجد رد آلي — رسالتك تصلنا شخصياً، وعادة نرد خلال ساعة داخل أوقات الرد.',
        cardTitle: 'تواصلي معنا مباشرة',
        cardX: 'اختاري القناة التي تريحك، كلها تصل إلينا مباشرة ونرد بأنفسنا.',
        waBtn: 'راسلينا على واتساب',
        waMsg: 'مرحباً شوش نيل، لديّ استفسار بخصوص الأظافر المركّبة.',
        callT: 'اتصال مباشر',
        mailT: 'البريد الإلكتروني',
        igT: 'انستقرام',
        scT: 'سناب شات',
        ttT: 'تيك توك',
        hoursT: 'أوقات الرد',
        cityT: 'نشحن من',
        noChannels: 'قنوات التواصل تُضاف من لوحة التحكم.',

        /* ask box */
        askTitle: 'أرسلي استفسارك',
        askLead: 'اكتبي سؤالك هنا ونجهّزه لك جاهز في رسالة، بدون تسجيل ولا انتظار.',
        askName: 'اسمك',
        askNamePh: 'مثلاً: زينب',
        askCat: 'موضوع الاستفسار',
        askQ: 'سؤالك',
        askQPh: 'اكتبي سؤالك بالتفصيل، وإذا كان عن طلب سابق اذكري رقم الطلب.',
        askSend: 'إرسال على واتساب',
        askSendMail: 'إرسال بالبريد',
        askSendOnly: 'إرسال الاستفسار',
        askErrName: 'اكتبي اسمك لنعرف كيف نناديك',
        askErrQ: 'وضّحي سؤالك أكثر قليلاً (10 أحرف على الأقل)',
        askNote: 'الرسالة تنفتح لك جاهزة في واتساب وأنتِ ترسلينها — ولا نحفظ بياناتك في الموقع.',
        askNoteMail: 'الرسالة تنفتح لك جاهزة في برنامج البريد عندك.',
        askNoteSend: 'استفسارك يصل مباشرة إلى فريق شوش نيل.',
        askNoteNone: 'قنوات التواصل غير مفعّلة حاليًا — تُضاف من لوحة التحكم.',
        askOkWa: 'جهّزنا رسالتك، اضغطي إرسال داخل واتساب',
        askOkMail: 'جهّزنا رسالتك في برنامج البريد عندك',
        askOkSent: 'وصلنا استفسارك، وسنرد عليك قريباً',
        askIntro: 'استفسار من موقع شوش نيل',
        askLblName: 'الاسم',
        askLblCat: 'الموضوع',
        askLblQ: 'السؤال',
        askSubject: 'استفسار جديد من صفحة الأسئلة',
        catOther: 'موضوع آخر'
      }
    },

    en: {
      faq: {
        eyebrow: 'Help centre',
        title: 'Your questions, answered',
        lead: 'Everything customers ask us: applying the set, how long it lasts, removal, sizing, shipping and payment. Type one word in the search and the answer comes straight up — and if it is not here, message us and we will reply ourselves.',
        searchLabel: 'Search the questions',
        searchPh: 'Try a word — wear time, removal, size, shipping',
        clearSearch: 'Clear the search',
        jumpLabel: 'Quick links on this page',
        jumpGuide: 'Step-by-step application',
        jumpContact: 'Contact card',
        jumpAsk: 'Send us a question',

        catsLabel: 'Filter questions by section',
        all: 'All',
        resultsN: '{n} of {total} questions',
        resultsQ: '{n} results for “{q}”',
        noneT: 'Nothing matches that word',
        noneX: 'Try a shorter word, switch back to “All”, or send us the question directly from the card below and we will answer it.',
        clearAll: 'Clear search and filter',
        zeroT: 'No questions here yet',
        zeroX: 'We are preparing the answers. Until then, send us your question from the card below and we will reply ourselves.',
        picAlt: '{q} — picture {n}',
        copyLink: 'Copy link',
        linkCopied: 'Link to this question copied',
        copyFail: 'We could not copy the link — copy it from the address bar',
        askAbout: 'Ask about this',
        aboutQ: 'About: {q}',

        guideEyebrow: 'Practical guide',
        guideTitle: 'How to apply, step by step',
        guideLead: 'Ten minutes, start to finish. Keep the order as it is and never skip the prep step — it is the difference between two days of wear and two weeks.',
        guideTime: 'Takes about 10 minutes',
        stepN: 'Step {n}',
        guideFull: 'Read the full answer',
        moreTitle: 'More on applying',

        tipsTitle: 'Make it last',
        tip1T: 'Buff first, always',
        tip1X: 'Take the shine off the nail plate with a light buff before anything else. It is the step people skip, and the one that matters most.',
        tip2T: 'Alcohol before adhesive',
        tip2X: 'The alcohol pad lifts oils and leftover hand cream so the adhesive grips a genuinely clean surface.',
        tip3T: 'Hold for 20 seconds',
        tip3X: 'Steady pressure on one nail at a time, with no wiggling — never press two nails at once.',
        tip4T: 'No water for an hour',
        tip4X: 'Keep your hands dry for the first hour while the adhesive cures, then carry on with your day.',

        removeTitle: 'How to remove them',
        removeX: 'Soak your hands in warm water with a few drops of soap or oil for 10 to 15 minutes, then ease each nail up from the free edge with the wooden stick. If you feel any pulling, soak for longer — forcing them off is almost the only way people damage a natural nail.',
        removeMore: 'Read the full answer',

        contactEyebrow: 'Talk to us',
        contactTitle: 'Contact card',
        contactLead: 'No bots and no ticket queue — your message reaches us personally, and we usually reply within the hour while we are answering.',
        cardTitle: 'Reach us directly',
        cardX: 'Pick whichever channel suits you — they all reach us directly, and we answer in person.',
        waBtn: 'Message us on WhatsApp',
        callT: 'Call us',
        mailT: 'Email',
        igT: 'Instagram',
        scT: 'Snapchat',
        ttT: 'TikTok',
        hoursT: 'When we reply',
        cityT: 'We ship from',
        waMsg: 'Hi Shosh Nail, I have a question about your press-on sets.',
        noChannels: 'Contact channels are added from the admin panel.',

        askTitle: 'Send us a question',
        askLead: 'Write your question here and we will have the message ready to send — no sign-up, no waiting.',
        askName: 'Your name',
        askNamePh: 'e.g. Noura',
        askCat: 'What is it about?',
        askQ: 'Your question',
        askQPh: 'Give us the details, and if it is about an existing order please add the order number.',
        askSend: 'Send on WhatsApp',
        askSendMail: 'Send by email',
        askSendOnly: 'Send question',
        askErrName: 'Add your name so we know who we are talking to',
        askErrQ: 'Tell us a little more (at least 10 characters)',
        askNote: 'The message opens ready in WhatsApp for you to send — nothing is stored on this site.',
        askNoteMail: 'The message opens ready in your email app.',
        askNoteSend: 'Your question goes straight to the Shosh Nail team.',
        askNoteNone: 'No contact channel is set up yet — they are added from the admin panel.',
        askOkWa: 'Your message is ready, hit send inside WhatsApp',
        askOkMail: 'Your message is ready in your email app',
        askOkSent: 'We have your question and will get back to you shortly',
        askIntro: 'Question from the Shosh Nail website',
        askLblName: 'Name',
        askLblCat: 'Topic',
        askLblQ: 'Question',
        askSubject: 'New question from the FAQ page',
        catOther: 'Something else'
      }
    }
  };

  if (SN.I18n && typeof SN.I18n.extend === 'function') SN.I18n.extend(DICT);

  /* ==================================================================== */
  /* 1. tiny private helpers (nothing here is exported)                    */
  /* ==================================================================== */

  var ALL = '__all__';
  var OTHER = '__other__';
  var STEP_ICONS = ['hand', 'brush', 'sparkle', 'shield', 'grid', 'gem', 'clock', 'check', 'heart', 'star'];
  var TIP_ICONS = ['brush', 'shield', 'clock', 'hand'];

  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function str(v) { return v === null || v === undefined ? '' : String(v); }
  function trim(v) { return str(v).replace(/^\s+|\s+$/g, ''); }

  function t(key, vars) {
    if (SN.I18n && typeof SN.I18n.t === 'function') return SN.I18n.t(key, vars);
    return str(key);
  }
  function pick(tobj) {
    if (SN.I18n && typeof SN.I18n.pick === 'function') return SN.I18n.pick(tobj);
    if (typeof tobj === 'string') return tobj;
    return isObj(tobj) ? str(tobj.ar || tobj.en) : '';
  }
  function numf(n) {
    if (SN.I18n && typeof SN.I18n.num === 'function') return SN.I18n.num(n);
    return str(n);
  }

  function el(tag, attrs, kids) {
    if (SN.UI && typeof SN.UI.el === 'function') return SN.UI.el(tag, attrs, kids);
    return document.createElement(tag || 'div');   /* never reached: ui.js loads first */
  }
  function icon(name, size) {
    if (SN.UI && typeof SN.UI.icon === 'function') return SN.UI.icon(name, size);
    return '';
  }
  function toast(text, kind) {
    if (SN.UI && typeof SN.UI.toast === 'function') SN.UI.toast(text, kind);
  }
  function debounce(fn, ms) {
    if (SN.UI && typeof SN.UI.debounce === 'function') return SN.UI.debounce(fn, ms);
    return fn;
  }

  function sget(path, fallback) {
    try {
      if (SN.Store && typeof SN.Store.get === 'function') return SN.Store.get(path, fallback);
    } catch (e) { /* store not ready */ }
    return fallback;
  }
  function slist(key) {
    var v;
    try {
      if (SN.Store && typeof SN.Store.list === 'function') v = SN.Store.list(key);
    } catch (e) { v = null; }
    return Array.isArray(v) ? v : [];
  }

  function byId(id) { return document.getElementById(id); }
  function show(node, on) {
    if (!node) return;
    if (on) node.removeAttribute('hidden');
    else node.setAttribute('hidden', '');
  }
  function clear(node) {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  }
  function esc(s) {
    return str(s).replace(/[&<>"']/g, function (c) {
      if (c === '&') return '&amp;';
      if (c === '<') return '&lt;';
      if (c === '>') return '&gt;';
      if (c === '"') return '&quot;';
      return '&#39;';
    });
  }
  function reduced() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  /* ------------------------------------------------------- normalisation
     Search must ignore tashkeel, alef/ya/ta-marbuta spelling and letter
     case, yet the highlight has to land on the ORIGINAL characters — so
     every normalised character keeps a map back to its source index. */
  var DROP = /[ً-ٰٕـۖ-ۜ]/;

  function normChar(c) {
    if (DROP.test(c)) return '';
    if (c === 'أ' || c === 'إ' || c === 'آ' || c === 'ٱ') return 'ا';
    if (c === 'ى') return 'ي';
    if (c === 'ئ') return 'ي';
    if (c === 'ة') return 'ه';
    if (c === 'ؤ') return 'و';
    if (c >= '٠' && c <= '٩') return String.fromCharCode(c.charCodeAt(0) - 0x0660 + 48);
    if (c >= '۰' && c <= '۹') return String.fromCharCode(c.charCodeAt(0) - 0x06F0 + 48);
    return c.toLowerCase();
  }

  function normalize(s) {
    var v = str(s), out = '', i;
    for (i = 0; i < v.length; i++) out += normChar(v.charAt(i));
    return out;
  }

  function normIndexed(s) {
    var v = str(s), out = '', map = [], i, j, n;
    for (i = 0; i < v.length; i++) {
      n = normChar(v.charAt(i));
      for (j = 0; j < n.length; j++) { out += n.charAt(j); map.push(i); }
    }
    map.push(v.length);
    return { n: out, map: map };
  }

  /* escaped HTML with every occurrence of `q` wrapped in <mark> */
  function hl(text, q) {
    var src = str(text);
    var needle = normalize(q);
    var ix, out = '', pos = 0, from = 0, at, s0, e0;
    if (!needle) return esc(src);
    ix = normIndexed(src);
    while ((at = ix.n.indexOf(needle, from)) !== -1) {
      s0 = ix.map[at];
      e0 = ix.map[at + needle.length];
      if (s0 === undefined) break;
      if (e0 === undefined) e0 = src.length;
      if (s0 > pos) out += esc(src.slice(pos, s0));
      if (e0 > s0 && e0 > pos) {
        out += '<mark class="faq-hl">' + esc(src.slice(Math.max(pos, s0), e0)) + '</mark>';
        pos = e0;
      }
      from = at + needle.length;
    }
    out += esc(src.slice(pos));
    return out;
  }

  /* ==================================================================== */
  /* 2. data access                                                        */
  /* ==================================================================== */

  var HAY = {};   /* id -> {src, n} search haystack cache */

  /* THE list every part of the page reads — tabs, counts, search, guide,
     chips, the removal note. A row with no question text (the panel's
     «إضافة جديد» makes one, and auto-publish can push it live) is not a
     question yet, so it is dropped here, once, for all of them. */
  function faqList() {
    var all = slist('faq'), out = [], i, it;
    for (i = 0; i < all.length; i++) {
      it = all[i];
      if (!isObj(it) || !it.id) continue;
      if (!trim(pick(it.q))) continue;
      out.push(it);
    }
    return out;
  }
  function catList() { return slist('faqCats'); }

  function catOf(id) {
    var list = catList(), i;
    for (i = 0; i < list.length; i++) {
      if (isObj(list[i]) && str(list[i].id) === str(id)) return list[i];
    }
    return null;
  }
  function catName(id) {
    var c = catOf(id);
    return c ? pick(c.name) : '';
  }

  function both(o) {
    if (isObj(o)) return str(o.ar) + ' ' + str(o.en);
    return str(o);
  }

  /* ------------------------------------------------------------ pictures
     An answer may carry up to four pictures: {src, w, h, cap:{ar,en}}.
     Only an embedded JPEG/PNG/WebP or an https:// address is ever put in
     an <img> — anything else in the data is ignored, not rendered. */
  var MAX_PICS = 4;

  /* The check reads only the HEAD of an embedded picture, never its body.
     A picture is 150–250 KB of base64 and picSrc() runs for every picture on
     every search keystroke (the haystack reads the captions of the pictures
     that will show), so a check that walked the whole body cost up to 0.9 s
     per keystroke on a mid-range phone with 24 pictures. The head is all
     that decides what the browser does with the address — a JPEG/PNG/WebP
     image, never a script or an SVG. The address is handed to the <img> as
     an attribute value, never as HTML (see picImg), so nothing after the
     head can be read as markup, and a damaged body just fails to decode. */
  var PIC_DATA = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+\/]/;
  var PIC_HEAD = 48;                            /* longer than any head above */
  var PIC_HTTPS = /^https:\/\/[^\s"'<>\\]+$/i;  /* a web address is short */
  var EDGE_WS = /\s/;

  function picSrc(p) {
    var v = isObj(p) ? str(p.src) : '';
    if (!v) return '';
    /* trim() would scan the whole body too — only pay for it when an end
       really is blank */
    if (EDGE_WS.test(v.charAt(0)) || EDGE_WS.test(v.charAt(v.length - 1))) v = trim(v);
    if (PIC_DATA.test(v.slice(0, PIC_HEAD))) return v;
    return PIC_HTTPS.test(v) ? v : '';
  }

  function picsOf(it) {
    var arr = isObj(it) && Array.isArray(it.pics) ? it.pics : [], out = [], i;
    for (i = 0; i < arr.length && out.length < MAX_PICS; i++) {
      if (picSrc(arr[i])) out.push(arr[i]);
    }
    return out;
  }

  /* every caption, both languages — so a word in a caption finds its question */
  function capsOf(it) {
    var pics = picsOf(it), out = '', i;
    for (i = 0; i < pics.length; i++) out += '\n' + both(pics[i].cap);
    return out;
  }

  function dimOf(v) {
    var n = Math.round(Number(v));
    return n > 0 && n <= 10000 ? n : 0;
  }

  /* A picture's <img>, kept across re-renders: "id#n" -> {src, img}.
     The whole list is rebuilt on every search keystroke, and giving an <img>
     an embedded address makes the browser decode it there and then — even
     with loading="lazy", even for an answer that is closed. With 24 pictures
     that was most of a keystroke on a phone. A kept <img> is simply moved
     into the new row, already decoded. */
  var FIG = {};

  function setAttr(node, name, v) {
    if (v === '' || v === null || v === undefined) node.removeAttribute(name);
    else node.setAttribute(name, String(v));
  }

  function picImg(key, src) {
    var hit = FIG[key], img;
    /* never steal an <img> that is already on the page (two rows with the
       same id would otherwise leave the first one without its picture) */
    if (hit && hit.src === src && !(document.documentElement && document.documentElement.contains(hit.img))) {
      return hit.img;
    }
    /* loading/decoding go on before src, so the browser sees them first */
    img = el('img', { loading: 'lazy', decoding: 'async' });
    img.setAttribute('src', src);
    FIG[key] = { src: src, img: img };
    return img;
  }

  /* after the data changes: let go of every kept <img> whose picture is gone
     or has been replaced, so a deleted picture is not held in memory */
  function pruneFigs() {
    var list = faqList(), next = {}, i, k, pics, key, hit;
    for (i = 0; i < list.length; i++) {
      pics = picsOf(list[i]);
      for (k = 0; k < pics.length; k++) {
        key = str(list[i].id) + '#' + (k + 1);
        hit = FIG[key];
        if (hit && hit.src === picSrc(pics[k])) next[key] = hit;
      }
    }
    FIG = next;
  }

  /* one picture, below the answer text. Built as elements, not as HTML: the
     address is 150–250 KB of base64 and never goes through the HTML parser,
     so nothing in it can be read as markup either. The width/height
     attributes let the browser keep its space before the file arrives, so
     nothing jumps. */
  function picNode(p, n, qText, q, id) {
    var src = picSrc(p), cap, w, h, img;
    if (!src) return null;
    cap = trim(pick(p.cap)); w = dimOf(p.w); h = dimOf(p.h);
    img = picImg(id + '#' + n, src);
    setAttr(img, 'width', w && h ? w : '');
    setAttr(img, 'height', w && h ? h : '');
    /* --ar / --w let the CSS narrow a tall picture (or a small one) instead
       of framing it in empty bands — see .faq-fig in faq.html */
    setAttr(img, 'style', w && h ? '--ar:' + (Math.round(w / h * 10000) / 10000) + ';--w:' + w + 'px' : '');
    /* a caption already names the picture: the figure is read by its
       caption, so the alt stays empty rather than saying it twice */
    img.setAttribute('alt', cap ? '' : t('faq.picAlt', { q: stripQ(qText), n: numf(n) }));
    return el('figure', { 'class': 'faq-fig' }, [
      img,
      cap ? el('figcaption', { html: hl(cap, q), dir: 'auto' }) : null
    ]);
  }

  /* Both languages go in the haystack, so an English word finds an Arabic
     answer. The category name is in there too: Arabic inflection means
     "إزالة" never appears literally inside "كيف أزيلها…", and matching the
     section is how that question gets found at all. Whenever the hit comes
     from the section, the section badge is the thing that lights up — see
     itemNode() — so a row is never in the list without saying why. */
  function haystack(it) {
    var id = str(it.id);
    var c = catOf(it.cat);
    var src = both(it.q) + '\n' + both(it.a) + '\n' + id + '\n' + (c ? both(c.name) : str(it.cat)) + capsOf(it);
    var hit = HAY[id];
    if (hit && hit.src === src) return hit.n;
    hit = { src: src, n: normalize(src) };
    HAY[id] = hit;
    return hit.n;
  }

  function findFaq(id) {
    var list = faqList(), i, want = str(id);
    if (!want) return null;
    for (i = 0; i < list.length; i++) {
      if (isObj(list[i]) && str(list[i].id) === want) return list[i];
    }
    return null;
  }

  /* search-only pass (drives both the list and the per-category counts) */
  function searched() {
    var list = faqList(), q = normalize(st.q), out = [], i, it;
    for (i = 0; i < list.length; i++) {
      it = list[i];
      if (q && haystack(it).indexOf(q) === -1) continue;
      out.push(it);
    }
    return out;
  }

  function filtered() {
    var base = searched(), out = [], i;
    if (st.cat === ALL) return base;
    for (i = 0; i < base.length; i++) {
      if (str(base[i].cat) === st.cat) out.push(base[i]);
    }
    return out;
  }

  /* ==================================================================== */
  /* 3. text shaping                                                       */
  /* ==================================================================== */

  /* ")", "." and ":" can never sit inside a number, so they need no space
     after them; a dash does — otherwise "15–20 seconds" reads as item 15.
     The number may be typed in Arabic-Indic digits too (١) ٢) ٣)), which is
     what an Arabic phone keyboard gives her. */
  var NUM_LINE = /^\s*([0-9\u0660-\u0669\u06F0-\u06F9]{1,2})\s*(?:[)\.:]\s*|[-–—]\s+)(.+)$/;

  function lines(text) {
    return str(text).split(/\r?\n/);
  }

  function numberedLines(text) {
    var ls = lines(text), out = [], i, m;
    for (i = 0; i < ls.length; i++) {
      m = NUM_LINE.exec(ls[i]);
      if (m) out.push(trim(m[2]));
    }
    return out;
  }

  /* an answer becomes <p> blocks, with any numbered run promoted to <ol>;
     answerNode() then puts its pictures, in order, below the text */
  function answerHtml(text, q, hasPics) {
    var ls = lines(text), out = '', buf = [], i, ln, m;

    function flush() {
      var k;
      if (!buf.length) return;
      out += '<ol class="faq-ol">';
      for (k = 0; k < buf.length; k++) out += '<li>' + buf[k] + '</li>';
      out += '</ol>';
      buf = [];
    }

    for (i = 0; i < ls.length; i++) {
      ln = trim(ls[i]);
      if (!ln) continue;
      m = NUM_LINE.exec(ln);
      if (m) { buf.push(hl(trim(m[2]), q)); continue; }
      flush();
      out += '<p>' + hl(ln, q) + '</p>';
    }
    flush();
    if (!out && !hasPics) out = '<p>' + hl(str(text), q) + '</p>';
    return out;
  }

  function answerNode(it, q) {
    var pics = picsOf(it), qText = pick(it.q), id = str(it.id), i, fig;
    var box = el('div', { 'class': 'faq-a', html: answerHtml(pick(it.a), q, pics.length > 0) });
    for (i = 0; i < pics.length; i++) {
      fig = picNode(pics[i], i + 1, qText, q, id);
      if (fig) box.appendChild(fig);
    }
    return box;
  }

  function clip(s, n) {
    var v = trim(s), cut;
    if (v.length <= n) return v;
    cut = v.slice(0, n);
    cut = cut.replace(/\s+\S*$/, '');
    return (cut || v.slice(0, n)) + '…';
  }

  function stripQ(s) { return trim(s).replace(/[?؟]\s*$/, ''); }

  /* "buff the surface, this is the secret" -> {t:'buff the surface', x:'this is the secret'} */
  function splitStep(s) {
    var v = trim(s), at = v.search(/[،,—]/);
    if (at > 8 && at < 64) {
      return { t: trim(v.slice(0, at)), x: trim(v.slice(at + 1)) };
    }
    return { t: clip(v, 110), x: '' };
  }

  /* ==================================================================== */
  /* 4. state + dom                                                        */
  /* ==================================================================== */

  var st = { q: '', cat: ALL, open: '' };
  var dom = {};
  var inited = false;
  var guideSrc = '';        /* id of the faq item the numbered guide came from */
  var guideOn = true;       /* is the guide section on the page at all */

  function cacheDom() {
    dom.main = byId('main');
    dom.q = byId('faq-q');
    dom.qClear = byId('faq-q-clear');
    dom.searchIco = byId('faq-search-ico');
    dom.jump = byId('faq-jump');
    dom.tabs = byId('faq-tabs');
    dom.count = byId('faq-count');
    dom.list = byId('faq-list');
    dom.empty = byId('faq-empty');
    dom.emptyIco = byId('faq-empty-ico');
    dom.reset = byId('faq-reset');
    dom.questions = byId('faq-questions');
    dom.bar = dom.tabs ? dom.tabs.parentNode : null;
    dom.guide = byId('faq-guide');
    dom.emptyT = dom.empty ? dom.empty.querySelector('.empty-t') : null;
    dom.emptyX = dom.empty ? dom.empty.querySelector('.empty-x') : null;
    dom.steps = byId('faq-steps');
    dom.guideFoot = byId('faq-guide-foot');
    dom.tips = byId('faq-tips');
    dom.remove = byId('faq-remove');
    dom.more = byId('faq-more');
    dom.moreChips = byId('faq-more-chips');
    dom.card = byId('faq-card');
    dom.ask = byId('faq-ask');
    dom.askIco = byId('faq-ask-ico');
    dom.askForm = byId('faq-ask-form');
    dom.askName = byId('faq-ask-name');
    dom.askNameErr = byId('faq-ask-name-err');
    dom.askCat = byId('faq-ask-cat');
    dom.askQ = byId('faq-ask-q');
    dom.askQErr = byId('faq-ask-q-err');
    dom.askSend = byId('faq-ask-send');
    dom.askNote = byId('faq-ask-note');
  }

  function scrollTo(node) {
    if (!node) return;
    try {
      node.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    } catch (e) {
      try { node.scrollIntoView(true); }
      catch (e2) { /* ancient engine — leave the page where it is */ }
    }
  }
  function focusSoft(node) {
    if (!node || typeof node.focus !== 'function') return;
    try { node.focus({ preventScroll: true }); }
    catch (e) {
      try { node.focus(); }
      catch (e2) { /* ignore */ }
    }
  }

  /* ==================================================================== */
  /* 5. tabs + question list                                               */
  /* ==================================================================== */

  function renderTabs() {
    var base, cats = catList(), counts = {}, has = {}, all = faqList(), i, c, id, n, total;
    if (!dom.tabs) return;

    /* A section with no questions at all gets no tab (a tab that can only
       ever say 0 is a dead end). One that simply has no match for the
       current search keeps its tab, dimmed. */
    for (i = 0; i < all.length; i++) has[str(all[i].cat)] = true;

    /* the owner may have deleted the category we are sitting on, or emptied it */
    if (st.cat !== ALL && (!catOf(st.cat) || !has[st.cat])) st.cat = ALL;

    /* no questions at all: no tabs and no «0 من 0» either */
    show(dom.bar, all.length > 0);

    base = searched();
    clear(dom.tabs);

    total = base.length;
    for (i = 0; i < base.length; i++) {
      id = str(base[i].cat);
      counts[id] = (counts[id] || 0) + 1;
    }

    dom.tabs.appendChild(tabBtn(ALL, t('faq.all'), total));
    for (i = 0; i < cats.length; i++) {
      c = cats[i];
      if (!isObj(c) || !c.id) continue;
      id = str(c.id);
      if (!has[id]) continue;
      n = counts[id] || 0;
      dom.tabs.appendChild(tabBtn(id, pick(c.name) || id, n));
    }
  }

  function tabBtn(id, label, n) {
    var on = st.cat === id;
    return el('button', {
      'class': 'tab' + (on ? ' is-on' : '') + (!on && !n ? ' faq-tab-dim' : ''),
      type: 'button',
      'data-cat': id,
      'aria-pressed': on ? 'true' : 'false',
      on: {
        click: function () {
          if (st.cat === id) return;
          st.cat = id;
          render();
        }
      }
    }, [
      el('span', { text: label }),
      el('span', { 'class': 'tab-n', text: numf(n) })
    ]);
  }

  function renderCount() {
    var shown = filtered().length, total = faqList().length;
    if (!dom.count) return;
    if (st.q) dom.count.textContent = t('faq.resultsQ', { n: numf(shown), q: st.q });
    else dom.count.textContent = t('faq.resultsN', { n: numf(shown), total: numf(total) });
  }

  function itemNode(it) {
    var id = str(it.id);
    var pid = 'faq-p-' + id;
    var bid = 'faq-b-' + id;
    var open = st.open === id;
    var cname = catName(it.cat);
    var head, body, foot;

    head = el('button', {
      'class': 'acc-head',
      type: 'button',
      id: bid,
      'aria-expanded': open ? 'true' : 'false',
      'aria-controls': pid,
      on: { click: function () { toggleItem(id); } }
    }, [
      el('span', { 'class': 'faq-q-t', html: hl(pick(it.q), st.q) }),
      /* the section badge only earns its place while every section is shown */
      (cname && st.cat === ALL) ? el('span', { 'class': 'faq-q-n', html: hl(cname, st.q) }) : null,
      el('span', { 'class': 'faq-chev', html: icon('chevron', 18) })
    ]);

    foot = el('div', { 'class': 'faq-a-foot' }, [
      cname ? el('span', { 'class': 'pill pill-rose faq-a-cat', html: hl(cname, st.q) }) : null,
      el('button', {
        'class': 'btn btn-ghost btn-sm',
        type: 'button',
        on: { click: function () { copyLink(id); } }
      }, [
        el('span', { html: icon('copy', 16) }),
        el('span', { text: t('faq.copyLink') })
      ]),
      el('button', {
        'class': 'btn btn-line btn-sm',
        type: 'button',
        on: { click: function () { askAbout(it); } }
      }, [
        el('span', { html: icon('whatsapp', 16) }),
        el('span', { text: t('faq.askAbout') })
      ])
    ]);

    body = el('div', {
      'class': 'acc-body',
      id: pid,
      role: 'region',
      'aria-labelledby': bid
    }, [
      el('div', { 'class': 'acc-in' }, [
        answerNode(it, st.q),
        foot
      ])
    ]);

    return el('div', {
      'class': 'acc-item faq-item' + (open ? ' is-open' : ''),
      id: id,
      'data-id': id
    }, [
      el('h3', { 'class': 'faq-q' }, [head]),
      body
    ]);
  }

  function renderList() {
    var items = filtered(), i;
    if (!dom.list) return;
    clear(dom.list);
    for (i = 0; i < items.length; i++) dom.list.appendChild(itemNode(items[i]));
    show(dom.list, items.length > 0);
    show(dom.empty, items.length === 0);
    if (!items.length) paintEmpty(faqList().length === 0);
  }

  /* Two different empties. No match for a search offers to clear it; no
     questions at all says so plainly — there is nothing to clear. The keys
     go on data-i18n too, so a language switch keeps the right one. */
  function paintEmpty(zero) {
    var tk = zero ? 'faq.zeroT' : 'faq.noneT';
    var xk = zero ? 'faq.zeroX' : 'faq.noneX';
    if (dom.emptyT) { dom.emptyT.setAttribute('data-i18n', tk); dom.emptyT.textContent = t(tk); }
    if (dom.emptyX) { dom.emptyX.setAttribute('data-i18n', xk); dom.emptyX.textContent = t(xk); }
    if (dom.emptyIco) dom.emptyIco.innerHTML = icon(zero ? 'sparkle' : 'search', 40);
    show(dom.reset, !zero);
  }

  function itemNodeById(id) {
    var kids = dom.list ? dom.list.childNodes : null, i, k;
    if (!kids) return null;
    for (i = 0; i < kids.length; i++) {
      k = kids[i];
      if (k && k.getAttribute && k.getAttribute('data-id') === str(id)) return k;
    }
    return null;
  }

  function syncOpen() {
    var kids = dom.list ? dom.list.childNodes : null, i, k, on, btn;
    if (!kids) return;
    for (i = 0; i < kids.length; i++) {
      k = kids[i];
      if (!k || !k.getAttribute) continue;
      on = k.getAttribute('data-id') === st.open;
      if (k.classList) {
        if (on) k.classList.add('is-open');
        else k.classList.remove('is-open');
      }
      btn = k.querySelector ? k.querySelector('.acc-head') : null;
      if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
  }

  function toggleItem(id) {
    st.open = st.open === str(id) ? '' : str(id);
    syncOpen();
  }

  /* open a question wherever it is: clears the filter first when needed */
  function reveal(id, moveFocus) {
    var want = str(id), node, btn;
    if (!findFaq(want)) return false;

    st.open = want;
    if (!itemNodeById(want)) {
      st.q = '';
      st.cat = ALL;
      if (dom.q) dom.q.value = '';
      show(dom.qClear, false);
      render();
    } else {
      syncOpen();
    }

    node = itemNodeById(want);
    if (!node) return false;
    scrollTo(node);
    if (moveFocus) {
      btn = node.querySelector ? node.querySelector('.acc-head') : null;
      if (btn) focusSoft(btn);
    }
    return true;
  }

  function pageLink(id) {
    var base = str(location.href).split('#')[0];
    return base + '#' + str(id);
  }

  function copyLink(id) {
    var url = pageLink(id);
    if (!SN.UI || typeof SN.UI.copy !== 'function') {
      toast(t('faq.copyFail'), 'err');
      return;
    }
    SN.UI.copy(url).then(function (ok) {
      toast(ok ? t('faq.linkCopied') : t('faq.copyFail'), ok ? 'ok' : 'err');
    }, function () {
      toast(t('faq.copyFail'), 'err');
    });
  }

  /* ==================================================================== */
  /* 6. the step-by-step guide                                             */
  /* ==================================================================== */

  /* Is this a question about applying the set? The seeded category is
     'install'; a category the owner makes himself gets a random id, so its
     name — or the question itself — has to say it. «ركب» catches أركّب,
     ركّبت, نركب…, «تركيب» the noun; a «م» in front is refused, so «الأظافر
     المركّبة» (what the product is called) does not count. */
  var INSTALLISH = /(?:^|[^م])ركب|تركيب|\bappl(?:y|ies|ied|ying|ication)\b/;

  function installish(it) {
    var c;
    if (str(it.cat) === 'install') return true;
    c = catOf(it.cat);
    return INSTALLISH.test(normalize(both(it.q) + ' ' + (c ? both(c.name) : '')));
  }

  /* The guide is an application answer that really is numbered — three
     steps or more. There is no fallback any more: turning every question
     of a category into «step» cards put his delivery and wear-time
     questions under «طريقة التركيب». No numbered answer, no guide. */
  function guideSteps() {
    var items = faqList(), best = null, i, ls, out, s;
    for (i = 0; i < items.length; i++) {
      if (!installish(items[i])) continue;
      ls = numberedLines(pick(items[i].a));
      if (ls.length >= 3 && (!best || ls.length > best.ls.length)) best = { id: str(items[i].id), ls: ls };
    }
    if (!best) return { id: '', steps: [] };
    out = [];
    for (i = 0; i < best.ls.length && i < 10; i++) {
      s = splitStep(best.ls[i]);
      s.id = best.id;
      out.push(s);
    }
    return { id: best.id, steps: out };
  }

  function renderGuide() {
    var g = guideSteps(), i, s, rest, chips, on = g.steps.length > 0;

    guideSrc = g.id;

    /* with no numbered answer the whole section goes — heading, tips and
       all — along with the hero chip that jumps to it */
    show(dom.guide, on);
    if (on !== guideOn) {
      guideOn = on;
      renderJump();
    }
    if (!on) return;

    if (dom.steps) {
      clear(dom.steps);
      for (i = 0; i < g.steps.length; i++) {
        s = g.steps[i];
        dom.steps.appendChild(el('li', { 'class': 'faq-step', 'data-n': String(i + 1) }, [
          el('span', { 'class': 'faq-step-ico', html: icon(STEP_ICONS[i % STEP_ICONS.length], 22) }),
          el('p', { 'class': 'faq-step-n', text: t('faq.stepN', { n: numf(i + 1) }) }),
          el('p', { 'class': 'faq-step-t', text: s.t }),
          s.x ? el('p', { 'class': 'faq-step-x', text: s.x }) : null
        ]));
      }
      show(dom.steps, g.steps.length > 0);
    }

    if (dom.guideFoot) {
      clear(dom.guideFoot);
      if (g.steps.length) {
        dom.guideFoot.appendChild(el('span', { 'class': 'pill pill-gold' }, [
          el('span', { html: icon('clock', 15) }),
          el('span', { text: t('faq.guideTime') })
        ]));
      }
      if (g.id) {
        dom.guideFoot.appendChild(el('button', {
          'class': 'btn btn-line btn-sm',
          type: 'button',
          on: { click: function () { reveal(g.id, true); } }
        }, [
          el('span', { text: t('faq.guideFull') }),
          el('span', { html: icon('arrow', 16) })
        ]));
      }
      show(dom.guideFoot, dom.guideFoot.childNodes.length > 0);
    }

    if (dom.tips) {
      clear(dom.tips);
      for (i = 1; i <= 4; i++) {
        dom.tips.appendChild(el('div', { 'class': 'faq-tip' }, [
          el('span', { html: icon(TIP_ICONS[i - 1], 20) }),
          el('div', {}, [
            el('p', { 'class': 'faq-tip-t', text: t('faq.tip' + i + 'T') }),
            el('p', { 'class': 'faq-tip-x', text: t('faq.tip' + i + 'X') })
          ])
        ]));
      }
    }

    renderRemoval();

    /* the other application questions, the ones the numbered guide did
       not come from */
    if (dom.more && dom.moreChips) {
      rest = faqList();
      chips = [];
      for (i = 0; i < rest.length; i++) {
        if (str(rest[i].id) === guideSrc || !installish(rest[i])) continue;
        chips.push(chipFor(rest[i]));
      }
      clear(dom.moreChips);
      for (i = 0; i < chips.length; i++) dom.moreChips.appendChild(chips[i]);
      show(dom.more, chips.length > 0);
    }
  }

  function chipFor(it) {
    var id = str(it.id);
    return el('button', {
      'class': 'chip',
      type: 'button',
      on: { click: function () { reveal(id, true); } }
    }, [el('span', { text: stripQ(pick(it.q)) })]);
  }

  /* the removal note prefers the real answer, falls back to our own copy */
  function removalItem() {
    var list = faqList(), i, it, hay, best = null;
    for (i = 0; i < list.length; i++) {
      it = list[i];
      if (!isObj(it) || !it.id) continue;
      hay = normalize(both(it.q));
      if (!/(ازال|ازيل|remov)/.test(hay)) continue;
      if (str(it.cat) === 'care') return it;
      if (!best) best = it;
    }
    return best;
  }

  function renderRemoval() {
    var it = removalItem(), body, txt;
    if (!dom.remove) return;
    clear(dom.remove);

    txt = it ? clip(lines(pick(it.a))[0], 340) : t('faq.removeX');
    body = el('div', { 'class': 'faq-remove-b' }, [
      el('p', { 'class': 'faq-remove-t', text: t('faq.removeTitle') }),
      el('p', { text: txt })
    ]);
    if (it) {
      body.appendChild(el('p', {}, [
        el('button', {
          'class': 'btn btn-ghost btn-sm',
          type: 'button',
          on: { click: function () { reveal(str(it.id), true); } }
        }, [
          el('span', { text: t('faq.removeMore') }),
          el('span', { html: icon('arrow', 16) })
        ])
      ]));
    }

    dom.remove.appendChild(el('span', { html: icon('shield', 20) }));
    dom.remove.appendChild(body);
  }

  /* ==================================================================== */
  /* 7. contact card                                                       */
  /* ==================================================================== */

  function digitsOnly(v) { return str(v).replace(/[^0-9]/g, ''); }
  function telHref(v) { return 'tel:' + str(v).replace(/[^0-9+]/g, ''); }

  function handleOf(v) { return trim(v).replace(/^@+/, ''); }
  function socialHref(base, v) {
    var h = handleOf(v);
    if (!h) return '';
    if (/^https?:\/\//i.test(h)) return h;
    return base + h;
  }
  function socialLabel(v) {
    var h = handleOf(v);
    if (!h) return '';
    if (/^https?:\/\//i.test(h)) return h.replace(/^https?:\/\//i, '').replace(/\/$/, '');
    return '@' + h;
  }

  function waHref(msg) {
    var n;
    if (SN.Checkout && typeof SN.Checkout.waLink === 'function') {
      try {
        n = SN.Checkout.waLink(msg);
        if (n) return n;
      } catch (e) { /* fall through to the local build */ }
    }
    n = digitsOnly(sget('settings.whatsapp', ''));
    if (!n) return '';
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(str(msg));
  }

  function linkRow(iconName, href, title, value, external) {
    var kids = [
      el('span', { html: icon(iconName, 20) }),
      el('span', { 'class': 'faq-link-b' }, [
        el('span', { 'class': 'faq-link-t', text: title }),
        el('span', { 'class': 'faq-link-v ltr', text: value })
      ])
    ];
    if (external) kids.push(el('span', { 'class': 'sr-only', text: t('a11y.newWindow') }));
    return el('a', {
      'class': 'faq-link',
      href: href,
      target: external ? '_blank' : null,
      rel: external ? 'noopener noreferrer' : null
    }, kids);
  }

  function infoRow(iconName, title, value) {
    return el('div', { 'class': 'faq-info-row' }, [
      el('span', { html: icon(iconName, 18) }),
      el('div', {}, [
        el('span', { 'class': 'faq-info-t', text: title }),
        el('p', { 'class': 'faq-info-v', text: value })
      ])
    ]);
  }

  function renderContact() {
    var phone = trim(sget('settings.phone', ''));
    var mail = trim(sget('settings.email', ''));
    var ig = handleOf(sget('settings.instagram', ''));
    var sc = handleOf(sget('settings.snapchat', ''));
    var tk = handleOf(sget('settings.tiktok', ''));
    var hours = pick(sget('settings.hours', null));
    var city = pick(sget('settings.city', null));
    var wa = waHref(t('faq.waMsg'));
    var links, info;

    if (!dom.card) return;
    clear(dom.card);

    dom.card.appendChild(el('div', { 'class': 'faq-card-h' }, [
      el('span', { html: icon('sparkle', 22) }),
      el('div', {}, [
        el('p', { 'class': 'faq-card-t', text: t('faq.cardTitle') }),
        el('p', { 'class': 'faq-card-x', text: t('faq.cardX') })
      ])
    ]));

    if (wa) {
      dom.card.appendChild(el('a', {
        'class': 'btn btn-pri btn-lg btn-block faq-wa',
        href: wa,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, [
        el('span', { html: icon('whatsapp', 22) }),
        el('span', { text: t('faq.waBtn') }),
        el('span', { 'class': 'sr-only', text: t('a11y.newWindow') })
      ]));
    }

    links = el('div', { 'class': 'faq-links' });
    if (phone) links.appendChild(linkRow('phone', telHref(phone), t('faq.callT'), phone, false));
    if (mail) links.appendChild(linkRow('mail', 'mailto:' + mail, t('faq.mailT'), mail, false));
    if (ig) links.appendChild(linkRow('instagram', socialHref('https://instagram.com/', ig), t('faq.igT'), socialLabel(ig), true));
    if (sc) links.appendChild(linkRow('snapchat', socialHref('https://snapchat.com/add/', sc), t('faq.scT'), socialLabel(sc), true));
    if (tk) links.appendChild(linkRow('tiktok', socialHref('https://tiktok.com/@', tk), t('faq.ttT'), socialLabel(tk), true));
    if (links.childNodes.length) dom.card.appendChild(links);

    info = el('div', { 'class': 'faq-info' });
    if (hours) info.appendChild(infoRow('clock', t('faq.hoursT'), hours));
    /* The city is only the base we ship from — this business has no shop
       address and nothing is ever collected in person. */
    if (city) info.appendChild(infoRow('globe', t('faq.cityT'), city));
    if (info.childNodes.length) dom.card.appendChild(info);

    if (!wa && !links.childNodes.length && !info.childNodes.length) {
      dom.card.appendChild(el('p', { 'class': 'hint', text: t('faq.noChannels') }));
    }
  }

  /* ==================================================================== */
  /* 8. the enquiry box                                                    */
  /* ==================================================================== */

  /* which channel the submit button will use, in order of preference */
  function channel() {
    if (waHref('x')) return 'wa';
    if (trim(sget('settings.email', ''))) return 'mail';
    if (trim(sget('settings.notifyEndpoint', ''))) return 'send';
    return '';
  }

  function renderAsk() {
    var cats = catList(), keep, i, c, ch;

    if (dom.askCat) {
      keep = dom.askCat.value;
      clear(dom.askCat);
      for (i = 0; i < cats.length; i++) {
        c = cats[i];
        if (!isObj(c) || !c.id) continue;
        dom.askCat.appendChild(el('option', { value: str(c.id), text: pick(c.name) || str(c.id) }));
      }
      dom.askCat.appendChild(el('option', { value: OTHER, text: t('faq.catOther') }));
      if (keep) {
        try { dom.askCat.value = keep; }
        catch (e) { /* the category was deleted meanwhile */ }
        if (!dom.askCat.value) dom.askCat.value = OTHER;
      }
    }

    ch = channel();
    if (dom.askSend) {
      clear(dom.askSend);
      dom.askSend.appendChild(el('span', {
        html: icon(ch === 'wa' ? 'whatsapp' : (ch === 'mail' ? 'mail' : 'arrow'), 18)
      }));
      dom.askSend.appendChild(el('span', {
        text: ch === 'wa' ? t('faq.askSend') : (ch === 'mail' ? t('faq.askSendMail') : t('faq.askSendOnly'))
      }));
      if (ch) {
        dom.askSend.removeAttribute('disabled');
        dom.askSend.removeAttribute('aria-disabled');
      } else {
        dom.askSend.setAttribute('disabled', '');
        dom.askSend.setAttribute('aria-disabled', 'true');
      }
    }
    if (dom.askNote) {
      dom.askNote.textContent = ch === 'wa' ? t('faq.askNote')
        : ch === 'mail' ? t('faq.askNoteMail')
          : ch === 'send' ? t('faq.askNoteSend')
            : t('faq.askNoteNone');
    }
  }

  function setErr(input, box, msg) {
    if (box) box.textContent = str(msg);
    if (!input) return;
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
  function clearErrs() {
    setErr(dom.askName, dom.askNameErr, '');
    setErr(dom.askQ, dom.askQErr, '');
  }

  function askCatLabel() {
    var v = dom.askCat ? str(dom.askCat.value) : '';
    if (!v || v === OTHER) return t('faq.catOther');
    return catName(v) || v;
  }

  function askMessage(name, question) {
    return [
      t('faq.askIntro'),
      t('faq.askLblName') + ': ' + name,
      t('faq.askLblCat') + ': ' + askCatLabel(),
      t('faq.askLblQ') + ':',
      question
    ].join('\n');
  }

  /* optional POST — never blocks and never breaks the flow */
  function notify(name, message) {
    var url = trim(sget('settings.notifyEndpoint', ''));
    var key = trim(sget('settings.notifyKey', ''));
    var payload, fd, k, json;
    if (!url || typeof fetch !== 'function') return;

    payload = {
      subject: t('faq.askSubject'),
      from_name: name,
      message: message
    };
    if (key) payload.access_key = key;

    json = /formspree/i.test(url) || /\.json(\?|#|$)/i.test(url);
    try {
      if (json || typeof FormData === 'undefined') {
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        })['catch'](function (e) { console.warn('[SN.Faq] enquiry notify failed', e); });
        return;
      }
      fd = new FormData();
      for (k in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, k)) fd.append(k, str(payload[k]));
      }
      fetch(url, { method: 'POST', body: fd })['catch'](function (e) {
        console.warn('[SN.Faq] enquiry notify failed', e);
      });
    } catch (e2) {
      console.warn('[SN.Faq] enquiry notify failed', e2);
    }
  }

  function submitAsk(ev) {
    var name = dom.askName ? trim(dom.askName.value) : '';
    var question = dom.askQ ? trim(dom.askQ.value) : '';
    var ch = channel();
    var bad = null, msg, href, mailTo;

    if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
    clearErrs();

    if (name.length < 2) {
      setErr(dom.askName, dom.askNameErr, t('faq.askErrName'));
      bad = bad || dom.askName;
    }
    if (question.length < 10) {
      setErr(dom.askQ, dom.askQErr, t('faq.askErrQ'));
      bad = bad || dom.askQ;
    }
    if (bad) { focusSoft(bad); return; }
    if (!ch) { toast(t('faq.askNoteNone'), 'err'); return; }

    msg = askMessage(name, question);

    if (ch === 'wa') {
      href = waHref(msg);
      /* opened synchronously inside the click so the popup blocker allows it */
      if (href) { try { window.open(href, '_blank', 'noopener'); } catch (e) { location.href = href; } }
      toast(t('faq.askOkWa'), 'ok');
    } else if (ch === 'mail') {
      mailTo = trim(sget('settings.email', ''));
      href = 'mailto:' + mailTo +
        '?subject=' + encodeURIComponent(t('faq.askSubject')) +
        '&body=' + encodeURIComponent(msg);
      try { window.open(href, '_blank', 'noopener'); } catch (e2) { location.href = href; }
      toast(t('faq.askOkMail'), 'ok');
    } else {
      toast(t('faq.askOkSent'), 'ok');
    }

    notify(name, msg);

    if (dom.askQ) dom.askQ.value = '';
  }

  /* prefill the box from a question the visitor was reading */
  function askAbout(it) {
    var v;
    if (!dom.askQ) return;
    if (dom.askCat && it && it.cat) {
      try { dom.askCat.value = str(it.cat); }
      catch (e) { /* ignore */ }
      if (!dom.askCat.value) dom.askCat.value = OTHER;
    }
    v = t('faq.aboutQ', { q: stripQ(pick(it ? it.q : '')) }) + '\n\n';
    dom.askQ.value = v;
    clearErrs();
    scrollTo(dom.ask);
    focusSoft(dom.askQ);
    try { dom.askQ.setSelectionRange(v.length, v.length); }
    catch (e2) { /* ignore */ }
  }

  /* ==================================================================== */
  /* 9. render + wiring                                                    */
  /* ==================================================================== */

  function renderJump() {
    var items = [
      { href: '#faq-guide', key: 'faq.jumpGuide', ico: 'hand' },
      { href: '#faq-contact', key: 'faq.jumpContact', ico: 'phone' },
      { href: '#faq-ask', key: 'faq.jumpAsk', ico: 'mail' }
    ], i;
    if (!dom.jump) return;
    clear(dom.jump);
    for (i = 0; i < items.length; i++) {
      if (items[i].href === '#faq-guide' && !guideOn) continue;
      dom.jump.appendChild(el('a', { 'class': 'chip', href: items[i].href }, [
        el('span', { html: icon(items[i].ico, 15) }),
        el('span', { text: t(items[i].key) })
      ]));
    }
  }

  function render() {
    renderTabs();
    renderCount();
    renderList();
    renderGuide();
    renderContact();
    renderAsk();
    if (SN.I18n && typeof SN.I18n.apply === 'function') SN.I18n.apply(dom.main || document);
  }

  function onSearch() {
    st.q = dom.q ? trim(dom.q.value) : '';
    show(dom.qClear, !!st.q);
    renderTabs();
    renderCount();
    renderList();
  }

  function resetFilters() {
    st.q = '';
    st.cat = ALL;
    if (dom.q) dom.q.value = '';
    show(dom.qClear, false);
    render();
    focusSoft(dom.q);
  }

  function hashId() {
    var h = str(location.hash).replace(/^#/, '');
    try { h = decodeURIComponent(h); }
    catch (e) { /* keep the raw value */ }
    return h;
  }

  /* Links elsewhere on the site point at two shipped questions by id
     (links.html → the size question, the checkout → changing or cancelling
     an order). Once the owner deletes or rewrites those questions the ids
     are gone, so each one maps to the word that finds whatever answers it
     now. */
  var GONE = { 'fq-know-size': 'مقاس', 'fq-change-cancel': 'إلغاء' };

  function sectionAnchor(id) {
    var node = byId(id);
    if (!node) return false;
    while (node && node.nodeType === 1) {
      if (node.hasAttribute('hidden')) return false;   /* e.g. the guide, hidden */
      node = node.parentNode;
    }
    return true;
  }

  function openFromHash(moveFocus) {
    var id = hashId();
    if (!id) return;
    if (findFaq(id)) { reveal(id, moveFocus); return; }
    if (sectionAnchor(id)) return;   /* #faq-guide, #faq-contact … the browser handles */
    landOnList(GONE[id] || '');
  }

  /* A question link that no longer leads anywhere: search for its word when
     we know one and it finds something, otherwise just the whole list — the
     visitor lands on the questions either way, never on a dead anchor. */
  function landOnList(word) {
    var hits;
    st.open = '';
    st.cat = ALL;
    st.q = trim(word);
    if (st.q && !filtered().length) st.q = '';
    if (dom.q) dom.q.value = st.q;
    show(dom.qClear, !!st.q);
    render();
    hits = filtered();
    if (st.q && hits.length === 1) { reveal(str(hits[0].id), false); return; }
    scrollTo(dom.questions);
  }

  /* faq.html?q=مقاس opens with that search already typed */
  function queryWord() {
    var m = /[?&]q=([^&#]*)/.exec(str(location.search));
    var v = m ? m[1].replace(/\+/g, ' ') : '';
    try { v = decodeURIComponent(v); }
    catch (e) { /* keep the raw value */ }
    return trim(v);
  }

  function wire() {
    var onType = debounce(onSearch, 120);

    if (dom.q) {
      dom.q.addEventListener('input', onType, false);
      dom.q.addEventListener('search', onSearch, false);
      dom.q.addEventListener('keydown', function (ev) {
        if (ev && ev.key === 'Escape' && dom.q.value) {
          ev.preventDefault();
          resetFilters();
        }
      }, false);
    }
    if (dom.qClear) dom.qClear.addEventListener('click', resetFilters, false);
    if (dom.reset) dom.reset.addEventListener('click', resetFilters, false);
    if (dom.askForm) dom.askForm.addEventListener('submit', submitAsk, false);
    if (dom.askName) {
      dom.askName.addEventListener('input', function () { setErr(dom.askName, dom.askNameErr, ''); }, false);
    }
    if (dom.askQ) {
      dom.askQ.addEventListener('input', function () { setErr(dom.askQ, dom.askQErr, ''); }, false);
    }

    window.addEventListener('hashchange', function () { openFromHash(true); }, false);
  }

  function paintStaticIcons() {
    if (dom.searchIco) dom.searchIco.innerHTML = icon('search', 20);
    if (dom.emptyIco) dom.emptyIco.innerHTML = icon('search', 40);
    if (dom.askIco) dom.askIco.innerHTML = icon('mail', 22);
    if (dom.qClear && !dom.qClear.innerHTML) dom.qClear.innerHTML = icon('close', 18);
  }

  function start() {
    if (inited) return;
    inited = true;

    if (SN.UI && typeof SN.UI.boot === 'function') SN.UI.boot('faq');

    cacheDom();
    paintStaticIcons();
    renderJump();
    wire();

    if (SN.Store && typeof SN.Store.ready === 'function') SN.Store.ready(first);
    else first();
  }

  function first() {
    var word = queryWord();
    if (word) {
      st.q = word;
      if (dom.q) dom.q.value = word;
      show(dom.qClear, true);
    }
    render();
    if (hashId()) openFromHash(false);
    else if (word) scrollTo(dom.questions);

    if (SN.I18n && typeof SN.I18n.onChange === 'function') {
      SN.I18n.onChange(function () {
        HAY = {};              /* cached haystacks are language-agnostic, but ids may have changed */
        renderJump();
        render();
      });
    }

    if (SN.Store && typeof SN.Store.subscribe === 'function') {
      try {
        SN.Store.subscribe(debounce(function () {
          if (st.open && !findFaq(st.open)) st.open = '';
          pruneFigs();
          render();
        }, 90));
      } catch (e) { console.warn('[SN.Faq] could not subscribe to the store', e); }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, false);
  } else {
    start();
  }

  /* ==================================================================== */
  /* 10. export                                                            */
  /* ==================================================================== */

  SN.Faq = {
    init: start,
    render: render,
    open: function (id) { return reveal(id, true); },
    search: function (q) {
      st.q = trim(q);
      if (dom.q) dom.q.value = st.q;
      show(dom.qClear, !!st.q);
      render();
      return st.q;
    },
    state: st
  };
})();
