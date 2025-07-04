import { Blockquote } from "@telegram-apps/telegram-ui";
import { ReactNode } from "react";

export interface ServiceStep {
  header: string;
  body: ReactNode;
}

export const steps: ServiceStep[] = [
  {
    header: "1. Встреча",
    body: (
      <Blockquote type="text">
        Как только дверь распахнулась, установите искренний зрительный контакт — <br />
        пусть гость увидит, что ему рады. Примите открытую позу: плечи расправлены, руки не
        скрещены, улыбка естественна. <br />
        Чётко произнесите приветствие с теплотой, будто встречаете старого друга:
        «Добрый день! Рады видеть вас в Finch».<br />
        Первые секунды закладывают фундамент доверия: гостя «встречают по одёжке», а кафе
        — по улыбке и настрою официанта. С этого мгновения вы — проводник гостя к уюту,
        вкусной кухне и хорошему настроению.
      </Blockquote>
    ),
  },

  {
    header: "2. Размещение",
    body: (
      <Blockquote type="text">
        Мягко уточните цель визита: «Хотели бы расположиться в зале, на террасе или взять
        с собой?» Если бронь — проводите к зарезервированному столику, сообщая об этом
        по имени: «Г-н Иванов, ваш стол у окна уже ждёт». <br />
        Если брони нет — изящно предложите выбор из свободных мест, коротко описав
        преимущества («здесь уютный уголок с диванами, там — вид на сад»). <br />
        По пути ненавязчиво расскажите, где гардероб, уборная, розетки для гаджетов, к кому
        обращаться за помощью. <br />
        Проверив чистоту и сервировку стола, предупредите о возможных временных
        ограничениях («стол доступен до 19:00, потом бронь»), пояснив причину — так гость
        чувствует заботу, а не давление.
      </Blockquote>
    ),
  },

  {
    header: "3. Первый заказ",
    body: (
      <Blockquote type="text">
        Дайте гостю вдохнуть атмосферу и спросите: «Хотите сделать заказ сразу или нужно
        пару минут?» Предложите лёгкий аперитив, который разбудит аппетит и настроит на
        вечер («Бокал просекко или освежающий безалкогольный спритц?»). <br />
        Коротко, без навязчивости, презентуйте сезонные новинки: «У нас появилась нежная
        клубничная панна-кота и освежающий гаспачо из жареных томатов». <br />
        Напомните про QR-меню с фотографиями: гость увидит блюда «вживую» и выберет
        быстрее.
      </Blockquote>
    ),
  },

  {
    header: "4. Сервировка стола",
    body: (
      <Blockquote type="text">
        Первым делом — бутылка фильтр-воды и чистые стаканы. Наполняйте их сами, демонстрируя
        заботу. Если заказ уже сделан, заранее подготовьте шейкер с приборами под каждое
        блюдо, чтобы ничего не отвлекало гостя от общения. <br />
        Проверьте, чтобы внутри шейкера не было пятен полировки, а снаружи — отпечатков
        пальцев: мелочи создают ощущение безупречности.
      </Blockquote>
    ),
  },

  {
    header: "5. Основной заказ",
    body: (
      <Blockquote type="text">
        Сразу предупредите о стоп-листе — позвольте гостю избежать разочарования. <br />
        Активно помогайте с выбором: задавайте вопросы о вкусовых предпочтениях,
        рассказывайте о сочетаниях, советуйте фирменные позиции. <br />
        Обязательно уточните аллергены и желаемую остроту, чтобы исключить
        недоразумения; согласуйте скорость и порядок подачи («сначала салаты, потом горячее
        вместе, десерт позже?»). <br />
        Если компания большая — спросите, нужен ли разделённый счёт. <br />
        Предлагайте дополняющие позиции (хрустящий багет к супу, авокадо к завтраку) —
        это не только увеличивает средний чек, но и делает гастрономический опыт богаче.
        Не забывайте проверить документы на алкоголь, предлагать повтор напитков и
        отслеживать баланс: лучше лёгкое чувство приятной сытости, чем переедание.
      </Blockquote>
    ),
  },

  {
    header: "6. Досервировка",
    body: (
      <Blockquote type="text">
        Когда гость дополняет заказ, незамедлительно принесите чистый набор приборов —
        так вы поддерживаете ощущение свежести. Используйте тот же стандарт: идеально
        отполированный металл, салфетка без заломов, шейкер без разводов. Детали создают
        чувство высокого сервиса.
      </Blockquote>
    ),
  },

  {
    header: "7. Ведение стола",
    body: (
      <Blockquote type="text">
        Будьте «невидимкой-ангелом»: убирайте пустую посуду, как только гость отложил
        приборы, но без лишнего шума. Следите, чтобы стаканы всегда были наполовину полны
        — предлагайте долить или сменить воду с лёдом на без газа. <br />
        Считывайте настроение: спросите, всё ли нравится, и будьте готовы решить
        проблему до того, как гость её озвучит. <br />
        В iiko держите тайминг блюд под контролем; если видите задержку, предупредите и
        предложите промежуточный комплимент — это превращает минус в плюс. <br />
        При каждом подходе обозначайте своё присутствие («Разрешите уберу тарелку?») —
        уважение к личному пространству — признак профессионализма.
      </Blockquote>
    ),
  },

  {
    header: "8. Дополнительные продажи",
    body: (
      <Blockquote type="text">
        К середине ужина деликатно уточните, не хотят ли гости повторить любимое блюдо
        или попробовать авторскую вариацию. Учитывайте время: если стол забронирован
        после них через 30 минут, предложите что-то быстрое («сырная тарелка на двоих»),
        чтобы не создавать спешки.
      </Blockquote>
    ),
  },

  {
    header: "9. Чай, кофе и десерт",
    body: (
      <Blockquote type="text">
        Завершите трапезу красивым жестом: опишите десерты так, чтобы разыграть
        воображение («Тёплый чизкейк-суфле тает, едва коснувшись ложки…»).
        Подчеркните, что бариста готовит кофе на спешиалти-зерне, а травяной чай мы
        собираем вручную на карельских лугах. Персонализируйте рекомендацию в зависимости
        от настроения: бодрящий эспрессо или пряный раф для неторопливого вечера.
      </Blockquote>
    ),
  },

  {
    header: "10. Пост-продажи",
    body: (
      <Blockquote type="text">
        Пока гость наслаждается финалом, ненавязчиво напомните: любое блюдо можно взять
        «с собой» или оформить доставку через наше приложение. <br />
        Расскажите изюминку заведения: завтраки у нас доступны целый день, так что
        ароматную яичницу можно заказать даже вечером — многие гости ценят эту свободу.
      </Blockquote>
    ),
  },

  {
    header: "11. Счёт",
    body: (
      <Blockquote type="text">
        Услышав «Можно счёт», уточните форму оплаты (карта, наличные, QR) и разделение.
        Если платёж общий, скажите: «Я принесу счёт одним чеком, верно?» —
        гостю не придётся повторять. <br />
        В системе быстро закройте стол, чтобы не задерживать очередь заказов.
        Принесите фискальный чек и сдачу в полном объёме, даже если гость намекнул,
        что она не нужна: так вы оставляете ему выбор. Обязательно предложите
        безналичную оплату по QR — это современно и удобно.
      </Blockquote>
    ),
  },

  {
    header: "12. Прощание",
    body: (
      <Blockquote type="text">
        Не позволяйте гостю выйти «в пустоту». Сопроводите взглядом, тепло поблагодарите:
        «Благодарим за визит, будем рады видеть вас снова». <br />
        Дверь закрылась — но впечатление остаётся. Ваши последние слова и улыбка —
        приглашение вернуться и поделиться приятным опытом с друзьями.
      </Blockquote>
    ),
  },
];
