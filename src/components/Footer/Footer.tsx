'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e5e5e5',
        padding: '2rem 0',
        textAlign: 'center',
        background: '#f9f9f9',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Mandjo Béa Boré. Data analyst - Developer.
        </p>
        <p style={{ margin: '0.5rem 0 0', color: '#888', fontSize: '0.8rem' }}>
          Design and build applications to support data including spatial & geospatial ones.
        </p>
      </div>
    </footer>
  );
}
