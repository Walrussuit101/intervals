import { Workbook } from 'exceljs';
import { IntervalSubjects } from './types';

interface Counts {
    total: number;
    oCount: number;
}

export const downloadSpreadsheet = async (subjects: IntervalSubjects[], comparison?: boolean) => {
    // build workbook / add a sheet
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Interval Recording');

    // build headers
    const headers = ['Interval'];

    const hasNames = subjects.some(subject => subject.name !== undefined);
    if (hasNames) {
        headers.push('Name');
    }

    headers.push('Target');

    if (comparison) {
        headers.push('Comparison');
    }

    sheet.addRow(headers);

    // add data rows
    subjects.forEach((subject, i) => {
        const data = [(i + 1).toString()];

        if (hasNames) {
            data.push(subject.name === undefined ? 'none' : subject.name);
        }

        data.push(subject.target === null ? 'none' : subject.target.toUpperCase());

        if (comparison) {
            data.push(subject.comparison === null ? 'none' : subject.comparison.toUpperCase());
        }

        sheet.addRow(data);
    });    

    // X percentage
    // quick and dirty code, she needs this tomorrow lol
    const percentages = new Map<string, Counts>(); // name -> {}
    if (hasNames) {
        // have names, get each name and initialize counts
        const names = new Set<string>();

        subjects.forEach(subject => {
            if (subject.name !== undefined) {
                names.add(subject.name)
            }
        });

        names.forEach(name => {
            percentages.set(name, {
                total: 0,
                oCount: 0
            });
        });
    } else {
        // doesnt have names, just 1 target
        percentages.set('Target', {
            total: 0,
            oCount: 0
        });
    }

    subjects.forEach(subject => {
        if (hasNames) {
            const oldCounts = percentages.get(subject.name!);

            if (oldCounts) {
                percentages.set(subject.name!, {
                    total: oldCounts.total + 1,
                    oCount: subject.target === 'o' ? oldCounts.oCount + 1 : oldCounts.oCount
                });
            }
        } else {
            const oldCounts = percentages.get('Target');

            if (oldCounts) {
                percentages.set('Target', {
                    total: oldCounts.total + 1,
                    oCount: subject.target === 'o' ? oldCounts.oCount + 1 : oldCounts.oCount
                });
            }
        }
    });

    sheet.addRow([]);
    percentages.forEach((counts, name) => {
        const percentage = (counts.oCount / counts.total) * 100;
        const rounded = Math.round(percentage * 100) / 100;
        sheet.addRow([name, `${rounded}%`]);
    });

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