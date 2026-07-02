import { Children, cloneElement, isValidElement } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', style }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = ({ children, className = '' }) => {
  const items = Children.toArray(children);
  const count = items.length;

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner" style={{ '--stack-count': count }}>
        {items.map((child, index) => {
          if (!isValidElement(child)) return child;

          return cloneElement(child, {
            style: {
              '--stack-index': index,
              '--stack-reverse-index': count - index - 1,
              zIndex: index + 1,
              ...child.props.style,
            },
          });
        })}
      </div>
    </div>
  );
};

export default ScrollStack;
