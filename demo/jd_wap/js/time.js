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
        '1': '<li data-type="choose"><div><span>s%</span><div><strong>￥m%</strong><p>剩余：<em>l%</em></p></div></div></li>'
    };
    this.data = options.data || {
        '2016': {
            '9': {
                '11': {
                    last: '6',
                    money: '2800'
                }
            }
        }
    };

    this.fnInit();
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
        _this.$parent.find('li div').eq(0).removeClass('active');
        $(this).find('div').eq(0).toggleClass('active');
    })
};
Calender.prototype.fnShow = function () {
    this.$year.html(this.now.getFullYear());
    this.$month.html(this.now.getMonth() + 1);
    var _arrLi = [];
    for(var k = 0, _day = this.fnGetWeekDay(); k < _day; k++){
        _arrLi.push(this.sLi[0].replace('s%', ''));
    }
    for(var i = 0, _lastDate = this.fnGetLastDate(); i < _lastDate; i++){
        var _str = this.sLi[0].replace('s%', i + 1);
        var _year = this.now.getFullYear(),
            _month = this.now.getMonth() + 1,
            _date = i + 1;
        if(this.data[_year] && this.data[_year][_month] && this.data[_year][_month][_date]){
            _str = this.sLi[1].replace('s%', i + 1)
                    .replace('m%', this.data[_year][_month][_date].money)
                    .replace('l%', this.data[_year][_month][_date].last);
        }
        _arrLi.push(_str);

    }
    this.$parent.html(_arrLi.join(''));
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
