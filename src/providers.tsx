import { FC, ReactNode } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';

interface IProps {
  children: ReactNode;
}

const registry = new SheetsRegistry();
const generateId = createGenerateId({ minify: false });

const Providers: FC<IProps> = ({ children }) => {


  return (
      <JssProvider generateId={generateId} registry={registry}>
        {children}
      </JssProvider>
  );
};

export default Providers;
