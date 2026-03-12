/**
 * Common stopwords per language — filtered out during word extraction.
 * Kept intentionally compact; covers the most frequent function words.
 */

export const STOPWORDS_EN = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','am','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','shall','should','may','might','can','could',
  'not','no','nor','so','if','then','than','that','this','these','those','it',
  'its','he','she','they','we','you','i','me','my','his','her','our','your',
  'their','him','them','us','who','what','which','when','where','how','why',
  'all','each','every','both','few','more','most','other','some','such','only',
  'own','same','also','just','about','above','after','again','any','because',
  'before','below','between','during','here','there','into','out','over','under',
  'up','down','very','too','as','until','while','much','many','now','new',
  'said','like','one','two','three','first','well','get','got','make','made',
]);

export const STOPWORDS_KO = new Set([
  '은','는','이','가','을','를','의','에','에서','으로','로','와','과','도',
  '만','까지','부터','보다','처럼','같이','마다','밖에','조차','뿐','라도',
  '든지','나','거나','며','고','지만','는데','으며','니까','면','서','아서',
  '어서','해서','되다','하다','있다','없다','되다','않다','것','수','등',
  '중','때','후','전','안','밖','위','아래','그','저','이런','저런','그런',
  '무엇','어디','언제','어떻게','왜','누구','합니다','입니다','했다','된다',
]);

export const STOPWORDS_JA = new Set([
  'は','が','の','を','に','で','と','も','から','まで','より','へ',
  'だ','です','ます','する','した','して','される','された','ない','なく',
  'ある','いる','いた','いて','れる','られる','こと','もの','ため','よう',
  'この','その','あの','どの','これ','それ','あれ','どれ',
  'ここ','そこ','あそこ','どこ','いつ','なぜ','どう','何','誰',
  'など','ほど','ばかり','だけ','しか','くらい','ぐらい',
  'でも','けど','けれど','しかし','そして','また','さらに',
  'とても','すごく','もう','まだ','よく','ちょっと',
  'という','ている','ていた','ること','なる','なった',
]);

export const STOPWORDS_ZH = new Set([
  '的','了','在','是','我','有','和','就','不','人','都','一','一个',
  '上','也','很','到','说','要','去','你','会','着','没有','看','好',
  '自己','这','他','她','它','们','那','里','后','多','没','为','与',
  '从','但','而','或','如果','因为','所以','虽然','可以','能','被','把',
  '让','给','向','对','还','又','再','已','已经','将','才','只','大',
  '小','中','出','来','起','个','些','什么','怎么','哪','谁','几',
]);

export function getStopwords(lang: string): Set<string> {
  switch (lang) {
    case 'ko': return STOPWORDS_KO;
    case 'ja': return STOPWORDS_JA;
    case 'zh': return STOPWORDS_ZH;
    default: return STOPWORDS_EN;
  }
}
