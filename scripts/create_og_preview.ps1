Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# 1. Background: Warm Luxury Ivory
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 247, 242))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Outer & Inner Gold Borders
$goldColor = [System.Drawing.Color]::FromArgb(201, 168, 76)
$goldPenOuter = New-Object System.Drawing.Pen($goldColor, 2)
$goldPenInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 201, 168, 76), 1)
$goldPenInner.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash

$g.DrawRectangle($goldPenOuter, 20, 20, $width - 40, $height - 40)
$g.DrawRectangle($goldPenInner, 28, 28, $width - 56, $height - 56)

# 3. Load Couple Photo (couple-1.jpg)
$couplePath = (Resolve-Path "public/images/couple-1.jpg").Path
$coupleImg = [System.Drawing.Image]::FromFile($couplePath)

# Place couple photo on the right side: X: 640 to 1130, Y: 48 to 582 (Width: 490, Height: 534)
$photoX = 640
$photoY = 48
$photoW = 490
$photoH = 534

# Crop couple photo to fit photoW x photoH centered nicely
$srcW = $coupleImg.Width
$srcH = $coupleImg.Height

# We want couple centered (around 45% Y where their faces/torso are)
$cropAspect = $photoW / $photoH
$cropW = $srcW
$cropH = [int]($srcW / $cropAspect)
if ($cropH -gt $srcH) {
    $cropH = $srcH
    $cropW = [int]($srcH * $cropAspect)
}
$srcX = [int](($srcW - $cropW) / 2)
$srcY = [int](($srcH - $cropH) * 0.40) # focus on couple
if ($srcY -lt 0) { $srcY = 0 }
if (($srcY + $cropH) -gt $srcH) { $srcY = $srcH - $cropH }

$srcRect = New-Object System.Drawing.Rectangle($srcX, $srcY, $cropW, $cropH)
$destRect = New-Object System.Drawing.Rectangle($photoX, $photoY, $photoW, $photoH)

# Draw photo
$g.DrawImage($coupleImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Gold border around photo
$photoBorderPen = New-Object System.Drawing.Pen($goldColor, 3)
$g.DrawRectangle($photoBorderPen, $photoX, $photoY, $photoW, $photoH)
$photoInnerBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 255, 255, 255), 1)
$g.DrawRectangle($photoInnerBorder, $photoX + 4, $photoY + 4, $photoW - 8, $photoH - 8)

# 4. Left Side: Wedding Invitation Details
# Seal circle: Center at (330, 115), Radius: 42
$sealCenterX = 330
$sealCenterY = 110
$sealR = 42
$sealRect = New-Object System.Drawing.Rectangle(($sealCenterX - $sealR), ($sealCenterY - $sealR), ($sealR * 2), ($sealR * 2))
$sealBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255))
$g.FillEllipse($sealBrush, $sealRect)
$sealPenOuter = New-Object System.Drawing.Pen($goldColor, 2)
$g.DrawEllipse($sealPenOuter, $sealRect)
$sealPenInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 201, 168, 76), 1)
$sealPenInner.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$sealInnerRect = New-Object System.Drawing.Rectangle(($sealCenterX - $sealR + 4), ($sealCenterY - $sealR + 4), (($sealR - 4) * 2), (($sealR - 4) * 2))
$g.DrawEllipse($sealPenInner, $sealInnerRect)

# Monogram "J & S"
$fontSeal = New-Object System.Drawing.Font("Georgia", 20, [System.Drawing.FontStyle]::Bold)
$navyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(13, 27, 42))
$goldBrush = New-Object System.Drawing.SolidBrush($goldColor)
$charcoalBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(65, 90, 119))

$sfCenter = New-Object System.Drawing.StringFormat
$sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
$sfCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

$g.DrawString("J & S", $fontSeal, $navyBrush, $sealCenterX, $sealCenterY, $sfCenter)

# Subtitle: "WEDDING INVITATION"
$fontTag = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
$g.DrawString("W E D D I N G   I N V I T A T I O N", $fontTag, $goldBrush, $sealCenterX, 185, $sfCenter)

# Divider line
$g.DrawLine($goldPenOuter, 180, 205, 480, 205)

# Couple Names
$fontName = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Jithin", $fontName, $navyBrush, $sealCenterX, 255, $sfCenter)

$fontAnd = New-Object System.Drawing.Font("Georgia", 24, [System.Drawing.FontStyle]::Italic)
$g.DrawString("&", $fontAnd, $goldBrush, $sealCenterX, 310, $sfCenter)

$g.DrawString("Sreelakshmi", $fontName, $navyBrush, $sealCenterX, 365, $sfCenter)

# Divider line
$g.DrawLine($goldPenOuter, 180, 420, 480, 420)

# Date & Details
$fontDate = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)
$g.DrawString("SUNDAY, 25 OCTOBER 2026", $fontDate, $navyBrush, $sealCenterX, 455, $sfCenter)

$fontSangeeth = New-Object System.Drawing.Font("Georgia", 13, [System.Drawing.FontStyle]::Italic)
$g.DrawString("Sangeeth: 24 Oct | Wedding Ceremony: 25 Oct", $fontSangeeth, $charcoalBrush, $sealCenterX, 490, $sfCenter)

# Website URL badge at bottom left
$fontUrl = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Regular)
$g.DrawString("jithin-sreelakshmi-invitation.vercel.app", $fontUrl, $goldBrush, $sealCenterX, 545, $sfCenter)

# Save image as JPEG (high quality)
$outputPath = (Resolve-Path "public/images").Path + "\og-preview.jpg"
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$bmp.Save($outputPath, $codec, $encoderParams)
$coupleImg.Dispose()
$bmp.Dispose()
$g.Dispose()

Write-Host "Generated OpenGraph preview at: $outputPath"
