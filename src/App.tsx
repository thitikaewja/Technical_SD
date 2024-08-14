import { useState } from 'react';
import { Button } from 'antd';
import MovePosition from './components/position';
import SPA from './components/spa';

function App() {
  const [components, setComponents] = useState<'movePosition' | 'spa' | undefined>('movePosition');

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
          <Button 
            type="primary" 
            style={{ marginRight: '10px' }} 
            onClick={() => setComponents('movePosition')}
          >
            MovePosition
          </Button>
          <Button 
            type="primary" 
            onClick={() => setComponents('spa')}
          >
            SPA
          </Button>
        </div>
      
      {/* Show selected component */}
      {components === 'movePosition' && <MovePosition />}
      {components === 'spa' && <SPA />}
    </div>
  );
}

export default App;
