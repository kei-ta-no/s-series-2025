<?php
$post = $_POST;
if(empty($post)) {
    header("Location: /");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ja" class="no-js">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#FFF" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="apple-touch-icon" href="./apple-touch-icon.png" />

    <title>#ページタイトル</title>
    <meta name="description" content="#ページ説明" />
    <meta name="keywords" content="#ページキーワード" />
    <meta name="robots" content="max-image-preview:large" />
    <link rel="canonical" href="#pageurl" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="#ページタイトル" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="#ページタイトル" />
    <meta property="og:description" content="#ページ説明" />
    <meta property="og:url" content="#pageurl" />
    <meta property="og:image" content="#ogimage_url" />
    <meta property="og:image:secure_url" content="#ogimage_url" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="#ページタイトル" />
    <meta name="twitter:description" content="#ページ説明" />
    <meta name="twitter:image" content="#ogimage_url" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Noto+Serif+JP:wght@500&family=Oswald:wght@200&family=Zen+Kaku+Gothic+New&display=swap"
        rel="stylesheet" />

    <link rel="stylesheet" crossorigin href="../assets/css/index.css?2128">
    <link rel="stylesheet" crossorigin href="../assets/css/style.css?2128">
    <script type="module" crossorigin src="../assets/js/index.js?2128"></script>
</head>

<body class="lBody">
    <header class="lHeader">
        <div class="pHeader">
            <h1 class="pHeader__logo">
                <picture>
                    <img src="../assets/images/header_logo.webp" alt="T-BOX" />
                </picture>
            </h1>
        </div>
    </header>
    <main class="lMain">
        <div class="pContact isConfirm">
            <h2 class="pContact__heading">ご相談予約(確認)</h2>
            <div class="pContact__form">
                <div class="pContact__form-heading">
                    <div class="pContact__form-icon">
                        <picture>
                            <img src="../assets/images/contact_mail.webp" alt="" />
                        </picture>
                    </div>
                    <h3 class="pContact__form-title">メールフォームはこちら</h3>
                </div>
                <div class="pForm isConfirm">
                    <form action="../thanks/" class="js-form" method="post">
                        <div style="display: none !important; ">
                            <input type="hidden" name="fname01" value="<?php echo $_POST["fname01"]; ?>" />
                            <input type="hidden" name="fname02" value="<?php echo $_POST["fname02"]; ?>" />
                            <input type="hidden" name="fyomi01" value="<?php echo $_POST["fyomi01"]; ?>" />
                            <input type="hidden" name="fyomi02" value="<?php echo $_POST["fyomi02"]; ?>" />
                            <input type="hidden" name="fmail" value="<?php echo $_POST["fmail"]; ?>" />
                            <input type="hidden" name="ftel" value="<?php echo $_POST["ftel"]; ?>" />
                            <input type="hidden" name="fdate01" value="<?php echo $_POST["fdate01"]; ?>" />
                            <input type="hidden" name="ftime01" value="<?php echo $_POST["ftime01"]; ?>" />
                            <input type="hidden" name="fdate02" value="<?php echo $_POST["fdate02"]; ?>" />
                            <input type="hidden" name="ftime02" value="<?php echo $_POST["ftime02"]; ?>" />
                            <textarea name="fcontents"><?php echo $_POST["fcontents"]; ?></textarea>
                        </div>

                        <div class="pForm__contents">
                            <div class="pForm__item">
                                <p class="pForm__title">お名前<span>必須</span></p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fname01"]; ?>　<?php echo $_POST["fname01"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">フリガナ<span>必須</span></p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fyomi01"]; ?>　<?php echo $_POST["fyomi02"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">メールアドレス<span>必須</span></p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fmail"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">電話番号<span>必須</span></p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["ftel"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">ご希望日時<br />第一希望</p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fdate01"]; ?>　<?php echo $_POST["ftime01"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">ご希望日時<br />第二希望</p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fdate02"]; ?>　<?php echo $_POST["ftime02"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pForm__item">
                                <p class="pForm__title">ご相談内容</p>
                                <div class="pForm__row">
                                    <div class="pForm__block">
                                        <p class="pForm__input">
                                            <?php echo $_POST["fcontents"]; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pForm__line"></div>
                        <div class="pForm__submit">
                            <label class="js-submit isBack">
                                <input class="js-form-item" onclick="history.back()" id="back" />
                                <span> 修正する </span>
                            </label>
                            <label class="js-submit">
                                <input class="js-form-item" type="submit" id="thanks" />
                                <span> 送信する </span>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer class="lFooter"></footer>
</body>

</html>