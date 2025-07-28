import React from 'react';
import { cn, getDifficultyColor, getCategoryColor } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'difficulty' | 'category';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, variant = 'default', difficulty, category, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
    
    let variantClasses = 'bg-gray-100 text-gray-800 border-gray-200';
    
    if (variant === 'difficulty' && difficulty) {
      variantClasses = getDifficultyColor(difficulty);
    } else if (variant === 'category' && category) {
      variantClasses = getCategoryColor(category);
    }

    return (
      <span
        ref={ref}
        className={cn(baseClasses, variantClasses, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;