const plugin = require('tailwindcss/plugin')

// const radialGradientPlugin = plugin(
//     function({ matchUtilities, theme }) {
//         matchUtilities(
//             {
//                 'bg-radial': value => ({
//                     'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
//                 }),
//             },
//             {
//                 values: {
//                     'circle-center': 'circle at center',
//                     'circle-top': 'circle at top',
//                     'circle-bottom': 'circle at bottom',
//                     'circle-left': 'circle at left',
//                     'circle-right': 'circle at right',
//                     'ellipse-center': 'ellipse at center',
//                     'ellipse-top': 'ellipse at top',
//                     'ellipse-bottom': 'ellipse at bottom',
//                     'ellipse-left': 'ellipse at left',
//                     'ellipse-right': 'ellipse at right',
//                     ...theme('radialGradients', {})
//                 }
//             }
//         )
//     },
//     {
//         theme: {
//             radialGradients: {
//                 'time-morning': 'circle at 75% 25%',
//                 'time-noon': 'circle at 50% 0%',
//                 'time-evening': 'circle at 25% 25%',
//                 'time-night': 'circle at 50% 100%',
//             }
//         }
//     }
// )
//
// module.exports = radialGradientPlugin


const radialGradientPlugin = plugin(
    function ({ matchUtilities, theme }) {
        matchUtilities(
            {
                // map to bg-radient-[*]
                'bg-radient': (value) => ({
                    'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
                }),
            },
            { values: theme('radialGradients') },
        )
    },
    {
        theme: {
            radialGradients: _presets(),
        },
    },
)

/**
 * utility class presets
 */
function _presets() {
    const shapes = ['circle', 'ellipse']
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
    }
    let result = {}
    for (const shape of shapes)
        for (const [posName, posValue] of Object.entries(pos))
            result[`${shape}-${posName}`] = `${shape} at ${posValue}`

    return result
}

module.exports = radialGradientPlugin

