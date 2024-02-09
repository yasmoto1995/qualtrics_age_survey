$(window).on("load", function() {

    // Get all <p> elements
    var paragraphs = document.getElementsByTagName('p');

    let myposleft;
    let mypostop;
    let val, id, grid_wid, grid_height;
    // Iterate through each <p> element
    for (var i = 0; i < paragraphs.length; i++) {
        var currentText = paragraphs[i].textContent;

        // Check if the text length is more than 5 letters
        if (currentText.length > 7) {
            // Display only the first 5 letters and append '...'
            paragraphs[i].textContent = currentText.substring(0, 11) + '...';
        }
    }
    // $(function() {
    //     $("#datepicker").datepicker({
    //         changeMonth: false,
    //         changeYear: true,
    //         showButtonPanel: true,
    //         dateFormat: 'yy',
    //         onClose: function(dateText, inst) {
    //             var year = $("#ui-datepicker-year").val();
    //             $(this).datepicker('setDate', new Date(year, 0, 1));
    //         }
    //     });
    // });

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
                    $("#" + this.parentNode.id).prepend(`
                        <div class="ride resize return" style="left:${myposleft}px; top:${mypostop}px">
                            <div class="other-info">
                                <i class="${iconClass}"></i>
                                <span></span>
                            </div>
                        </div>`);

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
                right = $(val).width();
                top = $(val).offset().top;
                down = $(val).height();
                console.log($(event.target));
                left_re = $(event.target).offset().left;
                right_re = left + $(event.target).width();
                top_re = $(event.target).offset().top;
                down_re = top + $(event.target).height() + 10;
                console.log(down, down_re, top, $(event.target).height());
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
            containment: val,
            // maxHeight: 77,
            // minHeight: grid_height,
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
            for_data.push({ id: id, start_year: start_year, how_year: how_year });

        });
        console.log(for_data);
    });
});