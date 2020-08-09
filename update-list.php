<?php

require './db/connect.php';

if ($_POST['action'] === "Reset") {
    $conn->query("
        update list
        set
            room_in = 0,
            room_out = 0,
            rest_in = 0,
            rest_out = 0
    ");
} else {
    $COUNT = 12;

    for ($i = 1; $i <= 12; $i++) {
        if (isset($_POST["room-in-" . $i])) {
            $query = "UPDATE list SET room_in=1 WHERE id=$i";
            $conn->query($query);
        } else {
            $query = "UPDATE list SET room_in=0 WHERE id=$i";
            $conn->query($query);
        }

        if (isset($_POST["rest-out-" . $i])) {
            $query = "UPDATE list SET rest_out=1 WHERE id=$i";
            $conn->query($query);
        } else {
            $query = "UPDATE list SET rest_out=0 WHERE id=$i";
            $conn->query($query);
        }

        if (isset($_POST["rest-in-" . $i])) {
            $query = "UPDATE list SET rest_in=1 WHERE id=$i";
            $conn->query($query);
        } else {
            $query = "UPDATE list SET rest_in=0 WHERE id=$i";
            $conn->query($query);
        }

        if (isset($_POST["room-out-" . $i])) {
            $query = "UPDATE list SET room_out=1 WHERE id=$i";
            $conn->query($query);
        } else {
            $query = "UPDATE list SET room_out=0 WHERE id=$i";
            $conn->query($query);
        }
    }
}

header("Location: list.php");
