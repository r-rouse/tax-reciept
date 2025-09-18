// Federal Tax Rates by Year and Income Bracket
// TODO: Replace with real federal tax rate data
const federalTaxRates = {
    2023: {
        brackets: [
            { min: 0, max: 11000, rate: 0.10 },
            { min: 11000, max: 44725, rate: 0.12 },
            { min: 44725, max: 95375, rate: 0.22 },
            { min: 95375, max: 182050, rate: 0.24 },
            { min: 182050, max: 231250, rate: 0.32 },
            { min: 231250, max: 578125, rate: 0.35 },
            { min: 578125, max: Infinity, rate: 0.37 }
        ],
        standardDeduction: 13850
    },
    2022: {
        brackets: [
            { min: 0, max: 10275, rate: 0.10 },
            { min: 10275, max: 41775, rate: 0.12 },
            { min: 41775, max: 89450, rate: 0.22 },
            { min: 89450, max: 190750, rate: 0.24 },
            { min: 190750, max: 364200, rate: 0.32 },
            { min: 364200, max: 462550, rate: 0.35 },
            { min: 462550, max: Infinity, rate: 0.37 }
        ],
        standardDeduction: 12950
    },
    2021: {
        brackets: [
            { min: 0, max: 9950, rate: 0.10 },
            { min: 9950, max: 40525, rate: 0.12 },
            { min: 40525, max: 86375, rate: 0.22 },
            { min: 86375, max: 164925, rate: 0.24 },
            { min: 164925, max: 209425, rate: 0.32 },
            { min: 209425, max: 523600, rate: 0.35 },
            { min: 523600, max: Infinity, rate: 0.37 }
        ],
        standardDeduction: 12550
    },
    2020: {
        brackets: [
            { min: 0, max: 9875, rate: 0.10 },
            { min: 9875, max: 40125, rate: 0.12 },
            { min: 40125, max: 85525, rate: 0.22 },
            { min: 85525, max: 163300, rate: 0.24 },
            { min: 163300, max: 207350, rate: 0.32 },
            { min: 207350, max: 518400, rate: 0.35 },
            { min: 518400, max: Infinity, rate: 0.37 }
        ],
        standardDeduction: 12400
    }
};

// Federal Budget Data by Year - Based on General Federal Income Tax Revenue
// Source: Congressional Budget Office and Treasury Department data
const federalBudgetData = {
    2023: {
        totalSpending: 6.13, // Trillion dollars
        categories: [
            { name: "Health Programs", percentage: 28.0, description: "Medicaid, CHIP, ACA subsidies, NIH, CDC, FDA, Veterans healthcare, Medicare Parts B & D" },
            { name: "Defense & National Security", percentage: 14.0, description: "Department of Defense, nuclear weapons, overseas operations, Homeland Security" },
            { name: "Interest on National Debt", percentage: 13.0, description: "Servicing Treasury securities and trust funds" },
            { name: "Safety Net Programs", percentage: 11.0, description: "SNAP, TANF, SSI, school meals, housing assistance" },
            { name: "Education & Social Services", percentage: 6.0, description: "K-12 education aid, Pell Grants, job training, Head Start" },
            { name: "Infrastructure & Science", percentage: 7.0, description: "Highways, transit, NASA, energy programs, agriculture support" },
            { name: "Government Operations", percentage: 7.5, description: "Law enforcement, diplomacy, foreign aid, EPA, administrative costs" },
            { name: "Other Programs", percentage: 13.5, description: "All other federal programs and agencies" }
        ]
    },
    2022: {
        totalSpending: 6.27, // Trillion dollars
        categories: [
            { name: "Health Programs", percentage: 27.5, description: "Medicaid, CHIP, ACA subsidies, NIH, CDC, FDA, Veterans healthcare, Medicare Parts B & D" },
            { name: "Defense & National Security", percentage: 13.5, description: "Department of Defense, nuclear weapons, overseas operations, Homeland Security" },
            { name: "Interest on National Debt", percentage: 12.0, description: "Servicing Treasury securities and trust funds" },
            { name: "Safety Net Programs", percentage: 11.5, description: "SNAP, TANF, SSI, school meals, housing assistance" },
            { name: "Education & Social Services", percentage: 6.5, description: "K-12 education aid, Pell Grants, job training, Head Start" },
            { name: "Infrastructure & Science", percentage: 7.5, description: "Highways, transit, NASA, energy programs, agriculture support" },
            { name: "Government Operations", percentage: 7.0, description: "Law enforcement, diplomacy, foreign aid, EPA, administrative costs" },
            { name: "Other Programs", percentage: 14.5, description: "All other federal programs and agencies" }
        ]
    },
    2021: {
        totalSpending: 6.82, // Trillion dollars
        categories: [
            { name: "Health Programs", percentage: 29.0, description: "Medicaid, CHIP, ACA subsidies, NIH, CDC, FDA, Veterans healthcare, Medicare Parts B & D" },
            { name: "Defense & National Security", percentage: 12.0, description: "Department of Defense, nuclear weapons, overseas operations, Homeland Security" },
            { name: "Interest on National Debt", percentage: 10.0, description: "Servicing Treasury securities and trust funds" },
            { name: "Safety Net Programs", percentage: 12.0, description: "SNAP, TANF, SSI, school meals, housing assistance" },
            { name: "Education & Social Services", percentage: 7.0, description: "K-12 education aid, Pell Grants, job training, Head Start" },
            { name: "Infrastructure & Science", percentage: 8.0, description: "Highways, transit, NASA, energy programs, agriculture support" },
            { name: "Government Operations", percentage: 6.5, description: "Law enforcement, diplomacy, foreign aid, EPA, administrative costs" },
            { name: "Other Programs", percentage: 15.5, description: "All other federal programs and agencies" }
        ]
    },
    2020: {
        totalSpending: 6.55, // Trillion dollars
        categories: [
            { name: "Health Programs", percentage: 30.0, description: "Medicaid, CHIP, ACA subsidies, NIH, CDC, FDA, Veterans healthcare, Medicare Parts B & D" },
            { name: "Defense & National Security", percentage: 13.0, description: "Department of Defense, nuclear weapons, overseas operations, Homeland Security" },
            { name: "Interest on National Debt", percentage: 8.0, description: "Servicing Treasury securities and trust funds" },
            { name: "Safety Net Programs", percentage: 13.0, description: "SNAP, TANF, SSI, school meals, housing assistance" },
            { name: "Education & Social Services", percentage: 7.5, description: "K-12 education aid, Pell Grants, job training, Head Start" },
            { name: "Infrastructure & Science", percentage: 8.5, description: "Highways, transit, NASA, energy programs, agriculture support" },
            { name: "Government Operations", percentage: 6.0, description: "Law enforcement, diplomacy, foreign aid, EPA, administrative costs" },
            { name: "Other Programs", percentage: 14.0, description: "All other federal programs and agencies" }
        ]
    }
};

// Helper function to get tax rates for a specific year
function getTaxRates(year) {
    return federalTaxRates[year] || federalTaxRates[2023];
}

// Helper function to get budget data for a specific year
function getBudgetData(year) {
    return federalBudgetData[year] || federalBudgetData[2023];
}

// Calculate federal income tax based on salary and year
function calculateFederalTax(salary, year) {
    const taxRates = getTaxRates(year);
    const taxableIncome = Math.max(0, salary - taxRates.standardDeduction);
    
    if (taxableIncome <= 0) {
        return 0;
    }
    
    let totalTax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of taxRates.brackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        const taxInBracket = taxableInBracket * bracket.rate;
        totalTax += taxInBracket;
        remainingIncome -= taxableInBracket;
    }
    
    return totalTax;
}

// State Tax Rates by State and Year
// TODO: Replace with real state tax rate data
const stateTaxRates = {
    2023: {
        'AL': { brackets: [{ min: 0, max: 500, rate: 0.02 }, { min: 500, max: 3000, rate: 0.04 }, { min: 3000, max: Infinity, rate: 0.05 }], standardDeduction: 2500 },
        'AK': { brackets: [], standardDeduction: 0 }, // No state income tax
        'AZ': { brackets: [{ min: 0, max: 26500, rate: 0.025 }, { min: 26500, max: 53000, rate: 0.033 }, { min: 53000, max: 159000, rate: 0.042 }, { min: 159000, max: Infinity, rate: 0.045 }], standardDeduction: 13850 },
        'AR': { brackets: [{ min: 0, max: 5000, rate: 0.02 }, { min: 5000, max: 10000, rate: 0.04 }, { min: 10000, max: Infinity, rate: 0.059 }], standardDeduction: 2200 },
        'CA': { brackets: [{ min: 0, max: 10099, rate: 0.01 }, { min: 10099, max: 23942, rate: 0.02 }, { min: 23942, max: 37788, rate: 0.04 }, { min: 37788, max: 52455, rate: 0.06 }, { min: 52455, max: 66295, rate: 0.08 }, { min: 66295, max: 338639, rate: 0.093 }, { min: 338639, max: 406364, rate: 0.103 }, { min: 406364, max: 677275, rate: 0.113 }, { min: 677275, max: Infinity, rate: 0.123 }], standardDeduction: 5202 },
        'CO': { brackets: [{ min: 0, max: Infinity, rate: 0.044 }], standardDeduction: 13850 },
        'CT': { brackets: [{ min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 50000, rate: 0.05 }, { min: 50000, max: 100000, rate: 0.055 }, { min: 100000, max: 200000, rate: 0.06 }, { min: 200000, max: 250000, rate: 0.065 }, { min: 250000, max: 500000, rate: 0.069 }, { min: 500000, max: Infinity, rate: 0.0699 }], standardDeduction: 0 },
        'DE': { brackets: [{ min: 0, max: 2000, rate: 0.022 }, { min: 2000, max: 5000, rate: 0.039 }, { min: 5000, max: 10000, rate: 0.048 }, { min: 10000, max: 20000, rate: 0.052 }, { min: 20000, max: 25000, rate: 0.055 }, { min: 25000, max: 60000, rate: 0.066 }, { min: 60000, max: Infinity, rate: 0.0699 }], standardDeduction: 3250 },
        'FL': { brackets: [], standardDeduction: 0 }, // No state income tax
        'GA': { brackets: [{ min: 0, max: 750, rate: 0.01 }, { min: 750, max: 2250, rate: 0.02 }, { min: 2250, max: 3750, rate: 0.03 }, { min: 3750, max: 5250, rate: 0.04 }, { min: 5250, max: 7000, rate: 0.05 }, { min: 7000, max: Infinity, rate: 0.059 }], standardDeduction: 5400 },
        'HI': { brackets: [{ min: 0, max: 2400, rate: 0.014 }, { min: 2400, max: 4800, rate: 0.032 }, { min: 4800, max: 9600, rate: 0.055 }, { min: 9600, max: 14400, rate: 0.064 }, { min: 14400, max: 19200, rate: 0.068 }, { min: 19200, max: 24000, rate: 0.072 }, { min: 24000, max: 36000, rate: 0.076 }, { min: 36000, max: 48000, rate: 0.079 }, { min: 48000, max: 150000, rate: 0.0825 }, { min: 150000, max: 175000, rate: 0.09 }, { min: 175000, max: 200000, rate: 0.1 }, { min: 200000, max: Infinity, rate: 0.11 }], standardDeduction: 2200 },
        'ID': { brackets: [{ min: 0, max: 1500, rate: 0.01 }, { min: 1500, max: 3000, rate: 0.03 }, { min: 3000, max: 4500, rate: 0.045 }, { min: 4500, max: 6000, rate: 0.06 }, { min: 6000, max: 7500, rate: 0.07 }, { min: 7500, max: 10000, rate: 0.075 }, { min: 10000, max: Infinity, rate: 0.06 }], standardDeduction: 13850 },
        'IL': { brackets: [{ min: 0, max: Infinity, rate: 0.0495 }], standardDeduction: 0 },
        'IN': { brackets: [{ min: 0, max: Infinity, rate: 0.0315 }], standardDeduction: 0 },
        'IA': { brackets: [{ min: 0, max: 6000, rate: 0.0044 }, { min: 6000, max: 30000, rate: 0.0082 }, { min: 30000, max: 75000, rate: 0.027 }, { min: 75000, max: Infinity, rate: 0.06 }], standardDeduction: 0 },
        'KS': { brackets: [{ min: 0, max: 15000, rate: 0.031 }, { min: 15000, max: 30000, rate: 0.0525 }, { min: 30000, max: Infinity, rate: 0.057 }], standardDeduction: 0 },
        'KY': { brackets: [{ min: 0, max: 3000, rate: 0.02 }, { min: 3000, max: 4000, rate: 0.03 }, { min: 4000, max: 5000, rate: 0.04 }, { min: 5000, max: 8000, rate: 0.05 }, { min: 8000, max: 75000, rate: 0.058 }, { min: 75000, max: Infinity, rate: 0.05 }], standardDeduction: 2770 },
        'LA': { brackets: [{ min: 0, max: 12500, rate: 0.0185 }, { min: 12500, max: 50000, rate: 0.035 }, { min: 50000, max: Infinity, rate: 0.0445 }], standardDeduction: 4500 },
        'ME': { brackets: [{ min: 0, max: 23000, rate: 0.058 }, { min: 23000, max: 54500, rate: 0.0675 }, { min: 54500, max: Infinity, rate: 0.0715 }], standardDeduction: 13850 },
        'MD': { brackets: [{ min: 0, max: 1000, rate: 0.02 }, { min: 1000, max: 2000, rate: 0.03 }, { min: 2000, max: 3000, rate: 0.04 }, { min: 3000, max: 100000, rate: 0.0475 }, { min: 100000, max: 125000, rate: 0.05 }, { min: 125000, max: 150000, rate: 0.0525 }, { min: 150000, max: 250000, rate: 0.055 }, { min: 250000, max: Infinity, rate: 0.0575 }], standardDeduction: 0 },
        'MA': { brackets: [{ min: 0, max: Infinity, rate: 0.05 }], standardDeduction: 0 },
        'MI': { brackets: [{ min: 0, max: Infinity, rate: 0.0425 }], standardDeduction: 0 },
        'MN': { brackets: [{ min: 0, max: 28120, rate: 0.0535 }, { min: 28120, max: 92120, rate: 0.068 }, { min: 92120, max: 171220, rate: 0.0785 }, { min: 171220, max: Infinity, rate: 0.0985 }], standardDeduction: 13850 },
        'MS': { brackets: [{ min: 0, max: 5000, rate: 0.04 }, { min: 5000, max: 10000, rate: 0.05 }, { min: 10000, max: Infinity, rate: 0.05 }], standardDeduction: 2300 },
        'MO': { brackets: [{ min: 0, max: 1000, rate: 0.015 }, { min: 1000, max: 2000, rate: 0.02 }, { min: 2000, max: 3000, rate: 0.025 }, { min: 3000, max: 4000, rate: 0.03 }, { min: 4000, max: 5000, rate: 0.035 }, { min: 5000, max: 6000, rate: 0.04 }, { min: 6000, max: 7000, rate: 0.045 }, { min: 7000, max: 8000, rate: 0.05 }, { min: 8000, max: 9000, rate: 0.055 }, { min: 9000, max: Infinity, rate: 0.059 }], standardDeduction: 13850 },
        'MT': { brackets: [{ min: 0, max: 3600, rate: 0.01 }, { min: 3600, max: 6300, rate: 0.02 }, { min: 6300, max: 9600, rate: 0.03 }, { min: 9600, max: 12900, rate: 0.04 }, { min: 12900, max: 16500, rate: 0.05 }, { min: 16500, max: 20100, rate: 0.06 }, { min: 20100, max: Infinity, rate: 0.069 }], standardDeduction: 0 },
        'NE': { brackets: [{ min: 0, max: 3600, rate: 0.0246 }, { min: 3600, max: 21600, rate: 0.0351 }, { min: 21600, max: 34800, rate: 0.0501 }, { min: 34800, max: Infinity, rate: 0.0684 }], standardDeduction: 7500 },
        'NV': { brackets: [], standardDeduction: 0 }, // No state income tax
        'NH': { brackets: [{ min: 0, max: Infinity, rate: 0.05 }], standardDeduction: 0 }, // Only on interest and dividends
        'NJ': { brackets: [{ min: 0, max: 20000, rate: 0.014 }, { min: 20000, max: 35000, rate: 0.0175 }, { min: 35000, max: 40000, rate: 0.035 }, { min: 40000, max: 75000, rate: 0.05525 }, { min: 75000, max: 500000, rate: 0.0637 }, { min: 500000, max: 1000000, rate: 0.0897 }, { min: 1000000, max: Infinity, rate: 0.1075 }], standardDeduction: 0 },
        'NM': { brackets: [{ min: 0, max: 5500, rate: 0.017 }, { min: 5500, max: 11000, rate: 0.032 }, { min: 11000, max: 16000, rate: 0.047 }, { min: 16000, max: 210000, rate: 0.049 }, { min: 210000, max: Infinity, rate: 0.049 }], standardDeduction: 13850 },
        'NY': { brackets: [{ min: 0, max: 8500, rate: 0.04 }, { min: 8500, max: 11700, rate: 0.045 }, { min: 11700, max: 13900, rate: 0.0525 }, { min: 13900, max: 80650, rate: 0.059 }, { min: 80650, max: 215400, rate: 0.0597 }, { min: 215400, max: 1077550, rate: 0.0633 }, { min: 1077550, max: 5000000, rate: 0.0685 }, { min: 5000000, max: 25000000, rate: 0.0965 }, { min: 25000000, max: Infinity, rate: 0.103 }], standardDeduction: 8000 },
        'NC': { brackets: [{ min: 0, max: Infinity, rate: 0.0475 }], standardDeduction: 12550 },
        'ND': { brackets: [{ min: 0, max: 41025, rate: 0.011 }, { min: 41025, max: 99500, rate: 0.0204 }, { min: 99500, max: 203950, rate: 0.0227 }, { min: 203950, max: 445000, rate: 0.0264 }, { min: 445000, max: Infinity, rate: 0.029 }], standardDeduction: 13850 },
        'OH': { brackets: [{ min: 0, max: 26050, rate: 0.02765 }, { min: 26050, max: 100000, rate: 0.03226 }, { min: 100000, max: Infinity, rate: 0.03399 }], standardDeduction: 0 },
        'OK': { brackets: [{ min: 0, max: 1000, rate: 0.005 }, { min: 1000, max: 2500, rate: 0.01 }, { min: 2500, max: 3750, rate: 0.02 }, { min: 3750, max: 4900, rate: 0.03 }, { min: 4900, max: 7200, rate: 0.04 }, { min: 7200, max: 8700, rate: 0.05 }, { min: 8700, max: Infinity, rate: 0.05 }], standardDeduction: 6350 },
        'OR': { brackets: [{ min: 0, max: 4050, rate: 0.05 }, { min: 4050, max: 10200, rate: 0.07 }, { min: 10200, max: 125000, rate: 0.09 }, { min: 125000, max: Infinity, rate: 0.099 }], standardDeduction: 2370 },
        'PA': { brackets: [{ min: 0, max: Infinity, rate: 0.0307 }], standardDeduction: 0 },
        'RI': { brackets: [{ min: 0, max: 68200, rate: 0.0375 }, { min: 68200, max: 155050, rate: 0.0475 }, { min: 155050, max: Infinity, rate: 0.0599 }], standardDeduction: 10000 },
        'SC': { brackets: [{ min: 0, max: 3200, rate: 0.03 }, { min: 3200, max: 16000, rate: 0.04 }, { min: 16000, max: Infinity, rate: 0.05 }], standardDeduction: 13850 },
        'SD': { brackets: [], standardDeduction: 0 }, // No state income tax
        'TN': { brackets: [], standardDeduction: 0 }, // No state income tax
        'TX': { brackets: [], standardDeduction: 0 }, // No state income tax
        'UT': { brackets: [{ min: 0, max: Infinity, rate: 0.0485 }], standardDeduction: 0 },
        'VT': { brackets: [{ min: 0, max: 45000, rate: 0.0335 }, { min: 45000, max: 110050, rate: 0.066 }, { min: 110050, max: 200150, rate: 0.076 }, { min: 200150, max: Infinity, rate: 0.0875 }], standardDeduction: 6000 },
        'VA': { brackets: [{ min: 0, max: 3000, rate: 0.02 }, { min: 3000, max: 5000, rate: 0.03 }, { min: 5000, max: 17000, rate: 0.05 }, { min: 17000, max: Infinity, rate: 0.0575 }], standardDeduction: 8000 },
        'WA': { brackets: [], standardDeduction: 0 }, // No state income tax
        'WV': { brackets: [{ min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 25000, rate: 0.04 }, { min: 25000, max: 40000, rate: 0.045 }, { min: 40000, max: 60000, rate: 0.06 }, { min: 60000, max: Infinity, rate: 0.065 }], standardDeduction: 0 },
        'WI': { brackets: [{ min: 0, max: 12810, rate: 0.0354 }, { min: 12810, max: 25620, rate: 0.0465 }, { min: 25620, max: 280950, rate: 0.0627 }, { min: 280950, max: Infinity, rate: 0.0765 }], standardDeduction: 12000 },
        'WY': { brackets: [], standardDeduction: 0 } // No state income tax
    }
};

// State Budget Data by State
// TODO: Replace with real state budget data
const stateBudgetData = {
    'CA': {
        categories: [
            { name: "K-12 Education", percentage: 40.0, description: "Public schools and education programs" },
            { name: "Health & Human Services", percentage: 25.0, description: "Medicaid, public health, and social services" },
            { name: "Higher Education", percentage: 12.0, description: "University of California and state colleges" },
            { name: "Corrections", percentage: 8.0, description: "Prisons and criminal justice system" },
            { name: "Transportation", percentage: 5.0, description: "Highways, roads, and public transit" },
            { name: "Environment", percentage: 3.0, description: "Environmental protection and natural resources" },
            { name: "General Government", percentage: 4.0, description: "Administrative and support services" },
            { name: "Other Programs", percentage: 3.0, description: "All other state programs" }
        ]
    },
    'TX': {
        categories: [
            { name: "K-12 Education", percentage: 35.0, description: "Public schools and education programs" },
            { name: "Health & Human Services", percentage: 30.0, description: "Medicaid, public health, and social services" },
            { name: "Higher Education", percentage: 15.0, description: "State universities and community colleges" },
            { name: "Transportation", percentage: 8.0, description: "Highways, roads, and public transit" },
            { name: "Corrections", percentage: 5.0, description: "Prisons and criminal justice system" },
            { name: "General Government", percentage: 4.0, description: "Administrative and support services" },
            { name: "Other Programs", percentage: 3.0, description: "All other state programs" }
        ]
    },
    'NY': {
        categories: [
            { name: "K-12 Education", percentage: 30.0, description: "Public schools and education programs" },
            { name: "Health & Human Services", percentage: 35.0, description: "Medicaid, public health, and social services" },
            { name: "Higher Education", percentage: 10.0, description: "State University of New York system" },
            { name: "Transportation", percentage: 8.0, description: "Highways, roads, and public transit" },
            { name: "Corrections", percentage: 6.0, description: "Prisons and criminal justice system" },
            { name: "General Government", percentage: 6.0, description: "Administrative and support services" },
            { name: "Other Programs", percentage: 5.0, description: "All other state programs" }
        ]
    },
    'FL': {
        categories: [
            { name: "K-12 Education", percentage: 45.0, description: "Public schools and education programs" },
            { name: "Health & Human Services", percentage: 25.0, description: "Medicaid, public health, and social services" },
            { name: "Higher Education", percentage: 12.0, description: "State universities and community colleges" },
            { name: "Transportation", percentage: 8.0, description: "Highways, roads, and public transit" },
            { name: "Corrections", percentage: 4.0, description: "Prisons and criminal justice system" },
            { name: "General Government", percentage: 3.0, description: "Administrative and support services" },
            { name: "Other Programs", percentage: 3.0, description: "All other state programs" }
        ]
    }
    // Add more states as needed - using CA, TX, NY, FL as examples
};

// Helper function to get state tax rates
function getStateTaxRates(state, year) {
    const yearData = stateTaxRates[year] || stateTaxRates[2023];
    return yearData[state] || { brackets: [], standardDeduction: 0 };
}

// Helper function to get state budget data
function getStateBudgetData(state) {
    return stateBudgetData[state] || stateBudgetData['CA']; // Default to California
}

// Calculate state income tax based on salary, state, and year
function calculateStateTax(salary, state, year) {
    const taxRates = getStateTaxRates(state, year);
    
    if (!taxRates.brackets || taxRates.brackets.length === 0) {
        return 0; // No state income tax
    }
    
    const taxableIncome = Math.max(0, salary - taxRates.standardDeduction);
    
    if (taxableIncome <= 0) {
        return 0;
    }
    
    let totalTax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of taxRates.brackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        const taxInBracket = taxableInBracket * bracket.rate;
        totalTax += taxInBracket;
        remainingIncome -= taxableInBracket;
    }
    
    return totalTax;
}

// Helper function to calculate proportional spending
function calculateProportionalSpending(taxAmount, year) {
    const budgetData = getBudgetData(year);
    const results = [];
    
    budgetData.categories.forEach(category => {
        const amount = (taxAmount * category.percentage) / 100;
        results.push({
            name: category.name,
            description: category.description,
            percentage: category.percentage,
            amount: amount
        });
    });
    
    return results;
}

// Helper function to calculate state proportional spending
function calculateStateProportionalSpending(taxAmount, state) {
    const budgetData = getStateBudgetData(state);
    const results = [];
    
    budgetData.categories.forEach(category => {
        const amount = (taxAmount * category.percentage) / 100;
        results.push({
            name: category.name,
            description: category.description,
            percentage: category.percentage,
            amount: amount
        });
    });
    
    return results;
}
