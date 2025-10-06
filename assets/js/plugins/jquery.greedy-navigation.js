/*
* Greedy Navigation - Mobile Fix
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

// 获取所有可移动的导航项（不包括持久化的项）
var $movableLinks = $vlinks.find('li:not(.persist)');
var breaks = [];

function updateNav() {
    // 如果是移动端，使用不同的逻辑
    if (window.innerWidth <= 1024) {
        updateNavMobile();
    } else {
        updateNavDesktop();
    }
    updateLayout();
}

function updateNavDesktop() {
    // 桌面端逻辑 - 重置所有项目到可见列表
    $hlinks.children().appendTo($vlinks);
    $hlinks.addClass('hidden');
    $btn.addClass('hidden');
    $btn.removeClass('close');
    
    var availableSpace = $nav.width() - ($btn.hasClass('hidden') ? 0 : $btn.width() + 30);
    
    // 如果可见列表溢出
    if ($vlinks.width() > availableSpace) {
        breaks = [];
        
        while ($vlinks.width() > availableSpace && $vlinks.children('li:not(.persist)').length > 0) {
            breaks.push($vlinks.width());
            // 移动最后一个非持久化项目到隐藏列表
            $vlinks.children('li:not(.persist)').last().prependTo($hlinks);
            availableSpace = $nav.width() - $btn.width() - 30;
        }
        
        $btn.removeClass('hidden');
    } else {
        // 尝试将项目移回可见列表
        while (breaks.length > 0 && availableSpace > breaks[breaks.length - 1] && $hlinks.children().length > 0) {
            $hlinks.children().first().appendTo($vlinks);
            breaks.pop();
        }
        
        if ($hlinks.children().length === 0) {
            $btn.addClass('hidden');
            $hlinks.addClass('hidden');
        }
    }
    
    $btn.attr('count', $hlinks.children().length);
}

function updateNavMobile() {
    // 移动端逻辑 - 将所有非持久化项目移到隐藏菜单
    $vlinks.find('li:not(.persist)').appendTo($hlinks);
    
    // 如果有隐藏项目，显示按钮
    if ($hlinks.children().length > 0) {
        $btn.removeClass('hidden');
    } else {
        $btn.addClass('hidden');
    }
    
    $hlinks.addClass('hidden');
    $btn.removeClass('close');
}

function updateLayout() {
    var mastheadHeight = $('.masthead').outerHeight(true);
    $('body').css('padding-top', mastheadHeight + 'px');
    
    if ($(".author__urls-wrapper button").is(":visible")) {
        $(".sidebar").css("padding-top", "");
    } else {
        $(".sidebar").css("padding-top", mastheadHeight + "px");
    }
}

// 事件监听
$(window).on('resize', function() {
    setTimeout(updateNav, 100);
});

if (screen.orientation) {
    screen.orientation.addEventListener('change', function() {
        setTimeout(updateNav, 150);
    });
}

$btn.on('click', function(e) {
    e.stopPropagation();
    $hlinks.toggleClass('hidden');
    $(this).toggleClass('close');
});

// 点击外部关闭下拉菜单
$(document).on('click', function(e) {
    if (!$(e.target).closest('#site-nav').length) {
        $hlinks.addClass('hidden');
        $btn.removeClass('close');
    }
});

// 防止下拉菜单内的点击事件冒泡
$hlinks.on('click', function(e) {
    e.stopPropagation();
});

// 初始化
$(document).ready(function() {
    // 立即执行一次
    updateNav();
    
    // 等待页面完全加载
    $(window).on('load', function() {
        setTimeout(updateNav, 200);
    });
    
    // 防抖的resize处理
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateNav, 150);
    });
});