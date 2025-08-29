'use client';

import Link from 'next/link';
import React from 'react';

interface InfoBarProps {
  pages?: Array<{
    slug: string;
    title: string;
    menuTitle?: string;
  }>;
  parts?: Array<{
    title: string;
    html: string;
  }>;
}

/**
 * InfoBar - Barre d'informations et de navigation (Footer)
 * - Position: absolute bottom, entre InfoBox et ActionsBar
 * - Background: #34495e (bleu-gris foncé)
 * - CSS pur sans Material-UI
 */
export default function InfoBar({ pages = [], parts = [] }: InfoBarProps) {
  return (
    <div
      className="infobar"
      style={{
        width: '100%',
        background: '#34495e',
        borderTop: '1px solid #2c3e50',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '48px',
        fontSize: '12px',
        fontFamily: "'Open Sans', Arial, sans-serif"
      }}
    >
      {/* Navigation des pages */}
      <div
        className="pages-navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/pages/${page.slug}`}
            style={{
              color: '#bdc3c7',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: '400',
              transition: 'color 0.2s ease',
              padding: '4px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ecf0f1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#bdc3c7';
            }}
          >
            {page.menuTitle || page.title}
          </Link>
        ))}
      </div>

      {/* Sections / Parts */}
      <div
        className="info-sections"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {parts.map((part, index) => (
          <React.Fragment key={part.title}>
            {index > 0 && (
              <div
                style={{
                  width: '1px',
                  height: '16px',
                  background: '#7f8c8d',
                  margin: '0 4px'
                }}
              />
            )}
            <span
              style={{
                color: '#bdc3c7',
                fontSize: '11px',
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={part.title} // Tooltip pour le texte tronqué
            >
              {part.title}
            </span>
          </React.Fragment>
        ))}
        
        {/* Copyright / Info supplémentaire */}
        {parts.length === 0 && (
          <span
            style={{
              color: '#95a5a6',
              fontSize: '11px',
              fontStyle: 'italic'
            }}
          >
            © 2024 Mandjo Boré • Développé avec Next.js
          </span>
        )}
      </div>
    </div>
  );
}
