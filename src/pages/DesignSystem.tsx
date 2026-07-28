import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTheme } from "@/components/ThemeProvider"
import type { ReactNode } from "react"

const MARKDOWN_CONTEXT = [
  {
    source: "PRODUCT.md",
    title: "Portfolio as brand product",
    notes: [
      "Register: brand.",
      "Audience: hiring managers, design leaders, recruiters, and product teams evaluating Kousik for senior product design roles.",
      "Purpose: make Kousik's judgment visible by selling thinking first, craft second, and AI-assisted building third.",
      "Personality: calm, sharp, personal, smooth, precise, quietly premium, and clearly not a template.",
      "Accessibility: strong contrast, keyboard focus, semantic landmarks, screen-reader-safe states, reduced motion, and no color-only meaning.",
    ],
  },
  {
    source: "README.md",
    title: "Repository context",
    notes: ["Project name: UI."],
  },
  {
    source: "app/README.md",
    title: "Runtime context",
    notes: [
      "React, TypeScript, and Vite application.",
      "Uses the Vite React plugin with Oxc and Oxlint rules.",
      "React Compiler is not enabled.",
      "Production checks should use the existing build and lint pipeline.",
    ],
  },
]

const PRODUCT_PRINCIPLES = [
  "Kousik is the hero, not the UI decoration.",
  "Thought first, craft second, AI-assisted building third.",
  "One surface, one job: glass, cards, icons, labels, and motion must clarify structure or interaction.",
  "Keep pages compact, balanced, legible, and calm while preserving enough breathing room for hierarchy.",
  "Light and dark mode must both feel intentionally designed, not merely inverted.",
]

const CURRENT_RULES = [
  "The site should feel like Kousik speaking directly to a senior design evaluator.",
  "Every visual decision must pass the Apple HIG gut check: clearer, calmer, more useful, more intentional.",
  "No visible em dashes in interface copy.",
  "No filler icons, trophy metrics, generic badges, decorative grids, or repeated tiny uppercase scaffolds.",
  "Avoid layers inside layers. Nested glass is wrong unless each layer has a real interaction job.",
  "Every interactive element needs default, hover, focus, active, selected/current, and disabled states wherever the state applies.",
  "Numbers must be hiring-manager-relevant and defensible. Use public app reach and shipped case-study proof, not unverifiable revenue claims.",
  "Selected work cards are the highest-value repeated UI element. They must stay compact, clear, and excellent in dark mode.",
  "Company marquee and envelope footer stay because they support proof and contact, but they must stay calm and Apple-like.",
]

const VISUAL_SYSTEM = [
  {
    title: "Typography",
    text: "Use large, confident display type for thesis and proof. Body copy stays short, legible, and capped around 65 to 75 characters. Balance headings and pretty-wrap prose.",
  },
  {
    title: "Materials",
    text: "Use liquid glass only where depth helps orientation: nav, focused surfaces, selected work, media frames, footer note, and useful chrome. Do not use glass as decoration.",
  },
  {
    title: "Motion",
    text: "Motion should explain change, guide attention, or add tactile quality. Use short ease-out curves, stagger only when it helps scanning, and always support reduced motion.",
  },
  {
    title: "Atmosphere",
    text: "Ambient rotating orbs are allowed as a background signature. They stay behind content, adapt to theme, and stop for reduced-motion users.",
  },
  {
    title: "Proof",
    text: "Hero stats use animated counters for years, products, public app reach, and MAU growth. Public app reach is sourced from Play Store brackets and should not be described as unique lives improved.",
  },
  {
    title: "Copy",
    text: "Copy should sound first-person, crisp, and confident. It should sell systems judgment, product taste, and buildable direction without sounding like a SaaS template.",
  },
]

const COMPONENT_CONTRACTS = [
  {
    name: "Interaction states",
    rules: "Default, hover, focus-visible, active, selected/current, and disabled states must be designed as one system. Disabled states reduce contrast and remove interaction, selected states must be visible without relying only on color.",
  },
  {
    name: "Primary nav",
    rules: "Visible links are Work and About only. Design System is private and opens through six continuous home/logo clicks or Cmd/Ctrl+K.",
  },
  {
    name: "Hero",
    rules: "Kousik leads. The right rail supports the thesis with role, one concise sentence, animated stats, and two actions.",
  },
  {
    name: "Selected work",
    rules: "Single-surface cards with image, context, title, description, proof signal, and one arrow affordance. No tag clutter.",
  },
  {
    name: "Case studies",
    rules: "Outcome-first hero, sticky section nav, shared case brief, focused media, and calm narrative rhythm.",
  },
  {
    name: "Footer envelope",
    rules: "Preserve the envelope animation structure. The card should feel like a personal note from Kousik, with contact actions integrated calmly.",
  },
  {
    name: "Custom cursor",
    rules: "Fine-pointer only. It is an affordance, not decoration. Preserve native text cursor behavior and hide for reduced motion.",
  },
]

const TOKEN_ROWS = [
  ["Background", "#fbfbfd", "#000000"],
  ["Foreground", "#1d1d1f", "#f5f5f7"],
  ["Card", "#ffffff", "#1c1c1e"],
  ["Muted foreground", "#6e6e73", "#a1a1a6"],
  ["Accent", "#0071e3", "#2997ff"],
  ["Border", "rgba(0, 0, 0, 0.04)", "rgba(255, 255, 255, 0.04)"],
  ["Input", "#d2d2d7", "rgba(255, 255, 255, 0.08)"],
]

const MATERIAL_TOKENS = [
  ["--liquid-blur-chrome", "blur(26px) saturate(175%) brightness(1.03)"],
  ["--liquid-blur-surface", "blur(22px) saturate(165%) brightness(1.02)"],
  ["--liquid-chrome", "Sticky navigation and persistent chrome"],
  ["--liquid-surface", "Focused panels, selected work, media, case briefs"],
  ["--liquid-surface-quiet", "Subtle supporting surfaces"],
  ["--liquid-border", "Adaptive glass edge"],
  ["--liquid-shadow-soft", "Soft theme-aware depth"],
]

const TYPE_RULES = [
  ["Display ceiling", "Clamp max at 6rem or below."],
  ["Tracking floor", "Do not go tighter than -0.04em for display unless the specific lockup is tested."],
  ["Body", "15 to 17px, generous 1.6 to 1.65 line-height."],
  ["Labels", "Use sparingly. Avoid tiny uppercase labels as a repeated section habit."],
  ["Stats", "Numbers can be large and editorial, but labels stay calm and factual."],
]

const DO_NOT_SHIP = [
  "Decorative glassmorphism as a default surface.",
  "Nested cards or layers that do not improve comprehension.",
  "Generic AI portfolio scaffolds, repeated identical card grids, or ornamental proof badges.",
  "Revenue or lives-improved claims without public, attributable evidence.",
  "Copy that makes the UI the hero instead of Kousik's thinking.",
]

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="py-12 first:pt-0">
      <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
      <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4">{title}</h2>
      {children}
    </section>
  )
}

function RuleList({ items }: { items: string[] }) {
  return (
    <div className="divide-y rounded-2xl border bg-card/70">
      {items.map((item) => (
        <p key={item} className="px-4 py-3 text-[14px] leading-relaxed text-muted-foreground">
          {item}
        </p>
      ))}
    </div>
  )
}

export default function DesignSystemPage() {
  const { resolvedTheme } = useTheme()
  const currentMode = resolvedTheme === "dark" ? "Dark" : "Light"

  return (
    <div className="min-h-screen px-6 md:px-10 pt-28 pb-20">
      <main className="max-w-[980px] mx-auto">
        <header className="pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant="secondary">Private design system</Badge>
            <span className="text-[12px] text-muted-foreground">{currentMode} mode</span>
          </div>
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.95] max-w-[780px]">
            The rules behind the portfolio.
          </h1>
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] text-muted-foreground">
            A private source of truth for Kousik's portfolio: story, visual principles, component contracts, access rules, and markdown context.
          </p>
        </header>

        <Section id="access" eyebrow="Access" title="Hidden by design">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[16px]">Secret route</CardTitle>
              </CardHeader>
              <CardContent className="text-[14px] leading-relaxed text-muted-foreground">
                Design System is removed from primary and mobile navigation. It opens only after six continuous clicks on the logo or Work link.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[16px]">Keyboard access</CardTitle>
              </CardHeader>
              <CardContent className="text-[14px] leading-relaxed text-muted-foreground">
                Cmd+K on macOS or Ctrl+K on Windows and Linux opens this page from anywhere in the portfolio.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        <Section id="markdown" eyebrow="Markdown context" title="Source notes">
          <div className="grid gap-4">
            {MARKDOWN_CONTEXT.map((item) => (
              <Card key={item.source}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-[16px]">{item.title}</CardTitle>
                    <code className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">{item.source}</code>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.notes.map((note) => (
                      <li key={note} className="text-[14px] leading-relaxed text-muted-foreground">{note}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="principles" eyebrow="Principles" title="Product rules">
          <RuleList items={PRODUCT_PRINCIPLES} />
          <h3 className="mt-8 mb-3 text-[17px] font-semibold tracking-[-0.02em]">Current operating rules</h3>
          <RuleList items={CURRENT_RULES} />
        </Section>

        <Separator />

        <Section id="visual" eyebrow="System" title="Visual and content system">
          <div className="grid md:grid-cols-2 gap-4">
            {VISUAL_SYSTEM.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-[16px]">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-[14px] leading-relaxed text-muted-foreground">
                  {item.text}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="components" eyebrow="Contracts" title="Component behavior">
          <div className="divide-y rounded-2xl border bg-card/70">
            {COMPONENT_CONTRACTS.map((item) => (
              <div key={item.name} className="grid gap-2 px-4 py-4 md:grid-cols-[160px_1fr] md:gap-6">
                <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{item.name}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{item.rules}</p>
              </div>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="tokens" eyebrow="Tokens" title="Foundations">
          <div className="grid gap-8">
            <div>
              <h3 className="mb-3 text-[17px] font-semibold tracking-[-0.02em]">Theme colors</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Light</TableHead>
                    <TableHead>Dark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOKEN_ROWS.map(([token, light, dark]) => (
                    <TableRow key={token}>
                      <TableCell className="text-[13px] font-medium">{token}</TableCell>
                      <TableCell><code className="text-[12px]">{light}</code></TableCell>
                      <TableCell><code className="text-[12px]">{dark}</code></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="mb-3 text-[17px] font-semibold tracking-[-0.02em]">Liquid material tokens</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Use</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MATERIAL_TOKENS.map(([token, use]) => (
                    <TableRow key={token}>
                      <TableCell><code className="text-[12px]">{token}</code></TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{use}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="mb-3 text-[17px] font-semibold tracking-[-0.02em]">Typography rules</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Rule</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TYPE_RULES.map(([area, rule]) => (
                    <TableRow key={area}>
                      <TableCell className="text-[13px] font-medium">{area}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{rule}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Section>

        <Separator />

        <Section id="quality" eyebrow="Quality bar" title="Do not ship">
          <RuleList items={DO_NOT_SHIP} />
        </Section>
      </main>
    </div>
  )
}
