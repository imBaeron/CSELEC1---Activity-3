// Grade Tracker
// Baron Francis C. Boñola

// setup functions and variables

const PASS_THRESHOLD = 60; // const 1
const MAX_GRADE = 100; // const 1
const students = [ // const 3
    { id: 1, name: "Aang",   grades: [88, 92, 79],  contactInfo: { email: "aang@mail.com" } },
    { id: 2, name: "Toph",   grades: [45, 60, 55],  contactInfo: { email: "toph@mail.com" } },
    { id: 3, name: "Sokka",  grades: [95, 91, 89],  contactInfo: null },
    { id: 4, name: "Katara",  grades: [70, 65, 72],  contactInfo: { email: "katara@mail.com" } },
    { id: 5, name: "Zuko",  grades: [50, 40, 58],  contactInfo: { email: "zuko@mail.com" } },
];
const calculateAverage = (grades) => { // arrow function 1
    let total = 0; // let 1
    for (let i = 0; i < grades.length; i++) {
        let currentGrade = grades[i]; // let 2
        total += currentGrade;
    }
    return total / grades.length;
};

const getLetterGrade = (average) => { // arrow function 2
    let letter = "F"; // let 3
    if (average >= 90) letter = "A";
    else if (average >= 80) letter = "B";
    else if (average >= 70) letter = "C";
    else if (average >= PASS_THRESHOLD) letter = "D";
    return letter;
};

const buildStudentSummary = (student) => { // arrow function 3
    const { name, grades, contactInfo } = student; // destructued OJ 1

    const average = calculateAverage(grades); // const4
    const letter = getLetterGrade(average); // const5
    const email = contactInfo?.email ?? "No email on file"; // optional chaining 1
    const summary = { ...student, average, letter, email }; // OJ literal using spread 1

    return summary;
};

const printStudentSummary = (summary) => { // arrow function 4
    const { name, average, letter, email } = summary; // destructured OJ 2

    console.log(`Student: ${name} | Average: ${average.toFixed(1)}% | Grade: ${letter}`); // template literal 1
    console.log(`Contact: ${email}`); // template literal 2
};


const getPassingStudents = (studentList) => { // arrow function 5
    return studentList.filter((student) => calculateAverage(student.grades) >= PASS_THRESHOLD); // .filter() 1
};

function getFailingStudents(studentList) { // arrow function 6
    return studentList.filter((student) => calculateAverage(student.grades) < PASS_THRESHOLD); // .filter() 2
}

// main

console.log(`\n=== FULL CLASS ROSTER (${students.length} students) ===`); // template literal 3

const allSummaries = students.map((student) => buildStudentSummary(student)); // const 5, .map() 1

let studentIndex = 1; // let 4
for (const summary of allSummaries) {
    console.log(`\n#${studentIndex}`); // template literal 4
    printStudentSummary(summary);
    studentIndex++;
}

// passing vs failing

const passingStudents = getPassingStudents(students); // const 6
const failingStudents = getFailingStudents(students); // const 7

console.log(`\n=== PASSING STUDENTS (${passingStudents.length}) ===`); // tl 5
passingStudents.forEach((student) => {
    console.log(`- ${student.name}`); // tl 6
});

console.log(`\n=== FAILING STUDENTS (${failingStudents.length}) ===`); // tl 7
failingStudents.forEach((student) => {
    console.log(`- ${student.name}`); // tl 8
});

// desctructuring examples

let allAverages = allSummaries.map((s) => s.average); // let 5

allAverages = allAverages.map((avg) => Math.round(avg * 10) / 10); // .map() 2

let sortedAverages = [...allAverages].sort((a, b) => b - a); // let 6

const [topScore, secondScore, ...remainingScores] = sortedAverages; // destruct array 1

console.log(`\nTop score: ${topScore}, Second: ${secondScore}`); // tl 9
console.log(`Remaining scores: ${remainingScores.join(", ")}`); // tl 10

const [firstStudent, secondStudent] = students;
console.log(`\nFirst two enrolled: ${firstStudent.name} and ${secondStudent.name}`); // destruct arr 2

const { grades: anaGrades } = students[0]; // desctured array 3
const [firstGrade, , thirdGrade] = anaGrades;
console.log(`Aang's first and third grades: ${firstGrade}, ${thirdGrade}`);

// spread examples

let newStudentBase = { id: 6, name: "Finn" }; // let 7
let newStudent = { ...newStudentBase, grades: [80, 85, 90], contactInfo: { email: "finn@mail.com" } }; // OJ spread 2

const updatedRoster = [...students, newStudent]; // arr spread 1

let midtermGrades = [70, 75];
let finalGrades = [88, 90];
const combinedGrades = [...midtermGrades, ...finalGrades]; // arr spread 2

console.log(`\nRoster size after adding ${newStudent.name}: ${updatedRoster.length}`);
console.log(`Combined midterm + final grades: ${combinedGrades.join(", ")}`);

let hasMissingContact = false; // let 8

let checkIndex = 0; // let 9
while (checkIndex < students.length) {
    const hasEmail = students[checkIndex]?.contactInfo?.email; // OJ optional chaining 2
    if (!hasEmail) {
        hasMissingContact = true;
    }
    checkIndex++;
}

let finalMessage = hasMissingContact // let 10
    ? "Some students are missing contact info."
    : "All students have contact info on file.";

console.log(`\n${finalMessage}`);
console.log("\n=== END OF REPORT ===");