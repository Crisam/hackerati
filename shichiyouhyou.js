'use strict';

//console.log(new Date())
var dayOne = new Date(this.year,this.month,1);
var hajimete = dayOne.getMonth();
//find number of days in month
var monthLength = shichiyou[this.month];
// these are labels for the days of the week
var	shichiyou = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//['月','火','水','木','金','土'];
// shichiyou == days of the week
//console.log(shichiyou);
// I have added the human-readable month name labels in order
var toshi_tsuki = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
//['1月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'];
//these are the days of the week for each month, in order
var tsuki_no_hi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function onCalFrameClick(e) {
    var target = e.target || e.srcElement;

    //Prevent clicks that on the table element and td elements that are blank
    if (target === this.table || target.textContent === '') return;

    var curr = this.getCurrentDate();
    var date = parseInt(target.textContent, 10);

    if (this.selectedNode) this.selectedNode.classList.remove('selected');
    this.selectedNode = target;
    this.selectedNode.classList.add('selected');

    this.setCurrentDate(new Date(curr.getFullYear(), curr.getMonth(), date));
    this.setViewDate(this.getCurrentDate());
  }

	  function Calendar(ref) {

	    this.today = new Date();
	    this.current = new Date();
	    this.ref = ref;
	    this.table = document.getElementById('cal-frame');
	    this.selectedNode;

	    var prev = this.ref.querySelector('#prev');
	    var next = this.ref.querySelector('#next');
	    prev.onclick = this.subtract.bind(this, 'month', 1);
	    next.onclick = this.add.bind(this, 'month', 1);

	    function onKeyDown(e) {
	      var code = e.which || e.keyCode;
	      switch(code) {
	        case 37:
	          this.subtract.call(this, 'month', 1);
	          break;
	        case 39:
	          this.add.call(this, 'month', 1);
	          break;
	        default:
	          //do nothing
	      }
	    }

	    document.onkeydown = onKeyDown.bind(this);
	    this.create().render().setViewDate(this.today);
	  }


	  // Static helper methods
	  //
	  Calendar.isLeapYear = function (year) {
	    if (year === undefined) throw new ReferenceError('Year not defined.');
	    return ((year%4==0) && (year%100!=0)) || (year%400==0);
	  };

	  Calendar.getDaysInMonth = function(month, year) {
	    return ((month !== 1) ? (daysInMonth[month]) : (Calendar.isLeapYear(year) ? 29:28));
	  };

	  Calendar.isEqualDate = function (date1, date2) {
	    return +date1.setHours(0,0,0,0) === +date2.setHours(0,0,0,0);
	  };

	  // Caching object for saving months in memory
	  Calendar.cache = {};

	  Calendar.prototype.getCurrentDate = function() {
	    return this.current;
	  };

	  Calendar.prototype.setCurrentDate = function(date) {
	    this.current = date;
	  };

	  Calendar.prototype.setViewDate = function (date) {
	    var month = months[date.getMonth()];
	    var weekday = daysOfWeek[date.getDay()];

	    this.ref.querySelector('#weekday').textContent = weekday;
	    this.ref.querySelector('#date').textContent = date.getDate();
	    this.ref.querySelector('#month-year').textContent = month + ' ' + date.getFullYear();
	  };

	  Calendar.prototype.add = function (type, time) {
	    var current = this.getCurrentDate();
	    switch (type) {
	      case 'month':
	        current.setMonth(current.getMonth() + time);
	        break;
	      default:
	        //do nothing
	    }
	    this.create().render().setViewDate(current);
	    return this;
	  };


	  Calendar.prototype.subtract = function (type, time) {
	    this.add.call(this, type, -time);
	  };

	  Calendar.prototype.create = function () {
	    var cache = Calendar.cache;
	    var curr = this.getCurrentDate();
	    var year = curr.getFullYear().toString();
	    var month = curr.getMonth().toString();

	    if (cache[year]) {
	      if (cache[year][month]) return this;
	      cache[year][month] = {};
	    } else {
	      cache[year] = {};
	      cache[year][month] = {};
	    }

	    var weeks = cache[year][month] = [[]];
	    var days  = Calendar.getDaysInMonth(+month, +year);

	    for (var d = 1, w = weeks.length - 1; d <= days; d++) {
	      var date = new Date(+year, +month, d);
	      var day = date.getDay();

	      weeks[w][day] = d;
	      if (day === 6) w = weeks.push([]) - 1;
	    }
	    return this;
	  };


	  Calendar.prototype.render = function () {
	    var cal = Calendar.cache;
	    var curr = this.getCurrentDate();
	    var year = curr.getFullYear();
	    var month = curr.getMonth();

	    var weeks = cal[year.toString()][month.toString()];
	    var createEl = document.createElement.bind(document);
	    var table = createEl('table');
	    table.id = 'cal-frame';
	    var tableBody = document.createDocumentFragment();

	    for (var i = 0, monthLen = weeks.length; i < monthLen; i++) {
	      var tr = createEl('tr');
	      var week = weeks[i];
	      for (var j = 0, weekLen = week.length; j < weekLen; j++) {
	        var td = createEl('td');
	        var day = week[j];
	        if (day) {
	          if (day === curr.getDate()) {
	            td.classList.add('selected');
	            this.selectedNode = td;
	          }

	          if (Calendar.isEqualDate(this.today, new Date(year,month,day))) {
	            td.classList.add('today');
	          }
	          td.textContent = day;
	        }
	        tr.appendChild(td);
	      }
	      tableBody.appendChild(tr);
	    }

	    table.appendChild(tableBody);
	    table.onclick = onCalFrameClick.bind(this);

	    this.table.parentNode.replaceChild(table, this.table);
	    this.table = table;
	    return this;
	  };

	  window.onload = function () {
	    new Calendar(document.getElementById('cal'));
	  }
	})(window, document);
