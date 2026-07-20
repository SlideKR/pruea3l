import { useState, useEffect } from 'react';

/**
 * useFetch: hook simple para GET con estados loading/data/error
 * usage: const {data, loading, error, refetch} = useFetch(url);
 */
export default function useFetch(url){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(()=>{
    if(!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(url)
      .then(async res => {
        if(!res.ok) throw new Error('Respuesta no OK: ' + res.status);
        const json = await res.json();
        if(!cancelled) setData(json);
      })
      .catch(err => { if(!cancelled) setError(err.message || 'Error'); })
      .finally(()=>{ if(!cancelled) setLoading(false); });

    return ()=>{ cancelled = true; };
  }, [url, refreshIndex]);

  return {
    data,
    loading,
    error,
    refetch: ()=>setRefreshIndex(i=>i+1)
  };
}
