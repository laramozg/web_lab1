<?php
session_start();
$startTime = microtime(true);
date_default_timezone_set("Europe/Moscow");
$time = date("Y-m-d H:i:s");
$x = $_POST['X'];
$y = (float)$_POST['Y'];
$r = $_POST['R'];
if (checkValue($x, $y, $r)) {
    $point = checkPoint($x, $y, $r);
    $benchmark = round(microtime(true) - $startTime, 7) * 1000;
    $answer = array($x, $y, $r, $point, $time, $benchmark);
    $_SESSION['result'][] = $answer;
    require_once "Result.php";
    drawResult($answer);
} else {
    http_response_code(400);
    echo "Ошибка валидации";
}

function checkValue($x, $y, $r): bool
{
    return is_numeric($y) && $y <= 5 && $y >= -5 && in_array($x, array(-5, -4, -3, -2, -1, 0, 1, 2, 3)) && in_array($r, array(1, 2, 3, 4, 5));
}

function checkPoint($x, $y, $r): string
{
    if (($x >= -$r) && ($y <= $r) && ($x <= 0) && ($y >= 0)) {
        return 'true';
    }
    if (($x >= 0) && ($y <= 0) && (($x / 2) * ($x /2) + ($y / 2) * ($y / 2) <= ($r * $r) / 4)) {
        return 'true';
    }
    if (($x <= 0) && ($y <= 0) && ($y/2 >= -$x - $r)) {
        return 'true';
    }
    return 'false';
}