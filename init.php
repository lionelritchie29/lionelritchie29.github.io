<?php
require './db/connect.php';

$conn->query("drop table if exists list");

if ($conn->error)
    echo "<br>" . $conn->error . "<br>";

$conn->query("
    create table if not exists list(
        id int auto_increment,
        trainee char(4) check (trainee like 'T[0-9][0-9][0-9]'),
        room_in bit not null default 0,
        room_out bit not null default 0,
        rest_in bit not null default 0,
        rest_out bit not null default 0,

        primary key(id, trainee)
    )
");

if ($conn->error)
    echo "<br>" . $conn->error . "<br>";

$query = "
        INSERT INTO list(trainee)
        VALUES
        ('T031'),
        ('T035'),
        ('T040'),
        ('T044'),
        ('T048'),
        ('T057'),
        ('T059'),
        ('T082'),
        ('T084'),
        ('T088'),
        ('T089'),
        ('T116')
    ";

$conn->query($query);

if ($conn->error)
    echo $conn->error;
else
    echo "Success";