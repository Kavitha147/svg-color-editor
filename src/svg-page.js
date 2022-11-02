import React, { useState } from 'react';
import { hexToCSSFilter } from "hex-to-css-filter";
import SVG from 'react-inlinesvg';
import './svg-page.css';

const SVGPage = () => {

    const [file, setFile] = useState();
    const [svgFile, setSvg] = useState();
    const [hexColor, setHexColor] = useState("#000");

    const handleChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let fileValue = e.target.files[0];
        reader.onloadend = () => {
            // setFile(fileValue);
            setSvg(reader.result);
        }

        reader.readAsDataURL(fileValue)
    }
    let cssFilterValue = "";
    const cssFilter = hexToCSSFilter(hexColor, {
        acceptanceLossPercentage: 1,
        maxChecks: 10
    });
    console.log("cssfilter",cssFilter)
    cssFilterValue = cssFilter.filter.replace(";", "");
    console.log("filvalue", cssFilterValue)
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
           
            {/* <SVGFile style={{ filter: `${cssFilterValue}` }} /> */}
        </div>
    )
}
export default SVGPage;

// export const RenderSvg = (svg) => <svg dangerouslySetInnerHTML={{ __html: svg }} />;
export const RenderSvg = svg => React.createElement('svg', {
    dangerouslySetInnerHTML: { __html: svg }
});