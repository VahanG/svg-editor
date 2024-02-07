import { PropsWithChildren } from 'react';

function Content({ children }: PropsWithChildren) {
  const contentStyles = {
    paddingTop: 'var(--spacing-56)',
  };

  return <div style={contentStyles}>{children}</div>;
}

export default Content;
