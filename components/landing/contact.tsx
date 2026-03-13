import { Link2 } from "lucide-react";

export function Contact() {
  return (
    <section id="demo" className="bg-white font-[family-name:var(--font-inter)]">
      <div className="mx-auto max-w-[1440px] px-6 pt-[90px] pb-5 md:px-[60px] lg:px-[120px]">
        <h2 className="text-center text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-black">
          Get started with Unitbox
        </h2>
        <p className="mt-4 text-center text-[16px] leading-[1.4] text-black/55">
          Book a demo call with our team to get started. No credit card
          required.
        </p>

        {/* Calendly embed placeholder */}
        <div className="mt-10 flex h-[600px] w-full items-center justify-center rounded-[20px] bg-[#f5f5f7]">
          <Link2 size={40} className="text-black/20" />
        </div>
      </div>
    </section>
  );
}
