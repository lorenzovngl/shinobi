const words = [
    ["a"], ["i"], ["u"], ["e"], ["o"],
    ["ai", "love"], ["iie", "no"],
    ["ka"], ["ki"], ["ku"], ["ke"], ["ko"],
    ["kaki", "fruit"], ["kaku", "to write"], ["kiku", "to listen"], ["koko", "here"], ["eki", "train station"],
    ["ike", "pond"], ["aka", "red"], ["ookii", "large/big"],
    ["sa"], ["shi", "four"], ["su"], ["se"], ["so"],
    ["sushi"], ["kasa", "umbrella"], ["sekai", "world"], ["oosaka", "Osaka"], ["osoi", "slow"],
    ["osake", "alcoholic beverage"],
    ["ta"], ["chi"], ["tsu"], ["te", "hand"], ["to"],
    ["soto", "out"], ["tetsu", "iron"], ["tako", "octopus"], ["chiisai", "little"], ["ichi", "one"],
    ["shichi", "seven"],  ["uta", "song"],
    ["na"], ["ni", "two"], ["nu"], ["ne"], ["no"],
    ["inu", "dog"], ["neko", "cat"], ["oni", "demon"], ["naka", "inside"], ["kinoo", "yesterday"], ["nana", "seven"],
    ["ana", "hole"],
    ["ha"], ["hi"], ["fu"], ["he"], ["ho"],
    ["hoshi", "star"], ["fuku", "dress"], ["heta", "unable"], ["hana", "flower"], ["hikui", "low"],
    ["koohii", "coffee"], ["hito", "person"],
    ["ma"], ["mi"], ["mu"], ["me", "eye"], ["mo"],
    ["machi", "city"], ["musume", "daughter"], ["sashimi"], ["momo", "peach"], ["mimi", "ear"],
    ["kikimasu", "to listen"], ["mainichi", "everyday"], ["nomimasu", "to drink"], ["shimasu", "to do"],
    ["himana", "person that have free time"],
    ["ra"], ["ri"], ["ru"], ["re"], ["ro"],
    ["rekishi", "story"], ["otera", "temple"], ["araimasu", "to wash"], ["arukimasu", "to walk"],
    ["kaerimasu", "to come back"], ["atarashii", "new"], ["furui", "old"],
    ["wa"], ["wo"], ["n"],
    ["sumimasen", "sorry"], ["chotto", "hey! / a little bit"],
    ["ga"], ["gi"], ["gu"], ["ge"], ["go"],
    ["za"], ["ji"], ["zu"], ["ze"], ["zo"],
    ["da"], ["dji"], ["dzu"], ["de"], ["do"],
    ["ba"], ["bi"], ["bu"], ["be"], ["bo"],
    ["pa"], ["pi"], ["pu"], ["pe"], ["po"],
    ["manga", "comics"], ["wasabi"], ["hon", "book"], ["watashi", "I"], ["tokidoki", "sometimes"],
    ["tabemasu", "to eat"], ["tomodachi", "friend"], ["desu", "is"], ["eiga", "movie"],
    ["eigakan", "cinema"], ["genkina", "energic"], ["shizukana", "quiet"],
    ["ya"], ["yu"], ["yo"],
    ["shashin", "photo"], ["ocha", "green tea"], ["shukudai", "homework"], ["kyojin", "giant"],
    ["honya", "book store"], ["isakaya", "pub"],
    ["zasshi", "magazine"], ["katta", "I win"], ["isshoni", "together"], ["gakkou", "school"]
];
let groups = [
    // Group 1
    ["a", "i", "u", "e", "o"],
    // Group 2
    ["ka", "ki", "ku", "ke", "ko"],
    // Group 3
    ["sa", "shi", "su", "se", "so"],
    // Group 4
    ["ta", "chi", "tsu", "te", "to"],
    // Group 5
    ["na", "ni", "nu", "ne", "no"],
    // Group 6
    ["ha", "hi", "fu", "he", "ho"],
    // Group 7
    ["ma", "mi", "mu", "me", "mo"],
    // Group 8
    ["ya", "yu", "yo"],
    // Group 9
    ["ra", "ri", "ru", "re", "ro"],
    // Group 10
    ["wa", "wo", "n"],
    // Group 11
    ["ga", "gi", "gu", "ge", "go",
    "za", "ji", "zu", "ze", "zo",
    "da", "dji", "dzu", "de", "do",
    "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po"]
];

const MAX = 10;
let kana;
let choice = 0;
let score = {success: 0, total: 0};
let answers = [];

let level = localStorage.getItem("level");
if (level == null){
    level = 1;
}

let questions = [];
let num_questions;

$(document).ready(function () {

    let labels = ["Vowels", "K-", "S-", "T-", "N-", "H-", "M-", "Y-", "R-",
                        "W- and N", "tenten and maru", "-YA, -YU, -YO", "-YA, -YU, -YO with tenten and maru"];
    $("#level").html("Level " + level);
    $("#level-desc").html((level == 1 ? labels[level-1] : "Group " + labels[level-1]));

    $.ajax({
        type: "GET",
        url: "kana.csv",
        dataType: "text",
        success: function (data) {
            kana = parseCSV(data);
            groups = groups.slice(0, level);
            // Filtering of words
            questions = words.filter(function (word) {
                let tokens = tokenize(kana, word[0]);
                let valid = true;
                tokens.forEach(function (val) {
                    if (!(groups.flat().includes(val) || ((val === "sokuon") && groups.flat().includes("tsu"))))
                        valid = false;
                });
                return valid;
            });
            for (let i = questions.length; i > MAX; i--){
                let rand = choice = Math.round(Math.random()*(questions.length-1));
                questions.splice(rand, 1);
            }
            questions.shuffle();
            num_questions = questions.length;
            updateDots();
            new_guess();
        },
        error: function (err) {
            console.log(err);
        }
    });

    function new_guess(){
        $("#remaining").html(questions.length);
        choice = Math.round(Math.random()*(questions.length-1));
        $("#question").html(romajiToHiragana(kana, questions[choice][0], false));
        $("#answer").hide();
        $("#guess").val("");
        $("#guess").focus();
    }

    function updateDots(){
        console.log(answers.length, num_questions);
        $(".dot").each(function(i){
            if (i >= num_questions){
                $(this).hide();
            } else if (i === answers.length){
                $(this).css("background-color", "lightblue");
            } else if (i < answers.length){
                if (answers[i] === 1){
                    $(this).css("background-color", "lightgreen");
                } else {
                    $(this).css("background-color", "lightcoral");
                }
            }
        });
    }

    $("#guess").keyup(function (e) {
        if ($("#guess").val() === ""){
            $("#check").addClass("disabled");
        } else {
            $("#check").removeClass("disabled");
            if (e.keyCode == 13){
                $("#check").trigger("click");
            }
        }
    });

    $("#check").click(function () {
        score.total++;
        if ($("#guess").val().toLowerCase() === questions[choice][0]){
            let correct = "Correct!";
            if (questions[choice][1] !== undefined){
                correct += " It means <b>" + questions[choice][1] + "</b>.";
            }
            $("#answer").html(correct);
            $("#answer").removeClass("alert-danger");
            $("#answer").addClass("alert-success");
            score.success++;
            answers.push(1)
        } else {
            $("#answer").html("Wrong! " + $("#guess").val() + " is written " + romajiToHiragana(kana, $("#guess").val(), false));
            $("#answer").removeClass("alert-success");
            $("#answer").addClass("alert-danger");
            answers.push(0);
        }
        updateDots();
        $("#answer").show();
        if (questions.length > 1){
            questions.splice(choice, 1);
            setTimeout(function () {
                new_guess();
            }, 2000);
        } else {
            if ((score.success/score.total) >= 0.8){
                if (level < 12){
                    level++;
                    localStorage.setItem("level", level);
                    showAlert("Congratulations!", "You advance to the next level!", function(){
                        location.reload();
                    });
                } else {
                    showAlert("Congratulations!", "You finished! More levels coming soon...", function(){
                        
                    });
                }
            } else {
                showAlert("Oh no...", "You need to retry.", function(){
                    location.reload();
                });
            }
        }
    });

    function showAlert(title, msg, callback){
        $("#modal-alert .modal-title").html(title);
        $("#modal-alert .modal-body p").html(msg);
        $('#modal-alert').on('hidden.bs.modal', function (e) {
            callback();
        });
        $("#modal-alert").modal('show');
    }

    $("#next").click(function () {
        new_guess();
    });

    $(document).keyup(function(e){
        if(e.keyCode == 39) {
            $("#next").trigger("click");
        }
    });

    $(".btn-level").click(function () {
        level = Number($(this).find('.value').html());
        localStorage.setItem("level", level);
        location.reload();
    });

});