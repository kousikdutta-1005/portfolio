<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat" />

  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, follow" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title><xsl:value-of select="title" /> &#183; RSS feed</title>
        <style>
          :root {
            color-scheme: light dark;
            --bg: #fbfbfd;
            --fg: #1d1d1f;
            --muted: #6e6e73;
            --border: rgba(0, 0, 0, 0.12);
            --card: rgba(255, 255, 255, 0.7);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #000000;
              --fg: #f5f5f7;
              --muted: #a1a1a6;
              --border: rgba(255, 255, 255, 0.14);
              --card: rgba(255, 255, 255, 0.04);
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 56px 24px 88px;
            background: var(--bg);
            color: var(--fg);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
            font-size: 16px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          .wrap { max-width: 720px; margin: 0 auto; }
          .badge {
            display: inline-block;
            padding: 5px 11px;
            border: 1px solid var(--border);
            border-radius: 999px;
            background: var(--card);
            color: var(--muted);
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          h1 {
            margin: 20px 0 10px;
            font-size: clamp(30px, 5vw, 40px);
            line-height: 1.1;
            letter-spacing: -0.03em;
            font-weight: 700;
          }
          .lede { margin: 0 0 26px; color: var(--muted); font-size: 16px; }
          .note {
            margin: 0 0 40px;
            padding: 16px 18px;
            border: 1px solid var(--border);
            border-radius: 14px;
            background: var(--card);
            color: var(--muted);
            font-size: 14px;
          }
          .note code {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 13px;
            color: var(--fg);
            word-break: break-all;
          }
          .note a { color: inherit; }
          h2 {
            margin: 0 0 18px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
          }
          ol { list-style: none; margin: 0; padding: 0; }
          li { padding: 20px 0; border-top: 1px solid var(--border); }
          li a {
            color: var(--fg);
            text-decoration: none;
            font-size: 19px;
            font-weight: 600;
            letter-spacing: -0.015em;
            line-height: 1.3;
            display: inline-block;
          }
          li a:hover { text-decoration: underline; }
          li p { margin: 7px 0 0; color: var(--muted); font-size: 15px; }
          .tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
          .tag {
            padding: 3px 9px;
            border: 1px solid var(--border);
            border-radius: 999px;
            font-size: 11px;
            color: var(--muted);
          }
          footer {
            margin-top: 44px;
            padding-top: 22px;
            border-top: 1px solid var(--border);
            color: var(--muted);
            font-size: 14px;
          }
          footer a { color: var(--fg); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <span class="badge">RSS feed</span>
          <h1><xsl:value-of select="title" /></h1>
          <p class="lede"><xsl:value-of select="description" /></p>

          <div class="note">
            This is a feed, meant for a reader app rather than a browser. Copy
            <code><xsl:value-of select="atom:link/@href" /></code>
            into NetNewsWire, Feedly, Reeder, or any RSS reader to get new pieces automatically.
            Or just <a href="{link}">read the journal on the site</a>.
          </div>

          <h2><xsl:value-of select="count(item)" /> pieces</h2>
          <ol>
            <xsl:for-each select="item">
              <li>
                <a href="{link}"><xsl:value-of select="title" /></a>
                <p><xsl:value-of select="description" /></p>
                <xsl:if test="category">
                  <div class="tags">
                    <xsl:for-each select="category">
                      <span class="tag"><xsl:value-of select="." /></span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ol>

          <footer>
            <a href="{link}">Back to the journal</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
