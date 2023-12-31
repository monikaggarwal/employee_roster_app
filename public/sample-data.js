const  fs = require('fs');

function sampleData() {
    const data = [];
    const empName = ["Ankit", "David", "Deepti", "Gaurav", "Kanika", "Lokesh", "Monika", "Nupur", "Tanya"];
    const address = ["12 Sec 20", "34 Sec 16", "56 Sec 27", "78 Sec 18", "89 Sec 21", "10 Sec 2", "11 Sec 10", "12 Sec 19", "13 Sec 25"];
const empAge = [];
const jobTitle = ["Executive", "Manager", "Consultant", "Analyst", "Trainee", "PM", "Tester", "Tech Analyst", "Dev Ops"];
const dateOfJoining = [];
const imageUrl = "profile_dummy_img.jpeg";
    for (let id = 1; id <= 500; id++) {
        const ranName = empName[Math.floor(Math.random() * empName.length)];
        const ranContactNo = Math.floor(Math.random() * 10000000000).toString();
        const ranAddress = address[Math.floor(Math.random() * address.length)];
        const ranAge = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const ranJobTitle = jobTitle[Math.floor(Math.random() * jobTitle.length)];
        const ranDateOfJoining = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0];
const jobDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        data.push({id, empName:ranName, contactNo: ranContactNo, address: ranAddress, empAge: ranAge(18, 60), jobTitle: ranJobTitle, dateOfJoining: ranDateOfJoining, jobDescription, empPhoto: imageUrl});

    }

    return data;
}

const sampleDataGenerated = sampleData();

const jsonData = JSON.stringify(sampleDataGenerated, null, 2);

fs.writeFileSync('public/sample-data.json', jsonData);
console.log('data saved to sample-data.json');
