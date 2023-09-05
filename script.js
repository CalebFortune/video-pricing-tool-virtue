// Initialize Parse
Parse.initialize("leK5sqZJbjoK4kFbo5jM1HKv2hfW24A98OsBR00z", "ErjjnF7tF4SM9seMZsjfA0P5xlYtdhYHhSDeXw6G");
Parse.serverURL = 'https://parseapi.back4app.com/';

const videoSlider = document.getElementById('videoSlider');
const monthlyCostElement = document.getElementById('monthlyCostDisplay');
const annualCostElement = document.getElementById('annualCostDisplay');
const userInfoSection = document.getElementById('userInfoSection');

const checkboxIds = [
    'SEOAndSocialAudit',
    'HostingAndDataManagement',
    'ProofingAndReEdits',
    'StrategyAndReporting',
    'CopyAndScriptWriting',
    'ROIReporting',
    'LicensedMusicAndStockLibrary',
    'EmailNewsletterCopy',
    'CustomAnimation',
    'VideoAdManagement'
];

const checkboxes = checkboxIds.reduce((acc, id) => {
    acc[id] = document.getElementById(id);
    return acc;
}, {});

function updatePrice() {
    const baseVideoCostFirst = 1650;
    const baseVideoCostSubsequent = 1150;
    const proofingCostPerVideo = 100;
    const strategyCostFirstVideo = 250;
    const strategyCostSubsequentVideos = 100;
    const quarterlyMajorTravelCost = 1000;
    const yearlyHostingCost = 850;
    const quarterlyROICost = checkboxes['ROIReporting'].checked ? 300 : 0;
    const yearlyMusicStockCost = checkboxes['LicensedMusicAndStockLibrary'].checked ? 240 : 0;
    const quarterlyEmailNewsletterCost = checkboxes['EmailNewsletterCopy'].checked ? 1200 : 0;
    const quarterlyCustomAnimationCost = checkboxes['CustomAnimation'].checked ? 2500 : 0;
    const quarterlyVideoAdManagementCost = checkboxes['VideoAdManagement'].checked ? 5400 : 0;

    let videosPerMonth = parseInt(videoSlider.value);
    let totalMonthlyCost = videosPerMonth === 1 ? baseVideoCostFirst : baseVideoCostFirst + (videosPerMonth - 1) * baseVideoCostSubsequent;
    
    // Add proofing cost
    totalMonthlyCost += videosPerMonth * proofingCostPerVideo;

    // Add strategy cost
    totalMonthlyCost += videosPerMonth === 1 ? strategyCostFirstVideo : strategyCostFirstVideo + (videosPerMonth - 1) * strategyCostSubsequentVideos;

    // Add/Deduct costs based on checkboxes for monthly costs
    if (checkboxes['ROIReporting'].checked) {
        totalMonthlyCost += quarterlyROICost / 3; // Since it's a quarterly cost
    }
    if (checkboxes['EmailNewsletterCopy'].checked) {
        totalMonthlyCost += quarterlyEmailNewsletterCost / 3; // Since it's a quarterly cost
    }
    if (checkboxes['CustomAnimation'].checked) {
        totalMonthlyCost += quarterlyCustomAnimationCost / 3; // Since it's a quarterly cost
    }
    if (checkboxes['VideoAdManagement'].checked) {
        totalMonthlyCost += quarterlyVideoAdManagementCost / 3; // Since it's a quarterly cost
    }

    // Calculate yearly cost
    let totalYearlyCost = totalMonthlyCost * 12 + 4 * (quarterlyMajorTravelCost + quarterlyROICost + quarterlyEmailNewsletterCost + quarterlyCustomAnimationCost + quarterlyVideoAdManagementCost);
    
    // Deduct costs based on unchecked options for yearly costs
    if (!checkboxes['HostingAndDataManagement'].checked) {
        totalYearlyCost -= yearlyHostingCost;
    }
    if (!checkboxes['SEOAndSocialAudit'].checked) {
        totalYearlyCost -= yearlyHostingCost; // Assuming SEO and Hosting costs are the same. Adjust if different.
    }
    if (!checkboxes['LicensedMusicAndStockLibrary'].checked) {
        totalYearlyCost -= yearlyMusicStockCost;
    }

    monthlyCostElement.textContent = `$${totalMonthlyCost.toFixed(2)}`;
    annualCostElement.textContent = `$${totalYearlyCost.toFixed(2)}`;
}

videoSlider.addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = videoSlider.value;
    updatePrice();
    showUserInfoSection();
});

checkboxIds.forEach(checkboxId => {
    checkboxes[checkboxId].addEventListener('change', updatePrice);
    checkboxes[checkboxId].addEventListener('change', showUserInfoSection);
});

function showUserInfoSection() {
    userInfoSection.style.display = 'block';
}

document.getElementById('submitInfo').addEventListener('click', async function() {
    const UserSelections = Parse.Object.extend("UserSelections");
    const userSelection = new UserSelections();

    userSelection.set("videosPerMonth", parseInt(videoSlider.value));
    checkboxIds.forEach(id => {
        userSelection.set(id, checkboxes[id].checked);
    });
    userSelection.set("userName", document.getElementById('userName').value);
    userSelection.set("userEmail", document.getElementById('userEmail').value);
    userSelection.set("companyName", document.getElementById('companyName').value);
    userSelection.set("userIntent", document.getElementById('userIntent').value);
    userSelection.set("CalculatedMonthlyCost", parseFloat(monthlyCostElement.textContent.replace('$', '')));
    userSelection.set("CalculatedAnnualCost", parseFloat(annualCostElement.textContent.replace('$', '')));

    try {
        await userSelection.save();
        alert('Your selections and information have been saved!');
    } catch (error) {
        alert('Failed to save your selections: ' + error.message);
    }
});

updatePrice();
