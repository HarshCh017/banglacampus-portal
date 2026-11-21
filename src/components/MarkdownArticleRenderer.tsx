import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Generates a clean URL slug for heading anchors
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // remove HTML tags if any
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .trim()
    .replace(/\s+/g, '-'); // replace spaces with hyphens
}

/**
 * Extracts H2, H3, and H4 headings from Markdown for Table of Contents
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const rawTitle = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').trim();
      headings.push({
        id: slugifyHeading(rawTitle),
        title: rawTitle,
        level: 2,
      });
    } else if (trimmed.startsWith('### ')) {
      const rawTitle = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim();
      headings.push({
        id: slugifyHeading(rawTitle),
        title: rawTitle,
        level: 3,
      });
    } else if (trimmed.startsWith('#### ')) {
      const rawTitle = trimmed.replace(/^####\s+/, '').replace(/\*\*/g, '').trim();
      headings.push({
        id: slugifyHeading(rawTitle),
        title: rawTitle,
        level: 4,
      });
    }
  }

  return headings;
}

/**
 * Renders inline markdown: bold (**text**), italic (*text*), code (`code`), and links ([text](url))
 */
export function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Tokenize string for links, code, bold, italic
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  // Regex to match [text](url), `code`, **bold**, *italic*
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(remaining)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      tokens.push(remaining.substring(lastIndex, match.index));
    }

    const fullMatch = match[0];
    if (fullMatch.startsWith('[') && match[2] && match[3]) {
      // Link: [text](url)
      const linkText = match[2];
      const linkUrl = match[3];
      const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');

      tokens.push(
        isExternal ? (
          <a
            key={`link-${keyIdx++}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1455B8] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 inline-block shrink-0" />
          </a>
        ) : (
          <Link
            key={`link-${keyIdx++}`}
            href={linkUrl}
            className="text-[#1455B8] hover:underline font-semibold"
          >
            {linkText}
          </Link>
        )
      );
    } else if (fullMatch.startsWith('`') && match[4]) {
      // Inline code
      tokens.push(
        <code
          key={`code-${keyIdx++}`}
          className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#102A56] font-mono text-xs font-medium border border-[#E2E8F0]"
        >
          {match[4]}
        </code>
      );
    } else if (fullMatch.startsWith('**') && match[5]) {
      // Bold
      tokens.push(
        <strong key={`bold-${keyIdx++}`} className="font-bold text-[#102A56]">
          {match[5]}
        </strong>
      );
    } else if (fullMatch.startsWith('*') && match[6]) {
      // Italic
      tokens.push(
        <em key={`italic-${keyIdx++}`} className="italic text-[#334155]">
          {match[6]}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Push remainder
  if (lastIndex < remaining.length) {
    tokens.push(remaining.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

interface MarkdownArticleRendererProps {
  content: string;
}

export function MarkdownArticleRenderer({ content }: MarkdownArticleRendererProps) {
  if (!content) return null;

  const rawLines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let elemKey = 0;

  while (i < rawLines.length) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // 1. Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Headings
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').trim();
      const id = slugifyHeading(headingText);
      elements.push(
        <h2
          key={`h2-${elemKey++}`}
          id={id}
          className="text-xl sm:text-2xl font-heading font-extrabold text-[#102A56] tracking-tight mt-8 mb-4 pt-3 border-t border-[#F1F5F9] first:border-t-0 first:pt-0 scroll-mt-24"
        >
          {renderInline(headingText)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim();
      const id = slugifyHeading(headingText);
      elements.push(
        <h3
          key={`h3-${elemKey++}`}
          id={id}
          className="text-lg sm:text-xl font-heading font-bold text-[#102A56] mt-6 mb-3 scroll-mt-24"
        >
          {renderInline(headingText)}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      const headingText = trimmed.replace(/^####\s+/, '').replace(/\*\*/g, '').trim();
      const id = slugifyHeading(headingText);
      elements.push(
        <h4
          key={`h4-${elemKey++}`}
          id={id}
          className="text-base font-heading font-bold text-[#102A56] mt-4 mb-2 scroll-mt-24"
        >
          {renderInline(headingText)}
        </h4>
      );
      i++;
      continue;
    }

    // 3. Markdown Tables
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
        tableLines.push(rawLines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        // Skip separator row (tableLines[1])
        const rowLines = tableLines.slice(2);

        elements.push(
          <div key={`table-${elemKey++}`} className="my-6 overflow-x-auto rounded-xl border border-[#E2E8F0] shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAFBFD] border-b border-[#E2E8F0]">
                  {headerCells.map((header, hIdx) => (
                    <th
                      key={`th-${hIdx}`}
                      className="py-3 px-3.5 sm:px-4 font-heading font-bold text-[#102A56] whitespace-nowrap"
                    >
                      {renderInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] bg-white">
                {rowLines.map((rowStr, rIdx) => {
                  const cells = rowStr
                    .split('|')
                    .slice(1, -1)
                    .map((c) => c.trim());
                  return (
                    <tr key={`tr-${rIdx}`} className="hover:bg-slate-50/70 transition-colors">
                      {cells.map((cell, cIdx) => (
                        <td key={`td-${rIdx}-${cIdx}`} className="py-2.5 px-3.5 sm:px-4 text-[#334155] leading-normal">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 4. Blockquotes
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('>')) {
        quoteLines.push(rawLines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${elemKey++}`}
          className="my-5 p-4 rounded-xl bg-[#EAF2FF]/60 border-l-4 border-[#1455B8] text-xs sm:text-sm text-[#102A56] leading-relaxed italic"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={`qp-${qIdx}`} className={qIdx > 0 ? 'mt-2' : ''}>
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 5. Unordered Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < rawLines.length &&
        (rawLines[i].trim().startsWith('- ') || rawLines[i].trim().startsWith('* '))
      ) {
        listItems.push(rawLines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${elemKey++}`} className="my-4 space-y-2 text-xs sm:text-sm text-[#334155]">
          {listItems.map((item, lIdx) => (
            <li key={`li-${lIdx}`} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1455B8] shrink-0 mt-2" />
              <span className="leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < rawLines.length && /^\d+\.\s+/.test(rawLines[i].trim())) {
        listItems.push(rawLines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${elemKey++}`} className="my-4 space-y-2 text-xs sm:text-sm text-[#334155]">
          {listItems.map((item, lIdx) => (
            <li key={`oli-${lIdx}`} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#EAF2FF] text-[#1455B8] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#BFDBFE]">
                {lIdx + 1}
              </span>
              <span className="leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Standard Paragraph
    elements.push(
      <p key={`p-${elemKey++}`} className="text-xs sm:text-sm text-[#334155] leading-relaxed my-3 font-normal">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="guide-markdown-body space-y-1">{elements}</div>;
}
