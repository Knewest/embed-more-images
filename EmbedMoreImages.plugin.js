/**
 * @name Embed More Images
 * @author Knew
 * @description Embeds images that are usually unembedded in Discord.
 * @version 1.1
 * @authorId 332116671294734336
 * @authorLink https://github.com/Knewest
 * @invite NqqqzajfK4
 * @website https://twitter.com/KnewestLSEP
 * @source https://github.com/Knewest/embed-more-images
 * @updateUrl https://raw.githubusercontent.com/Knewest/embed-more-images/main/EmbedMoreImages.plugin.js
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
		let loadedData = BdApi.loadData("EmbedMoreImages", "enableFormatExtension");
		this.settings.enableFormatExtension = loadedData !== undefined ? loadedData : true;
	}

	unload() {
		BdApi.saveData("EmbedMoreImages", "enableFormatExtension", this.settings.enableFormatExtension);
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
        checkbox.checked = BdApi.loadData("EmbedMoreImages", "enableFormatExtension");
        checkbox.addEventListener('change', () => {
            this.settings.enableFormatExtension = checkbox.checked; 
            BdApi.saveData("EmbedMoreImages", "enableFormatExtension", this.settings.enableFormatExtension);
            const extensionDivs = document.querySelectorAll('.imgExtension-EmbedMoreImages');
            extensionDivs.forEach(div => {
                div.style.display = this.settings.enableFormatExtension ? 'block' : 'none';
            });
        });
        panel.appendChild(checkboxContainer);

        return panel;
    }


	embedImagesInContainer(container) {
	  const imgExtensions = ['.webp', '.apng', '.png', '.jpe', '.jfif', '.jif', '.jfi', '.avif', '.bmp', '.dib', '.rle', '.ico', '.cur', '.WEBP', '.APNG', '.PNG', '.JPE', '.JFIF', '.JIF', '.JFI', '.AVIF', '.BMP', '.DIB', '.RLE', '.ICO', '.CUR'];
	  const links = container.querySelectorAll('.fileNameLink-1odyIc');

	const embedImageRecursive = (index) => {
	  if (index >= links.length) {
		return;
	}

	const link = links[index];
	 const href = link.getAttribute('href');
	  if (imgExtensions.some((ext) => href.endsWith(ext))) {
		const parentContainer = link.closest('.nonMediaAttachmentsContainer-3s1dgm');
		if (parentContainer) {
		  const existingImages = parentContainer.querySelectorAll('.imageContainer-10XenG.imageContainer-EmbedMoreImages.container-2sjPya .originalLink-Azwuo9');
		  for (let i = 0; i < existingImages.length; i++) {
			if (existingImages[i].href === href) {
			  embedImageRecursive(index + 1);
			  return;
			}
		}
	}

	const newContainer = document.createElement('div');
	newContainer.className = "imageContainer-10XenG imageContainer-EmbedMoreImages container-2sjPya";
	newContainer.style = "border-radius: 8px; overflow: hidden; position: relative;";
		  
		  const clickableWrapper = document.createElement('div');
		  clickableWrapper.className = "clickableWrapper-2WTAkL";
		  
	let observer = new MutationObserver((mutations) => {
	  for (let mutation of mutations) {
		if (mutation.type === 'childList') {
		  const clickableWrapper = mutation.target.querySelector('.clickableWrapper-2WTAkL');
		  if (clickableWrapper) {
	 const imgExtension = document.createElement('span');
	imgExtension.className = "altText-EmbedMoreImages imgExtension-EmbedMoreImages";
			const matchingExtension = imgExtensions.find((ext) => href.endsWith(ext));
			if (matchingExtension) {
			  imgExtension.textContent = matchingExtension.slice(1).toUpperCase();
			  imgExtension.style.display = this.settings.enableFormatExtension ? 'inline-block' : 'none';
			  
			  imgExtension.style.fontWeight = '500';
			  imgExtension.style.color = 'var(--text-muted)';
			  imgExtension.style.fontSize = '12px';
			  imgExtension.style.margin = '0.25rem 0 0.1rem';
			  imgExtension.style.lineHeight = '16px';
			  
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
		linkElm.className = "originalLink-Azwuo9";
		linkElm.href = href;
		linkElm.dataset.role = "img";
		linkElm.style = "max-height: 350px; max-width: 550px; border-radius: 8px; overflow: hidden;";
		linkElm.addEventListener('click', (event) => {
		event.preventDefault();
		this.showImageModal(href);
	});

	const wrapper = document.createElement('div');
		wrapper.className = "clickableWrapper-2WTAkL";
	    wrapper.tabIndex = "0";
		wrapper.setAttribute('aria-label', 'Image');
		wrapper.setAttribute('aria-describedby', 'uid_4');
		wrapper.setAttribute('role', 'button');

	const img = document.createElement('img');
		 img.className = "lazyImg-EmbedMoreImages";
		img.alt = "Image";
		img.dataset.src = href; 
		img.style = "display: grid; width: 100%; height: auto; max-height: 350px; max-width: 550px; border-radius: 8px; overflow: hidden;";
		wrapper.appendChild(img);

		newContainer.appendChild(linkElm);
		newContainer.appendChild(wrapper);

	const oldContainer = link.closest('.nonMediaAttachmentItem-1e7YaR');
		if (oldContainer && oldContainer.parentNode) {
		  oldContainer.style.display = 'none';
		  oldContainer.parentNode.insertBefore(newContainer, oldContainer);
		}


			this.embeddedImages.add(href);
		}
		

		    embedImageRecursive(index + 1);
		};

		embedImageRecursive(0);
	}

	preloadImage(img, url) {
		return new Promise((resolve, reject) => {
		  const image = new Image();
		  image.onload = () => resolve(image);
		  image.onerror = reject;
		  image.src = url;
		});
	}

	loadImageOnIntersection(img, url) {
		const loadImage = () => {
			this.preloadImage(img, url).then(() => {
			    img.src = url;
			}).catch(err => {
		  console.error('Error loading image:', err);
		});
	};

	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadImage();
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		observer.observe(img);

		if (img.getBoundingClientRect().top < window.innerHeight) {
			loadImage();
		}
	} else {
		loadImage();
	}
}


    embedImagesInView() {
		const images = document.querySelectorAll('img.lazyImg-EmbedMoreImages');
		images.forEach((img) => {
		  const url = img.dataset.src;
		  if (url) {
			this.loadImageOnIntersection(img, url);
			img.removeAttribute('data-src');
		  }
		});
	}

	showImageModal(imageSrc) {
	  const modal = document.createElement('div');
		  modal.className = "layerContainer-2lfOPe layerContainer-EmbedMoreImages";
		  modal.style.zIndex = '3002'; 
		  modal.innerHTML = `
			<div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0; background: var(--black-500); transition: opacity 0.35s;"></div>
			<div class="layer-fP3xEz">
			  <div class="focusLock-bHVOlV" role="dialog" aria-label="Image" tabindex="-1" aria-modal="true">
				<div class="modal-3Crloo root-1CAIjD fullscreenOnMobile-2971EC rootWithShadow-2hdL2J" style="opacity: 0; transform: scale(0); transition: transform 0.15s;">
				  <div class="wrapper-rWtXPd">
					<div class="imageWrapper-oMkQl4 image-36HiZc" style="width: auto; height: auto;">
					  <img alt="Image" src="${imageSrc}" class="imgEmbedMoreImages" style="max-width: 997px; max-height: 470px; width: auto; height: auto; transform: scale(1); transition: transform 0.35s;">
					</div>
					<a class="anchor-1X4H4q anchorUnderlineOnHover-wiZFZ_ downloadLink-3cavAH" href="${imageSrc}" rel="noreferrer noopener" target="_blank" role="button" tabindex="0">Open in Browser</a>
				  </div>
				</div>
			  </div>
			</div>
	`;

	let parentElement;
	if (document.querySelector('.appMount-2yBXZl .notAppAsidePanel-3yzkgB')) {
		parentElement = document.querySelector('.appMount-2yBXZl .notAppAsidePanel-3yzkgB');
		parentElement.prepend(modal); 
	} else {
		console.error('Parent element not found, please contact the developer in the BetterDiscord server or open an issue on Github.');
		parentElement = document.body;
		parentElement.prepend(modal);
	}
	  
	const backdrop = modal.querySelector(".backdrop-2ByYRN");
		backdrop.addEventListener('click', () => {
			const modalDialog = modal.querySelector('.modal-3Crloo');
			const layer = modal.querySelector('.layer-fP3xEz'); 
				modal.style.opacity = '0';
				backdrop.style.opacity = '0';
				modalDialog.style.transform = 'scale(0)';
			  
				modal.style.transition = 'opacity 0.35s';
				backdrop.style.transition = 'opacity 0.35s';
				modalDialog.style.transition = 'transform 0.35s';
	  
			setTimeout(() => {
			  layer.remove(); 
			}, 60);

			setTimeout(() => {
			  modal.remove(); 
			}, 350);
	});

	  window.getComputedStyle(modal).opacity;

	  modal.style.opacity = '1';
	  backdrop.style.opacity = '0.85';

	setTimeout(() => {
		const modalDialog = modal.querySelector('.modal-3Crloo');
		modalDialog.style.opacity = '1';
		modalDialog.style.transform = 'scale(1)';
	}, 10);

	window.addEventListener('beforeunload', () => {
		const modalDialog = modal.querySelector('.modal-3Crloo');
		modal.style.opacity = '0';
		modalDialog.style.transform = 'scale(0)';
		backdrop.style.opacity = '0';
	  });
	}

	observeContainers() {
		const containers = document.querySelectorAll('.nonMediaAttachmentItem-1e7YaR');
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

				const containers = node.classList.contains('nonMediaAttachmentItem-1e7YaR') ? [node] : node.querySelectorAll('.nonMediaAttachmentItem-1e7YaR');
				containers.forEach((container) => this.embedImagesInContainer(container));
				
				this.embedImagesInView();
			  }
			});
		  }
		});
	  });

	  this.observerStart.observe(document.body, { childList: true, subtree: true });
	  
	  this.observeContainers();
	  this.embedImagesInView();
	  
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

	  document.querySelectorAll('.layerContainer-2lfOPe.layerContainer-EmbedMoreImages').forEach(modal => {
		modal.parentNode.removeChild(modal);
	  });

	  this.embeddedImages.clear();
	  
  }
}

	/**
	* Version 1.1 of Embed More Images
	* Copyright (Boost Software License 1.0) 2023-2023 Knew
	* Link to plugin: https://github.com/Knewest/embed-more-images
	*/
