<?php

session_start();
$conn = mysqli_connect("mymysql.senecacollege.ca", "prj666_201a06", "rfLG@8559", "prj666_201a06");

// Check connection
if (!$conn)
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($conn,"SELECT * FROM Category");

echo "<table border='1'>
<tr>
<th>Category</th>

</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['cat_name'] . "</td>";
echo "</tr>";
}
echo "</table>";

mysqli_close($conn);
?>