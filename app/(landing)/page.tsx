import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { LogosBar } from "@/components/landing/logos-bar"
import { Problems } from "@/components/landing/problems"
import { Solutions } from "@/components/landing/solutions"
import { ProductTabs } from "@/components/landing/product-tabs"
import { CaseStudy } from "@/components/landing/case-study"
import { Pricing } from "@/components/landing/pricing"
import { Contact } from "@/components/landing/contact"
import { FAQ } from "@/components/landing/faq"

export default function LandingPage() {
  return (
    <main className="font-[family-name:var(--font-inter)]">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <LogosBar />
      <section id="product">
        <Problems />
        <Solutions />
        <ProductTabs />
      </section>
      <section id="cases">
        <CaseStudy />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Contact />
      <section id="faq">
        <FAQ />
      </section>
    </main>
  )
}
