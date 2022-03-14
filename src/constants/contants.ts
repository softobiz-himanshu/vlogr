export const propertiesToInclude = ['id', 'selectable']
export const initialScaleFactor = 0.1
export const minScaleValue = initialScaleFactor / 1800;
export const scaleRange = initialScaleFactor - minScaleValue;
export const scaleUnit = scaleRange / 100;

export const twoSeconds = initialScaleFactor / 2;
export const threeSeconds = initialScaleFactor / 3;
export const fiveSeconds = initialScaleFactor / 5;
export const tenSeconds = initialScaleFactor / 10;
export const thirtySeconds = initialScaleFactor / 30;
export const oneMinute = initialScaleFactor / 60;
export const fiveMintes = initialScaleFactor / 300;
export const tenMinutes = initialScaleFactor / 600;
export const twentyMinutes = initialScaleFactor / 1200;
export const thirtyMinutes = initialScaleFactor / 1800;

export const scaleUnits = 5;

export const zoomSliderStep = 2;

export const scaleFactorsList = [
    initialScaleFactor,
    twoSeconds,
    threeSeconds,
    fiveSeconds,
    tenSeconds,
    thirtySeconds,
    oneMinute,
    fiveMintes,
    tenMinutes,
    twentyMinutes,
    thirtyMinutes,
]