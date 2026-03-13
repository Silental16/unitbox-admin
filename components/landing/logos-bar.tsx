export function LogosBar() {
  const placeholders = Array.from({ length: 5 }, (_, i) => i);

  return (
    <section className="bg-[#f5f5f7] font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1200px] px-6 py-8 md:px-[60px] lg:px-[120px]">
        <p className="mb-6 text-center text-[14px] font-medium tracking-[-0.08px] text-black/40">
          Trusted by leading developers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {placeholders.map((i) => (
            <div
              key={i}
              className="h-[32px] w-[100px] rounded-md bg-black/10 opacity-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
