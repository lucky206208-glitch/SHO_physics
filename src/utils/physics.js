export const calculateParameters = (m, k, x0, v0) => {
  // Prevent division by zero
  const mass = Math.max(m, 0.1);
  const springK = Math.max(k, 0.1);
  
  const omega = Math.sqrt(springK / mass);
  
  // Calculate Amplitude A and Phase phi
  // x(0) = A cos(phi) = x0
  // v(0) = -A omega sin(phi) = v0
  // tan(phi) = -v0 / (omega * x0)
  
  // Using atan2(y, x) -> atan2(-v0/omega, x0)
  // Check if x0 is effectively 0 to avoid issues, though atan2 handles (0,0) generally
  
  let A, phi;
  
  if (Math.abs(x0) < 0.0001 && Math.abs(v0) < 0.0001) {
    A = 0;
    phi = 0;
  } else {
    // A^2 = x0^2 + (v0/omega)^2
    A = Math.sqrt(x0 * x0 + (v0 / omega) * (v0 / omega));
    phi = Math.atan2(-v0 / omega, x0);
  }

  return { omega, A, phi, mass, springK };
};

export const getPositionAtTime = (t, { omega, A, phi }) => {
  return A * Math.cos(omega * t + phi);
};

export const getVelocityAtTime = (t, { omega, A, phi }) => {
  return -A * omega * Math.sin(omega * t + phi);
};

export const getEnergy = (x, v, m, k) => {
  const pe = 0.5 * k * x * x;
  const ke = 0.5 * m * v * v;
  return { pe, ke, total: pe + ke };
};
