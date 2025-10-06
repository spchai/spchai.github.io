/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/
/*
* Greedy Navigation - Fixed for Mobile
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

// 获取所有可移动的导航项（不包括持久化的项）
var $movableLinks = $vlinks.children('li:not(.persist)');
var breaks = [];

function updateNav() {
  // 重置状态
  $movableLinks.appendTo($vlinks);
  $hlinks.empty().addClass('hidden');
  $btn.removeClass('close');
  
  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // 如果可见列表溢出导航栏
  if ($vlinks.width() > availableSpace) {
    breaks = []; // 重置断点记录

    // 移动项目到隐藏列表，直到不再溢出
    while ($vlinks.width() > availableSpace && $vlinks.children('li:not(.persist)').length > 0) {
      // 记录当前宽度
      breaks.push($vlinks.width());
      
      // 移动最后一个非持久化项目到隐藏列表
      $vlinks.children('li:not(.persist)').last().prependTo($hlinks);
      
      // 重新计算可用空间
      availableSpace = $nav.width() - $btn.width() - 30;
    }

    // 显示下拉按钮
    $btn.removeClass('hidden');

  } else {
    // 有空间可以移动项目回可见列表
    while ($hlinks.children().length > 0 && availableSpace > breaks[breaks.length - 1]) {
      // 移动项目回可见列表
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }

    // 如果隐藏列表为空，隐藏下拉按钮
    if ($hlinks.children().length === 0) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  // 更新计数器
  $btn.attr('count', $hlinks.children().length);

  // 更新 masthead 高度和 body/sidebar 顶部内边距
  updateLayout();
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

// 事件监听器
$(window).on('resize', function() {
  updateNav();
});

// 处理屏幕方向变化
if (screen.orientation) {
  screen.orientation.addEventListener('change', function() {
    setTimeout(updateNav, 100);
  });
}

// 按钮点击事件
$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

// 点击外部区域关闭下拉菜单
$(document).on('click', function(event) {
  if (!$(event.target).closest('#site-nav').length) {
    $hlinks.addClass('hidden');
    $btn.removeClass('close');
  }
});

// 初始化
$(document).ready(function() {
  // 等待字体和资源加载完成
  setTimeout(function() {
    updateNav();
  }, 100);
  
  // 确保图片加载后也更新导航
  $('img').on('load', function() {
    updateNav();
  });
});

// 在页面完全加载后再次更新
$(window).on('load', function() {
  updateNav();
});