import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-[#f5f5f7] font-[family-name:var(--font-inter)]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6 pt-10 pb-16 md:flex-row md:gap-12 md:px-[60px] lg:px-[120px]">
        {/* Text column */}
        <div className="flex w-full flex-col gap-6 md:max-w-[390px] md:shrink-0">
          <h1 className="text-[30px] font-medium leading-[1.1] tracking-[-0.6px] text-black">
            Sell your projects 30% faster through your agent network
          </h1>
          <p className="text-[16px] leading-[1.4] tracking-[-0.08px] text-black/55">
            Unitbox is a portal where agents find everything to sell your
            properties: up-to-date units, proposal generator with financial
            models, one-click booking. All synced with your CRM.
          </p>
          <div>
            <a
              href="#demo"
              className="inline-block rounded-full px-6 py-3 text-[14px] font-medium text-white"
              style={{
                background:
                  "linear-gradient(122deg, #212529 8.3%, #566a65 250.5%)",
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Mockup image */}
        <div className="relative w-full flex-1">
          <Image
            src="/landing/hero-mockup.png"
            alt="Unitbox platform mockup"
            width={700}
            height={500}
            className="h-auto w-full drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
