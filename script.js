// Initialize Parse
Parse.initialize("leK5sqZJbjoK4kFbo5jM1HKv2hfW24A98OsBR00z", "ErjjnF7tF4SM9seMZsjfA0P5xlYtdhYHhSDeXw6G");
Parse.serverURL = 'https://parseapi.back4app.com/';

const videoSlider = document.getElementById('videoSlider');
const monthlyCostElement = document.getElementById('monthlyCostDisplay');
const annualCostElement = document.getElementById('annualCostDisplay');
const SEOCheckbox = document.getElementById('SEOAndSocialAudit');
const HostingCheckbox = document.getElementById('HostingAndDataManagement');
const ProofingCheckbox = document.getElementById('ProofingAndReEdits');
const StrategyCheckbox = document.getElementById('StrategyAndReporting');
const CopyCheckbox = document.getElementById('CopyAndScriptWriting');
const userInfoSection = document.getElementById('userInfoSection');

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

    totalMonthlyCost += totalMonthlyCost * markup;
    totalYearlyCost += totalYearlyCost * markup;

    monthlyCostElement.textContent = `$${totalMonthlyCost.toFixed(2)}`;
    annualCostElement.textContent = `$${totalYearlyCost.toFixed(2)}`;
}

videoSlider.addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = videoSlider.value;
    updatePrice();
    showUserInfoSection();
});

[SEOCheckbox, HostingCheckbox, ProofingCheckbox, StrategyCheckbox, CopyCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', updatePrice);
    checkbox.addEventListener('change', showUserInfoSection);
});

function showUserInfoSection() {
    userInfoSection.style.display = 'block';
}

document.getElementById('submitInfo').addEventListener('click', async function() {
    const UserSelections = Parse.Object.extend("UserSelections");
    const userSelection = new UserSelections();

    userSelection.set("videosPerMonth", parseInt(videoSlider.value));
    userSelection.set("SEOAndSocialAudit", SEOCheckbox.checked);
    userSelection.set("HostingAndDataManagement", HostingCheckbox.checked);
    userSelection.set("ProofingAndReEdits", ProofingCheckbox.checked);
    userSelection.set("StrategyAndReporting", StrategyCheckbox.checked);
    userSelection.set("CopyAndScriptWriting", CopyCheckbox.checked);
    userSelection.set("userName", document.getElementById('userName').value);
    userSelection.set("userEmail", document.getElementById('userEmail').value);
    userSelection.set("companyName", document.getElementById('companyName').value);
    userSelection.set("userIntent", document.getElementById('userIntent').value);

    try {
        await userSelection.save();
        alert('Your selections and information have been saved!');
    } catch (error) {
        alert('Failed to save your selections: ' + error.message);
    }
});

updatePrice();
