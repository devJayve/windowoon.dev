import { Toc } from '@/features/post/types';

interface TableOfContentProps {
  toc?: Toc[];
}

export default function TableOfContent({ toc }: TableOfContentProps) {
  if (!toc || !toc.length) return null;

  return (
    <div className="hidden lg:block">
      <h2 className="mb-4 text-xl font-semibold">Table of Contents</h2>
      <nav>
        <ul className="space-y-2">
          {toc.map(item => (
            <li
              key={item.href}
              className="text-gray-600 hover:text-gray-900"
              style={{
                paddingLeft: `${item.depth - 2}rem`,
              }}
            >
              <a href={item.href} className="inline-block hover:underline">
                {item.numbering.join('.')}. {item.value}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
