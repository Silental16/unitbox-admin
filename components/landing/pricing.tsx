import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$200/month",
    features: ["Up to 50 units", "1 admin account", "Standard support"],
    cta: "Get started with Starter",
    popular: false,
    dark: false,
  },
  {
    name: "Standard",
    price: "$500/month",
    features: [
      "Up to 150 units",
      "3 admin accounts",
      "Priority support",
      "Custom branding",
    ],
    cta: "Get started with Standard",
    popular: true,
    dark: false,
  },
  {
    name: "Pro",
    price: "$1000/month",
    features: [
      "Up to 500 units",
      "10 admin accounts",
      "Dedicated support",
      "API access",
      "Custom integrations",
    ],
    cta: "Get started with Pro",
    popular: false,
    dark: false,
  },
  {
    name: "Custom",
    price: "Custom pricing",
    features: [
      "Unlimited units",
      "Unlimited admins",
      "White-label solution",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Get started with Enterprise",
    popular: false,
    dark: true,
  },
];

export function Pricing() {
  return (
    <section className="bg-white font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1440px] px-6 pt-[90px] pb-5 md:px-[60px] lg:px-[120px]">
        <h2 className="text-center text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          Pricing
        </h2>
        <p className="mt-4 text-center text-[16px] leading-[1.4] text-black/55">
          Add +30% deal speed with Unitbox
        </p>

        {/* Cards container — horizontal scroll on mobile, flex on desktop */}
        <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 md:overflow-x-visible">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-[600px] min-w-[250px] max-w-[320px] flex-1 snap-start flex-col justify-between rounded-[24px] border p-5 shadow-[0_0_8px_2px_rgba(135,134,138,0.05)] ${
                plan.dark
                  ? "border-[#333] bg-[#212529] text-white"
                  : "border-[#e0e0e0] bg-[#f5f5f7] text-black"
              }`}
            >
              {/* Top: name + price */}
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-[13px] font-medium ${
                      plan.dark
                        ? "border-white/20 text-white"
                        : "border-black/20 text-black"
                    }`}
                  >
                    {plan.name}
                  </span>
                  {plan.popular && (
                    <span className="inline-block rounded-full bg-[#8534e1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.5px] text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p
                  className={`mt-4 text-[28px] font-medium leading-[1.2] ${
                    plan.dark ? "text-white" : "text-black"
                  }`}
                >
                  {plan.price}
                </p>

                {/* Features */}
                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          plan.dark ? "text-white/55" : "text-black/55"
                        }`}
                      />
                      <span
                        className={`text-[14px] leading-[1.4] ${
                          plan.dark ? "text-white/80" : "text-black/80"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: CTA */}
              <div>
                {plan.popular ? (
                  <a
                    href="#demo"
                    className="block w-full rounded-full px-6 py-3 text-center text-[14px] font-medium text-white"
                    style={{
                      background:
                        "linear-gradient(122deg, #212529 8.3%, #566a65 250.5%)",
                    }}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <a
                    href="#demo"
                    className={`block w-full rounded-full border px-6 py-3 text-center text-[14px] font-medium transition-colors ${
                      plan.dark
                        ? "border-white/20 text-white hover:bg-white/10"
                        : "border-black/20 text-black hover:bg-black/5"
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
