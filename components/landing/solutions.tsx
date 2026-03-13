import Image from "next/image";

const solutions = [
  {
    image: "/landing/solution-1.png",
    bold: "Agents start selling.",
    desc: "All information in one place \u2014 agents don\u2019t need to dig through folders or message managers. Proposals with financial models in 2 minutes instead of hours. Selling your projects becomes easier than selling competitors\u2019.",
  },
  {
    image: "/landing/solution-2.png",
    bold: "Deals close faster.",
    desc: "Agents respond to investors in minutes, not hours. Proposals with ROI calculations arguing with numbers, not pictures. While the investor is hot they already have an offer.",
  },
  {
    image: "/landing/solution-3.png",
    bold: "Managers don\u2019t waste time on routine.",
    desc: '70% of questions like "send prices", "is unit available?". Statuses sync with CRM automatically no need to update Excel manually. Managers close deals instead of forwarding files.',
  },
  {
    image: "/landing/solution-4.png",
    bold: "You see who\u2019s selling.",
    desc: "Dashboard shows which agents are active, who creates proposals, who closes deals. Decisions based on data who to motivate, who to train.",
  },
];

export function Solutions() {
  return (
    <section className="bg-[#f5f5f7] font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1440px] px-6 pt-[90px] pb-[60px] md:px-[60px] lg:px-[120px]">
        <h2 className="text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          How Unitbox helps sell up to 30% faster
        </h2>
        <p className="mt-4 max-w-[700px] text-[16px] leading-[1.4] text-black/55">
          Unitbox is a partner portal builder for developers that helps package
          your brand and manage sales online resulting in faster sales.
        </p>

        {/* Horizontal scroll on desktop, stack on mobile */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:overflow-x-auto md:pb-4">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className="w-full shrink-0 md:w-[320px]"
            >
              {/* Card image */}
              <div className="h-[350px] overflow-hidden rounded-[20px] border border-[#e0e0e0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]">
                <Image
                  src={solution.image}
                  alt={solution.bold}
                  width={320}
                  height={350}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Card text */}
              <p className="mt-4 text-[16px] leading-[1.5]">
                <span className="font-semibold text-black">
                  {solution.bold}
                </span>{" "}
                <span className="text-black/55">{solution.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
