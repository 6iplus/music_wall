
    $(function () {
            $(".showBarrage,.s_close").click(function () {
                $(".barrage,.s_close").toggle("slow");
            });
           // init_animated();
        })
        //提交评论
        
  var socket = io();
	socket.on('comment', function(msg){
		var text = msg.comment;
		var commentColor = msg.commentColor; 
        if (text == "") {
            return;
        };
        var _lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getRandomColor(commentColor) + ";'>" + text + "</div>");
        $(".mask").append(_lable.show());
        init_barrage();
  });
        
        
    $(".send .s_btn").click(function () {
            var text = $(".s_text").val();
            if (text == "") {
                return;
            };
            var _lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getRandomColor() + ";'>" + text + "</div>");
            $(".mask").append(_lable.show());
            init_barrage();
        })
        //初始化弹幕技术
    function init_barrage() {
        var _top = 0;
        $(".mask div").show().each(function () {
            var _left = $(window).width()/2 - $(this).width(); //浏览器最大宽度，作为定位left的值
            var _height = $(window).height(); //浏览器最大高度
            _top += 10;
            if (_top >= (_height - 130)) {
                _top = 0;
            }
            $(this).css({
                left: _left,
                top: _top,
                color: getRandomColor()
            });
            //定时弹出文字
            var time = 4000;
            if ($(this).index() % 2 == 0) {
                time = 6000;
            }
            $(this).animate({
                left: "-" + _left + "px"
            }, time, function () {
                $(this).remove();
            });
        });
    }
    //获取随机颜色
    function getRandomColor(commentColor) {
        return commentColor;
    }

