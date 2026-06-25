Add-Type -AssemblyName System.Drawing

$bgDir = "c:\Users\sharm\OneDrive\Desktop\ONGOING\shinova\public\backgrounds"
$thumbDir = Join-Path $bgDir "thumbnails"

if (-not (Test-Path $thumbDir)) {
    New-Item -ItemType Directory -Path $thumbDir | Out-Null
}

$files = Get-ChildItem -Path $bgDir -Filter "*.jpg"
foreach ($file in $files) {
    $srcPath = $file.FullName
    $destPath = Join-Path $thumbDir $file.Name
    
    # Skip if thumbnail already exists and is newer than source
    if ((Test-Path $destPath) -and ((Get-Item $destPath).LastWriteTime -ge $file.LastWriteTime)) {
        Write-Host "Skipping $($file.Name) (up to date)"
        continue
    }
    
    Write-Host "Creating thumbnail for $($file.Name)..."
    try {
        $bmp = [System.Drawing.Image]::FromFile($srcPath)
        
        # Calculate size (width = 180px, maintain aspect ratio)
        $newWidth = 180
        $newHeight = [int]($bmp.Height * ($newWidth / $bmp.Width))
        
        $thumbnail = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($thumbnail)
        
        # Set quality settings
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Draw image
        $g.DrawImage($bmp, 0, 0, $newWidth, $newHeight)
        
        # Save thumbnail (standard JPEG)
        $thumbnail.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        # Clean up
        $g.Dispose()
        $thumbnail.Dispose()
        $bmp.Dispose()
    }
    catch {
        Write-Error "Failed to process $($file.Name): $_"
    }
}
Write-Host "All thumbnails generated successfully!"
