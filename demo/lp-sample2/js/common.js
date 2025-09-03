//<![CDATA[
$(document).ready(function () {

	var uaInfo = UAChk();

	var nowUrl = location.href;
	var nowParam = location.search;
	var paramAry = nowParam.split('&');

	//console.log(paramAry.length);

	// Modaal.js Setting
	// -------------------------------------------
	var _modaalInlineBtn = ".js-modaal";
	var $modaalInlineBtn = $(_modaalInlineBtn);

	if ($modaalInlineBtn.length) {
		$modaalInlineBtn.modaal();
	}


	/* SP GlobalNav */
	/*----------------------------------------------------------*/
	//	var globalNavBtn = $("#globalNavBtn").find("a");
	//	var globalNavWrap = $("#globalNavWrap");
	//	
	//	// nav Click
	//	globalNavBtn.click(function(e){
	//		globalNavWrap.slideToggle();
	//		e.preventDefault();
	//		return false;
	//	});
	//	
	//	function spGnavSetting(){
	//		uaInfo = UAChk();
	//		if(uaInfo['winSizeFlg'] == 'SP'){
	//			globalNavWrap.hide();
	//		}else{
	//			globalNavWrap.show();
	//		}
	//	}
	//
	//	$(window).on('resize',function(){
	//		spGnavSetting();
	//	});


	/* SP GlobalNav Drawer */
	/*----------------------------------------------------------*/
	// var $wrap = $('#wrap');

	// var $drawerNavBtn = $('#globalNavBtn a');
	// var $drawerNavWrap = $('#globalNavWrap');
	// var clName_drawerNavBtnAct = 'drawerActive';
	// var clName_wrapDrawerAct = 'drawer';

	// var spGNavEvName = 'spGnav';

	// function gNavEvReset() {
	// 	$drawerNavBtn.off('.' + spGNavEvName + '');
	// }


	// function spGnavInit() {
	// 	$drawerNavBtn.on('click.' + spGNavEvName + '', function () {
	// 		var $this = $(this);
	// 		var t = ($(window).scrollTop() * -1);

	// 		$this.toggleClass(clName_drawerNavBtnAct);
	// 		$this.parent().toggleClass(clName_drawerNavBtnAct);

	// 		$drawerNavWrap.toggleClass(clName_drawerNavBtnAct);
	// 		$wrap.toggleClass(clName_wrapDrawerAct);
	// 		if ($wrap.hasClass(clName_wrapDrawerAct)) {
	// 			$wrap.css({
	// 				'width': '100%',
	// 				'position': 'fixed',
	// 				'top': t + 'px'
	// 			});

	// 			var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	// 			$('html,body').css('height', '100%');
	// 		} else {
	// 			var scrY = parseInt(($wrap.css('top').replace('px', '')) * -1);
	// 			$wrap.attr('style', '');
	// 			$('html,body').attr('style', '');
	// 			$('html,body').scrollTop(scrY);
	// 		}
	// 	});
	// }


	// function gNavInit() {
	// 	uaInfo = UAChk();
	// 	gNavEvReset();

	// 	spGnavInit();
	// 	var scrY = 0;
	// 	$drawerNavBtn.removeClass(clName_drawerNavBtnAct);
	// 	$drawerNavBtn.parent().removeClass(clName_drawerNavBtnAct);
	// 	$drawerNavWrap.removeClass(clName_drawerNavBtnAct);
	// 	$wrap.removeClass(clName_wrapDrawerAct);
	// 	if ($wrap.attr('style')) {
	// 		scrY = parseInt(($wrap.css('top').replace('px', '')) * -1);
	// 	}
	// 	$wrap.attr('style', '');
	// 	$('html,body').attr('style', '');
	// 	if ($wrap.attr('style')) {
	// 		$('html,body').scrollTop(scrY);
	// 	}
	// }

	// gNavInit();

	// $(window).resize(function () {
	// 	gNavInit();
	// });




	/* Smooth Scroll */
	/*----------------------------------------------------------*/
	//var leaveScrollNum = ($('#headWrap').outerHeight()) * -1;
	var leaveScrollNum = 0;
	var smoothScrollSpd = 300;

	// 除外するタグ指定
	var smoothScrollNotList = "#globalNavBtn a, " + _modaalInlineBtn;
	// var smoothScrollNotList = "#globalNavBtn a";
	//var smoothScrollNotList = '#globalNavBtn a, #third a, #fourth a, #fifth a';

	$('a[href^="#"]').not(smoothScrollNotList).click(function (e) {
		//leaveScrollNum = ($('#headWrap').outerHeight()) * -1;
		leaveScrollNum = 0;

		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);


		// Drawer時のページ内スクロールの場合は、下記を有効化
		/*
		if(uaInfo['winSizeFlg'] != 'PC'){
			$drawerNavBtn.toggleClass(clName_drawerNavBtnAct);
			$drawerNavBtn.parent().toggleClass(clName_drawerNavBtnAct);

			$drawerNavWrap.toggleClass(clName_drawerNavBtnAct);
			$wrap.toggleClass(clName_wrapDrawerAct);

			$wrap.attr('style','');
			$('html,body').attr('style','');

			var position = (target.offset().top)+leaveScrollNum;
			var scrY = position;
			$('html,body').scrollTop(scrY);
		}else{
			var position = (target.offset().top)+leaveScrollNum;
			$("html, body").animate({scrollTop:position}, smoothScrollSpd, "swing");
		}
		*/


		// Drawer時のページ内スクロールの場合は、下記をコメントアウト
		var position = (target.offset().top) + leaveScrollNum;
		$("html, body").animate({ scrollTop: position }, smoothScrollSpd, "swing");


		e.preventDefault();
		return false;
	});


	// 別ページスムーススクロール
	var smoothScrollPrefix = 'move=';
	$(window).on('load.smooth', function () {
		$.each(paramAry, function (i, val) {
			if (val.indexOf(smoothScrollPrefix) != -1) {
				//leaveScrollNum = ($('#headWrap').outerHeight()) * -1;
				leaveScrollNum = 0;

				var hh = val.replace('?', '').replace(smoothScrollPrefix, '');
				var hash = '#' + hh;
				var tgt = $(hash);
				var pos = (tgt.offset().top) + leaveScrollNum;;
				$("html, body").animate({ scrollTop: pos }, smoothScrollSpd, "swing");
			}
		});
	});

	/*
		○別ページからのURL
		hogehoge.com/about/?move=ID名
	*/




	// タブ切り替え
	/*----------------------------------------------------------------------*/
	var tabWrapName = '.tabWrap';
	var tabBtnName = '.tabBtn';
	var tabBoxName = '.tabBox';
	var activeCl = 'active';

	var tabWrap = $(tabWrapName);
	var tabBtn = $(tabBtnName);
	var tabBox = $(tabBoxName);

	tabBtn.click(function (e) {
		var $this = $(this);
		var thisParentIdx = $(tabWrapName).index($this.parents(tabWrapName));

		tabWrap.eq(thisParentIdx).find(tabBtnName).removeClass(activeCl);
		tabWrap.eq(thisParentIdx).find(tabBoxName).removeClass(activeCl);

		var activeId = $this.data('tabtrg');
		$("#" + activeId).addClass(activeCl);
		$this.addClass(activeCl);

		e.preventDefault();
		return false;
	});

	// tab 別ページ
	var tabPrefix = 'tabtrg=';
	$(window).on('load.tab', function () {
		$.each(paramAry, function (i, val) {
			if (val.indexOf(tabPrefix) != -1) {
				var hh = val.replace('?', '').replace(tabPrefix, '');
				var trgTabParentIdx = $(tabWrapName).index($(tabBoxName + '#' + hh).parents(tabWrapName));

				tabWrap.eq(trgTabParentIdx).find(tabBtnName).removeClass(activeCl);
				tabWrap.eq(trgTabParentIdx).find(tabBoxName).removeClass(activeCl);

				var activeId = hh;
				$("#" + activeId).addClass(activeCl);
				$(tabBtnName + '[data-tabtrg="' + activeId + '"]').addClass(activeCl);

			}
		});
	});


	/*
		○別ページからのURL
		hogehoge.com/about/?tabtrg=タブのID名
		
		○別ページからのURL（スムーススクロールと併用）
		hogehoge.com/about/?move=スムーススクロールターゲットID名&tabtrg=タブのID名
		
		○HTML
		<div class="tabWrap">
			<!--タブのボタン-->
			<a href="javascript:void(0);" class="tabBtn active" data-tabtrg="タブID名">すべて</a>
			
			<!--タブ領域-->
			<div id="タブID名" class="tabBox active">
				すべて
			</div><!--tabAll-->
		</div><!--tabWrap-->
	*/


	/* tel link */
	/* --------------------------------------------------------- */
	if (uaInfo['UAFlg'] != 'SP') {
		$('a[href^="tel:"]').on('click', function (e) {
			e.preventDefault();
		});
	}




	/* Scroll Fadein */
	/*----------------------------------------------------------*/
	var clName_fadeinWrap = 'fadeinWrap';
	var clName_fadein = 'fadein';
	var clName_fadeinActive = 'scrollin';
	var $fadeinWrap = $('.' + clName_fadeinWrap);
	var $fadein = $('.' + clName_fadein);

	var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var division_fadein_pc = 1.4;
	var division_fadein_sp = 1.4;
	var extra_fadein = (winH / division_fadein_pc);
	if (uaInfo['winSizeFlg'] != 'PC') {
		extra_fadein = (winH / division_fadein_sp);
	}

	var delay_fadein = 320;

	var limH = $('body').outerHeight() - winH;

	function scrollFadein(y) {
		uaInfo = UAChk();
		var scrY = y;

		winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		limH = $('body').outerHeight() - winH;

		if (uaInfo['winSizeFlg'] == 'PC') {
			extra_fadein = (winH / division_fadein_pc);
		} else {
			extra_fadein = (winH / division_fadein_sp);
		}

		if ($fadeinWrap.find('.' + clName_fadein).length) {
			$fadeinWrap.each(function (idx) {
				var $this = $(this);
				var trgY = ($this.offset().top) - extra_fadein;

				if (scrY >= trgY && !$this.hasClass(clName_fadeinActive)) {
					$this.addClass(clName_fadeinActive);

					$this.find('.' + clName_fadein).each(function (i) {
						var $t = $(this);
						$t.stop().delay((delay_fadein * i)).queue(function () {
							$t.addClass(clName_fadeinActive);
						});
					});
				}


				// One time only
				if (limH <= scrY) {
					$this.find('.' + clName_fadein).not('.' + clName_fadeinActive).each(function (i) {
						var $t = $(this);
						$t.stop().delay((delay_fadein * i)).queue(function () {
							$t.addClass(clName_fadeinActive);
						});
					});
				}

				// Any Time
				/*if(scrY >= trgY && $this.hasClass(clName_fadeinActive)){
					$this.find('.'+clName_fadein).each(function(i){
						var $t = $(this);
						if(!$t.hasClass(clName_fadeinActive)){
							$t.addClass(clName_fadeinActive);
						}
					});
				}else if(scrY < trgY && $this.hasClass(clName_fadeinActive)){
					$this.find('.'+clName_fadein).stop();
					$this.removeClass(clName_fadeinActive);
					$this.find('.'+clName_fadein).removeClass(clName_fadeinActive);
				}*/
			});
		}

	}


	// Release when using
	//	setTimeout(function(){
	//		scrollFadein($(window).scrollTop());
	//	},300);
	//
	//
	//	$(window).on('scroll.scrollFadein',function(){
	//		scrollFadein($(window).scrollTop());
	//	});




	// ハンバーガーメニュー
	$("#globalNavBtn").click(function () {
		if ($("#globalNavWrap").hasClass("drawerActive")) {
			$("#header").removeClass("active");
			$("#globalNavWrap").removeClass("drawerActive")
			$("#globalNavBtn").removeClass("drawerActive");
			$("#globalNavBtn a").removeClass("drawerActive");

			$("html").css("overflow", "auto");
			$("#wrap").removeClass("drawer");
		} else {
			var nowHeight = $("#headWrap").height();
			$("#globalNavWrap").addClass("drawerActive").css("top", nowHeight);
			$("#header").addClass("active");
			$("#globalNavBtn").addClass("drawerActive");
			$("#globalNavBtn a").addClass("drawerActive");

			$("html").css("overflow", "hidden");
			$("#wrap").addClass("drawer");
		}
	});
	$("#globalNavWrap .bg").click(function () {
		if ($("#globalNavWrap").hasClass("drawerActive")) {
			$("#header").removeClass("active");
			$("#globalNavWrap").removeClass("drawerActive")
			$("#globalNavBtn").removeClass("drawerActive");
			$("#globalNavBtn a").removeClass("drawerActive");

			$("html").css("overflow", "auto");
			$("#wrap").removeClass("drawer");
		} else {
			var nowHeight = $("#headWrap").height();
			$("#globalNavWrap").addClass("drawerActive").css("top", nowHeight);
			$("#header").addClass("active");
			$("#globalNavBtn").addClass("drawerActive");
			$("#globalNavBtn a").addClass("drawerActive");

			$("html").css("overflow", "hidden");
			$("#wrap").addClass("drawer");
		}
	});




	// ヘッダーの高さ分だけmarginとる
	var height = $("#headWrap").height();
	$("#mainWrap").css("margin-top", height);
	$("#globalNavWrap .bg").css("top", height);

	$(window).scroll(function () {
		$("#globalNavBtn").click(function () {
			var scrollHeight = $("#headWrap").height();

			$("#globalNavWrap .bg").css("top", scrollHeight);
		});
	});






	// モーダル
	$('.js-modaal').modaal();






});
//]]>