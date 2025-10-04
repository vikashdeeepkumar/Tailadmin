import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import '@/components/ReactQuillEditor/quill.css'; 
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false, 
  loading: () => <p>Loading editor...</p>, 
});

export default ReactQuill;
