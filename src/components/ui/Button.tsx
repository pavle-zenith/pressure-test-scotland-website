import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'white' | 'phone';
type Size = 'md' | 'lg';

// Inline arrow that never wraps to a new line. Plain glyph, right side.
function Arrow() {
  return (
    <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  >;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >;

type Props = LinkProps | NativeButtonProps;

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', arrow = false, children, className, ...rest } = props;
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkProps;
    // Internal links use next/link; external (tel:, mailto:, http) use a plain anchor.
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          <span className={styles.label}>{children}</span>
          {arrow && <Arrow />}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        <span className={styles.label}>{children}</span>
        {arrow && <Arrow />}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as NativeButtonProps;
  return (
    <button type={type} className={cls} {...buttonRest}>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
