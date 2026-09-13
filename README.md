# SQL Village: The Golden Duck Mystery

မြန်မာစကားပြော SQL beginner များအတွက် browser ထဲမှာ တိုက်ရိုက်ကစားနိုင်သော အဆင့်လိုက် SQL mystery ဖြစ်ပါတယ်။ မြို့တော်ဝန်၏ ရွှေဘဲရုပ်ကို ခိုးယူသွားသူအား `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `LIKE` နှင့် `JOIN` တို့သုံးပြီး ဖော်ထုတ်ရပါမယ်။

## ကစားရန်

Browser security ကြောင့် `index.html` ကို double-click ဖြင့်မဖွင့်ဘဲ project folder မှ local server စတင်ပါ။

```powershell
python -m http.server 8000
```

ပြီးနောက် <http://localhost:8000> ကိုဖွင့်ပါ။ Static files များသာဖြစ်သဖြင့် GitHub Pages သို့မဟုတ် မည်သည့် static host တွင်မဆို တင်နိုင်ပါတယ်။ Analytics နှင့် backend မပါဝင်ပါ။

## Offline classroom package

- `sql-village-theft.db` — SQLiteStudio သို့မဟုတ် SQLite client တစ်ခုခုဖြင့်ဖွင့်ရန် database
- `walkthrough.html` / `sql-village-worksheet.pdf` — learner worksheet
- `teacher-guide.html` / `sql-village-teacher-guide.pdf` — ဆရာ/ဆရာမအတွက် spoiler ပါသော answer guide
- `schema.svg` / `schema.png` — table လေးခု၏ relationship diagram

Database ထဲတွင် `crime_reports`, `people`, `interviews`, `memberships` table လေးခုအတိအကျသာရှိပါတယ်။ `solution` table မရှိဘဲ interactive website က query result ကို တိုက်စစ်ပေးပါတယ်။

## Development

Node.js ထည့်သွင်းထားပြီးလျှင်:

```powershell
npm install
npm run build:all
npm test
```

အသုံးဝင်သော scripts:

- `npm run dev:css` — Tailwind CSS watch mode
- `npm run build:vendor` — CodeMirror, SQL.js နှင့် local fonts ကို copy လုပ်ရန်
- `npm run build:db` — `database/setup.sql` မှ SQLite database ပြန်တည်ဆောက်ရန်
- `npm run build:css` — minified production CSS ထုတ်ရန်
- `npm run build:assets` — SVG schema မှ PNG fallback ထုတ်ရန်
- `npm run build:pdf` — worksheet နှင့် teacher guide PDF ထုတ်ရန်
- `npm run build:all` — production assets နှင့် PDF အားလုံးကို local မှာ ပြန်ထုတ်ရန်
- `npm test` — database contract နှင့် browser lesson flow စစ်ရန်

`npm run build` သည် Vercel ကဲ့သို့ static host များအတွက် browser မလိုသော production assets များကိုသာ ထုတ်ပေးပါတယ်။ PDF များပြန်ထုတ်လိုလျှင် Playwright browser ပါသော local environment မှာ `npm run build:all` ကို သုံးပါ။ Tailwind CSS သည် build-time dependency သာဖြစ်ပါတယ်။ Compiled `css/app.css` ကို repository ထဲထည့်ထားသဖြင့် learner နှင့် static host တို့တွင် Node.js မလိုပါ။

## အဖြေ

Learner များအတွက် spoiler မဖြစ်စေရန် အဖြေအပြည့်ကို `teacher-guide.html` နှင့် `sql-village-teacher-guide.pdf` တို့တွင်သာ ဖော်ပြထားပါတယ်။ Interactive game တွင် hint နှစ်ဆင့်ပြီးမှ canonical query ကို ဖွင့်နိုင်ပါတယ်။

## Credits and license

This beginner adaptation is inspired by the original [SQL Murder Mystery](https://github.com/NUKnightLab/sql-mysteries), created by Joon Park and Cathy He at Knight Lab and adapted for the web by Joe Germuska. Browser-based SQLite is provided by [SQL.js](https://sql.js.org/), and the SQL editor uses [CodeMirror](https://codemirror.net/5/).

Original code remains available under the MIT License in `LICENSE`. Original text and content attribution remains under CC BY-SA 4.0. Bundled fonts are licensed under the SIL Open Font License; their license texts are stored in `assets/fonts/`.
