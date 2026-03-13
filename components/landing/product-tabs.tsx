"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabs = [
  {
    value: "inventory",
    label: "Inventory",
    description:
      "Upload a project and all agents immediately see current info: prices, statuses, floor plans, renders. No more sending Excel via chats and answering \"what's the price for this unit?\". Agents only see available units. Sold and booked ones are automatically hidden or marked. No risk of offering what's already sold.",
  },
  {
    value: "financial",
    label: "Financial Models",
    description:
      "Build financial models with ROI projections, payment plans, and rental yield calculations. Agents generate investor-ready proposals in minutes, not hours. Every number is always up to date.",
  },
  {
    value: "proposals",
    label: "Proposals",
    description:
      "Agents create beautiful branded proposals with a few clicks. Each proposal includes unit details, financial models, floor plans, and renders. Ready to send to investors instantly.",
  },
  {
    value: "layouts",
    label: "Interactive Layouts",
    description:
      "Interactive floor plans and chessboard views let agents and investors explore availability in real time. Click any unit to see details, pricing, and availability status.",
  },
];

export function ProductTabs() {
  return (
    <section
      className="font-[family-name:var(--font-inter)]"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f5f5f7 33%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-[90px] pb-[60px] md:px-[60px] lg:px-[120px]">
        <h2 className="text-center text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          Everything you need to turn agents into a high-performing sales
          channel
        </h2>
        <p className="mt-4 text-center text-[16px] leading-[1.4] text-black/55">
          The entire process in one system. Transparent for both sides.
        </p>

        <Tabs defaultValue="inventory" className="mt-10">
          <div className="flex justify-center">
            <TabsList className="rounded-full bg-black/5 p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-3 py-2 text-sm data-active:bg-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <div className="flex flex-col items-center">
                <div className="w-full overflow-hidden rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                  <Image
                    src="/landing/product-screenshot.png"
                    alt={`${tab.label} screenshot`}
                    width={1200}
                    height={750}
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-6 max-w-[800px] text-center text-[14px] leading-[1.6] text-black/40">
                  {tab.description}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
