import Head from 'next/head';
import React from 'react';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Mandjo Béa Boré</title>
        <meta name="description" content="Portfolio of projects by Mandjo Béa Boré - GeoDeveloper & GeoDesigner" />
      </Head>
      
      <div style={{ 
        lineHeight: '1.6', 
        margin: '0 auto', 
        maxWidth: '800px',
        padding: '2rem' 
      }}>
        <h1 style={{ 
          color: '#333', 
          fontSize: '2.5rem',
          marginBottom: '1.5rem' 
        }}>
          Portfolio
        </h1>
        
        <div style={{ color: '#555', fontSize: '1.1rem' }}>
          <p>
            A collection of my work showcasing expertise in geographic development, 
            web mapping, and spatial data visualization.
          </p>
          
          <h2 style={{ color: '#709425', marginBottom: '1rem', marginTop: '2rem' }}>
            Recent Projects
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '2rem',
            marginTop: '1.5rem' 
          }}>
            <article style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '1.5rem' 
            }}>
              <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>
                Next.js Geographic Blog Platform
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Migration from Gatsby v1 to Next.js 15 maintaining original design 
                and implementing modern React patterns with TypeScript.
              </p>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>Technologies:</strong> Next.js, TypeScript, Redux Toolkit, CSS Modules
              </div>
            </article>
            
            <article style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '1.5rem' 
            }}>
              <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>
                Interactive Web Mapping Solutions
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Development of custom web mapping applications with real-time data 
                integration and advanced spatial analysis capabilities.
              </p>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>Technologies:</strong> Leaflet, OpenLayers, PostGIS, Node.js
              </div>
            </article>
            
            <article style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '1.5rem' 
            }}>
              <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>
                GIS Data Visualization Platform
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Comprehensive platform for visualizing complex geographic datasets 
                with interactive charts and customizable map displays.
              </p>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>Technologies:</strong> D3.js, React, Python, GDAL
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
