/*! Shosh Nail — assets/js/quiz.js
 *  SN.Quiz : the style quiz (owner: HOME)
 *  Contract: SPEC.md sections 4, 6, 9, 10, 11, 12. Attaches exactly one
 *  property: window.SN.Quiz
 *
 *  One-tap questions that read her TASTE — skin tone, occasion, the owner's
 *  lists, mood, colour, kind of set, season, attention, metal, shape, length,
 *  budget — and at the end up to three of the OWNER'S OWN sets, each with a
 *  sentence saying why it suits her. The site never makes a set up: when
 *  nothing matches, it offers the closest of hers and says so, and with no
 *  sets at all it invites her to message the shop. A question appears only
 *  when at least one of her active sets can answer it.
 *
 *  Design notes
 *  ------------
 *  · The whole thing rides inside SN.UI.modal, so focus trapping, ESC, the
 *    backdrop and the scroll lock all come from the shell rather than from a
 *    second implementation of them here.
 *  · Option tiles are her photos, colour swatches, icons or plain text —
 *    never a drawn nail.
 *  · Nothing here is random: the same answers always give the same sets, so
 *    a shared link and a retake agree.
 *  · Every store lookup falls back: an owner who deletes half the palette in
 *    admin.html gets a plainer result, never a broken one.
 *  · The result card carries the shop name and handle, because the screenshot
 *    of it is the cheapest advertising this shop will ever get.
 *
 *  Deep link: `#quiz` on any page that loads this file.
 */
(function () {
  'use strict';

  var SN = (window.SN = window.SN || {});

  /* ==================================================================== */
  /* 0. dictionary — namespace `quiz`                                      */
  /* ==================================================================== */

  var DICT = {
    /* Iraqi Arabic — only the keys whose wording differs from `ar`; the
       runtime falls back iq → ar → en, so everything else is inherited.
       The set names live in `ar` alone on purpose. */
    iq: {
      quiz: {
        cardTitle: 'خلّي نطلّع لك طقمك أنتِ',
        cardText: 'أسئلة قليلة، ضغطة وحدة لكل سؤال — وبالأخير تطلع لك أطقمنا اللي تناسب ذوقك. اطلبي اللي يعجبك مثل ما هو.',
        cardCta: 'ابدي الاختبار',
        cardTease: 'ابدي من هنا — ياهو اللون الأقرب لبشرتك؟',

        h1: 'أول شي نعرفه: وين راح تلبسينه؟',
        occasion: {
          holiday: 'سفر وعطلة'
        },

        q2: 'شنو الإحساس اللي يشبهك؟',

        q3: 'شنو اللون اللي دايمًا ترجعين له؟',
        h3: 'اللي تشوفين نفسك تختارينه كل مرة، بدون ما تفكرين.',

        h4: 'كل فصل له درجات تليق بيه — وهاي درجاتك أنتِ.',

        q5: 'شكد تحبين يدك تلفت النظر؟',
        h5: 'من هدوء واثق، إلى يد محد يعدّيها.',
        attention: {
          max: 'محد يعدّيها'
        },

        q6: 'ذهبي لو فضي؟',

        q7: 'شنو الطول المريح لك؟',
        h7: 'الطول أكثر شي يغيّر شكل يدك.',

        waitTitle: 'هسة ندوّر لك على طقمك…',

        variants: {
          calmer: 'أهدى شوية',
          bolder: 'أجرأ شوية'
        },
        variantsHint: 'قلّبي بينها — كلها مختارة من أطقمنا حسب أجوبتك.',

        whyOcc: {
          daily: 'طقم يمشي وياك من الدوام لحد آخر اليوم'
        },
        whyAtt: {
          soft: 'وظفر واحد مميّز يكفي حتى يلفت النظر',
          clear: 'وزخرفة على ظفرين، واضحة بدون مبالغة',
          max: 'ومزيّن على طول اليد، لأنك مو جاية تمرّين مرور الكرام'
        },

        qPattern: 'شنو نوع الطقم اللي تحبينه؟',
        hPattern: 'اختاري النوع الأقرب لذوقك… أو خليها علينا.',
        qShape: 'شنو شكل الظفر اللي يعجبك؟',
        hShape: 'الشكل النهائي نتفق عليه بالمحادثة، بس خبرينا شنو يعجبك.',
        anyOf: 'ما يفرق عندي — اختاري إنتي',
        whyPattern: 'بالنوع اللي طلبتيه',
        whyShape: 'وبالشكل اللي يعجبك',
        qGroup: 'أي قائمة من قوائمنا أقرب إلك؟',
        hGroup: 'اختاري القائمة الأقرب لمناسبتك، أو خليها مفتوحة.',
        groupAny: 'ما أحدد — عرضيلي كلشي',
        whyGroup: 'من قائمة {g}',
        qBudget: 'شكد ميزانيتك للطقم؟',
        hBudget: 'ماكو شي نعرضه لك فوق اللي حددتيه. وتقدرين ما تحددين.',
        qSkin: 'شنو لون بشرتك؟',
        hSkin: 'حتى نختار لك درجة تليق عليك، ونعرف مقاسك وقت التجهيز.',

        priceNote: 'السعر بدون التوصيل — أجرة التوصيل تنضاف حسب محافظتك لمن تطلبين.',
        order: 'اطلبيه هسة',
        again: 'عيدي الاختبار',
        editHint: 'تحبين تغيّرين شي بهذا الطقم؟ لون، طول، شكل — اكتبيه بالملاحظات وقت الطلب ونضبطه لك.',
        sizeHint: 'المقاس نتفق عليه بالمحادثة بعد الطلب — مو لازم تعرفينه هسة.',
        founding: 'عرض أول {n} زبونة: مهما كان سعر طلبك، ينضاف لطلبك طقم مجاني بقيمة {g}.',
        shareText: 'طلع لي طقم «{name}» من اختبار الستايل مال {brand} 💅 سوّي الاختبار وشوفي طقمك:',
        shareCopied: 'انتسخ الرابط — الصقيه بالستوري مالتك',

        savedNote: 'هذا الطقم جاهز للطلب — اكتبي بالملاحظات أي تعديل تريدينه.',
        failText: 'جرّبي مرة ثانية، أو اختاري تصميم جاهز من المتجر.'
      }
    },

    ar: {
      quiz: {
        /* the entry point on the home page */
        cardEyebrow: 'اختبار الستايل',
        cardTitle: 'دعينا نجد لك طقمك أنتِ',
        cardText: 'أسئلة قليلة، ضغطة واحدة لكل سؤال — وفي النهاية تظهر لك أطقمنا التي تناسب ذوقك. اطلبي ما يعجبك كما هو.',
        cardCta: 'ابدئي الاختبار',
        cardNote: 'أقل من دقيقة · بدون كتابة',
        cardProof: 'نتيجة على ذوقك أنتِ',
        cardTease: 'ابدئي من هنا — أي لون أقرب لبشرتك؟',

        /* the shell */
        title: 'اختبار الستايل',
        stepN: 'سؤال {n} من {total}',
        progress: 'تقدّمك في الاختبار',
        back: 'رجوع',
        close: 'إغلاق الاختبار',
        picked: 'اخترتِ: {name}',

        /* Q1 — occasion */
        q1: 'الطقم لأي مناسبة؟',
        h1: 'أول ما نعرفه: أين سترتدينه؟',
        occasion: {
          wedding: 'عرس أو خطوبة',
          daily: 'دوام ويوميات',
          party: 'سهرة ونزهة',
          holiday: 'سفر وإجازة'
        },

        /* Q2 — the mood */
        q2: 'ما الإحساس الذي يشبهك؟',
        h2: 'من هنا نعرف الطابع الأقرب إليك.',
        vibe: {
          calm: 'هادئ ونظيف',
          romantic: 'ناعم ورومانسي',
          bold: 'جريء وواضح',
          glam: 'لامع وفخم'
        },

        /* Q3 — the colour she keeps coming back to */
        q3: 'ما اللون الذي ترجعين إليه دائماً؟',
        h3: 'الذي تجدين نفسك تختارينه كل مرة، من دون تفكير.',
        palette: {
          nude: 'نيود وبيج',
          pink: 'وردي',
          red: 'أحمر ومرجاني',
          dark: 'غامق وعميق',
          pastel: 'باستيل هادئ',
          bright: 'ألوان جريئة'
        },

        /* Q4 — season */
        q4: 'ما الجو الذي تودّين أن يشبهه طقمك؟',
        h4: 'كل فصل له درجات تليق به — وهذه درجاتك أنتِ.',
        season: {
          spring: 'ربيع',
          summer: 'صيف',
          autumn: 'خريف',
          winter: 'شتاء'
        },
        seasonOf: {
          spring: 'الربيع',
          summer: 'الصيف',
          autumn: 'الخريف',
          winter: 'الشتاء'
        },

        /* Q5 — how much attention */
        q5: 'إلى أي مدى تودّين أن تلفت يدك النظر؟',
        h5: 'من هدوء واثق، إلى يد لا يمكن تجاهلها.',
        attention: {
          quiet: 'بهدوء',
          soft: 'لفتة خفيفة',
          clear: 'واضحة',
          max: 'لا تخطئها عين'
        },

        /* Q6 — gold or silver */
        q6: 'ذهبي أم فضي؟',
        h6: 'نفس السؤال الذي تسألينه لنفسك قبل أن تختاري إكسسوارك.',
        metal: {
          gold: 'ذهبي',
          silver: 'فضي',
          none: 'بدون معدن'
        },

        /* Q7 — length */
        q7: 'ما الطول المريح لك؟',
        h7: 'الطول أكثر شيء يغيّر شكل يدك.',

        /* the anticipation beat */
        waitTitle: 'نبحث لك عن طقمك…',
        waitText: 'نختار لك من أطقمنا ما يناسب ذوقك.',

        /* the reveal */
        doneTitle: 'طقمك جاهز',
        previewAlt: 'معاينة طقم «{name}»',
        subLine: '{occ} · {season} · {len}',
        variants: {
          calmer: 'أهدأ قليلاً',
          match: 'المختار لك',
          bolder: 'أجرأ قليلاً'
        },
        variantsHint: 'قلّبي بينها — كلها مختارة من أطقمنا حسب إجاباتك.',
        variantsLabel: 'أطقم مختارة لك',

        /* why it suits her — three halves that can never describe a set she
           is not looking at, because each one is read off the built design */
        why: '{occ} — {col}، {att}.',
        whyOcc: {
          wedding: 'طقم مضبوط لعرس أو خطوبة',
          daily: 'طقم يرافقك من الدوام حتى آخر اليوم',
          party: 'طقم للسهرة وما بعدها',
          holiday: 'طقم خفيف للسفر والصور'
        },
        whyCol: 'بدرجة {c} تليق بجو {s}',
        whyColPlain: 'بدرجة {c}',
        whyAtt: {
          quiet: 'ونظيف بدون زخرفة، هدوء واثق',
          soft: 'وظفر واحد مميّز يكفي للفت النظر',
          clear: 'وزخرفة على ظفرين، واضحة من دون مبالغة',
          max: 'ومزيّن على طول اليد، لأنكِ لم تأتِ لتمرّي مرور الكرام'
        },

        /* nail by nail */
        recipeTitle: 'طقمك ظفر ظفر',
        recipeNote: 'واليد الثانية بنفس الترتيب.',
        charmsN: '{n} زينة',
        plain: 'سادة',

        /* skin */
        qPattern: 'ما نوع الطقم الذي تحبينه؟',
        hPattern: 'اختاري النوع الأقرب لذوقك… أو اتركي الاختيار لنا.',
        qShape: 'ما شكل الظفر الذي يعجبك؟',
        hShape: 'الشكل النهائي نتفق عليه في المحادثة، لكن أخبرينا ما يعجبك.',
        anyOf: 'لا فرق عندي — اختاري أنتِ',
        whyPattern: 'بالنوع الذي طلبتِه',
        whyShape: 'وبالشكل الذي يعجبك',
        qGroup: 'أي قائمة من قوائمنا أقرب إليك؟',
        hGroup: 'اختاري القائمة الأقرب لمناسبتك، أو اتركي الخيار مفتوحًا.',
        groupAny: 'لا أحدد — اعرضي لي كل شيء',
        whyGroup: 'من قائمة {g}',
        noPhoto: 'الصورة قريبًا',
        emptyTitle: 'أطقمنا في الطريق',
        emptyText: 'لم نضع أطقمنا في المتجر بعد. أرسلي لنا ما يعجبك — صورة من بنترست أو فكرة — ونصنعه لكِ على مقاسك.',
        emptyWa: 'راسلينا على واتساب',
        emptyIg: 'شاهدي أعمالنا على إنستغرام',
        emptyMsg: 'مرحبًا، أريد طقم أظافر مركّبة وأحب أن أرسل لكم فكرتي.',
        closestTitle: 'الأقرب لذوقكِ',
        closestLead: 'لا يوجد عندنا طقم يطابق كل إجاباتكِ، وهذه أقرب أطقمنا إليها. وإن أردتِ طقمًا كما في بالكِ تمامًا، راسلينا ونصنعه لكِ.',
        closestOver: 'أطقمنا كلها أعلى من الميزانية التي اخترتِها، وهذه أقربها إلى ذوقكِ. وإن أردتِ، راسلينا ونتفق على ما يناسبكِ.',
        closestWa: 'اطلبي طقمًا حسب ذوقكِ',
        closestMsg: 'مرحبًا، أجريت اختبار الستايل وأريد طقمًا حسب ذوقي.',
        sharedGone: 'الطقم الذي في هذا الرابط لم يعد متوفرًا، وهذه أقرب أطقمنا لنفس الإجابات.',
        qBudget: 'ما ميزانيتك للطقم؟',
        hBudget: 'لا نعرض لك شيئاً فوق ما حدّدتِه. ويمكنكِ ألا تحدّدي.',
        vNear1: 'الأقرب لك',
        vNear2: 'قريب منك',
        vNear3: 'خيار ثالث',
        whyLead: 'اخترناه لك لأنه',
        whyPalette: 'بعائلة الألوان التي اخترتِها',
        whySeason: 'يليق بجو {s}',
        whyLength: 'بالطول الذي طلبتِه',
        whyOccasion: 'يصلح لـ{o}',
        whyVibe: 'وطابعه {v}',
        whySkin: 'ويليق على درجة بشرتك',
        qSkin: 'ما لون بشرتك؟',
        hSkin: 'لنختار لك درجة تليق بكِ، ونعرف مقاسك وقت التجهيز.',

        /* price + actions */
        priceFrom: 'يبدأ من {p}',
        priceNote: 'السعر بدون التوصيل — أجرة التوصيل تُضاف حسب محافظتك عند الطلب.',
        order: 'اطلبيه الآن',
        again: 'أعيدي الاختبار',
        editHint: 'تودّين تغيير شيء في هذا الطقم؟ لون، طول، شكل — اكتبيه في الملاحظات عند الطلب ونضبطه لك.',
        sizeHint: 'المقاس نتفق عليه بالمحادثة بعد الطلب — لا تحتاجين إلى معرفته الآن.',
        founding: 'عرض أول {n} زبونة: مهما كان سعر طلبك، يُضاف لطلبك طقم مجاني بقيمة {g}.',
        share: 'شاركيه',
        saveImg: 'احفظي الصورة',
        shareTitle: 'طقمي من شوش نيل',
        shareText: 'ظهر لي طقم «{name}» من اختبار الستايل في {brand} 💅 جرّبي الاختبار وشاهدي طقمك:',
        shareCopied: 'تم نسخ الرابط — الصقيه في ستوريتك',
        shareFail: 'لم نتمكن من نسخ الرابط',
        savedImg: 'تم حفظ الصورة',
        saveFail: 'لم نتمكن من حفظ الصورة',
        savingImg: 'نجهّز الصورة…',
        yourPicks: 'اختياراتك',

        /* short chips */
        chipOccasion: {
          wedding: 'للعرس',
          daily: 'لليوميات',
          party: 'للسهرة',
          holiday: 'للسفر'
        },
        chipAttention: {
          quiet: 'بدون زخرفة',
          soft: 'ظفر مميّز',
          clear: 'ظفرين مزيّنين',
          max: 'مزيّن بالكامل'
        },
        chipMetal: {
          gold: 'لمسة ذهب',
          silver: 'لمسة فضة',
          none: 'بدون معدن'
        },

        savedNote: 'هذا الطقم جاهز للطلب — اكتبي في الملاحظات أي تعديل تريدينه.',
        failTitle: 'لم نتمكن من عرض النتيجة',
        failText: 'حاولي مرة أخرى، أو اختاري تصميماً جاهزاً من المتجر.',
        failCta: 'حاولي مرة أخرى'
      }
    },

    en: {
      quiz: {
        cardEyebrow: 'Style quiz',
        cardTitle: 'Let us find the set that is yours',
        cardText: 'A few questions, one tap each — and at the end, the sets from our collection that suit your taste. Order the one you like as it is.',
        cardCta: 'Take the quiz',
        cardNote: 'Under a minute · nothing to type',
        cardProof: 'Picked to suit your answers',
        cardTease: 'Start here — which is closest to your skin tone?',

        title: 'Style quiz',
        stepN: 'Question {n} of {total}',
        progress: 'Quiz progress',
        back: 'Back',
        close: 'Close the quiz',
        picked: 'Picked: {name}',

        q1: 'What is the set for?',
        h1: 'First things first: where will you be wearing it?',
        occasion: {
          wedding: 'A wedding or engagement',
          daily: 'Work and everyday',
          party: 'A night out',
          holiday: 'Travel and holidays'
        },

        q2: 'Which mood feels like you?',
        h2: 'This tells us which mood to look for in our sets.',
        vibe: {
          calm: 'Clean and calm',
          romantic: 'Soft and romantic',
          bold: 'Bold and loud',
          glam: 'Glossy and glam'
        },

        q3: 'Which colour do you keep coming back to?',
        h3: 'The one you reach for every time without thinking.',
        palette: {
          nude: 'Nudes and beige',
          pink: 'Pinks',
          red: 'Reds and coral',
          dark: 'Deep and dark',
          pastel: 'Quiet pastels',
          bright: 'Bright and loud'
        },

        q4: 'Which season should it feel like?',
        h4: 'Every season has its shades — these are yours.',
        season: {
          spring: 'Spring',
          summer: 'Summer',
          autumn: 'Autumn',
          winter: 'Winter'
        },
        seasonOf: {
          spring: 'spring',
          summer: 'summer',
          autumn: 'autumn',
          winter: 'winter'
        },

        q5: 'How much attention should your hands get?',
        h5: 'From quietly confident, to a hand nobody walks past.',
        attention: {
          quiet: 'Quietly',
          soft: 'A small moment',
          clear: 'Clearly',
          max: 'Nobody walks past'
        },

        q6: 'Gold or silver?',
        h6: 'The same question you ask yourself before you pick your jewellery.',
        metal: {
          gold: 'Gold',
          silver: 'Silver',
          none: 'No metal'
        },

        q7: 'Which length is comfortable for you?',
        h7: 'Length changes the look of your hand more than anything else.',

        waitTitle: 'Finding your set…',
        waitText: 'Picking the sets from our collection that suit you.',

        doneTitle: 'Your set is ready',
        previewAlt: 'Preview of the “{name}” set',
        subLine: '{occ} · {season} · {len}',
        variants: {
          calmer: 'A little softer',
          match: 'Your match',
          bolder: 'A little bolder'
        },
        variantsHint: 'Flip between them — each one picked from our sets for your answers.',
        variantsLabel: 'Sets picked for you',

        why: '{occ} — {col}, {att}.',
        whyOcc: {
          wedding: 'A set made for a wedding or an engagement',
          daily: 'A set that goes from the desk to the end of the day',
          party: 'A set for the night out and whatever follows it',
          holiday: 'A light set for travelling and photographs'
        },
        whyCol: 'in {c}, a shade that belongs to {s}',
        whyColPlain: 'in {c}',
        whyAtt: {
          quiet: 'and left bare — quiet confidence',
          soft: 'with one accent nail, which is all the moment needs',
          clear: 'with two nails dressed, clear and never too much',
          max: 'and decorated across the whole hand, because you did not come to go unnoticed'
        },

        recipeTitle: 'Your set, nail by nail',
        recipeNote: 'The other hand is exactly the same.',
        charmsN: '{n} charms',
        plain: 'Plain',

        qPattern: 'What kind of set do you like?',
        hPattern: 'Pick the kind closest to your taste… or leave it to us.',
        qShape: 'Which nail shape do you like?',
        hShape: 'We agree the final shape in chat, but tell us what you like.',
        anyOf: 'No preference — you choose',
        whyPattern: 'the kind you asked for',
        whyShape: 'and the shape you like',
        qGroup: 'Which of our lists is closest to you?',
        hGroup: 'Pick the list nearest your occasion, or leave it open.',
        groupAny: 'No preference — show me everything',
        whyGroup: 'from your {g} list',
        noPhoto: 'Photo coming soon',
        emptyTitle: 'Our sets are on their way',
        emptyText: 'Our sets are not in the shop yet. Send us what you like — a Pinterest photo or an idea — and we will make it to your size.',
        emptyWa: 'Message us on WhatsApp',
        emptyIg: 'See our work on Instagram',
        emptyMsg: 'Hi, I would like a press-on set and would love to send you my idea.',
        closestTitle: 'Closest to your taste',
        closestLead: 'We do not have a set that matches every answer, so these are our closest. If you want one exactly as you imagine it, message us and we will make it.',
        closestOver: 'All our sets are above the budget you chose; these are the closest to your taste. Message us if you would like to agree on something that suits you.',
        closestWa: 'Order one to your taste',
        closestMsg: 'Hi, I took the style quiz and would like a set to my taste.',
        sharedGone: 'The set in this link is no longer available — here are our closest sets for the same answers.',
        qBudget: 'What is your budget for a set?',
        hBudget: 'We will not show you anything above it. You can leave it open.',
        vNear1: 'Closest to you',
        vNear2: 'Also close',
        vNear3: 'Third option',
        whyLead: 'We picked it because it is',
        whyPalette: 'in the colour family you chose',
        whySeason: 'right for {s}',
        whyLength: 'in the length you asked for',
        whyOccasion: 'made for {o}',
        whyVibe: 'and its feel is {v}',
        whySkin: 'and it suits your skin tone',
        qSkin: 'What is your skin tone?',
        hSkin: 'So we pick a shade that suits you, and know it when we make your set.',

        priceFrom: 'From {p}',
        priceNote: 'Price without delivery — the courier fee is added by governorate at checkout.',
        order: 'Order it now',
        again: 'Retake the quiz',
        editHint: 'Want to change something on this set? Colour, length, shape — write it in the notes when you order and we adjust it.',
        sizeHint: 'Your size is agreed in chat after you order — nothing to know now.',
        founding: 'First {n} customers: whatever your order costs, a free set worth {g} is added to it.',
        share: 'Share it',
        saveImg: 'Save the picture',
        shareTitle: 'My Shosh Nail set',
        shareText: 'The style quiz picked me the “{name}” set at {brand} 💅 Take it and see yours:',
        shareCopied: 'Link copied — paste it into your story',
        shareFail: 'We could not copy the link',
        savedImg: 'Picture saved',
        saveFail: 'We could not save the picture',
        savingImg: 'Preparing the picture…',
        yourPicks: 'Your picks',

        chipOccasion: {
          wedding: 'For a wedding',
          daily: 'Everyday',
          party: 'For a night out',
          holiday: 'For travel'
        },
        chipAttention: {
          quiet: 'Bare',
          soft: 'One accent nail',
          clear: 'Two nails dressed',
          max: 'Fully decorated'
        },
        chipMetal: {
          gold: 'A touch of gold',
          silver: 'A touch of silver',
          none: 'No metal'
        },

        savedNote: 'This set is ready to order — write any change you want in the notes.',
        failTitle: 'We could not show your result',
        failText: 'Try once more, or pick a ready design from the shop.',
        failCta: 'Try again'
      }
    }
  };

  if (SN.I18n && typeof SN.I18n.extend === 'function') SN.I18n.extend(DICT);

  /* ==================================================================== */
  /* 1. tiny private helpers                                               */
  /* ==================================================================== */

  var HOLD = 210;      /* how long the pick flourish is allowed to be seen  */
  var WAIT = 820;      /* the anticipation beat before the reveal           */

  function ui() { return SN.UI || null; }

  function el(tag, attrs, kids) {
    var u = ui();
    if (u && typeof u.el === 'function') return u.el(tag, attrs, kids);
    return document.createElement(typeof tag === 'string' && tag ? tag : 'div');
  }

  function icon(name, size) {
    var u = ui();
    return (u && typeof u.icon === 'function') ? u.icon(name, size) : '';
  }

  function t(key, vars) {
    return (SN.I18n && typeof SN.I18n.t === 'function') ? SN.I18n.t(key, vars) : String(key || '');
  }

  function pick(tobj) {
    if (SN.I18n && typeof SN.I18n.pick === 'function') return SN.I18n.pick(tobj);
    if (typeof tobj === 'string') return tobj;
    if (tobj && typeof tobj === 'object') return String(tobj.ar || tobj.en || '');
    return '';
  }

  function money(n) {
    if (SN.I18n && typeof SN.I18n.money === 'function') return SN.I18n.money(n);
    return String(n);
  }

  function num(n) {
    if (SN.I18n && typeof SN.I18n.num === 'function') return SN.I18n.num(n);
    return String(n);
  }

  function list(key) {
    if (SN.Store && typeof SN.Store.list === 'function') {
      try { return SN.Store.list(key) || []; }
      catch (e) { return []; }
    }
    return [];
  }

  function cfg(path, fallback) {
    if (SN.Store && typeof SN.Store.get === 'function') {
      try { return SN.Store.get(path, fallback); }
      catch (e) { return fallback; }
    }
    return fallback;
  }

  function findIn(key, id) {
    var arr = list(key), i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] && String(arr[i].id) === String(id)) return arr[i];
    }
    return null;
  }

  function fill(node, kids) {
    var i;
    if (!node) return null;
    while (node.firstChild) node.removeChild(node.firstChild);
    if (!kids) return node;
    if (!Array.isArray(kids)) kids = [kids];
    for (i = 0; i < kids.length; i++) if (kids[i]) node.appendChild(kids[i]);
    return node;
  }

  function reducedMotion() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  function toast(text, kind) {
    var u = ui();
    if (u && typeof u.toast === 'function') u.toast(text, kind || 'info');
  }

  /* ==================================================================== */
  /* 2. the answers                                                        */
  /*                                                                       */
  /*    What each answer means: its colours, its occasion's defaults. Every */
  /*    id below is looked up in the store first and only falls back to a   */
  /*    literal when the owner has removed it, so the quiz keeps working on */
  /*    an edited catalogue.                                                */
  /* ==================================================================== */

  /* what the set is FOR: it decides the accent nail's artwork and the family
     of little things that sit on top of it */
  var OCCASIONS = [
    {
      id: 'wedding', ico: 'gem',
      accents: ['lace', 'glazed', 'french'],
      charms: ['ch-pearl', 'ch-teardrop', 'ch-blossom', 'ch-round'],
      hint: { vibe: 'romantic', palette: 'pink', season: 'spring', attention: 'clear', metal: 'gold' }
    },
    {
      id: 'daily', ico: 'clock',
      accents: ['french', 'frenchDeep', 'half'],
      charms: ['ch-stud', 'ch-caviar', 'ch-round', 'ch-pearl'],
      hint: { vibe: 'calm', palette: 'nude', season: 'spring', attention: 'soft', metal: 'gold' }
    },
    {
      id: 'party', ico: 'sparkle',
      accents: ['tipsGlitter', 'aura', 'chrome'],
      charms: ['ch-star', 'ch-star-3d', 'ch-moon', 'ch-round'],
      hint: { vibe: 'bold', palette: 'dark', season: 'winter', attention: 'clear', metal: 'silver' }
    },
    {
      id: 'holiday', ico: 'sun',
      accents: ['dots', 'ombre', 'french'],
      charms: ['ch-daisy', 'ch-blossom', 'ch-butterfly', 'ch-heart'],
      hint: { vibe: 'romantic', palette: 'pastel', season: 'summer', attention: 'clear', metal: 'gold' }
    }
  ];

  /* the mood: the silhouette, the way the surface catches light, and the
     pattern the extra nails wear */
  var VIBES = [
    { id: 'calm', shapes: ['almond', 'squoval', 'oval'], finish: 'gloss', alt: 'matte', fillers: ['french', 'half'] },
    { id: 'romantic', shapes: ['almond', 'oval', 'round'], finish: 'gloss', alt: 'velvet', fillers: ['ombre', 'glazed'] },
    { id: 'bold', shapes: ['coffin', 'square', 'squoval'], finish: 'gloss', alt: 'matte', fillers: ['diagonal', 'half'] },
    { id: 'glam', shapes: ['stiletto', 'coffin', 'almond'], finish: 'chrome', alt: 'glitter', fillers: ['chrome', 'aura'] }
  ];

  /* the colour she keeps coming back to, read through the season she picked.
     Each cell is [base, accent, third] — real catalogue ids, so every result
     is orderable; the groups and the literal hexes are the safety nets. */
  var PALETTES = [
    {
      id: 'nude', groups: ['nude', 'neutral'], fb: ['#E9C2C0', '#FAF3EE', '#C08A5E'],
      s: {
        spring: ['c-nude-rose', 'c-milk', 'c-blush'],
        summer: ['c-sand', 'c-caramel', 'c-nude-warm'],
        autumn: ['c-latte', 'c-mocha', 'c-toffee'],
        winter: ['c-porcelain', 'c-taupe', 'c-greige']
      }
    },
    {
      id: 'pink', groups: ['pink', 'pastel'], fb: ['#F4CBD2', '#E88AA5', '#EDE4E9'],
      s: {
        spring: ['c-ballet', 'c-peony', 'c-blush'],
        summer: ['c-bubblegum', 'c-hot-pink', 'c-peach'],
        autumn: ['c-dusty-rose', 'c-wine', 'c-toffee'],
        winter: ['c-blush', 'c-fuchsia', 'c-pearl']
      }
    },
    {
      id: 'red', groups: ['red', 'bold'], fb: ['#C2192F', '#EDE4E9', '#F3705A'],
      s: {
        spring: ['c-coral', 'c-milk', 'c-peach'],
        summer: ['c-scarlet', 'c-tangerine', 'c-coral'],
        autumn: ['c-brick', 'c-caramel', 'c-mocha'],
        winter: ['c-cherry', 'c-pearl', 'c-ruby']
      }
    },
    {
      id: 'dark', groups: ['dark'], fb: ['#17131A', '#EDE4E9', '#4A1F3D'],
      s: {
        spring: ['c-deep-plum', 'c-lilac', 'c-dusty-rose'],
        summer: ['c-navy', 'c-sky', 'c-pearl'],
        autumn: ['c-forest', 'c-caramel', 'c-espresso'],
        winter: ['c-onyx', 'c-pearl', 'c-charcoal']
      }
    },
    {
      id: 'pastel', groups: ['pastel', 'neutral'], fb: ['#C9B6EA', '#FAF3EE', '#B4E4CE'],
      s: {
        spring: ['c-lilac', 'c-milk', 'c-mint'],
        summer: ['c-mint', 'c-sky', 'c-butter'],
        autumn: ['c-butter', 'c-peach', 'c-pistachio'],
        winter: ['c-lavender-grey', 'c-milk', 'c-sky']
      }
    },
    {
      id: 'bright', groups: ['bold', 'pink'], fb: ['#7A3FC0', '#EDE4E9', '#1FB6B0'],
      s: {
        spring: ['c-violet', 'c-bubblegum', 'c-lilac'],
        summer: ['c-turquoise', 'c-milk', 'c-lime'],
        autumn: ['c-tangerine', 'c-espresso', 'c-butter'],
        winter: ['c-electric-blue', 'c-pearl', 'c-violet']
      }
    }
  ];

  /* the season also leaves one visible motif on the set, not just a palette */
  var SEASONS = [
    { id: 'spring', motif: 'hearts' },
    { id: 'summer', motif: 'dots' },
    { id: 'autumn', motif: 'leopard' },
    { id: 'winter', motif: 'stars' }
  ];

  /* how much she wants her hands noticed: how far the decoration spreads */
  var ATTENTION = [
    { id: 'quiet', nails: 0, charms: 0 },
    { id: 'soft', nails: 1, charms: 2 },
    { id: 'clear', nails: 2, charms: 3 },
    { id: 'max', nails: 4, charms: 4 }
  ];

  /* gold or silver — the same question as her jewellery, and it changes both
     the metal in the artwork and the little things placed on the accent nail */
  var METALS = [
    { id: 'gold', hex: '#C2A05E', charms: ['ch-foil-gold', 'ch-goldleaf', 'ch-chain', 'ch-crown'] },
    { id: 'silver', hex: '#CBD0D6', charms: ['ch-foil-silver', 'ch-chrome-smear', 'ch-stud-square', 'ch-holo-hex'] },
    /* "no metal" has to mean it: the crystals and studs step aside for pearl,
       petals and a bow, and the artwork keeps her own accent colour */
    { id: 'none', hex: '', only: true, charms: ['ch-pearl', 'ch-blossom', 'ch-heart', 'ch-bow'] }
  ];

  var FALLBACK_ANS = {
    occasion: 'daily', vibe: 'calm', palette: 'nude',
    season: 'spring', attention: 'soft', metal: 'gold', length: 'medium'
  };

  function rowOf(table, id) {
    var i;
    for (i = 0; i < table.length; i++) if (table[i].id === id) return table[i];
    return table[0];
  }

  /* a colour hex: the curated id, then anything in the right group, then a
     literal that is guaranteed to render */
  function hexOf(id, groups, fallback) {
    var colors = list('colors'), c, i, j;
    c = findIn('colors', id);
    if (c && typeof c.hex === 'string' && c.hex) return c.hex;
    for (j = 0; groups && j < groups.length; j++) {
      for (i = 0; i < colors.length; i++) {
        c = colors[i];
        if (c && c.group === groups[j] && typeof c.hex === 'string' && c.hex) return c.hex;
      }
    }
    return fallback;
  }

  /* the three working colours for one palette in one season */
  function shades(pal, seasonId) {
    var ids = (pal.s && pal.s[seasonId]) ? pal.s[seasonId] : pal.s.spring;
    return {
      base: hexOf(ids[0], pal.groups, pal.fb[0]),
      accent: hexOf(ids[1], pal.groups, pal.fb[1]),
      third: hexOf(ids[2], pal.groups, pal.fb[2])
    };
  }

  /* Her answers with every gap filled from the occasion she chose, plus
     `_raw`: only what she really answered. Matching reads `_raw` alone, so a
     filled-in default never counts for or against one of the owner's sets. */
  function normAnswers(answers) {
    var a = {}, k, occ;
    occ = rowOf(OCCASIONS, (answers && answers.occasion) || FALLBACK_ANS.occasion);
    for (k in FALLBACK_ANS) {
      if (Object.prototype.hasOwnProperty.call(FALLBACK_ANS, k)) {
        a[k] = (answers && answers[k]) ||
          (occ.hint && occ.hint[k]) ||
          FALLBACK_ANS[k];
      }
    }
    a.skin = (answers && answers.skin) ? answers.skin : '';
    a.budget = (answers && answers.budget) ? answers.budget : '';
    a.tag = (answers && answers.tag) ? answers.tag : '';
    a.group = (answers && answers.group) ? answers.group : '';
    a.pattern = (answers && answers.pattern) ? answers.pattern : '';
    a.shape = (answers && answers.shape) ? answers.shape : '';
    /* What she really answered, as opposed to what was filled in above for a
       question she skipped or was never shown. Only these may count for or
       against one of the owner's sets. */
    a._raw = {};
    if (answers) {
      for (k in answers) {
        if (Object.prototype.hasOwnProperty.call(answers, k) && k.charAt(0) !== '_' &&
            answers[k] && answers[k] !== 'any') a._raw[k] = String(answers[k]);
      }
    }
    return a;
  }

  function asked(a, key) {
    return !!(a && a._raw && a._raw[key]);
  }

  /* ---- the two alternates --------------------------------------------- */

  /* ---- the words that go with a built set ------------------------------ */

  function readyPrice(it) {
    var p = null;
    if (SN.Checkout && typeof SN.Checkout.priceReady === 'function') {
      try { p = SN.Checkout.priceReady(it, 1); } catch (e) { p = null; }
    }
    /* the set's own price, without delivery: the courier fee depends on the
       governorate she picks later, so it is neither shown nor gated here */
    if (p && isFinite(p.subtotal)) return p.subtotal;
    return isFinite(Number(it && it.price)) ? Number(it.price) : null;
  }

  /* one of the owner's real sets, dressed as a quiz result. `real` is what
     tells the rest of the screen to show her photograph, order it as a ready
     set, and skip the nail-by-nail recipe, which only describes a design the
     quiz invented. */
  /* The sentence under a real set, assembled only from the axes that truly
     matched. Nothing is claimed that the score did not earn. */
  function whyReal(hit, it, a) {
    var w = hit.why || [], parts = [], axis = function (key, id) {
      var arr = list('matchAxes.' + key), j;
      if (!Array.isArray(arr)) return '';
      for (j = 0; j < arr.length; j++) if (arr[j] && arr[j].id === id) return pick(arr[j].name);
      return '';
    };
    var m = it.match || {}, occ = '', gr = null;

    if (w.indexOf('palette') !== -1) parts.push(t('quiz.whyPalette'));
    if (w.indexOf('season') !== -1 && axis('season', a.season)) {
      parts.push(t('quiz.whySeason', { s: axis('season', a.season) }));
    }
    if (w.indexOf('occasion') !== -1) {
      occ = axis('occasion', a.occasion);
      if (occ) parts.push(t('quiz.whyOccasion', { o: occ }));
    }
    if (w.indexOf('vibe') !== -1 && Array.isArray(m.vibe) && m.vibe.length && axis('vibe', m.vibe[0])) {
      parts.push(t('quiz.whyVibe', { v: axis('vibe', m.vibe[0]) }));
    }
    if (w.indexOf('pattern') !== -1) parts.push(t('quiz.whyPattern'));
    if (w.indexOf('shape') !== -1) parts.push(t('quiz.whyShape'));
    if (w.indexOf('length') !== -1) parts.push(t('quiz.whyLength'));
    if (w.indexOf('skin') !== -1) parts.push(t('quiz.whySkin'));

    /* the gate adds nothing to hit.why, so this is tested directly */
    if (inChosenGroup(it, a)) {
      gr = groupRow(a.group);
      if (gr && pick(gr.name)) parts.unshift(t('quiz.whyGroup', { g: pick(gr.name) }));
    }

    if (!parts.length) return '';
    return t('quiz.whyLead') + ' ' + parts.join('، ') + '.';
  }

  /* the set in its own words: the lists it is in, then the shape and length
     the owner gave it — nothing that was not said about this set */
  function realSub(it) {
    var parts = [], ids = Array.isArray(it && it.groups) ? it.groups : [], i, g, r;
    for (i = 0; i < ids.length && parts.length < 2; i++) {
      g = groupRow(ids[i]);
      if (g && g.active !== false && pick(g.name)) parts.push(pick(g.name));
    }
    r = findIn('shapes', shapeOf(it));
    if (r && pick(r.name)) parts.push(pick(r.name));
    r = findIn('lengths', lengthOf(it));
    if (r && pick(r.name)) parts.push(pick(r.name));
    return parts.join(' · ');
  }

  function realVariant(hit, a, tier) {
    var it = hit.it;
    var chips = [], i, m = it.match || {}, occs;
    var axis = function (key, id) {
      var arr = list('matchAxes.' + key), j;
      if (!Array.isArray(arr)) return '';
      for (j = 0; j < arr.length; j++) if (arr[j] && arr[j].id === id) return pick(arr[j].name);
      return '';
    };

    occs = occasionsOf(it);
    for (i = 0; i < occs.length && chips.length < 2; i++) {
      if (axis('occasion', occs[i])) chips.push(axis('occasion', occs[i]));
    }
    /* the list she asked for leads, because it is the word she chose herself */
    if (inChosenGroup(it, a)) {
      var gr = groupRow(a.group);
      if (gr && pick(gr.name)) chips.unshift(pick(gr.name));
    }
    if (Array.isArray(m.vibe) && m.vibe.length) {
      if (axis('vibe', m.vibe[0])) chips.push(axis('vibe', m.vibe[0]));
    }
    if (m.attention && axis('attention', m.attention)) chips.push(axis('attention', m.attention));

    return {
      id: 'real-' + String(it.id || ''),
      tier: tier || 'match',
      over: !!hit.over,
      ans: a,
      raw: (a && a._raw) || {},
      real: it,
      image: String(it.image || ''),
      label: t('quiz.vNear' + Math.min(3, (hit.rank || 0) + 1)),
      name: pick(it.name) || '',
      sub: realSub(it),
      why: whyReal(hit, it, a) || pick(it.desc) || '',
      chips: chips,
      note: '',
      price: readyPrice(it)
    };
  }

  /* Her results — only ever the owner's own sets. The ones that answer her,
     best first; if none does, the closest of them, said plainly; if the shop
     has no set at all yet, nothing, and the screen invites her to message the
     shop instead. The site never makes a set up. */
  function variantsFor(ans) {
    var a = normAnswers(ans);
    var out = [], hits, i;

    if (!activeSets().length) return out;

    hits = matchDesigns(a);
    for (i = 0; i < hits.length && out.length < 3; i++) {
      hits[i].rank = i;
      out.push(realVariant(hits[i], a, 'match'));
    }
    if (out.length) return out;

    hits = closestDesigns(a);
    for (i = 0; i < hits.length && out.length < 3; i++) {
      hits[i].rank = i;
      out.push(realVariant(hits[i], a, 'closest'));
    }
    return out;
  }

  /* ==================================================================== */
  /* 3. the questions and their artwork                                    */
  /* ==================================================================== */

  var STEPS = [
    { key: 'skin', q: 'quiz.qSkin', hint: 'quiz.hSkin', art: 'skin', cols: 3 },
    { key: 'occasion', q: 'quiz.q1', hint: 'quiz.h1', art: 'thumb', cols: 2 },
    { key: 'group', q: 'quiz.qGroup', hint: 'quiz.hGroup', art: 'group', cols: 2 },
    { key: 'vibe', q: 'quiz.q2', hint: 'quiz.h2', art: 'thumb', cols: 2 },
    { key: 'palette', q: 'quiz.q3', hint: 'quiz.h3', art: 'strip', cols: 3 },
    { key: 'pattern', q: 'quiz.qPattern', hint: 'quiz.hPattern', art: 'nail', cols: 2 },
    { key: 'season', q: 'quiz.q4', hint: 'quiz.h4', art: 'thumb', cols: 2 },
    { key: 'attention', q: 'quiz.q5', hint: 'quiz.h5', art: 'thumb', cols: 2 },
    { key: 'metal', q: 'quiz.q6', hint: 'quiz.h6', art: 'nail', cols: 3 },
    { key: 'shape', q: 'quiz.qShape', hint: 'quiz.hShape', art: 'nail', cols: 3 },
    { key: 'length', q: 'quiz.q7', hint: 'quiz.h7', art: 'len', cols: 2 },
    { key: 'budget', q: 'quiz.qBudget', hint: 'quiz.hBudget', art: 'budget', cols: 2 }
  ];

  /* The list question only exists while the owner has at least one list she
     wants in the quiz, so the number of questions is not a constant. STEPS
     itself stays whole and in a fixed order — the shareable result code is
     positional and would decode into the wrong keys if the array shrank. */
  function activeGroups() {
    var arr = list('groups'), out = [], i, g;
    for (i = 0; i < arr.length; i++) {
      g = arr[i];
      if (g && g.id && g.active !== false && g.inQuiz !== false) out.push(g);
    }
    return out;
  }

  /* rows the owner has offered as answers. A question she has emptied simply
     does not exist — the quiz stays as short as she wants it. */
  function offered(key) {
    var arr = list(key), out = [], i, r;
    for (i = 0; i < arr.length; i++) {
      r = arr[i];
      if (r && r.id && r.active !== false && r.inQuiz === true) out.push(r);
    }
    return out;
  }

  /* Which answers to a question the owner's own sets can actually meet.
     A question none of her sets can answer is only a longer wait for the
     customer, so it is not asked; an answer none of them carries leads
     nowhere, so it is not offered. `all` means every answer is meaningful
     (colour family and season: any set with colours can be judged on them). */
  function carried(key) {
    var sets = activeSets(), ids = {}, any = false, i, j, it, m, v, arr, cheapest = Infinity, p;
    for (i = 0; i < sets.length; i++) {
      it = sets[i];
      m = it.match || {};
      if (key === 'group') {
        arr = Array.isArray(it.groups) ? it.groups : [];
        for (j = 0; j < arr.length; j++) ids[arr[j]] = true;
      } else if (key === 'pattern') {
        v = patternIdOf(it); if (v) ids[v] = true;
      } else if (key === 'shape') {
        v = shapeOf(it); if (v) ids[v] = true;
      } else if (key === 'length') {
        v = lengthOf(it); if (v) ids[v] = true;
      } else if (key === 'occasion') {
        arr = occasionsOf(it);
        for (j = 0; j < arr.length; j++) ids[arr[j]] = true;
      } else if (key === 'vibe') {
        arr = Array.isArray(m.vibe) ? m.vibe : [];
        for (j = 0; j < arr.length; j++) ids[arr[j]] = true;
      } else if (key === 'attention') {
        if (m.attention) ids[m.attention] = true;
      } else if (key === 'metal') {
        if (m.metal) ids[m.metal] = true;
      } else if (key === 'palette') {
        if (paletteOf(it)) any = true;
      } else if (key === 'season') {
        if (seasonOf(it)) any = true;
      } else if (key === 'budget') {
        p = Number(readyPrice(it));
        if (isFinite(p) && p < cheapest) cheapest = p;
      }
    }
    return { ids: ids, all: any, cheapest: cheapest };
  }

  /* skin is always asked: it opens the quiz on the home page, and a set's
     colours are judged against it */
  function steps() {
    var out = [], i, k, opts, j, real;
    for (i = 0; i < STEPS.length; i++) {
      k = STEPS[i].key;
      if (k !== 'skin') {
        opts = optionsFor(k);
        real = 0;
        for (j = 0; j < opts.length; j++) if (opts[j].id !== 'any') real++;
        /* a budget question with a single real tier cannot narrow anything */
        if (!real || (k === 'budget' && real < 2)) continue;
      }
      out.push(STEPS[i]);
    }
    return out;
  }

  function total() { return steps().length; }

  /* Unlike rowOf, this returns null rather than the first row: "she picked no
     list" and "she picked the first list" are different answers. */
  function groupRow(id) {
    var arr, i;
    if (!id || id === 'any') return null;
    arr = list('groups');
    for (i = 0; i < arr.length; i++) if (arr[i] && String(arr[i].id) === String(id)) return arr[i];
    return null;
  }

  /* What a set is for. If the owner never picked an occasion for it, the
     lists she filed it under already say: a set in «أعراس» is for a wedding,
     because that is the character she gave that list. So filing a set is
     enough to make the occasion question work on it too. */
  /* Which of the owner's patterns this set is — only what she said about
     her own set. The panel used to give every
     new set a placeholder drawing (almond, medium, plain), and reading that
     here made a photographed set claim a shape and a length nobody chose. */
  function patternIdOf(it) {
    var look = (it && it.look) || {}, m = (it && it.match) || {};
    return String(look.pattern || m.pattern || '');
  }

  function shapeOf(it) {
    var m = (it && it.match) || {}, look = (it && it.look) || {};
    return String(m.shape || look.shape || '');
  }

  function lengthOf(it) {
    var m = (it && it.match) || {}, look = (it && it.look) || {};
    return String(m.length || look.length || '');
  }

  function occasionsOf(it) {
    var m = (it && it.match) || {}, ids, out = [], i, g;
    if (Array.isArray(m.occasion) && m.occasion.length) return m.occasion;
    ids = Array.isArray(it && it.groups) ? it.groups : [];
    for (i = 0; i < ids.length; i++) {
      g = groupRow(ids[i]);
      if (g && g.seed && out.indexOf(String(g.seed)) === -1) out.push(String(g.seed));
    }
    return out;
  }

  function inChosenGroup(it, a) {
    if (!a || !a.group || a.group === 'any') return false;
    return Array.isArray(it && it.groups) && it.groups.indexOf(a.group) !== -1;
  }

  function tableFor(key) {
    if (key === 'occasion') return OCCASIONS;
    if (key === 'vibe') return VIBES;
    if (key === 'palette') return PALETTES;
    if (key === 'season') return SEASONS;
    if (key === 'attention') return ATTENTION;
    if (key === 'metal') return METALS;
    return null;
  }

  /* the options for a step, as {id, label} — the length step reads straight
     from the store so an owner edit shows up in the quiz too */
  function optionsFor(key) {
    var out = [], arr, i, c;

    if (key === 'skin') {
      arr = list('skinTones');
      for (i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].id) out.push({ id: arr[i].id, label: pick(arr[i].name), row: arr[i] });
      }
      return out;
    }

    c = carried(key);

    /* only the ceilings at or above her cheapest set: a tier below every
       price the shop has would lead her nowhere */
    if (key === 'budget') {
      arr = list('matchAxes.budget');
      for (i = 0; i < arr.length; i++) {
        if (!arr[i] || !arr[i].id) continue;
        if (Number(arr[i].max) > 0 && Number(arr[i].max) < c.cheapest) continue;
        out.push({ id: arr[i].id, label: pick(arr[i].name), row: arr[i] });
      }
      return out;
    }
    /* her own lists, in her own order, labelled from the row itself — the
       dictionary fallback below would print the literal quiz.group.g-xxx */
    if (key === 'group') {
      arr = activeGroups();
      for (i = 0; i < arr.length; i++) {
        if (c.ids[arr[i].id]) out.push({ id: arr[i].id, label: pick(arr[i].name) || arr[i].id, row: arr[i] });
      }
      if (out.length) out.push({ id: 'any', label: t('quiz.groupAny'), row: null });
      return out;
    }
    /* the kind of set and the shape of the nail: the ones the owner offers
       in the quiz AND has at least one set of */
    if (key === 'pattern' || key === 'shape') {
      arr = offered(key === 'pattern' ? 'patterns' : 'shapes');
      for (i = 0; i < arr.length; i++) {
        if (c.ids[arr[i].id]) out.push({ id: arr[i].id, label: pick(arr[i].name) || arr[i].id, row: arr[i] });
      }
      if (out.length) out.push({ id: 'any', label: t('quiz.anyOf'), row: null });
      return out;
    }
    if (key === 'length') {
      arr = list('lengths');
      for (i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].id && c.ids[arr[i].id]) out.push({ id: arr[i].id, label: pick(arr[i].name), row: arr[i] });
      }
      return out;
    }
    arr = tableFor(key) || [];
    for (i = 0; i < arr.length; i++) {
      if (!c.all && !c.ids[arr[i].id]) continue;
      out.push({ id: arr[i].id, label: t('quiz.' + key + '.' + arr[i].id), row: arr[i] });
    }
    return out;
  }

  /* The picture on one answer tile. The site draws no nail and invents no
     set: a tile shows the owner's own photograph of a set that carries this
     answer, or a plain swatch, icon or nothing at all. `null` means the tile
     is words only. */
  function icoSpan(name) {
    return el('span', {
      'class': 'quiz-ico',
      html: (SN.UI && typeof SN.UI.icon === 'function') ? SN.UI.icon(String(name || 'sparkle'), 26) : ''
    });
  }

  /* the owner's own photo for this answer: the answer row's own picture if
     it has one, else the first of her sets that carries this answer */
  function answerPhoto(key, opt) {
    var sets, i, it;
    if (!opt || opt.id === 'any') return '';
    if (opt.row && opt.row.image) return String(opt.row.image);
    sets = activeSets();
    for (i = 0; i < sets.length; i++) {
      it = sets[i];
      if (!it.image) continue;
      if (key === 'pattern' && patternIdOf(it) === opt.id) return String(it.image);
      if (key === 'shape' && shapeOf(it) === opt.id) return String(it.image);
      if (key === 'length' && lengthOf(it) === opt.id) return String(it.image);
      if (key === 'group' && Array.isArray(it.groups) && it.groups.indexOf(opt.id) !== -1) return String(it.image);
    }
    return '';
  }

  function tileArt(step, opt, answers) {
    var box = el('span', { 'class': 'quiz-art', 'aria-hidden': 'true' });
    var sh, pal, hex, photo;

    if (step.key === 'budget') return null;

    if (step.key === 'skin') {
      box.appendChild(el('span', {
        'class': 'quiz-skin',
        style: { backgroundColor: (opt.row && opt.row.hex) || '#EFCDB6' }
      }));
      return box;
    }

    /* colour answers are shown as the colours themselves — swatches, not a set */
    if (step.key === 'palette' || step.key === 'season') {
      pal = step.key === 'palette'
        ? rowOf(PALETTES, opt.id)
        : rowOf(PALETTES, (answers && answers.palette) || 'nude');
      sh = shades(pal, step.key === 'season' ? opt.id : ((answers && answers.season) || 'spring'));
      box.setAttribute('class', 'quiz-art quiz-art-strip');
      [sh.base, sh.accent, sh.third].forEach(function (h) {
        box.appendChild(el('span', { 'class': 'quiz-sw', style: { backgroundColor: h } }));
      });
      return box;
    }

    if (step.key === 'metal') {
      hex = opt.row && opt.row.hex;
      box.appendChild(el('span', {
        'class': 'quiz-skin' + (hex ? '' : ' quiz-skin-none'),
        style: hex ? { backgroundColor: hex } : {}
      }));
      return box;
    }

    if (step.key === 'occasion') {
      box.appendChild(icoSpan((opt.row && opt.row.ico) || 'sparkle'));
      return box;
    }

    photo = answerPhoto(step.key, opt);
    if (photo) {
      box.appendChild(el('img', { src: photo, alt: '', loading: 'lazy' }));
      return box;
    }
    if (step.key === 'group') {
      box.appendChild(icoSpan(opt.row ? (opt.row.ico || 'sparkle') : 'grid'));
      return box;
    }
    return null;
  }

  /* One question's tiles. Pictures only when every real answer has one, so a
     grid never mixes photographs with empty boxes; «any» then gets an icon. */
  function stepArts(step, opts, answers) {
    var arts = [], i, all = true, real = 0;
    for (i = 0; i < opts.length; i++) {
      arts.push(tileArt(step, opts[i], answers));
      if (opts[i].id !== 'any') {
        real++;
        if (!arts[i]) all = false;
      }
    }
    if (!real || !all) {
      for (i = 0; i < arts.length; i++) arts[i] = null;
      return arts;
    }
    for (i = 0; i < opts.length; i++) {
      if (opts[i].id === 'any' && !arts[i]) {
        arts[i] = el('span', { 'class': 'quiz-art', 'aria-hidden': 'true' }, [icoSpan('grid')]);
      }
    }
    return arts;
  }

  /* ==================================================================== */
  /* 3b. matching the owner's own designs                                  */
  /*                                                                       */
  /*  A ready design is tagged in the admin panel on the same axes the     */
  /*  quiz asks about, plus up to four colours ordered by how much of the  */
  /*  set they cover. This scores every design against her answers and     */
  /*  returns the best ones, so the quiz recommends sets that actually     */
  /*  exist instead of only ever inventing one.                            */
  /* ==================================================================== */

  function hsl(hex) {
    var h = String(hex || '').replace('#', '');
    var r, g, b, mx, mn, d, H = 0, S, L;
    if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    r = parseInt(h.slice(0, 2), 16) / 255;
    g = parseInt(h.slice(2, 4), 16) / 255;
    b = parseInt(h.slice(4, 6), 16) / 255;
    mx = Math.max(r, g, b); mn = Math.min(r, g, b); d = mx - mn;
    L = (mx + mn) / 2;
    S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));
    if (d !== 0) {
      if (mx === r) H = 60 * (((g - b) / d) % 6);
      else if (mx === g) H = 60 * (((b - r) / d) + 2);
      else H = 60 * (((r - g) / d) + 4);
    }
    if (H < 0) H += 360;
    return { h: H, s: S, l: L };
  }

  /* the colours a design carries, largest first, weighted by that order:
     a gold dot on one nail must not weigh the same as the base on eight */
  var C_WEIGHT = [3, 2, 1, 1];

  /* The set's colours, from the four swatches on its row. The owner's photo
     upload fills them in; a set drawn by the site used to answer from its
     drawing instead, and the site no longer draws sets. */
  function designColors(it) {
    var out = [], i, c, k;
    for (i = 0; i < 4; i++) {
      k = 'c' + (i + 1);
      c = hsl(it && it[k]);
      if (c) out.push({ c: c, hex: it[k], w: C_WEIGHT[i] });
    }
    return out;
  }

  /* The six colour families live in SN.Nail, loaded on every page, so the
     shop can filter by exactly the families the quiz matches on. */
  function familyOfHex(hex) {
    return (SN.Nail && typeof SN.Nail.colourFamily === 'function') ? SN.Nail.colourFamily(hex) : '';
  }

  /* Colour families that sit next to each other. A pink set is a fair answer
     for someone who asked for pastel; a red one is not an answer for someone
     who asked for nude, however well it matches on everything else. */
  var PAL_NEAR = {
    nude: ['pastel'],
    pastel: ['nude', 'pink'],
    pink: ['pastel', 'red'],
    red: ['pink', 'bright'],
    bright: ['red', 'dark'],
    dark: ['bright']
  };

  /* the design's own family: the weighted vote of its colours */
  function paletteOf(it) {
    var cols = designColors(it), tally = {}, best = '', bestW = 0, i, f;
    if (it && it.match && it.match.palette) return it.match.palette;
    for (i = 0; i < cols.length; i++) {
      f = familyOfHex(cols[i].hex);
      tally[f] = (tally[f] || 0) + cols[i].w;
    }
    for (f in tally) {
      if (Object.prototype.hasOwnProperty.call(tally, f) && tally[f] > bestW) { bestW = tally[f]; best = f; }
    }
    return best;
  }

  /* warm colours read as spring/autumn, cool ones as summer/winter, and
     lightness splits each pair. A rough map, which is exactly why the panel
     lets the owner override it. */
  function seasonOf(it) {
    var cols = designColors(it), i, c, warm = 0, cool = 0, lum = 0, tot = 0;
    if (it && it.match && it.match.season) return it.match.season;
    for (i = 0; i < cols.length; i++) {
      c = cols[i].c;
      if (c.s < 0.08) { lum += c.l * cols[i].w; tot += cols[i].w; continue; }
      if (c.h < 75 || c.h > 300) warm += cols[i].w; else cool += cols[i].w;
      lum += c.l * cols[i].w; tot += cols[i].w;
    }
    if (!tot) return '';
    lum = lum / tot;
    if (warm >= cool) return lum >= 0.62 ? 'spring' : 'autumn';
    return lum >= 0.62 ? 'summer' : 'winter';
  }

  /* ---- does this set flatter HER skin? ----------------------------------
     Not a list of colours banned from a skin tone — that is both wrong and
     insulting. What actually decides it is contrast against her own depth:

       * A NUDE has one job, to read as her own nail bed a shade better. A
         nude mixed for porcelain goes chalky and grey on deep skin, and a
         caramel nude disappears on porcelain. So a nude must sit near her
         own lightness, and far from it it is simply the wrong nude.
       * EVERYTHING ELSE needs enough separation from her skin to be seen at
         all. A colour sitting at her exact lightness washes out against the
         finger. This is why brights and deep shades read so well on deeper
         skin, and why the palest pastels can vanish on the fairest.

     The owner can override the whole thing per design; she knows her
     customers better than a formula does. */
  function skinLum(id) {
    var tones = list('skinTones'), i, c;
    for (i = 0; i < tones.length; i++) {
      if (tones[i] && tones[i].id === id) {
        c = hsl(tones[i].hex);
        return c ? c.l : null;
      }
    }
    return null;
  }

  var NUDE_NEAR = 0.16, NUDE_FAR = 0.34, SEEN_GOOD = 0.18, SEEN_MIN = 0.10;

  /* 1 = flatters her, 0.5 = passable, null = the wrong set for her skin */
  function skinFit(it, a) {
    var m = (it && it.match) || {};
    var sl, cols, top, d;

    if (Array.isArray(m.skin) && m.skin.length) {
      return m.skin.indexOf(a.skin) !== -1 ? 1 : null;
    }
    if (!a.skin) return 1;
    sl = skinLum(a.skin);
    cols = designColors(it);
    if (sl === null || !cols.length) return 1;

    top = cols[0].c;
    d = Math.abs(top.l - sl);

    if (paletteOf(it) === 'nude') {
      if (d <= NUDE_NEAR) return 1;
      if (d <= NUDE_FAR) return 0.5;
      return null;
    }
    if (d >= SEEN_GOOD) return 1;
    if (d >= SEEN_MIN) return 0.5;
    return null;
  }

  function hasIn(arr, id) {
    return Array.isArray(arr) && arr.length ? arr.indexOf(id) !== -1 : null;
  }

  /* How well one design answers her. Every axis is optional on the design:
     left blank it neither helps nor hurts, so a half-filled design still
     competes on what the owner did fill in. */
  var W_PALETTE = 34, W_GROUP = 24, W_OCCASION = 22, W_PATTERN = 30, W_VIBE = 16,
      W_SKIN = 14, W_SEASON = 12, W_ATTENTION = 10, W_SHAPE = 10, W_METAL = 8,
      W_LENGTH = 8;

  function budgetMax(id) {
    var arr = list('matchAxes.budget'), i;
    /* Number(), never num(): num() is the display formatter and would hand
       back "15,000", which compares as NaN and silently switches the gate off */
    for (i = 0; i < arr.length; i++) if (arr[i] && arr[i].id === id) return Number(arr[i].max) || 0;
    return 0;
  }

  function activeSets() {
    var arr = list('designs'), out = [], i;
    for (i = 0; i < arr.length; i++) if (arr[i] && arr[i].id && arr[i].active !== false) out.push(arr[i]);
    return out;
  }

  /* Does this set say anything about her skin? Either the owner ticked the
     skin tones it suits, or it has colours to compare with hers. */
  function skinDeclared(it) {
    var m = (it && it.match) || {};
    return (Array.isArray(m.skin) && m.skin.length > 0) || designColors(it).length > 0;
  }

  /* How well one of the owner's sets answers her.

     Only questions she actually answered count, and only on the axes the set
     actually declares — what the owner never said about a set neither helps
     nor hurts it. `relaxed` turns the gates (her list, her skin, her colour
     family, the kind of set) from rejections into misses; it is used only to
     find the closest sets when nothing passes them. */
  function scoreDesign(it, a, opts) {
    var o = opts || {};
    var m = (it && it.match) || {};
    var score = 0, max = 0, told = 0, hit, cap, why = [], w;

    if (!it || it.active === false) return null;

    function axis(weight, got, tag) {
      max += weight;
      if (tag !== 'skin') told += weight;
      score += got;
      if (got >= weight && tag) why.push(tag);
    }

    /* Over her ceiling is the wrong shelf. The closest-sets pass filters the
       budget itself, so it can say so plainly instead of silently. */
    if (!o.ignoreBudget && asked(a, 'budget')) {
      cap = budgetMax(a.budget);
      if (cap > 0 && (Number(readyPrice(it)) || 0) > cap) return null;
    }

    /* She named a list herself — the strongest signal there is. A set filed
       only under other lists is the wrong shelf. */
    if (asked(a, 'group')) {
      hit = Array.isArray(it.groups) ? it.groups : [];
      if (hit.length) {
        if (hit.indexOf(a.group) === -1) { if (!o.relaxed) return null; axis(W_GROUP, 0, ''); }
        else axis(W_GROUP, W_GROUP, 'group');
      }
    }

    /* Wrong for her skin is a rejection too: a nude mixed for another depth
       does not become right because the occasion matches. */
    if (asked(a, 'skin') && skinDeclared(it)) {
      hit = skinFit(it, a);
      if (hit === null) { if (!o.relaxed) return null; axis(W_SKIN, 0, ''); }
      else axis(W_SKIN, W_SKIN * hit, hit === 1 ? 'skin' : '');
    }

    /* The colour family is a gate: a red set is not an answer for someone who
       asked for nude, however well the rest matches. */
    if (asked(a, 'palette')) {
      hit = paletteOf(it);
      if (hit) {
        if (hit === a.palette) axis(W_PALETTE, W_PALETTE, 'palette');
        else if ((PAL_NEAR[a.palette] || []).indexOf(hit) !== -1) axis(W_PALETTE, W_PALETTE * 0.45, '');
        else { if (!o.relaxed) return null; axis(W_PALETTE, 0, ''); }
      }
    }

    if (asked(a, 'occasion')) {
      hit = hasIn(occasionsOf(it), a.occasion);
      if (hit !== null) axis(W_OCCASION, hit ? W_OCCASION : 0, 'occasion');
    }
    if (asked(a, 'vibe')) {
      hit = hasIn(m.vibe, a.vibe);
      if (hit !== null) axis(W_VIBE, hit ? W_VIBE : 0, 'vibe');
    }
    if (asked(a, 'season')) {
      hit = seasonOf(it);
      if (hit) axis(W_SEASON, hit === a.season ? W_SEASON : 0, 'season');
    }
    if (asked(a, 'attention') && m.attention) axis(W_ATTENTION, m.attention === a.attention ? W_ATTENTION : 0, 'attention');
    if (asked(a, 'metal') && m.metal) axis(W_METAL, m.metal === a.metal ? W_METAL : 0, 'metal');
    if (asked(a, 'length')) {
      w = lengthOf(it);
      if (w) axis(W_LENGTH, w === a.length ? W_LENGTH : 0, 'length');
    }
    /* The kind she named is a gate too: a cat eye is not an answer for
       someone who asked for French. The question only offers kinds her
       shop actually carries, so there is always a set of that kind. */
    if (asked(a, 'pattern')) {
      w = patternIdOf(it);
      if (w) {
        if (w === a.pattern) axis(W_PATTERN, W_PATTERN, 'pattern');
        else { if (!o.relaxed) return null; axis(W_PATTERN, 0, ''); }
      }
    }
    if (asked(a, 'shape')) {
      w = shapeOf(it);
      if (w) axis(W_SHAPE, w === a.shape ? W_SHAPE : 0, 'shape');
    }

    return { fit: max ? score / max : 0, max: max, score: score, told: told, why: why };
  }

  /* the sets worth showing her, best first. A set must answer at least one
     thing she asked besides her skin, and clear the floor — a bad
     recommendation costs more than one fewer option. */
  var FIT_FLOOR = 0.45;

  function matchDesigns(a) {
    var arr = activeSets(), out = [], i, r;
    for (i = 0; i < arr.length; i++) {
      r = scoreDesign(arr[i], a);
      if (!r || r.told <= 0 || r.fit < FIT_FLOOR) continue;
      out.push({ it: arr[i], fit: r.fit, max: r.max, score: r.score, why: r.why });
    }
    /* better fit first; on a tie the set the owner described more fully */
    out.sort(function (x, y) { return (y.fit - x.fit) || (y.max - x.max); });
    return out;
  }

  /* When none of her sets passes, the closest ones — still only hers, never a
     set the site makes up. Gates become misses, ranking is by how much of
     what she asked each set answers, and her budget still decides the pool
     unless nothing fits it at all, which the result then says out loud. */
  function closestDesigns(a) {
    var arr = activeSets(), within = [], pool, out = [], i, r, cap = 0, over;
    if (asked(a, 'budget')) cap = budgetMax(a.budget);
    for (i = 0; i < arr.length; i++) {
      if (cap > 0 && (Number(readyPrice(arr[i])) || 0) > cap) continue;
      within.push(arr[i]);
    }
    over = !within.length;
    pool = over ? arr : within;
    for (i = 0; i < pool.length; i++) {
      r = scoreDesign(pool[i], a, { relaxed: true, ignoreBudget: true }) || { fit: 0, max: 0, score: 0, why: [] };
      out.push({ it: pool[i], fit: r.fit, max: r.max, score: r.score, why: r.why, over: over });
    }
    out.sort(function (x, y) {
      return (y.score - x.score) ||
        ((y.it.featured ? 1 : 0) - (x.it.featured ? 1 : 0)) ||
        ((Number(y.it.orders) || 0) - (Number(x.it.orders) || 0)) ||
        ((Number(readyPrice(x.it)) || 0) - (Number(readyPrice(y.it)) || 0));
    });
    return out;
  }

  /* ==================================================================== */
  /* 4. state + the shell                                                  */
  /* ==================================================================== */

  var st = {
    open: false,
    step: 0,          /* 0..total()-1 = a question, total() = wait, total()+1 = reveal */
    ans: {},
    m: null,
    root: null,
    stage: null,
    live: null,
    vars: [],
    vi: 0,
    lit: false,          /* the sparkle burst is a first-reveal thing only */
    timer: 0,
    busy: false,
    hashLock: false,
    empty: false,        /* the shop has no set to recommend yet */
    pin: '',             /* a set a shared link asked to show first */
    notice: ''
  };

  function clearTimer() {
    if (st.timer) {
      window.clearTimeout(st.timer);
      st.timer = 0;
    }
  }

  function setHash(on) {
    var base = (window.location.pathname || '') + (window.location.search || '');
    st.hashLock = true;
    try {
      if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(window.history.state, '', base + (on ? '#quiz' : ''));
      } else if (on) {
        window.location.hash = 'quiz';
      } else if (window.location.hash) {
        window.location.hash = '';
      }
    } catch (e) { /* file:// or a sandboxed frame — the quiz still works */ }
    window.setTimeout(function () { st.hashLock = false; }, 0);
  }

  /* ---- the progress row ---------------------------------------------- */

  function dots() {
    var row = el('div', {
      'class': 'quiz-dots',
      role: 'progressbar',
      'aria-label': t('quiz.progress'),
      'aria-valuemin': '1',
      'aria-valuemax': String(total()),
      'aria-valuenow': String(Math.min(total(), st.step + 1))
    });
    var i, cls;
    for (i = 0; i < total(); i++) {
      cls = 'quiz-dot';
      if (i < st.step) cls += ' is-done';
      else if (i === st.step) cls += ' is-on';
      row.appendChild(el('span', { 'class': cls }));
    }
    return row;
  }

  function topBar() {
    var showBack = st.step > 0 && st.step < total();
    return el('div', { 'class': 'quiz-top' }, [
      el('button', {
        type: 'button',
        'class': 'btn btn-ghost btn-sm quiz-back' + (showBack ? '' : ' is-hidden'),
        'aria-hidden': showBack ? null : 'true',
        tabindex: showBack ? null : '-1',
        on: { click: back }
      }, [
        el('span', { 'class': 'quiz-back-ico', html: icon('chevron', 15), 'aria-hidden': 'true' }),
        el('span', { text: t('quiz.back') })
      ]),
      dots(),
      /* mirrors the back button so the dots sit dead centre either way */
      el('span', { 'class': 'quiz-top-pad', 'aria-hidden': 'true' })
    ]);
  }

  /* ---- a question screen --------------------------------------------- */

  function optionTile(step, opt, grid, art) {
    var on = st.ans[step.key] === opt.id;
    var btn = el('button', {
      type: 'button',
      'class': 'quiz-opt sn-pickable',
      'aria-pressed': on ? 'true' : 'false'
    }, [
      art || null,
      el('span', { 'class': 'quiz-opt-t', text: opt.label })
    ]);
    btn.addEventListener('click', function () {
      var sibs = grid ? grid.querySelectorAll('.quiz-opt') : [], j;
      if (st.timer) return;                       /* one tap, not three */
      for (j = 0; j < sibs.length; j++) sibs[j].setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-pressed', 'true');
      say(t('quiz.picked', { name: opt.label }));
      st.timer = window.setTimeout(function () {
        st.timer = 0;
        answer(step.key, opt.id);
      }, reducedMotion() ? 0 : HOLD);
    }, false);
    return btn;
  }

  function questionScreen() {
    var step = steps()[st.step];
    var opts = optionsFor(step.key);
    var arts = stepArts(step, opts, st.ans);
    var words = true, i, grid;
    for (i = 0; i < arts.length; i++) if (arts[i]) words = false;
    grid = el('div', {
      'class': 'quiz-opts quiz-cols-' + (words ? 2 : step.cols) +
        (words ? ' quiz-opts-txt' : '') +
        (reducedMotion() ? '' : ' sn-stagger sn-stagger-sm'),
      role: 'group',
      'aria-label': t(step.q)
    });

    if (!opts.length) {
      /* the owner emptied this collection — skip rather than show a dead end */
      window.setTimeout(function () { answer(step.key, null); }, 0);
    }
    for (i = 0; i < opts.length; i++) grid.appendChild(optionTile(step, opts[i], grid, arts[i]));

    return el('div', { 'class': 'quiz-screen' + (reducedMotion() ? '' : ' sn-in') }, [
      el('p', {
        'class': 'eyebrow quiz-eyebrow',
        text: t('quiz.stepN', { n: num(st.step + 1), total: num(total()) })
      }),
      el('h3', { 'class': 'quiz-q display', text: t(step.q) }),
      el('p', { 'class': 'quiz-hint', text: t(step.hint) }),
      grid
    ]);
  }

  /* ---- the anticipation beat ------------------------------------------ */

  function waitScreen() {
    var fan = el('div', { 'class': 'quiz-wait-fan', 'aria-hidden': 'true' });
    var i;
    for (i = 0; i < 3; i++) fan.appendChild(el('span', { 'class': 'sk quiz-wait-n' }));

    return el('div', { 'class': 'quiz-screen quiz-wait' }, [
      fan,
      el('p', { 'class': 'quiz-wait-t display', text: t('quiz.waitTitle') }),
      el('p', { 'class': 'quiz-hint', text: t('quiz.waitText') })
    ]);
  }

  /* ==================================================================== */
  /* 5. the reveal                                                         */
  /* ==================================================================== */

  function burst() {
    var b = el('div', { 'class': 'sn-burst', 'aria-hidden': 'true' }), i;
    for (i = 0; i < 12; i++) b.appendChild(el('i'));
    return b;
  }

  /* the shop's own WhatsApp, with a message already written */
  function waLink(msg) {
    var d = String(cfg('settings.whatsapp', '') || '').replace(/[^0-9]/g, '');
    return d ? 'https://wa.me/' + d + '?text=' + encodeURIComponent(String(msg || '')) : '';
  }

  function igLink() {
    var h = String(cfg('settings.instagram', '') || '').replace(/^@/, '').trim();
    return h ? 'https://instagram.com/' + encodeURIComponent(h) : '';
  }

  /* No set in the shop yet (or none left): nothing is invented to fill the
     gap. She is invited to message the shop instead. */
  function emptyScreen() {
    var wa = waLink(t('quiz.emptyMsg'));
    var ig = igLink();
    return el('div', { 'class': 'quiz-screen quiz-done' }, [
      el('p', { 'class': 'empty-t', text: t('quiz.emptyTitle') }),
      el('p', { 'class': 'quiz-hint', text: t('quiz.emptyText') }),
      el('div', { 'class': 'btns quiz-actions' }, [
        wa ? el('a', { 'class': 'btn btn-pri btn-lg', href: wa, target: '_blank', rel: 'noopener', text: t('quiz.emptyWa') }) : null,
        ig ? el('a', { 'class': 'btn btn-line', href: ig, target: '_blank', rel: 'noopener', text: t('quiz.emptyIg') }) : null
      ])
    ]);
  }

  /* shown under the result when none of her sets answered everything she
     asked — kept outside the card so the shared picture never says it */
  function closestNote(v) {
    var wa;
    if (!v || v.tier !== 'closest') return null;
    wa = waLink(t('quiz.closestMsg'));
    return el('div', { 'class': 'quiz-closest' }, [
      el('p', { 'class': 'quiz-hint', text: t(v.over ? 'quiz.closestOver' : 'quiz.closestLead') }),
      wa ? el('a', { 'class': 'btn btn-line btn-sm', href: wa, target: '_blank', rel: 'noopener', text: t('quiz.closestWa') }) : null
    ]);
  }

  function current() {
    return st.vars.length ? st.vars[Math.min(st.vi, st.vars.length - 1)] : null;
  }

  /* Her result is the owner's own photograph, shown whole — a portrait phone
     photo is not cropped to fit — on a quiet backdrop. A set without a photo
     yet gets a plain placeholder, never a drawing. It must stay ONE <svg>
     with a viewBox: the share card nests it and scales it by that box. */
  function previewNode(v) {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    var n, brand;

    svg.setAttribute('xmlns', NS);
    svg.setAttribute('class', 'quiz-set quiz-photo');
    svg.setAttribute('viewBox', '0 0 100 75');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', t('quiz.previewAlt', { name: (v && v.name) || '' }));

    n = document.createElementNS(NS, 'rect');
    n.setAttribute('x', '0'); n.setAttribute('y', '0');
    n.setAttribute('width', '100'); n.setAttribute('height', '75');
    n.setAttribute('fill', '#F6EEEA');
    svg.appendChild(n);

    if (v && v.image) {
      n = document.createElementNS(NS, 'image');
      n.setAttribute('x', '0'); n.setAttribute('y', '0');
      n.setAttribute('width', '100'); n.setAttribute('height', '75');
      n.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      n.setAttributeNS('http://www.w3.org/1999/xlink', 'href', v.image);
      n.setAttribute('href', v.image);
      svg.appendChild(n);
      return svg;
    }

    brand = pick(cfg('settings.brand', null)) || '';
    n = document.createElementNS(NS, 'text');
    n.setAttribute('x', '50'); n.setAttribute('y', '36');
    n.setAttribute('text-anchor', 'middle');
    n.setAttribute('font-size', '7');
    n.setAttribute('font-weight', '700');
    n.setAttribute('fill', '#A0798A');
    n.textContent = brand;
    svg.appendChild(n);
    n = document.createElementNS(NS, 'text');
    n.setAttribute('x', '50'); n.setAttribute('y', '46');
    n.setAttribute('text-anchor', 'middle');
    n.setAttribute('font-size', '4.4');
    n.setAttribute('fill', '#A0798A');
    n.textContent = t('quiz.noPhoto');
    svg.appendChild(n);
    return svg;
  }

  /* the three versions, as one row of taps */
  function variantRow() {
    var row = el('div', {
      'class': 'quiz-vars',
      role: 'group',
      'aria-label': t('quiz.variantsLabel')
    });
    var i;
    if (st.vars.length < 2) return null;
    for (i = 0; i < st.vars.length; i++) {
      row.appendChild((function (v, idx) {
        return el('button', {
          type: 'button',
          'class': 'quiz-var sn-pickable' + (idx === st.vi ? ' is-on' : ''),
          'aria-pressed': idx === st.vi ? 'true' : 'false',
          on: {
            click: function () {
              if (idx === st.vi) return;
              st.vi = idx;
              paintResult();
              say(v.name);
            }
          }
        }, [
          el('span', { 'class': 'quiz-var-t', text: v.label || t('quiz.variants.' + v.id) }),
          el('span', { 'class': 'quiz-var-n', text: v.note })
        ]);
      })(st.vars[i], i));
    }
    return row;
  }

  function brandStrip() {
    var brand = pick(cfg('settings.brand', null)) || '';
    var handle = String(cfg('settings.instagram', '') || '').replace(/^@/, '');
    var kids = [];
    if (brand) kids.push(el('span', { 'class': 'quiz-brand-n display', text: brand }));
    if (handle) {
      kids.push(el('span', { 'class': 'quiz-brand-h', dir: 'ltr', text: '@' + handle }));
    }
    if (!kids.length) return null;
    return el('p', { 'class': 'quiz-brand' }, kids);
  }

  /* ---- sharing --------------------------------------------------------- */

  function quizURL(hash) {
    var base;
    try {
      base = window.location.href.split('#')[0];
      if (/\/$/.test(base)) base += 'index.html';
      return base + (hash || '#quiz');
    } catch (e) { return 'index.html' + (hash || '#quiz'); }
  }

  /* Her answers — only the ones she really gave — in the order the questions
     are asked, joined by dots and short enough to survive a WhatsApp message,
     followed by the set she was shown. A friend who opens the link sees that
     same set first; if the owner has since taken it down, she is told so and
     shown the closest ones instead. */
  function answersCode(ans, setId) {
    var out = [], i, k, v;
    for (i = 0; i < STEPS.length; i++) {
      k = STEPS[i].key;
      v = ans && ans[k] && ans[k] !== 'any' ? ans[k] : '';
      out.push(encodeURIComponent(String(v)));
    }
    out.push(encodeURIComponent(String(setId || '')));
    return out.join('.');
  }

  function decodeAnswers(code) {
    var parts = String(code || '').split('.'), out = {}, i;
    if (parts.length < 2) return null;
    for (i = 0; i < STEPS.length && i < parts.length; i++) {
      if (parts[i]) out[STEPS[i].key] = decodeURIComponent(parts[i]);
    }
    return { ans: out, setId: parts.length > STEPS.length ? decodeURIComponent(parts[STEPS.length] || '') : '' };
  }

  /* the link to HER result */
  function resultURL(v) {
    var code = answersCode((v && v.raw) || st.ans, v && v.real ? v.real.id : '');
    return code ? quizURL('#r=' + code) : quizURL();
  }

  function shareIt(v) {
    var brand = pick(cfg('settings.brand', null)) || '';
    var text = t('quiz.shareText', { name: v.name, brand: brand });
    var url = resultURL(v);
    var u = ui();

    try {
      if (navigator && typeof navigator.share === 'function') {
        navigator.share({ title: t('quiz.shareTitle'), text: text, url: url })['catch'](function () { });
        return;
      }
    } catch (e) { /* fall through to the clipboard */ }

    if (u && typeof u.copy === 'function') {
      u.copy(text + ' ' + url).then(function (ok) {
        toast(t(ok ? 'quiz.shareCopied' : 'quiz.shareFail'), ok ? 'ok' : 'err');
      }, function () { toast(t('quiz.shareFail'), 'err'); });
      return;
    }
    toast(t('quiz.shareFail'), 'err');
  }

  /* The postable picture: her set on real hands, framed, with the set's name
     and the shop's handle drawn into the image itself so a repost still
     points home. Built as one <svg> and rasterised by the render engine. */
  function shareCard(v) {
    var NS = 'http://www.w3.org/2000/svg';
    var W = 1080, H = 1350;
    var BAND = { y: 246, h: 700, w: 1000 };
    var svg = document.createElementNS(NS, 'svg');
    var inner = previewNode(v);
    var brand = pick(cfg('settings.brand', null)) || '';
    var handle = String(cfg('settings.instagram', '') || '').replace(/^@/, '');
    var vb, iw, ih, scale, dw, dh, dx, dy, defs, grad, clip, box, wrap;
    var rtl = (SN.I18n && SN.I18n.lang) !== 'en';

    function node(tag, attrs) {
      var n = document.createElementNS(NS, tag), k;
      for (k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, String(attrs[k]));
      }
      return n;
    }

    function text(str, y, size, weight, colour, ltr) {
      var n = node('text', {
        x: W / 2, y: y, 'text-anchor': 'middle',
        'font-family': 'Tajawal, Reem Kufi, system-ui, -apple-system, Segoe UI, sans-serif',
        'font-size': size, 'font-weight': weight, fill: colour,
        /* the handle is a Latin string: left to right even on the Arabic card,
           or the @ is bidi-reordered to the far end and stops being a handle */
        direction: (ltr || !rtl) ? 'ltr' : 'rtl'
      });
      n.textContent = String(str || '');
      svg.appendChild(n);
      return n;
    }

    if (!inner) return null;
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));

    defs = node('defs');
    grad = node('linearGradient', { id: 'sn-qc-bg', x1: 0, y1: 0, x2: 0.35, y2: 1 });
    grad.appendChild(node('stop', { offset: 0, 'stop-color': '#FDF2F0' }));
    grad.appendChild(node('stop', { offset: 1, 'stop-color': '#F4E3E4' }));
    defs.appendChild(grad);
    svg.appendChild(defs);
    svg.appendChild(node('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#sn-qc-bg)' }));

    text(v.name, 148, 84, 700, '#8C4459');
    text(v.sub, 212, 36, 500, '#7A6069');

    /* the preview is styled for the page (width:100%), which a nested <svg>
       would obey instead of the box we are giving it here */
    vb = String(inner.getAttribute('viewBox') || '').split(/[\s,]+/);
    iw = parseFloat(vb[2]) || 1;
    ih = parseFloat(vb[3]) || 1;
    scale = Math.min(BAND.w / iw, BAND.h / ih);
    dw = iw * scale;
    dh = ih * scale;
    dx = (W - dw) / 2;
    dy = BAND.y + (BAND.h - dh) / 2;

    inner.removeAttribute('style');
    inner.removeAttribute('class');
    inner.removeAttribute('role');
    inner.removeAttribute('aria-label');
    inner.setAttribute('x', String(dx));
    inner.setAttribute('y', String(dy));
    inner.setAttribute('width', String(dw));
    inner.setAttribute('height', String(dh));

    clip = node('clipPath', { id: 'sn-qc-clip' });
    clip.appendChild(node('rect', { x: dx, y: dy, width: dw, height: dh, rx: 34 }));
    defs.appendChild(clip);
    wrap = node('g', { 'clip-path': 'url(#sn-qc-clip)' });
    wrap.appendChild(inner);
    svg.appendChild(wrap);

    box = node('rect', {
      x: dx, y: dy, width: dw, height: dh, rx: 34,
      fill: 'none', stroke: '#E2CDD1', 'stroke-width': 2
    });
    svg.appendChild(box);

    /* SVG has no line box, so the sentence is broken here — three lines at
       most, because a fourth would crowd the shop's name off the card */
    (function () {
      var words = String(v.why || '').split(/\s+/);
      var lines = [], line = '', i, y;
      for (i = 0; i < words.length; i++) {
        if (!words[i]) continue;
        if (line && (line + ' ' + words[i]).length > 46) {
          lines.push(line);
          line = words[i];
          if (lines.length === 3) break;
        } else {
          line = line ? line + ' ' + words[i] : words[i];
        }
      }
      if (line && lines.length < 3) lines.push(line);
      for (i = 0; i < lines.length; i++) {
        y = dy + dh + 62 + i * 44;
        text(lines[i], y, 32, 500, '#6B5560');
      }
    })();

    if (brand) text(brand, H - 116, 56, 700, '#8C4459');
    if (handle) text('@' + handle, H - 62, 36, 500, '#B08A3F', true);
    return svg;
  }

  /* the picture export can only carry a photo stored in the site itself —
     a typed web address would come out as an empty frame */
  function canSave(v) {
    return !!(v && /^data:image\//.test(String(v.image || '')));
  }

  function saveImage(v) {
    var card = shareCard(v);
    var u = ui();
    if (!card || !SN.Nail || typeof SN.Nail.toPNG !== 'function' || !u || typeof u.download !== 'function') {
      toast(t('quiz.saveFail'), 'err');
      return;
    }
    if (st.busy) return;
    st.busy = true;
    toast(t('quiz.savingImg'), 'info');
    SN.Nail.toPNG(card, { scale: 1, bg: '#FDF2F0' }).then(function (blob) {
      st.busy = false;
      u.download(blob, 'shosh-nail-' + v.id + '.png', 'image/png');
      toast(t('quiz.savedImg'), 'ok');
    }, function (e) {
      st.busy = false;
      console.warn('[SN.Quiz] could not export the card', e);
      toast(t('quiz.saveFail'), 'err');
    });
  }

  function orderIt(v) {
    if (!v) return;
    if (SN.Checkout && typeof SN.Checkout.open === 'function') {
      try {
        if (v.real) { SN.Checkout.open({ kind: 'ready', item: v.real, qty: 1, link: resultURL(v) }); return; }
      } catch (e) { console.warn('[SN.Quiz] checkout failed to open', e); }
    }
    toast(t('common.error'), 'err');
  }

  /* The three promises that answer "and then what?" — the question she is
     asking herself with her thumb over the order button. */
  function afterOrderNote() {
    var txt = pick(cfg('settings.afterOrder', null));
    if (!txt) return null;
    return el('p', { 'class': 'quiz-after', text: txt });
  }

  /* the launch offer, only while the owner keeps it on */
  function foundingNote() {
    var f = cfg('settings.founding', null);
    if (!f || typeof f !== 'object' || f.on === false || !(Number(f.total) > 0)) return null;
    return el('p', { 'class': 'quiz-after quiz-founding', text: t('quiz.founding', {
      n: num(Number(f.total)), g: money(Number(f.gift) || 0)
    }) });
  }

  /* ---- the whole reveal ------------------------------------------------ */

  function doneScreen(first) {
    var v = current();
    var art = el('div', { 'class': 'quiz-hero' });
    var svg = v ? previewNode(v) : null;
    var chips = [], i;

    if (!v) return emptyScreen();
    if (svg) art.appendChild(svg);

    for (i = 0; i < v.chips.length; i++) {
      if (v.chips[i]) chips.push(el('span', { 'class': 'tag', text: v.chips[i] }));
    }

    return el('div', { 'class': 'quiz-screen quiz-done' }, [
      (first && !reducedMotion()) ? burst() : null,

      st.notice ? el('p', { 'class': 'quiz-hint quiz-notice', role: 'status', text: st.notice }) : null,
      variantRow(),
      st.vars.length > 1
        ? el('p', { 'class': 'tiny muted center', text: t('quiz.variantsHint') })
        : null,

      /* everything inside .quiz-card is what a screenshot carries */
      el('div', { 'class': 'quiz-card' + (reducedMotion() ? '' : ' sn-in') }, [
        el('p', { 'class': 'eyebrow quiz-eyebrow', text: t(v.tier === 'closest' ? 'quiz.closestTitle' : 'quiz.doneTitle') }),
        el('h3', { 'class': 'quiz-name display', text: v.name }),
        v.sub ? el('p', { 'class': 'quiz-sub', text: v.sub }) : null,
        art,
        el('p', { 'class': 'quiz-hint quiz-blurb', text: v.why }),
        chips.length
          ? el('div', { 'class': 'quiz-picks', 'aria-label': t('quiz.yourPicks') }, chips)
          : null,
        brandStrip()
      ]),

      closestNote(v),

      v.price === null ? null : el('p', {
        'class': 'quiz-price price', text: t('quiz.priceFrom', { p: money(v.price) })
      }),

      /* what happens after she presses it, said before she presses it */
      afterOrderNote(),
      foundingNote(),

      el('div', { 'class': 'btns quiz-actions' }, [
        el('button', {
          type: 'button', 'class': 'btn btn-pri btn-lg', text: t('quiz.order'),
          on: { click: function () { orderIt(current()); } }
        })
      ]),
      el('p', {
        'class': 'hint quiz-note center',
        text: v.price === null ? t('quiz.savedNote') : t('quiz.priceNote')
      }),
      el('p', { 'class': 'hint quiz-note center', text: t('quiz.editHint') }),
      el('p', { 'class': 'hint quiz-note center', text: t('quiz.sizeHint') }),


      el('div', { 'class': 'btns quiz-more' }, [
        el('button', {
          type: 'button', 'class': 'btn btn-ghost btn-sm', on: { click: function () { shareIt(current()); } }
        }, [
          el('span', { html: icon('share', 15), 'aria-hidden': 'true' }),
          el('span', { text: t('quiz.share') })
        ]),
        canSave(v) ? el('button', {
          type: 'button', 'class': 'btn btn-ghost btn-sm', on: { click: function () { saveImage(current()); } }
        }, [
          el('span', { html: icon('download', 15), 'aria-hidden': 'true' }),
          el('span', { text: t('quiz.saveImg') })
        ]) : null,
        el('button', {
          type: 'button', 'class': 'btn btn-ghost btn-sm', text: t('quiz.again'),
          on: { click: restart }
        })
      ])
    ]);
  }

  /* ==================================================================== */
  /* 6. flow                                                               */
  /* ==================================================================== */

  /* `#sn-announce` is the owner's marketing bar, NOT a live region — writing
     into it would delete the announcement. The quiz carries its own. */
  function say(text) {
    if (st.live) st.live.textContent = String(text || '');
  }

  function scroller() {
    if (st.m && st.m.body) return st.m.body;
    if (st.stage && typeof st.stage.closest === 'function') return st.stage.closest('.modal-body');
    return null;
  }

  function paint() {
    if (!st.stage) return;
    if (st.empty) fill(st.stage, [emptyScreen()]);
    else if (st.step < total()) fill(st.stage, [topBar(), questionScreen()]);
    else if (st.step === total()) fill(st.stage, [topBar(), waitScreen()]);
    else {
      fill(st.stage, [doneScreen(!st.lit)]);
      st.lit = true;
    }
    if (SN.I18n && typeof SN.I18n.apply === 'function' && st.m && st.m.dialog) {
      SN.I18n.apply(st.m.dialog);
    }
  }

  /* a variant swap or a skin swap: repaint the reveal without throwing her
     back to the top of it */
  function paintResult() {
    var box = scroller();
    var top = box ? box.scrollTop : 0;
    if (!st.stage) return;
    fill(st.stage, [doneScreen(false)]);
    if (box) box.scrollTop = top;
  }

  function firstUnanswered() {
    var i;
    for (i = 0; i < total(); i++) {
      if (!st.ans[steps()[i].key]) return i;
    }
    return total();
  }

  /* Her results, with a shared set pinned first when she opened a friend's
     link — or a plain note when that set is no longer in the shop. */
  function resultsFor(ans) {
    var vars = variantsFor(ans), it = null, sets, i, pinned;
    st.notice = '';
    if (!st.pin) return vars;
    sets = activeSets();
    for (i = 0; i < sets.length; i++) if (String(sets[i].id) === String(st.pin)) it = sets[i];
    if (!it) { st.notice = t('quiz.sharedGone'); return vars; }
    pinned = realVariant({ it: it, why: [], rank: 0 }, normAnswers(ans), 'match');
    for (i = vars.length - 1; i >= 0; i--) if (vars[i].real && String(vars[i].real.id) === String(it.id)) vars.splice(i, 1);
    vars.unshift(pinned);
    for (i = 0; i < vars.length; i++) vars[i].label = t('quiz.vNear' + Math.min(3, i + 1));
    return vars.slice(0, 3);
  }

  function reveal() {
    st.lit = false;
    st.vars = resultsFor(st.ans);
    st.vi = 0;
    st.step = total() + 1;
    paint();
    say(t(st.vars.length && st.vars[0].tier === 'closest' ? 'quiz.closestTitle' : 'quiz.doneTitle'));
  }

  function answer(key, id) {
    if (id) st.ans[key] = id;
    if (st.step < total() - 1) {
      st.step += 1;
      paint();
      return;
    }
    /* last answer in: hold one beat, then reveal */
    st.step = total();
    paint();
    clearTimer();
    st.timer = window.setTimeout(function () {
      st.timer = 0;
      reveal();
    }, reducedMotion() ? 0 : WAIT);
  }

  function back() {
    clearTimer();
    if (st.step <= 0) return;
    st.step -= 1;
    paint();
  }

  function restart() {
    var box;
    clearTimer();
    st.ans = {};
    st.vars = [];
    st.pin = '';
    st.notice = '';
    st.vi = 0;
    st.lit = false;
    st.step = 0;
    paint();
    box = scroller();
    if (box) box.scrollTop = 0;
  }

  function close() {
    var m = st.m;
    clearTimer();
    st.m = null;
    st.root = null;
    st.stage = null;
    st.live = null;
    st.open = false;
    try { if (m && typeof m.close === 'function') m.close(); }
    catch (e) { /* ignore */ }
  }

  function open(opts) {
    var u = ui();
    var o = opts || {};
    var k;

    if (st.open) return;
    if (!u || typeof u.modal !== 'function') {
      console.warn('[SN.Quiz] SN.UI.modal is missing — the quiz cannot open.');
      return;
    }

    clearTimer();
    st.ans = {};
    st.vars = [];
    st.vi = 0;
    st.busy = false;
    st.pin = '';
    st.notice = '';
    /* nothing to recommend yet: say so at once instead of asking questions
       that can only end in an empty result */
    st.empty = !activeSets().length;
    if (o.seed) {
      for (k in o.seed) {
        if (Object.prototype.hasOwnProperty.call(o.seed, k)) st.ans[k] = o.seed[k];
      }
    }
    st.step = firstUnanswered();
    st.live = el('span', { 'class': 'sr-only', role: 'status', 'aria-live': 'polite' });
    st.stage = el('div', { 'class': 'quiz' });
    st.root = el('div', {}, [st.live, st.stage]);
    st.open = true;

    st.m = u.modal({
      title: t('quiz.title'),
      size: 'lg',
      cls: 'quiz-modal',
      body: st.root,
      onClose: function () {
        clearTimer();
        st.open = false;
        st.m = null;
        st.root = null;
        st.stage = null;
        st.live = null;
        if (o.hash !== false) setHash(false);
      }
    });

    if (st.empty) paint();
    else if (st.step >= total()) reveal();
    else paint();
    if (o.hash !== false) setHash(true);
  }

  /* ==================================================================== */
  /* 7. boot                                                               */
  /* ==================================================================== */

  function hashIsQuiz() {
    var h = String(window.location.hash || '');
    return h === '#quiz' || h === '#!quiz';
  }

  function hashResult() {
    var m = String(window.location.hash || '').match(/^#r=(.+)$/);
    return m ? decodeAnswers(m[1]) : null;
  }

  /* someone opened a friend's set: show that set, not question one */
  function openResult(shared) {
    var k, ans = (shared && shared.ans) || {};
    if (st.open) return;
    open();
    if (!st.open || st.empty) return;
    st.ans = {};
    for (k in ans) if (Object.prototype.hasOwnProperty.call(ans, k)) st.ans[k] = ans[k];
    st.pin = (shared && shared.setId) || '';
    reveal();
  }

  function start() {
    /* a language flip must not lose her place: repaint in the new language
       with every answer still where she left it */
    if (SN.I18n && typeof SN.I18n.onChange === 'function') {
      SN.I18n.onChange(function () {
        if (!st.open) return;
        if (!st.empty && st.step > total()) { st.vars = resultsFor(st.ans); }
        paint();
      });
    }

    window.addEventListener('hashchange', function () {
      var shared;
      if (st.hashLock) return;
      shared = hashResult();
      if (shared) { if (!st.open) openResult(shared); return; }
      if (hashIsQuiz()) { if (!st.open) open(); }
      else if (st.open) close();
    }, false);

    (function () {
      var shared = hashResult();
      var go = shared ? function () { openResult(shared); } : function () { open(); };
      if (!shared && !hashIsQuiz()) return;
      if (SN.Store && typeof SN.Store.ready === 'function') SN.Store.ready(go);
      else go();
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, false);
  } else {
    start();
  }

  /* ==================================================================== */
  /* 8. export                                                             */
  /* ==================================================================== */

  SN.Quiz = {
    open: open,
    close: close,
    isOpen: function () { return st.open; },
    variants: variantsFor,
    /* the questions the owner's current sets let the quiz ask */
    steps: function () { return steps().map(function (x) { return x.key; }); },
    total: STEPS.length,   /* every question the quiz can ask */

    /* the first question, rendered on the home page so the quiz starts
       before the modal ever opens */
    teaser: function () {
      var step = STEPS[0];
      var opts = optionsFor(step.key), out = [], i;
      for (i = 0; i < opts.length; i++) {
        out.push({
          id: opts[i].id,
          label: opts[i].label,
          art: tileArt(step, opts[i], {})
        });
      }
      return { key: step.key, question: t(step.q), options: out };
    },

    answers: function () {
      var out = {}, k;
      for (k in st.ans) if (Object.prototype.hasOwnProperty.call(st.ans, k)) out[k] = st.ans[k];
      return out;
    }
  };
})();
