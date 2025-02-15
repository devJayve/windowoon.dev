import { clsx } from 'clsx';
import type { TocItem, HeadingDepth, HeadingParent } from 'remark-flexible-toc';
import { cn } from '@/lib/utils';

type Props = {
  toc: TocItem[];
  maxDepth?: HeadingDepth;
  exclude?: string | string[];
  skipLevels?: HeadingDepth[];
  skipParents?: Exclude<HeadingParent, 'root'>[];
};

const Toc = ({ toc, maxDepth = 6, exclude, skipLevels = [1], skipParents = [] }: Props) => {
  if (!toc) return null;

  const exludeRegexFilter = exclude
    ? Array.isArray(exclude)
      ? new RegExp(exclude.join('|'), 'i')
      : new RegExp(exclude, 'i')
    : new RegExp('(?!.*)');

  const skipLevelsFilter = (depth: TocItem['depth']): boolean => skipLevels.includes(depth);
  const skipParentsFilter = (parent: TocItem['parent']): boolean =>
    parent !== 'root' && skipParents.includes(parent);
  const maxDepthFilter = (depth: TocItem['depth']): boolean => depth > maxDepth;

  const filteredToc = toc.filter(
    heading =>
      !maxDepthFilter(heading.depth) &&
      !skipLevelsFilter(heading.depth) &&
      !skipParentsFilter(heading.parent) &&
      !exludeRegexFilter.test(heading.value),
  );

  const formatNumber = (heading: TocItem) => {
    console.log(heading);
    if (heading.depth <= 2) return '';

    const numbers = heading.numbering.slice(2);

    return numbers.join('.') + '.';
  };

  return (
    <div
      className={cn(
        'sticky top-20 hidden min-w-[240px] max-w-[260px] self-start lg:block',
        'border-neutral-100 border rounded-lg p-4',
      )}
    >
      <summary className="cursor-pointer select-none list-none">
        <strong className="font-bold">목차</strong>
      </summary>
      <ul className="max-w-fit overflow-hidden">
        {filteredToc.map(heading => (
          <li key={heading.value} className={clsx('my-[0.3em] list-none', 'first:pt-1 last:pb-1')}>
            <a
              href={heading.href}
              className="text-sm text-neutral-700 no-underline hover:underline dark:text-neutral-300"
            >
              <div className={`h${heading.depth}`}>
                {heading.depth > 2 && (
                  <strong>
                    <span className="mr-2 text-primary">{formatNumber(heading)}</span>
                  </strong>
                )}
                <span>{heading.value}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
