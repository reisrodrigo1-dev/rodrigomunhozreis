# Regenera todos os .zip das skills a partir do repositório engenho-skills.
# - Gera 1 .zip por skill (pasta) + engenho-skills.zip (suíte completa).
# - Exclui .git / .gitignore / arquivos de controle.
# - Saída: assets/skills/ (pasta PRIVADA, fora de public/ — servida via /api/skill).
#
# Uso: pwsh scripts/gerar-skills-zip.ps1   (ou powershell.exe ...)

$ErrorActionPreference = "Stop"

$source = "C:\Users\Rodrigo Reis\Projetos\engenho-skills"
$repoRoot = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $repoRoot "assets\skills"

if (-not (Test-Path $source)) {
  throw "Repositório de skills não encontrado: $source"
}

# Recria a pasta de destino do zero (apaga zips antigos).
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Itens que nunca entram nos zips.
$skip = @(".git", ".gitignore", "README.md")

# Pastas de skill = todo diretório no source que não está na lista de skip.
$skillDirs = Get-ChildItem -Path $source -Directory | Where-Object { $skip -notcontains $_.Name }

Write-Host "Gerando $($skillDirs.Count) skills individuais em $dest ..."

foreach ($dir in $skillDirs) {
  $zipPath = Join-Path $dest "$($dir.Name).zip"
  # Compacta o CONTEÚDO da pasta da skill (a própria pasta vira a raiz no zip).
  Compress-Archive -Path (Join-Path $dir.FullName "*") -DestinationPath $zipPath -Force
  Write-Host "  ok  $($dir.Name).zip"
}

# Suíte completa: todas as pastas de skill num único zip (sem .git/.gitignore/README).
$suitePath = Join-Path $dest "engenho-skills.zip"
$suiteInputs = $skillDirs | ForEach-Object { $_.FullName }
Compress-Archive -Path $suiteInputs -DestinationPath $suitePath -Force
Write-Host "  ok  engenho-skills.zip (suíte completa)"

$count = (Get-ChildItem -Path $dest -Filter *.zip).Count
Write-Host "Concluído: $count arquivos .zip em $dest"
