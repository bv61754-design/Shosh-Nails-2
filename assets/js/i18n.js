/*! Shosh Nail — assets/js/i18n.js
 *  SN.I18n : language, dictionary, formatting (owner: CORE)
 *  Contract: SPEC.md section 10. Attaches exactly one property: window.SN.I18n
 *  Reserved CORE namespaces shipped here: nav.* common.* a11y.* footer.* theme.* order.* pay.*
 *  Pages add their own namespace with SN.I18n.extend({ar:{...},en:{...}}) — never edit this file.
 */
(function(){
  'use strict';

  var SN = (window.SN = window.SN || {});

  var LANG_KEY = 'shosh-lang';
  /* the Arabic variant she last used, so the EN toggle brings her back to it */
  var ARV_KEY  = 'shosh-arv';
  /* 'iq' is Iraqi Arabic — the default — and falls back to 'ar' (standard
     Arabic) for any string it does not carry, then to English */
  var LANGS    = ['iq', 'ar', 'en'];
  var CHAIN    = { iq: ['iq', 'ar', 'en'], ar: ['ar', 'iq', 'en'], en: ['en', 'ar', 'iq'] };

  /* ==================================================================== */
  /* Base dictionary (authored nested for readability, flattened on boot)  */
  /* ==================================================================== */

  var BASE = {

    /* ------------------------------------------------------------- IRAQI */
    /* Only the keys whose Iraqi wording differs from `ar`; everything else
       falls through iq -> ar -> en. Labels that are single nouns stay in `ar`.
       nav.* has nothing dialect-specific, so it is not repeated here.       */
    iq: {
      a11y: {
        toggleMenu: 'افتحي القائمة أو سدّيها',
        toggleTheme: 'بدّلي بين المظهر الفاتح والداكن',
        toggleLang: 'غيّري لغة الموقع',
        selectNail: 'اختاري الظفر',
        openDetails: 'شوفي التفاصيل',
        scrollTop: 'ارجعي لفوق'
      },
      common: {
        deleteConfirm: 'متأكدة تحذفين؟ ما راح نقدر نرجّعه بعدين.',
        searchPh: 'دوّري هنا…',
        loading: 'لحظة… دا يحمّل',
        empty: 'ماكو شي هنا هسة',
        emptyHint: 'جرّبي تغيّرين البحث أو التصفية',
        shipping: 'التوصيل',
        more: 'شوفي أكثر',
        less: 'شوفي أقل',
        instagram: 'إنستغرام',
        phone: 'رقم الموبايل',
        hours: 'أوقات الدوام',
        notePh: 'أكو شي تحبين نعرفه؟',
        retry: 'جرّبي مرة ثانية'
      },
      footer: {
        hours: 'أوقات الدوام',
        made: 'مسوّي بحبّ بالعراق',
        backToTop: 'ارجعي لفوق'
      },
      theme: {
        toggle: 'بدّلي المظهر'
      },
      order: {
        phone: 'رقم الموبايل',
        addressPh: 'المنطقة والشارع وأقرب نقطة دالة',
        notePh: 'أكو طلب خاص؟ اكتبيه هنا',
        expressNote: 'نجهّز لك طلبك خلال 24 إلى 48 ساعة',
        giftWrapNote: 'علبة أنيقة ويّاها كارت إهداء',
        shipping: 'التوصيل',
        freeShip: 'توصيل مجاني',
        freeShipHint: 'التوصيل مجاني للطلبات فوق {n}',
        sending: 'لحظة… دا ندزّ الطلب',
        thanks: 'طلبك يوصلنا لمن تضغطين إرسال بالواتساب أو الإنستغرام. إذا ما انفتح التطبيق، انسخي الطلب من الزر اللي تحت ودزّيه لنا بنفسك.',
        openWa: 'افتحي واتساب',
        openIg: 'دزّي على إنستغرام',
        igCopied: 'نسخنا لك طلبك — بس الصقيه بالمحادثة',
        igCopyFail: 'ما قدرنا ننسخ الطلب. انسخيه من زر «نسخ الطلب» اللي فوق.',
        downloadImg: 'حمّلي صورة التصميم',
        terms: 'لمن تضغطين «تأكيد الطلب» يعني توافقين على شروط الطلب والاستبدال.',
        termsLink: 'اقري الشروط',
        termsErr: 'لازم توافقين على الشروط قبل ما تأكدين',
        phoneErr: 'تأكدي من رقم الموبايل',
        sizeLine: 'المقاس: نتفق عليه بالمحادثة بعد ما تدزين الطلب',
        sizeNote: 'ما تعرفين مقاسك؟ عادي — بعد ما تدزين طلبك ندزّ لك طريقة القياس ويّاها صورة، أو تختارين S / M / L.',
        depositNote: 'تدفعينه مقدّمًا وينخصم من المبلغ',
        editHint: 'تحبين تغيّرين شي بهالطقم (لون، طول، شكل)؟ اكتبيه بالملاحظات ونضبطه لك.',
        foundingConfirm: 'عرض التأسيس: مهما كان سعر طلبك، ينضاف لطلبك طقم مجاني بقيمة {g}. ولمن يوصلك، نفرح بصورة الطقم على إيدك ورأيك.',
        igHow: 'ننسخ لك رسالة الطلب، وإنتي تلصقينها بمحادثة إنستغرام.',
        guideText: 'صوّري إيدك من فوق وحطّي مسطرة ملاصقة للأظافر، ودزّي لنا الصورة بالمحادثة. أو قيسي عرض كل ظفر بالمليمتر عند أوسع نقطة. وإذا طلع بين رقمين، خذي الأوسع دائمًا.',
        notifyErr: 'ما قدرنا ندزّ الإشعار، بس طلبك محفوظ عندنا.',
        empty: 'ماكو طلبات هسة',
        status: {
          shipped: 'طلع للتوصيل'
        }
      },
      pay: {
        choose: 'اختاري طريقة الدفع اللي تناسبك',
        required: 'اختاري طريقة الدفع أول شي',
        after: 'بعد التحويل دزّي لنا صورة الوصل على الواتساب',
        secure: 'معلوماتك محفوظة، وما نطلب منك أي بيانات بطاقة داخل الموقع'
      }
    },

    /* ------------------------------------------------------------ ARABIC */
    ar: {
      nav: {
        home: 'الرئيسية',
        shop: 'تصاميم جاهزة',
        faq: 'الأسئلة والتواصل',
        admin: 'لوحة التحكم',
        cta: 'اختبار الستايل',
        menu: 'القائمة',
        closeMenu: 'إغلاق القائمة',
        lang: 'English',
        langShort: 'EN',
        brandHome: 'الصفحة الرئيسية'
      },
      a11y: {
        skip: 'تخطّي إلى المحتوى',
        mainNav: 'التنقل الرئيسي',
        footerNav: 'روابط التذييل',
        toggleMenu: 'فتح القائمة أو إغلاقها',
        toggleTheme: 'التبديل بين المظهر الفاتح والداكن',
        toggleLang: 'تغيير لغة الموقع',
        close: 'إغلاق',
        dialog: 'نافذة',
        notifications: 'التنبيهات',
        loading: 'جاري التحميل',
        selectNail: 'اختيار الظفر',
        required: 'حقل مطلوب',
        newWindow: 'يفتح في نافذة جديدة',
        remove: 'إزالة',
        increase: 'زيادة',
        decrease: 'إنقاص',
        openDetails: 'عرض التفاصيل',
        prevStep: 'الخطوة السابقة',
        nextStep: 'الخطوة التالية',
        scrollTop: 'العودة للأعلى'
      },
      common: {
        save: 'حفظ',
        saveChanges: 'حفظ التعديلات',
        cancel: 'إلغاء',
        'delete': 'حذف',
        deleteConfirm: 'متأكدة من الحذف؟ ما راح نقدر نرجّعه.',
        remove: 'إزالة',
        add: 'إضافة',
        edit: 'تعديل',
        duplicate: 'تكرار',
        close: 'إغلاق',
        open: 'فتح',
        view: 'عرض',
        details: 'التفاصيل',
        search: 'بحث',
        searchPh: 'ابحثي هنا…',
        filter: 'تصفية',
        sort: 'ترتيب',
        all: 'الكل',
        none: 'بدون',
        back: 'رجوع',
        next: 'التالي',
        prev: 'السابق',
        step: 'الخطوة',
        stepOf: 'الخطوة {n} من {total}',
        confirm: 'تأكيد',
        yes: 'نعم',
        no: 'لا',
        ok: 'تمام',
        copy: 'نسخ',
        copied: 'تم النسخ',
        copyLink: 'نسخ الرابط',
        download: 'تحميل',
        share: 'مشاركة',
        shared: 'تمت المشاركة',
        reset: 'إعادة الضبط',
        clear: 'مسح',
        undo: 'تراجع',
        redo: 'إعادة',
        random: 'عشوائي',
        preview: 'معاينة',
        apply: 'تطبيق',
        applyAll: 'تطبيق على الكل',
        select: 'اختيار',
        selected: 'محدد',
        selectedN: '{n} محدد',
        loading: 'جاري التحميل…',
        empty: 'ما فيه شيء هنا حالياً',
        emptyHint: 'جرّبي تغيير البحث أو التصفية',
        required: 'مطلوب',
        invalid: 'قيمة غير صحيحة',
        optional: 'اختياري',
        price: 'السعر',
        total: 'الإجمالي',
        subtotal: 'المجموع',
        shipping: 'الشحن',
        vat: 'ضريبة القيمة المضافة',
        free: 'مجاني',
        qty: 'الكمية',
        from: 'من',
        to: 'إلى',
        'new': 'جديد',
        more: 'عرض المزيد',
        less: 'عرض أقل',
        success: 'تم بنجاح',
        error: 'صار خطأ، جرّبي مرة ثانية',
        saved: 'تم الحفظ',
        deleted: 'تم الحذف',
        added: 'تمت الإضافة',
        updated: 'تم التحديث',
        comingSoon: 'قريباً',
        whatsapp: 'واتساب',
        instagram: 'انستقرام',
        snapchat: 'سناب شات',
        tiktok: 'تيك توك',
        phone: 'رقم الجوال',
        call: 'اتصال',
        email: 'البريد الإلكتروني',
        hours: 'أوقات العمل',
        city: 'المدينة',
        address: 'العنوان',
        name: 'الاسم',
        note: 'ملاحظات',
        notePh: 'أي تفاصيل تحبين نعرفها؟',
        status: 'الحالة',
        date: 'التاريخ',
        image: 'الصورة',
        upload: 'رفع صورة',
        retry: 'إعادة المحاولة',
        'continue': 'متابعة',
        start: 'ابدئي',
        done: 'إنهاء',
        skip: 'تخطي',
        results: 'النتائج',
        resultsN: '{n} نتيجة',
        color: 'اللون',
        size: 'المقاس',
        currency: 'د.ع',
        print: 'طباعة',
        exportLbl: 'تصدير',
        importLbl: 'استيراد',
        refresh: 'تحديث',
        help: 'مساعدة',
        settings: 'الإعدادات',
        language: 'اللغة',
        description: 'الوصف',
        title: 'العنوان',
        link: 'الرابط',
        tags: 'الوسوم',
        count: 'العدد',
        and: 'و',
        or: 'أو'
      },
      footer: {
        about: 'عن شوش نيل',
        links: 'روابط سريعة',
        contact: 'تواصلي معنا',
        follow: 'تابعينا',
        hours: 'أوقات العمل',
        location: 'الموقع',
        admin: 'لوحة التحكم',
        dialect: 'عراقي',
        fusha: 'فصحى',
        variantLbl: 'لهجة الموقع',
        rights: 'جميع الحقوق محفوظة',
        copy: '© {year} {brand} — جميع الحقوق محفوظة',
        made: 'صُنع بحبّ في العراق',
        backToTop: 'العودة للأعلى'
      },
      theme: {
        label: 'المظهر',
        light: 'فاتح',
        dark: 'داكن',
        toggle: 'تبديل المظهر'
      },
      order: {
        title: 'طلبك',
        summary: 'ملخص الطلب',
        number: 'رقم الطلب',
        date: 'التاريخ',
        customer: 'بيانات التواصل',
        name: 'الاسم الكامل',
        namePh: 'اكتبي اسمك',
        phone: 'رقم الهاتف',
        phonePh: '07XXXXXXXXX',
        city: 'المحافظة',
        cityPh: 'اختاري محافظتك',
        address: 'العنوان',
        addressPh: 'الحي والشارع وأقرب معلم',
        note: 'ملاحظات',
        notePh: 'أي طلب خاص؟ اكتبيه هنا',
        step1: 'المعلومات',
        step2: 'طريقة الدفع',
        step3: 'التأكيد',
        qty: 'الكمية',
        express: 'تنفيذ سريع',
        expressNote: 'ننفّذ طلبك خلال 24 إلى 48 ساعة',
        giftWrap: 'تغليف هدية',
        giftWrapNote: 'علبة أنيقة مع بطاقة إهداء',
        shipping: 'الشحن',
        freeShip: 'شحن مجاني',
        freeShipHint: 'الشحن مجاني للطلبات فوق {n}',
        vat: 'ضريبة القيمة المضافة',
        deposit: 'العربون',
        total: 'الإجمالي',
        items: 'تفاصيل الطلب',
        custom: 'تصميم مخصص',
        ready: 'تصميم جاهز',
        submit: 'تأكيد الطلب',
        sending: 'جاري الإرسال…',
        sent: 'باقي خطوة وحدة',
        thanks: 'طلبك يوصلنا لمن تضغطين إرسال في واتساب أو إنستغرام. إذا ما انفتح التطبيق، انسخي الطلب من الزر تحت وأرسليه لنا بنفسك.',
        copySummary: 'نسخ الملخص',
        openWa: 'فتح واتساب',
        openIg: 'إرسال على إنستغرام',
        igCopied: 'نسخنا طلبك — الصقيه في المحادثة',
        igCopyFail: 'ما قدرنا ننسخ الطلب. انسخيه من زر «نسخ الطلب» فوق.',
        downloadImg: 'تحميل صورة التصميم',
        newDesign: 'تصميم جديد',
        terms: 'بضغطك «تأكيد الطلب» توافقين على شروط الطلب والاستبدال.',
        termsLink: 'اقرئي الشروط',
        termsErr: 'لازم توافقين على الشروط قبل التأكيد',
        nameErr: 'اكتبي اسمك (حرفين على الأقل)',
        phoneErr: 'تأكدي من رقم الهاتف',
        govErr: 'اختاري محافظتك حتى نحسب لك أجرة التوصيل',
        govFee: 'التوصيل إلى {g}: {f} · يوصلك خلال {d}',
        sizeLine: 'المقاس: نتفق عليه بالمحادثة بعد الطلب',
        sizeNote: 'ما تعرفين مقاسك؟ عادي — بعد ما تدزين طلبك نرسل لك طريقة القياس مع صورة، أو تختارين S / M / L.',
        stepsTitle: 'شنو يصير بعد ما تدزين؟',
        depositNote: 'يُدفع مقدّمًا وينخصم من المبلغ',
        editHint: 'تحبين تغيّرين شي بهالطقم (لون، طول، شكل)؟ اكتبيه في الملاحظات ونضبطه لك.',
        foundingLine: 'زبونة تأسيس ✨ (عرض أول {n} زبونة)',
        foundingConfirm: 'عرض التأسيس: مهما كان سعر طلبك، يُضاف لطلبك طقم مجاني بقيمة {g}. وعندما يصلك، نفرح بصورة الطقم على يدك ورأيك.',
        sendTitle: 'دزّي طلبك',
        sendLead: 'طلبك يوصلنا لمن تدزين الرسالة. اختاري وين تدزينها:',
        sendWa: 'دزّي على واتساب',
        sendIg: 'دزّي على إنستغرام',
        igHow: 'ننسخ لك رسالة الطلب، وتلصقينها في محادثة إنستغرام.',
        copyFull: 'نسخ كل التفاصيل',
        codeLbl: 'رمز طلبك',
        guideTitle: 'طريقة القياس',
        guideText: 'صوّري يدك من فوق ومسطرة ملاصقة للأظافر، ودزي الصورة لنا بالمحادثة. أو قيسي عرض كل ظفر بالمليمتر عند أوسع نقطة. وإذا طلع بين رقمين، الأوسع دائمًا.',
        guideSave: 'احفظي صورة الشرح',
        guideWidest: 'قيسي أوسع نقطة في الظفر',
        msgHi: 'هلا شوش 💅',
        msgNew: 'طلب جديد',
        msgSet: 'الطقم',
        msgQuiz: 'طقم من اختبار الستايل',
        msgTotal: 'الإجمالي',
        msgIncl: 'شامل التوصيل إلى {g} {f}',
        msgPay: 'الدفع',
        msgDeposit: 'عربون {d} مقدّمًا',
        msgGov: 'المحافظة',
        msgLink: 'رابط النتيجة',
        notifyErr: 'ما قدرنا نرسل الإشعار، بس طلبك محفوظ عندنا.',
        empty: 'ما فيه طلبات حالياً',
        status: {
          'new': 'جديد',
          confirmed: 'مؤكد',
          shipped: 'تم الشحن',
          done: 'مكتمل',
          cancelled: 'ملغي'
        }
      },
      pay: {
        title: 'طريقة الدفع',
        choose: 'اختاري طريقة الدفع المناسبة لك',
        required: 'اختاري طريقة الدفع أولاً',
        details: 'تفاصيل الدفع',
        note: 'ملاحظة',
        bank: 'تحويل بنكي',
        card: 'بطاقة مدى أو فيزا',
        wallet: 'محفظة إلكترونية',
        cod: 'الدفع عند الاستلام',
        applepay: 'Apple Pay',
        copyIban: 'نسخ رقم الآيبان',
        ibanCopied: 'تم نسخ رقم الآيبان',
        after: 'بعد التحويل أرسلي صورة الإيصال على الواتساب',
        secure: 'معلوماتك محفوظة، وما نطلب أي بيانات بطاقة داخل الموقع'
      }
    },

    /* ----------------------------------------------------------- ENGLISH */
    en: {
      nav: {
        home: 'Home',
        shop: 'Ready Designs',
        faq: 'Help & Contact',
        admin: 'Admin',
        cta: 'Style quiz',
        menu: 'Menu',
        closeMenu: 'Close menu',
        lang: 'العربية',
        langShort: 'ع',
        brandHome: 'Home page'
      },
      a11y: {
        skip: 'Skip to main content',
        mainNav: 'Main navigation',
        footerNav: 'Footer links',
        toggleMenu: 'Open or close the menu',
        toggleTheme: 'Switch between light and dark theme',
        toggleLang: 'Change the site language',
        close: 'Close',
        dialog: 'Dialog',
        notifications: 'Notifications',
        loading: 'Loading',
        selectNail: 'Select nail',
        required: 'Required field',
        newWindow: 'Opens in a new window',
        remove: 'Remove',
        increase: 'Increase',
        decrease: 'Decrease',
        openDetails: 'View details',
        prevStep: 'Previous step',
        nextStep: 'Next step',
        scrollTop: 'Back to top'
      },
      common: {
        save: 'Save',
        saveChanges: 'Save changes',
        cancel: 'Cancel',
        'delete': 'Delete',
        deleteConfirm: 'Delete this? It can’t be undone.',
        remove: 'Remove',
        add: 'Add',
        edit: 'Edit',
        duplicate: 'Duplicate',
        close: 'Close',
        open: 'Open',
        view: 'View',
        details: 'Details',
        search: 'Search',
        searchPh: 'Search…',
        filter: 'Filter',
        sort: 'Sort',
        all: 'All',
        none: 'None',
        back: 'Back',
        next: 'Next',
        prev: 'Previous',
        step: 'Step',
        stepOf: 'Step {n} of {total}',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        copy: 'Copy',
        copied: 'Copied',
        copyLink: 'Copy link',
        download: 'Download',
        share: 'Share',
        shared: 'Shared',
        reset: 'Reset',
        clear: 'Clear',
        undo: 'Undo',
        redo: 'Redo',
        random: 'Random',
        preview: 'Preview',
        apply: 'Apply',
        applyAll: 'Apply to all',
        select: 'Select',
        selected: 'Selected',
        selectedN: '{n} selected',
        loading: 'Loading…',
        empty: 'Nothing here yet',
        emptyHint: 'Try changing your search or filters',
        required: 'Required',
        invalid: 'Invalid value',
        optional: 'Optional',
        price: 'Price',
        total: 'Total',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        vat: 'VAT',
        free: 'Free',
        qty: 'Qty',
        from: 'From',
        to: 'To',
        'new': 'New',
        more: 'Show more',
        less: 'Show less',
        success: 'Done',
        error: 'Something went wrong, please try again',
        saved: 'Saved',
        deleted: 'Deleted',
        added: 'Added',
        updated: 'Updated',
        comingSoon: 'Coming soon',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        snapchat: 'Snapchat',
        tiktok: 'TikTok',
        phone: 'Phone',
        call: 'Call',
        email: 'Email',
        hours: 'Working hours',
        city: 'City',
        address: 'Address',
        name: 'Name',
        note: 'Notes',
        notePh: 'Anything you’d like us to know?',
        status: 'Status',
        date: 'Date',
        image: 'Image',
        upload: 'Upload image',
        retry: 'Try again',
        'continue': 'Continue',
        start: 'Get started',
        done: 'Finish',
        skip: 'Skip',
        results: 'Results',
        resultsN: '{n} results',
        color: 'Color',
        size: 'Size',
        currency: 'IQD',
        print: 'Print',
        exportLbl: 'Export',
        importLbl: 'Import',
        refresh: 'Refresh',
        help: 'Help',
        settings: 'Settings',
        language: 'Language',
        description: 'Description',
        title: 'Title',
        link: 'Link',
        tags: 'Tags',
        count: 'Count',
        and: 'and',
        or: 'or'
      },
      footer: {
        about: 'About Shosh Nail',
        links: 'Quick links',
        contact: 'Get in touch',
        follow: 'Follow us',
        hours: 'Working hours',
        location: 'Location',
        admin: 'Owner panel',
        dialect: 'عراقي',
        fusha: 'فصحى',
        variantLbl: 'Arabic variant',
        rights: 'All rights reserved',
        copy: '© {year} {brand} — All rights reserved',
        made: 'Made with love in Iraq',
        backToTop: 'Back to top'
      },
      theme: {
        label: 'Theme',
        light: 'Light',
        dark: 'Dark',
        toggle: 'Switch theme'
      },
      order: {
        title: 'Your order',
        summary: 'Order summary',
        number: 'Order number',
        date: 'Date',
        customer: 'Your details',
        name: 'Full name',
        namePh: 'Your name',
        phone: 'Phone number',
        phonePh: '07XXXXXXXXX',
        city: 'Governorate',
        cityPh: 'Pick your governorate',
        address: 'Address',
        addressPh: 'District, street, nearest landmark',
        note: 'Notes',
        notePh: 'Any special request? Write it here',
        step1: 'Your details',
        step2: 'Payment',
        step3: 'Confirm',
        qty: 'Quantity',
        express: 'Express making',
        expressNote: 'Your set is ready in 24 to 48 hours',
        giftWrap: 'Gift wrapping',
        giftWrapNote: 'An elegant box with a gift card',
        shipping: 'Shipping',
        freeShip: 'Free shipping',
        freeShipHint: 'Free shipping on orders over {n}',
        vat: 'VAT',
        deposit: 'Deposit',
        total: 'Total',
        items: 'Order details',
        custom: 'Custom design',
        ready: 'Ready design',
        submit: 'Place order',
        sending: 'Sending…',
        sent: 'One step left',
        thanks: 'Your order reaches us when you press Send in WhatsApp or Instagram. If the app did not open, copy the order with the button below and send it yourself.',
        copySummary: 'Copy summary',
        openWa: 'Open WhatsApp',
        openIg: 'Send on Instagram',
        igCopied: 'Your order is copied — paste it into the chat',
        igCopyFail: 'Could not copy the order. Use the “copy order” button above.',
        downloadImg: 'Download design image',
        newDesign: 'New design',
        terms: 'By pressing “confirm order” you agree to the order and exchange terms.',
        termsLink: 'Read the terms',
        termsErr: 'Please accept the terms before confirming',
        nameErr: 'Please enter your name (2 characters or more)',
        phoneErr: 'Please check your phone number',
        govErr: 'Pick your governorate so we can work out delivery',
        govFee: 'Delivery to {g}: {f} · arrives within {d}',
        sizeLine: 'Size: agreed in chat after ordering',
        sizeNote: 'Don’t know your size? No problem — once you send your order we send you the measuring method with a picture, or pick S / M / L.',
        stepsTitle: 'What happens after you send?',
        depositNote: 'paid up front and taken off the total',
        editHint: 'Want to change something on this set (colour, length, shape)? Write it in the notes and we adjust it for you.',
        foundingLine: 'Founding customer ✨ (first {n} offer)',
        foundingConfirm: 'Founding offer: whatever your order costs, a free set worth {g} is added to it. When it arrives, we would love a photo of it on your hand and your review.',
        sendTitle: 'Send your order',
        sendLead: 'Your order reaches us when you send the message. Pick where to send it:',
        sendWa: 'Send on WhatsApp',
        sendIg: 'Send on Instagram',
        igHow: 'We copy the order message for you; paste it into the Instagram chat.',
        copyFull: 'Copy all the details',
        codeLbl: 'Your order code',
        guideTitle: 'How to measure',
        guideText: 'Photograph your hand from above with a ruler against the nails and send us the picture in chat. Or measure each nail in millimetres at its widest point. Between two numbers, always the wider.',
        guideSave: 'Save the guide picture',
        guideWidest: 'Measure the widest point of the nail',
        msgHi: 'Hi Shosh 💅',
        msgNew: 'New order',
        msgSet: 'Set',
        msgQuiz: 'A set from the style quiz',
        msgTotal: 'Total',
        msgIncl: 'incl. delivery to {g} {f}',
        msgPay: 'Payment',
        msgDeposit: 'deposit {d} up front',
        msgGov: 'Governorate',
        msgLink: 'Result link',
        notifyErr: 'We couldn’t send the notification, but your order is saved.',
        empty: 'No orders yet',
        status: {
          'new': 'New',
          confirmed: 'Confirmed',
          shipped: 'Shipped',
          done: 'Completed',
          cancelled: 'Cancelled'
        }
      },
      pay: {
        title: 'Payment method',
        choose: 'Choose the payment method that suits you',
        required: 'Please choose a payment method first',
        details: 'Payment details',
        note: 'Note',
        bank: 'Bank transfer',
        card: 'Mada or Visa card',
        wallet: 'Digital wallet',
        cod: 'Cash on delivery',
        applepay: 'Apple Pay',
        copyIban: 'Copy IBAN',
        ibanCopied: 'IBAN copied',
        after: 'After transferring, send us the receipt on WhatsApp',
        secure: 'Your details stay private — we never ask for card data on the site'
      }
    }
  };

  /* ==================================================================== */
  /* internals                                                            */
  /* ==================================================================== */

  function has(o, k){ return Object.prototype.hasOwnProperty.call(o, k); }
  function isObj(v){ return !!v && typeof v === 'object' && !Array.isArray(v); }
  function isT(v){ return isObj(v) && (typeof v.ar === 'string' || typeof v.en === 'string' || typeof v.iq === 'string'); }

  /* nested object -> flat dotted keys */
  function flatten(src, prefix, out){
    var k, v, key;
    if (!isObj(src)) return out;
    for (k in src){
      if (!has(src, k)) continue;
      v = src[k];
      key = prefix ? prefix + '.' + k : k;
      if (isObj(v)) flatten(v, key, out);
      else out[key] = v === null || v === undefined ? '' : String(v);
    }
    return out;
  }

  /* nested map of T-objects -> one flat dict per language */
  function flattenT(src, prefix, outAr, outEn, outIq){
    var k, v, key;
    if (!isObj(src)) return;
    for (k in src){
      if (!has(src, k)) continue;
      v = src[k];
      key = prefix ? prefix + '.' + k : k;
      if (isT(v)){
        if (typeof v.ar === 'string') outAr[key] = v.ar;
        if (typeof v.en === 'string') outEn[key] = v.en;
        if (outIq && typeof v.iq === 'string') outIq[key] = v.iq;
      } else if (isObj(v)){
        flattenT(v, key, outAr, outEn, outIq);
      } else {
        outAr[key] = v === null || v === undefined ? '' : String(v);
        outEn[key] = outAr[key];
      }
    }
  }

  function assign(target, src){
    var k;
    for (k in src){ if (has(src, k)) target[k] = src[k]; }
    return target;
  }

  var dict = {
    iq: flatten(BASE.iq || {}, '', {}),
    ar: flatten(BASE.ar, '', {}),
    en: flatten(BASE.en, '', {})
  };

  var lang = 'ar';
  var dir  = 'rtl';
  var subs = [];
  var fmtCache = {};

  function chain(l){ return CHAIN[l] || CHAIN.iq; }
  function normalize(l){
    var s = String(l);
    if (s === 'en' || s === 'ar' || s === 'iq') return s;
    return 'iq';
  }
  function isArabic(l){ return l !== 'en'; }

  function storedLang(){
    var v = null;
    try { v = window.localStorage.getItem(LANG_KEY); }
    catch (e){ v = null; }
    return (v === 'ar' || v === 'en' || v === 'iq') ? v : null;
  }

  /* the Arabic she last read: Iraqi unless she chose standard Arabic */
  function storedVariant(){
    var v = null;
    try { v = window.localStorage.getItem(ARV_KEY); }
    catch (e){ v = null; }
    return v === 'ar' ? 'ar' : 'iq';
  }

  function persist(l){
    try {
      window.localStorage.setItem(LANG_KEY, l);
      if (isArabic(l)) window.localStorage.setItem(ARV_KEY, l);
    } catch (e){ /* Safari private mode — language just won't stick */ }
  }

  /* -------------------------------------------------------- formatting */
  function formatter(){
    if (has(fmtCache, lang)) return fmtCache[lang];
    var f = null;
    try {
      f = new Intl.NumberFormat(isArabic(lang) ? 'ar-IQ-u-nu-latn' : 'en-US', { maximumFractionDigits: 2 });
    } catch (e){
      try { f = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }); }
      catch (e2){ f = null; }
    }
    fmtCache[lang] = f;
    return f;
  }

  function num(n){
    var v = typeof n === 'number' ? n : parseFloat(n);
    var f;
    if (!isFinite(v)) return String(n === null || n === undefined ? '' : n);
    f = formatter();
    if (!f) return String(v);
    try { return f.format(v); }
    catch (e){ return String(v); }
  }

  function pick(tobj){
    var c, i, v;
    if (typeof tobj === 'string') return tobj;
    if (!isObj(tobj)) return '';
    c = chain(lang);
    for (i = 0; i < c.length; i++){
      v = tobj[c[i]];
      if (typeof v === 'string' && v !== '') return v;
    }
    return '';
  }

  function currencySymbol(){
    var c = null, s;
    try {
      if (SN.Store && typeof SN.Store.get === 'function') c = SN.Store.get('settings.currency', null);
    } catch (e){ c = null; }
    s = pick(c);
    if (!s) s = t('common.currency');
    return s;
  }

  function money(n){
    var v = typeof n === 'number' ? n : parseFloat(n);
    var s, cur;
    if (!isFinite(v)) v = 0;
    v = Math.round(v * 100) / 100;
    s = num(v);
    cur = currencySymbol();
    if (!cur) return s;
    return isArabic(lang) ? (s + ' ' + cur) : (cur + ' ' + s);
  }

  /* -------------------------------------------------------- translation */
  function t(key, vars){
    var k = String(key === null || key === undefined ? '' : key);
    var s, c, i, d;
    if (!k) return '';
    c = chain(lang);
    for (i = 0; i < c.length; i++){
      d = dict[c[i]];
      s = d ? d[k] : undefined;
      if (s !== undefined && s !== null) break;
    }
    if (s === undefined || s === null) return k;      /* missing key -> the key itself */
    if (typeof s !== 'string') s = String(s);
    if (!vars || typeof vars !== 'object') return s;
    return s.replace(/\{(\w+)\}/g, function(m, name){
      if (!has(vars, name)) return m;
      var v = vars[name];
      return v === null || v === undefined ? '' : String(v);
    });
  }

  function extend(partial){
    var ar, en, iq;
    if (!isObj(partial)) return dict;
    if (has(partial, 'ar') || has(partial, 'en') || has(partial, 'iq')){
      if (isObj(partial.iq)) assign(dict.iq, flatten(partial.iq, '', {}));
      if (isObj(partial.ar)) assign(dict.ar, flatten(partial.ar, '', {}));
      if (isObj(partial.en)) assign(dict.en, flatten(partial.en, '', {}));
    } else {
      /* also accept { 'key.path': {ar:'…', en:'…', iq:'…'} } */
      ar = {}; en = {}; iq = {};
      flattenT(partial, '', ar, en, iq);
      assign(dict.iq, iq);
      assign(dict.ar, ar);
      assign(dict.en, en);
    }
    return dict;
  }

  /* ---------------------------------------------------------- DOM apply */
  function nodes(root, sel){
    var out = [], list, i;
    if (!root) return out;
    try {
      if (typeof root.matches === 'function' && root.matches(sel)) out.push(root);
      if (typeof root.querySelectorAll !== 'function') return out;
      list = root.querySelectorAll(sel);
      for (i = 0; i < list.length; i++) out.push(list[i]);
    } catch (e){ /* detached or exotic root */ }
    return out;
  }

  function fill(root, attr, fn){
    var sel = '[' + attr + ']';
    var els = nodes(root, sel), i, key;
    for (i = 0; i < els.length; i++){
      key = els[i].getAttribute(attr);
      if (!key) continue;
      try { fn(els[i], t(key)); }
      catch (e){ /* never let one node break the page */ }
    }
  }

  function apply(root){
    var r = root || (typeof document !== 'undefined' ? document : null);
    if (!r) return;
    fill(r, 'data-i18n',       function(el, v){ el.textContent = v; });
    fill(r, 'data-i18n-html',  function(el, v){ el.innerHTML = v; });
    fill(r, 'data-i18n-ph',    function(el, v){ el.setAttribute('placeholder', v); });
    fill(r, 'data-i18n-title', function(el, v){ el.setAttribute('title', v); });
    fill(r, 'data-i18n-aria',  function(el, v){ el.setAttribute('aria-label', v); });
  }

  /* ------------------------------------------------------------ change */
  function fire(){
    var ev;
    if (typeof document === 'undefined') return;
    try {
      ev = new CustomEvent('sn:lang', { detail: { lang: lang, dir: dir } });
    } catch (e){
      try {
        ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('sn:lang', true, false, { lang: lang, dir: dir });
      } catch (e2){ return; }
    }
    try { document.dispatchEvent(ev); }
    catch (e3){ /* ignore */ }
  }

  function markDoc(){
    var html;
    if (typeof document === 'undefined' || !document.documentElement) return;
    html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
  }

  function set(l){
    var next = normalize(l);
    lang = next;
    dir  = isArabic(next) ? 'rtl' : 'ltr';
    I18n.lang = lang;
    I18n.dir  = dir;
    markDoc();
    persist(lang);
    apply(document);
    fire();
    var copy = subs.slice(), i;
    for (i = 0; i < copy.length; i++){
      try { copy[i](lang); }
      catch (e){ console.warn('[SN.I18n] onChange handler failed', e); }
    }
    return lang;
  }

  /* the header button: Arabic <-> English, back to the Arabic she last read */
  function toggle(){ return set(isArabic(lang) ? 'en' : storedVariant()); }

  /* the footer switch: Iraqi <-> standard Arabic (no-op while in English) */
  function variant(v){
    if (v === undefined) return isArabic(lang) ? lang : storedVariant();
    return set(v === 'ar' ? 'ar' : 'iq');
  }

  function onChange(fn){
    if (typeof fn !== 'function') return function(){};
    subs.push(fn);
    return function(){
      var i = subs.indexOf(fn);
      if (i !== -1) subs.splice(i, 1);
    };
  }

  /* ============================================================== boot */
  lang = storedLang() || 'iq';
  dir  = isArabic(lang) ? 'rtl' : 'ltr';
  markDoc();                       /* lang + dir as early as possible */

  var I18n = {
    lang: lang,
    dir: dir,
    dict: dict,
    langs: LANGS.slice(),
    extend: extend,
    set: set,
    toggle: toggle,
    variant: variant,
    t: t,
    pick: pick,
    num: num,
    money: money,
    apply: apply,
    onChange: onChange
  };

  /* First fill happens once every deferred script (including the page file,
     which calls extend() at top level) has run, so no key ever flashes. */
  if (typeof document !== 'undefined'){
    if (document.readyState === 'loading' || document.readyState === 'interactive'){
      if (document.addEventListener){
        document.addEventListener('DOMContentLoaded', function(){ apply(document); });
      }
      /* covers a script injected after DOMContentLoaded already fired */
      setTimeout(function(){ apply(document); }, 0);
    } else {
      apply(document);
    }
  }

  SN.I18n = I18n;
})();
