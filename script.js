let day_of_year_span = document.getElementById("day-of-year");
let week_of_year_span = document.getElementById("week-of-year");
let year_span = document.getElementsByClassName("year");

let time_span = document.getElementById("time");
let date_span = document.getElementById("date");

let seconds_div = document.getElementsByClassName("seconds-div");
let days_div = document.getElementsByClassName("days-div");
let info_middle = document.getElementsByClassName("info-middle");
let tooltip = document.getElementsByClassName("event-name");

let seconds = document.getElementsByClassName("seconds");
let days = document.getElementsByClassName("days");
let percent_span = document.getElementsByClassName("percent");
let progress_bar = document.getElementsByClassName("progress-bar");

for (let i = 0 ; i < seconds_div.length ; i++) {
    days_div[i].style.display = "none";

    info_middle[i].addEventListener("click", function(e) {
        seconds_div[i].style.display = seconds_div[i].style.display === "none" ? "flex" : "none";
        days_div[i].style.display = days_div[i].style.display === "none" ? "flex" : "none";
    });
}

function Superscript(text) {
    return "<sup>" + text + "</sup>";
}

function OrdinalSuffix(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

function AddCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function Timing() {
    SetTimeAndDate();
    SetCountdown();
}
let timing_interval = setInterval(Timing, 1);

function SetTimeAndDate() {
    let date = new Date();
    
    let day_of_year_ms = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0);
    let day_of_year = day_of_year_ms / 1000 / 60 / 60 / 24;
    let day_of_year_string = day_of_year + Superscript(OrdinalSuffix(day_of_year));
    day_of_year_span.innerHTML = day_of_year_string;
    
    let year_start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    let week_of_year = Math.ceil((((date - year_start) / (1000 * 60 * 60 * 24)) + 1) / 7);
    let week_of_year_string = week_of_year + Superscript(OrdinalSuffix(week_of_year));
    week_of_year_span.innerHTML = week_of_year_string;

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let current_day = days[date.getDay()];
    let current_month = months[date.getMonth()];
    let current_year = date.getFullYear();
    let date_string = current_day + " " + date.getDate() + Superscript(OrdinalSuffix(date.getDate())) + " " + current_month + " " + current_year;
    date_span.innerHTML = date_string;

    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let time_string = hour + ":" + min + ":" + sec;
    time_span.innerHTML = time_string;

    for (let i = 0 ; i < year_span.length ; i++) {
        year_span[i].innerHTML = date.getFullYear();
    }
};

let events = [];
let d = new Date();
let custom_year = d.getFullYear();
let custom_month = 2;
let custom_day = 17;
let custom_hour = 0;
let custom_minute = 0;
let custom_second = 0;
let custom_text = "Birthday";

let custom_start;

let event_names = [
    "Next Minute",
    "Next Hour",
    "Next Day",
    "Next Week",
    "Next Month",
    "Next Year",
    "Next Halloween",
    "Next Christmas",
    "Next " + custom_text,
];
function SetCountdown() {
    let date = new Date();
    let leap_year = LeapYear(date.getFullYear());

    let temp_date = new Date();
    let next_monday = new Date(temp_date.setDate(temp_date.getDate() + (((1 + 7 - temp_date.getDay()) % 7) || 7)));
    events = [
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + 1, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, 0, 0),
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0),
        new Date(next_monday.getFullYear(), next_monday.getMonth(), next_monday.getDate(), 0, 0, 0),
        new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0),
        new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0),
        new Date(date.getFullYear(), 09, 31, 0, 0, 0),
        new Date(date.getFullYear(), 11, 25, 0, 0, 0),
        new Date(custom_year, custom_month - 1, custom_day, custom_hour, custom_minute, custom_second),
    ];

    let day_ms = 1000 * 60 * 60 * 24;
    let durations = [
        1000 * 60,
        1000 * 60 * 60,
        day_ms,
        day_ms * 7,
        [day_ms * 31, 
         day_ms * (leap_year ? 29 : 28), 
         day_ms * 31, 
         day_ms * 30, 
         day_ms * 31, 
         day_ms * 30, 
         day_ms * 31, 
         day_ms * 31, 
         day_ms * 30, 
         day_ms * 31, 
         day_ms * 30, 
         day_ms * 31],
        day_ms * (leap_year ? 366 : 365),
    ]
    let decimals = [2, 2, 3, 4, 5, 6];   

    for (let i = 0 ; i < events.length; i++) {
        
        let difference = events[i] - date;
        if (difference < 0) {
            events[i] = new Date(parseInt(custom_year) + (date.getFullYear() - custom_year), custom_month - 1, custom_day, custom_hour, custom_minute, custom_second);
            difference = events[i] - date;

            if (difference < 0) {
                events[i] = new Date(parseInt(custom_year) + 1, custom_month - 1, custom_day, custom_hour, custom_minute, custom_second);
                custom_year++;
                difference = events[i] - date;
            }
        }
                
        let seconds_remaining = Math.ceil(difference / 1000);
        let days_remaining = (difference / 1000 / 60 / 60 / 24).toFixed(5);

        seconds[i].innerHTML = AddCommas(seconds_remaining);
        days[i].innerHTML = AddCommas(days_remaining);
        
        let percent = 0;
        if (i == 4) {
            percent = ((1 - (difference / (durations[4][date.getMonth()]))) * 100).toFixed(decimals[i]);
            percent_span[i].innerHTML = percent;
        } else if (i >= 6 && i < 8) {
            percent = ((1 - (difference / durations[durations.length - 1])) * 100).toFixed(decimals[5]);
        } else if (i == 8) {
            let duration = 0;
            if (custom_start == undefined) {
                duration = durations[durations.length - 1]
            } else {
                duration = events[i] - custom_start;
                if (difference < 0) {
                    custom_year = parseInt(custom_year) + 1;
                    custom_start = new Date();
                    events[i] = new Date(parseInt(custom_year) + (date.getFullYear() - custom_year), custom_month - 1, custom_day, custom_hour, custom_minute, custom_second);
                    duration = events[i] - custom_start;
                }
            }
            percent = ((1- (difference / duration)) * 100).toFixed(decimals[5]);
        } else {
            percent = ((1 - (difference / durations[i])) * 100).toFixed(decimals[i]);
            percent_span[i].innerHTML = percent;
        }
        progress_bar[i].style.width = percent + "%";
    }
}

function LeapYear(year) {
    return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
}

for (let i = 0 ; i < tooltip.length ; i++) {
    tooltip[i].addEventListener("mouseover", function(e) {
        tooltip[i].innerHTML = events[i].toString().substring(0, 24);
    });
    tooltip[i].addEventListener("mouseout", function(e) {
        tooltip[i].innerHTML = event_names[i];
    });
};

tooltip[8].addEventListener("click", function(e) {
    let new_custom = prompt("Enter A Date to Countdown to, In the Form YYYY-MM-DD HH:MM:SS NAME (no spaces)");
    custom_start = new Date();

    let split_custom = new_custom.split(" ");
    let date = split_custom[0].split("-");
    let time = split_custom[1].split(":");

    custom_year = date[0];
    custom_month = date[1];
    custom_day = date[2];

    custom_hour = time[0];
    custom_minute = time[1];
    custom_second = time[2];

    custom_text = split_custom[2];
    event_names[8] = "Next " + custom_text;
});
