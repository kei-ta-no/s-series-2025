<?php
if($_POST) {
    $post = $_POST;

    /* 必須 */
    //お名前*
    $name = htmlspecialchars($post["contact-name"], ENT_QUOTES, "UTF-8");

    //郵電話号*
    $postalcode = htmlspecialchars($post["contact-postalcode"], ENT_QUOTES, "UTF-8");

    //住所*
    $address = htmlspecialchars($post["contact-address"], ENT_QUOTES, "UTF-8");

    //メールアドレス*
    $email = htmlspecialchars($post["contact-email"], ENT_QUOTES, "UTF-8");

    //電話話号*
    $tel = htmlspecialchars($post["contact-tel"], ENT_QUOTES, "UTF-8");

    // 管理者メールアドレス設定
    // ,区切りで複数設定可能 例) $tos = "test01@test.com,test02@test.com";
    $tos = "test@test.com";

    // 管理者宛てメールタイトル
    $subject = "継ぐ家よりお問い合わせがありました。";

    // 管理者宛てメール本文
    $message = <<<EOM
    継ぐ家より、以下の内容でお問い合わせがありました。

    【お名前】
    $name

    【住所】
    〒$postalcode
    $address
    
    【メールアドレス】
    $email

    【電話番号】
    $tel

EOM;

    // 送信元メールアドレス設定
    $headers = "From: test@test.com";

    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    $to_arr = explode(",", $tos);

    //管理者宛てに送信
    foreach($to_arr as $to) {
        if (!mb_send_mail($to, $subject, $message, $headers)) {
            echo "fail";
        }
    }

    /**
     * ------------------------
     */

    // お客様宛のメールアドレス
    $to_customer = $email;

    // お客様宛のメールタイトル
    $subject_customer = "お問い合わせありがとうございます。【xxxx株式会社】";

    // お客様宛の本文
    $message_customer = <<<EOM
    ※このメールはシステムからの自動返信です。

    $name 様
    この度は、お問い合わせいただきありがとうございます。

    以下の内容でお問い合わせ受付いたしました。

    改めて担当者よりご連絡いたしますので、
    今しばらくお待ちくださいませ。

    お急ぎの場合は、お手数ではございますが
    お電話にてご連絡いただきますようお願いいたします。

    TEL.0120-501-899

    ━━━━━━□■□　お問い合わせ内容　□■□━━━━━━

    【お名前】
    $name

    【住所】
    〒$postalcode
    $address

    【メールアドレス】
    $email

    【電話番号】
    $tel

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    xxxxx株式会社
    〒xxx-xxxx 住所住所住所
    TEL.xxxx-xxx-xxx

    [営業時間] 9:00～17:00
    [定休日] 水曜日・祝日

EOM;

    // 送信元アドレス設定
    $headers_customer = "From: test@test.com";

    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    // お客様宛てメール送信
    if (mb_send_mail($email, $subject_customer, $message_customer, $headers_customer)) {
        $response = "success";
    } else {
        $response = "fail";
    }

    echo json_encode($response);
} else {
    header("Location: ../");
}
?>