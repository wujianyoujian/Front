$input_data = $input | Out-String
$json = $input_data | ConvertFrom-Json

$cwd = $json.cwd
$model = $json.model.display_name
$used_pct = $json.context_window.used_percentage
$branch = git -C "$cwd" --no-optional-locks rev-parse --abbrev-ref HEAD 2>$null

if ($null -ne $used_pct) {
    $ctx_seg = "ctx:{0:0}%" -f [double]$used_pct
} else {
    $ctx_seg = "ctx:--"
}

if ($branch) {
    $git_seg = "[$branch]"
} else {
    $git_seg = ""
}

Write-Output "$cwd  $model  $ctx_seg  $git_seg"
