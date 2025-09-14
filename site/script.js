// DOM Elements
const salaryAmountInput = document.getElementById('salaryAmount');
const taxYearSelect = document.getElementById('taxYear');
const generateButton = document.getElementById('generateReceipt');
const resultsSection = document.getElementById('resultsSection');
const displaySalary = document.getElementById('displaySalary');
const displayTaxAmount = document.getElementById('displayTaxAmount');
const displayYear = document.getElementById('displayYear');
const lineItemsContainer = document.getElementById('lineItems');

// Chart instances
let pieChart = null;
let barChart = null;

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
    
    // Validate input
    if (!salary || salary <= 0) {
        alert('Please enter a valid salary amount greater than $0');
        return;
    }
    
    // Calculate federal tax
    const taxAmount = calculateFederalTax(salary, year);
    
    // Calculate proportional spending
    const spendingBreakdown = calculateProportionalSpending(taxAmount, year);
    
    // Update display
    displaySalary.textContent = salary.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    displayTaxAmount.textContent = taxAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    displayYear.textContent = year;
    
    // Generate line items
    generateLineItems(spendingBreakdown);
    
    // Generate charts
    generateCharts(spendingBreakdown);
    
    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate line items for the receipt
function generateLineItems(spendingBreakdown) {
    lineItemsContainer.innerHTML = '';
    
    let totalCalculated = 0;
    
    spendingBreakdown.forEach(item => {
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
        totalCalculated += item.amount;
    });
    
    // Add total line
    const totalLine = document.createElement('div');
    totalLine.className = 'line-item';
    totalLine.innerHTML = `
        <div class="category-name">Total</div>
        <div class="category-amount">$${totalCalculated.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</div>
    `;
    
    lineItemsContainer.appendChild(totalLine);
}

// Generate charts
function generateCharts(spendingBreakdown) {
    // Destroy existing charts
    if (pieChart) {
        pieChart.destroy();
    }
    if (barChart) {
        barChart.destroy();
    }
    
    // Prepare data for charts
    const labels = spendingBreakdown.map(item => item.name);
    const amounts = spendingBreakdown.map(item => item.amount);
    const percentages = spendingBreakdown.map(item => item.percentage);
    
    // Generate colors
    const colors = generateColors(spendingBreakdown.length);
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: colors,
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
                    text: 'Your Tax Dollars by Category',
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
                            const percentage = percentages[context.dataIndex];
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
    
    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount ($)',
                data: amounts,
                backgroundColor: colors.map(color => color + '80'), // Add transparency
                borderColor: colors,
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
                    text: 'Your Tax Dollars by Category (Bar Chart)',
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
                            const percentage = percentages[context.dataIndex];
                            return `$${value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} (${percentage}%)`;
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
                        },
                        maxRotation: isMobile ? 90 : 45,
                        minRotation: isMobile ? 90 : 45,
                        maxTicksLimit: isMobile ? 6 : 10
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
            if (resultsSection.style.display !== 'none' && (pieChart || barChart)) {
                const salary = parseFloat(salaryAmountInput.value);
                const year = taxYearSelect.value;
                
                if (salary && salary > 0) {
                    const taxAmount = calculateFederalTax(salary, year);
                    const spendingBreakdown = calculateProportionalSpending(taxAmount, year);
                    generateCharts(spendingBreakdown);
                }
            }
        }, 250); // Debounce resize events
    });
});

