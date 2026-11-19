/**
 * 롯데시네마 전국 지점 데이터 등록부. 손으로 고치지 않는다.
 * 롯데시네마 예매 좌석 데이터(서울 2026-11-18, 그 밖의 지역 2026-11-19)에서 만든 파일을 정적으로 import 한다.
 * registry.ts·showtimes.ts 가 쓴다.
 */
import lotteGasanDigitalTheater from "@data/theaters/lotte-gasan-digital/theater.json";
import lotteGasanDigitalSchedule from "@data/showtimes/lotte-gasan-digital.json";
import lotteGasanDigitalHall1 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-1.json";
import lotteGasanDigitalHall2 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-2.json";
import lotteGasanDigitalHall3 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-3.json";
import lotteGasanDigitalHall4 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-4.json";
import lotteGasanDigitalHall5 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-5.json";
import lotteGasanDigitalHall6 from "@data/theaters/lotte-gasan-digital/seatmaps/hall-6.json";
import lotteGayangTheater from "@data/theaters/lotte-gayang/theater.json";
import lotteGayangSchedule from "@data/showtimes/lotte-gayang.json";
import lotteGayangHall1 from "@data/theaters/lotte-gayang/seatmaps/hall-1.json";
import lotteGayangHall2 from "@data/theaters/lotte-gayang/seatmaps/hall-2.json";
import lotteGayangHall3 from "@data/theaters/lotte-gayang/seatmaps/hall-3.json";
import lotteGayangHall4 from "@data/theaters/lotte-gayang/seatmaps/hall-4.json";
import lotteGayangHall5 from "@data/theaters/lotte-gayang/seatmaps/hall-5.json";
import lotteGayangHall6 from "@data/theaters/lotte-gayang/seatmaps/hall-6.json";
import lotteGangdongTheater from "@data/theaters/lotte-gangdong/theater.json";
import lotteGangdongSchedule from "@data/showtimes/lotte-gangdong.json";
import lotteGangdongHall1 from "@data/theaters/lotte-gangdong/seatmaps/hall-1.json";
import lotteGangdongHall2 from "@data/theaters/lotte-gangdong/seatmaps/hall-2.json";
import lotteGangdongHall3 from "@data/theaters/lotte-gangdong/seatmaps/hall-3.json";
import lotteGangdongHall4 from "@data/theaters/lotte-gangdong/seatmaps/hall-4.json";
import lotteGangdongHall5 from "@data/theaters/lotte-gangdong/seatmaps/hall-5.json";
import lotteGangdongHall6 from "@data/theaters/lotte-gangdong/seatmaps/hall-6.json";
import lotteGangdongHall10 from "@data/theaters/lotte-gangdong/seatmaps/hall-10.json";
import lotteKonkukUnivTheater from "@data/theaters/lotte-konkuk-univ/theater.json";
import lotteKonkukUnivSchedule from "@data/showtimes/lotte-konkuk-univ.json";
import lotteKonkukUnivHall1 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-1.json";
import lotteKonkukUnivHall2 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-2.json";
import lotteKonkukUnivHall3 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-3.json";
import lotteKonkukUnivHall4 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-4.json";
import lotteKonkukUnivHall5 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-5.json";
import lotteKonkukUnivHall6 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-6.json";
import lotteKonkukUnivHall7 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-7.json";
import lotteKonkukUnivHall8 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-8.json";
import lotteKonkukUnivHall9 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-9.json";
import lotteKonkukUnivHall10 from "@data/theaters/lotte-konkuk-univ/seatmaps/hall-10.json";
import lotteKonkukUnivCharlotte from "@data/theaters/lotte-konkuk-univ/seatmaps/charlotte.json";
import lotteGimpoAirportTheater from "@data/theaters/lotte-gimpo-airport/theater.json";
import lotteGimpoAirportSchedule from "@data/showtimes/lotte-gimpo-airport.json";
import lotteGimpoAirportHall2 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-2.json";
import lotteGimpoAirportHall3 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-3.json";
import lotteGimpoAirportHall4 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-4.json";
import lotteGimpoAirportHall5 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-5.json";
import lotteGimpoAirportHall6 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-6.json";
import lotteGimpoAirportHall7 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-7.json";
import lotteGimpoAirportHall8 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-8.json";
import lotteGimpoAirportHall9 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-9.json";
import lotteGimpoAirportHall10 from "@data/theaters/lotte-gimpo-airport/seatmaps/hall-10.json";
import lotteGimpoAirportCharlotte from "@data/theaters/lotte-gimpo-airport/seatmaps/charlotte.json";
import lotteNowonTheater from "@data/theaters/lotte-nowon/theater.json";
import lotteNowonSchedule from "@data/showtimes/lotte-nowon.json";
import lotteNowonHall1 from "@data/theaters/lotte-nowon/seatmaps/hall-1.json";
import lotteNowonHall2 from "@data/theaters/lotte-nowon/seatmaps/hall-2.json";
import lotteNowonHall3 from "@data/theaters/lotte-nowon/seatmaps/hall-3.json";
import lotteNowonHall4 from "@data/theaters/lotte-nowon/seatmaps/hall-4.json";
import lotteNowonHall5 from "@data/theaters/lotte-nowon/seatmaps/hall-5.json";
import lotteNowonHall6 from "@data/theaters/lotte-nowon/seatmaps/hall-6.json";
import lotteNowonHall7 from "@data/theaters/lotte-nowon/seatmaps/hall-7.json";
import lotteNowonHall8 from "@data/theaters/lotte-nowon/seatmaps/hall-8.json";
import lotteNowonHall9 from "@data/theaters/lotte-nowon/seatmaps/hall-9.json";
import lotteNowonHall10 from "@data/theaters/lotte-nowon/seatmaps/hall-10.json";
import lotteDogokTheater from "@data/theaters/lotte-dogok/theater.json";
import lotteDogokSchedule from "@data/showtimes/lotte-dogok.json";
import lotteDogokHall1 from "@data/theaters/lotte-dogok/seatmaps/hall-1.json";
import lotteDogokHall2 from "@data/theaters/lotte-dogok/seatmaps/hall-2.json";
import lotteDogokHall3 from "@data/theaters/lotte-dogok/seatmaps/hall-3.json";
import lotteDogokHall4 from "@data/theaters/lotte-dogok/seatmaps/hall-4.json";
import lotteDogokHall5 from "@data/theaters/lotte-dogok/seatmaps/hall-5.json";
import lotteDogokHall6 from "@data/theaters/lotte-dogok/seatmaps/hall-6.json";
import lotteDogokHall7 from "@data/theaters/lotte-dogok/seatmaps/hall-7.json";
import lotteDoksanTheater from "@data/theaters/lotte-doksan/theater.json";
import lotteDoksanSchedule from "@data/showtimes/lotte-doksan.json";
import lotteDoksanHall1 from "@data/theaters/lotte-doksan/seatmaps/hall-1.json";
import lotteDoksanHall2 from "@data/theaters/lotte-doksan/seatmaps/hall-2.json";
import lotteDoksanHall3 from "@data/theaters/lotte-doksan/seatmaps/hall-3.json";
import lotteDoksanHall4 from "@data/theaters/lotte-doksan/seatmaps/hall-4.json";
import lotteDoksanHall5 from "@data/theaters/lotte-doksan/seatmaps/hall-5.json";
import lotteDoksanHall6 from "@data/theaters/lotte-doksan/seatmaps/hall-6.json";
import lotteDoksanHall7 from "@data/theaters/lotte-doksan/seatmaps/hall-7.json";
import lotteDoksanHall8 from "@data/theaters/lotte-doksan/seatmaps/hall-8.json";
import lotteSeoulNatlUnivTheater from "@data/theaters/lotte-seoul-natl-univ/theater.json";
import lotteSeoulNatlUnivSchedule from "@data/showtimes/lotte-seoul-natl-univ.json";
import lotteSeoulNatlUnivHall1 from "@data/theaters/lotte-seoul-natl-univ/seatmaps/hall-1.json";
import lotteSeoulNatlUnivHall2 from "@data/theaters/lotte-seoul-natl-univ/seatmaps/hall-2.json";
import lotteSeoulNatlUnivHall3 from "@data/theaters/lotte-seoul-natl-univ/seatmaps/hall-3.json";
import lotteSeoulNatlUnivHall4 from "@data/theaters/lotte-seoul-natl-univ/seatmaps/hall-4.json";
import lotteSeoulNatlUnivHall5 from "@data/theaters/lotte-seoul-natl-univ/seatmaps/hall-5.json";
import lotteSuyuTheater from "@data/theaters/lotte-suyu/theater.json";
import lotteSuyuSchedule from "@data/showtimes/lotte-suyu.json";
import lotteSuyuHall1 from "@data/theaters/lotte-suyu/seatmaps/hall-1.json";
import lotteSuyuHall2 from "@data/theaters/lotte-suyu/seatmaps/hall-2.json";
import lotteSuyuHall3 from "@data/theaters/lotte-suyu/seatmaps/hall-3.json";
import lotteSuyuHall4 from "@data/theaters/lotte-suyu/seatmaps/hall-4.json";
import lotteSuyuHall5 from "@data/theaters/lotte-suyu/seatmaps/hall-5.json";
import lotteSuyuHall6 from "@data/theaters/lotte-suyu/seatmaps/hall-6.json";
import lotteSindaebangTheater from "@data/theaters/lotte-sindaebang/theater.json";
import lotteSindaebangSchedule from "@data/showtimes/lotte-sindaebang.json";
import lotteSindaebangHall1 from "@data/theaters/lotte-sindaebang/seatmaps/hall-1.json";
import lotteSindaebangHall2 from "@data/theaters/lotte-sindaebang/seatmaps/hall-2.json";
import lotteSindaebangHall3 from "@data/theaters/lotte-sindaebang/seatmaps/hall-3.json";
import lotteSindaebangHall4 from "@data/theaters/lotte-sindaebang/seatmaps/hall-4.json";
import lotteSindaebangHall5 from "@data/theaters/lotte-sindaebang/seatmaps/hall-5.json";
import lotteSindaebangHall6 from "@data/theaters/lotte-sindaebang/seatmaps/hall-6.json";
import lotteSindorimTheater from "@data/theaters/lotte-sindorim/theater.json";
import lotteSindorimSchedule from "@data/showtimes/lotte-sindorim.json";
import lotteSindorimHall1 from "@data/theaters/lotte-sindorim/seatmaps/hall-1.json";
import lotteSindorimHall2 from "@data/theaters/lotte-sindorim/seatmaps/hall-2.json";
import lotteSindorimHall3 from "@data/theaters/lotte-sindorim/seatmaps/hall-3.json";
import lotteSindorimHall4 from "@data/theaters/lotte-sindorim/seatmaps/hall-4.json";
import lotteSindorimHall5 from "@data/theaters/lotte-sindorim/seatmaps/hall-5.json";
import lotteSillimTheater from "@data/theaters/lotte-sillim/theater.json";
import lotteSillimSchedule from "@data/showtimes/lotte-sillim.json";
import lotteSillimHall1 from "@data/theaters/lotte-sillim/seatmaps/hall-1.json";
import lotteSillimHall2 from "@data/theaters/lotte-sillim/seatmaps/hall-2.json";
import lotteSillimHall3 from "@data/theaters/lotte-sillim/seatmaps/hall-3.json";
import lotteSillimHall4 from "@data/theaters/lotte-sillim/seatmaps/hall-4.json";
import lotteSillimHall5 from "@data/theaters/lotte-sillim/seatmaps/hall-5.json";
import lotteSillimHall6 from "@data/theaters/lotte-sillim/seatmaps/hall-6.json";
import lotteSillimHall7 from "@data/theaters/lotte-sillim/seatmaps/hall-7.json";
import lotteSillimHall8 from "@data/theaters/lotte-sillim/seatmaps/hall-8.json";
import lotteAvenuelTheater from "@data/theaters/lotte-avenuel/theater.json";
import lotteAvenuelSchedule from "@data/showtimes/lotte-avenuel.json";
import lotteAvenuelHall1 from "@data/theaters/lotte-avenuel/seatmaps/hall-1.json";
import lotteAvenuelHall2 from "@data/theaters/lotte-avenuel/seatmaps/hall-2.json";
import lotteAvenuelHall3 from "@data/theaters/lotte-avenuel/seatmaps/hall-3.json";
import lotteAvenuelHall5 from "@data/theaters/lotte-avenuel/seatmaps/hall-5.json";
import lotteAvenuelCharlotte from "@data/theaters/lotte-avenuel/seatmaps/charlotte.json";
import lotteYeongdeungpoTheater from "@data/theaters/lotte-yeongdeungpo/theater.json";
import lotteYeongdeungpoSchedule from "@data/showtimes/lotte-yeongdeungpo.json";
import lotteYeongdeungpoHall1 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-1.json";
import lotteYeongdeungpoHall2 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-2.json";
import lotteYeongdeungpoHall3 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-3.json";
import lotteYeongdeungpoHall4 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-4.json";
import lotteYeongdeungpoHall5 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-5.json";
import lotteYeongdeungpoHall6 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-6.json";
import lotteYeongdeungpoHall7 from "@data/theaters/lotte-yeongdeungpo/seatmaps/hall-7.json";
import lotteYongsanTheater from "@data/theaters/lotte-yongsan/theater.json";
import lotteYongsanSchedule from "@data/showtimes/lotte-yongsan.json";
import lotteYongsanHall1 from "@data/theaters/lotte-yongsan/seatmaps/hall-1.json";
import lotteYongsanHall2 from "@data/theaters/lotte-yongsan/seatmaps/hall-2.json";
import lotteYongsanHall3 from "@data/theaters/lotte-yongsan/seatmaps/hall-3.json";
import lotteYongsanHall4 from "@data/theaters/lotte-yongsan/seatmaps/hall-4.json";
import lotteYongsanHall5 from "@data/theaters/lotte-yongsan/seatmaps/hall-5.json";
import lotteYongsanHall6 from "@data/theaters/lotte-yongsan/seatmaps/hall-6.json";
import lotteYongsanHall7 from "@data/theaters/lotte-yongsan/seatmaps/hall-7.json";
import lotteYongsanHall8 from "@data/theaters/lotte-yongsan/seatmaps/hall-8.json";
import lotteWorldTowerTheater from "@data/theaters/lotte-world-tower/theater.json";
import lotteWorldTowerSchedule from "@data/showtimes/lotte-world-tower.json";
import lotteWorldTowerHall1 from "@data/theaters/lotte-world-tower/seatmaps/hall-1.json";
import lotteWorldTowerHall2 from "@data/theaters/lotte-world-tower/seatmaps/hall-2.json";
import lotteWorldTowerHall3 from "@data/theaters/lotte-world-tower/seatmaps/hall-3.json";
import lotteWorldTowerHall4 from "@data/theaters/lotte-world-tower/seatmaps/hall-4.json";
import lotteWorldTowerHall5 from "@data/theaters/lotte-world-tower/seatmaps/hall-5.json";
import lotteWorldTowerHall6 from "@data/theaters/lotte-world-tower/seatmaps/hall-6.json";
import lotteWorldTowerHall7 from "@data/theaters/lotte-world-tower/seatmaps/hall-7.json";
import lotteWorldTowerHall8 from "@data/theaters/lotte-world-tower/seatmaps/hall-8.json";
import lotteWorldTowerHall9 from "@data/theaters/lotte-world-tower/seatmaps/hall-9.json";
import lotteWorldTowerHall10 from "@data/theaters/lotte-world-tower/seatmaps/hall-10.json";
import lotteWorldTowerHall11 from "@data/theaters/lotte-world-tower/seatmaps/hall-11.json";
import lotteWorldTowerHall13 from "@data/theaters/lotte-world-tower/seatmaps/hall-13.json";
import lotteWorldTowerHall14 from "@data/theaters/lotte-world-tower/seatmaps/hall-14.json";
import lotteWorldTowerHall15 from "@data/theaters/lotte-world-tower/seatmaps/hall-15.json";
import lotteWorldTowerHall16 from "@data/theaters/lotte-world-tower/seatmaps/hall-16.json";
import lotteWorldTowerHall17 from "@data/theaters/lotte-world-tower/seatmaps/hall-17.json";
import lotteWorldTowerHall18 from "@data/theaters/lotte-world-tower/seatmaps/hall-18.json";
import lotteWorldTowerHall19 from "@data/theaters/lotte-world-tower/seatmaps/hall-19.json";
import lotteWorldTowerHall20 from "@data/theaters/lotte-world-tower/seatmaps/hall-20.json";
import lotteWorldTowerHall21 from "@data/theaters/lotte-world-tower/seatmaps/hall-21.json";
import lotteEunpyeongTheater from "@data/theaters/lotte-eunpyeong/theater.json";
import lotteEunpyeongSchedule from "@data/showtimes/lotte-eunpyeong.json";
import lotteEunpyeongHall1 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-1.json";
import lotteEunpyeongHall2 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-2.json";
import lotteEunpyeongHall3 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-3.json";
import lotteEunpyeongHall4 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-4.json";
import lotteEunpyeongHall5 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-5.json";
import lotteEunpyeongHall6 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-6.json";
import lotteEunpyeongHall7 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-7.json";
import lotteEunpyeongHall8 from "@data/theaters/lotte-eunpyeong/seatmaps/hall-8.json";
import lotteJungnangTheater from "@data/theaters/lotte-jungnang/theater.json";
import lotteJungnangSchedule from "@data/showtimes/lotte-jungnang.json";
import lotteJungnangHall1 from "@data/theaters/lotte-jungnang/seatmaps/hall-1.json";
import lotteJungnangHall2 from "@data/theaters/lotte-jungnang/seatmaps/hall-2.json";
import lotteJungnangHall3 from "@data/theaters/lotte-jungnang/seatmaps/hall-3.json";
import lotteJungnangHall4 from "@data/theaters/lotte-jungnang/seatmaps/hall-4.json";
import lotteJungnangHall5 from "@data/theaters/lotte-jungnang/seatmaps/hall-5.json";
import lotteJungnangHall6 from "@data/theaters/lotte-jungnang/seatmaps/hall-6.json";
import lotteJungnangHall7 from "@data/theaters/lotte-jungnang/seatmaps/hall-7.json";
import lotteJungnangHall8 from "@data/theaters/lotte-jungnang/seatmaps/hall-8.json";
import lotteCheongnyangniTheater from "@data/theaters/lotte-cheongnyangni/theater.json";
import lotteCheongnyangniSchedule from "@data/showtimes/lotte-cheongnyangni.json";
import lotteCheongnyangniHall1 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-1.json";
import lotteCheongnyangniHall2 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-2.json";
import lotteCheongnyangniHall3 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-3.json";
import lotteCheongnyangniHall4 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-4.json";
import lotteCheongnyangniHall5 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-5.json";
import lotteCheongnyangniHall6 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-6.json";
import lotteCheongnyangniHall7 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-7.json";
import lotteCheongnyangniHall8 from "@data/theaters/lotte-cheongnyangni/seatmaps/hall-8.json";
import lotteHongikUnivTheater from "@data/theaters/lotte-hongik-univ/theater.json";
import lotteHongikUnivSchedule from "@data/showtimes/lotte-hongik-univ.json";
import lotteHongikUnivHall3 from "@data/theaters/lotte-hongik-univ/seatmaps/hall-3.json";
import lotteHongikUnivHall4 from "@data/theaters/lotte-hongik-univ/seatmaps/hall-4.json";
import lotteHongikUnivHall5 from "@data/theaters/lotte-hongik-univ/seatmaps/hall-5.json";
import lotteHongikUnivHall6 from "@data/theaters/lotte-hongik-univ/seatmaps/hall-6.json";
import lotteGeomdanAraTheater from "@data/theaters/lotte-geomdan-ara/theater.json";
import lotteGeomdanAraSchedule from "@data/showtimes/lotte-geomdan-ara.json";
import lotteGeomdanAraHall1 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-1.json";
import lotteGeomdanAraHall2 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-2.json";
import lotteGeomdanAraHall3 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-3.json";
import lotteGeomdanAraHall4 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-4.json";
import lotteGeomdanAraHall5 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-5.json";
import lotteGeomdanAraHall6 from "@data/theaters/lotte-geomdan-ara/seatmaps/hall-6.json";
import lotteGwanggyoTheater from "@data/theaters/lotte-gwanggyo/theater.json";
import lotteGwanggyoSchedule from "@data/showtimes/lotte-gwanggyo.json";
import lotteGwanggyoHall1 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-1.json";
import lotteGwanggyoHall2 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-2.json";
import lotteGwanggyoHall3 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-3.json";
import lotteGwanggyoHall4 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-4.json";
import lotteGwanggyoHall5 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-5.json";
import lotteGwanggyoHall6 from "@data/theaters/lotte-gwanggyo/seatmaps/hall-6.json";
import lotteGwangmyeongTheater from "@data/theaters/lotte-gwangmyeong/theater.json";
import lotteGwangmyeongSchedule from "@data/showtimes/lotte-gwangmyeong.json";
import lotteGwangmyeongHall1 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-1.json";
import lotteGwangmyeongHall2 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-2.json";
import lotteGwangmyeongHall3 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-3.json";
import lotteGwangmyeongHall4 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-4.json";
import lotteGwangmyeongHall5 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-5.json";
import lotteGwangmyeongHall6 from "@data/theaters/lotte-gwangmyeong/seatmaps/hall-6.json";
import lotteGwangmyeongOutletTheater from "@data/theaters/lotte-gwangmyeong-outlet/theater.json";
import lotteGwangmyeongOutletSchedule from "@data/showtimes/lotte-gwangmyeong-outlet.json";
import lotteGwangmyeongOutletHall1 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-1.json";
import lotteGwangmyeongOutletHall2 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-2.json";
import lotteGwangmyeongOutletHall3 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-3.json";
import lotteGwangmyeongOutletHall4 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-4.json";
import lotteGwangmyeongOutletHall5 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-5.json";
import lotteGwangmyeongOutletHall6 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-6.json";
import lotteGwangmyeongOutletHall7 from "@data/theaters/lotte-gwangmyeong-outlet/seatmaps/hall-7.json";
import lotteGuriOutletTheater from "@data/theaters/lotte-guri-outlet/theater.json";
import lotteGuriOutletSchedule from "@data/showtimes/lotte-guri-outlet.json";
import lotteGuriOutletHall1 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-1.json";
import lotteGuriOutletHall2 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-2.json";
import lotteGuriOutletHall3 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-3.json";
import lotteGuriOutletHall4 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-4.json";
import lotteGuriOutletHall5 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-5.json";
import lotteGuriOutletHall6 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-6.json";
import lotteGuriOutletHall7 from "@data/theaters/lotte-guri-outlet/seatmaps/hall-7.json";
import lotteDongtanTheater from "@data/theaters/lotte-dongtan/theater.json";
import lotteDongtanSchedule from "@data/showtimes/lotte-dongtan.json";
import lotteDongtanHall2 from "@data/theaters/lotte-dongtan/seatmaps/hall-2.json";
import lotteDongtanHall3 from "@data/theaters/lotte-dongtan/seatmaps/hall-3.json";
import lotteDongtanHall4 from "@data/theaters/lotte-dongtan/seatmaps/hall-4.json";
import lotteDongtanHall5 from "@data/theaters/lotte-dongtan/seatmaps/hall-5.json";
import lotteDongtanHall6 from "@data/theaters/lotte-dongtan/seatmaps/hall-6.json";
import lotteDongtanHall7 from "@data/theaters/lotte-dongtan/seatmaps/hall-7.json";
import lotteDongtanCharlotte from "@data/theaters/lotte-dongtan/seatmaps/charlotte.json";
import lotteLaFestaTheater from "@data/theaters/lotte-la-festa/theater.json";
import lotteLaFestaSchedule from "@data/showtimes/lotte-la-festa.json";
import lotteLaFestaHall1 from "@data/theaters/lotte-la-festa/seatmaps/hall-1.json";
import lotteLaFestaHall2 from "@data/theaters/lotte-la-festa/seatmaps/hall-2.json";
import lotteLaFestaHall3 from "@data/theaters/lotte-la-festa/seatmaps/hall-3.json";
import lotteLaFestaHall4 from "@data/theaters/lotte-la-festa/seatmaps/hall-4.json";
import lotteLaFestaHall5 from "@data/theaters/lotte-la-festa/seatmaps/hall-5.json";
import lotteLaFestaHall6 from "@data/theaters/lotte-la-festa/seatmaps/hall-6.json";
import lotteLaFestaHall7 from "@data/theaters/lotte-la-festa/seatmaps/hall-7.json";
import lotteLaFestaHall8 from "@data/theaters/lotte-la-festa/seatmaps/hall-8.json";
import lotteByeollaeTheater from "@data/theaters/lotte-byeollae/theater.json";
import lotteByeollaeSchedule from "@data/showtimes/lotte-byeollae.json";
import lotteByeollaeHall1 from "@data/theaters/lotte-byeollae/seatmaps/hall-1.json";
import lotteByeollaeHall2 from "@data/theaters/lotte-byeollae/seatmaps/hall-2.json";
import lotteByeollaeHall3 from "@data/theaters/lotte-byeollae/seatmaps/hall-3.json";
import lotteByeollaeHall4 from "@data/theaters/lotte-byeollae/seatmaps/hall-4.json";
import lotteByeollaeHall5 from "@data/theaters/lotte-byeollae/seatmaps/hall-5.json";
import lotteByeongjeomTheater from "@data/theaters/lotte-byeongjeom/theater.json";
import lotteByeongjeomSchedule from "@data/showtimes/lotte-byeongjeom.json";
import lotteByeongjeomHall1 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-1.json";
import lotteByeongjeomHall2 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-2.json";
import lotteByeongjeomHall3 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-3.json";
import lotteByeongjeomHall4 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-4.json";
import lotteByeongjeomHall5 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-5.json";
import lotteByeongjeomHall6 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-6.json";
import lotteByeongjeomHall7 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-7.json";
import lotteByeongjeomHall8 from "@data/theaters/lotte-byeongjeom/seatmaps/hall-8.json";
import lotteBucheonTheater from "@data/theaters/lotte-bucheon/theater.json";
import lotteBucheonSchedule from "@data/showtimes/lotte-bucheon.json";
import lotteBucheonHall1 from "@data/theaters/lotte-bucheon/seatmaps/hall-1.json";
import lotteBucheonHall2 from "@data/theaters/lotte-bucheon/seatmaps/hall-2.json";
import lotteBucheonHall3 from "@data/theaters/lotte-bucheon/seatmaps/hall-3.json";
import lotteBucheonHall4 from "@data/theaters/lotte-bucheon/seatmaps/hall-4.json";
import lotteBucheonHall5 from "@data/theaters/lotte-bucheon/seatmaps/hall-5.json";
import lotteBucheonHall6 from "@data/theaters/lotte-bucheon/seatmaps/hall-6.json";
import lotteBucheonHall7 from "@data/theaters/lotte-bucheon/seatmaps/hall-7.json";
import lotteBucheonHall8 from "@data/theaters/lotte-bucheon/seatmaps/hall-8.json";
import lotteBupyeongGalsanTheater from "@data/theaters/lotte-bupyeong-galsan/theater.json";
import lotteBupyeongGalsanSchedule from "@data/showtimes/lotte-bupyeong-galsan.json";
import lotteBupyeongGalsanHall1 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-1.json";
import lotteBupyeongGalsanHall2 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-2.json";
import lotteBupyeongGalsanHall3 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-3.json";
import lotteBupyeongGalsanHall4 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-4.json";
import lotteBupyeongGalsanHall5 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-5.json";
import lotteBupyeongGalsanHall6 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-6.json";
import lotteBupyeongGalsanHall7 from "@data/theaters/lotte-bupyeong-galsan/seatmaps/hall-7.json";
import lotteBupyeongStationTheater from "@data/theaters/lotte-bupyeong-station/theater.json";
import lotteBupyeongStationSchedule from "@data/showtimes/lotte-bupyeong-station.json";
import lotteBupyeongStationHall1 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-1.json";
import lotteBupyeongStationHall2 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-2.json";
import lotteBupyeongStationHall3 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-3.json";
import lotteBupyeongStationHall4 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-4.json";
import lotteBupyeongStationHall5 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-5.json";
import lotteBupyeongStationHall6 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-6.json";
import lotteBupyeongStationHall7 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-7.json";
import lotteBupyeongStationHall8 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-8.json";
import lotteBupyeongStationHall9 from "@data/theaters/lotte-bupyeong-station/seatmaps/hall-9.json";
import lotteBuksuwonTheater from "@data/theaters/lotte-buksuwon/theater.json";
import lotteBuksuwonSchedule from "@data/showtimes/lotte-buksuwon.json";
import lotteBuksuwonHall1 from "@data/theaters/lotte-buksuwon/seatmaps/hall-1.json";
import lotteBuksuwonHall2 from "@data/theaters/lotte-buksuwon/seatmaps/hall-2.json";
import lotteBuksuwonHall3 from "@data/theaters/lotte-buksuwon/seatmaps/hall-3.json";
import lotteBuksuwonHall4 from "@data/theaters/lotte-buksuwon/seatmaps/hall-4.json";
import lotteBuksuwonHall5 from "@data/theaters/lotte-buksuwon/seatmaps/hall-5.json";
import lotteSanbonFitinTheater from "@data/theaters/lotte-sanbon-fitin/theater.json";
import lotteSanbonFitinSchedule from "@data/showtimes/lotte-sanbon-fitin.json";
import lotteSanbonFitinHall1 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-1.json";
import lotteSanbonFitinHall2 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-2.json";
import lotteSanbonFitinHall3 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-3.json";
import lotteSanbonFitinHall4 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-4.json";
import lotteSanbonFitinHall5 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-5.json";
import lotteSanbonFitinHall6 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-6.json";
import lotteSanbonFitinHall7 from "@data/theaters/lotte-sanbon-fitin/seatmaps/hall-7.json";
import lotteSeosuwonTheater from "@data/theaters/lotte-seosuwon/theater.json";
import lotteSeosuwonSchedule from "@data/showtimes/lotte-seosuwon.json";
import lotteSeosuwonHall1 from "@data/theaters/lotte-seosuwon/seatmaps/hall-1.json";
import lotteSeosuwonHall2 from "@data/theaters/lotte-seosuwon/seatmaps/hall-2.json";
import lotteSeosuwonHall3 from "@data/theaters/lotte-seosuwon/seatmaps/hall-3.json";
import lotteSeosuwonHall4 from "@data/theaters/lotte-seosuwon/seatmaps/hall-4.json";
import lotteSeosuwonHall5 from "@data/theaters/lotte-seosuwon/seatmaps/hall-5.json";
import lotteSeosuwonHall6 from "@data/theaters/lotte-seosuwon/seatmaps/hall-6.json";
import lotteSeongnamJungangTheater from "@data/theaters/lotte-seongnam-jungang/theater.json";
import lotteSeongnamJungangSchedule from "@data/showtimes/lotte-seongnam-jungang.json";
import lotteSeongnamJungangHall1 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-1.json";
import lotteSeongnamJungangHall2 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-2.json";
import lotteSeongnamJungangHall3 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-3.json";
import lotteSeongnamJungangHall4 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-4.json";
import lotteSeongnamJungangHall5 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-5.json";
import lotteSeongnamJungangHall6 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-6.json";
import lotteSeongnamJungangHall7 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-7.json";
import lotteSeongnamJungangHall8 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-8.json";
import lotteSeongnamJungangHall9 from "@data/theaters/lotte-seongnam-jungang/seatmaps/hall-9.json";
import lotteSongtanTheater from "@data/theaters/lotte-songtan/theater.json";
import lotteSongtanSchedule from "@data/showtimes/lotte-songtan.json";
import lotteSongtanHall1 from "@data/theaters/lotte-songtan/seatmaps/hall-1.json";
import lotteSongtanHall2 from "@data/theaters/lotte-songtan/seatmaps/hall-2.json";
import lotteSongtanHall3 from "@data/theaters/lotte-songtan/seatmaps/hall-3.json";
import lotteSongtanHall4 from "@data/theaters/lotte-songtan/seatmaps/hall-4.json";
import lotteSongtanHall5 from "@data/theaters/lotte-songtan/seatmaps/hall-5.json";
import lotteSuwonTheater from "@data/theaters/lotte-suwon/theater.json";
import lotteSuwonSchedule from "@data/showtimes/lotte-suwon.json";
import lotteSuwonHall1 from "@data/theaters/lotte-suwon/seatmaps/hall-1.json";
import lotteSuwonHall2 from "@data/theaters/lotte-suwon/seatmaps/hall-2.json";
import lotteSuwonHall3 from "@data/theaters/lotte-suwon/seatmaps/hall-3.json";
import lotteSuwonHall4 from "@data/theaters/lotte-suwon/seatmaps/hall-4.json";
import lotteSuwonHall5 from "@data/theaters/lotte-suwon/seatmaps/hall-5.json";
import lotteSuwonHall6 from "@data/theaters/lotte-suwon/seatmaps/hall-6.json";
import lotteSuwonHall7 from "@data/theaters/lotte-suwon/seatmaps/hall-7.json";
import lotteSuwonHall8 from "@data/theaters/lotte-suwon/seatmaps/hall-8.json";
import lotteSujiTheater from "@data/theaters/lotte-suji/theater.json";
import lotteSujiSchedule from "@data/showtimes/lotte-suji.json";
import lotteSujiHall1 from "@data/theaters/lotte-suji/seatmaps/hall-1.json";
import lotteSujiHall2 from "@data/theaters/lotte-suji/seatmaps/hall-2.json";
import lotteSujiHall3 from "@data/theaters/lotte-suji/seatmaps/hall-3.json";
import lotteSujiHall4 from "@data/theaters/lotte-suji/seatmaps/hall-4.json";
import lotteSujiHall5 from "@data/theaters/lotte-suji/seatmaps/hall-5.json";
import lotteSujiHall6 from "@data/theaters/lotte-suji/seatmaps/hall-6.json";
import lotteSujiHall7 from "@data/theaters/lotte-suji/seatmaps/hall-7.json";
import lotteSujiHall8 from "@data/theaters/lotte-suji/seatmaps/hall-8.json";
import lotteSihwaTheater from "@data/theaters/lotte-sihwa/theater.json";
import lotteSihwaSchedule from "@data/showtimes/lotte-sihwa.json";
import lotteSihwaHall1 from "@data/theaters/lotte-sihwa/seatmaps/hall-1.json";
import lotteSihwaHall2 from "@data/theaters/lotte-sihwa/seatmaps/hall-2.json";
import lotteSihwaHall3 from "@data/theaters/lotte-sihwa/seatmaps/hall-3.json";
import lotteSihwaHall4 from "@data/theaters/lotte-sihwa/seatmaps/hall-4.json";
import lotteSihwaHall5 from "@data/theaters/lotte-sihwa/seatmaps/hall-5.json";
import lotteSihwaHall6 from "@data/theaters/lotte-sihwa/seatmaps/hall-6.json";
import lotteSihwaHall7 from "@data/theaters/lotte-sihwa/seatmaps/hall-7.json";
import lotteSihwaHall8 from "@data/theaters/lotte-sihwa/seatmaps/hall-8.json";
import lotteSiheungJanghyeonTheater from "@data/theaters/lotte-siheung-janghyeon/theater.json";
import lotteSiheungJanghyeonSchedule from "@data/showtimes/lotte-siheung-janghyeon.json";
import lotteSiheungJanghyeonHall1 from "@data/theaters/lotte-siheung-janghyeon/seatmaps/hall-1.json";
import lotteSiheungJanghyeonHall2 from "@data/theaters/lotte-siheung-janghyeon/seatmaps/hall-2.json";
import lotteSiheungJanghyeonHall3 from "@data/theaters/lotte-siheung-janghyeon/seatmaps/hall-3.json";
import lotteSiheungJanghyeonHall4 from "@data/theaters/lotte-siheung-janghyeon/seatmaps/hall-4.json";
import lotteSiheungJanghyeonHall5 from "@data/theaters/lotte-siheung-janghyeon/seatmaps/hall-5.json";
import lotteAnsanTheater from "@data/theaters/lotte-ansan/theater.json";
import lotteAnsanSchedule from "@data/showtimes/lotte-ansan.json";
import lotteAnsanHall2 from "@data/theaters/lotte-ansan/seatmaps/hall-2.json";
import lotteAnsanHall3 from "@data/theaters/lotte-ansan/seatmaps/hall-3.json";
import lotteAnsanHall4 from "@data/theaters/lotte-ansan/seatmaps/hall-4.json";
import lotteAnsanHall5 from "@data/theaters/lotte-ansan/seatmaps/hall-5.json";
import lotteAnsanHall6 from "@data/theaters/lotte-ansan/seatmaps/hall-6.json";
import lotteAnsanHall7 from "@data/theaters/lotte-ansan/seatmaps/hall-7.json";
import lotteAnsanHall8 from "@data/theaters/lotte-ansan/seatmaps/hall-8.json";
import lotteAnsanCharlotte from "@data/theaters/lotte-ansan/seatmaps/charlotte.json";
import lotteAnsanGojanTheater from "@data/theaters/lotte-ansan-gojan/theater.json";
import lotteAnsanGojanSchedule from "@data/showtimes/lotte-ansan-gojan.json";
import lotteAnsanGojanHall1 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-1.json";
import lotteAnsanGojanHall2 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-2.json";
import lotteAnsanGojanHall3 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-3.json";
import lotteAnsanGojanHall4 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-4.json";
import lotteAnsanGojanHall5 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-5.json";
import lotteAnsanGojanHall6 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-6.json";
import lotteAnsanGojanHall7 from "@data/theaters/lotte-ansan-gojan/seatmaps/hall-7.json";
import lotteAnsanJungangTheater from "@data/theaters/lotte-ansan-jungang/theater.json";
import lotteAnsanJungangSchedule from "@data/showtimes/lotte-ansan-jungang.json";
import lotteAnsanJungangHall1 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-1.json";
import lotteAnsanJungangHall2 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-2.json";
import lotteAnsanJungangHall3 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-3.json";
import lotteAnsanJungangHall4 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-4.json";
import lotteAnsanJungangHall5 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-5.json";
import lotteAnsanJungangHall6 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-6.json";
import lotteAnsanJungangHall7 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-7.json";
import lotteAnsanJungangHall8 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-8.json";
import lotteAnsanJungangHall9 from "@data/theaters/lotte-ansan-jungang/seatmaps/hall-9.json";
import lotteAnseongTheater from "@data/theaters/lotte-anseong/theater.json";
import lotteAnseongSchedule from "@data/showtimes/lotte-anseong.json";
import lotteAnseongHall1 from "@data/theaters/lotte-anseong/seatmaps/hall-1.json";
import lotteAnseongHall2 from "@data/theaters/lotte-anseong/seatmaps/hall-2.json";
import lotteAnyangIlbeongaTheater from "@data/theaters/lotte-anyang-ilbeonga/theater.json";
import lotteAnyangIlbeongaSchedule from "@data/showtimes/lotte-anyang-ilbeonga.json";
import lotteAnyangIlbeongaHall1 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-1.json";
import lotteAnyangIlbeongaHall2 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-2.json";
import lotteAnyangIlbeongaHall3 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-3.json";
import lotteAnyangIlbeongaHall4 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-4.json";
import lotteAnyangIlbeongaHall5 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-5.json";
import lotteAnyangIlbeongaHall6 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-6.json";
import lotteAnyangIlbeongaHall7 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-7.json";
import lotteAnyangIlbeongaHall8 from "@data/theaters/lotte-anyang-ilbeonga/seatmaps/hall-8.json";
import lotteYonginGiheungTheater from "@data/theaters/lotte-yongin-giheung/theater.json";
import lotteYonginGiheungSchedule from "@data/showtimes/lotte-yongin-giheung.json";
import lotteYonginGiheungHall1 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-1.json";
import lotteYonginGiheungHall2 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-2.json";
import lotteYonginGiheungHall3 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-3.json";
import lotteYonginGiheungHall4 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-4.json";
import lotteYonginGiheungHall5 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-5.json";
import lotteYonginGiheungHall6 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-6.json";
import lotteYonginGiheungHall7 from "@data/theaters/lotte-yongin-giheung/seatmaps/hall-7.json";
import lotteYonginYeokbukTheater from "@data/theaters/lotte-yongin-yeokbuk/theater.json";
import lotteYonginYeokbukSchedule from "@data/showtimes/lotte-yongin-yeokbuk.json";
import lotteYonginYeokbukHall1 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-1.json";
import lotteYonginYeokbukHall2 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-2.json";
import lotteYonginYeokbukHall3 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-3.json";
import lotteYonginYeokbukHall4 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-4.json";
import lotteYonginYeokbukHall5 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-5.json";
import lotteYonginYeokbukHall6 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-6.json";
import lotteYonginYeokbukHall7 from "@data/theaters/lotte-yongin-yeokbuk/seatmaps/hall-7.json";
import lotteWiryeTheater from "@data/theaters/lotte-wirye/theater.json";
import lotteWiryeSchedule from "@data/showtimes/lotte-wirye.json";
import lotteWiryeHall1 from "@data/theaters/lotte-wirye/seatmaps/hall-1.json";
import lotteWiryeHall2 from "@data/theaters/lotte-wirye/seatmaps/hall-2.json";
import lotteWiryeHall3 from "@data/theaters/lotte-wirye/seatmaps/hall-3.json";
import lotteWiryeHall4 from "@data/theaters/lotte-wirye/seatmaps/hall-4.json";
import lotteWiryeHall5 from "@data/theaters/lotte-wirye/seatmaps/hall-5.json";
import lotteWiryeHall6 from "@data/theaters/lotte-wirye/seatmaps/hall-6.json";
import lotteWiryeHall7 from "@data/theaters/lotte-wirye/seatmaps/hall-7.json";
import lotteUijeongbuMinrakTheater from "@data/theaters/lotte-uijeongbu-minrak/theater.json";
import lotteUijeongbuMinrakSchedule from "@data/showtimes/lotte-uijeongbu-minrak.json";
import lotteUijeongbuMinrakHall1 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-1.json";
import lotteUijeongbuMinrakHall2 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-2.json";
import lotteUijeongbuMinrakHall3 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-3.json";
import lotteUijeongbuMinrakHall4 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-4.json";
import lotteUijeongbuMinrakHall5 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-5.json";
import lotteUijeongbuMinrakHall6 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-6.json";
import lotteUijeongbuMinrakHall7 from "@data/theaters/lotte-uijeongbu-minrak/seatmaps/hall-7.json";
import lotteIncheonAsiadTheater from "@data/theaters/lotte-incheon-asiad/theater.json";
import lotteIncheonAsiadSchedule from "@data/showtimes/lotte-incheon-asiad.json";
import lotteIncheonAsiadHall1 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-1.json";
import lotteIncheonAsiadHall2 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-2.json";
import lotteIncheonAsiadHall3 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-3.json";
import lotteIncheonAsiadHall4 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-4.json";
import lotteIncheonAsiadHall5 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-5.json";
import lotteIncheonAsiadHall6 from "@data/theaters/lotte-incheon-asiad/seatmaps/hall-6.json";
import lotteIncheonTerminalTheater from "@data/theaters/lotte-incheon-terminal/theater.json";
import lotteIncheonTerminalSchedule from "@data/showtimes/lotte-incheon-terminal.json";
import lotteIncheonTerminalHall1 from "@data/theaters/lotte-incheon-terminal/seatmaps/hall-1.json";
import lotteIncheonTerminalHall2 from "@data/theaters/lotte-incheon-terminal/seatmaps/hall-2.json";
import lotteIncheonTerminalHall3 from "@data/theaters/lotte-incheon-terminal/seatmaps/hall-3.json";
import lotteIncheonTerminalHall4 from "@data/theaters/lotte-incheon-terminal/seatmaps/hall-4.json";
import lotteJinjeopTheater from "@data/theaters/lotte-jinjeop/theater.json";
import lotteJinjeopSchedule from "@data/showtimes/lotte-jinjeop.json";
import lotteJinjeopHall1 from "@data/theaters/lotte-jinjeop/seatmaps/hall-1.json";
import lotteJinjeopHall2 from "@data/theaters/lotte-jinjeop/seatmaps/hall-2.json";
import lotteJinjeopHall3 from "@data/theaters/lotte-jinjeop/seatmaps/hall-3.json";
import lottePajuOutletTheater from "@data/theaters/lotte-paju-outlet/theater.json";
import lottePajuOutletSchedule from "@data/showtimes/lotte-paju-outlet.json";
import lottePajuOutletHall1 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-1.json";
import lottePajuOutletHall2 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-2.json";
import lottePajuOutletHall3 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-3.json";
import lottePajuOutletHall4 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-4.json";
import lottePajuOutletHall5 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-5.json";
import lottePajuOutletHall6 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-6.json";
import lottePajuOutletHall7 from "@data/theaters/lotte-paju-outlet/seatmaps/hall-7.json";
import lottePajuYadangTheater from "@data/theaters/lotte-paju-yadang/theater.json";
import lottePajuYadangSchedule from "@data/showtimes/lotte-paju-yadang.json";
import lottePajuYadangHall1 from "@data/theaters/lotte-paju-yadang/seatmaps/hall-1.json";
import lottePajuYadangHall2 from "@data/theaters/lotte-paju-yadang/seatmaps/hall-2.json";
import lottePajuYadangHall3 from "@data/theaters/lotte-paju-yadang/seatmaps/hall-3.json";
import lottePajuYadangHall4 from "@data/theaters/lotte-paju-yadang/seatmaps/hall-4.json";
import lottePajuYadangHall5 from "@data/theaters/lotte-paju-yadang/seatmaps/hall-5.json";
import lottePajuUnjeongTheater from "@data/theaters/lotte-paju-unjeong/theater.json";
import lottePajuUnjeongSchedule from "@data/showtimes/lotte-paju-unjeong.json";
import lottePajuUnjeongHall1 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-1.json";
import lottePajuUnjeongHall2 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-2.json";
import lottePajuUnjeongHall3 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-3.json";
import lottePajuUnjeongHall4 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-4.json";
import lottePajuUnjeongHall5 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-5.json";
import lottePajuUnjeongHall6 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-6.json";
import lottePajuUnjeongHall7 from "@data/theaters/lotte-paju-unjeong/seatmaps/hall-7.json";
import lottePangyoTheater from "@data/theaters/lotte-pangyo/theater.json";
import lottePangyoSchedule from "@data/showtimes/lotte-pangyo.json";
import lottePangyoHall1 from "@data/theaters/lotte-pangyo/seatmaps/hall-1.json";
import lottePangyoHall2 from "@data/theaters/lotte-pangyo/seatmaps/hall-2.json";
import lottePangyoHall3 from "@data/theaters/lotte-pangyo/seatmaps/hall-3.json";
import lottePangyoHall4 from "@data/theaters/lotte-pangyo/seatmaps/hall-4.json";
import lottePangyoHall5 from "@data/theaters/lotte-pangyo/seatmaps/hall-5.json";
import lottePangyoHall6 from "@data/theaters/lotte-pangyo/seatmaps/hall-6.json";
import lottePangyoHall7 from "@data/theaters/lotte-pangyo/seatmaps/hall-7.json";
import lottePyeongchonTheater from "@data/theaters/lotte-pyeongchon/theater.json";
import lottePyeongchonSchedule from "@data/showtimes/lotte-pyeongchon.json";
import lottePyeongchonHall1 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-1.json";
import lottePyeongchonHall2 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-2.json";
import lottePyeongchonHall3 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-3.json";
import lottePyeongchonHall4 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-4.json";
import lottePyeongchonHall5 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-5.json";
import lottePyeongchonHall6 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-6.json";
import lottePyeongchonHall7 from "@data/theaters/lotte-pyeongchon/seatmaps/hall-7.json";
import lottePyeongchonCharlotte from "@data/theaters/lotte-pyeongchon/seatmaps/charlotte.json";
import lotteHanamMisaTheater from "@data/theaters/lotte-hanam-misa/theater.json";
import lotteHanamMisaSchedule from "@data/showtimes/lotte-hanam-misa.json";
import lotteHanamMisaHall1 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-1.json";
import lotteHanamMisaHall2 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-2.json";
import lotteHanamMisaHall3 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-3.json";
import lotteHanamMisaHall4 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-4.json";
import lotteHanamMisaHall5 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-5.json";
import lotteHanamMisaHall6 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-6.json";
import lotteHanamMisaHall7 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-7.json";
import lotteHanamMisaHall8 from "@data/theaters/lotte-hanam-misa/seatmaps/hall-8.json";
import lotteHyangnamTheater from "@data/theaters/lotte-hyangnam/theater.json";
import lotteHyangnamSchedule from "@data/showtimes/lotte-hyangnam.json";
import lotteHyangnamHall1 from "@data/theaters/lotte-hyangnam/seatmaps/hall-1.json";
import lotteHyangnamHall2 from "@data/theaters/lotte-hyangnam/seatmaps/hall-2.json";
import lotteHyangnamHall3 from "@data/theaters/lotte-hyangnam/seatmaps/hall-3.json";
import lotteHyangnamHall4 from "@data/theaters/lotte-hyangnam/seatmaps/hall-4.json";
import lotteHyangnamHall5 from "@data/theaters/lotte-hyangnam/seatmaps/hall-5.json";
import lotteDangjinTheater from "@data/theaters/lotte-dangjin/theater.json";
import lotteDangjinSchedule from "@data/showtimes/lotte-dangjin.json";
import lotteDangjinHall1 from "@data/theaters/lotte-dangjin/seatmaps/hall-1.json";
import lotteDangjinHall2 from "@data/theaters/lotte-dangjin/seatmaps/hall-2.json";
import lotteDangjinHall3 from "@data/theaters/lotte-dangjin/seatmaps/hall-3.json";
import lotteDangjinHall4 from "@data/theaters/lotte-dangjin/seatmaps/hall-4.json";
import lotteDangjinHall5 from "@data/theaters/lotte-dangjin/seatmaps/hall-5.json";
import lotteDangjinHall6 from "@data/theaters/lotte-dangjin/seatmaps/hall-6.json";
import lotteDangjinHall7 from "@data/theaters/lotte-dangjin/seatmaps/hall-7.json";
import lotteDaejeonTheater from "@data/theaters/lotte-daejeon/theater.json";
import lotteDaejeonSchedule from "@data/showtimes/lotte-daejeon.json";
import lotteDaejeonHall1 from "@data/theaters/lotte-daejeon/seatmaps/hall-1.json";
import lotteDaejeonHall2 from "@data/theaters/lotte-daejeon/seatmaps/hall-2.json";
import lotteDaejeonHall3 from "@data/theaters/lotte-daejeon/seatmaps/hall-3.json";
import lotteDaejeonHall4 from "@data/theaters/lotte-daejeon/seatmaps/hall-4.json";
import lotteDaejeonHall5 from "@data/theaters/lotte-daejeon/seatmaps/hall-5.json";
import lotteDaejeonHall6 from "@data/theaters/lotte-daejeon/seatmaps/hall-6.json";
import lotteDaejeonHall7 from "@data/theaters/lotte-daejeon/seatmaps/hall-7.json";
import lotteDaejeonHall8 from "@data/theaters/lotte-daejeon/seatmaps/hall-8.json";
import lotteDaejeonGwanjeoTheater from "@data/theaters/lotte-daejeon-gwanjeo/theater.json";
import lotteDaejeonGwanjeoSchedule from "@data/showtimes/lotte-daejeon-gwanjeo.json";
import lotteDaejeonGwanjeoHall1 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-1.json";
import lotteDaejeonGwanjeoHall2 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-2.json";
import lotteDaejeonGwanjeoHall3 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-3.json";
import lotteDaejeonGwanjeoHall4 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-4.json";
import lotteDaejeonGwanjeoHall5 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-5.json";
import lotteDaejeonGwanjeoHall6 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-6.json";
import lotteDaejeonGwanjeoHall7 from "@data/theaters/lotte-daejeon-gwanjeo/seatmaps/hall-7.json";
import lotteDaejeonCentralTheater from "@data/theaters/lotte-daejeon-central/theater.json";
import lotteDaejeonCentralSchedule from "@data/showtimes/lotte-daejeon-central.json";
import lotteDaejeonCentralHall1 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-1.json";
import lotteDaejeonCentralHall2 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-2.json";
import lotteDaejeonCentralHall3 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-3.json";
import lotteDaejeonCentralHall4 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-4.json";
import lotteDaejeonCentralHall5 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-5.json";
import lotteDaejeonCentralHall6 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-6.json";
import lotteDaejeonCentralHall7 from "@data/theaters/lotte-daejeon-central/seatmaps/hall-7.json";
import lotteSeosanTheater from "@data/theaters/lotte-seosan/theater.json";
import lotteSeosanSchedule from "@data/showtimes/lotte-seosan.json";
import lotteSeosanHall1 from "@data/theaters/lotte-seosan/seatmaps/hall-1.json";
import lotteSeosanHall2 from "@data/theaters/lotte-seosan/seatmaps/hall-2.json";
import lotteSeosanHall3 from "@data/theaters/lotte-seosan/seatmaps/hall-3.json";
import lotteSeosanHall4 from "@data/theaters/lotte-seosan/seatmaps/hall-4.json";
import lotteSeosanHall5 from "@data/theaters/lotte-seosan/seatmaps/hall-5.json";
import lotteSeosanHall6 from "@data/theaters/lotte-seosan/seatmaps/hall-6.json";
import lotteSeosanHall7 from "@data/theaters/lotte-seosan/seatmaps/hall-7.json";
import lotteSeocheongjuTheater from "@data/theaters/lotte-seocheongju/theater.json";
import lotteSeocheongjuSchedule from "@data/showtimes/lotte-seocheongju.json";
import lotteSeocheongjuHall1 from "@data/theaters/lotte-seocheongju/seatmaps/hall-1.json";
import lotteSeocheongjuHall2 from "@data/theaters/lotte-seocheongju/seatmaps/hall-2.json";
import lotteSeocheongjuHall3 from "@data/theaters/lotte-seocheongju/seatmaps/hall-3.json";
import lotteSeocheongjuHall4 from "@data/theaters/lotte-seocheongju/seatmaps/hall-4.json";
import lotteSeocheongjuHall5 from "@data/theaters/lotte-seocheongju/seatmaps/hall-5.json";
import lotteSeocheongjuHall6 from "@data/theaters/lotte-seocheongju/seatmaps/hall-6.json";
import lotteAsanTerminalTheater from "@data/theaters/lotte-asan-terminal/theater.json";
import lotteAsanTerminalSchedule from "@data/showtimes/lotte-asan-terminal.json";
import lotteAsanTerminalHall1 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-1.json";
import lotteAsanTerminalHall2 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-2.json";
import lotteAsanTerminalHall3 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-3.json";
import lotteAsanTerminalHall4 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-4.json";
import lotteAsanTerminalHall5 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-5.json";
import lotteAsanTerminalHall6 from "@data/theaters/lotte-asan-terminal/seatmaps/hall-6.json";
import lotteOsongTheater from "@data/theaters/lotte-osong/theater.json";
import lotteOsongSchedule from "@data/showtimes/lotte-osong.json";
import lotteOsongHall1 from "@data/theaters/lotte-osong/seatmaps/hall-1.json";
import lotteOsongHall2 from "@data/theaters/lotte-osong/seatmaps/hall-2.json";
import lotteOsongHall3 from "@data/theaters/lotte-osong/seatmaps/hall-3.json";
import lotteOsongHall4 from "@data/theaters/lotte-osong/seatmaps/hall-4.json";
import lotteOsongHall5 from "@data/theaters/lotte-osong/seatmaps/hall-5.json";
import lotteOsongHall6 from "@data/theaters/lotte-osong/seatmaps/hall-6.json";
import lotteCheonanBuldangTheater from "@data/theaters/lotte-cheonan-buldang/theater.json";
import lotteCheonanBuldangSchedule from "@data/showtimes/lotte-cheonan-buldang.json";
import lotteCheonanBuldangHall1 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-1.json";
import lotteCheonanBuldangHall2 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-2.json";
import lotteCheonanBuldangHall3 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-3.json";
import lotteCheonanBuldangHall4 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-4.json";
import lotteCheonanBuldangHall5 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-5.json";
import lotteCheonanBuldangHall6 from "@data/theaters/lotte-cheonan-buldang/seatmaps/hall-6.json";
import lotteCheonanCheongdangTheater from "@data/theaters/lotte-cheonan-cheongdang/theater.json";
import lotteCheonanCheongdangSchedule from "@data/showtimes/lotte-cheonan-cheongdang.json";
import lotteCheonanCheongdangHall1 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-1.json";
import lotteCheonanCheongdangHall2 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-2.json";
import lotteCheonanCheongdangHall3 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-3.json";
import lotteCheonanCheongdangHall4 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-4.json";
import lotteCheonanCheongdangHall5 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-5.json";
import lotteCheonanCheongdangHall6 from "@data/theaters/lotte-cheonan-cheongdang/seatmaps/hall-6.json";
import lotteCheongjuYongamTheater from "@data/theaters/lotte-cheongju-yongam/theater.json";
import lotteCheongjuYongamSchedule from "@data/showtimes/lotte-cheongju-yongam.json";
import lotteCheongjuYongamHall1 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-1.json";
import lotteCheongjuYongamHall2 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-2.json";
import lotteCheongjuYongamHall3 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-3.json";
import lotteCheongjuYongamHall4 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-4.json";
import lotteCheongjuYongamHall5 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-5.json";
import lotteCheongjuYongamHall6 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-6.json";
import lotteCheongjuYongamHall7 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-7.json";
import lotteCheongjuYongamHall8 from "@data/theaters/lotte-cheongju-yongam/seatmaps/hall-8.json";
import lotteChungjuTheater from "@data/theaters/lotte-chungju/theater.json";
import lotteChungjuSchedule from "@data/showtimes/lotte-chungju.json";
import lotteChungjuHall1 from "@data/theaters/lotte-chungju/seatmaps/hall-1.json";
import lotteChungjuHall2 from "@data/theaters/lotte-chungju/seatmaps/hall-2.json";
import lotteChungjuHall3 from "@data/theaters/lotte-chungju/seatmaps/hall-3.json";
import lotteChungjuHall4 from "@data/theaters/lotte-chungju/seatmaps/hall-4.json";
import lotteChungjuHall5 from "@data/theaters/lotte-chungju/seatmaps/hall-5.json";
import lotteGwangjuTheater from "@data/theaters/lotte-gwangju/theater.json";
import lotteGwangjuSchedule from "@data/showtimes/lotte-gwangju.json";
import lotteGwangjuHall2 from "@data/theaters/lotte-gwangju/seatmaps/hall-2.json";
import lotteGwangjuHall3 from "@data/theaters/lotte-gwangju/seatmaps/hall-3.json";
import lotteGwangjuHall4 from "@data/theaters/lotte-gwangju/seatmaps/hall-4.json";
import lotteGwangjuHall5 from "@data/theaters/lotte-gwangju/seatmaps/hall-5.json";
import lotteGwangjuHall6 from "@data/theaters/lotte-gwangju/seatmaps/hall-6.json";
import lotteGwangjuCharlotte from "@data/theaters/lotte-gwangju/seatmaps/charlotte.json";
import lotteGwangjuGwangsanTheater from "@data/theaters/lotte-gwangju-gwangsan/theater.json";
import lotteGwangjuGwangsanSchedule from "@data/showtimes/lotte-gwangju-gwangsan.json";
import lotteGwangjuGwangsanHall1 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-1.json";
import lotteGwangjuGwangsanHall2 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-2.json";
import lotteGwangjuGwangsanHall4 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-4.json";
import lotteGwangjuGwangsanHall5 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-5.json";
import lotteGwangjuGwangsanHall6 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-6.json";
import lotteGwangjuGwangsanHall7 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-7.json";
import lotteGwangjuGwangsanHall8 from "@data/theaters/lotte-gwangju-gwangsan/seatmaps/hall-8.json";
import lotteGwangjuCheomdanTheater from "@data/theaters/lotte-gwangju-cheomdan/theater.json";
import lotteGwangjuCheomdanSchedule from "@data/showtimes/lotte-gwangju-cheomdan.json";
import lotteGwangjuCheomdanHall1 from "@data/theaters/lotte-gwangju-cheomdan/seatmaps/hall-1.json";
import lotteGwangjuCheomdanHall2 from "@data/theaters/lotte-gwangju-cheomdan/seatmaps/hall-2.json";
import lotteGwangjuCheomdanHall3 from "@data/theaters/lotte-gwangju-cheomdan/seatmaps/hall-3.json";
import lotteGwangjuCheomdanHall4 from "@data/theaters/lotte-gwangju-cheomdan/seatmaps/hall-4.json";
import lotteGwangjuCheomdanHall5 from "@data/theaters/lotte-gwangju-cheomdan/seatmaps/hall-5.json";
import lotteGunsanNaunTheater from "@data/theaters/lotte-gunsan-naun/theater.json";
import lotteGunsanNaunSchedule from "@data/showtimes/lotte-gunsan-naun.json";
import lotteGunsanNaunHall1 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-1.json";
import lotteGunsanNaunHall2 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-2.json";
import lotteGunsanNaunHall3 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-3.json";
import lotteGunsanNaunHall4 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-4.json";
import lotteGunsanNaunHall5 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-5.json";
import lotteGunsanNaunHall6 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-6.json";
import lotteGunsanNaunHall7 from "@data/theaters/lotte-gunsan-naun/seatmaps/hall-7.json";
import lotteGunsanMallTheater from "@data/theaters/lotte-gunsan-mall/theater.json";
import lotteGunsanMallSchedule from "@data/showtimes/lotte-gunsan-mall.json";
import lotteGunsanMallHall1 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-1.json";
import lotteGunsanMallHall2 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-2.json";
import lotteGunsanMallHall3 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-3.json";
import lotteGunsanMallHall4 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-4.json";
import lotteGunsanMallHall5 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-5.json";
import lotteGunsanMallHall6 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-6.json";
import lotteGunsanMallHall7 from "@data/theaters/lotte-gunsan-mall/seatmaps/hall-7.json";
import lotteSuwanTheater from "@data/theaters/lotte-suwan/theater.json";
import lotteSuwanSchedule from "@data/showtimes/lotte-suwan.json";
import lotteSuwanHall1 from "@data/theaters/lotte-suwan/seatmaps/hall-1.json";
import lotteSuwanHall2 from "@data/theaters/lotte-suwan/seatmaps/hall-2.json";
import lotteSuwanHall3 from "@data/theaters/lotte-suwan/seatmaps/hall-3.json";
import lotteSuwanHall4 from "@data/theaters/lotte-suwan/seatmaps/hall-4.json";
import lotteSuwanHall5 from "@data/theaters/lotte-suwan/seatmaps/hall-5.json";
import lotteSuwanHall6 from "@data/theaters/lotte-suwan/seatmaps/hall-6.json";
import lotteSuwanHall7 from "@data/theaters/lotte-suwan/seatmaps/hall-7.json";
import lotteIksanMohyeonTheater from "@data/theaters/lotte-iksan-mohyeon/theater.json";
import lotteIksanMohyeonSchedule from "@data/showtimes/lotte-iksan-mohyeon.json";
import lotteIksanMohyeonHall1 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-1.json";
import lotteIksanMohyeonHall2 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-2.json";
import lotteIksanMohyeonHall3 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-3.json";
import lotteIksanMohyeonHall4 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-4.json";
import lotteIksanMohyeonHall5 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-5.json";
import lotteIksanMohyeonHall6 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-6.json";
import lotteIksanMohyeonHall7 from "@data/theaters/lotte-iksan-mohyeon/seatmaps/hall-7.json";
import lotteJeonjuTheater from "@data/theaters/lotte-jeonju/theater.json";
import lotteJeonjuSchedule from "@data/showtimes/lotte-jeonju.json";
import lotteJeonjuHall1 from "@data/theaters/lotte-jeonju/seatmaps/hall-1.json";
import lotteJeonjuHall2 from "@data/theaters/lotte-jeonju/seatmaps/hall-2.json";
import lotteJeonjuHall3 from "@data/theaters/lotte-jeonju/seatmaps/hall-3.json";
import lotteJeonjuHall4 from "@data/theaters/lotte-jeonju/seatmaps/hall-4.json";
import lotteJeonjuHall5 from "@data/theaters/lotte-jeonju/seatmaps/hall-5.json";
import lotteJeonjuHall6 from "@data/theaters/lotte-jeonju/seatmaps/hall-6.json";
import lotteJeonjuHall7 from "@data/theaters/lotte-jeonju/seatmaps/hall-7.json";
import lotteJeonjuHall8 from "@data/theaters/lotte-jeonju/seatmaps/hall-8.json";
import lotteJeonjuSongcheonTheater from "@data/theaters/lotte-jeonju-songcheon/theater.json";
import lotteJeonjuSongcheonSchedule from "@data/showtimes/lotte-jeonju-songcheon.json";
import lotteJeonjuSongcheonHall1 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-1.json";
import lotteJeonjuSongcheonHall3 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-3.json";
import lotteJeonjuSongcheonHall4 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-4.json";
import lotteJeonjuSongcheonHall5 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-5.json";
import lotteJeonjuSongcheonHall6 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-6.json";
import lotteJeonjuSongcheonHall7 from "@data/theaters/lotte-jeonju-songcheon/seatmaps/hall-7.json";
import lotteJeonjuPyeonghwaTheater from "@data/theaters/lotte-jeonju-pyeonghwa/theater.json";
import lotteJeonjuPyeonghwaSchedule from "@data/showtimes/lotte-jeonju-pyeonghwa.json";
import lotteJeonjuPyeonghwaHall1 from "@data/theaters/lotte-jeonju-pyeonghwa/seatmaps/hall-1.json";
import lotteJeonjuPyeonghwaHall2 from "@data/theaters/lotte-jeonju-pyeonghwa/seatmaps/hall-2.json";
import lotteJeonjuPyeonghwaHall3 from "@data/theaters/lotte-jeonju-pyeonghwa/seatmaps/hall-3.json";
import lotteJeonjuPyeonghwaHall4 from "@data/theaters/lotte-jeonju-pyeonghwa/seatmaps/hall-4.json";
import lotteJeonjuPyeonghwaHall6 from "@data/theaters/lotte-jeonju-pyeonghwa/seatmaps/hall-6.json";
import lotteChungjangnoTheater from "@data/theaters/lotte-chungjangno/theater.json";
import lotteChungjangnoSchedule from "@data/showtimes/lotte-chungjangno.json";
import lotteChungjangnoHall1 from "@data/theaters/lotte-chungjangno/seatmaps/hall-1.json";
import lotteChungjangnoHall2 from "@data/theaters/lotte-chungjangno/seatmaps/hall-2.json";
import lotteChungjangnoHall3 from "@data/theaters/lotte-chungjangno/seatmaps/hall-3.json";
import lotteChungjangnoHall4 from "@data/theaters/lotte-chungjangno/seatmaps/hall-4.json";
import lotteChungjangnoHall5 from "@data/theaters/lotte-chungjangno/seatmaps/hall-5.json";
import lotteChungjangnoHall6 from "@data/theaters/lotte-chungjangno/seatmaps/hall-6.json";
import lotteChungjangnoHall7 from "@data/theaters/lotte-chungjangno/seatmaps/hall-7.json";
import lotteChungjangnoHall8 from "@data/theaters/lotte-chungjangno/seatmaps/hall-8.json";
import lotteChungjangnoHall9 from "@data/theaters/lotte-chungjangno/seatmaps/hall-9.json";
import lotteGyeongjuHwangseongTheater from "@data/theaters/lotte-gyeongju-hwangseong/theater.json";
import lotteGyeongjuHwangseongSchedule from "@data/showtimes/lotte-gyeongju-hwangseong.json";
import lotteGyeongjuHwangseongHall1 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-1.json";
import lotteGyeongjuHwangseongHall2 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-2.json";
import lotteGyeongjuHwangseongHall3 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-3.json";
import lotteGyeongjuHwangseongHall4 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-4.json";
import lotteGyeongjuHwangseongHall5 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-5.json";
import lotteGyeongjuHwangseongHall6 from "@data/theaters/lotte-gyeongju-hwangseong/seatmaps/hall-6.json";
import lotteGumiGongdanTheater from "@data/theaters/lotte-gumi-gongdan/theater.json";
import lotteGumiGongdanSchedule from "@data/showtimes/lotte-gumi-gongdan.json";
import lotteGumiGongdanHall1 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-1.json";
import lotteGumiGongdanHall2 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-2.json";
import lotteGumiGongdanHall3 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-3.json";
import lotteGumiGongdanHall4 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-4.json";
import lotteGumiGongdanHall5 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-5.json";
import lotteGumiGongdanHall6 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-6.json";
import lotteGumiGongdanHall7 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-7.json";
import lotteGumiGongdanHall8 from "@data/theaters/lotte-gumi-gongdan/seatmaps/hall-8.json";
import lotteDaeguGwangjangTheater from "@data/theaters/lotte-daegu-gwangjang/theater.json";
import lotteDaeguGwangjangSchedule from "@data/showtimes/lotte-daegu-gwangjang.json";
import lotteDaeguGwangjangHall1 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-1.json";
import lotteDaeguGwangjangHall2 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-2.json";
import lotteDaeguGwangjangHall3 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-3.json";
import lotteDaeguGwangjangHall4 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-4.json";
import lotteDaeguGwangjangHall5 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-5.json";
import lotteDaeguGwangjangHall6 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-6.json";
import lotteDaeguGwangjangHall7 from "@data/theaters/lotte-daegu-gwangjang/seatmaps/hall-7.json";
import lotteDaeguYulhaTheater from "@data/theaters/lotte-daegu-yulha/theater.json";
import lotteDaeguYulhaSchedule from "@data/showtimes/lotte-daegu-yulha.json";
import lotteDaeguYulhaHall1 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-1.json";
import lotteDaeguYulhaHall2 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-2.json";
import lotteDaeguYulhaHall3 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-3.json";
import lotteDaeguYulhaHall4 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-4.json";
import lotteDaeguYulhaHall5 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-5.json";
import lotteDaeguYulhaHall6 from "@data/theaters/lotte-daegu-yulha/seatmaps/hall-6.json";
import lotteDaeguHyeonpungTheater from "@data/theaters/lotte-daegu-hyeonpung/theater.json";
import lotteDaeguHyeonpungSchedule from "@data/showtimes/lotte-daegu-hyeonpung.json";
import lotteDaeguHyeonpungHall1 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-1.json";
import lotteDaeguHyeonpungHall2 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-2.json";
import lotteDaeguHyeonpungHall3 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-3.json";
import lotteDaeguHyeonpungHall4 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-4.json";
import lotteDaeguHyeonpungHall5 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-5.json";
import lotteDaeguHyeonpungHall6 from "@data/theaters/lotte-daegu-hyeonpung/seatmaps/hall-6.json";
import lotteDongseongnoTheater from "@data/theaters/lotte-dongseongno/theater.json";
import lotteDongseongnoSchedule from "@data/showtimes/lotte-dongseongno.json";
import lotteDongseongnoHall1 from "@data/theaters/lotte-dongseongno/seatmaps/hall-1.json";
import lotteDongseongnoHall2 from "@data/theaters/lotte-dongseongno/seatmaps/hall-2.json";
import lotteDongseongnoHall3 from "@data/theaters/lotte-dongseongno/seatmaps/hall-3.json";
import lotteDongseongnoHall4 from "@data/theaters/lotte-dongseongno/seatmaps/hall-4.json";
import lotteDongseongnoHall5 from "@data/theaters/lotte-dongseongno/seatmaps/hall-5.json";
import lotteDongseongnoHall6 from "@data/theaters/lotte-dongseongno/seatmaps/hall-6.json";
import lotteDongseongnoHall7 from "@data/theaters/lotte-dongseongno/seatmaps/hall-7.json";
import lotteDongseongnoHall8 from "@data/theaters/lotte-dongseongno/seatmaps/hall-8.json";
import lotteDongseongnoHall9 from "@data/theaters/lotte-dongseongno/seatmaps/hall-9.json";
import lotteSanginTheater from "@data/theaters/lotte-sangin/theater.json";
import lotteSanginSchedule from "@data/showtimes/lotte-sangin.json";
import lotteSanginHall1 from "@data/theaters/lotte-sangin/seatmaps/hall-1.json";
import lotteSanginHall2 from "@data/theaters/lotte-sangin/seatmaps/hall-2.json";
import lotteSanginHall3 from "@data/theaters/lotte-sangin/seatmaps/hall-3.json";
import lotteSanginHall4 from "@data/theaters/lotte-sangin/seatmaps/hall-4.json";
import lotteSanginHall5 from "@data/theaters/lotte-sangin/seatmaps/hall-5.json";
import lotteSanginHall6 from "@data/theaters/lotte-sangin/seatmaps/hall-6.json";
import lotteSanginHall7 from "@data/theaters/lotte-sangin/seatmaps/hall-7.json";
import lotteSangjuTheater from "@data/theaters/lotte-sangju/theater.json";
import lotteSangjuSchedule from "@data/showtimes/lotte-sangju.json";
import lotteSangjuHall2 from "@data/theaters/lotte-sangju/seatmaps/hall-2.json";
import lotteSangjuHall3 from "@data/theaters/lotte-sangju/seatmaps/hall-3.json";
import lotteSangjuHall4 from "@data/theaters/lotte-sangju/seatmaps/hall-4.json";
import lotteSeongseoTheater from "@data/theaters/lotte-seongseo/theater.json";
import lotteSeongseoSchedule from "@data/showtimes/lotte-seongseo.json";
import lotteSeongseoHall1 from "@data/theaters/lotte-seongseo/seatmaps/hall-1.json";
import lotteSeongseoHall2 from "@data/theaters/lotte-seongseo/seatmaps/hall-2.json";
import lotteSeongseoHall3 from "@data/theaters/lotte-seongseo/seatmaps/hall-3.json";
import lotteSeongseoHall4 from "@data/theaters/lotte-seongseo/seatmaps/hall-4.json";
import lotteSeongseoHall5 from "@data/theaters/lotte-seongseo/seatmaps/hall-5.json";
import lotteSeongseoHall6 from "@data/theaters/lotte-seongseo/seatmaps/hall-6.json";
import lotteSeongseoHall7 from "@data/theaters/lotte-seongseo/seatmaps/hall-7.json";
import lotteSeongseoHall8 from "@data/theaters/lotte-seongseo/seatmaps/hall-8.json";
import lotteSeongseoHall9 from "@data/theaters/lotte-seongseo/seatmaps/hall-9.json";
import lotteYeongjuTheater from "@data/theaters/lotte-yeongju/theater.json";
import lotteYeongjuSchedule from "@data/showtimes/lotte-yeongju.json";
import lotteYeongjuHall1 from "@data/theaters/lotte-yeongju/seatmaps/hall-1.json";
import lotteYeongjuHall2 from "@data/theaters/lotte-yeongju/seatmaps/hall-2.json";
import lotteYeongjuHall3 from "@data/theaters/lotte-yeongju/seatmaps/hall-3.json";
import lotteYeongjuHall4 from "@data/theaters/lotte-yeongju/seatmaps/hall-4.json";
import lotteYeongjuHall5 from "@data/theaters/lotte-yeongju/seatmaps/hall-5.json";
import lotteYeongjuHall6 from "@data/theaters/lotte-yeongju/seatmaps/hall-6.json";
import lotteYeongcheonTheater from "@data/theaters/lotte-yeongcheon/theater.json";
import lotteYeongcheonSchedule from "@data/showtimes/lotte-yeongcheon.json";
import lotteYeongcheonHall1 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-1.json";
import lotteYeongcheonHall2 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-2.json";
import lotteYeongcheonHall3 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-3.json";
import lotteYeongcheonHall4 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-4.json";
import lotteYeongcheonHall5 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-5.json";
import lotteYeongcheonHall6 from "@data/theaters/lotte-yeongcheon/seatmaps/hall-6.json";
import lottePohangTheater from "@data/theaters/lotte-pohang/theater.json";
import lottePohangSchedule from "@data/showtimes/lotte-pohang.json";
import lottePohangHall1 from "@data/theaters/lotte-pohang/seatmaps/hall-1.json";
import lottePohangHall2 from "@data/theaters/lotte-pohang/seatmaps/hall-2.json";
import lottePohangHall3 from "@data/theaters/lotte-pohang/seatmaps/hall-3.json";
import lottePohangHall4 from "@data/theaters/lotte-pohang/seatmaps/hall-4.json";
import lottePohangHall5 from "@data/theaters/lotte-pohang/seatmaps/hall-5.json";
import lottePohangHall6 from "@data/theaters/lotte-pohang/seatmaps/hall-6.json";
import lottePohangHall7 from "@data/theaters/lotte-pohang/seatmaps/hall-7.json";
import lottePohangHall8 from "@data/theaters/lotte-pohang/seatmaps/hall-8.json";
import lotteGumiCentralTheater from "@data/theaters/lotte-gumi-central/theater.json";
import lotteGumiCentralSchedule from "@data/showtimes/lotte-gumi-central.json";
import lotteGumiCentralHall1 from "@data/theaters/lotte-gumi-central/seatmaps/hall-1.json";
import lotteGumiCentralHall2 from "@data/theaters/lotte-gumi-central/seatmaps/hall-2.json";
import lotteGumiCentralHall3 from "@data/theaters/lotte-gumi-central/seatmaps/hall-3.json";
import lotteGumiCentralHall4 from "@data/theaters/lotte-gumi-central/seatmaps/hall-4.json";
import lotteGumiCentralHall5 from "@data/theaters/lotte-gumi-central/seatmaps/hall-5.json";
import lotteGumiCentralHall6 from "@data/theaters/lotte-gumi-central/seatmaps/hall-6.json";
import lotteGumiCentralHall7 from "@data/theaters/lotte-gumi-central/seatmaps/hall-7.json";
import lotteAndongTheater from "@data/theaters/lotte-andong/theater.json";
import lotteAndongSchedule from "@data/showtimes/lotte-andong.json";
import lotteAndongHall1 from "@data/theaters/lotte-andong/seatmaps/hall-1.json";
import lotteAndongHall2 from "@data/theaters/lotte-andong/seatmaps/hall-2.json";
import lotteAndongHall3 from "@data/theaters/lotte-andong/seatmaps/hall-3.json";
import lotteAndongHall4 from "@data/theaters/lotte-andong/seatmaps/hall-4.json";
import lotteAndongHall5 from "@data/theaters/lotte-andong/seatmaps/hall-5.json";
import lotteChilgokTheater from "@data/theaters/lotte-chilgok/theater.json";
import lotteChilgokSchedule from "@data/showtimes/lotte-chilgok.json";
import lotteChilgokHall1 from "@data/theaters/lotte-chilgok/seatmaps/hall-1.json";
import lotteChilgokHall2 from "@data/theaters/lotte-chilgok/seatmaps/hall-2.json";
import lotteChilgokHall3 from "@data/theaters/lotte-chilgok/seatmaps/hall-3.json";
import lotteChilgokHall4 from "@data/theaters/lotte-chilgok/seatmaps/hall-4.json";
import lotteChilgokHall5 from "@data/theaters/lotte-chilgok/seatmaps/hall-5.json";
import lotteChilgokHall6 from "@data/theaters/lotte-chilgok/seatmaps/hall-6.json";
import lotteGeochangTheater from "@data/theaters/lotte-geochang/theater.json";
import lotteGeochangSchedule from "@data/showtimes/lotte-geochang.json";
import lotteGeochangHall1 from "@data/theaters/lotte-geochang/seatmaps/hall-1.json";
import lotteGeochangHall2 from "@data/theaters/lotte-geochang/seatmaps/hall-2.json";
import lotteGwangbokTheater from "@data/theaters/lotte-gwangbok/theater.json";
import lotteGwangbokSchedule from "@data/showtimes/lotte-gwangbok.json";
import lotteGwangbokHall1 from "@data/theaters/lotte-gwangbok/seatmaps/hall-1.json";
import lotteGwangbokHall2 from "@data/theaters/lotte-gwangbok/seatmaps/hall-2.json";
import lotteGwangbokHall3 from "@data/theaters/lotte-gwangbok/seatmaps/hall-3.json";
import lotteGwangbokHall4 from "@data/theaters/lotte-gwangbok/seatmaps/hall-4.json";
import lotteGwangbokHall5 from "@data/theaters/lotte-gwangbok/seatmaps/hall-5.json";
import lotteGwangbokHall6 from "@data/theaters/lotte-gwangbok/seatmaps/hall-6.json";
import lotteGwangbokHall7 from "@data/theaters/lotte-gwangbok/seatmaps/hall-7.json";
import lotteGwangbokHall8 from "@data/theaters/lotte-gwangbok/seatmaps/hall-8.json";
import lotteGwangbokHall9 from "@data/theaters/lotte-gwangbok/seatmaps/hall-9.json";
import lotteGwangbokHall10 from "@data/theaters/lotte-gwangbok/seatmaps/hall-10.json";
import lotteGwangbokCharlotte from "@data/theaters/lotte-gwangbok/seatmaps/charlotte.json";
import lotteGimhaeBuwonTheater from "@data/theaters/lotte-gimhae-buwon/theater.json";
import lotteGimhaeBuwonSchedule from "@data/showtimes/lotte-gimhae-buwon.json";
import lotteGimhaeBuwonHall1 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-1.json";
import lotteGimhaeBuwonHall2 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-2.json";
import lotteGimhaeBuwonHall3 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-3.json";
import lotteGimhaeBuwonHall4 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-4.json";
import lotteGimhaeBuwonHall5 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-5.json";
import lotteGimhaeBuwonHall6 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-6.json";
import lotteGimhaeBuwonHall7 from "@data/theaters/lotte-gimhae-buwon/seatmaps/hall-7.json";
import lotteGimhaeOutletTheater from "@data/theaters/lotte-gimhae-outlet/theater.json";
import lotteGimhaeOutletSchedule from "@data/showtimes/lotte-gimhae-outlet.json";
import lotteGimhaeOutletHall1 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-1.json";
import lotteGimhaeOutletHall2 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-2.json";
import lotteGimhaeOutletHall3 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-3.json";
import lotteGimhaeOutletHall4 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-4.json";
import lotteGimhaeOutletHall5 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-5.json";
import lotteGimhaeOutletHall6 from "@data/theaters/lotte-gimhae-outlet/seatmaps/hall-6.json";
import lotteDongnaeTheater from "@data/theaters/lotte-dongnae/theater.json";
import lotteDongnaeSchedule from "@data/showtimes/lotte-dongnae.json";
import lotteDongnaeHall1 from "@data/theaters/lotte-dongnae/seatmaps/hall-1.json";
import lotteDongnaeHall2 from "@data/theaters/lotte-dongnae/seatmaps/hall-2.json";
import lotteDongnaeHall3 from "@data/theaters/lotte-dongnae/seatmaps/hall-3.json";
import lotteDongnaeHall4 from "@data/theaters/lotte-dongnae/seatmaps/hall-4.json";
import lotteDongnaeHall5 from "@data/theaters/lotte-dongnae/seatmaps/hall-5.json";
import lotteDongnaeHall6 from "@data/theaters/lotte-dongnae/seatmaps/hall-6.json";
import lotteDongnaeHall7 from "@data/theaters/lotte-dongnae/seatmaps/hall-7.json";
import lotteDongnaeHall8 from "@data/theaters/lotte-dongnae/seatmaps/hall-8.json";
import lotteDongnaeHall9 from "@data/theaters/lotte-dongnae/seatmaps/hall-9.json";
import lotteDongbusanOutletTheater from "@data/theaters/lotte-dongbusan-outlet/theater.json";
import lotteDongbusanOutletSchedule from "@data/showtimes/lotte-dongbusan-outlet.json";
import lotteDongbusanOutletHall1 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-1.json";
import lotteDongbusanOutletHall2 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-2.json";
import lotteDongbusanOutletHall3 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-3.json";
import lotteDongbusanOutletHall4 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-4.json";
import lotteDongbusanOutletHall5 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-5.json";
import lotteDongbusanOutletHall6 from "@data/theaters/lotte-dongbusan-outlet/seatmaps/hall-6.json";
import lotteMasanTheater from "@data/theaters/lotte-masan/theater.json";
import lotteMasanSchedule from "@data/showtimes/lotte-masan.json";
import lotteMasanHall1 from "@data/theaters/lotte-masan/seatmaps/hall-1.json";
import lotteMasanHall2 from "@data/theaters/lotte-masan/seatmaps/hall-2.json";
import lotteMasanHall3 from "@data/theaters/lotte-masan/seatmaps/hall-3.json";
import lotteMasanHall4 from "@data/theaters/lotte-masan/seatmaps/hall-4.json";
import lotteMasanHall5 from "@data/theaters/lotte-masan/seatmaps/hall-5.json";
import lotteMasanHall6 from "@data/theaters/lotte-masan/seatmaps/hall-6.json";
import lotteMasanHall7 from "@data/theaters/lotte-masan/seatmaps/hall-7.json";
import lotteBusanMyeongjiTheater from "@data/theaters/lotte-busan-myeongji/theater.json";
import lotteBusanMyeongjiSchedule from "@data/showtimes/lotte-busan-myeongji.json";
import lotteBusanMyeongjiHall1 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-1.json";
import lotteBusanMyeongjiHall2 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-2.json";
import lotteBusanMyeongjiHall3 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-3.json";
import lotteBusanMyeongjiHall4 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-4.json";
import lotteBusanMyeongjiHall5 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-5.json";
import lotteBusanMyeongjiHall6 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-6.json";
import lotteBusanMyeongjiHall7 from "@data/theaters/lotte-busan-myeongji/seatmaps/hall-7.json";
import lotteBusanTheater from "@data/theaters/lotte-busan/theater.json";
import lotteBusanSchedule from "@data/showtimes/lotte-busan.json";
import lotteBusanHall1 from "@data/theaters/lotte-busan/seatmaps/hall-1.json";
import lotteBusanHall2 from "@data/theaters/lotte-busan/seatmaps/hall-2.json";
import lotteBusanHall3 from "@data/theaters/lotte-busan/seatmaps/hall-3.json";
import lotteBusanHall4 from "@data/theaters/lotte-busan/seatmaps/hall-4.json";
import lotteBusanHall5 from "@data/theaters/lotte-busan/seatmaps/hall-5.json";
import lotteBusanHall6 from "@data/theaters/lotte-busan/seatmaps/hall-6.json";
import lotteBusanHall7 from "@data/theaters/lotte-busan/seatmaps/hall-7.json";
import lotteBusanHall8 from "@data/theaters/lotte-busan/seatmaps/hall-8.json";
import lotteBusanHall9 from "@data/theaters/lotte-busan/seatmaps/hall-9.json";
import lotteBusanHall10 from "@data/theaters/lotte-busan/seatmaps/hall-10.json";
import lotteBusanHall11 from "@data/theaters/lotte-busan/seatmaps/hall-11.json";
import lotteBusanJangnimTheater from "@data/theaters/lotte-busan-jangnim/theater.json";
import lotteBusanJangnimSchedule from "@data/showtimes/lotte-busan-jangnim.json";
import lotteBusanJangnimHall1 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-1.json";
import lotteBusanJangnimHall2 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-2.json";
import lotteBusanJangnimHall3 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-3.json";
import lotteBusanJangnimHall4 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-4.json";
import lotteBusanJangnimHall5 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-5.json";
import lotteBusanJangnimHall6 from "@data/theaters/lotte-busan-jangnim/seatmaps/hall-6.json";
import lotteSacheonTheater from "@data/theaters/lotte-sacheon/theater.json";
import lotteSacheonSchedule from "@data/showtimes/lotte-sacheon.json";
import lotteSacheonHall1 from "@data/theaters/lotte-sacheon/seatmaps/hall-1.json";
import lotteSacheonHall2 from "@data/theaters/lotte-sacheon/seatmaps/hall-2.json";
import lotteSacheonHall3 from "@data/theaters/lotte-sacheon/seatmaps/hall-3.json";
import lotteSacheonHall5 from "@data/theaters/lotte-sacheon/seatmaps/hall-5.json";
import lotteSacheonHall6 from "@data/theaters/lotte-sacheon/seatmaps/hall-6.json";
import lotteSacheonHall7 from "@data/theaters/lotte-sacheon/seatmaps/hall-7.json";
import lotteCentumCityTheater from "@data/theaters/lotte-centum-city/theater.json";
import lotteCentumCitySchedule from "@data/showtimes/lotte-centum-city.json";
import lotteCentumCityHall2 from "@data/theaters/lotte-centum-city/seatmaps/hall-2.json";
import lotteCentumCityHall3 from "@data/theaters/lotte-centum-city/seatmaps/hall-3.json";
import lotteCentumCityHall4 from "@data/theaters/lotte-centum-city/seatmaps/hall-4.json";
import lotteCentumCityHall5 from "@data/theaters/lotte-centum-city/seatmaps/hall-5.json";
import lotteCentumCityHall6 from "@data/theaters/lotte-centum-city/seatmaps/hall-6.json";
import lotteCentumCityHall7 from "@data/theaters/lotte-centum-city/seatmaps/hall-7.json";
import lotteCentumCityHall8 from "@data/theaters/lotte-centum-city/seatmaps/hall-8.json";
import lotteCentumCityHall9 from "@data/theaters/lotte-centum-city/seatmaps/hall-9.json";
import lotteCentumCityHall10 from "@data/theaters/lotte-centum-city/seatmaps/hall-10.json";
import lotteCentumCityCharlotte from "@data/theaters/lotte-centum-city/seatmaps/charlotte.json";
import lotteJinjuMbcineTheater from "@data/theaters/lotte-jinju-mbcine/theater.json";
import lotteJinjuMbcineSchedule from "@data/showtimes/lotte-jinju-mbcine.json";
import lotteJinjuMbcineHall1 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-1.json";
import lotteJinjuMbcineHall2 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-2.json";
import lotteJinjuMbcineHall3 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-3.json";
import lotteJinjuMbcineHall4 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-4.json";
import lotteJinjuMbcineHall5 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-5.json";
import lotteJinjuMbcineHall6 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-6.json";
import lotteJinjuMbcineHall7 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-7.json";
import lotteJinjuMbcineHall8 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-8.json";
import lotteJinjuMbcineHall9 from "@data/theaters/lotte-jinju-mbcine/seatmaps/hall-9.json";
import lotteO2BusanUnivTheater from "@data/theaters/lotte-o2-busan-univ/theater.json";
import lotteO2BusanUnivSchedule from "@data/showtimes/lotte-o2-busan-univ.json";
import lotteO2BusanUnivHall1 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-1.json";
import lotteO2BusanUnivHall2 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-2.json";
import lotteO2BusanUnivHall3 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-3.json";
import lotteO2BusanUnivHall4 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-4.json";
import lotteO2BusanUnivHall5 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-5.json";
import lotteO2BusanUnivHall6 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-6.json";
import lotteO2BusanUnivHall7 from "@data/theaters/lotte-o2-busan-univ/seatmaps/hall-7.json";
import lotteUlsanTheater from "@data/theaters/lotte-ulsan/theater.json";
import lotteUlsanSchedule from "@data/showtimes/lotte-ulsan.json";
import lotteUlsanHall1 from "@data/theaters/lotte-ulsan/seatmaps/hall-1.json";
import lotteUlsanHall2 from "@data/theaters/lotte-ulsan/seatmaps/hall-2.json";
import lotteUlsanHall3 from "@data/theaters/lotte-ulsan/seatmaps/hall-3.json";
import lotteUlsanHall4 from "@data/theaters/lotte-ulsan/seatmaps/hall-4.json";
import lotteUlsanHall5 from "@data/theaters/lotte-ulsan/seatmaps/hall-5.json";
import lotteUlsanHall6 from "@data/theaters/lotte-ulsan/seatmaps/hall-6.json";
import lotteUlsanHall7 from "@data/theaters/lotte-ulsan/seatmaps/hall-7.json";
import lotteUlsanHall8 from "@data/theaters/lotte-ulsan/seatmaps/hall-8.json";
import lotteUlsanHall9 from "@data/theaters/lotte-ulsan/seatmaps/hall-9.json";
import lotteUlsanSeongnamTheater from "@data/theaters/lotte-ulsan-seongnam/theater.json";
import lotteUlsanSeongnamSchedule from "@data/showtimes/lotte-ulsan-seongnam.json";
import lotteUlsanSeongnamHall1 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-1.json";
import lotteUlsanSeongnamHall2 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-2.json";
import lotteUlsanSeongnamHall3 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-3.json";
import lotteUlsanSeongnamHall4 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-4.json";
import lotteUlsanSeongnamHall5 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-5.json";
import lotteUlsanSeongnamHall6 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-6.json";
import lotteUlsanSeongnamHall7 from "@data/theaters/lotte-ulsan-seongnam/seatmaps/hall-7.json";
import lotteJinjuHyeoksinTheater from "@data/theaters/lotte-jinju-hyeoksin/theater.json";
import lotteJinjuHyeoksinSchedule from "@data/showtimes/lotte-jinju-hyeoksin.json";
import lotteJinjuHyeoksinHall1 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-1.json";
import lotteJinjuHyeoksinHall2 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-2.json";
import lotteJinjuHyeoksinHall3 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-3.json";
import lotteJinjuHyeoksinHall4 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-4.json";
import lotteJinjuHyeoksinHall5 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-5.json";
import lotteJinjuHyeoksinHall6 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-6.json";
import lotteJinjuHyeoksinHall7 from "@data/theaters/lotte-jinju-hyeoksin/seatmaps/hall-7.json";
import lotteJinhaeTheater from "@data/theaters/lotte-jinhae/theater.json";
import lotteJinhaeSchedule from "@data/showtimes/lotte-jinhae.json";
import lotteJinhaeHall1 from "@data/theaters/lotte-jinhae/seatmaps/hall-1.json";
import lotteJinhaeHall2 from "@data/theaters/lotte-jinhae/seatmaps/hall-2.json";
import lotteJinhaeHall3 from "@data/theaters/lotte-jinhae/seatmaps/hall-3.json";
import lotteJinhaeHall4 from "@data/theaters/lotte-jinhae/seatmaps/hall-4.json";
import lotteJinhaeHall5 from "@data/theaters/lotte-jinhae/seatmaps/hall-5.json";
import lotteJinhaeHall6 from "@data/theaters/lotte-jinhae/seatmaps/hall-6.json";
import lotteChangwonTheater from "@data/theaters/lotte-changwon/theater.json";
import lotteChangwonSchedule from "@data/showtimes/lotte-changwon.json";
import lotteChangwonHall1 from "@data/theaters/lotte-changwon/seatmaps/hall-1.json";
import lotteChangwonHall2 from "@data/theaters/lotte-changwon/seatmaps/hall-2.json";
import lotteChangwonHall3 from "@data/theaters/lotte-changwon/seatmaps/hall-3.json";
import lotteChangwonHall4 from "@data/theaters/lotte-changwon/seatmaps/hall-4.json";
import lotteChangwonHall5 from "@data/theaters/lotte-changwon/seatmaps/hall-5.json";
import lotteChangwonHall6 from "@data/theaters/lotte-changwon/seatmaps/hall-6.json";
import lotteChangwonHall7 from "@data/theaters/lotte-changwon/seatmaps/hall-7.json";
import lotteTongyeongTheater from "@data/theaters/lotte-tongyeong/theater.json";
import lotteTongyeongSchedule from "@data/showtimes/lotte-tongyeong.json";
import lotteTongyeongHall1 from "@data/theaters/lotte-tongyeong/seatmaps/hall-1.json";
import lotteTongyeongHall2 from "@data/theaters/lotte-tongyeong/seatmaps/hall-2.json";
import lotteTongyeongHall3 from "@data/theaters/lotte-tongyeong/seatmaps/hall-3.json";
import lotteTongyeongHall4 from "@data/theaters/lotte-tongyeong/seatmaps/hall-4.json";
import lotteTongyeongHall5 from "@data/theaters/lotte-tongyeong/seatmaps/hall-5.json";
import lotteTongyeongHall6 from "@data/theaters/lotte-tongyeong/seatmaps/hall-6.json";
import lotteTongyeongHall7 from "@data/theaters/lotte-tongyeong/seatmaps/hall-7.json";
import lotteKyungnamUnivTheater from "@data/theaters/lotte-kyungnam-univ/theater.json";
import lotteKyungnamUnivSchedule from "@data/showtimes/lotte-kyungnam-univ.json";
import lotteKyungnamUnivHall1 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-1.json";
import lotteKyungnamUnivHall2 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-2.json";
import lotteKyungnamUnivHall3 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-3.json";
import lotteKyungnamUnivHall4 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-4.json";
import lotteKyungnamUnivHall5 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-5.json";
import lotteKyungnamUnivHall6 from "@data/theaters/lotte-kyungnam-univ/seatmaps/hall-6.json";
import lotteGangneungTheater from "@data/theaters/lotte-gangneung/theater.json";
import lotteGangneungSchedule from "@data/showtimes/lotte-gangneung.json";
import lotteGangneungHall1 from "@data/theaters/lotte-gangneung/seatmaps/hall-1.json";
import lotteGangneungHall2 from "@data/theaters/lotte-gangneung/seatmaps/hall-2.json";
import lotteGangneungHall3 from "@data/theaters/lotte-gangneung/seatmaps/hall-3.json";
import lotteGangneungHall4 from "@data/theaters/lotte-gangneung/seatmaps/hall-4.json";
import lotteNamWonjuTheater from "@data/theaters/lotte-nam-wonju/theater.json";
import lotteNamWonjuSchedule from "@data/showtimes/lotte-nam-wonju.json";
import lotteNamWonjuHall1 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-1.json";
import lotteNamWonjuHall2 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-2.json";
import lotteNamWonjuHall3 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-3.json";
import lotteNamWonjuHall4 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-4.json";
import lotteNamWonjuHall5 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-5.json";
import lotteNamWonjuHall6 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-6.json";
import lotteNamWonjuHall7 from "@data/theaters/lotte-nam-wonju/seatmaps/hall-7.json";
import lotteDonghaeTheater from "@data/theaters/lotte-donghae/theater.json";
import lotteDonghaeSchedule from "@data/showtimes/lotte-donghae.json";
import lotteDonghaeHall1 from "@data/theaters/lotte-donghae/seatmaps/hall-1.json";
import lotteDonghaeHall2 from "@data/theaters/lotte-donghae/seatmaps/hall-2.json";
import lotteDonghaeHall3 from "@data/theaters/lotte-donghae/seatmaps/hall-3.json";
import lotteDonghaeHall4 from "@data/theaters/lotte-donghae/seatmaps/hall-4.json";
import lotteDonghaeHall5 from "@data/theaters/lotte-donghae/seatmaps/hall-5.json";
import lotteSokchoTheater from "@data/theaters/lotte-sokcho/theater.json";
import lotteSokchoSchedule from "@data/showtimes/lotte-sokcho.json";
import lotteSokchoHall1 from "@data/theaters/lotte-sokcho/seatmaps/hall-1.json";
import lotteSokchoHall2 from "@data/theaters/lotte-sokcho/seatmaps/hall-2.json";
import lotteSokchoHall3 from "@data/theaters/lotte-sokcho/seatmaps/hall-3.json";
import lotteSokchoHall4 from "@data/theaters/lotte-sokcho/seatmaps/hall-4.json";
import lotteSokchoHall5 from "@data/theaters/lotte-sokcho/seatmaps/hall-5.json";
import lotteWonjuMusilTheater from "@data/theaters/lotte-wonju-musil/theater.json";
import lotteWonjuMusilSchedule from "@data/showtimes/lotte-wonju-musil.json";
import lotteWonjuMusilHall1 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-1.json";
import lotteWonjuMusilHall2 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-2.json";
import lotteWonjuMusilHall3 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-3.json";
import lotteWonjuMusilHall4 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-4.json";
import lotteWonjuMusilHall5 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-5.json";
import lotteWonjuMusilHall6 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-6.json";
import lotteWonjuMusilHall7 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-7.json";
import lotteWonjuMusilHall8 from "@data/theaters/lotte-wonju-musil/seatmaps/hall-8.json";
import lotteChuncheonTheater from "@data/theaters/lotte-chuncheon/theater.json";
import lotteChuncheonSchedule from "@data/showtimes/lotte-chuncheon.json";
import lotteChuncheonHall1 from "@data/theaters/lotte-chuncheon/seatmaps/hall-1.json";
import lotteChuncheonHall2 from "@data/theaters/lotte-chuncheon/seatmaps/hall-2.json";
import lotteChuncheonHall3 from "@data/theaters/lotte-chuncheon/seatmaps/hall-3.json";
import lotteChuncheonHall4 from "@data/theaters/lotte-chuncheon/seatmaps/hall-4.json";
import lotteChuncheonHall5 from "@data/theaters/lotte-chuncheon/seatmaps/hall-5.json";
import lotteChuncheonHall6 from "@data/theaters/lotte-chuncheon/seatmaps/hall-6.json";
import lotteSeogwipoTheater from "@data/theaters/lotte-seogwipo/theater.json";
import lotteSeogwipoSchedule from "@data/showtimes/lotte-seogwipo.json";
import lotteSeogwipoHall1 from "@data/theaters/lotte-seogwipo/seatmaps/hall-1.json";
import lotteSeogwipoHall2 from "@data/theaters/lotte-seogwipo/seatmaps/hall-2.json";
import lotteSeogwipoHall3 from "@data/theaters/lotte-seogwipo/seatmaps/hall-3.json";
import lotteSeogwipoHall5 from "@data/theaters/lotte-seogwipo/seatmaps/hall-5.json";
import lotteSeogwipoHall6 from "@data/theaters/lotte-seogwipo/seatmaps/hall-6.json";
import lotteSeogwipoHall7 from "@data/theaters/lotte-seogwipo/seatmaps/hall-7.json";
import lotteJejuYeondongTheater from "@data/theaters/lotte-jeju-yeondong/theater.json";
import lotteJejuYeondongSchedule from "@data/showtimes/lotte-jeju-yeondong.json";
import lotteJejuYeondongHall1 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-1.json";
import lotteJejuYeondongHall2 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-2.json";
import lotteJejuYeondongHall3 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-3.json";
import lotteJejuYeondongHall4 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-4.json";
import lotteJejuYeondongHall5 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-5.json";
import lotteJejuYeondongHall6 from "@data/theaters/lotte-jeju-yeondong/seatmaps/hall-6.json";

export const LOTTE_THEATER_FILES: unknown[] = [
  lotteGasanDigitalTheater,
  lotteGayangTheater,
  lotteGangdongTheater,
  lotteKonkukUnivTheater,
  lotteGimpoAirportTheater,
  lotteNowonTheater,
  lotteDogokTheater,
  lotteDoksanTheater,
  lotteSeoulNatlUnivTheater,
  lotteSuyuTheater,
  lotteSindaebangTheater,
  lotteSindorimTheater,
  lotteSillimTheater,
  lotteAvenuelTheater,
  lotteYeongdeungpoTheater,
  lotteYongsanTheater,
  lotteWorldTowerTheater,
  lotteEunpyeongTheater,
  lotteJungnangTheater,
  lotteCheongnyangniTheater,
  lotteHongikUnivTheater,
  lotteGeomdanAraTheater,
  lotteGwanggyoTheater,
  lotteGwangmyeongTheater,
  lotteGwangmyeongOutletTheater,
  lotteGuriOutletTheater,
  lotteDongtanTheater,
  lotteLaFestaTheater,
  lotteByeollaeTheater,
  lotteByeongjeomTheater,
  lotteBucheonTheater,
  lotteBupyeongGalsanTheater,
  lotteBupyeongStationTheater,
  lotteBuksuwonTheater,
  lotteSanbonFitinTheater,
  lotteSeosuwonTheater,
  lotteSeongnamJungangTheater,
  lotteSongtanTheater,
  lotteSuwonTheater,
  lotteSujiTheater,
  lotteSihwaTheater,
  lotteSiheungJanghyeonTheater,
  lotteAnsanTheater,
  lotteAnsanGojanTheater,
  lotteAnsanJungangTheater,
  lotteAnseongTheater,
  lotteAnyangIlbeongaTheater,
  lotteYonginGiheungTheater,
  lotteYonginYeokbukTheater,
  lotteWiryeTheater,
  lotteUijeongbuMinrakTheater,
  lotteIncheonAsiadTheater,
  lotteIncheonTerminalTheater,
  lotteJinjeopTheater,
  lottePajuOutletTheater,
  lottePajuYadangTheater,
  lottePajuUnjeongTheater,
  lottePangyoTheater,
  lottePyeongchonTheater,
  lotteHanamMisaTheater,
  lotteHyangnamTheater,
  lotteDangjinTheater,
  lotteDaejeonTheater,
  lotteDaejeonGwanjeoTheater,
  lotteDaejeonCentralTheater,
  lotteSeosanTheater,
  lotteSeocheongjuTheater,
  lotteAsanTerminalTheater,
  lotteOsongTheater,
  lotteCheonanBuldangTheater,
  lotteCheonanCheongdangTheater,
  lotteCheongjuYongamTheater,
  lotteChungjuTheater,
  lotteGwangjuTheater,
  lotteGwangjuGwangsanTheater,
  lotteGwangjuCheomdanTheater,
  lotteGunsanNaunTheater,
  lotteGunsanMallTheater,
  lotteSuwanTheater,
  lotteIksanMohyeonTheater,
  lotteJeonjuTheater,
  lotteJeonjuSongcheonTheater,
  lotteJeonjuPyeonghwaTheater,
  lotteChungjangnoTheater,
  lotteGyeongjuHwangseongTheater,
  lotteGumiGongdanTheater,
  lotteDaeguGwangjangTheater,
  lotteDaeguYulhaTheater,
  lotteDaeguHyeonpungTheater,
  lotteDongseongnoTheater,
  lotteSanginTheater,
  lotteSangjuTheater,
  lotteSeongseoTheater,
  lotteYeongjuTheater,
  lotteYeongcheonTheater,
  lottePohangTheater,
  lotteGumiCentralTheater,
  lotteAndongTheater,
  lotteChilgokTheater,
  lotteGeochangTheater,
  lotteGwangbokTheater,
  lotteGimhaeBuwonTheater,
  lotteGimhaeOutletTheater,
  lotteDongnaeTheater,
  lotteDongbusanOutletTheater,
  lotteMasanTheater,
  lotteBusanMyeongjiTheater,
  lotteBusanTheater,
  lotteBusanJangnimTheater,
  lotteSacheonTheater,
  lotteCentumCityTheater,
  lotteJinjuMbcineTheater,
  lotteO2BusanUnivTheater,
  lotteUlsanTheater,
  lotteUlsanSeongnamTheater,
  lotteJinjuHyeoksinTheater,
  lotteJinhaeTheater,
  lotteChangwonTheater,
  lotteTongyeongTheater,
  lotteKyungnamUnivTheater,
  lotteGangneungTheater,
  lotteNamWonjuTheater,
  lotteDonghaeTheater,
  lotteSokchoTheater,
  lotteWonjuMusilTheater,
  lotteChuncheonTheater,
  lotteSeogwipoTheater,
  lotteJejuYeondongTheater,
];

export const LOTTE_SEATMAP_FILES: unknown[] = [
  lotteGasanDigitalHall1,
  lotteGasanDigitalHall2,
  lotteGasanDigitalHall3,
  lotteGasanDigitalHall4,
  lotteGasanDigitalHall5,
  lotteGasanDigitalHall6,
  lotteGayangHall1,
  lotteGayangHall2,
  lotteGayangHall3,
  lotteGayangHall4,
  lotteGayangHall5,
  lotteGayangHall6,
  lotteGangdongHall1,
  lotteGangdongHall2,
  lotteGangdongHall3,
  lotteGangdongHall4,
  lotteGangdongHall5,
  lotteGangdongHall6,
  lotteGangdongHall10,
  lotteKonkukUnivHall1,
  lotteKonkukUnivHall2,
  lotteKonkukUnivHall3,
  lotteKonkukUnivHall4,
  lotteKonkukUnivHall5,
  lotteKonkukUnivHall6,
  lotteKonkukUnivHall7,
  lotteKonkukUnivHall8,
  lotteKonkukUnivHall9,
  lotteKonkukUnivHall10,
  lotteKonkukUnivCharlotte,
  lotteGimpoAirportHall2,
  lotteGimpoAirportHall3,
  lotteGimpoAirportHall4,
  lotteGimpoAirportHall5,
  lotteGimpoAirportHall6,
  lotteGimpoAirportHall7,
  lotteGimpoAirportHall8,
  lotteGimpoAirportHall9,
  lotteGimpoAirportHall10,
  lotteGimpoAirportCharlotte,
  lotteNowonHall1,
  lotteNowonHall2,
  lotteNowonHall3,
  lotteNowonHall4,
  lotteNowonHall5,
  lotteNowonHall6,
  lotteNowonHall7,
  lotteNowonHall8,
  lotteNowonHall9,
  lotteNowonHall10,
  lotteDogokHall1,
  lotteDogokHall2,
  lotteDogokHall3,
  lotteDogokHall4,
  lotteDogokHall5,
  lotteDogokHall6,
  lotteDogokHall7,
  lotteDoksanHall1,
  lotteDoksanHall2,
  lotteDoksanHall3,
  lotteDoksanHall4,
  lotteDoksanHall5,
  lotteDoksanHall6,
  lotteDoksanHall7,
  lotteDoksanHall8,
  lotteSeoulNatlUnivHall1,
  lotteSeoulNatlUnivHall2,
  lotteSeoulNatlUnivHall3,
  lotteSeoulNatlUnivHall4,
  lotteSeoulNatlUnivHall5,
  lotteSuyuHall1,
  lotteSuyuHall2,
  lotteSuyuHall3,
  lotteSuyuHall4,
  lotteSuyuHall5,
  lotteSuyuHall6,
  lotteSindaebangHall1,
  lotteSindaebangHall2,
  lotteSindaebangHall3,
  lotteSindaebangHall4,
  lotteSindaebangHall5,
  lotteSindaebangHall6,
  lotteSindorimHall1,
  lotteSindorimHall2,
  lotteSindorimHall3,
  lotteSindorimHall4,
  lotteSindorimHall5,
  lotteSillimHall1,
  lotteSillimHall2,
  lotteSillimHall3,
  lotteSillimHall4,
  lotteSillimHall5,
  lotteSillimHall6,
  lotteSillimHall7,
  lotteSillimHall8,
  lotteAvenuelHall1,
  lotteAvenuelHall2,
  lotteAvenuelHall3,
  lotteAvenuelHall5,
  lotteAvenuelCharlotte,
  lotteYeongdeungpoHall1,
  lotteYeongdeungpoHall2,
  lotteYeongdeungpoHall3,
  lotteYeongdeungpoHall4,
  lotteYeongdeungpoHall5,
  lotteYeongdeungpoHall6,
  lotteYeongdeungpoHall7,
  lotteYongsanHall1,
  lotteYongsanHall2,
  lotteYongsanHall3,
  lotteYongsanHall4,
  lotteYongsanHall5,
  lotteYongsanHall6,
  lotteYongsanHall7,
  lotteYongsanHall8,
  lotteWorldTowerHall1,
  lotteWorldTowerHall2,
  lotteWorldTowerHall3,
  lotteWorldTowerHall4,
  lotteWorldTowerHall5,
  lotteWorldTowerHall6,
  lotteWorldTowerHall7,
  lotteWorldTowerHall8,
  lotteWorldTowerHall9,
  lotteWorldTowerHall10,
  lotteWorldTowerHall11,
  lotteWorldTowerHall13,
  lotteWorldTowerHall14,
  lotteWorldTowerHall15,
  lotteWorldTowerHall16,
  lotteWorldTowerHall17,
  lotteWorldTowerHall18,
  lotteWorldTowerHall19,
  lotteWorldTowerHall20,
  lotteWorldTowerHall21,
  lotteEunpyeongHall1,
  lotteEunpyeongHall2,
  lotteEunpyeongHall3,
  lotteEunpyeongHall4,
  lotteEunpyeongHall5,
  lotteEunpyeongHall6,
  lotteEunpyeongHall7,
  lotteEunpyeongHall8,
  lotteJungnangHall1,
  lotteJungnangHall2,
  lotteJungnangHall3,
  lotteJungnangHall4,
  lotteJungnangHall5,
  lotteJungnangHall6,
  lotteJungnangHall7,
  lotteJungnangHall8,
  lotteCheongnyangniHall1,
  lotteCheongnyangniHall2,
  lotteCheongnyangniHall3,
  lotteCheongnyangniHall4,
  lotteCheongnyangniHall5,
  lotteCheongnyangniHall6,
  lotteCheongnyangniHall7,
  lotteCheongnyangniHall8,
  lotteHongikUnivHall3,
  lotteHongikUnivHall4,
  lotteHongikUnivHall5,
  lotteHongikUnivHall6,
  lotteGeomdanAraHall1,
  lotteGeomdanAraHall2,
  lotteGeomdanAraHall3,
  lotteGeomdanAraHall4,
  lotteGeomdanAraHall5,
  lotteGeomdanAraHall6,
  lotteGwanggyoHall1,
  lotteGwanggyoHall2,
  lotteGwanggyoHall3,
  lotteGwanggyoHall4,
  lotteGwanggyoHall5,
  lotteGwanggyoHall6,
  lotteGwangmyeongHall1,
  lotteGwangmyeongHall2,
  lotteGwangmyeongHall3,
  lotteGwangmyeongHall4,
  lotteGwangmyeongHall5,
  lotteGwangmyeongHall6,
  lotteGwangmyeongOutletHall1,
  lotteGwangmyeongOutletHall2,
  lotteGwangmyeongOutletHall3,
  lotteGwangmyeongOutletHall4,
  lotteGwangmyeongOutletHall5,
  lotteGwangmyeongOutletHall6,
  lotteGwangmyeongOutletHall7,
  lotteGuriOutletHall1,
  lotteGuriOutletHall2,
  lotteGuriOutletHall3,
  lotteGuriOutletHall4,
  lotteGuriOutletHall5,
  lotteGuriOutletHall6,
  lotteGuriOutletHall7,
  lotteDongtanHall2,
  lotteDongtanHall3,
  lotteDongtanHall4,
  lotteDongtanHall5,
  lotteDongtanHall6,
  lotteDongtanHall7,
  lotteDongtanCharlotte,
  lotteLaFestaHall1,
  lotteLaFestaHall2,
  lotteLaFestaHall3,
  lotteLaFestaHall4,
  lotteLaFestaHall5,
  lotteLaFestaHall6,
  lotteLaFestaHall7,
  lotteLaFestaHall8,
  lotteByeollaeHall1,
  lotteByeollaeHall2,
  lotteByeollaeHall3,
  lotteByeollaeHall4,
  lotteByeollaeHall5,
  lotteByeongjeomHall1,
  lotteByeongjeomHall2,
  lotteByeongjeomHall3,
  lotteByeongjeomHall4,
  lotteByeongjeomHall5,
  lotteByeongjeomHall6,
  lotteByeongjeomHall7,
  lotteByeongjeomHall8,
  lotteBucheonHall1,
  lotteBucheonHall2,
  lotteBucheonHall3,
  lotteBucheonHall4,
  lotteBucheonHall5,
  lotteBucheonHall6,
  lotteBucheonHall7,
  lotteBucheonHall8,
  lotteBupyeongGalsanHall1,
  lotteBupyeongGalsanHall2,
  lotteBupyeongGalsanHall3,
  lotteBupyeongGalsanHall4,
  lotteBupyeongGalsanHall5,
  lotteBupyeongGalsanHall6,
  lotteBupyeongGalsanHall7,
  lotteBupyeongStationHall1,
  lotteBupyeongStationHall2,
  lotteBupyeongStationHall3,
  lotteBupyeongStationHall4,
  lotteBupyeongStationHall5,
  lotteBupyeongStationHall6,
  lotteBupyeongStationHall7,
  lotteBupyeongStationHall8,
  lotteBupyeongStationHall9,
  lotteBuksuwonHall1,
  lotteBuksuwonHall2,
  lotteBuksuwonHall3,
  lotteBuksuwonHall4,
  lotteBuksuwonHall5,
  lotteSanbonFitinHall1,
  lotteSanbonFitinHall2,
  lotteSanbonFitinHall3,
  lotteSanbonFitinHall4,
  lotteSanbonFitinHall5,
  lotteSanbonFitinHall6,
  lotteSanbonFitinHall7,
  lotteSeosuwonHall1,
  lotteSeosuwonHall2,
  lotteSeosuwonHall3,
  lotteSeosuwonHall4,
  lotteSeosuwonHall5,
  lotteSeosuwonHall6,
  lotteSeongnamJungangHall1,
  lotteSeongnamJungangHall2,
  lotteSeongnamJungangHall3,
  lotteSeongnamJungangHall4,
  lotteSeongnamJungangHall5,
  lotteSeongnamJungangHall6,
  lotteSeongnamJungangHall7,
  lotteSeongnamJungangHall8,
  lotteSeongnamJungangHall9,
  lotteSongtanHall1,
  lotteSongtanHall2,
  lotteSongtanHall3,
  lotteSongtanHall4,
  lotteSongtanHall5,
  lotteSuwonHall1,
  lotteSuwonHall2,
  lotteSuwonHall3,
  lotteSuwonHall4,
  lotteSuwonHall5,
  lotteSuwonHall6,
  lotteSuwonHall7,
  lotteSuwonHall8,
  lotteSujiHall1,
  lotteSujiHall2,
  lotteSujiHall3,
  lotteSujiHall4,
  lotteSujiHall5,
  lotteSujiHall6,
  lotteSujiHall7,
  lotteSujiHall8,
  lotteSihwaHall1,
  lotteSihwaHall2,
  lotteSihwaHall3,
  lotteSihwaHall4,
  lotteSihwaHall5,
  lotteSihwaHall6,
  lotteSihwaHall7,
  lotteSihwaHall8,
  lotteSiheungJanghyeonHall1,
  lotteSiheungJanghyeonHall2,
  lotteSiheungJanghyeonHall3,
  lotteSiheungJanghyeonHall4,
  lotteSiheungJanghyeonHall5,
  lotteAnsanHall2,
  lotteAnsanHall3,
  lotteAnsanHall4,
  lotteAnsanHall5,
  lotteAnsanHall6,
  lotteAnsanHall7,
  lotteAnsanHall8,
  lotteAnsanCharlotte,
  lotteAnsanGojanHall1,
  lotteAnsanGojanHall2,
  lotteAnsanGojanHall3,
  lotteAnsanGojanHall4,
  lotteAnsanGojanHall5,
  lotteAnsanGojanHall6,
  lotteAnsanGojanHall7,
  lotteAnsanJungangHall1,
  lotteAnsanJungangHall2,
  lotteAnsanJungangHall3,
  lotteAnsanJungangHall4,
  lotteAnsanJungangHall5,
  lotteAnsanJungangHall6,
  lotteAnsanJungangHall7,
  lotteAnsanJungangHall8,
  lotteAnsanJungangHall9,
  lotteAnseongHall1,
  lotteAnseongHall2,
  lotteAnyangIlbeongaHall1,
  lotteAnyangIlbeongaHall2,
  lotteAnyangIlbeongaHall3,
  lotteAnyangIlbeongaHall4,
  lotteAnyangIlbeongaHall5,
  lotteAnyangIlbeongaHall6,
  lotteAnyangIlbeongaHall7,
  lotteAnyangIlbeongaHall8,
  lotteYonginGiheungHall1,
  lotteYonginGiheungHall2,
  lotteYonginGiheungHall3,
  lotteYonginGiheungHall4,
  lotteYonginGiheungHall5,
  lotteYonginGiheungHall6,
  lotteYonginGiheungHall7,
  lotteYonginYeokbukHall1,
  lotteYonginYeokbukHall2,
  lotteYonginYeokbukHall3,
  lotteYonginYeokbukHall4,
  lotteYonginYeokbukHall5,
  lotteYonginYeokbukHall6,
  lotteYonginYeokbukHall7,
  lotteWiryeHall1,
  lotteWiryeHall2,
  lotteWiryeHall3,
  lotteWiryeHall4,
  lotteWiryeHall5,
  lotteWiryeHall6,
  lotteWiryeHall7,
  lotteUijeongbuMinrakHall1,
  lotteUijeongbuMinrakHall2,
  lotteUijeongbuMinrakHall3,
  lotteUijeongbuMinrakHall4,
  lotteUijeongbuMinrakHall5,
  lotteUijeongbuMinrakHall6,
  lotteUijeongbuMinrakHall7,
  lotteIncheonAsiadHall1,
  lotteIncheonAsiadHall2,
  lotteIncheonAsiadHall3,
  lotteIncheonAsiadHall4,
  lotteIncheonAsiadHall5,
  lotteIncheonAsiadHall6,
  lotteIncheonTerminalHall1,
  lotteIncheonTerminalHall2,
  lotteIncheonTerminalHall3,
  lotteIncheonTerminalHall4,
  lotteJinjeopHall1,
  lotteJinjeopHall2,
  lotteJinjeopHall3,
  lottePajuOutletHall1,
  lottePajuOutletHall2,
  lottePajuOutletHall3,
  lottePajuOutletHall4,
  lottePajuOutletHall5,
  lottePajuOutletHall6,
  lottePajuOutletHall7,
  lottePajuYadangHall1,
  lottePajuYadangHall2,
  lottePajuYadangHall3,
  lottePajuYadangHall4,
  lottePajuYadangHall5,
  lottePajuUnjeongHall1,
  lottePajuUnjeongHall2,
  lottePajuUnjeongHall3,
  lottePajuUnjeongHall4,
  lottePajuUnjeongHall5,
  lottePajuUnjeongHall6,
  lottePajuUnjeongHall7,
  lottePangyoHall1,
  lottePangyoHall2,
  lottePangyoHall3,
  lottePangyoHall4,
  lottePangyoHall5,
  lottePangyoHall6,
  lottePangyoHall7,
  lottePyeongchonHall1,
  lottePyeongchonHall2,
  lottePyeongchonHall3,
  lottePyeongchonHall4,
  lottePyeongchonHall5,
  lottePyeongchonHall6,
  lottePyeongchonHall7,
  lottePyeongchonCharlotte,
  lotteHanamMisaHall1,
  lotteHanamMisaHall2,
  lotteHanamMisaHall3,
  lotteHanamMisaHall4,
  lotteHanamMisaHall5,
  lotteHanamMisaHall6,
  lotteHanamMisaHall7,
  lotteHanamMisaHall8,
  lotteHyangnamHall1,
  lotteHyangnamHall2,
  lotteHyangnamHall3,
  lotteHyangnamHall4,
  lotteHyangnamHall5,
  lotteDangjinHall1,
  lotteDangjinHall2,
  lotteDangjinHall3,
  lotteDangjinHall4,
  lotteDangjinHall5,
  lotteDangjinHall6,
  lotteDangjinHall7,
  lotteDaejeonHall1,
  lotteDaejeonHall2,
  lotteDaejeonHall3,
  lotteDaejeonHall4,
  lotteDaejeonHall5,
  lotteDaejeonHall6,
  lotteDaejeonHall7,
  lotteDaejeonHall8,
  lotteDaejeonGwanjeoHall1,
  lotteDaejeonGwanjeoHall2,
  lotteDaejeonGwanjeoHall3,
  lotteDaejeonGwanjeoHall4,
  lotteDaejeonGwanjeoHall5,
  lotteDaejeonGwanjeoHall6,
  lotteDaejeonGwanjeoHall7,
  lotteDaejeonCentralHall1,
  lotteDaejeonCentralHall2,
  lotteDaejeonCentralHall3,
  lotteDaejeonCentralHall4,
  lotteDaejeonCentralHall5,
  lotteDaejeonCentralHall6,
  lotteDaejeonCentralHall7,
  lotteSeosanHall1,
  lotteSeosanHall2,
  lotteSeosanHall3,
  lotteSeosanHall4,
  lotteSeosanHall5,
  lotteSeosanHall6,
  lotteSeosanHall7,
  lotteSeocheongjuHall1,
  lotteSeocheongjuHall2,
  lotteSeocheongjuHall3,
  lotteSeocheongjuHall4,
  lotteSeocheongjuHall5,
  lotteSeocheongjuHall6,
  lotteAsanTerminalHall1,
  lotteAsanTerminalHall2,
  lotteAsanTerminalHall3,
  lotteAsanTerminalHall4,
  lotteAsanTerminalHall5,
  lotteAsanTerminalHall6,
  lotteOsongHall1,
  lotteOsongHall2,
  lotteOsongHall3,
  lotteOsongHall4,
  lotteOsongHall5,
  lotteOsongHall6,
  lotteCheonanBuldangHall1,
  lotteCheonanBuldangHall2,
  lotteCheonanBuldangHall3,
  lotteCheonanBuldangHall4,
  lotteCheonanBuldangHall5,
  lotteCheonanBuldangHall6,
  lotteCheonanCheongdangHall1,
  lotteCheonanCheongdangHall2,
  lotteCheonanCheongdangHall3,
  lotteCheonanCheongdangHall4,
  lotteCheonanCheongdangHall5,
  lotteCheonanCheongdangHall6,
  lotteCheongjuYongamHall1,
  lotteCheongjuYongamHall2,
  lotteCheongjuYongamHall3,
  lotteCheongjuYongamHall4,
  lotteCheongjuYongamHall5,
  lotteCheongjuYongamHall6,
  lotteCheongjuYongamHall7,
  lotteCheongjuYongamHall8,
  lotteChungjuHall1,
  lotteChungjuHall2,
  lotteChungjuHall3,
  lotteChungjuHall4,
  lotteChungjuHall5,
  lotteGwangjuHall2,
  lotteGwangjuHall3,
  lotteGwangjuHall4,
  lotteGwangjuHall5,
  lotteGwangjuHall6,
  lotteGwangjuCharlotte,
  lotteGwangjuGwangsanHall1,
  lotteGwangjuGwangsanHall2,
  lotteGwangjuGwangsanHall4,
  lotteGwangjuGwangsanHall5,
  lotteGwangjuGwangsanHall6,
  lotteGwangjuGwangsanHall7,
  lotteGwangjuGwangsanHall8,
  lotteGwangjuCheomdanHall1,
  lotteGwangjuCheomdanHall2,
  lotteGwangjuCheomdanHall3,
  lotteGwangjuCheomdanHall4,
  lotteGwangjuCheomdanHall5,
  lotteGunsanNaunHall1,
  lotteGunsanNaunHall2,
  lotteGunsanNaunHall3,
  lotteGunsanNaunHall4,
  lotteGunsanNaunHall5,
  lotteGunsanNaunHall6,
  lotteGunsanNaunHall7,
  lotteGunsanMallHall1,
  lotteGunsanMallHall2,
  lotteGunsanMallHall3,
  lotteGunsanMallHall4,
  lotteGunsanMallHall5,
  lotteGunsanMallHall6,
  lotteGunsanMallHall7,
  lotteSuwanHall1,
  lotteSuwanHall2,
  lotteSuwanHall3,
  lotteSuwanHall4,
  lotteSuwanHall5,
  lotteSuwanHall6,
  lotteSuwanHall7,
  lotteIksanMohyeonHall1,
  lotteIksanMohyeonHall2,
  lotteIksanMohyeonHall3,
  lotteIksanMohyeonHall4,
  lotteIksanMohyeonHall5,
  lotteIksanMohyeonHall6,
  lotteIksanMohyeonHall7,
  lotteJeonjuHall1,
  lotteJeonjuHall2,
  lotteJeonjuHall3,
  lotteJeonjuHall4,
  lotteJeonjuHall5,
  lotteJeonjuHall6,
  lotteJeonjuHall7,
  lotteJeonjuHall8,
  lotteJeonjuSongcheonHall1,
  lotteJeonjuSongcheonHall3,
  lotteJeonjuSongcheonHall4,
  lotteJeonjuSongcheonHall5,
  lotteJeonjuSongcheonHall6,
  lotteJeonjuSongcheonHall7,
  lotteJeonjuPyeonghwaHall1,
  lotteJeonjuPyeonghwaHall2,
  lotteJeonjuPyeonghwaHall3,
  lotteJeonjuPyeonghwaHall4,
  lotteJeonjuPyeonghwaHall6,
  lotteChungjangnoHall1,
  lotteChungjangnoHall2,
  lotteChungjangnoHall3,
  lotteChungjangnoHall4,
  lotteChungjangnoHall5,
  lotteChungjangnoHall6,
  lotteChungjangnoHall7,
  lotteChungjangnoHall8,
  lotteChungjangnoHall9,
  lotteGyeongjuHwangseongHall1,
  lotteGyeongjuHwangseongHall2,
  lotteGyeongjuHwangseongHall3,
  lotteGyeongjuHwangseongHall4,
  lotteGyeongjuHwangseongHall5,
  lotteGyeongjuHwangseongHall6,
  lotteGumiGongdanHall1,
  lotteGumiGongdanHall2,
  lotteGumiGongdanHall3,
  lotteGumiGongdanHall4,
  lotteGumiGongdanHall5,
  lotteGumiGongdanHall6,
  lotteGumiGongdanHall7,
  lotteGumiGongdanHall8,
  lotteDaeguGwangjangHall1,
  lotteDaeguGwangjangHall2,
  lotteDaeguGwangjangHall3,
  lotteDaeguGwangjangHall4,
  lotteDaeguGwangjangHall5,
  lotteDaeguGwangjangHall6,
  lotteDaeguGwangjangHall7,
  lotteDaeguYulhaHall1,
  lotteDaeguYulhaHall2,
  lotteDaeguYulhaHall3,
  lotteDaeguYulhaHall4,
  lotteDaeguYulhaHall5,
  lotteDaeguYulhaHall6,
  lotteDaeguHyeonpungHall1,
  lotteDaeguHyeonpungHall2,
  lotteDaeguHyeonpungHall3,
  lotteDaeguHyeonpungHall4,
  lotteDaeguHyeonpungHall5,
  lotteDaeguHyeonpungHall6,
  lotteDongseongnoHall1,
  lotteDongseongnoHall2,
  lotteDongseongnoHall3,
  lotteDongseongnoHall4,
  lotteDongseongnoHall5,
  lotteDongseongnoHall6,
  lotteDongseongnoHall7,
  lotteDongseongnoHall8,
  lotteDongseongnoHall9,
  lotteSanginHall1,
  lotteSanginHall2,
  lotteSanginHall3,
  lotteSanginHall4,
  lotteSanginHall5,
  lotteSanginHall6,
  lotteSanginHall7,
  lotteSangjuHall2,
  lotteSangjuHall3,
  lotteSangjuHall4,
  lotteSeongseoHall1,
  lotteSeongseoHall2,
  lotteSeongseoHall3,
  lotteSeongseoHall4,
  lotteSeongseoHall5,
  lotteSeongseoHall6,
  lotteSeongseoHall7,
  lotteSeongseoHall8,
  lotteSeongseoHall9,
  lotteYeongjuHall1,
  lotteYeongjuHall2,
  lotteYeongjuHall3,
  lotteYeongjuHall4,
  lotteYeongjuHall5,
  lotteYeongjuHall6,
  lotteYeongcheonHall1,
  lotteYeongcheonHall2,
  lotteYeongcheonHall3,
  lotteYeongcheonHall4,
  lotteYeongcheonHall5,
  lotteYeongcheonHall6,
  lottePohangHall1,
  lottePohangHall2,
  lottePohangHall3,
  lottePohangHall4,
  lottePohangHall5,
  lottePohangHall6,
  lottePohangHall7,
  lottePohangHall8,
  lotteGumiCentralHall1,
  lotteGumiCentralHall2,
  lotteGumiCentralHall3,
  lotteGumiCentralHall4,
  lotteGumiCentralHall5,
  lotteGumiCentralHall6,
  lotteGumiCentralHall7,
  lotteAndongHall1,
  lotteAndongHall2,
  lotteAndongHall3,
  lotteAndongHall4,
  lotteAndongHall5,
  lotteChilgokHall1,
  lotteChilgokHall2,
  lotteChilgokHall3,
  lotteChilgokHall4,
  lotteChilgokHall5,
  lotteChilgokHall6,
  lotteGeochangHall1,
  lotteGeochangHall2,
  lotteGwangbokHall1,
  lotteGwangbokHall2,
  lotteGwangbokHall3,
  lotteGwangbokHall4,
  lotteGwangbokHall5,
  lotteGwangbokHall6,
  lotteGwangbokHall7,
  lotteGwangbokHall8,
  lotteGwangbokHall9,
  lotteGwangbokHall10,
  lotteGwangbokCharlotte,
  lotteGimhaeBuwonHall1,
  lotteGimhaeBuwonHall2,
  lotteGimhaeBuwonHall3,
  lotteGimhaeBuwonHall4,
  lotteGimhaeBuwonHall5,
  lotteGimhaeBuwonHall6,
  lotteGimhaeBuwonHall7,
  lotteGimhaeOutletHall1,
  lotteGimhaeOutletHall2,
  lotteGimhaeOutletHall3,
  lotteGimhaeOutletHall4,
  lotteGimhaeOutletHall5,
  lotteGimhaeOutletHall6,
  lotteDongnaeHall1,
  lotteDongnaeHall2,
  lotteDongnaeHall3,
  lotteDongnaeHall4,
  lotteDongnaeHall5,
  lotteDongnaeHall6,
  lotteDongnaeHall7,
  lotteDongnaeHall8,
  lotteDongnaeHall9,
  lotteDongbusanOutletHall1,
  lotteDongbusanOutletHall2,
  lotteDongbusanOutletHall3,
  lotteDongbusanOutletHall4,
  lotteDongbusanOutletHall5,
  lotteDongbusanOutletHall6,
  lotteMasanHall1,
  lotteMasanHall2,
  lotteMasanHall3,
  lotteMasanHall4,
  lotteMasanHall5,
  lotteMasanHall6,
  lotteMasanHall7,
  lotteBusanMyeongjiHall1,
  lotteBusanMyeongjiHall2,
  lotteBusanMyeongjiHall3,
  lotteBusanMyeongjiHall4,
  lotteBusanMyeongjiHall5,
  lotteBusanMyeongjiHall6,
  lotteBusanMyeongjiHall7,
  lotteBusanHall1,
  lotteBusanHall2,
  lotteBusanHall3,
  lotteBusanHall4,
  lotteBusanHall5,
  lotteBusanHall6,
  lotteBusanHall7,
  lotteBusanHall8,
  lotteBusanHall9,
  lotteBusanHall10,
  lotteBusanHall11,
  lotteBusanJangnimHall1,
  lotteBusanJangnimHall2,
  lotteBusanJangnimHall3,
  lotteBusanJangnimHall4,
  lotteBusanJangnimHall5,
  lotteBusanJangnimHall6,
  lotteSacheonHall1,
  lotteSacheonHall2,
  lotteSacheonHall3,
  lotteSacheonHall5,
  lotteSacheonHall6,
  lotteSacheonHall7,
  lotteCentumCityHall2,
  lotteCentumCityHall3,
  lotteCentumCityHall4,
  lotteCentumCityHall5,
  lotteCentumCityHall6,
  lotteCentumCityHall7,
  lotteCentumCityHall8,
  lotteCentumCityHall9,
  lotteCentumCityHall10,
  lotteCentumCityCharlotte,
  lotteJinjuMbcineHall1,
  lotteJinjuMbcineHall2,
  lotteJinjuMbcineHall3,
  lotteJinjuMbcineHall4,
  lotteJinjuMbcineHall5,
  lotteJinjuMbcineHall6,
  lotteJinjuMbcineHall7,
  lotteJinjuMbcineHall8,
  lotteJinjuMbcineHall9,
  lotteO2BusanUnivHall1,
  lotteO2BusanUnivHall2,
  lotteO2BusanUnivHall3,
  lotteO2BusanUnivHall4,
  lotteO2BusanUnivHall5,
  lotteO2BusanUnivHall6,
  lotteO2BusanUnivHall7,
  lotteUlsanHall1,
  lotteUlsanHall2,
  lotteUlsanHall3,
  lotteUlsanHall4,
  lotteUlsanHall5,
  lotteUlsanHall6,
  lotteUlsanHall7,
  lotteUlsanHall8,
  lotteUlsanHall9,
  lotteUlsanSeongnamHall1,
  lotteUlsanSeongnamHall2,
  lotteUlsanSeongnamHall3,
  lotteUlsanSeongnamHall4,
  lotteUlsanSeongnamHall5,
  lotteUlsanSeongnamHall6,
  lotteUlsanSeongnamHall7,
  lotteJinjuHyeoksinHall1,
  lotteJinjuHyeoksinHall2,
  lotteJinjuHyeoksinHall3,
  lotteJinjuHyeoksinHall4,
  lotteJinjuHyeoksinHall5,
  lotteJinjuHyeoksinHall6,
  lotteJinjuHyeoksinHall7,
  lotteJinhaeHall1,
  lotteJinhaeHall2,
  lotteJinhaeHall3,
  lotteJinhaeHall4,
  lotteJinhaeHall5,
  lotteJinhaeHall6,
  lotteChangwonHall1,
  lotteChangwonHall2,
  lotteChangwonHall3,
  lotteChangwonHall4,
  lotteChangwonHall5,
  lotteChangwonHall6,
  lotteChangwonHall7,
  lotteTongyeongHall1,
  lotteTongyeongHall2,
  lotteTongyeongHall3,
  lotteTongyeongHall4,
  lotteTongyeongHall5,
  lotteTongyeongHall6,
  lotteTongyeongHall7,
  lotteKyungnamUnivHall1,
  lotteKyungnamUnivHall2,
  lotteKyungnamUnivHall3,
  lotteKyungnamUnivHall4,
  lotteKyungnamUnivHall5,
  lotteKyungnamUnivHall6,
  lotteGangneungHall1,
  lotteGangneungHall2,
  lotteGangneungHall3,
  lotteGangneungHall4,
  lotteNamWonjuHall1,
  lotteNamWonjuHall2,
  lotteNamWonjuHall3,
  lotteNamWonjuHall4,
  lotteNamWonjuHall5,
  lotteNamWonjuHall6,
  lotteNamWonjuHall7,
  lotteDonghaeHall1,
  lotteDonghaeHall2,
  lotteDonghaeHall3,
  lotteDonghaeHall4,
  lotteDonghaeHall5,
  lotteSokchoHall1,
  lotteSokchoHall2,
  lotteSokchoHall3,
  lotteSokchoHall4,
  lotteSokchoHall5,
  lotteWonjuMusilHall1,
  lotteWonjuMusilHall2,
  lotteWonjuMusilHall3,
  lotteWonjuMusilHall4,
  lotteWonjuMusilHall5,
  lotteWonjuMusilHall6,
  lotteWonjuMusilHall7,
  lotteWonjuMusilHall8,
  lotteChuncheonHall1,
  lotteChuncheonHall2,
  lotteChuncheonHall3,
  lotteChuncheonHall4,
  lotteChuncheonHall5,
  lotteChuncheonHall6,
  lotteSeogwipoHall1,
  lotteSeogwipoHall2,
  lotteSeogwipoHall3,
  lotteSeogwipoHall5,
  lotteSeogwipoHall6,
  lotteSeogwipoHall7,
  lotteJejuYeondongHall1,
  lotteJejuYeondongHall2,
  lotteJejuYeondongHall3,
  lotteJejuYeondongHall4,
  lotteJejuYeondongHall5,
  lotteJejuYeondongHall6,
];

export const LOTTE_SCHEDULE_FILES: unknown[] = [
  lotteGasanDigitalSchedule,
  lotteGayangSchedule,
  lotteGangdongSchedule,
  lotteKonkukUnivSchedule,
  lotteGimpoAirportSchedule,
  lotteNowonSchedule,
  lotteDogokSchedule,
  lotteDoksanSchedule,
  lotteSeoulNatlUnivSchedule,
  lotteSuyuSchedule,
  lotteSindaebangSchedule,
  lotteSindorimSchedule,
  lotteSillimSchedule,
  lotteAvenuelSchedule,
  lotteYeongdeungpoSchedule,
  lotteYongsanSchedule,
  lotteWorldTowerSchedule,
  lotteEunpyeongSchedule,
  lotteJungnangSchedule,
  lotteCheongnyangniSchedule,
  lotteHongikUnivSchedule,
  lotteGeomdanAraSchedule,
  lotteGwanggyoSchedule,
  lotteGwangmyeongSchedule,
  lotteGwangmyeongOutletSchedule,
  lotteGuriOutletSchedule,
  lotteDongtanSchedule,
  lotteLaFestaSchedule,
  lotteByeollaeSchedule,
  lotteByeongjeomSchedule,
  lotteBucheonSchedule,
  lotteBupyeongGalsanSchedule,
  lotteBupyeongStationSchedule,
  lotteBuksuwonSchedule,
  lotteSanbonFitinSchedule,
  lotteSeosuwonSchedule,
  lotteSeongnamJungangSchedule,
  lotteSongtanSchedule,
  lotteSuwonSchedule,
  lotteSujiSchedule,
  lotteSihwaSchedule,
  lotteSiheungJanghyeonSchedule,
  lotteAnsanSchedule,
  lotteAnsanGojanSchedule,
  lotteAnsanJungangSchedule,
  lotteAnseongSchedule,
  lotteAnyangIlbeongaSchedule,
  lotteYonginGiheungSchedule,
  lotteYonginYeokbukSchedule,
  lotteWiryeSchedule,
  lotteUijeongbuMinrakSchedule,
  lotteIncheonAsiadSchedule,
  lotteIncheonTerminalSchedule,
  lotteJinjeopSchedule,
  lottePajuOutletSchedule,
  lottePajuYadangSchedule,
  lottePajuUnjeongSchedule,
  lottePangyoSchedule,
  lottePyeongchonSchedule,
  lotteHanamMisaSchedule,
  lotteHyangnamSchedule,
  lotteDangjinSchedule,
  lotteDaejeonSchedule,
  lotteDaejeonGwanjeoSchedule,
  lotteDaejeonCentralSchedule,
  lotteSeosanSchedule,
  lotteSeocheongjuSchedule,
  lotteAsanTerminalSchedule,
  lotteOsongSchedule,
  lotteCheonanBuldangSchedule,
  lotteCheonanCheongdangSchedule,
  lotteCheongjuYongamSchedule,
  lotteChungjuSchedule,
  lotteGwangjuSchedule,
  lotteGwangjuGwangsanSchedule,
  lotteGwangjuCheomdanSchedule,
  lotteGunsanNaunSchedule,
  lotteGunsanMallSchedule,
  lotteSuwanSchedule,
  lotteIksanMohyeonSchedule,
  lotteJeonjuSchedule,
  lotteJeonjuSongcheonSchedule,
  lotteJeonjuPyeonghwaSchedule,
  lotteChungjangnoSchedule,
  lotteGyeongjuHwangseongSchedule,
  lotteGumiGongdanSchedule,
  lotteDaeguGwangjangSchedule,
  lotteDaeguYulhaSchedule,
  lotteDaeguHyeonpungSchedule,
  lotteDongseongnoSchedule,
  lotteSanginSchedule,
  lotteSangjuSchedule,
  lotteSeongseoSchedule,
  lotteYeongjuSchedule,
  lotteYeongcheonSchedule,
  lottePohangSchedule,
  lotteGumiCentralSchedule,
  lotteAndongSchedule,
  lotteChilgokSchedule,
  lotteGeochangSchedule,
  lotteGwangbokSchedule,
  lotteGimhaeBuwonSchedule,
  lotteGimhaeOutletSchedule,
  lotteDongnaeSchedule,
  lotteDongbusanOutletSchedule,
  lotteMasanSchedule,
  lotteBusanMyeongjiSchedule,
  lotteBusanSchedule,
  lotteBusanJangnimSchedule,
  lotteSacheonSchedule,
  lotteCentumCitySchedule,
  lotteJinjuMbcineSchedule,
  lotteO2BusanUnivSchedule,
  lotteUlsanSchedule,
  lotteUlsanSeongnamSchedule,
  lotteJinjuHyeoksinSchedule,
  lotteJinhaeSchedule,
  lotteChangwonSchedule,
  lotteTongyeongSchedule,
  lotteKyungnamUnivSchedule,
  lotteGangneungSchedule,
  lotteNamWonjuSchedule,
  lotteDonghaeSchedule,
  lotteSokchoSchedule,
  lotteWonjuMusilSchedule,
  lotteChuncheonSchedule,
  lotteSeogwipoSchedule,
  lotteJejuYeondongSchedule,
];

/** 지점마다 예매 좌석 데이터의 좌석 수 합. 좌석표를 상영관으로 바꾸며 좌석이 빠지거나 늘지 않았는지 테스트가 확인한다. */
export const LOTTE_SEAT_TOTALS: Record<string, number> = {
  "lotte-gasan-digital": 1054,
  "lotte-gayang": 444,
  "lotte-gangdong": 1186,
  "lotte-konkuk-univ": 1813,
  "lotte-gimpo-airport": 2127,
  "lotte-nowon": 934,
  "lotte-dogok": 847,
  "lotte-doksan": 1606,
  "lotte-seoul-natl-univ": 687,
  "lotte-suyu": 852,
  "lotte-sindaebang": 533,
  "lotte-sindorim": 560,
  "lotte-sillim": 841,
  "lotte-avenuel": 710,
  "lotte-yeongdeungpo": 1328,
  "lotte-yongsan": 889,
  "lotte-world-tower": 4180,
  "lotte-eunpyeong": 1336,
  "lotte-jungnang": 973,
  "lotte-cheongnyangni": 1733,
  "lotte-hongik-univ": 730,
  "lotte-geomdan-ara": 448,
  "lotte-gwanggyo": 889,
  "lotte-gwangmyeong": 1026,
  "lotte-gwangmyeong-outlet": 1216,
  "lotte-guri-outlet": 1115,
  "lotte-dongtan": 1157,
  "lotte-la-festa": 745,
  "lotte-byeollae": 775,
  "lotte-byeongjeom": 1098,
  "lotte-bucheon": 1297,
  "lotte-bupyeong-galsan": 1034,
  "lotte-bupyeong-station": 1279,
  "lotte-buksuwon": 640,
  "lotte-sanbon-fitin": 980,
  "lotte-seosuwon": 791,
  "lotte-seongnam-jungang": 1234,
  "lotte-songtan": 932,
  "lotte-suwon": 1046,
  "lotte-suji": 1331,
  "lotte-sihwa": 524,
  "lotte-siheung-janghyeon": 652,
  "lotte-ansan": 1607,
  "lotte-ansan-gojan": 1788,
  "lotte-ansan-jungang": 1157,
  "lotte-anseong": 164,
  "lotte-anyang-ilbeonga": 858,
  "lotte-yongin-giheung": 1091,
  "lotte-yongin-yeokbuk": 1002,
  "lotte-wirye": 1002,
  "lotte-uijeongbu-minrak": 902,
  "lotte-incheon-asiad": 1155,
  "lotte-incheon-terminal": 538,
  "lotte-jinjeop": 328,
  "lotte-paju-outlet": 924,
  "lotte-paju-yadang": 453,
  "lotte-paju-unjeong": 1238,
  "lotte-pangyo": 1087,
  "lotte-pyeongchon": 898,
  "lotte-hanam-misa": 890,
  "lotte-hyangnam": 680,
  "lotte-dangjin": 704,
  "lotte-daejeon": 1144,
  "lotte-daejeon-gwanjeo": 1067,
  "lotte-daejeon-central": 859,
  "lotte-seosan": 945,
  "lotte-seocheongju": 1286,
  "lotte-asan-terminal": 414,
  "lotte-osong": 512,
  "lotte-cheonan-buldang": 658,
  "lotte-cheonan-cheongdang": 549,
  "lotte-cheongju-yongam": 1282,
  "lotte-chungju": 746,
  "lotte-gwangju": 1024,
  "lotte-gwangju-gwangsan": 639,
  "lotte-gwangju-cheomdan": 472,
  "lotte-gunsan-naun": 1085,
  "lotte-gunsan-mall": 1014,
  "lotte-suwan": 1397,
  "lotte-iksan-mohyeon": 1243,
  "lotte-jeonju": 1632,
  "lotte-jeonju-songcheon": 586,
  "lotte-jeonju-pyeonghwa": 884,
  "lotte-chungjangno": 693,
  "lotte-gyeongju-hwangseong": 848,
  "lotte-gumi-gongdan": 1204,
  "lotte-daegu-gwangjang": 1300,
  "lotte-daegu-yulha": 1394,
  "lotte-daegu-hyeonpung": 734,
  "lotte-dongseongno": 703,
  "lotte-sangin": 1280,
  "lotte-sangju": 326,
  "lotte-seongseo": 1644,
  "lotte-yeongju": 909,
  "lotte-yeongcheon": 612,
  "lotte-pohang": 712,
  "lotte-gumi-central": 513,
  "lotte-andong": 343,
  "lotte-chilgok": 474,
  "lotte-geochang": 410,
  "lotte-gwangbok": 2361,
  "lotte-gimhae-buwon": 1121,
  "lotte-gimhae-outlet": 1023,
  "lotte-dongnae": 1581,
  "lotte-dongbusan-outlet": 1014,
  "lotte-masan": 602,
  "lotte-busan-myeongji": 810,
  "lotte-busan": 1001,
  "lotte-busan-jangnim": 676,
  "lotte-sacheon": 353,
  "lotte-centum-city": 1718,
  "lotte-jinju-mbcine": 943,
  "lotte-o2-busan-univ": 1049,
  "lotte-ulsan": 630,
  "lotte-ulsan-seongnam": 478,
  "lotte-jinju-hyeoksin": 1268,
  "lotte-jinhae": 952,
  "lotte-changwon": 1319,
  "lotte-tongyeong": 858,
  "lotte-kyungnam-univ": 348,
  "lotte-gangneung": 296,
  "lotte-nam-wonju": 687,
  "lotte-donghae": 719,
  "lotte-sokcho": 516,
  "lotte-wonju-musil": 1079,
  "lotte-chuncheon": 448,
  "lotte-seogwipo": 486,
  "lotte-jeju-yeondong": 755,
};

/** 지점마다 롯데시네마 예매 API의 극장 키("1|지역|극장")와 상영관 번호(ScreenID) → 상영관 id. 실제 시간표·좌석을 받을 때 쓴다. */
export const LOTTE_LIVE: Record<string, { cinema: string; screens: Record<string, string> }> = {
  "lotte-gasan-digital": { cinema: "1|0001|1013", screens: { "101301": "hall-1", "101302": "hall-2", "101303": "hall-3", "101304": "hall-4", "101305": "hall-5", "101306": "hall-6" } },
  "lotte-gayang": { cinema: "1|0001|9094", screens: { "909401": "hall-1", "909402": "hall-2", "909403": "hall-3", "909404": "hall-4", "909405": "hall-5", "909406": "hall-6" } },
  "lotte-gangdong": { cinema: "1|0001|9010", screens: { "901001": "hall-1", "901002": "hall-2", "901003": "hall-3", "901004": "hall-4", "901005": "hall-5", "901006": "hall-6", "901010": "hall-10" } },
  "lotte-konkuk-univ": { cinema: "1|0001|1004", screens: { "100401": "hall-1", "100402": "hall-2", "100403": "hall-3", "100404": "hall-4", "100405": "hall-5", "100406": "hall-6", "100407": "hall-7", "100408": "hall-8", "100409": "hall-9", "100410": "hall-10", "301": "charlotte" } },
  "lotte-gimpo-airport": { cinema: "1|0001|1009", screens: { "100902": "hall-2", "100903": "hall-3", "100904": "hall-4", "100905": "hall-5", "100906": "hall-6", "100907": "hall-7", "100908": "hall-8", "100909": "hall-9", "100910": "hall-10", "701": "charlotte" } },
  "lotte-nowon": { cinema: "1|0001|1003", screens: { "100301": "hall-1", "100302": "hall-2", "100303": "hall-3", "100304": "hall-4", "100305": "hall-5", "100306": "hall-6", "100307": "hall-7", "100308": "hall-8", "100309": "hall-9", "100310": "hall-10" } },
  "lotte-dogok": { cinema: "1|0001|1023", screens: { "102301": "hall-1", "102302": "hall-2", "102303": "hall-3", "102304": "hall-4", "102305": "hall-5", "102306": "hall-6", "102307": "hall-7" } },
  "lotte-doksan": { cinema: "1|0001|1017", screens: { "101701": "hall-1", "101702": "hall-2", "101703": "hall-3", "101704": "hall-4", "101705": "hall-5", "101706": "hall-6", "101707": "hall-7", "101708": "hall-8" } },
  "lotte-seoul-natl-univ": { cinema: "1|0001|1012", screens: { "101201": "hall-1", "101202": "hall-2", "101203": "hall-3", "101204": "hall-4", "101205": "hall-5" } },
  "lotte-suyu": { cinema: "1|0001|9104", screens: { "910401": "hall-1", "910402": "hall-2", "910403": "hall-3", "910404": "hall-4", "910405": "hall-5", "910406": "hall-6" } },
  "lotte-sindaebang": { cinema: "1|0001|1024", screens: { "102401": "hall-1", "102402": "hall-2", "102403": "hall-3", "102404": "hall-4", "102405": "hall-5", "102406": "hall-6" } },
  "lotte-sindorim": { cinema: "1|0001|1015", screens: { "101501": "hall-1", "101502": "hall-2", "101503": "hall-3", "101504": "hall-4", "101505": "hall-5" } },
  "lotte-sillim": { cinema: "1|0001|1007", screens: { "100701": "hall-1", "100702": "hall-2", "100703": "hall-3", "100704": "hall-4", "100705": "hall-5", "100706": "hall-6", "100707": "hall-7", "100708": "hall-8" } },
  "lotte-avenuel": { cinema: "1|0001|1001", screens: { "100101": "hall-1", "100102": "hall-2", "100103": "hall-3", "100105": "hall-5", "101": "charlotte" } },
  "lotte-yeongdeungpo": { cinema: "1|0001|1002", screens: { "100201": "hall-1", "100202": "hall-2", "100203": "hall-3", "100204": "hall-4", "100205": "hall-5", "100206": "hall-6", "100207": "hall-7" } },
  "lotte-yongsan": { cinema: "1|0001|1014", screens: { "101401": "hall-1", "101402": "hall-2", "101403": "hall-3", "101404": "hall-4", "101405": "hall-5", "101406": "hall-6", "101407": "hall-7", "101408": "hall-8" } },
  "lotte-world-tower": { cinema: "1|0001|1016", screens: { "1201": "hall-1", "1202": "hall-2", "101603": "hall-3", "101604": "hall-4", "101605": "hall-5", "101606": "hall-6", "101607": "hall-7", "101608": "hall-8", "101609": "hall-9", "101610": "hall-10", "1211": "hall-11", "101613": "hall-13", "101614": "hall-14", "101615": "hall-15", "101616": "hall-16", "101617": "hall-17", "101618": "hall-18", "101619": "hall-19", "101620": "hall-20", "101621": "hall-21" } },
  "lotte-eunpyeong": { cinema: "1|0001|1021", screens: { "102101": "hall-1", "102102": "hall-2", "102103": "hall-3", "102104": "hall-4", "102105": "hall-5", "102106": "hall-6", "102107": "hall-7", "102108": "hall-8" } },
  "lotte-jungnang": { cinema: "1|0001|9083", screens: { "908301": "hall-1", "908302": "hall-2", "908303": "hall-3", "908304": "hall-4", "908305": "hall-5", "908306": "hall-6", "908307": "hall-7", "908308": "hall-8" } },
  "lotte-cheongnyangni": { cinema: "1|0001|1008", screens: { "100801": "hall-1", "100802": "hall-2", "100803": "hall-3", "100804": "hall-4", "100805": "hall-5", "100806": "hall-6", "100807": "hall-7", "100808": "hall-8" } },
  "lotte-hongik-univ": { cinema: "1|0001|1005", screens: { "100503": "hall-3", "100504": "hall-4", "100505": "hall-5", "100506": "hall-6" } },
  "lotte-geomdan-ara": { cinema: "1|0002|3051", screens: { "305101": "hall-1", "305102": "hall-2", "305103": "hall-3", "305104": "hall-4", "305105": "hall-5", "305106": "hall-6" } },
  "lotte-gwanggyo": { cinema: "1|0002|3030", screens: { "303001": "hall-1", "303002": "hall-2", "303003": "hall-3", "303004": "hall-4", "303005": "hall-5", "303006": "hall-6" } },
  "lotte-gwangmyeong": { cinema: "1|0002|9132", screens: { "913201": "hall-1", "913202": "hall-2", "913203": "hall-3", "913204": "hall-4", "913205": "hall-5", "913206": "hall-6" } },
  "lotte-gwangmyeong-outlet": { cinema: "1|0002|3025", screens: { "302501": "hall-1", "302502": "hall-2", "302503": "hall-3", "302504": "hall-4", "302505": "hall-5", "302506": "hall-6", "302507": "hall-7" } },
  "lotte-guri-outlet": { cinema: "1|0002|3026", screens: { "302601": "hall-1", "302602": "hall-2", "302603": "hall-3", "302604": "hall-4", "302605": "hall-5", "302606": "hall-6", "302607": "hall-7" } },
  "lotte-dongtan": { cinema: "1|0002|3048", screens: { "304802": "hall-2", "304803": "hall-3", "304804": "hall-4", "304805": "hall-5", "304806": "hall-6", "304807": "hall-7", "304801": "charlotte" } },
  "lotte-la-festa": { cinema: "1|0002|9095", screens: { "909501": "hall-1", "909502": "hall-2", "909503": "hall-3", "909504": "hall-4", "909505": "hall-5", "909506": "hall-6", "909507": "hall-7", "909508": "hall-8" } },
  "lotte-byeollae": { cinema: "1|0002|3046", screens: { "304601": "hall-1", "304602": "hall-2", "304603": "hall-3", "304604": "hall-4", "304605": "hall-5" } },
  "lotte-byeongjeom": { cinema: "1|0002|3017", screens: { "301701": "hall-1", "301702": "hall-2", "301703": "hall-3", "301704": "hall-4", "301705": "hall-5", "301706": "hall-6", "301707": "hall-7", "301708": "hall-8" } },
  "lotte-bucheon": { cinema: "1|0002|3011", screens: { "301101": "hall-1", "301102": "hall-2", "301103": "hall-3", "301104": "hall-4", "301105": "hall-5", "301106": "hall-6", "301107": "hall-7", "301108": "hall-8" } },
  "lotte-bupyeong-galsan": { cinema: "1|0002|3050", screens: { "305001": "hall-1", "305002": "hall-2", "305003": "hall-3", "305004": "hall-4", "305005": "hall-5", "305006": "hall-6", "305007": "hall-7" } },
  "lotte-bupyeong-station": { cinema: "1|0002|3008", screens: { "300801": "hall-1", "300802": "hall-2", "300803": "hall-3", "300804": "hall-4", "300805": "hall-5", "300806": "hall-6", "300807": "hall-7", "300808": "hall-8", "300809": "hall-9" } },
  "lotte-buksuwon": { cinema: "1|0002|9130", screens: { "913001": "hall-1", "913002": "hall-2", "913003": "hall-3", "913004": "hall-4", "913005": "hall-5" } },
  "lotte-sanbon-fitin": { cinema: "1|0002|3031", screens: { "303101": "hall-1", "303102": "hall-2", "303103": "hall-3", "303104": "hall-4", "303105": "hall-5", "303106": "hall-6", "303107": "hall-7" } },
  "lotte-seosuwon": { cinema: "1|0002|3043", screens: { "304301": "hall-1", "304302": "hall-2", "304303": "hall-3", "304304": "hall-4", "304305": "hall-5", "304306": "hall-6" } },
  "lotte-seongnam-jungang": { cinema: "1|0002|3041", screens: { "304101": "hall-1", "304102": "hall-2", "304103": "hall-3", "304104": "hall-4", "304105": "hall-5", "304106": "hall-6", "304107": "hall-7", "304108": "hall-8", "304109": "hall-9" } },
  "lotte-songtan": { cinema: "1|0002|3029", screens: { "302901": "hall-1", "302902": "hall-2", "302903": "hall-3", "302904": "hall-4", "302905": "hall-5" } },
  "lotte-suwon": { cinema: "1|0002|3024", screens: { "302401": "hall-1", "302402": "hall-2", "302403": "hall-3", "302404": "hall-4", "302405": "hall-5", "302406": "hall-6", "302407": "hall-7", "302408": "hall-8" } },
  "lotte-suji": { cinema: "1|0002|3044", screens: { "304401": "hall-1", "304402": "hall-2", "304403": "hall-3", "304404": "hall-4", "304405": "hall-5", "304406": "hall-6", "304407": "hall-7", "304408": "hall-8" } },
  "lotte-sihwa": { cinema: "1|0002|9088", screens: { "908801": "hall-1", "908802": "hall-2", "908803": "hall-3", "908804": "hall-4", "908805": "hall-5", "908806": "hall-6", "908807": "hall-7", "908808": "hall-8" } },
  "lotte-siheung-janghyeon": { cinema: "1|0002|3049", screens: { "304901": "hall-1", "304902": "hall-2", "304903": "hall-3", "304904": "hall-4", "304905": "hall-5" } },
  "lotte-ansan": { cinema: "1|0002|3004", screens: { "300402": "hall-2", "300403": "hall-3", "300404": "hall-4", "300405": "hall-5", "300406": "hall-6", "300407": "hall-7", "300408": "hall-8", "201": "charlotte" } },
  "lotte-ansan-gojan": { cinema: "1|0002|3028", screens: { "302801": "hall-1", "302802": "hall-2", "302803": "hall-3", "302804": "hall-4", "302805": "hall-5", "302806": "hall-6", "302807": "hall-7" } },
  "lotte-ansan-jungang": { cinema: "1|0002|3012", screens: { "301201": "hall-1", "301202": "hall-2", "301203": "hall-3", "301204": "hall-4", "301205": "hall-5", "301206": "hall-6", "301207": "hall-7", "301208": "hall-8", "301209": "hall-9" } },
  "lotte-anseong": { cinema: "1|0002|9106", screens: { "910601": "hall-1", "910602": "hall-2" } },
  "lotte-anyang-ilbeonga": { cinema: "1|0002|3032", screens: { "303201": "hall-1", "303202": "hall-2", "303203": "hall-3", "303204": "hall-4", "303205": "hall-5", "303206": "hall-6", "303207": "hall-7", "303208": "hall-8" } },
  "lotte-yongin-giheung": { cinema: "1|0002|3039", screens: { "303901": "hall-1", "303902": "hall-2", "303903": "hall-3", "303904": "hall-4", "303905": "hall-5", "303906": "hall-6", "303907": "hall-7" } },
  "lotte-yongin-yeokbuk": { cinema: "1|0002|3040", screens: { "304001": "hall-1", "304002": "hall-2", "304003": "hall-3", "304004": "hall-4", "304005": "hall-5", "304006": "hall-6", "304007": "hall-7" } },
  "lotte-wirye": { cinema: "1|0002|3037", screens: { "303701": "hall-1", "303702": "hall-2", "303703": "hall-3", "303704": "hall-4", "303705": "hall-5", "303706": "hall-6", "303707": "hall-7" } },
  "lotte-uijeongbu-minrak": { cinema: "1|0002|3033", screens: { "303301": "hall-1", "303302": "hall-2", "303303": "hall-3", "303304": "hall-4", "303305": "hall-5", "303306": "hall-6", "303307": "hall-7" } },
  "lotte-incheon-asiad": { cinema: "1|0002|3035", screens: { "303501": "hall-1", "303502": "hall-2", "303503": "hall-3", "303504": "hall-4", "303505": "hall-5", "303506": "hall-6" } },
  "lotte-incheon-terminal": { cinema: "1|0002|3038", screens: { "303801": "hall-1", "303802": "hall-2", "303803": "hall-3", "303804": "hall-4" } },
  "lotte-jinjeop": { cinema: "1|0002|3010", screens: { "301001": "hall-1", "301002": "hall-2", "301003": "hall-3" } },
  "lotte-paju-outlet": { cinema: "1|0002|9113", screens: { "911301": "hall-1", "911302": "hall-2", "911303": "hall-3", "911304": "hall-4", "911305": "hall-5", "911306": "hall-6", "911307": "hall-7" } },
  "lotte-paju-yadang": { cinema: "1|0002|9126", screens: { "912601": "hall-1", "912602": "hall-2", "912603": "hall-3", "912604": "hall-4", "912605": "hall-5" } },
  "lotte-paju-unjeong": { cinema: "1|0002|3034", screens: { "303401": "hall-1", "303402": "hall-2", "303403": "hall-3", "303404": "hall-4", "303405": "hall-5", "303406": "hall-6", "303407": "hall-7" } },
  "lotte-pangyo": { cinema: "1|0002|3047", screens: { "304701": "hall-1", "304702": "hall-2", "304703": "hall-3", "304704": "hall-4", "304705": "hall-5", "304706": "hall-6", "304707": "hall-7" } },
  "lotte-pyeongchon": { cinema: "1|0002|3018", screens: { "301801": "hall-1", "301802": "hall-2", "301803": "hall-3", "301804": "hall-4", "301805": "hall-5", "301806": "hall-6", "301807": "hall-7", "801": "charlotte" } },
  "lotte-hanam-misa": { cinema: "1|0002|9129", screens: { "912901": "hall-1", "912902": "hall-2", "912903": "hall-3", "912904": "hall-4", "912905": "hall-5", "912906": "hall-6", "912907": "hall-7", "912908": "hall-8" } },
  "lotte-hyangnam": { cinema: "1|0002|3036", screens: { "303601": "hall-1", "303602": "hall-2", "303603": "hall-3", "303604": "hall-4", "303605": "hall-5" } },
  "lotte-dangjin": { cinema: "1|0003|9085", screens: { "908501": "hall-1", "908502": "hall-2", "908503": "hall-3", "908504": "hall-4", "908505": "hall-5", "908506": "hall-6", "908507": "hall-7" } },
  "lotte-daejeon": { cinema: "1|0003|4002", screens: { "400201": "hall-1", "400202": "hall-2", "400203": "hall-3", "400204": "hall-4", "400205": "hall-5", "400206": "hall-6", "400207": "hall-7", "400208": "hall-8" } },
  "lotte-daejeon-gwanjeo": { cinema: "1|0003|4009", screens: { "400901": "hall-1", "400902": "hall-2", "400903": "hall-3", "400904": "hall-4", "400905": "hall-5", "400906": "hall-6", "400907": "hall-7" } },
  "lotte-daejeon-central": { cinema: "1|0003|4008", screens: { "400801": "hall-1", "400802": "hall-2", "400803": "hall-3", "400804": "hall-4", "400805": "hall-5", "400806": "hall-6", "400807": "hall-7" } },
  "lotte-seosan": { cinema: "1|0003|9044", screens: { "904401": "hall-1", "904402": "hall-2", "904403": "hall-3", "904404": "hall-4", "904405": "hall-5", "904406": "hall-6", "904407": "hall-7" } },
  "lotte-seocheongju": { cinema: "1|0003|4004", screens: { "400401": "hall-1", "400402": "hall-2", "400403": "hall-3", "400404": "hall-4", "400405": "hall-5", "400406": "hall-6" } },
  "lotte-asan-terminal": { cinema: "1|0003|9128", screens: { "912801": "hall-1", "912802": "hall-2", "912803": "hall-3", "912804": "hall-4", "912805": "hall-5", "912806": "hall-6" } },
  "lotte-osong": { cinema: "1|0003|9119", screens: { "911901": "hall-1", "911902": "hall-2", "911903": "hall-3", "911904": "hall-4", "911905": "hall-5", "911906": "hall-6" } },
  "lotte-cheonan-buldang": { cinema: "1|0003|9101", screens: { "910101": "hall-1", "910102": "hall-2", "910103": "hall-3", "910104": "hall-4", "910105": "hall-5", "910106": "hall-6" } },
  "lotte-cheonan-cheongdang": { cinema: "1|0003|9125", screens: { "912501": "hall-1", "912502": "hall-2", "912503": "hall-3", "912504": "hall-4", "912505": "hall-5", "912506": "hall-6" } },
  "lotte-cheongju-yongam": { cinema: "1|0003|4007", screens: { "400701": "hall-1", "400702": "hall-2", "400703": "hall-3", "400704": "hall-4", "400705": "hall-5", "400706": "hall-6", "400707": "hall-7", "400708": "hall-8" } },
  "lotte-chungju": { cinema: "1|0003|9078", screens: { "907801": "hall-1", "907802": "hall-2", "907803": "hall-3", "907804": "hall-4", "907805": "hall-5" } },
  "lotte-gwangju": { cinema: "1|0004|6001", screens: { "600102": "hall-2", "600103": "hall-3", "600104": "hall-4", "600105": "hall-5", "600106": "hall-6", "901": "charlotte" } },
  "lotte-gwangju-gwangsan": { cinema: "1|0004|9065", screens: { "906501": "hall-1", "906502": "hall-2", "906504": "hall-4", "906505": "hall-5", "906506": "hall-6", "906507": "hall-7", "906508": "hall-8" } },
  "lotte-gwangju-cheomdan": { cinema: "1|0004|9117", screens: { "911701": "hall-1", "911702": "hall-2", "911703": "hall-3", "911704": "hall-4", "911705": "hall-5" } },
  "lotte-gunsan-naun": { cinema: "1|0004|6007", screens: { "600701": "hall-1", "600702": "hall-2", "600703": "hall-3", "600704": "hall-4", "600705": "hall-5", "600706": "hall-6", "600707": "hall-7" } },
  "lotte-gunsan-mall": { cinema: "1|0004|6009", screens: { "600901": "hall-1", "600902": "hall-2", "600903": "hall-3", "600904": "hall-4", "600905": "hall-5", "600906": "hall-6", "600907": "hall-7" } },
  "lotte-suwan": { cinema: "1|0004|6004", screens: { "600401": "hall-1", "600402": "hall-2", "600403": "hall-3", "600404": "hall-4", "600405": "hall-5", "600406": "hall-6", "600407": "hall-7" } },
  "lotte-iksan-mohyeon": { cinema: "1|0004|9070", screens: { "907001": "hall-1", "907002": "hall-2", "907003": "hall-3", "907004": "hall-4", "907005": "hall-5", "907006": "hall-6", "907007": "hall-7" } },
  "lotte-jeonju": { cinema: "1|0004|6002", screens: { "600201": "hall-1", "600202": "hall-2", "600203": "hall-3", "600204": "hall-4", "600205": "hall-5", "600206": "hall-6", "600207": "hall-7", "600208": "hall-8" } },
  "lotte-jeonju-songcheon": { cinema: "1|0004|9102", screens: { "910201": "hall-1", "910203": "hall-3", "910204": "hall-4", "910205": "hall-5", "910206": "hall-6", "910207": "hall-7" } },
  "lotte-jeonju-pyeonghwa": { cinema: "1|0004|6006", screens: { "600601": "hall-1", "600602": "hall-2", "600603": "hall-3", "600604": "hall-4", "600606": "hall-6" } },
  "lotte-chungjangno": { cinema: "1|0004|9047", screens: { "904701": "hall-1", "904702": "hall-2", "904703": "hall-3", "904704": "hall-4", "904705": "hall-5", "904706": "hall-6", "904707": "hall-7", "904708": "hall-8", "904709": "hall-9" } },
  "lotte-gyeongju-hwangseong": { cinema: "1|0005|9120", screens: { "912001": "hall-1", "912002": "hall-2", "912003": "hall-3", "912004": "hall-4", "912005": "hall-5", "912006": "hall-6" } },
  "lotte-gumi-gongdan": { cinema: "1|0005|5013", screens: { "501301": "hall-1", "501302": "hall-2", "501303": "hall-3", "501304": "hall-4", "501305": "hall-5", "501306": "hall-6", "501307": "hall-7", "501308": "hall-8" } },
  "lotte-daegu-gwangjang": { cinema: "1|0005|5012", screens: { "501201": "hall-1", "501202": "hall-2", "501203": "hall-3", "501204": "hall-4", "501205": "hall-5", "501206": "hall-6", "501207": "hall-7" } },
  "lotte-daegu-yulha": { cinema: "1|0005|5006", screens: { "500601": "hall-1", "500602": "hall-2", "500603": "hall-3", "500604": "hall-4", "500605": "hall-5", "500606": "hall-6" } },
  "lotte-daegu-hyeonpung": { cinema: "1|0005|9121", screens: { "912101": "hall-1", "912102": "hall-2", "912103": "hall-3", "912104": "hall-4", "912105": "hall-5", "912106": "hall-6" } },
  "lotte-dongseongno": { cinema: "1|0005|5005", screens: { "501": "hall-1", "500502": "hall-2", "500503": "hall-3", "500504": "hall-4", "500505": "hall-5", "500506": "hall-6", "500507": "hall-7", "500508": "hall-8", "500509": "hall-9" } },
  "lotte-sangin": { cinema: "1|0005|5016", screens: { "501601": "hall-1", "501602": "hall-2", "501603": "hall-3", "501604": "hall-4", "501605": "hall-5", "501606": "hall-6", "501607": "hall-7" } },
  "lotte-sangju": { cinema: "1|0005|9080", screens: { "908002": "hall-2", "908003": "hall-3", "908004": "hall-4" } },
  "lotte-seongseo": { cinema: "1|0005|9127", screens: { "912701": "hall-1", "912702": "hall-2", "912703": "hall-3", "912704": "hall-4", "912705": "hall-5", "912706": "hall-6", "912707": "hall-7", "912708": "hall-8", "912709": "hall-9" } },
  "lotte-yeongju": { cinema: "1|0005|9064", screens: { "906401": "hall-1", "906402": "hall-2", "906403": "hall-3", "906404": "hall-4", "906405": "hall-5", "906406": "hall-6" } },
  "lotte-yeongcheon": { cinema: "1|0005|9098", screens: { "909801": "hall-1", "909802": "hall-2", "909803": "hall-3", "909804": "hall-4", "909805": "hall-5", "909806": "hall-6" } },
  "lotte-pohang": { cinema: "1|0005|9097", screens: { "909701": "hall-1", "909702": "hall-2", "909703": "hall-3", "909704": "hall-4", "909705": "hall-5", "909706": "hall-6", "909707": "hall-7", "909708": "hall-8" } },
  "lotte-gumi-central": { cinema: "1|0005|9067", screens: { "906701": "hall-1", "906702": "hall-2", "906703": "hall-3", "906704": "hall-4", "906705": "hall-5", "906706": "hall-6", "906707": "hall-7" } },
  "lotte-andong": { cinema: "1|0005|9074", screens: { "907401": "hall-1", "907402": "hall-2", "907403": "hall-3", "907404": "hall-4", "907405": "hall-5" } },
  "lotte-chilgok": { cinema: "1|0005|9057", screens: { "905701": "hall-1", "905702": "hall-2", "905703": "hall-3", "905704": "hall-4", "905705": "hall-5", "905706": "hall-6" } },
  "lotte-geochang": { cinema: "1|0101|9122", screens: { "912201": "hall-1", "912202": "hall-2" } },
  "lotte-gwangbok": { cinema: "1|0101|2009", screens: { "200901": "hall-1", "200902": "hall-2", "200903": "hall-3", "200904": "hall-4", "200905": "hall-5", "200906": "hall-6", "200907": "hall-7", "200908": "hall-8", "200909": "hall-9", "200910": "hall-10", "1111": "charlotte" } },
  "lotte-gimhae-buwon": { cinema: "1|0101|5015", screens: { "501501": "hall-1", "501502": "hall-2", "501503": "hall-3", "501504": "hall-4", "501505": "hall-5", "501506": "hall-6", "501507": "hall-7" } },
  "lotte-gimhae-outlet": { cinema: "1|0101|5011", screens: { "501101": "hall-1", "501102": "hall-2", "501103": "hall-3", "501104": "hall-4", "501105": "hall-5", "501106": "hall-6" } },
  "lotte-dongnae": { cinema: "1|0101|2007", screens: { "200701": "hall-1", "200702": "hall-2", "200703": "hall-3", "200704": "hall-4", "200705": "hall-5", "200706": "hall-6", "200707": "hall-7", "200708": "hall-8", "200709": "hall-9" } },
  "lotte-dongbusan-outlet": { cinema: "1|0101|2010", screens: { "201001": "hall-1", "201002": "hall-2", "201003": "hall-3", "201004": "hall-4", "201005": "hall-5", "201006": "hall-6" } },
  "lotte-masan": { cinema: "1|0101|9042", screens: { "904201": "hall-1", "904202": "hall-2", "904203": "hall-3", "904204": "hall-4", "904205": "hall-5", "904206": "hall-6", "904207": "hall-7" } },
  "lotte-busan-myeongji": { cinema: "1|0101|9092", screens: { "909201": "hall-1", "909202": "hall-2", "909203": "hall-3", "909204": "hall-4", "909205": "hall-5", "909206": "hall-6", "909207": "hall-7" } },
  "lotte-busan": { cinema: "1|0101|2004", screens: { "200401": "hall-1", "200402": "hall-2", "200403": "hall-3", "200404": "hall-4", "200405": "hall-5", "200406": "hall-6", "200407": "hall-7", "200408": "hall-8", "200409": "hall-9", "200410": "hall-10", "200411": "hall-11" } },
  "lotte-busan-jangnim": { cinema: "1|0101|9115", screens: { "911501": "hall-1", "911502": "hall-2", "911503": "hall-3", "911504": "hall-4", "911505": "hall-5", "911506": "hall-6" } },
  "lotte-sacheon": { cinema: "1|0101|9084", screens: { "908401": "hall-1", "908402": "hall-2", "908403": "hall-3", "908405": "hall-5", "908406": "hall-6", "908407": "hall-7" } },
  "lotte-centum-city": { cinema: "1|0101|2006", screens: { "200602": "hall-2", "200603": "hall-3", "200604": "hall-4", "200605": "hall-5", "200606": "hall-6", "200607": "hall-7", "200608": "hall-8", "200609": "hall-9", "200610": "hall-10", "401": "charlotte" } },
  "lotte-jinju-mbcine": { cinema: "1|0101|9105", screens: { "910501": "hall-1", "910502": "hall-2", "910503": "hall-3", "910504": "hall-4", "910505": "hall-5", "910506": "hall-6", "910507": "hall-7", "910508": "hall-8", "910509": "hall-9" } },
  "lotte-o2-busan-univ": { cinema: "1|0101|2011", screens: { "201101": "hall-1", "201102": "hall-2", "201103": "hall-3", "201104": "hall-4", "201105": "hall-5", "201106": "hall-6", "201107": "hall-7" } },
  "lotte-ulsan": { cinema: "1|0101|5001", screens: { "500101": "hall-1", "500102": "hall-2", "500103": "hall-3", "500104": "hall-4", "500105": "hall-5", "500106": "hall-6", "500107": "hall-7", "500108": "hall-8", "500109": "hall-9" } },
  "lotte-ulsan-seongnam": { cinema: "1|0101|9116", screens: { "911601": "hall-1", "911602": "hall-2", "911603": "hall-3", "911604": "hall-4", "911605": "hall-5", "911606": "hall-6", "911607": "hall-7" } },
  "lotte-jinju-hyeoksin": { cinema: "1|0101|5017", screens: { "501701": "hall-1", "501702": "hall-2", "501703": "hall-3", "501704": "hall-4", "501705": "hall-5", "501706": "hall-6", "501707": "hall-7" } },
  "lotte-jinhae": { cinema: "1|0101|5009", screens: { "500901": "hall-1", "500902": "hall-2", "500903": "hall-3", "500904": "hall-4", "500905": "hall-5", "500906": "hall-6" } },
  "lotte-changwon": { cinema: "1|0101|5002", screens: { "500201": "hall-1", "500202": "hall-2", "500203": "hall-3", "500204": "hall-4", "500205": "hall-5", "500206": "hall-6", "500207": "hall-7" } },
  "lotte-tongyeong": { cinema: "1|0101|9036", screens: { "903601": "hall-1", "903602": "hall-2", "903603": "hall-3", "903604": "hall-4", "903605": "hall-5", "903606": "hall-6", "903607": "hall-7" } },
  "lotte-kyungnam-univ": { cinema: "1|0101|9072", screens: { "907201": "hall-1", "907202": "hall-2", "907203": "hall-3", "907204": "hall-4", "907205": "hall-5", "907206": "hall-6" } },
  "lotte-gangneung": { cinema: "1|0006|9118", screens: { "911801": "hall-1", "911802": "hall-2", "911803": "hall-3", "911804": "hall-4" } },
  "lotte-nam-wonju": { cinema: "1|0006|9108", screens: { "910801": "hall-1", "910802": "hall-2", "910803": "hall-3", "910804": "hall-4", "910805": "hall-5", "910806": "hall-6", "910807": "hall-7" } },
  "lotte-donghae": { cinema: "1|0006|7002", screens: { "700201": "hall-1", "700202": "hall-2", "700203": "hall-3", "700204": "hall-4", "700205": "hall-5" } },
  "lotte-sokcho": { cinema: "1|0006|9131", screens: { "913101": "hall-1", "913102": "hall-2", "913103": "hall-3", "913104": "hall-4", "913105": "hall-5" } },
  "lotte-wonju-musil": { cinema: "1|0006|7003", screens: { "700301": "hall-1", "700302": "hall-2", "700303": "hall-3", "700304": "hall-4", "700305": "hall-5", "700306": "hall-6", "700307": "hall-7", "700308": "hall-8" } },
  "lotte-chuncheon": { cinema: "1|0006|9123", screens: { "912301": "hall-1", "912302": "hall-2", "912303": "hall-3", "912304": "hall-4", "912305": "hall-5", "912306": "hall-6" } },
  "lotte-seogwipo": { cinema: "1|0007|9013", screens: { "901301": "hall-1", "901302": "hall-2", "901303": "hall-3", "901305": "hall-5", "901306": "hall-6", "901307": "hall-7" } },
  "lotte-jeju-yeondong": { cinema: "1|0007|6010", screens: { "601001": "hall-1", "601002": "hall-2", "601003": "hall-3", "601004": "hall-4", "601005": "hall-5", "601006": "hall-6" } },
};
