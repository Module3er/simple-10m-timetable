const TIMETABLE_DATA = {
    periods: [
        { id: 1, time: "8:10 - 8:45" },
        { id: 2, time: "8:45 - 9:20" },
        { id: 3, time: "9:35 - 10:10" },
        { id: 4, time: "10:10 - 10:45" },
        { id: 5, time: "10:45 - 11:20" },
        { id: 6, time: "11:50 - 12:25" },
        { id: 7, time: "12:25 - 13:00" },
        { id: 8, time: "13:10 - 13:45" },
        { id: 9, time: "13:45 - 14:20" }
    ],
    
    masterTimetable: {
        Monday: [
            {
                type: "optional",
                options: [
                    { subject: "Accounting", room: "1.7" },
                    { subject: "Art", room: "1.9B" },
                    { subject: "Arabic", room: "2.B" },
                    { subject: "Chemistry", room: "CL4" },
                    { subject: "Computer Science", room: "CR2" },
                    { subject: "Enterprise", room: "3.11" },
                    { subject: "French Literature", room: "3.4" },
                    { subject: "Hindi", room: "1.8B" },
                    { subject: "Physical Education", room: "Gym2" },
                    { subject: "Tamil", room: "Ta Rm" },
                    { subject: "Food & Nutrition", room: "FL" }
                ]
            },
            { type: "same_as_previous" },  // Period 2 same as Period 1
            { type: "fixed", subject: "English", room: "3.2", note: "Oral" },
            { type: "fixed", subject: "Mathematics", room: "2.11" },
            { type: "fixed", subject: "Mathematics", room: "2.11" },
            {
                type: "optional",
                options: [
                    { subject: "Biology", room: "BL2" },
                    { subject: "Business", room: "3.11" },
                    { subject: "Economics", room: "3.5" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "1.9A" },
                    { subject: "English Literature", room: "2.4" },
                    { subject: "Physics", room: "PL3" },
                    { subject: "Sociology", room: "3.10" },
                    { subject: "Computer Science", room: "2.9" }
                ]
            },
            { type: "same_as_previous" },  // Period 7 same as Period 6
            { 
                type: "optional",
                options: [
                    { subject: "Chemistry", room: "CL2" },
                    { subject: "English Literature", room: "2.1" }
                ]
            },
            { type: "same_as_previous" }  // Period 9 same as Period 8
        ],
        Tuesday: [
            {
                type: "optional",
                options: [
                    { subject: "Chemistry", room: "CL2" },
                    { subject: "English Literature", room: "3.9" }
                ]
            },
            { type: "same_as_previous" },
            {
                type: "optional",
                options: [
                    { subject: "Biology", room: "BL2" },
                    { subject: "Business", room: "3.11" },
                    { subject: "Economics", room: "3.5" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "1.9B" },
                    { subject: "English Literature", room: "2.3" },
                    { subject: "Physics", room: "PL2" },
                    { subject: "Sociology", room: "3.10" },
                    { subject: "Computer Science", room: "2.9" }
                ]
            },
            { type: "same_as_previous" },
            { type: "fixed", subject: "Journal Period", room: "Home Room" },
            {
                type: "optional",
                options: [
                    { subject: "Physics", room: "PL1" },
                    { subject: "Fashion & Textiles", room: "TL" },
                    { subject: "French Literature", room: "1.6" }
                ]
            },
            { type: "same_as_previous" },
            { type: "fixed", subject: "French", room: "3.1" },
            { type: "fixed", subject: "French", room: "3.1" }
        ],
        Wednesday: [
            { type: "fixed", subject: "English", room: "3.2", note: "Essay Writing" },
            { type: "fixed", subject: "English", room: "3.2", note: "Essay Writing" },
            {
                type: "optional",
                options: [
                    { subject: "Chemistry", room: "CL2" },
                    { subject: "English Literature", room: "3.9" }
                ]
            },
            { type: "fixed", subject: "French", room: "1.6" },
            { type: "fixed", subject: "French", room: "1.6" },
            {
                type: "optional",
                options: [
                    { subject: "Add-Maths", room: "2.7" },
                    { subject: "Art", room: "AR" },
                    { subject: "Physical Education", room: "Gym2" },
                    { subject: "Sociology", room: "3.9" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "1.6" }
                ]
            },
            { type: "same_as_previous" },
            {
                type: "optional",
                options: [
                    { subject: "Accounting", room: "1.7" },
                    { subject: "Art", room: "AR" },
                    { subject: "Arabic", room: "2.8" },
                    { subject: "Chemistry", room: "CL4" },
                    { subject: "Computer Science", room: "CR2" },
                    { subject: "Enterprise", room: "3.11" },
                    { subject: "French Literature", room: "3.4" },
                    { subject: "Hindi", room: "1.8A" },
                    { subject: "Physical Education", room: "Gym1" },
                    { subject: "Tamil", room: "Ta Rm" },
                    { subject: "Urdu", room: "Mtg Rm" },
                    { subject: "Food & Nutrition", room: "FL" }
                ]
            },
            { type: "same_as_previous" }
        ],
        Thursday: [
            {
                type: "optional",
                options: [
                    { subject: "Add-Maths", room: "2.7" },
                    { subject: "Art", room: "AR" },
                    { subject: "Physical Education", room: "Gym2" },
                    { subject: "Sociology", room: "3.10" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "1.9A" }
                ]
            },
            { type: "same_as_previous" },
            { type: "fixed", subject: "PE (Obligatory)", room: "Gym" },
            { type: "fixed", subject: "PE (Obligatory)", room: "Gym" },
            { type: "fixed", subject: "French", room: "1.6" },
            {
                type: "optional",
                options: [
                    { subject: "Physics", room: "CL3" },
                    { subject: "Fashion & Textiles", room: "TL" },
                    { subject: "French Literature", room: "1.6" }
                ]
            },
            { type: "same_as_previous" },
            { type: "fixed", subject: "Mathematics", room: "2.11" },
            { type: "fixed", subject: "Mathematics", room: "2.11" }
        ],
        Friday: [
            { type: "fixed", subject: "Library", room: "Library" },
            {
                type: "optional",
                options: [
                    { subject: "Add-Maths", room: "2.7" },
                    { subject: "Art", room: "AR" },
                    { subject: "Physical Education", room: "Gym1" },
                    { subject: "Sociology", room: "1.6" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "2.12" }
                ]
            },
            { type: "fixed", subject: "Activity", room: "Various" },
            {
                type: "optional",
                options: [
                    { subject: "Accounting", room: "1.7" },
                    { subject: "Art", room: "1.9B" },
                    { subject: "Arabic", room: "2.11" },
                    { subject: "Chemistry", room: "CL4" },
                    { subject: "Computer Science", room: "CR2" },
                    { subject: "Enterprise", room: "3.11" },
                    { subject: "French Literature", room: "3.4" },
                    { subject: "Hindi", room: "2.2" },
                    { subject: "Physical Education", room: "Gym1" },
                    { subject: "Tamil", room: "Ta Rm" },
                    { subject: "Urdu", room: "Mtg Rm" },
                    { subject: "Food & Nutrition", room: "FL" }
                ]
            },
            { type: "fixed", subject: "Mathematics", room: "2.11" },
            {
                type: "optional",
                options: [
                    { subject: "Biology", room: "BL2" },
                    { subject: "Business", room: "3.11" },
                    { subject: "Economics", room: "3.5" },
                    { subject: "Hinduism", room: "1.8A" },
                    { subject: "Islamic", room: "1.9A" },
                    { subject: "English Literature", room: "2.4" },
                    { subject: "Physics", room: "PL2" },
                    { subject: "Sociology", room: "3.10" },
                    { subject: "Computer Science", room: "2.9" }
                ]
            },
            {
                type: "optional",
                options: [
                    { subject: "Physics", room: "PL2" },
                    { subject: "Fashion & Textiles", room: "TL" },
                    { subject: "French Literature", room: "1.6" }
                ]
            },
            { type: "fixed", subject: "English", room: "3.2" },
            { type: "fixed", subject: "English", room: "3.2" }
        ]
    },

    obligatorySubjects: [
        { subject: "Mathematics", periodsPerWeek: 5 },
        { subject: "English", periodsPerWeek: 5 },
        { subject: "French", periodsPerWeek: 5 },
        { subject: "PE (Obligatory)", periodsPerWeek: 1 },
        { subject: "Library", periodsPerWeek: 1 },
        { subject: "Journal Period", periodsPerWeek: 1 },
        { subject: "Activity", periodsPerWeek: 1 }
    ],

    optionalSubjects: [
        "English Literature",
        "French Literature",
        "Add-Maths",
        "Biology",
        "Chemistry",
        "Physics",
        "Accounting",
        "Business",
        "Economics",
        "Design and Technology",
        "CDT",
        "Computer Science",
        "Art",
        "Physical Education",
        "Arabic",
        "Hinduism",
        "Tamil",
        "Hindi",
        "Islam",
        "Urdu",
        "Enterprise",
        "Fashion & Textiles",
        "Food & Nutrition",
        "Sociology"
    ].sort(),

};
