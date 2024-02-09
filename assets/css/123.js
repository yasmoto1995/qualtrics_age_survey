Qualtrics.SurveyEngine.addOnload(function() {
    // Create a link element
    var linkElement = document.createElement('link');

    // Set attributes for the link element
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = 'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css'; // Replace with the actual path to your CSS file

    // Append the link element to the document's head
    document.head.appendChild(linkElement);

});

Qualtrics.SurveyEngine.addOnReady(function() {
    /*Place your JavaScript here to run when the page is fully displayed*/
    $('body').append('<div class="console-range">        <h4>問 1.  あなたのお生まれは何年何月ですか。（数字を記入）</h4>        <div class="wrapper">            <label for="datepicker">誕生日を入力してください。               <select name="datepicker" id="datepicker" autocomplete="off"></select>            </label>            <label for="real-age">                <input type="text" id="real-age" placeholder="30" disabled>           </label>  <label><button id="get_data">提出</button> </label>      </div>    </div>    <div class="sub-question">        <div class="console-range">            <h4>問 11. 生まれてから現在までどこに住んでいましたか？</h4>            <div class="range-body">                <div class="vehicles-info">                    <h3>年齢（ねんれい）：</h3>                        <div class="item">                        <div class="item-top">                            <p title="1）生まれた国">1）生まれた国</p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="2）日本">2）日本 </p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="3）その他の国">3）その他の国</p>                        </div>                    </div>                    </div>                    <div class="main-range">                    <div class="grids">                        <div class="grids-head"  id="timeslots-head-container">                        </div>                        <div class="grids-body">                                <div class="grids-row" id="timeslots-row-container">                                                            </div>                                <div class="grids-row" id="timeslots-row-containerJapan">                            </div>                                                        <div class="grids-row" id="timeslots-row-containerOther">                            </div>                            </div>                    </div>                </div>            </div>        </div>        <div class="console-range">            <h4>問 12.  当時のあなたの主な仕事は大きく分けて次にどれにあたりますか。</h4>            <div class="range-body">                <div class="vehicles-info">                    <h3>年齢（ねんれい）：</h3>                        <div class="item">                        <div class="item-top">                            <p title="1）経営者・自営業（家族 の会社の手伝いも含 む）・自由業">1）経営者・自営業（家族 の会社の手伝いも含 む）・自由業</p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="2）正社員・正規職員 ">2）正社員・正規職員 </p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="3）パート・アルバイト・ 派遣社員・契約社員・ 臨時職員">3）パート・アルバイト・ 派遣社員・契約社員・ 臨時職員 </p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="4）無職で仕事を探して いた">4）無職で仕事を探して いた </p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="5）無職で仕事を探して いなかった">5）無職で仕事を探して いなかった </p>                        </div>                    </div>                    <div class="item">                        <div class="item-top">                            <p title="6）学生">6）学生 </p>                        </div>                    </div>                    </div>                    <div class="main-range">                    <div class="grids">                        <div class="grids-head"  id="timeslots-head-work">                        </div>                        <div class="grids-body work">                                <div class="grids-row" id="timeslots-row-free">                            </div>                                <div class="grids-row" id="timeslots-row-job">                            </div>                                                        <div class="grids-row" id="timeslots-row-contract">                            </div>                                <div class="grids-row" id="timeslots-row-find">                            </div>                            <div class="grids-row" id="timeslots-row-not">                            </div>                            <div class="grids-row" id="timeslots-row-student">                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div>    <div class="ride-menu ride-opts">        <div class="ride-options">            <ul>                <li><a class="delete-ride" href="#" title=""><i class="ion-android-remove-circle"></i> 基準点の削除</a>                </li>            </ul>        </div>    </div>');


    // Get all <p> elements
    var paragraphs = document.getElementsByTagName('p');

    let myposleft;
    let mypostop;
    let val, id, grid_wid, grid_height;

    for (var i = 0; i < paragraphs.length; i++) {
        var currentText = paragraphs[i].textContent;

        // Check if the text length is more than 5 letters
        if (currentText.length > 7) {
            // Display only the first 5 letters and append '...'
            paragraphs[i].textContent = currentText.substring(0, 11) + '...';
        }
    }

    function populateYears() {
        var currentYear = new Date().getFullYear();
        var select = document.getElementById("datepicker");

        for (var i = currentYear; i >= currentYear - 80; i--) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            select.add(option);
        }
    }

    // Call the function to populate the dropdown
    populateYears();

    createTimeslot = (num) => {
        var timeslotsHeadContainer = document.getElementById('timeslots-head-container');
        var timeslotsRowContainer = document.getElementById('timeslots-row-container')
        var timeslotsRowContainerJapan = document.getElementById('timeslots-row-containerJapan')
        var timeslotsRowContainerOther = document.getElementById('timeslots-row-containerOther')

        var timeslotsHeadWork = document.getElementById('timeslots-head-work');
        var timeslotsRowFree = document.getElementById('timeslots-row-free')
        var timeslotsRowJob = document.getElementById('timeslots-row-job')
        var timeslotsRowContract = document.getElementById('timeslots-row-contract')
        var timeslotsRowFind = document.getElementById('timeslots-row-find')
        var timeslotsRowNot = document.getElementById('timeslots-row-not');
        var timeslotsRowStudent = document.getElementById('timeslots-row-student');

        timeslotsHeadContainer.innerHTML = '';
        timeslotsRowContainer.innerHTML = '';
        timeslotsRowContainerJapan.innerHTML = '';
        timeslotsRowContainerOther.innerHTML = '';
        timeslotsHeadWork.innerHTML = '';
        timeslotsRowFree.innerHTML = '';
        timeslotsRowJob.innerHTML = '';
        timeslotsRowContract.innerHTML = '';
        timeslotsRowFind.innerHTML = '';
        timeslotsRowNot.innerHTML = '';
        timeslotsRowStudent.innerHTML = '';

        for (var i = 1; i <= num; i++) {
            var timeslotHead = document.createElement('div');
            timeslotHead.className = 'timeslot';
            timeslotHead.innerText = i;

            var timeslotWork = document.createElement('div');
            timeslotWork.className = 'timeslot';
            timeslotWork.innerText = i + 14;

            // Add your condition here if needed
            // For example, you can add a specific class based on some condition
            if (i % 5 === 0) {
                timeslotHead.classList.add('even');
                timeslotWork.classList.add('even');
            } else if (i === 1) {
                timeslotHead.classList.add('even');
                timeslotWork.classList.add('even');
            }

            var timeslotRow = document.createElement('div');
            timeslotRow.className = 'timeslot other-info-btn'
            timeslotRow.innerText = ' + '

            var timeslotRowJapan = document.createElement('div');
            timeslotRowJapan.className = 'timeslot other-info-btn';
            timeslotRowJapan.innerText = ' + ';

            var timeslotRowOther = document.createElement('div');
            timeslotRowOther.className = 'timeslot other-info-btn';
            timeslotRowOther.innerText = ' + ';

            var timeslotRowFree = document.createElement('div');
            timeslotRowFree.className = 'timeslot other-info-btn';
            timeslotRowFree.innerText = ' + ';

            var timeslotRowJob = document.createElement('div');
            timeslotRowJob.className = 'timeslot other-info-btn';
            timeslotRowJob.innerText = ' + ';

            var timeslotRowContract = document.createElement('div');
            timeslotRowContract.className = 'timeslot other-info-btn';
            timeslotRowContract.innerText = ' + ';

            var timeslotRowFind = document.createElement('div');
            timeslotRowFind.className = 'timeslot other-info-btn';
            timeslotRowFind.innerText = ' + ';

            var timeslotRowNot = document.createElement('div');
            timeslotRowNot.className = 'timeslot other-info-btn';
            timeslotRowNot.innerText = ' + ';

            var timeslotRowStudent = document.createElement('div');
            timeslotRowStudent.className = 'timeslot other-info-btn';
            timeslotRowStudent.innerText = ' + ';


            timeslotsHeadContainer.append(timeslotHead);
            timeslotsHeadWork.append(timeslotWork);
            timeslotsRowContainer.append(timeslotRow);
            timeslotsRowContainerJapan.append(timeslotRowJapan);
            timeslotsRowContainerOther.append(timeslotRowOther);
            timeslotsRowFree.append(timeslotRowFree);
            timeslotsRowJob.append(timeslotRowJob);
            timeslotsRowContract.append(timeslotRowContract);
            timeslotsRowFind.append(timeslotRowFind);
            timeslotsRowNot.append(timeslotRowNot);
            timeslotsRowStudent.append(timeslotRowStudent);

        }
    }

    $('#datepicker').on("change", function() {
        var birthday = document.getElementById('datepicker').value
        var year = birthday.toString().slice(0, 4);

        if (year != null || year != undefined) {
            var subQuestion = document.getElementsByClassName('sub-question')[0];
            var age_input = document.getElementById('real-age')
            if (subQuestion) {
                subQuestion.style.display = 'block';
                var num = new Date().getFullYear() - year;
                age_input.value = num
                if (num < 35) {
                    num = 35;
                    createTimeslot(num);
                } else if (num > 80) {
                    num = 79
                    createTimeslot(num);
                }
                createTimeslot(num);

                /*=== New Ride Menu Open Position ===*/

                $(".timeslot").on("click", function() {
                    myposleft = $(this).offset().left - $(this.parentNode.parentNode).offset().left + 2;
                    mypostop = $(this).offset().top - $(this.parentNode.parentNode).offset().top + 2;
                    id = this.parentNode.id;
                    val = this.parentNode.parentNode;
                });

                /*=== Return To Base ===*/
                $(".other-info-btn").on("click", function() {
                    var tagName = this.className;
                    let iconClass = $(this).find('i').attr("class");
                    $(this.parentNode).prepend(' <div class="ride resize return" style="left:' + myposleft + 'px; top:' + mypostop + 'px"><div class="other-info"><i class="' + iconClass + '"></i><span></span></div></div>');

                    ride();
                    $(".new-ride").removeClass("show");
                    return false;
                });

            } else {}
        }

    })

    let or_top, or_left;
    ride = () => {
        /*=== Draggable Box ===*/
        $(".resize").draggable({
            axis: "x,y",
            animate: true,
            grid: [grid_wid, grid_height],
            containment: $(this).parent(),
            scroll: true,
            revert: "valid",
            refreshPositions: true,
            start: function(event, ui) {
                or_left = $(this).offset().left - $(this.parentNode.parentNode).offset().left;
                or_top = $(this).offset().top - $(this.parentNode.parentNode).offset().top;
            },
            stop: function(event, ui) {
                let right, left, top, down, right_re, left_re, top_re, down_re;
                left = $(val).offset().left;
                right = left + $(val).width();
                top = $(val).offset().top;
                down = top + $(val).height();

                left_re = $(event.target).offset().left;
                right_re = left_re + $(event.target).width();
                top_re = $(event.target).offset().top;
                down_re = top_re + $(event.target).height();
                if (left > left_re || right < right_re || top > top_re || down < down_re) {
                    $(event.target).css({
                        "left": or_left,
                        "top": or_top
                    });
                }
            }
        });

        /*=== Droppable ===*/
        $(".ride").droppable({
            tolerance: "touch"
        });

        var targetPos = [];
        var sp = "";
        /*=== Resizable Box ===*/
        $(".resize").resizable({
            grid: [grid_wid, grid_height],
            animate: false,
            handles: 'e',
            containment: "parent",
            start: function(event, ui) {
                id = $(this)[0].parentNode.id;
                targetPos = [];
                $('.ride').each(function() {
                    let arr = $(this).position();
                    arr["id"] = $(this)[0].parentNode.id;

                    targetPos.push(arr);
                });
                sp = ui.position.left + ui.size.width;
            },
            stop: function(event, ui) {
                var endValue = Math.ceil(ui.size.width / grid_wid)
                var ep = ui.position.left + ui.size.width;
                var tp = ui.position.top;

                $.each(targetPos, function(i, e) {
                    if (targetPos[i].top == tp) {
                        if (targetPos[i].left < ep && targetPos[i].left > sp && id == targetPos[i].id) {
                            ui.element.css(ui.originalSize);
                            setTimeout(function() {}, 100);
                        }
                    }
                });
            }
        });

        $(".resize").on("resizestop", function(event, ui) {

            //workposleft = $(this).offset().left - $(this.parentNode.parentNode).offset().left + 2;
            // workpostop = $(this).offset().top - $(this.parentNode.parentNode).offset().top + 2;


            if (ui.size.width <= 204) {
                $(this).addClass("short-ride");
            } else {
                $(this).removeClass("short-ride");
            }
            setTimeout(function() {
                RideTime(ui.element[0]);
            }, 400);
        });

        $(".show-add").on("click", function() {
            $(this).parents('.ride').find('.complete-add').fadeIn();
        });

        $(".complete-add").on("click", function() {
            $(this).fadeOut();
        });
    }
    ride();

    /*=== New Ride Menu ===*/
    $("html").on("click", function(event) {
        if ($(event.target).is(".grids-body .timeslot")) {
            $("#add-ride .modal-title h4").text('New Ride');
            $("#pass-name").val("");
            $("#pass-contact").val("");
            $("#pass-loc").val("");
            $("#add-ride .add-ride-btn").show();
            $("#add-ride .edit-ride-btn").hide();

            $(".ride-opts").removeClass("show");
            $(".new-ride").addClass("show");
            let left = $(event.target).offset().left;
            let top = $(event.target).offset().top;
            $(".new-ride").css({
                "left": left + 50,
                "top": top + 30
            });
        } else {
            $(".ride-opts").removeClass("show");
            $(".new-ride").removeClass("show");
            $(".new-ride").css({
                "left": 0,
                "top": 0
            });
        }
    });

    /*=== Menu On Right For Edit Or Delete A Ride ===*/
    document.oncontextmenu = function() { return false; };
    $("body").on("mousedown", ".grids-body .ride", function(e) {
        if (e.button == 2) {
            $(".new-ride").removeClass("show");
            $(".ride").removeClass("selected");
            $(this).addClass("selected");
            $(".ride.selected").detach();
            return false;
        }
        return true;
    });

    // Update Driver Time For the Assigned Drive
    function RideTime(thisRide) {
        let rideWidth = $(thisRide).width();
        let updateTime = convertPixelToTime(rideWidth);

        function pad2(number) {
            return (number < 10 ? '0' : '') + number
        }

        var a = $(thisRide).find(".driver-info .hr").text(pad2(updateTime.h));
        $(thisRide).find(".driver-info .mins").text(pad2(updateTime.m));
    }

    /* ===  Convert Mili Seconds Hours === */
    function convertMiliseconds(miliseconds, format) {
        var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

        total_seconds = parseInt(Math.floor(miliseconds / 1000));
        total_minutes = parseInt(Math.floor(total_seconds / 60));
        total_hours = parseInt(Math.floor(total_minutes / 60));
        days = parseInt(Math.floor(total_hours / 24));

        seconds = parseInt(total_seconds % 60);
        minutes = parseInt(total_minutes % 60);
        hours = parseInt(total_hours % 24);

        switch (format) {
            case 's':
                return total_seconds;
                break;
            case 'm':
                return total_minutes;
                break;
            case 'h':
                return total_hours;
                break;
            case 'd':
                return days;
                break;
            default:
                return { d: days, h: hours, m: minutes, s: seconds };
                //return { h: hours, m: minutes}
        }
    };

    function convertPixelToTime(pixels) {
        let onePx = 17647.05882352941;
        return convertMiliseconds(pixels * onePx);
    }


    setTimeout(function() {
        $(".xdsoft_today").trigger('click');
    }, 1000);

    $(window).on('resize', resize_control);

    function resize_control() {
        let letters;
        let ele = document.querySelectorAll('.item-top p');
        if (window.innerWidth < 436) {
            letters = 2;
            grid_height = 45;
            grid_wid = 22;
            for (let i = 0; i < ele.length; i++) {
                ele[i].innerHTML = ele[i].title.substring(0, letters);
            }
        } else if (window.innerWidth < 800) {
            letters = 3;
        } else {
            letters = 4;
            grid_height = 65;
            grid_wid = 42;

            for (let i = 0; i < ele.length; i++) {
                ele[i].innerHTML = ele[i].title;
            }
        }
    }
    resize_control();

    $("#get_data").on("click", function() {
        let for_data = [];
        $('.ride').each(function() {
            let arr = $(this).position();
            let id = $(this)[0].parentNode.id;
            let start_year = (arr.left - 3) / grid_wid + 1;
            let how_year = ($(this)[0].clientWidth + 5) / grid_wid;
            switch (id) {
                case 'timeslots-row-container':
                    id = "生まれた国";
                    break;
                case 'timeslots-row-containerJapan':
                    id = "日本";
                    break;
                case 'timeslots-row-containerOther':
                    id = "その他の国";
                    break;
                case 'timeslots-row-free':
                    id = "経営者・自営業（家族 の会社の手伝いも含 む）・自由業";
                    break;
                case 'timeslots-row-job':
                    id = "正社員・正規職員";
                    break;
                case 'timeslots-row-contract':
                    id = "パート・アルバイト・ 派遣社員・契約社員・ 臨時職員";
                    break;
                case 'timeslots-row-find':
                    id = "無職で仕事を探して いた";
                    break;
                case 'timeslots-row-not':
                    id = "無職で仕事を探して いなかった";
                    break;
                case 'timeslots-row-student':
                    id = "学生";
                    break;
            }
            for_data.push({ id: id, start_year: "開始年齢 : " + start_year, how_year: how_year + "年間" });
        });

        $("#next-button").on("click", function() {
            alert("next button");
        });

        console.log(JSON.stringify(for_data));
        //Qualtrics.SurveyEngine.setEmbeddedData('CustomData', currentDate.toISOString());
        //Qualtrics.SurveyEngine.setJSEmbeddedData('age_survey', "yamamoto");
        //let ageData = "${e://Field/age_survey}";
        //Qualtrics.SurveyEngine.navClick(event, 'NextButton');
        let textInput = document.querySelector('.text-input');
        //console.log(document.getElementById('next-button').click());
        // Set the value of the input
        textInput.value = 'hiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is savedhiro is saved';



        document.getElementById('next-button').click();
    });
});