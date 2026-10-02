import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  to?: string; // navigates like a Figma prototype link
  full?: boolean;
};

const styles = {
  primary: 'bg-primary text-white hover:opacity-90',
  secondary: 'bg-primary-bg text-primary hover:opacity-90',
  ghost: 'bg-transparent text-primary hover:bg-primary-bg',
};

export default function Button({ variant = 'primary', to, full, className = '', children, ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md text-button transition active:scale-[0.98] ${styles[variant]} ${full ? 'w-full' : ''} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
