import { forwardRef, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className = '', hover = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        bg-white p-8
        ${hover ? 'transition-all duration-300 hover:bg-off/50' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;

