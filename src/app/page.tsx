import ApplyForm from "@/components/ApplyForm";

const INFO = [
  {
    label: "일시",
    value: "2026년 4월 2일 (목) 오후 1시 ~ 5시",
    note: "총 4시간",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
  },
  {
    label: "장소",
    value: "본사 대회의실",
    note: "현장 진행",
    icon: (
      <>
        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: "대상",
    value: "전 직원",
    note: "개발 / 비개발 무관",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 11a3 3 0 1 0-1.5-5.6M17 20c0-2.2-.8-4-2-5.2" />
      </>
    ),
  },
  {
    label: "준비물",
    value: "개인 노트북",
    note: "충전기도 함께",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M2 19h20" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 배경 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(236,72,153,0.32),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        {/* 헤드라인 */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            사내 교육 · 강사 라떼
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.2] tracking-tight text-white sm:text-6xl">
            AI 바이브 코딩
            <br className="sm:hidden" /> 마스터클래스
          </h1>
          <p className="mt-5 text-lg text-pink-200/80 sm:text-xl">
            코딩 없이 AI로 업무 도구를 만드는 법
          </p>
        </header>

        {/* 강의 소개 */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-300/70">
            강의 소개
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
            AI에게 말로 지시하면 앱이 만들어집니다.
            <br />
            코딩 경험이 전혀 없어도 괜찮아요.
            <br />
            4시간이면 여러분만의 업무 도구를 직접 만들 수 있습니다.
          </p>
        </section>

        {/* 행사 정보 */}
        <section className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {INFO.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden
                  >
                    {item.icon}
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-sm text-white/45">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 신청 폼 */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            신청하기
          </h2>
          <p className="mt-3 text-center text-[15px] text-white/50">
            아래 정보를 입력하면 신청이 완료됩니다.
          </p>
          <div className="mt-8">
            <ApplyForm />
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-white/30">
          AI 바이브 코딩 마스터클래스 · 강사 라떼
        </footer>
      </div>
    </main>
  );
}
