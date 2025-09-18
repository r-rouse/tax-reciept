// DOM Elements
const salaryAmountInput = document.getElementById('salaryAmount');
const taxYearSelect = document.getElementById('taxYear');
const stateSelect = document.getElementById('stateSelect');
const generateButton = document.getElementById('generateReceipt');
const resultsSection = document.getElementById('resultsSection');
const displaySalary = document.getElementById('displaySalary');
const displayState = document.getElementById('displayState');
const displayYear = document.getElementById('displayYear');
const displayFederalTax = document.getElementById('displayFederalTax');
const displayStateTax = document.getElementById('displayStateTax');
const displayTotalTax = document.getElementById('displayTotalTax');
const lineItemsContainer = document.getElementById('lineItems');

// Chart instances
let federalPieChart = null;
let statePieChart = null;
let combinedBarChart = null;

// Event Listeners
generateButton.addEventListener('click', generateReceipt);
salaryAmountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateReceipt();
    }
});

// Generate receipt function
function generateReceipt() {
    const salary = parseFloat(salaryAmountInput.value);
    const year = taxYearSelect.value;
    const state = stateSelect.value;
    
    // Validate input
    if (!salary || salary <= 0) {
        alert('Please enter a valid salary amount greater than $0');
        return;
    }
    
    // Calculate federal and state taxes
    const federalTax = calculateFederalTax(salary, year);
    const stateTax = calculateStateTax(salary, state, year);
    const totalTax = federalTax + stateTax;
    
    // Calculate proportional spending
    const federalSpendingBreakdown = calculateProportionalSpending(federalTax, year);
    const stateSpendingBreakdown = calculateStateProportionalSpending(stateTax, state);
    
    // Update display
    displaySalary.textContent = salary.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    displayState.textContent = stateSelect.options[stateSelect.selectedIndex].text;
    displayYear.textContent = year;
    displayFederalTax.textContent = federalTax.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    displayStateTax.textContent = stateTax.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    displayTotalTax.textContent = totalTax.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    // Generate line items
    generateLineItems(federalSpendingBreakdown, stateSpendingBreakdown);
    
    // Generate charts
    generateCharts(federalSpendingBreakdown, stateSpendingBreakdown);
    
    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate line items for the receipt
function generateLineItems(federalBreakdown, stateBreakdown) {
    lineItemsContainer.innerHTML = '';
    
    // Federal section
    const federalHeader = document.createElement('div');
    federalHeader.className = 'section-header';
    federalHeader.innerHTML = '<h3>Federal Tax Breakdown</h3>';
    lineItemsContainer.appendChild(federalHeader);
    
    let federalTotal = 0;
    federalBreakdown.forEach(item => {
        const lineItem = document.createElement('div');
        lineItem.className = 'line-item';
        
        const formattedAmount = item.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        lineItem.innerHTML = `
            <div class="category-name">
                ${item.name}
                <span class="percentage">${item.percentage}%</span>
            </div>
            <div class="category-amount">$${formattedAmount}</div>
        `;
        
        lineItemsContainer.appendChild(lineItem);
        federalTotal += item.amount;
    });
    
    // Federal total
    const federalTotalLine = document.createElement('div');
    federalTotalLine.className = 'line-item subtotal';
    federalTotalLine.innerHTML = `
        <div class="category-name">Federal Total</div>
        <div class="category-amount">$${federalTotal.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</div>
    `;
    lineItemsContainer.appendChild(federalTotalLine);
    
    // State section
    const stateHeader = document.createElement('div');
    stateHeader.className = 'section-header';
    stateHeader.innerHTML = '<h3>State Tax Breakdown</h3>';
    lineItemsContainer.appendChild(stateHeader);
    
    let stateTotal = 0;
    stateBreakdown.forEach(item => {
        const lineItem = document.createElement('div');
        lineItem.className = 'line-item';
        
        const formattedAmount = item.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        lineItem.innerHTML = `
            <div class="category-name">
                ${item.name}
                <span class="percentage">${item.percentage}%</span>
            </div>
            <div class="category-amount">$${formattedAmount}</div>
        `;
        
        lineItemsContainer.appendChild(lineItem);
        stateTotal += item.amount;
    });
    
    // State total
    const stateTotalLine = document.createElement('div');
    stateTotalLine.className = 'line-item subtotal';
    stateTotalLine.innerHTML = `
        <div class="category-name">State Total</div>
        <div class="category-amount">$${stateTotal.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</div>
    `;
    lineItemsContainer.appendChild(stateTotalLine);
    
    // Grand total
    const grandTotal = federalTotal + stateTotal;
    const grandTotalLine = document.createElement('div');
    grandTotalLine.className = 'line-item total';
    grandTotalLine.innerHTML = `
        <div class="category-name">Grand Total</div>
        <div class="category-amount">$${grandTotal.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</div>
    `;
    lineItemsContainer.appendChild(grandTotalLine);
}

// Generate charts
function generateCharts(federalBreakdown, stateBreakdown) {
    // Destroy existing charts
    if (federalPieChart) {
        federalPieChart.destroy();
    }
    if (statePieChart) {
        statePieChart.destroy();
    }
    if (combinedBarChart) {
        combinedBarChart.destroy();
    }
    
    // Prepare data for charts
    const federalLabels = federalBreakdown.map(item => item.name);
    const federalAmounts = federalBreakdown.map(item => item.amount);
    const federalPercentages = federalBreakdown.map(item => item.percentage);
    
    const stateLabels = stateBreakdown.map(item => item.name);
    const stateAmounts = stateBreakdown.map(item => item.amount);
    const statePercentages = stateBreakdown.map(item => item.percentage);
    
    // Generate colors
    const federalColors = generateColors(federalBreakdown.length);
    const stateColors = generateColors(stateBreakdown.length);
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    // Federal Pie Chart
    const federalPieCtx = document.getElementById('federalPieChart').getContext('2d');
    federalPieChart = new Chart(federalPieCtx, {
        type: 'pie',
        data: {
            labels: federalLabels,
            datasets: [{
                data: federalAmounts,
                backgroundColor: federalColors,
                borderWidth: isMobile ? 1 : 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Federal Tax Breakdown',
                    font: {
                        size: isMobile ? 14 : 16,
                        weight: 'bold'
                    },
                    padding: isMobile ? 10 : 20
                },
                legend: {
                    position: isMobile ? 'bottom' : 'bottom',
                    labels: {
                        padding: isMobile ? 10 : 20,
                        usePointStyle: true,
                        font: {
                            size: isMobile ? 10 : 12
                        },
                        boxWidth: isMobile ? 12 : 15
                    }
                },
                tooltip: {
                    enabled: true,
                    position: 'nearest',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = federalPercentages[context.dataIndex];
                            return `${label}: $${value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} (${percentage}%)`;
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: isMobile ? 1 : 2
                }
            }
        }
    });
    
    // State Pie Chart
    const statePieCtx = document.getElementById('statePieChart').getContext('2d');
    statePieChart = new Chart(statePieCtx, {
        type: 'pie',
        data: {
            labels: stateLabels,
            datasets: [{
                data: stateAmounts,
                backgroundColor: stateColors,
                borderWidth: isMobile ? 1 : 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'State Tax Breakdown',
                    font: {
                        size: isMobile ? 14 : 16,
                        weight: 'bold'
                    },
                    padding: isMobile ? 10 : 20
                },
                legend: {
                    position: isMobile ? 'bottom' : 'bottom',
                    labels: {
                        padding: isMobile ? 10 : 20,
                        usePointStyle: true,
                        font: {
                            size: isMobile ? 10 : 12
                        },
                        boxWidth: isMobile ? 12 : 15
                    }
                },
                tooltip: {
                    enabled: true,
                    position: 'nearest',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = statePercentages[context.dataIndex];
                            return `${label}: $${value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} (${percentage}%)`;
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: isMobile ? 1 : 2
                }
            }
        }
    });
    
    // Combined Bar Chart
    const combinedBarCtx = document.getElementById('combinedBarChart').getContext('2d');
    combinedBarChart = new Chart(combinedBarCtx, {
        type: 'bar',
        data: {
            labels: ['Federal', 'State'],
            datasets: [{
                label: 'Tax Amount ($)',
                data: [federalAmounts.reduce((a, b) => a + b, 0), stateAmounts.reduce((a, b) => a + b, 0)],
                backgroundColor: ['#667eea', '#764ba2'],
                borderColor: ['#667eea', '#764ba2'],
                borderWidth: isMobile ? 0.5 : 1,
                borderRadius: isMobile ? 2 : 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Federal vs State Tax Comparison',
                    font: {
                        size: isMobile ? 14 : 16,
                        weight: 'bold'
                    },
                    padding: isMobile ? 10 : 20
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    position: 'nearest',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            return `$${value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12
                        },
                        callback: function(value) {
                            if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(1) + 'k';
                            }
                            return '$' + value.toLocaleString('en-US');
                        },
                        maxTicksLimit: isMobile ? 5 : 8
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 9 : 11
                        }
                    }
                }
            },
            layout: {
                padding: isMobile ? 10 : 20
            }
        }
    });
}

// Generate colors for charts
function generateColors(count) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384',
        '#36A2EB', '#FFCE56', '#9966FF', '#FF9F40', '#4BC0C0'
    ];
    
    // If we need more colors than available, generate additional ones
    while (colors.length < count) {
        colors.push(generateRandomColor());
    }
    
    return colors.slice(0, count);
}

// Generate random color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default year to current year
    const currentYear = new Date().getFullYear();
    if (federalBudgetData[currentYear]) {
        taxYearSelect.value = currentYear;
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // Handle window resize for chart optimization
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Regenerate charts if they exist and results are visible
            if (resultsSection.style.display !== 'none' && (federalPieChart || statePieChart || combinedBarChart)) {
                const salary = parseFloat(salaryAmountInput.value);
                const year = taxYearSelect.value;
                const state = stateSelect.value;
                
                if (salary && salary > 0) {
                    const federalTax = calculateFederalTax(salary, year);
                    const stateTax = calculateStateTax(salary, state, year);
                    const federalSpendingBreakdown = calculateProportionalSpending(federalTax, year);
                    const stateSpendingBreakdown = calculateStateProportionalSpending(stateTax, state);
                    generateCharts(federalSpendingBreakdown, stateSpendingBreakdown);
                }
            }
        }, 250); // Debounce resize events
    });
});

