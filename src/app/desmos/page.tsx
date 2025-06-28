// In your main page (e.g., /desmos/page.tsx)
'use client'
import dynamic from 'next/dynamic';

// Dynamically import the DesmosCalculator component with SSR disabled
const DesmosCalculator = dynamic(() => import('./DesmosCalculator'), { ssr: false });

const DesmosPage = () => {
  return (
    <div>
      <DesmosCalculator />
    </div>
  );
};

export default DesmosPage;
