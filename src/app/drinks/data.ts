import type { Menu } from "@/lib/types/menu";

export const drinksData: Menu = {
  categories: [
    {
      key: "cold",
      name: "Холодные напитки",
      items: [
        {
          id: "iced_latte",
          name: "Айс латте",
          shortDescription: "Эспрессо, молоко и лёд",
          fullDescription:
            "Классический холодный латте: свежесваренный эспрессо охлаждается молоком и кубиками льда.",
          ingredients: ["Эспрессо", "Молоко", "Лёд"],
          method:
            "В высокий стакан со льдом налейте молоко, затем аккуратно влейте эспрессо сверху для красивого градиента.",
          image: "/images/drinks/cold/iced_latte.jpeg",
          chip: "320 ₽",
        },
        {
          id: "iced_matcha",
          name: "Айс матча",
          shortDescription: "Матча, вода, молоко, лёд",
          fullDescription:
            "Освежающий напиток на основе японского зелёного чая матча c молоком и льдом.",
          ingredients: ["Матча", "Вода", "Молоко", "Лёд"],
          method:
            "Матчу взбить тёплой водой до однородности, вылить в стакан со льдом и молоком.",
          image: "/images/drinks/cold/iced_matcha.jpg",
          chip: "340 ₽",
        },
        {
          id: "espresso_tonic",
          name: "Эспрессо‑тоник",
          shortDescription: "Шот эспрессо, тоник, лёд, кордиал",
          fullDescription:
            "Прохладный освежающий микс с терпким, пряным послевкусием эспрессо и тоника.",
          ingredients: ["Эспрессо", "Тоник", "Кордиал", "Лёд"],
          method:
            "В стакан со льдом налить тоник и кордиал, сверху аккуратно влить эспрессо.",
          image: "/images/drinks/cold/espresso_tonic.jpg",
          chip: "320 ₽",
        },
        {
          id: "matcha_tonic",
          name: "Матча‑тоник",
          shortDescription: "Тоник, матча, кордиал, лайм",
          fullDescription:
            "Классический матча‑тоник: кислинка кордиала и лайма сочетается с горьковато‑сладким тоником и терпкой матчей.",
          ingredients: ["Матча", "Тоник", "Кордиал", "Лайм", "Лёд"],
          method:
            "В стакан со льдом налить тоник и кордиал, добавить сок лайма, сверху вылить разведённую матчу.",
          image: "/images/drinks/cold/matcha_tonic.jpg",
          chip: "330 ₽",
        },
        {
          id: "coldbrew_tonic",
          name: "Колд Брю тоник",
          shortDescription: "Колд брю, тоник, сироп лемонграсс",
          fullDescription:
            "Холодный освежающий напиток с кофейной кислинкой, горчинкой тоника и нотами лемонграсса.",
          ingredients: ["Колд брю", "Тоник", "Сироп лемонграсс", "Лёд"],
          method:
            "В стакан со льдом налить тоник и сироп, сверху добавить колд‑брю.",
          image: "/images/drinks/cold/coldbrew_tonic.jpg",
          chip: "350 ₽",
        },
        {
          id: "coldbrew",
          name: "Колд Брю",
          shortDescription: "Медленно настоянный кофе холодного заваривания",
          fullDescription:
            "Колд‑брю готовится путём 16‑24‑часового настаивания молотого зерна в холодной воде — получается мягкий, сладковатый кофе без горечи.",
          ingredients: ["Колд‑брю (кофе, вода)", "Лёд"],
          method:
            "Подаётся охлаждённым, при желании со льдом.",
          image: "/images/drinks/cold/coldbrew.jpg",
          chip: "300 ₽",
        },
        {
          id: "classic_bumble",
          name: "Бамбл классический",
          shortDescription: "Свежевыжатый сок + эспрессо + кордиал",
          fullDescription:
            "Освежающий напиток с ярким вкусом апельсинового/грейпфрутового фреша и эспрессо.",
          ingredients: ["Апельсиновый или грейпфрутовый фреш", "Эспрессо", "Кордиал", "Лёд"],
          method:
            "В стакан со льдом налить фреш, добавить кордиал, сверху аккуратно вылить эспрессо.",
          image: "/images/drinks/cold/bumble.jpg",
          chip: "340 ₽",
        },
        {
          id: "cherry_almond_lemonade",
          name: "Лимонад вишня‑миндаль",
          shortDescription: "Вишня, газвода, миндальная эспума",
          fullDescription:
            "Искрящийся вишнёвый лимонад с воздушной шапкой миндальной эспумы.",
          ingredients: [
            "Вишнёвый кордиал",
            "Газированная вода",
            "Миндальная эспума (миндальный сироп, сухой белок)",
            "Вишня сублимированная",
            "Лёд",
          ],
          method:
            "Кордиал и газводу смешать со льдом, сверху отсадить миндальную эспуму и украсить вишней.",
          image: "/images/drinks/cold/cherry_almond_lemonade.jpg",
          chip: "380 ₽",
        },
        {
          id: "fresh_juice",
          name: "Фреш",
          shortDescription: "Апельсин / Грейпфрут / Яблоко / Морковь / Сельдерей",
          fullDescription:
            "Свежевыжатый сок из выбранного фрукта или овоща. Без добавления сахара и воды.",
          ingredients: [
            "Апельсин",
            "Грейпфрут",
            "Яблоко",
            "Морковь",
            "Сельдерей",
          ],
          method: "Фрукты/овощи выжимаются на шнековой или центробежной соковыжималке, подаются немедленно.",
          image: "/images/drinks/cold/fresh.jpg",
          chip: "350 ₽",
        },
      ],
      extras: [],
    },
    {
      key: "hot",
      name: "Горячие напитки",
      items: [
        {
          id: "espresso",
          name: "Эспрессо",
          shortDescription: "17–18,5г кофе → 30–40г напитка",
          fullDescription:
            "Крепкий шот с ровной крема‑пенкой. Соотношение кофе/выход ≈1:2.",
          ingredients: ["100% арабика (Эфиопия/Бразилия 50/50)"],
          method:
            "Двойная порция: 18г молотого кофе, экстракция 30-35с, выход 36–40г.",
          image: "/images/drinks/hot/espresso.jpg",
          chip: "120 ₽",
        },
        {
          id: "filter",
          name: "Фильтр-кофе",
          shortDescription: "Пуровер через бумажный фильтр",
          fullDescription:
            "Пролив 94°C воды через молотый кофе. Чистый и насыщенный вкус без горечи.",
          ingredients: ["Свежеобжаренный кофе", "Вода"],
          method: "10г кофе · 160г воды · 2:30 мин пролива.",
          image: "/images/drinks/hot/filter.jpg",
          chip: "220 ₽",
        },
        {
          id: "aeropress",
          name: "Аэропресс",
          shortDescription: "Мягкий вкус, низкая кислотность",
          fullDescription:
            "Метод погружения с дальнейшим прессованием даёт сладкий, чистый профиль.",
          ingredients: ["Кофе", "Вода"],
          method:
            "15г кофе, 230г воды 92°C, 1мин настаивания, затем плавное прессование.",
          image: "/images/drinks/hot/aeropress.jpg",
          chip: "250 ₽",
        },
        {
          id: "americano_300",
          name: "Американо 300мл",
          shortDescription: "3 шота + 230г воды",
          fullDescription: "Эспрессо, разбавленный горячей водой, мягче по крепости.",
          ingredients: ["Эспрессо (3 шота)", "Горячая вода"],
          method: "Влить кипяток в чашку, сверху аккуратно вылить эспрессо.",
          image: "/images/drinks/hot/americano.jpg",
          chip: "200 ₽",
        },
        {
          id: "cappuccino_300",
          name: "Капучино 300мл",
          shortDescription: "2 шота + 250г молока",
          fullDescription: "Классический баланс кофе и бархатной микропены.",
          ingredients: ["Эспрессо (2 шота)", "Молоко 250г"],
          method: "Сварить эспрессо, взбить молоко, влить по технике латте‑арт.",
          image: "/images/drinks/hot/cappuccino.jpg",
          chip: "260 ₽",
        },
        {
          id: "flat_white",
          name: "Флэт уайт 200мл",
          shortDescription: "2 шота + 190г молока",
          fullDescription: "Выраженный кофейный вкус и тонкая микропена.",
          ingredients: ["Эспрессо (2 шота)", "Молоко 190г"],
          method: "Приготовить эспрессо, влить вспенённое молоко.",
          image: "/images/drinks/hot/flat_white.jpg",
          chip: "260 ₽",
        },
        {
          id: "latte_300",
          name: "Латте 300мл",
          shortDescription: "1 шот + 250г молока",
          fullDescription: "Мягкий молочный напиток с кофейным послевкусием.",
          ingredients: ["Эспрессо", "Молоко 250г"],
          method: "Взбить молоко, налить, сверху эспрессо для слоистой подачи.",
          image: "/images/drinks/hot/latte.jpg",
          chip: "260 ₽",
        },
        {
          id: "vanilla_raf_300",
          name: "Раф ванильный 300 мл",
          shortDescription: "Шот, 12 г Vanilla, 250г сливок",
          fullDescription:
            "Сливочно‑ванильный кофе: все ингредиенты взбиваются вместе до густой пены.",
          ingredients: ["Эспрессо", "Сливки 33%", "Ванильная заготовка"],
          method: "Взбейте под форсункой, перелейте в тёплую чашку.",
          image: "/images/drinks/hot/vanilla_raf.jpg",
          chip: "320 ₽",
        },
        {
          id: "hot_bumble",
          name: "Горячий бамбл",
          shortDescription: "Подогретый фреш + эспрессо",
          fullDescription:
            "Согревающий цитрусово‑кофейный микс с кордиалом.",
          ingredients: [
            "Апельсиновый/грейпфрутовый фреш",
            "Эспрессо",
            "Кордиал",
          ],
          method: "Смешать подогретый фреш с эспрессо прямо в чашке.",
          image: "/images/drinks/hot/hot_bumble.jpg",
          chip: "340 ₽",
        },
        {
          id: "cocoa_300",
          name: "Какао 300мл",
          shortDescription: "30г какао, 270г молока",
          fullDescription: "Густой шоколадный напиток c молочной пеной.",
          ingredients: ["Какао порошок", "Молоко", "Вода"],
          method:
            "Развести какао водой, взбить молоко, собрать напиток как капучино.",
          image: "/images/drinks/hot/cocoa.jpg",
          chip: "240 ₽",
        },
        {
          id: "matcha_latte_300",
          name: "Матча латте 300мл",
          shortDescription: "1,5г матча, 270г молока",
          fullDescription: "Матча с шелковистой молочной пеной без горечи.",
          ingredients: ["Матча", "Вода", "Молоко"],
          method: "Развести матчу, вспенить молоко, влить по технике капучино.",
          image: "/images/drinks/hot/matcha_latte.jpg",
          chip: "340 ₽",
        },
      ],
      extras: [],
    },
    {
      key: "tea",
      name: "Чай",
      items: [
        {
          id: "green_jasmine",
          name: "Зеленый с жасмином",
          shortDescription: "Моли Хуа Ча, нотки винограда и лемонграсса",
          fullDescription:
            "Зеленый чай ферментирован с бутонами жасмина. Светлый, жасминовый, яркий.",
          ingredients: ["Зеленый чай", "Бутоны жасмина"],
          method:
            "6 г в фильтр-пакет, залить кипятком, оставить в чайнике на 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "tie_guan_yin",
          name: "Те Гуань Инь",
          shortDescription: "Улун с травяными и яблочными нотами",
          fullDescription:
            "Яркий улун: нотки свежескошенной травы и зелёного яблока.",
          ingredients: ["Улун Те Гуань Инь"],
          method:
            "6 г листа в пакет, залить 95 °C, настаивать 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "gaba_oolong",
          name: "Габа Улун",
          shortDescription: "Плотный улун с кислотностью и ГАМК",
          fullDescription:
            "Ферментирован в безвоздушной среде, содержит ГАМК — расслабляет и укрепляет сосуды.",
          ingredients: ["Улун Габа"],
          method:
            "7 г листа в пакет, залить 95 °C, настоять 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "red_smoked",
          name: "Красный копченый",
          shortDescription: "Копченый красный чай с ягодными нотами",
          fullDescription:
            "Листья диких деревьев прогревают на дыму. Темный, копченый, ягодные нотки.",
          ingredients: ["Красный копченый чай"],
          method:
            "6 г в пакет, залить 95 °C, настаивать 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "red_needles",
          name: "Красные иглы",
          shortDescription: "Мягкий чай с оранжевым ворсом",
          fullDescription:
            "Молодые листья с оранжевым ворсом дают мягкий, сладкий вкус.",
          ingredients: ["Красные иглы"],
          method:
            "6 г в пакет, залить 95 °C, настоять 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "shu_puer",
          name: "Шу пуэр",
          shortDescription: "Темный чай с древесным вкусом",
          fullDescription:
            "Шу пуэр выдерживают как вина: маслянистый, древесный профиль.",
          ingredients: ["Шу пуэр"],
          method:
            "7 г пуэра залить 95 °C, настаивать 3–5 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "assam",
          name: "Ассам",
          shortDescription: "Крепкий чай с цветочным профилем",
          fullDescription:
            "Чай из региона Харишпур: терпкий и цветочный одновременно.",
          ingredients: ["Ассам"],
          method:
            "6 г в пакет, залить 95 °C, настоять 4–6 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "390 ₽",
        },
        {
          id: "lemongrass",
          name: "Лемонграсс чай",
          shortDescription: "Травяной чай с цитрусовыми нотами",
          fullDescription:
            "Лемонграсс с травяными полутонами и долгим лимонным послевкусием.",
          ingredients: ["Лемонграсс"],
          method:
            "5 г травы, залить 95 °C, настоять 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "350 ₽",
        },
        {
          id: "rooibos",
          name: "Ройбос",
          shortDescription: "Мягкий чаёк из ЮАР",
          fullDescription:
            "Травяной, маслянистый, с нотами гвоздики и ягод.",
          ingredients: ["Ройбос"],
          method:
            "6 г ройбоса, залить 95 °C, настоять 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "350 ₽",
        },
        {
          id: "chrysanthemum",
          name: "Хризантема",
          shortDescription: "Травяной чай с цветочным профилем",
          fullDescription:
            "Напоминает ромашку, но богаче: прополисные и перечные ноты.",
          ingredients: ["Хризантема сухая"],
          method:
            "5 г цветков, залить 95 °C, настоять 5–7 мин.",
          image: "/images/drinks/tea/tea.jpg",
          chip: "350 ₽",
        },
      ],
      extras: [],
    },
    {
      key: "non_alcoholic",
      name: "Безалкогольное",
      items: [
        {
          id: "estrella_na",
          name: "Estrella Damm Lager Б/А 0,5",
          shortDescription: "Вода, хлебный и ячменный солод",
          fullDescription: "Светлое фильтрованное испанское пиво 0.5л, янтарно-золотистое, с легкой пеной и свежим вкусом хлебных зерен.",
          ingredients: ["Вода", "Хлебный солод", "Ячменный солод"],
          method: "Подаётся охлаждённым 4–6°C. Содержит минимальное количество алкоголя.",
          image: "/images/drinks/non_alc/estrella.jpg",
          chip: "380 ₽",
        },
        {
          id: "albali_rose_na",
          name: "Vina Albali Rosé (игристое)",
          shortDescription: "Гарнача, Испания (Кастилия)",
          fullDescription: "Безалкогольное розе: ягоды, красные фрукты, цитрусовое послевкусие.",
          ingredients: ["Гарнача"],
          method: "Охладить до 6–8°C. К рыбе и морепродуктам.",
          image: "/images/drinks/non_alc/albali_rose.jpg",
          chip: "990 ₽",
        },
        {
          id: "hans_baer_riesling_na",
          name: "Hans Baer Riesling (безалк.)",
          shortDescription: "Рислинг, Германия (Рейнгессен)",
          fullDescription: "Безалкогольный рислинг: ноты яблок, груш, цветочные оттенки.",
          ingredients: ["Рислинг"],
          method: "Охладить до 6–8°C. К салатам, морепродуктам.",
          image: "/images/drinks/non_alc/hans_baer_riesling.jpg",
          chip: "990 ₽",
        },
      ],
      extras: [],
    }
  ],
};

export default drinksData;
