# PowerShell script to update nav bars across the smART-Hub-Website
# Uses Figma-style div approach with inline styles

function Replace-NavContent {
    param(
        [string]$FilePath,
        [string]$OldText,
        [string]$NewText
    )
    
    $content = [System.IO.File]::ReadAllText($FilePath)
    
    if ($content.Contains($OldText)) {
        $content = $content.Replace($OldText, $NewText)
        [System.IO.File]::WriteAllText($FilePath, $content)
        Write-Host "SUCCESS: Updated $FilePath"
    } else {
        Write-Host "SKIPPED (not found): $FilePath"
    }
}

$root = "c:\Users\Admin\Documents\GitHub\smART-Hub-Website"

# ---- 1. index.html (Home page) ----
Write-Host "`n=== 1. Home page (index.html) ==="
$oldNav1 = '<nav class="header-nav"><a href="#" class="nav-link">News</a><a href="#" class="nav-link">About SHLL</a></nav>'
$newNav1 = '<nav class="header-nav"><a href="#" style="text-decoration: none;"><div data-layer="News" class="News" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">News</div></a><a href="pages/about.html" style="text-decoration: none;"><div data-layer="About SHLL" class="AboutShll" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">About SHLL</div></a></nav>'
Replace-NavContent -FilePath "$root\index.html" -OldText $oldNav1 -NewText $newNav1

# ---- 2. package-1/index.html ----
Write-Host "`n=== 2. Package 1 (index.html) ==="
$oldNav2 = @"
        <nav class="header-nav">
            <a href="../../index.html" class="nav-link">Home</a>
            <a href="#" class="nav-link">News</a>
            <a href="#" class="nav-link">About SHLL</a>
        </nav>
"@
$newNav2 = '        <nav class="header-nav"><a href="../../index.html" style="text-decoration: none;"><div data-layer="Home" class="Home" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">Home</div></a><a href="#" style="text-decoration: none;"><div data-layer="News" class="News" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">News</div></a><a href="../../pages/about.html" style="text-decoration: none;"><div data-layer="About SHLL" class="AboutShll" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">About SHLL</div></a></nav>'
Replace-NavContent -FilePath "$root\pages\package-1\index.html" -OldText $oldNav2 -NewText $newNav2

# ---- 3. package-2/index.html — add nav after header-top-frame ----
Write-Host "`n=== 3. Package 2 index (add nav) ==="
$oldPkg2 = '        </div>
    </div>'
$newPkg2Header = @"
        </div>
        <nav class="header-nav" style="display: flex; justify-content: flex-end; gap: 2px; align-items: center; padding: 3px 0 0;"><a href="../../index.html" style="text-decoration: none;"><div data-layer="Home" class="Home" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">Home</div></a><a href="#" style="text-decoration: none;"><div data-layer="News" class="News" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">News</div></a><a href="../../pages/about.html" style="text-decoration: none;"><div data-layer="About SHLL" class="AboutShll" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">About SHLL</div></a></nav>
    </div>
"@
# Read the package-2 index
$pkg2Path = "$root\pages\package-2\index.html"
$pkg2Content = [System.IO.File]::ReadAllText($pkg2Path)
# Find the specific closing of header-top-frame followed by header-wrapper close
$pkg2Old = "        </div>`r`n    </div>`r`n`r`n    <section class=""hero-section"""
$pkg2New = @"
        </div>
        <nav class="header-nav" style="display: flex; justify-content: flex-end; gap: 2px; align-items: center; padding: 3px 0 0;"><a href="../../index.html" style="text-decoration: none;"><div data-layer="Home" class="Home" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">Home</div></a><a href="#" style="text-decoration: none;"><div data-layer="News" class="News" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">News</div></a><a href="../../pages/about.html" style="text-decoration: none;"><div data-layer="About SHLL" class="AboutShll" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">About SHLL</div></a></nav>
    </div>

    <section class="hero-section"
"@
if ($pkg2Content.Contains($pkg2Old)) {
    $pkg2Content = $pkg2Content.Replace($pkg2Old, $pkg2New)
    [System.IO.File]::WriteAllText($pkg2Path, $pkg2Content)
    Write-Host "SUCCESS: Updated $pkg2Path"
} else {
    Write-Host "SKIPPED (not found): $pkg2Path - trying alt pattern"
    # Try without \r\n
    $pkg2Old2 = "        </div>`n    </div>`n`n    <section class=""hero-section"""
    if ($pkg2Content.Contains($pkg2Old2)) {
        $pkg2Content = $pkg2Content.Replace($pkg2Old2, $pkg2New)
        [System.IO.File]::WriteAllText($pkg2Path, $pkg2Content)
        Write-Host "SUCCESS (alt): Updated $pkg2Path"
    } else {
        Write-Host "FAILED: Could not find pattern in $pkg2Path"
    }
}

# ---- 4-8. Package 2 sub-pages ----
# These all have the same old nav pattern with Home, Back, About SHLL
$subPages = @(
    @{File="spatial-assessment.html"; Line=345},
    @{File="research.html"; Line=277},
    @{File="passive-interventions.html"; Line=293},
    @{File="landscape-design.html"; Line=281},
    @{File="architectural-layout.html"; Line=179}
)

$oldSubNav = '<nav class="header-nav"><a href="../../index.html" class="nav-link">Home</a><a href="index.html" class="nav-link">Back</a><a href="#" class="nav-link">About SHLL</a></nav>'
$newSubNav = '<nav class="header-nav"><a href="../../index.html" style="text-decoration: none;"><div data-layer="Home" class="Home" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">Home</div></a><a href="index.html" style="text-decoration: none;"><div data-layer="Back" class="Back" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">Back</div></a><a href="../../pages/about.html" style="text-decoration: none;"><div data-layer="About SHLL" class="AboutShll" style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 25px; font-family: Inter; font-weight: 400; line-height: 36.25px; word-wrap: break-word">About SHLL</div></a></nav>'

foreach ($page in $subPages) {
    $idx = $subPages.IndexOf($page) + 4
    Write-Host "`n=== $idx. Package 2 / $($page.File) ==="
    $filePath = "$root\pages\package-2\$($page.File)"
    Replace-NavContent -FilePath $filePath -OldText $oldSubNav -NewText $newSubNav
}

Write-Host "`n=== All done! ==="
