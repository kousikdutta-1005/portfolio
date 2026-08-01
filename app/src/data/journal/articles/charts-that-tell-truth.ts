import type { Article } from "../types"

export const dataviz: Article = {
  id: "charts-that-tell-truth",
  title: "Charts That Tell the Truth",
  subtitle: "Data visualisation as a working tool, not a magazine graphic",
  readTime: "10 min read",
  excerpt:
    "A chart inside a product is a control surface, not an illustration. The research on how people read visuals is 40 years old, it is settled, and most product charts still ignore it.",
  tags: ["Data Visualisation", "Craft", "Accessibility"],
  content: [
    {
      type: "lede",
      text: "A chart in a product interface is a tool, not a picture. Someone is using it to make a decision in the next ten seconds, not admiring it in a magazine. There is 40 years of research on how accurately human eyes read different shapes, the ranking is clear, and most product charts still pick the shapes that read worst. This is a piece about doing the opposite on purpose.",
    },
    {
      type: "figure",
      src: "/assets/journal/nightingale.webp",
      alt: "Florence Nightingale's polar area diagram of army mortality, with wedges radiating from a centre and coloured by cause of death.",
      caption: "Nightingale drew this in 1858 to argue that far more soldiers were dying of preventable disease than of battle wounds, and it worked because the picture made the comparison impossible to look away from. It is the origin case for a chart as an instrument of persuasion and action, not decoration. Worth admitting honestly: her area based wedges are exactly the encoding this piece ranks as hard to read accurately, so the diagram that founded the field would fail its own test.",
      credit: "Florence Nightingale, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Diagram_of_the_Causes_of_Mortality_in_the_Army_in_the_East._(IA_dr_diagram-of-the-causes-of-mortality-in-the-army-in-the-east-10563002).jpg",
      licence: "Public domain",
      width: 1200,
      height: 687,
    },
    { type: "h2", text: "Your eyes have a ranking, and it is not a matter of taste" },
    {
      type: "p",
      text: "In 1984 William Cleveland and Robert McGill ran a set of experiments that should be taped to every dashboard team's wall. They showed people the same numbers drawn as different shapes, then measured how accurately people could read the values back. The result was a ranking of visual encodings, ordered from most accurate to least. Position on a common scale won. Length came next. Then angle and slope. Then area. Then colour and shading came last, by a wide margin.",
    },
    {
      type: "p",
      text: "Think of it like reading a ruler versus judging a handful of coins. Two dots against the same axis are a ruler: you can say which is higher and by roughly how much. Two coloured squares are the coins: you can tell they differ, but ask by how much and everyone guesses differently. The ranking is not an opinion. It is a measured property of the visual system, and it holds whether the reader is a data scientist or a shopper.",
    },
    {
      type: "stats",
      items: [
        {
          value: "1984",
          label: "Cleveland and McGill publish the ranking of visual encodings",
          source: "Cleveland & McGill, JASA",
        },
        {
          value: "1st",
          label: "Position on a common scale, the most accurately decoded encoding",
          source: "Cleveland & McGill, 1984",
        },
        {
          value: "last",
          label: "Colour saturation and shading, the least accurately decoded",
          source: "Cleveland & McGill, 1984",
        },
      ],
      caption:
        "The experiment ranked how well people read each shape. A chart is a choice of where to sit on this ladder.",
    },
    {
      type: "p",
      text: "The ranking has held up for decades of follow-up work, which is rare in this field. Later researchers re-ran versions of it, including a large crowdsourced replication by the team who went on to build D3 and Vega, and the ordering held. That is worth pausing on. A result from 1984, confirmed by the engineers who wrote the modern charting tools, is baked into the defaults those tools ship. Picture an election night read as bars versus as a pie. On the bars you rank the parties in a second. On the pie you argue about which slice came second.",
    },
    {
      type: "p",
      text: "Here is why this matters on a Tuesday. A bar chart encodes value as length against a shared baseline, which is near the top of the ranking. A pie chart encodes value as angle and area, which are further down. So when you swap a pie for a bar, you are not changing the style. You are moving the reader up the accuracy ladder. The same numbers become easier to read, and no one has to try harder.",
    },
    {
      type: "chart",
      unit: "rank",
      data: [
        { label: "Position on a common scale", value: 6, display: "most accurate", highlight: true },
        { label: "Length", value: 5, display: "2nd" },
        { label: "Angle and slope", value: 4, display: "3rd" },
        { label: "Area", value: 3, display: "4th" },
        { label: "Volume and curvature", value: 2, display: "5th" },
        { label: "Colour and shading", value: 1, display: "least accurate" },
      ],
      caption:
        "The Cleveland and McGill ordering, drawn as the thing it recommends: bars against a common baseline. Longer means read more accurately.",
      source: "Cleveland & McGill, Graphical Perception, 1984",
    },
    { type: "h2", text: "Pies, donuts, and axes that lie by accident" },
    {
      type: "p",
      text: "A pie chart asks you to compare wedges by angle. Two slices that are close in size look the same, and a donut is worse because it removes the centre, where the angle was easiest to judge. There is one job a pie does honestly: showing that one part is about half, or about a quarter, of a whole. Past two or three slices, a bar chart wins on every count. Datawrapper, whose team writes some of the most careful practical guidance in this field, lands in the same place after years of reader testing.",
    },
    {
      type: "compare",
      left: {
        title: "The chart that looks designed",
        items: [
          "Pie or donut with eight slices",
          "A legend off to the side",
          "A rainbow of unrelated colours",
          "Values compared by angle and area",
          "Reader squints, then gives up on the small ones",
        ],
      },
      right: {
        title: "The chart that gets read",
        items: [
          "Sorted horizontal bars",
          "Labels sit on the bars, no legend",
          "One colour, with the point highlighted",
          "Values compared by length on a shared axis",
          "Reader ranks all eight at a glance",
        ],
      },
      caption:
        "Same data, two encodings. The right one is not plainer by accident. It is plainer because plain reads faster.",
    },
    {
      type: "p",
      text: "A donut makes it worse by removing the centre, and dashboards love donuts because the hole leaves room for a big number in the middle. That number is the tell. If you have to print the value in the middle because the wedge cannot convey it, the wedge was never doing its job. On a phone it gets harder still, when the legend and its slices do not fit on screen together and the reader scrolls between a colour key and the shapes it explains, holding the mapping in memory. That is the coins problem stacked on top of a memory problem.",
    },
    {
      type: "p",
      text: "Now the harder case: the truncated axis. A bar chart must start at zero, because the bar's length is the value, and cutting the baseline makes a 2 percent difference look like a 200 percent one. That is the classic lie. But a line chart tracking a stock price or a body temperature does not have to start at zero, because a line encodes change, not magnitude, and forcing a zero baseline can flatten the very signal the reader came for. So the rule is not one rule. Bars start at zero. Lines start where the story is, and you label the axis honestly so no one is fooled.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  A["What am I drawing?"] --> B{"Encoding?"}
  B -->|"Bar: length is the value"| C["Baseline must be zero"]
  B -->|"Line: slope is the value"| D["Zoom to the signal"]
  C --> E["Truncating here is a lie"]
  D --> F["Label the axis clearly"]
  F --> G["Truncating here can be honest"]`,
      caption:
        "The same decision, truncate the axis or not, has opposite answers depending on what the shape encodes.",
    },
    { type: "h2", text: "The dashboard that shows everything and means nothing" },
    {
      type: "p",
      text: "Most product dashboards are a wall of tiles. Twelve charts, all the same size, all shouting at once. The problem is not density. The problem is that nothing is ranked, so the eye has no idea where to land. A good newspaper front page has one lead story and a hierarchy under it. A dashboard needs the same. One number that matters most, sized and placed so you see it first, and the supporting charts arranged around it.",
    },
    {
      type: "p",
      text: "The technique that rescues most crowded dashboards is small multiples: instead of one busy chart with ten overlapping lines, draw ten tiny charts on a shared scale, side by side. Your eye compares them the way it compares a row of houses on a street. Pair that with direct labelling. Put the series name at the end of its line, where the reader is already looking, and delete the legend that forced them to bounce between a colour key and the data. A legend is a lookup table your reader has to run in their head.",
    },
    {
      type: "p",
      text: "The other rescue is to let the dashboard say where to look, instead of asking a person to eyeball twelve charts for anomalies. Decide the one metric that would make someone act, make it the largest thing on the page, and give the rest a supporting role. A single red flag on the chart that breached its target does more than twelve perfectly drawn trends competing for attention. Spotting the odd one out is exactly the job a computer does better than a tired human at 6pm, so hand it over. A tool that never says look here is making you do the scanning.",
    },
    {
      type: "quote",
      text: "Overview first, zoom and filter, then details on demand.",
      author: "Ben Shneiderman",
      source: "The Eyes Have It, IEEE Symposium on Visual Languages, 1996",
    },
    {
      type: "p",
      text: "Shneiderman's mantra is the whole brief for an interactive chart. It is also where I part company with the strictest reading of Edward Tufte. Tufte's data-ink ratio says erase every mark that is not data: gridlines, borders, backgrounds, redundant labels. In print, on a static page a reader will study for a minute, he is right and it is beautiful. In a live product it goes too far. A faint gridline is not clutter, it is the ruler that lets someone read a value. A hover target needs to be big enough to hit. A redundant label saves a trip to the legend. Tufte optimised for the printed page. Product charts also carry affordances, and orientation is not decoration.",
    },
    {
      type: "callout",
      title: "Against data-ink maximalism",
      text: "Stripping a chart to pure data assumes the reader will slow down and decode it. In a product they will not. They will glance for one second and move on. The marks Tufte calls non-data, a gridline, a baseline, a value label on the one bar that matters, are the marks that make a one-second glance land. Keep the ink that does a job. Cut the ink that only decorates.",
    },
    { type: "h2", text: "Colour is a decision, not a default" },
    {
      type: "p",
      text: "Colour sits at the bottom of the accuracy ranking, so it should carry meaning you cannot get from position, never the primary value. When you do use it, the type of data decides the type of scale, and getting this wrong is one of the most common product-chart mistakes I see.",
    },
    {
      type: "table",
      head: ["Data shape", "Scale to use", "Example", "Common mistake"],
      rows: [
        ["Ordered, one direction", "Sequential, light to dark", "Signups per region", "A rainbow that hides the order"],
        ["Ordered around a middle", "Diverging, two hues from a neutral centre", "Budget over or under target", "A sequential scale that buries the zero point"],
        ["Unordered categories", "Qualitative, distinct hues", "Product lines", "A gradient that implies a ranking that is not there"],
      ],
      caption:
        "Match the scale to the data. Cynthia Brewer's ColorBrewer encodes exactly these three cases, and it is still the reference.",
      source: "ColorBrewer, colorbrewer2.org",
      emphasiseColumn: 1,
    },
    {
      type: "p",
      text: "Then there is the rainbow. The old jet colormap, red through yellow through green to blue, looks scientific and lies constantly. It is not perceptually uniform, which means equal steps in the data become unequal steps in what you see. It invents sharp bands where the data is smooth, and it collapses for the roughly one in twelve men with red-green colour blindness. This is why Matplotlib changed its default to viridis, a scale built to be perceptually uniform and colour-blind safe. If your heatmap looks like a weather map from the 1990s, that is the bug, not the style.",
    },
    {
      type: "p",
      text: "Categorical palettes have a hard ceiling too. Past about seven or eight distinct hues, people cannot reliably tell one from another, and colour-blind readers hit that wall much sooner. So if your legend carries twelve colours, the colours have stopped being an encoding and become decoration that happens to differ. Encode the series that matter with position or a direct label, and let colour carry only a coarse grouping. Where colour must mean something, back it with a second channel, a shape or a label, so the chart still works in greyscale and for anyone who cannot separate red from green.",
    },
    {
      type: "sourcecard",
      title: "Visual Vocabulary",
      publisher: "Financial Times",
      description:
        "The FT's chart-type reference: which shape to reach for given what you are trying to say, from the team that ships this under deadline every day.",
      href: "https://ft-interactive.github.io/visual-vocabulary/",
    },
    { type: "h2", text: "Show the doubt, and make the chart readable without eyes" },
    {
      type: "p",
      text: "Almost every product chart states its numbers as if they were exact. A forecast line lands on a single pixel. A conversion rate reads 4.2 percent with no hint that it is 4.2 give or take a point. This is not honesty, it is false precision, and it makes people trust the wrong decimal. The fix is old and boring: error bars, a shaded confidence band, a range instead of a point. It feels less tidy. It is more true, and a chart that hides its own uncertainty is doing PR, not analysis.",
    },
    {
      type: "p",
      text: "The last failure is the one that gets a team a legal letter, not just a bad decision. A chart is an image, and to a blind user an unlabelled image is nothing. The W3C guidance on complex images is direct: a chart needs a short text alternative that states its purpose, and a longer equivalent nearby, usually the data table it was drawn from. Add that table and you help everyone. Sighted users get exact values on hover, keyboard users get a focus order, and search engines and screenshots get real content instead of a blank rectangle.",
    },
    {
      type: "code",
      language: "html",
      caption:
        "The accessible baseline. The chart is progressive enhancement over a real table, so the data survives even when the script does not.",
      text: `<figure role="group" aria-labelledby="cap">
  <figcaption id="cap">Weekly active users, last 4 weeks</figcaption>

  <!-- The chart is drawn on top of this, not instead of it -->
  <table>
    <caption class="sr-only">Weekly active users by week</caption>
    <thead><tr><th>Week</th><th>Users</th></tr></thead>
    <tbody>
      <tr><td>Week 1</td><td>12,430</td></tr>
      <tr><td>Week 2</td><td>13,120</td></tr>
      <tr><td>Week 3</td><td>12,980</td></tr>
      <tr><td>Week 4</td><td>14,510</td></tr>
    </tbody>
  </table>
</figure>`,
    },
    {
      type: "p",
      text: "That table underneath is not a fallback for a tiny minority. It is the most durable version of your chart. Pixels get resized, screenshotted, and re-themed until the labels no longer fit, but the numbers in a table survive all of it. Build the chart on top of real markup and you get accessibility, resilience, and a free data export, all from the same few lines.",
    },
    {
      type: "callout",
      title: "Prediction",
      text: "I could be wrong, but here is what the data points to. Cleveland and McGill's ranking has held for 40 years and is baked into the grammar of Vega-Lite and D3. So I expect the next wave of AI-generated charts to keep making the same old mistakes at scale, defaulting to pies and rainbow scales because those dominate the images they trained on. What would prove me wrong: chart-generating models that refuse a pie for eight categories and pick a perceptually uniform scale by default, the way a careful human already does. Watch what the defaults do, not what the marketing says.",
    },
    {
      type: "takeaway",
      text: "Treat a chart as a control, not a decoration. Climb the accuracy ladder: prefer position and length, use colour for meaning and not for magnitude, and match the colour scale to the data. Start bars at zero and lines at the signal. Show uncertainty instead of faking precision. And ship the data table underneath, because a chart that only works for sighted, scripted users is only half built.",
    },
  ],
  references: [
    {
      label: "Graphical Perception: Theory, Experimentation, and Application",
      detail: "Cleveland and McGill's 1984 paper ranking how accurately people read visual encodings.",
      href: "https://www.datavis.ca/papers/perception/cleveland-mcgill-graphical-perception.pdf",
    },
    {
      label: "Vega-Lite Documentation",
      detail: "A grammar of interactive graphics that encodes the encoding-choice decisions this piece describes.",
      href: "https://vega.github.io/vega-lite/docs/",
    },
    {
      label: "D3 Scales",
      detail: "The scale primitives behind most custom web charts, including sequential and diverging colour scales.",
      href: "https://d3js.org/d3-scale",
    },
    {
      label: "What to consider when using pie charts",
      detail: "Datawrapper's practical, tested case for when a pie works and when a bar wins.",
      href: "https://blog.datawrapper.de/pie-charts/",
    },
    {
      label: "Which color scale to use in data vis",
      detail: "Datawrapper on sequential, diverging, and qualitative scales, with worked examples.",
      href: "https://blog.datawrapper.de/which-color-scale-to-use-in-data-vis/",
    },
    {
      label: "ColorBrewer 2.0",
      detail: "Cynthia Brewer's reference palettes, filterable by colour-blind and print safety.",
      href: "https://colorbrewer2.org/",
    },
    {
      label: "Choosing Colormaps in Matplotlib",
      detail: "Why perceptually uniform scales like viridis beat the old rainbow default.",
      href: "https://matplotlib.org/stable/users/explain/colors/colormaps.html",
    },
    {
      label: "Complex Images",
      detail: "W3C WAI tutorial on giving charts a text alternative and an equivalent data table.",
      href: "https://www.w3.org/WAI/tutorials/images/complex/",
    },
    {
      label: "Visual Vocabulary",
      detail: "The Financial Times chart-type picker, organised by the message you want to send.",
      href: "https://ft-interactive.github.io/visual-vocabulary/",
    },
  ],
}
