/**
* @name Embed More Images
* @author Knew
* @description Locally embeds images that are usually unembedded in the Discord client.
* @version 1.12
* @authorId 332116671294734336
* @authorLink https://github.com/Knewest
* @invite NqqqzajfK4
* @website https://twitter.com/KnewestLSEP
* @source https://github.com/Knewest/embed-more-images
* @updateUrl https://raw.githubusercontent.com/Knewest/embed-more-images/main/EmbedMoreImages.plugin.js
* @changelog {banner} https://betterdiscord.app/resources/thumbnails/1345.png
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/embed-more-images/releases).
* @changelog {added.title} What I changed:
* @changelog {added.item} Updated class names using [this tool by Syndishanx](https://syndishanx.github.io/Website/Update_Classes.html).
* @changelog {footer} Need help? Join my the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
*/

module.exports = class EmbedMoreImages {
	constructor() {
		this.embeddedImages = new Set();
		this.io = null;
		this.containerObserver = null;
		this.observer = null;

		this.settings = {
			enableFormatExtension: true
		};
	}

load() {
	this.settings.enableFormatExtension = BdApi.Data.load("EmbedMoreImages", "enableFormatExtension") || true;
}

unload() {
	BdApi.Data.save("EmbedMoreImages", "enableFormatExtension", this.settings.enableFormatExtension);
}

createHTML(content, classes = "", styles = "") {
	let element = document.createElement('div');
	element.innerHTML = content.trim();
	element.className = classes;
	element.style = styles;
	return element;
}

getSettingsPanel() {
	let panel = this.createHTML(`<h2>General:</h2>`, '', "overflow: auto; padding: 16px; background-color: #36393f; color: #ffffff; font-size: 16px;");
	let header = panel.firstChild;
	header.style = "margin-bottom: 16px; border-bottom: 1px solid #72767d;";

	let checkboxContainer = this.createHTML(`
		<input type="checkbox" id="imgExtension" name="imgExtension" style="margin-right: 8px;">
		<label htmlFor="imgExtension">Enable format extension indicator</label>
	`, "display: flex; align-items: center;");
	
	let checkbox = checkboxContainer.firstChild;
	checkbox.checked = BdApi.Data.load("EmbedMoreImages", "enableFormatExtension");
	checkbox.addEventListener('change', () => {
		this.settings.enableFormatExtension = checkbox.checked; 
		BdApi.Data.save("EmbedMoreImages", "enableFormatExtension", this.settings.enableFormatExtension);
		const extensionDivs = document.querySelectorAll('.imgExtension-EmbedMoreImages');
		extensionDivs.forEach(div => {
			div.style.display = this.settings.enableFormatExtension ? 'block' : 'none';
		});
	});
	panel.appendChild(checkboxContainer);

	return panel;
}

embedImagesInContainer(container) {
	const imgExtensions = ['.webp', '.apng', '.png', '.jpe', '.jfif', '.jif', '.jfi', '.avif', '.bmp', '.dib', '.rle', '.ico', '.cur'].map(ext => [ext, ext.toUpperCase()]).flat();
	const links = container.querySelectorAll('.fileNameLink__0ccae');
	
	const embedImageRecursive = (index) => {
		if (index >= links.length) return;
		const link = links[index];
		const href = link.getAttribute('href');
		const hrefWithoutQuery = href.split(/[?#]/)[0];
		if (imgExtensions.some(ext => hrefWithoutQuery.endsWith(ext))) {
	if (index >= links.length) {
		return;
	}

	const hrefWithoutQuery = href.split(/[?#]/)[0];
	if (imgExtensions.some((ext) => hrefWithoutQuery.endsWith(ext))) {
		const parentContainer = link.closest('.nonMediaAttachmentsContainer__912df');
		if (parentContainer) {
			const existingImages = parentContainer.querySelectorAll('.imageContainer__0f481.imageContainer-EmbedMoreImages.container_b7e1cb .originalLink_af017a');
			for (let i = 0; i < existingImages.length; i++) {
			if (existingImages[i].href === href) {
				embedImageRecursive(index + 1);
				return;
			}
		}
		};
	}

const newContainer = document.createElement('div');
newContainer.className = "imageContainer__0f481 imageContainer-EmbedMoreImages container_b7e1cb";
newContainer.style = "border-radius: 8px; overflow: hidden; position: relative;";
	
	const clickableWrapper = document.createElement('div');
	clickableWrapper.className = "clickableWrapper_af017a";
	clickableWrapper.style = "";
	clickableWrapper.tabIndex = "0";
	clickableWrapper.setAttribute('aria-label', 'Image');
	clickableWrapper.setAttribute('aria-describedby', 'uid_4');
	clickableWrapper.setAttribute('role', 'button');

	newContainer.style.position = 'relative';
	
	const loadingContainer = document.createElement('div');
	loadingContainer.style = "margin-left: 0px; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 375px; height: 100%; display: flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.6); border-radius: 3px;";
	loadingContainer.className = "loadingContainer-EmbedMoreImages";

	const progressBar = document.createElement('div');
	progressBar.style = "position: relative; width: 80%; height: 4px; background-color: #555; border-radius: 2px; overflow: hidden;";
	const progress = document.createElement('div');
	progress.style = "position: absolute; top: 0; left: 0; width: 0%; height: 100%; background-color: #5865F2; transition: width 0.25s;";
	progressBar.appendChild(progress);

	const percentageLabel = document.createElement('span');
	percentageLabel.style = "margin-left: 10px; color: #fff;";
	percentageLabel.textContent = "0%";

	const loadingBar = document.createElement('div');
	loadingBar.className = "loadingBar";
	loadingBar.style = "position: absolute; bottom: 0; left: 0; height: 5px; width: 0%; background-color: #5865F2; transition: width 0.3s;";

	loadingContainer.appendChild(progressBar);
	loadingContainer.appendChild(percentageLabel);
	newContainer.appendChild(loadingBar);	  

let observer = new MutationObserver((mutations) => {
for (let mutation of mutations) {
	if (mutation.type === 'childList') {
	const clickableWrapper = mutation.target.querySelector('.clickableWrapper_af017a');
	if (clickableWrapper) {
const imgExtension = document.createElement('span');
imgExtension.className = "altText-EmbedMoreImages imgExtension-EmbedMoreImages";
	const matchingExtension = imgExtensions.find((ext) => hrefWithoutQuery.endsWith(ext));
		if (matchingExtension) {
		imgExtension.textContent = matchingExtension.slice(1).toUpperCase();
		imgExtension.style.display = this.settings.enableFormatExtension ? 'inline-block' : 'none';
		
		imgExtension.style.fontWeight = '500';
		imgExtension.style.color = 'var(--text-muted)';
		imgExtension.style.fontSize = '12px';
		imgExtension.style.margin = '0.25rem 0 0.1rem';
		imgExtension.style.lineHeight = '16px';
		imgExtension.style.position = 'relative';
		
		clickableWrapper.appendChild(imgExtension);
		}
		observer.disconnect();
		return;
	}
	}
}
});


observer.observe(newContainer, {childList: true});


container.appendChild(newContainer); 

const linkElm = document.createElement('a');
	linkElm.className = "originalLink_af017a";
	linkElm.href = href;
	linkElm.dataset.role = "img";
	linkElm.style = "max-height: 350px; max-width: 550px; border-radius: 8px; overflow: hidden;";

const wrapper = document.createElement('div');
	wrapper.className = "clickableWrapper_af017a";
	wrapper.tabIndex = "0";
	wrapper.setAttribute('aria-label', 'Image');
	wrapper.setAttribute('aria-describedby', 'uid_4');
	wrapper.setAttribute('role', 'button');


const img = document.createElement('img');
	img.className = "lazyImg-EmbedMoreImages";
	img.alt = "Image";
	img.role = "button";
	img.style = "display: none; height: auto; max-height: 350px; max-width: 550px; border-radius: 8px; overflow: hidden; cursor: pointer;";
	wrapper.appendChild(img);
	img.addEventListener('click', (event) => {
		event.preventDefault();
		this.showImageModal(href);
	});
	
	this.preloadImage(img, href, (progressValue) => {
		let formattedProgressValue = parseFloat(progressValue).toFixed(2);
		progress.style.width = `${formattedProgressValue}%`;
		percentageLabel.textContent = `${formattedProgressValue}%`;
	
		if (progressValue === 100) {
			//setTimeout(() => {
				//loadingContainer.style.opacity = "0";
			//}, 300);
		}

	}).then(() => {
		img.src = href;
		oldContainer.style.display = 'none';
		img.style.display = 'block';
		// Call the recursive function for the next image after the current one has loaded.

	}).catch(err => {
		console.error('Error loading image:', err);
		// If there's an error, still move on to the next image.

	});
		// Delaying appending to DOM until image is loaded.
		this.preloadImage(img, href, null).then(() => {
			showEmbeddedImage(img, linkElm, wrapper, newContainer, oldContainer);
		}); 
	newContainer.appendChild(loadingContainer);
	newContainer.appendChild(linkElm);
	newContainer.appendChild(wrapper);

	const oldContainer = link.closest('.nonVisualMediaItemContainer_f4758a');
	const showEmbeddedImage = (img, linkElm, wrapper, newContainer, oldContainer) => {
		img.src = link.getAttribute('href');
		newContainer.appendChild(linkElm);
		newContainer.appendChild(wrapper);
		
		if (oldContainer && oldContainer.parentNode) {
			oldContainer.style.display = 'none';
			loadingContainer.style.display = 'none';
			const spoilerInnerContainer = oldContainer.querySelector('.spoilerInnerContainer__54ab5');
	if (spoilerInnerContainer) {
	const spoilerContent = document.createElement('div');
	spoilerContent.className = "spoilerContent__54ab5 spoilerContainer__54ab5 hidden__54ab5";
	spoilerContent.setAttribute('aria-label', 'Spoiler');
	spoilerContent.setAttribute('aria-expanded', 'false');
	spoilerContent.setAttribute('role', 'button');
	spoilerContent.setAttribute('tabindex', '0');

	const spoilerWarning = document.createElement('div');
	spoilerWarning.className = "spoilerWarning__54ab5 obscureWarning__54ab5";
	spoilerWarning.innerHTML = 'Spoiler';

	const innerContainer = document.createElement('div');
	innerContainer.className = "spoilerInnerContainer__54ab5";
	innerContainer.style.pointerEvents = 'none';

	const spoilerImage = newContainer.querySelector('.lazyImg-EmbedMoreImages');
	if (spoilerImage) {
	spoilerImage.style.filter = 'blur(44px)';
	}	

	spoilerContent.addEventListener('click', () => {
	spoilerWarning.style.display = 'none';
	if (spoilerImage) {
		spoilerImage.style.filter = 'none';
	}
	innerContainer.style.pointerEvents = 'auto';
	});

	spoilerContent.appendChild(spoilerWarning);
	spoilerContent.appendChild(innerContainer);
	innerContainer.appendChild(newContainer);
	oldContainer.parentNode.insertBefore(spoilerContent, oldContainer);
} else {
	oldContainer.parentNode.insertBefore(newContainer, oldContainer);
}
}
	newContainer.appendChild(linkElm);
	newContainer.appendChild(wrapper);
	
	this.embeddedImages.add(href);
}
}
		embedImageRecursive(index + 1);
	};

	embedImageRecursive(0);
}

preloadImage(img, url, onProgress, loadingBarElement) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		
		let fakeProgress = 0;
		let fakeLoadingInterval = null;
		let xhr = null;
		let realLoadingCheckInterval = null;
		
		const startFakeLoading = () => {
			if (!fakeLoadingInterval) {
				fakeLoadingInterval = setInterval(() => {
					const randomValue = 0 + Math.random() * (0.3 - 0.1);
					fakeProgress += randomValue;
					if (onProgress && fakeProgress <= 99.99) {
						onProgress(fakeProgress);
					} else {
						stopFakeLoading();
					}
				}, 100);
			}
		};

		const fallbackTimeout = setTimeout(startFakeLoading, 2000);

		const stopFakeLoading = () => clearInterval(fakeLoadingInterval);

		const disconnectObserver = observer => observer && observer.disconnect();

		const cleanup = (observer) => {
			clearTimeout(fallbackTimeout);
			clearInterval(realLoadingCheckInterval);
			stopFakeLoading();
			disconnectObserver(observer);
		};

		realLoadingCheckInterval = setInterval(() => {
			if (xhr && (xhr.readyState > 1 || xhr.status > 0)) {
				stopFakeLoading();
			}
		}, 100);

		const observer = loadingBarElement && new MutationObserver(mutations => {
			for (let mutation of mutations) {
				if (mutation.removedNodes.length && 
					(mutation.target === loadingBarElement || mutation.target.contains(loadingBarElement))) {
					xhr && xhr.abort();
					cleanup(observer);
					reject(new Error("Loading bar element was removed."));
					return;
				}

				if (mutation.type === 'attributes' && mutation.target === loadingBarElement) {
					const style = window.getComputedStyle(loadingBarElement);
					if (style.display === 'none' || style.visibility === 'hidden') {
						xhr && xhr.abort();
						cleanup(observer);
						reject(new Error("Loading bar element became invisible."));
						return;
					}
				}
			}
		});
		
		observer && observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
		
		image.onload = () => {
			cleanup(observer);
			onProgress && onProgress(100);
			resolve(image);
			if (img) img.src = image.src;
			URL.revokeObjectURL(image.src);
		};

		image.onerror = () => {
			cleanup(observer);
			reject(new Error("Image failed to load."));
		};

		if (onProgress) {
			xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'arraybuffer';

			xhr.onprogress = (event) => {
				clearTimeout(fallbackTimeout);
				stopFakeLoading();
				
				if (event.lengthComputable) {
					const realProgress = (event.loaded / event.total) * 100;
					onProgress(realProgress);
				}
			};

			xhr.onload = () => {
				const blob = new Blob([xhr.response]);
				const blobURL = URL.createObjectURL(blob);
				image.src = blobURL;
			};

			xhr.onerror = () => {
				cleanup(observer);
				image.src = url;
			};

			xhr.send();
		} else {
			image.src = url;
		}
	});
}	


showImageModal(imageSrc) {
const modal = this.createHTML(`
	<div class="layerContainer_da8173 layerContainer-EmbedMoreImages" style="z-index: 1002;">
		<div class="backdrop__78332 withLayer__78332" style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(0px);"></div>
		<div class="layer_bc663c">
		<div class="focusLock__49fc1" role="dialog" aria-label="Image" tabindex="-1" aria-modal="true"> 
			<div class="modal_b0827a root__49fc1 fullscreenOnMobile__49fc1 rootWithShadow__49fc1" style="opacity: 0; transform: scale(0); transition: transform 0.15s;">
			<div class="wrapper_fb6520" style="transform: translateX(10%);">
				<div class="imageWrapper_af017a image_aee8c6" style="width: auto; height: auto; display: block;">
				<img alt="Image" src="${imageSrc}" class="imgEmbedMoreImages loadingOverlay_af017a" style="max-height: 80%; max-width: 80%; width: auto; height: auto; transform: scale(1); transition: transform 0.35s;"></div>
				<div class="optionsContainer_fb6520">
				<a class="anchor_edefb8 anchorUnderlineOnHover_edefb8 downloadLink_fb6520" href="${imageSrc}" rel="noreferrer noopener" target="_blank" role="button" tabindex="0" style="">Open in Browser</a> 
			</div>
			</div>
		</div>
		</div>
		</div>
`);

const titleBar = document.querySelector('.titleBar__421ed');

if (titleBar) {
  titleBar.style.zIndex = '1001';
} else {
  console.error('Element ".titleBar__421ed" not found for Embed More Images. Please join the support server and report this. Support server link: https://discord.gg/NqqqzajfK4');
}

const parentElement = document.querySelector('.appMount__51fd7 .notAppAsidePanel_a3002d') || document.body;
parentElement.prepend(modal);

const backdrop = modal.querySelector(".backdrop__78332");
const imageWrapper = modal.querySelector(".imageWrapper_af017a");
//const optionsContainer = modal.querySelector(".optionsContainer_fb6520");

const elements = [backdrop, imageWrapper];

elements.forEach(element => {
    element.addEventListener('click', () => {
		const modalDialog = modal.querySelector('.modal_b0827a');
		const imgElement = modal.querySelector('.imgEmbedMoreImages');

		imgElement.style.transform = 'scale(0)';
		imgElement.style.opacity = '0';
		imgElement.style.transition = 'transform 0.35s, opacity 0.35s';

		setTimeout(() => {
			modal.style.opacity = '0';
			backdrop.style.opacity = '0';
			modalDialog.style.transform = 'scale(0)';
			
			modal.style.transition = 'opacity 0.35s';
			backdrop.style.transition = 'opacity 0.35s';
			modalDialog.style.transition = 'transform 0.15s';
		}, 150);

		setTimeout(() => {
			const layer = modal.querySelector('.layer_bc663c'); 
			layer.remove(); 
		}, 100);

		setTimeout(() => {
			modal.remove(); 
		}, 50);
    });
});



window.getComputedStyle(modal).opacity;

modal.style.opacity = '1';
backdrop.style.opacity = '0.85';

setTimeout(() => {
	const modalDialog = modal.querySelector('.modal_b0827a');
	modalDialog.style.opacity = '1';
	modalDialog.style.transform = 'scale(1)';
}, 10);

window.addEventListener('beforeunload', () => {
	const modalDialog = modal.querySelector('.modal_b0827a');
	modal.style.opacity = '0';
	modalDialog.style.transform = 'scale(0)';
	backdrop.style.opacity = '0';
});
}

observeContainers() {
	const containers = document.querySelectorAll('.nonVisualMediaItemContainer_f4758a');
	containers.forEach((container) => {
	this.embedImagesInContainer(container);
	});
}

/** 
	Marker to make start easier to see/find.
*/

start() {

this.load();
if (this.observerStart) this.observerStart.disconnect();

this.embeddedImages.clear();

this.observerStart = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
	if (mutation.type === 'childList') {
		mutation.addedNodes.forEach((node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {

			if (node.hasAttribute('data-embedded')) {
			return;
			}

			const containers = node.classList.contains('nonVisualMediaItemContainer_f4758a') ? [node] : node.querySelectorAll('.nonVisualMediaItemContainer_f4758a');
			containers.forEach((container) => this.embedImagesInContainer(container));
		}
		});
	}
	});
});

this.observerStart.observe(document.body, { childList: true, subtree: true });

this.observeContainers();

}

/** 
Main code ends here, don't forget. 
That "}" is attached to the "start () {" function.
*/

stop() {

	this.unload();

	if (this.observerStart) {
		this.observerStart.disconnect();
		this.observerStart = null;
	}

	if (this.containerObserver) {
		this.containerObserver.disconnect();
		this.containerObserver = null;
	}

	if (this.observer) {
		this.observer.disconnect();
		this.observer = null;
	}

	if (this.extensionObserver) {
		this.extensionObserver.disconnect();
		this.extensionObserver = null;
	}

	const elements = document.querySelectorAll('.nonVisualMediaItemContainer_f4758a');

	elements.forEach(element => {
		element.style.display = 'block';
	});

	document.querySelectorAll('.imageContainer-EmbedMoreImages').forEach(newContainer => {
		const oldContainer = newContainer.nextSibling;

		if (oldContainer) {
			oldContainer.style.display = '';
		}

		newContainer.parentNode.removeChild(newContainer);
	});

	document.querySelectorAll('img.lazyImg-EmbedMoreImages').forEach(img => {
		img.dataset.src = img.src;
		img.removeAttribute('src');
	});

	document.querySelectorAll('.layerContainer_da8173.layerContainer-EmbedMoreImages').forEach(modal => {
		modal.parentNode.removeChild(modal);
	});

	this.embeddedImages.clear();
}
}

/** IGNORE THIS
* Version 1.10 of 'Embed More Images'.
* Copyright (Boost Software License 1.0) 2023-2025 Knew
* Link to plugin: https://github.com/Knewest/Embed-More-Images
* Support server: https://discord.gg/NqqqzajfK4
*
* @changelog {banner} https://cdn.discordapp.com/attachments/753561208073879642/1134847376541106176/output_animation8.webp
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/embed-more-images/releases).
* @changelog {fixed.item} Discord broke the embedding. This is fixed now.
* @changelog {added.title} What I changed
* @changelog {added.item} Functionally? Nothing.
* @changelog {footer} Need help? Join my the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
* @changelog {progress.item} I plan to add SVG support soon.
* @changelog {progress.item} I plan to add the ability to unload/unembed an image by clicking an arrow next to the image.
*/
