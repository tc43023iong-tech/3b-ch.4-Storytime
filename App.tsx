
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GameMode, Word } from './types';
import { 
  BookOpen, 
  Gamepad2, 
  Search, 
  Puzzle, 
  Keyboard, 
  Edit3, 
  Sword, 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  Play as PlayIcon, 
  List as ListIcon, 
  Library,
  Waves,
  Info
} from 'lucide-react';

const WORDS: Word[] = [
  { id: 1, english: 'foolish', chinese: '愚蠢', pronunciation: '/ˈfuːlɪʃ/', emoji: '🤡', syllables: 'fool-ish', breakdown: 'fool (dummy) + ish (like)', etymology: 'From Old French "fol" (madman). 來自古法語 "fol"（瘋子）。', funFact: 'In fables, the donkey is often the foolish one! 在寓言中，驢子通常是愚蠢的一方！', sentence: 'The foolish crow dropped its cheese.', realityInfo: 'Foolishness in nature is rare; animals usually act for survival. 自然界中很少見到愚蠢行為；動物通常是為了生存而行動。' },
  { id: 2, english: 'clever', chinese: '聰明', pronunciation: '/ˈklevə/', emoji: '💡', syllables: 'clev-er', breakdown: 'clever (smart)', etymology: 'Middle English word originally meaning "handy". 中世紀英語，原指「手巧」。', funFact: 'Crows and dolphins are some of the cleverest animals! 烏鴉和海豚是極其聰明的動物！', sentence: 'The clever fox tricked the crow.', realityInfo: 'Octopuses are so clever they can open jars! 章魚聰明到能打開罐子！' },
  { id: 3, english: 'poor', chinese: '貧窮', pronunciation: '/pɔː/', emoji: '🏚️', syllables: 'poor', breakdown: 'poor', etymology: 'From Latin "pauper" (scanty). 來自拉丁語 "pauper"（貧乏的）。', funFact: 'The fisherman in the story started as a poor man. 故事中的漁夫一開始是個窮人。', sentence: 'The poor man lived in a small hut.', realityInfo: 'Global poverty has been decreasing globally. 全球貧困人口正在逐漸減少。' },
  { id: 4, english: 'rich', chinese: '富有', pronunciation: '/rɪtʃ/', emoji: '💰', syllables: 'rich', breakdown: 'rich', etymology: 'Old English "rice" (powerful). 古英語 "rice"（強大或富有）。', funFact: 'Rich people in old stories lived in palaces. 舊故事中的富人住在皇宮裡。', sentence: 'The king was very rich and powerful.', realityInfo: 'Wealth is not just money; it can be knowledge too! 財富不僅僅是金錢，也可以是知識！' },
  { id: 5, english: 'ugly', pronunciation: '/ˈʌɡli/', chinese: '醜陋', emoji: '👹', syllables: 'ug-ly', breakdown: 'ug (fear) + ly (like)', etymology: 'From Old Norse "uggligr" (dreadful). 來自古諾斯語 "uggligr"（恐怖的）。', funFact: 'The "Ugly Duckling" turned into a beautiful swan! 「醜小鴨」變成了美麗的天鵝！', sentence: 'The ugly monster was actually very kind.', realityInfo: 'Beauty is in the eye of the beholder! 美醜在於觀察者的眼光！' },
  { id: 6, english: 'beautiful', pronunciation: '/ˈbjuːtəfəl/', chinese: '美麗', emoji: '🌸', syllables: 'beau-ti-ful', breakdown: 'beauty + ful (full of)', etymology: 'From Old French "beauté". 來自古法語 "beauté"。', funFact: 'Peacocks are famous for their beautiful feathers. 孔雀以其美麗的羽毛而聞名。', sentence: 'The princess lived in a beautiful palace.', realityInfo: 'Flowers use beauty to attract bees. 花朵利用美麗來吸引蜜蜂授粉。' },
  { id: 7, english: 'brave', pronunciation: '/breɪv/', chinese: '勇敢', emoji: '🦁', syllables: 'brave', breakdown: 'brave', etymology: 'From Italian "bravo" (bold). 來自意大利語 "bravo"（大膽的）。', funFact: 'Lions are a symbol of being brave. 獅子是勇敢的象徵。', sentence: 'The brave knight fought the dragon.', realityInfo: 'Bravery is acting despite fear. 勇敢並非無懼，而是克服恐懼。' },
  { id: 8, english: 'timid', pronunciation: '/ˈtɪmɪd/', chinese: '膽小', emoji: '🐭', syllables: 'tim-id', breakdown: 'tim (fear) + id', etymology: 'From Latin "timidus" (fearful). 來自拉丁語 "timidus"（恐懼的）。', funFact: 'Mice are often depicted as timid animals. 老鼠常被描繪成膽小的動物。', sentence: 'The timid rabbit hid in its hole.', realityInfo: 'Small animals are timid to avoid predators. 小動物膽小是為了避開捕食者。' },
  { id: 9, english: 'appear', pronunciation: '/əˈpɪə/', chinese: '出現', emoji: '✨', syllables: 'ap-pear', breakdown: 'ad (to) + parere (come forth)', etymology: 'Latin "apparere". 來自拉丁語 "apparere"。', funFact: 'Magicians make rabbits appear! 魔術師能讓兔子出現！', sentence: 'A fairy began to appear in the forest.', realityInfo: 'Stars appear when the sun goes down. 太陽下山後星星就會出現。' },
  { id: 10, english: 'disappear', pronunciation: '/dɪsəˈpɪə/', chinese: '消失', emoji: '💨', syllables: 'dis-ap-pear', breakdown: 'dis (away) + appear', etymology: 'Prefix dis- + appear. 前綴 dis- + appear。', funFact: 'Dinosaurs disappeared millions of years ago. 恐龍在數百萬年前消失了。', sentence: 'The ghost seemed to disappear instantly.', realityInfo: 'Water can disappear through evaporation! 水會因蒸發而消失！' },
  { id: 11, english: 'arrive', pronunciation: '/əˈraɪv/', chinese: '到達', emoji: '🏁', syllables: 'ar-rive', breakdown: 'ad (to) + ripa (shore)', etymology: 'Originally "to reach the shore". 原意是「抵達岸邊」。', funFact: 'In stories, the hero arrives at the last minute! 故事中，英雄總在最後一刻到達！', sentence: 'The train will arrive at 10 o\'clock.', realityInfo: 'Punctuality is the habit of arriving on time. 準時就是按時到達的習慣。' },
  { id: 12, english: 'leave', pronunciation: '/liːv/', chinese: '離開', emoji: '🚪', syllables: 'leave', breakdown: 'leave', etymology: 'Old English "læfan" (to remain). 古英語 "læfan"（留下）。', funFact: 'Don\'t leave your toys on the floor! 不要把玩具留在地板上！', sentence: 'It is time to leave the palace.', realityInfo: 'Migration is when animals leave their homes. 遷徙就是動物離開家園的時候。' },
  { id: 13, english: 'drop', pronunciation: '/drɒp/', chinese: '掉下', emoji: '💧', syllables: 'drop', breakdown: 'drop', etymology: 'Old English "dropa". 來自古英語 "dropa"。', funFact: 'Gravity makes things drop to the ground. 重力使物體掉到地上。', sentence: 'Did you drop your pencil?', realityInfo: 'Raindrops are actually hamburger-shaped! 雨滴實際上是漢堡狀的！' },
  { id: 14, english: 'find', pronunciation: '/faɪnd/', chinese: '找到', emoji: '🔎', syllables: 'find', breakdown: 'find', etymology: 'Old English "findan". 來自古英語 "findan"。', funFact: 'Pirates try to find buried treasure. 海盜試圖尋找埋藏的寶藏。', sentence: 'Can you find the hidden star?', realityInfo: 'Archaeologists find ancient ruins. 考古學家會找到古代遺跡。' },
  { id: 15, english: 'fable', chinese: '寓言', pronunciation: '/ˈfeɪbl/', emoji: '📖', syllables: 'fa-ble', breakdown: 'fable', etymology: 'Latin "fabula" (story). 來自拉丁語 "fabula"（故事）。', funFact: 'Aesop is a famous writer of fables. 伊索是著名的寓言作家。', sentence: 'The Tortoise and the Hare is a famous fable.', realityInfo: 'Fables usually have talking animals. 寓言通常以會說話的動物為主角。' },
  { id: 16, english: 'fisherman', chinese: '漁夫', pronunciation: '/ˈfɪʃəmən/', emoji: '🎣', syllables: 'fish-er-man', breakdown: 'fish + er + man', etymology: 'Derived from Old English. 源自古英語。', funFact: 'In the story, the fisherman caught a magic fish. 故事中，漁夫抓到了一條神奇的魚。', sentence: 'The fisherman went to the sea every day.', realityInfo: 'Fishing is a huge global industry. 捕魚業是一個龐大的全球產業。' },
  { id: 17, english: 'wife', chinese: '妻子', pronunciation: '/waɪf/', emoji: '👩', syllables: 'wife', breakdown: 'wife', etymology: 'Old English "wif" (woman). 古英語 "wif"（女人）。', funFact: 'The fisherman\'s wife kept making wishes. 漁夫的妻子不斷地許願。', sentence: 'The fisherman lived with his wife.', realityInfo: 'Wife comes from words meaning "weaver". Wife 一詞源自意為「織布者」的詞。' },
  { id: 18, english: 'hut', chinese: '小屋', pronunciation: '/hʌt/', emoji: '🛖', syllables: 'hut', breakdown: 'hut', etymology: 'Old French "hutte". 來自古法語 "hutte"。', funFact: 'A hut is a very simple house. 小屋是一種非常簡單的房子。', sentence: 'They lived in a small, dirty hut.', realityInfo: 'Many traditional houses are types of huts. 許多傳統房屋都是小屋類型。' },
  { id: 19, english: 'wish', chinese: '願望', pronunciation: '/wɪʃ/', emoji: '🌠', syllables: 'wish', breakdown: 'wish', etymology: 'Old English "wyscan". 來自古英語 "wyscan"。', funFact: 'Be careful what you wish for! 許願要謹慎！', sentence: 'I wish I had a beautiful palace.', realityInfo: 'Wishing is common in human folklore. 許願在人類民俗中很常見。' },
  { id: 20, english: 'yelled', chinese: '大吼', pronunciation: '/jeld/', emoji: '🗣️', syllables: 'yelled', breakdown: 'yell + ed', etymology: 'Old English "gyllan". 來自古英語 "gyllan"。', funFact: 'The wife yelled at the fisherman. 妻子對漁夫大吼。', sentence: 'He yelled across the palace gardens.', realityInfo: 'Humans can yell up to 120 decibels! 人類的大吼可達120分貝！' },
  { id: 21, english: 'palace', chinese: '皇宮', pronunciation: '/ˈpæləs/', emoji: '🏰', syllables: 'pal-ace', breakdown: 'palace', etymology: 'From Palatine Hill in Rome. 源自羅馬的帕拉蒂尼山。', funFact: 'Buckingham Palace has 775 rooms! 白金漢宮有775個房間！', sentence: 'The queen lived in a golden palace.', realityInfo: 'The Forbidden City is a huge palace complex. 紫禁城是一個巨大的宮殿群。' },
  { id: 22, english: 'queen', chinese: '皇后', pronunciation: '/kwiːn/', emoji: '👸', syllables: 'queen', breakdown: 'queen', etymology: 'Old English "cwen" (woman). 古英語 "cwen"（女人）。', funFact: 'A queen can rule a country. 皇后可以統治一個國家。', sentence: 'The queen wore a sparkling crown.', realityInfo: 'Queen bees lay all the eggs. 蜂后產下所有的卵。' },
  { id: 23, english: 'each', chinese: '每一個', pronunciation: '/iːtʃ/', emoji: '👉', syllables: 'each', breakdown: 'each', etymology: 'Old English "ælc". 來自古英語 "ælc"。', funFact: 'Each snowflake is unique! 每一片雪花都是獨一無二的！', sentence: 'Give a cookie to each student.', realityInfo: 'Fingerprints are different on each person. 每個人身上的指紋都不同。' },
  { id: 24, english: 'still', chinese: '仍然', pronunciation: '/stɪl/', emoji: '🕰️', syllables: 'still', breakdown: 'still', etymology: 'Old English "stille" (fixed). 古英語 "stille"（固定的）。', funFact: 'The sea was still and quiet. 大海依然平靜而安靜。', sentence: 'It is still raining outside.', realityInfo: 'Stillness helps reduce stress. 靜止有助於減輕壓力。' },
  { id: 25, english: 'control', chinese: '控制', pronunciation: '/kənˈtrəʊl/', emoji: '🎮', syllables: 'con-trol', breakdown: 'con (against) + troll (roll)', etymology: 'Latin "contrarotulus" (ledger). 拉丁語 "contrarotulus"（分類帳）。', funFact: 'The queen wanted to control the sun! 皇后想要控制太陽！', sentence: 'Can you control this robot?', realityInfo: 'Self-control is a life skill. 自我控制是一項重要的生活技能。' }
];

const POKEMON_SPRITES = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>(GameMode.MENU);
  const [captured, setCaptured] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCapturedModal, setShowCapturedModal] = useState<number | null>(null);

  const capturePokemon = () => {
    const newId = Math.floor(Math.random() * 151) + 1;
    if (!captured.includes(newId)) {
      setCaptured([...captured, newId]);
      setShowCapturedModal(newId);
    }
  };

  return (
    <div className="min-h-screen pb-24 relative selection:bg-yellow-200">
      <header className="p-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-2" onClick={() => setMode(GameMode.MENU)}>
          <img src={POKEMON_SPRITES(25)} className="w-10 h-10" />
          <h1 className="text-2xl font-bold pokemon-font cursor-pointer">English Explorer</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex -space-x-2">
            {captured.slice(0, 5).map(id => (
              <img key={id} src={POKEMON_SPRITES(id)} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white" />
            ))}
            {captured.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                +{captured.length - 5}
              </div>
            )}
          </div>
          <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm font-bold shadow-sm">🏆 {score}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {mode === GameMode.MENU && <MainMenu setMode={setMode} />}
        {mode === GameMode.REVIEW && <WordReview setMode={setMode} />}
        {mode === GameMode.DIARY && <DiaryReview onBack={() => setMode(GameMode.MENU)} />}
        {mode === GameMode.DETECTIVE && <EmojiDetective onComplete={() => { capturePokemon(); setScore(s => s + 10); setMode(GameMode.MENU); }} />}
        {mode === GameMode.MATCHING && <MatchingGame onComplete={() => { capturePokemon(); setScore(s => s + 15); setMode(GameMode.MENU); }} />}
        {mode === GameMode.SPELLING && <SpellingBee onComplete={() => { capturePokemon(); setScore(s => s + 20); setMode(GameMode.MENU); }} />}
        {mode === GameMode.FILL_BLANKS && <FillBlanks onComplete={() => { capturePokemon(); setScore(s => s + 20); setMode(GameMode.MENU); }} />}
        {mode === GameMode.BUBBLE_POP && <BubblePop onComplete={() => { capturePokemon(); setScore(s => s + 25); setMode(GameMode.MENU); }} />}
        {mode === GameMode.WORD_SEARCH && <WordSearchGame onComplete={() => { capturePokemon(); setScore(s => s + 30); setMode(GameMode.MENU); }} />}
        {mode === GameMode.BATTLE && <PokemonBattle onComplete={() => { capturePokemon(); setScore(s => s + 50); setMode(GameMode.MENU); }} />}
        {mode === GameMode.MEMORY && <MemoryGame onComplete={() => { capturePokemon(); setScore(s => s + 25); setMode(GameMode.MENU); }} />}
      </main>

      {showCapturedModal !== null && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-10 text-center max-w-sm w-full animate-bounce shadow-2xl border-[10px] border-yellow-400">
            <h2 className="text-4xl font-bold mb-4 text-yellow-500 pokemon-font">GOTCHA!</h2>
            <img src={POKEMON_SPRITES(showCapturedModal)} className="w-56 h-56 mx-auto mb-6" />
            <p className="text-2xl font-bold text-slate-700 mb-8">New Pokemon Captured!</p>
            <button 
              onClick={() => setShowCapturedModal(null)}
              className="bg-blue-600 text-white px-12 py-4 rounded-full font-black text-xl hover:bg-blue-700 transition shadow-xl"
            >
              AWESOME!
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around items-center overflow-x-auto gap-2 custom-scroll z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {[
          { m: GameMode.MENU, icon: <Library />, label: 'Menu' },
          { m: GameMode.REVIEW, icon: <BookOpen />, label: 'Review' },
          { m: GameMode.DIARY, icon: <Info />, label: 'Diary' },
          { m: GameMode.DETECTIVE, icon: <Search />, label: 'Detective' },
          { m: GameMode.MATCHING, icon: <Puzzle />, label: 'Match' },
          { m: GameMode.SPELLING, icon: <Keyboard />, label: 'Spell' },
          { m: GameMode.FILL_BLANKS, icon: <Edit3 />, label: 'Blanks' },
          { m: GameMode.BUBBLE_POP, icon: <Waves />, label: 'Bubble' },
          { m: GameMode.WORD_SEARCH, icon: <Gamepad2 />, label: 'Search' },
          { m: GameMode.MEMORY, icon: <Brain />, label: 'Memory' },
          { m: GameMode.BATTLE, icon: <Sword />, label: 'Battle' },
        ].map(item => (
          <button 
            key={item.m}
            onClick={() => setMode(item.m)}
            className={`flex flex-col items-center p-2 min-w-[64px] rounded-2xl transition-all duration-300 ${mode === item.m ? 'bg-blue-100 text-blue-600 scale-110 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            {item.icon}
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const MainMenu: React.FC<{ setMode: (m: GameMode) => void }> = ({ setMode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-10 rounded-[3rem] border-4 border-yellow-200 flex flex-col items-center text-center shadow-lg group">
      <img src={POKEMON_SPRITES(133)} className="w-40 h-40 floating group-hover:scale-110 transition-transform" />
      <h2 className="text-4xl font-black mt-6 mb-4 text-yellow-800">Ready to Learn?</h2>
      <p className="text-slate-600 mb-8 font-bold leading-relaxed">Let's explore the magical world of words with your favorite Pokemon! Start by reviewing the list.</p>
      <button 
        onClick={() => setMode(GameMode.REVIEW)}
        className="bg-yellow-500 text-white px-10 py-4 rounded-full font-black text-2xl shadow-xl hover:bg-yellow-600 transform hover:scale-105 transition border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2"
      >
        START REVIEW 📖
      </button>
    </div>
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-[3rem] border-4 border-blue-200 grid grid-cols-2 gap-4 shadow-lg">
      {[
        { m: GameMode.DETECTIVE, label: 'Detective', icon: '🔎' },
        { m: GameMode.MATCHING, label: 'Matching', icon: '🧩' },
        { m: GameMode.SPELLING, label: 'Spelling', icon: '🐝' },
        { m: GameMode.BATTLE, label: 'Battle', icon: '⚔️' },
        { m: GameMode.BUBBLE_POP, label: 'Bubble', icon: '🫧' },
        { m: GameMode.WORD_SEARCH, label: 'Search', icon: '🔍' },
      ].map(game => (
        <button 
          key={game.m}
          onClick={() => setMode(game.m)}
          className="bg-white p-5 rounded-[2rem] shadow-md hover:scale-105 transition flex flex-col items-center border-b-8 border-blue-200 active:border-b-0 active:translate-y-2"
        >
          <span className="text-4xl mb-2">{game.icon}</span>
          <span className="font-black text-blue-700 text-sm">{game.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const WordReview: React.FC<{ setMode: (m: GameMode) => void }> = ({ setMode }) => (
  <div className="bg-white rounded-[3rem] shadow-2xl p-8 mb-8 border-t-[12px] border-green-400">
    <div className="flex items-center gap-6 mb-8">
      <img src={POKEMON_SPRITES(1)} className="w-20 h-20 floating" />
      <div>
        <h2 className="text-4xl font-black text-green-700">Ch4 Storytime</h2>
        <p className="text-slate-400 font-bold">Vocabulary Master List</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {WORDS.map(word => (
        <div key={word.id} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border-b-4 border-slate-200 group hover:bg-green-50 hover:border-green-300 transition">
          <span className="text-4xl group-hover:scale-125 transition drop-shadow-sm">{word.emoji}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-blue-900">{word.english}</h3>
            <p className="text-slate-400 font-mono text-xs">{word.pronunciation}</p>
          </div>
          <span className="bg-white px-4 py-2 rounded-2xl text-green-700 font-black border-2 border-green-100 shadow-sm">{word.chinese}</span>
        </div>
      ))}
    </div>
    <button 
      onClick={() => setMode(GameMode.MENU)}
      className="w-full mt-10 bg-green-500 text-white py-5 rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-green-600 transition border-b-8 border-green-700 active:border-b-0 active:translate-y-2"
    >
      I'M READY TO PLAY! 🎮
    </button>
  </div>
);

const DiaryReview: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [view, setView] = useState<'LIST' | 'CARDS' | 'PLAY'>('LIST');
  const [index, setIndex] = useState(0);
  const current = WORDS[index];

  return (
    <div className="bg-pink-50 min-h-[600px] rounded-[3rem] p-8 border-4 border-pink-200 mb-8 shadow-inner overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-pink-700 flex items-center gap-2">
          <Library className="text-pink-500" /> Diary Explorer
        </h2>
        <div className="flex bg-white rounded-full p-2 shadow-inner border-2 border-pink-100">
          {[
            { id: 'LIST', label: 'LIST 清單', icon: <ListIcon size={16} /> },
            { id: 'CARDS', label: 'CARDS 卡片', icon: <Library size={16} /> },
            { id: 'PLAY', label: 'PLAY ⏯️', icon: <PlayIcon size={16} /> }
          ].map(v => (
            <button 
              key={v.id}
              onClick={() => setView(v.id as any)}
              className={`px-6 py-2 rounded-full text-xs font-black transition flex items-center gap-2 ${view === v.id ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-400 hover:text-pink-400'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === 'LIST' && (
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border-2 border-pink-100">
          <div className="bg-pink-100 p-4 grid grid-cols-3 font-black text-pink-700 border-b-2 border-pink-200 uppercase text-xs tracking-widest">
            <span>Word 英語</span>
            <span className="text-center">Meaning 中文</span>
            <span className="text-right">Emoji</span>
          </div>
          <div className="max-h-[500px] overflow-y-auto custom-scroll">
            {WORDS.map((w, i) => (
              <button 
                key={w.id}
                onClick={() => { setIndex(i); setView('CARDS'); }}
                className="w-full grid grid-cols-3 p-5 items-center hover:bg-pink-50 transition border-b border-pink-50 group border-l-8 border-l-transparent hover:border-l-pink-400"
              >
                <span className="font-black text-left text-2xl text-pink-600 group-hover:scale-105 transition origin-left">{w.english}</span>
                <span className="text-slate-600 text-center font-black text-xl">{w.chinese}</span>
                <span className="text-3xl text-right">{w.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(view === 'CARDS' || view === 'PLAY') && (
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl relative border-2 border-pink-100 group">
            <div className="absolute top-4 right-4 p-4">
              <img src={POKEMON_SPRITES(index + 1)} className="w-28 h-28 opacity-40 floating group-hover:scale-110 transition-transform" />
            </div>
            
            <div className="text-center mb-10">
              <span className="text-8xl mb-4 block drop-shadow-md">{current.emoji}</span>
              <h3 className="text-6xl font-black text-pink-600 mb-2 tracking-tight">{current.english}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-black text-slate-800 bg-pink-100 px-6 py-2 rounded-2xl">{current.chinese}</span>
              </div>
              <p className="text-xl text-slate-300 mt-4 font-mono font-bold">{current.pronunciation}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-blue-50 rounded-[1.5rem] border-2 border-blue-100">
                <p className="text-[10px] font-black text-blue-400 mb-1 uppercase tracking-widest">🗣️ SYLLABLES 音節劃分</p>
                <p className="text-2xl font-black text-blue-900">{current.syllables}</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-[1.5rem] border-2 border-purple-100">
                <p className="text-[10px] font-black text-purple-400 mb-1 uppercase tracking-widest">🧩 BREAKDOWN 單詞拆解</p>
                <p className="text-lg font-bold text-purple-900 leading-relaxed">{current.breakdown}</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-[1.5rem] border-2 border-orange-100">
                <p className="text-[10px] font-black text-orange-400 mb-1 uppercase tracking-widest">🏛️ ETYMOLOGY 詞源小故事</p>
                <p className="text-lg text-orange-900 leading-relaxed font-bold">{current.etymology}</p>
              </div>
              <div className="p-5 bg-yellow-50 rounded-[1.5rem] border-2 border-yellow-100">
                <p className="text-[10px] font-black text-yellow-500 mb-1 uppercase tracking-widest">🍭 FUN FACT 趣味冷知識</p>
                <p className="text-lg text-yellow-900 leading-relaxed font-bold">{current.funFact}</p>
              </div>
              <div className="p-5 bg-green-50 rounded-[1.5rem] border-2 border-green-100">
                <p className="text-[10px] font-black text-green-500 mb-1 uppercase tracking-widest">REALITY SCANNER 百科補充</p>
                <p className="text-lg text-green-900 leading-relaxed font-bold">{current.realityInfo}</p>
              </div>
            </div>

            <button className="w-full mt-10 bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-slate-800 transition shadow-2xl flex items-center justify-center gap-3 active:translate-y-1">
              TAP TO EXPLORE PHOTOS & HISTORY 🖼️
            </button>
          </div>

          <div className="flex gap-8 items-center">
            <button 
              onClick={() => setIndex(prev => (prev > 0 ? prev - 1 : WORDS.length - 1))}
              className="p-6 bg-white rounded-full shadow-xl hover:bg-pink-100 text-pink-600 transition border-4 border-pink-100 hover:scale-110"
            ><ChevronLeft size={36} /></button>
            <div className="bg-white px-10 py-4 rounded-full shadow-lg border-4 border-pink-100">
              <span className="font-black text-3xl text-pink-600">{index + 1}</span>
              <span className="text-slate-300 mx-3 text-2xl font-light">/</span>
              <span className="font-bold text-2xl text-slate-400">{WORDS.length}</span>
            </div>
            <button 
              onClick={() => setIndex(prev => (prev < WORDS.length - 1 ? prev + 1 : 0))}
              className="p-6 bg-white rounded-full shadow-xl hover:bg-pink-100 text-pink-600 transition border-4 border-pink-100 hover:scale-110"
            ><ChevronRight size={36} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const EmojiDetective: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const currentWord = WORDS[step];
  
  const options = useMemo(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [currentWord, ...wrong].sort(() => 0.5 - Math.random());
  }, [step]);

  const handleChoice = (word: Word) => {
    if (word.id === currentWord.id) {
      if (step < WORDS.length - 1) setStep(step + 1);
      else onComplete();
    }
  };

  return (
    <div className="bg-yellow-50 p-8 rounded-[3rem] border-4 border-yellow-200 text-center mb-8 shadow-inner">
      <h2 className="text-4xl font-black text-yellow-700 mb-4">Emoji Detective 🔎</h2>
      <div className="bg-white p-12 rounded-[3rem] shadow-xl mb-10 relative border-4 border-yellow-100">
        <img src={POKEMON_SPRITES(54)} className="w-24 h-24 absolute -top-10 -left-10 floating" />
        <p className="text-[10rem] mb-6 drop-shadow-lg leading-none">{currentWord.emoji}</p>
        <div className="bg-yellow-100 px-8 py-3 rounded-full inline-block border-2 border-yellow-200">
          <p className="text-4xl font-black text-yellow-700">{currentWord.chinese}</p>
        </div>
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm mt-6">Find the correct English word!</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {options.map(opt => (
          <button 
            key={opt.id}
            onClick={() => handleChoice(opt)}
            className="bg-white py-10 rounded-[2.5rem] border-b-[12px] border-slate-200 hover:border-yellow-500 hover:text-yellow-600 font-black text-4xl transition transform hover:-translate-y-2 active:translate-y-2 active:border-b-0"
          >
            {opt.english}
          </button>
        ))}
      </div>
      <div className="mt-12 flex justify-center gap-3 flex-wrap">
        {WORDS.map((_, i) => (
          <div key={i} className={`h-4 rounded-full transition-all duration-500 ${i <= step ? 'bg-yellow-500 w-12' : 'bg-slate-200 w-4'}`} />
        ))}
      </div>
    </div>
  );
};

const MatchingGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [matches, setMatches] = useState<number[]>([]);
  const [selectedEng, setSelectedEng] = useState<number | null>(null);
  const [selectedChi, setSelectedChi] = useState<number | null>(null);
  const [round, setRound] = useState(0);

  const currentGroup = useMemo(() => WORDS.slice(round * 5, (round * 5) + 5), [round]);
  const shuffledChi = useMemo(() => [...currentGroup].sort(() => 0.5 - Math.random()), [currentGroup]);

  useEffect(() => {
    if (selectedEng !== null && selectedChi !== null) {
      if (selectedEng === selectedChi) {
        setMatches(prev => [...prev, selectedEng]);
      }
      setTimeout(() => { setSelectedEng(null); setSelectedChi(null); }, 500);
    }
  }, [selectedEng, selectedChi]);

  useEffect(() => {
    if (matches.length === 5) {
      setTimeout(() => {
        if ((round + 1) * 5 < WORDS.length) { setRound(round + 1); setMatches([]); }
        else onComplete();
      }, 800);
    }
  }, [matches, round, onComplete]);

  return (
    <div className="bg-purple-50 p-8 rounded-[3rem] border-4 border-purple-200 mb-8 shadow-inner">
      <h2 className="text-4xl font-black text-purple-700 text-center mb-8">Matching Pairs 🧩</h2>
      <div className="flex justify-center mb-10">
         <img src={POKEMON_SPRITES(132)} className="w-28 h-28 floating drop-shadow-xl" />
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-5">
          <p className="text-center font-black text-purple-400 text-sm uppercase tracking-[0.3em] mb-4">English 英語</p>
          {currentGroup.map(w => (
            <button 
              key={w.id}
              disabled={matches.includes(w.id)}
              onClick={() => setSelectedEng(w.id)}
              className={`w-full py-8 px-6 rounded-[2rem] border-b-[10px] font-black text-2xl transition transform active:scale-95 ${matches.includes(w.id) ? 'bg-green-100 text-green-600 border-green-300 opacity-50 grayscale' : selectedEng === w.id ? 'bg-purple-500 text-white border-purple-800 -translate-y-2' : 'bg-white border-slate-200 hover:border-purple-300'}`}
            >
              {w.english}
            </button>
          ))}
        </div>
        <div className="space-y-5">
          <p className="text-center font-black text-purple-400 text-sm uppercase tracking-[0.3em] mb-4">Chinese 中文</p>
          {shuffledChi.map(w => (
            <button 
              key={w.id}
              disabled={matches.includes(w.id)}
              onClick={() => setSelectedChi(w.id)}
              className={`w-full py-8 px-6 rounded-[2rem] border-b-[10px] font-black text-2xl transition transform active:scale-95 ${matches.includes(w.id) ? 'bg-green-100 text-green-600 border-green-300 opacity-50 grayscale' : selectedChi === w.id ? 'bg-purple-500 text-white border-purple-800 -translate-y-2' : 'bg-white border-slate-200 hover:border-purple-300'}`}
            >
              {w.chinese}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpellingBee: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const currentWord = WORDS[step];
  const [input, setInput] = useState<{ char: string; key: string }[]>([]);
  const targetLower = currentWord.english.toLowerCase();

  const letters = useMemo(() => {
    return targetLower.split('').map((c, i) => ({ char: c, key: `${c}-${i}` })).sort(() => 0.5 - Math.random());
  }, [targetLower]);

  const addLetter = (l: { char: string; key: string }) => {
    if (input.length < targetLower.length && !input.some(item => item.key === l.key)) {
      setInput([...input, l]);
    }
  };

  const removeLetter = (idx: number) => {
    const newVal = [...input];
    newVal.splice(idx, 1);
    setInput(newVal);
  };

  useEffect(() => {
    if (input.map(i => i.char).join('') === targetLower) {
      setTimeout(() => {
        if (step < WORDS.length - 1) { setStep(step + 1); setInput([]); }
        else onComplete();
      }, 600);
    }
  }, [input, targetLower, step, onComplete]);

  return (
    <div className="bg-orange-50 p-10 rounded-[3rem] border-4 border-orange-200 text-center mb-8 shadow-inner">
      <h2 className="text-4xl font-black text-orange-700 mb-8">Spelling Bee 🐝</h2>
      <div className="flex justify-center mb-10">
        <img src={POKEMON_SPRITES(15)} className="w-40 h-40 floating" />
      </div>
      <div className="bg-white inline-block px-12 py-5 rounded-[2.5rem] shadow-md border-2 border-orange-100 mb-12">
        <p className="text-5xl font-black text-slate-800">{currentWord.chinese}</p>
      </div>
      
      {/* Finger spacing targets */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 min-h-[120px] items-center">
        {targetLower.split('').map((_, i) => (
          <div 
            key={i}
            onClick={() => i < input.length && removeLetter(i)}
            className={`w-16 h-24 rounded-2xl border-b-[10px] flex items-center justify-center text-5xl font-black cursor-pointer transition transform ${input[i] ? 'bg-white border-orange-500 text-orange-600 -translate-y-3 shadow-lg' : 'bg-slate-200 border-slate-300'}`}
          >
            {input[i]?.char || ''}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {letters.map((l) => {
          const isUsed = input.some(item => item.key === l.key);
          return (
            <button 
              key={l.key}
              disabled={isUsed}
              onClick={() => addLetter(l)}
              className={`w-20 h-20 rounded-[1.5rem] shadow-xl border-b-8 text-4xl font-black transition transform hover:scale-110 active:scale-90 ${isUsed ? 'bg-slate-100 text-slate-300 border-slate-200 grayscale opacity-40' : 'bg-white border-orange-200 text-orange-600 hover:border-orange-400'}`}
            >
              {l.char}
            </button>
          );
        })}
      </div>
      <p className="mt-16 text-slate-400 font-black uppercase tracking-widest text-xs bg-white/60 px-6 py-2 rounded-full inline-block">Tap a box to remove a letter!</p>
    </div>
  );
};

const FillBlanks: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const currentWord = WORDS[step];
  const options = useMemo(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentWord, ...wrong].sort(() => 0.5 - Math.random());
  }, [step]);

  const handleChoice = (word: Word) => {
    if (word.id === currentWord.id) {
      if (step < WORDS.length - 1) setStep(step + 1);
      else onComplete();
    }
  };

  const sentenceParts = currentWord.sentence.split(new RegExp(`(${currentWord.english})`, 'i'));

  return (
    <div className="bg-indigo-50 p-10 rounded-[3rem] border-4 border-indigo-200 text-center mb-8 shadow-inner">
      <h2 className="text-4xl font-black text-indigo-700 mb-10">Fill in the Blanks ✍️</h2>
      <div className="flex justify-center mb-10">
        <img src={POKEMON_SPRITES(133)} className="w-48 h-48 floating" />
      </div>
      
      <div className="bg-white p-16 rounded-[3rem] shadow-2xl mb-14 text-4xl leading-relaxed font-bold border-[6px] border-indigo-100">
        {sentenceParts.map((part, i) => 
          part.toLowerCase() === currentWord.english.toLowerCase() ? (
            <span key={i} className="inline-block w-48 border-b-8 border-dashed border-indigo-300 mx-4 animate-pulse">&nbsp;</span>
          ) : (
            <span key={i} className="text-slate-700">{part}</span>
          )
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {options.map(opt => (
          <button 
            key={opt.id}
            onClick={() => handleChoice(opt)}
            className="bg-white py-12 rounded-[2rem] border-b-[12px] border-slate-200 hover:border-indigo-500 font-black text-4xl text-indigo-900 transition transform hover:-translate-y-2 active:translate-y-2 active:border-b-0 shadow-lg"
          >
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
};

const BubblePop: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [caughtHistory, setCaughtHistory] = useState<number[]>([]);
  const currentWord = WORDS[step];
  const options = useMemo(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 5);
    return [currentWord, ...wrong].sort(() => 0.5 - Math.random());
  }, [step]);

  const handlePop = (word: Word) => {
    if (word.id === currentWord.id) {
      const nextPoke = Math.floor(Math.random() * 150) + 1;
      setCaughtHistory(prev => [...prev, nextPoke]);
      if (step < WORDS.length - 1) setStep(step + 1);
      else onComplete();
    }
  };

  return (
    <div className="bg-[#00394d] min-h-[650px] rounded-[4rem] p-10 border-[15px] border-[#002b3a] relative overflow-hidden text-white flex flex-col items-center mb-8 shadow-2xl">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 animate-[float_6s_infinite] right-10 text-6xl">🐬</div>
        <div className="absolute bottom-1/4 animate-[float_8s_infinite] left-10 text-6xl">🐢</div>
        <div className="absolute bottom-1/3 animate-[float_5s_infinite] right-1/4 text-6xl">🐠</div>
      </div>

      <h2 className="text-5xl font-black mb-10 relative z-10 text-cyan-200 drop-shadow-lg">Ocean Bubble Pop 🌊</h2>
      
      <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] mb-16 text-center relative z-10 border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
        <p className="text-7xl font-black mb-2 text-white drop-shadow-xl">{currentWord.chinese}</p>
        <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs">Pop the English bubble!</p>
      </div>

      {/* Fixed Grid 2x3 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-12 mb-16 relative z-10">
        {options.map((opt, i) => (
          <button 
            key={`${step}-${i}`}
            onClick={() => handlePop(opt)}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-300/40 to-blue-500/30 border-4 border-cyan-100/60 flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-125 transition-all duration-300 active:scale-95 group"
          >
            <span className="drop-shadow-md group-hover:scale-110 transition">{opt.english}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto w-full max-w-xl bg-cyan-950/60 backdrop-blur-xl p-8 rounded-[3rem] flex items-center justify-center gap-8 relative z-10 border-2 border-cyan-800 shadow-2xl">
        <div className="relative group">
          <img src="https://www.freeiconspng.com/uploads/shell-icon-24.png" className="w-32 h-32 drop-shadow-2xl" />
          <div className="absolute inset-0 flex flex-wrap items-center justify-center p-6 gap-2">
            {caughtHistory.slice(-8).map((pid, idx) => (
               <img key={idx} src={POKEMON_SPRITES(pid)} className="w-8 h-8 animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-black text-3xl text-cyan-100 uppercase tracking-tighter">Shell Collection</p>
          <p className="text-cyan-400 font-black text-sm mt-1">Catch them all on your giant shell!</p>
        </div>
      </div>
    </div>
  );
};

const WordSearchGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [round, setRound] = useState(0);
  const WORDS_PER_ROUND = 5;
  const totalRounds = Math.ceil(WORDS.length / WORDS_PER_ROUND);

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [selection, setSelection] = useState<{start: [number, number], end: [number, number]} | null>(null);
  
  const targetWords = useMemo(() => 
    WORDS.slice(round * WORDS_PER_ROUND, (round + 1) * WORDS_PER_ROUND).map(w => w.english.toLowerCase())
  , [round]);

  const gridSize = 10;
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    targetWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const direction = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * (direction === 'H' ? gridSize : gridSize - word.length));
        const col = Math.floor(Math.random() * (direction === 'V' ? gridSize : gridSize - word.length));
        let possible = true;
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'V' ? row + i : row;
          const c = direction === 'H' ? col + i : col;
          if (newGrid[r][c] !== '' && newGrid[r][c] !== word[i]) { possible = false; break; }
        }
        if (possible) {
          for (let i = 0; i < word.length; i++) {
            const r = direction === 'V' ? row + i : row;
            const c = direction === 'H' ? col + i : col;
            newGrid[r][c] = word[i];
          }
          placed = true;
        }
      }
    });
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (newGrid[r][c] === '') newGrid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
    }
    setGrid(newGrid);
  }, [targetWords]);

  const handleCellClick = (r: number, c: number) => {
    if (!selection) {
      setSelection({ start: [r, c], end: [r, c] });
    } else {
      const start = selection.start;
      const end: [number, number] = [r, c];
      let word = '';
      let cells: string[] = [];
      if (start[0] === end[0]) {
        const min = Math.min(start[1], end[1]), max = Math.max(start[1], end[1]);
        for (let i = min; i <= max; i++) { word += grid[start[0]][i]; cells.push(`${start[0]}-${i}`); }
      } else if (start[1] === end[1]) {
        const min = Math.min(start[0], end[0]), max = Math.max(start[0], end[0]);
        for (let i = min; i <= max; i++) { word += grid[i][start[1]]; cells.push(`${i}-${start[1]}`); }
      }
      const rev = word.split('').reverse().join('');
      if (targetWords.includes(word) && !foundWords.includes(word)) {
        setFoundWords(prev => [...prev, word]);
        setFoundCells(prev => new Set([...prev, ...cells]));
      } else if (targetWords.includes(rev) && !foundWords.includes(rev)) {
        setFoundWords(prev => [...prev, rev]);
        setFoundCells(prev => new Set([...prev, ...cells]));
      }
      setSelection(null);
    }
  };

  useEffect(() => {
    if (foundWords.length === targetWords.length && targetWords.length > 0) {
      if ((round + 1) < totalRounds) {
        setTimeout(() => {
          setRound(prev => prev + 1);
          setFoundWords([]);
          setFoundCells(new Set());
        }, 1200);
      } else {
        setTimeout(onComplete, 1200);
      }
    }
  }, [foundWords, targetWords, round, totalRounds, onComplete]);

  return (
    <div className="bg-emerald-50 p-10 rounded-[3rem] border-4 border-emerald-200 mb-8 shadow-inner">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black text-emerald-800">Word Search 🔍</h2>
        <div className="bg-white px-6 py-2 rounded-full border-2 border-emerald-100 font-black text-emerald-600">
          Round {round + 1} / {totalRounds}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-[3rem] shadow-2xl inline-block mx-auto border-4 border-emerald-100">
          <div className="grid grid-cols-10 gap-2">
            {grid.map((row, r) => row.map((char, c) => {
              const isFound = foundCells.has(`${r}-${c}`);
              const isSelected = selection?.start[0] === r && selection?.start[1] === c;
              return (
                <button 
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-black text-2xl rounded-xl transition-all duration-300 transform active:scale-90 ${isFound ? 'bg-emerald-500 text-white shadow-inner scale-105 rotate-3' : isSelected ? 'bg-yellow-400 text-white shadow-lg animate-pulse' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-200'}`}
                >
                  {char}
                </button>
              );
            }))}
          </div>
        </div>
        <div>
          <div className="bg-white p-8 rounded-[2rem] border-4 border-emerald-100 shadow-lg">
            <h3 className="text-2xl font-black mb-6 text-emerald-800 border-b-4 border-emerald-50 pb-3 flex items-center gap-2">
              <img src={POKEMON_SPRITES(1)} className="w-10 h-10" /> Find these words:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {targetWords.map(w => {
                const isFound = foundWords.includes(w);
                const wordObj = WORDS.find(item => item.english.toLowerCase() === w);
                return (
                  <div key={w} className={`px-6 py-4 rounded-[1.5rem] font-black text-2xl transition-all duration-500 border-2 flex justify-between items-center ${isFound ? 'bg-emerald-500 text-white border-emerald-600 line-through scale-95 opacity-50 shadow-inner' : 'bg-slate-50 text-emerald-600 border-slate-100 shadow-sm'}`}>
                    <span>{w}</span>
                    <span className="text-sm opacity-60">{wordObj?.chinese}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 p-5 bg-emerald-100/50 rounded-2xl">
               <p className="font-bold text-emerald-700 text-sm italic">"Tap the start and end of each word to collect it!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PokemonBattle: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [playerHp, setPlayerHp] = useState(100), [enemyHp, setEnemyHp] = useState(100), [step, setStep] = useState(0);
  const currentWord = WORDS[step % WORDS.length];
  const options = useMemo(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentWord, ...wrong].sort(() => 0.5 - Math.random());
  }, [step]);

  const handleAttack = (word: Word) => {
    if (word.id === currentWord.id) setEnemyHp(prev => Math.max(0, prev - 25));
    else setPlayerHp(prev => Math.max(0, prev - 10));
    setStep(prev => prev + 1);
  };

  useEffect(() => { if (enemyHp <= 0) setTimeout(onComplete, 1200); }, [enemyHp, onComplete]);

  return (
    <div className="bg-slate-900 rounded-[4rem] p-12 border-[12px] border-slate-800 min-h-[650px] flex flex-col text-white mb-8 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-20">
        <div className="bg-white p-8 rounded-[2.5rem] text-slate-800 w-64 shadow-[0_12px_0_#cbd5e1] border-4 border-slate-200">
          <div className="flex justify-between font-black text-2xl mb-2"><span>Pikachu</span><span className="text-sm text-slate-400">Lv.30</span></div>
          <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden border-2 border-slate-200">
            <div className={`h-full transition-all duration-1000 ${playerHp > 50 ? 'bg-green-500' : playerHp > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${playerHp}%` }} />
          </div>
        </div>
        <img src={POKEMON_SPRITES(150)} className="w-56 h-56 floating relative z-10 drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
      </div>

      <div className="flex justify-between items-end mb-20">
        <img src={POKEMON_SPRITES(25)} className="w-56 h-56 relative z-10 drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]" />
        <div className="bg-white p-8 rounded-[2.5rem] text-slate-800 w-64 shadow-[0_12px_0_#cbd5e1] border-4 border-slate-200">
          <div className="flex justify-between font-black text-2xl mb-2"><span>Mewtwo</span><span className="text-sm text-slate-400">Lv.99</span></div>
          <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden border-2 border-slate-200">
            <div className={`h-full transition-all duration-1000 ${enemyHp > 50 ? 'bg-green-500' : enemyHp > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${enemyHp}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-auto bg-slate-800/90 backdrop-blur-2xl p-10 rounded-[3rem] text-white border-4 border-slate-700 shadow-2xl">
        <p className="text-3xl font-black mb-6 text-yellow-400">BATTLE QUIZ! ⚡</p>
        <p className="bg-slate-900/60 p-10 rounded-[2rem] border-4 border-slate-700 mb-10 italic text-4xl font-black tracking-wide leading-relaxed">
          {currentWord.sentence.split(new RegExp(currentWord.english, 'gi')).map((p, i, a) => (
            <React.Fragment key={i}>
              {p}{i < a.length - 1 && <span className="text-yellow-400 border-b-4 border-yellow-400 px-6 inline-block min-w-[120px]">&nbsp;</span>}
            </React.Fragment>
          ))}
        </p>
        <div className="grid grid-cols-2 gap-6">
          {options.map(opt => (
            <button key={opt.id} onClick={() => handleAttack(opt)} className="bg-white text-slate-900 p-8 rounded-[2rem] font-black text-3xl hover:bg-yellow-400 transition transform hover:-translate-y-2 active:translate-y-2 shadow-xl border-b-[10px] border-slate-200 hover:border-yellow-600">
              {opt.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MemoryGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'MEMORIZE' | 'SELECT'>('MEMORIZE'), [timer, setTimer] = useState(10), [words, setWords] = useState<Word[]>([]), [missingWord, setMissingWord] = useState<Word | null>(null), [options, setOptions] = useState<Word[]>([]);
  const startRound = () => {
    const selected = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 8); setWords(selected);
    const missing = selected[Math.floor(Math.random() * selected.length)]; setMissingWord(missing);
    const others = WORDS.filter(w => !selected.includes(w)).sort(() => 0.5 - Math.random()).slice(0, 7);
    setOptions([...others, missing].sort(() => 0.5 - Math.random())); setPhase('MEMORIZE'); setTimer(10);
  };
  useEffect(() => { startRound(); }, []);
  useEffect(() => {
    if (phase === 'MEMORIZE' && timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); }
    else if (phase === 'MEMORIZE' && timer === 0) setPhase('SELECT');
  }, [timer, phase]);
  const handleChoice = (word: Word) => { if (word.id === missingWord?.id) onComplete(); else startRound(); };

  return (
    <div className="bg-pink-50 p-12 rounded-[4rem] border-4 border-pink-200 text-center mb-8 shadow-inner">
      <h2 className="text-5xl font-black text-pink-700 mb-12 uppercase tracking-tighter">Memory Challenge 🧠</h2>
      {phase === 'MEMORIZE' ? (
        <>
          <div className="mb-14 flex flex-col items-center">
            <div className="w-32 h-32 bg-pink-500 text-white rounded-full flex items-center justify-center text-6xl font-black shadow-2xl animate-pulse border-8 border-pink-400">{timer}</div>
            <p className="text-pink-600 font-black text-2xl mt-8">Look closely! Remember these 8 words!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {words.map(w => (
              <div key={w.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-pink-100 flex flex-col items-center transform hover:scale-110 transition duration-300">
                <span className="text-7xl mb-4 drop-shadow-md">{w.emoji}</span>
                <span className="font-black text-3xl text-slate-800">{w.english}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl font-black text-pink-600 mb-16 uppercase">Which word is missing? 🤔</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 opacity-10 grayscale blur-xl pointer-events-none scale-90 transition-all duration-1000">
            {words.filter(w => w.id !== missingWord?.id).map(w => (
              <div key={w.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center"><span className="text-7xl mb-4">{w.emoji}</span><span className="font-black text-3xl">{w.english}</span></div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {options.map(opt => (
              <button key={opt.id} onClick={() => handleChoice(opt)} className="bg-white p-10 rounded-[2.5rem] border-b-[12px] border-slate-200 hover:border-pink-500 hover:text-pink-600 font-black text-3xl transition transform hover:-translate-y-3 active:translate-y-2 active:border-b-0 shadow-2xl uppercase">
                {opt.english}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
