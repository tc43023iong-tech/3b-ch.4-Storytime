
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GameMode, Word } from './types';
import { 
  BookOpen, 
  Gamepad2, 
  Search, 
  Puzzle, 
  Keyboard, 
  Edit3, 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  Play as PlayIcon, 
  List as ListIcon, 
  Library,
  Waves,
  Info,
  Star,
  Pencil,
  RotateCcw
} from 'lucide-react';

const WORDS: Word[] = [
  { id: 1, english: 'foolish', chinese: '愚蠢', pronunciation: '/ˈfuːlɪʃ/', emoji: '🤡', syllables: 'fool-ish', breakdown: 'fool (dummy) + ish (like)', etymology: 'From Old French "fol" (madman). 來自古法語 "fol"（瘋子）。', funFact: 'In fables, the donkey is often the foolish one! 在寓言中，驢子通常是幽默的一方！', sentence: 'The foolish crow dropped its cheese.', realityInfo: 'Foolishness in nature is rare; animals usually act for survival. 自然界中很少見到愚蠢行為；動物通常是為了生存而行動。' },
  { id: 2, english: 'clever', chinese: '聰明', pronunciation: '/ˈklevə/', emoji: '💡', syllables: 'clev-er', breakdown: 'clever (smart)', etymology: 'Middle English word originally meaning "handy". 中世紀英語，原指「手巧」。', funFact: 'Crows and dolphins are some of the cleverest animals! 烏鴉和海豚是極其聰明的動物！', sentence: 'The clever fox tricked the crow.', realityInfo: 'Octopuses are so clever they can open jars! 章魚聰明到能打開罐子！' },
  { id: 3, english: 'poor', chinese: '貧窮', pronunciation: '/pɔː/', emoji: '🏚️', syllables: 'poor', breakdown: 'poor', etymology: 'From Latin "pauper" (scanty). 來自拉丁語 "pauper"（貧乏的）。', funFact: 'The fisherman in the story started as a poor man. 故事中的漁夫一開始是個窮人處理。', sentence: 'The poor man lived in a small hut.', realityInfo: 'Global poverty has been decreasing globally. 全球貧困人口正在逐漸減少。' },
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
  { id: 15, english: 'fable', chinese: '寓言', pronunciation: '/ˈfeɪbl/', emoji: '📖', syllables: 'fa-ble', breakdown: 'fable', etymology: 'Latin "fabula" (story). 來自拉丁語 "fabula"（故事）。', funFact: 'Aesop is a famous writer of fables. 伊索是著名的寓言作家處理。', sentence: 'The Tortoise and the Hare is a famous fable.', realityInfo: 'Fables usually have talking animals. 寓言通常以會說話的動物為主角。' },
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

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>(GameMode.MENU);
  const [score, setScore] = useState(0);

  const addScore = (pts: number) => setScore(prev => prev + pts);

  return (
    <div className="min-h-screen pb-24 crayon-text selection:bg-pink-100 scribble-bg">
      <header className="p-4 flex justify-between items-center bg-white/60 backdrop-blur-md sticky top-0 z-20 border-b-4 border-[#5d4037]/30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode(GameMode.MENU)}>
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center crayon-border border-[#5d4037]">
            <Pencil className="text-[#5d4037]" size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#5d4037] tracking-tight leading-none">Crayon P3</h1>
            <p className="text-xs font-bold text-[#8d6e63]">Ch4 Storytime</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#fff9c4] px-5 py-2 crayon-border border-[#5d4037] crayon-shadow rotate-1">
          <Star className="text-amber-500 fill-amber-500 floating" size={24} />
          <span className="text-3xl font-black">{score}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-4">
        {mode === GameMode.MENU && <MainMenu setMode={setMode} />}
        {mode === GameMode.REVIEW && <WordReview setMode={setMode} />}
        {mode === GameMode.DIARY && <DiaryReview onBack={() => setMode(GameMode.MENU)} />}
        {mode === GameMode.DETECTIVE && <EmojiDetective onComplete={() => { addScore(10); setMode(GameMode.MENU); }} />}
        {mode === GameMode.MATCHING && <MatchingGame onComplete={() => { addScore(15); setMode(GameMode.MENU); }} />}
        {mode === GameMode.SPELLING && <SpellingBee onComplete={() => { addScore(20); setMode(GameMode.MENU); }} />}
        {mode === GameMode.FILL_BLANKS && <FillBlanks onComplete={() => { addScore(20); setMode(GameMode.MENU); }} />}
        {mode === GameMode.BUBBLE_POP && <BubblePop onComplete={() => { addScore(25); setMode(GameMode.MENU); }} />}
        {mode === GameMode.WORD_SEARCH && <WordSearchGame onComplete={() => { addScore(30); setMode(GameMode.MENU); }} />}
        {mode === GameMode.MEMORY && <MemoryGame onComplete={() => { addScore(25); setMode(GameMode.MENU); }} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-around items-center overflow-x-auto gap-2 z-30 border-t-4 border-[#5d4037]">
        {[
          { m: GameMode.MENU, icon: <Library />, label: '主頁' },
          { m: GameMode.REVIEW, icon: <BookOpen />, label: '清單' },
          { m: GameMode.DIARY, icon: <Info />, label: '日記' },
          { m: GameMode.DETECTIVE, icon: <Search />, label: '偵探' },
          { m: GameMode.MATCHING, icon: <Puzzle />, label: '配對' },
          { m: GameMode.SPELLING, icon: <Keyboard />, label: '拼寫' },
          { m: GameMode.FILL_BLANKS, icon: <Edit3 />, label: '填空' },
          { m: GameMode.BUBBLE_POP, icon: <Waves />, label: '泡泡' },
          { m: GameMode.WORD_SEARCH, icon: <Gamepad2 />, label: '搜索' },
          { m: GameMode.MEMORY, icon: <Brain />, label: '記憶' },
        ].map(item => (
          <button 
            key={item.m}
            onClick={() => setMode(item.m)}
            className={`flex flex-col items-center p-3 min-w-[64px] rounded-2xl transition-all ${mode === item.m ? 'bg-amber-100 text-[#5d4037] scale-110' : 'text-slate-400 hover:text-[#5d4037]'}`}
          >
            {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
            <span className="text-[11px] font-bold mt-1 tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const MainMenu: React.FC<{ setMode: (m: GameMode) => void }> = ({ setMode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
    <div className="bg-[#fff9c4] p-12 crayon-border border-[#5d4037] flex flex-col items-center text-center crayon-shadow group rotate-[-1deg]">
      <div className="text-9xl mb-6 floating">🎨</div>
      <h2 className="text-5xl font-black mb-6 text-[#5d4037]">小小畫家課！</h2>
      <p className="text-[#795548] mb-10 font-bold text-2xl leading-snug">拿起你的彩色鉛筆，<br/>跟著小熊一起畫出英語單詞！</p>
      <button 
        onClick={() => setMode(GameMode.REVIEW)}
        className="hand-drawn-btn bg-[#ffa726] text-white px-12 py-5 font-black text-3xl shadow-[5px_5px_0px_#5d4037] active:shadow-none active:translate-y-1"
      >
        開始吧！ 🖍️
      </button>
    </div>
    <div className="grid grid-cols-2 gap-5">
      {[
        { m: GameMode.DETECTIVE, label: '表情偵探', icon: '🔎', color: '#e1f5fe' },
        { m: GameMode.MATCHING, label: '魔法配對', icon: '🧩', color: '#f3e5f5' },
        { m: GameMode.SPELLING, label: '勤勞蜜蜂', icon: '🐝', color: '#fff3e0' },
        { m: GameMode.BUBBLE_POP, label: '糖果泡泡', icon: '🫧', color: '#e0f2f1' },
        { m: GameMode.WORD_SEARCH, label: '秘密搜索', icon: '🔍', color: '#f1f8e9' },
        { m: GameMode.MEMORY, label: '記憶拼圖', icon: '🧠', color: '#fce4ec' },
      ].map((game, i) => (
        <button 
          key={game.m}
          onClick={() => setMode(game.m)}
          style={{ backgroundColor: game.color, transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 1)}deg)` }}
          className="hand-drawn-btn p-6 shadow-[4px_4px_0px_#5d4037] flex flex-col items-center border-[#5d4037]"
        >
          <span className="text-5xl mb-3">{game.icon}</span>
          <span className="font-black text-[#5d4037] text-xl leading-none">{game.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const WordReview: React.FC<{ setMode: (m: GameMode) => void }> = ({ setMode }) => (
  <div className="bg-white p-10 mb-8 crayon-border border-[#5d4037] crayon-shadow relative overflow-hidden">
    <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-amber-200 rounded-full opacity-50 blur-xl"></div>
    <div className="flex items-center gap-6 mb-10 border-b-4 border-dashed border-[#d7ccc8] pb-6">
      <span className="text-6xl floating">🎒</span>
      <div>
        <h2 className="text-4xl font-black text-[#5d4037]">第四課：故事冒險</h2>
        <p className="text-[#8d6e63] font-bold text-xl">Vocabulary Master List</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {WORDS.map(word => (
        <div key={word.id} className="flex items-center gap-5 p-5 crayon-border border-[#5d4037]/20 bg-[#fffcf5] group hover:bg-[#fff9c4] transition-colors rotate-[0.5deg]">
          <span className="text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow-sm">{word.emoji}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-[#5d4037]">{word.english}</h3>
            <p className="text-[#8d6e63] font-mono text-sm italic">{word.pronunciation}</p>
          </div>
          <span className="bg-white px-5 py-2 crayon-border border-[#d7ccc8] text-[#795548] font-black text-xl">{word.chinese}</span>
        </div>
      ))}
    </div>
    <button 
      onClick={() => setMode(GameMode.MENU)}
      className="w-full mt-12 hand-drawn-btn bg-[#8bc34a] text-white py-6 font-black text-3xl shadow-[6px_6px_0px_#33691e]"
    >
      準備好開始遊戲！ 🎨
    </button>
  </div>
);

const DiaryReview: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [view, setView] = useState<'LIST' | 'CARDS'>('LIST');
  const [index, setIndex] = useState(0);
  const current = WORDS[index];

  return (
    <div className="bg-[#fce4ec] min-h-[600px] p-10 crayon-border border-[#5d4037] mb-8 crayon-shadow rotate-[0.2deg]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black text-[#ad1457] flex items-center gap-3">
          <Library className="text-[#ec407a]" size={32} /> 單詞學習日記
        </h2>
        <div className="flex bg-white rounded-full p-2 border-2 border-[#5d4037]">
          {[
            { id: 'LIST', label: '清單', icon: <ListIcon size={18} /> },
            { id: 'CARDS', label: '卡片', icon: <Library size={18} /> }
          ].map(v => (
            <button 
              key={v.id}
              onClick={() => setView(v.id as any)}
              className={`px-8 py-2 rounded-full text-lg font-black transition flex items-center gap-2 ${view === v.id ? 'bg-[#ec407a] text-white' : 'text-slate-400'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === 'LIST' && (
        <div className="bg-white rounded-[2rem] overflow-hidden border-4 border-[#5d4037] crayon-shadow">
          <div className="bg-[#fce4ec] p-5 grid grid-cols-3 font-black text-[#ad1457] border-b-4 border-[#5d4037] text-lg uppercase">
            <span>英語單詞</span>
            <span className="text-center">中文含義</span>
            <span className="text-right">表情</span>
          </div>
          <div className="max-h-[500px] overflow-y-auto custom-scroll">
            {WORDS.map((w, i) => (
              <button 
                key={w.id}
                onClick={() => { setIndex(i); setView('CARDS'); }}
                className="w-full grid grid-cols-3 p-6 items-center hover:bg-[#fff9f0] transition-colors border-b-2 border-dashed border-[#f8bbd0] group"
              >
                <span className="font-black text-left text-3xl text-[#ec407a] group-hover:translate-x-3 transition-transform">{w.english}</span>
                <span className="text-[#795548] text-center font-black text-2xl">{w.chinese}</span>
                <span className="text-4xl text-right">{w.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'CARDS' && (
        <div className="flex flex-col items-center gap-10">
          <div className="w-full max-w-lg bg-white rounded-[3rem] p-12 shadow-xl relative border-4 border-[#5d4037] crayon-shadow rotate-[-1deg]">
            <div className="text-center mb-12">
              <span className="text-9xl mb-6 block drop-shadow-md floating">{current.emoji}</span>
              <h3 className="text-7xl font-black text-[#ec407a] mb-4">{current.english}</h3>
              <div className="bg-[#fce4ec] px-10 py-3 crayon-border border-[#5d4037] inline-block">
                <span className="text-4xl font-black text-[#880e4f]">{current.chinese}</span>
              </div>
              <p className="text-2xl text-slate-300 mt-6 font-mono font-bold italic">{current.pronunciation}</p>
            </div>

            <div className="space-y-6">
              {[
                { label: '🗣️ 音節劃分', val: current.syllables, bg: '#e3f2fd', border: '#bbdefb' },
                { label: '🧩 單詞拆解', val: current.breakdown, bg: '#f3e5f5', border: '#e1bee7' },
                { label: '🏛️ 詞源故事', val: current.etymology, bg: '#fff3e0', border: '#ffe0b2' },
                { label: '🍭 趣味冷知識', val: current.funFact, bg: '#fffde7', border: '#fff9c4' },
                { label: '📚 知識掃描', val: current.realityInfo, bg: '#f1f8e9', border: '#dcedc8' }
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: item.bg, borderColor: item.border }} className="p-5 rounded-[1.5rem] border-2 border-dashed">
                  <p className="text-xs font-black text-[#5d4037]/60 mb-1 uppercase tracking-widest">{item.label}</p>
                  <p className="text-xl font-bold text-[#5d4037] leading-relaxed">{item.val}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mt-12">
               <button onClick={() => setIndex(prev => (prev > 0 ? prev - 1 : WORDS.length - 1))} className="flex-1 hand-drawn-btn bg-white py-5 text-[#ec407a] border-[#5d4037] font-black text-2xl shadow-[4px_4px_0px_#5d4037]">上一個</button>
               <button onClick={() => setIndex(prev => (prev < WORDS.length - 1 ? prev + 1 : 0))} className="flex-1 hand-drawn-btn bg-[#ec407a] py-5 text-white border-[#5d4037] font-black text-2xl shadow-[4px_4px_0px_#880e4f]">下一個</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* WORD SEARCH GAME - Final Crayon Redesign with Auto-find & Lowercase */
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
  const wordPositions = useRef<Record<string, string[]>>({});

  useEffect(() => {
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const positions: Record<string, string[]> = {};
    
    targetWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 200) {
        attempts++;
        const direction = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * (direction === 'H' ? gridSize : gridSize - word.length));
        const col = Math.floor(Math.random() * (direction === 'V' ? gridSize : gridSize - word.length));
        let possible = true;
        let tempCells: string[] = [];
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'V' ? row + i : row;
          const c = direction === 'H' ? col + i : col;
          if (newGrid[r][c] !== '' && newGrid[r][c] !== word[i]) { possible = false; break; }
          tempCells.push(`${r}-${c}`);
        }
        if (possible) {
          for (let i = 0; i < word.length; i++) {
            const r = direction === 'V' ? row + i : row;
            const c = direction === 'H' ? col + i : col;
            newGrid[r][c] = word[i];
          }
          positions[word] = tempCells;
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
    wordPositions.current = positions;
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

  const autoFindWord = (w: string) => {
    if (foundWords.includes(w)) return;
    const cells = wordPositions.current[w];
    if (cells) {
      setFoundWords(prev => [...prev, w]);
      setFoundCells(prev => new Set([...prev, ...cells]));
    }
  };

  useEffect(() => {
    if (foundWords.length === targetWords.length && targetWords.length > 0) {
      if ((round + 1) < totalRounds) {
        setTimeout(() => { setRound(prev => prev + 1); setFoundWords([]); setFoundCells(new Set()); }, 1200);
      } else {
        setTimeout(onComplete, 1200);
      }
    }
  }, [foundWords, targetWords, round, totalRounds, onComplete]);

  return (
    <div className="bg-[#f1f8e9] p-12 rounded-[3rem] border-4 border-[#5d4037] mb-8 shadow-[8px_8px_0px_#a5d6a7] rotate-[-0.5deg]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-5xl font-black text-[#2e7d32]">秘密搜索遊戲 🔍</h2>
        <div className="bg-white px-8 py-3 crayon-border border-[#5d4037] font-black text-[#2e7d32] text-2xl">
          第 {round + 1} / {totalRounds} 關
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl inline-block mx-auto border-4 border-[#5d4037]">
          <div className="grid grid-cols-10 gap-1 md:gap-3">
            {grid.map((row, r) => row.map((char, c) => {
              const isFound = foundCells.has(`${r}-${c}`);
              const isSelected = selection?.start[0] === r && selection?.start[1] === c;
              return (
                <button 
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-black text-2xl md:text-3xl rounded-xl transition-all transform active:scale-90 ${isFound ? 'bg-[#c8e6c9] text-[#2e7d32] border-2 border-[#5d4037]/30 scale-105 rotate-3' : isSelected ? 'bg-[#fff176] text-[#5d4037] border-2 border-[#5d4037] animate-pulse' : 'bg-[#f1f8e9] text-[#5d4037] border-2 border-transparent hover:border-[#5d4037]/20 hover:bg-[#dcedc8]'}`}
                >
                  {char}
                </button>
              );
            }))}
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] border-4 border-[#5d4037] crayon-shadow">
          <h3 className="text-3xl font-black mb-8 text-[#2e7d32] border-b-4 border-dashed border-[#dcedc8] pb-4">請在畫板中點出：</h3>
          <div className="grid grid-cols-1 gap-5">
            {targetWords.map(w => {
              const isFound = foundWords.includes(w);
              const wordObj = WORDS.find(item => item.english.toLowerCase() === w);
              return (
                <button 
                  key={w} 
                  onClick={() => autoFindWord(w)}
                  className={`px-8 py-4 rounded-[1.5rem] font-black text-3xl transition-all border-4 flex justify-between items-center group relative ${isFound ? 'bg-[#81c784] text-white border-[#2e7d32] line-through opacity-50 shadow-inner translate-x-1' : 'bg-white text-[#2e7d32] border-[#5d4037] shadow-[5px_5px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'}`}
                >
                  <span className="group-hover:translate-x-2 transition-transform">{w}</span>
                  <span className="text-lg font-bold opacity-80">{wordObj?.chinese}</span>
                  {isFound && <div className="absolute inset-0 bg-white/10 flex items-center justify-center">✅</div>}
                </button>
              );
            })}
          </div>
          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border-4 border-dashed border-[#5d4037]/20 text-center">
             <p className="font-bold text-[#5d4037] text-xl italic flex items-center justify-center gap-2">
               <Star size={24} className="text-amber-400 fill-amber-400" /> 
               小畫家提示：點擊列表中的單詞，<br/>我會直接幫你標出來喔！
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmojiDetective: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

  return (
    <div className="bg-[#e1f5fe] p-12 rounded-[4rem] border-4 border-[#5d4037] text-center mb-8 shadow-[8px_8px_0px_#81d4fa] rotate-[1deg]">
      <h2 className="text-5xl font-black text-[#01579b] mb-10">小小偵探事務所 🔎</h2>
      <div className="bg-white p-14 rounded-[3.5rem] shadow-xl mb-12 relative border-4 border-[#5d4037] crayon-shadow">
        <p className="text-[12rem] mb-8 drop-shadow-xl leading-none floating">{currentWord.emoji}</p>
        <div className="bg-[#b3e5fc] px-12 py-4 rounded-full border-4 border-[#5d4037] inline-block">
          <p className="text-5xl font-black text-[#01579b]">{currentWord.chinese}</p>
        </div>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm mt-8">找出對應的英語單詞！</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {options.map(opt => (
          <button key={opt.id} onClick={() => handleChoice(opt)} className="hand-drawn-btn bg-white py-12 font-black text-5xl text-[#01579b] border-[#5d4037] shadow-[6px_6px_0px_#5d4037]">
            {opt.english}
          </button>
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
      if (selectedEng === selectedChi) setMatches(prev => [...prev, selectedEng]);
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
    <div className="bg-[#f3e5f5] p-12 rounded-[4rem] border-4 border-[#5d4037] mb-8 shadow-[8px_8px_0px_#ce93d8] rotate-[-1deg]">
      <h2 className="text-5xl font-black text-[#4a148c] text-center mb-12">神奇單詞連連看 🧩</h2>
      <div className="grid grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-center font-black text-[#7b1fa2] text-2xl mb-6">English 🎒</p>
          {currentGroup.map(w => (
            <button key={w.id} disabled={matches.includes(w.id)} onClick={() => setSelectedEng(w.id)}
              className={`w-full py-10 px-8 hand-drawn-btn font-black text-3xl transition-all ${matches.includes(w.id) ? 'bg-[#c8e6c9] text-[#2e7d32] opacity-40 shadow-none' : selectedEng === w.id ? 'bg-[#7b1fa2] text-white shadow-none translate-y-2' : 'bg-white text-[#4a148c] shadow-[6px_6px_0px_#5d4037]'}`}
            >
              {w.english}
            </button>
          ))}
        </div>
        <div className="space-y-8">
          <p className="text-center font-black text-[#7b1fa2] text-2xl mb-6">中文 🎨</p>
          {shuffledChi.map(w => (
            <button key={w.id} disabled={matches.includes(w.id)} onClick={() => setSelectedChi(w.id)}
              className={`w-full py-10 px-8 hand-drawn-btn font-black text-3xl transition-all ${matches.includes(w.id) ? 'bg-[#c8e6c9] text-[#2e7d32] opacity-40 shadow-none' : selectedChi === w.id ? 'bg-[#7b1fa2] text-white shadow-none translate-y-2' : 'bg-white text-[#4a148c] shadow-[6px_6px_0px_#5d4037]'}`}
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
  const letters = useMemo(() => targetLower.split('').map((c, i) => ({ char: c, key: `${c}-${i}` })).sort(() => 0.5 - Math.random()), [targetLower]);

  useEffect(() => {
    if (input.map(i => i.char).join('') === targetLower) {
      setTimeout(() => {
        if (step < WORDS.length - 1) { setStep(step + 1); setInput([]); }
        else onComplete();
      }, 600);
    }
  }, [input, targetLower, step, onComplete]);

  return (
    <div className="bg-[#fff3e0] p-12 rounded-[4rem] border-4 border-[#5d4037] text-center mb-8 shadow-[8px_8px_0px_#ffcc80] rotate-[0.5deg]">
      <h2 className="text-5xl font-black text-[#e65100] mb-12">拼寫大冒險 🐝</h2>
      <div className="bg-white inline-block px-14 py-6 rounded-[3rem] shadow-lg border-4 border-[#5d4037] mb-14">
        <p className="text-7xl font-black text-[#e65100] leading-none">{currentWord.chinese}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-20 min-h-[140px] items-center">
        {targetLower.split('').map((_, i) => (
          <div key={i} onClick={() => i < input.length && setInput(input.slice(0, i))} 
            className={`w-16 h-24 rounded-3xl border-4 border-[#5d4037] flex items-center justify-center text-5xl font-black cursor-pointer transition-all ${input[i] ? 'bg-white text-[#e65100] scale-110 shadow-md rotate-[-2deg]' : 'bg-[#ffe0b2] border-dashed border-[#5d4037]/30'}`}
          >
            {input[i]?.char || ''}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {letters.map((l) => {
          const isUsed = input.some(item => item.key === l.key);
          return (
            <button key={l.key} disabled={isUsed} onClick={() => setInput([...input, l])}
              className={`w-20 h-20 hand-drawn-btn shadow-[4px_4px_0px_#5d4037] text-4xl font-black transition-all ${isUsed ? 'bg-slate-100 opacity-20 rotate-[-5deg]' : 'bg-white text-[#e65100] hover:scale-110'}`}
            >
              {l.char}
            </button>
          );
        })}
      </div>
      <button onClick={() => setInput([])} className="mt-14 hand-drawn-btn bg-white px-8 py-3 text-slate-400 font-black flex items-center gap-2 mx-auto">
        <RotateCcw size={18}/> 重填一次
      </button>
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

  return (
    <div className="bg-[#e8eaf6] p-12 rounded-[4rem] border-4 border-[#5d4037] text-center mb-8 shadow-[8px_8px_0px_#c5cae9] rotate-[-0.5deg]">
      <h2 className="text-5xl font-black text-[#1a237e] mb-12">故事大拼圖 ✍️</h2>
      <div className="bg-white p-14 rounded-[3.5rem] shadow-xl mb-16 text-5xl leading-relaxed font-bold border-4 border-[#5d4037] crayon-shadow">
        {currentWord.sentence.split(new RegExp(`(${currentWord.english})`, 'i')).map((part, i) => 
          part.toLowerCase() === currentWord.english.toLowerCase() ? (
            <span key={i} className="inline-block w-48 border-b-8 border-dashed border-[#1a237e] mx-6 animate-pulse">&nbsp;</span>
          ) : ( <span key={i} className="text-[#5d4037]">{part}</span> )
        )}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {options.map(opt => (
          <button key={opt.id} onClick={() => handleChoice(opt)} className="hand-drawn-btn bg-white py-12 font-black text-4xl text-[#1a237e] shadow-[6px_6px_0px_#5d4037] hover:bg-[#e8eaf6]">
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
};

const BubblePop: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showFirework, setShowFirework] = useState(false);
  const currentWord = WORDS[step];
  const options = useMemo(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 5);
    return [currentWord, ...wrong].sort(() => 0.5 - Math.random());
  }, [step]);

  const handlePop = (word: Word) => {
    if (word.id === currentWord.id) {
      setShowFirework(true);
      setTimeout(() => {
        setShowFirework(false);
        if (step < WORDS.length - 1) setStep(step + 1);
        else onComplete();
      }, 1200);
    }
  };

  return (
    <div className="bg-[#e0f7fa] min-h-[650px] rounded-[4rem] p-12 border-4 border-[#5d4037] relative overflow-hidden flex flex-col items-center mb-8 shadow-[8px_8px_0px_#80deea]">
      {showFirework && (
        <>
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <div className="firework firework-animate" style={{ left: '25%', top: '30%' }}></div>
            <div className="firework firework-animate" style={{ left: '75%', top: '40%' }}></div>
            <div className="firework firework-animate" style={{ left: '50%', top: '20%' }}></div>
          </div>
          <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none animate-[bounce_0.5s_infinite]">
            <div className="bg-white/90 px-12 py-6 crayon-border border-[#5d4037] shadow-[10px_10px_0px_#8bc34a]">
              <p className="text-8xl font-black text-[#2e7d32] tracking-tighter drop-shadow-lg">Correct! 🌟</p>
            </div>
          </div>
        </>
      )}
      <div className="absolute top-10 right-10 text-7xl opacity-30 floating">🎨</div>
      <div className="absolute bottom-10 left-10 text-7xl opacity-30 floating" style={{animationDelay: '1s'}}>🖍️</div>
      <h2 className="text-6xl font-black mb-12 text-[#006064] z-10">彩色泡泡糖 🫧</h2>
      <div className="bg-white p-12 rounded-[3rem] mb-20 text-center z-10 border-4 border-[#5d4037] shadow-xl rotate-[1deg]">
        <p className="text-7xl font-black mb-4 text-[#006064] leading-none">{currentWord.chinese}</p>
        <p className="text-3xl text-[#00acc1] font-bold">戳破正確的英語泡泡！</p>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-14 z-10">
        {options.map((opt, i) => (
          <button key={`${step}-${i}`} onClick={() => handlePop(opt)}
            className="w-44 h-44 rounded-full bg-white/90 border-4 border-[#5d4037] flex items-center justify-center text-4xl font-black shadow-2xl hover:scale-125 transition-all active:scale-95 floating"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
};

const MemoryGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'MEMORIZE' | 'SELECT'>('MEMORIZE');
  const [timer, setTimer] = useState(10);
  const [words, setWords] = useState<Word[]>([]);
  const [missingWord, setMissingWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);

  const startRound = () => {
    const selected = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 6); setWords(selected);
    const missing = selected[Math.floor(Math.random() * selected.length)]; setMissingWord(missing);
    const others = WORDS.filter(w => !selected.includes(w)).sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([...others, missing].sort(() => 0.5 - Math.random())); setPhase('MEMORIZE'); setTimer(8);
  };
  useEffect(() => { startRound(); }, []);
  useEffect(() => {
    if (phase === 'MEMORIZE' && timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); }
    else if (phase === 'MEMORIZE' && timer === 0) setPhase('SELECT');
  }, [timer, phase]);

  return (
    <div className="bg-[#fce4ec] p-14 rounded-[4.5rem] border-4 border-[#5d4037] text-center mb-8 shadow-[8px_8px_0px_#f8bbd0] rotate-[0.5deg]">
      <h2 className="text-6xl font-black text-[#880e4f] mb-14 tracking-tight">大腦色彩畫家 🧠</h2>
      {phase === 'MEMORIZE' ? (
        <>
          <div className="mb-16 flex flex-col items-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl font-black border-4 border-[#5d4037] animate-pulse shadow-xl">{timer}</div>
            <p className="text-[#c2185b] font-black text-3xl mt-10">快快記住這 6 個單詞！</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {words.map(w => (
              <div key={w.id} className="bg-white p-10 rounded-[2.5rem] shadow-xl border-4 border-[#5d4037] flex flex-col items-center group rotate-[1deg]">
                <span className="text-8xl mb-6 floating">{w.emoji}</span>
                <span className="font-black text-4xl text-[#5d4037]">{w.english}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-6xl font-black text-[#c2185b] mb-16">哪一個單詞被擦掉啦？ 🤔</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-20 opacity-10 blur-xl scale-90">
            {words.filter(w => w.id !== missingWord?.id).map(w => (
              <div key={w.id} className="bg-white p-10 rounded-[2.5rem] flex flex-col items-center"><span className="text-8xl mb-6">{w.emoji}</span><span className="font-black text-4xl">{w.english}</span></div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {options.map(opt => (
              <button key={opt.id} onClick={() => { if (opt.id === missingWord?.id) onComplete(); else startRound(); }} 
                className="hand-drawn-btn bg-white p-12 font-black text-4xl text-[#880e4f] border-[#5d4037] shadow-[6px_6px_0px_#5d4037] hover:bg-[#fce4ec]">
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
