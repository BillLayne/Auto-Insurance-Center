        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            
            notificationText.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // Toggle FAQ
        function toggleFAQ(button) {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards
        document.querySelectorAll('.card, .stat-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
        
        // Calculator Modal Functions
        function openCalculatorModal() {
            document.getElementById('calculatorModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        function closeCalculatorModal() {
            document.getElementById('calculatorModal').classList.remove('show');
            document.body.style.overflow = 'auto';
            // Reset form
            document.getElementById('calculatorForm').reset();
            document.getElementById('calculator-results').style.display = 'none';
        }
        
        // Close modal on outside click
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('calculatorModal');
            if (event.target === modal) {
                closeCalculatorModal();
            }
        });
        
        // Calculator Functions
        function calculateCoverage() {
            // Get form values
            const age = parseInt(document.getElementById('calc-age').value);
            const income = parseInt(document.getElementById('calc-income').value);
            const drivers = parseInt(document.getElementById('calc-drivers').value);
            const vehicles = parseInt(document.getElementById('calc-vehicles').value);
            const homeValue = parseInt(document.getElementById('calc-home-value').value) || 0;
            const savings = parseInt(document.getElementById('calc-savings').value) || 0;
            const vehicleValue = parseInt(document.getElementById('calc-vehicle-value').value) || 0;
            const otherAssets = parseInt(document.getElementById('calc-other-assets').value) || 0;
            
            // Calculate total assets
            const totalAssets = homeValue + savings + vehicleValue + otherAssets;
            
            // Get risk factors
            const hasTeenDriver = document.getElementById('calc-teen-driver').checked;
            const hasLongCommute = document.getElementById('calc-long-commute').checked;
            const hasBusinessUse = document.getElementById('calc-business-use').checked;
            const hasTowing = document.getElementById('calc-towing').checked;
            const hasRideshare = document.getElementById('calc-rideshare').checked;
            const hasFinanced = document.getElementById('calc-financed').checked;
            const hasNewCar = document.getElementById('calc-new-car').checked;
            const hasLuxury = document.getElementById('calc-luxury').checked;
            
            // Calculate risk multiplier
            let riskMultiplier = 1;
            if (hasTeenDriver) riskMultiplier += 0.3;
            if (hasBusinessUse) riskMultiplier += 0.2;
            if (hasRideshare) riskMultiplier += 0.4;
            if (hasLongCommute) riskMultiplier += 0.1;
            if (hasTowing) riskMultiplier += 0.15;
            if (hasLuxury) riskMultiplier += 0.2;
            
            // Calculate recommended coverage based on assets and income
            let biPerson, biAccident, pd, medPay;
            
            // Bodily Injury recommendations
            if (totalAssets < 100000) {
                biPerson = 100000;
                biAccident = 300000;
            } else if (totalAssets < 300000) {
                biPerson = 250000;
                biAccident = 500000;
            } else if (totalAssets < 500000) {
                biPerson = 500000;
                biAccident = 1000000;
            } else {
                biPerson = 1000000;
                biAccident = 1000000;
            }
            
            // Adjust for risk factors
            if (riskMultiplier > 1.5 && biPerson < 500000) {
                biPerson = Math.min(biPerson * 2, 1000000);
                biAccident = Math.min(biAccident * 1.5, 1000000);
            }
            
            // Property Damage recommendations
            if (totalAssets < 200000) {
                pd = 100000;
            } else if (totalAssets < 500000) {
                pd = 250000;
            } else {
                pd = 500000;
            }
            
            // Medical Payments recommendations
            if (drivers > 3 || hasTeenDriver) {
                medPay = 10000;
            } else {
                medPay = 5000;
            }
            
            // Update UI with recommendations
            document.getElementById('rec-bi-person').textContent = '$' + biPerson.toLocaleString();
            document.getElementById('rec-bi-accident').textContent = '$' + biAccident.toLocaleString();
            document.getElementById('rec-pd').textContent = '$' + pd.toLocaleString();
            document.getElementById('rec-um').textContent = biPerson/1000 + '/' + biAccident/1000 + '/50';
            document.getElementById('rec-med').textContent = '$' + medPay.toLocaleString();
            
            // Update explanations
            const assetExplanation = document.getElementById('asset-explanation');
            if (totalAssets > 500000) {
                assetExplanation.textContent = `With assets totaling $${totalAssets.toLocaleString()}, you have substantial wealth to protect. Consider maximum liability limits and an umbrella policy for additional protection.`;
            } else if (totalAssets > 200000) {
                assetExplanation.textContent = `Your assets of $${totalAssets.toLocaleString()} require solid liability protection. The recommended coverage should protect your home and savings from lawsuits.`;
            } else {
                assetExplanation.textContent = `With assets of $${totalAssets.toLocaleString()}, standard coverage levels should provide adequate protection, but don't go with just state minimums.`;
            }
            
            const vehicleExplanation = document.getElementById('vehicle-explanation');
            if (hasFinanced || hasNewCar) {
                vehicleExplanation.textContent = 'Since you have financed or newer vehicles, comprehensive and collision coverage is essential. Consider a $500-$1,000 deductible to balance premium costs.';
            } else if (vehicleValue > 10000) {
                vehicleExplanation.textContent = `With vehicles worth $${vehicleValue.toLocaleString()}, comprehensive and collision coverage is recommended to protect your investment.`;
            } else {
                vehicleExplanation.textContent = 'For older vehicles, you might consider liability-only coverage, but evaluate if comprehensive/collision is worth it based on your budget.';
            }
            
            // Show results
            document.getElementById('calculator-results').style.display = 'block';
            document.getElementById('calculator-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Auto Analyzer Functions
        function openAutoAnalyzer() {
            document.getElementById('autoAnalyzerModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        function closeAutoAnalyzer() {
            document.getElementById('autoAnalyzerModal').classList.remove('show');
            document.body.style.overflow = 'auto';
            // Reset form
            document.getElementById('autoAnalyzerForm').reset();
            document.getElementById('auto-analyzer-results').style.display = 'none';
        }
        
        function analyzeAutoCoverage() {
            // Get current coverage values
            const currentBI = document.getElementById('current-bi').value;
            const currentPD = parseInt(document.getElementById('current-pd').value) || 0;
            const currentUM = document.getElementById('current-um').checked;
            const currentMed = parseInt(document.getElementById('current-med').value) || 0;
            const currentComp = document.getElementById('current-comp').checked;
            const currentColl = document.getElementById('current-coll').checked;
            const deductible = parseInt(document.getElementById('current-deductible').value) || 0;
            
            // Get personal info
            const homeOwner = document.getElementById('home-owner').checked;
            const hasAssets = document.getElementById('has-assets').checked;
            const numVehicles = parseInt(document.getElementById('num-vehicles').value) || 1;
            const vehicleAge = parseInt(document.getElementById('vehicle-age').value) || 5;
            const vehicleValue = parseInt(document.getElementById('vehicle-value-analyzer').value) || 10000;
            
            // Get discount eligibility
            const multiPolicy = document.getElementById('multi-policy').checked;
            const goodDriver = document.getElementById('good-driver').checked;
            const defensiveDriving = document.getElementById('defensive-driving').checked;
            const goodStudent = document.getElementById('good-student').checked;
            const lowMileage = document.getElementById('low-mileage').checked;
            
            // Analysis logic
            let gaps = [];
            let recommendations = [];
            let savings = [];
            
            // Analyze liability coverage
            const biValues = currentBI.split('/');
            const biPerson = parseInt(biValues[0]) * 1000;
            const biAccident = parseInt(biValues[1]) * 1000;
            
            if (homeOwner || hasAssets) {
                if (biPerson < 250000) {
                    gaps.push({
                        type: 'Liability Coverage',
                        issue: 'Your liability limits may be too low to protect your assets',
                        recommendation: 'Consider increasing to at least 250/500/100'
                    });
                }
            } else if (biPerson < 100000) {
                gaps.push({
                    type: 'Liability Coverage',
                    issue: 'Your liability coverage is below recommended minimums',
                    recommendation: 'Consider increasing to at least 100/300/100'
                });
            }
            
            // Analyze property damage
            if (currentPD < 100000) {
                gaps.push({
                    type: 'Property Damage',
                    issue: `$${currentPD.toLocaleString()} may not cover damage to newer vehicles`,
                    recommendation: 'Consider increasing to $100,000 or more'
                });
            }
            
            // Analyze uninsured motorist
            if (!currentUM) {
                gaps.push({
                    type: 'Uninsured Motorist',
                    issue: '1 in 8 NC drivers are uninsured',
                    recommendation: 'Add uninsured motorist coverage matching your liability limits'
                });
            }
            
            // Analyze medical payments
            if (currentMed < 5000) {
                gaps.push({
                    type: 'Medical Payments',
                    issue: 'Limited or no medical payment coverage',
                    recommendation: 'Consider $5,000-$10,000 in medical payments coverage'
                });
            }
            
            // Analyze comprehensive/collision
            if (vehicleValue > 5000 && (!currentComp || !currentColl)) {
                gaps.push({
                    type: 'Vehicle Coverage',
                    issue: `No comprehensive/collision on vehicle worth $${vehicleValue.toLocaleString()}`,
                    recommendation: 'Add comprehensive and collision coverage'
                });
            } else if (vehicleValue < 3000 && currentComp && currentColl) {
                savings.push({
                    type: 'Vehicle Coverage',
                    opportunity: 'Consider dropping comprehensive/collision on older vehicle',
                    potential: 'Save $500-$1,000 annually'
                });
            }
            
            // Analyze deductibles
            if (deductible < 500 && currentComp) {
                savings.push({
                    type: 'Deductible',
                    opportunity: 'Increase deductible from $' + deductible + ' to $500 or $1,000',
                    potential: 'Save 15-30% on comprehensive/collision'
                });
            }
            
            // Check discounts
            let missedDiscounts = [];
            if (!multiPolicy) missedDiscounts.push('Multi-policy bundle (save 5-25%)');
            if (!goodDriver) missedDiscounts.push('Good driver discount (save 10-40%)');
            if (!defensiveDriving) missedDiscounts.push('Defensive driving course (save 5-10%)');
            if (!goodStudent) missedDiscounts.push('Good student discount (save 5-25%)');
            if (!lowMileage) missedDiscounts.push('Low mileage discount (save 5-30%)');
            
            if (missedDiscounts.length > 0) {
                savings.push({
                    type: 'Discounts',
                    opportunity: 'Eligible for ' + missedDiscounts.length + ' additional discounts',
                    potential: missedDiscounts.join(', ')
                });
            }
            
            // Calculate overall score
            let score = 100;
            score -= gaps.length * 15;
            score = Math.max(score, 0);
            
            // Update results UI
            document.getElementById('coverage-score').textContent = score;
            document.getElementById('score-message').textContent = 
                score >= 85 ? 'Excellent Coverage!' :
                score >= 70 ? 'Good Coverage with Some Gaps' :
                score >= 50 ? 'Moderate Coverage - Improvements Needed' :
                'Significant Coverage Gaps Detected';
            
            // Display gaps
            const gapsContainer = document.getElementById('coverage-gaps');
            gapsContainer.innerHTML = gaps.map(gap => `
                <div class="gap-item">
                    <h5>${gap.type}</h5>
                    <p><strong>Issue:</strong> ${gap.issue}</p>
                    <p><strong>Recommendation:</strong> ${gap.recommendation}</p>
                </div>
            `).join('');
            
            // Display savings
            const savingsContainer = document.getElementById('savings-opportunities');
            savingsContainer.innerHTML = savings.map(saving => `
                <div class="savings-item">
                    <h5>${saving.type}</h5>
                    <p><strong>Opportunity:</strong> ${saving.opportunity}</p>
                    <p><strong>Potential Savings:</strong> ${saving.potential}</p>
                </div>
            `).join('');
            
            // Show results
            document.getElementById('auto-analyzer-results').style.display = 'block';
            document.getElementById('auto-analyzer-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Mobile menu toggle functionality - Updated for unified header
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const headerNav = document.querySelector('.header-nav');

            if (mobileMenuToggle && headerNav) {
                // Simple toggle functionality
                mobileMenuToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    headerNav.classList.toggle('active');
                    mobileMenuToggle.classList.toggle('active');
                });

                // Close menu when clicking outside
                document.addEventListener('click', function(event) {
                    if (!event.target.closest('.header-container')) {
                        headerNav.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                });

                // Close menu when clicking on a nav link
                const menuLinks = document.querySelectorAll('.header-nav .nav-link');
                menuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        headerNav.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    });
                });
            }

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });


// Mobile Apps Modal Functions
window.openMobileAppsModal = function() {
    const modal = document.getElementById('mobileAppsModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

window.closeMobileAppsModal = function() {
    const modal = document.getElementById('mobileAppsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Set up modal event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const mobileAppsModal = document.getElementById('mobileAppsModal');
    
    // Close modal when clicking outside the content area
    if (mobileAppsModal) {
        mobileAppsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMobileAppsModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileAppsModal && mobileAppsModal.style.display === 'block') {
            closeMobileAppsModal();
        }
    });
});
