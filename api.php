<?php
require 'config.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action == 'create') {
  $title = $_POST['title'];
  $desc  = $_POST['description'];
  mysqli_query($conn, "INSERT INTO tasks (title, description) VALUES ('$title', '$desc')");
  echo "created";
}

if ($action == 'read') {
  $result = mysqli_query($conn, "SELECT * FROM tasks ORDER BY id DESC");
  $tasks = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
  }
  echo json_encode($tasks);
}

if ($action == 'update') {
  $id     = $_POST['id'];
  $title  = $_POST['title'];
  $desc   = $_POST['description'];
  $status = in_array($_POST['status'], ['pending', 'on-going', 'completed']) ? $_POST['status'] : 'pending';
  mysqli_query($conn, "UPDATE tasks SET title='$title', description='$desc', status='$status' WHERE id=$id");
  echo "updated";
}

if ($action == 'delete') {
  $id = $_POST['id'];
  mysqli_query($conn, "DELETE FROM tasks WHERE id=$id");
  echo "deleted";
}
?>
