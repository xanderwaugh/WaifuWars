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
  4964, // Deus Ex Machina *** Troll

  // ...
  130836, // Roxanne
  183430, // Setsuna
  183433, // Kureha Crylet
  160679, // Flare Arlgrande Jioral
  183432, // Norn Clatalissa Jioral
  183431, // Eve Reese
  33221, // Sora Kasugano
];

export const getRandomWaifu = () => {
  const randidx = Math.floor(Math.random() * ALL_WAIFUS.length);
  return ALL_WAIFUS[randidx] as number;
};

export const getRandomWaifuPair = () => {
  const r1 = getRandomWaifu();
  const r2 = getRandomWaifu();
  if (r1 === r2) r2 === getRandomWaifu();

  return [r1, r2] as const;
};
