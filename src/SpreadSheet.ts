import { Workbook } from 'exceljs';
import { IntervalSubjects } from './types';

export const downloadSpreadsheet = async (subjects: IntervalSubjects[], comparison?: boolean) => {
    // build workbook / add a sheet
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Interval Recording');

    if (comparison) {
        // write data to sheet
        sheet.addRow(['Interval', 'Target', 'Comparison']);

        subjects.forEach((subject, i) => {       
            sheet.addRow([
                i+1,
                subject.target === null ? 'none' : subject.target.toUpperCase(),
                subject.comparison === null ? 'none' : subject.comparison.toUpperCase()
            ]);
        });
    } else {
        // write data to sheet
        sheet.addRow(['Interval', 'Target']);

        subjects.forEach((subject, i) => {       
            sheet.addRow([
                i+1,
                subject.target === null ? 'none' : subject.target.toUpperCase()
            ]);
        });
    }
    

    // build blob url
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const hours12Hour = hours > 12 ? hours - 12 : hours;

    const hoursDisplay = hours12Hour < 10 ? `0${hours12Hour}` : hours12Hour;    
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    const am = hours < 12 ? true : false;
 
    const filename = `intervals_${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}_${hoursDisplay}-${minutesDisplay}_${am ? 'AM' : 'PM'}.xlsx`
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    // window.open(url);
}