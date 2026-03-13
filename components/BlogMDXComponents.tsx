import type { MDXComponents } from 'mdx/types';

/**
 * Custom MDX components for blog posts.
 * Styled with CSS variables for theme consistency.
 */
export const blogMDXComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl sm:text-4xl font-bold mt-10 mb-4"
      style={{ color: 'var(--text)', lineHeight: 1.3 }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold mt-10 mb-3"
      style={{ color: 'var(--text)', lineHeight: 1.35 }}
      id={slugify(props.children)}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold mt-8 mb-2"
      style={{ color: 'var(--text)', lineHeight: 1.4 }}
      id={slugify(props.children)}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-base leading-7 mb-4"
      style={{ color: 'var(--text)' }}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc pl-6 mb-4 space-y-1.5"
      style={{ color: 'var(--text)' }}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 mb-4 space-y-1.5"
      style={{ color: 'var(--text)' }}
      {...props}
    />
  ),
  li: (props) => (
    <li className="text-base leading-7" style={{ color: 'var(--text)' }} {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 pl-4 my-6 italic"
      style={{
        borderColor: 'var(--accent)',
        color: 'var(--muted)',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="text-sm px-1.5 py-0.5 rounded"
      style={{
        background: 'var(--surface)',
        color: 'var(--accent)',
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="rounded-xl p-4 mb-4 overflow-x-auto text-sm"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="underline underline-offset-2 transition-opacity hover:opacity-80"
      style={{ color: 'var(--accent)' }}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8" style={{ borderColor: 'var(--border)' }} />
  ),
  strong: (props) => (
    <strong style={{ color: 'var(--text)', fontWeight: 600 }} {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="w-full text-sm"
        style={{ borderCollapse: 'collapse' }}
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="text-left px-3 py-2 font-semibold"
      style={{
        borderBottom: '2px solid var(--border)',
        color: 'var(--text)',
      }}
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-3 py-2"
      style={{
        borderBottom: '1px solid var(--border)',
        color: 'var(--text)',
      }}
      {...props}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-xl my-6 max-w-full h-auto"
      alt={props.alt ?? ''}
      loading="lazy"
      {...props}
    />
  ),
};

/**
 * Generate an ID-friendly slug from heading text.
 */
function slugify(children: React.ReactNode): string {
  const text = typeof children === 'string'
    ? children
    : Array.isArray(children)
      ? children.map(c => (typeof c === 'string' ? c : '')).join('')
      : '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Extract headings from MDX content for Table of Contents.
 */
export function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({
      level,
      text,
      id: slugify(text),
    });
  }

  return headings;
}
