<!--suppress ALL -->
<script>
import '@/styles/agreement/max.css';
import '@/styles/agreement/300x450.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import Header from "@/components/global/header.vue";
import Footer from "@/components/global/footer.vue";
import {openLink} from "@/scripts/links.js";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  methods: {
    redirect(link) {
      openLink(link, true);
    }
  }
};
</script>

<template>
  <div class="agreement">
    <Header></Header>
    <div class="a-container">
      <div class="title">Пользовательское соглашение</div>

      <div class="text">
        СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
        Я, Пользователь сайта https://pro-tg.ru/, руководствуясь нормами Федерального закона Российской Федерации № 152-ФЗ от 27.07.2006 года «О персональных данных», путем проставления галочки на Сайте https://pro-tg.ru/ подписываю настоящее согласие и разрешаю (даю свое согласие) на обработку моих персональных данных, а именно: ФИО (фамилия, имя, отчество), дата, месяц и год рождения, место рождения, серия и номер удостоверяющего личность документа (паспорта или иного заменяющего его документа), сведения об адресе регистрации по месту жительства, данные водительского удостоверения, контактные данные, в том числе (но не ограничиваясь) номер телефона, адрес электронной почты, данные , полученные путем фотографирования/сканирования (в том числе, мои фотоизображения (в том числе, селфи) в любых форматах, сканобразы моих водительского удостоверения и паспорта в любых форматах и пр.), также иные персональные данные, связанные с заключением и исполнением Договора присоединения и Пользовательского соглашения.

        <div>&nbsp;</div>
        Я даю согласие на обработку моих персональных данных для целей заключения и исполнения Договора присоединения и Пользовательского соглашения, оказания ИП Албучев Андрей Владимирович (далее - Продавец) дополнительных услуг, участия в проводимых Продавцом акциях, опросах, исследованиях (включая, но не ограничиваясь проведением опросов, исследований посредством электронной, телефонной и сотовой связи), принятия решений или совершения иных действий, порождающих юридические последствия в отношении меня или других лиц, представления мне информации об оказываемых Продавцом, предоставлением Продавцом консультационных услуг, в том числе в целях заключения мною в дальнейшем договоров/соглашений с иными лицами в целях исполнения Договора присоединения, и распространяется на всю информацию, указанную в предыдущем абзаце настоящего согласия.

        <div>&nbsp;</div>
        Я подтверждаю, что обработка моих персональных данных может осуществляться ИП Албучев Андрей Владимирович в объеме, который необходим для достижения каждой из вышеперечисленных целей, следующими возможными способами: сбор, запись (в том числе на электронные носители), систематизация, накопление, хранение, составление перечней, маркировка, уточнение (обновление, изменение), извлечение, использование, передача (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение, трансграничная передача персональных данных, получение изображений путем фотографирования /сканирования, а также осуществление любых иных действий с моими персональными данными с учетом действующего законодательства Российской Федерации. Обработка осуществляется как с помощью средств автоматизации, так и без использования таких средств. Я подтверждаю, что настоящее согласие на обработку персональных данных действует бессрочно с момента его предоставления Продавцу.
        Мне известно, что я вправе отозвать свое согласие на обработку персональных данных путем направления соответствующего письменного уведомления продавцу не менее чем за 60 (шестьдесят календарных) дней до момента отзыва согласия, при этом я признаю и понимаю, что доступ к пользованию Сайтом не будет предоставляться мне Продавцом с того момента, когда Продавец лишится возможности обрабатывать мои персональные данные.

        <div>&nbsp;</div>
        Я признаю и подтверждаю, что в случае необходимости предоставления моих персональных данных для достижения указанных выше целей третьим лицам (в том числе уполномоченным государственным органам), а равно как при привлечении третьих лиц к выполнению работ (оказанию услуг), предусмотренных Договором присоединения и Пользовательским соглашением, передачи Продавцу принадлежащих ей функций и полномочий иному лицу (уступке, в том числе для рассмотрения возможности уступки и принятию решения об уступке, взысканию задолженности и др.), вправе без получения дополнительного согласия с моей стороны в необходимом объеме передавать мои персональные данные таким третьим лицам.

        <div>&nbsp;</div>
        Я подтверждаю, что, давая настоящее согласие, я действую по собственной воле и в своих интересах.
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
