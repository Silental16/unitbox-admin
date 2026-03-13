import Image from "next/image";

const metrics = [
  {
    label: "REDUCED THE DEAL CYCLE",
    value: "by 30%",
  },
  {
    label: "SAVING BREIG MANAGERS",
    value: "60 hours",
    sub: "per month",
  },
  {
    label: "INCREASED CONVERSION",
    value: "by 20%",
  },
];

export function CaseStudy() {
  return (
    <section className="bg-white font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1200px] px-6 pt-[90px] md:px-[60px] lg:px-[120px]">
        <h2 className="text-center text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          The impact of Unitbox from our clients
        </h2>
        <p className="mt-4 text-center text-[16px] leading-[1.4] text-black/55">
          See how Unitbox improved company metrics.
        </p>

        {/* Case card */}
        <div className="mt-10 rounded-[20px] border border-[#e0e0e0] bg-[#f5f5f7] p-6 shadow-[0_0_8px_2px_rgba(135,134,138,0.1)] md:p-10">
          <Image
            src="/landing/breig-logo.png"
            alt="BREIG logo"
            width={100}
            height={20}
            className="h-5 w-auto"
          />

          <p className="mt-6 text-[16px] leading-[1.6] text-black/55">
            BREIG is a major investment real estate developer in Bali. Since
            2016, the company has been building and selling villas, townhouses,
            and apartments for investors. Today BREIG has 19 projects, with 16
            already delivered, and sells through two channels: direct sales and a
            partner network of 50+ agencies.
          </p>

          <p className="mt-4 text-[16px] leading-[1.6]">
            <span className="font-bold text-black">
              Results after 3 months:{" "}
            </span>
            <span className="text-black/55">
              231 agents registered, 168 returned with ~84 min/user/month, 661
              offers viewed by investors in 61 countries.
            </span>
          </p>

          <div className="mt-6">
            <a
              href="https://unitbox.notion.site/case-breig-en?pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-6 py-3 text-[14px] font-medium text-white"
              style={{
                background:
                  "linear-gradient(122deg, #212529 8.3%, #566a65 250.5%)",
              }}
            >
              Read Full Case
            </a>
          </div>

          {/* Metrics — horizontal on desktop, vertical on mobile */}
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center">
            {metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-5">
                {/* Vertical divider on desktop (not before first) */}
                {i > 0 && (
                  <div className="hidden h-16 w-px bg-black/10 md:block" />
                )}
                {/* Horizontal divider on mobile (not before first) */}
                {i > 0 && (
                  <div className="block h-px w-full bg-black/10 md:hidden" />
                )}
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium uppercase leading-[20px] tracking-[0.6px] text-[#8534e1]">
                    {metric.label}
                  </span>
                  <span className="text-[32px] font-medium leading-[1.2] text-black">
                    {metric.value}
                  </span>
                  {metric.sub && (
                    <span className="text-[14px] text-black/40">
                      {metric.sub}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
