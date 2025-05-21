# دليل استخدام نظام قوالب لوحة التحكم الإدارية

## مقدمة

هذا الدليل يشرح كيفية استخدام نظام القوالب الذي تم إنشاؤه لربط جميع صفحات لوحة التحكم الإدارية معًا مع الحفاظ على تناسق التصميم والوظائف عبر الموقع بأكمله.

## هيكل المشروع

```
admin/
├── assets/
│   ├── css/                    # ملفات التنسيق
│   │   ├── style.css           # النمط الرئيسي
│   │   ├── unified-styles.css  # أنماط موحدة عبر جميع الصفحات
│   │   ├── mobile-additions.css # تنسيقات إضافية للأجهزة المحمولة
│   │   ├── size-fixes.css      # إصلاحات حجم مختلفة
│   │   └── [module-name]/      # مجلدات تنسيق لكل وحدة
│   ├── js/                     # ملفات جافا سكريبت
│   │   ├── script.js           # السكريبت الرئيسي
│   │   ├── template-loader.js  # محمّل القوالب
│   │   └── site-config.js      # تكوين الموقع والمسارات
│   ├── pages/                  # صفحات الموقع
│   │   ├── user-management-new.html
│   │   ├── permissions-view-new.html
│   │   └── ...
│   └── templates/              # قوالب واجهة المستخدم
│       ├── sidebar.html        # قالب القائمة الجانبية
│       └── topnav.html         # قالب شريط التنقل العلوي
└── index.html                  # الصفحة الرئيسية
```

## ترتيب الصفحات

تم تنظيم صفحات الموقع في المجموعات التالية:

1. **الصفحة الرئيسية**
   - لوحة التحكم الرئيسية (index.html)

2. **إدارة المستخدمين**
   - قائمة المستخدمين (user-management-new.html)
   - الملف الشخصي (user-profile.html)
   - سجل تسجيل الدخول (user-login-history.html)
   - تغيير كلمة المرور (change-password.html)

3. **إدارة الصلاحيات**
   - عرض الصلاحيات (permissions-view-new.html)
   - إضافة صلاحية (permissions-add-edit-new.html)

4. **سجل الزوار**
   - قائمة الرسائل (visitor-log.html)
   - إضافة رسالة (visitor-add-entry-new.html)
   - الرد على الرسائل (visitor-edit-entry.html)

5. **التقارير**
   - تقارير الطباعة والنسخ (print-copy-report.html)
   - تقارير طباعة المستخدم (user-print-report.html)
   - تقارير الدفع الإلكتروني (electronic-payment.html)

6. **إدارة الملفات**
   - إدارة الملفات (file-management.html)
   - تحرير المجلد (folder-edit.html)
   - رفع الصور (image-upload.html)
   - عرض المحتوى (content-view.html)

7. **التشريعات والوثائق**
   - بيانات التشريعات (legislation-data.html)
   - محرر التشريعات (legislation-editor.html)
   - الوثائق القانونية (legal-documentation.html)
   - طلبات الاقتباس القانوني (legal-citation-requests.html)

8. **الإعلانات**
   - البانرات الإعلانية (advertisements-banners.html)
   - الإعلانات النصية (text-advertisements-view.html)
   - إضافة إعلان (advertisement-add-edit.html)

9. **الشركات**
   - قائمة الشركات (companies-view.html)
   - إضافة/تعديل شركة (company-add-edit.html)

10. **الاشتراكات**
    - خدمات الاشتراك (subscription-services.html)
    - إضافة اشتراك (service-subscription.html)
    - تجديد الاشتراك (subscription-renewal.html)

11. **القائمة البريدية**
    - القائمة البريدية (mailing-list.html)
    - إضافة مشترك (mailing-list-add-edit.html)
    - إرسال رسالة للمشتركين (send-message-to-subscribers.html)

12. **كلمات البحث**
    - إدارة كلمات البحث (search-keywords-management.html)

13. **الإعدادات**
    - الإعدادات العامة (general-settings.html)

## كيفية إضافة صفحة جديدة

لإضافة صفحة جديدة إلى لوحة التحكم:

1. قم بإنشاء ملف HTML جديد في مجلد `assets/pages/`.
2. استخدم الهيكل التالي كقالب:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان الصفحة</title>
    <!-- ملفات CSS الرئيسية -->
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/mobile-additions.css">
    <link rel="stylesheet" href="../../css/size-fixes.css">
    <link rel="stylesheet" href="../../css/unified-styles.css">
    <!-- إضافة ملفات CSS خاصة بالصفحة -->
    <link rel="stylesheet" href="../css/your-module-name/your-page.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- المحتوى الرئيسي - سيتم تحميل القائمة الجانبية تلقائياً قبل هذا العنصر -->
        <main class="main-content">
            <!-- محتوى الصفحة -->
            <div class="page-container">
                <div class="card">
                    <div class="card-header">
                        <h1 class="card-title">عنوان الصفحة</h1>
                        <!-- أزرار أو عناصر إضافية في الهيدر -->
                    </div>
                    <div class="card-body">
                        <!-- محتوى البطاقة الرئيسية -->
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <!-- المكتبات وملفات JavaScript -->
    <script src="../../js/template-loader.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // كود مخصص للصفحة
        });
    </script>
</body>
</html>
```

3. قم بتحديث ملف `site-config.js` بإضافة معلومات الصفحة الجديدة في كائن `pages`:

```javascript
// إضافة إلى كائن pages
yourPageKey: {
    path: 'assets/pages/your-page.html',
    title: 'عنوان الصفحة',
    parent: 'parentMenuKey' // مفتاح القائمة الأب
}
```

4. إذا كنت تضيف قسمًا جديدًا تمامًا، فقم بتحديث كائن `mainMenus` أيضًا:

```javascript
// إضافة إلى كائن mainMenus
yourMenuKey: {
    title: 'عنوان القائمة',
    icon: 'fas fa-icon-name',
    path: 'assets/pages/main-page-for-section.html'
}
```

## تخصيص القائمة الجانبية

إذا كنت ترغب في تخصيص القائمة الجانبية، يمكنك تعديل ملف `assets/templates/sidebar.html`. تأكد من الحفاظ على نفس بنية العناصر لضمان عمل وظائف JavaScript بشكل صحيح:

```html
<li class="menu-item-has-children">
    <a href="#"><i class="fas fa-icon-name"></i> عنوان القسم <i class="fas fa-angle-down dropdown-icon"></i></a>
    <ul class="sub-menu">
        <li><a href="../pages/page-name.html"><i class="fas fa-sub-icon"></i> عنوان الصفحة</a></li>
        <!-- المزيد من العناصر -->
    </ul>
</li>
```

## ملاحظات هامة

1. **المسارات النسبية**: نظام القوالب يتعامل مع المسارات النسبية تلقائيًا، لذا لا تقلق بشأن صحة المسارات في القوالب.

2. **فتات الخبز (مسار التنقل)**: يتم إنشاء فتات الخبر تلقائيًا إذا كان هناك عنصر بفئة `.breadcrumb` في الصفحة.

3. **تحديد العناصر النشطة**: يتم تحديد العناصر النشطة في القائمة تلقائيًا بناءً على مسار الصفحة الحالية.

4. **الأنماط الموحدة**: استخدم `unified-styles.css` للحصول على تناسق بصري عبر جميع الصفحات. يحتوي على متغيرات CSS وفئات مفيدة.

5. **الوضع المظلم**: تم دعم الوضع المظلم من خلال إضافة فئة `dark-mode` إلى عنصر `body`.

## استكشاف الأخطاء وإصلاحها

إذا واجهت مشكلات في تحميل القوالب أو تنقل الصفحات:

1. تأكد من استدعاء `template-loader.js` في الصفحة.
2. افتح وحدة تحكم المتصفح للبحث عن أي أخطاء JavaScript.
3. تأكد من أن مسارات الصفحة مضافة بشكل صحيح في `site-config.js`.
4. تأكد من أن هيكل HTML في صفحتك يتوافق مع التوقعات (عناصر `.container` و `.main-content`).
