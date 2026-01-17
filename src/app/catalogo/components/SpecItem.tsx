'use client';

import { LucideIcon } from 'lucide-react';

interface SpecItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function SpecItem({ icon: Icon, label, value }: SpecItemProps) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-[#FF8806] flex-shrink-0" />
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </li>
  );
} 