export const colors = {
    primary: {
      100: '#D5FFFD',
      400: '#6EEAE4', // default
      500: '#38CFC8', // hover
      600: '#2BB3AD', // active
      700: '#1F7E7A', // dimmed
    },
  
    gradient: {
      mint: 'linear-gradient(180deg, #D5FFFD 0%, #6EEAE4 100%)',
      mintHover: 'linear-gradient(180deg, #D5FFFD 0%, #6EEAE4 100%)',
      mint2: 'linear-gradient(270deg, #6EEAE4 0%, #D5FFFD 100%)',
  
      black1:
        'linear-gradient(180deg, rgba(25,25,26,0.85) 30%, rgba(25,25,26,0) 100%)',
      black2:
        'linear-gradient(180deg, rgba(25,25,26,0) 0%, rgba(25,25,26,0.85) 70%)',
      gray:
        'linear-gradient(180deg, rgba(226,230,255,0) 0%, rgba(226,230,255,0.08) 100%)',
    },

    gray: {
      0: '#FFFFFF',
      100: '#EBEBEB',
      200: '#D3D3D3', // text-primary
      300: '#B2B2B4', // text-secondary
      400: '#8D8C8F', // icon
      500: '#78787D',
      600: '#525156',
      700: '#403F44',
      800: '#36353A', // bg-hover
      900: '#302F32', // bg-secondary
      1000: '#242426', // bg
      a80: 'rgba(36,36,38,0.8)',
    },

    text: {
      primary: '#D3D3D3',
      secondary: '#B2B2B4',
    },
  
    blueWhite: {
      bg5: 'rgba(226,230,255,0.05)',
      bg8: 'rgba(226,230,255,0.08)',
      bg20: 'rgba(226,230,255,0.2)',
      border10: 'rgba(226,230,255,0.05)',
    },
  
    status: {
      red: {
        50: '#FFF3F4',
        100: '#FFCACC',
        200: '#FF4D5F',
        300: '#E33E4E',
      },
      blue: {
        50: '#F1F7FF',
        100: '#E0EDFF',
        200: '#A6C9FF',
        300: '#0066FF',
      },
    },
  } as const;
  