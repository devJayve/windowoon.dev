const plugin = require('tailwindcss/plugin');

const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'gradient-size': value => ({
          '--gradient-size': value,
        }),
      },
      {
        values: {
          sm: '100px',
          md: '200px',
          lg: '300px',
          xl: '500px',
          '2xl': '800px',
        },
      },
    );

    matchUtilities(
      {
        'bg-radient': value => ({
          'background-image': `radial-gradient(${value.replace(
            'circle',
            'circle var(--gradient-size, 300px)',
          )},var(--tw-gradient-stops))`,
        }),
      },
      { values: theme('radialGradients') },
    );
  },
  {
    theme: {
      radialGradients: _presets(),
    },
  },
);

/**
 * utility class presets
 */
function _presets() {
  const shapes = ['circle', 'ellipse'];
  const pos = {
    c: 'center',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
  };

  let result = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

module.exports = radialGradientPlugin;
