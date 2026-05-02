$c = Get-Content pages/admin-dashboard.html -Raw
$c = $c -replace '<div class="kpi-icon icon-blue">.*?</div>', '<div class="kpi-icon icon-blue"><i data-lucide="clock"></i></div>'
$c = $c -replace '<div class="kpi-icon icon-teal">.*?</div>', '<div class="kpi-icon icon-teal"><i data-lucide="test-tube"></i></div>'
$c = $c -replace '<div class="kpi-icon icon-purple">.*?</div>', '<div class="kpi-icon icon-purple"><i data-lucide="refresh-cw"></i></div>'
$c | Set-Content pages/admin-dashboard.html

$c = Get-Content pages/user-dashboard.html -Raw
$c = $c -replace '<button class="t-play">.*?</button>', '<button class="t-play"><i data-lucide="play"></i></button>'
# Replace checkmarks
$c = $c -replace '<li class="milestone-item">\s*<div class="m-check">.*?</div>', '<li class="milestone-item"><div class="m-check"><i data-lucide="check" style="width: 14px; height: 14px;"></i></div>'
# Replace lock/question mark
$c = $c -replace '<li class="milestone-item locked">\s*<div class="m-check">.*?</div>', '<li class="milestone-item locked"><div class="m-check"><i data-lucide="lock" style="width: 14px; height: 14px;"></i></div>'
$c | Set-Content pages/user-dashboard.html
