import Image from "next/image";

const problems = [
  {
    text: "Sales are slow. Agents just don\u2019t sell our projects for some reason",
    votes: 28,
  },
  {
    text: "Data is scattered across Notion, Excel, Drive, Telegram. We\u2019re constantly syncing something",
    votes: 85,
  },
  {
    text: "Agent offers a unit that\u2019s already sold. Info was outdated \u2014 Loss and frustration",
    votes: 12,
  },
  {
    text: "On Zoom calls with clients I\u2019m constantly jumping between tabs to show something",
    votes: 53,
  },
  {
    text: "We have completed projects, but materials look cheap. We want premium, but packaging doesn\u2019t match",
    votes: 17,
  },
  {
    text: "Agents keep asking: send prices, send floor plans. Managers do nothing but this all day",
    votes: 102,
  },
  {
    text: "Proposals take hours to prepare. By the time it\u2019s ready investor lost interest or went elsewhere",
    votes: 43,
  },
  {
    text: "Agent network is a black box. No idea who of the 100 agents actually works",
    votes: 26,
  },
];

export function Problems() {
  return (
    <section id="product" className="bg-white font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1200px] px-6 pt-[90px] pb-[60px] md:px-[60px] lg:px-[120px]">
        <h2 className="text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          Familiar Problems?
        </h2>
        <p className="mt-4 max-w-[600px] text-[16px] leading-[1.4] text-black/55">
          We interviewed 100+ developers and agents. Here&apos;s what we hear
          most often:
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex h-[160px] min-w-[230px] max-w-[400px] flex-1 flex-col justify-between rounded-[20px] border border-[#e0e0e0] bg-[#fafafa] shadow-[0_0_8px_2px_rgba(135,134,138,0.05)]"
            >
              <p className="px-4 pt-5 text-[14px] leading-[1.4] text-black/80">
                {problem.text}
              </p>
              <div className="flex items-center gap-1.5 border-t border-[#e0e0e0] px-4 py-3">
                <Image
                  src="/landing/vote-icon.png"
                  alt="Votes"
                  width={20}
                  height={20}
                />
                <span className="text-[13px] text-black/55">
                  {problem.votes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
