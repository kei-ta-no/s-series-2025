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
	$("#outerWall_wh").css("visibility", "hidden");
	$('[name="outerWallSelect"]:radio').change(function () {
		if ($('[id=outerWallSelect_bk]').prop('checked')) {
			$("#outerWall_bk").css("visibility", "visible");
			$("#outerWall_wh").css("visibility", "hidden");
		} else if ($('[id=outerWallSelect_wh]').prop('checked')) {
			$("#outerWall_bk").css("visibility", "hidden");
			$("#outerWall_wh").css("visibility", "visible");
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





	// 画像比較スライダー
	//function to check if the .cd-image-container is in the viewport here
	// ...

	//make the .cd-handle element draggable and modify .cd-resize-img width according to its position
	$('.cd-image-container').each(function () {
		var actual = $(this);
		drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual);
	});

	$('.cd-handle').mouseover(function (e) {
		$(this).addClass('hover');
		$('.cd-separator').addClass('hover');
	}).mouseout(function (e) {
		$(this).removeClass('hover');
		$('.cd-separator').removeClass('hover');
	});


});
//]]>


//function to upadate images label visibility here
// ...
//draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
function drags(dragElement, resizeElement, container) {
	dragElement.on("mousedown vmousedown", function (e) {
		dragElement.addClass('cd-draggable');
		resizeElement.addClass('cd-resizable');
		$('.cd-separator').addClass('cd-draggable');

		var dragWidth = dragElement.outerWidth(),
			xPosition = dragElement.offset().left + dragWidth - e.pageX,
			containerOffset = container.offset().left,
			containerWidth = container.outerWidth(),
			minLeft = containerOffset - dragWidth / 2 - 1,
			maxLeft = containerOffset + containerWidth - dragWidth / 2 - 1;

		dragElement.parents().on("mousemove vmousemove", function (e) {
			leftValue = e.pageX + xPosition - dragWidth;

			//constrain the draggable element to move inside its container
			if (leftValue < minLeft) {
				leftValue = minLeft;
			} else if (leftValue > maxLeft) {
				leftValue = maxLeft;
			}

			widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

			$('.cd-draggable').css('left', widthValue).on("mouseup vmouseup", function () {
				$(this).removeClass('cd-draggable');
				resizeElement.removeClass('cd-resizable');
			});

			$('.cd-resizable').css('width', widthValue);

			//function to upadate images label visibility here
			// ...

		}).on("mouseup vmouseup", function (e) {
			dragElement.removeClass('cd-draggable');
			resizeElement.removeClass('cd-resizable');
			$('.cd-separator').removeClass('cd-draggable');
		});
		e.preventDefault();
	}).on("mouseup vmouseup", function (e) {
		dragElement.removeClass('cd-draggable');
		resizeElement.removeClass('cd-resizable');
		$('.cd-separator').removeClass('cd-draggable');
	});
}




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








