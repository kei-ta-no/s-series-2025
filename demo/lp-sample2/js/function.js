//<![CDATA[
	
// ユーザーエージェント判別
/*-----------------------------------------------------------------------------------------------*/
function UAChk(){
	/* breakpoint設定 */
	var pcWinSize = 1024;// PC
	var tabletWinSize = 768;// Tablet
	var spWinSize = 767;// SP
	/*-----------------------------------------------*/

	var ua = {};
	ua.name = window.navigator.userAgent.toLowerCase();

	ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
	ua.isiPhone = ua.name.indexOf('iphone') >= 0;
	ua.isiPod = ua.name.indexOf('ipod') >= 0;
	ua.isiPad = ua.name.indexOf('ipad') >= 0;
	ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
	ua.isAndroid = ua.name.indexOf('android') >= 0;
	ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));

	if (ua.isIE) {
		ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
		if (ua.verArray) {
			ua.ver = parseInt(ua.verArray[2], 10);
		}
	}
	if (ua.isiOS) {
		ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
		if (ua.verArray) {
			ua.ver = parseInt(ua.verArray[2], 10);
		}
	}
	if (ua.isAndroid) {
		ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
		if (ua.verArray) {
			ua.ver = parseInt(ua.verArray[2], 10);
		}
	}

	var uaFlg = 'PC';
	var windSizeFlg = 'PC';

	if( ua.isiPhone || ua.isiPod || (ua.isAndroid && ua.name.indexOf('mobile') >= 0) ){
		// SPだったら
		uaFlg = 'SP';
		windSizeFlg = 'SP';
	}else if( ua.isTablet ){
		// Tabletだったら
		uaFlg = 'Tablet';
		windSizeFlg = 'Tablet';
	}else{
		// PCだったら
		uaFlg = 'PC';

		// ウィンドウサイズでUA振り分け
		//var winW = $(window).width();
		//var winW = $("html").width();
		var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if( winW >= pcWinSize ){
			// PCサイズ
			windSizeFlg = 'PC';
		}else if( winW < pcWinSize && winW >= tabletWinSize ){
			// Tabletサイズ
			windSizeFlg = 'Tablet';
		}else if( winW <= spWinSize ){
			// SPサイズ
			windSizeFlg = 'SP';
		}

	}

	var flgs = new Array();

	flgs['UAInfo'] = new Array();
	flgs['UAInfo'] = ua;

	flgs['UAFlg'] = uaFlg;
	flgs['winSizeFlg'] = windSizeFlg;

	return flgs;

	/*--------------------------------------------
		■ 使い方
		● flgs['UAInfo']の中身を見る
		var uaInfo = UAChk();
		for(var i in uaInfo['UAInfo']){
			alert(uaInfo['UAInfo'][i]);
		}

		● flgs['UAInfo']の中身へアクセス
		var uaInfo = UAChk();
		alert(uaInfo.UAInfo.name);
		または
		alert(uaInfo['UAInfo']['name']);

	----------------------------------------------*/

}//UAChk
	
/*-----------------------------------------------------------------------------------------------*/
	
	
// IE判別
/*-----------------------------------------------------------------------------------------------*/

function ltIE9(){
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();

	// IE8以下チェック
	if (userAgent.indexOf('msie') != -1) {
		if (appVersion.indexOf("msie 6.") != -1) {
			//IE6
			return true;
		}else if (appVersion.indexOf("msie 7.") != -1) {
			//IE7
			return true;
		}else if (appVersion.indexOf("msie 8.") != -1) {
			//IE8
			return true;
		}else{
			//IE9以上
			return false;
		}
	}else{
		return false;
	}
}//ltIE9

/*-----------------------------------------------------------------------------------------------*/


// GETパラメータ取得
/*-----------------------------------------------------------------------------------------------*/
(function($) {
	// http://tips.recatnap.info/wiki/Jquery%E3%81%A7%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%81%AE%E5%8F%96%E5%BE%97%28$.getParameter%28%29%29
	$.extend({
		getParameter: function getParameter() {
			// URLのパラメーターを取得
			
			var arg  = new Object;
			var pair = location.search.substring(1).split('&');
			for(i=0; pair[i]; i++) {
				var kv = pair[i].split('=');
				arg[kv[0]] = kv[1];
			}
			return arg;
		}
	});
	
	/*
	var args = $.getParameter();
	パラメーターがあれば「args.○○○」とかで値が取れる。
	*/
})(jQuery);











//]]>
