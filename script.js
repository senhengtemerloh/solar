document.addEventListener('DOMContentLoaded', () => {
    fetch('Solar Repayments.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const plansContainer = document.getElementById('plans-container');
            let currentBrand = '';

            rows.forEach((row, index) => {
                if (!row || row.length < 13) return;

                // Detect brand headers
                if (row[1] === 'Solaroo' || row[1] === 'BSL' || 
                    row[1] === 'Canadian Solar' || row[1] === 'Panasonic') {
                    currentBrand = row[1];
                    return;
                }

                // Skip header rows and empty rows
                if (index < 4 || !row[2] || typeof row[2] !== 'string') return;

                // Create plan card
                if (row[2].match(/SOL|BSL|CAD|PSN/)) {
                    const planHtml = `
                        <div class="plan-card">
                            <h3 class="brand-header">${currentBrand}</h3>
                            
                            <div class="plan-details">
                                <div>
                                    <span class="plan-label">Plan</span>
                                    <span class="plan-value">${row[2]}</span>
                                </div>
                                <div>
                                    <span class="plan-label">System</span>
                                    <span class="plan-value">${row[3]} kWp</span>
                                </div>
                                <div>
                                    <span class="plan-label">Panels</span>
                                    <span class="plan-value">${row[4]}</span>
                                </div>
                                <div>
                                    <span class="plan-label">Savings</span>
                                    <span class="plan-value">RM${formatRange(row[5])}</span>
                                </div>
                                <div>
                                    <span class="plan-label">ROI</span>
                                    <span class="plan-value">${formatROI(row[6])}</span>
                                </div>
                                <div>
                                    <span class="plan-label">Price</span>
                                    <span class="plan-value">RM${formatNumber(row[7])}</span>
                                </div>
                            </div>

                            <div class="payment-plan">
                                <h3>🔖 Chailease Financing</h3>
                                <div class="plan-details">
                                    <div>
                                        <span class="plan-label">60mths</span>
                                        <span class="plan-value">RM${formatCurrency(row[8])}</span>
                                    </div>
                                    <div>
                                        <span class="plan-label">72mths</span>
                                        <span class="plan-value">RM${formatCurrency(row[9])}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="payment-plan">
                                <h3>💳 IPP (0% Interest)</h3>
                                <div class="plan-details">
                                    <div>
                                        <span class="plan-label">36mths</span>
                                        <span class="plan-value">RM${formatCurrency(row[10])}</span>
                                    </div>
                                    <div>
                                        <span class="plan-label">48mths</span>
                                        <span class="plan-value">RM${formatCurrency(row[11])}</span>
                                    </div>
                                    <div>
                                        <span class="plan-label">60mths</span>
                                        <span class="plan-value">RM${formatCurrency(row[12])}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    plansContainer.insertAdjacentHTML('beforeend', planHtml);
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});

// Formatting functions
function formatRange(value) {
    return (typeof value === 'string' ? value : value.toString())
        .replace(/(\d+)\s*-\s*(\d+)/, '$1-$2')
        .replace(/,/g, '-');
}

function formatROI(value) {
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : `${num.toFixed(1)} (±) years`;
}

function formatNumber(value) {
    return parseInt(value).toLocaleString('en-US');
}

function formatCurrency(value) {
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
