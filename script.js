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
    const firstVideoCost = 1640;
    const subsequentVideoCost = 1340;
    let videosPerMonth = parseInt(videoSlider.value);
    let totalMonthlyCost = firstVideoCost + (subsequentVideoCost * (videosPerMonth - 1));
    let totalYearlyCost = totalMonthlyCost * 12;

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
    const data = {
        videosPerMonth: parseInt(videoSlider.value),
        SEOAndSocialAudit: SEOCheckbox.checked,
        HostingAndDataManagement: HostingCheckbox.checked,
        ProofingAndReEdits: ProofingCheckbox.checked,
        StrategyAndReporting: StrategyCheckbox.checked,
        CopyAndScriptWriting: CopyCheckbox.checked,
        userName: document.getElementById('userName').value,
        userEmail: document.getElementById('userEmail').value,
        companyName: document.getElementById('companyName').value,
        userIntent: document.getElementById('userIntent').value
    };

    try {
        const result = await Parse.Cloud.run('saveUserSelections', data);
        if (result && result.success) {
            alert('Your selections and information have been saved!');
        } else {
            alert('Failed to save your selections.');
        }
    } catch (error) {
        alert('Failed to save your selections: ' + error.message);
    }
});

updatePrice();
