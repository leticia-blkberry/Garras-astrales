<?php
/**
 * Contact form handler for SiteGround (or any PHP host).
 *
 * SET THESE TWO ADDRESSES before going live:
 *   $TO   - where messages are delivered (any inbox).
 *   $FROM - must be an address on YOUR domain (e.g. website@garrasastrales.org),
 *           created in SiteGround Site Tools > Email > Accounts. Mail sent "from"
 *           other domains is likely to land in spam.
 */
$TO   = 'hello@example.org';
$FROM = 'website@example.org';

$wantsJson = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

function respond($ok, $message, $wantsJson) {
    if ($wantsJson) {
        http_response_code($ok ? 200 : 400);
        header('Content-Type: application/json');
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        header('Location: contact.html?' . ($ok ? 'sent=1' : 'error=1'));
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Honeypot: real people never see or fill this field; bots usually do.
if (!empty($_POST['website'])) {
    respond(true, 'Thanks! Your message has been sent.', $wantsJson);
}

// Reject submissions made faster than a human could type them.
$started = isset($_POST['started']) ? (int) $_POST['started'] : 0;
if ($started > 0 && (time() * 1000 - $started) < 3000) {
    respond(true, 'Thanks! Your message has been sent.', $wantsJson);
}

function clean($key, $max) {
    $v = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

$name    = clean('name', 100);
$email   = clean('email', 200);
$topic   = clean('topic', 100);
$subject = clean('subject', 150);
$message = clean('message', 5000);

// Header fields must be single-line to prevent header injection.
$name    = str_replace("\n", ' ', $name);
$subject = str_replace("\n", ' ', $subject);
$topic   = str_replace("\n", ' ', $topic);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please fill in your name, a valid email, and a message.', $wantsJson);
}

$mailSubject = '[Website] ' . ($subject !== '' ? $subject : $topic);
$body = "Name: $name\nEmail: $email\nTopic: $topic\nSubject: $subject\n\n$message\n";

$headers = [
    'From: Garras Astrales Website <' . $FROM . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($TO, '=?UTF-8?B?' . base64_encode($mailSubject) . '?=', $body, implode("\r\n", $headers));

respond(
    $sent,
    $sent ? "Thanks, $name! Your message has been sent. A volunteer will get back to you soon."
          : 'Sorry, something went wrong sending your message. Please email us directly.',
    $wantsJson
);
