import { useState } from "react";
import { BarChart, C, Legend, LineChart, formatNum } from "./charts";
import {
  META,
  aiSources,
  correctRateWeekly,
  incomingMixMehr,
  incomingMonthly,
  incomingWeeklyMehr,
  mehrCorrect,
  monthlyActions,
  openTrend,
  scoreTrend,
  scores,
  ticketsMonthly,
  todayShift,
  tomorrowShift,
  weeklyActionsMehr,
} from "./data";

type Tab = "overview" | "content" | "support" | "shifts";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "نمای کلی" },
  { id: "content", label: "محتوا" },
  { id: "support", label: "پشتیبانی" },
  { id: "shifts", label: "شیفت امروز" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="page">
      <header className="hero">
        <div>
          <h1>داشبورد گزارش نظارت و پشتیبانی ۱۴۰۵</h1>
          <p className="muted">
            برش داده تا {META.asOf} · آخرین تیکت {META.ticketLastDay} · آخرین
            امتیاز {META.scoreLastDay}
          </p>
        </div>
        <nav className="sources">
          <a href={META.sheets.content} target="_blank" rel="noreferrer">
            شیت محتوا
          </a>
          <a href={META.sheets.support} target="_blank" rel="noreferrer">
            شیت پشتیبانی
          </a>
          <a href={META.sheets.shifts} target="_blank" rel="noreferrer">
            شیت شیفت
          </a>
        </nav>
      </header>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "tab on" : "tab"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" ? <Overview /> : null}
      {tab === "content" ? <Content /> : null}
      {tab === "support" ? <Support /> : null}
      {tab === "shifts" ? <Shifts /> : null}

      <footer className="foot">
        اعداد ماه مهر تا روز پر شدن هر شیت است، نه تا پایان ماه. برای به‌روزرسانی
        دوباره از شیت‌ها خروجی بگیرید و `src/data.ts` را عوض کنید.
      </footer>
    </div>
  );
}

function Overview() {
  return (
    <section className="stack">
      <h2>وضعیت عملیاتی {META.asOf}</h2>
      <div className="kpis">
        <Kpi value="۸۱۵٬۳۰۷" label="ورودی گزارش محتوا در مهر" />
        <Kpi value="۰٫۸٪" label="دقت گزارش مردمی کلاهبرداری" tone="warn" />
        <Kpi value="۲٬۸۳۰" label="تیکت باز پیام‌رسانی" tone="bad" />
        <Kpi value="خالی" label="شیفت شب امروز" tone="bad" />
      </div>

      <div className="alert bad">
        <strong>سه نقطهٔ فوری.</strong> شیفت شب چهارشنبه ۲۹ مهر خالی است. تیکت باز
        پیام‌رسانی از ۵۲ در ۱۹ مهر به ۲۲۳ در ۲۵ مهر رسیده. امتیاز معینی در سه روز
        آخر ۱۲۹، ۹۰ و ۳۹ است.
      </div>
      <div className="alert warn">
        <strong>عقب‌ماندگی ثبت.</strong> امتیاز روزانه از ۲۱ مهر خالی است. تیکت
        روزانه از ۲۶ مهر خالی است. جمع ماهانه محتوا برای مهر هنوز صفر است در حالی
        که هفتگی تا ۲۴ مهر پر شده.
      </div>

      <h2>اقدام محتوا، فروردین تا شهریور</h2>
      <p className="caption">
        محور افقی: ماه شمسی · محور عمودی: تعداد اقدام · منبع: تب تحلیل ماهانه
      </p>
      <Legend
        series={[
          { name: "کلاهبرداری", data: [], color: C.amber },
          { name: "غیر اخلاقی", data: [], color: C.blue },
        ]}
      />
      <BarChart
        categories={monthlyActions.months}
        series={[
          { name: "کلاهبرداری", data: monthlyActions.fraud, color: C.amber },
          {
            name: "غیر اخلاقی",
            data: monthlyActions.unethical,
            color: C.blue,
          },
        ]}
      />
      <p className="caption">
        جهش کلاهبرداری شهریور (۱۲٬۵۰۷ اقدام، ۱۱٬۲۰۱ حذف کانال) از هفته ۱۴ تا ۲۰
        شهریور است. خشونت و خلاف قوانین در کل سال صفر مانده‌اند.
      </p>

      <div className="split">
        <div>
          <h3>تیکت مالی مهر</h3>
          <BarChart
            height={200}
            categories={["دریافت", "پاسخ", "باز"]}
            series={[
              {
                name: "مالی",
                data: [4959, 6471, 137],
                color: C.teal,
              },
            ]}
          />
        </div>
        <div>
          <h3>تیکت پیام‌رسانی مهر</h3>
          <BarChart
            height={200}
            categories={["دریافت", "پاسخ", "باز"]}
            series={[
              {
                name: "پیام‌رسانی",
                data: [8812, 9482, 2830],
                color: C.rose,
              },
            ]}
          />
        </div>
      </div>

      <h2>میانگین امتیاز مهر</h2>
      <table>
        <thead>
          <tr>
            <th>پشتیبان</th>
            <th>میانگین</th>
            <th>نمونه</th>
            <th>بازه</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{formatNum(s.avg)}</td>
              <td>{formatNum(s.n)}</td>
              <td>
                {formatNum(s.min)}–{formatNum(s.max)}
              </td>
              <td>
                <span className={`band ${bandClass(s.band)}`}>{s.band}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Content() {
  return (
    <section className="stack">
      <h2>ورودی گزارش مردمی</h2>
      <div className="kpis">
        {incomingMonthly.map((m) => (
          <Kpi key={m.month} value={formatNum(m.value)} label={m.month} />
        ))}
      </div>
      <p className="caption">
        محور افقی: هفته مهر · محور عمودی: تعداد ورودی · منبع: تب تعداد ورودی
        گزارشات
      </p>
      <BarChart
        categories={incomingWeeklyMehr.weeks}
        series={[
          {
            name: "ورودی کل",
            data: incomingWeeklyMehr.total,
            color: C.blue,
          },
        ]}
      />

      <h2>اقدام هفتگی کلاهبرداری و غیر اخلاقی</h2>
      <p className="caption">
        محور افقی: هفته · محور عمودی: تعداد اقدام · منبع: تب‌های تحلیل هفتگی
      </p>
      <Legend
        series={[
          { name: "کلاهبرداری", data: [], color: C.amber },
          { name: "غیر اخلاقی", data: [], color: C.blue },
        ]}
      />
      <LineChart
        categories={weeklyActionsMehr.weeks}
        series={[
          {
            name: "کلاهبرداری",
            data: weeklyActionsMehr.fraud,
            color: C.amber,
          },
          {
            name: "غیر اخلاقی",
            data: weeklyActionsMehr.unethical,
            color: C.blue,
          },
        ]}
      />

      <div className="split">
        <div className="card">
          <h3>کلاهبرداری مهر</h3>
          <p className="big">
            {formatNum(mehrCorrect.fraud.ok)} از{" "}
            {formatNum(mehrCorrect.fraud.in)}
          </p>
          <p className="muted">صحیح · {mehrCorrect.fraud.pct}٪</p>
        </div>
        <div className="card">
          <h3>غیر اخلاقی مهر</h3>
          <p className="big">
            {formatNum(mehrCorrect.unethical.ok)} از{" "}
            {formatNum(mehrCorrect.unethical.in)}
          </p>
          <p className="muted">صحیح · {mehrCorrect.unethical.pct}٪</p>
        </div>
      </div>

      <h2>درصد صحت هفتگی مهر</h2>
      <p className="caption">محور عمودی: درصد</p>
      <LineChart
        suffix="٪"
        categories={correctRateWeekly.weeks}
        series={[
          {
            name: "کلاهبرداری",
            data: correctRateWeekly.fraud,
            color: C.amber,
          },
          {
            name: "غیر اخلاقی",
            data: correctRateWeekly.unethical,
            color: C.teal,
          },
        ]}
      />

      <h2>ترکیب ورودی مهر</h2>
      <table>
        <thead>
          <tr>
            <th>دسته</th>
            <th>ورودی</th>
            <th>سهم</th>
          </tr>
        </thead>
        <tbody>
          {incomingMixMehr.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>{formatNum(r.value)}</td>
              <td>{formatNum(r.share)}٪</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Support() {
  return (
    <section className="stack">
      <h2>پاسخ‌گویی تیکت</h2>
      <div className="alert warn">
        <strong>صف پیام‌رسانی در حال برگشت است.</strong> از ۲۳ تا ۲۵ مهر دریافت
        بیشتر از پاسخ شده و صف باز از ۳۳ به ۲۲۳ رسیده. جمع ماه هنوز{" "}
        {formatNum(ticketsMonthly[1].open)} باز نشان می‌دهد.
      </div>
      <p className="caption">
        محور افقی: روز مهر · محور عمودی: تیکت باز پایان روز
      </p>
      <Legend
        series={[
          { name: "باز پیام‌رسانی", data: [], color: C.rose },
          { name: "باز مالی", data: [], color: C.teal },
        ]}
      />
      <LineChart
        categories={openTrend.days}
        series={[
          {
            name: "باز پیام‌رسانی",
            data: openTrend.messaging,
            color: C.rose,
          },
          { name: "باز مالی", data: openTrend.finance, color: C.teal },
        ]}
      />

      <h2>منابع هوش مصنوعی</h2>
      <table>
        <thead>
          <tr>
            <th>حوزه</th>
            <th>ماه</th>
            <th>کل</th>
            <th>پاسخ</th>
            <th>بی‌پاسخ</th>
            <th>درصد پاسخ</th>
            <th>رضایت</th>
          </tr>
        </thead>
        <tbody>
          {aiSources.map((r) => (
            <tr key={`${r.area}-${r.month}`}>
              <td>{r.area}</td>
              <td>{r.month}</td>
              <td>{formatNum(r.total)}</td>
              <td>{formatNum(r.answered)}</td>
              <td>{formatNum(r.unanswered)}</td>
              <td>{formatNum(r.answerPct)}٪</td>
              <td>{formatNum(r.satisfaction)}٪</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>روند امتیاز سه پشتیبان فعال</h2>
      <p className="caption">
        محور افقی: روز مهر · محور عمودی: امتیاز روزانه · خطچین ۵۲۰ = کف استاندارد
      </p>
      <Legend
        series={[
          { name: "آصف", data: [], color: C.teal },
          { name: "محمودی", data: [], color: C.blue },
          { name: "معینی", data: [], color: C.rose },
        ]}
      />
      <LineChart
        categories={scoreTrend.days}
        reference={{ value: 520, label: "استاندارد" }}
        series={[
          { name: "آصف", data: scoreTrend.asef, color: C.teal },
          { name: "محمودی", data: scoreTrend.mahmoudi, color: C.blue },
          { name: "معینی", data: scoreTrend.moeini, color: C.rose },
        ]}
      />

      <h2>کارنامه مهر تا ۲۰ام</h2>
      <table>
        <thead>
          <tr>
            <th>پشتیبان</th>
            <th>میانگین</th>
            <th>آخرین عدد</th>
            <th>نکته</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{formatNum(s.avg)}</td>
              <td>{s.last}</td>
              <td>{s.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Shifts() {
  return (
    <section className="stack">
      <h2>{todayShift.day}</h2>
      <div className="alert bad">
        <strong>شب پوشش ندارد.</strong> ردیف شب امروز خالی است. فردا صبح محمودی
        باید کلاهبرداری و غیر اخلاقی از ۱۲ شب گذشته را هم جمع کند.
      </div>
      <div className="shift-grid">
        {todayShift.blocks.map((b) => (
          <article key={b.name} className="card">
            <header>
              <h3>{b.name}</h3>
              <span className="muted">{b.people.length} نفر</span>
            </header>
            {b.people.length === 0 ? (
              <p className="muted">بدون کارشناس</p>
            ) : (
              b.people.map((p) => (
                <div key={p.name} className="person">
                  <strong>{p.name}</strong>
                  <p className="muted">{p.cover}</p>
                </div>
              ))
            )}
          </article>
        ))}
      </div>

      <h2>پنجشنبه ۳۰ مهر</h2>
      <table>
        <thead>
          <tr>
            <th>شیفت</th>
            <th>کارشناس</th>
            <th>پوشش</th>
          </tr>
        </thead>
        <tbody>
          {tomorrowShift.map((r) => (
            <tr key={r.shift}>
              <td>{r.shift}</td>
              <td>{r.person}</td>
              <td>{r.cover}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>الگوی ثابت روزهای کاری</h3>
      <p>
        صبح: محمودی محتوا و پیام‌رسانی، آصف مالی و کلاهبرداری. عصر: جلالیان مالی
        و کلاهبرداری، معینی محتوا. شب: موسوی پوشش ترکیبی. پنجشنبه و جمعه تیم جمع
        می‌شود و شب معمولاً off است.
      </p>
    </section>
  );
}

function Kpi({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone?: "warn" | "bad";
}) {
  return (
    <div className={`kpi ${tone ?? ""}`}>
      <div className="kpi-v">{value}</div>
      <div className="kpi-l">{label}</div>
    </div>
  );
}

function bandClass(band: string) {
  if (band === "عالی" || band === "خوب") return "ok";
  if (band === "نزدیک استاندارد") return "warn";
  return "bad";
}
