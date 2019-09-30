import * as _ from './utils/utils';
import dropprImg from '../scss/dropprImg'

export default ({components: c, strings: s, useAsButton, inline, appClass, theme, lockOpacity: lo}) => {
    const hidden = con => con ? '' : 'style="display:none" hidden';
    const centerChooser = con => con ?  'style="grid-area: 4/2/2/2"' : '';

    const root = _.createFromTemplate(`
      <div :ref="root" class="pickr">

        ${useAsButton ? '' : '<button type="button" :ref="button" class="pcr-button"></button>'}

        <div :ref="app" class="pcr-app ${appClass || ''}" data-theme="${theme}" ${inline ? 'style="position: unset"' : ''} aria-label="color picker dialog" role="window">
          <div class="pcr-selection" ${hidden(c.palette)}>
            <div :obj="preview" class="pcr-color-preview" ${hidden(c.preview)}>
              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="use previous color"></button>
              <div :ref="currentColor" class="pcr-current-color"></div>
            </div>

            <div :obj="palette" class="pcr-color-palette">
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="color selection area" role="widget"></div>
            </div>

            <div :obj="hue" class="pcr-color-chooser" ${hidden(c.hue)} ${centerChooser(c.hue && !c.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="hue selection slider" role="widget"></div>
            </div>

            <div :obj="opacity" class="pcr-color-opacity" ${hidden(c.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="opacity selection slider" role="widget"></div>
            </div>
          </div>

          <div class="pcr-swatches ${c.palette ? '' : 'pcr-last'}" :ref="swatches"></div> 

          <div :obj="interaction" class="pcr-interaction" ${hidden(Object.keys(c.interaction).length)}>
            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${hidden(c.interaction.input)}>

            <input :arr="options" class="pcr-type" data-type="HEXA" value="${lo ? 'HEX' : 'HEXA'}" type="button" ${hidden(c.interaction.hex)}>
            <input :arr="options" class="pcr-type" data-type="RGBA" value="${lo ? 'RGB' : 'RGBA'}" type="button" ${hidden(c.interaction.rgba)}>
            <input :arr="options" class="pcr-type" data-type="HSLA" value="${lo ? 'HSL' : 'HSLA'}" type="button" ${hidden(c.interaction.hsla)}>
            <input :arr="options" class="pcr-type" data-type="HSVA" value="${lo ? 'HSV' : 'HSVA'}" type="button" ${hidden(c.interaction.hsva)}>
            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${hidden(c.interaction.cmyk)}>

            <input :ref="save" class="pcr-save" value="${s.save || 'Save'}" type="button" ${hidden(c.interaction.save)} aria-label="save and exit">
            <input :ref="cancel" class="pcr-cancel" value="${s.cancel || 'Cancel'}" type="button" ${hidden(c.interaction.cancel)} aria-label="cancel and exit">
            <input :ref="clear" class="pcr-clear" value="${s.clear || 'Clear'}" type="button" ${hidden(c.interaction.clear)} aria-label="clear and exit">
            <input :ref="dropper" class="pcr-dropper" value="${s.dropper || 'Dropper'}" type="button" ${hidden(c.interaction.dropper)} aria-label="pcr-dropper and exit">
          </div>
        </div>
        
        <div :ref="droppr" class="pcr-droppr">
          <div :ref="imgWrapper" class="pcr-img-wrapper">
            <img :ref="imgPreview" class="pcr-img-preview" src="${dropprImg}"></img>
            <div :ref="imgMangnifier" class="pcr-img-mangnifier">
              <div :ref="imgColorSuck" class="pcr-img-color-suck"></div>
              <div :ref="imgSuckPoint" class="pcr-img-suck-point"></div>
            </div>
          </div>
        </div>

      </div>
    `);

    const int = root.interaction;

    // Select option which is not hidden
    int.options.find(o => !o.hidden && !o.classList.add('active'));

    // Create method to find currenlty active option
    int.type = () => int.options.find(e => e.classList.contains('active'));
    return root;
}
