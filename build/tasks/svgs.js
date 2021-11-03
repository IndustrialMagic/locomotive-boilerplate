import loconfig from '../../loconfig.json';
import message from '../utils/message.js';
import notification from '../utils/notification.js';
import template from '../utils/template.js';
import optimize from '../utils/svgo.js';
import { basename } from 'node:path';
import mixer from 'svg-mixer';

/**
 * @const {object} defaultMixerOptions     - The default shared Mixer options.
 * @const {object} developmentMixerOptions - The predefined Mixer options for development.
 * @const {object} productionMixerOptions  - The predefined Mixer options for production.
 */
export const defaultMixerOptions = {
    spriteConfig: {
        usages: false,
    },
};
export const developmentMixerOptions = Object.assign({}, defaultMixerOptions);
export const productionMixerOptions  = Object.assign({}, defaultMixerOptions);

/**
 * @const {object} defaultSVGOOptions     - The default shared SVGO options.
 * @const {object} developmentSVGOOptions - The predefined SVGO options for development.
 * @const {object} productionSVGOOptions  - The predefined SVGO options for production.
 */
export const defaultSVGOOptions = {
};
export const developmentSVGOOptions = Object.assign({}, defaultSVGOOptions);
export const productionSVGOOptions  = Object.assign({}, defaultSVGOOptions);

/**
 * @const {object|boolean} developmentSVGsArgs - The predefined `compileSVGs()` options for development.
 * @const {object|boolean} productionSVGsArgs  - The predefined `compileSVGs()` options for production.
 */
export const developmentSVGsArgs = [
    developmentMixerOptions,
    false,
];
export const productionSVGsArgs  = [
    productionMixerOptions,
    productionSVGOOptions,
];

/**
 * Generates and transforms SVG spritesheets.
 *
 * @async
 * @param  {object} [mixerOptions=null] - Customize the Mixer API options.
 *     If `null`, default production options are used.
 * @param  {object|boolean} [svgoOptions=null] - Customize the SVGO processor API options.
 *     If `null`, default production options are used.
 * @return {Promise}
 */
export default async function compileSVGs(mixerOptions = null, svgoOptions = null) {
    if (mixerOptions == null) {
        mixerOptions = productionMixerOptions;
    } else if (
        mixerOptions !== developmentMixerOptions &&
        mixerOptions !== productionMixerOptions
    ) {
        mixerOptions = Object.assign({}, defaultMixerOptions, mixerOptions);
    }

    if (optimize) {
        if (svgoOptions == null) {
            svgoOptions = productionSVGOOptions;
        } else if (
            svgoOptions !== false &&
            svgoOptions !== developmentSVGOOptions &&
            svgoOptions !== productionSVGOOptions
        ) {
            svgoOptions = Object.assign({}, defaultSVGOOptions, svgoOptions);
        }
    }

    loconfig.tasks.svgs.forEach(async ({
        includes,
        outfile
    }) => {
        const filename = basename(outfile || 'undefined');

        const timeLabel = `${filename} compiled in`;
        console.time(timeLabel);

        try {
            includes = includes.map((path) => template(path));
            outfile  = template(outfile);

            const result = await mixer(includes, mixerOptions);

            if (optimize && svgoOptions) {
                result.content = optimize(result.content, svgoOptions).data;
            }

            await result.write(outfile);

            message(`${filename} compiled`, 'success', timeLabel);
        } catch (err) {
            message(`Error compiling ${filename}`, 'error');
            message(err);

            notification({
                title:   `${filename} compilation failed 🚨`,
                message: `${err.name}: ${err.message}`
            });
        }
    });
};
