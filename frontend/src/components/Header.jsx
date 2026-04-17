function Header() {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-col items-center pt-16 pb-10 text-center sm:pt-20">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#262629] bg-[#151517]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-[#6ba5a1]"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <h1 className="text-[26px] font-semibold tracking-tight text-[#ececf1] sm:text-[30px]">
        News Credibility Analyzer
      </h1>
      <p className="mt-2 text-sm text-[#a1a1aa] sm:text-[15px]">
        Multi-agent AI reasoning for news verification
      </p>
    </header>
  )
}

export default Header
