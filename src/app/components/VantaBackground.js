import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = WAVES({
      el: vantaRef.current,
      THREE: THREE, // Pass the THREE instance
      color: 0x000000, // Customize the color
      shininess: 50.0, // Customize the shininess
      waveHeight: 20.0, // Customize the wave height
      waveSpeed: 1.0, // Customize the wave speed
      zoom: 1.0, // Customize the zoom level
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {children}
    </div>
  );
};

export default VantaBackground;
