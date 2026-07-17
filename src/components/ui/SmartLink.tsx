import Link from 'next/link';
import type { ReactNode } from 'react';
import { isLiveHref } from '@/lib/routes';

// Renders a normal link when the target route is live, otherwise an inert span
// (no navigation) so links to not-yet-built pages never hit a 404. Drop-in for
// next/link where the href may point at an unbuilt page.
interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}

export default function SmartLink({ href, children, onClick, ...rest }: Props) {
  if (isLiveHref(href)) {
    return (
      <Link href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <span aria-disabled="true" {...rest}>
      {children}
    </span>
  );
}
