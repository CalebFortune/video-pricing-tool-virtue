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
const ROIReportingCheckbox = document.getElementById('ROIReporting');
const LicensedMusicCheckbox = document.getElementById('LicensedMusicAndStock');
const EmailNewsletterCheckbox = document.getElementById('EmailNewsletterCopy');
const CustomAnimationCheckbox = document.getElementById('CustomAnimation');
const VideoAdManagementCheckbox = document.getElementById('VideoAdManagement');
const userInfoSection = document.getElementById('userInfoSection');

function updatePrice() {
    const firstVideoCost = 1650;
    const subsequentVideoCost = 1150;
    const quarterlyCost = 1000;
    const yearlyHostingCost = 850;
    const yearlySEOCost = 500;
    const proofingCostPerVideo = 100;
    const firstStrategyCostPerVideo = 250;
    const subsequentStrategyCostPerVideo = 100;
    const copyCostPerVideo = 250;
    const quarterlyROICost = 300;
    const yearlyMusicCost = 240;
    const quarterlyEmailNewsletterCost = 1200;
    const quarterlyCustomAnimationCost = 2500;
    const quarterlyVideoAdManagementCost = 5400;
    const markup = 0.30;

    let videosPerMonth = parseInt(videoSlider.value);
    let totalMonthlyCost = (videosPerMonth === 1) ? firstVideoCost : firstVideoCost + (subsequentVideoCost * (videosPerMonth - 1));
    let totalYearlyCost = totalMonthlyCost * 12 + quarterlyCost * 4;

    if (!SEOCheckbox.checked) {
        totalYearlyCost -= yearlySEOCost;
    }
    if (!HostingCheckbox.checked) {
        totalYearlyCost -= yearlyHostingCost;
    }
    totalYearlyCost += proofingCostPerVideo * videosPerMonth * 12;
    totalYearlyCost += (videosPerMonth === 1) ? firstStrategyCostPerVideo : firstStrategyCostPerVideo + (subsequentStrategyCostPerVideo * (videosPerMonth - 1)) * 12;
    totalYearlyCost += copyCostPerVideo * videosPerMonth * 12;

    if (ROIReportingCheckbox.checked) {
        totalYearlyCost += quarterlyROICost * 4;
    }
    if (LicensedMusicCheckbox.checked) {
        totalYearlyCost += yearlyMusicCost;
    }
    if (EmailNewsletterCheckbox.checked) {
        totalYearlyCost += quarterlyEmailNewsletterCost * 4;
    }
    if (CustomAnimationCheckbox.checked) {
        totalYearlyCost += quarterlyCustomAnimationCost * 4;
    }
    if (VideoAdManagementCheckbox.checked) {
        totalYearlyCost += quarterlyVideoAdManagementCost * 4;
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

[SEOCheckbox, HostingCheckbox, ProofingCheckbox, StrategyCheckbox, CopyCheckbox, ROIReportingCheckbox, LicensedMusicCheckbox, EmailNewsletterCheckbox, CustomAnimationCheckbox, VideoAdManagementCheckbox].forEach(checkbox => {
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
    userSelection.set("ROIReporting", ROIReportingCheckbox.checked);
    userSelection.set("LicensedMusicAndStock", LicensedMusicCheckbox.checked);
    userSelection.set("EmailNewsletterCopy", EmailNewsletterCheckbox.checked);
    userSelection.set("CustomAnimation", CustomAnimationCheckbox.checked);
    userSelection.set("VideoAdManagement", VideoAdManagementCheckbox.checked);
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
