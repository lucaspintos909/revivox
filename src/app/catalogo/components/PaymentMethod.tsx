'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function PaymentMethod({ icon: Icon, title, description, className }: PaymentMethodProps) {
  return (
    <div className={cn(
      "rounded-lg p-4 flex items-start gap-3 bg-zinc-100 dark:bg-zinc-800",
      className
    )}>
      <Icon className="w-5 h-5 text-[#FF8806] flex-shrink-0" />
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-[#CFCFCF]">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
} 