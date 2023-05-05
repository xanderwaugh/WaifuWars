/**
 * @description List of waifus
 * @see  https://i.redd.it/wagi2s5tvpc91.png
 */
export const ALL_WAIFUS: number[] = [
  136359, // Kaguya Shinomiya
  118739, // Mai Sakurajima,
  143196, // Ai Hayasaka
  36828, // Asuna Yuuki
  498, // Rin Toosaka
  118763, // Rem
  118765, // Ram
  34470, // Kurisu Makise
  7373, // Holo
  150824, // Vladilena Milize
  19566, // Mio Akiyama
  117225, // Megumin
  13701, // Mikoto Misaka
  67067, // Yukino Yukinoshita
  117223, // Aqua
  22037, // Hitagi Senjougahara
  111341, // Roxy Migurdia
  94, // Asuka Langley Souryuu
  141354, // Violet Evergarden
  140810, // Chika Fujiwara
  66171, // Kyouko Hori
  67069, // Yui Yuigahama
  83797, // Ryuuko Matoi
  55133, // Eru Chitanda
  110743, // Iroha Isshiki
  118737, // Emilia
  497, // Saber
  1111, // CC,
  1259, // Misato Katsuragi
  163452, // Rio Futaba
  35255, // Suzuha Amane
  86, // Rei Ayanami
  2, // Faye Valentine
  12064, // Taiga Aisaka
  13725, // Ami Kawashima
  50389, // Rias Gremory
  65239, // Esdeath
  155679, // Zero Two
  136, // Louise Françoise Le Blanc de La Vallière
  112893, // Raphtalia
  146157, // Nezuko Kamado
  558, // Kallen Stadtfeld
  835, // Misa Amane
  12305, // Minori Kushieda
  12307, // Yasuko Takasu
  9146, // Peach
  40881, // Mikasa Ackerman
  3923, // Sayoko Tsukinomori
  1120, // Shirley Fenette
  1110, // Nunnally Lamperouge
  8439, // Maka Albarn
  8444, //Patricia Thompson
  8445, //Elizabeth Thompson
  23491, // Sohara Mitsuki
  19931, // Saki Morimi
  21150, // Ikaros
  23496, // Nymph
  37553, // Daedalus
  4963, // Yuno Gasai
  // 4964, // Deus Ex Machina *** Troll ! error
  21960, // Lisa Lisa
  145877, // Echidna
  63, // Winry Rockbell
  63351, // Akame
  65229, // Mine
  65227, // Leone
  65233, // Sheele
  // 65237, // Chelsea ! error
  734, // Botan && 734, // Botan 2
  669, // Akane Tendou
  2421, // Shampoo
  22369, // Kanade Tachibana
  43892, // Yui
  75450, // Alice Zuberg
  5513, // Konjiki no Yami
  166439, // Marin Kitagawa
  1896, // Fate Testarossa
  37514, // Sena Kashiwazaki
  2030, // Usagi Tsukino
  3796, // Miria Harvent
  2398, // Teresa
  20170, // Victorique de Blois
  5186, // Lucy Heartfilia
  423, // Casca
  69411, // Kaori Miyazono
  48391, // Chitoge Kirisaki
  61371, // Mashiro Shiina
  723, // Nami
  145, // Sakura Haruno
  23602, // Shinobu Oshino
  43121, // Morgiana
  82037, // Kurokami no Onna
  128910, //Suzune Horikita
  // ...
  130836, // Roxanne
  183430, // Setsuna
  183433, // Kureha Crylet
  160679, // Flare Arlgrande Jioral
  183432, // Norn Clatalissa Jioral
  183431, // Eve Reese
  33221, // Sora Kasugano
  // ...
  111741, // Ghislaine Dedoldia,
  111335, // Eris Boreas Greyrat
  740, // Nana,
  738, // Lucy,
  83017, // Shinoa Hiiragi
  145583, // Clair Aoki
  2063, // Yoko Littner
  68189, // Hikari Mariya
  56239, // Erica Blandelli
  64613, // Athena
  68583, // Akane Tsunemori
  115691, // Ayame Kajou
  115699, // Anna Nishikinomiya
  // 115705, // Hyouka Fuwa ! error
  24515, // Yui
  1038, // Naru Narusegawa
  458, // Revy
  2762, // Roberta
  80897, // Michiru Matsushima
  80899, // Amane Suou
  80257, // Yumiko Sakaki
  80895, // Sachi Komine
  118767, // Beatrice
  72923, // Elizabeth Liones
  86681, // Elaine
  74653, // Daein
  122367, // Hina Tachibana
  122365, // Rui Tachibana
  114059, // Sora
  52883, // Lilith Asami
  52891, // Mira Yamana
  52889, // Akio Fudou
  52885, // Levi Kazama
  1251, // Ritsuko Akagi
];

export const getRandomWaifu = () => {
  const randidx = Math.floor(Math.random() * ALL_WAIFUS.length - 1);
  return ALL_WAIFUS[randidx] as number;
};

export const getRandomWaifuPair: () => [number, number] = () => {
  const r1 = getRandomWaifu();
  const r2 = getRandomWaifu();
  if (r1 === r2) {
    console.log("same waifu, rerolling");
    return getRandomWaifuPair();
  }

  return [r1, r2];
};
