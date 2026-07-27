import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Copy } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

// --- Data ---
const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "layout", label: "Layout & Grid" },
  { id: "shadows", label: "Shadows" },
  { id: "radius", label: "Border Radius" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
]

const PRINCIPLES = [
  { icon: "◎", title: "Clarity", desc: "Every element serves a purpose. Typography does the heavy lifting — the interface disappears so the work speaks for itself." },
  { icon: "◫", title: "Consistency", desc: "Repeatable patterns create trust. Spacing, color, and type follow strict scales." },
  { icon: "▲", title: "Hierarchy", desc: "Guide the eye naturally. Size, weight, and space create clear reading paths." },
  { icon: "✦", title: "Delight", desc: "Subtle animations and micro-interactions reward attention without being distracting." },
]

const COLORS_PRIMARY = [
  { name: "Black", hex: "#000000", var: "--black", color: "bg-black" },
  { name: "White", hex: "#ffffff", var: "--white", color: "bg-white border" },
]

const COLORS_NEUTRAL = [
  { name: "Gray 900", hex: "#171616", var: "--gray-900" },
  { name: "Gray 700", hex: "#333333", var: "--gray-700" },
  { name: "Gray 600", hex: "#666666", var: "--gray-600" },
  { name: "Gray 500", hex: "#5f6980", var: "--gray-500" },
  { name: "Gray 400", hex: "#999999", var: "--gray-400" },
  { name: "Gray 300", hex: "#c2c2c2", var: "--gray-300" },
  { name: "Gray 200", hex: "#e0e3eb", var: "--gray-200" },
  { name: "Gray 100", hex: "#f2f4f7", var: "--gray-100" },
  { name: "Gray 50", hex: "#f9fafb", var: "--gray-50" },
]

const COLORS_SEMANTIC = [
  { name: "Accent", hex: "#0099ff", var: "--accent" },
  { name: "Success", hex: "#16a34a", var: "--success" },
  { name: "Warning", hex: "#f59e0b", var: "--warning" },
  { name: "Error", hex: "#ef4444", var: "--error" },
]

const TYPE_SCALE = [
  { name: "Display", size: "86px", weight: "600", tracking: "-0.04em", leading: "1.05", sample: "Design System" },
  { name: "Heading 1", size: "68px", weight: "600", tracking: "-0.04em", leading: "1.05", sample: "Portfolio" },
  { name: "Heading 2", size: "48px", weight: "600", tracking: "-0.04em", leading: "1.1", sample: "Section Title" },
  { name: "Heading 3", size: "40px", weight: "600", tracking: "-0.03em", leading: "1.15", sample: "Subsection" },
  { name: "Heading 4", size: "28px", weight: "600", tracking: "-0.02em", leading: "1.2", sample: "Card Title" },
  { name: "Body Large", size: "20px", weight: "400", tracking: "0", leading: "1.6", sample: "Large body text for emphasis" },
  { name: "Body", size: "16px", weight: "400", tracking: "0", leading: "1.6", sample: "Default paragraph text" },
  { name: "Caption", size: "13px", weight: "500", tracking: "0", leading: "1.4", sample: "Caption text" },
  { name: "Label", size: "12px", weight: "600", tracking: "0.4em", leading: "1.3", sample: "LABEL TEXT" },
]

const SPACING = [
  { token: "xs", value: "8px", width: "8%" },
  { token: "sm", value: "16px", width: "16%" },
  { token: "md", value: "24px", width: "24%" },
  { token: "lg", value: "32px", width: "32%" },
  { token: "xl", value: "48px", width: "48%" },
  { token: "2xl", value: "64px", width: "64%" },
  { token: "3xl", value: "96px", width: "96%" },
]

const SHADOWS = [
  { level: 0, label: "None", value: "none" },
  { level: 1, label: "SM", value: "0 1px 3px rgba(0,0,0,0.04)" },
  { level: 2, label: "MD", value: "0 4px 12px rgba(0,0,0,0.06)" },
  { level: 3, label: "LG", value: "0 8px 24px rgba(0,0,0,0.08)" },
  { level: 4, label: "XL", value: "0 20px 60px rgba(0,0,0,0.08)" },
]

const RADII = [
  { label: "Small", value: "12px", style: { borderRadius: "12px" } },
  { label: "Medium", value: "24px", style: { borderRadius: "24px" } },
  { label: "Large", value: "32px", style: { borderRadius: "32px" } },
  { label: "Full", value: "50%", style: { borderRadius: "50%" } },
]

const EASINGS = [
  { name: "Default", value: "cubic-bezier(0.44, 0, 0.56, 1)" },
  { name: "Enter", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { name: "Exit", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { name: "Elastic", value: "elastic.out(1, 0.5)" },
  { name: "Power", value: "power3.out" },
]

const DURATIONS = [
  { name: "Instant", value: "100ms", usage: "Micro-feedback" },
  { name: "Fast", value: "200ms", usage: "Hover states" },
  { name: "Normal", value: "300ms", usage: "Most transitions" },
  { name: "Moderate", value: "500ms", usage: "Reveals" },
  { name: "Slow", value: "800ms", usage: "Staggered lists" },
  { name: "Dramatic", value: "1000ms", usage: "Page transitions" },
]

// --- Components ---
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-6 h-6 rounded-md hover:bg-muted transition-colors"
      title="Copy"
    >
      {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
    </button>
  )
}

function ColorSwatch({ name, hex, variable }: { name: string; hex: string; variable: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      className="group rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-foreground/20 hover:shadow-sm"
      onClick={() => {
        navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      <div className="h-16 w-full relative" style={{ background: hex }}>
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-white text-xs font-medium">Copied!</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-0.5">
        <div className="text-[13px] font-medium">{name}</div>
        <div className="text-[11px] font-mono text-muted-foreground">{hex}</div>
        <div className="text-[11px] font-mono text-muted-foreground/60">{variable}</div>
      </div>
    </div>
  )
}

// --- Main Page ---
export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="flex">
      {/* Sidebar — offset for nav height */}
      <aside className="sticky top-12 h-[calc(100vh-3rem)] w-[240px] shrink-0 border-r bg-background hidden lg:block">
        <ScrollArea className="h-full py-6">
          <div className="px-5 pb-4">
            <h2 className="text-[14px] font-semibold tracking-tight">Design System</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">v1.0</p>
          </div>
          <Separator className="mb-3" />
          <nav className="px-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "block px-3 py-1.5 text-[12px] rounded-md transition-colors",
                  activeSection === item.id
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-[740px] px-8 lg:px-12 py-12">

        {/* Overview */}
        <section id="overview" className="pb-12">
          <Badge variant="secondary" className="mb-4">Overview</Badge>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Design System</h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[560px] mb-10">
            A comprehensive guide to the visual language, components, and patterns that power this portfolio.
            Every element communicates with clarity, precision, and delight.
          </p>

          <h2 className="text-lg font-semibold mb-4">Core Principles</h2>
          <div className="grid grid-cols-2 gap-3">
            {PRINCIPLES.map((p) => (
              <Card key={p.title} className="transition-all hover:shadow-sm hover:border-foreground/15">
                <CardHeader className="pb-2">
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-sm mb-2">
                    {p.icon}
                  </div>
                  <CardTitle className="text-[14px] font-semibold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Colors */}
        <section id="colors" className="py-12">
          <Badge variant="secondary" className="mb-4">Foundation</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Colors</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            A restrained palette that puts content first. Black and white anchor the system, with a neutral gray scale for hierarchy.
          </p>

          <h3 className="text-sm font-semibold mb-3">Primary</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {COLORS_PRIMARY.map((c) => (
              <ColorSwatch key={c.hex} name={c.name} hex={c.hex} variable={c.var} />
            ))}
          </div>

          <h3 className="text-sm font-semibold mb-3">Neutral Scale</h3>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {COLORS_NEUTRAL.map((c) => (
              <ColorSwatch key={c.hex} name={c.name} hex={c.hex} variable={c.var} />
            ))}
          </div>

          <h3 className="text-sm font-semibold mb-3">Semantic</h3>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {COLORS_SEMANTIC.map((c) => (
              <ColorSwatch key={c.hex} name={c.name} hex={c.hex} variable={c.var} />
            ))}
          </div>

          <h3 className="text-sm font-semibold mb-3">Usage Guidelines</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Context</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Variable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Primary text", "Black", "--black"],
                ["Secondary text", "Gray 600", "--gray-600"],
                ["Disabled / placeholder", "Gray 400", "--gray-400"],
                ["Borders", "Gray 200", "--gray-200"],
                ["Surface / cards", "Gray 50", "--gray-50"],
                ["Interactive links", "Accent Blue", "--accent"],
              ].map(([context, color, variable]) => (
                <TableRow key={context}>
                  <TableCell className="text-[13px]">{context}</TableCell>
                  <TableCell className="text-[13px]">{color}</TableCell>
                  <TableCell>
                    <code className="text-[12px] font-mono bg-muted px-1.5 py-0.5 rounded">{variable}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <Separator />

        {/* Typography */}
        <section id="typography" className="py-12">
          <Badge variant="secondary" className="mb-4">Foundation</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Typography</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Inter is the sole typeface — versatile for both display and body. Its wide weight range and legibility make it ideal for a modern portfolio.
          </p>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted-foreground">Font Stack</span>
                <code className="text-[12px] font-mono bg-muted px-2 py-0.5 rounded">
                  'Inter', -apple-system, BlinkMacSystemFont, sans-serif
                </code>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-sm font-semibold mb-4">Type Scale</h3>
          <div className="space-y-0 border rounded-lg overflow-hidden">
            {TYPE_SCALE.map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  "flex items-baseline justify-between px-4 py-3 gap-4",
                  i < TYPE_SCALE.length - 1 && "border-b"
                )}
              >
                <span
                  className="truncate"
                  style={{
                    fontSize: parseInt(t.size) > 40 ? "28px" : t.size,
                    fontWeight: parseInt(t.weight),
                    letterSpacing: t.tracking,
                  }}
                >
                  {t.sample}
                </span>
                <div className="text-right shrink-0">
                  <div className="text-[12px] font-medium">{t.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {t.size} / {t.weight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Spacing */}
        <section id="spacing" className="py-12">
          <Badge variant="secondary" className="mb-4">Foundation</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Spacing</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            An 8px-based scale creates rhythm and harmony. Every margin, padding, and gap uses these values.
          </p>

          <div className="space-y-2">
            {SPACING.map((s) => (
              <div key={s.token} className="flex items-center gap-3 p-2 rounded-md bg-muted/50 border border-transparent hover:border-border transition-colors">
                <code className="text-[12px] font-mono w-10 text-center font-medium">{s.token}</code>
                <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-primary rounded" style={{ width: s.width }} />
                </div>
                <code className="text-[12px] font-mono text-muted-foreground w-12 text-right">{s.value}</code>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Layout */}
        <section id="layout" className="py-12">
          <Badge variant="secondary" className="mb-4">Structure</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Layout & Grid</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Content is constrained to 1280px max-width with responsive padding. Grids adapt fluidly.
          </p>

          <h3 className="text-sm font-semibold mb-3">Container</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Max width", "1280px"],
                ["Padding (Desktop)", "80px"],
                ["Padding (Tablet)", "40px"],
                ["Padding (Mobile)", "20px"],
                ["Centering", "margin: 0 auto"],
              ].map(([prop, val]) => (
                <TableRow key={prop}>
                  <TableCell className="text-[13px]">{prop}</TableCell>
                  <TableCell><code className="text-[12px] font-mono bg-muted px-1.5 py-0.5 rounded">{val}</code></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 className="text-sm font-semibold mt-8 mb-3">Breakpoints</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Desktop", range: "> 1200px", desc: "Full layout, 80px margins" },
              { name: "Tablet", range: "810–1200px", desc: "40px margins, reduced headings" },
              { name: "Small Tablet", range: "481–810px", desc: "24px margins, single-column" },
              { name: "Mobile", range: "≤ 480px", desc: "20px margins, minimal" },
            ].map((bp) => (
              <Card key={bp.name}>
                <CardContent className="p-4">
                  <div className="text-[14px] font-semibold">{bp.name}</div>
                  <code className="text-[12px] font-mono text-muted-foreground">{bp.range}</code>
                  <p className="text-[12px] text-muted-foreground mt-1">{bp.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Shadows */}
        <section id="shadows" className="py-12">
          <Badge variant="secondary" className="mb-4">Depth</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Shadows & Elevation</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Five elevation levels create depth. Shadows are subtle and diffused — never harsh.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {SHADOWS.map((s) => (
              <div
                key={s.level}
                className="h-24 rounded-lg border bg-card flex flex-col items-center justify-center gap-1"
                style={{ boxShadow: s.value }}
              >
                <span className="text-[13px] font-medium">Level {s.level}</span>
                <span className="text-[11px] font-mono text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["0", "Default state", "none"],
                ["1", "Scrolled nav, subtle cards", "0 1px 3px rgba(0,0,0,0.04)"],
                ["2", "Hover states", "0 4px 12px rgba(0,0,0,0.06)"],
                ["3", "Popovers, dropdowns", "0 8px 24px rgba(0,0,0,0.08)"],
                ["4", "Card hover, modals", "0 20px 60px rgba(0,0,0,0.08)"],
              ].map(([level, usage, val]) => (
                <TableRow key={level}>
                  <TableCell className="text-[13px] font-mono">{level}</TableCell>
                  <TableCell className="text-[13px]">{usage}</TableCell>
                  <TableCell><code className="text-[11px] font-mono bg-muted px-1.5 py-0.5 rounded">{val}</code></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <Separator />

        {/* Border Radius */}
        <section id="radius" className="py-12">
          <Badge variant="secondary" className="mb-4">Shape</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Border Radius</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Rounded corners create a friendly, approachable feel.
          </p>

          <div className="grid grid-cols-4 gap-4">
            {RADII.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-3 p-4 border rounded-lg">
                <div className="w-14 h-14 bg-primary" style={r.style} />
                <span className="text-[13px] font-medium">{r.label}</span>
                <code className="text-[11px] font-mono text-muted-foreground">{r.value}</code>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Motion */}
        <section id="motion" className="py-12">
          <Badge variant="secondary" className="mb-4">Motion</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Motion & Animation</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Every animation serves a purpose — guiding attention, providing feedback, or smoothing transitions.
          </p>

          <h3 className="text-sm font-semibold mb-3">Easing Curves</h3>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {EASINGS.map((e) => (
              <Card key={e.name} className="cursor-pointer transition-all hover:shadow-sm hover:border-foreground/15 group">
                <CardContent className="p-4">
                  <div className="h-8 mb-3 bg-muted rounded relative overflow-hidden">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-primary top-1/2 -translate-y-1/2 left-2 group-hover:left-[calc(100%-18px)] transition-all duration-500" />
                  </div>
                  <div className="text-[13px] font-medium">{e.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{e.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-sm font-semibold mb-3">Duration Scale</h3>
          <div className="grid grid-cols-3 gap-3">
            {DURATIONS.map((d) => (
              <Card key={d.name} className="group cursor-pointer transition-all hover:shadow-sm hover:border-foreground/15">
                <CardContent className="p-4 text-center">
                  <div className="h-1 bg-muted rounded mb-3 overflow-hidden">
                    <div className="h-full bg-primary rounded w-0 group-hover:w-full" style={{ transition: `width ${d.value} ease` }} />
                  </div>
                  <div className="text-[13px] font-medium">{d.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground">{d.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{d.usage}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Components */}
        <section id="components" className="py-12">
          <Badge variant="secondary" className="mb-4">UI Library</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Components</h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mb-8">
            Reusable building blocks built with shadcn/ui patterns.
          </p>

          {/* Buttons */}
          <h3 className="text-sm font-semibold mb-3">Buttons</h3>
          <Card className="mb-6">
            <div className="p-6 bg-muted/50 flex items-center gap-3 flex-wrap">
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-foreground text-[13px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground">
                Outline Button →
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-[13px] font-medium transition-colors hover:bg-primary/90">
                Filled Button →
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-foreground border text-[13px] font-medium transition-colors hover:bg-muted">
                White Button →
              </button>
            </div>
            <div className="p-4 bg-[hsl(240_10%_3.9%)] border-t">
              <code className="text-[12px] font-mono text-[hsl(240_5%_64.9%)] whitespace-pre">
                {`<button class="btn btn--outline">Outline →</button>\n<button class="btn btn--filled">Filled →</button>`}
              </code>
            </div>
          </Card>

          {/* Cards */}
          <h3 className="text-sm font-semibold mb-3">Project Card</h3>
          <Card className="mb-6 overflow-hidden">
            <div className="p-6 bg-muted/50">
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-muted to-border rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">16:10 Cover Image</span>
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-[15px]">Project Title</h4>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Brief project description</p>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">AI/ML</Badge>
                  <Badge variant="secondary" className="text-[10px]">Enterprise</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Nav */}
          <h3 className="text-sm font-semibold mb-3">Navigation</h3>
          <Card className="mb-6">
            <div className="p-6 bg-muted/50">
              <div className="flex items-center justify-between px-4 py-3 border rounded-lg bg-card">
                <span className="text-[15px] font-semibold tracking-tight">Kousik Dutta</span>
                <nav className="flex gap-6">
                  <span className="text-[13px] font-medium border-b-2 border-foreground pb-0.5">Work</span>
                  <span className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer">About</span>
                  <span className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer">Resume</span>
                </nav>
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-[13px] text-blue-700">
            <span className="font-medium">Note:</span> All components use the design tokens defined above for colors, spacing, radius, and motion.
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 pb-4 text-center">
          <p className="text-[12px] text-muted-foreground">
            Design System v1.0 — Kousik Dutta Portfolio
          </p>
        </div>
      </main>
    </div>
  )
}
