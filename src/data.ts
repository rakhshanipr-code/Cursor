export const META = {
  asOf: "۲۹ مهر ۱۴۰۵",
  ticketLastDay: "۲۵ مهر",
  scoreLastDay: "۲۰ مهر",
  sheets: {
    content:
      "https://docs.google.com/spreadsheets/d/1hO-MteCJuD8Tp6MMY0CqVR0PiO_VGuPlYy8l5_5xTNM/edit",
    support:
      "https://docs.google.com/spreadsheets/d/13-pNv-aXQbIP-4yhIHXXTJXNmMq3GLaboaN0Vd--vhc/edit",
    shifts:
      "https://docs.google.com/spreadsheets/d/1-bX593iWn21it2pU9JGM21TgWaqQeJgv85HzZT3UOT0/edit",
  },
};

export const monthlyActions = {
  months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
  fraud: [159, 727, 1678, 709, 990, 12507],
  unethical: [12798, 22393, 9666, 5112, 8303, 5292],
};

export const incomingMonthly = [
  { month: "مرداد", value: 1605815 },
  { month: "شهریور", value: 1768691 },
  { month: "مهر", value: 815307 },
];

export const incomingWeeklyMehr = {
  weeks: ["۱–۷", "۸–۱۴", "۱۵–۲۱", "۲۲–۲۸"],
  total: [216324, 177519, 188000, 262591],
};

export const weeklyActionsMehr = {
  weeks: ["۴–۱۰", "۱۱–۱۷", "۱۸–۲۴"],
  fraud: [241, 168, 240],
  unethical: [1168, 636, 1154],
};

export const correctRateWeekly = {
  weeks: ["هفته ۱", "هفته ۲", "هفته ۳", "هفته ۴"],
  fraud: [0.5, 0.9, 0.6, 1.1],
  unethical: [2.7, 3.6, 2.9, 3.7],
};

export const mehrCorrect = {
  fraud: { in: 51181, ok: 417, pct: 0.8 },
  unethical: { in: 48827, ok: 1746, pct: 3.5 },
};

export const incomingMixMehr = [
  { name: "هرزنامه", value: 426681, share: 52 },
  { name: "سایر", value: 154382, share: 19 },
  { name: "گشت ارشاد", value: 52277, share: 6 },
  { name: "کلاهبرداری", value: 51181, share: 6 },
  { name: "شرلوک", value: 50882, share: 6 },
  { name: "غیر اخلاقی", value: 48827, share: 6 },
  { name: "اطلاعات نادرست", value: 19866, share: 2 },
  { name: "خشونت", value: 11211, share: 1 },
];

export const ticketsMonthly = [
  { queue: "مالی و بانکی", received: 4959, answered: 6471, open: 137 },
  { queue: "پیام‌رسانی", received: 8812, answered: 9482, open: 2830 },
];

export const openTrend = {
  days: ["۱۸", "۱۹", "۲۰", "۲۱", "۲۲", "۲۳", "۲۴", "۲۵"],
  messaging: [33, 52, 46, 81, 109, 191, 229, 223],
  finance: [5, 3, 4, 6, 4, 9, 5, 0],
};

export const aiSources = [
  {
    area: "مالی",
    month: "مرداد",
    total: 41898,
    answered: 24920,
    unanswered: 16978,
    answerPct: 37.3,
    satisfaction: 8.6,
  },
  {
    area: "مالی",
    month: "شهریور",
    total: 34916,
    answered: 22003,
    unanswered: 12913,
    answerPct: 38.7,
    satisfaction: 5.4,
  },
  {
    area: "پیام‌رسانی",
    month: "مرداد",
    total: 61393,
    answered: 37012,
    unanswered: 24381,
    answerPct: 37.6,
    satisfaction: 10.6,
  },
  {
    area: "پیام‌رسانی",
    month: "شهریور",
    total: 55830,
    answered: 34394,
    unanswered: 21436,
    answerPct: 38.1,
    satisfaction: 6.9,
  },
];

export type ScoreBand =
  | "عالی"
  | "خوب"
  | "استاندارد"
  | "نزدیک استاندارد"
  | "غیرقابل قبول";

export const scores = [
  {
    name: "آصف",
    avg: 758,
    n: 17,
    min: 604,
    max: 982,
    last: "۶۳۴ در ۲۰ مهر",
    note: "پایدار بالای ۶۰۰",
    band: "عالی" as ScoreBand,
  },
  {
    name: "موسوی",
    avg: 714,
    n: 12,
    min: 472,
    max: 1100,
    last: "۱۰۱۰ در ۱۷ مهر",
    note: "شیفت شب؛ از ۱۸ مهر خالی",
    band: "خوب" as ScoreBand,
  },
  {
    name: "محمودی",
    avg: 448,
    n: 17,
    min: 344,
    max: 545,
    last: "۵۰۴ در ۲۰ مهر",
    note: "زیر استاندارد ولی پایدار",
    band: "نزدیک استاندارد" as ScoreBand,
  },
  {
    name: "جلالیان",
    avg: 350,
    n: 14,
    min: 288,
    max: 454,
    last: "۳۸۷ در ۱۶ مهر",
    note: "از ۱۸ مهر خالی",
    band: "نزدیک استاندارد" as ScoreBand,
  },
  {
    name: "معینی",
    avg: 226,
    n: 17,
    min: 39,
    max: 575,
    last: "۳۹ در ۲۰ مهر",
    note: "سقوط از ۱۵ مهر",
    band: "غیرقابل قبول" as ScoreBand,
  },
  {
    name: "توکل‌نیا",
    avg: 112,
    n: 7,
    min: 0,
    max: 178,
    last: "۱۰۸ در ۸ مهر",
    note: "بعد از ۸ مهر خط تیره",
    band: "غیرقابل قبول" as ScoreBand,
  },
  {
    name: "موسویان",
    avg: 79,
    n: 17,
    min: 0,
    max: 196,
    last: "۳۵ در ۲۰ مهر",
    note: "هیچ روزی به ۳۲۰ نرسیده",
    band: "غیرقابل قبول" as ScoreBand,
  },
];

export const scoreTrend = {
  days: ["۱", "۴", "۶", "۸", "۱۱", "۱۳", "۱۵", "۱۸", "۲۰"],
  asef: [845, 890, 678, 684, 845, 752, 621, 982, 634],
  mahmoudi: [434, 422, 390, 445, 500, 450, 389, 344, 504],
  moeini: [270, 363, 233, 328, 154, 154, 127, 129, 39],
};

export const todayShift = {
  day: "چهارشنبه ۲۹ مهر ۱۴۰۵",
  blocks: [
    {
      name: "صبح",
      people: [
        {
          name: "محمودی",
          cover:
            "پیام‌رسانی، گشت ارشاد، غیر اخلاقی، گزارش عمومی، خشونت، هرزنامه",
        },
        {
          name: "آصف",
          cover: "مالی و بانکی، کلاهبرداری، شرلوک، مرکز تماس",
        },
      ],
    },
    {
      name: "عصر",
      people: [
        {
          name: "موسوی",
          cover: "مالی، کلاهبرداری، شرلوک، طلا، پیام‌رسانی",
        },
        {
          name: "معینی",
          cover:
            "پیام‌رسانی، گشت ارشاد، غیر اخلاقی، گزارش عمومی، خشونت، هرزنامه، اطلاعات نادرست",
        },
      ],
    },
    { name: "شب", people: [] },
  ],
};

export const tomorrowShift = [
  {
    shift: "صبح",
    person: "محمودی",
    cover:
      "طلا، مالی، غیر اخلاقی، گشت، شرلوک، کلاهبرداری، مرکز تماس + backlog شب",
  },
  {
    shift: "عصر",
    person: "موسوی",
    cover:
      "مالی، طلا، گشت، غیر اخلاقی، گزارش عمومی، شرلوک، کلاهبرداری، مرکز تماس، پیام‌رسانی",
  },
  { shift: "شب", person: "تعطیل", cover: "بدون پوشش" },
];
