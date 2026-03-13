"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I start using Unitbox?",
    answer:
      "Choose a pricing plan. Request the contract and agreement from the Unitbox team. Sign the agreement and complete the payment. Within 24 hours after payment, we will provide you with access to your workspace and assist your team with onboarding and implementation.",
  },
  {
    question:
      "What happens if we exceed the unit limit of our Unitbox plan?",
    answer:
      "If you exceed the unit limit of your current plan, the Unitbox team will offer an upgrade starting from the next billing month. The remaining balance of your current plan will be converted and carried over — it will not be lost.",
  },
  {
    question: "Who is responsible for managing content in the Unitbox?",
    answer:
      "In most cases, content management is handled by the developer's team. If additional support is required, the Unitbox team can provide an external assistant on a project-based.",
  },
  {
    question: "How can we pay for a Unitbox subscription?",
    answer:
      "We operate through a legal entity registered in Georgia. You can pay via bank transfer from any country. If you have preferred payment methods, we are always open to finding a convenient option for you.",
  },
  {
    question: "Do you provide an agent network for developers?",
    answer:
      "Yes, all developers using Unitbox are included in our partner listings with real estate agencies. However, for now we do not guarantee sales through this channel. First and foremost, Unitbox is a powerful tool for scaling and optimizing a developer's sales operations.",
  },
];

export function FAQ() {
  return (
    <section className="bg-[#f5f5f7] font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1200px] px-6 pt-[90px] pb-[60px] md:px-[60px] lg:px-[120px]">
        <h2 className="text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          FAQ
        </h2>

        <Accordion
          type="single"
          collapsible
          className="mt-10 flex flex-col gap-1.5 border-0"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-[20px] border border-[#e0e0e0] bg-[#fafafa] shadow-[0_0_8px_0_rgba(135,134,138,0.05)]"
            >
              <AccordionTrigger className="text-[18px] font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] leading-[1.6] text-black/50">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
