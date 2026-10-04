"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   ДАННЫЕ
   ============================================================ */

const PHOTOS = [
  { src: "/photos/photo-1.jpg", caption: "Наши первые дни дружбы 💫" },
  { src: "/photos/photo-2.jpg", caption: "Смеёмся до слёз 😂" },
  { src: "/photos/photo-3.jpg", caption: "Лучшие прогулки 🌸" },
  { src: "/photos/photo-4.jpg", caption: "Наши маленькие приключения ✨" },
  { src: "/photos/photo-5.jpg", caption: "Селфи с настроением 📸" },
  { src: "/photos/photo-6.jpg", caption: "Моменты, что греют 🤍" },
  { src: "/photos/photo-7.jpg", caption: "Вместе — это сила 💕" },
  { src: "/photos/photo-8.jpg", caption: "И это только начало 🎀" },
];

type Letter = {
  from: string;
  title: string;
  emoji: string;
  color: string;
  body: string[];
};

const LETTERS: Letter[] = [
  {
    from: "Даша",
    title: "Моей родной душе",
    emoji: "💞",
    color: "from-pink-400 to-rose-400",
    body: [
      "Викуля, поздравляю тебя с твоим днём рождения! В первую очередь я хочу тебе пожелать счастья, здоровья, благополучия, любви и всего самого наилучшего! Сегодня тебе 15 лет (ещё сколько же и 30 хехе). А мы с тобой познакомились, когда нам было по 6 лет, и по сей день мы с тобой общаемся.",
      "Я благодарна судьбе, что мы попали в один класс. Если бы этого не случилось, моя жизнь была бы не такой яркой и насыщенной. За 10 лет дружбы мы с тобой прошли вместе все трудности и радости, подставных подруг, ссоры и много чего ещё…",
      "Я не перестану говорить о том, какая ты прекрасная, добрая, умная и красивая подруга. Ты самая комфортная, честно — я настолько открытая и настоящая только с тобой. Я повторюсь: ты просто самый комфортный для меня человек.",
      "Если быть честной, я считаю тебя своей родной сестрой. Ты всегда поможешь, дашь совет, успокоишь и поймёшь меня. Я тебе за это очень благодарна.",
      "Викуль, я хочу, чтобы ты была самая счастливая девочка, и чтобы у тебя всё сбылось и получилось. Ещё я каждый раз вспоминаю наши с тобой детские мечты — как мы каждый день придумывали новые желания. Например, мы всегда хотели после нашего совершеннолетия вместе жить.",
      "Вик, я каждый раз, когда на тебя смотрю, понимаю, насколько ты важный человек в моей жизни. Ты занимаешь в ней главную роль. Ты правда подарок жизни.",
      "За эти десять лет дружбы с тобой я никогда не жалела ни об одном дне, проведённом вместе с тобой. Я просто обожаю тебя, Вик, и хочу, чтобы наша дружба была крепкой, и чтобы в будущем мы также продолжали дружить, и наши дети общались. Ты просто не представляешь, как это будет круто! Мы будем путешествовать вместе по всему миру, скупать самую красивую одежду мира и продолжать получать кайф друг от друга.",
      "В заключение я хочу тебе сказать, что я тебя очень сильно люблю и ценю. Пожалуйста, никогда не расстраивайся из-за фигни, всегда делись своими проблемами со мной — ведь я тебя всегда поддержу и помогу.",
      "Честно, пока писала этот текст — рыдала, потому что понимала, насколько появление тебя в моей жизни значимое событие. Ещё раз хочу поздравить тебя с таким важным днём. Я тебя обожаю, Викуль ❤️❤️❤️❤️",
      "Твоя Даша",
    ],
  },
  {
    from: "Родные",
    title: "Наша дорогая, любимая",
    emoji: "🌸",
    color: "from-purple-400 to-fuchsia-400",
    body: [
      "Викуля, наша дорогая, любимая, с днём рождения! Сегодня твой праздник, и нам так хочется сказать тебе всё, что мы чувствуем, но слов всегда не хватает, потому что ты заслуживаешь гораздо большего, чем просто пожелания.",
      "Ты — наша добрая, понимающая и самая родная. Ты тот человек, с которым не страшно ни грустить, ни смеяться до слёз, ни молчать, ни говорить обо всём на свете до утра. Спасибо тебе за то, что ты всегда рядом. За то, что умеешь поддержать одним словом, рассмешить одной фразой, выслушать без осуждения и понять без лишних вопросов. С тобой легко и спокойно, и мы это очень ценим.",
      "Желаем тебе, чтобы каждый твой день начинался с улыбки и заканчивался чувством, что день прошёл не зря. Чтобы люди вокруг были искренними и добрыми, а те, кто тебя обижает, просто исчезали из твоей жизни. Чтобы ты всегда чувствовала себя нужной, любимой и важной — потому что ты такая и есть.",
      "Пусть сбывается всё, о чём ты мечтаешь — даже то, о чём боишься сказать вслух. Пусть мечты превращаются в планы, планы — в реальность, а реальность — в счастье. Пусть в твоей жизни будет много ярких моментов, тёплых встреч, неожиданных подарков судьбы и людей, которые тебя ценят.",
      "Оставайся такой же красивой — и внешне, и внутренне. Такой же доброй, честной, жизнерадостной и настоящей. Не меняйся ради кого-то, будь собой — потому что ты классная именно такая, какая есть.",
      "А мы всегда будем рядом. В горе и в радости, в будни и в праздники, в смехе и в слезах. Мы всегда придём, всегда поддержим, всегда обнимем. Ты можешь на нас положиться — это не просто слова, это обещание.",
      "Любим тебя бесконечно. С днём рождения, наша Вика!",
    ],
  },
  {
    from: "София",
    title: "Мой человек",
    emoji: "💖",
    color: "from-rose-400 to-pink-500",
    body: [
      "Дорогая моя Вика! Сегодня твой день, и я так рада, что могу написать тебе эти слова. Начну с самого главного: спасибо, что ты есть в моей жизни.",
      "Ты — человек, которого я могу назвать по-настоящему родным. С тобой я могу быть собой — любой — и знаю, что ты не осудишь. Ты умеешь слушать так, как никто другой. Ты умеешь поддержать одним словом, одной фразой, одним взглядом. И это бесценно.",
      "Я часто думаю, как мне повезло, что мы встретились. Настоящая дружба — это не про количество лет, а про то, что чувствуешь внутри. А я чувствую, что ты — мой человек.",
      "В твой день рождения желаю тебе самого главного: чтобы ты была счастлива. По-настоящему, глубоко, спокойно. Чтобы каждый день был наполнен чем-то хорошим — пусть даже мелочами: тёплым солнцем, вкусным кофе, любимой музыкой. Чтобы люди вокруг были искренними и добрыми. Чтобы ты всегда чувствовала себя нужной и любимой — потому что ты такая и есть.",
      "Пусть сбывается всё, о чём мечтаешь. Даже то, о чём боишься сказать вслух. Я верю, что у тебя всё получится — ты сильная, красивая и невероятная. А я всегда буду рядом.",
      "Оставайся такой же настоящей. Не меняйся ради кого-то. Ты классная именно такая, какая есть. И я люблю тебя именно такой.",
      "Спасибо тебе за всё: за смех, за поддержку, за приключения, за молчание рядом. С днём рождения, моя дорогая Вика! Пусть этот год будет самым лучшим. А я всегда буду рядом. Ты можешь на меня положиться.",
      "Люблю тебя бесконечно. Твоя София ❤️",
    ],
  },
  {
    from: "Влада",
    title: "Любимая Викуся",
    emoji: "🤍",
    color: "from-sky-400 to-purple-400",
    body: [
      "Любимая Викуся, поздравляю тебя с днём рождения! Я очень рада, что ты появилась 4 года назад в моей жизни и до сих пор даришь свою прекрасную улыбку каждый день!",
      "Я очень дорожу нашей дружбой и люблю тебя всем сердцем. Именно ты — тот человек, который, я уверена, никогда не откажет в помощи, ведь я сделаю для тебя то же самое. Мне нравится проводить с тобой время, гулять, веселиться. Я очень люблю с тобой петь какие-то рандомные смешные песни. И я хочу, чтобы ты всегда знала — я тебя понимаю, слышу и всегда поддержу 🤍",
      "В твой день хочу пожелать тебе никогда не унывать, всегда оставаться такой же жизнерадостной, умной и красивой. Желаю, чтобы всегда-всегда твои мечты сбывались и всё, о чём ты думаешь, исполнялось. Желаю, чтобы тебя окружали только самые лучшие, хорошие люди, которые никогда тебя не осудят и всегда поддержат, несмотря ни на что.",
      "Спасибо, что ты у меня есть. Ещё раз поздравляю тебя с днём рождения 🤍",
      "Влада",
    ],
  },
  {
    from: "Василиса",
    title: "Ты — чудо",
    emoji: "❤️",
    color: "from-amber-400 to-pink-500",
    body: [
      "Викаа, я поздравляю тебя с днём рождения!! Я очень рада, что мы начали общаться. За это время ты стала для меня близким человеком, как будто знакомы с детства. Школа с твоим появлением стала намного лучше и веселее, поэтому каждый день гарантирует что-то весёлое и смешное. С тобой можно поговорить по душам и просто посмеяться с какой-нибудь фигни. Ты тот человек, с которым очень комфортно и весело, я это очень ценю!!",
      "От всего сердца я желаю тебе счастья, желаю, чтобы у тебя были люди, которые могут выслушать тебя и поддержать в нужный момент, и чтобы ты всегда оставалась такой, какая ты есть — доброй, красивой, понимающей.",
      "Спасибо большое тебе, что даже самые скучные дни в школе проходили быстро и незаметно благодаря тебе!!",
      "Мы тебя все очень любим и дорожим тобой. Ещё раз с днём рождения, и знай, что ты всегда можешь на меня положиться ❤️❤️",
      "Твоя Василиса",
    ],
  },
];

/* ============================================================
   ДЕКОРАЦИИ
   ============================================================ */

const HEART_EMOJIS = ["💖", "💕", "🌸", "✨", "🎀", "💗", "🌷", "💝"];

function FloatingHearts({ count = 12 }: { count?: number }) {
  const [items, setItems] = useState<
    { id: number; left: number; delay: number; duration: number; emoji: string; size: number }[]
  >([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        size: 18 + Math.random() * 24,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((h) => (
        <span
          key={h.id}
          className="absolute animate-[float-up_linear_infinite] select-none"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ["#ec4899", "#a855f7", "#f472b6", "#facc15", "#38bdf8", "#fb7185"];

function Confetti({ count = 30 }: { count?: number }) {
  const [items, setItems] = useState<
    { id: number; left: number; delay: number; duration: number; color: string; size: number; rotate: number }[]
  >([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute animate-[confetti-fall_linear_infinite]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function Hero() {
  const [age, setAge] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setAge(current);
      if (current >= 15) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 32;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div className="animate-[fade-in-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] max-w-3xl">
        <p className="mb-6 text-sm font-medium tracking-[0.35em] text-pink-500 uppercase sm:text-base">
          С днём рождения
        </p>

        <h1 className="font-script text-7xl leading-[0.95] text-pink-600 sm:text-8xl md:text-9xl">
          Викуля
        </h1>

        <div className="my-10 flex items-center justify-center gap-5">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 sm:w-24" />
          <span className="animate-[gentle-bob_3s_ease-in-out_infinite] text-4xl sm:text-5xl">🎂</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 sm:w-24" />
        </div>

        <div className="mb-8 flex items-end justify-center gap-3">
          <span className="text-6xl font-bold text-purple-600 tabular-nums sm:text-7xl">
            {age}
          </span>
          <span className="mb-2 text-3xl text-purple-500 sm:text-4xl">лет</span>
        </div>

        <p className="mx-auto max-w-xl text-base leading-relaxed text-purple-800/80 sm:text-lg">
          Сегодня особенный день — день, когда мир стал ярче, потому что
          появилась ты. Спасибо, что ты есть ✨
        </p>

        <div className="mt-12 flex justify-center gap-3 text-3xl sm:text-4xl">
          {["💖", "💕", "💗"].map((e, i) => (
            <span
              key={i}
              className="inline-block animate-[pulse-slow_3s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo("gallery")}
            className="animate-[soft-glow_4s_ease-in-out_infinite] cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            Смотреть моменты ↓
          </button>
          <button
            type="button"
            onClick={() => scrollTo("letters")}
            className="cursor-pointer rounded-full border-2 border-pink-300 bg-white/60 px-8 py-3.5 font-semibold text-pink-600 backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:border-pink-400 hover:bg-white/90 active:scale-[0.98]"
          >
            Читать письма 💌
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ГАЛЕРЕЯ
   ============================================================ */

function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative z-20 scroll-mt-8 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="animate-[fade-in-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-pink-500 uppercase sm:text-sm">
            Наша история в кадрах
          </p>
          <h2 className="font-script text-5xl text-purple-700 sm:text-6xl md:text-7xl">
            Моменты
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-purple-800/70">
            Каждая фотография — это отдельное маленькое воспоминание, которое
            мы храним в сердце
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:auto-rows-[180px] md:grid-cols-4">
          {PHOTOS.map((photo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(idx)}
              className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-pink-300 ${
                idx % 3 === 0 ? "aspect-[3/4] md:row-span-2 md:aspect-auto" : "aspect-square md:aspect-auto"
              }`}
              style={{
                animation: `fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 80}ms both`,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="absolute inset-x-0 bottom-0 translate-y-4 p-4 text-left text-xs font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                {photo.caption}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/85 p-4 backdrop-blur-md"
          style={{ animation: "fade-in 0.3s ease-out both" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ animation: "fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={PHOTOS[selected].src}
                alt={PHOTOS[selected].caption}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 text-center text-white">
              {PHOTOS[selected].caption}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-lg text-purple-700 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-white"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   ПИСЬМА
   ============================================================ */

function LetterCard({ letter, index }: { letter: Letter; index: number }) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [letter.body]);

  const PREVIEW = 130;

  return (
    <article
      className="group relative overflow-hidden rounded-3xl bg-white/85 p-7 shadow-xl ring-1 ring-pink-100 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:ring-pink-200 sm:p-10"
      style={{
        animation: `fade-in-up 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms both`,
      }}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${letter.color} opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
      />

      <div className="relative">
        <div className="mb-6 flex items-center gap-4 sm:gap-5">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${letter.color} text-2xl shadow-lg sm:h-16 sm:w-16 sm:text-3xl`}
          >
            {letter.emoji}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-pink-500 uppercase sm:text-xs">
              От {letter.from}
            </p>
            <h3 className="font-script truncate text-3xl leading-tight text-purple-700 sm:text-4xl">
              {letter.title}
            </h3>
          </div>
        </div>

        <div className="relative">
          <div
            ref={contentRef}
            style={{
              maxHeight: open ? `${height + 40}px` : `${PREVIEW}px`,
              overflow: "hidden",
              transition: "max-height 750ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="space-y-4 pt-1 text-[15px] leading-relaxed text-purple-900/85 sm:text-base">
              {letter.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {!open && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent" />
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`relative z-10 mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r ${letter.color} px-7 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97]`}
        >
          <span>{open ? "Свернуть" : "Читать письмо"}</span>
          <span
            className="inline-block transition-transform duration-500"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ↓
          </span>
        </button>
      </div>
    </article>
  );
}

function Letters() {
  return (
    <section id="letters" className="relative z-20 scroll-mt-8 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="animate-[fade-in-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-pink-500 uppercase sm:text-sm">
            Слова, что идут от сердца
          </p>
          <h2 className="font-script text-5xl text-purple-700 sm:text-6xl md:text-7xl">
            Письма для тебя
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-purple-800/70">
            Те, кто тебя любит, собрали самые тёплые слова в этот день 💌
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {LETTERS.map((letter, idx) => (
            <LetterCard key={letter.from} letter={letter} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="relative z-20 px-6 py-24 text-center sm:py-28">
      <div className="animate-[fade-in-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] mx-auto max-w-2xl">
        <div className="mb-8 flex justify-center gap-3 text-2xl sm:text-3xl">
          {["💝", "🎀", "🌸", "💖", "✨"].map((e, i) => (
            <span
              key={i}
              className="inline-block animate-[gentle-bob_3s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {e}
            </span>
          ))}
        </div>
        <p className="font-script text-5xl text-purple-700 sm:text-6xl">
          С днём рождения, Викуля!
        </p>
        <p className="mt-6 text-sm text-purple-800/60">
          Сделано с любовью для самого лучшего человека 💕
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   СТРАНИЦА
   ============================================================ */

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts count={12} />
      <Confetti count={30} />
      <Hero />
      <PhotoGallery />
      <Letters />
      <Footer />
    </main>
  );
}