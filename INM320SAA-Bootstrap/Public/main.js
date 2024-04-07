document.addEventListener("DOMContentLoaded", function() {
    var contentColumn = document.querySelector('.col-md-9');
    if (contentColumn) {
        contentColumn.classList.add('move-right');
    }
});

const fs = require('fs').promises;

// Function to read JSON file asynchronously
async function readJsonFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// Function to render content column
function renderContentColumn(contentData) {
    const contentColumn = document.querySelector('.col.align-self-stretch');
    if (contentColumn) {
        contentData.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('row');
            div.innerHTML = `
                <div class="col">
                    <div class="right-box">
                        <p>${item.title}</p>
                        <p><span class="number">${item.number}</span></p>
                    </div>
                </div>
            `;
            contentColumn.appendChild(div);
        });
    }
}

// Function to render sections
function renderSections(sectionData) {
    const section1 = document.querySelector('.col-md-6 .section-box tbody');
    const section2 = document.querySelector('.col-md-6 .section-box tbody');

    // Rendering Section 1
    if (section1) {
        section1.innerHTML = `
            <tr>
                <td>${sectionData.section1.title}</td>
                <td><a href="#" class="float-right">View details</a></td>
            </tr>
            <tr>
                <td>${sectionData.section1.group}</td>
            </tr>
        `;
        sectionData.section1.details.forEach(detail => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${detail.name}</td>
                <td class="text-right">${detail.count}</td>
            `;
            section1.appendChild(tr);
        });
    }

    // Rendering Section 2
    if (section2) {
        section2.innerHTML = `
            <tr>
                <td>${sectionData.section2.title}</td>
                <td><a href="#" class="float-right">View all</a></td>
            </tr>
            <tr>
                <td>Today</td>
            </tr>
        `;
        sectionData.section2.details.forEach(detail => {
            const tr = document.createElement('tr');
            const badge = detail.badge ? `<span class="badge badge-${detail.badge}">${detail.badge}</span>` : '';
            tr.innerHTML = `
                <td>${detail.name}</td>
                <td class="text-right">${badge}</td>
            `;
            section2.appendChild(tr);
        });
    }
}

// Main function to handle reading JSON file and rendering content
async function main() {
    const jsonData = await readJsonFile('data.json');

    if (jsonData) {
        // Render content column
        renderContentColumn(jsonData.contentColumn);

        // Render sections
        renderSections(jsonData.sections);
    } else {
        console.error('Failed to read JSON data.');
    }
}

// Call main function
main();
