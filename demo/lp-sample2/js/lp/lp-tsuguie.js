ViewportFixed();

let is_loaded_video = false;
let load_time = 4000;
let firstview_images,
  concept_images03,
  concept_images04 = null;

document.addEventListener("DOMContentLoaded", () => {
  foundation();

  // ファーストビュースライダー
  if (document.querySelector(".js-firstview-images")) {
    // eslint-disable-next-line no-unused-vars
    // @ts-ignore
    firstview_images = new Swiper(".js-firstview-images", {
      loop: true,
      allowTouchMove: false,
      speed: 4000,
      slidesPerView: 1,
      spaceBetween: 0,
      preventInteractionOnTransition: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });

    firstview_images.autoplay.stop();
  }

  // 参考プランと価格スライダー初期化、再生
  if (document.querySelector(".js-concept-images02")) {
    const BLOCK_IMAGES = document.querySelectorAll(".js-concept-images02");
    BLOCK_IMAGES.forEach((ele) => {
      // eslint-disable-next-line no-unused-vars
      // @ts-ignore
      new Swiper(ele, {
        loop: false,
        speed: 600,
        autoplay: false,
        slidesPerView: 1,
        spaceBetween: 16,
        preventInteractionOnTransition: false,
        pagination: {
          el: ele.nextElementSibling,
          clickable: true,
        },
      });
    });
  }

  // 3つの高性能スライダー初期化
  if (document.querySelector(".js-concept-images03")) {
    // eslint-disable-next-line no-unused-vars
    // @ts-ignore
    concept_images03 = new Swiper(".js-concept-images03", {
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      loopAdditionalSlides: 2,
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 16,
      preventInteractionOnTransition: false,
      pagination: {
        el: ".js-concept-images03 + .js-concept-image-dots",
        clickable: true,
      },
    });
    concept_images03.autoplay.stop();
  }

  // こだわりの素材スライダー初期化
  if (document.querySelector(".js-concept-images04")) {
    // eslint-disable-next-line no-unused-vars
    // @ts-ignore
    concept_images04 = new Swiper(".js-concept-images04", {
      loop: true,
      loopAdditionalSlides: 2,
      speed: 600,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 16,
      preventInteractionOnTransition: false,
      pagination: {
        el: ".js-concept-images04 + .js-concept-image-dots",
        clickable: true,
      },
    });
    concept_images04.autoplay.stop();
  }

  // タブ切り替え
  if (document.querySelector(".js-tab-item")) {
    const TAB_ITEMS = document.querySelectorAll("[data-tab-title]");
    const TAB_BLOCKS = document.querySelectorAll("[data-tab-block]");
    if (TAB_ITEMS && TAB_BLOCKS) {
      TAB_ITEMS.forEach((ele) => {
        ele.addEventListener("click", () => {
          RemoveCurrentTab({ items: TAB_ITEMS, blocks: TAB_BLOCKS });

          const DATA_VAL = ele.getAttribute("data-tab-title");
          ToggleCurrentTab(DATA_VAL);
        });
      });
    }
  }

  Modaal();
});

window.addEventListener("load", () => {
  getVideo();
  splash();
  contact();
  PauseVideo();
  toggleLand();

  // @ts-ignore
  ScrollOut({
    once: true,
  });

  // パララックス開始
  const rellaxElems01 = document.querySelectorAll(".js-rellax");
  if (rellaxElems01 && rellaxElems01.length > 0) {
    // eslint-disable-next-line no-unused-vars
    const rellax = new Rellax(".js-rellax", {
      speed: -1,
      center: true,
    });
  }
});

window.addEventListener("resize", () => {});

window.addEventListener("scroll", () => {
  PlayVideo();

  // 3つの高性能スライダー再生
  if (concept_images03 && document.querySelector(".js-concept-images03").getAttribute("data-scroll") == "in") {
    if (!document.querySelector(".js-concept-images03").classList.contains("active")) {
      document.querySelector(".js-concept-images03").classList.add("active");
      concept_images03.autoplay.start();
    }
  }

  // こだわりの素材スライダー再生
  if (concept_images04 && document.querySelector(".js-concept-images04").getAttribute("data-scroll") == "in") {
    if (!document.querySelector(".js-concept-images04").classList.contains("active")) {
      document.querySelector(".js-concept-images04").classList.add("active");
      concept_images04.autoplay.start();
    }
  }
});

// モダール
function Modaal() {
  const MODAAL = document.querySelector(".js-modaal");
  const MODAAL_CLOSE = document.querySelectorAll(".js-modaal-close");
  const MODAAL_ITEM = document.querySelectorAll("[data-modaal]");
  const MODAAL_TARGET_ITEM = document.querySelectorAll("[data-modaal-item]");

  if (MODAAL && MODAAL_CLOSE && MODAAL_ITEM && MODAAL_TARGET_ITEM) {
    MODAAL_ITEM.forEach((item) => {
      item.addEventListener("click", () => {
        const MODAAL_TARGET = item.getAttribute("data-modaal");
        if (document.querySelector(`[data-modaal-item= ${MODAAL_TARGET}]`)) {
          MODAAL_TARGET_ITEM.forEach((target) => {
            // @ts-ignore
            target.style.display = "none";
          });

          document.querySelector(
            `[data-modaal-item= ${MODAAL_TARGET}]`
            // @ts-ignore
          ).style.display = "block";
          // @ts-ignore
          MODAAL.style.display = "block";
          // @ts-ignore
          MODAAL.style.transition = "opacity .6s ease";

          setTimeout(() => {
            // @ts-ignore
            MODAAL.style.opacity = 1;
          }, 1);
        }
      });
    });

    MODAAL_CLOSE.forEach((btn) => {
      btn.addEventListener("click", () => {
        // @ts-ignore
        MODAAL.style.transition = "opacity .6s ease";
        // @ts-ignore
        MODAAL.style.opacity = 0;

        setTimeout(() => {
          document.querySelector(".modaal__contents").scrollTop = 0;
          // @ts-ignore
          MODAAL.style.display = "none";
        }, 601);
      });
    });
  }
}

// タブの初期化
function RemoveCurrentTab(_arr = { items: null, blocks: null }) {
  if (_arr["items"]) {
    _arr["items"].forEach((item) => {
      item.classList.remove("current");
    });
  }

  if (_arr["blocks"]) {
    _arr["blocks"].forEach((block) => {
      block.classList.remove("current");
    });
  }
}

// タブの切り替え
function ToggleCurrentTab(_data_val = null) {
  if (_data_val && document.querySelector(`[data-tab-title=${_data_val}]`) && document.querySelector(`[data-tab-block=${_data_val}]`)) {
    document.querySelector(`[data-tab-title=${_data_val}]`).classList.add("current");
    document.querySelector(`[data-tab-block=${_data_val}]`).classList.add("current");
  }
}

// オープニング
function splash() {
  const SPLASH = document.querySelector(".js-splash") || null;
  const SPLASH_ITEM = document.querySelector(".js-splash-item") || null;
  const SPLASH_IMAGE = document.querySelector(".js-splash-image") || null;
  const SPLASH_TEXT = document.querySelector(".js-splash-text") || null;
  const TIMEOUT_TIME = 800;

  setTimeout(() => {
    if (SPLASH_ITEM) SPLASH_ITEM.classList.add("active");
  }, TIMEOUT_TIME * 0.5);

  setTimeout(() => {
    if (SPLASH_IMAGE) SPLASH_IMAGE.classList.add("active");
  }, TIMEOUT_TIME);

  setTimeout(() => {
    if (SPLASH_TEXT) SPLASH_TEXT.classList.add("active");
  }, TIMEOUT_TIME * 1.5);

  setTimeout(() => {
    // @ts-ignore
    if (SPLASH) SPLASH.style.opacity = "0";
    if (firstview_images) firstview_images.autoplay.start();
  }, TIMEOUT_TIME * 3.5);

  setTimeout(() => {
    // @ts-ignore
    if (SPLASH) SPLASH.style.display = "none";
    load_time = 0;
  }, TIMEOUT_TIME * 4.5);
}

// 動画読み込み
function getVideo() {
  const VIDEO = document.getElementById("video") || null;
  if (VIDEO) {
    const VIDEO_URL = "./assets/images/base/concept_movie.mp4?1675862216";
    VIDEO.setAttribute("src", VIDEO_URL);
    LoadedVideo();
  }
}

// 建築予定地切り替え
function toggleLand() {
  const LANDS = document.querySelectorAll(".js-contact-land");
  const LANDS_VAL = document.querySelector(".js-contact-land-val");
  if (LANDS && LANDS_VAL) {
    LANDS.forEach((land) => {
      land.addEventListener("change", () => {
        // @ts-ignore
        LANDS_VAL.value = land.value;
      });
    });
  }
}

// フォームバリデーション
function contact() {
  const SEND_BUTTON = document.querySelector(".js-send");
  if (SEND_BUTTON) {
    SEND_BUTTON.addEventListener("click", () => {
      const CONTACT_FORM = document.querySelector(".js-contact-form");

      if (CONTACT_FORM) {
        const ERRORS = document.querySelectorAll(".js-contact-form .error") || null;
        if (ERRORS) {
          ERRORS.forEach((err) => {
            err.remove();
          });
        }

        // 氏名
        const CONTACT_ITEM_NAME = document.querySelector(".js-contact-name") || null;
        // @ts-ignore
        const CONTACT_ITEM_NAME_VALUE = document.querySelector(".js-contact-name").value || null;
        if (!CONTACT_ITEM_NAME_VALUE || CONTACT_ITEM_NAME_VALUE.length < 0) {
          let error_ele = document.createElement("p");
          error_ele.classList.add("error");
          error_ele.textContent = "必須項目です。";
          CONTACT_ITEM_NAME.after(error_ele);
        }

        // 郵便番号
        const CONTACT_ITEM_POSTALCODE = document.querySelector(".js-contact-postalcode") || null;
        // @ts-ignore
        const CONTACT_ITEM_POSTALCODE_VALUE = document.querySelector(".js-contact-postalcode").value || null;
        if (!CONTACT_ITEM_POSTALCODE_VALUE || CONTACT_ITEM_POSTALCODE_VALUE.length < 0) {
          let error_ele = document.createElement("p");
          error_ele.classList.add("error");
          error_ele.textContent = "必須項目です。";
          CONTACT_ITEM_POSTALCODE.after(error_ele);
        }

        // 住所
        const CONTACT_ITEM_ADDRESS = document.querySelector(".js-contact-address") || null;
        // @ts-ignore
        const CONTACT_ITEM_ADDRESS_VALUE = document.querySelector(".js-contact-address").value || null;
        if (!CONTACT_ITEM_ADDRESS_VALUE || CONTACT_ITEM_ADDRESS_VALUE.length < 0) {
          let error_ele = document.createElement("p");
          error_ele.classList.add("error");
          error_ele.textContent = "必須項目です。";
          CONTACT_ITEM_ADDRESS.after(error_ele);
        }

        // メールアドレス
        const CONTACT_ITEM_EMAIL = document.querySelector(".js-contact-email") || null;
        // @ts-ignore
        const CONTACT_ITEM_EMAIL_VALUE = document.querySelector(".js-contact-email").value || null;
        if (!CONTACT_ITEM_EMAIL_VALUE || CONTACT_ITEM_EMAIL_VALUE.length < 0) {
          let error_ele = document.createElement("p");
          error_ele.classList.add("error");
          error_ele.textContent = "必須項目です。";
          CONTACT_ITEM_EMAIL.after(error_ele);
        }

        // 電話番号
        const CONTACT_ITEM_TEL = document.querySelector(".js-contact-tel") || null;
        // @ts-ignore
        const CONTACT_ITEM_TEL_VALUE = document.querySelector(".js-contact-tel").value || null;
        if (!CONTACT_ITEM_TEL_VALUE || CONTACT_ITEM_TEL_VALUE.length < 0) {
          let error_ele = document.createElement("p");
          error_ele.classList.add("error");
          error_ele.textContent = "必須項目です。";
          CONTACT_ITEM_TEL.after(error_ele);
        }

        // 建築予定地
        // const CONTACT_ITEM_LAND = document.querySelector(".js-contact-land-val") || null;
        // @ts-ignore
        // const CONTACT_ITEM_LAND_VALUE = document.querySelector(".js-contact-land-val").value || null;
        // if (!CONTACT_ITEM_LAND_VALUE || CONTACT_ITEM_LAND_VALUE.length < 0) {
        //   let error_ele = document.createElement("p");
        //   error_ele.classList.add("error");
        //   error_ele.textContent = "必須項目です。";
        //   CONTACT_ITEM_LAND.after(error_ele);
        // }

        // 同意
        // const CONTACT_ITEM_CHECK = document.querySelector(".js-contact-check") || null;
        // @ts-ignore
        // const CONTACT_ITEM_CHECK_VALUE = document.querySelector(".js-contact-check").checked;
        // if (!CONTACT_ITEM_CHECK_VALUE) {
        //   let error_ele = document.createElement("p");
        //   error_ele.classList.add("error");
        //   error_ele.textContent = "必須項目です。";
        //   CONTACT_ITEM_CHECK.parentElement.after(error_ele);
        // }

        const CURRENT_ERROR = document.querySelector(".js-contact-form .error") || null;
        if (CURRENT_ERROR) {
          CURRENT_ERROR.parentElement.parentElement.scrollIntoView({
            block: "center",
          });
        }

        if (!CURRENT_ERROR) {
          // @ts-ignore
          const CONTACT_BODY = new FormData(CONTACT_FORM);

          fetch("./tsuguie.php", {
            method: "POST",
            body: CONTACT_BODY,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data == "success") {
                // @ts-ignore
                document.querySelector(".js-contact-name").value = "";

                // @ts-ignore
                document.querySelector(".js-contact-postalcode").value = "";

                // @ts-ignore
                document.querySelector(".js-contact-address").value = "";

                // @ts-ignore
                document.querySelector(".js-contact-email").value = "";

                // @ts-ignore
                document.querySelector(".js-contact-tel").value = "";

                // @ts-ignore
                document.querySelector(".js-contact-check").checked = false;

                dialog("送信成功");
              } else {
                dialog("送信失敗");
              }
            });
        }
      }
    });
  }
}

// ダイアログ表示
function dialog(_str = null) {
  const DIALOG = document.querySelector(".js-dialog");
  const DIALOG_TEXT = document.querySelector(".js-dialog-text");
  if (DIALOG && DIALOG_TEXT) {
    DIALOG_TEXT.textContent = _str;
    // @ts-ignore
    DIALOG.style.display = "block";
    setTimeout(() => {
      // @ts-ignore
      DIALOG.style.opacity = "1";
    }, 1);

    setTimeout(() => {
      // @ts-ignore
      DIALOG.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
      // @ts-ignore
      DIALOG.style.display = "none";
    }, 1601);
  }
}

// 動画再生
function PlayVideo() {
  const VIDEO = document.getElementById("video");
  if (VIDEO) {
    if (VIDEO.getAttribute("data-scroll") == "in") {
      if (!VIDEO.classList.contains("active") && is_loaded_video) {
        VIDEO.classList.add("active");
        if (is_loaded_video) {
          // @ts-ignore
          VIDEO.currentTime = 0;
          setTimeout(() => {
            // @ts-ignore
            VIDEO.play();
          }, load_time);
        }
      }
    }
  }
}

// 動画停止
function PauseVideo() {
  const VIDEO = document.getElementById("video");
  if (VIDEO) {
    // @ts-ignore
    VIDEO.pause();
  }
}

// 動画の読み込み完了 -> 再生
function LoadedVideo() {
  const VIDEO = document.getElementById("video");
  if (VIDEO) {
    VIDEO.addEventListener("loadeddata", () => {
      console.log("loadeddata");
      is_loaded_video = true;
      PlayVideo();
    });
  }
}

// --vw、--vh、br、webp対応
function foundation() {
  // brタグの読み上げ防止
  const elements = document.querySelectorAll("br");
  elements.forEach((el) => {
    el.setAttribute("aria-hidden", "true");
  });

  // 画面の表示部分の高さ取得
  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  setFillHeight();

  // スクロールバーを抜いた横幅を取得
  const setFillWidth = () => {
    const vw = document.documentElement.clientWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  };
  setFillWidth();

  let vw = document.documentElement.clientWidth;
  window.addEventListener("resize", () => {
    if (vw === document.documentElement.clientWidth) {
      return;
    }
    vw = document.documentElement.clientWidth;
    setFillHeight();
    setFillWidth();
  });

  /**
   * ブラウザが webp をサポートしているかどうか
   * @returns webp をサポートしているなら true そうでないなら false
   */
  const supportsWebp = async () => {
    if (!self.createImageBitmap) return false;
    // webp の仮データ
    const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    const blob = await fetch(webpData).then((r) => r.blob());
    return createImageBitmap(blob).then(
      () => true,
      () => false
    );
  };
  // Webp対応か確認
  /**
   * webp 対応していれば target に webp、対応していなければ no-webp クラスを追加する
   */
  const addWebpDetectionClass = () => {
    if (supportsWebp()) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.add("no-webp");
    }
  };

  addWebpDetectionClass();
}

// viewport調整
function ViewportFixed() {
  (function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
      let value = "width=device-width,initial-scale=1";

      if (window.outerWidth < 375) {
        value = "width=375";
      } else if (1366 >= window.outerWidth && window.outerWidth > 767) {
        value = "width=1366";
      }

      if (viewport?.getAttribute("content") !== value) {
        viewport?.setAttribute("content", value);
      }
    }
    window.addEventListener("resize", switchViewport, false);
    switchViewport();
  })();
}

var ScrollOut = (function () {
  "use strict";
  function S(e, t, n) {
    return e < t ? t : n < e ? n : e;
  }
  function T(e) {
    return +(0 < e) - +(e < 0);
  }
  var q,
    t = {};
  function n(e) {
    return "-" + e[0].toLowerCase();
  }
  function d(e) {
    return t[e] || (t[e] = e.replace(/([A-Z])/g, n));
  }
  function v(e, t) {
    return e && 0 !== e.length ? (e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (t || document.documentElement).querySelectorAll(e))) : [];
  }
  function h(e, t) {
    for (var n in t) n.indexOf("_") && e.setAttribute("data-" + d(n), t[n]);
  }
  var z = [];
  function e() {
    (q = 0),
      z.slice().forEach(function (e) {
        return e();
      }),
      F();
  }
  function F() {
    !q && z.length && (q = requestAnimationFrame(e));
  }
  function N(e, t, n, r) {
    return "function" == typeof e ? e(t, n, r) : e;
  }
  function m() {}
  return function (L) {
    var i,
      P,
      _,
      H,
      o = (L = L || {}).onChange || m,
      l = L.onHidden || m,
      c = L.onShown || m,
      s = L.onScroll || m,
      f = L.cssProps
        ? ((i = L.cssProps),
          function (e, t) {
            for (var n in t) n.indexOf("_") && (!0 === i || i[n]) && e.style.setProperty("--" + d(n), ((r = t[n]), Math.round(1e4 * r) / 1e4));
            var r;
          })
        : m,
      e = L.scrollingElement,
      A = e ? v(e)[0] : window,
      W = e ? v(e)[0] : document.documentElement,
      x = !1,
      O = {},
      y = [];
    function t() {
      y = v(L.targets || "[data-scroll]", v(L.scope || W)[0]).map(function (e) {
        return { element: e };
      });
    }
    function n() {
      var e = W.clientWidth,
        t = W.clientHeight,
        n = T(-P + (P = W.scrollLeft || window.pageXOffset)),
        r = T(-_ + (_ = W.scrollTop || window.pageYOffset)),
        i = W.scrollLeft / (W.scrollWidth - e || 1),
        o = W.scrollTop / (W.scrollHeight - t || 1);
      (x = x || O.scrollDirX !== n || O.scrollDirY !== r || O.scrollPercentX !== i || O.scrollPercentY !== o), (O.scrollDirX = n), (O.scrollDirY = r), (O.scrollPercentX = i), (O.scrollPercentY = o);
      for (var l, c = !1, s = 0; s < y.length; s++) {
        for (var f = y[s], u = f.element, a = u, d = 0, v = 0; (d += a.offsetLeft), (v += a.offsetTop), (a = a.offsetParent) && a !== A; );
        var h = u.clientHeight || u.offsetHeight || 0,
          m = u.clientWidth || u.offsetWidth || 0,
          g = (S(d + m, P, P + e) - S(d, P, P + e)) / m,
          p = (S(v + h, _, _ + t) - S(v, _, _ + t)) / h,
          w = 1 === g ? 0 : T(d - P),
          X = 1 === p ? 0 : T(v - _),
          Y = S((P - (m / 2 + d - e / 2)) / (e / 2), -1, 1),
          b = S((_ - (h / 2 + v - t / 2)) / (t / 2), -1, 1),
          D = void 0;
        D = L.offset ? (N(L.offset, u, f, W) > _ ? 0 : 1) : (N(L.threshold, u, f, W) || 0) < g * p ? 1 : 0;
        var E = f.visible !== D;
        (f._changed || E || f.visibleX !== g || f.visibleY !== p || f.index !== s || f.elementHeight !== h || f.elementWidth !== m || f.offsetX !== d || f.offsetY !== v || f.intersectX != f.intersectX || f.intersectY != f.intersectY || f.viewportX !== Y || f.viewportY !== b) && ((c = !0), (f._changed = !0), (f._visibleChanged = E), (f.visible = D), (f.elementHeight = h), (f.elementWidth = m), (f.index = s), (f.offsetX = d), (f.offsetY = v), (f.visibleX = g), (f.visibleY = p), (f.intersectX = w), (f.intersectY = X), (f.viewportX = Y), (f.viewportY = b), (f.visible = D));
      }
      H ||
        (!x && !c) ||
        ((l = C),
        z.push(l),
        F(),
        (H = function () {
          !(z = z.filter(function (e) {
            return e !== l;
          })).length &&
            q &&
            (cancelAnimationFrame(q), (q = 0));
        }));
    }
    function C() {
      u(), x && ((x = !1), h(W, { scrollDirX: O.scrollDirX, scrollDirY: O.scrollDirY }), f(W, O), s(W, O, y));
      for (var e = y.length - 1; -1 < e; e--) {
        var t = y[e],
          n = t.element,
          r = t.visible,
          i = n.hasAttribute("scrollout-once") || !1;
        t._changed && ((t._changed = !1), f(n, t)), t._visibleChanged && (h(n, { scroll: r ? "in" : "out" }), o(n, t, W), (r ? c : l)(n, t, W)), r && (L.once || i) && y.splice(e, 1);
      }
    }
    function u() {
      H && (H(), (H = void 0));
    }
    t(), n(), C();
    var r = 0,
      a = function () {
        r =
          r ||
          setTimeout(function () {
            (r = 0), n();
          }, 0);
      };
    return (
      window.addEventListener("resize", a),
      A.addEventListener("scroll", a),
      {
        index: t,
        update: n,
        teardown: function () {
          u(), window.removeEventListener("resize", a), A.removeEventListener("scroll", a);
        },
      }
    );
  };
})();
