// ===== App State =====
let currentCourse = 'csb';
let currentLesson = null;
let previousSection = 'csb';  // Track previous section for back button

// ===== Navigation Functions =====
function navigateTo(page, skipHash = false) {
    if (!['csb', 'csa', 'csi', 'lesson-detail'].includes(page)) {
        return;  // Chỉ cho phép navigate đến các course pages
    }

    // Track previous section trước khi chuyển
    const currentActive = document.querySelector('.page-section.active');
    if (currentActive && currentActive.id !== page) {
        previousSection = currentActive.id === 'lesson-detail' ? previousSection : currentActive.id;
    }

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.course === page) {
            link.classList.add('active');
        }
    });

    const targetSection = document.getElementById(page);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (['csb', 'csa', 'csi'].includes(page)) {
            loadLessons(page);
            currentCourse = page;
        }
    }

    document.getElementById('navLinks').classList.remove('active');

    // Cập nhật hash nhưng KHÔNG trigger hashchange
    if (!skipHash && ['csb', 'csa', 'csi'].includes(page)) {
        history.replaceState(null, '', '#' + page);
    }
}

function openLesson(courseId, lessonId) {
    const course = coursesData[courseId];
    if (!course) return;
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    currentLesson = { courseId, lessonId };
    currentCourse = courseId;

    // Track section hiện tại trước khi vào lesson-detail
    const currentActive = document.querySelector('.page-section.active');
    if (currentActive && currentActive.id !== 'lesson-detail') {
        previousSection = currentActive.id;
    }

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const lessonSection = document.getElementById('lesson-detail');
    lessonSection.classList.add('active');

    renderLessonContent(course, lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cập nhật hash
    history.replaceState(null, '', '#lesson-' + courseId + '-' + lessonId);

    addNavButtons();
}

function goBack() {
    // Quay lại section trước đó (course list), KHÔNG thoát ra ngoài
    if (currentLesson) {
        navigateTo(currentLesson.courseId);
        currentLesson = null;
    } else {
        navigateTo(previousSection || 'csb');
    }
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ===== Render Functions =====
function loadLessons(courseId) {
    const course = coursesData[courseId];
    const container = document.getElementById(`${courseId}-lessons`);

    if (!container || !course) return;

    container.innerHTML = course.lessons.map(lesson => `
        <div class="lesson-card ${courseId}" onclick="openLesson('${courseId}', ${lesson.id})">
            <div class="lesson-number">${lesson.id}</div>
            <div class="lesson-info">
                <h3>${lesson.title}</h3>
                <p class="lesson-desc">${lesson.description}</p>
                <div class="lesson-meta">
                    <span>${lesson.duration}</span>
                    <span>${lesson.objectives.length} mục tiêu</span>
                </div>
            </div>
            <div class="lesson-arrow">&rarr;</div>
        </div>
    `).join('');
}

function renderLessonContent(course, lesson) {
    const container = document.getElementById('lesson-container');
    const courseId = currentLesson.courseId;

    // Find previous and next lessons
    const lessonIndex = course.lessons.findIndex(l => l.id === lesson.id);
    const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

    const html = `
        <button class="lesson-back" onclick="goBack()">
            <span>&larr;</span> Quay lại ${course.name}
        </button>

        ${renderLessonCover(course, lesson)}

        <div class="lesson-layout">
            <aside class="lesson-sidebar">
                ${renderObjectives(lesson.objectives, courseId)}
                ${renderSidebarToc(lesson.sections, courseId)}
            </aside>

            <div class="lesson-main">
                ${lesson.sections.map((section, index) => `
                    ${renderSection(section, index, courseId)}
                `).join('')}
                ${lesson.exercises && lesson.exercises.length > 0 ? `
                    ${renderExercises(lesson.exercises, courseId)}
                ` : ''}
                ${lesson.summary && lesson.summary.length > 0 ? `
                    ${renderSummary(lesson.summary, courseId)}
                ` : ''}
                ${renderNextLesson(prevLesson, nextLesson, courseId)}
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Attach smooth-scroll handlers for sidebar TOC links
    container.querySelectorAll('.sidebar-toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function renderLessonCover(course, lesson) {
    return `
        <div class="lesson-cover ${currentLesson.courseId}">
            <div class="cover-icon">${course.icon}</div>
            <div class="cover-badge">${course.name}</div>
            <h1>${lesson.title}</h1>
            <p class="cover-description">${lesson.description}</p>
            <div class="cover-meta">
                <div class="cover-meta-item">
                    <strong>${lesson.id}</strong>
                    <span>Bài học</span>
                </div>
                <div class="cover-meta-item">
                    <strong>${lesson.duration}</strong>
                    <span>Thời lượng</span>
                </div>
                <div class="cover-meta-item">
                    <strong>${lesson.objectives.length}</strong>
                    <span>Mục tiêu</span>
                </div>
            </div>
        </div>
    `;
}

function renderObjectives(objectives, courseId) {
    return `
        <div class="objectives-section ${courseId}">
            <div class="objectives-header">
                <h2>Mục tiêu bài học</h2>
            </div>
            <ul class="objectives-list">
                ${objectives.map(obj => `
                    <li>${obj}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderSidebarToc(sections, courseId) {
    if (!sections || sections.length === 0) return '';
    return `
        <div class="sidebar-toc ${courseId}">
            <div class="sidebar-toc-header">
                <h3>Nội dung bài học</h3>
            </div>
            <ul class="sidebar-toc-list">
                ${sections.map((section, index) => {
                    const slug = `section-${index + 1}`;
                    return `
                        <li>
                            <a href="#${slug}" class="sidebar-toc-link" data-target="${slug}">
                                <span class="sidebar-toc-num">${index + 1}</span>
                                <span class="sidebar-toc-title">${section.title}</span>
                            </a>
                        </li>
                    `;
                }).join('')}
            </ul>
        </div>
    `;
}

function renderSection(section, index, courseId) {
    const slug = `section-${index + 1}`;
    let content = `<div class="content-section" id="${slug}">`;
    content += `
        <h2>
            <span class="section-number">${index + 1}</span>
            ${section.icon ? `<span class="section-icon">${section.icon}</span>` : ''}
            ${section.title}
        </h2>`;

    if (section.content) {
        content += renderContentWithCode(section.content, courseId);
    }

    if (section.code) {
        content += renderCodeBlock(section.code, 'python');
    }

    content += `</div>`;
    return content;
}

function renderContentWithCode(text, courseId) {
    // Split by pre tags, process separately
    const parts = text.split(/(<pre>[\s\S]*?<\/pre>)/g);

    let result = '';

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (part.startsWith('<pre>') && part.endsWith('</pre>')) {
            // This is a code block - extract and highlight
            const code = part.slice(5, -6).trim();
            result += renderCodeBlock(code, 'python');
        } else {
            // This is text content with course-specific styling
            result += renderTextContent(part, courseId);
        }
    }

    return result;
}

function renderTextContent(text, courseId) {
    if (!text || !text.trim()) return '';

    // Simple text rendering without escape issues
    // Replace **bold** with <strong>
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Replace `code` with styled span
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Process markdown tables with course-specific styling
    html = renderMarkdownTables(html, courseId);

    // Split by newlines and wrap in paragraphs
    const lines = html.split('\n');
    const paragraphs = lines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => `<p>${line}</p>`)
        .join('');

    return `<div class="content-text">${paragraphs}</div>`;
}

function renderMarkdownTables(text, courseId) {
    // Match markdown tables (must start with | and have at least one row)
    const tableRegex = /((?:\|.+\|\n)+)/g;

    return text.replace(tableRegex, (match) => {
        const rows = match.trim().split('\n').filter(row => row.trim());
        if (rows.length < 1) return match;

        // Parse rows
        const parsedRows = rows.map(row => {
            return row.split('|').filter(cell => cell !== '').map(cell => cell.trim());
        });

        // First row is header, remaining are body
        const headerCells = parsedRows[0];
        const bodyRows = parsedRows.slice(1);

        // Skip the separator row (|---|---|)
        const isSeparator = (row) => row.every(cell => /^-+$/.test(cell));
        const filteredBody = bodyRows.filter(row => !isSeparator(row));

        let tableHtml = `<div class="table-container"><table>`;

        // Header with course-specific class
        tableHtml += `<thead class="${courseId}"><tr>`;
        headerCells.forEach(cell => {
            tableHtml += `<th>${cell}</th>`;
        });
        tableHtml += `</tr></thead>`;

        // Body
        if (filteredBody.length > 0) {
            tableHtml += `<tbody>`;
            filteredBody.forEach(row => {
                tableHtml += `<tr>`;
                row.forEach(cell => {
                    tableHtml += `<td>${cell}</td>`;
                });
                tableHtml += `</tr>`;
            });
            tableHtml += `</tbody>`;
        }

        tableHtml += `</table></div>`;

        return tableHtml;
    });
}

function renderCodeBlock(code, language) {
    const highlighted = highlightSyntax(code, language);
    return `
        <div class="code-block">
            <div class="code-block-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span>${language}</span>
            </div>
            <pre><code>${highlighted}</code></pre>
        </div>
    `;
}

function highlightSyntax(code, language) {
    // First escape HTML
    let result = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    if (language === 'python') {
        // Multi-line strings first
        result = result.replace(/('''[\s\S]*?'''|"""[\s\S]*?""")/g, '<span class="string">$1</span>');

        // Single-line strings
        result = result.replace(/(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="string">$&</span>');

        // Comments
        result = result.replace(/(#.*)$/gm, '<span class="comment">$1</span>');

        // Numbers
        result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

        // Keywords
        const keywords = 'def,class,import,from,return,if,elif,else,for,while,in,not,and,or,True,False,None,pass,break,continue,try,except,finally,with,as,lambda,yield,global,nonlocal,assert,raise,del,is,async,await';
        const kwRegex = new RegExp(`\\b(${keywords})\\b`, 'g');
        result = result.replace(kwRegex, '<span class="keyword">$1</span>');

        // Built-in functions
        const builtins = 'print,len,range,str,int,float,list,dict,set,tuple,type,input,open,sum,max,min,sorted,enumerate,zip,map,filter,abs,round,isinstance,hasattr,getattr,setattr,super,self,__init__';
        const biRegex = new RegExp(`(?<!\\w)(${builtins})(?=\\()`, 'g');
        result = result.replace(biRegex, '<span class="builtin">$1</span>');
    }

    return result;
}

function renderExercises(exercises, courseId) {
    return `
        <div class="exercise-section">
            <h3>
                Bài Tập Thực Hành
            </h3>
            ${exercises.map(ex => `
                <div class="exercise-card">
                    <div class="exercise-header">
                        <span class="difficulty-badge ${ex.level}">${getDifficultyText(ex.level)}</span>
                        <span class="exercise-title">${ex.title}</span>
                    </div>
                    <p class="exercise-desc">${ex.desc}</p>
                    ${ex.hint ? `
                        <div class="exercise-hint">
                            <strong>Gợi ý:</strong> ${ex.hint}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function getDifficultyText(level) {
    switch (level) {
        case 'easy':   return 'Dễ';
        case 'medium': return 'Trung bình';
        case 'hard':   return 'Nâng cao';
        default:       return level;
    }
}

function renderSummary(summaryItems, courseId) {
    return `
        <div class="summary-section ${courseId}">
            <div class="summary-header">
                <h2>Tổng Kết Bài Học</h2>
            </div>
            <ul class="summary-list">
                ${summaryItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderNextLesson(prevLesson, nextLesson, courseId) {
    if (!prevLesson && !nextLesson) return '';

    return `
        <div class="next-steps">
            <h3>Điều hướng bài học</h3>
            <div class="next-steps-grid">
                ${prevLesson ? `
                    <div class="next-step-card prev" onclick="openLesson('${courseId}', ${prevLesson.id})">
                        <div class="next-step-label">Bài trước</div>
                        <div class="next-step-title">${prevLesson.title}</div>
                    </div>
                ` : '<div></div>'}
                ${nextLesson ? `
                    <div class="next-step-card next" onclick="openLesson('${courseId}', ${nextLesson.id})">
                        <div class="next-step-label">Bài tiếp theo</div>
                        <div class="next-step-title">${nextLesson.title}</div>
                    </div>
                ` : '<div></div>'}
            </div>
        </div>
    `;
}

function addNavButtons() {
    // Remove existing buttons and clean up its scroll listener
    const existingBtns = document.querySelector('.nav-buttons');
    if (existingBtns) {
        if (existingBtns._cleanup) existingBtns._cleanup();
        existingBtns.remove();
    }

    // Create buttons container
    const btns = document.createElement('div');
    btns.className = 'nav-buttons';
    btns.innerHTML = `
        <button class="nav-btn ${currentLesson.courseId}" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" title="Lên đầu trang" aria-label="Lên đầu trang">
            <svg class="nav-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V5"/>
                <path d="M5 12l7-7 7 7"/>
            </svg>
            <span class="nav-btn-label">Lên đầu</span>
        </button>
    `;
    document.body.appendChild(btns);

    // Show/hide button based on scroll position
    const SCROLL_THRESHOLD = 300;
    const updateVisibility = () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            btns.classList.add('visible');
        } else {
            btns.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    // Clean up listener when nav buttons are removed
    btns._cleanup = () => window.removeEventListener('scroll', updateVisibility);
}

// Track cleanup for nav buttons
let _navButtonsCleanup = null;
const _origRemoveChild = document.body.removeChild.bind(document.body);
document.body.removeChild = function(node) {
    if (node && node.classList && node.classList.contains('nav-buttons') && node._cleanup) {
        node._cleanup();
    }
    return _origRemoveChild(node);
};

// ===== URL Hash Navigation =====
function handleHashChange() {
    const hash = window.location.hash.slice(1);

    if (!hash) {
        navigateTo('csb', true);
        return;
    }

    if (hash.startsWith('lesson-')) {
        const parts = hash.split('-');
        if (parts.length >= 3) {
            const courseId = parts[1];
            const lessonId = parseInt(parts[2]);
            if (coursesData[courseId]) {
                openLesson(courseId, lessonId);
            }
        }
    } else if (['csb', 'csa', 'csi'].includes(hash)) {
        navigateTo(hash, true);
    } else {
        // Unknown hash, fallback to CSB
        navigateTo('csb', true);
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.course;
            navigateTo(page);
        });
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', () => {
        handleHashChange();
    });

    // Initial load
    handleHashChange();
});
