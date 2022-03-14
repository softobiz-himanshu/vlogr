import { fiveMintes, fiveSeconds, initialScaleFactor, oneMinute, scaleFactorsList, scaleUnits, tenMinutes, tenSeconds, thirtyMinutes, thirtySeconds, threeSeconds, twentyMinutes, twoSeconds, zoomSliderStep } from "@/constants/contants"
import { setScaleFactor } from "@/store/slices/timeline/actions"
import { AppDispatch } from "@/store/store";


export const handleZoom = (zoomScale: number, dispatch: AppDispatch) => {
    const scaleFactor = getScaleFactor(zoomScale);
    dispatch(setScaleFactor({ scale: scaleFactor }));
}

export const getScaleFactor = (zoomScale: number): number => {
    const scales = {
        100: initialScaleFactor,
        90: twoSeconds,
        80: threeSeconds,
        70: fiveSeconds,
        60: tenSeconds,
        50: thirtySeconds,
        40: oneMinute,
        30: fiveMintes,
        20: tenMinutes,
        10: twentyMinutes,
        0: thirtyMinutes,
    };

    if ((zoomScale % 10 === 0)) {
        return scales[zoomScale]
    }

    //Example: 94 -> 90
    const castedValue = Math.floor(zoomScale / 10) * 10;
    //Example: 94 -> 100
    const nextScaleValue = castedValue + 10;

    //Example: 0.1 / 0.05 = 2
    const scaleSeconds1 = initialScaleFactor / scales[castedValue];
    //Example: 0.1 / 0.1 = 1
    const scaleSeconds2 = initialScaleFactor / scales[nextScaleValue];

    //Example: (2 - 1) / 5 = 0.2 
    const interval = (scaleSeconds1 - scaleSeconds2) / scaleUnits;

    //Example: 1 + (94 - 90) / 2 * 0.2 = 1.2
    const scaleSeconds = scaleSeconds2 + (Math.round(((nextScaleValue - zoomScale) / zoomSliderStep * interval) * 100) / 100);

    //Example: 0.1 / 1.2
    const scaleFactor = initialScaleFactor / scaleSeconds;

    return scaleFactor;
}

export const getZoomSliderValue = (scaleFactor: number) => {
    const sliderValues: { [key: string]: number } = {};

    for (let i = 0; i <= 100 / zoomSliderStep; i++) {
        const factor = getScaleFactor(i * zoomSliderStep);
        sliderValues[factor] = i * zoomSliderStep
    }

    return sliderValues[scaleFactor];
}