import React from 'react'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'

export default function HeroSection() {
  return (
    <div
      style={{
        position: 'relative',
        padding: '80px 2rem',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1
          style={{
            color: 'white',
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Welcome
          <br />
          to
          <br />
          Bangla Library
        </h1>

        <p
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '2rem auto 0',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          Discover a world of knowledge and literary magic
        </p>

        {/* Button that routes to /books */}
        <Link to={booksRoute.to} style={{ textDecoration: 'none' }}>
          <button
            style={{
              marginTop: '2rem',
              padding: '12px 36px',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#333',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  )
}
