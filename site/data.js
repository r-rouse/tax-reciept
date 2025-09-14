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

// MOCK Federal Budget Data by Year
// TODO: Replace with real federal budget data
const federalBudgetData = {
    2023: {
        totalSpending: 6.13, // Trillion dollars - MOCK DATA
        // Suggested - better approximated
        categories: [
            { name: "Social Security", percentage: 22.5, description: "Retirement and disability benefits" },
            { name: "Medicare", percentage: 14.5, description: "Health insurance for seniors (all parts)" },
            { name: "Defense & Military", percentage: 13.5, description: "National defense and military operations" },
            { name: "Medicaid", percentage: 6.5, description: "Health insurance for low-income individuals" },
            { name: "Interest on Debt", percentage: 13.5, description: "Net interest payments on the federal debt" },
            { name: "Veterans Benefits", percentage: 3.0, description: "Benefits and services for veterans" },
            { name: "Education", percentage: 3.0, description: "Federal education programs and student aid" },
            { name: "Transportation", percentage: 1.5, description: "Highways, aviation, public transit" },
            { name: "Housing & Community", percentage: 1.5, description: "Housing assistance & community development" },
            { name: "Food & Agriculture", percentage: 1.5, description: "Food assistance & agricultural programs" },
            { name: "International Affairs", percentage: 1.0, description: "Foreign aid and diplomatic programs" },
            { name: "Science & Technology", percentage: 1.0, description: "Research and development programs" },
            { name: "Environment & Energy", percentage: 1.0, description: "Environmental protection & energy programs" },
            { name: "Justice & Law Enforcement", percentage: 1.0, description: "Courts, prisons, federal law enforcement" },
            { name: "Other Programs", percentage: 15.0, description: "All other federal programs and agencies" }
        ]
    },
    2022: {
        totalSpending: 6.27, // Trillion dollars - MOCK DATA
        categories: [
            { name: "Social Security", percentage: 24.0, description: "Retirement and disability benefits" },
            { name: "Medicare", percentage: 19.0, description: "Health insurance for seniors" },
            { name: "Defense & Military", percentage: 16.0, description: "National defense and military operations" },
            { name: "Medicaid", percentage: 11.0, description: "Health insurance for low-income individuals" },
            { name: "Interest on Debt", percentage: 7.0, description: "Interest payments on national debt" },
            { name: "Veterans Benefits", percentage: 5.0, description: "Benefits and services for veterans" },
            { name: "Education", percentage: 4.0, description: "Federal education programs and student aid" },
            { name: "Transportation", percentage: 3.0, description: "Highways, aviation, and public transit" },
            { name: "Housing & Community", percentage: 2.0, description: "Housing assistance and community development" },
            { name: "Food & Agriculture", percentage: 2.0, description: "Food assistance and agricultural programs" },
            { name: "International Affairs", percentage: 1.0, description: "Foreign aid and diplomatic programs" },
            { name: "Science & Technology", percentage: 1.0, description: "Research and development programs" },
            { name: "Environment & Energy", percentage: 1.0, description: "Environmental protection and energy programs" },
            { name: "Justice & Law Enforcement", percentage: 1.0, description: "Federal courts, prisons, and law enforcement" },
            { name: "Other Programs", percentage: 3.0, description: "All other federal programs and agencies" }
        ]
    },
    2021: {
        totalSpending: 6.82, // Trillion dollars - MOCK DATA
        categories: [
            { name: "Social Security", percentage: 23.0, description: "Retirement and disability benefits" },
            { name: "Medicare", percentage: 18.0, description: "Health insurance for seniors" },
            { name: "Defense & Military", percentage: 15.0, description: "National defense and military operations" },
            { name: "Medicaid", percentage: 12.0, description: "Health insurance for low-income individuals" },
            { name: "Interest on Debt", percentage: 6.0, description: "Interest payments on national debt" },
            { name: "Veterans Benefits", percentage: 5.0, description: "Benefits and services for veterans" },
            { name: "Education", percentage: 4.0, description: "Federal education programs and student aid" },
            { name: "Transportation", percentage: 3.0, description: "Highways, aviation, and public transit" },
            { name: "Housing & Community", percentage: 2.0, description: "Housing assistance and community development" },
            { name: "Food & Agriculture", percentage: 2.0, description: "Food assistance and agricultural programs" },
            { name: "International Affairs", percentage: 1.0, description: "Foreign aid and diplomatic programs" },
            { name: "Science & Technology", percentage: 1.0, description: "Research and development programs" },
            { name: "Environment & Energy", percentage: 1.0, description: "Environmental protection and energy programs" },
            { name: "Justice & Law Enforcement", percentage: 1.0, description: "Federal courts, prisons, and law enforcement" },
            { name: "Other Programs", percentage: 7.0, description: "All other federal programs and agencies" }
        ]
    },
    2020: {
        totalSpending: 6.55, // Trillion dollars - MOCK DATA
        categories: [
            { name: "Social Security", percentage: 22.0, description: "Retirement and disability benefits" },
            { name: "Medicare", percentage: 17.0, description: "Health insurance for seniors" },
            { name: "Defense & Military", percentage: 14.0, description: "National defense and military operations" },
            { name: "Medicaid", percentage: 11.0, description: "Health insurance for low-income individuals" },
            { name: "Interest on Debt", percentage: 5.0, description: "Interest payments on national debt" },
            { name: "Veterans Benefits", percentage: 5.0, description: "Benefits and services for veterans" },
            { name: "Education", percentage: 4.0, description: "Federal education programs and student aid" },
            { name: "Transportation", percentage: 3.0, description: "Highways, aviation, and public transit" },
            { name: "Housing & Community", percentage: 2.0, description: "Housing assistance and community development" },
            { name: "Food & Agriculture", percentage: 2.0, description: "Food assistance and agricultural programs" },
            { name: "International Affairs", percentage: 1.0, description: "Foreign aid and diplomatic programs" },
            { name: "Science & Technology", percentage: 1.0, description: "Research and development programs" },
            { name: "Environment & Energy", percentage: 1.0, description: "Environmental protection and energy programs" },
            { name: "Justice & Law Enforcement", percentage: 1.0, description: "Federal courts, prisons, and law enforcement" },
            { name: "Other Programs", percentage: 12.0, description: "All other federal programs and agencies" }
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
