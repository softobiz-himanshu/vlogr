import { LineType } from "@/constants/lineType";

export const setLineType = (fromLine: LineType | null, y: number) => {

    let lineType: LineType = LineType.elements;

    if (fromLine === LineType.elements) {
        lineType = y <= 20 ? LineType.elements : y > 20 && y <= 60 ? LineType.texts : LineType.audios;
    } else if (fromLine === LineType.texts) {
        lineType = y < - 20 ? LineType.elements : y >= -20 && y <= 20 ? LineType.texts : LineType.audios
    } else if (fromLine === LineType.audios) {
        lineType = y < -20 && y > -60 ? LineType.texts : y < -60 ? LineType.elements : LineType.audios;
    }

    return lineType;
}