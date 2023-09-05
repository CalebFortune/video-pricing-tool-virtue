// Initialize Parse
Parse.initialize("leK5sqZJbjoK4kFbo5jM1HKv2hfW24A98OsBR00z", "ErjjnF7tF4SM9seMZsjfA0P5xlYtdhYHhSDeXw6G");
Parse.serverURL = 'https://parseapi.back4app.com/';

const videoSlider = document.getElementById('videoSlider');
const monthlyCostElement = document.getElementById('monthlyCostDisplay');
const annualCostElement = document.getElementById('annualCostDisplay');
const userInfoSection = document.getElementById('userInfoSection');

const checkboxes = [
    'SEOAndSocialAudit',
    'HostingAndDataManagement',
    'ProofingAndReEdits',
    'StrategyAndReporting',
    'CopyAndScriptWriting',
    'ROIReporting',
    'LicensedMusicAndStockLibrary',
    'EmailNewsletterSocialAndCampaignCopyWriting',
    'Custom2D3DAnimation',
    'VideoAdManagement'
];

function updatePrice() {
    const baseVideoCostFirst = 1650;
    const baseVideoCostSubsequent = 1150;
    const proofingCostPerVideo = 100;
    const strategyCostFirstVideo = 250;
    const strategyCostSubsequentVideos = 100;
    const quarterlyMajorTravelCost = 1000;
    const yearlyHostingCost = 850;
    const quarterlyROICost = checkboxes.ROIReporting.checked ? 300 : 0;
    const yearlyMusicStockCost = checkboxes.LicensedMusicStock.checked ? 240 : 0;
    const quarterlyEmailNewsletterCost = checkboxes.EmailNewsletterCopy.checked ? 1200 : 0;
    const quarterlyCustomAnimationCost = checkboxes.CustomAnimation.checked ? 2500 : 0;
    const quarterlyVideoAdManagementCost = checkboxes.VideoAdManagement.checked ? 5400 : 0;

    let videosPerMonth = parseInt(videoSlider.value);
    let totalMonthlyCost = videosPerMonth === 1 ? baseVideoCostFirst : baseVideoCostFirst + (videosPerMonth - 1) * baseVideoCostSubsequent;
    totalMonthlyCost += videosPerMonth * proofingCostPerVideo;
    totalMonthlyCost += videosPerMonth === 1 ? strategyCostFirstVideo : strategyCostFirstVideo + (videosPerMonth - 1) * strategyCostSubsequentVideos;

    let totalYearlyCost = totalMonthlyCost * 12 + 4 * (quarterlyMajorTravelCost + quarterlyROICost + quarterlyEmailNewsletterCost + quarterlyCustomAnimationCost + quarterlyVideoAdManagementCost);
    if (!checkboxes.HostingAndDataManagement.checked) {
        totalYearlyCost -= yearlyHostingCost;
    }
    if (!checkboxes.SEOAndSocialAudit.checked) {
        totalYearlyCost -= yearlyHostingCost; // Assuming SEO and Hosting costs are the same. Adjust if different.
    }

     monthlyCostElement.textContent = `$${totalMonthlyCost.toFixed(2)}`;
    annualCostElement.textContent = `$${totalYearlyCost.toFixed(2)}`;
}

videoSlider.addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = videoSlider.value;
    updatePrice();
    showUserInfoSection();
});

checkboxes.forEach(checkboxId => {
    const checkbox = document.getElementById(checkboxId);
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
    Object.keys(checkboxes).forEach(key => {
        userSelection.set(key, checkboxes[key].checked);
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
