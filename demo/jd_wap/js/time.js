/**
 * Created by liuxuewen on 16/9/18.
 */

function Calender(options) {
    this.today = options.date || new Date;
    this.now = new Date(this.today.getTime());
    this.$next = options.$next || $('.right');
    this.$prev = options.$prev || $('.left');
    this.$parent = options.$parent || $('.list-day');
    this.$year = options.$year || $('.years');
    this.$month = options.$month || $('.month');
    this.sLi = {
        '0': '<li><div><span>s%</span></div></li>',
        '1': '<li data-type="choose"><div stroke="d%"><span>s%</span><div><strong>￥m%</strong><p>剩余：<em>l%</em></p></div></div></li>'
    };
    this.data = options.data || {
        "1": {
            "status": false
        },
        "2": {
            "status": true,
            "last": 8,
            "money": 5155,
            "stroke": 12534
        }
    };

    this.fnInit();
}
Calender.prototype.getNowDate = function(){
    var _this = this;
    return {
        year: _this.now.getFullYear(),
        month: addZero(_this.now.getMonth()*1 + 1)
    };
    function addZero(n){
        return n>=10? n: '0'+n;
    }
};
Calender.prototype.getData = function (succ) {
    var _this = this;
    var _key = $("#travel_key").val();
    var _id = $("#travel_id").val();
    var _date = this.getNowDate();
    $.post('/travel/tmpApi', {key: _key, travel: _id, date: _date.year+_date.month}, function (data) {
        _this.data = data;
        succ && succ();
    }, 'json');
}
Calender.prototype.fnInit = function (){
    var _this = this;
    this.fnShow();
    this.$next.on('click', function () {
        _this.fnNext();
    });
    this.$prev.on('click', function () {
        _this.fnPrev();
    });
    this.$parent.on('click', '[data-type=choose]', function () {
        _this.$parent.find('li div').removeClass('active').removeAttr('stroke');
        $(this).find('div').eq(0).toggleClass('active');
    })
};
Calender.prototype.fnShow = function () {
    this.$year.html(this.now.getFullYear());
    this.$month.html(this.now.getMonth() + 1);
    var _this = this;
    this.getData(function () {
        var _arrLi = [];
        for(var k = 0, _day = _this.fnGetWeekDay(); k < _day; k++){
            _arrLi.push(_this.sLi[0].replace('s%', ''));
        }
        for(var i = 0, _lastDate = _this.fnGetLastDate(); i < _lastDate; i++){
            var _str = _this.sLi[0].replace('s%', i + 1);
            var _year = _this.now.getFullYear(),
                _month = _this.now.getMonth() + 1,
                _date = i + 1;
            if(_this.data[_date] && _this.data[_date].status == true){
                _str = _this.sLi[1].replace('s%', i + 1)
                    .replace('m%',  _this.data[_date].money)
                    .replace('l%',  _this.data[_date].last)
                    .replace('d%',  _this.data[_date].stroke);
            }
            _arrLi.push(_str);

        }
        _this.$parent.html(_arrLi.join(''));
    })
};
Calender.prototype.fnGetWeekDay = function () {
    this.now.setDate(1);
    return this.now.getDay();
};
Calender.prototype.fnGetLastDate = function () {
    this.now.setMonth(this.now.getMonth() + 1);
    this.now.setDate(0);
    return this.now.getDate();
};
Calender.prototype.fnPrev = function (){
    this.now.setDate(1);
    this.now.setMonth(this.now.getMonth() - 1);
    this.fnShow();
};
Calender.prototype.fnNext = function () {
    this.now.setDate(1);
    this.now.setMonth(this.now.getMonth() + 1);
    this.fnShow();
};

new Calender({});
