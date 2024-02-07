import { useState } from 'react';

const Info = () => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <div  style={{height: 40}}  onClick={() => setShow(state => !state)} >i</div>
      {show && (
        <div style={{ position: 'absolute', bottom: 40, background: 'white', width: 400, display: 'flex', flexWrap: 'wrap', gap: 15 }}>
          <h4>select a shape in Editor and open the miniapp to edit the shape</h4>
          <li>click on canvas to add point</li>
          <li>drag object to move</li>
          <li>enable draw mode for free draw</li>
          <li>hold meta(ctr/command) key to add point inside a shape</li>
          <li>hold meta(ctr/command) key to add point in draw mode</li>
          <li>shift + click on handler to remove point</li>
          <li>click on stroke(border) to add point between 2 nearest points</li>
          <li>click on info icon again to close this message</li>
        </div>
      )}
    </div>
  );
};

export default Info;
