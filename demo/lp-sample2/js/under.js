//<![CDATA[
$(document).ready(function () {


	// ヘッダー PCのみkvを過ぎたらクラス付与
	if ($(window).width() > 1023) {
		$(window).on('load', function () {
			kvOffset = $('#kv').scrollTop() + $('#kv').outerHeight() / 3;
			singleKvOffset = $('#singleKv').scrollTop() + $('#singleKv').outerHeight() / 3;
		});
		$(window).scroll(function () {
			if ($(window).scrollTop() > kvOffset) {
				$("#headWrap").addClass("minHeader");
				$("#globalNavBtnWrap").addClass("minHeader");
			} else if ($(window).scrollTop() > singleKvOffset) {
				$("#headWrap").addClass("minHeader");
				$("#globalNavBtnWrap").addClass("minHeader");
			} else {
				$("#headWrap").removeClass("minHeader");
				$("#globalNavBtnWrap").removeClass("minHeader");
			}
		});
	}


	// アコーディオン
	var _accordionBtn = ".accordionBtn";
	var $accordionBtn = $(_accordionBtn);

	var clName_accordionActive = "active";
	var spd_accordion = 300;

	if ($accordionBtn.length) {
		$accordionBtn.on("click", function (e) {
			var $this = $(this);
			var $trg = $this.parent().next();

			$this.toggleClass(clName_accordionActive);
			$trg.stop().slideToggle(spd_accordion);

			e.preventDefault();
			return false;
		});
	}


	// 不動産情報
	$("#estatePostArchive .estateArchiveList > ul > li .contentWrap").matchHeight();
	$("#estatePostArchive .estateArchiveList > ul > li .contentWrap .titleWrap").matchHeight();


	// 会社概要 実績
	$("#construction .constructionWrap .construction .numWrap").matchHeight();

});
//]]>