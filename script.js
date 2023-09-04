document.addEventListener('DOMContentLoaded', function() {
    const videoSlider = document.getElementById('videoSlider');
    const monthlyCostElement = document.getElementById('monthlyCostDisplay');
    const annualCostElement = document.getElementById('annualCostDisplay');
    const SEOCheckbox = document.getElementById('SEOAndSocialAudit');
    const HostingCheckbox = document.getElementById('HostingAndDataManagement');
    const ProofingCheckbox = document.getElementById('ProofingAndReEdits');
    const StrategyCheckbox = document.getElementById('StrategyAndReporting');
    const CopyCheckbox = document.getElementById('CopyAndScriptWriting');

    function updatePrice() {
        const baseVideoCost = 1640;
        const quarterlyCost = 1000;
        const yearlyHostingCost = 1000;
        const yearlySEOCost = 500;
        const proofingCostPerVideo = 200;
        const strategyCostPerVideo = 300;
        const copyCostPerVideo = 250;
        const markup = 0.30;

        let videosPerMonth = parseInt(videoSlider.value);
        let totalMonthlyCost = videosPerMonth * baseVideoCost;
        let totalYearlyCost = totalMonthlyCost * 12 + quarterlyCost * 4;

        if (!SEOCheckbox.checked) {
            totalYearlyCost -= yearlySEOCost;
        }
        if (!HostingCheckbox.checked) {
            totalYearlyCost -= yearlyHostingCost;
        }
        if (!ProofingCheckbox.checked) {
            totalYearlyCost -= proofingCostPerVideo * videosPerMonth * 12;
        }
        if (!StrategyCheckbox.checked) {
            totalYearlyCost -= strategyCostPerVideo * videosPerMonth * 12;
        }
        if (!CopyCheckbox.checked) {
            totalYearlyCost -= copyCostPerVideo * videosPerMonth * 12;
        }

        totalMonthlyCost = totalYearlyCost / 12;

        // Apply markup
        totalMonthlyCost += totalMonthlyCost * markup;
        totalYearlyCost += totalYearlyCost * markup;

        monthlyCostElement.textContent = `$${Math.round(totalMonthlyCost)}`;
        annualCostElement.textContent = `$${Math.round(totalYearlyCost)}`;
    }

    videoSlider.addEventListener('input', function() {
        document.getElementById('sliderValue').textContent = videoSlider.value;
        updatePrice();
    });

    SEOCheckbox.addEventListener('change', updatePrice);
    HostingCheckbox.addEventListener('change', updatePrice);
    ProofingCheckbox.addEventListener('change', updatePrice);
    StrategyCheckbox.addEventListener('change', updatePrice);
    CopyCheckbox.addEventListener('change', updatePrice);

    updatePrice();
});
