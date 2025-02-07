document.addEventListener('DOMContentLoaded', function () {
    fetch('Solar Repayments.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const plansContainer = document.getElementById('plans');
            json.slice(3).forEach(row => {
                if (row[1] && row[1].includes('SOL') || row[1].includes('BSL') || row[1].includes('CAD') || row[1].includes('PSN')) {
                    const plan = document.createElement('div');
                    plan.className = 'plan';

                    const title = document.createElement('h2');
                    title.textContent = row[1];
                    plan.appendChild(title);

                    const details = document.createElement('div');
                    details.className = 'details';

                    const system = document.createElement('div');
                    system.innerHTML = `<strong>System (kWp):</strong> ${row[3]}`;
                    details.appendChild(system);

                    const panels = document.createElement('div');
                    panels.innerHTML = `<strong>No of Panels:</strong> ${row[4]}`;
                    details.appendChild(panels);

                    const savings = document.createElement('div');
                    savings.innerHTML = `<strong>Savings:</strong> RM${row[5]}`;
                    details.appendChild(savings);

                    const roi = document.createElement('div');
                    roi.innerHTML = `<strong>ROI:</strong> ${parseFloat(row[6]).toFixed(2)}(±) years`;
                    details.appendChild(roi);

                    const price = document.createElement('div');
                    price.innerHTML = `<strong>Price:</strong> RM${parseInt(row[7]).toLocaleString()}`;
                    details.appendChild(price);

                    const cl60 = document.createElement('div');
                    cl60.innerHTML = `<strong>CL 60mths:</strong> RM${parseFloat(row[8]).toFixed(2)}`;
                    details.appendChild(cl60);

                    const cl72 = document.createElement('div');
                    cl72.innerHTML = `<strong>CL 72mths:</strong> RM${parseFloat(row[9]).toFixed(2)}`;
                    details.appendChild(cl72);

                    const ipp36 = document.createElement('div');
                    ipp36.innerHTML = `<strong>IPP 36mths:</strong> RM${parseFloat(row[10]).toFixed(2)}`;
                    details.appendChild(ipp36);

                    const ipp48 = document.createElement('div');
                    ipp48.innerHTML = `<strong>IPP 48mths:</strong> RM${parseFloat(row[11]).toFixed(2)}`;
                    details.appendChild(ipp48);

                    const ipp60 = document.createElement('div');
                    ipp60.innerHTML = `<strong>IPP 60mths:</strong> RM${parseFloat(row[12]).toFixed(2)}`;
                    details.appendChild(ipp60);

                    plan.appendChild(details);
                    plansContainer.appendChild(plan);
                }
            });
        });
});