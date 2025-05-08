import { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove('page-loading');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="page-loading active">
      <div className="page-loading-inner">
        <div className="page-spinner"></div>
        <span>Carregando...</span>
      </div>
    </div>
  );
};

export default Preloader; 