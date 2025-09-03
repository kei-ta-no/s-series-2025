//<![CDATA[
$(document).ready(function () {

	// モーダル
	$(".js-modaal").modaal();


	// ローディング前
	$("html").css("overflow", "hidden");
	$("#loading .contentWrap").fadeIn(700);
	$("#kv .contentWrap .titleWrap").css("top", "3rem");
	$("#kv .contentWrap .textWrap").css("top", "3rem");


	// VR VRで見るボタンクリック
	$("#vrBtn").click(function () {
		$(this).fadeOut();
		$("#vr .vrInfoWrap .contentWrap").fadeOut();
	})



	// VR 動画で見るモーダル
	$("#modal_movieBtn").modaal({ type: 'video' });



	// ポイント スライダー
	$("#point .pointSliderWrap .pointSlider").slick({
		slidesToShow: 1,
		variableWidth: true,
		infinity: true,
		prevArrow: '<div class="prev"></div>',
		nextArrow: '<div class="next"></div>',
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				}
			},
		]
	});



	// メリット スライダー
	$("#point .meritSliderWrap .meritSlider").slick({
		centerMode: true,
		slidesToShow: 1,
		variableWidth: true,
		infinity: true,
		swipeToSlide: true,
		prevArrow: '<div class="prev"></div>',
		nextArrow: '<div class="next"></div>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true
				}
			},
		]
	});




	// 商品紹介 サムネイルスライダー
	$("#product .thumbnailSliderWrap .thumbnailSlider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="prev"></div>',
		nextArrow: '<div class="next"></div>',
		asNavFor: "#product .thumbnailNavSliderWrap .thumbnailNavSlider"
	});
	var thumbnailInitial = 0;
	$("#product .thumbnailNavSliderWrap .thumbnailNavSlider").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: "#product .thumbnailSliderWrap .thumbnailSlider",
		variableWidth: true,
		arrows: false,
		focusOnSelect: true,
		swipeToSlide: true,
	});
	var thumbnailNavInitial = 0;




	// 商品紹介 外壁の色選択でサムネ画像変更
	$("#outerWall_bk").css("visibility", "hidden");
	$('[name="outerWallSelect"]:radio').change(function () {
		if ($('[id=outerWallSelect_gy]').prop('checked')) {
			$("#outerWall_gy").css("visibility", "visible");
			$("#outerWall_bk").css("visibility", "hidden");
		} else if ($('[id=outerWallSelect_bk]').prop('checked')) {
			$("#outerWall_gy").css("visibility", "hidden");
			$("#outerWall_bk").css("visibility", "visible");
		}

		$('#product .thumbnailSliderWrap .thumbnailSlider').slick('slickGoTo', 0, true);
		$('#product .thumbnailNavSliderWrap .thumbnailNavSlider').slick('slickGoTo', 0, true);
	});




	// オンライン予約と来場予約がご希望の場合、「ご希望日」が表示される
	$(".desiredDateListWrap").css("display", "none");


	if ($(".mw_wp_form_input #contact_content-2:checked").prop("checked") == true || $(".mw_wp_form_input #contact_content-3:checked").prop("checked") == true) {
		$(".desiredDateListWrap").css("display", "flex");
	}

	$("#contact_content-2").change(function () {
		$(this).toggleClass("checked");
		if ($(this).hasClass("checked")) {
			$(".desiredDateListWrap").css("display", "flex");
		} else if (!$("#contact_content-3").hasClass("checked")) {
			$(".desiredDateListWrap").css("display", "none");
		}
	});
	$("#contact_content-3").change(function () {
		$(this).toggleClass("checked");
		if ($(this).hasClass("checked")) {
			$(".desiredDateListWrap").css("display", "flex");
		} else if (!$("#contact_content-2").hasClass("checked")) {
			$(".desiredDateListWrap").css("display", "none");
		}
	});





	// フッター　SPの時#spFootContactNav分paddingとる
	if ($(window).width() < 768) {
		var spFootContactNavHeight = $("#spFootContactNav").outerHeight();
		$("#footWrap #footer .footInfoNavWrap").css("padding-bottom", spFootContactNavHeight + 25);
	}




});
//]]>





$(window).on('load', function () {




	$("html").css("overflow", "auto");

	setTimeout(function () {
		$("#kv .contentWrap .titleWrap").css({
			"top": "0",
			"opacity": "1"
		});
		$("#kv .contentWrap .textWrap").css({
			"top": "0",
			"opacity": "1"
		});
	}, 800);



	// ローディング
	setTimeout(function () {
		$("#loading .contentWrap").fadeOut(700);
	}, 300);

	setTimeout(function () {
		$("#loading").fadeOut(700);
	}, 800);


});