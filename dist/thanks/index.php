<?php
session_start();
$post = $_POST;
if(!empty($_SESSION["send"])) {
    header("Location: /");
    exit;
} else {
    send($post);
    $_SESSION["send"] = 2;
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
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

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
            <h2 class="pContact__heading">ご相談予約(完了)</h2>
            <div class="pThanks">
                <h2 class="pThanks__heading">ご相談予約<br class="isSp" />を受け付けました</h2>
                <p class="pThanks__text">ご入力いただきましたメールアドレス宛てに<br
                        class="is-pc" />自動配信メールが届いておりますのでご確認下さいませ。<br />改めて担当者よりご連絡いたしますので<br
                        class="is-pc" />しばらくお待ちくださいますよう宜しくお願い致します。</p>
            </div>
        </div>
    </main>

    <footer class="lFooter"></footer>
</body>

</html>

<?php
function send($post) {
    $from = "info@check-dev.jp";
    $admins = ["info@check-dev.jp"];

    //お名前*
    $fhomename = htmlspecialchars($post["fhomename"], ENT_QUOTES, "UTF-8");
    $fname01 = htmlspecialchars($post["fname01"], ENT_QUOTES, "UTF-8");
    $fname02 = htmlspecialchars($post["fname02"], ENT_QUOTES, "UTF-8");
    $fyomi01 = htmlspecialchars($post["fyomi01"], ENT_QUOTES, "UTF-8");
    $fyomi02 = htmlspecialchars($post["fyomi02"], ENT_QUOTES, "UTF-8");
    $fmail = htmlspecialchars($post["fmail"], ENT_QUOTES, "UTF-8");
    $ftel = htmlspecialchars($post["ftel"], ENT_QUOTES, "UTF-8");
    $fdate01 = htmlspecialchars($post["fdate01"], ENT_QUOTES, "UTF-8");
    $ftime01 = htmlspecialchars($post["ftime01"], ENT_QUOTES, "UTF-8");
    $fdate02 = htmlspecialchars($post["fdate02"], ENT_QUOTES, "UTF-8");
    $ftime02 = htmlspecialchars($post["ftime02"], ENT_QUOTES, "UTF-8");
    $fcontents = htmlspecialchars($post["fcontents"], ENT_QUOTES, "UTF-8");

    $baseMessage = <<<EOM
【お名前】
$fname01 $fname02

【フリガナ】
$fyomi01 $fyomi02

【メールアドレス】
$fmail

【電話番号】
$ftel

【ご希望日時（第一希望）】
$fdate01 $ftime01

【ご希望日時（第二希望）】
$fdate01 $ftime02

【ご相談内容】
$fcontents
EOM;

// 管理者本文
    $adminSubject = "ホームページよりお問い合わせがありました";
    $adminMessage = <<<EOM
ホームページより、以下の内容でお問い合わせがありました。

━━━━□■□　お問い合わせ内容　□■□━━━━

{$baseMessage}
EOM;

// ユーザー本文
    $userSubject = "お問い合わせありがとうございます";
    $userMessage = <<<EOM
※このメールはシステムからの自動返信です。

$fname01 $fname02 様

この度は、お問い合わせをいただきありがとうございます。
以下の内容でお問い合わせを受付いたしました。
改めて担当者よりご連絡いたしますので、
今しばらくお待ちくださいませ。

━━━━□■□　お問い合わせ内容　□■□━━━━

{$baseMessage}
EOM;

    // 送信準備
    mb_language('uni');
    $headers = "From: {$from}";

    //管理者宛のメール
    foreach($admins as $ad) {
        if (!mb_send_mail($ad, $adminSubject, $adminMessage, $headers)) {
            $result = "miss";
        }
    }

    // お客様宛のメール
    if (!mb_send_mail($fmail, $userSubject, $userMessage, $headers)) {
        $result = "miss";
    } else {
        $result = "ok";
    }
}