import React, { useState } from 'react';
import { hexToCSSFilter } from "hex-to-css-filter";
import SVG from 'react-inlinesvg';
import useImage from 'use-image';
// import getSVGColors from 'get-svg-color-browser.es.js';
import getSvgColors from 'get-svg-colors';
import './svg-page.css';

const SvgColorEditor = () => {

    const [svgFile, setSvg] = useState();
    const [hexColor, setHexColor] = useState("#000");
    const [url, setNewUrl] = useState(svgFile);

    const [image] = useImage('data:image/svg+xml;base64'+ window.btoa(url));
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [colorPickerSelectedColor, setColorPickerSelectedColor] = useState('#ffffff');

   // Color choosen from uploaded svg
    const colors = getSvgColors(url, {flat: true});
  
    //  var regx = /#[0-9a-f]{3,6}/gi;
    //  var str = svgFile.match(regx);
    //  console.log(str)
    //  var colors = str;
    const allColors = colors.map((color)=> color.hex());
    console.log("allColors",allColors);
    const uniqueColors = Array.from(new Set(allColors));

    const handleChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let fileValue = e.target.files[0];
        reader.onloadend = () => {
            setSvg(reader.result);
        }

        reader.readAsDataURL(fileValue)
    }
    let cssFilterValue = "";
    const cssFilter = hexToCSSFilter(hexColor, {
        acceptanceLossPercentage: 1,
        maxChecks: 10
    });
    cssFilterValue = cssFilter.filter.replace(";", "");
    return (
        <div className='container'>
            Muruga
            <input type='file' onChange={handleChange} accept=".svg" />
            {svgFile &&
            <>
                <SVG src={svgFile} style={{ filter: `${cssFilterValue}` }}/>
                <input
                name="color-picker"
                aria-label="icon-color-picker"
                type="color"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
            />
            </>
            }
        </div>
    )
}
export default SvgColorEditor;
