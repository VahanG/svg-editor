import Button from './Button';
import { useCallback, useState } from 'react';
import { PATH_PARAM_NAME } from '../constants';

const ShareButton = ({ createPathString }: { createPathString: () => string | void }) => {
  const [showMessage, setShowMessage] = useState(false);
  const createShareLink = useCallback(async () => {
    const pathString = createPathString();
    const searchParams = new URLSearchParams(window.location.search);
    if (pathString) {
      searchParams.set(PATH_PARAM_NAME, pathString);
      await navigator.clipboard.writeText(`${window.location.origin}?${searchParams.toString()}`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }, [createPathString]);

  return (
    <div>
      <Button onClick={createShareLink}>share</Button>
      {showMessage && <span>link copied to clipboard</span>}
    </div>
  );
};

export default ShareButton;
