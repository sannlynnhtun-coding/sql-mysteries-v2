PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

CREATE TABLE crime_reports (
  report_id INTEGER PRIMARY KEY,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE people (
  person_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  address_street TEXT NOT NULL,
  address_number INTEGER NOT NULL
);

CREATE TABLE interviews (
  interview_id INTEGER PRIMARY KEY,
  person_id INTEGER NOT NULL,
  transcript TEXT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES people(person_id)
);

CREATE TABLE memberships (
  membership_id INTEGER PRIMARY KEY,
  person_id INTEGER NOT NULL,
  gym_name TEXT NOT NULL,
  membership_status TEXT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES people(person_id)
);

INSERT INTO crime_reports (report_id, date, type, city, description) VALUES
  (101, '2024-03-08', 'vandalism', 'SQL Village', 'ဈေးနံရံပေါ်တွင် ဆေးရေးထားမှု ဖြစ်ပွားခဲ့သည်။'),
  (102, '2024-03-10', 'theft', 'SQL Village', 'မြို့တော်ဝန်၏ ရွှေဘဲရုပ် ပျောက်ဆုံးခဲ့သည်။ သက်သေတစ်ဦးသည် Padauk Street တွင် အမြင့်ဆုံးအိမ်နံပါတ်၌ နေထိုင်သည်။ နောက်တစ်ဦးသည် Inya Road တွင်နေသော Thiri အမည်ရှိသူဖြစ်သည်။'),
  (103, '2024-03-10', 'theft', 'Data Town', 'ဘူတာရှေ့မှ အပြာရောင်စက်ဘီးတစ်စီး ပျောက်ဆုံးခဲ့သည်။'),
  (104, '2024-03-10', 'lost_item', 'SQL Village', 'စာကြည့်တိုက်တွင် အနီရောင်ထီးတစ်ချောင်း ကျန်ခဲ့သည်။'),
  (105, '2024-03-12', 'theft', 'SQL Village', 'မုန့်ဆိုင်မှ ငွေသေတ္တာအသေးတစ်လုံး ပျောက်ဆုံးခဲ့သည်။');

INSERT INTO people (person_id, name, age, address_street, address_number) VALUES
  (1, 'Aung Min', 22, 'Padauk Street', 12),
  (2, 'May Thu', 35, 'Padauk Street', 44),
  (3, 'U Hla Aung', 61, 'Padauk Street', 88),
  (4, 'Thiri Win', 27, 'Inya Road', 18),
  (5, 'Thiri Aye', 24, 'Bagan Road', 7),
  (6, 'Nandar Hlaing', 29, 'Kandawgyi Road', 21),
  (7, 'Ko Min Thu', 33, 'Inya Road', 42),
  (8, 'Su Mon', 31, 'Pyay Road', 10),
  (9, 'Kyaw Zin', 28, 'Padauk Street', 63),
  (10, 'Ei Ei Phyu', 26, 'Lanmadaw Road', 15),
  (11, 'Htet Naing', 38, 'Inya Road', 9),
  (12, 'Moe Sandar', 45, 'Sule Road', 30);

INSERT INTO interviews (interview_id, person_id, transcript) VALUES
  (201, 3, 'တရားခံ ထွက်ပြေးစဉ် FitLife Gym လိုဂိုပါသော အိတ်ကို ကိုင်ထားတာ မြင်ခဲ့တယ်။'),
  (202, 4, 'တရားခံဆီက gold membership card တစ်ကတ် ကျသွားတာ မြင်ခဲ့တယ်။'),
  (203, 2, 'အဲဒီညက ခွေးဟောင်သံကြားပေမယ့် လမ်းပေါ်မှာ ဘယ်သူ့ကိုမှ မမြင်ခဲ့ဘူး။'),
  (204, 7, 'ကျွန်တော်က ပျောက်နေတဲ့ဖုန်းကို ရှာနေခဲ့တာပါ။ ရွှေဘဲရုပ်အကြောင်း မသိပါဘူး။'),
  (205, 11, 'မိုးရွာနေတော့ အိမ်ထဲမှာပဲ ရှိခဲ့ပါတယ်။');

INSERT INTO memberships (membership_id, person_id, gym_name, membership_status) VALUES
  (301, 6, 'FitLife Gym', 'gold'),
  (302, 1, 'FitLife Gym', 'silver'),
  (303, 2, 'Power Zone Gym', 'gold'),
  (304, 5, 'FitLife Gym', 'bronze'),
  (305, 7, 'City Sports Club', 'gold'),
  (306, 8, 'FitLife Gym', 'silver'),
  (307, 9, 'Power Zone Gym', 'gold'),
  (308, 10, 'FitLife Gym', 'basic');

COMMIT;
