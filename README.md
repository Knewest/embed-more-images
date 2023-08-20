# Locally Embed More Images Fix:

<p>Take your Discord image-viewing experience to another level with the Embed More Images plugin. By automatically detecting and embedding a wider range of image formats such as this plugin dramatically enhances the user experience for the regular person and especially for developers.<br><br> <b>IMPORTANT:</b> Files will only embed locally. Users without the plugin will not see the preview.
<br><br><a href="https://cdn.discordapp.com/attachments/753561208073879642/1134847376541106176/output_animation8.webp"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1134847376541106176/output_animation8.webp" alt="Showcasing Embed More Images" style="cursor:pointer;"/></a><br><sub>The GFX in this example is by me (Knew). You can get the source <a href="https://twitter.com/KnewestLSEP/status/1680420950867869696">here</a>.</sub><p>
<a href="https://github.com/Knewest/embed-more-images/releases"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110739988712271873/DownloadButtonFromGithub.webp" alt="Download from GitHub" style="cursor:pointer;"/></a> 
<a href="https://betterdiscord.app/Download?id=1000"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110738604780691616/DownloadButtonLatestVersion.webp" alt="Download the latest version" style="cursor:pointer;"/></a>
<br>This plugin is compatible with BetterDiscord only. I do not plan to make a console friendly version.

## Discord Format Compatibility Chart:

Here is a table listing all the image formats Discord currently supports and that the Embed More Images plugin enhances or adds support for:

|<sub>**Image Codec:**</sub>|<sub>**Supported Extensions by Discord:**</sub>|<sub>**Support with Embed More Images:**</sub>|<sub>**Notes:**</sub>|
|:---:|:---:|:---:|:---:|
|**PNG**|`*.png`|`*.png`|Nothing noteworthy.|
|**JPEG 1**|`*.jpg`, `*.jpeg`|`*.jpg`, `*.jpeg`, `*.jpe`, `*.jfif`, `*.jif`, `*.jfi`|Discord can but will not support these very common extentions of JPEG 1.<br>I don't know why.|
|**WebP**|`*.webp`|`*.webp`|Although Discord will embed WebP, they will only embed static WebP-- for whatever reason, Discord can but won't support sequenced WebP. My guess is their concern for CPU usage.<br>Regardless, Embed More Images will embed sequenced WebP.|
|**APNG**|None.|`*.apng`, `*.png`|Discord used to embed the first frame of APNG files in a `*.png` extention without stripping all APNG data, but Discord completely disabled and broke APNG support when they addressed the infamous 'acropalypse' vulnerbility.<br>Embed More Images will embed these formats, but with limited functionality because of Discord.<br><sub>Learn more: https://en.wikipedia.org/wiki/ACropalypse</sub>|
|**BMP**|None.|`*.bmp`, `*.dib`, `*.rle`|Discord can but will not support this format.<br>I don't know why.|
|**ICO**|None.|`*.ico`|Discord can but will not support this format. It's based off of BMP.|
|**CUR**|None.|`*.cur`|Discord can but will not support this format. It's based off of BMP.|
|**AVIF**|None.|`*.avif`|Discord can but will not support this format.<br>I don't know why.|
|**JPEG XL**|None.|None.|Because Discord runs on Electron - which is Chromium based - we unfortunately lack JPEG XL support because Google backed out in supporting JPEG XL.<br><sub>Learn more: https://bugs.chromium.org/p/chromium/issues/detail?id=1178058#c406</sub>|
|**SVG**|None.|`*.svg`|Discord can but doesn't support the embedding of SVG, most likely due to believed security risks. SVG support will be added in a future version on this plugin as an option.|
|**HEIF**|None.|None.|Currently, if you attempt to post a `*.heic` on mobile, it will be automatically converted to a JPEG 1 in a `*.jpg` container. HEIF is not supported at all.|

<br>

### Final Comments:
I hope I can deprecate this plugin one day, but I have a feeling it will be a very long time till Discord decides to support these formats.

----------------------------------------------------

### Help:
Need help? Join the [support server](https://discord.gg/NqqqzajfK4) (NqqqzajfK4).

----------------------------------------------------

### Simplifying BetterDiscord:
For a guide on making BetterDiscord easier to install and use, check out this link: https://gist.github.com/Knewest/ee59d3960e18e6d813c9221b54b36ab1 <br>
<sub>If you find this challenging, please follow the regular installation procedure: https://betterdiscord.app/</sub>
