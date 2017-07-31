$(window).on('load',function () {
    //1.实现瀑布流布局
    waterFall();

    //2.滚动加载
    $(window).on('scroll',function () {
        //判断是否加载
        if (checkWillLoad())
        {
            ////创造假数据
            var data = {'dataImg':[{'img':'1.jpg'},{'img':'2.jpg'},{'img':'3.jpg'},{'img':'4.jpg'},{'img':'5.jpg'},{'img':'6.jpg'}]};
            //遍历创建盒子
            $.each(data.dataImg,function (index,value)
                   {
                       //创建一个div标签 设置它的类为'box' 添加到'main'里面去
                       var newBox = $('<div>').addClass('box').appendTo($('#main'));
                       var newPic = $('<div>').addClass('pic').appendTo($(newBox));
                       //创建img  取出遍历的对象value的img属性对应的值
                       $('<img>').attr('src','imges/'+$(value).attr('img')).appendTo($(newPic));
                   })
            //1.实现瀑布流布局
            waterFall();
        }
    });
});

//实现瀑布流布局
function waterFall () {
    //拿到所有的盒子
    var allBox = $('#main > .box');
    //取出其中一个盒子的宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    //取出屏幕的高度
    var screenWidth = $(window).width();
    //求出列数 //取整函数取整
    var cols = Math.floor( screenWidth/boxWidth);
    //父标签居中
    $('#main').css({
        'width':cols * boxWidth + 'px',
        'margin':'0 auto'
    });
    //对子盒子定位
    var heightArr = [];
    //遍历
    $.each(allBox,function (index,value) {
        //取出单独盒子的高度
        var boxHeight = $(value).outerHeight();
        //判断是否第一行
        if(index < cols)
        {
            heightArr[index] = boxHeight;
        }
        else  //剩余的盒子要瀑布流布局
        {
            //求出最矮的盒子高度
            var minBoxHeight = Math.min.apply(null,heightArr);
            //取出最矮高度对应的索引  封装了js的这个方法
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);
            //定位
            $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth + 'px'
            });
            //更新数组中最矮的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    })

}

//判断是否符合加载条件
function checkWillLoad() {
    //直接取出最后一个盒子
    var lastBox = $('#main > div').last();
    //取出最后一个盒子高度的一半 + 头部偏离的位置
    var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top;
    //求出浏览器的高度
    var clientHeight = $(window).height();
    //求出页面偏离浏览器高度
    var scrollTopHeight = $(window).scrollTop();
    //比较返回
    return lastBoxDis <= clientHeight + scrollTopHeight;

}
