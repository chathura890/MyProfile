/* Simple Portfolio JavaScript - No Animations */
(() => {
  'use strict';
  
  // Utility functions
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  
  // DOM elements
  const navToggle = $('#navToggle');
  const navMenu = $('#nav-menu');
  const themeToggle = $('#themeToggle');
  const navLinks = $$('.nav-link');
  
  // Set current year
  const yearElement = $('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile Navigation
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Theme Toggle
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
    }
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    }
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  initTheme();
  
  // Simple Smooth Scrolling
  function initSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = $(targetId);
        
        if (targetSection) {
          const headerHeight = $('.site-header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active nav link
          updateActiveNavLink(link);
        }
      });
    });
  }
  
  // Update Active Nav Link
  function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
  
  // Set skill bar widths immediately (no animation)
  function initSkillBars() {
    const skillBars = $$('.skill-progress');
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.width = level + '%';
      }
    });
  }
  
  // Contact Form Basic Validation
  function initContactForm() {
    const form = $('#contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      alert('Thank you! Your message has been sent.');
      form.reset();
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Simple scroll spy for active nav links
  function initScrollSpy() {
    const sections = $$('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          const navLink = $(`.nav-link[href="#${id}"]`);
          if (navLink) {
            updateActiveNavLink(navLink);
          }
        }
      });
    });
  }

  // Add smooth hover effects for skill category headers
  function initSkillCategoryEffects() {
    const skillCategories = $$('.skill-category h3');
    skillCategories.forEach(header => {
      header.addEventListener('mouseenter', () => {
        header.style.transform = 'translateY(-2px)';
        header.style.transition = 'transform 0.3s ease';
      });
      
      header.addEventListener('mouseleave', () => {
        header.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Initialize all functions
  function init() {
    initSmoothScroll();
    initSkillBars();
    initContactForm();
    initScrollSpy();
    initSkillCategoryEffects();
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
