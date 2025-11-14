import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GuidewProvider } from './state/GuidewProvider'

createRoot(document.getElementById("root")!).render(
  <GuidewProvider>
    <App />
  </GuidewProvider>
);
