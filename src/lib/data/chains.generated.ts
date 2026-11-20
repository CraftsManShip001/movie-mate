/**
 * CGV·메가박스 전국 지점 데이터 등록부. 손으로 고치지 않는다.
 * 예매 좌석 데이터(2026-11-19)에서 만든 파일을 정적으로 import 한다. registry.ts·showtimes.ts 가 쓴다.
 */
import cgvGangnamTheater from "@data/theaters/cgv-gangnam/theater.json";
import cgvGangnamSchedule from "@data/showtimes/cgv-gangnam.json";
import cgvGangnamHall1 from "@data/theaters/cgv-gangnam/seatmaps/hall-1.json";
import cgvGangnamHall3 from "@data/theaters/cgv-gangnam/seatmaps/hall-3.json";
import cgvGangnamHall4 from "@data/theaters/cgv-gangnam/seatmaps/hall-4.json";
import cgvGangnamHall5 from "@data/theaters/cgv-gangnam/seatmaps/hall-5.json";
import cgvGangnamHall6 from "@data/theaters/cgv-gangnam/seatmaps/hall-6.json";
import cgvGangbyeonTheater from "@data/theaters/cgv-gangbyeon/theater.json";
import cgvGangbyeonSchedule from "@data/showtimes/cgv-gangbyeon.json";
import cgvGangbyeonS001 from "@data/theaters/cgv-gangbyeon/seatmaps/s001.json";
import cgvGangbyeonHall2 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-2.json";
import cgvGangbyeonHall3 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-3.json";
import cgvGangbyeonS004 from "@data/theaters/cgv-gangbyeon/seatmaps/s004.json";
import cgvGangbyeonHall5 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-5.json";
import cgvGangbyeonHall6 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-6.json";
import cgvGangbyeonHall7 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-7.json";
import cgvGangbyeonHall8 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-8.json";
import cgvGangbyeonHall9 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-9.json";
import cgvGangbyeonHall10 from "@data/theaters/cgv-gangbyeon/seatmaps/hall-10.json";
import cgvGangbyeonS011 from "@data/theaters/cgv-gangbyeon/seatmaps/s011.json";
import cgvGodeokgangilTheater from "@data/theaters/cgv-godeokgangil/theater.json";
import cgvGodeokgangilSchedule from "@data/showtimes/cgv-godeokgangil.json";
import cgvGodeokgangilS001 from "@data/theaters/cgv-godeokgangil/seatmaps/s001.json";
import cgvGodeokgangilHall2 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-2.json";
import cgvGodeokgangilHall3 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-3.json";
import cgvGodeokgangilHall4 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-4.json";
import cgvGodeokgangilHall5 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-5.json";
import cgvGodeokgangilS006 from "@data/theaters/cgv-godeokgangil/seatmaps/s006.json";
import cgvGodeokgangilHall7 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-7.json";
import cgvGodeokgangilHall8 from "@data/theaters/cgv-godeokgangil/seatmaps/hall-8.json";
import cgvGuroTheater from "@data/theaters/cgv-guro/theater.json";
import cgvGuroSchedule from "@data/showtimes/cgv-guro.json";
import cgvGuroHall1 from "@data/theaters/cgv-guro/seatmaps/hall-1.json";
import cgvGuroHall2 from "@data/theaters/cgv-guro/seatmaps/hall-2.json";
import cgvGuroHall5 from "@data/theaters/cgv-guro/seatmaps/hall-5.json";
import cgvGuroHall6 from "@data/theaters/cgv-guro/seatmaps/hall-6.json";
import cgvGuroHall7 from "@data/theaters/cgv-guro/seatmaps/hall-7.json";
import cgvGuroHall8 from "@data/theaters/cgv-guro/seatmaps/hall-8.json";
import cgvGuroHall9 from "@data/theaters/cgv-guro/seatmaps/hall-9.json";
import cgvGuroHall10 from "@data/theaters/cgv-guro/seatmaps/hall-10.json";
import cgvDaehakroTheater from "@data/theaters/cgv-daehakro/theater.json";
import cgvDaehakroSchedule from "@data/showtimes/cgv-daehakro.json";
import cgvDaehakroHall1 from "@data/theaters/cgv-daehakro/seatmaps/hall-1.json";
import cgvDaehakroHall2 from "@data/theaters/cgv-daehakro/seatmaps/hall-2.json";
import cgvDaehakroHall3 from "@data/theaters/cgv-daehakro/seatmaps/hall-3.json";
import cgvDaehakroHall4 from "@data/theaters/cgv-daehakro/seatmaps/hall-4.json";
import cgvDaehakroHall5 from "@data/theaters/cgv-daehakro/seatmaps/hall-5.json";
import cgvDaehakroHall6 from "@data/theaters/cgv-daehakro/seatmaps/hall-6.json";
import cgvDaehakroHall7 from "@data/theaters/cgv-daehakro/seatmaps/hall-7.json";
import cgvDaehakroHall8 from "@data/theaters/cgv-daehakro/seatmaps/hall-8.json";
import cgvDongdaemunTheater from "@data/theaters/cgv-dongdaemun/theater.json";
import cgvDongdaemunSchedule from "@data/showtimes/cgv-dongdaemun.json";
import cgvDongdaemunHall1 from "@data/theaters/cgv-dongdaemun/seatmaps/hall-1.json";
import cgvDongdaemunHall2 from "@data/theaters/cgv-dongdaemun/seatmaps/hall-2.json";
import cgvDongdaemunHall3 from "@data/theaters/cgv-dongdaemun/seatmaps/hall-3.json";
import cgvDongdaemunHall4 from "@data/theaters/cgv-dongdaemun/seatmaps/hall-4.json";
import cgvDongdaemunHall6 from "@data/theaters/cgv-dongdaemun/seatmaps/hall-6.json";
import cgvDeungchonTheater from "@data/theaters/cgv-deungchon/theater.json";
import cgvDeungchonSchedule from "@data/showtimes/cgv-deungchon.json";
import cgvDeungchonHall1 from "@data/theaters/cgv-deungchon/seatmaps/hall-1.json";
import cgvDeungchonHall2 from "@data/theaters/cgv-deungchon/seatmaps/hall-2.json";
import cgvDeungchonHall3 from "@data/theaters/cgv-deungchon/seatmaps/hall-3.json";
import cgvDeungchonHall4 from "@data/theaters/cgv-deungchon/seatmaps/hall-4.json";
import cgvDeungchonHall5 from "@data/theaters/cgv-deungchon/seatmaps/hall-5.json";
import cgvDeungchonHall6 from "@data/theaters/cgv-deungchon/seatmaps/hall-6.json";
import cgvMyeongdongTheater from "@data/theaters/cgv-myeongdong/theater.json";
import cgvMyeongdongSchedule from "@data/showtimes/cgv-myeongdong.json";
import cgvMyeongdongHall1 from "@data/theaters/cgv-myeongdong/seatmaps/hall-1.json";
import cgvMyeongdongHall2 from "@data/theaters/cgv-myeongdong/seatmaps/hall-2.json";
import cgvMyeongdongHall3 from "@data/theaters/cgv-myeongdong/seatmaps/hall-3.json";
import cgvMyeongdongHall4 from "@data/theaters/cgv-myeongdong/seatmaps/hall-4.json";
import cgvMyeongdongHall5 from "@data/theaters/cgv-myeongdong/seatmaps/hall-5.json";
import cgvMiaTheater from "@data/theaters/cgv-mia/theater.json";
import cgvMiaSchedule from "@data/showtimes/cgv-mia.json";
import cgvMiaHall1 from "@data/theaters/cgv-mia/seatmaps/hall-1.json";
import cgvMiaHall2 from "@data/theaters/cgv-mia/seatmaps/hall-2.json";
import cgvMiaHall3 from "@data/theaters/cgv-mia/seatmaps/hall-3.json";
import cgvMiaHall4 from "@data/theaters/cgv-mia/seatmaps/hall-4.json";
import cgvMiaHall5 from "@data/theaters/cgv-mia/seatmaps/hall-5.json";
import cgvMiaHall6 from "@data/theaters/cgv-mia/seatmaps/hall-6.json";
import cgvBanghakTheater from "@data/theaters/cgv-banghak/theater.json";
import cgvBanghakSchedule from "@data/showtimes/cgv-banghak.json";
import cgvBanghakS001 from "@data/theaters/cgv-banghak/seatmaps/s001.json";
import cgvBanghakHall2 from "@data/theaters/cgv-banghak/seatmaps/hall-2.json";
import cgvBanghakHall3 from "@data/theaters/cgv-banghak/seatmaps/hall-3.json";
import cgvBanghakHall4 from "@data/theaters/cgv-banghak/seatmaps/hall-4.json";
import cgvBanghakHall5 from "@data/theaters/cgv-banghak/seatmaps/hall-5.json";
import cgvBanghakHall6 from "@data/theaters/cgv-banghak/seatmaps/hall-6.json";
import cgvBanghakHall7 from "@data/theaters/cgv-banghak/seatmaps/hall-7.json";
import cgvBulgwangTheater from "@data/theaters/cgv-bulgwang/theater.json";
import cgvBulgwangSchedule from "@data/showtimes/cgv-bulgwang.json";
import cgvBulgwangHall1 from "@data/theaters/cgv-bulgwang/seatmaps/hall-1.json";
import cgvBulgwangHall2 from "@data/theaters/cgv-bulgwang/seatmaps/hall-2.json";
import cgvBulgwangHall3 from "@data/theaters/cgv-bulgwang/seatmaps/hall-3.json";
import cgvBulgwangHall4 from "@data/theaters/cgv-bulgwang/seatmaps/hall-4.json";
import cgvBulgwangHall6 from "@data/theaters/cgv-bulgwang/seatmaps/hall-6.json";
import cgvBulgwangHall7 from "@data/theaters/cgv-bulgwang/seatmaps/hall-7.json";
import cgvBulgwangHall8 from "@data/theaters/cgv-bulgwang/seatmaps/hall-8.json";
import cgvBulgwangHall9 from "@data/theaters/cgv-bulgwang/seatmaps/hall-9.json";
import cgvSangbongTheater from "@data/theaters/cgv-sangbong/theater.json";
import cgvSangbongSchedule from "@data/showtimes/cgv-sangbong.json";
import cgvSangbongHall1 from "@data/theaters/cgv-sangbong/seatmaps/hall-1.json";
import cgvSangbongS002 from "@data/theaters/cgv-sangbong/seatmaps/s002.json";
import cgvSangbongHall3 from "@data/theaters/cgv-sangbong/seatmaps/hall-3.json";
import cgvSangbongHall4 from "@data/theaters/cgv-sangbong/seatmaps/hall-4.json";
import cgvSangbongHall5 from "@data/theaters/cgv-sangbong/seatmaps/hall-5.json";
import cgvSangbongHall6 from "@data/theaters/cgv-sangbong/seatmaps/hall-6.json";
import cgvSangbongHall7 from "@data/theaters/cgv-sangbong/seatmaps/hall-7.json";
import cgvSeongsinyeodaeipguTheater from "@data/theaters/cgv-seongsinyeodaeipgu/theater.json";
import cgvSeongsinyeodaeipguSchedule from "@data/showtimes/cgv-seongsinyeodaeipgu.json";
import cgvSeongsinyeodaeipguHall1 from "@data/theaters/cgv-seongsinyeodaeipgu/seatmaps/hall-1.json";
import cgvSeongsinyeodaeipguHall4 from "@data/theaters/cgv-seongsinyeodaeipgu/seatmaps/hall-4.json";
import cgvSeongsinyeodaeipguHall5 from "@data/theaters/cgv-seongsinyeodaeipgu/seatmaps/hall-5.json";
import cgvSeongsinyeodaeipguHall2 from "@data/theaters/cgv-seongsinyeodaeipgu/seatmaps/hall-2.json";
import cgvSuyuTheater from "@data/theaters/cgv-suyu/theater.json";
import cgvSuyuSchedule from "@data/showtimes/cgv-suyu.json";
import cgvSuyuHall1 from "@data/theaters/cgv-suyu/seatmaps/hall-1.json";
import cgvSuyuHall2 from "@data/theaters/cgv-suyu/seatmaps/hall-2.json";
import cgvSuyuHall3 from "@data/theaters/cgv-suyu/seatmaps/hall-3.json";
import cgvSuyuHall4 from "@data/theaters/cgv-suyu/seatmaps/hall-4.json";
import cgvSuyuHall5 from "@data/theaters/cgv-suyu/seatmaps/hall-5.json";
import cgvSuyuHall6 from "@data/theaters/cgv-suyu/seatmaps/hall-6.json";
import cgvSuyuHall7 from "@data/theaters/cgv-suyu/seatmaps/hall-7.json";
import cgvSuyuHall8 from "@data/theaters/cgv-suyu/seatmaps/hall-8.json";
import cgvSuyuHall9 from "@data/theaters/cgv-suyu/seatmaps/hall-9.json";
import cgvSinchonateureonTheater from "@data/theaters/cgv-sinchonateureon/theater.json";
import cgvSinchonateureonSchedule from "@data/showtimes/cgv-sinchonateureon.json";
import cgvSinchonateureonHall2 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-2.json";
import cgvSinchonateureonHall3 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-3.json";
import cgvSinchonateureonHall4 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-4.json";
import cgvSinchonateureonHall5 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-5.json";
import cgvSinchonateureonS007 from "@data/theaters/cgv-sinchonateureon/seatmaps/s007.json";
import cgvSinchonateureonHall7 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-7.json";
import cgvSinchonateureonHall10 from "@data/theaters/cgv-sinchonateureon/seatmaps/hall-10.json";
import cgvApgujeongTheater from "@data/theaters/cgv-apgujeong/theater.json";
import cgvApgujeongSchedule from "@data/showtimes/cgv-apgujeong.json";
import cgvApgujeongS001 from "@data/theaters/cgv-apgujeong/seatmaps/s001.json";
import cgvApgujeongHall3 from "@data/theaters/cgv-apgujeong/seatmaps/hall-3.json";
import cgvApgujeongHall1 from "@data/theaters/cgv-apgujeong/seatmaps/hall-1.json";
import cgvApgujeongHall2 from "@data/theaters/cgv-apgujeong/seatmaps/hall-2.json";
import cgvApgujeongHall4 from "@data/theaters/cgv-apgujeong/seatmaps/hall-4.json";
import cgvSsinedeuswepeuApgujeongTheater from "@data/theaters/cgv-ssinedeuswepeu-apgujeong/theater.json";
import cgvSsinedeuswepeuApgujeongSchedule from "@data/showtimes/cgv-ssinedeuswepeu-apgujeong.json";
import cgvSsinedeuswepeuApgujeongS001 from "@data/theaters/cgv-ssinedeuswepeu-apgujeong/seatmaps/s001.json";
import cgvSsinedeuswepeuApgujeongS002 from "@data/theaters/cgv-ssinedeuswepeu-apgujeong/seatmaps/s002.json";
import cgvYeouidoTheater from "@data/theaters/cgv-yeouido/theater.json";
import cgvYeouidoSchedule from "@data/showtimes/cgv-yeouido.json";
import cgvYeouidoHall1 from "@data/theaters/cgv-yeouido/seatmaps/hall-1.json";
import cgvYeouidoHall2 from "@data/theaters/cgv-yeouido/seatmaps/hall-2.json";
import cgvYeouidoHall3 from "@data/theaters/cgv-yeouido/seatmaps/hall-3.json";
import cgvYeouidoS006 from "@data/theaters/cgv-yeouido/seatmaps/s006.json";
import cgvYeouidoHall6 from "@data/theaters/cgv-yeouido/seatmaps/hall-6.json";
import cgvYeouidoHall7 from "@data/theaters/cgv-yeouido/seatmaps/hall-7.json";
import cgvYeonnamTheater from "@data/theaters/cgv-yeonnam/theater.json";
import cgvYeonnamSchedule from "@data/showtimes/cgv-yeonnam.json";
import cgvYeonnamS001 from "@data/theaters/cgv-yeonnam/seatmaps/s001.json";
import cgvYeonnamHall2 from "@data/theaters/cgv-yeonnam/seatmaps/hall-2.json";
import cgvYeonnamS003 from "@data/theaters/cgv-yeonnam/seatmaps/s003.json";
import cgvYeonnamHall4 from "@data/theaters/cgv-yeonnam/seatmaps/hall-4.json";
import cgvYeonnamHall5 from "@data/theaters/cgv-yeonnam/seatmaps/hall-5.json";
import cgvYeonnamHall6 from "@data/theaters/cgv-yeonnam/seatmaps/hall-6.json";
import cgvYeongdeungpotaimseukweeoTheater from "@data/theaters/cgv-yeongdeungpotaimseukweeo/theater.json";
import cgvYeongdeungpotaimseukweeoSchedule from "@data/showtimes/cgv-yeongdeungpotaimseukweeo.json";
import cgvYeongdeungpotaimseukweeoHall1 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-1.json";
import cgvYeongdeungpotaimseukweeoS002 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/s002.json";
import cgvYeongdeungpotaimseukweeoHall3 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-3.json";
import cgvYeongdeungpotaimseukweeoHall4 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-4.json";
import cgvYeongdeungpotaimseukweeoHall5 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-5.json";
import cgvYeongdeungpotaimseukweeoHall7 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-7.json";
import cgvYeongdeungpotaimseukweeoHall8 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-8.json";
import cgvYeongdeungpotaimseukweeoHall9 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/hall-9.json";
import cgvYeongdeungpotaimseukweeoS010 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/s010.json";
import cgvYeongdeungpotaimseukweeoS011 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/s011.json";
import cgvYeongdeungpotaimseukweeoS017 from "@data/theaters/cgv-yeongdeungpotaimseukweeo/seatmaps/s017.json";
import cgvWangsipriTheater from "@data/theaters/cgv-wangsipri/theater.json";
import cgvWangsipriSchedule from "@data/showtimes/cgv-wangsipri.json";
import cgvWangsipriHall1 from "@data/theaters/cgv-wangsipri/seatmaps/hall-1.json";
import cgvWangsipriHall2 from "@data/theaters/cgv-wangsipri/seatmaps/hall-2.json";
import cgvWangsipriHall4 from "@data/theaters/cgv-wangsipri/seatmaps/hall-4.json";
import cgvWangsipriHall5 from "@data/theaters/cgv-wangsipri/seatmaps/hall-5.json";
import cgvWangsipriS006 from "@data/theaters/cgv-wangsipri/seatmaps/s006.json";
import cgvWangsipriHall7 from "@data/theaters/cgv-wangsipri/seatmaps/hall-7.json";
import cgvWangsipriS008 from "@data/theaters/cgv-wangsipri/seatmaps/s008.json";
import cgvWangsipriS009 from "@data/theaters/cgv-wangsipri/seatmaps/s009.json";
import cgvWangsipriS010 from "@data/theaters/cgv-wangsipri/seatmaps/s010.json";
import cgvYongsanIparkMallTheater from "@data/theaters/cgv-yongsan-ipark-mall/theater.json";
import cgvYongsanIparkMallSchedule from "@data/showtimes/cgv-yongsan-ipark-mall.json";
import cgvYongsanIparkMallHall1 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-1.json";
import cgvYongsanIparkMallHall2 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-2.json";
import cgvYongsanIparkMallS003 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/s003.json";
import cgvYongsanIparkMallS004 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/s004.json";
import cgvYongsanIparkMallHall5 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-5.json";
import cgvYongsanIparkMallHall6 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-6.json";
import cgvYongsanIparkMallHall7 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-7.json";
import cgvYongsanIparkMallHall11 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-11.json";
import cgvYongsanIparkMallHall12 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-12.json";
import cgvYongsanIparkMallHall13 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-13.json";
import cgvYongsanIparkMallHall14 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-14.json";
import cgvYongsanIparkMallHall15 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-15.json";
import cgvYongsanIparkMallHall16 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-16.json";
import cgvYongsanIparkMallHall17 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-17.json";
import cgvYongsanIparkMallHall18 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-18.json";
import cgvYongsanIparkMallS017 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/s017.json";
import cgvYongsanIparkMallHall17024 from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/hall-17-024.json";
import cgvSsinedeuswepeuYongsanTheater from "@data/theaters/cgv-ssinedeuswepeu-yongsan/theater.json";
import cgvSsinedeuswepeuYongsanSchedule from "@data/showtimes/cgv-ssinedeuswepeu-yongsan.json";
import cgvSsinedeuswepeuYongsanS002 from "@data/theaters/cgv-ssinedeuswepeu-yongsan/seatmaps/s002.json";
import cgvSsinedeuswepeuYongsanS007 from "@data/theaters/cgv-ssinedeuswepeu-yongsan/seatmaps/s007.json";
import cgvJunggyeTheater from "@data/theaters/cgv-junggye/theater.json";
import cgvJunggyeSchedule from "@data/showtimes/cgv-junggye.json";
import cgvJunggyeHall1 from "@data/theaters/cgv-junggye/seatmaps/hall-1.json";
import cgvJunggyeHall2 from "@data/theaters/cgv-junggye/seatmaps/hall-2.json";
import cgvJunggyeHall3 from "@data/theaters/cgv-junggye/seatmaps/hall-3.json";
import cgvJunggyeHall4 from "@data/theaters/cgv-junggye/seatmaps/hall-4.json";
import cgvJunggyeHall5 from "@data/theaters/cgv-junggye/seatmaps/hall-5.json";
import cgvJunggyeHall6 from "@data/theaters/cgv-junggye/seatmaps/hall-6.json";
import cgvJunggyeHall7 from "@data/theaters/cgv-junggye/seatmaps/hall-7.json";
import cgvCheonhoTheater from "@data/theaters/cgv-cheonho/theater.json";
import cgvCheonhoSchedule from "@data/showtimes/cgv-cheonho.json";
import cgvCheonhoHall1 from "@data/theaters/cgv-cheonho/seatmaps/hall-1.json";
import cgvCheonhoHall2 from "@data/theaters/cgv-cheonho/seatmaps/hall-2.json";
import cgvCheonhoHall3 from "@data/theaters/cgv-cheonho/seatmaps/hall-3.json";
import cgvCheonhoHall4 from "@data/theaters/cgv-cheonho/seatmaps/hall-4.json";
import cgvCheonhoHall5 from "@data/theaters/cgv-cheonho/seatmaps/hall-5.json";
import cgvCheonhoS006 from "@data/theaters/cgv-cheonho/seatmaps/s006.json";
import cgvCheongdamssinesitiTheater from "@data/theaters/cgv-cheongdamssinesiti/theater.json";
import cgvCheongdamssinesitiSchedule from "@data/showtimes/cgv-cheongdamssinesiti.json";
import cgvCheongdamssinesitiS001 from "@data/theaters/cgv-cheongdamssinesiti/seatmaps/s001.json";
import cgvCheongdamssinesitiHall1 from "@data/theaters/cgv-cheongdamssinesiti/seatmaps/hall-1.json";
import cgvCheongdamssinesitiHall2 from "@data/theaters/cgv-cheongdamssinesiti/seatmaps/hall-2.json";
import cgvCheongdamssinesitiHall3 from "@data/theaters/cgv-cheongdamssinesiti/seatmaps/hall-3.json";
import cgvCheongdamssinesitiS008 from "@data/theaters/cgv-cheongdamssinesiti/seatmaps/s008.json";
import cgvPikadiri1958Theater from "@data/theaters/cgv-pikadiri1958/theater.json";
import cgvPikadiri1958Schedule from "@data/showtimes/cgv-pikadiri1958.json";
import cgvPikadiri1958Hall1 from "@data/theaters/cgv-pikadiri1958/seatmaps/hall-1.json";
import cgvPikadiri1958Hall2 from "@data/theaters/cgv-pikadiri1958/seatmaps/hall-2.json";
import cgvPikadiri1958Hall4 from "@data/theaters/cgv-pikadiri1958/seatmaps/hall-4.json";
import cgvPikadiri1958Hall5 from "@data/theaters/cgv-pikadiri1958/seatmaps/hall-5.json";
import cgvPikadiri1958Hall6 from "@data/theaters/cgv-pikadiri1958/seatmaps/hall-6.json";
import cgvHongdaeTheater from "@data/theaters/cgv-hongdae/theater.json";
import cgvHongdaeSchedule from "@data/showtimes/cgv-hongdae.json";
import cgvHongdaeHall1 from "@data/theaters/cgv-hongdae/seatmaps/hall-1.json";
import cgvHongdaeHall2 from "@data/theaters/cgv-hongdae/seatmaps/hall-2.json";
import cgvHongdaeHall3 from "@data/theaters/cgv-hongdae/seatmaps/hall-3.json";
import cgvHongdaeHall4 from "@data/theaters/cgv-hongdae/seatmaps/hall-4.json";
import cgvHongdaeHall5 from "@data/theaters/cgv-hongdae/seatmaps/hall-5.json";
import cgvHongdaeHall6 from "@data/theaters/cgv-hongdae/seatmaps/hall-6.json";
import cgvGyeonggigwangjuTheater from "@data/theaters/cgv-gyeonggigwangju/theater.json";
import cgvGyeonggigwangjuSchedule from "@data/showtimes/cgv-gyeonggigwangju.json";
import cgvGyeonggigwangjuHall1 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-1.json";
import cgvGyeonggigwangjuHall2 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-2.json";
import cgvGyeonggigwangjuHall3 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-3.json";
import cgvGyeonggigwangjuHall4 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-4.json";
import cgvGyeonggigwangjuHall5 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-5.json";
import cgvGyeonggigwangjuHall6 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-6.json";
import cgvGyeonggigwangjuHall7 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-7.json";
import cgvGyeonggigwangjuHall8 from "@data/theaters/cgv-gyeonggigwangju/seatmaps/hall-8.json";
import cgvGoyangbaekseokTheater from "@data/theaters/cgv-goyangbaekseok/theater.json";
import cgvGoyangbaekseokSchedule from "@data/showtimes/cgv-goyangbaekseok.json";
import cgvGoyangbaekseokHall1 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-1.json";
import cgvGoyangbaekseokHall2 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-2.json";
import cgvGoyangbaekseokHall3 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-3.json";
import cgvGoyangbaekseokHall4 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-4.json";
import cgvGoyangbaekseokHall5 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-5.json";
import cgvGoyangbaekseokHall6 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-6.json";
import cgvGoyangbaekseokHall7 from "@data/theaters/cgv-goyangbaekseok/seatmaps/hall-7.json";
import cgvGoyanghaengsinTheater from "@data/theaters/cgv-goyanghaengsin/theater.json";
import cgvGoyanghaengsinSchedule from "@data/showtimes/cgv-goyanghaengsin.json";
import cgvGoyanghaengsinHall1 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-1.json";
import cgvGoyanghaengsinHall2 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-2.json";
import cgvGoyanghaengsinHall3 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-3.json";
import cgvGoyanghaengsinHall4 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-4.json";
import cgvGoyanghaengsinHall5 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-5.json";
import cgvGoyanghaengsinHall6 from "@data/theaters/cgv-goyanghaengsin/seatmaps/hall-6.json";
import cgvGwanggyoTheater from "@data/theaters/cgv-gwanggyo/theater.json";
import cgvGwanggyoSchedule from "@data/showtimes/cgv-gwanggyo.json";
import cgvGwanggyoHall1 from "@data/theaters/cgv-gwanggyo/seatmaps/hall-1.json";
import cgvGwanggyoHall2 from "@data/theaters/cgv-gwanggyo/seatmaps/hall-2.json";
import cgvGwanggyoHall3 from "@data/theaters/cgv-gwanggyo/seatmaps/hall-3.json";
import cgvGwanggyoS004 from "@data/theaters/cgv-gwanggyo/seatmaps/s004.json";
import cgvGwanggyoS005 from "@data/theaters/cgv-gwanggyo/seatmaps/s005.json";
import cgvGwanggyoS006 from "@data/theaters/cgv-gwanggyo/seatmaps/s006.json";
import cgvGwangmyeongyeokTheater from "@data/theaters/cgv-gwangmyeongyeok/theater.json";
import cgvGwangmyeongyeokSchedule from "@data/showtimes/cgv-gwangmyeongyeok.json";
import cgvGwangmyeongyeokHall1 from "@data/theaters/cgv-gwangmyeongyeok/seatmaps/hall-1.json";
import cgvGwangmyeongyeokHall2 from "@data/theaters/cgv-gwangmyeongyeok/seatmaps/hall-2.json";
import cgvGwangmyeongyeokHall3 from "@data/theaters/cgv-gwangmyeongyeok/seatmaps/hall-3.json";
import cgvGwangmyeongyeokHall4 from "@data/theaters/cgv-gwangmyeongyeok/seatmaps/hall-4.json";
import cgvGwangmyeongyeokHall5 from "@data/theaters/cgv-gwangmyeongyeok/seatmaps/hall-5.json";
import cgvGuriTheater from "@data/theaters/cgv-guri/theater.json";
import cgvGuriSchedule from "@data/showtimes/cgv-guri.json";
import cgvGuriHall1 from "@data/theaters/cgv-guri/seatmaps/hall-1.json";
import cgvGuriHall2 from "@data/theaters/cgv-guri/seatmaps/hall-2.json";
import cgvGuriHall3 from "@data/theaters/cgv-guri/seatmaps/hall-3.json";
import cgvGuriHall4 from "@data/theaters/cgv-guri/seatmaps/hall-4.json";
import cgvGuriHall5 from "@data/theaters/cgv-guri/seatmaps/hall-5.json";
import cgvGuriHall6 from "@data/theaters/cgv-guri/seatmaps/hall-6.json";
import cgvGuriHall7 from "@data/theaters/cgv-guri/seatmaps/hall-7.json";
import cgvGurigalmaeTheater from "@data/theaters/cgv-gurigalmae/theater.json";
import cgvGurigalmaeSchedule from "@data/showtimes/cgv-gurigalmae.json";
import cgvGurigalmaeHall1 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-1.json";
import cgvGurigalmaeHall2 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-2.json";
import cgvGurigalmaeHall3 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-3.json";
import cgvGurigalmaeHall4 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-4.json";
import cgvGurigalmaeHall5 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-5.json";
import cgvGurigalmaeHall6 from "@data/theaters/cgv-gurigalmae/seatmaps/hall-6.json";
import cgvGiheungTheater from "@data/theaters/cgv-giheung/theater.json";
import cgvGiheungSchedule from "@data/showtimes/cgv-giheung.json";
import cgvGiheungHall1 from "@data/theaters/cgv-giheung/seatmaps/hall-1.json";
import cgvGiheungHall2 from "@data/theaters/cgv-giheung/seatmaps/hall-2.json";
import cgvGiheungHall3 from "@data/theaters/cgv-giheung/seatmaps/hall-3.json";
import cgvGiheungHall4 from "@data/theaters/cgv-giheung/seatmaps/hall-4.json";
import cgvGiheungHall5 from "@data/theaters/cgv-giheung/seatmaps/hall-5.json";
import cgvGiheungHall6 from "@data/theaters/cgv-giheung/seatmaps/hall-6.json";
import cgvGimpoTheater from "@data/theaters/cgv-gimpo/theater.json";
import cgvGimpoSchedule from "@data/showtimes/cgv-gimpo.json";
import cgvGimpoHall1 from "@data/theaters/cgv-gimpo/seatmaps/hall-1.json";
import cgvGimpoHall2 from "@data/theaters/cgv-gimpo/seatmaps/hall-2.json";
import cgvGimpoHall3 from "@data/theaters/cgv-gimpo/seatmaps/hall-3.json";
import cgvGimpoHall4 from "@data/theaters/cgv-gimpo/seatmaps/hall-4.json";
import cgvGimpoHall5 from "@data/theaters/cgv-gimpo/seatmaps/hall-5.json";
import cgvGimpoHall6 from "@data/theaters/cgv-gimpo/seatmaps/hall-6.json";
import cgvGimpounyangTheater from "@data/theaters/cgv-gimpounyang/theater.json";
import cgvGimpounyangSchedule from "@data/showtimes/cgv-gimpounyang.json";
import cgvGimpounyangHall1 from "@data/theaters/cgv-gimpounyang/seatmaps/hall-1.json";
import cgvGimpounyangHall2 from "@data/theaters/cgv-gimpounyang/seatmaps/hall-2.json";
import cgvGimpounyangHall3 from "@data/theaters/cgv-gimpounyang/seatmaps/hall-3.json";
import cgvGimpounyangHall4 from "@data/theaters/cgv-gimpounyang/seatmaps/hall-4.json";
import cgvGimpohangangTheater from "@data/theaters/cgv-gimpohangang/theater.json";
import cgvGimpohangangSchedule from "@data/showtimes/cgv-gimpohangang.json";
import cgvGimpohangangHall1 from "@data/theaters/cgv-gimpohangang/seatmaps/hall-1.json";
import cgvGimpohangangHall2 from "@data/theaters/cgv-gimpohangang/seatmaps/hall-2.json";
import cgvGimpohangangHall3 from "@data/theaters/cgv-gimpohangang/seatmaps/hall-3.json";
import cgvGimpohangangHall4 from "@data/theaters/cgv-gimpohangang/seatmaps/hall-4.json";
import cgvNamyangjuhwadoTheater from "@data/theaters/cgv-namyangjuhwado/theater.json";
import cgvNamyangjuhwadoSchedule from "@data/showtimes/cgv-namyangjuhwado.json";
import cgvNamyangjuhwadoHall1 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-1.json";
import cgvNamyangjuhwadoHall2 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-2.json";
import cgvNamyangjuhwadoHall3 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-3.json";
import cgvNamyangjuhwadoHall4 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-4.json";
import cgvNamyangjuhwadoHall5 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-5.json";
import cgvNamyangjuhwadoHall6 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-6.json";
import cgvNamyangjuhwadoHall7 from "@data/theaters/cgv-namyangjuhwado/seatmaps/hall-7.json";
import cgvDasanTheater from "@data/theaters/cgv-dasan/theater.json";
import cgvDasanSchedule from "@data/showtimes/cgv-dasan.json";
import cgvDasanHall1 from "@data/theaters/cgv-dasan/seatmaps/hall-1.json";
import cgvDasanHall2 from "@data/theaters/cgv-dasan/seatmaps/hall-2.json";
import cgvDasanHall3 from "@data/theaters/cgv-dasan/seatmaps/hall-3.json";
import cgvDasanHall4 from "@data/theaters/cgv-dasan/seatmaps/hall-4.json";
import cgvDasanHall5 from "@data/theaters/cgv-dasan/seatmaps/hall-5.json";
import cgvDasanHall6 from "@data/theaters/cgv-dasan/seatmaps/hall-6.json";
import cgvDasanHall7 from "@data/theaters/cgv-dasan/seatmaps/hall-7.json";
import cgvDasanHall8 from "@data/theaters/cgv-dasan/seatmaps/hall-8.json";
import cgvDasanHall9 from "@data/theaters/cgv-dasan/seatmaps/hall-9.json";
import cgvDasanHall10 from "@data/theaters/cgv-dasan/seatmaps/hall-10.json";
import cgvDongbaekTheater from "@data/theaters/cgv-dongbaek/theater.json";
import cgvDongbaekSchedule from "@data/showtimes/cgv-dongbaek.json";
import cgvDongbaekHall1 from "@data/theaters/cgv-dongbaek/seatmaps/hall-1.json";
import cgvDongbaekHall2 from "@data/theaters/cgv-dongbaek/seatmaps/hall-2.json";
import cgvDongbaekHall3 from "@data/theaters/cgv-dongbaek/seatmaps/hall-3.json";
import cgvDongbaekHall4 from "@data/theaters/cgv-dongbaek/seatmaps/hall-4.json";
import cgvDongbaekHall5 from "@data/theaters/cgv-dongbaek/seatmaps/hall-5.json";
import cgvDongbaekHall6 from "@data/theaters/cgv-dongbaek/seatmaps/hall-6.json";
import cgvDongbaekHall7 from "@data/theaters/cgv-dongbaek/seatmaps/hall-7.json";
import cgvDongbaekHall8 from "@data/theaters/cgv-dongbaek/seatmaps/hall-8.json";
import cgvDongsuwonTheater from "@data/theaters/cgv-dongsuwon/theater.json";
import cgvDongsuwonSchedule from "@data/showtimes/cgv-dongsuwon.json";
import cgvDongsuwonS001 from "@data/theaters/cgv-dongsuwon/seatmaps/s001.json";
import cgvDongsuwonS002 from "@data/theaters/cgv-dongsuwon/seatmaps/s002.json";
import cgvDongsuwonHall3 from "@data/theaters/cgv-dongsuwon/seatmaps/hall-3.json";
import cgvDongsuwonS004 from "@data/theaters/cgv-dongsuwon/seatmaps/s004.json";
import cgvDongsuwonHall5 from "@data/theaters/cgv-dongsuwon/seatmaps/hall-5.json";
import cgvDongsuwonHall6 from "@data/theaters/cgv-dongsuwon/seatmaps/hall-6.json";
import cgvDongsuwonHall7 from "@data/theaters/cgv-dongsuwon/seatmaps/hall-7.json";
import cgvDongsuwonHall8 from "@data/theaters/cgv-dongsuwon/seatmaps/hall-8.json";
import cgvDongtanTheater from "@data/theaters/cgv-dongtan/theater.json";
import cgvDongtanSchedule from "@data/showtimes/cgv-dongtan.json";
import cgvDongtanHall1 from "@data/theaters/cgv-dongtan/seatmaps/hall-1.json";
import cgvDongtanHall2 from "@data/theaters/cgv-dongtan/seatmaps/hall-2.json";
import cgvDongtanHall3 from "@data/theaters/cgv-dongtan/seatmaps/hall-3.json";
import cgvDongtanHall4 from "@data/theaters/cgv-dongtan/seatmaps/hall-4.json";
import cgvDongtanHall5 from "@data/theaters/cgv-dongtan/seatmaps/hall-5.json";
import cgvDongtanHall6 from "@data/theaters/cgv-dongtan/seatmaps/hall-6.json";
import cgvDongtanS007 from "@data/theaters/cgv-dongtan/seatmaps/s007.json";
import cgvDongtanHall8 from "@data/theaters/cgv-dongtan/seatmaps/hall-8.json";
import cgvDongtangeurangpasajyuTheater from "@data/theaters/cgv-dongtangeurangpasajyu/theater.json";
import cgvDongtangeurangpasajyuSchedule from "@data/showtimes/cgv-dongtangeurangpasajyu.json";
import cgvDongtangeurangpasajyuHall1 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-1.json";
import cgvDongtangeurangpasajyuHall2 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-2.json";
import cgvDongtangeurangpasajyuHall3 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-3.json";
import cgvDongtangeurangpasajyuHall4 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-4.json";
import cgvDongtangeurangpasajyuHall5 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-5.json";
import cgvDongtangeurangpasajyuHall6 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-6.json";
import cgvDongtangeurangpasajyuHall7 from "@data/theaters/cgv-dongtangeurangpasajyu/seatmaps/hall-7.json";
import cgvDongtanyeokTheater from "@data/theaters/cgv-dongtanyeok/theater.json";
import cgvDongtanyeokSchedule from "@data/showtimes/cgv-dongtanyeok.json";
import cgvDongtanyeokHall1 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-1.json";
import cgvDongtanyeokHall2 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-2.json";
import cgvDongtanyeokHall3 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-3.json";
import cgvDongtanyeokHall4 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-4.json";
import cgvDongtanyeokHall5 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-5.json";
import cgvDongtanyeokHall6 from "@data/theaters/cgv-dongtanyeok/seatmaps/hall-6.json";
import cgvDongtanyeokS007 from "@data/theaters/cgv-dongtanyeok/seatmaps/s007.json";
import cgvDongtanhosugongwonTheater from "@data/theaters/cgv-dongtanhosugongwon/theater.json";
import cgvDongtanhosugongwonSchedule from "@data/showtimes/cgv-dongtanhosugongwon.json";
import cgvDongtanhosugongwonHall1 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-1.json";
import cgvDongtanhosugongwonHall2 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-2.json";
import cgvDongtanhosugongwonHall3 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-3.json";
import cgvDongtanhosugongwonHall4 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-4.json";
import cgvDongtanhosugongwonHall5 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-5.json";
import cgvDongtanhosugongwonHall6 from "@data/theaters/cgv-dongtanhosugongwon/seatmaps/hall-6.json";
import cgvBaegotTheater from "@data/theaters/cgv-baegot/theater.json";
import cgvBaegotSchedule from "@data/showtimes/cgv-baegot.json";
import cgvBaegotHall1 from "@data/theaters/cgv-baegot/seatmaps/hall-1.json";
import cgvBaegotHall2 from "@data/theaters/cgv-baegot/seatmaps/hall-2.json";
import cgvBaegotHall3 from "@data/theaters/cgv-baegot/seatmaps/hall-3.json";
import cgvBaegotHall4 from "@data/theaters/cgv-baegot/seatmaps/hall-4.json";
import cgvBaegotHall5 from "@data/theaters/cgv-baegot/seatmaps/hall-5.json";
import cgvBaegotHall6 from "@data/theaters/cgv-baegot/seatmaps/hall-6.json";
import cgvBeomgyeTheater from "@data/theaters/cgv-beomgye/theater.json";
import cgvBeomgyeSchedule from "@data/showtimes/cgv-beomgye.json";
import cgvBeomgyeHall1 from "@data/theaters/cgv-beomgye/seatmaps/hall-1.json";
import cgvBeomgyeHall2 from "@data/theaters/cgv-beomgye/seatmaps/hall-2.json";
import cgvBeomgyeHall3 from "@data/theaters/cgv-beomgye/seatmaps/hall-3.json";
import cgvBeomgyeHall4 from "@data/theaters/cgv-beomgye/seatmaps/hall-4.json";
import cgvBeomgyeHall5 from "@data/theaters/cgv-beomgye/seatmaps/hall-5.json";
import cgvBeomgyeHall6 from "@data/theaters/cgv-beomgye/seatmaps/hall-6.json";
import cgvBucheonTheater from "@data/theaters/cgv-bucheon/theater.json";
import cgvBucheonSchedule from "@data/showtimes/cgv-bucheon.json";
import cgvBucheonS001 from "@data/theaters/cgv-bucheon/seatmaps/s001.json";
import cgvBucheonS002 from "@data/theaters/cgv-bucheon/seatmaps/s002.json";
import cgvBucheonHall3 from "@data/theaters/cgv-bucheon/seatmaps/hall-3.json";
import cgvBucheonHall4 from "@data/theaters/cgv-bucheon/seatmaps/hall-4.json";
import cgvBucheonHall5 from "@data/theaters/cgv-bucheon/seatmaps/hall-5.json";
import cgvBucheonHall6 from "@data/theaters/cgv-bucheon/seatmaps/hall-6.json";
import cgvBucheonHall7 from "@data/theaters/cgv-bucheon/seatmaps/hall-7.json";
import cgvBucheonHall8 from "@data/theaters/cgv-bucheon/seatmaps/hall-8.json";
import cgvBucheonyeokTheater from "@data/theaters/cgv-bucheonyeok/theater.json";
import cgvBucheonyeokSchedule from "@data/showtimes/cgv-bucheonyeok.json";
import cgvBucheonyeokHall1 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-1.json";
import cgvBucheonyeokHall2 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-2.json";
import cgvBucheonyeokHall3 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-3.json";
import cgvBucheonyeokHall4 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-4.json";
import cgvBucheonyeokHall5 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-5.json";
import cgvBucheonyeokHall6 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-6.json";
import cgvBucheonyeokHall7 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-7.json";
import cgvBucheonyeokHall8 from "@data/theaters/cgv-bucheonyeok/seatmaps/hall-8.json";
import cgvSeohyeonTheater from "@data/theaters/cgv-seohyeon/theater.json";
import cgvSeohyeonSchedule from "@data/showtimes/cgv-seohyeon.json";
import cgvSeohyeonHall1 from "@data/theaters/cgv-seohyeon/seatmaps/hall-1.json";
import cgvSeohyeonHall2 from "@data/theaters/cgv-seohyeon/seatmaps/hall-2.json";
import cgvSeohyeonHall3 from "@data/theaters/cgv-seohyeon/seatmaps/hall-3.json";
import cgvSeohyeonHall4 from "@data/theaters/cgv-seohyeon/seatmaps/hall-4.json";
import cgvSopungTheater from "@data/theaters/cgv-sopung/theater.json";
import cgvSopungSchedule from "@data/showtimes/cgv-sopung.json";
import cgvSopungS001 from "@data/theaters/cgv-sopung/seatmaps/s001.json";
import cgvSopungHall2 from "@data/theaters/cgv-sopung/seatmaps/hall-2.json";
import cgvSopungHall4 from "@data/theaters/cgv-sopung/seatmaps/hall-4.json";
import cgvSopungHall5 from "@data/theaters/cgv-sopung/seatmaps/hall-5.json";
import cgvSopungHall6 from "@data/theaters/cgv-sopung/seatmaps/hall-6.json";
import cgvSopungHall7 from "@data/theaters/cgv-sopung/seatmaps/hall-7.json";
import cgvSopungHall8 from "@data/theaters/cgv-sopung/seatmaps/hall-8.json";
import cgvSopungHall9 from "@data/theaters/cgv-sopung/seatmaps/hall-9.json";
import cgvSopungHall10 from "@data/theaters/cgv-sopung/seatmaps/hall-10.json";
import cgvSopungHall11 from "@data/theaters/cgv-sopung/seatmaps/hall-11.json";
import cgvSeutapildeusitiwiryeTheater from "@data/theaters/cgv-seutapildeusitiwirye/theater.json";
import cgvSeutapildeusitiwiryeSchedule from "@data/showtimes/cgv-seutapildeusitiwirye.json";
import cgvSeutapildeusitiwiryeHall1 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/hall-1.json";
import cgvSeutapildeusitiwiryeHall2 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/hall-2.json";
import cgvSeutapildeusitiwiryeHall3 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/hall-3.json";
import cgvSeutapildeusitiwiryeHall4 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/hall-4.json";
import cgvSeutapildeusitiwiryeS005 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/s005.json";
import cgvSeutapildeusitiwiryeHall6 from "@data/theaters/cgv-seutapildeusitiwirye/seatmaps/hall-6.json";
import cgvSinsegyegyeonggiTheater from "@data/theaters/cgv-sinsegyegyeonggi/theater.json";
import cgvSinsegyegyeonggiSchedule from "@data/showtimes/cgv-sinsegyegyeonggi.json";
import cgvSinsegyegyeonggiS001 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/s001.json";
import cgvSinsegyegyeonggiS002 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/s002.json";
import cgvSinsegyegyeonggiS003 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/s003.json";
import cgvSinsegyegyeonggiHall4 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/hall-4.json";
import cgvSinsegyegyeonggiHall5 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/hall-5.json";
import cgvSinsegyegyeonggiS006 from "@data/theaters/cgv-sinsegyegyeonggi/seatmaps/s006.json";
import cgvAnsanTheater from "@data/theaters/cgv-ansan/theater.json";
import cgvAnsanSchedule from "@data/showtimes/cgv-ansan.json";
import cgvAnsanHall1 from "@data/theaters/cgv-ansan/seatmaps/hall-1.json";
import cgvAnsanHall2 from "@data/theaters/cgv-ansan/seatmaps/hall-2.json";
import cgvAnsanHall3 from "@data/theaters/cgv-ansan/seatmaps/hall-3.json";
import cgvAnsanS004 from "@data/theaters/cgv-ansan/seatmaps/s004.json";
import cgvAnsanHall5 from "@data/theaters/cgv-ansan/seatmaps/hall-5.json";
import cgvAnsanHall6 from "@data/theaters/cgv-ansan/seatmaps/hall-6.json";
import cgvAnsanHall7 from "@data/theaters/cgv-ansan/seatmaps/hall-7.json";
import cgvAnsanHall8 from "@data/theaters/cgv-ansan/seatmaps/hall-8.json";
import cgvAnseongTheater from "@data/theaters/cgv-anseong/theater.json";
import cgvAnseongSchedule from "@data/showtimes/cgv-anseong.json";
import cgvAnseongHall1 from "@data/theaters/cgv-anseong/seatmaps/hall-1.json";
import cgvAnseongHall2 from "@data/theaters/cgv-anseong/seatmaps/hall-2.json";
import cgvAnseongHall3 from "@data/theaters/cgv-anseong/seatmaps/hall-3.json";
import cgvAnseongHall4 from "@data/theaters/cgv-anseong/seatmaps/hall-4.json";
import cgvAnseongHall5 from "@data/theaters/cgv-anseong/seatmaps/hall-5.json";
import cgvAnseongHall6 from "@data/theaters/cgv-anseong/seatmaps/hall-6.json";
import cgvAnseongHall7 from "@data/theaters/cgv-anseong/seatmaps/hall-7.json";
import cgvAnseongHall8 from "@data/theaters/cgv-anseong/seatmaps/hall-8.json";
import cgvYatapTheater from "@data/theaters/cgv-yatap/theater.json";
import cgvYatapSchedule from "@data/showtimes/cgv-yatap.json";
import cgvYatapHall1 from "@data/theaters/cgv-yatap/seatmaps/hall-1.json";
import cgvYatapHall2 from "@data/theaters/cgv-yatap/seatmaps/hall-2.json";
import cgvYatapHall3 from "@data/theaters/cgv-yatap/seatmaps/hall-3.json";
import cgvYatapHall4 from "@data/theaters/cgv-yatap/seatmaps/hall-4.json";
import cgvYatapHall5 from "@data/theaters/cgv-yatap/seatmaps/hall-5.json";
import cgvYatapS006 from "@data/theaters/cgv-yatap/seatmaps/s006.json";
import cgvYatapHall7 from "@data/theaters/cgv-yatap/seatmaps/hall-7.json";
import cgvYatapHall8 from "@data/theaters/cgv-yatap/seatmaps/hall-8.json";
import cgvYangjuokjeongTheater from "@data/theaters/cgv-yangjuokjeong/theater.json";
import cgvYangjuokjeongSchedule from "@data/showtimes/cgv-yangjuokjeong.json";
import cgvYangjuokjeongHall1 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-1.json";
import cgvYangjuokjeongHall2 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-2.json";
import cgvYangjuokjeongHall3 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-3.json";
import cgvYangjuokjeongHall4 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-4.json";
import cgvYangjuokjeongHall5 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-5.json";
import cgvYangjuokjeongHall6 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-6.json";
import cgvYangjuokjeongHall7 from "@data/theaters/cgv-yangjuokjeong/seatmaps/hall-7.json";
import cgvYeokgokTheater from "@data/theaters/cgv-yeokgok/theater.json";
import cgvYeokgokSchedule from "@data/showtimes/cgv-yeokgok.json";
import cgvYeokgokHall1 from "@data/theaters/cgv-yeokgok/seatmaps/hall-1.json";
import cgvYeokgokHall2 from "@data/theaters/cgv-yeokgok/seatmaps/hall-2.json";
import cgvYeokgokHall3 from "@data/theaters/cgv-yeokgok/seatmaps/hall-3.json";
import cgvYeokgokHall4 from "@data/theaters/cgv-yeokgok/seatmaps/hall-4.json";
import cgvYeokgokHall5 from "@data/theaters/cgv-yeokgok/seatmaps/hall-5.json";
import cgvYeokgokHall6 from "@data/theaters/cgv-yeokgok/seatmaps/hall-6.json";
import cgvOriTheater from "@data/theaters/cgv-ori/theater.json";
import cgvOriSchedule from "@data/showtimes/cgv-ori.json";
import cgvOriHall1 from "@data/theaters/cgv-ori/seatmaps/hall-1.json";
import cgvOriHall2 from "@data/theaters/cgv-ori/seatmaps/hall-2.json";
import cgvOriHall3 from "@data/theaters/cgv-ori/seatmaps/hall-3.json";
import cgvOriHall4 from "@data/theaters/cgv-ori/seatmaps/hall-4.json";
import cgvOriHall5 from "@data/theaters/cgv-ori/seatmaps/hall-5.json";
import cgvOriHall6 from "@data/theaters/cgv-ori/seatmaps/hall-6.json";
import cgvOriHall7 from "@data/theaters/cgv-ori/seatmaps/hall-7.json";
import cgvOriHall8 from "@data/theaters/cgv-ori/seatmaps/hall-8.json";
import cgvOriHall9 from "@data/theaters/cgv-ori/seatmaps/hall-9.json";
import cgvOriS010 from "@data/theaters/cgv-ori/seatmaps/s010.json";
import cgvOsanjungangTheater from "@data/theaters/cgv-osanjungang/theater.json";
import cgvOsanjungangSchedule from "@data/showtimes/cgv-osanjungang.json";
import cgvOsanjungangHall1 from "@data/theaters/cgv-osanjungang/seatmaps/hall-1.json";
import cgvOsanjungangHall2 from "@data/theaters/cgv-osanjungang/seatmaps/hall-2.json";
import cgvOsanjungangHall3 from "@data/theaters/cgv-osanjungang/seatmaps/hall-3.json";
import cgvOsanjungangHall4 from "@data/theaters/cgv-osanjungang/seatmaps/hall-4.json";
import cgvOsanjungangHall5 from "@data/theaters/cgv-osanjungang/seatmaps/hall-5.json";
import cgvOsanjungangHall6 from "@data/theaters/cgv-osanjungang/seatmaps/hall-6.json";
import cgvOsanjungangHall7 from "@data/theaters/cgv-osanjungang/seatmaps/hall-7.json";
import cgvOsanjungangHall8 from "@data/theaters/cgv-osanjungang/seatmaps/hall-8.json";
import cgvYonginTheater from "@data/theaters/cgv-yongin/theater.json";
import cgvYonginSchedule from "@data/showtimes/cgv-yongin.json";
import cgvYonginHall1 from "@data/theaters/cgv-yongin/seatmaps/hall-1.json";
import cgvYonginHall2 from "@data/theaters/cgv-yongin/seatmaps/hall-2.json";
import cgvYonginHall3 from "@data/theaters/cgv-yongin/seatmaps/hall-3.json";
import cgvYonginHall4 from "@data/theaters/cgv-yongin/seatmaps/hall-4.json";
import cgvYonginHall5 from "@data/theaters/cgv-yongin/seatmaps/hall-5.json";
import cgvYonginHall6 from "@data/theaters/cgv-yongin/seatmaps/hall-6.json";
import cgvYonginHall7 from "@data/theaters/cgv-yongin/seatmaps/hall-7.json";
import cgvYonginHall8 from "@data/theaters/cgv-yongin/seatmaps/hall-8.json";
import cgvUijeongbuTheater from "@data/theaters/cgv-uijeongbu/theater.json";
import cgvUijeongbuSchedule from "@data/showtimes/cgv-uijeongbu.json";
import cgvUijeongbuHall1 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-1.json";
import cgvUijeongbuS002 from "@data/theaters/cgv-uijeongbu/seatmaps/s002.json";
import cgvUijeongbuHall3 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-3.json";
import cgvUijeongbuHall4 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-4.json";
import cgvUijeongbuHall5 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-5.json";
import cgvUijeongbuHall6 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-6.json";
import cgvUijeongbuHall7 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-7.json";
import cgvUijeongbuHall8 from "@data/theaters/cgv-uijeongbu/seatmaps/hall-8.json";
import cgvIcheonTheater from "@data/theaters/cgv-icheon/theater.json";
import cgvIcheonSchedule from "@data/showtimes/cgv-icheon.json";
import cgvIcheonHall1 from "@data/theaters/cgv-icheon/seatmaps/hall-1.json";
import cgvIcheonHall2 from "@data/theaters/cgv-icheon/seatmaps/hall-2.json";
import cgvIcheonHall3 from "@data/theaters/cgv-icheon/seatmaps/hall-3.json";
import cgvIcheonHall4 from "@data/theaters/cgv-icheon/seatmaps/hall-4.json";
import cgvIcheonHall5 from "@data/theaters/cgv-icheon/seatmaps/hall-5.json";
import cgvIcheonHall6 from "@data/theaters/cgv-icheon/seatmaps/hall-6.json";
import cgvIcheonHall7 from "@data/theaters/cgv-icheon/seatmaps/hall-7.json";
import cgvIcheonHall8 from "@data/theaters/cgv-icheon/seatmaps/hall-8.json";
import cgvIcheonHall9 from "@data/theaters/cgv-icheon/seatmaps/hall-9.json";
import cgvIcheonS010 from "@data/theaters/cgv-icheon/seatmaps/s010.json";
import cgvIlsanTheater from "@data/theaters/cgv-ilsan/theater.json";
import cgvIlsanSchedule from "@data/showtimes/cgv-ilsan.json";
import cgvIlsanHall1 from "@data/theaters/cgv-ilsan/seatmaps/hall-1.json";
import cgvIlsanS002 from "@data/theaters/cgv-ilsan/seatmaps/s002.json";
import cgvIlsanS003 from "@data/theaters/cgv-ilsan/seatmaps/s003.json";
import cgvIlsanHall4 from "@data/theaters/cgv-ilsan/seatmaps/hall-4.json";
import cgvIlsanHall5 from "@data/theaters/cgv-ilsan/seatmaps/hall-5.json";
import cgvIlsanHall6 from "@data/theaters/cgv-ilsan/seatmaps/hall-6.json";
import cgvIlsanHall7 from "@data/theaters/cgv-ilsan/seatmaps/hall-7.json";
import cgvIlsanHall8 from "@data/theaters/cgv-ilsan/seatmaps/hall-8.json";
import cgvIlsanS009 from "@data/theaters/cgv-ilsan/seatmaps/s009.json";
import cgvPajumunsanTheater from "@data/theaters/cgv-pajumunsan/theater.json";
import cgvPajumunsanSchedule from "@data/showtimes/cgv-pajumunsan.json";
import cgvPajumunsanHall1 from "@data/theaters/cgv-pajumunsan/seatmaps/hall-1.json";
import cgvPajumunsanHall2 from "@data/theaters/cgv-pajumunsan/seatmaps/hall-2.json";
import cgvPajumunsanHall3 from "@data/theaters/cgv-pajumunsan/seatmaps/hall-3.json";
import cgvPajuunjeongTheater from "@data/theaters/cgv-pajuunjeong/theater.json";
import cgvPajuunjeongSchedule from "@data/showtimes/cgv-pajuunjeong.json";
import cgvPajuunjeongHall1 from "@data/theaters/cgv-pajuunjeong/seatmaps/hall-1.json";
import cgvPajuunjeongHall3 from "@data/theaters/cgv-pajuunjeong/seatmaps/hall-3.json";
import cgvPajuunjeongHall4 from "@data/theaters/cgv-pajuunjeong/seatmaps/hall-4.json";
import cgvPajuunjeongHall5 from "@data/theaters/cgv-pajuunjeong/seatmaps/hall-5.json";
import cgvPyeongchonTheater from "@data/theaters/cgv-pyeongchon/theater.json";
import cgvPyeongchonSchedule from "@data/showtimes/cgv-pyeongchon.json";
import cgvPyeongchonHall1 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-1.json";
import cgvPyeongchonHall2 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-2.json";
import cgvPyeongchonHall3 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-3.json";
import cgvPyeongchonHall4 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-4.json";
import cgvPyeongchonHall5 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-5.json";
import cgvPyeongchonHall6 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-6.json";
import cgvPyeongchonHall7 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-7.json";
import cgvPyeongchonHall8 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-8.json";
import cgvPyeongchonHall9 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-9.json";
import cgvPyeongchonHall10 from "@data/theaters/cgv-pyeongchon/seatmaps/hall-10.json";
import cgvPyeongtaekTheater from "@data/theaters/cgv-pyeongtaek/theater.json";
import cgvPyeongtaekSchedule from "@data/showtimes/cgv-pyeongtaek.json";
import cgvPyeongtaekS001 from "@data/theaters/cgv-pyeongtaek/seatmaps/s001.json";
import cgvPyeongtaekHall2 from "@data/theaters/cgv-pyeongtaek/seatmaps/hall-2.json";
import cgvPyeongtaekHall3 from "@data/theaters/cgv-pyeongtaek/seatmaps/hall-3.json";
import cgvPyeongtaekHall4 from "@data/theaters/cgv-pyeongtaek/seatmaps/hall-4.json";
import cgvPyeongtaekHall5 from "@data/theaters/cgv-pyeongtaek/seatmaps/hall-5.json";
import cgvPyeongtaekS006 from "@data/theaters/cgv-pyeongtaek/seatmaps/s006.json";
import cgvPyeongtaekHall7 from "@data/theaters/cgv-pyeongtaek/seatmaps/hall-7.json";
import cgvPyeongtaekgodeokTheater from "@data/theaters/cgv-pyeongtaekgodeok/theater.json";
import cgvPyeongtaekgodeokSchedule from "@data/showtimes/cgv-pyeongtaekgodeok.json";
import cgvPyeongtaekgodeokHall1 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-1.json";
import cgvPyeongtaekgodeokHall2 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-2.json";
import cgvPyeongtaekgodeokHall3 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-3.json";
import cgvPyeongtaekgodeokHall4 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-4.json";
import cgvPyeongtaekgodeokHall5 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-5.json";
import cgvPyeongtaekgodeokHall6 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-6.json";
import cgvPyeongtaekgodeokHall7 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-7.json";
import cgvPyeongtaekgodeokHall8 from "@data/theaters/cgv-pyeongtaekgodeok/seatmaps/hall-8.json";
import cgvPyeongtaeksosaTheater from "@data/theaters/cgv-pyeongtaeksosa/theater.json";
import cgvPyeongtaeksosaSchedule from "@data/showtimes/cgv-pyeongtaeksosa.json";
import cgvPyeongtaeksosaHall1 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-1.json";
import cgvPyeongtaeksosaHall2 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-2.json";
import cgvPyeongtaeksosaHall3 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-3.json";
import cgvPyeongtaeksosaHall4 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-4.json";
import cgvPyeongtaeksosaHall5 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-5.json";
import cgvPyeongtaeksosaHall6 from "@data/theaters/cgv-pyeongtaeksosa/seatmaps/hall-6.json";
import cgvPocheonTheater from "@data/theaters/cgv-pocheon/theater.json";
import cgvPocheonSchedule from "@data/showtimes/cgv-pocheon.json";
import cgvPocheonHall1 from "@data/theaters/cgv-pocheon/seatmaps/hall-1.json";
import cgvPocheonHall2 from "@data/theaters/cgv-pocheon/seatmaps/hall-2.json";
import cgvPocheonHall3 from "@data/theaters/cgv-pocheon/seatmaps/hall-3.json";
import cgvPocheonHall4 from "@data/theaters/cgv-pocheon/seatmaps/hall-4.json";
import cgvPocheonHall5 from "@data/theaters/cgv-pocheon/seatmaps/hall-5.json";
import cgvHwaseongbongdamTheater from "@data/theaters/cgv-hwaseongbongdam/theater.json";
import cgvHwaseongbongdamSchedule from "@data/showtimes/cgv-hwaseongbongdam.json";
import cgvHwaseongbongdamHall1 from "@data/theaters/cgv-hwaseongbongdam/seatmaps/hall-1.json";
import cgvHwaseongbongdamHall2 from "@data/theaters/cgv-hwaseongbongdam/seatmaps/hall-2.json";
import cgvHwaseongbongdamHall3 from "@data/theaters/cgv-hwaseongbongdam/seatmaps/hall-3.json";
import cgvHwaseongbongdamHall4 from "@data/theaters/cgv-hwaseongbongdam/seatmaps/hall-4.json";
import cgvHwajeongTheater from "@data/theaters/cgv-hwajeong/theater.json";
import cgvHwajeongSchedule from "@data/showtimes/cgv-hwajeong.json";
import cgvHwajeongHall1 from "@data/theaters/cgv-hwajeong/seatmaps/hall-1.json";
import cgvHwajeongHall2 from "@data/theaters/cgv-hwajeong/seatmaps/hall-2.json";
import cgvHwajeongHall3 from "@data/theaters/cgv-hwajeong/seatmaps/hall-3.json";
import cgvHwajeongHall4 from "@data/theaters/cgv-hwajeong/seatmaps/hall-4.json";
import cgvHwajeongHall5 from "@data/theaters/cgv-hwajeong/seatmaps/hall-5.json";
import cgvHwajeongHall6 from "@data/theaters/cgv-hwajeong/seatmaps/hall-6.json";
import cgvHwajeongHall7 from "@data/theaters/cgv-hwajeong/seatmaps/hall-7.json";
import cgvDriveInYonginKeuraeksaideuTheater from "@data/theaters/cgv-drive-in-yongin-keuraeksaideu/theater.json";
import cgvDriveInYonginKeuraeksaideuSchedule from "@data/showtimes/cgv-drive-in-yongin-keuraeksaideu.json";
import cgvDriveInYonginKeuraeksaideuS001 from "@data/theaters/cgv-drive-in-yongin-keuraeksaideu/seatmaps/s001.json";
import cgvGyeyangTheater from "@data/theaters/cgv-gyeyang/theater.json";
import cgvGyeyangSchedule from "@data/showtimes/cgv-gyeyang.json";
import cgvGyeyangHall1 from "@data/theaters/cgv-gyeyang/seatmaps/hall-1.json";
import cgvGyeyangHall2 from "@data/theaters/cgv-gyeyang/seatmaps/hall-2.json";
import cgvGyeyangHall3 from "@data/theaters/cgv-gyeyang/seatmaps/hall-3.json";
import cgvGyeyangS004 from "@data/theaters/cgv-gyeyang/seatmaps/s004.json";
import cgvGyeyangHall6 from "@data/theaters/cgv-gyeyang/seatmaps/hall-6.json";
import cgvGyeyangHall7 from "@data/theaters/cgv-gyeyang/seatmaps/hall-7.json";
import cgvGyeyangHall8 from "@data/theaters/cgv-gyeyang/seatmaps/hall-8.json";
import cgvBupyeongTheater from "@data/theaters/cgv-bupyeong/theater.json";
import cgvBupyeongSchedule from "@data/showtimes/cgv-bupyeong.json";
import cgvBupyeongHall1 from "@data/theaters/cgv-bupyeong/seatmaps/hall-1.json";
import cgvBupyeongHall2 from "@data/theaters/cgv-bupyeong/seatmaps/hall-2.json";
import cgvBupyeongHall3 from "@data/theaters/cgv-bupyeong/seatmaps/hall-3.json";
import cgvBupyeongHall4 from "@data/theaters/cgv-bupyeong/seatmaps/hall-4.json";
import cgvBupyeongHall5 from "@data/theaters/cgv-bupyeong/seatmaps/hall-5.json";
import cgvSongdotaimseupeiseuTheater from "@data/theaters/cgv-songdotaimseupeiseu/theater.json";
import cgvSongdotaimseupeiseuSchedule from "@data/showtimes/cgv-songdotaimseupeiseu.json";
import cgvSongdotaimseupeiseuHall1 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-1.json";
import cgvSongdotaimseupeiseuHall2 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-2.json";
import cgvSongdotaimseupeiseuHall3 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-3.json";
import cgvSongdotaimseupeiseuHall4 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-4.json";
import cgvSongdotaimseupeiseuHall5 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-5.json";
import cgvSongdotaimseupeiseuHall6 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-6.json";
import cgvSongdotaimseupeiseuHall7 from "@data/theaters/cgv-songdotaimseupeiseu/seatmaps/hall-7.json";
import cgvIncheonTheater from "@data/theaters/cgv-incheon/theater.json";
import cgvIncheonSchedule from "@data/showtimes/cgv-incheon.json";
import cgvIncheonHall1 from "@data/theaters/cgv-incheon/seatmaps/hall-1.json";
import cgvIncheonHall2 from "@data/theaters/cgv-incheon/seatmaps/hall-2.json";
import cgvIncheonHall3 from "@data/theaters/cgv-incheon/seatmaps/hall-3.json";
import cgvIncheonS004 from "@data/theaters/cgv-incheon/seatmaps/s004.json";
import cgvIncheonHall5 from "@data/theaters/cgv-incheon/seatmaps/hall-5.json";
import cgvIncheonHall6 from "@data/theaters/cgv-incheon/seatmaps/hall-6.json";
import cgvIncheonHall7 from "@data/theaters/cgv-incheon/seatmaps/hall-7.json";
import cgvIncheonHall8 from "@data/theaters/cgv-incheon/seatmaps/hall-8.json";
import cgvIncheonS009 from "@data/theaters/cgv-incheon/seatmaps/s009.json";
import cgvIncheonHall10 from "@data/theaters/cgv-incheon/seatmaps/hall-10.json";
import cgvIncheonHall11 from "@data/theaters/cgv-incheon/seatmaps/hall-11.json";
import cgvIncheonHall12 from "@data/theaters/cgv-incheon/seatmaps/hall-12.json";
import cgvIncheonHall13 from "@data/theaters/cgv-incheon/seatmaps/hall-13.json";
import cgvIncheonHall14 from "@data/theaters/cgv-incheon/seatmaps/hall-14.json";
import cgvIncheongajeongTheater from "@data/theaters/cgv-incheongajeong/theater.json";
import cgvIncheongajeongSchedule from "@data/showtimes/cgv-incheongajeong.json";
import cgvIncheongajeongHall1 from "@data/theaters/cgv-incheongajeong/seatmaps/hall-1.json";
import cgvIncheongajeongHall2 from "@data/theaters/cgv-incheongajeong/seatmaps/hall-2.json";
import cgvIncheongajeongHall3 from "@data/theaters/cgv-incheongajeong/seatmaps/hall-3.json";
import cgvIncheongajeongHall4 from "@data/theaters/cgv-incheongajeong/seatmaps/hall-4.json";
import cgvIncheondohwaTheater from "@data/theaters/cgv-incheondohwa/theater.json";
import cgvIncheondohwaSchedule from "@data/showtimes/cgv-incheondohwa.json";
import cgvIncheondohwaHall1 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-1.json";
import cgvIncheondohwaHall2 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-2.json";
import cgvIncheondohwaHall3 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-3.json";
import cgvIncheondohwaHall4 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-4.json";
import cgvIncheondohwaHall5 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-5.json";
import cgvIncheondohwaHall6 from "@data/theaters/cgv-incheondohwa/seatmaps/hall-6.json";
import cgvIncheonsimingongwonTheater from "@data/theaters/cgv-incheonsimingongwon/theater.json";
import cgvIncheonsimingongwonSchedule from "@data/showtimes/cgv-incheonsimingongwon.json";
import cgvIncheonsimingongwonHall1 from "@data/theaters/cgv-incheonsimingongwon/seatmaps/hall-1.json";
import cgvIncheonsimingongwonHall2 from "@data/theaters/cgv-incheonsimingongwon/seatmaps/hall-2.json";
import cgvIncheonsimingongwonHall3 from "@data/theaters/cgv-incheonsimingongwon/seatmaps/hall-3.json";
import cgvIncheonsimingongwonHall4 from "@data/theaters/cgv-incheonsimingongwon/seatmaps/hall-4.json";
import cgvIncheonsimingongwonHall5 from "@data/theaters/cgv-incheonsimingongwon/seatmaps/hall-5.json";
import cgvIncheonyeonsuTheater from "@data/theaters/cgv-incheonyeonsu/theater.json";
import cgvIncheonyeonsuSchedule from "@data/showtimes/cgv-incheonyeonsu.json";
import cgvIncheonyeonsuHall1 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-1.json";
import cgvIncheonyeonsuHall2 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-2.json";
import cgvIncheonyeonsuHall3 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-3.json";
import cgvIncheonyeonsuHall4 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-4.json";
import cgvIncheonyeonsuHall5 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-5.json";
import cgvIncheonyeonsuHall6 from "@data/theaters/cgv-incheonyeonsu/seatmaps/hall-6.json";
import cgvIncheonhakikTheater from "@data/theaters/cgv-incheonhakik/theater.json";
import cgvIncheonhakikSchedule from "@data/showtimes/cgv-incheonhakik.json";
import cgvIncheonhakikHall1 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-1.json";
import cgvIncheonhakikHall2 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-2.json";
import cgvIncheonhakikHall3 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-3.json";
import cgvIncheonhakikHall4 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-4.json";
import cgvIncheonhakikHall5 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-5.json";
import cgvIncheonhakikHall6 from "@data/theaters/cgv-incheonhakik/seatmaps/hall-6.json";
import cgvJuanyeokTheater from "@data/theaters/cgv-juanyeok/theater.json";
import cgvJuanyeokSchedule from "@data/showtimes/cgv-juanyeok.json";
import cgvJuanyeokHall1 from "@data/theaters/cgv-juanyeok/seatmaps/hall-1.json";
import cgvJuanyeokHall2 from "@data/theaters/cgv-juanyeok/seatmaps/hall-2.json";
import cgvJuanyeokHall3 from "@data/theaters/cgv-juanyeok/seatmaps/hall-3.json";
import cgvJuanyeokHall4 from "@data/theaters/cgv-juanyeok/seatmaps/hall-4.json";
import cgvJuanyeokHall5 from "@data/theaters/cgv-juanyeok/seatmaps/hall-5.json";
import cgvJuanyeokHall6 from "@data/theaters/cgv-juanyeok/seatmaps/hall-6.json";
import cgvJuanyeokHall7 from "@data/theaters/cgv-juanyeok/seatmaps/hall-7.json";
import cgvJuanyeokHall8 from "@data/theaters/cgv-juanyeok/seatmaps/hall-8.json";
import cgvJuanyeokHall9 from "@data/theaters/cgv-juanyeok/seatmaps/hall-9.json";
import cgvCheongraTheater from "@data/theaters/cgv-cheongra/theater.json";
import cgvCheongraSchedule from "@data/showtimes/cgv-cheongra.json";
import cgvCheongraHall1 from "@data/theaters/cgv-cheongra/seatmaps/hall-1.json";
import cgvCheongraHall2 from "@data/theaters/cgv-cheongra/seatmaps/hall-2.json";
import cgvCheongraHall3 from "@data/theaters/cgv-cheongra/seatmaps/hall-3.json";
import cgvCheongraHall4 from "@data/theaters/cgv-cheongra/seatmaps/hall-4.json";
import cgvCheongraHall5 from "@data/theaters/cgv-cheongra/seatmaps/hall-5.json";
import cgvCheongraHall6 from "@data/theaters/cgv-cheongra/seatmaps/hall-6.json";
import cgvCheongraHall7 from "@data/theaters/cgv-cheongra/seatmaps/hall-7.json";
import cgvGangreungTheater from "@data/theaters/cgv-gangreung/theater.json";
import cgvGangreungSchedule from "@data/showtimes/cgv-gangreung.json";
import cgvGangreungHall1 from "@data/theaters/cgv-gangreung/seatmaps/hall-1.json";
import cgvGangreungHall2 from "@data/theaters/cgv-gangreung/seatmaps/hall-2.json";
import cgvGangreungHall3 from "@data/theaters/cgv-gangreung/seatmaps/hall-3.json";
import cgvGangreungHall4 from "@data/theaters/cgv-gangreung/seatmaps/hall-4.json";
import cgvGangreungHall5 from "@data/theaters/cgv-gangreung/seatmaps/hall-5.json";
import cgvGangreungHall6 from "@data/theaters/cgv-gangreung/seatmaps/hall-6.json";
import cgvGangreungHall7 from "@data/theaters/cgv-gangreung/seatmaps/hall-7.json";
import cgvGangreungHall8 from "@data/theaters/cgv-gangreung/seatmaps/hall-8.json";
import cgvGirinTheater from "@data/theaters/cgv-girin/theater.json";
import cgvGirinSchedule from "@data/showtimes/cgv-girin.json";
import cgvGirinHall1 from "@data/theaters/cgv-girin/seatmaps/hall-1.json";
import cgvGirinHall2 from "@data/theaters/cgv-girin/seatmaps/hall-2.json";
import cgvWontongTheater from "@data/theaters/cgv-wontong/theater.json";
import cgvWontongSchedule from "@data/showtimes/cgv-wontong.json";
import cgvWontongHall1 from "@data/theaters/cgv-wontong/seatmaps/hall-1.json";
import cgvInjeTheater from "@data/theaters/cgv-inje/theater.json";
import cgvInjeSchedule from "@data/showtimes/cgv-inje.json";
import cgvInjeHall1 from "@data/theaters/cgv-inje/seatmaps/hall-1.json";
import cgvInjeHall2 from "@data/theaters/cgv-inje/seatmaps/hall-2.json";
import cgvChuncheonTheater from "@data/theaters/cgv-chuncheon/theater.json";
import cgvChuncheonSchedule from "@data/showtimes/cgv-chuncheon.json";
import cgvChuncheonHall1 from "@data/theaters/cgv-chuncheon/seatmaps/hall-1.json";
import cgvChuncheonHall2 from "@data/theaters/cgv-chuncheon/seatmaps/hall-2.json";
import cgvChuncheonHall3 from "@data/theaters/cgv-chuncheon/seatmaps/hall-3.json";
import cgvChuncheonHall4 from "@data/theaters/cgv-chuncheon/seatmaps/hall-4.json";
import cgvChuncheonHall5 from "@data/theaters/cgv-chuncheon/seatmaps/hall-5.json";
import cgvChuncheonHall6 from "@data/theaters/cgv-chuncheon/seatmaps/hall-6.json";
import cgvChuncheonHall7 from "@data/theaters/cgv-chuncheon/seatmaps/hall-7.json";
import cgvChuncheonHall8 from "@data/theaters/cgv-chuncheon/seatmaps/hall-8.json";
import cgvChuncheonS009 from "@data/theaters/cgv-chuncheon/seatmaps/s009.json";
import cgvChuncheonHall10 from "@data/theaters/cgv-chuncheon/seatmaps/hall-10.json";
import cgvChuncheonHall11 from "@data/theaters/cgv-chuncheon/seatmaps/hall-11.json";
import cgvChuncheonHall12 from "@data/theaters/cgv-chuncheon/seatmaps/hall-12.json";
import cgvNonsanTheater from "@data/theaters/cgv-nonsan/theater.json";
import cgvNonsanSchedule from "@data/showtimes/cgv-nonsan.json";
import cgvNonsanHall1 from "@data/theaters/cgv-nonsan/seatmaps/hall-1.json";
import cgvNonsanHall2 from "@data/theaters/cgv-nonsan/seatmaps/hall-2.json";
import cgvNonsanHall3 from "@data/theaters/cgv-nonsan/seatmaps/hall-3.json";
import cgvNonsanHall4 from "@data/theaters/cgv-nonsan/seatmaps/hall-4.json";
import cgvNonsanHall5 from "@data/theaters/cgv-nonsan/seatmaps/hall-5.json";
import cgvDangjinTheater from "@data/theaters/cgv-dangjin/theater.json";
import cgvDangjinSchedule from "@data/showtimes/cgv-dangjin.json";
import cgvDangjinHall1 from "@data/theaters/cgv-dangjin/seatmaps/hall-1.json";
import cgvDangjinHall2 from "@data/theaters/cgv-dangjin/seatmaps/hall-2.json";
import cgvDangjinHall3 from "@data/theaters/cgv-dangjin/seatmaps/hall-3.json";
import cgvDangjinHall4 from "@data/theaters/cgv-dangjin/seatmaps/hall-4.json";
import cgvDangjinHall5 from "@data/theaters/cgv-dangjin/seatmaps/hall-5.json";
import cgvDangjinHall6 from "@data/theaters/cgv-dangjin/seatmaps/hall-6.json";
import cgvDangjinHall7 from "@data/theaters/cgv-dangjin/seatmaps/hall-7.json";
import cgvDaejeonTheater from "@data/theaters/cgv-daejeon/theater.json";
import cgvDaejeonSchedule from "@data/showtimes/cgv-daejeon.json";
import cgvDaejeonS001 from "@data/theaters/cgv-daejeon/seatmaps/s001.json";
import cgvDaejeonHall2 from "@data/theaters/cgv-daejeon/seatmaps/hall-2.json";
import cgvDaejeonHall3 from "@data/theaters/cgv-daejeon/seatmaps/hall-3.json";
import cgvDaejeonHall4 from "@data/theaters/cgv-daejeon/seatmaps/hall-4.json";
import cgvDaejeonS005 from "@data/theaters/cgv-daejeon/seatmaps/s005.json";
import cgvDaejeonHall6 from "@data/theaters/cgv-daejeon/seatmaps/hall-6.json";
import cgvDaejeonHall7 from "@data/theaters/cgv-daejeon/seatmaps/hall-7.json";
import cgvDaejeonHall8 from "@data/theaters/cgv-daejeon/seatmaps/hall-8.json";
import cgvDaejeonHall9 from "@data/theaters/cgv-daejeon/seatmaps/hall-9.json";
import cgvDaejeongasuwonTheater from "@data/theaters/cgv-daejeongasuwon/theater.json";
import cgvDaejeongasuwonSchedule from "@data/showtimes/cgv-daejeongasuwon.json";
import cgvDaejeongasuwonHall1 from "@data/theaters/cgv-daejeongasuwon/seatmaps/hall-1.json";
import cgvDaejeongasuwonHall2 from "@data/theaters/cgv-daejeongasuwon/seatmaps/hall-2.json";
import cgvDaejeongasuwonHall3 from "@data/theaters/cgv-daejeongasuwon/seatmaps/hall-3.json";
import cgvDaejeongasuwonHall4 from "@data/theaters/cgv-daejeongasuwon/seatmaps/hall-4.json";
import cgvDaejeongasuwonHall5 from "@data/theaters/cgv-daejeongasuwon/seatmaps/hall-5.json";
import cgvDaejeongaoTheater from "@data/theaters/cgv-daejeongao/theater.json";
import cgvDaejeongaoSchedule from "@data/showtimes/cgv-daejeongao.json";
import cgvDaejeongaoHall1 from "@data/theaters/cgv-daejeongao/seatmaps/hall-1.json";
import cgvDaejeongaoHall2 from "@data/theaters/cgv-daejeongao/seatmaps/hall-2.json";
import cgvDaejeongaoHall3 from "@data/theaters/cgv-daejeongao/seatmaps/hall-3.json";
import cgvDaejeongaoHall4 from "@data/theaters/cgv-daejeongao/seatmaps/hall-4.json";
import cgvDaejeongaoHall5 from "@data/theaters/cgv-daejeongao/seatmaps/hall-5.json";
import cgvDaejeongaoHall6 from "@data/theaters/cgv-daejeongao/seatmaps/hall-6.json";
import cgvDaejeongaoHall7 from "@data/theaters/cgv-daejeongao/seatmaps/hall-7.json";
import cgvDaejeontanbangTheater from "@data/theaters/cgv-daejeontanbang/theater.json";
import cgvDaejeontanbangSchedule from "@data/showtimes/cgv-daejeontanbang.json";
import cgvDaejeontanbangHall1 from "@data/theaters/cgv-daejeontanbang/seatmaps/hall-1.json";
import cgvDaejeontanbangHall3 from "@data/theaters/cgv-daejeontanbang/seatmaps/hall-3.json";
import cgvDaejeontanbangHall4 from "@data/theaters/cgv-daejeontanbang/seatmaps/hall-4.json";
import cgvDaejeontanbangHall5 from "@data/theaters/cgv-daejeontanbang/seatmaps/hall-5.json";
import cgvDaejeontanbangHall6 from "@data/theaters/cgv-daejeontanbang/seatmaps/hall-6.json";
import cgvDaejeonteomineolTheater from "@data/theaters/cgv-daejeonteomineol/theater.json";
import cgvDaejeonteomineolSchedule from "@data/showtimes/cgv-daejeonteomineol.json";
import cgvDaejeonteomineolHall1 from "@data/theaters/cgv-daejeonteomineol/seatmaps/hall-1.json";
import cgvDaejeonteomineolS002 from "@data/theaters/cgv-daejeonteomineol/seatmaps/s002.json";
import cgvDaejeonteomineolS003 from "@data/theaters/cgv-daejeonteomineol/seatmaps/s003.json";
import cgvDaejeonteomineolS004 from "@data/theaters/cgv-daejeonteomineol/seatmaps/s004.json";
import cgvDaejeonteomineolHall5 from "@data/theaters/cgv-daejeonteomineol/seatmaps/hall-5.json";
import cgvDaejeonteomineolHall6 from "@data/theaters/cgv-daejeonteomineol/seatmaps/hall-6.json";
import cgvDaejeonteomineolHall7 from "@data/theaters/cgv-daejeonteomineol/seatmaps/hall-7.json";
import cgvSeosanTheater from "@data/theaters/cgv-seosan/theater.json";
import cgvSeosanSchedule from "@data/showtimes/cgv-seosan.json";
import cgvSeosanHall1 from "@data/theaters/cgv-seosan/seatmaps/hall-1.json";
import cgvSeosanHall2 from "@data/theaters/cgv-seosan/seatmaps/hall-2.json";
import cgvSeosanHall3 from "@data/theaters/cgv-seosan/seatmaps/hall-3.json";
import cgvSeosanHall4 from "@data/theaters/cgv-seosan/seatmaps/hall-4.json";
import cgvSeosanHall5 from "@data/theaters/cgv-seosan/seatmaps/hall-5.json";
import cgvSeosanHall6 from "@data/theaters/cgv-seosan/seatmaps/hall-6.json";
import cgvSeosanHall7 from "@data/theaters/cgv-seosan/seatmaps/hall-7.json";
import cgvSeosanHall8 from "@data/theaters/cgv-seosan/seatmaps/hall-8.json";
import cgvSejongTheater from "@data/theaters/cgv-sejong/theater.json";
import cgvSejongSchedule from "@data/showtimes/cgv-sejong.json";
import cgvSejongHall1 from "@data/theaters/cgv-sejong/seatmaps/hall-1.json";
import cgvSejongHall2 from "@data/theaters/cgv-sejong/seatmaps/hall-2.json";
import cgvSejongHall3 from "@data/theaters/cgv-sejong/seatmaps/hall-3.json";
import cgvSejongHall4 from "@data/theaters/cgv-sejong/seatmaps/hall-4.json";
import cgvSejongHall5 from "@data/theaters/cgv-sejong/seatmaps/hall-5.json";
import cgvSejongHall6 from "@data/theaters/cgv-sejong/seatmaps/hall-6.json";
import cgvSejongHall7 from "@data/theaters/cgv-sejong/seatmaps/hall-7.json";
import cgvAsanTheater from "@data/theaters/cgv-asan/theater.json";
import cgvAsanSchedule from "@data/showtimes/cgv-asan.json";
import cgvAsanHall1 from "@data/theaters/cgv-asan/seatmaps/hall-1.json";
import cgvAsanHall2 from "@data/theaters/cgv-asan/seatmaps/hall-2.json";
import cgvAsanHall3 from "@data/theaters/cgv-asan/seatmaps/hall-3.json";
import cgvAsanHall4 from "@data/theaters/cgv-asan/seatmaps/hall-4.json";
import cgvAsanHall5 from "@data/theaters/cgv-asan/seatmaps/hall-5.json";
import cgvAsanHall6 from "@data/theaters/cgv-asan/seatmaps/hall-6.json";
import cgvYuseongnoeunTheater from "@data/theaters/cgv-yuseongnoeun/theater.json";
import cgvYuseongnoeunSchedule from "@data/showtimes/cgv-yuseongnoeun.json";
import cgvYuseongnoeunHall1 from "@data/theaters/cgv-yuseongnoeun/seatmaps/hall-1.json";
import cgvYuseongnoeunHall2 from "@data/theaters/cgv-yuseongnoeun/seatmaps/hall-2.json";
import cgvYuseongnoeunHall3 from "@data/theaters/cgv-yuseongnoeun/seatmaps/hall-3.json";
import cgvYuseongnoeunHall4 from "@data/theaters/cgv-yuseongnoeun/seatmaps/hall-4.json";
import cgvYuseongnoeunHall5 from "@data/theaters/cgv-yuseongnoeun/seatmaps/hall-5.json";
import cgvCheonanTheater from "@data/theaters/cgv-cheonan/theater.json";
import cgvCheonanSchedule from "@data/showtimes/cgv-cheonan.json";
import cgvCheonanHall1 from "@data/theaters/cgv-cheonan/seatmaps/hall-1.json";
import cgvCheonanHall2 from "@data/theaters/cgv-cheonan/seatmaps/hall-2.json";
import cgvCheonanHall3 from "@data/theaters/cgv-cheonan/seatmaps/hall-3.json";
import cgvCheonanHall4 from "@data/theaters/cgv-cheonan/seatmaps/hall-4.json";
import cgvCheonanHall5 from "@data/theaters/cgv-cheonan/seatmaps/hall-5.json";
import cgvCheonanHall7 from "@data/theaters/cgv-cheonan/seatmaps/hall-7.json";
import cgvCheonanHall8 from "@data/theaters/cgv-cheonan/seatmaps/hall-8.json";
import cgvCheonanteomineolTheater from "@data/theaters/cgv-cheonanteomineol/theater.json";
import cgvCheonanteomineolSchedule from "@data/showtimes/cgv-cheonanteomineol.json";
import cgvCheonanteomineolHall1 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-1.json";
import cgvCheonanteomineolS002 from "@data/theaters/cgv-cheonanteomineol/seatmaps/s002.json";
import cgvCheonanteomineolHall3 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-3.json";
import cgvCheonanteomineolS004 from "@data/theaters/cgv-cheonanteomineol/seatmaps/s004.json";
import cgvCheonanteomineolHall5 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-5.json";
import cgvCheonanteomineolS006 from "@data/theaters/cgv-cheonanteomineol/seatmaps/s006.json";
import cgvCheonanteomineolS007 from "@data/theaters/cgv-cheonanteomineol/seatmaps/s007.json";
import cgvCheonanteomineolHall8 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-8.json";
import cgvCheonanteomineolHall9 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-9.json";
import cgvCheonanteomineolHall10 from "@data/theaters/cgv-cheonanteomineol/seatmaps/hall-10.json";
import cgvCheonanpentapoteuTheater from "@data/theaters/cgv-cheonanpentapoteu/theater.json";
import cgvCheonanpentapoteuSchedule from "@data/showtimes/cgv-cheonanpentapoteu.json";
import cgvCheonanpentapoteuHall1 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-1.json";
import cgvCheonanpentapoteuHall2 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-2.json";
import cgvCheonanpentapoteuHall3 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-3.json";
import cgvCheonanpentapoteuS004 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/s004.json";
import cgvCheonanpentapoteuHall5 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-5.json";
import cgvCheonanpentapoteuS006 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/s006.json";
import cgvCheonanpentapoteuHall7 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-7.json";
import cgvCheonanpentapoteuHall9 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-9.json";
import cgvCheonanpentapoteuHall10 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-10.json";
import cgvCheonanpentapoteuHall11 from "@data/theaters/cgv-cheonanpentapoteu/seatmaps/hall-11.json";
import cgvCheongjuSeomunTheater from "@data/theaters/cgv-cheongju-seomun/theater.json";
import cgvCheongjuSeomunSchedule from "@data/showtimes/cgv-cheongju-seomun.json";
import cgvCheongjuSeomunHall1 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-1.json";
import cgvCheongjuSeomunHall2 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-2.json";
import cgvCheongjuSeomunHall3 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-3.json";
import cgvCheongjuSeomunHall4 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-4.json";
import cgvCheongjuSeomunHall5 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-5.json";
import cgvCheongjuSeomunHall6 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-6.json";
import cgvCheongjuSeomunS007 from "@data/theaters/cgv-cheongju-seomun/seatmaps/s007.json";
import cgvCheongjuSeomunHall8 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-8.json";
import cgvCheongjuSeomunHall9 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-9.json";
import cgvCheongjuSeomunHall10 from "@data/theaters/cgv-cheongju-seomun/seatmaps/hall-10.json";
import cgvCheongjujiwelsitiTheater from "@data/theaters/cgv-cheongjujiwelsiti/theater.json";
import cgvCheongjujiwelsitiSchedule from "@data/showtimes/cgv-cheongjujiwelsiti.json";
import cgvCheongjujiwelsitiS001 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/s001.json";
import cgvCheongjujiwelsitiHall2 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-2.json";
import cgvCheongjujiwelsitiHall3 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-3.json";
import cgvCheongjujiwelsitiHall4 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-4.json";
import cgvCheongjujiwelsitiS005 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/s005.json";
import cgvCheongjujiwelsitiHall6 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-6.json";
import cgvCheongjujiwelsitiHall7 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-7.json";
import cgvCheongjujiwelsitiHall8 from "@data/theaters/cgv-cheongjujiwelsiti/seatmaps/hall-8.json";
import cgvCheongjuteomineolTheater from "@data/theaters/cgv-cheongjuteomineol/theater.json";
import cgvCheongjuteomineolSchedule from "@data/showtimes/cgv-cheongjuteomineol.json";
import cgvCheongjuteomineolHall1 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-1.json";
import cgvCheongjuteomineolHall2 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-2.json";
import cgvCheongjuteomineolHall3 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-3.json";
import cgvCheongjuteomineolHall4 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-4.json";
import cgvCheongjuteomineolHall5 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-5.json";
import cgvCheongjuteomineolHall6 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-6.json";
import cgvCheongjuteomineolHall7 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-7.json";
import cgvCheongjuteomineolHall8 from "@data/theaters/cgv-cheongjuteomineol/seatmaps/hall-8.json";
import cgvChungjugyohyeonTheater from "@data/theaters/cgv-chungjugyohyeon/theater.json";
import cgvChungjugyohyeonSchedule from "@data/showtimes/cgv-chungjugyohyeon.json";
import cgvChungjugyohyeonHall1 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-1.json";
import cgvChungjugyohyeonHall2 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-2.json";
import cgvChungjugyohyeonHall3 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-3.json";
import cgvChungjugyohyeonHall4 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-4.json";
import cgvChungjugyohyeonHall5 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-5.json";
import cgvChungjugyohyeonHall6 from "@data/theaters/cgv-chungjugyohyeon/seatmaps/hall-6.json";
import cgvHongseongTheater from "@data/theaters/cgv-hongseong/theater.json";
import cgvHongseongSchedule from "@data/showtimes/cgv-hongseong.json";
import cgvHongseongHall1 from "@data/theaters/cgv-hongseong/seatmaps/hall-1.json";
import cgvHongseongHall2 from "@data/theaters/cgv-hongseong/seatmaps/hall-2.json";
import cgvHongseongHall3 from "@data/theaters/cgv-hongseong/seatmaps/hall-3.json";
import cgvHongseongHall4 from "@data/theaters/cgv-hongseong/seatmaps/hall-4.json";
import cgvHongseongHall5 from "@data/theaters/cgv-hongseong/seatmaps/hall-5.json";
import cgvHongseongHall6 from "@data/theaters/cgv-hongseong/seatmaps/hall-6.json";
import cgvDaeguTheater from "@data/theaters/cgv-daegu/theater.json";
import cgvDaeguSchedule from "@data/showtimes/cgv-daegu.json";
import cgvDaeguHall1 from "@data/theaters/cgv-daegu/seatmaps/hall-1.json";
import cgvDaeguHall2 from "@data/theaters/cgv-daegu/seatmaps/hall-2.json";
import cgvDaeguS004 from "@data/theaters/cgv-daegu/seatmaps/s004.json";
import cgvDaeguHall5 from "@data/theaters/cgv-daegu/seatmaps/hall-5.json";
import cgvDaeguHall6 from "@data/theaters/cgv-daegu/seatmaps/hall-6.json";
import cgvDaeguS007 from "@data/theaters/cgv-daegu/seatmaps/s007.json";
import cgvDaeguHall8 from "@data/theaters/cgv-daegu/seatmaps/hall-8.json";
import cgvDaegususeongTheater from "@data/theaters/cgv-daegususeong/theater.json";
import cgvDaegususeongSchedule from "@data/showtimes/cgv-daegususeong.json";
import cgvDaegususeongHall1 from "@data/theaters/cgv-daegususeong/seatmaps/hall-1.json";
import cgvDaegususeongHall2 from "@data/theaters/cgv-daegususeong/seatmaps/hall-2.json";
import cgvDaegususeongHall3 from "@data/theaters/cgv-daegususeong/seatmaps/hall-3.json";
import cgvDaegususeongHall4 from "@data/theaters/cgv-daegususeong/seatmaps/hall-4.json";
import cgvDaeguseutadiumTheater from "@data/theaters/cgv-daeguseutadium/theater.json";
import cgvDaeguseutadiumSchedule from "@data/showtimes/cgv-daeguseutadium.json";
import cgvDaeguseutadiumHall1 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-1.json";
import cgvDaeguseutadiumHall2 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-2.json";
import cgvDaeguseutadiumHall3 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-3.json";
import cgvDaeguseutadiumHall4 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-4.json";
import cgvDaeguseutadiumHall5 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-5.json";
import cgvDaeguseutadiumHall6 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-6.json";
import cgvDaeguseutadiumHall7 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-7.json";
import cgvDaeguseutadiumS008 from "@data/theaters/cgv-daeguseutadium/seatmaps/s008.json";
import cgvDaeguseutadiumS009 from "@data/theaters/cgv-daeguseutadium/seatmaps/s009.json";
import cgvDaeguseutadiumHall10 from "@data/theaters/cgv-daeguseutadium/seatmaps/hall-10.json";
import cgvDaeguyeongyeongTheater from "@data/theaters/cgv-daeguyeongyeong/theater.json";
import cgvDaeguyeongyeongSchedule from "@data/showtimes/cgv-daeguyeongyeong.json";
import cgvDaeguyeongyeongHall1 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-1.json";
import cgvDaeguyeongyeongHall2 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-2.json";
import cgvDaeguyeongyeongHall3 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-3.json";
import cgvDaeguyeongyeongHall4 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-4.json";
import cgvDaeguyeongyeongHall5 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-5.json";
import cgvDaeguyeongyeongHall6 from "@data/theaters/cgv-daeguyeongyeong/seatmaps/hall-6.json";
import cgvDaeguwolseongTheater from "@data/theaters/cgv-daeguwolseong/theater.json";
import cgvDaeguwolseongSchedule from "@data/showtimes/cgv-daeguwolseong.json";
import cgvDaeguwolseongHall1 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-1.json";
import cgvDaeguwolseongHall2 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-2.json";
import cgvDaeguwolseongHall3 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-3.json";
import cgvDaeguwolseongHall4 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-4.json";
import cgvDaeguwolseongHall5 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-5.json";
import cgvDaeguwolseongHall6 from "@data/theaters/cgv-daeguwolseong/seatmaps/hall-6.json";
import cgvDaegujukjeonTheater from "@data/theaters/cgv-daegujukjeon/theater.json";
import cgvDaegujukjeonSchedule from "@data/showtimes/cgv-daegujukjeon.json";
import cgvDaegujukjeonHall1 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-1.json";
import cgvDaegujukjeonHall2 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-2.json";
import cgvDaegujukjeonHall3 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-3.json";
import cgvDaegujukjeonS004 from "@data/theaters/cgv-daegujukjeon/seatmaps/s004.json";
import cgvDaegujukjeonHall5 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-5.json";
import cgvDaegujukjeonHall6 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-6.json";
import cgvDaegujukjeonHall7 from "@data/theaters/cgv-daegujukjeon/seatmaps/hall-7.json";
import cgvDaeguhanilTheater from "@data/theaters/cgv-daeguhanil/theater.json";
import cgvDaeguhanilSchedule from "@data/showtimes/cgv-daeguhanil.json";
import cgvDaeguhanilHall1 from "@data/theaters/cgv-daeguhanil/seatmaps/hall-1.json";
import cgvDaeguhanilHall2 from "@data/theaters/cgv-daeguhanil/seatmaps/hall-2.json";
import cgvDaeguhanilHall3 from "@data/theaters/cgv-daeguhanil/seatmaps/hall-3.json";
import cgvDaeguhanilHall4 from "@data/theaters/cgv-daeguhanil/seatmaps/hall-4.json";
import cgvDaeguhanilHall5 from "@data/theaters/cgv-daeguhanil/seatmaps/hall-5.json";
import cgvDaeguhyeondaeTheater from "@data/theaters/cgv-daeguhyeondae/theater.json";
import cgvDaeguhyeondaeSchedule from "@data/showtimes/cgv-daeguhyeondae.json";
import cgvDaeguhyeondaeHall1 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-1.json";
import cgvDaeguhyeondaeHall2 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-2.json";
import cgvDaeguhyeondaeHall3 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-3.json";
import cgvDaeguhyeondaeHall4 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-4.json";
import cgvDaeguhyeondaeHall5 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-5.json";
import cgvDaeguhyeondaeHall6 from "@data/theaters/cgv-daeguhyeondae/seatmaps/hall-6.json";
import cgvDaeyeonTheater from "@data/theaters/cgv-daeyeon/theater.json";
import cgvDaeyeonSchedule from "@data/showtimes/cgv-daeyeon.json";
import cgvDaeyeonHall1 from "@data/theaters/cgv-daeyeon/seatmaps/hall-1.json";
import cgvDaeyeonHall2 from "@data/theaters/cgv-daeyeon/seatmaps/hall-2.json";
import cgvDaeyeonHall3 from "@data/theaters/cgv-daeyeon/seatmaps/hall-3.json";
import cgvDaeyeonHall4 from "@data/theaters/cgv-daeyeon/seatmaps/hall-4.json";
import cgvDaeyeonHall5 from "@data/theaters/cgv-daeyeon/seatmaps/hall-5.json";
import cgvDaeyeonHall6 from "@data/theaters/cgv-daeyeon/seatmaps/hall-6.json";
import cgvDaeyeonHall7 from "@data/theaters/cgv-daeyeon/seatmaps/hall-7.json";
import cgvDaeyeonHall8 from "@data/theaters/cgv-daeyeon/seatmaps/hall-8.json";
import cgvDongraeTheater from "@data/theaters/cgv-dongrae/theater.json";
import cgvDongraeSchedule from "@data/showtimes/cgv-dongrae.json";
import cgvDongraeHall1 from "@data/theaters/cgv-dongrae/seatmaps/hall-1.json";
import cgvDongraeHall2 from "@data/theaters/cgv-dongrae/seatmaps/hall-2.json";
import cgvDongraeHall3 from "@data/theaters/cgv-dongrae/seatmaps/hall-3.json";
import cgvDongraeHall4 from "@data/theaters/cgv-dongrae/seatmaps/hall-4.json";
import cgvDongraeHall5 from "@data/theaters/cgv-dongrae/seatmaps/hall-5.json";
import cgvDongraeHall6 from "@data/theaters/cgv-dongrae/seatmaps/hall-6.json";
import cgvDongraeHall7 from "@data/theaters/cgv-dongrae/seatmaps/hall-7.json";
import cgvDongraeHall8 from "@data/theaters/cgv-dongrae/seatmaps/hall-8.json";
import cgvDongraeHall9 from "@data/theaters/cgv-dongrae/seatmaps/hall-9.json";
import cgvBusanmyeongjiTheater from "@data/theaters/cgv-busanmyeongji/theater.json";
import cgvBusanmyeongjiSchedule from "@data/showtimes/cgv-busanmyeongji.json";
import cgvBusanmyeongjiHall1 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-1.json";
import cgvBusanmyeongjiHall2 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-2.json";
import cgvBusanmyeongjiHall3 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-3.json";
import cgvBusanmyeongjiHall4 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-4.json";
import cgvBusanmyeongjiHall5 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-5.json";
import cgvBusanmyeongjiHall6 from "@data/theaters/cgv-busanmyeongji/seatmaps/hall-6.json";
import cgvSeomyeonTheater from "@data/theaters/cgv-seomyeon/theater.json";
import cgvSeomyeonSchedule from "@data/showtimes/cgv-seomyeon.json";
import cgvSeomyeonS001 from "@data/theaters/cgv-seomyeon/seatmaps/s001.json";
import cgvSeomyeonHall2 from "@data/theaters/cgv-seomyeon/seatmaps/hall-2.json";
import cgvSeomyeonHall3 from "@data/theaters/cgv-seomyeon/seatmaps/hall-3.json";
import cgvSeomyeonHall4 from "@data/theaters/cgv-seomyeon/seatmaps/hall-4.json";
import cgvSeomyeonHall1 from "@data/theaters/cgv-seomyeon/seatmaps/hall-1.json";
import cgvSeomyeonHall6 from "@data/theaters/cgv-seomyeon/seatmaps/hall-6.json";
import cgvSeomyeonHall7 from "@data/theaters/cgv-seomyeon/seatmaps/hall-7.json";
import cgvSeomyeonHall8 from "@data/theaters/cgv-seomyeon/seatmaps/hall-8.json";
import cgvSeomyeonHall9 from "@data/theaters/cgv-seomyeon/seatmaps/hall-9.json";
import cgvSeomyeonHall2010 from "@data/theaters/cgv-seomyeon/seatmaps/hall-2-010.json";
import cgvSeomyeonS011 from "@data/theaters/cgv-seomyeon/seatmaps/s011.json";
import cgvSeomyeonS012 from "@data/theaters/cgv-seomyeon/seatmaps/s012.json";
import cgvSeomyeonsamjeongtawoTheater from "@data/theaters/cgv-seomyeonsamjeongtawo/theater.json";
import cgvSeomyeonsamjeongtawoSchedule from "@data/showtimes/cgv-seomyeonsamjeongtawo.json";
import cgvSeomyeonsamjeongtawoHall1 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-1.json";
import cgvSeomyeonsamjeongtawoHall2 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-2.json";
import cgvSeomyeonsamjeongtawoHall3 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-3.json";
import cgvSeomyeonsamjeongtawoHall4 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-4.json";
import cgvSeomyeonsamjeongtawoHall5 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-5.json";
import cgvSeomyeonsamjeongtawoHall6 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-6.json";
import cgvSeomyeonsamjeongtawoHall7 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-7.json";
import cgvSeomyeonsamjeongtawoHall8 from "@data/theaters/cgv-seomyeonsamjeongtawo/seatmaps/hall-8.json";
import cgvSeomyeonsangsangmadangTheater from "@data/theaters/cgv-seomyeonsangsangmadang/theater.json";
import cgvSeomyeonsangsangmadangSchedule from "@data/showtimes/cgv-seomyeonsangsangmadang.json";
import cgvSeomyeonsangsangmadangHall1 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/hall-1.json";
import cgvSeomyeonsangsangmadangHall2 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/hall-2.json";
import cgvSeomyeonsangsangmadangS003 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/s003.json";
import cgvSeomyeonsangsangmadangHall4 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/hall-4.json";
import cgvSeomyeonsangsangmadangHall5 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/hall-5.json";
import cgvSeomyeonsangsangmadangHall6 from "@data/theaters/cgv-seomyeonsangsangmadang/seatmaps/hall-6.json";
import cgvSenteomsitiTheater from "@data/theaters/cgv-senteomsiti/theater.json";
import cgvSenteomsitiSchedule from "@data/showtimes/cgv-senteomsiti.json";
import cgvSenteomsitiS001 from "@data/theaters/cgv-senteomsiti/seatmaps/s001.json";
import cgvSenteomsitiHall2 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-2.json";
import cgvSenteomsitiHall3 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-3.json";
import cgvSenteomsitiHall4 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-4.json";
import cgvSenteomsitiHall5 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-5.json";
import cgvSenteomsitiHall6 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-6.json";
import cgvSenteomsitiHall7 from "@data/theaters/cgv-senteomsiti/seatmaps/hall-7.json";
import cgvSenteomsitiS008 from "@data/theaters/cgv-senteomsiti/seatmaps/s008.json";
import cgvSsinedeuswepeuSenteomTheater from "@data/theaters/cgv-ssinedeuswepeu-senteom/theater.json";
import cgvSsinedeuswepeuSenteomSchedule from "@data/showtimes/cgv-ssinedeuswepeu-senteom.json";
import cgvSsinedeuswepeuSenteomS001 from "@data/theaters/cgv-ssinedeuswepeu-senteom/seatmaps/s001.json";
import cgvSsinedeuswepeuSenteomS002 from "@data/theaters/cgv-ssinedeuswepeu-senteom/seatmaps/s002.json";
import cgvAsiadeuTheater from "@data/theaters/cgv-asiadeu/theater.json";
import cgvAsiadeuSchedule from "@data/showtimes/cgv-asiadeu.json";
import cgvAsiadeuHall1 from "@data/theaters/cgv-asiadeu/seatmaps/hall-1.json";
import cgvAsiadeuHall2 from "@data/theaters/cgv-asiadeu/seatmaps/hall-2.json";
import cgvAsiadeuHall3 from "@data/theaters/cgv-asiadeu/seatmaps/hall-3.json";
import cgvAsiadeuHall4 from "@data/theaters/cgv-asiadeu/seatmaps/hall-4.json";
import cgvAsiadeuHall5 from "@data/theaters/cgv-asiadeu/seatmaps/hall-5.json";
import cgvAsiadeuHall6 from "@data/theaters/cgv-asiadeu/seatmaps/hall-6.json";
import cgvAsiadeuHall7 from "@data/theaters/cgv-asiadeu/seatmaps/hall-7.json";
import cgvAsiadeuS008 from "@data/theaters/cgv-asiadeu/seatmaps/s008.json";
import cgvUlsandongguTheater from "@data/theaters/cgv-ulsandonggu/theater.json";
import cgvUlsandongguSchedule from "@data/showtimes/cgv-ulsandonggu.json";
import cgvUlsandongguHall1 from "@data/theaters/cgv-ulsandonggu/seatmaps/hall-1.json";
import cgvUlsandongguHall2 from "@data/theaters/cgv-ulsandonggu/seatmaps/hall-2.json";
import cgvUlsandongguHall3 from "@data/theaters/cgv-ulsandonggu/seatmaps/hall-3.json";
import cgvUlsandongguHall4 from "@data/theaters/cgv-ulsandonggu/seatmaps/hall-4.json";
import cgvUlsandongguHall5 from "@data/theaters/cgv-ulsandonggu/seatmaps/hall-5.json";
import cgvUlsansamsanTheater from "@data/theaters/cgv-ulsansamsan/theater.json";
import cgvUlsansamsanSchedule from "@data/showtimes/cgv-ulsansamsan.json";
import cgvUlsansamsanHall1 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-1.json";
import cgvUlsansamsanHall2 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-2.json";
import cgvUlsansamsanHall3 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-3.json";
import cgvUlsansamsanHall4 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-4.json";
import cgvUlsansamsanHall5 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-5.json";
import cgvUlsansamsanHall6 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-6.json";
import cgvUlsansamsanHall7 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-7.json";
import cgvUlsansamsanHall8 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-8.json";
import cgvUlsansamsanHall9 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-9.json";
import cgvUlsansamsanHall10 from "@data/theaters/cgv-ulsansamsan/seatmaps/hall-10.json";
import cgvUlsansamsanS011 from "@data/theaters/cgv-ulsansamsan/seatmaps/s011.json";
import cgvUlsanseongnamTheater from "@data/theaters/cgv-ulsanseongnam/theater.json";
import cgvUlsanseongnamSchedule from "@data/showtimes/cgv-ulsanseongnam.json";
import cgvUlsanseongnamHall1 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-1.json";
import cgvUlsanseongnamHall2 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-2.json";
import cgvUlsanseongnamHall3 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-3.json";
import cgvUlsanseongnamHall4 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-4.json";
import cgvUlsanseongnamHall5 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-5.json";
import cgvUlsanseongnamHall6 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-6.json";
import cgvUlsanseongnamHall7 from "@data/theaters/cgv-ulsanseongnam/seatmaps/hall-7.json";
import cgvUlsansincheonTheater from "@data/theaters/cgv-ulsansincheon/theater.json";
import cgvUlsansincheonSchedule from "@data/showtimes/cgv-ulsansincheon.json";
import cgvUlsansincheonHall1 from "@data/theaters/cgv-ulsansincheon/seatmaps/hall-1.json";
import cgvUlsansincheonHall2 from "@data/theaters/cgv-ulsansincheon/seatmaps/hall-2.json";
import cgvUlsansincheonHall3 from "@data/theaters/cgv-ulsansincheon/seatmaps/hall-3.json";
import cgvUlsansincheonHall4 from "@data/theaters/cgv-ulsansincheon/seatmaps/hall-4.json";
import cgvUlsanjinjangTheater from "@data/theaters/cgv-ulsanjinjang/theater.json";
import cgvUlsanjinjangSchedule from "@data/showtimes/cgv-ulsanjinjang.json";
import cgvUlsanjinjangHall1 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-1.json";
import cgvUlsanjinjangHall2 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-2.json";
import cgvUlsanjinjangHall3 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-3.json";
import cgvUlsanjinjangHall4 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-4.json";
import cgvUlsanjinjangHall5 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-5.json";
import cgvUlsanjinjangHall6 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-6.json";
import cgvUlsanjinjangHall7 from "@data/theaters/cgv-ulsanjinjang/seatmaps/hall-7.json";
import cgvJeonggwanTheater from "@data/theaters/cgv-jeonggwan/theater.json";
import cgvJeonggwanSchedule from "@data/showtimes/cgv-jeonggwan.json";
import cgvJeonggwanHall1 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-1.json";
import cgvJeonggwanHall2 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-2.json";
import cgvJeonggwanHall3 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-3.json";
import cgvJeonggwanHall4 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-4.json";
import cgvJeonggwanHall5 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-5.json";
import cgvJeonggwanHall6 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-6.json";
import cgvJeonggwanHall7 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-7.json";
import cgvJeonggwanHall8 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-8.json";
import cgvJeonggwanHall9 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-9.json";
import cgvJeonggwanHall2010 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-2-010.json";
import cgvJeonggwanHall3011 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-3-011.json";
import cgvJeonggwanHall4012 from "@data/theaters/cgv-jeonggwan/seatmaps/hall-4-012.json";
import cgvHadanateumolringTheater from "@data/theaters/cgv-hadanateumolring/theater.json";
import cgvHadanateumolringSchedule from "@data/showtimes/cgv-hadanateumolring.json";
import cgvHadanateumolringHall1 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-1.json";
import cgvHadanateumolringHall2 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-2.json";
import cgvHadanateumolringHall3 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-3.json";
import cgvHadanateumolringS004 from "@data/theaters/cgv-hadanateumolring/seatmaps/s004.json";
import cgvHadanateumolringHall4 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-4.json";
import cgvHadanateumolringHall5 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-5.json";
import cgvHadanateumolringHall6 from "@data/theaters/cgv-hadanateumolring/seatmaps/hall-6.json";
import cgvHaeundaeTheater from "@data/theaters/cgv-haeundae/theater.json";
import cgvHaeundaeSchedule from "@data/showtimes/cgv-haeundae.json";
import cgvHaeundaeHall1 from "@data/theaters/cgv-haeundae/seatmaps/hall-1.json";
import cgvHaeundaeHall2 from "@data/theaters/cgv-haeundae/seatmaps/hall-2.json";
import cgvHaeundaeHall3 from "@data/theaters/cgv-haeundae/seatmaps/hall-3.json";
import cgvHaeundaeHall4 from "@data/theaters/cgv-haeundae/seatmaps/hall-4.json";
import cgvHaeundaeHall5 from "@data/theaters/cgv-haeundae/seatmaps/hall-5.json";
import cgvHaeundaeHall6 from "@data/theaters/cgv-haeundae/seatmaps/hall-6.json";
import cgvDriveInYeongdoTheater from "@data/theaters/cgv-drive-in-yeongdo/theater.json";
import cgvDriveInYeongdoSchedule from "@data/showtimes/cgv-drive-in-yeongdo.json";
import cgvDriveInYeongdoS001 from "@data/theaters/cgv-drive-in-yeongdo/seatmaps/s001.json";
import cgvGeojeTheater from "@data/theaters/cgv-geoje/theater.json";
import cgvGeojeSchedule from "@data/showtimes/cgv-geoje.json";
import cgvGeojeHall1 from "@data/theaters/cgv-geoje/seatmaps/hall-1.json";
import cgvGeojeHall2 from "@data/theaters/cgv-geoje/seatmaps/hall-2.json";
import cgvGeojeHall3 from "@data/theaters/cgv-geoje/seatmaps/hall-3.json";
import cgvGeojeHall4 from "@data/theaters/cgv-geoje/seatmaps/hall-4.json";
import cgvGeojeHall5 from "@data/theaters/cgv-geoje/seatmaps/hall-5.json";
import cgvGeojeHall6 from "@data/theaters/cgv-geoje/seatmaps/hall-6.json";
import cgvGeojeHall7 from "@data/theaters/cgv-geoje/seatmaps/hall-7.json";
import cgvGoseongTheater from "@data/theaters/cgv-goseong/theater.json";
import cgvGoseongSchedule from "@data/showtimes/cgv-goseong.json";
import cgvGoseongHall1 from "@data/theaters/cgv-goseong/seatmaps/hall-1.json";
import cgvGoseongHall2 from "@data/theaters/cgv-goseong/seatmaps/hall-2.json";
import cgvGumiTheater from "@data/theaters/cgv-gumi/theater.json";
import cgvGumiSchedule from "@data/showtimes/cgv-gumi.json";
import cgvGumiHall1 from "@data/theaters/cgv-gumi/seatmaps/hall-1.json";
import cgvGumiHall2 from "@data/theaters/cgv-gumi/seatmaps/hall-2.json";
import cgvGumiHall3 from "@data/theaters/cgv-gumi/seatmaps/hall-3.json";
import cgvGumiHall4 from "@data/theaters/cgv-gumi/seatmaps/hall-4.json";
import cgvGumiHall5 from "@data/theaters/cgv-gumi/seatmaps/hall-5.json";
import cgvGumiHall6 from "@data/theaters/cgv-gumi/seatmaps/hall-6.json";
import cgvGumiHall7 from "@data/theaters/cgv-gumi/seatmaps/hall-7.json";
import cgvGumiHall8 from "@data/theaters/cgv-gumi/seatmaps/hall-8.json";
import cgvGumiHall9 from "@data/theaters/cgv-gumi/seatmaps/hall-9.json";
import cgvGumiHall10 from "@data/theaters/cgv-gumi/seatmaps/hall-10.json";
import cgvGimcheonyulgokTheater from "@data/theaters/cgv-gimcheonyulgok/theater.json";
import cgvGimcheonyulgokSchedule from "@data/showtimes/cgv-gimcheonyulgok.json";
import cgvGimcheonyulgokHall1 from "@data/theaters/cgv-gimcheonyulgok/seatmaps/hall-1.json";
import cgvGimcheonyulgokHall2 from "@data/theaters/cgv-gimcheonyulgok/seatmaps/hall-2.json";
import cgvGimcheonyulgokHall3 from "@data/theaters/cgv-gimcheonyulgok/seatmaps/hall-3.json";
import cgvGimcheonyulgokHall4 from "@data/theaters/cgv-gimcheonyulgok/seatmaps/hall-4.json";
import cgvGimcheonyulgokHall5 from "@data/theaters/cgv-gimcheonyulgok/seatmaps/hall-5.json";
import cgvGimhaeTheater from "@data/theaters/cgv-gimhae/theater.json";
import cgvGimhaeSchedule from "@data/showtimes/cgv-gimhae.json";
import cgvGimhaeHall1 from "@data/theaters/cgv-gimhae/seatmaps/hall-1.json";
import cgvGimhaeHall2 from "@data/theaters/cgv-gimhae/seatmaps/hall-2.json";
import cgvGimhaeHall3 from "@data/theaters/cgv-gimhae/seatmaps/hall-3.json";
import cgvGimhaeHall4 from "@data/theaters/cgv-gimhae/seatmaps/hall-4.json";
import cgvGimhaeHall5 from "@data/theaters/cgv-gimhae/seatmaps/hall-5.json";
import cgvGimhaeHall6 from "@data/theaters/cgv-gimhae/seatmaps/hall-6.json";
import cgvGimhaeHall7 from "@data/theaters/cgv-gimhae/seatmaps/hall-7.json";
import cgvGimhaeHall8 from "@data/theaters/cgv-gimhae/seatmaps/hall-8.json";
import cgvGimhaeHall9 from "@data/theaters/cgv-gimhae/seatmaps/hall-9.json";
import cgvGimhaeyulhaTheater from "@data/theaters/cgv-gimhaeyulha/theater.json";
import cgvGimhaeyulhaSchedule from "@data/showtimes/cgv-gimhaeyulha.json";
import cgvGimhaeyulhaHall1 from "@data/theaters/cgv-gimhaeyulha/seatmaps/hall-1.json";
import cgvGimhaeyulhaHall2 from "@data/theaters/cgv-gimhaeyulha/seatmaps/hall-2.json";
import cgvGimhaeyulhaHall3 from "@data/theaters/cgv-gimhaeyulha/seatmaps/hall-3.json";
import cgvGimhaeyulhaHall4 from "@data/theaters/cgv-gimhaeyulha/seatmaps/hall-4.json";
import cgvGimhaejangyuTheater from "@data/theaters/cgv-gimhaejangyu/theater.json";
import cgvGimhaejangyuSchedule from "@data/showtimes/cgv-gimhaejangyu.json";
import cgvGimhaejangyuHall1 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-1.json";
import cgvGimhaejangyuHall2 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-2.json";
import cgvGimhaejangyuHall3 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-3.json";
import cgvGimhaejangyuHall4 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-4.json";
import cgvGimhaejangyuHall5 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-5.json";
import cgvGimhaejangyuHall6 from "@data/theaters/cgv-gimhaejangyu/seatmaps/hall-6.json";
import cgvMasanTheater from "@data/theaters/cgv-masan/theater.json";
import cgvMasanSchedule from "@data/showtimes/cgv-masan.json";
import cgvMasanHall1 from "@data/theaters/cgv-masan/seatmaps/hall-1.json";
import cgvMasanHall2 from "@data/theaters/cgv-masan/seatmaps/hall-2.json";
import cgvMasanHall3 from "@data/theaters/cgv-masan/seatmaps/hall-3.json";
import cgvMasanHall4 from "@data/theaters/cgv-masan/seatmaps/hall-4.json";
import cgvMasanHall5 from "@data/theaters/cgv-masan/seatmaps/hall-5.json";
import cgvMasanHall6 from "@data/theaters/cgv-masan/seatmaps/hall-6.json";
import cgvMasanHall8 from "@data/theaters/cgv-masan/seatmaps/hall-8.json";
import cgvBukpohangTheater from "@data/theaters/cgv-bukpohang/theater.json";
import cgvBukpohangSchedule from "@data/showtimes/cgv-bukpohang.json";
import cgvBukpohangHall1 from "@data/theaters/cgv-bukpohang/seatmaps/hall-1.json";
import cgvBukpohangHall2 from "@data/theaters/cgv-bukpohang/seatmaps/hall-2.json";
import cgvBukpohangHall3 from "@data/theaters/cgv-bukpohang/seatmaps/hall-3.json";
import cgvBukpohangHall5 from "@data/theaters/cgv-bukpohang/seatmaps/hall-5.json";
import cgvBukpohangHall6 from "@data/theaters/cgv-bukpohang/seatmaps/hall-6.json";
import cgvBukpohangHall7 from "@data/theaters/cgv-bukpohang/seatmaps/hall-7.json";
import cgvBukpohangHall8 from "@data/theaters/cgv-bukpohang/seatmaps/hall-8.json";
import cgvBukpohangHall9 from "@data/theaters/cgv-bukpohang/seatmaps/hall-9.json";
import cgvAndongTheater from "@data/theaters/cgv-andong/theater.json";
import cgvAndongSchedule from "@data/showtimes/cgv-andong.json";
import cgvAndongHall1 from "@data/theaters/cgv-andong/seatmaps/hall-1.json";
import cgvAndongHall2 from "@data/theaters/cgv-andong/seatmaps/hall-2.json";
import cgvAndongHall3 from "@data/theaters/cgv-andong/seatmaps/hall-3.json";
import cgvAndongHall4 from "@data/theaters/cgv-andong/seatmaps/hall-4.json";
import cgvAndongHall5 from "@data/theaters/cgv-andong/seatmaps/hall-5.json";
import cgvAndongHall6 from "@data/theaters/cgv-andong/seatmaps/hall-6.json";
import cgvYangsansamhoTheater from "@data/theaters/cgv-yangsansamho/theater.json";
import cgvYangsansamhoSchedule from "@data/showtimes/cgv-yangsansamho.json";
import cgvYangsansamhoHall1 from "@data/theaters/cgv-yangsansamho/seatmaps/hall-1.json";
import cgvYangsansamhoHall2 from "@data/theaters/cgv-yangsansamho/seatmaps/hall-2.json";
import cgvYangsansamhoHall3 from "@data/theaters/cgv-yangsansamho/seatmaps/hall-3.json";
import cgvJinjuhyeoksinTheater from "@data/theaters/cgv-jinjuhyeoksin/theater.json";
import cgvJinjuhyeoksinSchedule from "@data/showtimes/cgv-jinjuhyeoksin.json";
import cgvJinjuhyeoksinHall1 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-1.json";
import cgvJinjuhyeoksinHall2 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-2.json";
import cgvJinjuhyeoksinHall3 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-3.json";
import cgvJinjuhyeoksinHall4 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-4.json";
import cgvJinjuhyeoksinHall5 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-5.json";
import cgvJinjuhyeoksinHall6 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-6.json";
import cgvJinjuhyeoksinHall7 from "@data/theaters/cgv-jinjuhyeoksin/seatmaps/hall-7.json";
import cgvChangwondeositiTheater from "@data/theaters/cgv-changwondeositi/theater.json";
import cgvChangwondeositiSchedule from "@data/showtimes/cgv-changwondeositi.json";
import cgvChangwondeositiHall1 from "@data/theaters/cgv-changwondeositi/seatmaps/hall-1.json";
import cgvChangwondeositiHall2 from "@data/theaters/cgv-changwondeositi/seatmaps/hall-2.json";
import cgvChangwondeositiHall3 from "@data/theaters/cgv-changwondeositi/seatmaps/hall-3.json";
import cgvChangwondeositiS004 from "@data/theaters/cgv-changwondeositi/seatmaps/s004.json";
import cgvChangwondeositiHall5 from "@data/theaters/cgv-changwondeositi/seatmaps/hall-5.json";
import cgvChangwondeositiHall6 from "@data/theaters/cgv-changwondeositi/seatmaps/hall-6.json";
import cgvChangwonsangnamTheater from "@data/theaters/cgv-changwonsangnam/theater.json";
import cgvChangwonsangnamSchedule from "@data/showtimes/cgv-changwonsangnam.json";
import cgvChangwonsangnamHall1 from "@data/theaters/cgv-changwonsangnam/seatmaps/hall-1.json";
import cgvChangwonsangnamHall2 from "@data/theaters/cgv-changwonsangnam/seatmaps/hall-2.json";
import cgvChangwonsangnamHall3 from "@data/theaters/cgv-changwonsangnam/seatmaps/hall-3.json";
import cgvChangwonsangnamHall4 from "@data/theaters/cgv-changwonsangnam/seatmaps/hall-4.json";
import cgvChangwonsangnamHall5 from "@data/theaters/cgv-changwonsangnam/seatmaps/hall-5.json";
import cgvGwangyangTheater from "@data/theaters/cgv-gwangyang/theater.json";
import cgvGwangyangSchedule from "@data/showtimes/cgv-gwangyang.json";
import cgvGwangyangHall1 from "@data/theaters/cgv-gwangyang/seatmaps/hall-1.json";
import cgvGwangyangHall2 from "@data/theaters/cgv-gwangyang/seatmaps/hall-2.json";
import cgvGwangyangHall3 from "@data/theaters/cgv-gwangyang/seatmaps/hall-3.json";
import cgvGwangyangHall4 from "@data/theaters/cgv-gwangyang/seatmaps/hall-4.json";
import cgvGwangyangElepeuseukweeoTheater from "@data/theaters/cgv-gwangyang-elepeuseukweeo/theater.json";
import cgvGwangyangElepeuseukweeoSchedule from "@data/showtimes/cgv-gwangyang-elepeuseukweeo.json";
import cgvGwangyangElepeuseukweeoHall1 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-1.json";
import cgvGwangyangElepeuseukweeoHall2 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-2.json";
import cgvGwangyangElepeuseukweeoHall3 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-3.json";
import cgvGwangyangElepeuseukweeoHall4 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-4.json";
import cgvGwangyangElepeuseukweeoHall5 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-5.json";
import cgvGwangyangElepeuseukweeoHall6 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-6.json";
import cgvGwangyangElepeuseukweeoHall7 from "@data/theaters/cgv-gwangyang-elepeuseukweeo/seatmaps/hall-7.json";
import cgvGwangjugeumnamroTheater from "@data/theaters/cgv-gwangjugeumnamro/theater.json";
import cgvGwangjugeumnamroSchedule from "@data/showtimes/cgv-gwangjugeumnamro.json";
import cgvGwangjugeumnamroHall1 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-1.json";
import cgvGwangjugeumnamroHall2 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-2.json";
import cgvGwangjugeumnamroHall3 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-3.json";
import cgvGwangjugeumnamroHall4 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-4.json";
import cgvGwangjugeumnamroHall5 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-5.json";
import cgvGwangjugeumnamroHall6 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-6.json";
import cgvGwangjugeumnamroHall7 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-7.json";
import cgvGwangjugeumnamroS008 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/s008.json";
import cgvGwangjugeumnamroHall9 from "@data/theaters/cgv-gwangjugeumnamro/seatmaps/hall-9.json";
import cgvGwangjusangmuTheater from "@data/theaters/cgv-gwangjusangmu/theater.json";
import cgvGwangjusangmuSchedule from "@data/showtimes/cgv-gwangjusangmu.json";
import cgvGwangjusangmuHall1 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-1.json";
import cgvGwangjusangmuHall2 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-2.json";
import cgvGwangjusangmuHall3 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-3.json";
import cgvGwangjusangmuHall5 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-5.json";
import cgvGwangjusangmuHall6 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-6.json";
import cgvGwangjusangmuHall7 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-7.json";
import cgvGwangjusangmuHall8 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-8.json";
import cgvGwangjusangmuHall9 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-9.json";
import cgvGwangjusangmuHall10 from "@data/theaters/cgv-gwangjusangmu/seatmaps/hall-10.json";
import cgvGwangjuyongbongTheater from "@data/theaters/cgv-gwangjuyongbong/theater.json";
import cgvGwangjuyongbongSchedule from "@data/showtimes/cgv-gwangjuyongbong.json";
import cgvGwangjuyongbongHall1 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-1.json";
import cgvGwangjuyongbongHall2 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-2.json";
import cgvGwangjuyongbongHall3 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-3.json";
import cgvGwangjuyongbongHall4 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-4.json";
import cgvGwangjuyongbongHall5 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-5.json";
import cgvGwangjuyongbongHall6 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-6.json";
import cgvGwangjuyongbongHall7 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-7.json";
import cgvGwangjuyongbongHall8 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-8.json";
import cgvGwangjuyongbongHall9 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-9.json";
import cgvGwangjuyongbongHall10 from "@data/theaters/cgv-gwangjuyongbong/seatmaps/hall-10.json";
import cgvGwangjucheomdanTheater from "@data/theaters/cgv-gwangjucheomdan/theater.json";
import cgvGwangjucheomdanSchedule from "@data/showtimes/cgv-gwangjucheomdan.json";
import cgvGwangjucheomdanHall1 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-1.json";
import cgvGwangjucheomdanHall2 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-2.json";
import cgvGwangjucheomdanHall3 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-3.json";
import cgvGwangjucheomdanS004 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/s004.json";
import cgvGwangjucheomdanHall5 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-5.json";
import cgvGwangjucheomdanHall6 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-6.json";
import cgvGwangjucheomdanHall7 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-7.json";
import cgvGwangjucheomdanHall8 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-8.json";
import cgvGwangjucheomdanHall9 from "@data/theaters/cgv-gwangjucheomdan/seatmaps/hall-9.json";
import cgvGwangjuchungjangroTheater from "@data/theaters/cgv-gwangjuchungjangro/theater.json";
import cgvGwangjuchungjangroSchedule from "@data/showtimes/cgv-gwangjuchungjangro.json";
import cgvGwangjuchungjangroHall1 from "@data/theaters/cgv-gwangjuchungjangro/seatmaps/hall-1.json";
import cgvGwangjuchungjangroHall2 from "@data/theaters/cgv-gwangjuchungjangro/seatmaps/hall-2.json";
import cgvGwangjuchungjangroHall3 from "@data/theaters/cgv-gwangjuchungjangro/seatmaps/hall-3.json";
import cgvGwangjuchungjangroHall4 from "@data/theaters/cgv-gwangjuchungjangro/seatmaps/hall-4.json";
import cgvGwangjuchungjangroHall5 from "@data/theaters/cgv-gwangjuchungjangro/seatmaps/hall-5.json";
import cgvGwangjuhanamTheater from "@data/theaters/cgv-gwangjuhanam/theater.json";
import cgvGwangjuhanamSchedule from "@data/showtimes/cgv-gwangjuhanam.json";
import cgvGwangjuhanamHall1 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-1.json";
import cgvGwangjuhanamHall2 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-2.json";
import cgvGwangjuhanamHall3 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-3.json";
import cgvGwangjuhanamHall4 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-4.json";
import cgvGwangjuhanamHall5 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-5.json";
import cgvGwangjuhanamHall6 from "@data/theaters/cgv-gwangjuhanam/seatmaps/hall-6.json";
import cgvNajuTheater from "@data/theaters/cgv-naju/theater.json";
import cgvNajuSchedule from "@data/showtimes/cgv-naju.json";
import cgvNajuHall1 from "@data/theaters/cgv-naju/seatmaps/hall-1.json";
import cgvNajuHall2 from "@data/theaters/cgv-naju/seatmaps/hall-2.json";
import cgvNajuHall3 from "@data/theaters/cgv-naju/seatmaps/hall-3.json";
import cgvNajuHall4 from "@data/theaters/cgv-naju/seatmaps/hall-4.json";
import cgvNajuHall5 from "@data/theaters/cgv-naju/seatmaps/hall-5.json";
import cgvNajuHall6 from "@data/theaters/cgv-naju/seatmaps/hall-6.json";
import cgvMokpopyeonghwagwangjangTheater from "@data/theaters/cgv-mokpopyeonghwagwangjang/theater.json";
import cgvMokpopyeonghwagwangjangSchedule from "@data/showtimes/cgv-mokpopyeonghwagwangjang.json";
import cgvMokpopyeonghwagwangjangHall1 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-1.json";
import cgvMokpopyeonghwagwangjangHall2 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-2.json";
import cgvMokpopyeonghwagwangjangHall3 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-3.json";
import cgvMokpopyeonghwagwangjangHall4 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-4.json";
import cgvMokpopyeonghwagwangjangHall5 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-5.json";
import cgvMokpopyeonghwagwangjangHall6 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-6.json";
import cgvMokpopyeonghwagwangjangHall7 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-7.json";
import cgvMokpopyeonghwagwangjangHall8 from "@data/theaters/cgv-mokpopyeonghwagwangjang/seatmaps/hall-8.json";
import cgvSeojeonjuTheater from "@data/theaters/cgv-seojeonju/theater.json";
import cgvSeojeonjuSchedule from "@data/showtimes/cgv-seojeonju.json";
import cgvSeojeonjuHall1 from "@data/theaters/cgv-seojeonju/seatmaps/hall-1.json";
import cgvSeojeonjuHall2 from "@data/theaters/cgv-seojeonju/seatmaps/hall-2.json";
import cgvSeojeonjuHall3 from "@data/theaters/cgv-seojeonju/seatmaps/hall-3.json";
import cgvSeojeonjuHall4 from "@data/theaters/cgv-seojeonju/seatmaps/hall-4.json";
import cgvSeojeonjuHall5 from "@data/theaters/cgv-seojeonju/seatmaps/hall-5.json";
import cgvSuncheonsindaeTheater from "@data/theaters/cgv-suncheonsindae/theater.json";
import cgvSuncheonsindaeSchedule from "@data/showtimes/cgv-suncheonsindae.json";
import cgvSuncheonsindaeHall1 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-1.json";
import cgvSuncheonsindaeHall2 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-2.json";
import cgvSuncheonsindaeHall3 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-3.json";
import cgvSuncheonsindaeHall4 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-4.json";
import cgvSuncheonsindaeHall5 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-5.json";
import cgvSuncheonsindaeHall6 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-6.json";
import cgvSuncheonsindaeHall7 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-7.json";
import cgvSuncheonsindaeHall8 from "@data/theaters/cgv-suncheonsindae/seatmaps/hall-8.json";
import cgvSuncheonsindaeS009 from "@data/theaters/cgv-suncheonsindae/seatmaps/s009.json";
import cgvYeosuungcheonTheater from "@data/theaters/cgv-yeosuungcheon/theater.json";
import cgvYeosuungcheonSchedule from "@data/showtimes/cgv-yeosuungcheon.json";
import cgvYeosuungcheonHall1 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-1.json";
import cgvYeosuungcheonHall2 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-2.json";
import cgvYeosuungcheonHall3 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-3.json";
import cgvYeosuungcheonHall4 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-4.json";
import cgvYeosuungcheonHall5 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-5.json";
import cgvYeosuungcheonHall6 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-6.json";
import cgvYeosuungcheonHall7 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-7.json";
import cgvYeosuungcheonHall8 from "@data/theaters/cgv-yeosuungcheon/seatmaps/hall-8.json";
import cgvIksanTheater from "@data/theaters/cgv-iksan/theater.json";
import cgvIksanSchedule from "@data/showtimes/cgv-iksan.json";
import cgvIksanHall1 from "@data/theaters/cgv-iksan/seatmaps/hall-1.json";
import cgvIksanHall2 from "@data/theaters/cgv-iksan/seatmaps/hall-2.json";
import cgvIksanHall3 from "@data/theaters/cgv-iksan/seatmaps/hall-3.json";
import cgvIksanHall4 from "@data/theaters/cgv-iksan/seatmaps/hall-4.json";
import cgvIksanHall5 from "@data/theaters/cgv-iksan/seatmaps/hall-5.json";
import cgvIksanHall6 from "@data/theaters/cgv-iksan/seatmaps/hall-6.json";
import cgvIksanHall7 from "@data/theaters/cgv-iksan/seatmaps/hall-7.json";
import cgvJeonjugosaTheater from "@data/theaters/cgv-jeonjugosa/theater.json";
import cgvJeonjugosaSchedule from "@data/showtimes/cgv-jeonjugosa.json";
import cgvJeonjugosaHall1 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-1.json";
import cgvJeonjugosaHall2 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-2.json";
import cgvJeonjugosaHall3 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-3.json";
import cgvJeonjugosaHall4 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-4.json";
import cgvJeonjugosaHall5 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-5.json";
import cgvJeonjugosaHall6 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-6.json";
import cgvJeonjugosaHall7 from "@data/theaters/cgv-jeonjugosa/seatmaps/hall-7.json";
import cgvJeonjugosaS008 from "@data/theaters/cgv-jeonjugosa/seatmaps/s008.json";
import cgvJeonjuekositiTheater from "@data/theaters/cgv-jeonjuekositi/theater.json";
import cgvJeonjuekositiSchedule from "@data/showtimes/cgv-jeonjuekositi.json";
import cgvJeonjuekositiHall1 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-1.json";
import cgvJeonjuekositiHall2 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-2.json";
import cgvJeonjuekositiHall3 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-3.json";
import cgvJeonjuekositiHall4 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-4.json";
import cgvJeonjuekositiHall5 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-5.json";
import cgvJeonjuekositiHall6 from "@data/theaters/cgv-jeonjuekositi/seatmaps/hall-6.json";
import cgvJeonjuhyojaTheater from "@data/theaters/cgv-jeonjuhyoja/theater.json";
import cgvJeonjuhyojaSchedule from "@data/showtimes/cgv-jeonjuhyoja.json";
import cgvJeonjuhyojaHall1 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-1.json";
import cgvJeonjuhyojaHall2 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-2.json";
import cgvJeonjuhyojaHall3 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-3.json";
import cgvJeonjuhyojaHall4 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-4.json";
import cgvJeonjuhyojaHall5 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-5.json";
import cgvJeonjuhyojaHall6 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/hall-6.json";
import cgvJeonjuhyojaS007 from "@data/theaters/cgv-jeonjuhyoja/seatmaps/s007.json";
import cgvJeongeupTheater from "@data/theaters/cgv-jeongeup/theater.json";
import cgvJeongeupSchedule from "@data/showtimes/cgv-jeongeup.json";
import cgvJeongeupHall1 from "@data/theaters/cgv-jeongeup/seatmaps/hall-1.json";
import cgvJeongeupHall2 from "@data/theaters/cgv-jeongeup/seatmaps/hall-2.json";
import cgvJeongeupHall3 from "@data/theaters/cgv-jeongeup/seatmaps/hall-3.json";
import cgvJeongeupHall4 from "@data/theaters/cgv-jeongeup/seatmaps/hall-4.json";
import cgvJejuTheater from "@data/theaters/cgv-jeju/theater.json";
import cgvJejuSchedule from "@data/showtimes/cgv-jeju.json";
import cgvJejuHall1 from "@data/theaters/cgv-jeju/seatmaps/hall-1.json";
import cgvJejuHall2 from "@data/theaters/cgv-jeju/seatmaps/hall-2.json";
import cgvJejuS003 from "@data/theaters/cgv-jeju/seatmaps/s003.json";
import cgvJejuHall4 from "@data/theaters/cgv-jeju/seatmaps/hall-4.json";
import cgvJejuHall5 from "@data/theaters/cgv-jeju/seatmaps/hall-5.json";
import cgvJejuHall6 from "@data/theaters/cgv-jeju/seatmaps/hall-6.json";
import cgvJejuHall7 from "@data/theaters/cgv-jeju/seatmaps/hall-7.json";
import cgvJejuHall8 from "@data/theaters/cgv-jeju/seatmaps/hall-8.json";
import cgvJejunohyeongTheater from "@data/theaters/cgv-jejunohyeong/theater.json";
import cgvJejunohyeongSchedule from "@data/showtimes/cgv-jejunohyeong.json";
import cgvJejunohyeongHall1 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-1.json";
import cgvJejunohyeongHall2 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-2.json";
import cgvJejunohyeongHall3 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-3.json";
import cgvJejunohyeongHall4 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-4.json";
import cgvJejunohyeongHall5 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-5.json";
import cgvJejunohyeongHall6 from "@data/theaters/cgv-jejunohyeong/seatmaps/hall-6.json";
import megaboxDaejeonyuseongTheater from "@data/theaters/megabox-daejeonyuseong/theater.json";
import megaboxDaejeonyuseongSchedule from "@data/showtimes/megabox-daejeonyuseong.json";
import megaboxDaejeonyuseongHall1 from "@data/theaters/megabox-daejeonyuseong/seatmaps/hall-1.json";
import megaboxDaejeonyuseongHall2 from "@data/theaters/megabox-daejeonyuseong/seatmaps/hall-2.json";
import megaboxDaejeonyuseongHall3 from "@data/theaters/megabox-daejeonyuseong/seatmaps/hall-3.json";
import megaboxDaejeonyuseongHall4 from "@data/theaters/megabox-daejeonyuseong/seatmaps/hall-4.json";
import megaboxDaejeonyuseongHall5 from "@data/theaters/megabox-daejeonyuseong/seatmaps/hall-5.json";
import megaboxJeondaeGwangjuTheater from "@data/theaters/megabox-jeondae-gwangju/theater.json";
import megaboxJeondaeGwangjuSchedule from "@data/showtimes/megabox-jeondae-gwangju.json";
import megaboxJeondaeGwangjuHall1 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-1.json";
import megaboxJeondaeGwangjuHall2 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-2.json";
import megaboxJeondaeGwangjuHall3 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-3.json";
import megaboxJeondaeGwangjuHall4 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-4.json";
import megaboxJeondaeGwangjuHall5 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-5.json";
import megaboxJeondaeGwangjuHall6 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-6.json";
import megaboxJeondaeGwangjuHall7 from "@data/theaters/megabox-jeondae-gwangju/seatmaps/hall-7.json";
import megaboxDaejeonhyeondaepeurimieomaulretTheater from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/theater.json";
import megaboxDaejeonhyeondaepeurimieomaulretSchedule from "@data/showtimes/megabox-daejeonhyeondaepeurimieomaulret.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall1 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-1.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall2 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-2.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall3 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-3.json";
import megaboxDaejeonhyeondaepeurimieomaulretS04 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/s04.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall5 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-5.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall6 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-6.json";
import megaboxDaejeonhyeondaepeurimieomaulretHall7 from "@data/theaters/megabox-daejeonhyeondaepeurimieomaulret/seatmaps/hall-7.json";
import megaboxNonsanTheater from "@data/theaters/megabox-nonsan/theater.json";
import megaboxNonsanSchedule from "@data/showtimes/megabox-nonsan.json";
import megaboxNonsanHall1 from "@data/theaters/megabox-nonsan/seatmaps/hall-1.json";
import megaboxNonsanHall2 from "@data/theaters/megabox-nonsan/seatmaps/hall-2.json";
import megaboxNonsanHall3 from "@data/theaters/megabox-nonsan/seatmaps/hall-3.json";
import megaboxNonsanHall4 from "@data/theaters/megabox-nonsan/seatmaps/hall-4.json";
import megaboxNonsanHall5 from "@data/theaters/megabox-nonsan/seatmaps/hall-5.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonTheater from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/theater.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonSchedule from "@data/showtimes/megabox-namyangjuhyeondaeaulretseupeiseuwon.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall1 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-1.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall2 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-2.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall3 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-3.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall4 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-4.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonS05 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/s05.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall6 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-6.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall7 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-7.json";
import megaboxNamyangjuhyeondaeaulretseupeiseuwonHall8 from "@data/theaters/megabox-namyangjuhyeondaeaulretseupeiseuwon/seatmaps/hall-8.json";
import megaboxAnseongseutapildeuTheater from "@data/theaters/megabox-anseongseutapildeu/theater.json";
import megaboxAnseongseutapildeuSchedule from "@data/showtimes/megabox-anseongseutapildeu.json";
import megaboxAnseongseutapildeuHall1 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-1.json";
import megaboxAnseongseutapildeuHall2 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-2.json";
import megaboxAnseongseutapildeuHall3 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-3.json";
import megaboxAnseongseutapildeuHall4 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-4.json";
import megaboxAnseongseutapildeuS05 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/s05.json";
import megaboxAnseongseutapildeuHall6 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-6.json";
import megaboxAnseongseutapildeuHall7 from "@data/theaters/megabox-anseongseutapildeu/seatmaps/hall-7.json";
import megaboxJeonjuhyeoksinTheater from "@data/theaters/megabox-jeonjuhyeoksin/theater.json";
import megaboxJeonjuhyeoksinSchedule from "@data/showtimes/megabox-jeonjuhyeoksin.json";
import megaboxJeonjuhyeoksinHall1 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-1.json";
import megaboxJeonjuhyeoksinHall2 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-2.json";
import megaboxJeonjuhyeoksinHall3 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-3.json";
import megaboxJeonjuhyeoksinHall4 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-4.json";
import megaboxJeonjuhyeoksinHall5 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-5.json";
import megaboxJeonjuhyeoksinHall6 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-6.json";
import megaboxJeonjuhyeoksinHall7 from "@data/theaters/megabox-jeonjuhyeoksin/seatmaps/hall-7.json";
import megaboxDaeguisiaTheater from "@data/theaters/megabox-daeguisia/theater.json";
import megaboxDaeguisiaSchedule from "@data/showtimes/megabox-daeguisia.json";
import megaboxDaeguisiaHall1 from "@data/theaters/megabox-daeguisia/seatmaps/hall-1.json";
import megaboxDaeguisiaHall2 from "@data/theaters/megabox-daeguisia/seatmaps/hall-2.json";
import megaboxDaeguisiaHall3 from "@data/theaters/megabox-daeguisia/seatmaps/hall-3.json";
import megaboxDaeguisiaHall4 from "@data/theaters/megabox-daeguisia/seatmaps/hall-4.json";
import megaboxDaeguisiaHall5 from "@data/theaters/megabox-daeguisia/seatmaps/hall-5.json";
import megaboxDaeguisiaHall6 from "@data/theaters/megabox-daeguisia/seatmaps/hall-6.json";
import megaboxDaeguisiaHall7 from "@data/theaters/megabox-daeguisia/seatmaps/hall-7.json";
import megaboxBukdaeguChilgokTheater from "@data/theaters/megabox-bukdaegu-chilgok/theater.json";
import megaboxBukdaeguChilgokSchedule from "@data/showtimes/megabox-bukdaegu-chilgok.json";
import megaboxBukdaeguChilgokHall1 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-1.json";
import megaboxBukdaeguChilgokHall2 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-2.json";
import megaboxBukdaeguChilgokHall3 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-3.json";
import megaboxBukdaeguChilgokHall4 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-4.json";
import megaboxBukdaeguChilgokHall5 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-5.json";
import megaboxBukdaeguChilgokHall6 from "@data/theaters/megabox-bukdaegu-chilgok/seatmaps/hall-6.json";
import megaboxDaejeonsinsegyeateuaensaieonseuTheater from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/theater.json";
import megaboxDaejeonsinsegyeateuaensaieonseuSchedule from "@data/showtimes/megabox-daejeonsinsegyeateuaensaieonseu.json";
import megaboxDaejeonsinsegyeateuaensaieonseuHall1 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/hall-1.json";
import megaboxDaejeonsinsegyeateuaensaieonseuS02 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/s02.json";
import megaboxDaejeonsinsegyeateuaensaieonseuHall3 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/hall-3.json";
import megaboxDaejeonsinsegyeateuaensaieonseuHall4 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/hall-4.json";
import megaboxDaejeonsinsegyeateuaensaieonseuHall5 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/hall-5.json";
import megaboxDaejeonsinsegyeateuaensaieonseuHall6 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/hall-6.json";
import megaboxDaejeonsinsegyeateuaensaieonseuS07 from "@data/theaters/megabox-daejeonsinsegyeateuaensaieonseu/seatmaps/s07.json";
import megaboxGwangmyeongakpeulrajaTheater from "@data/theaters/megabox-gwangmyeongakpeulraja/theater.json";
import megaboxGwangmyeongakpeulrajaSchedule from "@data/showtimes/megabox-gwangmyeongakpeulraja.json";
import megaboxGwangmyeongakpeulrajaHall1 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-1.json";
import megaboxGwangmyeongakpeulrajaHall2 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-2.json";
import megaboxGwangmyeongakpeulrajaHall3 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-3.json";
import megaboxGwangmyeongakpeulrajaHall4 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-4.json";
import megaboxGwangmyeongakpeulrajaHall5 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-5.json";
import megaboxGwangmyeongakpeulrajaHall6 from "@data/theaters/megabox-gwangmyeongakpeulraja/seatmaps/hall-6.json";
import megaboxSasangTheater from "@data/theaters/megabox-sasang/theater.json";
import megaboxSasangSchedule from "@data/showtimes/megabox-sasang.json";
import megaboxSasangHall1 from "@data/theaters/megabox-sasang/seatmaps/hall-1.json";
import megaboxSasangHall2 from "@data/theaters/megabox-sasang/seatmaps/hall-2.json";
import megaboxSasangHall6 from "@data/theaters/megabox-sasang/seatmaps/hall-6.json";
import megaboxSasangHall7 from "@data/theaters/megabox-sasang/seatmaps/hall-7.json";
import megaboxGeumjeongakpeulrajaTheater from "@data/theaters/megabox-geumjeongakpeulraja/theater.json";
import megaboxGeumjeongakpeulrajaSchedule from "@data/showtimes/megabox-geumjeongakpeulraja.json";
import megaboxGeumjeongakpeulrajaHall1 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-1.json";
import megaboxGeumjeongakpeulrajaHall2 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-2.json";
import megaboxGeumjeongakpeulrajaHall3 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-3.json";
import megaboxGeumjeongakpeulrajaHall4 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-4.json";
import megaboxGeumjeongakpeulrajaHall5 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-5.json";
import megaboxGeumjeongakpeulrajaHall6 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-6.json";
import megaboxGeumjeongakpeulrajaHall7 from "@data/theaters/megabox-geumjeongakpeulraja/seatmaps/hall-7.json";
import megaboxChuncheonseoksaTheater from "@data/theaters/megabox-chuncheonseoksa/theater.json";
import megaboxChuncheonseoksaSchedule from "@data/showtimes/megabox-chuncheonseoksa.json";
import megaboxChuncheonseoksaHall1 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-1.json";
import megaboxChuncheonseoksaHall2 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-2.json";
import megaboxChuncheonseoksaHall3 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-3.json";
import megaboxChuncheonseoksaHall4 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-4.json";
import megaboxChuncheonseoksaHall5 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-5.json";
import megaboxChuncheonseoksaHall6 from "@data/theaters/megabox-chuncheonseoksa/seatmaps/hall-6.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuTheater from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/theater.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuSchedule from "@data/showtimes/megabox-pyeongnaehopyeongyeok-gu-namyangju.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall1 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-1.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall2 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-2.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall3 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-3.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall5 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-5.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall6 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-6.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall7 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-7.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall8 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-8.json";
import megaboxPyeongnaehopyeongyeokGuNamyangjuHall9 from "@data/theaters/megabox-pyeongnaehopyeongyeok-gu-namyangju/seatmaps/hall-9.json";
import megaboxGyeongbukdocheongTheater from "@data/theaters/megabox-gyeongbukdocheong/theater.json";
import megaboxGyeongbukdocheongSchedule from "@data/showtimes/megabox-gyeongbukdocheong.json";
import megaboxGyeongbukdocheongHall2 from "@data/theaters/megabox-gyeongbukdocheong/seatmaps/hall-2.json";
import megaboxGyeongbukdocheongHall3 from "@data/theaters/megabox-gyeongbukdocheong/seatmaps/hall-3.json";
import megaboxGyeongbukdocheongHall4 from "@data/theaters/megabox-gyeongbukdocheong/seatmaps/hall-4.json";
import megaboxGyeongbukdocheongHall5 from "@data/theaters/megabox-gyeongbukdocheong/seatmaps/hall-5.json";
import megaboxGyeongbukdocheongHall6 from "@data/theaters/megabox-gyeongbukdocheong/seatmaps/hall-6.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomTheater from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/theater.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomSchedule from "@data/showtimes/megabox-deobutikeumokdonghyeondaebaekhwajeom.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS01 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s01.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS02 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s02.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS03 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s03.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS04 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s04.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS05 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s05.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS06 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s06.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS07 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s07.json";
import megaboxDeobutikeumokdonghyeondaebaekhwajeomS08 from "@data/theaters/megabox-deobutikeumokdonghyeondaebaekhwajeom/seatmaps/s08.json";
import megaboxSuwonnammunTheater from "@data/theaters/megabox-suwonnammun/theater.json";
import megaboxSuwonnammunSchedule from "@data/showtimes/megabox-suwonnammun.json";
import megaboxSuwonnammunHall1 from "@data/theaters/megabox-suwonnammun/seatmaps/hall-1.json";
import megaboxSuwonnammunHall2 from "@data/theaters/megabox-suwonnammun/seatmaps/hall-2.json";
import megaboxSuwonnammunHall3 from "@data/theaters/megabox-suwonnammun/seatmaps/hall-3.json";
import megaboxSuwonnammunHall4 from "@data/theaters/megabox-suwonnammun/seatmaps/hall-4.json";
import megaboxJinjuJunganTheater from "@data/theaters/megabox-jinju-jungan/theater.json";
import megaboxJinjuJunganSchedule from "@data/showtimes/megabox-jinju-jungan.json";
import megaboxJinjuJunganHall3 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-3.json";
import megaboxJinjuJunganHall4 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-4.json";
import megaboxJinjuJunganHall5 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-5.json";
import megaboxJinjuJunganHall6 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-6.json";
import megaboxJinjuJunganHall7 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-7.json";
import megaboxJinjuJunganHall8 from "@data/theaters/megabox-jinju-jungan/seatmaps/hall-8.json";
import megaboxChangwonTheater from "@data/theaters/megabox-changwon/theater.json";
import megaboxChangwonSchedule from "@data/showtimes/megabox-changwon.json";
import megaboxChangwonHall1 from "@data/theaters/megabox-changwon/seatmaps/hall-1.json";
import megaboxChangwonHall2 from "@data/theaters/megabox-changwon/seatmaps/hall-2.json";
import megaboxChangwonHall3 from "@data/theaters/megabox-changwon/seatmaps/hall-3.json";
import megaboxChangwonHall4 from "@data/theaters/megabox-changwon/seatmaps/hall-4.json";
import megaboxChangwonHall5 from "@data/theaters/megabox-changwon/seatmaps/hall-5.json";
import megaboxChangwonHall6 from "@data/theaters/megabox-changwon/seatmaps/hall-6.json";
import megaboxChangwonHall7 from "@data/theaters/megabox-changwon/seatmaps/hall-7.json";
import megaboxCheongjusachangTheater from "@data/theaters/megabox-cheongjusachang/theater.json";
import megaboxCheongjusachangSchedule from "@data/showtimes/megabox-cheongjusachang.json";
import megaboxCheongjusachangHall1 from "@data/theaters/megabox-cheongjusachang/seatmaps/hall-1.json";
import megaboxCheongjusachangHall2 from "@data/theaters/megabox-cheongjusachang/seatmaps/hall-2.json";
import megaboxCheongjusachangHall3 from "@data/theaters/megabox-cheongjusachang/seatmaps/hall-3.json";
import megaboxCheongjusachangHall4 from "@data/theaters/megabox-cheongjusachang/seatmaps/hall-4.json";
import megaboxJeonjugaeksaTheater from "@data/theaters/megabox-jeonjugaeksa/theater.json";
import megaboxJeonjugaeksaSchedule from "@data/showtimes/megabox-jeonjugaeksa.json";
import megaboxJeonjugaeksaHall1 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-1.json";
import megaboxJeonjugaeksaHall2 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-2.json";
import megaboxJeonjugaeksaHall3 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-3.json";
import megaboxJeonjugaeksaHall4 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-4.json";
import megaboxJeonjugaeksaHall5 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-5.json";
import megaboxJeonjugaeksaHall6 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-6.json";
import megaboxJeonjugaeksaHall7 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-7.json";
import megaboxJeonjugaeksaHall8 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-8.json";
import megaboxJeonjugaeksaHall9 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-9.json";
import megaboxJeonjugaeksaHall10 from "@data/theaters/megabox-jeonjugaeksa/seatmaps/hall-10.json";
import megaboxSuwonTheater from "@data/theaters/megabox-suwon/theater.json";
import megaboxSuwonSchedule from "@data/showtimes/megabox-suwon.json";
import megaboxSuwonHall1 from "@data/theaters/megabox-suwon/seatmaps/hall-1.json";
import megaboxSuwonHall2 from "@data/theaters/megabox-suwon/seatmaps/hall-2.json";
import megaboxSuwonHall3 from "@data/theaters/megabox-suwon/seatmaps/hall-3.json";
import megaboxSuwonHall4 from "@data/theaters/megabox-suwon/seatmaps/hall-4.json";
import megaboxSuwonHall5 from "@data/theaters/megabox-suwon/seatmaps/hall-5.json";
import megaboxSuwonakpeulrajaSuwonyeokTheater from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/theater.json";
import megaboxSuwonakpeulrajaSuwonyeokSchedule from "@data/showtimes/megabox-suwonakpeulraja-suwonyeok.json";
import megaboxSuwonakpeulrajaSuwonyeokS01 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/s01.json";
import megaboxSuwonakpeulrajaSuwonyeokHall2 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-2.json";
import megaboxSuwonakpeulrajaSuwonyeokHall3 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-3.json";
import megaboxSuwonakpeulrajaSuwonyeokS04 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/s04.json";
import megaboxSuwonakpeulrajaSuwonyeokHall5 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-5.json";
import megaboxSuwonakpeulrajaSuwonyeokHall6 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-6.json";
import megaboxSuwonakpeulrajaSuwonyeokHall7 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-7.json";
import megaboxSuwonakpeulrajaSuwonyeokHall8 from "@data/theaters/megabox-suwonakpeulraja-suwonyeok/seatmaps/hall-8.json";
import megaboxGwangmyeongsohaTheater from "@data/theaters/megabox-gwangmyeongsoha/theater.json";
import megaboxGwangmyeongsohaSchedule from "@data/showtimes/megabox-gwangmyeongsoha.json";
import megaboxGwangmyeongsohaHall1 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-1.json";
import megaboxGwangmyeongsohaHall2 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-2.json";
import megaboxGwangmyeongsohaHall3 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-3.json";
import megaboxGwangmyeongsohaHall4 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-4.json";
import megaboxGwangmyeongsohaHall5 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-5.json";
import megaboxGwangmyeongsohaHall6 from "@data/theaters/megabox-gwangmyeongsoha/seatmaps/hall-6.json";
import megaboxJejuseogwipoTheater from "@data/theaters/megabox-jejuseogwipo/theater.json";
import megaboxJejuseogwipoSchedule from "@data/showtimes/megabox-jejuseogwipo.json";
import megaboxJejuseogwipoHall1 from "@data/theaters/megabox-jejuseogwipo/seatmaps/hall-1.json";
import megaboxJejuseogwipoHall2 from "@data/theaters/megabox-jejuseogwipo/seatmaps/hall-2.json";
import megaboxJejuseogwipoHall3 from "@data/theaters/megabox-jejuseogwipo/seatmaps/hall-3.json";
import megaboxCheonanTheater from "@data/theaters/megabox-cheonan/theater.json";
import megaboxCheonanSchedule from "@data/showtimes/megabox-cheonan.json";
import megaboxCheonanHall1 from "@data/theaters/megabox-cheonan/seatmaps/hall-1.json";
import megaboxCheonanHall2 from "@data/theaters/megabox-cheonan/seatmaps/hall-2.json";
import megaboxCheonanHall3 from "@data/theaters/megabox-cheonan/seatmaps/hall-3.json";
import megaboxCheonanHall4 from "@data/theaters/megabox-cheonan/seatmaps/hall-4.json";
import megaboxCheonanHall5 from "@data/theaters/megabox-cheonan/seatmaps/hall-5.json";
import megaboxCheonanHall6 from "@data/theaters/megabox-cheonan/seatmaps/hall-6.json";
import megaboxCheonanHall7 from "@data/theaters/megabox-cheonan/seatmaps/hall-7.json";
import megaboxCheonanHall8 from "@data/theaters/megabox-cheonan/seatmaps/hall-8.json";
import megaboxCheonanHall9 from "@data/theaters/megabox-cheonan/seatmaps/hall-9.json";
import megaboxUlsanTheater from "@data/theaters/megabox-ulsan/theater.json";
import megaboxUlsanSchedule from "@data/showtimes/megabox-ulsan.json";
import megaboxUlsanHall1 from "@data/theaters/megabox-ulsan/seatmaps/hall-1.json";
import megaboxUlsanHall2 from "@data/theaters/megabox-ulsan/seatmaps/hall-2.json";
import megaboxUlsanHall3 from "@data/theaters/megabox-ulsan/seatmaps/hall-3.json";
import megaboxUlsanHall4 from "@data/theaters/megabox-ulsan/seatmaps/hall-4.json";
import megaboxUlsanHall5 from "@data/theaters/megabox-ulsan/seatmaps/hall-5.json";
import megaboxUlsanHall6 from "@data/theaters/megabox-ulsan/seatmaps/hall-6.json";
import megaboxJejusamhwaTheater from "@data/theaters/megabox-jejusamhwa/theater.json";
import megaboxJejusamhwaSchedule from "@data/showtimes/megabox-jejusamhwa.json";
import megaboxJejusamhwaHall1 from "@data/theaters/megabox-jejusamhwa/seatmaps/hall-1.json";
import megaboxJejusamhwaHall2 from "@data/theaters/megabox-jejusamhwa/seatmaps/hall-2.json";
import megaboxJejusamhwaHall3 from "@data/theaters/megabox-jejusamhwa/seatmaps/hall-3.json";
import megaboxJejusamhwaHall4 from "@data/theaters/megabox-jejusamhwa/seatmaps/hall-4.json";
import megaboxJejusamhwaHall5 from "@data/theaters/megabox-jejusamhwa/seatmaps/hall-5.json";
import megaboxSuwoningyeTheater from "@data/theaters/megabox-suwoningye/theater.json";
import megaboxSuwoningyeSchedule from "@data/showtimes/megabox-suwoningye.json";
import megaboxSuwoningyeHall1 from "@data/theaters/megabox-suwoningye/seatmaps/hall-1.json";
import megaboxSuwoningyeHall2 from "@data/theaters/megabox-suwoningye/seatmaps/hall-2.json";
import megaboxSuwoningyeHall3 from "@data/theaters/megabox-suwoningye/seatmaps/hall-3.json";
import megaboxSuwoningyeHall4 from "@data/theaters/megabox-suwoningye/seatmaps/hall-4.json";
import megaboxSuwoningyeHall5 from "@data/theaters/megabox-suwoningye/seatmaps/hall-5.json";
import megaboxSuwoningyeHall6 from "@data/theaters/megabox-suwoningye/seatmaps/hall-6.json";
import megaboxSuwoningyeHall7 from "@data/theaters/megabox-suwoningye/seatmaps/hall-7.json";
import megaboxBusandaeTheater from "@data/theaters/megabox-busandae/theater.json";
import megaboxBusandaeSchedule from "@data/showtimes/megabox-busandae.json";
import megaboxBusandaeHall1 from "@data/theaters/megabox-busandae/seatmaps/hall-1.json";
import megaboxBusandaeHall2 from "@data/theaters/megabox-busandae/seatmaps/hall-2.json";
import megaboxBusandaeHall4 from "@data/theaters/megabox-busandae/seatmaps/hall-4.json";
import megaboxBusandaeHall5 from "@data/theaters/megabox-busandae/seatmaps/hall-5.json";
import megaboxBusandaeHall6 from "@data/theaters/megabox-busandae/seatmaps/hall-6.json";
import megaboxBusandaeHall7 from "@data/theaters/megabox-busandae/seatmaps/hall-7.json";
import megaboxSuwonseutapildeuTheater from "@data/theaters/megabox-suwonseutapildeu/theater.json";
import megaboxSuwonseutapildeuSchedule from "@data/showtimes/megabox-suwonseutapildeu.json";
import megaboxSuwonseutapildeuHall1 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/hall-1.json";
import megaboxSuwonseutapildeuHall2 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/hall-2.json";
import megaboxSuwonseutapildeuHall3 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/hall-3.json";
import megaboxSuwonseutapildeuS04 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/s04.json";
import megaboxSuwonseutapildeuHall5 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/hall-5.json";
import megaboxSuwonseutapildeuHall6 from "@data/theaters/megabox-suwonseutapildeu/seatmaps/hall-6.json";
import megaboxPyeongtaekbijeonTheater from "@data/theaters/megabox-pyeongtaekbijeon/theater.json";
import megaboxPyeongtaekbijeonSchedule from "@data/showtimes/megabox-pyeongtaekbijeon.json";
import megaboxPyeongtaekbijeonHall1 from "@data/theaters/megabox-pyeongtaekbijeon/seatmaps/hall-1.json";
import megaboxPyeongtaekbijeonHall2 from "@data/theaters/megabox-pyeongtaekbijeon/seatmaps/hall-2.json";
import megaboxPyeongtaekbijeonHall3 from "@data/theaters/megabox-pyeongtaekbijeon/seatmaps/hall-3.json";
import megaboxPyeongtaekbijeonHall4 from "@data/theaters/megabox-pyeongtaekbijeon/seatmaps/hall-4.json";
import megaboxPyeongtaekbijeonHall5 from "@data/theaters/megabox-pyeongtaekbijeon/seatmaps/hall-5.json";
import megaboxJejuaraTheater from "@data/theaters/megabox-jejuara/theater.json";
import megaboxJejuaraSchedule from "@data/showtimes/megabox-jejuara.json";
import megaboxJejuaraHall1 from "@data/theaters/megabox-jejuara/seatmaps/hall-1.json";
import megaboxJejuaraHall2 from "@data/theaters/megabox-jejuara/seatmaps/hall-2.json";
import megaboxJejuaraHall3 from "@data/theaters/megabox-jejuara/seatmaps/hall-3.json";
import megaboxJejuaraHall4 from "@data/theaters/megabox-jejuara/seatmaps/hall-4.json";
import megaboxJejuaraHall5 from "@data/theaters/megabox-jejuara/seatmaps/hall-5.json";
import megaboxJejuaraHall6 from "@data/theaters/megabox-jejuara/seatmaps/hall-6.json";
import megaboxDaegusebeunbaelriChilgokTheater from "@data/theaters/megabox-daegusebeunbaelri-chilgok/theater.json";
import megaboxDaegusebeunbaelriChilgokSchedule from "@data/showtimes/megabox-daegusebeunbaelri-chilgok.json";
import megaboxDaegusebeunbaelriChilgokHall1 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-1.json";
import megaboxDaegusebeunbaelriChilgokHall2 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-2.json";
import megaboxDaegusebeunbaelriChilgokHall3 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-3.json";
import megaboxDaegusebeunbaelriChilgokHall4 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-4.json";
import megaboxDaegusebeunbaelriChilgokHall5 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-5.json";
import megaboxDaegusebeunbaelriChilgokHall6 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-6.json";
import megaboxDaegusebeunbaelriChilgokHall7 from "@data/theaters/megabox-daegusebeunbaelri-chilgok/seatmaps/hall-7.json";
import megaboxChungjuyeonsuTheater from "@data/theaters/megabox-chungjuyeonsu/theater.json";
import megaboxChungjuyeonsuSchedule from "@data/showtimes/megabox-chungjuyeonsu.json";
import megaboxChungjuyeonsuHall1 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-1.json";
import megaboxChungjuyeonsuHall2 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-2.json";
import megaboxChungjuyeonsuHall3 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-3.json";
import megaboxChungjuyeonsuHall4 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-4.json";
import megaboxChungjuyeonsuHall5 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-5.json";
import megaboxChungjuyeonsuHall6 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-6.json";
import megaboxChungjuyeonsuHall7 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-7.json";
import megaboxChungjuyeonsuHall8 from "@data/theaters/megabox-chungjuyeonsu/seatmaps/hall-8.json";
import megaboxCheongjuseongangilTheater from "@data/theaters/megabox-cheongjuseongangil/theater.json";
import megaboxCheongjuseongangilSchedule from "@data/showtimes/megabox-cheongjuseongangil.json";
import megaboxCheongjuseongangilHall1 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-1.json";
import megaboxCheongjuseongangilHall3 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-3.json";
import megaboxCheongjuseongangilHall5 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-5.json";
import megaboxCheongjuseongangilHall6 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-6.json";
import megaboxCheongjuseongangilHall7 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-7.json";
import megaboxCheongjuseongangilHall8 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-8.json";
import megaboxCheongjuseongangilHall9 from "@data/theaters/megabox-cheongjuseongangil/seatmaps/hall-9.json";
import megaboxUijeongbuminrakTheater from "@data/theaters/megabox-uijeongbuminrak/theater.json";
import megaboxUijeongbuminrakSchedule from "@data/showtimes/megabox-uijeongbuminrak.json";
import megaboxUijeongbuminrakHall1 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-1.json";
import megaboxUijeongbuminrakHall2 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-2.json";
import megaboxUijeongbuminrakHall3 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-3.json";
import megaboxUijeongbuminrakHall4 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-4.json";
import megaboxUijeongbuminrakHall5 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-5.json";
import megaboxUijeongbuminrakHall6 from "@data/theaters/megabox-uijeongbuminrak/seatmaps/hall-6.json";
import megaboxDaegupeurimieommangyeonggwanTheater from "@data/theaters/megabox-daegupeurimieommangyeonggwan/theater.json";
import megaboxDaegupeurimieommangyeonggwanSchedule from "@data/showtimes/megabox-daegupeurimieommangyeonggwan.json";
import megaboxDaegupeurimieommangyeonggwanHall1 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-1.json";
import megaboxDaegupeurimieommangyeonggwanHall2 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-2.json";
import megaboxDaegupeurimieommangyeonggwanHall3 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-3.json";
import megaboxDaegupeurimieommangyeonggwanHall4 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-4.json";
import megaboxDaegupeurimieommangyeonggwanHall5 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-5.json";
import megaboxDaegupeurimieommangyeonggwanHall6 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-6.json";
import megaboxDaegupeurimieommangyeonggwanHall7 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-7.json";
import megaboxDaegupeurimieommangyeonggwanHall8 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-8.json";
import megaboxDaegupeurimieommangyeonggwanHall9 from "@data/theaters/megabox-daegupeurimieommangyeonggwan/seatmaps/hall-9.json";
import megaboxNampohangTheater from "@data/theaters/megabox-nampohang/theater.json";
import megaboxNampohangSchedule from "@data/showtimes/megabox-nampohang.json";
import megaboxNampohangHall1 from "@data/theaters/megabox-nampohang/seatmaps/hall-1.json";
import megaboxNampohangHall2 from "@data/theaters/megabox-nampohang/seatmaps/hall-2.json";
import megaboxNampohangHall3 from "@data/theaters/megabox-nampohang/seatmaps/hall-3.json";
import megaboxNampohangHall4 from "@data/theaters/megabox-nampohang/seatmaps/hall-4.json";
import megaboxNampohangHall5 from "@data/theaters/megabox-nampohang/seatmaps/hall-5.json";
import megaboxNampohangHall6 from "@data/theaters/megabox-nampohang/seatmaps/hall-6.json";
import megaboxMasanGyeongnamdaeTheater from "@data/theaters/megabox-masan-gyeongnamdae/theater.json";
import megaboxMasanGyeongnamdaeSchedule from "@data/showtimes/megabox-masan-gyeongnamdae.json";
import megaboxMasanGyeongnamdaeHall1 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-1.json";
import megaboxMasanGyeongnamdaeHall2 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-2.json";
import megaboxMasanGyeongnamdaeHall3 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-3.json";
import megaboxMasanGyeongnamdaeHall4 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-4.json";
import megaboxMasanGyeongnamdaeHall5 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-5.json";
import megaboxMasanGyeongnamdaeHall6 from "@data/theaters/megabox-masan-gyeongnamdae/seatmaps/hall-6.json";
import megaboxHaeundaeJangsanTheater from "@data/theaters/megabox-haeundae-jangsan/theater.json";
import megaboxHaeundaeJangsanSchedule from "@data/showtimes/megabox-haeundae-jangsan.json";
import megaboxHaeundaeJangsanHall1 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-1.json";
import megaboxHaeundaeJangsanHall2 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-2.json";
import megaboxHaeundaeJangsanHall3 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-3.json";
import megaboxHaeundaeJangsanHall4 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-4.json";
import megaboxHaeundaeJangsanHall5 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-5.json";
import megaboxHaeundaeJangsanHall6 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-6.json";
import megaboxHaeundaeJangsanHall7 from "@data/theaters/megabox-haeundae-jangsan/seatmaps/hall-7.json";
import megaboxYeongjonghaneuldosiTheater from "@data/theaters/megabox-yeongjonghaneuldosi/theater.json";
import megaboxYeongjonghaneuldosiSchedule from "@data/showtimes/megabox-yeongjonghaneuldosi.json";
import megaboxYeongjonghaneuldosiHall1 from "@data/theaters/megabox-yeongjonghaneuldosi/seatmaps/hall-1.json";
import megaboxYeongjonghaneuldosiHall2 from "@data/theaters/megabox-yeongjonghaneuldosi/seatmaps/hall-2.json";
import megaboxYeongjonghaneuldosiHall3 from "@data/theaters/megabox-yeongjonghaneuldosi/seatmaps/hall-3.json";
import megaboxSeomyeondaehanTheater from "@data/theaters/megabox-seomyeondaehan/theater.json";
import megaboxSeomyeondaehanSchedule from "@data/showtimes/megabox-seomyeondaehan.json";
import megaboxSeomyeondaehanHall1 from "@data/theaters/megabox-seomyeondaehan/seatmaps/hall-1.json";
import megaboxSeomyeondaehanHall2 from "@data/theaters/megabox-seomyeondaehan/seatmaps/hall-2.json";
import megaboxSeomyeondaehanHall3 from "@data/theaters/megabox-seomyeondaehan/seatmaps/hall-3.json";
import megaboxSeomyeondaehanHall4 from "@data/theaters/megabox-seomyeondaehan/seatmaps/hall-4.json";
import megaboxHwagokTheater from "@data/theaters/megabox-hwagok/theater.json";
import megaboxHwagokSchedule from "@data/showtimes/megabox-hwagok.json";
import megaboxHwagokHall1 from "@data/theaters/megabox-hwagok/seatmaps/hall-1.json";
import megaboxHwagokHall2 from "@data/theaters/megabox-hwagok/seatmaps/hall-2.json";
import megaboxHwagokHall3 from "@data/theaters/megabox-hwagok/seatmaps/hall-3.json";
import megaboxHwagokHall4 from "@data/theaters/megabox-hwagok/seatmaps/hall-4.json";
import megaboxHwagokHall5 from "@data/theaters/megabox-hwagok/seatmaps/hall-5.json";
import megaboxMisagangbyeonHanamjonghapundongjangTheater from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/theater.json";
import megaboxMisagangbyeonHanamjonghapundongjangSchedule from "@data/showtimes/megabox-misagangbyeon-hanamjonghapundongjang.json";
import megaboxMisagangbyeonHanamjonghapundongjangHall1 from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/seatmaps/hall-1.json";
import megaboxMisagangbyeonHanamjonghapundongjangHall2 from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/seatmaps/hall-2.json";
import megaboxMisagangbyeonHanamjonghapundongjangHall3 from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/seatmaps/hall-3.json";
import megaboxMisagangbyeonHanamjonghapundongjangHall4 from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/seatmaps/hall-4.json";
import megaboxMisagangbyeonHanamjonghapundongjangHall5 from "@data/theaters/megabox-misagangbyeon-hanamjonghapundongjang/seatmaps/hall-5.json";
import megaboxIncheonhakikSitiossielTheater from "@data/theaters/megabox-incheonhakik-sitiossiel/theater.json";
import megaboxIncheonhakikSitiossielSchedule from "@data/showtimes/megabox-incheonhakik-sitiossiel.json";
import megaboxIncheonhakikSitiossielHall1 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-1.json";
import megaboxIncheonhakikSitiossielHall2 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-2.json";
import megaboxIncheonhakikSitiossielHall3 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-3.json";
import megaboxIncheonhakikSitiossielHall4 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-4.json";
import megaboxIncheonhakikSitiossielHall5 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-5.json";
import megaboxIncheonhakikSitiossielHall6 from "@data/theaters/megabox-incheonhakik-sitiossiel/seatmaps/hall-6.json";
import megaboxSeongnammoranTheater from "@data/theaters/megabox-seongnammoran/theater.json";
import megaboxSeongnammoranSchedule from "@data/showtimes/megabox-seongnammoran.json";
import megaboxSeongnammoranHall1 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-1.json";
import megaboxSeongnammoranHall2 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-2.json";
import megaboxSeongnammoranHall3 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-3.json";
import megaboxSeongnammoranHall4 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-4.json";
import megaboxSeongnammoranHall5 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-5.json";
import megaboxSeongnammoranHall6 from "@data/theaters/megabox-seongnammoran/seatmaps/hall-6.json";
import megaboxHwamyeongTheater from "@data/theaters/megabox-hwamyeong/theater.json";
import megaboxHwamyeongSchedule from "@data/showtimes/megabox-hwamyeong.json";
import megaboxHwamyeongHall1 from "@data/theaters/megabox-hwamyeong/seatmaps/hall-1.json";
import megaboxHwamyeongHall2 from "@data/theaters/megabox-hwamyeong/seatmaps/hall-2.json";
import megaboxHwamyeongHall3 from "@data/theaters/megabox-hwamyeong/seatmaps/hall-3.json";
import megaboxHwamyeongHall4 from "@data/theaters/megabox-hwamyeong/seatmaps/hall-4.json";
import megaboxHwamyeongHall6 from "@data/theaters/megabox-hwamyeong/seatmaps/hall-6.json";
import megaboxSiheungjeongwangTheater from "@data/theaters/megabox-siheungjeongwang/theater.json";
import megaboxSiheungjeongwangSchedule from "@data/showtimes/megabox-siheungjeongwang.json";
import megaboxSiheungjeongwangHall1 from "@data/theaters/megabox-siheungjeongwang/seatmaps/hall-1.json";
import megaboxSiheungjeongwangHall2 from "@data/theaters/megabox-siheungjeongwang/seatmaps/hall-2.json";
import megaboxSiheungjeongwangHall3 from "@data/theaters/megabox-siheungjeongwang/seatmaps/hall-3.json";
import megaboxSiheungjeongwangHall4 from "@data/theaters/megabox-siheungjeongwang/seatmaps/hall-4.json";
import megaboxSiheungjeongwangHall5 from "@data/theaters/megabox-siheungjeongwang/seatmaps/hall-5.json";
import megaboxDongtanyeokTheater from "@data/theaters/megabox-dongtanyeok/theater.json";
import megaboxDongtanyeokSchedule from "@data/showtimes/megabox-dongtanyeok.json";
import megaboxDongtanyeokHall1 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-1.json";
import megaboxDongtanyeokHall2 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-2.json";
import megaboxDongtanyeokHall3 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-3.json";
import megaboxDongtanyeokHall4 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-4.json";
import megaboxDongtanyeokHall5 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-5.json";
import megaboxDongtanyeokHall6 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-6.json";
import megaboxDongtanyeokHall7 from "@data/theaters/megabox-dongtanyeok/seatmaps/hall-7.json";
import megaboxGuuiiseuteupolTheater from "@data/theaters/megabox-guuiiseuteupol/theater.json";
import megaboxGuuiiseuteupolSchedule from "@data/showtimes/megabox-guuiiseuteupol.json";
import megaboxGuuiiseuteupolS01 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/s01.json";
import megaboxGuuiiseuteupolHall2 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-2.json";
import megaboxGuuiiseuteupolHall3 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-3.json";
import megaboxGuuiiseuteupolHall4 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-4.json";
import megaboxGuuiiseuteupolHall5 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-5.json";
import megaboxGuuiiseuteupolHall6 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-6.json";
import megaboxGuuiiseuteupolHall7 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-7.json";
import megaboxGuuiiseuteupolHall8 from "@data/theaters/megabox-guuiiseuteupol/seatmaps/hall-8.json";
import megaboxCheongjuteomineolTheater from "@data/theaters/megabox-cheongjuteomineol/theater.json";
import megaboxCheongjuteomineolSchedule from "@data/showtimes/megabox-cheongjuteomineol.json";
import megaboxCheongjuteomineolHall1 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-1.json";
import megaboxCheongjuteomineolHall2 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-2.json";
import megaboxCheongjuteomineolHall3 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-3.json";
import megaboxCheongjuteomineolHall4 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-4.json";
import megaboxCheongjuteomineolHall5 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-5.json";
import megaboxCheongjuteomineolHall6 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/hall-6.json";
import megaboxCheongjuteomineolS07 from "@data/theaters/megabox-cheongjuteomineol/seatmaps/s07.json";
import megaboxYangsanTheater from "@data/theaters/megabox-yangsan/theater.json";
import megaboxYangsanSchedule from "@data/showtimes/megabox-yangsan.json";
import megaboxYangsanHall1 from "@data/theaters/megabox-yangsan/seatmaps/hall-1.json";
import megaboxYangsanHall2 from "@data/theaters/megabox-yangsan/seatmaps/hall-2.json";
import megaboxYangsanHall3 from "@data/theaters/megabox-yangsan/seatmaps/hall-3.json";
import megaboxYangsanHall4 from "@data/theaters/megabox-yangsan/seatmaps/hall-4.json";
import megaboxYangsanHall5 from "@data/theaters/megabox-yangsan/seatmaps/hall-5.json";
import megaboxYangsanHall6 from "@data/theaters/megabox-yangsan/seatmaps/hall-6.json";
import megaboxIsuTheater from "@data/theaters/megabox-isu/theater.json";
import megaboxIsuSchedule from "@data/showtimes/megabox-isu.json";
import megaboxIsuHall1 from "@data/theaters/megabox-isu/seatmaps/hall-1.json";
import megaboxIsuHall2 from "@data/theaters/megabox-isu/seatmaps/hall-2.json";
import megaboxIsuHall3 from "@data/theaters/megabox-isu/seatmaps/hall-3.json";
import megaboxIsuHall4 from "@data/theaters/megabox-isu/seatmaps/hall-4.json";
import megaboxIsuHall5 from "@data/theaters/megabox-isu/seatmaps/hall-5.json";
import megaboxIsuHall6 from "@data/theaters/megabox-isu/seatmaps/hall-6.json";
import megaboxSangamwoldeukeopgyeonggijangTheater from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/theater.json";
import megaboxSangamwoldeukeopgyeonggijangSchedule from "@data/showtimes/megabox-sangamwoldeukeopgyeonggijang.json";
import megaboxSangamwoldeukeopgyeonggijangHall1 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-1.json";
import megaboxSangamwoldeukeopgyeonggijangS02 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/s02.json";
import megaboxSangamwoldeukeopgyeonggijangHall3 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-3.json";
import megaboxSangamwoldeukeopgyeonggijangHall4 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-4.json";
import megaboxSangamwoldeukeopgyeonggijangHall5 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-5.json";
import megaboxSangamwoldeukeopgyeonggijangHall6 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-6.json";
import megaboxSangamwoldeukeopgyeonggijangHall7 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-7.json";
import megaboxSangamwoldeukeopgyeonggijangHall8 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-8.json";
import megaboxSangamwoldeukeopgyeonggijangHall9 from "@data/theaters/megabox-sangamwoldeukeopgyeonggijang/seatmaps/hall-9.json";
import megaboxHongdaeAnimeTheater from "@data/theaters/megabox-hongdae-anime/theater.json";
import megaboxHongdaeAnimeSchedule from "@data/showtimes/megabox-hongdae-anime.json";
import megaboxHongdaeAnimeHall1 from "@data/theaters/megabox-hongdae-anime/seatmaps/hall-1.json";
import megaboxHongdaeAnimeHall2 from "@data/theaters/megabox-hongdae-anime/seatmaps/hall-2.json";
import megaboxHongdaeAnimeHall3 from "@data/theaters/megabox-hongdae-anime/seatmaps/hall-3.json";
import megaboxHongdaeAnimeHall4 from "@data/theaters/megabox-hongdae-anime/seatmaps/hall-4.json";
import megaboxHongdaeAnimeHall5 from "@data/theaters/megabox-hongdae-anime/seatmaps/hall-5.json";
import megaboxSangbongTheater from "@data/theaters/megabox-sangbong/theater.json";
import megaboxSangbongSchedule from "@data/showtimes/megabox-sangbong.json";
import megaboxSangbongHall1 from "@data/theaters/megabox-sangbong/seatmaps/hall-1.json";
import megaboxSangbongHall2 from "@data/theaters/megabox-sangbong/seatmaps/hall-2.json";
import megaboxSangbongHall3 from "@data/theaters/megabox-sangbong/seatmaps/hall-3.json";
import megaboxSangbongHall4 from "@data/theaters/megabox-sangbong/seatmaps/hall-4.json";
import megaboxGangdongTheater from "@data/theaters/megabox-gangdong/theater.json";
import megaboxGangdongSchedule from "@data/showtimes/megabox-gangdong.json";
import megaboxGangdongHall1 from "@data/theaters/megabox-gangdong/seatmaps/hall-1.json";
import megaboxGangdongHall2 from "@data/theaters/megabox-gangdong/seatmaps/hall-2.json";
import megaboxGangdongHall3 from "@data/theaters/megabox-gangdong/seatmaps/hall-3.json";
import megaboxGangdongHall4 from "@data/theaters/megabox-gangdong/seatmaps/hall-4.json";
import megaboxKoekseuTheater from "@data/theaters/megabox-koekseu/theater.json";
import megaboxKoekseuSchedule from "@data/showtimes/megabox-koekseu.json";
import megaboxKoekseuS01 from "@data/theaters/megabox-koekseu/seatmaps/s01.json";
import megaboxKoekseuHall2 from "@data/theaters/megabox-koekseu/seatmaps/hall-2.json";
import megaboxKoekseuHall3 from "@data/theaters/megabox-koekseu/seatmaps/hall-3.json";
import megaboxKoekseuHall4 from "@data/theaters/megabox-koekseu/seatmaps/hall-4.json";
import megaboxKoekseuHall5 from "@data/theaters/megabox-koekseu/seatmaps/hall-5.json";
import megaboxKoekseuHall6 from "@data/theaters/megabox-koekseu/seatmaps/hall-6.json";
import megaboxKoekseuHall7 from "@data/theaters/megabox-koekseu/seatmaps/hall-7.json";
import megaboxKoekseuHall8 from "@data/theaters/megabox-koekseu/seatmaps/hall-8.json";
import megaboxKoekseuS09 from "@data/theaters/megabox-koekseu/seatmaps/s09.json";
import megaboxKoekseuHall10 from "@data/theaters/megabox-koekseu/seatmaps/hall-10.json";
import megaboxKoekseuHall11 from "@data/theaters/megabox-koekseu/seatmaps/hall-11.json";
import megaboxKoekseuS12 from "@data/theaters/megabox-koekseu/seatmaps/s12.json";
import megaboxKoekseuS13 from "@data/theaters/megabox-koekseu/seatmaps/s13.json";
import megaboxKoekseuS14 from "@data/theaters/megabox-koekseu/seatmaps/s14.json";
import megaboxKoekseuS15 from "@data/theaters/megabox-koekseu/seatmaps/s15.json";
import megaboxKoekseuS16 from "@data/theaters/megabox-koekseu/seatmaps/s16.json";
import megaboxKoekseuS17 from "@data/theaters/megabox-koekseu/seatmaps/s17.json";
import megaboxKoekseuS18 from "@data/theaters/megabox-koekseu/seatmaps/s18.json";
import megaboxSenteureolTheater from "@data/theaters/megabox-senteureol/theater.json";
import megaboxSenteureolSchedule from "@data/showtimes/megabox-senteureol.json";
import megaboxSenteureolS01 from "@data/theaters/megabox-senteureol/seatmaps/s01.json";
import megaboxSenteureolS02 from "@data/theaters/megabox-senteureol/seatmaps/s02.json";
import megaboxSenteureolS03 from "@data/theaters/megabox-senteureol/seatmaps/s03.json";
import megaboxSenteureolS04 from "@data/theaters/megabox-senteureol/seatmaps/s04.json";
import megaboxSenteureolS05 from "@data/theaters/megabox-senteureol/seatmaps/s05.json";
import megaboxGangnamTheater from "@data/theaters/megabox-gangnam/theater.json";
import megaboxGangnamSchedule from "@data/showtimes/megabox-gangnam.json";
import megaboxGangnamHall1 from "@data/theaters/megabox-gangnam/seatmaps/hall-1.json";
import megaboxGangnamHall2 from "@data/theaters/megabox-gangnam/seatmaps/hall-2.json";
import megaboxGangnamHall3 from "@data/theaters/megabox-gangnam/seatmaps/hall-3.json";
import megaboxGangnamHall4 from "@data/theaters/megabox-gangnam/seatmaps/hall-4.json";
import megaboxGangnamHall5 from "@data/theaters/megabox-gangnam/seatmaps/hall-5.json";
import megaboxGangnamHall6 from "@data/theaters/megabox-gangnam/seatmaps/hall-6.json";
import megaboxGangnamHall7 from "@data/theaters/megabox-gangnam/seatmaps/hall-7.json";
import megaboxSongpapakeuhabioTheater from "@data/theaters/megabox-songpapakeuhabio/theater.json";
import megaboxSongpapakeuhabioSchedule from "@data/showtimes/megabox-songpapakeuhabio.json";
import megaboxSongpapakeuhabioHall1 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-1.json";
import megaboxSongpapakeuhabioHall2 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-2.json";
import megaboxSongpapakeuhabioHall3 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-3.json";
import megaboxSongpapakeuhabioHall4 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-4.json";
import megaboxSongpapakeuhabioHall5 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-5.json";
import megaboxSongpapakeuhabioHall6 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-6.json";
import megaboxSongpapakeuhabioHall7 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-7.json";
import megaboxSongpapakeuhabioHall8 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-8.json";
import megaboxSongpapakeuhabioHall9 from "@data/theaters/megabox-songpapakeuhabio/seatmaps/hall-9.json";
import megaboxGunjaTheater from "@data/theaters/megabox-gunja/theater.json";
import megaboxGunjaSchedule from "@data/showtimes/megabox-gunja.json";
import megaboxGunjaHall1 from "@data/theaters/megabox-gunja/seatmaps/hall-1.json";
import megaboxGunjaHall3 from "@data/theaters/megabox-gunja/seatmaps/hall-3.json";
import megaboxGunjaHall4 from "@data/theaters/megabox-gunja/seatmaps/hall-4.json";
import megaboxGunjaHall5 from "@data/theaters/megabox-gunja/seatmaps/hall-5.json";
import megaboxGunjaHall6 from "@data/theaters/megabox-gunja/seatmaps/hall-6.json";
import megaboxGunjaHall7 from "@data/theaters/megabox-gunja/seatmaps/hall-7.json";
import megaboxGunjaHall8 from "@data/theaters/megabox-gunja/seatmaps/hall-8.json";
import megaboxGunjaHall9 from "@data/theaters/megabox-gunja/seatmaps/hall-9.json";
import megaboxGunjaHall10 from "@data/theaters/megabox-gunja/seatmaps/hall-10.json";
import megaboxMagokTheater from "@data/theaters/megabox-magok/theater.json";
import megaboxMagokSchedule from "@data/showtimes/megabox-magok.json";
import megaboxMagokHall1 from "@data/theaters/megabox-magok/seatmaps/hall-1.json";
import megaboxMagokHall2 from "@data/theaters/megabox-magok/seatmaps/hall-2.json";
import megaboxMagokHall3 from "@data/theaters/megabox-magok/seatmaps/hall-3.json";
import megaboxMagokHall4 from "@data/theaters/megabox-magok/seatmaps/hall-4.json";
import megaboxMagokHall5 from "@data/theaters/megabox-magok/seatmaps/hall-5.json";
import megaboxMagokHall6 from "@data/theaters/megabox-magok/seatmaps/hall-6.json";
import megaboxMokdongTheater from "@data/theaters/megabox-mokdong/theater.json";
import megaboxMokdongSchedule from "@data/showtimes/megabox-mokdong.json";
import megaboxMokdongS01 from "@data/theaters/megabox-mokdong/seatmaps/s01.json";
import megaboxMokdongHall2 from "@data/theaters/megabox-mokdong/seatmaps/hall-2.json";
import megaboxMokdongHall3 from "@data/theaters/megabox-mokdong/seatmaps/hall-3.json";
import megaboxMokdongHall4 from "@data/theaters/megabox-mokdong/seatmaps/hall-4.json";
import megaboxMokdongHall5 from "@data/theaters/megabox-mokdong/seatmaps/hall-5.json";
import megaboxMokdongHall6 from "@data/theaters/megabox-mokdong/seatmaps/hall-6.json";
import megaboxMokdongHall7 from "@data/theaters/megabox-mokdong/seatmaps/hall-7.json";
import megaboxMokdongHall8 from "@data/theaters/megabox-mokdong/seatmaps/hall-8.json";
import megaboxMokdongHall9 from "@data/theaters/megabox-mokdong/seatmaps/hall-9.json";
import megaboxNamchuncheonTheater from "@data/theaters/megabox-namchuncheon/theater.json";
import megaboxNamchuncheonSchedule from "@data/showtimes/megabox-namchuncheon.json";
import megaboxNamchuncheonHall1 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-1.json";
import megaboxNamchuncheonHall2 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-2.json";
import megaboxNamchuncheonHall3 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-3.json";
import megaboxNamchuncheonHall4 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-4.json";
import megaboxNamchuncheonHall5 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-5.json";
import megaboxNamchuncheonHall6 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-6.json";
import megaboxNamchuncheonHall7 from "@data/theaters/megabox-namchuncheon/seatmaps/hall-7.json";
import megaboxSokchoTheater from "@data/theaters/megabox-sokcho/theater.json";
import megaboxSokchoSchedule from "@data/showtimes/megabox-sokcho.json";
import megaboxSokchoHall1 from "@data/theaters/megabox-sokcho/seatmaps/hall-1.json";
import megaboxSokchoHall2 from "@data/theaters/megabox-sokcho/seatmaps/hall-2.json";
import megaboxSokchoHall3 from "@data/theaters/megabox-sokcho/seatmaps/hall-3.json";
import megaboxSokchoHall4 from "@data/theaters/megabox-sokcho/seatmaps/hall-4.json";
import megaboxSokchoHall5 from "@data/theaters/megabox-sokcho/seatmaps/hall-5.json";
import megaboxWonjuhyeoksinTheater from "@data/theaters/megabox-wonjuhyeoksin/theater.json";
import megaboxWonjuhyeoksinSchedule from "@data/showtimes/megabox-wonjuhyeoksin.json";
import megaboxWonjuhyeoksinHall1 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-1.json";
import megaboxWonjuhyeoksinHall2 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-2.json";
import megaboxWonjuhyeoksinHall3 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-3.json";
import megaboxWonjuhyeoksinHall4 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-4.json";
import megaboxWonjuhyeoksinHall5 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-5.json";
import megaboxWonjuhyeoksinHall6 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-6.json";
import megaboxWonjuhyeoksinHall7 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-7.json";
import megaboxWonjuhyeoksinHall8 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-8.json";
import megaboxWonjuhyeoksinHall9 from "@data/theaters/megabox-wonjuhyeoksin/seatmaps/hall-9.json";
import megaboxDaejeonjungangroTheater from "@data/theaters/megabox-daejeonjungangro/theater.json";
import megaboxDaejeonjungangroSchedule from "@data/showtimes/megabox-daejeonjungangro.json";
import megaboxDaejeonjungangroHall1 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-1.json";
import megaboxDaejeonjungangroHall2 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-2.json";
import megaboxDaejeonjungangroHall3 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-3.json";
import megaboxDaejeonjungangroHall4 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-4.json";
import megaboxDaejeonjungangroHall5 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-5.json";
import megaboxDaejeonjungangroHall6 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-6.json";
import megaboxDaejeonjungangroHall7 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-7.json";
import megaboxDaejeonjungangroHall8 from "@data/theaters/megabox-daejeonjungangro/seatmaps/hall-8.json";
import megaboxGongjuTheater from "@data/theaters/megabox-gongju/theater.json";
import megaboxGongjuSchedule from "@data/showtimes/megabox-gongju.json";
import megaboxGongjuHall1 from "@data/theaters/megabox-gongju/seatmaps/hall-1.json";
import megaboxGongjuHall2 from "@data/theaters/megabox-gongju/seatmaps/hall-2.json";
import megaboxGongjuHall3 from "@data/theaters/megabox-gongju/seatmaps/hall-3.json";
import megaboxGongjuHall4 from "@data/theaters/megabox-gongju/seatmaps/hall-4.json";
import megaboxGongjuHall5 from "@data/theaters/megabox-gongju/seatmaps/hall-5.json";
import megaboxGongjuHall6 from "@data/theaters/megabox-gongju/seatmaps/hall-6.json";
import megaboxGongjuHall7 from "@data/theaters/megabox-gongju/seatmaps/hall-7.json";
import megaboxSejongJochiwonTheater from "@data/theaters/megabox-sejong-jochiwon/theater.json";
import megaboxSejongJochiwonSchedule from "@data/showtimes/megabox-sejong-jochiwon.json";
import megaboxSejongJochiwonHall1 from "@data/theaters/megabox-sejong-jochiwon/seatmaps/hall-1.json";
import megaboxSejongJochiwonHall2 from "@data/theaters/megabox-sejong-jochiwon/seatmaps/hall-2.json";
import megaboxSejongJochiwonHall3 from "@data/theaters/megabox-sejong-jochiwon/seatmaps/hall-3.json";
import megaboxSejongJochiwonHall4 from "@data/theaters/megabox-sejong-jochiwon/seatmaps/hall-4.json";
import megaboxSejongJochiwonHall5 from "@data/theaters/megabox-sejong-jochiwon/seatmaps/hall-5.json";
import megaboxSejongnaseongTheater from "@data/theaters/megabox-sejongnaseong/theater.json";
import megaboxSejongnaseongSchedule from "@data/showtimes/megabox-sejongnaseong.json";
import megaboxSejongnaseongHall1 from "@data/theaters/megabox-sejongnaseong/seatmaps/hall-1.json";
import megaboxSejongnaseongHall2 from "@data/theaters/megabox-sejongnaseong/seatmaps/hall-2.json";
import megaboxSejongnaseongHall3 from "@data/theaters/megabox-sejongnaseong/seatmaps/hall-3.json";
import megaboxSejongnaseongHall4 from "@data/theaters/megabox-sejongnaseong/seatmaps/hall-4.json";
import megaboxSejongnaseongHall5 from "@data/theaters/megabox-sejongnaseong/seatmaps/hall-5.json";
import megaboxHongseongnaepoTheater from "@data/theaters/megabox-hongseongnaepo/theater.json";
import megaboxHongseongnaepoSchedule from "@data/showtimes/megabox-hongseongnaepo.json";
import megaboxHongseongnaepoHall1 from "@data/theaters/megabox-hongseongnaepo/seatmaps/hall-1.json";
import megaboxHongseongnaepoHall2 from "@data/theaters/megabox-hongseongnaepo/seatmaps/hall-2.json";
import megaboxHongseongnaepoHall3 from "@data/theaters/megabox-hongseongnaepo/seatmaps/hall-3.json";
import megaboxHongseongnaepoHall4 from "@data/theaters/megabox-hongseongnaepo/seatmaps/hall-4.json";
import megaboxHongseongnaepoHall5 from "@data/theaters/megabox-hongseongnaepo/seatmaps/hall-5.json";
import megaboxOchangTheater from "@data/theaters/megabox-ochang/theater.json";
import megaboxOchangSchedule from "@data/showtimes/megabox-ochang.json";
import megaboxOchangHall1 from "@data/theaters/megabox-ochang/seatmaps/hall-1.json";
import megaboxOchangHall2 from "@data/theaters/megabox-ochang/seatmaps/hall-2.json";
import megaboxOchangHall3 from "@data/theaters/megabox-ochang/seatmaps/hall-3.json";
import megaboxOchangHall4 from "@data/theaters/megabox-ochang/seatmaps/hall-4.json";
import megaboxOchangHall5 from "@data/theaters/megabox-ochang/seatmaps/hall-5.json";
import megaboxOchangHall6 from "@data/theaters/megabox-ochang/seatmaps/hall-6.json";
import megaboxOchangHall7 from "@data/theaters/megabox-ochang/seatmaps/hall-7.json";
import megaboxOchangHall8 from "@data/theaters/megabox-ochang/seatmaps/hall-8.json";
import megaboxJincheonTheater from "@data/theaters/megabox-jincheon/theater.json";
import megaboxJincheonSchedule from "@data/showtimes/megabox-jincheon.json";
import megaboxJincheonHall1 from "@data/theaters/megabox-jincheon/seatmaps/hall-1.json";
import megaboxJincheonHall2 from "@data/theaters/megabox-jincheon/seatmaps/hall-2.json";
import megaboxJincheonHall3 from "@data/theaters/megabox-jincheon/seatmaps/hall-3.json";
import megaboxJincheonHall4 from "@data/theaters/megabox-jincheon/seatmaps/hall-4.json";
import megaboxGeomdanTheater from "@data/theaters/megabox-geomdan/theater.json";
import megaboxGeomdanSchedule from "@data/showtimes/megabox-geomdan.json";
import megaboxGeomdanHall1 from "@data/theaters/megabox-geomdan/seatmaps/hall-1.json";
import megaboxGeomdanHall2 from "@data/theaters/megabox-geomdan/seatmaps/hall-2.json";
import megaboxGeomdanHall3 from "@data/theaters/megabox-geomdan/seatmaps/hall-3.json";
import megaboxGeomdanHall4 from "@data/theaters/megabox-geomdan/seatmaps/hall-4.json";
import megaboxGeomdanHall5 from "@data/theaters/megabox-geomdan/seatmaps/hall-5.json";
import megaboxIncheonnonhyeonTheater from "@data/theaters/megabox-incheonnonhyeon/theater.json";
import megaboxIncheonnonhyeonSchedule from "@data/showtimes/megabox-incheonnonhyeon.json";
import megaboxIncheonnonhyeonHall1 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-1.json";
import megaboxIncheonnonhyeonHall2 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-2.json";
import megaboxIncheonnonhyeonHall3 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-3.json";
import megaboxIncheonnonhyeonHall4 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-4.json";
import megaboxIncheonnonhyeonHall5 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-5.json";
import megaboxIncheonnonhyeonHall6 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-6.json";
import megaboxIncheonnonhyeonHall7 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-7.json";
import megaboxIncheonnonhyeonHall8 from "@data/theaters/megabox-incheonnonhyeon/seatmaps/hall-8.json";
import megaboxSongdoTeuripeulseuteuriteuTheater from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/theater.json";
import megaboxSongdoTeuripeulseuteuriteuSchedule from "@data/showtimes/megabox-songdo-teuripeulseuteuriteu.json";
import megaboxSongdoTeuripeulseuteuriteuHall1 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-1.json";
import megaboxSongdoTeuripeulseuteuriteuHall2 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-2.json";
import megaboxSongdoTeuripeulseuteuriteuHall3 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-3.json";
import megaboxSongdoTeuripeulseuteuriteuHall4 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-4.json";
import megaboxSongdoTeuripeulseuteuriteuHall5 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-5.json";
import megaboxSongdoTeuripeulseuteuriteuS06 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/s06.json";
import megaboxSongdoTeuripeulseuteuriteuHall7 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-7.json";
import megaboxSongdoTeuripeulseuteuriteuHall8 from "@data/theaters/megabox-songdo-teuripeulseuteuriteu/seatmaps/hall-8.json";
import megaboxBaekseokbelrasitaTheater from "@data/theaters/megabox-baekseokbelrasita/theater.json";
import megaboxBaekseokbelrasitaSchedule from "@data/showtimes/megabox-baekseokbelrasita.json";
import megaboxBaekseokbelrasitaS01 from "@data/theaters/megabox-baekseokbelrasita/seatmaps/s01.json";
import megaboxBaekseokbelrasitaS02 from "@data/theaters/megabox-baekseokbelrasita/seatmaps/s02.json";
import megaboxBaekseokbelrasitaS03 from "@data/theaters/megabox-baekseokbelrasita/seatmaps/s03.json";
import megaboxBaekseokbelrasitaS04 from "@data/theaters/megabox-baekseokbelrasita/seatmaps/s04.json";
import megaboxBaekseokbelrasitaS05 from "@data/theaters/megabox-baekseokbelrasita/seatmaps/s05.json";
import megaboxKintekseuTheater from "@data/theaters/megabox-kintekseu/theater.json";
import megaboxKintekseuSchedule from "@data/showtimes/megabox-kintekseu.json";
import megaboxKintekseuS02 from "@data/theaters/megabox-kintekseu/seatmaps/s02.json";
import megaboxKintekseuHall3 from "@data/theaters/megabox-kintekseu/seatmaps/hall-3.json";
import megaboxKintekseuHall4 from "@data/theaters/megabox-kintekseu/seatmaps/hall-4.json";
import megaboxKintekseuHall5 from "@data/theaters/megabox-kintekseu/seatmaps/hall-5.json";
import megaboxKintekseuHall6 from "@data/theaters/megabox-kintekseu/seatmaps/hall-6.json";
import megaboxKintekseuHall7 from "@data/theaters/megabox-kintekseu/seatmaps/hall-7.json";
import megaboxKintekseuHall8 from "@data/theaters/megabox-kintekseu/seatmaps/hall-8.json";
import megaboxPajuunjeongTheater from "@data/theaters/megabox-pajuunjeong/theater.json";
import megaboxPajuunjeongSchedule from "@data/showtimes/megabox-pajuunjeong.json";
import megaboxPajuunjeongHall1 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-1.json";
import megaboxPajuunjeongHall2 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-2.json";
import megaboxPajuunjeongHall3 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-3.json";
import megaboxPajuunjeongHall4 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-4.json";
import megaboxPajuunjeongHall5 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-5.json";
import megaboxPajuunjeongHall6 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-6.json";
import megaboxPajuunjeongHall7 from "@data/theaters/megabox-pajuunjeong/seatmaps/hall-7.json";
import megaboxGoyangseutapildeuTheater from "@data/theaters/megabox-goyangseutapildeu/theater.json";
import megaboxGoyangseutapildeuSchedule from "@data/showtimes/megabox-goyangseutapildeu.json";
import megaboxGoyangseutapildeuHall1 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-1.json";
import megaboxGoyangseutapildeuHall2 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-2.json";
import megaboxGoyangseutapildeuHall3 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-3.json";
import megaboxGoyangseutapildeuHall4 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-4.json";
import megaboxGoyangseutapildeuHall5 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-5.json";
import megaboxGoyangseutapildeuS06 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/s06.json";
import megaboxGoyangseutapildeuHall7 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-7.json";
import megaboxGoyangseutapildeuHall8 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-8.json";
import megaboxGoyangseutapildeuHall9 from "@data/theaters/megabox-goyangseutapildeu/seatmaps/hall-9.json";
import megaboxPajugeumchonTheater from "@data/theaters/megabox-pajugeumchon/theater.json";
import megaboxPajugeumchonSchedule from "@data/showtimes/megabox-pajugeumchon.json";
import megaboxPajugeumchonHall1 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-1.json";
import megaboxPajugeumchonHall2 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-2.json";
import megaboxPajugeumchonHall3 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-3.json";
import megaboxPajugeumchonHall4 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-4.json";
import megaboxPajugeumchonHall5 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-5.json";
import megaboxPajugeumchonHall6 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-6.json";
import megaboxPajugeumchonHall7 from "@data/theaters/megabox-pajugeumchon/seatmaps/hall-7.json";
import megaboxGimpohangangsindosiTheater from "@data/theaters/megabox-gimpohangangsindosi/theater.json";
import megaboxGimpohangangsindosiSchedule from "@data/showtimes/megabox-gimpohangangsindosi.json";
import megaboxGimpohangangsindosiHall1 from "@data/theaters/megabox-gimpohangangsindosi/seatmaps/hall-1.json";
import megaboxGimpohangangsindosiHall2 from "@data/theaters/megabox-gimpohangangsindosi/seatmaps/hall-2.json";
import megaboxGimpohangangsindosiHall3 from "@data/theaters/megabox-gimpohangangsindosi/seatmaps/hall-3.json";
import megaboxGimpohangangsindosiHall4 from "@data/theaters/megabox-gimpohangangsindosi/seatmaps/hall-4.json";
import megaboxGimpohangangsindosiHall5 from "@data/theaters/megabox-gimpohangangsindosi/seatmaps/hall-5.json";
import megaboxBucheonseutapildeusitiTheater from "@data/theaters/megabox-bucheonseutapildeusiti/theater.json";
import megaboxBucheonseutapildeusitiSchedule from "@data/showtimes/megabox-bucheonseutapildeusiti.json";
import megaboxBucheonseutapildeusitiHall1 from "@data/theaters/megabox-bucheonseutapildeusiti/seatmaps/hall-1.json";
import megaboxBucheonseutapildeusitiHall2 from "@data/theaters/megabox-bucheonseutapildeusiti/seatmaps/hall-2.json";
import megaboxBucheonseutapildeusitiHall3 from "@data/theaters/megabox-bucheonseutapildeusiti/seatmaps/hall-3.json";
import megaboxBucheonseutapildeusitiHall4 from "@data/theaters/megabox-bucheonseutapildeusiti/seatmaps/hall-4.json";
import megaboxBucheonseutapildeusitiHall5 from "@data/theaters/megabox-bucheonseutapildeusiti/seatmaps/hall-5.json";
import megaboxAnsanjungangTheater from "@data/theaters/megabox-ansanjungang/theater.json";
import megaboxAnsanjungangSchedule from "@data/showtimes/megabox-ansanjungang.json";
import megaboxAnsanjungangHall1 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-1.json";
import megaboxAnsanjungangHall2 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-2.json";
import megaboxAnsanjungangHall3 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-3.json";
import megaboxAnsanjungangHall4 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-4.json";
import megaboxAnsanjungangHall5 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-5.json";
import megaboxAnsanjungangHall6 from "@data/theaters/megabox-ansanjungang/seatmaps/hall-6.json";
import megaboxSiheungbaegotTheater from "@data/theaters/megabox-siheungbaegot/theater.json";
import megaboxSiheungbaegotSchedule from "@data/showtimes/megabox-siheungbaegot.json";
import megaboxSiheungbaegotHall1 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-1.json";
import megaboxSiheungbaegotHall2 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-2.json";
import megaboxSiheungbaegotHall3 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-3.json";
import megaboxSiheungbaegotHall4 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-4.json";
import megaboxSiheungbaegotHall5 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-5.json";
import megaboxSiheungbaegotHall6 from "@data/theaters/megabox-siheungbaegot/seatmaps/hall-6.json";
import megaboxDongtanTheater from "@data/theaters/megabox-dongtan/theater.json";
import megaboxDongtanSchedule from "@data/showtimes/megabox-dongtan.json";
import megaboxDongtanHall1 from "@data/theaters/megabox-dongtan/seatmaps/hall-1.json";
import megaboxDongtanHall2 from "@data/theaters/megabox-dongtan/seatmaps/hall-2.json";
import megaboxDongtanHall3 from "@data/theaters/megabox-dongtan/seatmaps/hall-3.json";
import megaboxDongtanHall4 from "@data/theaters/megabox-dongtan/seatmaps/hall-4.json";
import megaboxDongtanHall5 from "@data/theaters/megabox-dongtan/seatmaps/hall-5.json";
import megaboxDongtanHall6 from "@data/theaters/megabox-dongtan/seatmaps/hall-6.json";
import megaboxDongtanHall7 from "@data/theaters/megabox-dongtan/seatmaps/hall-7.json";
import megaboxDongtanHall8 from "@data/theaters/megabox-dongtan/seatmaps/hall-8.json";
import megaboxYongintekeunobaelriTheater from "@data/theaters/megabox-yongintekeunobaelri/theater.json";
import megaboxYongintekeunobaelriSchedule from "@data/showtimes/megabox-yongintekeunobaelri.json";
import megaboxYongintekeunobaelriHall1 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-1.json";
import megaboxYongintekeunobaelriHall2 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-2.json";
import megaboxYongintekeunobaelriHall3 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-3.json";
import megaboxYongintekeunobaelriHall4 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-4.json";
import megaboxYongintekeunobaelriHall5 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-5.json";
import megaboxYongintekeunobaelriHall6 from "@data/theaters/megabox-yongintekeunobaelri/seatmaps/hall-6.json";
import megaboxBundangTheater from "@data/theaters/megabox-bundang/theater.json";
import megaboxBundangSchedule from "@data/showtimes/megabox-bundang.json";
import megaboxBundangHall1 from "@data/theaters/megabox-bundang/seatmaps/hall-1.json";
import megaboxBundangHall2 from "@data/theaters/megabox-bundang/seatmaps/hall-2.json";
import megaboxBundangHall3 from "@data/theaters/megabox-bundang/seatmaps/hall-3.json";
import megaboxBundangHall4 from "@data/theaters/megabox-bundang/seatmaps/hall-4.json";
import megaboxBundangHall5 from "@data/theaters/megabox-bundang/seatmaps/hall-5.json";
import megaboxBundangHall6 from "@data/theaters/megabox-bundang/seatmaps/hall-6.json";
import megaboxHanamseutapildeuTheater from "@data/theaters/megabox-hanamseutapildeu/theater.json";
import megaboxHanamseutapildeuSchedule from "@data/showtimes/megabox-hanamseutapildeu.json";
import megaboxHanamseutapildeuHall1 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/hall-1.json";
import megaboxHanamseutapildeuHall2 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/hall-2.json";
import megaboxHanamseutapildeuHall3 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/hall-3.json";
import megaboxHanamseutapildeuHall4 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/hall-4.json";
import megaboxHanamseutapildeuHall5 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/hall-5.json";
import megaboxHanamseutapildeuS06 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s06.json";
import megaboxHanamseutapildeuS07 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s07.json";
import megaboxHanamseutapildeuS08 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s08.json";
import megaboxHanamseutapildeuS09 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s09.json";
import megaboxHanamseutapildeuS10 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s10.json";
import megaboxHanamseutapildeuS11 from "@data/theaters/megabox-hanamseutapildeu/seatmaps/s11.json";
import megaboxByeolnaeTheater from "@data/theaters/megabox-byeolnae/theater.json";
import megaboxByeolnaeSchedule from "@data/showtimes/megabox-byeolnae.json";
import megaboxByeolnaeHall1 from "@data/theaters/megabox-byeolnae/seatmaps/hall-1.json";
import megaboxByeolnaeHall2 from "@data/theaters/megabox-byeolnae/seatmaps/hall-2.json";
import megaboxByeolnaeHall3 from "@data/theaters/megabox-byeolnae/seatmaps/hall-3.json";
import megaboxByeolnaeHall4 from "@data/theaters/megabox-byeolnae/seatmaps/hall-4.json";
import megaboxByeolnaeHall5 from "@data/theaters/megabox-byeolnae/seatmaps/hall-5.json";
import megaboxByeolnaeHall6 from "@data/theaters/megabox-byeolnae/seatmaps/hall-6.json";
import megaboxGwangjusangmuTheater from "@data/theaters/megabox-gwangjusangmu/theater.json";
import megaboxGwangjusangmuSchedule from "@data/showtimes/megabox-gwangjusangmu.json";
import megaboxGwangjusangmuHall1 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-1.json";
import megaboxGwangjusangmuHall2 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-2.json";
import megaboxGwangjusangmuHall3 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-3.json";
import megaboxGwangjusangmuHall4 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-4.json";
import megaboxGwangjusangmuHall5 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-5.json";
import megaboxGwangjusangmuHall6 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-6.json";
import megaboxGwangjusangmuHall7 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-7.json";
import megaboxGwangjusangmuHall8 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-8.json";
import megaboxGwangjusangmuHall9 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-9.json";
import megaboxGwangjusangmuHall10 from "@data/theaters/megabox-gwangjusangmu/seatmaps/hall-10.json";
import megaboxGwangjuhanamTheater from "@data/theaters/megabox-gwangjuhanam/theater.json";
import megaboxGwangjuhanamSchedule from "@data/showtimes/megabox-gwangjuhanam.json";
import megaboxGwangjuhanamHall1 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-1.json";
import megaboxGwangjuhanamHall2 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-2.json";
import megaboxGwangjuhanamHall3 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-3.json";
import megaboxGwangjuhanamHall4 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-4.json";
import megaboxGwangjuhanamHall5 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-5.json";
import megaboxGwangjuhanamHall6 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-6.json";
import megaboxGwangjuhanamHall7 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-7.json";
import megaboxGwangjuhanamHall8 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-8.json";
import megaboxGwangjuhanamHall9 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-9.json";
import megaboxGwangjuhanamHall10 from "@data/theaters/megabox-gwangjuhanam/seatmaps/hall-10.json";
import megaboxCheomdanTheater from "@data/theaters/megabox-cheomdan/theater.json";
import megaboxCheomdanSchedule from "@data/showtimes/megabox-cheomdan.json";
import megaboxCheomdanHall1 from "@data/theaters/megabox-cheomdan/seatmaps/hall-1.json";
import megaboxCheomdanHall2 from "@data/theaters/megabox-cheomdan/seatmaps/hall-2.json";
import megaboxCheomdanHall3 from "@data/theaters/megabox-cheomdan/seatmaps/hall-3.json";
import megaboxCheomdanHall4 from "@data/theaters/megabox-cheomdan/seatmaps/hall-4.json";
import megaboxCheomdanHall5 from "@data/theaters/megabox-cheomdan/seatmaps/hall-5.json";
import megaboxCheomdanHall6 from "@data/theaters/megabox-cheomdan/seatmaps/hall-6.json";
import megaboxCheomdanHall7 from "@data/theaters/megabox-cheomdan/seatmaps/hall-7.json";
import megaboxCheomdanHall8 from "@data/theaters/megabox-cheomdan/seatmaps/hall-8.json";
import megaboxCheomdanHall9 from "@data/theaters/megabox-cheomdan/seatmaps/hall-9.json";
import megaboxMokpohadangPoreumoTheater from "@data/theaters/megabox-mokpohadang-poreumo/theater.json";
import megaboxMokpohadangPoreumoSchedule from "@data/showtimes/megabox-mokpohadang-poreumo.json";
import megaboxMokpohadangPoreumoHall1 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-1.json";
import megaboxMokpohadangPoreumoHall2 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-2.json";
import megaboxMokpohadangPoreumoHall3 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-3.json";
import megaboxMokpohadangPoreumoHall4 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-4.json";
import megaboxMokpohadangPoreumoHall5 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-5.json";
import megaboxMokpohadangPoreumoHall6 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-6.json";
import megaboxMokpohadangPoreumoHall7 from "@data/theaters/megabox-mokpohadang-poreumo/seatmaps/hall-7.json";
import megaboxSuncheonTheater from "@data/theaters/megabox-suncheon/theater.json";
import megaboxSuncheonSchedule from "@data/showtimes/megabox-suncheon.json";
import megaboxSuncheonHall1 from "@data/theaters/megabox-suncheon/seatmaps/hall-1.json";
import megaboxSuncheonHall2 from "@data/theaters/megabox-suncheon/seatmaps/hall-2.json";
import megaboxSuncheonHall3 from "@data/theaters/megabox-suncheon/seatmaps/hall-3.json";
import megaboxSuncheonHall4 from "@data/theaters/megabox-suncheon/seatmaps/hall-4.json";
import megaboxSuncheonHall5 from "@data/theaters/megabox-suncheon/seatmaps/hall-5.json";
import megaboxSuncheonHall6 from "@data/theaters/megabox-suncheon/seatmaps/hall-6.json";
import megaboxSuncheonHall7 from "@data/theaters/megabox-suncheon/seatmaps/hall-7.json";
import megaboxYeosuungcheonTheater from "@data/theaters/megabox-yeosuungcheon/theater.json";
import megaboxYeosuungcheonSchedule from "@data/showtimes/megabox-yeosuungcheon.json";
import megaboxYeosuungcheonHall1 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-1.json";
import megaboxYeosuungcheonHall2 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-2.json";
import megaboxYeosuungcheonHall3 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-3.json";
import megaboxYeosuungcheonHall4 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-4.json";
import megaboxYeosuungcheonHall5 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-5.json";
import megaboxYeosuungcheonHall6 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-6.json";
import megaboxYeosuungcheonHall7 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-7.json";
import megaboxYeosuungcheonHall8 from "@data/theaters/megabox-yeosuungcheon/seatmaps/hall-8.json";
import megaboxBusangeukjangTheater from "@data/theaters/megabox-busangeukjang/theater.json";
import megaboxBusangeukjangSchedule from "@data/showtimes/megabox-busangeukjang.json";
import megaboxBusangeukjangHall1 from "@data/theaters/megabox-busangeukjang/seatmaps/hall-1.json";
import megaboxBusangeukjangHall2 from "@data/theaters/megabox-busangeukjang/seatmaps/hall-2.json";
import megaboxBusangeukjangHall3 from "@data/theaters/megabox-busangeukjang/seatmaps/hall-3.json";
import megaboxBusangeukjangHall4 from "@data/theaters/megabox-busangeukjang/seatmaps/hall-4.json";
import megaboxDeokcheonTheater from "@data/theaters/megabox-deokcheon/theater.json";
import megaboxDeokcheonSchedule from "@data/showtimes/megabox-deokcheon.json";
import megaboxDeokcheonHall1 from "@data/theaters/megabox-deokcheon/seatmaps/hall-1.json";
import megaboxDeokcheonHall2 from "@data/theaters/megabox-deokcheon/seatmaps/hall-2.json";
import megaboxDeokcheonHall3 from "@data/theaters/megabox-deokcheon/seatmaps/hall-3.json";
import megaboxDeokcheonHall4 from "@data/theaters/megabox-deokcheon/seatmaps/hall-4.json";
import megaboxDeokcheonHall5 from "@data/theaters/megabox-deokcheon/seatmaps/hall-5.json";
import megaboxDeokcheonHall6 from "@data/theaters/megabox-deokcheon/seatmaps/hall-6.json";
import megaboxDeokcheonHall7 from "@data/theaters/megabox-deokcheon/seatmaps/hall-7.json";
import megaboxDeokcheonHall8 from "@data/theaters/megabox-deokcheon/seatmaps/hall-8.json";
import megaboxDeokcheonHall9 from "@data/theaters/megabox-deokcheon/seatmaps/hall-9.json";
import megaboxYangsanjeungsanTheater from "@data/theaters/megabox-yangsanjeungsan/theater.json";
import megaboxYangsanjeungsanSchedule from "@data/showtimes/megabox-yangsanjeungsan.json";
import megaboxYangsanjeungsanHall1 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-1.json";
import megaboxYangsanjeungsanHall2 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-2.json";
import megaboxYangsanjeungsanHall3 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-3.json";
import megaboxYangsanjeungsanHall4 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-4.json";
import megaboxYangsanjeungsanHall5 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-5.json";
import megaboxYangsanjeungsanHall6 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-6.json";
import megaboxYangsanjeungsanHall7 from "@data/theaters/megabox-yangsanjeungsan/seatmaps/hall-7.json";
import megaboxSamcheonpoTheater from "@data/theaters/megabox-samcheonpo/theater.json";
import megaboxSamcheonpoSchedule from "@data/showtimes/megabox-samcheonpo.json";
import megaboxSamcheonpoHall1 from "@data/theaters/megabox-samcheonpo/seatmaps/hall-1.json";
import megaboxSamcheonpoHall2 from "@data/theaters/megabox-samcheonpo/seatmaps/hall-2.json";
import megaboxSamcheonpoHall3 from "@data/theaters/megabox-samcheonpo/seatmaps/hall-3.json";
import megaboxDaegusinsegyeDongdaeguTheater from "@data/theaters/megabox-daegusinsegye-dongdaegu/theater.json";
import megaboxDaegusinsegyeDongdaeguSchedule from "@data/showtimes/megabox-daegusinsegye-dongdaegu.json";
import megaboxDaegusinsegyeDongdaeguS01 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/s01.json";
import megaboxDaegusinsegyeDongdaeguHall2 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/hall-2.json";
import megaboxDaegusinsegyeDongdaeguHall3 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/hall-3.json";
import megaboxDaegusinsegyeDongdaeguHall4 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/hall-4.json";
import megaboxDaegusinsegyeDongdaeguHall5 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/hall-5.json";
import megaboxDaegusinsegyeDongdaeguHall6 from "@data/theaters/megabox-daegusinsegye-dongdaegu/seatmaps/hall-6.json";
import megaboxGyeongsanhayangTheater from "@data/theaters/megabox-gyeongsanhayang/theater.json";
import megaboxGyeongsanhayangSchedule from "@data/showtimes/megabox-gyeongsanhayang.json";
import megaboxGyeongsanhayangHall1 from "@data/theaters/megabox-gyeongsanhayang/seatmaps/hall-1.json";
import megaboxGyeongsanhayangHall2 from "@data/theaters/megabox-gyeongsanhayang/seatmaps/hall-2.json";
import megaboxGyeongsanhayangHall3 from "@data/theaters/megabox-gyeongsanhayang/seatmaps/hall-3.json";
import megaboxGyeongsanhayangHall4 from "@data/theaters/megabox-gyeongsanhayang/seatmaps/hall-4.json";
import megaboxGyeongsanhayangHall5 from "@data/theaters/megabox-gyeongsanhayang/seatmaps/hall-5.json";
import megaboxGumigangdongTheater from "@data/theaters/megabox-gumigangdong/theater.json";
import megaboxGumigangdongSchedule from "@data/showtimes/megabox-gumigangdong.json";
import megaboxGumigangdongHall1 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-1.json";
import megaboxGumigangdongHall2 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-2.json";
import megaboxGumigangdongHall3 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-3.json";
import megaboxGumigangdongHall4 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-4.json";
import megaboxGumigangdongHall5 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-5.json";
import megaboxGumigangdongHall6 from "@data/theaters/megabox-gumigangdong/seatmaps/hall-6.json";
import megaboxGimcheonTheater from "@data/theaters/megabox-gimcheon/theater.json";
import megaboxGimcheonSchedule from "@data/showtimes/megabox-gimcheon.json";
import megaboxGimcheonHall1 from "@data/theaters/megabox-gimcheon/seatmaps/hall-1.json";
import megaboxGimcheonHall2 from "@data/theaters/megabox-gimcheon/seatmaps/hall-2.json";
import megaboxGimcheonHall3 from "@data/theaters/megabox-gimcheon/seatmaps/hall-3.json";
import megaboxGimcheonHall4 from "@data/theaters/megabox-gimcheon/seatmaps/hall-4.json";

export const CHAIN_THEATER_FILES: unknown[] = [
  cgvGangnamTheater,
  cgvGangbyeonTheater,
  cgvGodeokgangilTheater,
  cgvGuroTheater,
  cgvDaehakroTheater,
  cgvDongdaemunTheater,
  cgvDeungchonTheater,
  cgvMyeongdongTheater,
  cgvMiaTheater,
  cgvBanghakTheater,
  cgvBulgwangTheater,
  cgvSangbongTheater,
  cgvSeongsinyeodaeipguTheater,
  cgvSuyuTheater,
  cgvSinchonateureonTheater,
  cgvApgujeongTheater,
  cgvSsinedeuswepeuApgujeongTheater,
  cgvYeouidoTheater,
  cgvYeonnamTheater,
  cgvYeongdeungpotaimseukweeoTheater,
  cgvWangsipriTheater,
  cgvYongsanIparkMallTheater,
  cgvSsinedeuswepeuYongsanTheater,
  cgvJunggyeTheater,
  cgvCheonhoTheater,
  cgvCheongdamssinesitiTheater,
  cgvPikadiri1958Theater,
  cgvHongdaeTheater,
  cgvGyeonggigwangjuTheater,
  cgvGoyangbaekseokTheater,
  cgvGoyanghaengsinTheater,
  cgvGwanggyoTheater,
  cgvGwangmyeongyeokTheater,
  cgvGuriTheater,
  cgvGurigalmaeTheater,
  cgvGiheungTheater,
  cgvGimpoTheater,
  cgvGimpounyangTheater,
  cgvGimpohangangTheater,
  cgvNamyangjuhwadoTheater,
  cgvDasanTheater,
  cgvDongbaekTheater,
  cgvDongsuwonTheater,
  cgvDongtanTheater,
  cgvDongtangeurangpasajyuTheater,
  cgvDongtanyeokTheater,
  cgvDongtanhosugongwonTheater,
  cgvBaegotTheater,
  cgvBeomgyeTheater,
  cgvBucheonTheater,
  cgvBucheonyeokTheater,
  cgvSeohyeonTheater,
  cgvSopungTheater,
  cgvSeutapildeusitiwiryeTheater,
  cgvSinsegyegyeonggiTheater,
  cgvAnsanTheater,
  cgvAnseongTheater,
  cgvYatapTheater,
  cgvYangjuokjeongTheater,
  cgvYeokgokTheater,
  cgvOriTheater,
  cgvOsanjungangTheater,
  cgvYonginTheater,
  cgvUijeongbuTheater,
  cgvIcheonTheater,
  cgvIlsanTheater,
  cgvPajumunsanTheater,
  cgvPajuunjeongTheater,
  cgvPyeongchonTheater,
  cgvPyeongtaekTheater,
  cgvPyeongtaekgodeokTheater,
  cgvPyeongtaeksosaTheater,
  cgvPocheonTheater,
  cgvHwaseongbongdamTheater,
  cgvHwajeongTheater,
  cgvDriveInYonginKeuraeksaideuTheater,
  cgvGyeyangTheater,
  cgvBupyeongTheater,
  cgvSongdotaimseupeiseuTheater,
  cgvIncheonTheater,
  cgvIncheongajeongTheater,
  cgvIncheondohwaTheater,
  cgvIncheonsimingongwonTheater,
  cgvIncheonyeonsuTheater,
  cgvIncheonhakikTheater,
  cgvJuanyeokTheater,
  cgvCheongraTheater,
  cgvGangreungTheater,
  cgvGirinTheater,
  cgvWontongTheater,
  cgvInjeTheater,
  cgvChuncheonTheater,
  cgvNonsanTheater,
  cgvDangjinTheater,
  cgvDaejeonTheater,
  cgvDaejeongasuwonTheater,
  cgvDaejeongaoTheater,
  cgvDaejeontanbangTheater,
  cgvDaejeonteomineolTheater,
  cgvSeosanTheater,
  cgvSejongTheater,
  cgvAsanTheater,
  cgvYuseongnoeunTheater,
  cgvCheonanTheater,
  cgvCheonanteomineolTheater,
  cgvCheonanpentapoteuTheater,
  cgvCheongjuSeomunTheater,
  cgvCheongjujiwelsitiTheater,
  cgvCheongjuteomineolTheater,
  cgvChungjugyohyeonTheater,
  cgvHongseongTheater,
  cgvDaeguTheater,
  cgvDaegususeongTheater,
  cgvDaeguseutadiumTheater,
  cgvDaeguyeongyeongTheater,
  cgvDaeguwolseongTheater,
  cgvDaegujukjeonTheater,
  cgvDaeguhanilTheater,
  cgvDaeguhyeondaeTheater,
  cgvDaeyeonTheater,
  cgvDongraeTheater,
  cgvBusanmyeongjiTheater,
  cgvSeomyeonTheater,
  cgvSeomyeonsamjeongtawoTheater,
  cgvSeomyeonsangsangmadangTheater,
  cgvSenteomsitiTheater,
  cgvSsinedeuswepeuSenteomTheater,
  cgvAsiadeuTheater,
  cgvUlsandongguTheater,
  cgvUlsansamsanTheater,
  cgvUlsanseongnamTheater,
  cgvUlsansincheonTheater,
  cgvUlsanjinjangTheater,
  cgvJeonggwanTheater,
  cgvHadanateumolringTheater,
  cgvHaeundaeTheater,
  cgvDriveInYeongdoTheater,
  cgvGeojeTheater,
  cgvGoseongTheater,
  cgvGumiTheater,
  cgvGimcheonyulgokTheater,
  cgvGimhaeTheater,
  cgvGimhaeyulhaTheater,
  cgvGimhaejangyuTheater,
  cgvMasanTheater,
  cgvBukpohangTheater,
  cgvAndongTheater,
  cgvYangsansamhoTheater,
  cgvJinjuhyeoksinTheater,
  cgvChangwondeositiTheater,
  cgvChangwonsangnamTheater,
  cgvGwangyangTheater,
  cgvGwangyangElepeuseukweeoTheater,
  cgvGwangjugeumnamroTheater,
  cgvGwangjusangmuTheater,
  cgvGwangjuyongbongTheater,
  cgvGwangjucheomdanTheater,
  cgvGwangjuchungjangroTheater,
  cgvGwangjuhanamTheater,
  cgvNajuTheater,
  cgvMokpopyeonghwagwangjangTheater,
  cgvSeojeonjuTheater,
  cgvSuncheonsindaeTheater,
  cgvYeosuungcheonTheater,
  cgvIksanTheater,
  cgvJeonjugosaTheater,
  cgvJeonjuekositiTheater,
  cgvJeonjuhyojaTheater,
  cgvJeongeupTheater,
  cgvJejuTheater,
  cgvJejunohyeongTheater,
  megaboxDaejeonyuseongTheater,
  megaboxJeondaeGwangjuTheater,
  megaboxDaejeonhyeondaepeurimieomaulretTheater,
  megaboxNonsanTheater,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonTheater,
  megaboxAnseongseutapildeuTheater,
  megaboxJeonjuhyeoksinTheater,
  megaboxDaeguisiaTheater,
  megaboxBukdaeguChilgokTheater,
  megaboxDaejeonsinsegyeateuaensaieonseuTheater,
  megaboxGwangmyeongakpeulrajaTheater,
  megaboxSasangTheater,
  megaboxGeumjeongakpeulrajaTheater,
  megaboxChuncheonseoksaTheater,
  megaboxPyeongnaehopyeongyeokGuNamyangjuTheater,
  megaboxGyeongbukdocheongTheater,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomTheater,
  megaboxSuwonnammunTheater,
  megaboxJinjuJunganTheater,
  megaboxChangwonTheater,
  megaboxCheongjusachangTheater,
  megaboxJeonjugaeksaTheater,
  megaboxSuwonTheater,
  megaboxSuwonakpeulrajaSuwonyeokTheater,
  megaboxGwangmyeongsohaTheater,
  megaboxJejuseogwipoTheater,
  megaboxCheonanTheater,
  megaboxUlsanTheater,
  megaboxJejusamhwaTheater,
  megaboxSuwoningyeTheater,
  megaboxBusandaeTheater,
  megaboxSuwonseutapildeuTheater,
  megaboxPyeongtaekbijeonTheater,
  megaboxJejuaraTheater,
  megaboxDaegusebeunbaelriChilgokTheater,
  megaboxChungjuyeonsuTheater,
  megaboxCheongjuseongangilTheater,
  megaboxUijeongbuminrakTheater,
  megaboxDaegupeurimieommangyeonggwanTheater,
  megaboxNampohangTheater,
  megaboxMasanGyeongnamdaeTheater,
  megaboxHaeundaeJangsanTheater,
  megaboxYeongjonghaneuldosiTheater,
  megaboxSeomyeondaehanTheater,
  megaboxHwagokTheater,
  megaboxMisagangbyeonHanamjonghapundongjangTheater,
  megaboxIncheonhakikSitiossielTheater,
  megaboxSeongnammoranTheater,
  megaboxHwamyeongTheater,
  megaboxSiheungjeongwangTheater,
  megaboxDongtanyeokTheater,
  megaboxGuuiiseuteupolTheater,
  megaboxCheongjuteomineolTheater,
  megaboxYangsanTheater,
  megaboxIsuTheater,
  megaboxSangamwoldeukeopgyeonggijangTheater,
  megaboxHongdaeAnimeTheater,
  megaboxSangbongTheater,
  megaboxGangdongTheater,
  megaboxKoekseuTheater,
  megaboxSenteureolTheater,
  megaboxGangnamTheater,
  megaboxSongpapakeuhabioTheater,
  megaboxGunjaTheater,
  megaboxMagokTheater,
  megaboxMokdongTheater,
  megaboxNamchuncheonTheater,
  megaboxSokchoTheater,
  megaboxWonjuhyeoksinTheater,
  megaboxDaejeonjungangroTheater,
  megaboxGongjuTheater,
  megaboxSejongJochiwonTheater,
  megaboxSejongnaseongTheater,
  megaboxHongseongnaepoTheater,
  megaboxOchangTheater,
  megaboxJincheonTheater,
  megaboxGeomdanTheater,
  megaboxIncheonnonhyeonTheater,
  megaboxSongdoTeuripeulseuteuriteuTheater,
  megaboxBaekseokbelrasitaTheater,
  megaboxKintekseuTheater,
  megaboxPajuunjeongTheater,
  megaboxGoyangseutapildeuTheater,
  megaboxPajugeumchonTheater,
  megaboxGimpohangangsindosiTheater,
  megaboxBucheonseutapildeusitiTheater,
  megaboxAnsanjungangTheater,
  megaboxSiheungbaegotTheater,
  megaboxDongtanTheater,
  megaboxYongintekeunobaelriTheater,
  megaboxBundangTheater,
  megaboxHanamseutapildeuTheater,
  megaboxByeolnaeTheater,
  megaboxGwangjusangmuTheater,
  megaboxGwangjuhanamTheater,
  megaboxCheomdanTheater,
  megaboxMokpohadangPoreumoTheater,
  megaboxSuncheonTheater,
  megaboxYeosuungcheonTheater,
  megaboxBusangeukjangTheater,
  megaboxDeokcheonTheater,
  megaboxYangsanjeungsanTheater,
  megaboxSamcheonpoTheater,
  megaboxDaegusinsegyeDongdaeguTheater,
  megaboxGyeongsanhayangTheater,
  megaboxGumigangdongTheater,
  megaboxGimcheonTheater,
];

export const CHAIN_SEATMAP_FILES: unknown[] = [
  cgvGangnamHall1,
  cgvGangnamHall3,
  cgvGangnamHall4,
  cgvGangnamHall5,
  cgvGangnamHall6,
  cgvGangbyeonS001,
  cgvGangbyeonHall2,
  cgvGangbyeonHall3,
  cgvGangbyeonS004,
  cgvGangbyeonHall5,
  cgvGangbyeonHall6,
  cgvGangbyeonHall7,
  cgvGangbyeonHall8,
  cgvGangbyeonHall9,
  cgvGangbyeonHall10,
  cgvGangbyeonS011,
  cgvGodeokgangilS001,
  cgvGodeokgangilHall2,
  cgvGodeokgangilHall3,
  cgvGodeokgangilHall4,
  cgvGodeokgangilHall5,
  cgvGodeokgangilS006,
  cgvGodeokgangilHall7,
  cgvGodeokgangilHall8,
  cgvGuroHall1,
  cgvGuroHall2,
  cgvGuroHall5,
  cgvGuroHall6,
  cgvGuroHall7,
  cgvGuroHall8,
  cgvGuroHall9,
  cgvGuroHall10,
  cgvDaehakroHall1,
  cgvDaehakroHall2,
  cgvDaehakroHall3,
  cgvDaehakroHall4,
  cgvDaehakroHall5,
  cgvDaehakroHall6,
  cgvDaehakroHall7,
  cgvDaehakroHall8,
  cgvDongdaemunHall1,
  cgvDongdaemunHall2,
  cgvDongdaemunHall3,
  cgvDongdaemunHall4,
  cgvDongdaemunHall6,
  cgvDeungchonHall1,
  cgvDeungchonHall2,
  cgvDeungchonHall3,
  cgvDeungchonHall4,
  cgvDeungchonHall5,
  cgvDeungchonHall6,
  cgvMyeongdongHall1,
  cgvMyeongdongHall2,
  cgvMyeongdongHall3,
  cgvMyeongdongHall4,
  cgvMyeongdongHall5,
  cgvMiaHall1,
  cgvMiaHall2,
  cgvMiaHall3,
  cgvMiaHall4,
  cgvMiaHall5,
  cgvMiaHall6,
  cgvBanghakS001,
  cgvBanghakHall2,
  cgvBanghakHall3,
  cgvBanghakHall4,
  cgvBanghakHall5,
  cgvBanghakHall6,
  cgvBanghakHall7,
  cgvBulgwangHall1,
  cgvBulgwangHall2,
  cgvBulgwangHall3,
  cgvBulgwangHall4,
  cgvBulgwangHall6,
  cgvBulgwangHall7,
  cgvBulgwangHall8,
  cgvBulgwangHall9,
  cgvSangbongHall1,
  cgvSangbongS002,
  cgvSangbongHall3,
  cgvSangbongHall4,
  cgvSangbongHall5,
  cgvSangbongHall6,
  cgvSangbongHall7,
  cgvSeongsinyeodaeipguHall1,
  cgvSeongsinyeodaeipguHall4,
  cgvSeongsinyeodaeipguHall5,
  cgvSeongsinyeodaeipguHall2,
  cgvSuyuHall1,
  cgvSuyuHall2,
  cgvSuyuHall3,
  cgvSuyuHall4,
  cgvSuyuHall5,
  cgvSuyuHall6,
  cgvSuyuHall7,
  cgvSuyuHall8,
  cgvSuyuHall9,
  cgvSinchonateureonHall2,
  cgvSinchonateureonHall3,
  cgvSinchonateureonHall4,
  cgvSinchonateureonHall5,
  cgvSinchonateureonS007,
  cgvSinchonateureonHall7,
  cgvSinchonateureonHall10,
  cgvApgujeongS001,
  cgvApgujeongHall3,
  cgvApgujeongHall1,
  cgvApgujeongHall2,
  cgvApgujeongHall4,
  cgvSsinedeuswepeuApgujeongS001,
  cgvSsinedeuswepeuApgujeongS002,
  cgvYeouidoHall1,
  cgvYeouidoHall2,
  cgvYeouidoHall3,
  cgvYeouidoS006,
  cgvYeouidoHall6,
  cgvYeouidoHall7,
  cgvYeonnamS001,
  cgvYeonnamHall2,
  cgvYeonnamS003,
  cgvYeonnamHall4,
  cgvYeonnamHall5,
  cgvYeonnamHall6,
  cgvYeongdeungpotaimseukweeoHall1,
  cgvYeongdeungpotaimseukweeoS002,
  cgvYeongdeungpotaimseukweeoHall3,
  cgvYeongdeungpotaimseukweeoHall4,
  cgvYeongdeungpotaimseukweeoHall5,
  cgvYeongdeungpotaimseukweeoHall7,
  cgvYeongdeungpotaimseukweeoHall8,
  cgvYeongdeungpotaimseukweeoHall9,
  cgvYeongdeungpotaimseukweeoS010,
  cgvYeongdeungpotaimseukweeoS011,
  cgvYeongdeungpotaimseukweeoS017,
  cgvWangsipriHall1,
  cgvWangsipriHall2,
  cgvWangsipriHall4,
  cgvWangsipriHall5,
  cgvWangsipriS006,
  cgvWangsipriHall7,
  cgvWangsipriS008,
  cgvWangsipriS009,
  cgvWangsipriS010,
  cgvYongsanIparkMallHall1,
  cgvYongsanIparkMallHall2,
  cgvYongsanIparkMallS003,
  cgvYongsanIparkMallS004,
  cgvYongsanIparkMallHall5,
  cgvYongsanIparkMallHall6,
  cgvYongsanIparkMallHall7,
  cgvYongsanIparkMallHall11,
  cgvYongsanIparkMallHall12,
  cgvYongsanIparkMallHall13,
  cgvYongsanIparkMallHall14,
  cgvYongsanIparkMallHall15,
  cgvYongsanIparkMallHall16,
  cgvYongsanIparkMallHall17,
  cgvYongsanIparkMallHall18,
  cgvYongsanIparkMallS017,
  cgvYongsanIparkMallHall17024,
  cgvSsinedeuswepeuYongsanS002,
  cgvSsinedeuswepeuYongsanS007,
  cgvJunggyeHall1,
  cgvJunggyeHall2,
  cgvJunggyeHall3,
  cgvJunggyeHall4,
  cgvJunggyeHall5,
  cgvJunggyeHall6,
  cgvJunggyeHall7,
  cgvCheonhoHall1,
  cgvCheonhoHall2,
  cgvCheonhoHall3,
  cgvCheonhoHall4,
  cgvCheonhoHall5,
  cgvCheonhoS006,
  cgvCheongdamssinesitiS001,
  cgvCheongdamssinesitiHall1,
  cgvCheongdamssinesitiHall2,
  cgvCheongdamssinesitiHall3,
  cgvCheongdamssinesitiS008,
  cgvPikadiri1958Hall1,
  cgvPikadiri1958Hall2,
  cgvPikadiri1958Hall4,
  cgvPikadiri1958Hall5,
  cgvPikadiri1958Hall6,
  cgvHongdaeHall1,
  cgvHongdaeHall2,
  cgvHongdaeHall3,
  cgvHongdaeHall4,
  cgvHongdaeHall5,
  cgvHongdaeHall6,
  cgvGyeonggigwangjuHall1,
  cgvGyeonggigwangjuHall2,
  cgvGyeonggigwangjuHall3,
  cgvGyeonggigwangjuHall4,
  cgvGyeonggigwangjuHall5,
  cgvGyeonggigwangjuHall6,
  cgvGyeonggigwangjuHall7,
  cgvGyeonggigwangjuHall8,
  cgvGoyangbaekseokHall1,
  cgvGoyangbaekseokHall2,
  cgvGoyangbaekseokHall3,
  cgvGoyangbaekseokHall4,
  cgvGoyangbaekseokHall5,
  cgvGoyangbaekseokHall6,
  cgvGoyangbaekseokHall7,
  cgvGoyanghaengsinHall1,
  cgvGoyanghaengsinHall2,
  cgvGoyanghaengsinHall3,
  cgvGoyanghaengsinHall4,
  cgvGoyanghaengsinHall5,
  cgvGoyanghaengsinHall6,
  cgvGwanggyoHall1,
  cgvGwanggyoHall2,
  cgvGwanggyoHall3,
  cgvGwanggyoS004,
  cgvGwanggyoS005,
  cgvGwanggyoS006,
  cgvGwangmyeongyeokHall1,
  cgvGwangmyeongyeokHall2,
  cgvGwangmyeongyeokHall3,
  cgvGwangmyeongyeokHall4,
  cgvGwangmyeongyeokHall5,
  cgvGuriHall1,
  cgvGuriHall2,
  cgvGuriHall3,
  cgvGuriHall4,
  cgvGuriHall5,
  cgvGuriHall6,
  cgvGuriHall7,
  cgvGurigalmaeHall1,
  cgvGurigalmaeHall2,
  cgvGurigalmaeHall3,
  cgvGurigalmaeHall4,
  cgvGurigalmaeHall5,
  cgvGurigalmaeHall6,
  cgvGiheungHall1,
  cgvGiheungHall2,
  cgvGiheungHall3,
  cgvGiheungHall4,
  cgvGiheungHall5,
  cgvGiheungHall6,
  cgvGimpoHall1,
  cgvGimpoHall2,
  cgvGimpoHall3,
  cgvGimpoHall4,
  cgvGimpoHall5,
  cgvGimpoHall6,
  cgvGimpounyangHall1,
  cgvGimpounyangHall2,
  cgvGimpounyangHall3,
  cgvGimpounyangHall4,
  cgvGimpohangangHall1,
  cgvGimpohangangHall2,
  cgvGimpohangangHall3,
  cgvGimpohangangHall4,
  cgvNamyangjuhwadoHall1,
  cgvNamyangjuhwadoHall2,
  cgvNamyangjuhwadoHall3,
  cgvNamyangjuhwadoHall4,
  cgvNamyangjuhwadoHall5,
  cgvNamyangjuhwadoHall6,
  cgvNamyangjuhwadoHall7,
  cgvDasanHall1,
  cgvDasanHall2,
  cgvDasanHall3,
  cgvDasanHall4,
  cgvDasanHall5,
  cgvDasanHall6,
  cgvDasanHall7,
  cgvDasanHall8,
  cgvDasanHall9,
  cgvDasanHall10,
  cgvDongbaekHall1,
  cgvDongbaekHall2,
  cgvDongbaekHall3,
  cgvDongbaekHall4,
  cgvDongbaekHall5,
  cgvDongbaekHall6,
  cgvDongbaekHall7,
  cgvDongbaekHall8,
  cgvDongsuwonS001,
  cgvDongsuwonS002,
  cgvDongsuwonHall3,
  cgvDongsuwonS004,
  cgvDongsuwonHall5,
  cgvDongsuwonHall6,
  cgvDongsuwonHall7,
  cgvDongsuwonHall8,
  cgvDongtanHall1,
  cgvDongtanHall2,
  cgvDongtanHall3,
  cgvDongtanHall4,
  cgvDongtanHall5,
  cgvDongtanHall6,
  cgvDongtanS007,
  cgvDongtanHall8,
  cgvDongtangeurangpasajyuHall1,
  cgvDongtangeurangpasajyuHall2,
  cgvDongtangeurangpasajyuHall3,
  cgvDongtangeurangpasajyuHall4,
  cgvDongtangeurangpasajyuHall5,
  cgvDongtangeurangpasajyuHall6,
  cgvDongtangeurangpasajyuHall7,
  cgvDongtanyeokHall1,
  cgvDongtanyeokHall2,
  cgvDongtanyeokHall3,
  cgvDongtanyeokHall4,
  cgvDongtanyeokHall5,
  cgvDongtanyeokHall6,
  cgvDongtanyeokS007,
  cgvDongtanhosugongwonHall1,
  cgvDongtanhosugongwonHall2,
  cgvDongtanhosugongwonHall3,
  cgvDongtanhosugongwonHall4,
  cgvDongtanhosugongwonHall5,
  cgvDongtanhosugongwonHall6,
  cgvBaegotHall1,
  cgvBaegotHall2,
  cgvBaegotHall3,
  cgvBaegotHall4,
  cgvBaegotHall5,
  cgvBaegotHall6,
  cgvBeomgyeHall1,
  cgvBeomgyeHall2,
  cgvBeomgyeHall3,
  cgvBeomgyeHall4,
  cgvBeomgyeHall5,
  cgvBeomgyeHall6,
  cgvBucheonS001,
  cgvBucheonS002,
  cgvBucheonHall3,
  cgvBucheonHall4,
  cgvBucheonHall5,
  cgvBucheonHall6,
  cgvBucheonHall7,
  cgvBucheonHall8,
  cgvBucheonyeokHall1,
  cgvBucheonyeokHall2,
  cgvBucheonyeokHall3,
  cgvBucheonyeokHall4,
  cgvBucheonyeokHall5,
  cgvBucheonyeokHall6,
  cgvBucheonyeokHall7,
  cgvBucheonyeokHall8,
  cgvSeohyeonHall1,
  cgvSeohyeonHall2,
  cgvSeohyeonHall3,
  cgvSeohyeonHall4,
  cgvSopungS001,
  cgvSopungHall2,
  cgvSopungHall4,
  cgvSopungHall5,
  cgvSopungHall6,
  cgvSopungHall7,
  cgvSopungHall8,
  cgvSopungHall9,
  cgvSopungHall10,
  cgvSopungHall11,
  cgvSeutapildeusitiwiryeHall1,
  cgvSeutapildeusitiwiryeHall2,
  cgvSeutapildeusitiwiryeHall3,
  cgvSeutapildeusitiwiryeHall4,
  cgvSeutapildeusitiwiryeS005,
  cgvSeutapildeusitiwiryeHall6,
  cgvSinsegyegyeonggiS001,
  cgvSinsegyegyeonggiS002,
  cgvSinsegyegyeonggiS003,
  cgvSinsegyegyeonggiHall4,
  cgvSinsegyegyeonggiHall5,
  cgvSinsegyegyeonggiS006,
  cgvAnsanHall1,
  cgvAnsanHall2,
  cgvAnsanHall3,
  cgvAnsanS004,
  cgvAnsanHall5,
  cgvAnsanHall6,
  cgvAnsanHall7,
  cgvAnsanHall8,
  cgvAnseongHall1,
  cgvAnseongHall2,
  cgvAnseongHall3,
  cgvAnseongHall4,
  cgvAnseongHall5,
  cgvAnseongHall6,
  cgvAnseongHall7,
  cgvAnseongHall8,
  cgvYatapHall1,
  cgvYatapHall2,
  cgvYatapHall3,
  cgvYatapHall4,
  cgvYatapHall5,
  cgvYatapS006,
  cgvYatapHall7,
  cgvYatapHall8,
  cgvYangjuokjeongHall1,
  cgvYangjuokjeongHall2,
  cgvYangjuokjeongHall3,
  cgvYangjuokjeongHall4,
  cgvYangjuokjeongHall5,
  cgvYangjuokjeongHall6,
  cgvYangjuokjeongHall7,
  cgvYeokgokHall1,
  cgvYeokgokHall2,
  cgvYeokgokHall3,
  cgvYeokgokHall4,
  cgvYeokgokHall5,
  cgvYeokgokHall6,
  cgvOriHall1,
  cgvOriHall2,
  cgvOriHall3,
  cgvOriHall4,
  cgvOriHall5,
  cgvOriHall6,
  cgvOriHall7,
  cgvOriHall8,
  cgvOriHall9,
  cgvOriS010,
  cgvOsanjungangHall1,
  cgvOsanjungangHall2,
  cgvOsanjungangHall3,
  cgvOsanjungangHall4,
  cgvOsanjungangHall5,
  cgvOsanjungangHall6,
  cgvOsanjungangHall7,
  cgvOsanjungangHall8,
  cgvYonginHall1,
  cgvYonginHall2,
  cgvYonginHall3,
  cgvYonginHall4,
  cgvYonginHall5,
  cgvYonginHall6,
  cgvYonginHall7,
  cgvYonginHall8,
  cgvUijeongbuHall1,
  cgvUijeongbuS002,
  cgvUijeongbuHall3,
  cgvUijeongbuHall4,
  cgvUijeongbuHall5,
  cgvUijeongbuHall6,
  cgvUijeongbuHall7,
  cgvUijeongbuHall8,
  cgvIcheonHall1,
  cgvIcheonHall2,
  cgvIcheonHall3,
  cgvIcheonHall4,
  cgvIcheonHall5,
  cgvIcheonHall6,
  cgvIcheonHall7,
  cgvIcheonHall8,
  cgvIcheonHall9,
  cgvIcheonS010,
  cgvIlsanHall1,
  cgvIlsanS002,
  cgvIlsanS003,
  cgvIlsanHall4,
  cgvIlsanHall5,
  cgvIlsanHall6,
  cgvIlsanHall7,
  cgvIlsanHall8,
  cgvIlsanS009,
  cgvPajumunsanHall1,
  cgvPajumunsanHall2,
  cgvPajumunsanHall3,
  cgvPajuunjeongHall1,
  cgvPajuunjeongHall3,
  cgvPajuunjeongHall4,
  cgvPajuunjeongHall5,
  cgvPyeongchonHall1,
  cgvPyeongchonHall2,
  cgvPyeongchonHall3,
  cgvPyeongchonHall4,
  cgvPyeongchonHall5,
  cgvPyeongchonHall6,
  cgvPyeongchonHall7,
  cgvPyeongchonHall8,
  cgvPyeongchonHall9,
  cgvPyeongchonHall10,
  cgvPyeongtaekS001,
  cgvPyeongtaekHall2,
  cgvPyeongtaekHall3,
  cgvPyeongtaekHall4,
  cgvPyeongtaekHall5,
  cgvPyeongtaekS006,
  cgvPyeongtaekHall7,
  cgvPyeongtaekgodeokHall1,
  cgvPyeongtaekgodeokHall2,
  cgvPyeongtaekgodeokHall3,
  cgvPyeongtaekgodeokHall4,
  cgvPyeongtaekgodeokHall5,
  cgvPyeongtaekgodeokHall6,
  cgvPyeongtaekgodeokHall7,
  cgvPyeongtaekgodeokHall8,
  cgvPyeongtaeksosaHall1,
  cgvPyeongtaeksosaHall2,
  cgvPyeongtaeksosaHall3,
  cgvPyeongtaeksosaHall4,
  cgvPyeongtaeksosaHall5,
  cgvPyeongtaeksosaHall6,
  cgvPocheonHall1,
  cgvPocheonHall2,
  cgvPocheonHall3,
  cgvPocheonHall4,
  cgvPocheonHall5,
  cgvHwaseongbongdamHall1,
  cgvHwaseongbongdamHall2,
  cgvHwaseongbongdamHall3,
  cgvHwaseongbongdamHall4,
  cgvHwajeongHall1,
  cgvHwajeongHall2,
  cgvHwajeongHall3,
  cgvHwajeongHall4,
  cgvHwajeongHall5,
  cgvHwajeongHall6,
  cgvHwajeongHall7,
  cgvDriveInYonginKeuraeksaideuS001,
  cgvGyeyangHall1,
  cgvGyeyangHall2,
  cgvGyeyangHall3,
  cgvGyeyangS004,
  cgvGyeyangHall6,
  cgvGyeyangHall7,
  cgvGyeyangHall8,
  cgvBupyeongHall1,
  cgvBupyeongHall2,
  cgvBupyeongHall3,
  cgvBupyeongHall4,
  cgvBupyeongHall5,
  cgvSongdotaimseupeiseuHall1,
  cgvSongdotaimseupeiseuHall2,
  cgvSongdotaimseupeiseuHall3,
  cgvSongdotaimseupeiseuHall4,
  cgvSongdotaimseupeiseuHall5,
  cgvSongdotaimseupeiseuHall6,
  cgvSongdotaimseupeiseuHall7,
  cgvIncheonHall1,
  cgvIncheonHall2,
  cgvIncheonHall3,
  cgvIncheonS004,
  cgvIncheonHall5,
  cgvIncheonHall6,
  cgvIncheonHall7,
  cgvIncheonHall8,
  cgvIncheonS009,
  cgvIncheonHall10,
  cgvIncheonHall11,
  cgvIncheonHall12,
  cgvIncheonHall13,
  cgvIncheonHall14,
  cgvIncheongajeongHall1,
  cgvIncheongajeongHall2,
  cgvIncheongajeongHall3,
  cgvIncheongajeongHall4,
  cgvIncheondohwaHall1,
  cgvIncheondohwaHall2,
  cgvIncheondohwaHall3,
  cgvIncheondohwaHall4,
  cgvIncheondohwaHall5,
  cgvIncheondohwaHall6,
  cgvIncheonsimingongwonHall1,
  cgvIncheonsimingongwonHall2,
  cgvIncheonsimingongwonHall3,
  cgvIncheonsimingongwonHall4,
  cgvIncheonsimingongwonHall5,
  cgvIncheonyeonsuHall1,
  cgvIncheonyeonsuHall2,
  cgvIncheonyeonsuHall3,
  cgvIncheonyeonsuHall4,
  cgvIncheonyeonsuHall5,
  cgvIncheonyeonsuHall6,
  cgvIncheonhakikHall1,
  cgvIncheonhakikHall2,
  cgvIncheonhakikHall3,
  cgvIncheonhakikHall4,
  cgvIncheonhakikHall5,
  cgvIncheonhakikHall6,
  cgvJuanyeokHall1,
  cgvJuanyeokHall2,
  cgvJuanyeokHall3,
  cgvJuanyeokHall4,
  cgvJuanyeokHall5,
  cgvJuanyeokHall6,
  cgvJuanyeokHall7,
  cgvJuanyeokHall8,
  cgvJuanyeokHall9,
  cgvCheongraHall1,
  cgvCheongraHall2,
  cgvCheongraHall3,
  cgvCheongraHall4,
  cgvCheongraHall5,
  cgvCheongraHall6,
  cgvCheongraHall7,
  cgvGangreungHall1,
  cgvGangreungHall2,
  cgvGangreungHall3,
  cgvGangreungHall4,
  cgvGangreungHall5,
  cgvGangreungHall6,
  cgvGangreungHall7,
  cgvGangreungHall8,
  cgvGirinHall1,
  cgvGirinHall2,
  cgvWontongHall1,
  cgvInjeHall1,
  cgvInjeHall2,
  cgvChuncheonHall1,
  cgvChuncheonHall2,
  cgvChuncheonHall3,
  cgvChuncheonHall4,
  cgvChuncheonHall5,
  cgvChuncheonHall6,
  cgvChuncheonHall7,
  cgvChuncheonHall8,
  cgvChuncheonS009,
  cgvChuncheonHall10,
  cgvChuncheonHall11,
  cgvChuncheonHall12,
  cgvNonsanHall1,
  cgvNonsanHall2,
  cgvNonsanHall3,
  cgvNonsanHall4,
  cgvNonsanHall5,
  cgvDangjinHall1,
  cgvDangjinHall2,
  cgvDangjinHall3,
  cgvDangjinHall4,
  cgvDangjinHall5,
  cgvDangjinHall6,
  cgvDangjinHall7,
  cgvDaejeonS001,
  cgvDaejeonHall2,
  cgvDaejeonHall3,
  cgvDaejeonHall4,
  cgvDaejeonS005,
  cgvDaejeonHall6,
  cgvDaejeonHall7,
  cgvDaejeonHall8,
  cgvDaejeonHall9,
  cgvDaejeongasuwonHall1,
  cgvDaejeongasuwonHall2,
  cgvDaejeongasuwonHall3,
  cgvDaejeongasuwonHall4,
  cgvDaejeongasuwonHall5,
  cgvDaejeongaoHall1,
  cgvDaejeongaoHall2,
  cgvDaejeongaoHall3,
  cgvDaejeongaoHall4,
  cgvDaejeongaoHall5,
  cgvDaejeongaoHall6,
  cgvDaejeongaoHall7,
  cgvDaejeontanbangHall1,
  cgvDaejeontanbangHall3,
  cgvDaejeontanbangHall4,
  cgvDaejeontanbangHall5,
  cgvDaejeontanbangHall6,
  cgvDaejeonteomineolHall1,
  cgvDaejeonteomineolS002,
  cgvDaejeonteomineolS003,
  cgvDaejeonteomineolS004,
  cgvDaejeonteomineolHall5,
  cgvDaejeonteomineolHall6,
  cgvDaejeonteomineolHall7,
  cgvSeosanHall1,
  cgvSeosanHall2,
  cgvSeosanHall3,
  cgvSeosanHall4,
  cgvSeosanHall5,
  cgvSeosanHall6,
  cgvSeosanHall7,
  cgvSeosanHall8,
  cgvSejongHall1,
  cgvSejongHall2,
  cgvSejongHall3,
  cgvSejongHall4,
  cgvSejongHall5,
  cgvSejongHall6,
  cgvSejongHall7,
  cgvAsanHall1,
  cgvAsanHall2,
  cgvAsanHall3,
  cgvAsanHall4,
  cgvAsanHall5,
  cgvAsanHall6,
  cgvYuseongnoeunHall1,
  cgvYuseongnoeunHall2,
  cgvYuseongnoeunHall3,
  cgvYuseongnoeunHall4,
  cgvYuseongnoeunHall5,
  cgvCheonanHall1,
  cgvCheonanHall2,
  cgvCheonanHall3,
  cgvCheonanHall4,
  cgvCheonanHall5,
  cgvCheonanHall7,
  cgvCheonanHall8,
  cgvCheonanteomineolHall1,
  cgvCheonanteomineolS002,
  cgvCheonanteomineolHall3,
  cgvCheonanteomineolS004,
  cgvCheonanteomineolHall5,
  cgvCheonanteomineolS006,
  cgvCheonanteomineolS007,
  cgvCheonanteomineolHall8,
  cgvCheonanteomineolHall9,
  cgvCheonanteomineolHall10,
  cgvCheonanpentapoteuHall1,
  cgvCheonanpentapoteuHall2,
  cgvCheonanpentapoteuHall3,
  cgvCheonanpentapoteuS004,
  cgvCheonanpentapoteuHall5,
  cgvCheonanpentapoteuS006,
  cgvCheonanpentapoteuHall7,
  cgvCheonanpentapoteuHall9,
  cgvCheonanpentapoteuHall10,
  cgvCheonanpentapoteuHall11,
  cgvCheongjuSeomunHall1,
  cgvCheongjuSeomunHall2,
  cgvCheongjuSeomunHall3,
  cgvCheongjuSeomunHall4,
  cgvCheongjuSeomunHall5,
  cgvCheongjuSeomunHall6,
  cgvCheongjuSeomunS007,
  cgvCheongjuSeomunHall8,
  cgvCheongjuSeomunHall9,
  cgvCheongjuSeomunHall10,
  cgvCheongjujiwelsitiS001,
  cgvCheongjujiwelsitiHall2,
  cgvCheongjujiwelsitiHall3,
  cgvCheongjujiwelsitiHall4,
  cgvCheongjujiwelsitiS005,
  cgvCheongjujiwelsitiHall6,
  cgvCheongjujiwelsitiHall7,
  cgvCheongjujiwelsitiHall8,
  cgvCheongjuteomineolHall1,
  cgvCheongjuteomineolHall2,
  cgvCheongjuteomineolHall3,
  cgvCheongjuteomineolHall4,
  cgvCheongjuteomineolHall5,
  cgvCheongjuteomineolHall6,
  cgvCheongjuteomineolHall7,
  cgvCheongjuteomineolHall8,
  cgvChungjugyohyeonHall1,
  cgvChungjugyohyeonHall2,
  cgvChungjugyohyeonHall3,
  cgvChungjugyohyeonHall4,
  cgvChungjugyohyeonHall5,
  cgvChungjugyohyeonHall6,
  cgvHongseongHall1,
  cgvHongseongHall2,
  cgvHongseongHall3,
  cgvHongseongHall4,
  cgvHongseongHall5,
  cgvHongseongHall6,
  cgvDaeguHall1,
  cgvDaeguHall2,
  cgvDaeguS004,
  cgvDaeguHall5,
  cgvDaeguHall6,
  cgvDaeguS007,
  cgvDaeguHall8,
  cgvDaegususeongHall1,
  cgvDaegususeongHall2,
  cgvDaegususeongHall3,
  cgvDaegususeongHall4,
  cgvDaeguseutadiumHall1,
  cgvDaeguseutadiumHall2,
  cgvDaeguseutadiumHall3,
  cgvDaeguseutadiumHall4,
  cgvDaeguseutadiumHall5,
  cgvDaeguseutadiumHall6,
  cgvDaeguseutadiumHall7,
  cgvDaeguseutadiumS008,
  cgvDaeguseutadiumS009,
  cgvDaeguseutadiumHall10,
  cgvDaeguyeongyeongHall1,
  cgvDaeguyeongyeongHall2,
  cgvDaeguyeongyeongHall3,
  cgvDaeguyeongyeongHall4,
  cgvDaeguyeongyeongHall5,
  cgvDaeguyeongyeongHall6,
  cgvDaeguwolseongHall1,
  cgvDaeguwolseongHall2,
  cgvDaeguwolseongHall3,
  cgvDaeguwolseongHall4,
  cgvDaeguwolseongHall5,
  cgvDaeguwolseongHall6,
  cgvDaegujukjeonHall1,
  cgvDaegujukjeonHall2,
  cgvDaegujukjeonHall3,
  cgvDaegujukjeonS004,
  cgvDaegujukjeonHall5,
  cgvDaegujukjeonHall6,
  cgvDaegujukjeonHall7,
  cgvDaeguhanilHall1,
  cgvDaeguhanilHall2,
  cgvDaeguhanilHall3,
  cgvDaeguhanilHall4,
  cgvDaeguhanilHall5,
  cgvDaeguhyeondaeHall1,
  cgvDaeguhyeondaeHall2,
  cgvDaeguhyeondaeHall3,
  cgvDaeguhyeondaeHall4,
  cgvDaeguhyeondaeHall5,
  cgvDaeguhyeondaeHall6,
  cgvDaeyeonHall1,
  cgvDaeyeonHall2,
  cgvDaeyeonHall3,
  cgvDaeyeonHall4,
  cgvDaeyeonHall5,
  cgvDaeyeonHall6,
  cgvDaeyeonHall7,
  cgvDaeyeonHall8,
  cgvDongraeHall1,
  cgvDongraeHall2,
  cgvDongraeHall3,
  cgvDongraeHall4,
  cgvDongraeHall5,
  cgvDongraeHall6,
  cgvDongraeHall7,
  cgvDongraeHall8,
  cgvDongraeHall9,
  cgvBusanmyeongjiHall1,
  cgvBusanmyeongjiHall2,
  cgvBusanmyeongjiHall3,
  cgvBusanmyeongjiHall4,
  cgvBusanmyeongjiHall5,
  cgvBusanmyeongjiHall6,
  cgvSeomyeonS001,
  cgvSeomyeonHall2,
  cgvSeomyeonHall3,
  cgvSeomyeonHall4,
  cgvSeomyeonHall1,
  cgvSeomyeonHall6,
  cgvSeomyeonHall7,
  cgvSeomyeonHall8,
  cgvSeomyeonHall9,
  cgvSeomyeonHall2010,
  cgvSeomyeonS011,
  cgvSeomyeonS012,
  cgvSeomyeonsamjeongtawoHall1,
  cgvSeomyeonsamjeongtawoHall2,
  cgvSeomyeonsamjeongtawoHall3,
  cgvSeomyeonsamjeongtawoHall4,
  cgvSeomyeonsamjeongtawoHall5,
  cgvSeomyeonsamjeongtawoHall6,
  cgvSeomyeonsamjeongtawoHall7,
  cgvSeomyeonsamjeongtawoHall8,
  cgvSeomyeonsangsangmadangHall1,
  cgvSeomyeonsangsangmadangHall2,
  cgvSeomyeonsangsangmadangS003,
  cgvSeomyeonsangsangmadangHall4,
  cgvSeomyeonsangsangmadangHall5,
  cgvSeomyeonsangsangmadangHall6,
  cgvSenteomsitiS001,
  cgvSenteomsitiHall2,
  cgvSenteomsitiHall3,
  cgvSenteomsitiHall4,
  cgvSenteomsitiHall5,
  cgvSenteomsitiHall6,
  cgvSenteomsitiHall7,
  cgvSenteomsitiS008,
  cgvSsinedeuswepeuSenteomS001,
  cgvSsinedeuswepeuSenteomS002,
  cgvAsiadeuHall1,
  cgvAsiadeuHall2,
  cgvAsiadeuHall3,
  cgvAsiadeuHall4,
  cgvAsiadeuHall5,
  cgvAsiadeuHall6,
  cgvAsiadeuHall7,
  cgvAsiadeuS008,
  cgvUlsandongguHall1,
  cgvUlsandongguHall2,
  cgvUlsandongguHall3,
  cgvUlsandongguHall4,
  cgvUlsandongguHall5,
  cgvUlsansamsanHall1,
  cgvUlsansamsanHall2,
  cgvUlsansamsanHall3,
  cgvUlsansamsanHall4,
  cgvUlsansamsanHall5,
  cgvUlsansamsanHall6,
  cgvUlsansamsanHall7,
  cgvUlsansamsanHall8,
  cgvUlsansamsanHall9,
  cgvUlsansamsanHall10,
  cgvUlsansamsanS011,
  cgvUlsanseongnamHall1,
  cgvUlsanseongnamHall2,
  cgvUlsanseongnamHall3,
  cgvUlsanseongnamHall4,
  cgvUlsanseongnamHall5,
  cgvUlsanseongnamHall6,
  cgvUlsanseongnamHall7,
  cgvUlsansincheonHall1,
  cgvUlsansincheonHall2,
  cgvUlsansincheonHall3,
  cgvUlsansincheonHall4,
  cgvUlsanjinjangHall1,
  cgvUlsanjinjangHall2,
  cgvUlsanjinjangHall3,
  cgvUlsanjinjangHall4,
  cgvUlsanjinjangHall5,
  cgvUlsanjinjangHall6,
  cgvUlsanjinjangHall7,
  cgvJeonggwanHall1,
  cgvJeonggwanHall2,
  cgvJeonggwanHall3,
  cgvJeonggwanHall4,
  cgvJeonggwanHall5,
  cgvJeonggwanHall6,
  cgvJeonggwanHall7,
  cgvJeonggwanHall8,
  cgvJeonggwanHall9,
  cgvJeonggwanHall2010,
  cgvJeonggwanHall3011,
  cgvJeonggwanHall4012,
  cgvHadanateumolringHall1,
  cgvHadanateumolringHall2,
  cgvHadanateumolringHall3,
  cgvHadanateumolringS004,
  cgvHadanateumolringHall4,
  cgvHadanateumolringHall5,
  cgvHadanateumolringHall6,
  cgvHaeundaeHall1,
  cgvHaeundaeHall2,
  cgvHaeundaeHall3,
  cgvHaeundaeHall4,
  cgvHaeundaeHall5,
  cgvHaeundaeHall6,
  cgvDriveInYeongdoS001,
  cgvGeojeHall1,
  cgvGeojeHall2,
  cgvGeojeHall3,
  cgvGeojeHall4,
  cgvGeojeHall5,
  cgvGeojeHall6,
  cgvGeojeHall7,
  cgvGoseongHall1,
  cgvGoseongHall2,
  cgvGumiHall1,
  cgvGumiHall2,
  cgvGumiHall3,
  cgvGumiHall4,
  cgvGumiHall5,
  cgvGumiHall6,
  cgvGumiHall7,
  cgvGumiHall8,
  cgvGumiHall9,
  cgvGumiHall10,
  cgvGimcheonyulgokHall1,
  cgvGimcheonyulgokHall2,
  cgvGimcheonyulgokHall3,
  cgvGimcheonyulgokHall4,
  cgvGimcheonyulgokHall5,
  cgvGimhaeHall1,
  cgvGimhaeHall2,
  cgvGimhaeHall3,
  cgvGimhaeHall4,
  cgvGimhaeHall5,
  cgvGimhaeHall6,
  cgvGimhaeHall7,
  cgvGimhaeHall8,
  cgvGimhaeHall9,
  cgvGimhaeyulhaHall1,
  cgvGimhaeyulhaHall2,
  cgvGimhaeyulhaHall3,
  cgvGimhaeyulhaHall4,
  cgvGimhaejangyuHall1,
  cgvGimhaejangyuHall2,
  cgvGimhaejangyuHall3,
  cgvGimhaejangyuHall4,
  cgvGimhaejangyuHall5,
  cgvGimhaejangyuHall6,
  cgvMasanHall1,
  cgvMasanHall2,
  cgvMasanHall3,
  cgvMasanHall4,
  cgvMasanHall5,
  cgvMasanHall6,
  cgvMasanHall8,
  cgvBukpohangHall1,
  cgvBukpohangHall2,
  cgvBukpohangHall3,
  cgvBukpohangHall5,
  cgvBukpohangHall6,
  cgvBukpohangHall7,
  cgvBukpohangHall8,
  cgvBukpohangHall9,
  cgvAndongHall1,
  cgvAndongHall2,
  cgvAndongHall3,
  cgvAndongHall4,
  cgvAndongHall5,
  cgvAndongHall6,
  cgvYangsansamhoHall1,
  cgvYangsansamhoHall2,
  cgvYangsansamhoHall3,
  cgvJinjuhyeoksinHall1,
  cgvJinjuhyeoksinHall2,
  cgvJinjuhyeoksinHall3,
  cgvJinjuhyeoksinHall4,
  cgvJinjuhyeoksinHall5,
  cgvJinjuhyeoksinHall6,
  cgvJinjuhyeoksinHall7,
  cgvChangwondeositiHall1,
  cgvChangwondeositiHall2,
  cgvChangwondeositiHall3,
  cgvChangwondeositiS004,
  cgvChangwondeositiHall5,
  cgvChangwondeositiHall6,
  cgvChangwonsangnamHall1,
  cgvChangwonsangnamHall2,
  cgvChangwonsangnamHall3,
  cgvChangwonsangnamHall4,
  cgvChangwonsangnamHall5,
  cgvGwangyangHall1,
  cgvGwangyangHall2,
  cgvGwangyangHall3,
  cgvGwangyangHall4,
  cgvGwangyangElepeuseukweeoHall1,
  cgvGwangyangElepeuseukweeoHall2,
  cgvGwangyangElepeuseukweeoHall3,
  cgvGwangyangElepeuseukweeoHall4,
  cgvGwangyangElepeuseukweeoHall5,
  cgvGwangyangElepeuseukweeoHall6,
  cgvGwangyangElepeuseukweeoHall7,
  cgvGwangjugeumnamroHall1,
  cgvGwangjugeumnamroHall2,
  cgvGwangjugeumnamroHall3,
  cgvGwangjugeumnamroHall4,
  cgvGwangjugeumnamroHall5,
  cgvGwangjugeumnamroHall6,
  cgvGwangjugeumnamroHall7,
  cgvGwangjugeumnamroS008,
  cgvGwangjugeumnamroHall9,
  cgvGwangjusangmuHall1,
  cgvGwangjusangmuHall2,
  cgvGwangjusangmuHall3,
  cgvGwangjusangmuHall5,
  cgvGwangjusangmuHall6,
  cgvGwangjusangmuHall7,
  cgvGwangjusangmuHall8,
  cgvGwangjusangmuHall9,
  cgvGwangjusangmuHall10,
  cgvGwangjuyongbongHall1,
  cgvGwangjuyongbongHall2,
  cgvGwangjuyongbongHall3,
  cgvGwangjuyongbongHall4,
  cgvGwangjuyongbongHall5,
  cgvGwangjuyongbongHall6,
  cgvGwangjuyongbongHall7,
  cgvGwangjuyongbongHall8,
  cgvGwangjuyongbongHall9,
  cgvGwangjuyongbongHall10,
  cgvGwangjucheomdanHall1,
  cgvGwangjucheomdanHall2,
  cgvGwangjucheomdanHall3,
  cgvGwangjucheomdanS004,
  cgvGwangjucheomdanHall5,
  cgvGwangjucheomdanHall6,
  cgvGwangjucheomdanHall7,
  cgvGwangjucheomdanHall8,
  cgvGwangjucheomdanHall9,
  cgvGwangjuchungjangroHall1,
  cgvGwangjuchungjangroHall2,
  cgvGwangjuchungjangroHall3,
  cgvGwangjuchungjangroHall4,
  cgvGwangjuchungjangroHall5,
  cgvGwangjuhanamHall1,
  cgvGwangjuhanamHall2,
  cgvGwangjuhanamHall3,
  cgvGwangjuhanamHall4,
  cgvGwangjuhanamHall5,
  cgvGwangjuhanamHall6,
  cgvNajuHall1,
  cgvNajuHall2,
  cgvNajuHall3,
  cgvNajuHall4,
  cgvNajuHall5,
  cgvNajuHall6,
  cgvMokpopyeonghwagwangjangHall1,
  cgvMokpopyeonghwagwangjangHall2,
  cgvMokpopyeonghwagwangjangHall3,
  cgvMokpopyeonghwagwangjangHall4,
  cgvMokpopyeonghwagwangjangHall5,
  cgvMokpopyeonghwagwangjangHall6,
  cgvMokpopyeonghwagwangjangHall7,
  cgvMokpopyeonghwagwangjangHall8,
  cgvSeojeonjuHall1,
  cgvSeojeonjuHall2,
  cgvSeojeonjuHall3,
  cgvSeojeonjuHall4,
  cgvSeojeonjuHall5,
  cgvSuncheonsindaeHall1,
  cgvSuncheonsindaeHall2,
  cgvSuncheonsindaeHall3,
  cgvSuncheonsindaeHall4,
  cgvSuncheonsindaeHall5,
  cgvSuncheonsindaeHall6,
  cgvSuncheonsindaeHall7,
  cgvSuncheonsindaeHall8,
  cgvSuncheonsindaeS009,
  cgvYeosuungcheonHall1,
  cgvYeosuungcheonHall2,
  cgvYeosuungcheonHall3,
  cgvYeosuungcheonHall4,
  cgvYeosuungcheonHall5,
  cgvYeosuungcheonHall6,
  cgvYeosuungcheonHall7,
  cgvYeosuungcheonHall8,
  cgvIksanHall1,
  cgvIksanHall2,
  cgvIksanHall3,
  cgvIksanHall4,
  cgvIksanHall5,
  cgvIksanHall6,
  cgvIksanHall7,
  cgvJeonjugosaHall1,
  cgvJeonjugosaHall2,
  cgvJeonjugosaHall3,
  cgvJeonjugosaHall4,
  cgvJeonjugosaHall5,
  cgvJeonjugosaHall6,
  cgvJeonjugosaHall7,
  cgvJeonjugosaS008,
  cgvJeonjuekositiHall1,
  cgvJeonjuekositiHall2,
  cgvJeonjuekositiHall3,
  cgvJeonjuekositiHall4,
  cgvJeonjuekositiHall5,
  cgvJeonjuekositiHall6,
  cgvJeonjuhyojaHall1,
  cgvJeonjuhyojaHall2,
  cgvJeonjuhyojaHall3,
  cgvJeonjuhyojaHall4,
  cgvJeonjuhyojaHall5,
  cgvJeonjuhyojaHall6,
  cgvJeonjuhyojaS007,
  cgvJeongeupHall1,
  cgvJeongeupHall2,
  cgvJeongeupHall3,
  cgvJeongeupHall4,
  cgvJejuHall1,
  cgvJejuHall2,
  cgvJejuS003,
  cgvJejuHall4,
  cgvJejuHall5,
  cgvJejuHall6,
  cgvJejuHall7,
  cgvJejuHall8,
  cgvJejunohyeongHall1,
  cgvJejunohyeongHall2,
  cgvJejunohyeongHall3,
  cgvJejunohyeongHall4,
  cgvJejunohyeongHall5,
  cgvJejunohyeongHall6,
  megaboxDaejeonyuseongHall1,
  megaboxDaejeonyuseongHall2,
  megaboxDaejeonyuseongHall3,
  megaboxDaejeonyuseongHall4,
  megaboxDaejeonyuseongHall5,
  megaboxJeondaeGwangjuHall1,
  megaboxJeondaeGwangjuHall2,
  megaboxJeondaeGwangjuHall3,
  megaboxJeondaeGwangjuHall4,
  megaboxJeondaeGwangjuHall5,
  megaboxJeondaeGwangjuHall6,
  megaboxJeondaeGwangjuHall7,
  megaboxDaejeonhyeondaepeurimieomaulretHall1,
  megaboxDaejeonhyeondaepeurimieomaulretHall2,
  megaboxDaejeonhyeondaepeurimieomaulretHall3,
  megaboxDaejeonhyeondaepeurimieomaulretS04,
  megaboxDaejeonhyeondaepeurimieomaulretHall5,
  megaboxDaejeonhyeondaepeurimieomaulretHall6,
  megaboxDaejeonhyeondaepeurimieomaulretHall7,
  megaboxNonsanHall1,
  megaboxNonsanHall2,
  megaboxNonsanHall3,
  megaboxNonsanHall4,
  megaboxNonsanHall5,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall1,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall2,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall3,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall4,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonS05,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall6,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall7,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonHall8,
  megaboxAnseongseutapildeuHall1,
  megaboxAnseongseutapildeuHall2,
  megaboxAnseongseutapildeuHall3,
  megaboxAnseongseutapildeuHall4,
  megaboxAnseongseutapildeuS05,
  megaboxAnseongseutapildeuHall6,
  megaboxAnseongseutapildeuHall7,
  megaboxJeonjuhyeoksinHall1,
  megaboxJeonjuhyeoksinHall2,
  megaboxJeonjuhyeoksinHall3,
  megaboxJeonjuhyeoksinHall4,
  megaboxJeonjuhyeoksinHall5,
  megaboxJeonjuhyeoksinHall6,
  megaboxJeonjuhyeoksinHall7,
  megaboxDaeguisiaHall1,
  megaboxDaeguisiaHall2,
  megaboxDaeguisiaHall3,
  megaboxDaeguisiaHall4,
  megaboxDaeguisiaHall5,
  megaboxDaeguisiaHall6,
  megaboxDaeguisiaHall7,
  megaboxBukdaeguChilgokHall1,
  megaboxBukdaeguChilgokHall2,
  megaboxBukdaeguChilgokHall3,
  megaboxBukdaeguChilgokHall4,
  megaboxBukdaeguChilgokHall5,
  megaboxBukdaeguChilgokHall6,
  megaboxDaejeonsinsegyeateuaensaieonseuHall1,
  megaboxDaejeonsinsegyeateuaensaieonseuS02,
  megaboxDaejeonsinsegyeateuaensaieonseuHall3,
  megaboxDaejeonsinsegyeateuaensaieonseuHall4,
  megaboxDaejeonsinsegyeateuaensaieonseuHall5,
  megaboxDaejeonsinsegyeateuaensaieonseuHall6,
  megaboxDaejeonsinsegyeateuaensaieonseuS07,
  megaboxGwangmyeongakpeulrajaHall1,
  megaboxGwangmyeongakpeulrajaHall2,
  megaboxGwangmyeongakpeulrajaHall3,
  megaboxGwangmyeongakpeulrajaHall4,
  megaboxGwangmyeongakpeulrajaHall5,
  megaboxGwangmyeongakpeulrajaHall6,
  megaboxSasangHall1,
  megaboxSasangHall2,
  megaboxSasangHall6,
  megaboxSasangHall7,
  megaboxGeumjeongakpeulrajaHall1,
  megaboxGeumjeongakpeulrajaHall2,
  megaboxGeumjeongakpeulrajaHall3,
  megaboxGeumjeongakpeulrajaHall4,
  megaboxGeumjeongakpeulrajaHall5,
  megaboxGeumjeongakpeulrajaHall6,
  megaboxGeumjeongakpeulrajaHall7,
  megaboxChuncheonseoksaHall1,
  megaboxChuncheonseoksaHall2,
  megaboxChuncheonseoksaHall3,
  megaboxChuncheonseoksaHall4,
  megaboxChuncheonseoksaHall5,
  megaboxChuncheonseoksaHall6,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall1,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall2,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall3,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall5,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall6,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall7,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall8,
  megaboxPyeongnaehopyeongyeokGuNamyangjuHall9,
  megaboxGyeongbukdocheongHall2,
  megaboxGyeongbukdocheongHall3,
  megaboxGyeongbukdocheongHall4,
  megaboxGyeongbukdocheongHall5,
  megaboxGyeongbukdocheongHall6,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS01,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS02,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS03,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS04,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS05,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS06,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS07,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomS08,
  megaboxSuwonnammunHall1,
  megaboxSuwonnammunHall2,
  megaboxSuwonnammunHall3,
  megaboxSuwonnammunHall4,
  megaboxJinjuJunganHall3,
  megaboxJinjuJunganHall4,
  megaboxJinjuJunganHall5,
  megaboxJinjuJunganHall6,
  megaboxJinjuJunganHall7,
  megaboxJinjuJunganHall8,
  megaboxChangwonHall1,
  megaboxChangwonHall2,
  megaboxChangwonHall3,
  megaboxChangwonHall4,
  megaboxChangwonHall5,
  megaboxChangwonHall6,
  megaboxChangwonHall7,
  megaboxCheongjusachangHall1,
  megaboxCheongjusachangHall2,
  megaboxCheongjusachangHall3,
  megaboxCheongjusachangHall4,
  megaboxJeonjugaeksaHall1,
  megaboxJeonjugaeksaHall2,
  megaboxJeonjugaeksaHall3,
  megaboxJeonjugaeksaHall4,
  megaboxJeonjugaeksaHall5,
  megaboxJeonjugaeksaHall6,
  megaboxJeonjugaeksaHall7,
  megaboxJeonjugaeksaHall8,
  megaboxJeonjugaeksaHall9,
  megaboxJeonjugaeksaHall10,
  megaboxSuwonHall1,
  megaboxSuwonHall2,
  megaboxSuwonHall3,
  megaboxSuwonHall4,
  megaboxSuwonHall5,
  megaboxSuwonakpeulrajaSuwonyeokS01,
  megaboxSuwonakpeulrajaSuwonyeokHall2,
  megaboxSuwonakpeulrajaSuwonyeokHall3,
  megaboxSuwonakpeulrajaSuwonyeokS04,
  megaboxSuwonakpeulrajaSuwonyeokHall5,
  megaboxSuwonakpeulrajaSuwonyeokHall6,
  megaboxSuwonakpeulrajaSuwonyeokHall7,
  megaboxSuwonakpeulrajaSuwonyeokHall8,
  megaboxGwangmyeongsohaHall1,
  megaboxGwangmyeongsohaHall2,
  megaboxGwangmyeongsohaHall3,
  megaboxGwangmyeongsohaHall4,
  megaboxGwangmyeongsohaHall5,
  megaboxGwangmyeongsohaHall6,
  megaboxJejuseogwipoHall1,
  megaboxJejuseogwipoHall2,
  megaboxJejuseogwipoHall3,
  megaboxCheonanHall1,
  megaboxCheonanHall2,
  megaboxCheonanHall3,
  megaboxCheonanHall4,
  megaboxCheonanHall5,
  megaboxCheonanHall6,
  megaboxCheonanHall7,
  megaboxCheonanHall8,
  megaboxCheonanHall9,
  megaboxUlsanHall1,
  megaboxUlsanHall2,
  megaboxUlsanHall3,
  megaboxUlsanHall4,
  megaboxUlsanHall5,
  megaboxUlsanHall6,
  megaboxJejusamhwaHall1,
  megaboxJejusamhwaHall2,
  megaboxJejusamhwaHall3,
  megaboxJejusamhwaHall4,
  megaboxJejusamhwaHall5,
  megaboxSuwoningyeHall1,
  megaboxSuwoningyeHall2,
  megaboxSuwoningyeHall3,
  megaboxSuwoningyeHall4,
  megaboxSuwoningyeHall5,
  megaboxSuwoningyeHall6,
  megaboxSuwoningyeHall7,
  megaboxBusandaeHall1,
  megaboxBusandaeHall2,
  megaboxBusandaeHall4,
  megaboxBusandaeHall5,
  megaboxBusandaeHall6,
  megaboxBusandaeHall7,
  megaboxSuwonseutapildeuHall1,
  megaboxSuwonseutapildeuHall2,
  megaboxSuwonseutapildeuHall3,
  megaboxSuwonseutapildeuS04,
  megaboxSuwonseutapildeuHall5,
  megaboxSuwonseutapildeuHall6,
  megaboxPyeongtaekbijeonHall1,
  megaboxPyeongtaekbijeonHall2,
  megaboxPyeongtaekbijeonHall3,
  megaboxPyeongtaekbijeonHall4,
  megaboxPyeongtaekbijeonHall5,
  megaboxJejuaraHall1,
  megaboxJejuaraHall2,
  megaboxJejuaraHall3,
  megaboxJejuaraHall4,
  megaboxJejuaraHall5,
  megaboxJejuaraHall6,
  megaboxDaegusebeunbaelriChilgokHall1,
  megaboxDaegusebeunbaelriChilgokHall2,
  megaboxDaegusebeunbaelriChilgokHall3,
  megaboxDaegusebeunbaelriChilgokHall4,
  megaboxDaegusebeunbaelriChilgokHall5,
  megaboxDaegusebeunbaelriChilgokHall6,
  megaboxDaegusebeunbaelriChilgokHall7,
  megaboxChungjuyeonsuHall1,
  megaboxChungjuyeonsuHall2,
  megaboxChungjuyeonsuHall3,
  megaboxChungjuyeonsuHall4,
  megaboxChungjuyeonsuHall5,
  megaboxChungjuyeonsuHall6,
  megaboxChungjuyeonsuHall7,
  megaboxChungjuyeonsuHall8,
  megaboxCheongjuseongangilHall1,
  megaboxCheongjuseongangilHall3,
  megaboxCheongjuseongangilHall5,
  megaboxCheongjuseongangilHall6,
  megaboxCheongjuseongangilHall7,
  megaboxCheongjuseongangilHall8,
  megaboxCheongjuseongangilHall9,
  megaboxUijeongbuminrakHall1,
  megaboxUijeongbuminrakHall2,
  megaboxUijeongbuminrakHall3,
  megaboxUijeongbuminrakHall4,
  megaboxUijeongbuminrakHall5,
  megaboxUijeongbuminrakHall6,
  megaboxDaegupeurimieommangyeonggwanHall1,
  megaboxDaegupeurimieommangyeonggwanHall2,
  megaboxDaegupeurimieommangyeonggwanHall3,
  megaboxDaegupeurimieommangyeonggwanHall4,
  megaboxDaegupeurimieommangyeonggwanHall5,
  megaboxDaegupeurimieommangyeonggwanHall6,
  megaboxDaegupeurimieommangyeonggwanHall7,
  megaboxDaegupeurimieommangyeonggwanHall8,
  megaboxDaegupeurimieommangyeonggwanHall9,
  megaboxNampohangHall1,
  megaboxNampohangHall2,
  megaboxNampohangHall3,
  megaboxNampohangHall4,
  megaboxNampohangHall5,
  megaboxNampohangHall6,
  megaboxMasanGyeongnamdaeHall1,
  megaboxMasanGyeongnamdaeHall2,
  megaboxMasanGyeongnamdaeHall3,
  megaboxMasanGyeongnamdaeHall4,
  megaboxMasanGyeongnamdaeHall5,
  megaboxMasanGyeongnamdaeHall6,
  megaboxHaeundaeJangsanHall1,
  megaboxHaeundaeJangsanHall2,
  megaboxHaeundaeJangsanHall3,
  megaboxHaeundaeJangsanHall4,
  megaboxHaeundaeJangsanHall5,
  megaboxHaeundaeJangsanHall6,
  megaboxHaeundaeJangsanHall7,
  megaboxYeongjonghaneuldosiHall1,
  megaboxYeongjonghaneuldosiHall2,
  megaboxYeongjonghaneuldosiHall3,
  megaboxSeomyeondaehanHall1,
  megaboxSeomyeondaehanHall2,
  megaboxSeomyeondaehanHall3,
  megaboxSeomyeondaehanHall4,
  megaboxHwagokHall1,
  megaboxHwagokHall2,
  megaboxHwagokHall3,
  megaboxHwagokHall4,
  megaboxHwagokHall5,
  megaboxMisagangbyeonHanamjonghapundongjangHall1,
  megaboxMisagangbyeonHanamjonghapundongjangHall2,
  megaboxMisagangbyeonHanamjonghapundongjangHall3,
  megaboxMisagangbyeonHanamjonghapundongjangHall4,
  megaboxMisagangbyeonHanamjonghapundongjangHall5,
  megaboxIncheonhakikSitiossielHall1,
  megaboxIncheonhakikSitiossielHall2,
  megaboxIncheonhakikSitiossielHall3,
  megaboxIncheonhakikSitiossielHall4,
  megaboxIncheonhakikSitiossielHall5,
  megaboxIncheonhakikSitiossielHall6,
  megaboxSeongnammoranHall1,
  megaboxSeongnammoranHall2,
  megaboxSeongnammoranHall3,
  megaboxSeongnammoranHall4,
  megaboxSeongnammoranHall5,
  megaboxSeongnammoranHall6,
  megaboxHwamyeongHall1,
  megaboxHwamyeongHall2,
  megaboxHwamyeongHall3,
  megaboxHwamyeongHall4,
  megaboxHwamyeongHall6,
  megaboxSiheungjeongwangHall1,
  megaboxSiheungjeongwangHall2,
  megaboxSiheungjeongwangHall3,
  megaboxSiheungjeongwangHall4,
  megaboxSiheungjeongwangHall5,
  megaboxDongtanyeokHall1,
  megaboxDongtanyeokHall2,
  megaboxDongtanyeokHall3,
  megaboxDongtanyeokHall4,
  megaboxDongtanyeokHall5,
  megaboxDongtanyeokHall6,
  megaboxDongtanyeokHall7,
  megaboxGuuiiseuteupolS01,
  megaboxGuuiiseuteupolHall2,
  megaboxGuuiiseuteupolHall3,
  megaboxGuuiiseuteupolHall4,
  megaboxGuuiiseuteupolHall5,
  megaboxGuuiiseuteupolHall6,
  megaboxGuuiiseuteupolHall7,
  megaboxGuuiiseuteupolHall8,
  megaboxCheongjuteomineolHall1,
  megaboxCheongjuteomineolHall2,
  megaboxCheongjuteomineolHall3,
  megaboxCheongjuteomineolHall4,
  megaboxCheongjuteomineolHall5,
  megaboxCheongjuteomineolHall6,
  megaboxCheongjuteomineolS07,
  megaboxYangsanHall1,
  megaboxYangsanHall2,
  megaboxYangsanHall3,
  megaboxYangsanHall4,
  megaboxYangsanHall5,
  megaboxYangsanHall6,
  megaboxIsuHall1,
  megaboxIsuHall2,
  megaboxIsuHall3,
  megaboxIsuHall4,
  megaboxIsuHall5,
  megaboxIsuHall6,
  megaboxSangamwoldeukeopgyeonggijangHall1,
  megaboxSangamwoldeukeopgyeonggijangS02,
  megaboxSangamwoldeukeopgyeonggijangHall3,
  megaboxSangamwoldeukeopgyeonggijangHall4,
  megaboxSangamwoldeukeopgyeonggijangHall5,
  megaboxSangamwoldeukeopgyeonggijangHall6,
  megaboxSangamwoldeukeopgyeonggijangHall7,
  megaboxSangamwoldeukeopgyeonggijangHall8,
  megaboxSangamwoldeukeopgyeonggijangHall9,
  megaboxHongdaeAnimeHall1,
  megaboxHongdaeAnimeHall2,
  megaboxHongdaeAnimeHall3,
  megaboxHongdaeAnimeHall4,
  megaboxHongdaeAnimeHall5,
  megaboxSangbongHall1,
  megaboxSangbongHall2,
  megaboxSangbongHall3,
  megaboxSangbongHall4,
  megaboxGangdongHall1,
  megaboxGangdongHall2,
  megaboxGangdongHall3,
  megaboxGangdongHall4,
  megaboxKoekseuS01,
  megaboxKoekseuHall2,
  megaboxKoekseuHall3,
  megaboxKoekseuHall4,
  megaboxKoekseuHall5,
  megaboxKoekseuHall6,
  megaboxKoekseuHall7,
  megaboxKoekseuHall8,
  megaboxKoekseuS09,
  megaboxKoekseuHall10,
  megaboxKoekseuHall11,
  megaboxKoekseuS12,
  megaboxKoekseuS13,
  megaboxKoekseuS14,
  megaboxKoekseuS15,
  megaboxKoekseuS16,
  megaboxKoekseuS17,
  megaboxKoekseuS18,
  megaboxSenteureolS01,
  megaboxSenteureolS02,
  megaboxSenteureolS03,
  megaboxSenteureolS04,
  megaboxSenteureolS05,
  megaboxGangnamHall1,
  megaboxGangnamHall2,
  megaboxGangnamHall3,
  megaboxGangnamHall4,
  megaboxGangnamHall5,
  megaboxGangnamHall6,
  megaboxGangnamHall7,
  megaboxSongpapakeuhabioHall1,
  megaboxSongpapakeuhabioHall2,
  megaboxSongpapakeuhabioHall3,
  megaboxSongpapakeuhabioHall4,
  megaboxSongpapakeuhabioHall5,
  megaboxSongpapakeuhabioHall6,
  megaboxSongpapakeuhabioHall7,
  megaboxSongpapakeuhabioHall8,
  megaboxSongpapakeuhabioHall9,
  megaboxGunjaHall1,
  megaboxGunjaHall3,
  megaboxGunjaHall4,
  megaboxGunjaHall5,
  megaboxGunjaHall6,
  megaboxGunjaHall7,
  megaboxGunjaHall8,
  megaboxGunjaHall9,
  megaboxGunjaHall10,
  megaboxMagokHall1,
  megaboxMagokHall2,
  megaboxMagokHall3,
  megaboxMagokHall4,
  megaboxMagokHall5,
  megaboxMagokHall6,
  megaboxMokdongS01,
  megaboxMokdongHall2,
  megaboxMokdongHall3,
  megaboxMokdongHall4,
  megaboxMokdongHall5,
  megaboxMokdongHall6,
  megaboxMokdongHall7,
  megaboxMokdongHall8,
  megaboxMokdongHall9,
  megaboxNamchuncheonHall1,
  megaboxNamchuncheonHall2,
  megaboxNamchuncheonHall3,
  megaboxNamchuncheonHall4,
  megaboxNamchuncheonHall5,
  megaboxNamchuncheonHall6,
  megaboxNamchuncheonHall7,
  megaboxSokchoHall1,
  megaboxSokchoHall2,
  megaboxSokchoHall3,
  megaboxSokchoHall4,
  megaboxSokchoHall5,
  megaboxWonjuhyeoksinHall1,
  megaboxWonjuhyeoksinHall2,
  megaboxWonjuhyeoksinHall3,
  megaboxWonjuhyeoksinHall4,
  megaboxWonjuhyeoksinHall5,
  megaboxWonjuhyeoksinHall6,
  megaboxWonjuhyeoksinHall7,
  megaboxWonjuhyeoksinHall8,
  megaboxWonjuhyeoksinHall9,
  megaboxDaejeonjungangroHall1,
  megaboxDaejeonjungangroHall2,
  megaboxDaejeonjungangroHall3,
  megaboxDaejeonjungangroHall4,
  megaboxDaejeonjungangroHall5,
  megaboxDaejeonjungangroHall6,
  megaboxDaejeonjungangroHall7,
  megaboxDaejeonjungangroHall8,
  megaboxGongjuHall1,
  megaboxGongjuHall2,
  megaboxGongjuHall3,
  megaboxGongjuHall4,
  megaboxGongjuHall5,
  megaboxGongjuHall6,
  megaboxGongjuHall7,
  megaboxSejongJochiwonHall1,
  megaboxSejongJochiwonHall2,
  megaboxSejongJochiwonHall3,
  megaboxSejongJochiwonHall4,
  megaboxSejongJochiwonHall5,
  megaboxSejongnaseongHall1,
  megaboxSejongnaseongHall2,
  megaboxSejongnaseongHall3,
  megaboxSejongnaseongHall4,
  megaboxSejongnaseongHall5,
  megaboxHongseongnaepoHall1,
  megaboxHongseongnaepoHall2,
  megaboxHongseongnaepoHall3,
  megaboxHongseongnaepoHall4,
  megaboxHongseongnaepoHall5,
  megaboxOchangHall1,
  megaboxOchangHall2,
  megaboxOchangHall3,
  megaboxOchangHall4,
  megaboxOchangHall5,
  megaboxOchangHall6,
  megaboxOchangHall7,
  megaboxOchangHall8,
  megaboxJincheonHall1,
  megaboxJincheonHall2,
  megaboxJincheonHall3,
  megaboxJincheonHall4,
  megaboxGeomdanHall1,
  megaboxGeomdanHall2,
  megaboxGeomdanHall3,
  megaboxGeomdanHall4,
  megaboxGeomdanHall5,
  megaboxIncheonnonhyeonHall1,
  megaboxIncheonnonhyeonHall2,
  megaboxIncheonnonhyeonHall3,
  megaboxIncheonnonhyeonHall4,
  megaboxIncheonnonhyeonHall5,
  megaboxIncheonnonhyeonHall6,
  megaboxIncheonnonhyeonHall7,
  megaboxIncheonnonhyeonHall8,
  megaboxSongdoTeuripeulseuteuriteuHall1,
  megaboxSongdoTeuripeulseuteuriteuHall2,
  megaboxSongdoTeuripeulseuteuriteuHall3,
  megaboxSongdoTeuripeulseuteuriteuHall4,
  megaboxSongdoTeuripeulseuteuriteuHall5,
  megaboxSongdoTeuripeulseuteuriteuS06,
  megaboxSongdoTeuripeulseuteuriteuHall7,
  megaboxSongdoTeuripeulseuteuriteuHall8,
  megaboxBaekseokbelrasitaS01,
  megaboxBaekseokbelrasitaS02,
  megaboxBaekseokbelrasitaS03,
  megaboxBaekseokbelrasitaS04,
  megaboxBaekseokbelrasitaS05,
  megaboxKintekseuS02,
  megaboxKintekseuHall3,
  megaboxKintekseuHall4,
  megaboxKintekseuHall5,
  megaboxKintekseuHall6,
  megaboxKintekseuHall7,
  megaboxKintekseuHall8,
  megaboxPajuunjeongHall1,
  megaboxPajuunjeongHall2,
  megaboxPajuunjeongHall3,
  megaboxPajuunjeongHall4,
  megaboxPajuunjeongHall5,
  megaboxPajuunjeongHall6,
  megaboxPajuunjeongHall7,
  megaboxGoyangseutapildeuHall1,
  megaboxGoyangseutapildeuHall2,
  megaboxGoyangseutapildeuHall3,
  megaboxGoyangseutapildeuHall4,
  megaboxGoyangseutapildeuHall5,
  megaboxGoyangseutapildeuS06,
  megaboxGoyangseutapildeuHall7,
  megaboxGoyangseutapildeuHall8,
  megaboxGoyangseutapildeuHall9,
  megaboxPajugeumchonHall1,
  megaboxPajugeumchonHall2,
  megaboxPajugeumchonHall3,
  megaboxPajugeumchonHall4,
  megaboxPajugeumchonHall5,
  megaboxPajugeumchonHall6,
  megaboxPajugeumchonHall7,
  megaboxGimpohangangsindosiHall1,
  megaboxGimpohangangsindosiHall2,
  megaboxGimpohangangsindosiHall3,
  megaboxGimpohangangsindosiHall4,
  megaboxGimpohangangsindosiHall5,
  megaboxBucheonseutapildeusitiHall1,
  megaboxBucheonseutapildeusitiHall2,
  megaboxBucheonseutapildeusitiHall3,
  megaboxBucheonseutapildeusitiHall4,
  megaboxBucheonseutapildeusitiHall5,
  megaboxAnsanjungangHall1,
  megaboxAnsanjungangHall2,
  megaboxAnsanjungangHall3,
  megaboxAnsanjungangHall4,
  megaboxAnsanjungangHall5,
  megaboxAnsanjungangHall6,
  megaboxSiheungbaegotHall1,
  megaboxSiheungbaegotHall2,
  megaboxSiheungbaegotHall3,
  megaboxSiheungbaegotHall4,
  megaboxSiheungbaegotHall5,
  megaboxSiheungbaegotHall6,
  megaboxDongtanHall1,
  megaboxDongtanHall2,
  megaboxDongtanHall3,
  megaboxDongtanHall4,
  megaboxDongtanHall5,
  megaboxDongtanHall6,
  megaboxDongtanHall7,
  megaboxDongtanHall8,
  megaboxYongintekeunobaelriHall1,
  megaboxYongintekeunobaelriHall2,
  megaboxYongintekeunobaelriHall3,
  megaboxYongintekeunobaelriHall4,
  megaboxYongintekeunobaelriHall5,
  megaboxYongintekeunobaelriHall6,
  megaboxBundangHall1,
  megaboxBundangHall2,
  megaboxBundangHall3,
  megaboxBundangHall4,
  megaboxBundangHall5,
  megaboxBundangHall6,
  megaboxHanamseutapildeuHall1,
  megaboxHanamseutapildeuHall2,
  megaboxHanamseutapildeuHall3,
  megaboxHanamseutapildeuHall4,
  megaboxHanamseutapildeuHall5,
  megaboxHanamseutapildeuS06,
  megaboxHanamseutapildeuS07,
  megaboxHanamseutapildeuS08,
  megaboxHanamseutapildeuS09,
  megaboxHanamseutapildeuS10,
  megaboxHanamseutapildeuS11,
  megaboxByeolnaeHall1,
  megaboxByeolnaeHall2,
  megaboxByeolnaeHall3,
  megaboxByeolnaeHall4,
  megaboxByeolnaeHall5,
  megaboxByeolnaeHall6,
  megaboxGwangjusangmuHall1,
  megaboxGwangjusangmuHall2,
  megaboxGwangjusangmuHall3,
  megaboxGwangjusangmuHall4,
  megaboxGwangjusangmuHall5,
  megaboxGwangjusangmuHall6,
  megaboxGwangjusangmuHall7,
  megaboxGwangjusangmuHall8,
  megaboxGwangjusangmuHall9,
  megaboxGwangjusangmuHall10,
  megaboxGwangjuhanamHall1,
  megaboxGwangjuhanamHall2,
  megaboxGwangjuhanamHall3,
  megaboxGwangjuhanamHall4,
  megaboxGwangjuhanamHall5,
  megaboxGwangjuhanamHall6,
  megaboxGwangjuhanamHall7,
  megaboxGwangjuhanamHall8,
  megaboxGwangjuhanamHall9,
  megaboxGwangjuhanamHall10,
  megaboxCheomdanHall1,
  megaboxCheomdanHall2,
  megaboxCheomdanHall3,
  megaboxCheomdanHall4,
  megaboxCheomdanHall5,
  megaboxCheomdanHall6,
  megaboxCheomdanHall7,
  megaboxCheomdanHall8,
  megaboxCheomdanHall9,
  megaboxMokpohadangPoreumoHall1,
  megaboxMokpohadangPoreumoHall2,
  megaboxMokpohadangPoreumoHall3,
  megaboxMokpohadangPoreumoHall4,
  megaboxMokpohadangPoreumoHall5,
  megaboxMokpohadangPoreumoHall6,
  megaboxMokpohadangPoreumoHall7,
  megaboxSuncheonHall1,
  megaboxSuncheonHall2,
  megaboxSuncheonHall3,
  megaboxSuncheonHall4,
  megaboxSuncheonHall5,
  megaboxSuncheonHall6,
  megaboxSuncheonHall7,
  megaboxYeosuungcheonHall1,
  megaboxYeosuungcheonHall2,
  megaboxYeosuungcheonHall3,
  megaboxYeosuungcheonHall4,
  megaboxYeosuungcheonHall5,
  megaboxYeosuungcheonHall6,
  megaboxYeosuungcheonHall7,
  megaboxYeosuungcheonHall8,
  megaboxBusangeukjangHall1,
  megaboxBusangeukjangHall2,
  megaboxBusangeukjangHall3,
  megaboxBusangeukjangHall4,
  megaboxDeokcheonHall1,
  megaboxDeokcheonHall2,
  megaboxDeokcheonHall3,
  megaboxDeokcheonHall4,
  megaboxDeokcheonHall5,
  megaboxDeokcheonHall6,
  megaboxDeokcheonHall7,
  megaboxDeokcheonHall8,
  megaboxDeokcheonHall9,
  megaboxYangsanjeungsanHall1,
  megaboxYangsanjeungsanHall2,
  megaboxYangsanjeungsanHall3,
  megaboxYangsanjeungsanHall4,
  megaboxYangsanjeungsanHall5,
  megaboxYangsanjeungsanHall6,
  megaboxYangsanjeungsanHall7,
  megaboxSamcheonpoHall1,
  megaboxSamcheonpoHall2,
  megaboxSamcheonpoHall3,
  megaboxDaegusinsegyeDongdaeguS01,
  megaboxDaegusinsegyeDongdaeguHall2,
  megaboxDaegusinsegyeDongdaeguHall3,
  megaboxDaegusinsegyeDongdaeguHall4,
  megaboxDaegusinsegyeDongdaeguHall5,
  megaboxDaegusinsegyeDongdaeguHall6,
  megaboxGyeongsanhayangHall1,
  megaboxGyeongsanhayangHall2,
  megaboxGyeongsanhayangHall3,
  megaboxGyeongsanhayangHall4,
  megaboxGyeongsanhayangHall5,
  megaboxGumigangdongHall1,
  megaboxGumigangdongHall2,
  megaboxGumigangdongHall3,
  megaboxGumigangdongHall4,
  megaboxGumigangdongHall5,
  megaboxGumigangdongHall6,
  megaboxGimcheonHall1,
  megaboxGimcheonHall2,
  megaboxGimcheonHall3,
  megaboxGimcheonHall4,
];

export const CHAIN_SCHEDULE_FILES: unknown[] = [
  cgvGangnamSchedule,
  cgvGangbyeonSchedule,
  cgvGodeokgangilSchedule,
  cgvGuroSchedule,
  cgvDaehakroSchedule,
  cgvDongdaemunSchedule,
  cgvDeungchonSchedule,
  cgvMyeongdongSchedule,
  cgvMiaSchedule,
  cgvBanghakSchedule,
  cgvBulgwangSchedule,
  cgvSangbongSchedule,
  cgvSeongsinyeodaeipguSchedule,
  cgvSuyuSchedule,
  cgvSinchonateureonSchedule,
  cgvApgujeongSchedule,
  cgvSsinedeuswepeuApgujeongSchedule,
  cgvYeouidoSchedule,
  cgvYeonnamSchedule,
  cgvYeongdeungpotaimseukweeoSchedule,
  cgvWangsipriSchedule,
  cgvYongsanIparkMallSchedule,
  cgvSsinedeuswepeuYongsanSchedule,
  cgvJunggyeSchedule,
  cgvCheonhoSchedule,
  cgvCheongdamssinesitiSchedule,
  cgvPikadiri1958Schedule,
  cgvHongdaeSchedule,
  cgvGyeonggigwangjuSchedule,
  cgvGoyangbaekseokSchedule,
  cgvGoyanghaengsinSchedule,
  cgvGwanggyoSchedule,
  cgvGwangmyeongyeokSchedule,
  cgvGuriSchedule,
  cgvGurigalmaeSchedule,
  cgvGiheungSchedule,
  cgvGimpoSchedule,
  cgvGimpounyangSchedule,
  cgvGimpohangangSchedule,
  cgvNamyangjuhwadoSchedule,
  cgvDasanSchedule,
  cgvDongbaekSchedule,
  cgvDongsuwonSchedule,
  cgvDongtanSchedule,
  cgvDongtangeurangpasajyuSchedule,
  cgvDongtanyeokSchedule,
  cgvDongtanhosugongwonSchedule,
  cgvBaegotSchedule,
  cgvBeomgyeSchedule,
  cgvBucheonSchedule,
  cgvBucheonyeokSchedule,
  cgvSeohyeonSchedule,
  cgvSopungSchedule,
  cgvSeutapildeusitiwiryeSchedule,
  cgvSinsegyegyeonggiSchedule,
  cgvAnsanSchedule,
  cgvAnseongSchedule,
  cgvYatapSchedule,
  cgvYangjuokjeongSchedule,
  cgvYeokgokSchedule,
  cgvOriSchedule,
  cgvOsanjungangSchedule,
  cgvYonginSchedule,
  cgvUijeongbuSchedule,
  cgvIcheonSchedule,
  cgvIlsanSchedule,
  cgvPajumunsanSchedule,
  cgvPajuunjeongSchedule,
  cgvPyeongchonSchedule,
  cgvPyeongtaekSchedule,
  cgvPyeongtaekgodeokSchedule,
  cgvPyeongtaeksosaSchedule,
  cgvPocheonSchedule,
  cgvHwaseongbongdamSchedule,
  cgvHwajeongSchedule,
  cgvDriveInYonginKeuraeksaideuSchedule,
  cgvGyeyangSchedule,
  cgvBupyeongSchedule,
  cgvSongdotaimseupeiseuSchedule,
  cgvIncheonSchedule,
  cgvIncheongajeongSchedule,
  cgvIncheondohwaSchedule,
  cgvIncheonsimingongwonSchedule,
  cgvIncheonyeonsuSchedule,
  cgvIncheonhakikSchedule,
  cgvJuanyeokSchedule,
  cgvCheongraSchedule,
  cgvGangreungSchedule,
  cgvGirinSchedule,
  cgvWontongSchedule,
  cgvInjeSchedule,
  cgvChuncheonSchedule,
  cgvNonsanSchedule,
  cgvDangjinSchedule,
  cgvDaejeonSchedule,
  cgvDaejeongasuwonSchedule,
  cgvDaejeongaoSchedule,
  cgvDaejeontanbangSchedule,
  cgvDaejeonteomineolSchedule,
  cgvSeosanSchedule,
  cgvSejongSchedule,
  cgvAsanSchedule,
  cgvYuseongnoeunSchedule,
  cgvCheonanSchedule,
  cgvCheonanteomineolSchedule,
  cgvCheonanpentapoteuSchedule,
  cgvCheongjuSeomunSchedule,
  cgvCheongjujiwelsitiSchedule,
  cgvCheongjuteomineolSchedule,
  cgvChungjugyohyeonSchedule,
  cgvHongseongSchedule,
  cgvDaeguSchedule,
  cgvDaegususeongSchedule,
  cgvDaeguseutadiumSchedule,
  cgvDaeguyeongyeongSchedule,
  cgvDaeguwolseongSchedule,
  cgvDaegujukjeonSchedule,
  cgvDaeguhanilSchedule,
  cgvDaeguhyeondaeSchedule,
  cgvDaeyeonSchedule,
  cgvDongraeSchedule,
  cgvBusanmyeongjiSchedule,
  cgvSeomyeonSchedule,
  cgvSeomyeonsamjeongtawoSchedule,
  cgvSeomyeonsangsangmadangSchedule,
  cgvSenteomsitiSchedule,
  cgvSsinedeuswepeuSenteomSchedule,
  cgvAsiadeuSchedule,
  cgvUlsandongguSchedule,
  cgvUlsansamsanSchedule,
  cgvUlsanseongnamSchedule,
  cgvUlsansincheonSchedule,
  cgvUlsanjinjangSchedule,
  cgvJeonggwanSchedule,
  cgvHadanateumolringSchedule,
  cgvHaeundaeSchedule,
  cgvDriveInYeongdoSchedule,
  cgvGeojeSchedule,
  cgvGoseongSchedule,
  cgvGumiSchedule,
  cgvGimcheonyulgokSchedule,
  cgvGimhaeSchedule,
  cgvGimhaeyulhaSchedule,
  cgvGimhaejangyuSchedule,
  cgvMasanSchedule,
  cgvBukpohangSchedule,
  cgvAndongSchedule,
  cgvYangsansamhoSchedule,
  cgvJinjuhyeoksinSchedule,
  cgvChangwondeositiSchedule,
  cgvChangwonsangnamSchedule,
  cgvGwangyangSchedule,
  cgvGwangyangElepeuseukweeoSchedule,
  cgvGwangjugeumnamroSchedule,
  cgvGwangjusangmuSchedule,
  cgvGwangjuyongbongSchedule,
  cgvGwangjucheomdanSchedule,
  cgvGwangjuchungjangroSchedule,
  cgvGwangjuhanamSchedule,
  cgvNajuSchedule,
  cgvMokpopyeonghwagwangjangSchedule,
  cgvSeojeonjuSchedule,
  cgvSuncheonsindaeSchedule,
  cgvYeosuungcheonSchedule,
  cgvIksanSchedule,
  cgvJeonjugosaSchedule,
  cgvJeonjuekositiSchedule,
  cgvJeonjuhyojaSchedule,
  cgvJeongeupSchedule,
  cgvJejuSchedule,
  cgvJejunohyeongSchedule,
  megaboxDaejeonyuseongSchedule,
  megaboxJeondaeGwangjuSchedule,
  megaboxDaejeonhyeondaepeurimieomaulretSchedule,
  megaboxNonsanSchedule,
  megaboxNamyangjuhyeondaeaulretseupeiseuwonSchedule,
  megaboxAnseongseutapildeuSchedule,
  megaboxJeonjuhyeoksinSchedule,
  megaboxDaeguisiaSchedule,
  megaboxBukdaeguChilgokSchedule,
  megaboxDaejeonsinsegyeateuaensaieonseuSchedule,
  megaboxGwangmyeongakpeulrajaSchedule,
  megaboxSasangSchedule,
  megaboxGeumjeongakpeulrajaSchedule,
  megaboxChuncheonseoksaSchedule,
  megaboxPyeongnaehopyeongyeokGuNamyangjuSchedule,
  megaboxGyeongbukdocheongSchedule,
  megaboxDeobutikeumokdonghyeondaebaekhwajeomSchedule,
  megaboxSuwonnammunSchedule,
  megaboxJinjuJunganSchedule,
  megaboxChangwonSchedule,
  megaboxCheongjusachangSchedule,
  megaboxJeonjugaeksaSchedule,
  megaboxSuwonSchedule,
  megaboxSuwonakpeulrajaSuwonyeokSchedule,
  megaboxGwangmyeongsohaSchedule,
  megaboxJejuseogwipoSchedule,
  megaboxCheonanSchedule,
  megaboxUlsanSchedule,
  megaboxJejusamhwaSchedule,
  megaboxSuwoningyeSchedule,
  megaboxBusandaeSchedule,
  megaboxSuwonseutapildeuSchedule,
  megaboxPyeongtaekbijeonSchedule,
  megaboxJejuaraSchedule,
  megaboxDaegusebeunbaelriChilgokSchedule,
  megaboxChungjuyeonsuSchedule,
  megaboxCheongjuseongangilSchedule,
  megaboxUijeongbuminrakSchedule,
  megaboxDaegupeurimieommangyeonggwanSchedule,
  megaboxNampohangSchedule,
  megaboxMasanGyeongnamdaeSchedule,
  megaboxHaeundaeJangsanSchedule,
  megaboxYeongjonghaneuldosiSchedule,
  megaboxSeomyeondaehanSchedule,
  megaboxHwagokSchedule,
  megaboxMisagangbyeonHanamjonghapundongjangSchedule,
  megaboxIncheonhakikSitiossielSchedule,
  megaboxSeongnammoranSchedule,
  megaboxHwamyeongSchedule,
  megaboxSiheungjeongwangSchedule,
  megaboxDongtanyeokSchedule,
  megaboxGuuiiseuteupolSchedule,
  megaboxCheongjuteomineolSchedule,
  megaboxYangsanSchedule,
  megaboxIsuSchedule,
  megaboxSangamwoldeukeopgyeonggijangSchedule,
  megaboxHongdaeAnimeSchedule,
  megaboxSangbongSchedule,
  megaboxGangdongSchedule,
  megaboxKoekseuSchedule,
  megaboxSenteureolSchedule,
  megaboxGangnamSchedule,
  megaboxSongpapakeuhabioSchedule,
  megaboxGunjaSchedule,
  megaboxMagokSchedule,
  megaboxMokdongSchedule,
  megaboxNamchuncheonSchedule,
  megaboxSokchoSchedule,
  megaboxWonjuhyeoksinSchedule,
  megaboxDaejeonjungangroSchedule,
  megaboxGongjuSchedule,
  megaboxSejongJochiwonSchedule,
  megaboxSejongnaseongSchedule,
  megaboxHongseongnaepoSchedule,
  megaboxOchangSchedule,
  megaboxJincheonSchedule,
  megaboxGeomdanSchedule,
  megaboxIncheonnonhyeonSchedule,
  megaboxSongdoTeuripeulseuteuriteuSchedule,
  megaboxBaekseokbelrasitaSchedule,
  megaboxKintekseuSchedule,
  megaboxPajuunjeongSchedule,
  megaboxGoyangseutapildeuSchedule,
  megaboxPajugeumchonSchedule,
  megaboxGimpohangangsindosiSchedule,
  megaboxBucheonseutapildeusitiSchedule,
  megaboxAnsanjungangSchedule,
  megaboxSiheungbaegotSchedule,
  megaboxDongtanSchedule,
  megaboxYongintekeunobaelriSchedule,
  megaboxBundangSchedule,
  megaboxHanamseutapildeuSchedule,
  megaboxByeolnaeSchedule,
  megaboxGwangjusangmuSchedule,
  megaboxGwangjuhanamSchedule,
  megaboxCheomdanSchedule,
  megaboxMokpohadangPoreumoSchedule,
  megaboxSuncheonSchedule,
  megaboxYeosuungcheonSchedule,
  megaboxBusangeukjangSchedule,
  megaboxDeokcheonSchedule,
  megaboxYangsanjeungsanSchedule,
  megaboxSamcheonpoSchedule,
  megaboxDaegusinsegyeDongdaeguSchedule,
  megaboxGyeongsanhayangSchedule,
  megaboxGumigangdongSchedule,
  megaboxGimcheonSchedule,
];

/** 지점마다 예매 좌석 데이터의 좌석 수 합(용산 IMAX관은 손으로 옮긴 624석 포함). */
export const CHAIN_SEAT_TOTALS: Record<string, number> = {
  "cgv-gangnam": 672,
  "cgv-gangbyeon": 1466,
  "cgv-godeokgangil": 827,
  "cgv-guro": 1232,
  "cgv-daehakro": 972,
  "cgv-dongdaemun": 541,
  "cgv-deungchon": 934,
  "cgv-myeongdong": 736,
  "cgv-mia": 691,
  "cgv-banghak": 870,
  "cgv-bulgwang": 1023,
  "cgv-sangbong": 1155,
  "cgv-seongsinyeodaeipgu": 637,
  "cgv-suyu": 972,
  "cgv-sinchonateureon": 997,
  "cgv-apgujeong": 724,
  "cgv-ssinedeuswepeu-apgujeong": 76,
  "cgv-yeouido": 612,
  "cgv-yeonnam": 770,
  "cgv-yeongdeungpotaimseukweeo": 2266,
  "cgv-wangsipri": 1502,
  "cgv-yongsan-ipark-mall": 3552,
  "cgv-ssinedeuswepeu-yongsan": 74,
  "cgv-junggye": 1090,
  "cgv-cheonho": 1216,
  "cgv-cheongdamssinesiti": 634,
  "cgv-pikadiri1958": 619,
  "cgv-hongdae": 830,
  "cgv-gyeonggigwangju": 1202,
  "cgv-goyangbaekseok": 697,
  "cgv-goyanghaengsin": 403,
  "cgv-gwanggyo": 1354,
  "cgv-gwangmyeongyeok": 374,
  "cgv-guri": 1165,
  "cgv-gurigalmae": 492,
  "cgv-giheung": 744,
  "cgv-gimpo": 727,
  "cgv-gimpounyang": 424,
  "cgv-gimpohangang": 478,
  "cgv-namyangjuhwado": 538,
  "cgv-dasan": 514,
  "cgv-dongbaek": 1144,
  "cgv-dongsuwon": 1130,
  "cgv-dongtan": 1402,
  "cgv-dongtangeurangpasajyu": 552,
  "cgv-dongtanyeok": 1026,
  "cgv-dongtanhosugongwon": 640,
  "cgv-baegot": 758,
  "cgv-beomgye": 362,
  "cgv-bucheon": 1243,
  "cgv-bucheonyeok": 1119,
  "cgv-seohyeon": 447,
  "cgv-sopung": 1578,
  "cgv-seutapildeusitiwirye": 848,
  "cgv-sinsegyegyeonggi": 666,
  "cgv-ansan": 1608,
  "cgv-anseong": 969,
  "cgv-yatap": 1247,
  "cgv-yangjuokjeong": 674,
  "cgv-yeokgok": 451,
  "cgv-ori": 1570,
  "cgv-osanjungang": 552,
  "cgv-yongin": 671,
  "cgv-uijeongbu": 1401,
  "cgv-icheon": 1143,
  "cgv-ilsan": 1132,
  "cgv-pajumunsan": 341,
  "cgv-pajuunjeong": 352,
  "cgv-pyeongchon": 1391,
  "cgv-pyeongtaek": 1087,
  "cgv-pyeongtaekgodeok": 516,
  "cgv-pyeongtaeksosa": 750,
  "cgv-pocheon": 415,
  "cgv-hwaseongbongdam": 373,
  "cgv-hwajeong": 567,
  "cgv-drive-in-yongin-keuraeksaideu": 200,
  "cgv-gyeyang": 977,
  "cgv-bupyeong": 776,
  "cgv-songdotaimseupeiseu": 694,
  "cgv-incheon": 1979,
  "cgv-incheongajeong": 515,
  "cgv-incheondohwa": 503,
  "cgv-incheonsimingongwon": 373,
  "cgv-incheonyeonsu": 1213,
  "cgv-incheonhakik": 1012,
  "cgv-juanyeok": 1004,
  "cgv-cheongra": 796,
  "cgv-gangreung": 713,
  "cgv-girin": 95,
  "cgv-wontong": 92,
  "cgv-inje": 96,
  "cgv-chuncheon": 1789,
  "cgv-nonsan": 500,
  "cgv-dangjin": 1075,
  "cgv-daejeon": 1880,
  "cgv-daejeongasuwon": 1016,
  "cgv-daejeongao": 1163,
  "cgv-daejeontanbang": 798,
  "cgv-daejeonteomineol": 1385,
  "cgv-seosan": 820,
  "cgv-sejong": 1094,
  "cgv-asan": 634,
  "cgv-yuseongnoeun": 968,
  "cgv-cheonan": 919,
  "cgv-cheonanteomineol": 1560,
  "cgv-cheonanpentapoteu": 1294,
  "cgv-cheongju-seomun": 1364,
  "cgv-cheongjujiwelsiti": 1214,
  "cgv-cheongjuteomineol": 676,
  "cgv-chungjugyohyeon": 463,
  "cgv-hongseong": 646,
  "cgv-daegu": 1339,
  "cgv-daegususeong": 398,
  "cgv-daeguseutadium": 733,
  "cgv-daeguyeongyeong": 556,
  "cgv-daeguwolseong": 1042,
  "cgv-daegujukjeon": 544,
  "cgv-daeguhanil": 474,
  "cgv-daeguhyeondae": 710,
  "cgv-daeyeon": 1171,
  "cgv-dongrae": 1063,
  "cgv-busanmyeongji": 431,
  "cgv-seomyeon": 2280,
  "cgv-seomyeonsamjeongtawo": 1133,
  "cgv-seomyeonsangsangmadang": 658,
  "cgv-senteomsiti": 1689,
  "cgv-ssinedeuswepeu-senteom": 90,
  "cgv-asiadeu": 1382,
  "cgv-ulsandonggu": 383,
  "cgv-ulsansamsan": 2332,
  "cgv-ulsanseongnam": 465,
  "cgv-ulsansincheon": 363,
  "cgv-ulsanjinjang": 1066,
  "cgv-jeonggwan": 627,
  "cgv-hadanateumolring": 750,
  "cgv-haeundae": 437,
  "cgv-drive-in-yeongdo": 284,
  "cgv-geoje": 1223,
  "cgv-goseong": 116,
  "cgv-gumi": 1251,
  "cgv-gimcheonyulgok": 816,
  "cgv-gimhae": 1531,
  "cgv-gimhaeyulha": 262,
  "cgv-gimhaejangyu": 673,
  "cgv-masan": 1178,
  "cgv-bukpohang": 822,
  "cgv-andong": 670,
  "cgv-yangsansamho": 411,
  "cgv-jinjuhyeoksin": 724,
  "cgv-changwondeositi": 903,
  "cgv-changwonsangnam": 593,
  "cgv-gwangyang": 670,
  "cgv-gwangyang-elepeuseukweeo": 1204,
  "cgv-gwangjugeumnamro": 936,
  "cgv-gwangjusangmu": 1200,
  "cgv-gwangjuyongbong": 1465,
  "cgv-gwangjucheomdan": 739,
  "cgv-gwangjuchungjangro": 458,
  "cgv-gwangjuhanam": 835,
  "cgv-naju": 659,
  "cgv-mokpopyeonghwagwangjang": 1297,
  "cgv-seojeonju": 720,
  "cgv-suncheonsindae": 1446,
  "cgv-yeosuungcheon": 872,
  "cgv-iksan": 895,
  "cgv-jeonjugosa": 1275,
  "cgv-jeonjuekositi": 806,
  "cgv-jeonjuhyoja": 1795,
  "cgv-jeongeup": 553,
  "cgv-jeju": 842,
  "cgv-jejunohyeong": 615,
  "megabox-daejeonyuseong": 923,
  "megabox-jeondae-gwangju": 958,
  "megabox-daejeonhyeondaepeurimieomaulret": 1177,
  "megabox-nonsan": 452,
  "megabox-namyangjuhyeondaeaulretseupeiseuwon": 1215,
  "megabox-anseongseutapildeu": 1256,
  "megabox-jeonjuhyeoksin": 732,
  "megabox-daeguisia": 630,
  "megabox-bukdaegu-chilgok": 577,
  "megabox-daejeonsinsegyeateuaensaieonseu": 976,
  "megabox-gwangmyeongakpeulraja": 795,
  "megabox-sasang": 885,
  "megabox-geumjeongakpeulraja": 613,
  "megabox-chuncheonseoksa": 987,
  "megabox-pyeongnaehopyeongyeok-gu-namyangju": 738,
  "megabox-gyeongbukdocheong": 396,
  "megabox-deobutikeumokdonghyeondaebaekhwajeom": 883,
  "megabox-suwonnammun": 248,
  "megabox-jinju-jungan": 628,
  "megabox-changwon": 508,
  "megabox-cheongjusachang": 380,
  "megabox-jeonjugaeksa": 850,
  "megabox-suwon": 631,
  "megabox-suwonakpeulraja-suwonyeok": 1920,
  "megabox-gwangmyeongsoha": 474,
  "megabox-jejuseogwipo": 99,
  "megabox-cheonan": 989,
  "megabox-ulsan": 312,
  "megabox-jejusamhwa": 260,
  "megabox-suwoningye": 577,
  "megabox-busandae": 613,
  "megabox-suwonseutapildeu": 1007,
  "megabox-pyeongtaekbijeon": 333,
  "megabox-jejuara": 410,
  "megabox-daegusebeunbaelri-chilgok": 626,
  "megabox-chungjuyeonsu": 643,
  "megabox-cheongjuseongangil": 752,
  "megabox-uijeongbuminrak": 575,
  "megabox-daegupeurimieommangyeonggwan": 679,
  "megabox-nampohang": 663,
  "megabox-masan-gyeongnamdae": 521,
  "megabox-haeundae-jangsan": 446,
  "megabox-yeongjonghaneuldosi": 270,
  "megabox-seomyeondaehan": 334,
  "megabox-hwagok": 365,
  "megabox-misagangbyeon-hanamjonghapundongjang": 250,
  "megabox-incheonhakik-sitiossiel": 446,
  "megabox-seongnammoran": 714,
  "megabox-hwamyeong": 267,
  "megabox-siheungjeongwang": 448,
  "megabox-dongtanyeok": 476,
  "megabox-guuiiseuteupol": 679,
  "megabox-cheongjuteomineol": 644,
  "megabox-yangsan": 528,
  "megabox-isu": 888,
  "megabox-sangamwoldeukeopgyeonggijang": 1025,
  "megabox-hongdae-anime": 726,
  "megabox-sangbong": 526,
  "megabox-gangdong": 996,
  "megabox-koekseu": 2708,
  "megabox-senteureol": 680,
  "megabox-gangnam": 494,
  "megabox-songpapakeuhabio": 1007,
  "megabox-gunja": 1127,
  "megabox-magok": 815,
  "megabox-mokdong": 1570,
  "megabox-namchuncheon": 1134,
  "megabox-sokcho": 569,
  "megabox-wonjuhyeoksin": 673,
  "megabox-daejeonjungangro": 1124,
  "megabox-gongju": 736,
  "megabox-sejong-jochiwon": 749,
  "megabox-sejongnaseong": 759,
  "megabox-hongseongnaepo": 657,
  "megabox-ochang": 1013,
  "megabox-jincheon": 372,
  "megabox-geomdan": 457,
  "megabox-incheonnonhyeon": 1157,
  "megabox-songdo-teuripeulseuteuriteu": 1206,
  "megabox-baekseokbelrasita": 749,
  "megabox-kintekseu": 1299,
  "megabox-pajuunjeong": 882,
  "megabox-goyangseutapildeu": 1214,
  "megabox-pajugeumchon": 921,
  "megabox-gimpohangangsindosi": 712,
  "megabox-bucheonseutapildeusiti": 829,
  "megabox-ansanjungang": 371,
  "megabox-siheungbaegot": 1227,
  "megabox-dongtan": 716,
  "megabox-yongintekeunobaelri": 611,
  "megabox-bundang": 354,
  "megabox-hanamseutapildeu": 1466,
  "megabox-byeolnae": 270,
  "megabox-gwangjusangmu": 837,
  "megabox-gwangjuhanam": 918,
  "megabox-cheomdan": 1157,
  "megabox-mokpohadang-poreumo": 998,
  "megabox-suncheon": 920,
  "megabox-yeosuungcheon": 1138,
  "megabox-busangeukjang": 632,
  "megabox-deokcheon": 690,
  "megabox-yangsanjeungsan": 777,
  "megabox-samcheonpo": 90,
  "megabox-daegusinsegye-dongdaegu": 901,
  "megabox-gyeongsanhayang": 501,
  "megabox-gumigangdong": 976,
  "megabox-gimcheon": 642,
};

/** 메가박스 지점의 지점 번호와 상영관 번호(theabNo) → 상영관 id. 실제 시간표·좌석을 받을 때 쓴다. */
export const MEGABOX_LIVE: Record<string, { brchNo: string; screens: Record<string, string> }> = {
  "megabox-daejeonyuseong": { brchNo: "0009", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-jeondae-gwangju": { brchNo: "0010", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-daejeonhyeondaepeurimieomaulret": { brchNo: "0017", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "s04", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-nonsan": { brchNo: "0018", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-namyangjuhyeondaeaulretseupeiseuwon": { brchNo: "0019", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "s05", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-anseongseutapildeu": { brchNo: "0020", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "s05", "06": "hall-6", "07": "hall-7" } },
  "megabox-jeonjuhyeoksin": { brchNo: "0021", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-daeguisia": { brchNo: "0022", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-bukdaegu-chilgok": { brchNo: "0025", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-daejeonsinsegyeateuaensaieonseu": { brchNo: "0028", screens: { "01": "hall-1", "02": "s02", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "s07" } },
  "megabox-gwangmyeongakpeulraja": { brchNo: "0029", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-sasang": { brchNo: "0032", screens: { "01": "hall-1", "02": "hall-2", "06": "hall-6", "07": "hall-7" } },
  "megabox-geumjeongakpeulraja": { brchNo: "0035", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-chuncheonseoksa": { brchNo: "0037", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-pyeongnaehopyeongyeok-gu-namyangju": { brchNo: "0039", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-gyeongbukdocheong": { brchNo: "0040", screens: { "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-deobutikeumokdonghyeondaebaekhwajeom": { brchNo: "0041", screens: { "01": "s01", "02": "s02", "03": "s03", "04": "s04", "05": "s05", "06": "s06", "07": "s07", "08": "s08" } },
  "megabox-suwonnammun": { brchNo: "0042", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-jinju-jungan": { brchNo: "0045", screens: { "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-changwon": { brchNo: "0048", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-cheongjusachang": { brchNo: "0049", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-jeonjugaeksa": { brchNo: "0050", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9", "10": "hall-10" } },
  "megabox-suwon": { brchNo: "0051", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-suwonakpeulraja-suwonyeok": { brchNo: "0052", screens: { "01": "s01", "02": "hall-2", "03": "hall-3", "04": "s04", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-gwangmyeongsoha": { brchNo: "0053", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-jejuseogwipo": { brchNo: "0054", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3" } },
  "megabox-cheonan": { brchNo: "0056", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-ulsan": { brchNo: "0057", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-jejusamhwa": { brchNo: "0059", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-suwoningye": { brchNo: "0060", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-busandae": { brchNo: "0061", screens: { "01": "hall-1", "02": "hall-2", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-suwonseutapildeu": { brchNo: "0062", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "s04", "05": "hall-5", "06": "hall-6" } },
  "megabox-pyeongtaekbijeon": { brchNo: "0064", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-jejuara": { brchNo: "0066", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-daegusebeunbaelri-chilgok": { brchNo: "0067", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-chungjuyeonsu": { brchNo: "0068", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-cheongjuseongangil": { brchNo: "0069", screens: { "01": "hall-1", "03": "hall-3", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-uijeongbuminrak": { brchNo: "0070", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-daegupeurimieommangyeonggwan": { brchNo: "0072", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-nampohang": { brchNo: "0074", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-masan-gyeongnamdae": { brchNo: "0076", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-haeundae-jangsan": { brchNo: "0079", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-yeongjonghaneuldosi": { brchNo: "0080", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3" } },
  "megabox-seomyeondaehan": { brchNo: "0082", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-hwagok": { brchNo: "0083", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-misagangbyeon-hanamjonghapundongjang": { brchNo: "0084", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-incheonhakik-sitiossiel": { brchNo: "0085", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-seongnammoran": { brchNo: "0086", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-hwamyeong": { brchNo: "0087", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "06": "hall-6" } },
  "megabox-siheungjeongwang": { brchNo: "0088", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-dongtanyeok": { brchNo: "0089", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-guuiiseuteupol": { brchNo: "0090", screens: { "01": "s01", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-cheongjuteomineol": { brchNo: "0094", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "s07" } },
  "megabox-yangsan": { brchNo: "0097", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-isu": { brchNo: "0099", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-sangamwoldeukeopgyeonggijang": { brchNo: "1211", screens: { "01": "hall-1", "02": "s02", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-hongdae-anime": { brchNo: "1212", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-sangbong": { brchNo: "1311", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-gangdong": { brchNo: "1341", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-koekseu": { brchNo: "1351", screens: { "01": "s01", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "s09", "10": "hall-10", "11": "hall-11", "12": "s12", "13": "s13", "14": "s14", "15": "s15", "16": "s16", "17": "s17", "18": "s18" } },
  "megabox-senteureol": { brchNo: "1371", screens: { "01": "s01", "02": "s02", "03": "s03", "04": "s04", "05": "s05" } },
  "megabox-gangnam": { brchNo: "1372", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-songpapakeuhabio": { brchNo: "1381", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-gunja": { brchNo: "1431", screens: { "01": "hall-1", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9", "10": "hall-10" } },
  "megabox-magok": { brchNo: "1572", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-mokdong": { brchNo: "1581", screens: { "01": "s01", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-namchuncheon": { brchNo: "2001", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-sokcho": { brchNo: "2171", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-wonjuhyeoksin": { brchNo: "2202", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-daejeonjungangro": { brchNo: "3011", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-gongju": { brchNo: "3141", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-sejong-jochiwon": { brchNo: "3391", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-sejongnaseong": { brchNo: "3392", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-hongseongnaepo": { brchNo: "3501", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-ochang": { brchNo: "3631", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-jincheon": { brchNo: "3651", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
  "megabox-geomdan": { brchNo: "4041", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-incheonnonhyeon": { brchNo: "4051", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-songdo-teuripeulseuteuriteu": { brchNo: "4062", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "s06", "07": "hall-7", "08": "hall-8" } },
  "megabox-baekseokbelrasita": { brchNo: "4104", screens: { "01": "s01", "02": "s02", "03": "s03", "04": "s04", "05": "s05" } },
  "megabox-kintekseu": { brchNo: "4112", screens: { "02": "s02", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-pajuunjeong": { brchNo: "4115", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-goyangseutapildeu": { brchNo: "4121", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "s06", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-pajugeumchon": { brchNo: "4132", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-gimpohangangsindosi": { brchNo: "4152", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-bucheonseutapildeusiti": { brchNo: "4221", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-ansanjungang": { brchNo: "4253", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-siheungbaegot": { brchNo: "4291", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-dongtan": { brchNo: "4451", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-yongintekeunobaelri": { brchNo: "4462", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-bundang": { brchNo: "4631", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "08": "hall-6" } },
  "megabox-hanamseutapildeu": { brchNo: "4651", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "s06", "07": "s07", "08": "s08", "09": "s09", "10": "s10", "11": "s11" } },
  "megabox-byeolnae": { brchNo: "4722", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-gwangjusangmu": { brchNo: "5021", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9", "10": "hall-10" } },
  "megabox-gwangjuhanam": { brchNo: "5061", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9", "10": "hall-10" } },
  "megabox-cheomdan": { brchNo: "5064", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-mokpohadang-poreumo": { brchNo: "5302", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-suncheon": { brchNo: "5401", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-yeosuungcheon": { brchNo: "5552", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8" } },
  "megabox-busangeukjang": { brchNo: "6001", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "09": "hall-4" } },
  "megabox-deokcheon": { brchNo: "6161", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7", "08": "hall-8", "09": "hall-9" } },
  "megabox-yangsanjeungsan": { brchNo: "6262", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6", "07": "hall-7" } },
  "megabox-samcheonpo": { brchNo: "6642", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3" } },
  "megabox-daegusinsegye-dongdaegu": { brchNo: "7011", screens: { "01": "s01", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-gyeongsanhayang": { brchNo: "7122", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5" } },
  "megabox-gumigangdong": { brchNo: "7303", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4", "05": "hall-5", "06": "hall-6" } },
  "megabox-gimcheon": { brchNo: "7401", screens: { "01": "hall-1", "02": "hall-2", "03": "hall-3", "04": "hall-4" } },
};
