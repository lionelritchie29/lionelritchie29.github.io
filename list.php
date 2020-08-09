<?php
require 'db/connect.php';

$query = "select * from list";

$res = $conn->query($query);
$trainee = [];

while ($row = $res->fetch_assoc()) {
    $trainee[] = $row;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="list-container">
        <table class="list">
            <thead>
                <tr>
                    <th>No. </th>
                    <th>Trainee</th>
                    <th>Room In</th>
                    <th>Rest Out</th>
                    <th>Rest In</th>
                    <th>Room Out</th>
                </tr>
            </thead>
            <tbody>
                <form action="update-list.php" method="post">
                    <?php foreach ($trainee as $t) : ?>
                        <tr>
                            <td><?= $t['id'] ?></td>
                            <td><?= $t['trainee'] ?></td>
                            <td>
                                <input type="checkbox" name="room-in-<?= $t['id'] ?>" <?php if ($t['room_in'] == 1) echo 'checked' ?> value="<?= $t['room_in'] ?>">
                            </td>
                            <td>
                                <input type="checkbox" name="rest-out-<?= $t['id'] ?>" <?php if ($t['rest_out'] == 1) echo 'checked' ?> value="<?= $t['rest_out'] ?>">

                            </td>
                            <td>
                                <input type="checkbox" name="rest-in-<?= $t['id'] ?>" <?php if ($t['rest_in'] == 1) echo 'checked' ?> value="<?= $t['rest_in'] ?>">

                            </td>
                            <td>

                                <input type="checkbox" name="room-out-<?= $t['id'] ?>" <?php if ($t['room_out'] == 1) echo 'checked' ?> value="<?= $t['room_out'] ?>">

                            </td>
                        </tr>
                    <?php endforeach; ?>
                    <input class="save-btn" type="submit" name="action" value="Save">
                    <input class="reset-btn" type="submit" name="action" value="Reset">
                </form>
            </tbody>
        </table>
    </div>
</body>

</html>