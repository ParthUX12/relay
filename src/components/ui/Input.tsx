import { InputHTMLAttributes } from 'react';

export default function Input({ label, className = '', ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="text-small text-grey-65 mb-1 block">{label}</span>}
      <input
        className={`w-full h-11 px-4 rounded-md border border-grey-35 bg-white text-body outline-none focus:border-primary ${className}`}
        {...rest}
      />
    </label>
  );
}
