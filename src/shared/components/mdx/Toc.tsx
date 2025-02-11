import { clsx } from 'clsx';
import type { TocItem, HeadingDepth, HeadingParent } from 'remark-flexible-toc';

import styles from './Toc.module.css';

type Props = {
  toc: TocItem[];
  maxDepth?: HeadingDepth;
  indented?: boolean;
  ordered?: boolean;
  tight?: boolean;
  exclude?: string | string[];
  skipLevels?: HeadingDepth[];
  skipParents?: Exclude<HeadingParent, 'root'>[];
};

const Toc = ({
  toc,
  maxDepth = 6,
  ordered = false,
  indented = false,
  tight = false,
  exclude,
  skipLevels = [1],
  skipParents = [],
}: Props) => {
  if (!toc) return null;

  // ********* filters **************
  const exludeRegexFilter = exclude
    ? Array.isArray(exclude)
      ? new RegExp(exclude.join('|'), 'i')
      : new RegExp(exclude, 'i')
    : new RegExp('(?!.*)');

  const skipLevelsFilter = (depth: TocItem['depth']): boolean => skipLevels.includes(depth);

  const skipParentsFilter = (parent: TocItem['parent']): boolean =>
    parent !== 'root' && skipParents.includes(parent);

  const maxDepthFilter = (depth: TocItem['depth']): boolean => depth > maxDepth;
  // ********************************

  const filteredToc = toc.filter(
    heading =>
      !maxDepthFilter(heading.depth) &&
      !skipLevelsFilter(heading.depth) &&
      !skipParentsFilter(heading.parent) &&
      !exludeRegexFilter.test(heading.value),
  );

  return (
    <div>
      <summary className={styles['toc-title']}>
        <strong>TABLE OF CONTENTS</strong>
      </summary>
      <ul className={styles['toc-list']}>
        {filteredToc.map(heading => (
          <li
            key={heading.value}
            className={clsx(
              indented && styles[`h${heading.depth}indent`],
              tight && styles['tight'],
            )}
          >
            <a href={heading.href}>
              <div className={`h${heading.depth}`}>
                {ordered ? (
                  <strong>
                    <span className={styles['numbering']}>
                      {heading.numbering.slice(1).join('.')}.
                    </span>
                  </strong>
                ) : null}
                <span className={styles['heading']}>{heading.value}</span>
                <span className={styles['href']}>{heading.href}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
