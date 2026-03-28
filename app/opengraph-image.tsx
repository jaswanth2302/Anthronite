import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Anthronite - Intelligence, Shipped.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.03,
          }}
        />
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              background: 'linear-gradient(135deg, #EDEDED 0%, #A1A1A1 50%, #EDEDED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Anthronite
          </div>
          
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Intelligence, Shipped.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 60,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: 'linear-gradient(to bottom, #FFFFFF, #A1A1A1)',
              borderRadius: 2,
            }}
          />
          AI Research & Engineering Lab
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Chennai / Global
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
