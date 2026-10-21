# داشبورد گزارش ۱۴۰۵

داشبورد گزارش برای سه شیت عملیاتی:

- [نظارت بر محتوا ۱۴۰۵](https://docs.google.com/spreadsheets/d/1hO-MteCJuD8Tp6MMY0CqVR0PiO_VGuPlYy8l5_5xTNM/edit)
- [نظارت بر پشتیبانی ۱۴۰۵](https://docs.google.com/spreadsheets/d/13-pNv-aXQbIP-4yhIHXXTJXNmMq3GLaboaN0Vd--vhc/edit)
- [شیفت‌بندی پشتیبان‌ها](https://docs.google.com/spreadsheets/d/1-bX593iWn21it2pU9JGM21TgWaqQeJgv85HzZT3UOT0/edit)

اعداد در `src/data.ts` از همان شیت‌ها برداشته شده‌اند (برش ۲۹ مهر ۱۴۰۵).

## اجرا

```bash
npm install
npm run dev
```

سپس `http://localhost:5173` را باز کنید.

```bash
npm run build
npm run preview
```

## تب‌ها

- نمای کلی: KPI، اقدام ماهانه، تیکت مهر، میانگین امتیاز
- محتوا: ورودی، اقدام هفتگی، دقت گزارش مردمی، ترکیب دسته‌ها
- پشتیبانی: صف تیکت، منابع هوش مصنوعی، روند امتیاز
- شیفت امروز: پوشش ۲۹ و ۳۰ مهر

برای به‌روزرسانی، شیت را دوباره بخوانید و فقط `src/data.ts` را عوض کنید.
