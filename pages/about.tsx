import Head from 'next/head';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About - Mandjo Béa Boré</title>
        <meta name="description" content="About Mandjo Béa Boré - GeoDeveloper & GeoDesigner" />
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
          About Me
        </h1>
        
        <div style={{ color: '#555', fontSize: '1.1rem' }}>
          <p>
            Welcome! I'm <strong>Mandjo Béa Boré</strong>, a passionate GeoDeveloper & GeoDesigner 
            specializing in creating innovative mapping solutions and geographic visualization tools.
          </p>
          
          <p>
            With expertise in web development, cartography, and spatial data analysis, I bridge 
            the gap between complex geographic data and user-friendly applications.
          </p>
          
          <h2 style={{ color: '#709425', marginBottom: '1rem', marginTop: '2rem' }}>
            Skills & Expertise
          </h2>
          
          <ul>
            <li>Geographic Information Systems (GIS)</li>
            <li>Web Mapping Applications</li>
            <li>Spatial Data Analysis</li>
            <li>Cartographic Design</li>
            <li>Full-Stack Web Development</li>
            <li>React, Next.js, TypeScript</li>
          </ul>
          
          <h2 style={{ color: '#709425', marginBottom: '1rem', marginTop: '2rem' }}>
            Mission
          </h2>
          
          <p>
            My mission is to make geographic data accessible and meaningful through 
            thoughtful design and innovative technology solutions.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
