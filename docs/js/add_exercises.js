// Script bổ sung 10 bài tập dễ cho mỗi buổi - v3
// Phân tích data.js dòng theo dòng để đảm bảo chính xác

const fs = require('fs');
const file = process.argv[2] || 'data.js';
const lines = fs.readFileSync(file, 'utf8').split('\n');

// Load exercises
const exercisesByLesson = require('./exercises_data.js');

const output = [];
let currentTitle = null;
let inExercises = false;
let exerciseIndent = 0;
let addedCount = 0;
let skippedTitles = [];

// Hàm tìm title bài học
function isLessonTitleLine(line) {
    return /^\s{16}title:\s*"[^"]+"/.test(line);
}

// Hàm tìm exercises line
function isExercisesLine(line) {
    return /^\s{16}exercises:\s*\[/.test(line);
}

// Hàm tìm kết thúc exercises (next line bắt đầu bằng 16 spaces + tên khác)
function isExercisesEndLine(line) {
    // Kết thúc exercises khi có dòng "                ]," (16 spaces + ],)
    return /^\s{16}\],/.test(line);
}

let i = 0;
let titleForCurrentExercises = null;
let mode = 'normal'; // 'normal' | 'exercises'

while (i < lines.length) {
    const line = lines[i];

    if (mode === 'normal') {
        const titleMatch = line.match(/^\s{16}title:\s*"([^"]+)"/);
        if (titleMatch) {
            titleForCurrentExercises = titleMatch[1];
        }

        if (isExercisesLine(line)) {
            // Bắt đầu phần exercises
            if (titleForCurrentExercises && exercisesByLesson[titleForCurrentExercises]) {
                // Tạo exercises mới
                const newExercises = exercisesByLesson[titleForCurrentExercises];
                output.push('                exercises: [');
                for (let j = 0; j < newExercises.length; j++) {
                    const ex = newExercises[j];
                    const comma = j < newExercises.length - 1 ? ',' : '';
                    output.push(`                    { level: "easy",   title: "${ex.title}", desc: "${ex.desc}", hint: "${ex.hint}" }${comma}`);
                }
                // Bỏ qua các dòng exercises cũ cho đến khi gặp "                ],"
                mode = 'exercises';
                addedCount++;
                i++;
                continue;
            } else {
                // Giữ nguyên exercises cũ (không có bài tập mới)
                if (titleForCurrentExercises) {
                    skippedTitles.push(titleForCurrentExercises);
                }
                output.push(line);
                mode = 'exercises';
                i++;
                continue;
            }
        }

        output.push(line);
        i++;
    } else {
        // mode === 'exercises' - đang trong phần exercises cũ, bỏ qua cho tới kết thúc
        if (isExercisesEndLine(line)) {
            // Kết thúc exercises
            output.push(line);
            mode = 'normal';
            titleForCurrentExercises = null;
            i++;
        } else {
            i++;
        }
    }
}

console.error(`[Thêm bài tập] Thành công: ${addedCount} bài học`);
if (skippedTitles.length > 0) {
    console.error(`[Không có bài tập mới - exercises: []]: ${skippedTitles.length} bài`);
}

fs.writeFileSync(process.argv[3] || 'data_new.js', output.join('\n'));
console.error(`[Output] Đã ghi file mới.`);