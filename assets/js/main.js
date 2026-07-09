// Arquivo principal de script 

// Iniciar Biblioteca Animate On Scroll
AOS.init();

// Variaveis
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-nav a");

const scrollMessage = document.querySelector(".scroll-message");
const btnProjetos = document.querySelector(".hero-projetos");
const btnContato = document.querySelector(".hero-contato");
const socialFixed = document.querySelector(".social-fixed");
const contato = document.querySelector("#contato");

const pages = document.querySelectorAll(".projects-intro, .project-page");
const nextProject = document.getElementById("nextProject");
const prevProject = document.getElementById("prevProject");
const dots = document.querySelectorAll(".project-dots span");
const controls = document.querySelector(".project-controls");
const btnExplore = document.querySelector(".next-project");
let currentPage = 0;

// Dar classe ao mudar de seção
const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const id = entry.target.id;
				
				navLinks.forEach(link => {
					link.classList.remove("active");
					
					if (link.getAttribute("href") === `#${id}`){
						link.classList.add("active");
					}
				});
			}
		});
	}, {
		threshold: 0.4
	}
);

sections.forEach(section => {
	observer.observe(section);
});

// Event para mostrar card de navegação
navLinks.forEach(link => {
	link.addEventListener("click", e => {
		e.preventDefault();
		
		const targetId = link.getAttribute("href").replace("#", "");
		
		const targetSection = document.getElementById(targetId);
		const sectionName = targetId.charAt(0).toUpperCase() + targetId.slice(1);
		
		navegarPara(targetSection, sectionName);
	});
});

// Função para deixar o scroll mais lento
function smoothScroll(target, duration = 2000) {
	const targetPosition = target.offsetTop;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	
	let startTime = null;
	
	function animation(currentTime) {
		if (!startTime) startTime = currentTime;
		
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		
		window.scrollTo(0,
			startPosition + distance * easeInOutCubic(progress)
		);
		
		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	}
	
	requestAnimationFrame(animation);
}
function easeInOutCubic(t) {
	return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Função scroll lento para botoes

function navegarPara(targetSection, sectionName){
	scrollMessage.innerHTML = `<i class="fa-solid fa-compass"></i> Navegando para ${sectionName}...`;
		
		scrollMessage.classList.add("show");
		
		smoothScroll(targetSection, 3000);
		
		setTimeout(() => {
			scrollMessage.classList.remove("show");
		}, 3000);
}

btnProjetos.addEventListener("click", (e) => {
	e.preventDefault();
	
	navegarPara(
		document.querySelector("#projetos"), "Projetos"
	);
});
btnContato.addEventListener("click", (e) => {
	e.preventDefault();
	
	navegarPara(
		document.querySelector("#contato"), "Contato"
	);
});

// Adicionar classe hide para social-fixed ao entrar na seção contato

const socialObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) {
			socialFixed.classList.add("hide");
		} else {
			socialFixed.classList.remove("hide");
		}
	}); 
}, {
	threshold: 0.3
});
socialObserver.observe(contato);

// Função para atualizar projetos 
function updateProjects() {
	pages.forEach(page => {
		page.classList.remove("project-active");
	});
	
	pages[currentPage].classList.add("project-active");
}
function updateControls() {
	if(currentPage === 0){
		controls.classList.remove("show");
	} else {
		controls.classList.add("show");
	}
}
function updateDots() {
	dots.forEach(dot => {
		dot.classList.remove("active-dot");
	});
	
	if (currentPage > 0){
		dots[currentPage - 1].classList.add("active-dot");
	}
}
function renderProjects() {
	updateProjects();
	updateDots();
	updateControls();
}

// Event listener para ir para o próximo projeto
nextProject.addEventListener("click", () => {
	if(currentPage < pages.length - 1){
		currentPage ++;
		
		renderProjects();
	}
});

// Event listener para voltar o projeto

prevProject.addEventListener("click", () => {
	if(currentPage > 0){
		currentPage--;
		renderProjects();
	}
});

btnExplore.addEventListener("click", () => {
	currentPage = 1;
	renderProjects();
});


// Renderizar Projetos da seção projects (Manter sempre no final do arquivo)
renderProjects();